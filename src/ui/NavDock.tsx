import { motion } from 'framer-motion';

import { profile } from '../content/profile';
import { missionSections } from '../content/nav';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavDockProps {
  visible: boolean;
}

export function NavDock({ visible }: NavDockProps) {
  const activeId = useActiveSection(visible);

  if (!visible) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="nav-dock"
      aria-label="Mission sections"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <button type="button" className="nav-dock-brand" onClick={scrollToTop}>
        {profile.callsign}
      </button>

      <ul>
        {missionSections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={activeId === section.id ? 'is-active' : ''}
              aria-current={activeId === section.id ? 'true' : undefined}
            >
              <span className="nav-dock-code">{section.code}</span>
              <span className="nav-dock-label">{section.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
