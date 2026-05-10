-- ============================================================
-- NusaCore HRIS API - Database Schema
-- PT Digital Nusantara
-- Version: 1.0.0
-- ============================================================

CREATE DATABASE IF NOT EXISTS nusacore_hris CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nusacore_hris;

-- ============================================================
-- TABLE: employees
-- ============================================================
CREATE TABLE IF NOT EXISTS employees (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  employee_code     VARCHAR(20) UNIQUE NOT NULL,
  full_name         VARCHAR(100) NOT NULL,
  gender            ENUM('Male', 'Female') NOT NULL,
  birth_date        DATE,
  email             VARCHAR(100) UNIQUE NOT NULL,
  phone_number      VARCHAR(20),
  address           TEXT,
  city              VARCHAR(100),
  province          VARCHAR(100),
  postal_code       VARCHAR(10),
  division          VARCHAR(100),
  position          VARCHAR(100),
  salary            DECIMAL(12, 2) DEFAULT 0.00,
  join_date         DATE,
  employment_status ENUM('Active', 'Inactive', 'Resigned') DEFAULT 'Active',
  profile_photo     VARCHAR(255) DEFAULT NULL,
  emergency_contact VARCHAR(100),
  emergency_phone   VARCHAR(20),
  education         VARCHAR(100),
  marital_status    ENUM('Single', 'Married') DEFAULT 'Single',
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_employee_code (employee_code),
  INDEX idx_email (email),
  INDEX idx_division (division),
  INDEX idx_employment_status (employment_status),
  INDEX idx_full_name (full_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: users
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  employee_id    INT DEFAULT NULL,
  username       VARCHAR(100) UNIQUE NOT NULL,
  email          VARCHAR(100) UNIQUE NOT NULL,
  password       VARCHAR(255) NOT NULL,
  role           ENUM('Admin', 'Employee') DEFAULT 'Employee',
  status         ENUM('Active', 'Inactive') DEFAULT 'Active',
  remember_token VARCHAR(255) DEFAULT NULL,
  last_login     DATETIME DEFAULT NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_users_employee FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL ON UPDATE CASCADE,

  INDEX idx_username (username),
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: password_resets
-- ============================================================
CREATE TABLE IF NOT EXISTS password_resets (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  token      VARCHAR(255) NOT NULL,
  expired_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_password_resets_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,

  INDEX idx_token (token),
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: login_logs
-- ============================================================
CREATE TABLE IF NOT EXISTS login_logs (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT DEFAULT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  login_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  status     ENUM('Success', 'Failed') NOT NULL,

  CONSTRAINT fk_login_logs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,

  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_login_at (login_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: uploaded_files
-- ============================================================
CREATE TABLE IF NOT EXISTS uploaded_files (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  original_name VARCHAR(255) NOT NULL,
  stored_name   VARCHAR(255) NOT NULL,
  file_path     VARCHAR(255) NOT NULL,
  file_size     INT NOT NULL,
  uploaded_by   INT DEFAULT NULL,
  uploaded_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_uploaded_files_user FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,

  INDEX idx_uploaded_by (uploaded_by),
  INDEX idx_uploaded_at (uploaded_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: sessions (for express-mysql-session)
-- ============================================================
CREATE TABLE IF NOT EXISTS sessions (
  session_id VARCHAR(255) NOT NULL PRIMARY KEY,
  expires    INT(11) UNSIGNED NOT NULL,
  data       MEDIUMTEXT,

  INDEX idx_expires (expires)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: refresh_tokens
-- ============================================================
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  token      TEXT NOT NULL,
  expires_at DATETIME NOT NULL,
  is_revoked TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_refresh_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,

  INDEX idx_user_id (user_id),
  INDEX idx_is_revoked (is_revoked)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
