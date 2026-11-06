export type SkillCategory = {
  id: string;
  label: string;
  blurb: string;
  skills: { name: string; note: string; initials: string; tone: string }[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    label: "Programming",
    blurb: "Languages I've used in coursework and projects.",
    skills: [
      {
        name: "Python",
        note: "Flask apps, data work and small scripts.",
        initials: "Py",
        tone: "blue",
      },
      {
        name: "Java",
        note: "Android projects and programming coursework.",
        initials: "Ja",
        tone: "red",
      },
      {
        name: "JavaScript",
        note: "Front-end experiments and interactive pages.",
        initials: "Js",
        tone: "amber",
      },
      {
        name: "SQL",
        note: "Schema design and querying with MySQL.",
        initials: "Sql",
        tone: "teal",
      },
    ],
  },
  {
    id: "web",
    label: "Web development",
    blurb: "The front-end toolkit I keep coming back to.",
    skills: [
      {
        name: "HTML",
        note: "Semantic structure and accessible markup.",
        initials: "H",
        tone: "amber",
      },
      {
        name: "CSS",
        note: "Layout, responsive design and a weakness for detail.",
        initials: "Cs",
        tone: "blue",
      },
      {
        name: "React",
        note: "Component-driven interfaces, currently going deeper.",
        initials: "Re",
        tone: "teal",
      },
      {
        name: "Tailwind CSS",
        note: "Fast layout experiments and landing pages.",
        initials: "Tw",
        tone: "blue",
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    blurb: "Where the work happens.",
    skills: [
      {
        name: "Git",
        note: "Version control for projects and experiments.",
        initials: "Git",
        tone: "red",
      },
      {
        name: "GitHub",
        note: "Storing work, reading other people's code.",
        initials: "Gh",
        tone: "navy",
      },
      {
        name: "VS Code",
        note: "My main editor.",
        initials: "Vs",
        tone: "blue",
      },
      {
        name: "Android Studio",
        note: "Java and XML Android projects.",
        initials: "As",
        tone: "teal",
      },
      {
        name: "MySQL",
        note: "Relational databases and query practice.",
        initials: "My",
        tone: "amber",
      },
      {
        name: "Power BI",
        note: "Dashboards and DAX measures.",
        initials: "Pb",
        tone: "amber",
      },
    ],
  },
  {
    id: "ai-data",
    label: "AI & data",
    blurb: "Areas I'm actively exploring, not titles I'd claim yet.",
    skills: [
      {
        name: "Machine Learning",
        note: "Coursework and academic prediction projects.",
        initials: "ML",
        tone: "plum",
      },
      {
        name: "Data Analysis",
        note: "Cleaning, exploring and asking better questions.",
        initials: "Da",
        tone: "teal",
      },
      {
        name: "Data Visualisation",
        note: "Power BI dashboards and chart choices that earn their space.",
        initials: "Dv",
        tone: "blue",
      },
      {
        name: "DAX",
        note: "Measures and calculations for Power BI reports.",
        initials: "Dx",
        tone: "amber",
      },
    ],
  },
];

export const skillsNote =
  "These are things I've used in coursework or side projects. Comfortable in some, still learning in others — no percentage bars, because they'd be made up.";
