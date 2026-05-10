'use strict';

const express = require('express');
const router = express.Router();

const FileController = require('../controllers/file.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: Manage uploaded files
 */

/**
 * @swagger
 * /api/files:
 *   get:
 *     summary: Get all uploaded file records (Admin only)
 *     tags: [Files]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of uploaded files
 *       403:
 *         description: Admin access required
 */
router.get('/', authMiddleware, roleMiddleware('Admin'), FileController.getAll);

/**
 * @swagger
 * /api/files/{id}:
 *   delete:
 *     summary: Delete an uploaded file (Admin only)
 *     tags: [Files]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: File record ID
 *     responses:
 *       200:
 *         description: File deleted from storage and database
 *       404:
 *         description: File not found
 */
router.delete('/:id', authMiddleware, roleMiddleware('Admin'), FileController.delete);

module.exports = router;
