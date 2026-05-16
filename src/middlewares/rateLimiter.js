'use strict';

const rateLimit = require('express-rate-limit');
const ApiResponse = require('../utils/ApiResponse');

/**
 * General API rate limiter
 */
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 menit
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 kali percobaan
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    ApiResponse.error(res, 'Too many requests. Please try again later.', 429);
  },
});

/**
 * Strict rate limiter for login endpoint
 */
const loginLimiter = rateLimit({
  windowMs: parseInt(process.env.LOGIN_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 menit
  max: parseInt(process.env.LOGIN_RATE_LIMIT_MAX) || 5, // 5 kali percobaan login
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
  handler: (req, res) => {
    ApiResponse.error(
      res,
      'Too many login attempts. Your IP has been temporarily blocked. Please try again in 15 minutes.',
      429
    );
  },
});

/**
 * Strict rate limiter for password reset/forgot endpoint
 */
const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    ApiResponse.error(res, 'Too many password reset requests. Please try again in 1 hour.', 429);
  },
});

module.exports = { apiLimiter, loginLimiter, forgotPasswordLimiter };
