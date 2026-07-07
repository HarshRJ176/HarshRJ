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
  callsign: 'Harsh Raj Jaiswal',
  role: 'Aerospace Engineer',
  focus: 'CFD · Propulsion · UAV Systems · Orbital Mechanics',
  location: 'Kathmandu, Nepal',
  education: 'B.E. Aerospace Engineering, Chandigarh University — Class of 2025',
  // Path to your headshot, served from /public. Drop a real photo at
  // public/profile-photo.jpg (square, at least 480x480px) and it appears
  // automatically — until then, HeroPhoto shows a clean monogram fallback.
  photo: '/profile-photo.jpg',
  heroHeadline:
    'Aerospace engineer focused on CFD, propulsion, UAV systems, and orbital mechanics. Building stronger technical depth through analysis, project work, and practical engineering exposure.',
  heroBullets: [
    'Simulation-first engineering mindset across aerospace design and analysis',
    'Hands-on exposure to aircraft maintenance, UAV concepts, and propulsion studies',
  ],
  missionBrief:
    'I am an aerospace engineer with a strong interest in simulation-led design, propulsion, UAV systems, and orbital mechanics. My work is shaped by analysis, technical iteration, and practical engineering exposure under real constraints.',
  missionCards: [
    {
      label: 'Method',
      value: 'Model → simulate → validate',
    },
    {
      label: 'Focus',
      value: 'CFD, propulsion, UAV systems, orbital mechanics',
    },
    {
      label: 'Direction',
      value: 'Project work, technical depth, practical exposure',
    },
  ] satisfies ProfileMetric[],
  contact: {
    address: 'Kathmandu, Nepal',
    phone: '+977 9821136610',
    email: 'harsh.raj.jaiswal@harshrajjaiswal.com.np',
    website: 'harshrajjaiswal.com.np',
    github: 'github.com/HarshRJ176',
    linkedin: 'linkedin.com/in/harshrj',
    resume: resumePdf,
  } satisfies ContactProfile,
} as const;
