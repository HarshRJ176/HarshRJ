import { useMemo, useRef, useState } from 'react';

import { research } from '../content/research';
import { SectionHeading } from '../ui/SectionHeading';
import { Panel } from '../ui/Panel';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { DetailModal } from '../ui/DetailModal';
import { HoverDetailRail, type HoverDetail } from '../ui/HoverDetailRail';

export function ResearchArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  const defaultId = research[0]?.id ?? null;
  const [hoveredId, setHoveredId] = useState<string | null>(defaultId);
  const [activeId, setActiveId] = useState<string | null>(null);

  const previewEntry = research.find((entry) => entry.id === (activeId ?? hoveredId)) ?? null;
  const modalEntry = research.find((entry) => entry.id === activeId) ?? null;

  const detail = useMemo<HoverDetail | null>(() => {
    if (!previewEntry) return null;
    return {
      title: previewEntry.title,
      subtitle: previewEntry.status,
      description: previewEntry.summary,
      bullets: previewEntry.details,
      tags: previewEntry.targets,
      meta: 'Publication track',
    };
  }, [previewEntry]);

  return (
    <section id="research" ref={sectionRef} className="mission-section">
      <SectionHeading code="LIVE" kicker="Research" title="Research Archive" />

      <div className="section-with-rail">
        <div className="section-main">
          <div className="research-list">
            {research.map((entry) => (
              <Panel
                key={entry.id}
                as="article"
                className="research-card"
                data-reveal
                onMouseEnter={() => setHoveredId(entry.id)}
                onMouseLeave={() => setHoveredId(activeId ?? defaultId)}
                onFocus={() => setHoveredId(entry.id)}
                onBlur={() => setHoveredId(activeId ?? defaultId)}
              >
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <p className="research-status">{entry.status}</p>
                <button type="button" className="detail-trigger" onClick={() => setActiveId(entry.id)}>
                  Pin detail
                </button>
                <ul className="tech-tag-list">
                  {entry.targets.map((target) => (
                    <li key={target}>{target}</li>
                  ))}
                </ul>
              </Panel>
            ))}
          </div>
        </div>

        <HoverDetailRail
          code="LIVE"
          kicker="Publication detail"
          title="Paper pipeline"
          hint="Hover a paper track to inspect the current research note and target venues. Click to pin it in a modal."
          detail={detail}
          className="section-rail"
        />
      </div>

      <DetailModal
        open={Boolean(modalEntry)}
        title={modalEntry?.title ?? ''}
        subtitle={modalEntry?.status}
        description={modalEntry?.summary ?? ''}
        bullets={modalEntry?.details ?? []}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
}
