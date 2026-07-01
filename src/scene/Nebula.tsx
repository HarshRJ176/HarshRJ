import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { nebulaConfig } from '../config/scene.config';
import { flightState } from '../engine/flightState';

/** Tiny deterministic PRNG so each nebula layer's texture is stable across renders. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
}

/**
 * Builds a wispy, irregular glow by layering several soft, randomly-placed
 * radial blobs on one canvas — rather than a single radial gradient, which
 * reads as an obvious flat circle once it's large enough on screen.
 */
function createNebulaTexture(color: string, seed: number): THREE.Texture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const [r, g, b] = hexToRgb(color);
  const rand = mulberry32(seed);

  for (let i = 0; i < 6; i++) {
    const bx = size / 2 + (rand() - 0.5) * size * 0.55;
    const by = size / 2 + (rand() - 0.5) * size * 0.55;
    const br = size * (0.22 + rand() * 0.2);
    const alpha = 0.14 + rand() * 0.16;

    const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, br);
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Soft background haze standing in for a nebula (SAIS 6, "Nebula appears"
 * at 2s). Each layer drifts slowly in position, rotation, and scale so it
 * reads as living atmosphere rather than a static painted circle.
 */
export function Nebula() {
  const groupRef = useRef<THREE.Group>(null);

  const layers = useMemo(
    () =>
      nebulaConfig.layers.map((layer, i) => ({
        ...layer,
        texture: createNebulaTexture(layer.color, i * 7919 + 13),
        driftSeedX: i * 1.7 + 0.4,
        driftSeedY: i * 2.3 + 1.1,
      })),
    [],
  );

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const t = state.clock.elapsedTime;

    group.children.forEach((child, i) => {
      const sprite = child as THREE.Sprite;
      const material = sprite.material as THREE.SpriteMaterial;
      const layer = layers[i];

      material.opacity = flightState.nebulaOpacity * layer.opacity;
      material.rotation = t * 0.015 * (i % 2 === 0 ? 1 : -1);

      sprite.position.x = layer.position[0] + Math.sin(t * 0.05 + layer.driftSeedX) * 1.1;
      sprite.position.y = layer.position[1] + Math.cos(t * 0.037 + layer.driftSeedY) * 0.8;
      sprite.position.z = layer.position[2];

      const breathe = 1 + Math.sin(t * 0.08 + i) * 0.06;
      sprite.scale.setScalar(layer.scale * breathe);
    });
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer, i) => (
        <sprite key={i} position={layer.position} scale={[layer.scale, layer.scale, 1]}>
          <spriteMaterial
            map={layer.texture}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}
