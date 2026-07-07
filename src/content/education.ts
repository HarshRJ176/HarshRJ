export interface EducationEntry {
  id: string;
  period: string;
  title: string;
  institution: string;
  summary: string;
  details: string[];
}

export const education: EducationEntry[] = [
  {
    id: 'class-10',
    period: '2019',
    title: 'Class 10',
    institution: 'Delhi Public School, Lipimal, Bara',
    summary: 'Completed secondary education under the CBSE board with a strong base in mathematics and science.',
    details: [
      'Studied physical science and general science foundations at the secondary level.',
      'Built early discipline in quantitative subjects and analytical thinking.',
    ],
  },
  {
    id: 'class-12',
    period: '2021',
    title: 'Class 12',
    institution: 'DAV Sushil Kedia Vishwa Bharati, Lalitpur',
    summary: 'Completed higher secondary education in the science stream with physical and computer science.',
    details: [
      'Strengthened preparation for engineering study through science-based coursework.',
      'Built a stronger technical base before entering aerospace engineering.',
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
];
