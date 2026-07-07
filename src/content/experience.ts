export interface ExperienceEntry {
  id: string;
  period: string;
  title: string;
  org: string;
  summary: string;
  details: string[];
  attachments?: { label: string; href: string }[];
  kind: 'education' | 'role' | 'research';
}

/**
 * Experience section, newest first.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'nepal-airlines-intern',
    period: 'Jan 2025 — Jul 2025',
    title: 'Engineering Maintenance Intern',
    org: 'Nepal Airlines Corporation',
    summary:
      'Six-month engineering maintenance internship with exposure to commercial aircraft maintenance, documentation discipline, inspection routines, and aviation safety.',
    details: [
      'Reviewed maintenance work orders, technical log entries, and day-to-day coordination across A320, A330, and DHC-6 Twin Otter operations.',
      'Observed the discipline behind line-maintenance workflow, inspection logic, task handover, and aircraft availability decisions.',
      'Built familiarity with safety-critical procedures, tool discipline, and the documentation trail that keeps maintenance decisions auditable.',
      'Learned how engineering intent, operational constraints, and record-keeping fit together in a live airline environment.',
    ],
    attachments: [
      {
        label: 'Download internship certificate',
        href: '/documents/Nepal-Airlines-Internship-Certificate.pdf',
      },
    ],
    kind: 'role',
  },
];
