import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { earthConfig } from '../../config/scene.config';
import { flightState } from '../../engine/flightState';
import { createOrbitalPoint } from '../../utils/orbit';

/**
 * Small orbital relay satellite. It now follows the same Earth-centered
 * orbital plane as the displayed ring, so the path reads physically.
 */
export function Satellite() {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const elapsedRef = useRef(0);

  useFrame((_, delta) => {
    elapsedRef.current += delta;

    const group = groupRef.current;
    if (!group) return;

    const angle = elapsedRef.current * earthConfig.relaySpeed + flightState.scrollProgress * earthConfig.relayScrollInfluence;
    const point = createOrbitalPoint(angle, earthConfig.orbit);

    group.position.copy(point);
    group.rotation.set(earthConfig.orbit.tiltX, angle + Math.PI / 2, earthConfig.orbit.tiltZ);

    if (bodyRef.current) {
      bodyRef.current.rotation.z = Math.sin(elapsedRef.current * 2.8) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={0.58}>
      <mesh ref={bodyRef}>
        <boxGeometry args={[0.18, 0.16, 0.28]} />
        <meshStandardMaterial color="#d8e2f2" metalness={0.28} roughness={0.5} />
      </mesh>

      <mesh position={[-0.33, 0, 0]}>
        <boxGeometry args={[0.3, 0.05, 0.88]} />
        <meshStandardMaterial color="#1d335f" metalness={0.1} roughness={0.72} />
      </mesh>

      <mesh position={[0.33, 0, 0]}>
        <boxGeometry args={[0.3, 0.05, 0.88]} />
        <meshStandardMaterial color="#1d335f" metalness={0.1} roughness={0.72} />
      </mesh>

      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.34, 12]} />
        <meshStandardMaterial color="#7d8dff" metalness={0.6} roughness={0.25} />
      </mesh>
    </group>
  );
}
