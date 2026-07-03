export interface ResearchEntry {
  id: string;
  title: string;
  summary: string;
  status: string;
  targets: string[];
  details: string[];
}

/**
 * Research archive — only the two strongest paper tracks stay here.
 */
export const research: ResearchEntry[] = [
  {
    id: 'pla-solar-uav-structure',
    title: 'Finite Element Structural Analysis of a Lightweight PLA Solar UAV Frame',
    summary:
      'A structural optimisation paper derived from the solar UAV work, focused on mass reduction, stiffness retention, and load-path validation for lightweight flight hardware.',
    status: 'In preparation — strengthening validation, figures, and comparison tables before submission.',
    targets: ['AIAA SciTech', 'Aircraft Engineering and Aerospace Technology', 'Drones (MDPI)'],
    details: [
      'Central contribution is the method used to justify targeted mass removal while retaining usable stiffness margins.',
      'Structural evidence — load paths, stress concentration data, and validation notes — anchors the paper’s argument.',
    ],
  },
  {
    id: 'hybrid-solar-uav-power',
    title: 'Solar Energy Integration and Power Management for a Hybrid UAV',
    summary:
      'A systems paper covering solar harvesting, battery reserve strategy, and endurance-extension logic for a hybrid UAV power architecture.',
    status: 'Drafting — finalising comparison tables and simulation outputs.',
    targets: ['Aerospace Science and Technology', 'Journal of Aerospace Engineering', 'Aerospace'],
    details: [
      'Systems-level contribution centered on power-management logic and the endurance-extension strategy.',
      'Comparison tables are being prepared to substantiate the chosen power-management approach against baseline strategies.',
    ],
  },
];
