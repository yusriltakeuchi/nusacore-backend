'use strict';

/**
 * Standardized API Response Helper
 * Ensures consistent response format across all endpoints
 */
const ApiResponse = {
  /**
   * Send success response
   * @param {Object} res - Express response object
   * @param {string} message - Success message
   * @param {*} data - Response data
   * @param {Object|null} meta - Metadata (pagination, etc.)
   * @param {number} statusCode - HTTP status code
   */
  success(res, message = 'Success', data = null, meta = null, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      meta,
    });
  },

  /**
   * Send created response (201)
   */
  created(res, message = 'Resource created successfully', data = null) {
    return res.status(201).json({
      success: true,
      message,
      data,
      meta: null,
    });
  },

  /**
   * Send error response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {Array} errors - Validation errors array
   */
  error(res, message = 'Internal Server Error', statusCode = 500, errors = []) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  },

  /**
   * Send 400 Bad Request
   */
  badRequest(res, message = 'Bad Request', errors = []) {
    return ApiResponse.error(res, message, 400, errors);
  },

  /**
   * Send 401 Unauthorized
   */
  unauthorized(res, message = 'Unauthorized') {
    return ApiResponse.error(res, message, 401);
  },

  /**
   * Send 403 Forbidden
   */
  forbidden(res, message = 'Forbidden. Insufficient permissions.') {
    return ApiResponse.error(res, message, 403);
  },

  /**
   * Send 404 Not Found
   */
  notFound(res, message = 'Resource not found') {
    return ApiResponse.error(res, message, 404);
  },

  /**
   * Send 409 Conflict
   */
  conflict(res, message = 'Resource already exists') {
    return ApiResponse.error(res, message, 409);
  },

  /**
   * Send 422 Unprocessable Entity
   */
  validationError(res, message = 'Validation failed', errors = []) {
    return ApiResponse.error(res, message, 422, errors);
  },
};

module.exports = ApiResponse;
