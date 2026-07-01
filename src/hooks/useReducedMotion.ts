import { useEffect, useState } from 'react';

/**
 * SAIS Section 9 calls for "accessibility-first interactions." The
 * cinematic opening and scroll-narrative both check this before running
 * any GSAP timeline, and skip straight to the settled end-state instead.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
}
