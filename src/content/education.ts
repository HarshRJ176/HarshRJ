export interface EducationEntry {
  id: string;
  period: string;
  title: string;
  institution: string;
  summary: string;
  details: string[];
}

/**
 * Academic track in chronological order. The class 12 entry is kept editable
 * so you can replace the exact school/board/percentage before publication.
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
    id: 'class-12',
    period: 'Pre-university stage',
    title: 'Higher Secondary Education',
    institution: 'Update exact school and board before publishing',
    summary:
      'Pre-university science foundation in mathematics and physics. Replace this line with your exact Class 12 institution and marks before final publication.',
    details: [
      'Keep this entry in the timeline so the full academic path reads clearly for recruiters.',
      'Edit the institution, board, and score once you want the site to go public.',
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
