export interface Project {
  id: string;
  callsign: string;
  title: string;
  summary: string;
  details: string[];
  stack: string[];
  report?: {
    label: string;
    href: string;
  };
}

/**
 * Engineering projects ordered newest to oldest.
 */
export const projects: Project[] = [
  {
    id: 'solar-uav-design',
    callsign: 'Project 01',
    title: 'Design and Development of Solar-Powered Unmanned Air Vehicle',
    summary:
      'Designed and developed a solar-powered UAV focused on renewable energy integration, lightweight structures, aerodynamic efficiency, and mission endurance.',
    details: [
      'The project covered airfoil selection, structural design, propulsion sizing, battery and solar power integration, payload estimation, and aerodynamic analysis.',
      'The final design emphasized efficient energy utilization while maintaining structural integrity and mission capability.',
      'Built a complete UAV concept from airfoil selection to full structure integration.',
    ],
    stack: ['SolidWorks', 'ANSYS Fluent', 'CFD', 'Aerodynamics', 'UAV Design'],
    report: {
      label: 'Open project report',
      href: '/documents/Solar-UAV-Project-Report.pdf',
    },
  },
  {
    id: 'hydrogen-aircraft-concept',
    callsign: 'Project 02',
    title: 'Velocity Vista: Conceptual Design of a Novel Hydrogen-Powered Short-Range Aircraft',
    summary:
      'Designed a conceptual hydrogen-powered passenger aircraft focused on sustainable aviation, cryogenic hydrogen storage, aircraft sizing, and performance optimization.',
    details: [
      'Developed a complete conceptual aircraft by studying hydrogen propulsion, aircraft configuration, weight estimation, drag analysis, performance calculations, and systems integration.',
      'The project explored sustainable alternatives for future commercial aviation.',
      'Built a systems-level hydrogen aircraft concept with performance and sustainability trade-offs clearly evaluated.',
    ],
    stack: ['Aircraft Design', 'Hydrogen Propulsion', 'Performance Analysis', 'Weight Estimation', 'SolidWorks'],
    report: {
      label: 'Open project report',
      href: '/documents/Velocity-Vista-Project-Report.pdf',
    },
  },
  {
    id: 'aerospike-coldflow',
    callsign: 'Project 03',
    title: 'Design and Cold Flow Analysis of Aerospike Nozzle',
    summary:
      'Investigated the aerodynamic behaviour of an aerospike rocket nozzle using computational fluid dynamics to study pressure distribution, expansion behaviour, and altitude-compensating performance.',
    details: [
      'Performed computational analysis to evaluate nozzle performance under different operating conditions.',
      'The project focused on pressure variation, flow characteristics, nozzle efficiency, and propulsion behaviour through CFD-based analysis.',
      'Strengthened CFD-based propulsion analysis and nozzle-performance interpretation.',
    ],
    stack: ['ANSYS Fluent', 'CFD', 'Rocket Propulsion', 'Aerodynamics'],
  },
  {
    id: 'dual-bell-nozzle',
    callsign: 'Project 04',
    title: 'Design and Performance Optimization of Dual Bell Nozzle',
    summary:
      'Designed and analysed a dual-bell rocket nozzle to investigate thrust performance, flow transition, and pressure distribution under varying atmospheric conditions.',
    details: [
      'The project focused on dual-bell nozzle geometry, contour optimisation, CFD analysis, and propulsion performance evaluation.',
      'The work explored how nozzle configuration influences flow behaviour and overall engine efficiency under changing operating conditions.',
      'Improved understanding of advanced rocket nozzle optimisation and flow transition behaviour.',
    ],
    stack: ['ANSYS Fluent', 'Rocket Propulsion', 'CFD', 'Nozzle Design'],
    report: {
      label: 'Open project report',
      href: '/documents/Dual-Bell-Nozzle-Project-Report.pdf',
    },
  },
];
