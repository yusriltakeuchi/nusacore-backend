'use strict';

/**
 * Wrap async route handlers to catch errors and pass to next()
 * Eliminates try/catch boilerplate in controllers
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
