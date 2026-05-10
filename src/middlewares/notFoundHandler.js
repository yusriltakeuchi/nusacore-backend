'use strict';

/**
 * 404 Not Found Handler
 * Catches requests that don't match any route
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
    errors: [],
  });
}

module.exports = notFoundHandler;
