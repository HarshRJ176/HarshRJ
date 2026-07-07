export interface SkillCluster {
  id: string;
  label: string;
  summary: string;
  skills: string[];
}

/**
 * Clean, readable skill clusters aligned with the projects and certificates.
 */
export const skillClusters: SkillCluster[] = [
  {
    id: 'aerospace',
    label: 'Aerospace & Flight Systems',
    summary: 'Core design and mission-thinking capability.',
    skills: ['Orbital Mechanics', 'Flight Dynamics', 'Propulsion', 'UAV Design', 'Aircraft Design', 'Mission Analysis'],
  },
  {
    id: 'simulation',
    label: 'Simulation & Analysis',
    summary: 'Tools used to validate geometry and behaviour.',
    skills: ['ANSYS Fluent', 'CFD', 'Structural Analysis', 'Numerical Methods', 'Python', 'MATLAB'],
  },
  {
    id: 'cad',
    label: 'CAD & Design',
    summary: '3D design and manufacturing-oriented tooling.',
    skills: ['SolidWorks', 'Fusion 360', 'AutoCAD', 'CATIA'],
  },
  {
    id: 'research',
    label: 'Research & Technical Writing',
    summary: 'Writing, validation, and evidence packaging.',
    skills: ['Technical Writing', 'Literature Review', 'Data Reduction', 'Presentation', 'Publication Prep'],
  },
  {
    id: 'software',
    label: 'Software & Productivity',
    summary: 'Design and communication workflow tools.',
    skills: ['React', 'TypeScript', 'Three.js / R3F', 'GSAP', 'HTML / CSS', 'Excel', 'PowerPoint', 'Word'],
  },
];
