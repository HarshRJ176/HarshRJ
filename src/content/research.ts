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
      'The paper should stay tied to structural evidence, not just the project narrative.',
      'Best suited for submission after the figures and validation notes are finalised.',
      'This is the cleaner of the two paper tracks for a structural or UAV-focused review.',
      'The strongest contribution is the method used to justify mass removal while retaining usable stiffness.',
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
      'This paper works best as a systems-level contribution rather than a pure geometry study.',
      'The strongest angle is the power-management logic and endurance-extension story.',
      'Keep it as the second major paper and let the figures do the technical heavy lifting.',
      'A clean comparison table should show why the chosen power logic is worth publishing.',
    ],
  },
];
