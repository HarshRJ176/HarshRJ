import { Suspense, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

import { useIsMobile } from '../hooks/useIsMobile';

interface SceneCanvasProps {
  children: ReactNode;
}

/**
 * Owns the WebGL surface only. Render cost is tiered by device: phones get
 * a lower starting/ceiling DPR and skip antialiasing, since both are
 * disproportionately expensive on mobile GPUs relative to the visual gain.
 */
export function SceneCanvas({ children }: SceneCanvasProps) {
  const isMobile = useIsMobile();
  const [dpr, setDpr] = useState(isMobile ? 0.75 : 0.9);
  const dprFloor = isMobile ? 0.6 : 0.8;
  const dprCeiling = isMobile ? 1 : 1.2;

  return (
    <Canvas
      className="scene-canvas-root"
      dpr={dpr}
      gl={{
        antialias: !isMobile,
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
        onIncline={() => setDpr((current) => Math.min(dprCeiling, current + 0.08))}
        onDecline={() => setDpr((current) => Math.max(dprFloor, current - 0.08))}
      />
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
