'use strict';

const express = require('express');
const router = express.Router();

const DashboardController = require('../controllers/dashboard.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Analytics and statistics (Admin only)
 */

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics and chart data
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     summary:
 *                       type: object
 *                       properties:
 *                         total_employees: { type: integer }
 *                         total_active: { type: integer }
 *                         total_inactive: { type: integer }
 *                         total_resigned: { type: integer }
 *                         total_divisions: { type: integer }
 *                         total_users: { type: integer }
 *                     charts:
 *                       type: object
 *                       properties:
 *                         employee_by_division:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               label: { type: string }
 *                               value: { type: integer }
 *                         employee_by_gender:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               label: { type: string }
 *                               value: { type: integer }
 *                         employee_by_status:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               label: { type: string }
 *                               value: { type: integer }
 *                     recent_employees:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.get('/stats', authMiddleware, roleMiddleware('Admin'), DashboardController.getStats);

module.exports = router;
