# Vidzai — Full-stack learning app

[![Live Demo](https://img.shields.io/badge/Live%20Demo-online-brightgreen)](https://vidzai-assignment.vercel.app/)

Demo user (quick test):

```js
const demoEmail = "test@gmail.com";
const plainPassword = "test123";
```

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

Live demo

Visit the deployed site: https://vidzai-assignment.vercel.app/


## Project introduction (why this exists)

1) Problem statement

Beginners want to learn AI but often quit because content is too technical. Vidzai solves this by providing micro-learning: short topics with imagery and 3-question quizzes, plus stars and progress tracking to motivate learners.

2) Why this matters

- Short, analogy-based summaries reduce cognitive load
- Visual topics help memory and attention
- Instant quiz feedback keeps learners engaged
- Clear progress tracking encourages continued use

All UI, data and flow decisions are tuned to make learning AI approachable for non-technical beginners.

3) Practical feature overview

A. Authentication
- Email + password signup/login (JWT-backed)

B. Topics system
- Each topic includes an image, title, short summary and 3 MCQ questions

C. Quiz logic
- Users select answers and get a 0–3 star result; topics are marked completed on submit

D. Progress tracking
- Profile shows total stars, completed topics and a progress bar

4) User flow

- Sign up / Login → Browse Topics List → Open Topic → Read + Take Quiz → Submit → Stars saved → View Profile for progress

5) Screens (why they exist)

1. Login / Signup
- Purpose: save user data and enable individualized progress tracking
2. Topics List
- Purpose: surface all concepts as an actionable grid for easy selection
3. Topic Detail + Quiz
- Purpose: teach concisely and test immediately through 3 MCQs
4. Profile
- Purpose: summarize progress and motivate continued learning

6) Technical structure — (short)

- Frontend (client/): React + Vite + Tailwind. Pages: Login, Signup, TopicsList, TopicDetail, Profile. Components: Navbar, Quiz, ProgressBar.
- Backend (server/): Express routes for auth, topics and profile. JWT based authentication.
- Database: MongoDB with Users (email, password, stars, completed topics) and Topics (summary, image, questions, answers).

7) Final summary

AI Concepts Explorer (Vidzai) provides a complete short-cycle learning workflow: login → explore → learn → quiz → earn stars → track progress. It’s optimized for non-technical learners.
