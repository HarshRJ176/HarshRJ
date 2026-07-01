import { useRef } from 'react';

import { profile } from '../content/profile';
import { SectionHeading } from '../ui/SectionHeading';
import { Panel } from '../ui/Panel';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function MissionBrief() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section id="mission-brief" ref={sectionRef} className="mission-section">
      <SectionHeading code="01" kicker="Professional Overview" title="Who I Am" />

      <Panel className="mission-brief-panel" data-reveal>
        <p className="mission-brief-lead">{profile.missionBrief}</p>
        <ul className="mission-brief-bullets">
          {profile.heroBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Panel>

      <div className="mission-brief-stats" data-reveal>
        {profile.missionCards.map((card) => (
          <div key={card.label}>
            <span className="stat-value">{card.value}</span>
            <span className="stat-label">{card.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
