import { useEffect, useState } from 'react';

/**
 * True once the page has scrolled past `threshold`. Drives the nav bar's
 * transition from transparent-over-hero to a solid, bordered bar — the
 * standard premium-site pattern where chrome adapts to context instead
 * of sitting on top of content at a fixed opacity throughout.
 */
export function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
