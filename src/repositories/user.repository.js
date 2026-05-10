'use strict';

const { query, queryOne, pool } = require('../config/database');

/**
 * User Repository
 * All database operations for users table
 */
const UserRepository = {
  /**
   * Find user by ID
   */
  async findById(id) {
    return queryOne(
      'SELECT id, employee_id, username, email, role, status, last_login, created_at FROM users WHERE id = ?',
      [id]
    );
  },

  /**
   * Find user by ID (with password for auth)
   */
  async findByIdWithPassword(id) {
    return queryOne('SELECT * FROM users WHERE id = ?', [id]);
  },

  /**
   * Find user by email
   */
  async findByEmail(email) {
    return queryOne('SELECT * FROM users WHERE email = ?', [email]);
  },

  /**
   * Find user by username
   */
  async findByUsername(username) {
    return queryOne('SELECT * FROM users WHERE username = ?', [username]);
  },

  /**
   * Find user by email or username (for login)
   */
  async findByEmailOrUsername(identifier) {
    return queryOne(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [identifier, identifier]
    );
  },

  /**
   * Create a new user
   */
  async create(data) {
    const sql = `
      INSERT INTO users (employee_id, username, email, password, role, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [
      data.employee_id || null,
      data.username,
      data.email,
      data.password,
      data.role || 'Employee',
      data.status || 'Active',
    ]);
    return result;
  },

  /**
   * Update last_login timestamp
   */
  async updateLastLogin(userId) {
    return pool.execute(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [userId]
    );
  },

  /**
   * Update user status
   */
  async updateStatus(userId, status) {
    return pool.execute(
      'UPDATE users SET status = ? WHERE id = ?',
      [status, userId]
    );
  },

  /**
   * Update password
   */
  async updatePassword(userId, hashedPassword) {
    return pool.execute(
      'UPDATE users SET password = ?, remember_token = NULL WHERE id = ?',
      [hashedPassword, userId]
    );
  },

  /**
   * Count all users
   */
  async count() {
    const row = await queryOne('SELECT COUNT(*) as total FROM users');
    return row?.total || 0;
  },

  /**
   * Get all users (for admin)
   */
  async findAll() {
    return query(
      'SELECT id, employee_id, username, email, role, status, last_login, created_at FROM users ORDER BY created_at DESC'
    );
  },
};

module.exports = UserRepository;
