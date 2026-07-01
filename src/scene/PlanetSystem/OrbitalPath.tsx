import { useMemo } from 'react';
import * as THREE from 'three';

import { earthConfig } from '../../config/scene.config';
import { buildOrbitalRing } from '../../utils/orbit';

export function OrbitalPath() {
  const geometry = useMemo(() => {
    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(buildOrbitalRing(240, earthConfig.orbit), 3),
    );
    return bufferGeometry;
  }, []);

  return (
    <lineLoop geometry={geometry} renderOrder={0}>
      <lineBasicMaterial color="#62dfff" transparent opacity={0.22} depthWrite={false} />
    </lineLoop>
  );
}
