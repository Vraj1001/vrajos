export type ProjectStatus =
  | "Academic project"
  | "Personal build"
  | "In progress"
  | "Concept";

export type Project = {
  id: string;
  name: string;
  fileName: string;
  status: ProjectStatus;
  summary: string;
  description: string;
  tech: string[];
  highlights: string[];
  repoUrl: string | null;
  demoUrl: string | null;
  accent: "teal" | "amber" | "navy" | "plum";
  note?: string;
};

export const projects: Project[] = [
  {
    id: "grocify",
    name: "Grocify",
    fileName: "grocify-grocery-system",
    status: "Academic project",
    summary: "A Blinkit-inspired grocery platform, built database-first.",
    description:
      "A grocery management system built around the part most people skip: the database. I worked through products, stock, orders and the relationships between them, using a quick-commerce flow as the reference. It began as a DBMS project and turned into a lesson in keeping data consistent before making the interface look good.",
    tech: ["MySQL", "SQL", "Web frontend"],
    highlights: [
      "Designed the schema for products, inventory and grocery workflows.",
      "Practised joins, constraints and queries against a realistic store dataset.",
      "Mapped a familiar quick-commerce flow onto the underlying data model.",
    ],
    repoUrl: null,
    demoUrl: null,
    accent: "teal",
  },
  {
    id: "qr-generator",
    name: "QR Code Generator",
    fileName: "qr-studio",
    status: "Personal build",
    summary: "A Flask app for making, keeping and clearing QR codes.",
    description:
      "A small Flask application that generates QR codes, lets you give them a useful name, keeps a history and removes the ones you no longer need. I gave it a glassmorphism-inspired interface because a plain white page felt like a missed opportunity.",
    tech: ["Python", "Flask", "HTML", "CSS"],
    highlights: [
      "Generate QR codes and save them with custom names.",
      "Keep a browsable history of everything you've created.",
      "Delete individual QR codes when they are no longer needed.",
    ],
    repoUrl: null,
    demoUrl: null,
    accent: "plum",
  },
  {
    id: "medicine-app",
    name: "Medicine Management App",
    fileName: "medicine-manager",
    status: "Academic project",
    summary: "An Android app for keeping track of medicines.",
    description:
      "An Android Studio project for managing medicines, built with Java and XML. The useful part was learning how screens, navigation and local data fit together on Android, rather than treating it as a single-screen exercise.",
    tech: ["Java", "XML", "Android Studio"],
    highlights: [
      "Built a multi-screen Android interface with XML layouts.",
      "Explored local data handling for medicine records.",
      "Learned the shape of a real Android project in Java.",
    ],
    repoUrl: null,
    demoUrl: null,
    accent: "amber",
    note: "Handwritten-prescription OCR is not part of the current build.",
  },
  {
    id: "cricket-dashboard",
    name: "Cricket Analytics Dashboard",
    fileName: "cricket-analytics",
    status: "Academic project",
    summary: "A Power BI dashboard for making cricket data say something.",
    description:
      "A data analytics project built from cricket datasets in Power BI, with DAX measures for slicing batting, bowling and match statistics. The hard part wasn't the chart. It was deciding which numbers actually add to the story.",
    tech: ["Power BI", "DAX", "Data visualisation"],
    highlights: [
      "Built DAX measures for player and match-level analysis.",
      "Turned raw cricket datasets into readable visual summaries.",
      "Practised choosing signals over decorative charts.",
    ],
    repoUrl: null,
    demoUrl: null,
    accent: "navy",
  },
  {
    id: "mainframe",
    name: "Mainframe",
    fileName: "mainframe-landing",
    status: "Concept",
    summary: "A React and Tailwind landing page experiment.",
    description:
      "A landing page built to practise typography, layout and spacing without leaning on a template. It is a front-end experiment and a concept rather than a live product, but it is where a lot of my current feel for layout came from.",
    tech: ["React", "Tailwind CSS", "Frontend design"],
    highlights: [
      "Built a responsive landing page with React and Tailwind.",
      "Focused on type scale, rhythm and visual hierarchy.",
      "Experimented with a bolder, less template-like layout.",
    ],
    repoUrl: null,
    demoUrl: null,
    accent: "teal",
  },
  {
    id: "school-redesign",
    name: "School Website Redesign",
    fileName: "school-site-concept",
    status: "Concept",
    summary: "A friendlier, clearer concept for a CBSE school website.",
    description:
      "A redesign concept for a CBSE school in Vadodara, Gujarat. The idea was a modern school experience with a blue-and-yellow identity, responsive layouts and content organised around what parents and students actually need to find. This is a concept, not a delivered client project.",
    tech: ["Web design", "Responsive layout", "Content structure"],
    highlights: [
      "Reorganised scattered school information into clear sections.",
      "Explored a blue-and-yellow identity with stronger typography.",
      "Designed layouts for parents, students and prospective families.",
    ],
    repoUrl: null,
    demoUrl: null,
    accent: "amber",
  },
  {
    id: "credit-default",
    name: "Credit Card Default Prediction",
    fileName: "credit-default-prediction",
    status: "Academic project",
    summary: "A machine learning project about predicting credit card default.",
    description:
      "A coursework machine learning project looking at credit card default prediction. Most of the work went into cleaning data, choosing sensible features and understanding what the model was actually getting right, rather than chasing a single accuracy number.",
    tech: ["Machine learning", "Data analysis", "Python"],
    highlights: [
      "Prepared and explored a credit-risk dataset.",
      "Compared approaches and evaluated the results with care.",
      "Practised explaining a model's limits, not just its score.",
    ],
    repoUrl: null,
    demoUrl: null,
    accent: "plum",
  },
  {
    id: "ad-budget",
    name: "Advertising Budget Optimisation",
    fileName: "ad-budget-model",
    status: "Academic project",
    summary: "Splitting an ad budget with linear programming and the simplex method.",
    description:
      "An optimisation exercise: allocate an advertising budget across television, newspaper and social media using linear programming and the simplex method. A useful reminder that the maths only gets interesting once the assumptions are honest.",
    tech: ["Linear programming", "Simplex method", "Optimisation"],
    highlights: [
      "Modelled a budget allocation problem with constraints.",
      "Worked through the simplex method by hand and in code.",
      "Compared allocation strategies against the original brief.",
    ],
    repoUrl: null,
    demoUrl: null,
    accent: "navy",
  },
];

export const findProject = (id: string) =>
  projects.find((project) => project.id === id);

export const projectGroups = [
  { id: "all", label: "All projects" },
  { id: "academic", label: "Academic" },
  { id: "personal", label: "Personal & concept" },
] as const;

export type ProjectGroup = (typeof projectGroups)[number]["id"];

export const projectGroupFor = (project: Project): Exclude<ProjectGroup, "all"> =>
  project.status === "Academic project" ? "academic" : "personal";
