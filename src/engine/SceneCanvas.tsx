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
  const [dpr, setDpr] = useState(0.9);

  return (
    <Canvas
      className="scene-canvas-root"
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.92,
      }}
      camera={{ fov: 38, near: 0.1, far: 200, position: [0, 0, 9] }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.setClearColor('#02070d', 0);
      }}
    >
      <PerformanceMonitor
        onIncline={() => setDpr((current) => Math.min(1.2, current + 0.08))}
        onDecline={() => setDpr((current) => Math.max(0.8, current - 0.08))}
      />
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
