import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

import { assetPaths, earthConfig } from '../../config/scene.config';
import { flightState } from '../../engine/flightState';

/**
 * Earth surface sphere.
 */
export function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);

  const [dayMap, normalMap] = useTexture([
    assetPaths.earthDay,
    assetPaths.earthNormal,
  ]);

  useEffect(() => {
    dayMap.colorSpace = THREE.SRGBColorSpace;
    dayMap.anisotropy = 4;
    normalMap.colorSpace = THREE.NoColorSpace;
  }, [dayMap, normalMap]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.y += delta * earthConfig.rotationSpeed * flightState.earthIdleSpin;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[earthConfig.radius, 56, 56]} />
      <meshStandardMaterial
        map={dayMap}
        normalMap={normalMap}
        roughness={0.97}
        metalness={0.01}
        emissive={new THREE.Color('#07111c')}
        emissiveIntensity={0.04}
      />
    </mesh>
  );
}
