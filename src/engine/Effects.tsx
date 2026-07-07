import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';

import { useIsMobile } from '../hooks/useIsMobile';

/**
 * Keep the post-processing budget light so the content layer remains the
 * primary focus. Bloom is the more expensive of the two passes (extra
 * downsample/blur buffers), so it's dropped entirely on mobile — Vignette
 * alone still keeps the cinematic framing at a fraction of the GPU cost.
 */
export function Effects() {
  const isMobile = useIsMobile();

  return (
    <EffectComposer multisampling={0}>
      {isMobile ? (
        <Vignette eskil={false} offset={0.32} darkness={0.5} />
      ) : (
        <>
          <Bloom
            intensity={0.08}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.16}
            kernelSize={KernelSize.SMALL}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.32} darkness={0.5} />
        </>
      )}
    </EffectComposer>
  );
}
