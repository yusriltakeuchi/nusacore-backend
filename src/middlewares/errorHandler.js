'use strict';

const AppError = require('../utils/AppError');

/**
 * Centralized Error Handler Middleware
 * Handles all errors passed via next(err)
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  // Default to 500 if no status code set
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  const isDev = process.env.APP_ENV !== 'production';

  // Operational errors (AppError) — safe to expose to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
      ...(isDev && { stack: err.stack }),
    });
  }

  // MySQL errors
  if (err.code === 'ER_DUP_ENTRY') {
    const field = err.sqlMessage?.match(/key '(.+?)'/)?.[1] || 'field';
    return res.status(409).json({
      success: false,
      message: `Duplicate entry for ${field}. Record already exists.`,
      errors: [],
    });
  }

  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({
      success: false,
      message: 'Referenced record does not exist.',
      errors: [],
    });
  }

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: `File size exceeds limit of ${(parseInt(process.env.MAX_FILE_SIZE) || 10485760) / (1024 * 1024)}MB.`,
      errors: [],
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, message: 'Invalid token.', errors: [] });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'Token has expired.', errors: [] });
  }

  // CORS error
  if (err.message && err.message.includes('Not allowed by CORS')) {
    return res.status(403).json({ success: false, message: 'CORS policy violation.', errors: [] });
  }

  // Unknown/unexpected errors — log and hide details in production
  console.error('🔴 UNEXPECTED ERROR:', err);

  return res.status(500).json({
    success: false,
    message: isDev ? err.message : 'An unexpected error occurred. Please try again later.',
    errors: [],
    ...(isDev && { stack: err.stack }),
  });
}

module.exports = errorHandler;
