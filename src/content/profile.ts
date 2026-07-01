/**
 * profile.ts
 * Central source of truth for the portfolio headline, summary copy,
 * and contact details. Edit this file first when updating personal branding.
 */

import resumePdf from './resume.pdf';

export interface ProfileMetric {
  label: string;
  value: string;
}

export interface ContactProfile {
  address: string;
  phone: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
  resume: string;
}

export const profile = {
  name: 'Harsh Raj Jaiswal',
  callsign: 'H. R. JAISWAL',
  role: 'Aerospace Engineer',
  focus: 'Orbital Mechanics · CFD · Structural Analysis · UAV Systems',
  location: 'Kathmandu, Nepal',
  education: 'B.E. Aerospace Engineering, Chandigarh University — Class of 2025',
  heroHeadline:
    'Simulation-led aerospace work spanning orbital mechanics, CFD, structures, and UAV systems. The portfolio is built so recruiters can read the profile in under a minute, then inspect the evidence below.',
  heroBullets: [
    'B.E. Aerospace Engineering, Chandigarh University, Class of 2025 — aerospace foundation across aerodynamics, propulsion, flight mechanics, structures, and orbital mechanics.',
    'Engineering Maintenance Intern at Nepal Airlines Corporation — documentation, line-workflow discipline, and transport-aircraft exposure.',
    'Research and projects focus on solar UAVs, nozzle studies, structural optimisation, and publication-track writing.',
  ],
  missionBrief:
    'This portfolio keeps the story technical and compact: first the profile, then the evidence. The sections below document academic work, internship exposure, research direction, and the tools used to support each result.',
  missionCards: [
    {
      label: 'Method',
      value: 'Model → simulate → validate',
    },
    {
      label: 'Focus',
      value: 'Orbital mechanics, CFD, structures, UAV systems',
    },
    {
      label: 'Direction',
      value: 'Applications, research, publication readiness',
    },
  ] satisfies ProfileMetric[],
  contact: {
    address: 'Kathmandu, Nepal',
    phone: '+977 98XXXXXXXX',
    email: 'harsh.raj.jaiswal@harshj.com.np',
    website: 'harshj.com.np',
    github: 'github.com/harsh-raj-jaiswal',
    linkedin: 'linkedin.com/in/harsh-raj-jaiswal',
    resume: resumePdf,
  } satisfies ContactProfile,
} as const;
