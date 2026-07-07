/**
 * timeline.config.ts
 * Faster opening beats so the page becomes readable almost immediately.
 * The sequence is still preserved in order, but the total intro time is
 * intentionally shorter for recruiter-facing use.
 */

export const openingBeats = {
  blackScreen: 0,
  starsFadeIn: 0.04,
  nebulaAppears: 0.12,
  sunGlow: 0.2,
  earthReveal: 0.3,
  earthRotation: 0.42,
  holographicIdentity: 0.55,
  missionReady: 0.68,
  scrollEnabled: 0.76,
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
