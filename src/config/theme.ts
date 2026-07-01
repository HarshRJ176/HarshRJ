/**
 * theme.ts
 * Design tokens shared between the WebGL scene and the DOM/UI layer.
 * Mirrors the CSS custom properties defined in src/styles/variables.css —
 * keep both in sync when changing palette or timing.
 */

export const palette = {
  bg: '#02040a',
  bgSoft: '#07111f',
  panel: 'rgba(10, 16, 28, 0.58)',
  panelStrong: 'rgba(7, 12, 22, 0.82)',
  border: 'rgba(190, 220, 255, 0.12)',
  borderStrong: 'rgba(190, 220, 255, 0.2)',
  text: 'rgba(255, 255, 255, 0.96)',
  textSoft: 'rgba(255, 255, 255, 0.72)',
  textFaint: 'rgba(255, 255, 255, 0.46)',
  accent: '#59d7ff',
  accent2: '#7d8dff',
  gold: '#d8b46a',
} as const;

/** Same colors as 0xRRGGBB numbers, for use inside Three.js materials/lights. */
export const sceneColor = {
  accent: 0x59d7ff,
  accent2: 0x7d8dff,
  gold: 0xd8b46a,
  sunCore: 0xfff4e0,
  sunHalo: 0xffd9a0,
  earthAtmosphere: 0x6fb7ff,
  void: 0x02040a,
} as const;

/** Easing curves used by both GSAP timelines and CSS transitions. */
export const easing = {
  cinematic: 'power3.out',
  cinematicIn: 'power2.in',
  soft: 'power1.inOut',
  expo: 'expo.out',
} as const;
