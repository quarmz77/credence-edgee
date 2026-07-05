export const APP_NAME = "Credify";
export const CERTIFICATE_PRICE = 20;
export const CURRENCY = "GHS";

export const USER_ROLES = {
  STUDENT: "student",
  GRADUATE: "graduate",
  COMPANY: "company",
  ADMIN: "admin",
};

export const RATINGS = {
  GREEN: {
    key: "green",
    label: "Excellent",
    points: 3,
    color: "#166534",
    bg: "#dcfce7",
  },
  YELLOW: {
    key: "yellow",
    label: "Satisfactory",
    points: 2,
    color: "#854d0e",
    bg: "#fef9c3",
  },
  RED: {
    key: "red",
    label: "Needs Improvement",
    points: 1,
    color: "#991b1b",
    bg: "#fee2e2",
  },
};

export const SKILLS = [
  "Marketing",
  "IT",
  "Finance",
  "Writing",
  "Design",
  "Data",
  "Engineering",
  "Law",
  "Healthcare",
  "Education",
];

export const SKILL_COLORS = {
  Marketing: { text: "#0f3460", bg: "rgba(15,52,96,0.1)" },
  IT: { text: "#0a5c3e", bg: "rgba(10,92,62,0.1)" },
  Finance: { text: "#7c3aed", bg: "#ede9fe" },
  Writing: { text: "#b45309", bg: "#fef3c7" },
  Design: { text: "#db2777", bg: "#fce7f3" },
  Data: { text: "#0891b2", bg: "#e0f2fe" },
  Engineering: { text: "#065f46", bg: "#d1fae5" },
  Law: { text: "#4c1d95", bg: "#ede9fe" },
  Healthcare: { text: "#991b1b", bg: "#fee2e2" },
  Education: { text: "#92400e", bg: "#fef3c7" },
};

export const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Social Media Campaign Design",
    company: "AdVantage Ghana",
    skill: "Marketing",
    duration: "2 weeks",
    type: "Remote",
    status: "Open",
    description:
      "Design a full Instagram campaign for a new product launch including story templates, post graphics, and captions.",
  },
  {
    id: 2,
    title: "Build a REST API with Node.js",
    company: "TechBridge Ltd",
    skill: "IT",
    duration: "3 weeks",
    type: "Remote",
    status: "Open",
    description:
      "Create a fully documented RESTful API with authentication, CRUD operations, and cloud deployment.",
  },
  {
    id: 3,
    title: "Financial Report Analysis",
    company: "Fidelity Consult",
    skill: "Finance",
    duration: "1 week",
    type: "Remote",
    status: "Open",
    description:
      "Analyse quarterly financial reports and produce a structured summary with key insights and recommendations.",
  },
  {
    id: 4,
    title: "Content Writing — Blog Series",
    company: "Pulse Media",
    skill: "Writing",
    duration: "2 weeks",
    type: "Remote",
    status: "Closed",
    description:
      "Write 5 SEO-optimised blog articles on African tech startups, 800-1000 words each with citations.",
  },
  {
    id: 5,
    title: "UI/UX Redesign of Mobile App",
    company: "Konnect Apps",
    skill: "Design",
    duration: "3 weeks",
    type: "Remote",
    status: "Open",
    description:
      "Redesign 8 key screens of a food delivery app using Figma, improving usability and accessibility.",
  },
  {
    id: 6,
    title: "Data Analysis & Visualisation",
    company: "DataSight GH",
    skill: "Data",
    duration: "2 weeks",
    type: "Remote",
    status: "Open",
    description:
      "Clean, analyse and visualise a dataset using Python (Pandas, Matplotlib). Present findings in a PDF report.",
  },
];

export const MOCK_MY_PROJECTS = [
  {
    id: 1,
    title: "Social Media Campaign Design",
    company: "AdVantage Ghana",
    skill: "Marketing",
    status: "Reviewed",
    rating: "green",
    feedback: "Excellent work! Creative, on-brand and well-structured.",
    submittedAt: "Apr 12, 2025",
  },
  {
    id: 2,
    title: "UI/UX Redesign of Mobile App",
    company: "Konnect Apps",
    skill: "Design",
    status: "Submitted",
    rating: null,
    feedback: null,
    submittedAt: "May 2, 2025",
  },
  {
    id: 3,
    title: "Data Analysis & Visualisation",
    company: "DataSight GH",
    skill: "Data",
    status: "In Progress",
    rating: null,
    feedback: null,
    submittedAt: null,
  },
];

export const MOCK_CERTIFICATE_ITEMS = [
  {
    id: 1,
    title: "Social Media Campaign Design",
    skill: "Marketing",
    company: "AdVantage Ghana",
    date: "Apr 12, 2025",
    rating: "green",
    certEligible: true,
    certPaid: false,
  },
];
