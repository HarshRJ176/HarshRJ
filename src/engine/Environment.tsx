import { Environment as DreiEnvironment } from '@react-three/drei';

import { assetPaths } from '../config/scene.config';
import { Starfield } from '../scene/Starfield';
import { Nebula } from '../scene/Nebula';
import { SunGlow } from '../scene/SunGlow';

/**
 * "What the camera sees behind the planet." The HDR is used purely for
 * image-based lighting/reflections (background disabled) — the visible
 * backdrop is the procedural Starfield/Nebula/SunGlow trio so each element
 * can fade in on its own SAIS Section 6 beat independently.
 */
export function Environment() {
  return (
    <>
      <DreiEnvironment files={assetPaths.spaceEnv} background={false} />
      <Starfield />
      <Nebula />
      <SunGlow />
    </>
  );
}
