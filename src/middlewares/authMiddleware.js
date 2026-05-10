'use strict';

const { verifyAccessToken } = require('../utils/jwt');
const ApiResponse = require('../utils/ApiResponse');
const { queryOne } = require('../config/database');

/**
 * Authentication Middleware
 * Verifies JWT access token from Authorization header or session
 */
async function authMiddleware(req, res, next) {
  try {
    let token = null;

    // 1. Check Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }

    // 2. Fallback to session (if session-based login)
    if (!token && req.session && req.session.userId) {
      // Session-based: load user from DB
      const user = await queryOne(
        'SELECT id, username, email, role, status FROM users WHERE id = ? AND status = ?',
        [req.session.userId, 'Active']
      );
      if (!user) return ApiResponse.unauthorized(res, 'Session expired. Please log in again.');
      req.user = user;
      return next();
    }

    if (!token) return ApiResponse.unauthorized(res, 'Access token is required.');

    // Verify JWT
    const decoded = verifyAccessToken(token);

    // Load user from DB to ensure they still exist and are active
    const user = await queryOne(
      'SELECT id, username, email, role, status FROM users WHERE id = ? AND status = ?',
      [decoded.id, 'Active']
    );

    if (!user) return ApiResponse.unauthorized(res, 'User account not found or inactive.');

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    if (err.statusCode === 401) return ApiResponse.unauthorized(res, err.message);
    next(err);
  }
}

module.exports = authMiddleware;
