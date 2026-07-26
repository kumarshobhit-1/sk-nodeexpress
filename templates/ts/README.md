# {{PROJECT_NAME}} (TypeScript)

Generated with **`sk-nodeexpress`** CLI.

Production-ready TypeScript Node.js & Express API with pre-configured JWT Authentication, Mongoose DB connection, Security Middlewares (Helmet, CORS, Rate Limiting), and standardized API response architecture.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build TypeScript
```bash
npm run build
```

### 5. Run Production Server
```bash
npm start
```

---

## 🛠️ API Endpoints Summary

### Health Check
- `GET /api/health` - Server health status check

### Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/register` - Create a new user account
- `POST /api/v1/auth/login` - Authenticate and get JWT token
- `GET /api/v1/auth/me` - Get current logged-in user profile (Requires `Authorization: Bearer <token>`)

---

## 📂 Project Architecture

```text
src/
├── config/          # Database & Environment configuration
├── controllers/     # Controller logic (Auth, Users, Health)
├── middlewares/     # Auth JWT guard, Error handling, Rate limiting
├── models/          # Mongoose Schemas (User)
├── routes/          # Express Routers
├── utils/           # JWT generator & API response formatters
├── app.ts           # Express app setup & Middlewares
└── server.ts        # Server listener
```
