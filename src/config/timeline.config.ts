/**
 * timeline.config.ts
 * Faster opening beats so the page becomes readable almost immediately.
 * The SAIS sequence is still preserved in order, but the total intro time
 * is intentionally shorter for recruiter-facing use.
 */

export const openingBeats = {
  blackScreen: 0,
  starsFadeIn: 0.08,
  nebulaAppears: 0.2,
  sunGlow: 0.32,
  earthReveal: 0.48,
  earthRotation: 0.66,
  holographicIdentity: 0.82,
  missionReady: 0.98,
  scrollEnabled: 1.08,
} as const;

export type OpeningStage = keyof typeof openingBeats;

export const openingStageOrder: OpeningStage[] = [
  'blackScreen',
  'starsFadeIn',
  'nebulaAppears',
  'sunGlow',
  'earthReveal',
  'earthRotation',
  'holographicIdentity',
  'missionReady',
  'scrollEnabled',
];

export const openingTotalDuration = openingBeats.scrollEnabled;
