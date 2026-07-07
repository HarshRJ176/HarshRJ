import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 780px)';

/**
 * True for phone-width viewports (and matches on resize/rotation).
 * Used in two places: NavDock (switch to a hamburger + drawer instead of
 * the inline link row) and the 3D engine (drop render cost that phones
 * can't afford — see SceneCanvas, Effects, Environment).
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return isMobile;
}
