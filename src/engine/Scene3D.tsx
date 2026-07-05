import { SceneCanvas } from './SceneCanvas';
import { WorldRoot } from './WorldRoot';

/**
 * Single entry point for the entire WebGL layer, lazy-loaded from App.tsx
 * via React.lazy(). This is the actual code-split boundary: three.js,
 * @react-three/fiber, @react-three/drei, and @react-three/postprocessing
 * are the heaviest dependencies in the project by a wide margin, so
 * deferring them into their own chunk lets the initial HTML/CSS/UI shell
 * paint without waiting on that whole import graph first.
 */
export function Scene3D() {
  return (
    <SceneCanvas>
      <WorldRoot />
    </SceneCanvas>
  );
}
