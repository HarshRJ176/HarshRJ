import { useRef } from 'react';

import { profile } from '../content/profile';
import { contactChannels } from '../content/contact';
import { SectionHeading } from '../ui/SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function ContactTerminal() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section id="contact" ref={sectionRef} className="mission-section mission-section-final">
      <SectionHeading code="08" kicker="Contact" title="Open Channel" />

      <div className="contact-list panel" data-reveal>
        {contactChannels.map((channel) => (
          <a
            key={channel.label}
            className="contact-row"
            href={channel.href}
            target={channel.label === 'Email' || channel.label === 'Phone' || channel.label === 'Resume' ? undefined : '_blank'}
            rel={channel.label === 'Email' || channel.label === 'Phone' || channel.label === 'Resume' ? undefined : 'noreferrer'}
          >
            <span className="contact-row-label">{channel.label}</span>
            <span className="contact-row-value">{channel.value}</span>
          </a>
        ))}
      </div>

      <p className="terminal-footer">
        Aerospace engineering portfolio · {new Date().getFullYear()}
      </p>
    </section>
  );
}
