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
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="detail-modal-backdrop"
          role="dialog"
          aria-modal="true"
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
              <button type="button" className="detail-modal-close" onClick={onClose} aria-label="Close details">
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
