'use strict';

const AuthService = require('../services/auth.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Auth Controller
 * Handles all authentication endpoints
 */
const AuthController = {
  /**
   * POST /api/auth/register
   */
  register: asyncHandler(async (req, res) => {
    const { username, email, password, role, employee_id } = req.body;

    const result = await AuthService.register({ username, email, password, role, employee_id });

    return ApiResponse.created(res, 'Registration successful. Welcome to NusaCore HRIS!', result);
  }),

  /**
   * POST /api/auth/login
   */
  login: asyncHandler(async (req, res) => {
    const { identifier, password } = req.body;

    const result = await AuthService.login(identifier, password, req);

    // Set refresh token as HTTP-only cookie
    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: process.env.SESSION_SECURE === 'true',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return ApiResponse.success(res, 'Login successful.', {
      user: result.user,
      access_token: result.accessToken,
      token_type: 'Bearer',
    });
  }),

  /**
   * POST /api/auth/logout
   */
  logout: asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refresh_token || req.body?.refresh_token;

    await AuthService.logout(req, res, refreshToken);

    res.clearCookie('refresh_token');

    return ApiResponse.success(res, 'Logged out successfully.');
  }),

  /**
   * POST /api/auth/refresh-token
   */
  refreshToken: asyncHandler(async (req, res) => {
    const token = req.cookies?.refresh_token || req.body?.refresh_token;
    if (!token) return ApiResponse.unauthorized(res, 'Refresh token is required.');

    const result = await AuthService.refreshToken(token);

    return ApiResponse.success(res, 'Access token refreshed.', {
      access_token: result.accessToken,
      token_type: 'Bearer',
    });
  }),

  /**
   * POST /api/auth/forgot-password
   */
  forgotPassword: asyncHandler(async (req, res) => {
    const { email } = req.body;

    await AuthService.forgotPassword(email);

    return ApiResponse.success(
      res,
      'If that email is registered, a password reset link has been sent.'
    );
  }),

  /**
   * POST /api/auth/reset-password
   */
  resetPassword: asyncHandler(async (req, res) => {
    const { token, new_password } = req.body;

    await AuthService.resetPassword(token, new_password);

    return ApiResponse.success(res, 'Password has been reset successfully. Please log in.');
  }),

  /**
   * GET /api/auth/me  — returns current authenticated user
   */
  me: asyncHandler(async (req, res) => {
    const UserRepository = require('../repositories/user.repository');
    const user = await UserRepository.findById(req.user.id);
    return ApiResponse.success(res, 'Current user info.', user);
  }),
};

module.exports = AuthController;
