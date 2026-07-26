# {{PROJECT_NAME}}

Generated with **`create-nodeexpress`** CLI.

Production-ready Node.js & Express API with pre-configured JWT Authentication, Mongoose DB connection, Security Middlewares (Helmet, CORS, Rate Limiting), and standardized API response architecture.

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
Ensure your MongoDB connection string (`MONGODB_URI`) is correct.

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Production Server
```bash
npm start
```

---

## 🛠️ API Endpoints Summary

### Health Check
- `GET /api/health` - Server health status check

### Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/register` - Create a new user account
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123"
  }
  ```
- `POST /api/v1/auth/login` - Authenticate and get JWT token
  ```json
  {
    "email": "jane@example.com",
    "password": "password123"
  }
  ```
- `GET /api/v1/auth/me` - Get current logged-in user profile (Requires `Authorization: Bearer <token>`)

### Users (`/api/v1/users`)
- `GET /api/v1/users` - Get all users (Admin only)
- `GET /api/v1/users/:id` - Get user by ID (Protected)

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
├── app.js           # Express app setup & Middlewares
└── server.js        # Server listener
```
