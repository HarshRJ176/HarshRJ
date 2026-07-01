import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';

/**
 * Keep the post-processing budget light so the content layer remains the
 * primary focus.
 */
export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.08}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.16}
        kernelSize={KernelSize.SMALL}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.32} darkness={0.5} />
    </EffectComposer>
  );
}
