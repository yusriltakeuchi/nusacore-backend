'use strict';

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const AppError = require('../utils/AppError');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
const PHOTO_DIR = path.join(UPLOAD_DIR, 'photos');
const IMPORT_DIR = path.join(UPLOAD_DIR, 'imports');

// Ensure directories exist
[UPLOAD_DIR, PHOTO_DIR, IMPORT_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

/**
 * Storage for profile photos
 */
const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, PHOTO_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `photo_${uuidv4()}${ext}`);
  },
});

/**
 * Storage for import files (Excel/CSV)
 */
const importStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMPORT_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `import_${uuidv4()}${ext}`);
  },
});

/**
 * Photo file filter
 */
const photoFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file type. Only JPEG, PNG, JPG, WEBP are allowed.', 400), false);
  }
};

/**
 * Import file filter
 */
const importFilter = (req, file, cb) => {
  const allowed = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
    'application/csv',
  ];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(file.mimetype) || ['.xlsx', '.xls', '.csv'].includes(ext)) {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file type. Only Excel (.xlsx, .xls) and CSV are allowed.', 400), false);
  }
};

const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024; // 10MB

/**
 * Upload middleware for profile photos
 */
const uploadPhoto = multer({
  storage: photoStorage,
  fileFilter: photoFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

/**
 * Upload middleware for import files
 */
const uploadImport = multer({
  storage: importStorage,
  fileFilter: importFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

module.exports = {
  uploadPhoto,
  uploadImport,
  UPLOAD_DIR,
  PHOTO_DIR,
  IMPORT_DIR,
};
