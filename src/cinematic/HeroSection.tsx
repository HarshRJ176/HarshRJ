import { forwardRef, type RefObject } from 'react';

import { profile } from '../content/profile';

interface HeroSectionProps {
  heroTextRef: RefObject<HTMLDivElement | null>;
}

/**
 * The hero is the primary recruiter-facing summary block.
 * It stays visible immediately so the page reads fast even while the
 * opening cinematic completes in the background.
 */
export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(function HeroSection(
  { heroTextRef },
  triggerRef,
) {
  return (
    <section ref={triggerRef} className="hero-scroll-span" aria-label="Introduction">
      <div className="hero-scroll-sticky">
        <div ref={heroTextRef} className="hero-copy">
          <p className="hero-eyebrow">Professional Summary</p>
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-role">
            {profile.role} <span className="hero-role-divider">·</span> {profile.focus}
          </p>
          <p className="hero-headline">{profile.heroHeadline}</p>

          <ul className="hero-bullet-list" aria-label="Profile highlights">
            {profile.heroBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

          <div className="hero-metric-grid" aria-label="Quick profile facts">
            <div>
              <span className="hero-metric-value">{profile.education}</span>
              <span className="hero-metric-label">Degree</span>
            </div>
            <div>
              <span className="hero-metric-value">{profile.location}</span>
              <span className="hero-metric-label">Base</span>
            </div>
            <div>
              <span className="hero-metric-value">Research + portfolio phase</span>
              <span className="hero-metric-label">Current focus</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
