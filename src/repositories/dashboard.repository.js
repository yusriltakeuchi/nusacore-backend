'use strict';

const { queryOne, query } = require('../config/database');

/**
 * Dashboard Repository
 * Aggregated analytics queries
 */
const DashboardRepository = {
  /**
   * Get overall employee counts
   */
  async getEmployeeStats() {
    return queryOne(`
      SELECT
        COUNT(*) as total_employees,
        SUM(CASE WHEN employment_status = 'Active' THEN 1 ELSE 0 END) as total_active,
        SUM(CASE WHEN employment_status = 'Inactive' THEN 1 ELSE 0 END) as total_inactive,
        SUM(CASE WHEN employment_status = 'Resigned' THEN 1 ELSE 0 END) as total_resigned
      FROM employees
    `);
  },

  /**
   * Count distinct divisions
   */
  async countDivisions() {
    const row = await queryOne(
      `SELECT COUNT(DISTINCT division) as total_divisions FROM employees WHERE division IS NOT NULL AND division != ''`
    );
    return row?.total_divisions || 0;
  },

  /**
   * Count all users
   */
  async countUsers() {
    const row = await queryOne('SELECT COUNT(*) as total_users FROM users');
    return row?.total_users || 0;
  },

  /**
   * Get employee count grouped by division (for chart)
   */
  async getEmployeeByDivision() {
    return query(`
      SELECT 
        division as label,
        COUNT(*) as value
      FROM employees
      WHERE division IS NOT NULL AND division != ''
      GROUP BY division
      ORDER BY value DESC
      LIMIT 10
    `);
  },

  /**
   * Get employee count grouped by gender (for chart)
   */
  async getEmployeeByGender() {
    return query(`
      SELECT 
        gender as label,
        COUNT(*) as value
      FROM employees
      WHERE gender IS NOT NULL
      GROUP BY gender
    `);
  },

  /**
   * Get recent join employees (last 5)
   */
  async getRecentEmployees(limit = 5) {
    return query(`
      SELECT id, full_name, division, position, join_date, employment_status, profile_photo
      FROM employees
      ORDER BY join_date DESC
      LIMIT ?
    `, [limit]);
  },

  /**
   * Get employee count by employment_status for chart
   */
  async getEmployeeByStatus() {
    return query(`
      SELECT 
        employment_status as label,
        COUNT(*) as value
      FROM employees
      GROUP BY employment_status
    `);
  },
};

module.exports = DashboardRepository;
