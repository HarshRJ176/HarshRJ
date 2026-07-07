import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { profile } from '../content/profile';
import { missionSections } from '../content/nav';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavDockProps {
  visible: boolean;
}

export function NavDock({ visible }: NavDockProps) {
  const activeId = useActiveSection(visible);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock page scroll while the mobile drawer is open (mirrors the
  // scroll-lock pattern already used for the opening cinematic in App.tsx).
  useEffect(() => {
    document.documentElement.classList.toggle('nav-menu-open', menuOpen);
    return () => document.documentElement.classList.remove('nav-menu-open');
  }, [menuOpen]);

  // Escape closes the drawer, matching DetailModal's keyboard behaviour.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // If the viewport grows back past the mobile breakpoint (tablet rotation,
  // resizing a browser window), don't leave a stale open drawer behind.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 781px)');
    const onChange = () => setMenuOpen(false);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  if (!visible) return null;

  const closeMenu = () => setMenuOpen(false);

  const scrollToTop = () => {
    closeMenu();
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

      <button
        type="button"
        className="nav-dock-toggle"
        aria-expanded={menuOpen}
        aria-controls="nav-dock-menu"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={`nav-dock-toggle-bars${menuOpen ? ' is-open' : ''}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <ul id="nav-dock-menu" className={menuOpen ? 'is-open' : ''}>
        {missionSections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={activeId === section.id ? 'is-active' : ''}
              aria-current={activeId === section.id ? 'true' : undefined}
              onClick={closeMenu}
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
