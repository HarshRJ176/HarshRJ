import { Suspense, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

interface SceneCanvasProps {
  children: ReactNode;
}

/**
 * Owns the WebGL surface only.
 */
export function SceneCanvas({ children }: SceneCanvasProps) {
  const [dpr, setDpr] = useState(1);

  return (
    <Canvas
      className="scene-canvas-root"
      dpr={dpr}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.95,
      }}
      camera={{ fov: 38, near: 0.1, far: 200, position: [0, 0, 9] }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <PerformanceMonitor
        onIncline={() => setDpr((current) => Math.min(1.35, current + 0.1))}
        onDecline={() => setDpr((current) => Math.max(0.85, current - 0.1))}
      />
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
