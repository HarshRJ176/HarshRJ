import { useMemo, useRef, useState } from 'react';

import { projects } from '../content/projects';
import { SectionHeading } from '../ui/SectionHeading';
import { Panel } from '../ui/Panel';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { DetailModal } from '../ui/DetailModal';
import { HoverDetailRail, type HoverDetail } from '../ui/HoverDetailRail';

export function ProjectsDockingBays() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  const defaultId = projects[0]?.id ?? null;
  const [hoveredId, setHoveredId] = useState<string | null>(defaultId);
  const [activeId, setActiveId] = useState<string | null>(null);

  const previewProject = projects.find((project) => project.id === (activeId ?? hoveredId)) ?? null;
  const modalProject = projects.find((project) => project.id === activeId) ?? null;

  const detail = useMemo<HoverDetail | null>(() => {
    if (!previewProject) return null;
    const actions = previewProject.report
      ? [{ label: previewProject.report.label, href: previewProject.report.href }]
      : [];

    return {
      title: previewProject.title,
      subtitle: previewProject.callsign,
      description: previewProject.summary,
      bullets: previewProject.details,
      tags: previewProject.stack,
      meta: 'Completed engineering project',
      actions,
    };
  }, [previewProject]);

  const modalActions = modalProject?.report
    ? [{ label: modalProject.report.label, href: modalProject.report.href }]
    : [];

  return (
    <section id="projects" ref={sectionRef} className="mission-section">
      <SectionHeading code="04" kicker="Projects" title="Engineering Projects" />

      <div className="section-with-rail">
        <div className="section-main">
          <div className="docking-bay-grid">
            {projects.map((project) => (
              <Panel
                key={project.id}
                as="article"
                className="docking-bay-card"
                data-reveal
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(activeId ?? defaultId)}
                onFocus={() => setHoveredId(project.id)}
                onBlur={() => setHoveredId(activeId ?? defaultId)}
              >
                <div className="docking-bay-card-header">
                  <span className="project-card-code">{project.callsign}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <button type="button" className="detail-trigger" onClick={() => setActiveId(project.id)}>
                  View details
                </button>
                <ul className="tech-tag-list">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </Panel>
            ))}
          </div>
        </div>

        <HoverDetailRail
          code="LIVE"
          kicker="Project detail"
          title="Project overview"
          hint="Hover a project card to inspect the technical summary, then click to pin the full note in a modal."
          detail={detail}
          className="section-rail"
        />
      </div>

      <DetailModal
        open={Boolean(modalProject)}
        title={modalProject?.title ?? ''}
        subtitle={modalProject?.callsign}
        description={modalProject?.summary ?? ''}
        bullets={modalProject?.details ?? []}
        actions={modalActions}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
}
