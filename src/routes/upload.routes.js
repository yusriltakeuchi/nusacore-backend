'use strict';

const express = require('express');
const router = express.Router();

const UploadController = require('../controllers/upload.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { uploadImport, uploadPhoto } = require('../config/multer');

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload endpoints (import employees, profile photo)
 */

/**
 * @swagger
 * /api/upload/employees:
 *   post:
 *     summary: Import employees from Excel (.xlsx) or CSV file (Admin only)
 *     tags: [Upload]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Excel (.xlsx, .xls) or CSV file
 *     responses:
 *       200:
 *         description: Import completed with summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_rows: { type: integer }
 *                     valid_rows: { type: integer }
 *                     invalid_rows: { type: integer }
 *                     inserted: { type: integer }
 *                     failed: { type: integer }
 *                     invalid_details: { type: array }
 *       400:
 *         description: No file or invalid file type
 *       403:
 *         description: Admin access required
 */
router.post(
  '/employees',
  authMiddleware,
  roleMiddleware('Admin'),
  uploadImport.single('file'),
  UploadController.importEmployees
);

/**
 * @swagger
 * /api/upload/profile-photo:
 *   post:
 *     summary: Upload a profile photo for an employee
 *     tags: [Upload]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file, employee_id]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPEG, PNG, WEBP — max 10MB)
 *               employee_id:
 *                 type: integer
 *                 description: Target employee ID
 *     responses:
 *       200:
 *         description: Photo uploaded successfully
 *       400:
 *         description: No file or missing employee_id
 */
router.post(
  '/profile-photo',
  authMiddleware,
  uploadPhoto.single('file'),
  UploadController.uploadProfilePhoto
);

module.exports = router;
