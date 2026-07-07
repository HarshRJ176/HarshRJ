import { useMemo, useRef, useState } from 'react';

import { certificates } from '../content/certificates';
import { SectionHeading } from '../ui/SectionHeading';
import { Panel } from '../ui/Panel';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { DetailModal } from '../ui/DetailModal';
import { HoverDetailRail, type HoverDetail } from '../ui/HoverDetailRail';

const previewCount = 8;

export function CertificatesVault() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  const defaultId = certificates[0]?.id ?? null;
  const [hoveredId, setHoveredId] = useState<string | null>(defaultId);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const previewEntry = certificates.find((entry) => entry.id === (activeId ?? hoveredId)) ?? null;
  const modalEntry = certificates.find((entry) => entry.id === activeId) ?? null;

  const visibleCertificates = showAll ? certificates : certificates.slice(0, previewCount);

  const detail = useMemo<HoverDetail | null>(() => {
    if (!previewEntry) return null;
    const actions = [];
    if (previewEntry.verifyLink) {
      actions.push({ label: 'Open verification link', href: previewEntry.verifyLink });
    }
    actions.push({ label: 'Open PDF', href: previewEntry.pdfUrl });
    return {
      title: previewEntry.title,
      subtitle: previewEntry.issuer,
      description: previewEntry.summary,
      bullets: [
        previewEntry.category,
        previewEntry.date ? `Issued or completed: ${previewEntry.date}` : 'Verified credential',
        previewEntry.verifyLink ? 'External verification available' : 'PDF record available',
      ],
      tags: [previewEntry.category],
      meta: previewEntry.verifyLink ? 'Verified source' : 'Document proof',
      actions,
    };
  }, [previewEntry]);

  const modalActions = modalEntry
    ? [
        ...(modalEntry.verifyLink ? [{ label: 'Open verification link', href: modalEntry.verifyLink }] : []),
        { label: 'Open PDF', href: modalEntry.pdfUrl },
      ]
    : [];

  return (
    <section id="certificates" ref={sectionRef} className="mission-section">
      <SectionHeading code="05" kicker="Certificates" title="Verified Credentials" />

      <div className="section-with-rail">
        <div className="section-main">
          <p className="certificate-intro" data-reveal>
            A verified record of completed coursework, technical learning, software training, and professional development.
          </p>

          <div className="certificate-toolbar" data-reveal>
            <button type="button" className="detail-trigger" onClick={() => setShowAll((current) => !current)}>
              {showAll ? 'Show fewer certificates' : 'View more certificates'}
            </button>
            <span className="certificate-count">
              Showing {visibleCertificates.length} of {certificates.length}
            </span>
          </div>

          <div className="certificate-grid">
            {visibleCertificates.map((certificate) => (
              <Panel
                key={certificate.id}
                as="article"
                className="certificate-card"
                data-reveal
                onMouseEnter={() => setHoveredId(certificate.id)}
                onMouseLeave={() => setHoveredId(activeId ?? defaultId)}
                onFocus={() => setHoveredId(certificate.id)}
                onBlur={() => setHoveredId(activeId ?? defaultId)}
              >
                <div className="certificate-card-header">
                  <span className="certificate-issuer">{certificate.issuer}</span>
                  <span className="certificate-category">{certificate.category}</span>
                </div>
                <h3>{certificate.title}</h3>
                <p className="certificate-summary">{certificate.summary}</p>
                <button type="button" className="detail-trigger" onClick={() => setActiveId(certificate.id)}>
                  Pin detail
                </button>
              </Panel>
            ))}
          </div>
        </div>

        <HoverDetailRail
          code="LIVE"
          kicker="Certificate detail"
          title="Credential vault"
          hint="Hover a certificate to inspect its verification note. Click to pin the full record in a modal."
          detail={detail}
          className="section-rail"
        />
      </div>

      <DetailModal
        open={Boolean(modalEntry)}
        title={modalEntry?.title ?? ''}
        subtitle={modalEntry?.issuer}
        description={modalEntry?.summary ?? ''}
        bullets={[
          modalEntry?.category ?? '',
          modalEntry?.date ? `Issued or completed: ${modalEntry.date}` : 'Verified credential',
          modalEntry?.verifyLink ? 'External verification available' : 'PDF record available',
        ].filter(Boolean) as string[]}
        actions={modalActions}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
}
