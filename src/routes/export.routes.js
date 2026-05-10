'use strict';

const express = require('express');
const router = express.Router();

const ExportController = require('../controllers/export.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Export
 *   description: Export employee data to Excel or PDF (Admin only)
 */

/**
 * @swagger
 * /api/export/excel:
 *   get:
 *     summary: Export all employees to Excel (.xlsx)
 *     tags: [Export]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: division
 *         schema: { type: string }
 *       - in: query
 *         name: employment_status
 *         schema: { type: string, enum: [Active, Inactive, Resigned] }
 *     responses:
 *       200:
 *         description: Excel file downloaded
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.get('/excel', authMiddleware, roleMiddleware('Admin'), ExportController.exportExcel);

/**
 * @swagger
 * /api/export/pdf:
 *   get:
 *     summary: Export all employees to PDF report
 *     tags: [Export]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: division
 *         schema: { type: string }
 *       - in: query
 *         name: employment_status
 *         schema: { type: string, enum: [Active, Inactive, Resigned] }
 *     responses:
 *       200:
 *         description: PDF file downloaded
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get('/pdf', authMiddleware, roleMiddleware('Admin'), ExportController.exportPDF);

module.exports = router;
