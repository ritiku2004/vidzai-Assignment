<!-- prettier-ignore -->
# Vidzai — Interactive Quiz & Topics Platform 🎯

[![Status](https://img.shields.io/badge/status-active-success.svg)](https://github.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Frontend](https://img.shields.io/badge/stack-React%20%2B%20Vite-informational)](#)
[![Backend](https://img.shields.io/badge/stack-Node.js%20%2B%20Express%20%2B%20MongoDB-informational)](#)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-online-brightgreen)](https://example.com)

---

Beautiful, minimal, and practical — Vidzai is a full-stack learning platform with topics, quizzes and profile management. This README gives you everything you need to run the app locally, link a live deployment, and deploy a production-ready version.

## 🔗 Live demo

Replace the placeholder below with your project's deployed URL to make the live link live in the README.

Live demo: https://example.com  

Or update the badge link above (README & shield) to point to your site (Vercel/Netlify/Render/Azure).

---

## 🚀 Features
- User authentication (Sign up / Login)
- Profile page and editable user settings
- Topic browsing, topic detail pages and quizzes
- REST API with JWT-based authentication
- Responsive UI built with React + Tailwind

## 🧩 Tech stack
- Frontend: React (v19), Vite, Tailwind CSS, React Router, Framer Motion
- Backend: Node.js, Express, MongoDB (Mongoose), JWT authentication
- Dev tools: ESLint, Vite, Nodemon (server), Axios, React Query

---

## ⚙️ Project structure (short)

root/
- client/ — React + Vite (frontend)
- server/ — Node.js + Express + MongoDB (backend)

## 💡 Live-link feature + deployment notes

- The frontend will call the API base URL from the environment variable `VITE_API_BASE_URL` (client/.env or build environment). Example in client: `VITE_API_BASE_URL=https://your-api-host.com/api`.
- The backend requires `MONGO_URI` and `JWT_SECRET` as environment variables. Example `.env` for server:

```
PORT=4000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/vidzai?retryWrites=true&w=majority
JWT_SECRET=super-secret-value
```

When you deploy the app, set these values in your hosting provider (Vercel / Netlify for frontend; Render/Heroku/Azure for API) so the frontend communicates with your hosted backend and the README Live Demo link points to your deployed site.

---

## 🧭 Quick setup — Windows PowerShell (copy & paste)

Open two terminals.

1) Start the backend (server)

```powershell
cd server
npm install
# create .env with MONGO_URI and JWT_SECRET
npm run dev
```

2) Start the frontend (client)

```powershell
cd client
npm install
# optionally create `.env` with VITE_API_BASE_URL pointing to your running server
npm run dev
```

Client defaults to Vite dev server; API defaults to port 4000. Frontend axios base uses `import.meta.env.VITE_API_BASE_URL` and falls back to `http://localhost:4000/api`.

---

## 📦 Scripts (project)
- Frontend
  - npm run dev — start Vite dev server
  - npm run build — production build
  - npm run preview — preview a built frontend
- Backend
  - npm run dev — start server with nodemon
  - npm start — run the built server
  - npm run seed — seed DB with sample data

---

## 📦 How to add the Live Demo link to README

1. Deploy your frontend to a platform like Vercel/Netlify and backend to Render/Heroku/Azure.
2. Ensure the frontend build BUNDLE points its API base to the hosted backend (`VITE_API_BASE_URL=https://api.example.com/api`).
3. Replace the `https://example.com` link above and update the Live Demo badge URL with your deployed URL.

Example badge change (Quick):

```
[![Live Demo](https://img.shields.io/badge/Live%20Demo-online-brightgreen)](https://your-live-site.com)
```

---

## 🛠️ Recommended hosting for “Live” feature
- Frontend: Vercel or Netlify — automatic builds from the `client/` directory.
- Backend: Render, Railway or Heroku — set env vars MONGO_URI and JWT_SECRET in dashboard.
- DB: MongoDB Atlas — create cluster and use connection string as `MONGO_URI`.

---

## 🧪 Testing & seeding
- Seed the database quickly (server):

```powershell
cd server
npm run seed
```

---

## 🙏 Contributing
Feel free to open issues or send PRs. If you'd like a nicer, repo-specific demo badge or an image screenshot added to the README, tell me where your live site will be hosted and I’ll update the README with the real URL and a production screenshot.

---

If you'd like I can also add a `client/README.md` and `server/README.md` with component-level documentation and a screenshot — tell me whether you have a live URL and a screenshot you want shown here.

---

© Vidzai — built with ❤️ and code
