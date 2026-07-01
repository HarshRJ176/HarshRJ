import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { sunConfig } from '../config/scene.config';
import { flightState } from '../engine/flightState';

function createSunTexture(): THREE.Texture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, 'rgba(255, 250, 235, 1)');
  gradient.addColorStop(0.15, 'rgba(255, 244, 224, 0.95)');
  gradient.addColorStop(0.4, 'rgba(255, 217, 160, 0.35)');
  gradient.addColorStop(1, 'rgba(255, 217, 160, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Purely visual glow disc for the "Sun glow" beat (SAIS 6, 3s). The actual
 * illumination on Earth comes from the directional light in Lighting.tsx —
 * this sprite is what the camera actually sees flare into view.
 */
export function SunGlow() {
  const spriteRef = useRef<THREE.Sprite>(null);
  const texture = useMemo(() => createSunTexture(), []);

  useFrame(() => {
    if (spriteRef.current) {
      const material = spriteRef.current.material as THREE.SpriteMaterial;
      material.opacity = flightState.sunGlowOpacity;
      const scale = 3.4 + flightState.sunGlowOpacity * 0.4;
      spriteRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <sprite ref={spriteRef} position={sunConfig.position} scale={[3.4, 3.4, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}
