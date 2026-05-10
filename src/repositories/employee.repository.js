'use strict';

const { query, queryOne } = require('../config/database');
const { buildEmployeeWhereClause, buildOrderByClause } = require('../helpers/queryBuilder');
const { parsePagination, buildPaginationMeta } = require('../utils/pagination');

/**
 * Employee Repository
 * All database operations for employees table
 */
const EmployeeRepository = {
  /**
   * Get all employees with pagination, filtering, searching, sorting
   */
  async findAll(filters = {}, queryParams = {}) {
    const { page, limit, offset } = parsePagination(queryParams);
    const sortBy = queryParams.sort_by || 'created_at';
    const sortOrder = queryParams.sort_order || 'DESC';

    const { whereClause, params } = buildEmployeeWhereClause(filters);
    const orderBy = buildOrderByClause(sortBy, sortOrder, 'e');

    const countSql = `SELECT COUNT(*) as total FROM employees e ${whereClause}`;
    const countResult = await queryOne(countSql, params);
    const totalData = countResult?.total || 0;

    const dataSql = `
      SELECT 
        e.id, e.employee_code, e.full_name, e.gender, e.birth_date,
        e.email, e.phone_number, e.address, e.city, e.province,
        e.postal_code, e.division, e.position, e.salary, e.join_date,
        e.employment_status, e.profile_photo, e.emergency_contact,
        e.emergency_phone, e.education, e.marital_status,
        e.created_at, e.updated_at
      FROM employees e
      ${whereClause}
      ${orderBy}
      LIMIT ? OFFSET ?
    `;
    const rows = await query(dataSql, [...params, limit, offset]);
    const meta = buildPaginationMeta(totalData, page, limit);

    return { rows, meta };
  },

  /**
   * Find employee by ID
   */
  async findById(id) {
    return queryOne('SELECT * FROM employees WHERE id = ?', [id]);
  },

  /**
   * Find employee by email
   */
  async findByEmail(email) {
    return queryOne('SELECT * FROM employees WHERE email = ?', [email]);
  },

  /**
   * Find employee by employee_code
   */
  async findByCode(employeeCode) {
    return queryOne('SELECT * FROM employees WHERE employee_code = ?', [employeeCode]);
  },

  /**
   * Create a new employee
   * @param {Object} data - Employee fields
   * @returns {Object} Insert result
   */
  async create(data) {
    const sql = `
      INSERT INTO employees (
        employee_code, full_name, gender, birth_date, email, phone_number,
        address, city, province, postal_code, division, position, salary,
        join_date, employment_status, profile_photo, emergency_contact,
        emergency_phone, education, marital_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.employee_code, data.full_name, data.gender, data.birth_date || null,
      data.email, data.phone_number || null, data.address || null,
      data.city || null, data.province || null, data.postal_code || null,
      data.division || null, data.position || null,
      data.salary !== undefined ? data.salary : 0,
      data.join_date || null,
      data.employment_status || 'Active',
      data.profile_photo || null,
      data.emergency_contact || null, data.emergency_phone || null,
      data.education || null,
      data.marital_status || 'Single',
    ];
    const [result] = await require('../config/database').pool.execute(sql, params);
    return result;
  },

  /**
   * Update employee by ID
   */
  async update(id, data) {
    const fields = [];
    const params = [];

    const updatable = [
      'full_name', 'gender', 'birth_date', 'email', 'phone_number', 'address',
      'city', 'province', 'postal_code', 'division', 'position', 'salary',
      'join_date', 'employment_status', 'profile_photo', 'emergency_contact',
      'emergency_phone', 'education', 'marital_status',
    ];

    updatable.forEach(field => {
      if (data[field] !== undefined) {
        fields.push(`${field} = ?`);
        params.push(data[field]);
      }
    });

    if (fields.length === 0) return null;
    params.push(id);

    const sql = `UPDATE employees SET ${fields.join(', ')} WHERE id = ?`;
    const [result] = await require('../config/database').pool.execute(sql, params);
    return result;
  },

  /**
   * Delete employee by ID
   */
  async delete(id) {
    const [result] = await require('../config/database').pool.execute(
      'DELETE FROM employees WHERE id = ?', [id]
    );
    return result;
  },

  /**
   * Get next available sequence for employee code generation
   */
  async getNextSequence() {
    const row = await queryOne('SELECT MAX(id) as max_id FROM employees');
    return (row?.max_id || 0) + 1;
  },

  /**
   * Bulk insert employees (for import)
   * @param {Array} employees - Array of employee data objects
   * @param {Object} connection - MySQL connection (for transactions)
   */
  async bulkCreate(employees, connection) {
    const results = [];
    for (const emp of employees) {
      try {
        const sql = `
          INSERT INTO employees (
            employee_code, full_name, gender, birth_date, email, phone_number,
            address, city, province, postal_code, division, position, salary,
            join_date, employment_status, education, marital_status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
          emp.employee_code, emp.full_name, emp.gender, emp.birth_date || null,
          emp.email, emp.phone_number || null, emp.address || null,
          emp.city || null, emp.province || null, emp.postal_code || null,
          emp.division || null, emp.position || null,
          emp.salary || 0, emp.join_date || null,
          emp.employment_status || 'Active',
          emp.education || null, emp.marital_status || 'Single',
        ];
        const [res] = await connection.execute(sql, params);
        results.push({ success: true, id: res.insertId, email: emp.email });
      } catch (err) {
        results.push({ success: false, email: emp.email, error: err.message });
      }
    }
    return results;
  },

  /**
   * Get all employees for export (no pagination)
   */
  async findAllForExport(filters = {}) {
    const { whereClause, params } = buildEmployeeWhereClause(filters);
    const sql = `
      SELECT 
        employee_code, full_name, gender, birth_date, email, phone_number,
        address, city, province, postal_code, division, position, salary,
        join_date, employment_status, education, marital_status,
        emergency_contact, emergency_phone, created_at
      FROM employees e
      ${whereClause}
      ORDER BY e.created_at DESC
    `;
    return query(sql, params);
  },
};

module.exports = EmployeeRepository;
