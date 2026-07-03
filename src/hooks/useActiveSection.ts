import { useEffect, useState } from 'react';

import { missionSections } from '../content/nav';
import { flightState } from '../engine/flightState';

/**
 * Powers the nav dock's active-state indicator AND the orbit markers in
 * the 3D scene (flightState.activeSectionIndex) — one observer, one
 * source of truth for "which section is in view."
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
        if (!visible) return;

        setActiveId(visible.target.id);
        const index = missionSections.findIndex((s) => s.id === visible.target.id);
        if (index !== -1) flightState.activeSectionIndex = index;
      },
      { threshold: 0.35, rootMargin: '-10% 0px -40% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return activeId;
}
