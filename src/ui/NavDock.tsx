import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { profile } from '../content/profile';
import { missionSections } from '../content/nav';
import { contactChannels } from '../content/contact';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavDockProps {
  visible: boolean;
}

const FOOTER_LABELS = ['Email', 'LinkedIn', 'GitHub'];

export function NavDock({ visible }: NavDockProps) {
  const activeId = useActiveSection(visible);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const footerLinks = contactChannels.filter((channel) => FOOTER_LABELS.includes(channel.label));

  // Lock page scroll while the overlay is open.
  useEffect(() => {
    document.documentElement.classList.toggle('nav-menu-open', menuOpen);
    return () => document.documentElement.classList.remove('nav-menu-open');
  }, [menuOpen]);

  // Escape closes the overlay. On open, move focus into the menu (first
  // link) so keyboard users land somewhere meaningful; on close, restore
  // focus to whatever triggered it (the toggle button) rather than letting
  // it fall through to whatever's next in the underlying page — matches
  // DetailModal's focus-management pattern.
  useEffect(() => {
    if (!menuOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    firstLinkRef.current?.focus();
    const toggleButton = toggleRef.current;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      (previouslyFocused.current ?? toggleButton)?.focus();
    };
  }, [menuOpen]);

  if (!visible) return null;

  const closeMenu = () => setMenuOpen(false);

  const scrollToTop = () => {
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className="nav-dock"
        aria-label="Mission sections"
        initial={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <button type="button" className="nav-dock-brand" onClick={scrollToTop}>
          {profile.callsign}
        </button>

        <button
          type="button"
          ref={toggleRef}
          className={`nav-dock-toggle${menuOpen ? ' is-open' : ''}`}
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
          <span className="nav-dock-toggle-label">{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </motion.nav>

      {/*
        Full-page nav overlay: the scrim covers the entire viewport (dims
        everything behind it, so opening the menu reads as a page-level
        takeover, not a small popover) while the link column sits right-
        aligned within it. role="dialog" + focus management above make
        this behave like a real modal for keyboard/screen-reader users,
        not just visually.
      */}
      <div
        className={`nav-overlay${menuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      >
        <div className="nav-overlay-panel" onClick={(event) => event.stopPropagation()}>
          <span className="nav-overlay-kicker">Navigate</span>

          <ul id="nav-dock-menu" className="nav-overlay-list">
            {missionSections.map((section, index) => (
              <li key={section.id}>
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={`#${section.id}`}
                  className={activeId === section.id ? 'is-active' : ''}
                  aria-current={activeId === section.id ? 'true' : undefined}
                  tabIndex={menuOpen ? 0 : -1}
                  style={{ transitionDelay: menuOpen ? `${index * 45}ms` : '0ms' }}
                  onClick={closeMenu}
                >
                  <span className="nav-overlay-index">{section.code}</span>
                  <span className="nav-overlay-label">{section.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-overlay-footer">
            {footerLinks.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                tabIndex={menuOpen ? 0 : -1}
                target={channel.label === 'Email' ? undefined : '_blank'}
                rel={channel.label === 'Email' ? undefined : 'noreferrer'}
              >
                {channel.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
