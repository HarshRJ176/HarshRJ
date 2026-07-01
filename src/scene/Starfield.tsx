import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { starfieldConfig } from '../config/scene.config';
import { flightState } from '../engine/flightState';

/**
 * Procedurally generated point cloud. Positions are computed once and
 * uploaded to the GPU; only material opacity changes per frame, driven by
 * flightState.starsOpacity during the "Stars fade in" beat (SAIS 6, 1s).
 * A very slow whole-field rotation keeps the backdrop from feeling static
 * during the long scroll sections without competing with Earth for motion.
 */
export function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const geometry = useMemo(() => {
    const { count, radius, minRadius } = starfieldConfig;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Uniform distribution across a spherical shell so stars never
      // clump toward the camera or the poles.
      const r = THREE.MathUtils.lerp(minRadius, radius, Math.cbrt(Math.random()));
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.opacity = flightState.starsOpacity;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.0025;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        ref={materialRef}
        color="#dce8ff"
        size={starfieldConfig.size}
        sizeAttenuation
        transparent
        opacity={0}
        depthWrite={false}
      />
    </points>
  );
}
