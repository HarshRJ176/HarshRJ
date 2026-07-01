import { AnimatePresence, motion } from 'framer-motion';

export interface HoverDetail {
  title: string;
  subtitle?: string;
  description: string;
  bullets: string[];
  tags?: string[];
  meta?: string;
}

interface HoverDetailRailProps {
  code: string;
  kicker: string;
  title: string;
  hint: string;
  detail: HoverDetail | null;
  className?: string;
}

export function HoverDetailRail({ code, kicker, title, hint, detail, className = '' }: HoverDetailRailProps) {
  return (
    <aside className={`hover-detail-rail panel ${className}`.trim()} aria-live="polite">
      <div className="hover-detail-rail-head">
        <span className="hover-detail-rail-code">{code}</span>
        <div>
          <p className="hover-detail-rail-kicker">{kicker}</p>
          <h3 className="hover-detail-rail-title">{title}</h3>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {detail ? (
          <motion.div
            key={detail.title}
            className="hover-detail-rail-body"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <p className="hover-detail-rail-label">Live preview</p>
            <h4>{detail.title}</h4>
            {detail.subtitle && <p className="hover-detail-rail-subtitle">{detail.subtitle}</p>}
            <p className="hover-detail-rail-description">{detail.description}</p>
            <ul className="hover-detail-rail-list">
              {detail.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            {detail.tags?.length ? (
              <ul className="tech-tag-list hover-detail-rail-tags">
                {detail.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            ) : null}
            {detail.meta ? <p className="hover-detail-rail-meta">{detail.meta}</p> : null}
          </motion.div>
        ) : (
          <motion.div
            key="fallback"
            className="hover-detail-rail-body hover-detail-rail-empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <p className="hover-detail-rail-label">Preview rail</p>
            <p className="hover-detail-rail-description">{hint}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
