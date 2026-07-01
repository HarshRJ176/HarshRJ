import type { OpeningStage } from '../config/timeline.config';

interface OpeningOverlayProps {
  stage: OpeningStage;
  onSkip: () => void;
}

/**
 * Minimal opening overlay: no flash text, no extra copy. The page now
 * reads immediately, while the cinematic can still be skipped on demand.
 */
export function OpeningOverlay({ stage, onSkip }: OpeningOverlayProps) {
  if (stage === 'scrollEnabled') return null;

  return (
    <div className="opening-overlay">
      <button type="button" className="skip-button" onClick={onSkip}>
        Skip intro
      </button>
    </div>
  );
}
