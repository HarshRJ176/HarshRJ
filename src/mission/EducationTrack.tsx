import { useMemo, useRef, useState } from 'react';

import { education } from '../content/education';
import { SectionHeading } from '../ui/SectionHeading';
import { Panel } from '../ui/Panel';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { DetailModal } from '../ui/DetailModal';
import { HoverDetailRail, type HoverDetail } from '../ui/HoverDetailRail';

export function EducationTrack() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  const defaultId = education[0]?.id ?? null;
  const [hoveredId, setHoveredId] = useState<string | null>(defaultId);
  const [activeId, setActiveId] = useState<string | null>(null);

  const previewEntry = education.find((entry) => entry.id === (activeId ?? hoveredId)) ?? null;
  const modalEntry = education.find((entry) => entry.id === activeId) ?? null;

  const detail = useMemo<HoverDetail | null>(() => {
    if (!previewEntry) return null;
    return {
      title: previewEntry.title,
      subtitle: previewEntry.institution,
      description: previewEntry.summary,
      bullets: previewEntry.details,
      meta: previewEntry.period,
    };
  }, [previewEntry]);

  return (
    <section id="education" ref={sectionRef} className="mission-section">
      <SectionHeading code="03" kicker="Education" title="Academic Track" />

      <div className="section-with-rail">
        <div className="section-main">
          <div className="education-list">
            {education.map((entry) => (
              <Panel
                key={entry.id}
                as="article"
                className="education-card"
                data-reveal
                onMouseEnter={() => setHoveredId(entry.id)}
                onMouseLeave={() => setHoveredId(activeId ?? defaultId)}
                onFocus={() => setHoveredId(entry.id)}
                onBlur={() => setHoveredId(activeId ?? defaultId)}
              >
                <div className="education-card-header">
                  <span className="education-period">{entry.period}</span>
                  <button type="button" className="detail-trigger" onClick={() => setActiveId(entry.id)}>
                    Pin detail
                  </button>
                </div>
                <h3>{entry.title}</h3>
                <p className="education-institution">{entry.institution}</p>
                <p>{entry.summary}</p>
              </Panel>
            ))}
          </div>
        </div>

        <HoverDetailRail
          code="03"
          kicker="Academic detail"
          title="Educational timeline"
          hint="Hover a card to inspect the full academic note. Click to pin it in a modal."
          detail={detail}
          className="section-rail"
        />
      </div>

      <DetailModal
        open={Boolean(modalEntry)}
        title={modalEntry?.title ?? ''}
        subtitle={modalEntry?.institution}
        description={modalEntry?.summary ?? ''}
        bullets={modalEntry?.details ?? []}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
}
