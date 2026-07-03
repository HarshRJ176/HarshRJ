export interface EducationEntry {
  id: string;
  period: string;
  title: string;
  institution: string;
  summary: string;
  details: string[];
}

/**
 * Academic track in chronological order.
 *
 * NOTE: a Class 12 entry was here with placeholder text ("Update exact
 * school and board before publishing") and was live on the deployed site.
 * Removed rather than shipped incomplete — add it back with your real
 * institution, board, and result once you have them:
 *
 *   { id: 'class-12', period: '...', title: 'Higher Secondary Education',
 *     institution: '<your school>', summary: '<board + result>', details: [...] }
 */
export const education: EducationEntry[] = [
  {
    id: 'class-10',
    period: 'Completed',
    title: 'Class 10',
    institution: 'DAV Sushil Kedia Vishwa Bharati',
    summary: 'Secondary education completed with a 94% result and a strong base in mathematics and science.',
    details: [
      'Built the early academic foundation that later supported engineering study.',
      'Strong performance in quantitative subjects helped prepare for aerospace coursework.',
    ],
  },
  {
    id: 'bachelors',
    period: 'Aug 2021 — Jul 2025',
    title: 'B.E. Aerospace Engineering',
    institution: 'Chandigarh University',
    summary:
      'Degree work covering aerodynamics, propulsion, flight mechanics, structures, and orbital mechanics.',
    details: [
      'Used the degree to build the engineering base for simulation, structures, and UAV work.',
      'Final-year and project work shaped the portfolio’s current aerospace direction.',
    ],
  },
  {
    id: 'gap-year',
    period: '2025 — Present',
    title: 'Portfolio and Research Year',
    institution: 'Independent aerospace work',
    summary:
      'Using the gap period to refine the portfolio, complete research outputs, and prepare targeted applications.',
    details: [
      'Improving publication-quality writing, figure sets, and technical summaries.',
      'Using the year to strengthen the next role or master’s application with better evidence.',
    ],
  },
];
