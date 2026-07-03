import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { earthConfig } from '../../config/scene.config';
import { flightState } from '../../engine/flightState';
import { lerp } from '../../utils/math';
import { Earth } from './Earth';
import { Clouds } from './Clouds';
import { Atmosphere } from './Atmosphere';
import { Satellite } from './Satellite';
import { OrbitalPath } from './OrbitalPath';
import { OrbitMarkers } from './OrbitMarkers';

/**
 * Shared transform for the planet layers and the orbital relay.
 */
export function PlanetSystem() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const reveal = flightState.earthRevealT;
    group.scale.setScalar(lerp(0.001, 1, reveal));

    const t = flightState.scrollProgress;
    group.position.set(
      lerp(earthConfig.introPosition[0], earthConfig.dockedPosition[0], t),
      lerp(earthConfig.introPosition[1], earthConfig.dockedPosition[1], t),
      lerp(earthConfig.introPosition[2], earthConfig.dockedPosition[2], t),
    );
  });

  return (
    <group ref={groupRef} position={earthConfig.introPosition} rotation={[0, 0, earthConfig.axialTilt]}>
      <OrbitalPath />
      <OrbitMarkers />
      <Earth />
      <Clouds />
      <Atmosphere />
      <Satellite />
    </group>
  );
}
