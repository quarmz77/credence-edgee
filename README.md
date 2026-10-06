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

Docker Desktop with Compose is required. Clone the frontend and backend repositories into sibling folders, with the backend folder named `credify_backend`:

```bash
git clone https://github.com/quarmz77/credence-edgee.git
git clone https://github.com/obedyakpa0-dev/Credify-backend.git credify_backend
cd credence-edgee
cp .env.example .env
docker compose up --build
```

In PowerShell, use `Copy-Item .env.example .env` instead of `cp`. Open **http://localhost:5173**; the API is at **http://localhost:5000**. The first start installs dependencies and can take a few minutes. Later starts reuse the dependency volumes. Source changes reload automatically.

The copied `.env.example` values are sufficient for a basic local run. Set `JWT_SECRET` to a random local value. Keep `PAYMENT_PROVIDER=manual` and leave Paystack and SMTP credentials blank unless you are testing those integrations with your own credentials. Compose supplies the MongoDB service URL and frontend CORS origin; do not set the container's MongoDB host to `localhost`.

Stop the stack with `docker compose down`. Use `docker compose down --volumes` only when you also want to delete local MongoDB data and cached dependencies. Never commit `.env` or use development values in production.

## Notes

- Uses `VITE_API_URL` environment variable for the backend base URL
- Auth state is stored in localStorage with `ce_token` and `ce_user`
- Pages include auth, public, dashboard, company, and admin
