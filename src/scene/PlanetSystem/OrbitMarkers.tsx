import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { earthConfig } from '../../config/scene.config';
import { flightState } from '../../engine/flightState';
import { missionSections } from '../../content/nav';
import { createOrbitalPoint } from '../../utils/orbit';

const COUNT = missionSections.length;

/**
 * The literal "orbit with satellites" — one small marker per mission
 * section (Brief, Experience, Education, Projects, Research, Skills,
 * Contact), fixed at evenly-spaced angles on the same orbital path
 * Satellite.tsx travels. flightState.activeSectionIndex (written by
 * useActiveSection as the user scrolls) drives which marker brightens
 * and enlarges — the "currently transmitting" satellite for whichever
 * section is on screen.
 *
 * Markers fade in only once Earth is mostly docked (scrollProgress >
 * ~0.55) so they never clutter the opening reveal.
 */
export function OrbitMarkers() {
  const scratchColor = useRef(new THREE.Color());

  const positions = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const angle = (i / COUNT) * Math.PI * 2;
        return createOrbitalPoint(angle, earthConfig.orbit);
      }),
    [],
  );

  const materials = useRef<THREE.MeshBasicMaterial[]>([]);
  const meshes = useRef<THREE.Mesh[]>([]);

  useFrame((_, delta) => {
    const dockT = THREE.MathUtils.smoothstep(flightState.scrollProgress, 0.55, 0.92);

    for (let i = 0; i < COUNT; i++) {
      const material = materials.current[i];
      const mesh = meshes.current[i];
      if (!material || !mesh) continue;

      const isActive = i === flightState.activeSectionIndex;
      const targetOpacity = dockT * (isActive ? 1 : 0.3);
      const targetScale = isActive ? 2.1 : 1;

      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 4);
      mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, targetScale, delta * 5));

      scratchColor.current.set(isActive ? '#d8b46a' : '#62dfff');
      material.color.lerp(scratchColor.current, delta * 4);
    }
  });

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh
          key={missionSections[i].id}
          position={pos}
          ref={(m) => {
            if (m) meshes.current[i] = m;
          }}
        >
          <sphereGeometry args={[0.032, 12, 12]} />
          <meshBasicMaterial
            ref={(m) => {
              if (m) materials.current[i] = m;
            }}
            color="#62dfff"
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
