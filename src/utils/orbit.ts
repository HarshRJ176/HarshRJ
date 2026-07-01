import * as THREE from 'three';

export interface OrbitalFrame {
  semiMajor: number;
  semiMinor: number;
  tiltX: number;
  tiltY: number;
  tiltZ: number;
}

export function createOrbitalPoint(angle: number, frame: OrbitalFrame): THREE.Vector3 {
  const point = new THREE.Vector3(
    Math.cos(angle) * frame.semiMajor,
    Math.sin(angle) * frame.semiMinor,
    0,
  );

  point.applyEuler(new THREE.Euler(frame.tiltX, frame.tiltY, frame.tiltZ, 'XYZ'));
  return point;
}

export function buildOrbitalRing(samples: number, frame: OrbitalFrame): Float32Array {
  const points = new Float32Array(samples * 3);

  for (let index = 0; index < samples; index += 1) {
    const angle = (index / samples) * Math.PI * 2;
    const point = createOrbitalPoint(angle, frame);
    points[index * 3] = point.x;
    points[index * 3 + 1] = point.y;
    points[index * 3 + 2] = point.z;
  }

  return points;
}
