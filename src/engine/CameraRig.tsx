import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

import { cameraConfig } from '../config/scene.config';
import { flightState } from './flightState';
import { lerp } from '../utils/math';

/**
 * SAIS Section 7 is explicit: "Camera motion is minimal; GSAP timeline
 * drives all movement" of objects, not the camera. This rig only does two
 * things — (1) a single dolly-in during the opening sequence, driven by
 * flightState.cameraIntroT, and (2) a barely-there parallax tied to scroll
 * so the docking beat has depth. Neither ever fights the planet for
 * attention.
 */
export function CameraRig() {
  const { camera } = useThree();
  const idleClock = useRef(0);

  useFrame((_, delta) => {
    idleClock.current += delta;

    const introT = flightState.cameraIntroT;
    const baseZ = lerp(cameraConfig.introPosition[2], cameraConfig.restPosition[2], introT);

    // Sub-pixel breathing motion — alive, not distracting.
    const breathe = Math.sin(idleClock.current * 0.25) * 0.03;

    // Faint parallax as Earth docks lower-left; camera drifts a hair the
    // opposite way rather than tracking the planet.
    const parallaxX = flightState.scrollProgress * -0.12;
    const parallaxY = flightState.scrollProgress * 0.06;

    camera.position.set(parallaxX, parallaxY + breathe, baseZ);
    camera.lookAt(cameraConfig.lookAt[0], cameraConfig.lookAt[1], cameraConfig.lookAt[2]);
  });

  return null;
}
