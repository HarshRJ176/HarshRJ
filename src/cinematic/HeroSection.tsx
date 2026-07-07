import { forwardRef, type RefObject } from 'react';

import { profile } from '../content/profile';
import { HeroPhoto } from './HeroPhoto';

interface HeroSectionProps {
  heroTextRef: RefObject<HTMLDivElement | null>;
}

/**
 * The hero is the primary recruiter-facing summary block — kept
 * deliberately tight. Full detail lives in the sections below; this is
 * the first impression, not a second resume.
 */
export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(function HeroSection(
  { heroTextRef },
  triggerRef,
) {
  return (
    <section ref={triggerRef} className="hero-scroll-span" aria-label="Introduction">
      <div className="hero-scroll-sticky">
        <div ref={heroTextRef} className="hero-copy">
          <HeroPhoto />

          <p className="hero-eyebrow">Professional Summary</p>
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-role">
            {profile.role} <span className="hero-role-divider">·</span> {profile.focus}
          </p>
          <p className="hero-headline">{profile.heroHeadline}</p>
        </div>
      </div>
    </section>
  );
});
