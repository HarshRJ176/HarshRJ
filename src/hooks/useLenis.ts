import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis drives the physical scroll easing; GSAP's ticker drives Lenis so
 * both stay on the same clock, and ScrollTrigger.update is wired to
 * Lenis's scroll event so scroll-linked timelines (see
 * cinematic/useScrollNarrative.ts) stay in sync. Only constructed once
 * `enabled` is true — the opening cinematic keeps native scroll locked via
 * body overflow until it hands off (SAIS Section 6, "12s Scroll enabled").
 */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off('scroll', onScroll);
      lenis.destroy();
    };
  }, [enabled]);
}
