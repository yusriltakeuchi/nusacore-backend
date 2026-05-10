'use strict';

/**
 * Reusable Query Builder for employee search/filter/sort
 * Builds dynamic WHERE clauses and ORDER BY safely
 */

/**
 * Build WHERE clause for employee listing
 * @param {Object} filters - { search, division, employment_status, gender }
 * @returns {{ whereClause: string, params: Array }}
 */
function buildEmployeeWhereClause(filters = {}) {
  const conditions = [];
  const params = [];

  if (filters.search) {
    conditions.push(`(e.full_name LIKE ? OR e.email LIKE ? OR e.employee_code LIKE ?)`);
    const like = `%${filters.search}%`;
    params.push(like, like, like);
  }

  if (filters.division) {
    conditions.push(`e.division LIKE ?`);
    params.push(`%${filters.division}%`);
  }

  if (filters.employment_status) {
    conditions.push(`e.employment_status = ?`);
    params.push(filters.employment_status);
  }

  if (filters.gender) {
    conditions.push(`e.gender = ?`);
    params.push(filters.gender);
  }

  if (filters.city) {
    conditions.push(`e.city LIKE ?`);
    params.push(`%${filters.city}%`);
  }

  if (filters.marital_status) {
    conditions.push(`e.marital_status = ?`);
    params.push(filters.marital_status);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  return { whereClause, params };
}

/**
 * Build ORDER BY clause with whitelist for safe column sorting
 * @param {string} sortBy - Column name
 * @param {string} sortOrder - ASC or DESC
 * @param {string} tableAlias - Table alias prefix (e.g. 'e')
 * @returns {string} ORDER BY clause
 */
function buildOrderByClause(sortBy, sortOrder, tableAlias = 'e') {
  const allowedColumns = [
    'full_name', 'email', 'employee_code', 'division', 'position',
    'salary', 'join_date', 'employment_status', 'created_at', 'updated_at',
  ];

  const column = allowedColumns.includes(sortBy) ? sortBy : 'created_at';
  const order = sortOrder && sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  return `ORDER BY ${tableAlias}.${column} ${order}`;
}

module.exports = { buildEmployeeWhereClause, buildOrderByClause };
