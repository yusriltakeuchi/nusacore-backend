# NusaCore HRIS API

<div align="center">
  <h1>🏢 NusaCore HRIS API</h1>
  <p><strong>PT Digital Nusantara</strong> — Centralized Employee Management & Authentication System</p>

  ![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
  ![Express](https://img.shields.io/badge/Express.js-4.x-black?logo=express)
  ![MySQL](https://img.shields.io/badge/MySQL-8.x-blue?logo=mysql)
  ![License](https://img.shields.io/badge/License-MIT-yellow)
</div>

---

## 📋 Overview

**NusaCore HRIS API** adalah sistem backend enterprise-grade untuk pengelolaan data karyawan (Human Resource Information System) dari PT Digital Nusantara. Dibangun di atas Node.js + Express.js + MySQL dengan arsitektur yang bersih, modular, dan siap produksi.

### Fitur Utama
- ✅ JWT Authentication + Session-based Login
- ✅ Role-Based Access Control (Admin, Employee)
- ✅ Employee CRUD + Search + Filter + Pagination
- ✅ Dashboard Analytics (siap untuk charting)
- ✅ Import Employee via Excel/CSV
- ✅ Export ke Excel & PDF
- ✅ Upload Profile Photo
- ✅ Forgot Password via Email
- ✅ Google reCAPTCHA v2
- ✅ Cron Jobs (token cleanup, log cleanup)
- ✅ Swagger/OpenAPI Documentation

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.x
- MySQL >= 8.x
- npm >= 9.x

### 1. Clone & Install

```bash
git clone https://github.com/ptdigitalnusantara/nusacore-hris-api.git
cd nusacore-hris-api
npm install
```

### 2. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` dan isi semua nilai sesuai environment kamu:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=nusacore_hris
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_key_min_32_chars
SESSION_SECRET=your_session_secret_key_min_32_chars
SMTP_HOST=smtp.gmail.com
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password
RECAPTCHA_SECRET_KEY=your_google_recaptcha_secret
```

### 3. Database Setup

```bash
# Buat database dan import schema
mysql -u root -p < database/schema.sql

# Import sample data (opsional)
mysql -u root -p nusacore_hris < database/seeder.sql
```

### 4. Running

```bash
# Development (dengan nodemon)
npm run dev

# Production
npm start
```

Server akan berjalan di: `http://localhost:3000`

---

## 📡 API Documentation

Setelah server berjalan, akses Swagger UI:

```
http://localhost:3000/api-docs
```

Raw JSON spec:
```
http://localhost:3000/api-docs.json
```

Health check:
```
GET http://localhost:3000/health
```

---

## 🔐 Authentication Flow

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john.doe",
  "email": "john.doe@example.com",
  "password": "MyPass@123",
  "role": "Employee"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "admin@nusacore.com",
  "password": "Admin@1234",
  "recaptcha_token": "03AGdBq25..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": { "id": 1, "username": "superadmin", "role": "Admin" },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer"
  }
}
```

### Menggunakan Token
Tambahkan header di setiap request:
```
Authorization: Bearer <access_token>
```

### Refresh Token
```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer <access_token>
```

### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{ "email": "user@example.com" }
```

### Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "abc123...",
  "new_password": "NewPass@456",
  "confirm_password": "NewPass@456"
}
```

---

## 👥 Employee API

### Get All Employees (with pagination + search)
```http
GET /api/employees?page=1&limit=10&search=Ahmad&division=Engineering&employment_status=Active&sort_by=full_name&sort_order=ASC
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Employees retrieved successfully.",
  "data": [...],
  "meta": {
    "currentPage": 1,
    "limit": 10,
    "totalData": 45,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Create Employee (Admin only)
```http
POST /api/employees
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "full_name": "Andi Wijaya",
  "gender": "Male",
  "email": "andi.wijaya@company.com",
  "phone_number": "081234567890",
  "division": "Engineering",
  "position": "Backend Developer",
  "salary": 10000000,
  "join_date": "2024-01-15",
  "employment_status": "Active",
  "education": "S1 Teknik Informatika",
  "marital_status": "Single"
}
```

### Update Employee
```http
PUT /api/employees/1
Authorization: Bearer <token>
Content-Type: application/json

{ "division": "Product", "position": "Senior Developer" }
```

### Delete Employee (Admin only)
```http
DELETE /api/employees/1
Authorization: Bearer <admin_token>
```

---

## 📊 Dashboard API

```http
GET /api/dashboard/stats
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total_employees": 150,
      "total_active": 130,
      "total_inactive": 10,
      "total_resigned": 10,
      "total_divisions": 8,
      "total_users": 25
    },
    "charts": {
      "employee_by_division": [
        { "label": "Engineering", "value": 45 },
        { "label": "Finance", "value": 20 }
      ],
      "employee_by_gender": [
        { "label": "Male", "value": 90 },
        { "label": "Female", "value": 60 }
      ],
      "employee_by_status": [
        { "label": "Active", "value": 130 }
      ]
    },
    "recent_employees": [...]
  }
}
```

---

## 📁 Import / Export Guide

### Import Excel/CSV (Admin only)

**Format kolom yang diperlukan:**
| Column | Required | Example |
|--------|----------|---------|
| full_name | ✅ | Ahmad Rizki |
| gender | ✅ | Male / Female |
| email | ✅ | ahmad@company.com |
| birth_date | ❌ | 1990-05-15 |
| phone_number | ❌ | 081234567890 |
| division | ❌ | Engineering |
| position | ❌ | Developer |
| salary | ❌ | 10000000 |
| join_date | ❌ | 2024-01-01 |
| employment_status | ❌ | Active |
| education | ❌ | S1 Teknik Informatika |
| marital_status | ❌ | Single |

```http
POST /api/upload/employees
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

file: <employees.xlsx>
```

**Response:**
```json
{
  "data": {
    "total_rows": 50,
    "valid_rows": 48,
    "invalid_rows": 2,
    "inserted": 47,
    "failed": 1,
    "invalid_details": [
      { "row": 15, "errors": ["Row 15: email is required"] }
    ]
  }
}
```

### Export Excel
```http
GET /api/export/excel?division=Engineering&employment_status=Active
Authorization: Bearer <admin_token>
```

### Export PDF
```http
GET /api/export/pdf
Authorization: Bearer <admin_token>
```

### Upload Profile Photo
```http
POST /api/upload/profile-photo
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <photo.jpg>
employee_id: 1
```

---

## 🛡️ Security

| Fitur | Implementasi |
|-------|-------------|
| Password Hashing | bcrypt (12 rounds) |
| JWT | Access Token (15m) + Refresh Token (7d) |
| Session | express-session + MySQL store |
| HTTP Headers | helmet |
| CORS | Whitelist-based |
| Rate Limiting | express-rate-limit |
| Login Lock | 5 failed attempts → 15 min lock |
| reCAPTCHA | Google reCAPTCHA v2 on login |
| SQL Injection | Parameterized queries (mysql2) |
| XSS | Input sanitization |
| Cookie | httpOnly + sameSite |

---

## 🗂️ Folder Structure

```
nusacore-hris-api/
├── database/
│   ├── schema.sql          # Table definitions
│   └── seeder.sql          # Sample data
├── src/
│   ├── app.js              # Express app entry point
│   ├── config/
│   │   ├── database.js     # MySQL pool + helpers
│   │   ├── session.js      # express-mysql-session
│   │   ├── swagger.js      # Swagger/OpenAPI setup
│   │   ├── mail.js         # Nodemailer config
│   │   └── multer.js       # File upload config
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── employee.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── export.controller.js
│   │   ├── upload.controller.js
│   │   └── file.controller.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── employee.service.js
│   │   ├── dashboard.service.js
│   │   ├── export.service.js
│   │   └── upload.service.js
│   ├── repositories/
│   │   ├── user.repository.js
│   │   ├── employee.repository.js
│   │   ├── auth.repository.js
│   │   ├── file.repository.js
│   │   └── dashboard.repository.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── employee.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── upload.routes.js
│   │   ├── export.routes.js
│   │   └── file.routes.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── notFoundHandler.js
│   │   ├── validationHandler.js
│   │   ├── requestLogger.js
│   │   ├── rateLimiter.js
│   │   └── recaptchaMiddleware.js
│   ├── validations/
│   │   ├── auth.validation.js
│   │   └── employee.validation.js
│   ├── helpers/
│   │   ├── email.js
│   │   ├── recaptcha.js
│   │   ├── queryBuilder.js
│   │   └── helpers.js
│   ├── utils/
│   │   ├── AppError.js
│   │   ├── asyncHandler.js
│   │   ├── ApiResponse.js
│   │   ├── pagination.js
│   │   └── jwt.js
│   ├── cron/
│   │   └── index.js
│   ├── uploads/
│   │   ├── photos/
│   │   └── imports/
│   ├── logs/
│   └── docs/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🌐 Role Permissions

| Endpoint | Admin | Employee |
|----------|-------|----------|
| GET /employees | ✅ | ✅ |
| POST /employees | ✅ | ❌ |
| PUT /employees/:id | ✅ (full) | ✅ (limited fields) |
| DELETE /employees | ✅ | ❌ |
| GET /dashboard/stats | ✅ | ❌ |
| POST /upload/employees | ✅ | ❌ |
| POST /upload/profile-photo | ✅ | ✅ |
| GET /export/excel | ✅ | ❌ |
| GET /export/pdf | ✅ | ❌ |
| DELETE /files/:id | ✅ | ❌ |

---

## 📬 Default Credentials (Seeder)

| Username | Email | Password | Role |
|----------|-------|----------|------|
| superadmin | admin@nusacore.com | *(generate fresh hash)* | Admin |
| ahmad.rizki | ahmad.rizki@... | *(generate fresh hash)* | Employee |

> ⚠️ **PENTING**: Generate ulang password hash menggunakan bcrypt sebelum deploy ke production!

---

## ⚙️ Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | — |
| `DB_NAME` | Database name | `nusacore_hris` |
| `JWT_SECRET` | JWT signing secret (min 32 chars) | — |
| `JWT_REFRESH_SECRET` | Refresh token secret | — |
| `JWT_EXPIRES_IN` | Access token expiry | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | `7d` |
| `SESSION_SECRET` | Express session secret | — |
| `SESSION_MAX_AGE` | Session max age (ms) | `86400000` |
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username/email | — |
| `SMTP_PASS` | SMTP password/app password | — |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA secret | — |
| `RECAPTCHA_SITE_KEY` | Google reCAPTCHA site key | — |
| `MAX_FILE_SIZE` | Max upload size (bytes) | `10485760` (10MB) |
| `BCRYPT_SALT_ROUNDS` | bcrypt rounds | `12` |

---

## 📝 Response Format

**Success:**
```json
{
  "success": true,
  "message": "Success message",
  "data": {},
  "meta": {
    "currentPage": 1,
    "totalData": 100,
    "totalPages": 10
  }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    { "field": "email", "message": "Email is required.", "value": "" }
  ]
}
```

---

## 📄 License

MIT © 2024 PT Digital Nusantara

---

<div align="center">
  <p>Built with ❤️ by PT Digital Nusantara Engineering Team</p>
</div>
