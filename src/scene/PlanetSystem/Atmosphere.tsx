import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { earthConfig, sunConfig } from '../../config/scene.config';
import { flightState } from '../../engine/flightState';

const vertexShader = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPosition.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorLit;
  uniform vec3 uColorShadow;
  uniform vec3 uLightDir;
  uniform float uOpacity;
  varying vec3 vWorldNormal;
  varying vec3 vViewDir;

  void main() {
    // Sharp falloff (power 4.5) keeps this to a thin sliver right at the
    // silhouette edge, not a visible ring/outline circling the whole disc.
    float rim = pow(1.0 - clamp(dot(vWorldNormal, vViewDir), 0.0, 1.0), 4.5);

    // Sun alignment: 1.0 on the sunlit side, 0.0 on the far/night side —
    // keeps the glow to a soft crescent rather than a full halo.
    float sunFactor = clamp(dot(vWorldNormal, uLightDir) * 0.5 + 0.5, 0.0, 1.0);
    sunFactor = pow(sunFactor, 1.8);

    vec3 color = mix(uColorShadow, uColorLit, sunFactor);
    float intensity = rim * mix(0.015, 0.32, sunFactor);

    gl_FragColor = vec4(color, intensity * uOpacity);
  }
`;

/**
 * Earth's atmospheric limb glow. Deliberately subtle and blue-only —
 * no near-white tones — so it never reads as a bright outline/border at
 * the sphere's edge, just a faint sunlit haze. Intensity is capped low
 * and the Fresnel falloff is sharp so it only shows right at the
 * silhouette, not as a ring around the whole disc.
 */
export function Atmosphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const scratchWorldPos = useRef(new THREE.Vector3());
  const scratchLightDir = useRef(new THREE.Vector3());
  const sunPosition = useRef(new THREE.Vector3(...sunConfig.position));

  const uniforms = useMemo(
    () => ({
      uColorLit: { value: new THREE.Color('#7fb8e0') },
      uColorShadow: { value: new THREE.Color('#1c3f6e') },
      uLightDir: { value: new THREE.Vector3(0, 0, 1) },
      uOpacity: { value: 0 },
    }),
    [],
  );

  useFrame(() => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    if (!mesh || !material) return;

    mesh.getWorldPosition(scratchWorldPos.current);
    scratchLightDir.current
      .copy(sunPosition.current)
      .sub(scratchWorldPos.current)
      .normalize();

    material.uniforms.uLightDir.value.copy(scratchLightDir.current);
    material.uniforms.uOpacity.value = flightState.earthRevealT;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry
        args={[earthConfig.radius + earthConfig.atmosphereRadiusOffset, 96, 96]}
      />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}
