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
      'Used the study to support a lightweight design decision rather than treating FEA as a visual add-on.',
      'Prepared the work as publication-track output with comparison figures, validation notes, and reproducible assumptions.',
      'This is the strongest structural-analysis item in the portfolio and should stay near the top of the list.',
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
      'Used as the senior-level design synthesis project from Chandigarh University.',
      'Provided a bridge between raw design work and publication-oriented analysis.',
      'Shows systems thinking because it connects geometry, propulsion, energy, and mission intent in one frame.',
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
      'Built as a comparative extension to the nozzle work already in the portfolio.',
      'Useful for showing that the propulsion interest is not isolated to a single geometry.',
      'Keep this project concise but technically dense for recruiter review.',
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
      'Strong technical item for roles that value propulsion fundamentals and pressure-compensating geometry.',
      'Keep the wording technical and avoid over-selling the result.',
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
      'Served as conceptual design practice for aircraft-level trade studies.',
      'Built judgment around configuration, payload, range, and viability constraints.',
      'Shows that the portfolio can handle whole-aircraft reasoning, not just subsystem analysis.',
      'The explanation should stay focused on design logic and mission constraints.',
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
      'One of the best aerospace projects for showing integrated analysis across design, power, and flight intent.',
      'Useful for proving the ability to move from concept to implementation logic.',
      'Keep this entry as the oldest major design work so the chronology reads cleanly.',
      'Strong match for UAV, flight systems, and simulation-oriented roles.',
    ],
    stack: ['SolidWorks', 'ANSYS Fluent', 'CFD', 'Power Budgeting', 'UAV Design'],
    status: 'operational',
  },
];
