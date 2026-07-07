import { Environment as DreiEnvironment } from '@react-three/drei';

import { assetPaths } from '../config/scene.config';
import { Starfield } from '../scene/Starfield';
import { Nebula } from '../scene/Nebula';
import { SunGlow } from '../scene/SunGlow';
import { useIsMobile } from '../hooks/useIsMobile';

/**
 * "What the camera sees behind the planet." The HDR is used purely for
 * image-based lighting/reflections (background disabled) — the visible
 * backdrop is the procedural Starfield/Nebula/SunGlow trio so each element
 * can fade in on its own SAIS Section 6 beat independently.
 *
 * The HDR is a 1.6MB texture plus real GPU cost to convolve it for IBL, so
 * it's skipped on mobile: Lighting.tsx's direct lights are enough to shade
 * the planet correctly on their own, just without the subtle IBL sheen.
 */
export function Environment() {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && <DreiEnvironment files={assetPaths.spaceEnv} background={false} />}
      <Starfield />
      <Nebula />
      <SunGlow />
    </>
  );
}
