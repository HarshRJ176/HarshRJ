import { useRef } from 'react';

import { skillClusters } from '../content/skills';
import { SectionHeading } from '../ui/SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function OrbitalSkillsNetwork() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section id="skills" ref={sectionRef} className="mission-section">
      <SectionHeading code="07" kicker="Skills" title="Technical Skills" />

      <div className="skills-grid" data-reveal>
        {skillClusters.map((cluster) => (
          <article key={cluster.id} className="skills-card">
            <h3>{cluster.label}</h3>
            <p className="skills-summary">{cluster.summary}</p>
            <ul className="tech-tag-list skills-tag-list">
              {cluster.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
