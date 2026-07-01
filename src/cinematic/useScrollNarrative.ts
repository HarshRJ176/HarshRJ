import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { flightState } from '../engine/flightState';

gsap.registerPlugin(ScrollTrigger);

interface ScrollNarrativeOptions {
  /** Tall wrapper element whose scroll distance defines the docking span. */
  triggerRef: RefObject<HTMLElement | null>;
  /** Hero copy that emerges from behind Earth as it docks. */
  heroTextRef: RefObject<HTMLElement | null>;
  enabled: boolean;
}

/**
 * SAIS Section 7, verbatim: Earth rotates, Earth moves left, hero text
 * emerges from behind Earth, Earth docks to lower-left, Mission Brief
 * becomes active. All of it lives on one scrubbed GSAP timeline tied to
 * scroll position — flightState.scrollProgress and the hero text's
 * opacity/transform advance together, so there is exactly one source of
 * truth for "how far into the docking beat are we."
 */
export function useScrollNarrative({ triggerRef, heroTextRef, enabled }: ScrollNarrativeOptions) {
  useEffect(() => {
    if (!enabled) return;
    const trigger = triggerRef.current;
    const heroText = heroTextRef.current;
    if (!trigger || !heroText) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      tl.to(flightState, { scrollProgress: 1, ease: 'none' }, 0);

      // Hero copy recedes once Earth docks over it and Mission Brief
      // takes over — the entry fade already happened during the opening
      // cinematic (useOpeningTimeline), so this timeline only handles the
      // hand-off, not the initial reveal.
      tl.to(heroText, { autoAlpha: 0, y: -24, ease: 'none', duration: 0.25 }, 0.78);
    }, trigger);

    return () => ctx.revert();
  }, [triggerRef, heroTextRef, enabled]);
}
