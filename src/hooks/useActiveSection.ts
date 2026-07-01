import { useEffect, useState } from 'react';

import { missionSections } from '../content/nav';

/**
 * Powers the nav dock's active-state indicator. A single observer watches
 * every mission section at once rather than one observer per link.
 */
export function useActiveSection(enabled: boolean): string {
  const [activeId, setActiveId] = useState(missionSections[0]?.id ?? '');

  useEffect(() => {
    if (!enabled) return;

    const elements = missionSections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { threshold: 0.35, rootMargin: '-10% 0px -40% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return activeId;
}
