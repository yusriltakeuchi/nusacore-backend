'use strict';

const EmployeeRepository = require('../repositories/employee.repository');
const AppError = require('../utils/AppError');
const { generateEmployeeCode } = require('../helpers/helpers');

/**
 * Employee Service
 * Business logic for employee management
 */
const EmployeeService = {
  /**
   * Get paginated employee list
   */
  async getAll(queryParams) {
    const filters = {
      search: queryParams.search || null,
      division: queryParams.division || null,
      employment_status: queryParams.employment_status || null,
      gender: queryParams.gender || null,
      city: queryParams.city || null,
      marital_status: queryParams.marital_status || null,
    };

    return EmployeeRepository.findAll(filters, queryParams);
  },

  /**
   * Get single employee by ID
   */
  async getById(id) {
    const employee = await EmployeeRepository.findById(id);
    if (!employee) throw new AppError(`Employee with ID ${id} not found.`, 404);
    return employee;
  },

  /**
   * Create new employee
   */
  async create(data) {
    // Check email uniqueness
    const existing = await EmployeeRepository.findByEmail(data.email);
    if (existing) throw new AppError('An employee with this email already exists.', 409);

    // Generate employee code
    const seq = await EmployeeRepository.getNextSequence();
    data.employee_code = generateEmployeeCode(seq);

    const result = await EmployeeRepository.create(data);
    const newEmployee = await EmployeeRepository.findById(result.insertId);
    return newEmployee;
  },

  /**
   * Update employee
   */
  async update(id, data, requestingUser) {
    const employee = await EmployeeRepository.findById(id);
    if (!employee) throw new AppError(`Employee with ID ${id} not found.`, 404);

    // Employee role can only update their own profile
    if (requestingUser.role === 'Employee') {
      const userEmployee = await require('../repositories/user.repository').findById(requestingUser.id);
      // Restrict fields that employee can update
      const allowedFields = ['phone_number', 'address', 'city', 'province', 'postal_code',
        'emergency_contact', 'emergency_phone', 'marital_status'];
      const restricted = Object.keys(data).filter(k => !allowedFields.includes(k));
      if (restricted.length > 0) {
        throw new AppError(`Employees cannot update: ${restricted.join(', ')}`, 403);
      }
    }

    // Check email uniqueness if email is being updated
    if (data.email && data.email !== employee.email) {
      const existing = await EmployeeRepository.findByEmail(data.email);
      if (existing) throw new AppError('An employee with this email already exists.', 409);
    }

    await EmployeeRepository.update(id, data);
    return EmployeeRepository.findById(id);
  },

  /**
   * Delete employee
   */
  async delete(id) {
    const employee = await EmployeeRepository.findById(id);
    if (!employee) throw new AppError(`Employee with ID ${id} not found.`, 404);
    await EmployeeRepository.delete(id);
    return true;
  },

  /**
   * Update profile photo
   */
  async updateProfilePhoto(employeeId, photoPath) {
    await EmployeeRepository.update(employeeId, { profile_photo: photoPath });
    return EmployeeRepository.findById(employeeId);
  },

  /**
   * Get all employees for export
   */
  async getAllForExport(queryParams) {
    const filters = {
      search: queryParams.search || null,
      division: queryParams.division || null,
      employment_status: queryParams.employment_status || null,
    };
    return EmployeeRepository.findAllForExport(filters);
  },
};

module.exports = EmployeeService;
