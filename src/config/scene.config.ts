/**
 * scene.config.ts
 * Geometry, asset paths, and tunable constants for the WorldRoot scene graph.
 */

import earthDay from '../assets/textures/earth/earth_day.jpg';
import earthClouds from '../assets/textures/earth/earth_clouds.jpg';
import earthNormal from '../assets/textures/earth/earth_normal.jpg';
import spaceHdr from '../assets/hdr/space.hdr';

export const assetPaths = {
  earthDay,
  earthClouds,
  earthNormal,
  spaceHdr,
} as const;

export const earthConfig = {
  radius: 1.34,
  cloudRadiusOffset: 0.01,
  atmosphereRadiusOffset: 0.045,
  rotationSpeed: 0.035,
  axialTilt: 0.34,
  dockedPosition: [-2.35, -1.65, 0] as [number, number, number],
  introPosition: [2.95, -0.14, 0] as [number, number, number],
  orbit: {
    semiMajor: 3.05,
    semiMinor: 2.32,
    tiltX: 0.84,
    tiltY: 0.16,
    tiltZ: -0.38,
  },
  relaySpeed: 0.72,
  relayScrollInfluence: 0.78,
};

export const cameraConfig = {
  fov: 38,
  near: 0.1,
  far: 200,
  restPosition: [0, 0, 7.4] as [number, number, number],
  introPosition: [0, 0, 8.7] as [number, number, number],
  lookAt: [0, 0, 0] as [number, number, number],
};

export const sunConfig = {
  position: [8.2, 2.9, 5.2] as [number, number, number],
  intensity: 2.45,
  color: 0xfff4e0,
};

export const starfieldConfig = {
  count: 2600,
  radius: 60,
  minRadius: 18,
  size: 0.035,
};

export const nebulaConfig = {
  layers: [
    { color: '#4c79cc', scale: 20, position: [-11, 6, -38] as [number, number, number], opacity: 0.1 },
    { color: '#7d8dff', scale: 14, position: [12, -5, -42] as [number, number, number], opacity: 0.06 },
  ],
};
