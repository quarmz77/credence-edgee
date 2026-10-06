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

## Full-stack Docker setup

Docker Desktop with Compose v2 is required. From a folder where you want both repositories, clone the frontend and backend into sibling folders. The backend folder must be named `credify_backend` because Compose mounts it by that path:

```bash
git clone https://github.com/quarmz77/credence-edgee.git
git clone https://github.com/obedyakpa0-dev/Credify-backend.git credify_backend
cd credence-edgee
cp .env.example .env
docker compose up --build
```

In PowerShell, use `Copy-Item .env.example .env` instead of `cp`. Open **http://localhost:5173**; the API health check is at **http://localhost:5000/health**. The first start downloads dependencies and can take a few minutes. Later starts reuse the dependency volumes. Source changes reload automatically.

The copied `.env.example` values are sufficient for a basic local run. Set `JWT_SECRET` to a random value for your local environment. Keep `PAYMENT_PROVIDER=manual` and leave Paystack and SMTP credentials blank unless testing those integrations with your own credentials. Compose supplies the MongoDB service URL and frontend CORS origin; do not set the container's MongoDB host to `localhost`.

Run commands from the `credence-edgee` folder. Stop the stack with `docker compose down`. Use `docker compose down --volumes` only when you also want to delete local MongoDB data and cached dependencies. Never commit `.env` or use development values in production.

## Notes

- Uses `VITE_API_URL` environment variable for the backend base URL
- Auth state is stored in localStorage with `ce_token` and `ce_user`
- Pages include auth, public, dashboard, company, and admin
