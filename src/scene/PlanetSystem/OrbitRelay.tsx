import { useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { profile } from '../../content/profile';
import { flightState } from '../../engine/flightState';
import { lerp } from '../../utils/math';

const orbitRadius = 3.15;
const orbitHeight = 0.62;

export function OrbitRelay() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const satelliteRef = useRef<THREE.Group>(null);

  useFrame((state: any) => {
    const t = flightState.scrollProgress;
    const worldTime = state.clock.elapsedTime;

    const group = groupRef.current;
    const ring = ringRef.current;
    const satellite = satelliteRef.current;

    if (!group || !ring || !satellite) return;

    group.scale.setScalar(lerp(0.06, 1, t));
    group.rotation.z = Math.sin(worldTime * 0.18) * 0.05;
    group.rotation.y = worldTime * 0.12 + t * 1.8;

    const ringMaterial = ring.material as THREE.MeshBasicMaterial;
    ringMaterial.opacity = t * 0.45;

    const angle = worldTime * 0.55 + t * 5.5;
    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitHeight;
    const z = Math.sin(angle * 0.72) * 0.2;

    satellite.position.set(x, y, z);
    satellite.rotation.set(Math.sin(angle) * 0.25, angle + Math.PI / 2, 0);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={ringRef} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[orbitRadius, 0.01, 12, 192]} />
        <meshBasicMaterial color="#6fa8ff" transparent opacity={0} depthWrite={false} />
      </mesh>

      <group ref={satelliteRef}>
        <mesh>
          <boxGeometry args={[0.34, 0.18, 0.18]} />
          <meshStandardMaterial
            color="#dce8ff"
            emissive="#0a1322"
            emissiveIntensity={0.18}
            roughness={0.42}
            metalness={0.26}
          />
        </mesh>

        <mesh position={[-0.26, 0, 0]}>
          <boxGeometry args={[0.18, 0.08, 0.26]} />
          <meshStandardMaterial color="#5d86cf" roughness={0.55} metalness={0.05} />
        </mesh>
        <mesh position={[0.26, 0, 0]}>
          <boxGeometry args={[0.18, 0.08, 0.26]} />
          <meshStandardMaterial color="#5d86cf" roughness={0.55} metalness={0.05} />
        </mesh>

        <Html transform distanceFactor={8} position={[0, 0.42, 0]} style={{ pointerEvents: 'none' }}>
          <div className="orbital-relay-card">
            <div className="orbital-relay-kicker">Orbital Relay</div>
            <div className="orbital-relay-name">{profile.name}</div>
            <div className="orbital-relay-meta">{profile.role}</div>
            <div className="orbital-relay-meta">{profile.focus}</div>
            <div className="orbital-relay-meta">{profile.location}</div>
          </div>
        </Html>
      </group>
    </group>
  );
}
