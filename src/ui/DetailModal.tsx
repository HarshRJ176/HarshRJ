import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface DetailModalProps {
  open: boolean;
  title: string;
  subtitle?: string;
  description: string;
  bullets: string[];
  onClose: () => void;
}

export function DetailModal({ open, title, subtitle, description, bullets, onClose }: DetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="detail-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="detail-modal"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="detail-modal-header">
              <div>
                <p className="detail-modal-kicker">Expanded detail</p>
                <h3>{title}</h3>
                {subtitle && <p className="detail-modal-subtitle">{subtitle}</p>}
              </div>
              <button
                type="button"
                ref={closeButtonRef}
                className="detail-modal-close"
                onClick={onClose}
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <p className="detail-modal-description">{description}</p>

            <ul className="detail-modal-list">
              {bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
