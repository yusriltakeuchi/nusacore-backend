'use strict';

const { body } = require('express-validator');

const registerValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required.')
    .isLength({ min: 3, max: 50 }).withMessage('Username must be 3–50 characters.')
    .matches(/^[a-zA-Z0-9._-]+$/).withMessage('Username can only contain letters, numbers, dots, underscores, hyphens.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Email must be a valid email address.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain uppercase, lowercase, and a number.'),

  body('role')
    .optional()
    .isIn(['Admin', 'Employee']).withMessage('Role must be Admin or Employee.'),

  body('employee_id')
    .optional({ nullable: true })
    .isInt({ min: 1 }).withMessage('employee_id must be a positive integer.'),
];

const loginValidation = [
  body('identifier')
    .trim()
    .notEmpty().withMessage('Email or username is required.'),

  body('password')
    .notEmpty().withMessage('Password is required.'),

  body('recaptcha_token')
    .notEmpty().withMessage('reCAPTCHA token is required.'),
];

const forgotPasswordValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),
];

const resetPasswordValidation = [
  body('token')
    .trim()
    .notEmpty().withMessage('Reset token is required.'),

  body('new_password')
    .notEmpty().withMessage('New password is required.')
    .isLength({ min: 8 }).withMessage('New password must be at least 8 characters.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain uppercase, lowercase, and a number.'),

  body('confirm_password')
    .notEmpty().withMessage('Confirm password is required.')
    .custom((value, { req }) => {
      if (value !== req.body.new_password) throw new Error('Passwords do not match.');
      return true;
    }),
];

const refreshTokenValidation = [
  body('refresh_token')
    .optional()
    .isString().withMessage('refresh_token must be a string.'),
];

module.exports = {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  refreshTokenValidation,
};
