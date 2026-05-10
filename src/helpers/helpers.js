'use strict';

const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

/**
 * Generate a secure random token (for password reset, etc.)
 * @param {number} length - Byte length (default 32)
 * @returns {string} Hex-encoded token
 */
function generateSecureToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Generate UUID v4
 * @returns {string}
 */
function generateUUID() {
  return uuidv4();
}

/**
 * Generate employee code from sequence number
 * @param {number} sequence
 * @returns {string} e.g. EMP-0042
 */
function generateEmployeeCode(sequence) {
  return `EMP-${String(sequence).padStart(4, '0')}`;
}

/**
 * Get client IP address from request
 * @param {Object} req - Express request
 * @returns {string}
 */
function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    '0.0.0.0'
  );
}

/**
 * Sanitize string to prevent XSS (basic strip HTML tags)
 * @param {string} str
 * @returns {string}
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/<[^>]*>/g, '').trim();
}

/**
 * Format bytes to human-readable size
 * @param {number} bytes
 * @returns {string}
 */
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Parse date string safely
 * @param {string} dateStr
 * @returns {Date|null}
 */
function parseDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

module.exports = {
  generateSecureToken,
  generateUUID,
  generateEmployeeCode,
  getClientIp,
  sanitizeString,
  formatFileSize,
  parseDate,
};
