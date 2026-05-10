'use strict';

const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/employee.controller');
const {
  createEmployeeValidation,
  updateEmployeeValidation,
  getEmployeesValidation,
} = require('../validations/employee.validation');
const validationHandler = require('../middlewares/validationHandler');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee CRUD — search, filter, pagination
 */

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees (paginated, searchable, filterable)
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *         description: Items per page (max 100)
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search by name, email, or employee code
 *       - in: query
 *         name: division
 *         schema: { type: string }
 *         description: Filter by division
 *       - in: query
 *         name: employment_status
 *         schema: { type: string, enum: [Active, Inactive, Resigned] }
 *       - in: query
 *         name: gender
 *         schema: { type: string, enum: [Male, Female] }
 *       - in: query
 *         name: sort_by
 *         schema: { type: string, default: created_at }
 *         description: Column to sort by
 *       - in: query
 *         name: sort_order
 *         schema: { type: string, enum: [ASC, DESC], default: DESC }
 *     responses:
 *       200:
 *         description: Paginated employee list
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, getEmployeesValidation, validationHandler, EmployeeController.getAll);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Employee data
 *       404:
 *         description: Employee not found
 */
router.get('/:id', authMiddleware, EmployeeController.getById);

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee (Admin only)
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [full_name, gender, email]
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: Budi Santoso
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *               email:
 *                 type: string
 *                 format: email
 *               birth_date:
 *                 type: string
 *                 format: date
 *               phone_number:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               province:
 *                 type: string
 *               division:
 *                 type: string
 *               position:
 *                 type: string
 *               salary:
 *                 type: number
 *               join_date:
 *                 type: string
 *                 format: date
 *               employment_status:
 *                 type: string
 *                 enum: [Active, Inactive, Resigned]
 *               education:
 *                 type: string
 *               marital_status:
 *                 type: string
 *                 enum: [Single, Married]
 *     responses:
 *       201:
 *         description: Employee created
 *       409:
 *         description: Email already exists
 */
router.post('/', authMiddleware, roleMiddleware('Admin'), createEmployeeValidation, validationHandler, EmployeeController.create);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update employee (Admin full access; Employee limited fields)
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated
 *       404:
 *         description: Not found
 */
router.put('/:id', authMiddleware, updateEmployeeValidation, validationHandler, EmployeeController.update);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete employee (Admin only)
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Employee deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', authMiddleware, roleMiddleware('Admin'), EmployeeController.delete);

module.exports = router;
