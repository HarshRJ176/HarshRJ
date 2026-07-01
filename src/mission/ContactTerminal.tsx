import { useRef } from 'react';

import { profile } from '../content/profile';
import { contactChannels } from '../content/contact';
import { SectionHeading } from '../ui/SectionHeading';
import { Panel } from '../ui/Panel';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function ContactTerminal() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section id="contact" ref={sectionRef} className="mission-section mission-section-final">
      <SectionHeading code="07" kicker="Contact" title="Open Channel" />

      <div className="contact-summary panel" data-reveal>
        <p>
          Public contact channels for recruiters, academic reviewers, and collaboration requests.
          Every field stays visible, copyable, and directly clickable.
        </p>
      </div>

      <div className="contact-grid">
        {contactChannels.map((channel) => (
          <Panel key={channel.label} className="contact-channel-card" data-reveal>
            <span className="contact-channel-label">{channel.label}</span>
            <a
              className="contact-channel-value"
              href={channel.href}
              target={channel.label === 'Email' || channel.label === 'Phone' || channel.label === 'Resume' ? undefined : '_blank'}
              rel={channel.label === 'Email' || channel.label === 'Phone' || channel.label === 'Resume' ? undefined : 'noreferrer'}
              title={channel.value}
              aria-label={`${channel.label}: ${channel.value}`}
            >
              {channel.value}
            </a>
          </Panel>
        ))}
      </div>

      <p className="terminal-footer">
        {profile.location} · Personal aerospace portfolio · editable from src/content/profile.ts and src/content/contact.ts
      </p>
    </section>
  );
}
