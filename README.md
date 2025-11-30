# Vidzai — Full-stack learning app

Simple, accurate project README — cleaned up and matched to the repository.

This repo contains two apps:

- client/ — React + Vite front-end (default dev port: 5173)
- server/ — Node.js + Express API (default dev port: 4000)

## What this project includes
- User sign-up and login (JWT auth)
- Profile page with progress and stats
- Topic browsing, topic details with content, and quizzes
- Backend API with routes for auth, topics and profile

## Key files / endpoints
- Server: routes under `server/src/routes`
  - POST /api/auth/signup — create user
  - POST /api/auth/login — login and get JWT
  - GET /api/topics — list topics (optional auth)
  - GET /api/topics/:id — topic detail
  - POST /api/topics/:id/submit — submit quiz (requires auth)
  - GET /api/profile — current user profile (requires auth)

## Environment variables

Server (.env) — required:
- MONGO_URI  — MongoDB connection string
- JWT_SECRET — secret for signing JWT tokens
- PORT (optional) — default 4000

Client (.env) — optional for production builds / deployed apps:
- VITE_API_BASE_URL — base URL for API (example: https://api.example.com/api). If not set, the client will use `http://localhost:4000/api`.

## Run locally (PowerShell)

1) Start the backend

```powershell
cd server
npm install
# create a .env file with MONGO_URI and JWT_SECRET
npm run dev
```

2) Start the frontend (in a second terminal)

```powershell
cd client
npm install
# optional: create .env with VITE_API_BASE_URL pointing to your server
npm run dev
```

The frontend expects the API at `import.meta.env.VITE_API_BASE_URL` and falls back to `http://localhost:4000/api` in development.

## Seed test data

To populate sample data (server):

```powershell
cd server
npm run seed
```

## Scripts (short)

- client:
  - npm run dev — start Vite dev server
  - npm run build — build frontend
  - npm run preview — preview build
- server:
  - npm run dev — start server with nodemon
  - npm start — run server
  - npm run seed — run DB seeder

## Notes / Next steps
- This README is intentionally concise and matches the implementation in the repo.
- If you want: add a short `client/README.md` and `server/README.md` with screenshots and environment examples — I can add them next.

---

If you'd like the live-demo badge added or screenshots embedded, provide the deployed URL and an image and I'll update the README accordingly.
