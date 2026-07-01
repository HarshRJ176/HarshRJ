/**
 * flightState.ts
 *
 * A single mutable object that GSAP timelines write to and that R3F scene
 * objects read from inside useFrame(). This is intentional: driving WebGL
 * animation through React state would force a re-render on every tick.
 * GSAP already runs its own high-resolution ticker, so scene objects simply
 * read the latest values each frame — no subscriptions, no re-renders.
 *
 * Discrete UI stage changes (mounting/unmounting DOM labels) go through
 * React state instead — see cinematic/useOpeningTimeline.ts — since those
 * happen a handful of times, not 60x/second.
 */

export interface FlightState {
  // --- Opening sequence (SAIS Section 6), each 0..1 ---
  starsOpacity: number;
  nebulaOpacity: number;
  sunGlowOpacity: number;
  earthRevealT: number;
  missionReadyOpacity: number;
  cameraIntroT: number;

  /** Idle rotation multiplier once Earth begins its slow spin (beat 6). */
  earthIdleSpin: number;

  /** True once the 12s opening timeline has finished and scroll unlocks. */
  openingComplete: boolean;

  // --- Scroll narrative (SAIS Section 7), 0..1 across the hero scroll span ---
  scrollProgress: number;
}

export const flightState: FlightState = {
  starsOpacity: 0,
  nebulaOpacity: 0,
  sunGlowOpacity: 0,
  earthRevealT: 0,
  missionReadyOpacity: 0,
  cameraIntroT: 0,
  earthIdleSpin: 0,
  openingComplete: false,
  scrollProgress: 0,
};

/** Resets everything to the pre-launch state. Used by reduced-motion skip. */
export function resetFlightState() {
  flightState.starsOpacity = 0;
  flightState.nebulaOpacity = 0;
  flightState.sunGlowOpacity = 0;
  flightState.earthRevealT = 0;
  flightState.missionReadyOpacity = 0;
  flightState.cameraIntroT = 0;
  flightState.earthIdleSpin = 0;
  flightState.openingComplete = false;
  flightState.scrollProgress = 0;
}

/** Jumps straight to "opening finished" — used for reduced-motion / skip. */
export function completeFlightState() {
  flightState.starsOpacity = 1;
  flightState.nebulaOpacity = 1;
  flightState.sunGlowOpacity = 1;
  flightState.earthRevealT = 1;
  flightState.missionReadyOpacity = 1;
  flightState.cameraIntroT = 1;
  flightState.earthIdleSpin = 1;
  flightState.openingComplete = true;
}
