# Credify Frontend

A React + Vite frontend for the Credify skill verification platform.

## What works now

- User registration and login backed by real backend auth
- Email verification and password reset flows
- Admin dashboard overview and real user list fetching from backend
- Admin-managed project approvals with persistent backend support
- Company project submission flow backed by real project services
- Role-based routing for Student, Graduate, Company, and Admin users
- Protected routes with authentication and role guards
- Reusable Axios API client with bearer token handling

## Local setup

```bash
cd credence-edgee
npm install
npm run dev
```

Open **http://localhost:5173**

## Notes

- Uses `VITE_API_URL` environment variable for the backend base URL
- Auth state is stored in localStorage with `ce_token` and `ce_user`
- Pages include auth, public, dashboard, company, and admin
