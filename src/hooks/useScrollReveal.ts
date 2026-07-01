import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Attach to any section wrapper; every direct-or-nested descendant marked
 * `data-reveal` fades and rises into place once, staggered, the first
 * time the section crosses 80% up the viewport. Kept separate from the
 * cinematic opening/docking timelines — this is generic section polish
 * (SAIS Phase 3), not part of the frozen narrative sequence.
 */
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>('[data-reveal]');
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, [containerRef]);
}
