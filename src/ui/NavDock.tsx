import { motion } from 'framer-motion';

import { missionSections } from '../content/nav';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavDockProps {
  visible: boolean;
}

export function NavDock({ visible }: NavDockProps) {
  const activeId = useActiveSection(visible);

  if (!visible) return null;

  return (
    <motion.nav
      className="nav-dock"
      aria-label="Mission sections"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
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
