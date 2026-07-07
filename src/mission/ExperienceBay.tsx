import { useMemo, useRef, useState } from 'react';

import { experience } from '../content/experience';
import { SectionHeading } from '../ui/SectionHeading';
import { Panel } from '../ui/Panel';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { DetailModal } from '../ui/DetailModal';
import { HoverDetailRail, type HoverDetail } from '../ui/HoverDetailRail';

const kindLabel: Record<(typeof experience)[number]['kind'], string> = {
  education: 'Education',
  role: 'Internship',
  research: 'Research',
};

export function ExperienceBay() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  const defaultId = experience[0]?.id ?? null;
  const [hoveredId, setHoveredId] = useState<string | null>(defaultId);
  const [activeId, setActiveId] = useState<string | null>(null);

  const previewEntry = experience.find((entry) => entry.id === (activeId ?? hoveredId)) ?? null;
  const modalEntry = experience.find((entry) => entry.id === activeId) ?? null;

  const detail = useMemo<HoverDetail | null>(() => {
    if (!previewEntry) return null;
    return {
      title: previewEntry.title,
      subtitle: previewEntry.org,
      description: previewEntry.summary,
      bullets: previewEntry.details,
      meta: previewEntry.period,
      actions: previewEntry.attachments?.map((attachment) => ({
        label: attachment.label,
        href: attachment.href,
      })),
    };
  }, [previewEntry]);

  return (
    <section id="experience" ref={sectionRef} className="mission-section">
      <SectionHeading code="02" kicker="Experience" title="Professional Experience" />

      <div className="section-with-rail section-with-rail-experience">
        <div className="section-main">
          <ol className="experience-timeline">
            {experience.map((entry) => (
              <li key={entry.id} className={`experience-item kind-${entry.kind}`} data-reveal>
                <div className="experience-marker" aria-hidden="true" />
                <Panel
                  className="experience-content"
                  as="article"
                  onMouseEnter={() => setHoveredId(entry.id)}
                  onMouseLeave={() => setHoveredId(activeId ?? defaultId)}
                  onFocus={() => setHoveredId(entry.id)}
                  onBlur={() => setHoveredId(activeId ?? defaultId)}
                >
                  <div className="experience-meta">
                    <span className="experience-period">{entry.period}</span>
                    <span className="experience-kind">{kindLabel[entry.kind]}</span>
                  </div>
                  <h3>{entry.title}</h3>
                  <p className="experience-org">{entry.org}</p>
                  <p>{entry.summary}</p>
                  <button type="button" className="detail-trigger" onClick={() => setActiveId(entry.id)}>
                    View details
                  </button>
                </Panel>
              </li>
            ))}
          </ol>
        </div>

        <HoverDetailRail
          code="LIVE"
          kicker="Experience detail"
          title="Experience snapshot"
          hint="Hover the internship card to inspect the full note. Click to pin the detail in a modal."
          detail={detail}
          className="section-rail section-rail-experience"
        />
      </div>

      <DetailModal
        open={Boolean(modalEntry)}
        title={modalEntry?.title ?? ''}
        subtitle={modalEntry?.org}
        description={modalEntry?.summary ?? ''}
        bullets={modalEntry?.details ?? []}
        actions={modalEntry?.attachments?.map((attachment) => ({
          label: attachment.label,
          href: attachment.href,
        }))}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
}
