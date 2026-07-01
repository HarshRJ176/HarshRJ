import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

import { assetPaths, earthConfig } from '../../config/scene.config';
import { flightState } from '../../engine/flightState';

/**
 * Cloud layer kept deliberately soft.
 */
export function Clouds() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsMap = useTexture(assetPaths.earthClouds);

  useEffect(() => {
    cloudsMap.colorSpace = THREE.SRGBColorSpace;
  }, [cloudsMap]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.y += delta * earthConfig.rotationSpeed * 1.35 * flightState.earthIdleSpin;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[earthConfig.radius + earthConfig.cloudRadiusOffset, 56, 56]} />
      <meshBasicMaterial
        map={cloudsMap}
        transparent
        opacity={0.16}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  );
}
