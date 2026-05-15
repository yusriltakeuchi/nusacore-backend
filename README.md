# 🏢 NusaCore HRIS API

**NusaCore HRIS API** adalah sistem backend untuk pengelolaan data karyawan (Human Resource Information System). Project ini dibangun menggunakan **Node.js**, **Express.js**, dan **MySQL**.

---

## 🚀 Panduan Instalasi

Ikuti langkah-langkah berikut untuk menjalankan project di perangkat lokal Anda:

### 1. Prerequisites
Pastikan Anda sudah menginstall:
- [Node.js](https://nodejs.org/) (Versi 18 atau terbaru)
- [MySQL Server](https://www.mysql.com/)
- [NPM](https://www.npmjs.com/) (Biasanya ikut terinstall bersama Node.js)

### 2. Clone & Install Dependencies
Buka terminal dan jalankan perintah berikut:
```bash
# Masuk ke direktori project
cd nusacore

# Install library yang dibutuhkan
npm install
```

### 3. Setup Database
1. Buka aplikasi database management Anda (seperti MySQL Workbench, phpMyAdmin, atau TablePlus).
2. Buat database baru dengan nama `nusacore_hris`.
3. Import file database yang sudah disediakan:
   - Lokasi file: `database/full_database.sql`
   - File ini berisi struktur tabel sekaligus data awal (seeder) agar project bisa langsung dicoba.

### 4. Konfigurasi Environment (.env)
Buat file baru bernama `.env` di root direktori project, lalu salin dan tempel konfigurasi berikut:

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
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Session Configuration
SESSION_SECRET=yur4n1s3cr3ts
SESSION_NAME=nusacore_session
SESSION_MAX_AGE=86400000
SESSION_SECURE=false

# SMTP / Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=411231045@mahasiswa.undira.ac.id
SMTP_PASS=anhj zxtw ytoz idzm
EMAIL_FROM=NusaCore HRIS <noreply@nusacore.com>

# Google reCAPTCHA v2
RECAPTCHA_SECRET_KEY=6LdzMuMsAAAAAMRTbM7y2O0JaB1uqhoH7WPryFjC
RECAPTCHA_SITE_KEY=6LdzMuMsAAAAAJs1O8DyGPDJg215uxd6jnFtrTBn
RECAPTCHA_VERIFY_URL=https://www.google.com/recaptcha/api/siteverify

# File Upload
UPLOAD_DIR=src/uploads
MAX_FILE_SIZE=10485760
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/jpg,image/webp
ALLOWED_IMPORT_TYPES=application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv

# CORS Origins
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:3001
```

### 5. Menjalankan Server
Jalankan perintah berikut untuk memulai server dalam mode development:
```bash
npm run dev
```
Server akan berjalan di: `http://localhost:3000`

---

## 📖 Dokumentasi API
Setelah server berjalan, Anda dapat melihat dokumentasi API lengkap menggunakan Swagger UI di:
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🔐 Akun Default (Login)
Gunakan akun berikut untuk mencoba fitur login:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@nusacore.com` | `Admin@1234` |

---
**PT Digital Nusantara**
