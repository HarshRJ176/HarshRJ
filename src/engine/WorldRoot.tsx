import { Environment } from './Environment';
import { Lighting } from './Lighting';
import { PlanetSystem } from '../scene/PlanetSystem/PlanetSystem';
import { Effects } from './Effects';
import { CameraRig } from './CameraRig';

/**
 * WorldRoot — the frozen scene tree from SAIS Section 5:
 *
 *   SceneCanvas
 *    └── WorldRoot
 *         ├── Environment
 *         ├── Lighting
 *         ├── PlanetSystem
 *         ├── Effects
 *         └── CameraRig
 *
 * Order matters for two reasons: Environment/Lighting must mount before
 * PlanetSystem so its material has lighting/IBL data on first paint, and
 * Effects reads the fully-lit scene, so it renders last.
 */
export function WorldRoot() {
  return (
    <>
      <Environment />
      <Lighting />
      <PlanetSystem />
      <Effects />
      <CameraRig />
    </>
  );
}
