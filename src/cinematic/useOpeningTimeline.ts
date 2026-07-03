import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';

import { openingBeats, type OpeningStage } from '../config/timeline.config';
import { flightState, completeFlightState, resetFlightState } from '../engine/flightState';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface OpeningTimelineResult {
  stage: OpeningStage;
  openingComplete: boolean;
  skip: () => void;
}

/**
 * The hero is visible from the start. This timeline only orchestrates the
 * background scene and a subtle handoff into scroll control.
 */
export function useOpeningTimeline(
  heroTextRef?: RefObject<HTMLElement | null>,
): OpeningTimelineResult {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState<OpeningStage>('blackScreen');
  const [openingComplete, setOpeningComplete] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const completeOpening = useCallback(
    (targetStage: OpeningStage = 'scrollEnabled') => {
      flightState.openingComplete = true;
      completeFlightState();
      setStage(targetStage);
      setOpeningComplete(true);
      timelineRef.current?.kill();
      timelineRef.current = null;

      if (heroTextRef?.current) {
        heroTextRef.current.style.opacity = '1';
        heroTextRef.current.style.visibility = 'visible';
        heroTextRef.current.style.transform = 'none';
      }
    },
    [heroTextRef],
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      completeOpening();
      return;
    }

    resetFlightState();
    setOpeningComplete(false);

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => completeOpening(),
    });
    timelineRef.current = tl;

    tl.call(() => setStage('blackScreen'), [], openingBeats.blackScreen);

    tl.to(
      flightState,
      { starsOpacity: 1, duration: 0.45, ease: 'power1.out' },
      openingBeats.starsFadeIn,
    ).call(() => setStage('starsFadeIn'), [], openingBeats.starsFadeIn);

    tl.to(
      flightState,
      { nebulaOpacity: 1, duration: 0.45, ease: 'power1.out' },
      openingBeats.nebulaAppears,
    ).call(() => setStage('nebulaAppears'), [], openingBeats.nebulaAppears);

    tl.to(flightState, { sunGlowOpacity: 1, duration: 0.4 }, openingBeats.sunGlow).call(
      () => setStage('sunGlow'),
      [],
      openingBeats.sunGlow,
    );

    tl.to(
      flightState,
      { earthRevealT: 1, duration: 0.65, ease: 'power2.out' },
      openingBeats.earthReveal,
    ).call(() => setStage('earthReveal'), [], openingBeats.earthReveal);

    tl.to(
      flightState,
      { cameraIntroT: 1, duration: 1.1, ease: 'power2.out' },
      openingBeats.earthReveal,
    );

    tl.to(
      flightState,
      { earthIdleSpin: 1, duration: 0.55 },
      openingBeats.earthRotation,
    ).call(() => setStage('earthRotation'), [], openingBeats.earthRotation);

    if (heroTextRef?.current) {
      tl.set(heroTextRef.current, { autoAlpha: 1 }, openingBeats.holographicIdentity);
    }
    tl.call(
      () => setStage('holographicIdentity'),
      [],
      openingBeats.holographicIdentity,
    );

    tl.to(
      flightState,
      { missionReadyOpacity: 1, duration: 0.35 },
      openingBeats.missionReady,
    ).call(() => setStage('missionReady'), [], openingBeats.missionReady);

    tl.call(() => completeOpening(), [], openingBeats.scrollEnabled);

    return () => {
      tl.kill();
      timelineRef.current = null;
    };
  }, [prefersReducedMotion, heroTextRef, completeOpening]);

  const skip = () => {
    completeOpening();
  };

  return { stage, openingComplete, skip };
}
