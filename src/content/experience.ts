export interface ExperienceEntry {
  id: string;
  period: string;
  title: string;
  org: string;
  summary: string;
  details: string[];
  kind: 'education' | 'role' | 'research';
}

/**
 * Experience Bay, newest first.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'nepal-airlines-intern',
    period: 'Jan 2025 — Jul 2025',
    title: 'Engineering Maintenance Intern',
    org: 'Nepal Airlines Corporation',
    summary:
      'Aircraft maintenance exposure across operational documentation, line-maintenance workflow, safety discipline, and practical familiarity with transport-category and regional aircraft systems.',
    details: [
      'Reviewed maintenance work orders, technical log entries, and day-to-day coordination across A320, A330, and DHC-6 Twin Otter operations.',
      'Observed the discipline behind line-maintenance workflow, inspection logic, task handover, and aircraft availability decisions.',
      'Built familiarity with safety-critical procedures, tool discipline, and the documentation trail that keeps maintenance decisions auditable.',
      'Learned how engineering intent, operational constraints, and record-keeping fit together in a live airline environment.',
    ],
    kind: 'role',
  },
  {
    id: 'uav-research',
    period: '2025 — Present',
    title: 'Independent Researcher',
    org: 'UAV Energy Systems',
    summary:
      'Researching solar-assisted UAV endurance, propulsion matching, and structural trade-offs with the goal of producing publication-ready work.',
    details: [
      'Studying solar energy integration, battery reserve strategy, and endurance-extension logic for small UAV platforms.',
      'Comparing structural mass reduction with stiffness retention so the design can move from concept to defensible engineering output.',
      'Preparing figures, comparison tables, and validation notes for publication-track writing rather than presentation-only material.',
      'Using the research phase to strengthen the best UAV and structures work for future journal submission and applications.',
    ],
    kind: 'research',
  },
];
