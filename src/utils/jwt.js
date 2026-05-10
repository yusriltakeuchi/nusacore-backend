'use strict';

const jwt = require('jsonwebtoken');
const AppError = require('./AppError');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret_please_change_in_production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_please_change';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

/**
 * Generate JWT access token
 * @param {Object} payload - Token payload
 * @returns {string} Signed JWT access token
 */
function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'nusacore-hris',
    audience: 'nusacore-client',
  });
}

/**
 * Generate JWT refresh token
 * @param {Object} payload - Token payload
 * @returns {string} Signed JWT refresh token
 */
function generateRefreshToken(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
    issuer: 'nusacore-hris',
    audience: 'nusacore-client',
  });
}

/**
 * Verify JWT access token
 * @param {string} token - JWT token string
 * @returns {Object} Decoded payload
 */
function verifyAccessToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'nusacore-hris',
      audience: 'nusacore-client',
    });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AppError('Access token has expired', 401);
    }
    throw new AppError('Invalid access token', 401);
  }
}

/**
 * Verify JWT refresh token
 * @param {string} token - JWT refresh token string
 * @returns {Object} Decoded payload
 */
function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET, {
      issuer: 'nusacore-hris',
      audience: 'nusacore-client',
    });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AppError('Refresh token has expired. Please log in again.', 401);
    }
    throw new AppError('Invalid refresh token', 401);
  }
}

/**
 * Decode token without verification (for logging purposes)
 * @param {string} token
 * @returns {Object|null}
 */
function decodeToken(token) {
  return jwt.decode(token);
}

/**
 * Get refresh token expiry as Date
 */
function getRefreshTokenExpiryDate() {
  const ms = parseExpiresIn(JWT_REFRESH_EXPIRES_IN);
  return new Date(Date.now() + ms);
}

/**
 * Parse human-readable expiry to milliseconds
 */
function parseExpiresIn(str) {
  const units = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  const match = str.match(/^(\d+)([smhd])$/);
  if (!match) return 900000; // default 15 min
  return parseInt(match[1]) * (units[match[2]] || 1000);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
  getRefreshTokenExpiryDate,
};
