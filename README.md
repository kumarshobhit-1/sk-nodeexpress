# 🚀 sk-nodeexpress

[![npm version](https://img.shields.io/npm/v/sk-nodeexpress.svg)](https://www.npmjs.com/package/sk-nodeexpress)
[![npm downloads](https://img.shields.io/npm/dt/sk-nodeexpress.svg)](https://www.npmjs.com/package/sk-nodeexpress)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/kumarshobhit-1/create-nodeexpress?style=social)](https://github.com/kumarshobhit-1/create-nodeexpress)

**`sk-nodeexpress`** is an interactive, zero-config CLI generator that instantly scaffolds production-ready Node.js & TypeScript Express backend applications. 

Say goodbye to writing repetitive Express boilerplate, JWT authentication logic, environment handling, CORS, Helmet security headers, rate limiting, and database connections from scratch!

---

## 📌 Table of Contents

- [🚀 Features](#-features)
- [📦 Installation](#-installation)
- [⚡ Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Environment Variables](#-environment-variables)
- [📜 Available Scripts](#-available-scripts)
- [📚 API Example](#-api-example)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🚀 Features

- ⚡ **Express Server Core**: Pre-configured app & server entry point with clean modular architecture.
- 🔐 **Pre-built JWT Authentication**:
  - User Registration (`POST /api/v1/auth/register`)
  - User Login (`POST /api/v1/auth/login`)
  - Protected User Profile (`GET /api/v1/auth/me`)
  - Password hashing using `bcryptjs`
  - JWT token generation & Verification Middleware
  - Admin Role-Based Access Control (`authorize('admin')`)
- 🍃 **Database Integration**: MongoDB setup using `mongoose` (User Schema, connection handlers, duplicate key error handling).
- 🛡️ **Production Security & Middlewares**:
  - `helmet`: Protects HTTP headers
  - `cors`: Handles cross-origin requests
  - `express-rate-limit`: Prevents DDoS / Brute-force attacks
  - `morgan`: Request logging
  - `cookie-parser`: Parses cookies safely
  - Global Error Handling & 404 Route Catchers
- 📐 **Language Support**: Choose between **JavaScript (ES Modules)** and **TypeScript**.
- 📂 **Clean & Scalable Folder Structure**: Controllers, Routes, Middlewares, Models, Config, Utils.

---

## 📦 Installation

No global installation is required! Run directly using `npx`:

```bash
npx sk-nodeexpress
```

Or specify your project name directly:

```bash
npx sk-nodeexpress my-express-api
```

---

## ⚡ Quick Start

### 1. Interactive Mode (Default)
```bash
npx sk-nodeexpress my-app
```
Follow the interactive terminal questionnaire to choose between JavaScript/TypeScript, Database options, and Authentication settings.

### 2. Fast Mode (Skip Prompts)
```bash
npx sk-nodeexpress my-app --yes
```

For TypeScript:
```bash
npx sk-nodeexpress my-ts-app --yes --ts
```

### 3. Run the Generated Project
```bash
cd my-app
npm run dev
```

---

## 📁 Project Structure

```text
my-express-api/
├── src/
│   ├── config/
│   │   └── db.js            # MongoDB Mongoose Connection
│   ├── controllers/
│   │   ├── authController.js# Register, Login, Profile controllers
│   │   ├── userController.js# User management logic
│   │   └── healthController.js # Server healthcheck endpoint
│   ├── middlewares/
│   │   ├── authMiddleware.js# JWT Guard & Role verification
│   │   ├── errorMiddleware.js# Global Error & 404 handler
│   │   └── rateLimiter.js   # Rate limiting guards
│   ├── models/
│   │   └── User.js          # Mongoose User Schema & Bcrypt methods
│   ├── routes/
│   │   ├── authRoutes.js    # Auth endpoints
│   │   ├── userRoutes.js    # User endpoints
│   │   └── healthRoutes.js  # Health endpoint
│   ├── utils/
│   │   ├── apiResponse.js   # Standardized JSON response wrapper
│   │   └── jwt.js           # JWT Sign & Verify helpers
│   ├── app.js               # Express application setup
│   └── server.js            # Server listener
├── .env.example             # Environment template
├── .gitignore               # Git ignored patterns
├── package.json             # App dependencies & npm scripts (dev, start)
└── README.md                # Generated project documentation
```

---

## 🔧 Environment Variables

The generated project creates a default `.env` file from `.env.example`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/my_sknodejs_db
JWT_SECRET=super_secret_jwt_key_change_in_prod
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
```

---

## 📜 Available Scripts

Inside the generated project, you can run:

- `npm run dev`: Starts the development server with live watch/reload mode.
- `npm start`: Starts the production Node.js server.
- `npm run build` *(TypeScript only)*: Compiles TypeScript code into `dist/`.

---

## 📚 API Example

### 1. Register User
`POST /api/v1/auth/register`
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
```

### 2. Login User
`POST /api/v1/auth/login`
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

### 3. Get User Profile (Protected)
`GET /api/v1/auth/me`
Header: `Authorization: Bearer <your_jwt_token>`

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/kumarshobhit-1/create-nodeexpress/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

MIT © Shobhit Kumar
