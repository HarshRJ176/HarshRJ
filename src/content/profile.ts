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
  focus: 'Orbital Mechanics · CFD · Structural Analysis · UAV Systems',
  location: 'Kathmandu, Nepal',
  education: 'B.E. Aerospace Engineering, Chandigarh University — Class of 2025',
  // Path to your headshot, served from /public. Drop a real photo at
  // public/profile-photo.jpg (square, at least 480x480px) and it appears
  // automatically — until then, HeroPhoto shows a clean monogram fallback.
  photo: '/profile-photo.jpg',
  heroHeadline:
    'Simulation-led aerospace engineering across orbital mechanics, CFD, structural analysis, and UAV systems — models built to be tested and validated, not just visualised.',
  // Keep this to 2 short facts, not full sentences — the Experience and
  // Education sections below already cover the full detail. This is a
  // recruiter's 5-second scan, not a second resume.
  heroBullets: [,
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
    // Add your real number here, e.g. '+977 98XXXXXXX' — left blank on
    // purpose rather than shipping a fake placeholder. ContactTerminal
    // automatically skips any channel with an empty value, so this row
    // simply won't appear until you fill it in.
    phone: '+977 9821136610',
    // NOTE: your CNAME resolves to harshrajjaiswal.com.np, not harshj.com.np.
    // This email is on the OLD domain — if that domain isn't live anymore,
    // messages to this address will silently bounce. Verify this inbox
    // still works, or switch it to an address on your current domain.
    email: 'harsh.raj.jaiswal@harshrajjaiswal.com.np',
    website: 'harshrajjaiswal.com.np',
    github: 'github.com/HarshRJ176',
    // Verify this matches your actual LinkedIn handle — unconfirmed.
    linkedin: 'linkedin.com/in/harshrj',
    resume: resumePdf,
  } satisfies ContactProfile,
} as const;
