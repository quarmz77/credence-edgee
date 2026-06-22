# Credence Edge

A private, project-based learning and verification platform where students gain real experience, earn rated badges, and pay for credible proof of their skills.

## 🚀 Getting Started

```bash
cd credence-edge
npm install
npm run dev
```

Open **http://localhost:5173**

## 🔑 Demo Login

This build uses mock authentication. Use any password, and choose your email to control which dashboard you land on:

| Email contains | Role | Dashboard |
|---|---|---|
| anything else | Student | `/student-dashboard` |
| "company" or "business" | Company | `/company` |
| "admin" | Admin | `/admin` |
| "graduate" | Graduate | `/student-dashboard` |

Example: `company@business.com` → Company Dashboard

## 🏗️ Tech Stack

- React 18 + Vite
- React Router v6
- Zustand (state management)
- React Hot Toast
- Lucide React (icons)

## 📁 Structure

```
src/
├── components/   layout, common, badge, project, leaderboard
├── pages/        public, auth, dashboard, company, admin
├── routes/       AppRoutes, ProtectedRoute, PublicRoute, RoleBasedRoute
├── store/        Zustand stores
├── hooks/        useAuth, useProjects, useCourses, useLeaderboard, useModal
├── context/      AuthContext
└── utils/        constants.js (all mock data)
```

## 🎨 Brand

Logo: geometric overlapping diamond shapes in blue-to-green gradient with upward arrow, on dark rounded background — matches the Credence Edge brand mark.
