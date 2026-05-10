'use strict';

const EmployeeService = require('../services/employee.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Employee Controller
 * Handles all employee CRUD endpoints
 */
const EmployeeController = {
  /**
   * GET /api/employees
   * Get paginated list with search, filter, sort
   */
  getAll: asyncHandler(async (req, res) => {
    const { rows, meta } = await EmployeeService.getAll(req.query);
    return ApiResponse.success(res, 'Employees retrieved successfully.', rows, meta);
  }),

  /**
   * GET /api/employees/:id
   */
  getById: asyncHandler(async (req, res) => {
    const employee = await EmployeeService.getById(parseInt(req.params.id));
    return ApiResponse.success(res, 'Employee retrieved successfully.', employee);
  }),

  /**
   * POST /api/employees
   * Admin only
   */
  create: asyncHandler(async (req, res) => {
    const employee = await EmployeeService.create(req.body);
    return ApiResponse.created(res, 'Employee created successfully.', employee);
  }),

  /**
   * PUT /api/employees/:id
   * Admin can update any; Employee can update own profile (limited fields)
   */
  update: asyncHandler(async (req, res) => {
    const employee = await EmployeeService.update(
      parseInt(req.params.id),
      req.body,
      req.user
    );
    return ApiResponse.success(res, 'Employee updated successfully.', employee);
  }),

  /**
   * DELETE /api/employees/:id
   * Admin only
   */
  delete: asyncHandler(async (req, res) => {
    await EmployeeService.delete(parseInt(req.params.id));
    return ApiResponse.success(res, 'Employee deleted successfully.');
  }),
};

module.exports = EmployeeController;
