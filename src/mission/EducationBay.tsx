import { useMemo, useRef, useState } from 'react';

import { education } from '../content/education';
import { SectionHeading } from '../ui/SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function EducationBay() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const selected = useMemo(
    () => education.find((entry) => entry.id === activeId || entry.id === hoveredId) ?? education[0],
    [activeId, hoveredId],
  );

  return (
    <section id="education" ref={sectionRef} className="mission-section">
      <SectionHeading code="03" kicker="Education Deck" title="Academic Track" />

      <div className="interactive-section">
        <div className="interactive-list">
          {education.map((entry) => (
            <button
              key={entry.id}
              type="button"
              data-reveal
              className={`interactive-card ${selected.id === entry.id ? 'is-selected' : ''}`}
              onMouseEnter={() => setHoveredId(entry.id)}
              onMouseLeave={() => setHoveredId((current) => (current === entry.id ? null : current))}
              onFocus={() => setHoveredId(entry.id)}
              onBlur={() => setHoveredId((current) => (current === entry.id ? null : current))}
              onClick={() => setActiveId((current) => (current === entry.id ? null : entry.id))}
            >
              <div className="interactive-card-top">
                <span className="interactive-card-code">{entry.period}</span>
                <span className="interactive-card-status">Education</span>
              </div>
              <h3>{entry.title}</h3>
              <p className="interactive-card-org">{entry.institution}</p>
              <p className="interactive-card-summary">{entry.summary}</p>
            </button>
          ))}
        </div>

        <aside className="detail-board" aria-live="polite">
          <div className="detail-board-header">
            <div>
              <p className="detail-board-kicker">Hover or click for detail</p>
              <h3>{selected.title}</h3>
            </div>
            {activeId && (
              <button
                type="button"
                className="detail-close"
                aria-label="Close details"
                onClick={() => setActiveId(null)}
              >
                ×
              </button>
            )}
          </div>
          <p className="detail-board-org">{selected.institution}</p>
          <p className="detail-board-text">{selected.summary}</p>
          <ul className="detail-board-list">
            {selected.details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
