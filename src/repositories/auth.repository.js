'use strict';

const { queryOne, pool, query } = require('../config/database');

/**
 * Auth Repository
 * Handles password_resets, login_logs, refresh_tokens
 */
const AuthRepository = {
  // ─── Password Resets ──────────────────────────────────────────────

  /**
   * Create password reset token
   */
  async createPasswordReset(userId, token, expiredAt) {
    // Invalidate any existing tokens for this user
    await pool.execute('DELETE FROM password_resets WHERE user_id = ?', [userId]);
    const [result] = await pool.execute(
      'INSERT INTO password_resets (user_id, token, expired_at) VALUES (?, ?, ?)',
      [userId, token, expiredAt]
    );
    return result;
  },

  /**
   * Find valid password reset token
   */
  async findValidResetToken(token) {
    return queryOne(
      'SELECT * FROM password_resets WHERE token = ? AND expired_at > NOW()',
      [token]
    );
  },

  /**
   * Delete password reset token
   */
  async deleteResetToken(token) {
    return pool.execute('DELETE FROM password_resets WHERE token = ?', [token]);
  },

  /**
   * Delete all reset tokens for a user
   */
  async deleteUserResetTokens(userId) {
    return pool.execute('DELETE FROM password_resets WHERE user_id = ?', [userId]);
  },

  // ─── Login Logs ───────────────────────────────────────────────────

  /**
   * Record a login attempt
   */
  async createLoginLog(userId, ipAddress, userAgent, status) {
    return pool.execute(
      'INSERT INTO login_logs (user_id, ip_address, user_agent, status) VALUES (?, ?, ?, ?)',
      [userId || null, ipAddress, userAgent, status]
    );
  },

  /**
   * Count failed login attempts in a time window
   */
  async countRecentFailedLogins(userId, windowMinutes = 15) {
    const row = await queryOne(
      `SELECT COUNT(*) as total FROM login_logs 
       WHERE user_id = ? AND status = 'Failed' 
       AND login_at >= DATE_SUB(NOW(), INTERVAL ? MINUTE)`,
      [userId, windowMinutes]
    );
    return row?.total || 0;
  },

  // ─── Refresh Tokens ───────────────────────────────────────────────

  /**
   * Save refresh token to DB
   */
  async saveRefreshToken(userId, token, expiresAt) {
    const [result] = await pool.execute(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
      [userId, token, expiresAt]
    );
    return result;
  },

  /**
   * Find valid refresh token
   */
  async findRefreshToken(token) {
    return queryOne(
      'SELECT * FROM refresh_tokens WHERE token = ? AND is_revoked = 0 AND expires_at > NOW()',
      [token]
    );
  },

  /**
   * Revoke a refresh token
   */
  async revokeRefreshToken(token) {
    return pool.execute(
      'UPDATE refresh_tokens SET is_revoked = 1 WHERE token = ?',
      [token]
    );
  },

  /**
   * Revoke all refresh tokens for a user (logout all devices)
   */
  async revokeAllUserRefreshTokens(userId) {
    return pool.execute(
      'UPDATE refresh_tokens SET is_revoked = 1 WHERE user_id = ?',
      [userId]
    );
  },

  /**
   * Clean up expired tokens (called by cron job)
   */
  async deleteExpiredTokens() {
    const [r1] = await pool.execute('DELETE FROM refresh_tokens WHERE expires_at <= NOW()');
    const [r2] = await pool.execute('DELETE FROM password_resets WHERE expired_at <= NOW()');
    return { refreshTokensDeleted: r1.affectedRows, resetTokensDeleted: r2.affectedRows };
  },
};

module.exports = AuthRepository;
