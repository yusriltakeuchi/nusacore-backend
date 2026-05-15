# 🏢 NusaCore HRIS - Backend API

**NusaCore HRIS API** adalah sistem backend enterprise untuk pengelolaan data karyawan (Human Resource Information System). Project ini dikembangkan menggunakan **Node.js**, **Express.js**, dan **MySQL** sebagai bagian dari tugas besar / UTS.

---

## 🚀 Panduan Instalasi (Backend)

Ikuti langkah-langkah berikut untuk menjalankan server di perangkat lokal Anda:

### 1. Prerequisites
Pastikan perangkat Anda sudah terpasang:
- **Node.js** (v18+)
- **MySQL Server**
- **NPM**

### 2. Instalasi Dependencies
Jalankan perintah berikut di terminal:
```bash
npm install
```

### 3. Setup Database
1. Buat database baru di MySQL dengan nama `nusacore_hris`.
2. Import file database yang tersedia di: `database/full_database.sql`.
   - *File ini sudah mencakup skema tabel dan data awal (seeder).*

### 4. Konfigurasi Environment (.env)
Buat file `.env` di root direktori project, lalu gunakan nilai berikut:

```env
# Application
APP_NAME=NusaCore HRIS API
APP_ENV=development
PORT=3000
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=62569621144
DB_NAME=nusacore_hris

# JWT Configuration
JWT_SECRET=yur4n1s3cr3ts
JWT_REFRESH_SECRET=yur4n1s3cr3ts
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Session Configuration
SESSION_SECRET=yur4n1s3cr3ts
SESSION_NAME=nusacore_session

# SMTP / Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=411231045@mahasiswa.undira.ac.id
SMTP_PASS=anhj zxtw ytoz idzm
EMAIL_FROM=NusaCore HRIS <noreply@nusacore.com>

# Google reCAPTCHA v2 (Backend)
RECAPTCHA_SECRET_KEY=6LdzMuMsAAAAAMRTbM7y2O0JaB1uqhoH7WPryFjC
RECAPTCHA_SITE_KEY=6LdzMuMsAAAAAJs1O8DyGPDJg215uxd6jnFtrTBn
RECAPTCHA_VERIFY_URL=https://www.google.com/recaptcha/api/siteverify
```

### 5. Menjalankan Server
```bash
npm run dev
```
API akan berjalan di: `http://localhost:3000`

---

## 📖 Fitur Utama
- **Autentikasi**: Login, Register, Logout, Refresh Token, dan Reset Password.
- **Role Management**: Admin & Employee.
- **Employee CRUD**: Pengelolaan data lengkap karyawan.
- **Export/Import**: Mendukung format Excel dan PDF.
- **File Manager**: Sistem penyimpanan file terorganisir.
- **Security**: JWT Auth, Session, Rate Limiting, dan reCAPTCHA v2.

---

## 🔐 Akun Default
| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@nusacore.com` | `Admin@1234` |

---
**© 2026 PT Digital Nusantara - NusaCore HRIS**
