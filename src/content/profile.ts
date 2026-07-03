/**
 * profile.ts
 * Central source of truth for the portfolio headline, summary copy,
 * and contact details. Edit this file first when updating personal branding.
 */

import resumePdf from './resume.pdf';
import harshrj from './HarshRJ.jpg';

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
  image: harshrj,
  name: 'Harsh Raj Jaiswal',
  callsign: 'Harsh Raj Jaiswal',
  role: 'Aerospace Engineer',
  focus: 'Orbital Mechanics  ·  CFD  ·  Aerodynamics  ·  UAV Systems',
  location: 'Kathmandu, Nepal',
  education: 'B.E. Aerospace Engineering, Chandigarh University — Class of 2025',
  heroHeadline:
    'Simulation-led aerospace engineering across orbital mechanics, CFD, structural analysis, and UAV systems',
  heroBullets: [
    '',
  ],
  missionBrief:
    'A simulation-first approach to aerospace engineering: model the system, run the analysis, validate against real constraints. Work spans structural analysis, CFD, orbital mechanics, and UAV power systems, backed by hands-on maintenance experience with transport aircraft at Nepal Airlines Corporation.',
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
    phone: '+977 9821136610',
    email: 'harshrajjaiswal176@gmail.com',
    website: 'harshrajjaiswal.com.np',
    github: 'github.com/HarshRJ176',
    linkedin: 'linkedin.com/in/harshrj',
    resume: resumePdf,
  } satisfies ContactProfile,
} as const;
