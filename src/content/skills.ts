export interface SkillCluster {
  id: string;
  label: string;
  summary: string;
  skills: string[];
}

/**
 * Clean, readable skill matrix. Each cluster can be edited independently.
 * The UI now keeps the focus on the categories and tags instead of the old
 * multi-line blurbs.
 */
export const skillClusters: SkillCluster[] = [
  {
    id: 'aerospace',
    label: 'Aerospace & Flight Systems',
    summary: 'Core design and mission-thinking capability.',
    skills: ['Orbital Mechanics', 'Flight Dynamics', 'Propulsion', 'UAV Design', 'Mission Analysis'],
  },
  {
    id: 'simulation',
    label: 'Simulation & Analysis',
    summary: 'Tools used to validate geometry and behaviour.',
    skills: ['ANSYS Fluent', 'CFD', 'Structural Analysis', 'Numerical Methods', 'Python'],
  },
  {
    id: 'research',
    label: 'Research & Publishing',
    summary: 'Writing, validation, and evidence packaging.',
    skills: ['Technical Writing', 'Literature Review', 'Data Reduction', 'Presentation', 'Publication Prep'],
  },
  {
    id: 'software',
    label: 'Software & Visualization',
    summary: 'Design and communication workflow tools.',
    skills: ['SolidWorks', 'React', 'TypeScript', 'Three.js / R3F', 'GSAP'],
  },
];
