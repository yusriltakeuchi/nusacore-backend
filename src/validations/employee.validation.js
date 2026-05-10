'use strict';

const { body, query, param } = require('express-validator');

const createEmployeeValidation = [
  body('full_name')
    .trim()
    .notEmpty().withMessage('Full name is required.')
    .isLength({ max: 100 }).withMessage('Full name must not exceed 100 characters.'),

  body('gender')
    .notEmpty().withMessage('Gender is required.')
    .isIn(['Male', 'Female']).withMessage('Gender must be Male or Female.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Email must be a valid email address.')
    .normalizeEmail(),

  body('birth_date')
    .optional({ nullable: true, checkFalsy: true })
    .isDate().withMessage('Birth date must be a valid date (YYYY-MM-DD).'),

  body('phone_number')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 20 }).withMessage('Phone number must not exceed 20 characters.'),

  body('address')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 500 }).withMessage('Address must not exceed 500 characters.'),

  body('city')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 100 }).withMessage('City must not exceed 100 characters.'),

  body('province')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 100 }).withMessage('Province must not exceed 100 characters.'),

  body('postal_code')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 10 }).withMessage('Postal code must not exceed 10 characters.'),

  body('division')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 100 }).withMessage('Division must not exceed 100 characters.'),

  body('position')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 100 }).withMessage('Position must not exceed 100 characters.'),

  body('salary')
    .optional({ nullable: true })
    .isFloat({ min: 0 }).withMessage('Salary must be a non-negative number.'),

  body('join_date')
    .optional({ nullable: true, checkFalsy: true })
    .isDate().withMessage('Join date must be a valid date (YYYY-MM-DD).'),

  body('employment_status')
    .optional()
    .isIn(['Active', 'Inactive', 'Resigned']).withMessage('Employment status must be Active, Inactive, or Resigned.'),

  body('emergency_contact')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 100 }).withMessage('Emergency contact must not exceed 100 characters.'),

  body('emergency_phone')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 20 }).withMessage('Emergency phone must not exceed 20 characters.'),

  body('education')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 100 }).withMessage('Education must not exceed 100 characters.'),

  body('marital_status')
    .optional()
    .isIn(['Single', 'Married']).withMessage('Marital status must be Single or Married.'),
];

const updateEmployeeValidation = [
  param('id')
    .isInt({ min: 1 }).withMessage('Employee ID must be a positive integer.'),

  body('full_name')
    .optional()
    .trim()
    .notEmpty().withMessage('Full name cannot be empty.')
    .isLength({ max: 100 }).withMessage('Full name must not exceed 100 characters.'),

  body('gender')
    .optional()
    .isIn(['Male', 'Female']).withMessage('Gender must be Male or Female.'),

  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Email must be a valid email address.')
    .normalizeEmail(),

  body('birth_date')
    .optional({ nullable: true, checkFalsy: true })
    .isDate().withMessage('Birth date must be a valid date (YYYY-MM-DD).'),

  body('salary')
    .optional({ nullable: true })
    .isFloat({ min: 0 }).withMessage('Salary must be a non-negative number.'),

  body('join_date')
    .optional({ nullable: true, checkFalsy: true })
    .isDate().withMessage('Join date must be a valid date (YYYY-MM-DD).'),

  body('employment_status')
    .optional()
    .isIn(['Active', 'Inactive', 'Resigned']).withMessage('Employment status must be Active, Inactive, or Resigned.'),

  body('marital_status')
    .optional()
    .isIn(['Single', 'Married']).withMessage('Marital status must be Single or Married.'),

  body('gender')
    .optional()
    .isIn(['Male', 'Female']).withMessage('Gender must be Male or Female.'),
];

const getEmployeesValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer.'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100.'),

  query('sort_order')
    .optional()
    .isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('sort_order must be ASC or DESC.'),

  query('employment_status')
    .optional()
    .isIn(['Active', 'Inactive', 'Resigned']).withMessage('employment_status must be Active, Inactive, or Resigned.'),

  query('gender')
    .optional()
    .isIn(['Male', 'Female']).withMessage('gender must be Male or Female.'),
];

module.exports = {
  createEmployeeValidation,
  updateEmployeeValidation,
  getEmployeesValidation,
};
