export interface MissionSection {
  id: string;
  label: string;
  /** Short mission-control style code shown in the nav dock. */
  code: string;
}

/**
 * Navigation order for the updated recruiter-facing structure.
 */
export const missionSections: MissionSection[] = [
  { id: 'mission-brief', label: 'About Me', code: '01' },
  { id: 'experience', label: 'Experience', code: '02' },
  { id: 'education', label: 'Education', code: '03' },
  { id: 'projects', label: 'Projects', code: '04' },
  { id: 'research', label: 'Research', code: '05' },
  { id: 'skills', label: 'Skills', code: '06' },
  { id: 'contact', label: 'Contact', code: '07' },
];
