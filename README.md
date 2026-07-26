# 🚀 sk-nodeexpress

[![npm version](https://img.shields.io/npm/v/sk-nodeexpress.svg)](https://www.npmjs.com/package/sk-nodeexpress)
[![npm downloads](https://img.shields.io/npm/dt/sk-nodeexpress.svg)](https://www.npmjs.com/package/sk-nodeexpress)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/kumarshobhit-1/create-nodeexpress?style=social)](https://github.com/kumarshobhit-1/create-nodeexpress)

**`sk-nodeexpress`** is an interactive, zero-config CLI generator that instantly scaffolds production-ready Node.js & TypeScript Express backend applications. 

Say goodbye to writing repetitive Express boilerplate, JWT authentication logic, environment handling, CORS, Helmet security headers, rate limiting, and database connections from scratch!

---

## ✨ Features Included Out of the Box

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

## ⚡ Quick Usage

Generate a new Node.js & Express backend project instantly without installing anything globally:

```bash
npx sk-nodeexpress
```

Or specify your project name directly:

```bash
npx sk-nodeexpress my-express-api
```

### Quick Mode (Skip Prompts)

```bash
npx sk-nodeexpress my-express-api --yes
```

For TypeScript:

```bash
npx sk-nodeexpress my-ts-api --yes --ts
```

---

## 💻 Interactive Options in CLI

When you run `npx sk-nodeexpress`, you will be asked:
1. **Project Name**: Name of your project directory.
2. **Language**: JavaScript (ES Modules) or TypeScript.
3. **Database**: MongoDB (Mongoose) or None (Standalone Express).
4. **Authentication**: Include JWT Auth boilerplate (Yes/No).
5. **Security Middlewares**: Include Helmet, CORS, Rate limiting, Morgan (Yes/No).
6. **Auto Install**: Automatically run `npm install` inside the new project (Yes/No).

---

## 📁 Generated Project Structure

```text
my-express-api/
├── src/
│   ├── config/
│   │   └── db.js            # MongoDB Mongoose Connection
│   ├── controllers/
│   │   ├── authController.js# Register, Login, Me Profile logic
│   │   ├── userController.js# User management controllers
│   │   └── healthController.js # Server status endpoint
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
│   │   └── jwt.js           # JWT Sign & Verify helper functions
│   ├── app.js               # Express application setup
│   └── server.js            # Server listener
├── .env.example             # Environment template
├── .gitignore               # Git ignored patterns
├── package.json             # App dependencies & npm scripts (dev, start)
└── README.md                # Generated project documentation
```

---

## 📄 License

MIT © Shobhit Kumar
