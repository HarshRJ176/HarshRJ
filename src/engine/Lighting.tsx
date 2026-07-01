import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { sunConfig } from '../config/scene.config';
import { flightState } from './flightState';

/**
 * Actual light sources, separate from the visible sun sprite.
 */
export function Lighting() {
  const sunLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    if (sunLightRef.current) {
      sunLightRef.current.intensity = sunConfig.intensity * flightState.sunGlowOpacity;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} color="#b4c9ff" />
      <directionalLight
        ref={sunLightRef}
        position={sunConfig.position}
        color={sunConfig.color}
        intensity={0}
      />
      <directionalLight position={[5.5, 1.6, 6.2]} color="#fff3dc" intensity={0.16} />
      <directionalLight position={[-5, -2, 4]} color="#4468b0" intensity={0.08} />
    </>
  );
}
