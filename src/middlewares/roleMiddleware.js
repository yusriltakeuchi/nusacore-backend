'use strict';

const ApiResponse = require('../utils/ApiResponse');

/**
 * Role-based Access Control Middleware
 * Must be used AFTER authMiddleware
 * @param {...string} roles - Allowed roles (e.g., 'Admin', 'Employee')
 * @returns {Function} Express middleware
 */
function roleMiddleware(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.unauthorized(res, 'Authentication required.');
    }

    if (!roles.includes(req.user.role)) {
      return ApiResponse.forbidden(
        res,
        `Access denied. Required role(s): ${roles.join(', ')}. Your role: ${req.user.role}`
      );
    }

    next();
  };
}

module.exports = roleMiddleware;
