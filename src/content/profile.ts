export const profile = {
  name: "Vraj Bhatt",
  firstName: "Vraj",
  handle: "vraj",
  role: "B.Tech AI & Data Science student",
  year: "Third year",
  institution: "NMIMS MPSTME, Navi Mumbai",
  institutionFull:
    "SVKM's NMIMS, Mukesh Patel School of Technology Management and Engineering",
  location: "Navi Mumbai, India",
  systemName: "VrajOS",
  systemVersion: "1.0",
  tagline: "Student. Builder of small things. Professional tab hoarder.",
  intro: [
    "Hey, I'm Vraj. I'm a third-year Artificial Intelligence and Data Science student at NMIMS MPSTME in Navi Mumbai.",
    "Most of what I do starts with curiosity. I like taking an idea apart, working out how it fits together, and then building a small version of it myself. That has led me through database projects, Flask apps, Android experiments, Power BI dashboards and a number of browser tabs I definitely did not need.",
    "I'm still working out which part of technology I want to go deep on. Right now that means exploring software development, AI and data work, and keeping an eye out for whatever looks interesting next. The exploring is the fun part.",
    "Outside of code, I'm usually out with a camera, editing a montage, watching a film, playing something story-driven, or writing about fragrances.",
  ],
  currently: [
    "Getting more comfortable with React and TypeScript by building things I actually want to use.",
    "Practising data storytelling, not just chart-making.",
    "Taking a camera along wherever I end up.",
    "Trying to keep the number of open tabs below 27.",
  ],
  contact: {
    email: {
      label: "Email",
      value: "",
      placeholder: "your.email@example.com",
      hint: "The easiest way to reach me once this is filled in.",
    },
    github: {
      label: "GitHub",
      value: "",
      placeholder: "github.com/your-handle",
      hint: "Code, experiments and half-finished ideas.",
    },
    linkedin: {
      label: "LinkedIn",
      value: "",
      placeholder: "linkedin.com/in/your-handle",
      hint: "The formal version of me.",
    },
  },
  resume: {
    available: false,
    fileName: "Vraj_Bhatt_Resume.pdf",
    note: "The PDF is not attached yet. Everything below is the current resume content.",
  },
} as const;

export type ContactKey = keyof typeof profile.contact;

export const education = {
  degree: "B.Tech in Artificial Intelligence & Data Science",
  institution: "SVKM's NMIMS, Mukesh Patel School of Technology Management & Engineering (MPSTME)",
  location: "Navi Mumbai, Maharashtra",
  stage: "Third year",
  focus: ["Artificial Intelligence", "Data Science", "Software Development"],
  note: "Coursework has covered AI/ML, database management, data analytics, optimisation and application development, alongside a lot of learning by building.",
} as const;

export const aboutTimeline = [
  {
    marker: "Now",
    title: "Third year, AI & Data Science",
    body: "Studying at MPSTME, Navi Mumbai, and spending most of my free time on projects that make a subject feel less theoretical.",
    tone: "current" as const,
  },
  {
    marker: "Along the way",
    title: "Coursework, projects, detours",
    body: "Databases, Android, Flask, Power BI, React. Not a straight line, but every project left me with something useful.",
    tone: "past" as const,
  },
  {
    marker: "Next",
    title: "Still deciding, on purpose",
    body: "I want to go deeper into software engineering, AI or data work. I'm using this time to try each one properly rather than pick a label too early.",
    tone: "next" as const,
  },
] as const;
