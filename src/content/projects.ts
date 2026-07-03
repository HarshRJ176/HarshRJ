export interface Project {
  id: string;
  callsign: string;
  title: string;
  summary: string;
  details: string[];
  stack: string[];
  status: 'operational' | 'in-development' | 'archived';
}

/**
 * Projects / Docking Bays.
 * Ordered newest to oldest so the section reads like a technical work log.
 */
export const projects: Project[] = [
  {
    id: 'pla-solar-uav-structure',
    callsign: 'BAY 01',
    title: 'Finite Element Structural Analysis of a Lightweight PLA Solar UAV Frame',
    summary:
      'Structural optimisation study for a lightweight solar UAV frame, focused on mass reduction while keeping stiffness and load paths within acceptable flight margins.',
    details: [
      'Mapped load paths and stress concentration zones to identify where material could be removed without collapsing stiffness.',
      'Used the analysis to drive an actual lightweight design decision, not as a standalone visual exercise.',
      'Prepared the work as publication-track output with comparison figures, validation notes, and reproducible assumptions.',
    ],
    stack: ['FEA', 'Structural Optimisation', 'PLA', 'Lightweight Design'],
    status: 'operational',
  },
  {
    id: 'solar-capstone',
    callsign: 'BAY 02',
    title: 'Capstone Design-1: Solar UAV Performance Evaluation',
    summary:
      'Capstone-level conceptual and performance evaluation of a solar-powered UAV, used to consolidate airframe, propulsion, endurance, and system thinking into one project narrative.',
    details: [
      'Combined the UAV concept with power-budget logic, endurance estimation, and performance interpretation.',
      'Senior-level design synthesis project completed at Chandigarh University.',
      'Bridged raw conceptual design work with publication-oriented analysis.',
      'Connected geometry, propulsion, energy budget, and mission intent into a single integrated design frame.',
    ],
    stack: ['Capstone', 'Performance Evaluation', 'Systems Integration', 'Solar UAV'],
    status: 'operational',
  },
  {
    id: 'dual-bell-nozzle',
    callsign: 'BAY 03',
    title: 'Dual-Bell Nozzle Performance Study',
    summary:
      'Propulsion geometry study focused on dual-bell transition behaviour, flow separation control, and performance across pressure regimes.',
    details: [
      'Studied how nozzle shape affects flow switching, separation behaviour, and performance stability.',
      'Extended earlier nozzle propulsion work into dual-bell transition behaviour specifically.',
    ],
    stack: ['Nozzle Design', 'Flow Separation', 'Performance Analysis', 'CFD'],
    status: 'in-development',
  },
  {
    id: 'aerospike-coldflow',
    callsign: 'BAY 04',
    title: 'Aerospike Nozzle Design and Cold-Flow Analysis',
    summary:
      'Comparative nozzle study built around cold-flow performance, expansion behaviour, and pressure-driven thrust characteristics under altitude-compensating geometries.',
    details: [
      'Used the study to understand how the aerospike concept behaves relative to conventional nozzles.',
      'Focused on flow structure, pressure-ratio sweep logic, and thrust interpretation.',
    ],
    stack: ['CFD', 'Cold-Flow Analysis', 'Fluid Mechanics', 'ANSYS', 'Propulsion'],
    status: 'operational',
  },
  {
    id: 'hydrogen-aircraft-concept',
    callsign: 'BAY 05',
    title: 'Hydrogen-Powered Short-Range Aircraft Concept',
    summary:
      'Conceptual aircraft design study using a hydrogen propulsion architecture for a short-range transport mission, with emphasis on configuration trade-offs and mass balance.',
    details: [
      'Applied conceptual design methods to aircraft-level trade studies.',
      'Built judgment around configuration, payload, range, and viability constraints.',
    ],
    stack: ['Conceptual Design', 'Aircraft Sizing', 'Mission Analysis', 'Trade Studies'],
    status: 'archived',
  },
  {
    id: 'solar-uav-design',
    callsign: 'BAY 06',
    title: 'Solar-Powered UAV Design and Development',
    summary:
      'End-to-end solar UAV concept covering airframe sizing, propulsion matching, power budgeting, endurance reasoning, and CFD-led iteration for a lightweight mission profile.',
    details: [
      'Integrated airframe, propulsion, and power-budget analysis into a single design-to-implementation workflow.',
      'CFD-led iteration on the airframe shape supported the final lightweight mission profile.',
    ],
    stack: ['SolidWorks', 'ANSYS Fluent', 'CFD', 'Power Budgeting', 'UAV Design'],
    status: 'operational',
  },
];
