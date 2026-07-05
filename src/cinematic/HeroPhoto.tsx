import { useState } from 'react';

import { profile } from '../content/profile';

/**
 * Renders profile.photo (public/profile-photo.jpg) if it exists. If the
 * file is missing — which it is until you add one — this falls back to a
 * clean monogram avatar instead of a broken image icon, so the hero never
 * looks unfinished either way.
 */
export function HeroPhoto() {
  const [failed, setFailed] = useState(false);

  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="hero-photo-frame">
      {!failed ? (
        <img
          src={profile.photo}
          alt={profile.name}
          className="hero-photo-img"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="hero-photo-fallback" aria-hidden="true">
          {initials}
        </div>
      )}
      <span className="hero-photo-ring" aria-hidden="true" />
    </div>
  );
}
