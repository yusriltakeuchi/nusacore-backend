'use strict';

const { validationResult } = require('express-validator');
const ApiResponse = require('../utils/ApiResponse');

/**
 * Validation Handler Middleware
 * Processes express-validator results and returns standardized errors
 */
function validationHandler(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorDetails = errors.array().map(err => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value,
    }));
    return ApiResponse.validationError(res, 'Validation failed. Please check your input.', errorDetails);
  }
  next();
}

module.exports = validationHandler;
