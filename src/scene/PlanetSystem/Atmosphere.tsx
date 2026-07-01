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
    // Limb glow: brightest where the surface normal grazes the view
    // direction (edge of the sphere), near-invisible facing the camera.
    float rim = pow(1.0 - clamp(dot(vWorldNormal, vViewDir), 0.0, 1.0), 2.2);

    // Sun alignment: 1.0 on the sunlit side of the planet, 0.0 on the
    // far/night side. This is what turns a flat ring into a directional
    // "sunrise" glow that only reads brightly on one side.
    float sunFactor = clamp(dot(vWorldNormal, uLightDir) * 0.5 + 0.5, 0.0, 1.0);
    sunFactor = pow(sunFactor, 1.4);

    vec3 color = mix(uColorShadow, uColorLit, sunFactor);
    float intensity = rim * mix(0.03, 0.7, sunFactor);

    gl_FragColor = vec4(color, intensity * uOpacity);
  }
`;

/**
 * Earth's atmospheric limb glow (SAIS Section 1). Intensity is driven by
 * BOTH a view-dependent Fresnel term (so it only reads at the edges, never
 * across the face) AND the sun's direction relative to the planet, so the
 * glow is warm and bright on the lit side and cool/faint on the shadow
 * side — a directional "sunrise" effect rather than a flat colored ring.
 */
export function Atmosphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const scratchWorldPos = useRef(new THREE.Vector3());
  const scratchLightDir = useRef(new THREE.Vector3());
  const sunPosition = useRef(new THREE.Vector3(...sunConfig.position));

  const uniforms = useMemo(
    () => ({
      uColorLit: { value: new THREE.Color('#f7edd7') },
      uColorShadow: { value: new THREE.Color('#345ea8') },
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
