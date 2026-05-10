'use strict';

const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  refreshTokenValidation,
} = require('../validations/auth.validation');
const validationHandler = require('../middlewares/validationHandler');
const authMiddleware = require('../middlewares/authMiddleware');
const recaptchaMiddleware = require('../middlewares/recaptchaMiddleware');
const { loginLimiter, forgotPasswordLimiter } = require('../middlewares/rateLimiter');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Login, Register, Logout, and Token management
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: john.doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: MyPass@123
 *               role:
 *                 type: string
 *                 enum: [Admin, Employee]
 *                 default: Employee
 *               employee_id:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       409:
 *         description: Email or username already exists
 *       422:
 *         description: Validation error
 */
router.post('/register', registerValidation, validationHandler, AuthController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with email/username and password
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [identifier, password, recaptcha_token]
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Email or username
 *                 example: admin@nusacore.com
 *               password:
 *                 type: string
 *                 example: Admin@1234
 *               recaptcha_token:
 *                 type: string
 *                 description: Google reCAPTCHA v2 token
 *                 example: "03AGdBq25..."
 *     responses:
 *       200:
 *         description: Login successful — returns JWT access token
 *       401:
 *         description: Invalid credentials
 *       429:
 *         description: Too many attempts or account locked
 */
router.post('/login', loginLimiter, loginValidation, validationHandler, recaptchaMiddleware, AuthController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout current session and invalidate tokens
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', authMiddleware, AuthController.logout);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Get a new access token using refresh token
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *                 description: JWT refresh token (or send via cookie)
 *     responses:
 *       200:
 *         description: New access token issued
 *       401:
 *         description: Invalid or expired refresh token
 */
router.post('/refresh-token', refreshTokenValidation, validationHandler, AuthController.refreshToken);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request a password reset email
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Reset link sent (always returns 200 for security)
 *       429:
 *         description: Too many password reset requests
 */
router.post('/forgot-password', forgotPasswordLimiter, forgotPasswordValidation, validationHandler, AuthController.forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password using token received via email
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, new_password, confirm_password]
 *             properties:
 *               token:
 *                 type: string
 *               new_password:
 *                 type: string
 *                 example: NewPass@123
 *               confirm_password:
 *                 type: string
 *                 example: NewPass@123
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
router.post('/reset-password', resetPasswordValidation, validationHandler, AuthController.resetPassword);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get currently authenticated user info
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authMiddleware, AuthController.me);

module.exports = router;
