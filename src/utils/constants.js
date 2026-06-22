export const APP_NAME = 'Credence Edge'
export const CERTIFICATE_PRICE = 20
export const CURRENCY = 'GHS'

export const USER_ROLES = {
  STUDENT: 'student',
  GRADUATE: 'graduate',
  COMPANY: 'company',
  ADMIN: 'admin',
}

export const RATINGS = {
  GREEN:  { key: 'green',  label: 'Excellent',         points: 3, color: '#166534', bg: '#dcfce7', emoji: '🟢' },
  YELLOW: { key: 'yellow', label: 'Satisfactory',      points: 2, color: '#854d0e', bg: '#fef9c3', emoji: '🟡' },
  RED:    { key: 'red',    label: 'Needs Improvement', points: 1, color: '#991b1b', bg: '#fee2e2', emoji: '🔴' },
}

export const SKILLS = [
  'Marketing', 'IT', 'Finance', 'Writing', 'Design',
  'Data', 'Engineering', 'Law', 'Healthcare', 'Education',
]

export const SKILL_COLORS = {
  Marketing:   { text: '#0f3460', bg: 'rgba(15,52,96,0.1)' },
  IT:          { text: '#0a5c3e', bg: 'rgba(10,92,62,0.1)' },
  Finance:     { text: '#7c3aed', bg: '#ede9fe' },
  Writing:     { text: '#b45309', bg: '#fef3c7' },
  Design:      { text: '#db2777', bg: '#fce7f3' },
  Data:        { text: '#0891b2', bg: '#e0f2fe' },
  Engineering: { text: '#065f46', bg: '#d1fae5' },
  Law:         { text: '#4c1d95', bg: '#ede9fe' },
  Healthcare:  { text: '#991b1b', bg: '#fee2e2' },
  Education:   { text: '#92400e', bg: '#fef3c7' },
}

export const MOCK_PROJECTS = [
  { id: 1, title: 'Social Media Campaign Design',   company: 'AdVantage Ghana',  skill: 'Marketing', duration: '2 weeks', type: 'Remote', status: 'Open',   description: 'Design a full Instagram campaign for a new product launch including story templates, post graphics, and captions.' },
  { id: 2, title: 'Build a REST API with Node.js',  company: 'TechBridge Ltd',   skill: 'IT',        duration: '3 weeks', type: 'Remote', status: 'Open',   description: 'Create a fully documented RESTful API with authentication, CRUD operations, and cloud deployment.' },
  { id: 3, title: 'Financial Report Analysis',      company: 'Fidelity Consult', skill: 'Finance',   duration: '1 week',  type: 'Remote', status: 'Open',   description: 'Analyse quarterly financial reports and produce a structured summary with key insights and recommendations.' },
  { id: 4, title: 'Content Writing — Blog Series',  company: 'Pulse Media',      skill: 'Writing',   duration: '2 weeks', type: 'Remote', status: 'Closed', description: 'Write 5 SEO-optimised blog articles on African tech startups, 800-1000 words each with citations.' },
  { id: 5, title: 'UI/UX Redesign of Mobile App',   company: 'Konnect Apps',     skill: 'Design',    duration: '3 weeks', type: 'Remote', status: 'Open',   description: 'Redesign 8 key screens of a food delivery app using Figma, improving usability and accessibility.' },
  { id: 6, title: 'Data Analysis & Visualisation',  company: 'DataSight GH',     skill: 'Data',      duration: '2 weeks', type: 'Remote', status: 'Open',   description: 'Clean, analyse and visualise a dataset using Python (Pandas, Matplotlib). Present findings in a PDF report.' },
]

export const MOCK_COURSES = [
  { id: 1, title: 'Digital Marketing Fundamentals', skill: 'Marketing', duration: '4h', lessons: 8,  description: 'Learn the core pillars of digital marketing: SEO, social media, email marketing, and paid ads.' },
  { id: 2, title: 'Python for Beginners',           skill: 'IT',        duration: '6h', lessons: 12, description: 'Start coding from scratch. Variables, loops, functions and your first real project.' },
  { id: 3, title: 'Financial Modelling in Excel',   skill: 'Finance',   duration: '5h', lessons: 10, description: 'Build financial models, valuation sheets and dashboards using Excel from the ground up.' },
  { id: 4, title: 'Copywriting & Content Strategy', skill: 'Writing',   duration: '3h', lessons: 6,  description: 'Craft compelling copy for brands. Learn tone of voice, structure, and persuasion techniques.' },
  { id: 5, title: 'Figma UI Design Masterclass',    skill: 'Design',    duration: '5h', lessons: 10, description: 'Master Figma from basics to advanced prototyping, component systems and design handoff.' },
  { id: 6, title: 'Data Analysis with Python',      skill: 'Data',      duration: '7h', lessons: 14, description: 'Use Pandas, NumPy, and Matplotlib to clean, analyse, and visualise real datasets end-to-end.' },
]

export const MOCK_LEADERBOARD = [
  { rank: 1,  name: 'Kwame Asante',    badges: 9, score: 24, green: 7, yellow: 2, red: 0 },
  { rank: 2,  name: 'Ama Boateng',     badges: 8, score: 22, green: 6, yellow: 4, red: 0 },
  { rank: 3,  name: 'Annastasia A.',   badges: 7, score: 19, green: 5, yellow: 3, red: 2 },
  { rank: 4,  name: 'Kojo Mensah',     badges: 6, score: 16, green: 4, yellow: 4, red: 0 },
  { rank: 5,  name: 'Efua Darko',      badges: 5, score: 14, green: 4, yellow: 2, red: 1 },
  { rank: 6,  name: 'Yaw Oppong',      badges: 5, score: 13, green: 3, yellow: 4, red: 0 },
  { rank: 7,  name: 'Adwoa Frimpong',  badges: 4, score: 11, green: 3, yellow: 2, red: 1 },
  { rank: 8,  name: 'Nana Acheampong', badges: 4, score: 10, green: 2, yellow: 4, red: 0 },
  { rank: 9,  name: 'Abena Serwaa',    badges: 3, score: 8,  green: 2, yellow: 2, red: 1 },
  { rank: 10, name: 'Kofi Adom',       badges: 3, score: 7,  green: 1, yellow: 4, red: 0 },
]

export const MOCK_MY_PROJECTS = [
  { id: 1, title: 'Social Media Campaign Design', company: 'AdVantage Ghana', skill: 'Marketing', status: 'Reviewed',    rating: 'green',  feedback: 'Excellent work! Creative, on-brand and well-structured.', submittedAt: 'Apr 12, 2025' },
  { id: 2, title: 'UI/UX Redesign of Mobile App', company: 'Konnect Apps',    skill: 'Design',    status: 'Submitted',   rating: null,      feedback: null, submittedAt: 'May 2, 2025' },
  { id: 3, title: 'Data Analysis & Visualisation', company: 'DataSight GH',   skill: 'Data',      status: 'In Progress', rating: null,      feedback: null, submittedAt: null },
]

export const MOCK_BADGES = [
  { id: 1, title: 'Social Media Campaign Design', skill: 'Marketing', company: 'AdVantage Ghana', date: 'Apr 12, 2025', rating: 'green', certEligible: true, certPaid: false },
]
