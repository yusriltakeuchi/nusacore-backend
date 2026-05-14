'use strict';

const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/user.repository');
const AuthRepository = require('../repositories/auth.repository');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  getRefreshTokenExpiryDate,
} = require('../utils/jwt');
const { sendPasswordResetEmail, sendWelcomeEmail } = require('../helpers/email');
const { generateSecureToken } = require('../helpers/helpers');
const AppError = require('../utils/AppError');

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
const RESET_EXPIRES_MS = parseInt(process.env.RESET_PASSWORD_EXPIRES_IN) || 3600000; // 1 hour
const MAX_FAILED_LOGINS = 5;

/**
 * Authentication Service
 * Business logic for all auth operations
 */
const AuthService = {
  /**
   * Register a new user
   */
  async register(data) {
    const { username, email, password, role = 'Employee', employee_id } = data;

    // Check uniqueness
    const existingEmail = await UserRepository.findByEmail(email);
    if (existingEmail) throw new AppError('Email is already registered.', 409);

    const existingUsername = await UserRepository.findByUsername(username);
    if (existingUsername) throw new AppError('Username is already taken.', 409);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    // Create user
    const result = await UserRepository.create({
      employee_id: employee_id || null,
      username,
      email,
      password: hashedPassword,
      role,
      status: 'Active',
    });

    // Send welcome email (non-blocking)
    sendWelcomeEmail(email, username).catch(err =>
      console.warn('Welcome email failed:', err.message)
    );

    return { userId: result.insertId, username, email, role };
  },

  /**
   * Login user with email/username + password
   */
  async login(identifier, password, req) {
    const ip = req.ip || '0.0.0.0';
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Find user
    const user = await UserRepository.findByEmailOrUsername(identifier);

    if (!user) {
      await AuthRepository.createLoginLog(null, ip, userAgent, 'Failed');
      throw new AppError('Invalid credentials.', 401);
    }

    // Check account status
    if (user.status !== 'Active') {
      await AuthRepository.createLoginLog(user.id, ip, userAgent, 'Failed');
      throw new AppError('Your account has been deactivated. Contact an administrator.', 403);
    }

    // Check failed login attempts (account lock)
    const failedAttempts = await AuthRepository.countRecentFailedLogins(user.id, 15);
    if (failedAttempts >= MAX_FAILED_LOGINS) {
      await AuthRepository.createLoginLog(user.id, ip, userAgent, 'Failed');
      throw new AppError(
        'Account temporarily locked due to too many failed attempts. Please try again in 15 minutes.',
        429
      );
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await AuthRepository.createLoginLog(user.id, ip, userAgent, 'Failed');
      throw new AppError('Invalid credentials.', 401);
    }

    // Generate tokens
    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    const refreshExpiry = getRefreshTokenExpiryDate();

    // Save refresh token
    await AuthRepository.saveRefreshToken(user.id, refreshToken, refreshExpiry);

    // Update last_login
    await UserRepository.updateLastLogin(user.id);

    // Log success
    await AuthRepository.createLoginLog(user.id, ip, userAgent, 'Success');

    // Set session
    if (req.session) {
      req.session.userId = user.id;
      req.session.role = user.role;
    }

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  },

  /**
   * Logout: destroy session + revoke refresh token
   */
  async logout(req, res, refreshToken) {
    // Revoke refresh token
    if (refreshToken) {
      await AuthRepository.revokeRefreshToken(refreshToken);
    }

    // Destroy session
    return new Promise((resolve, reject) => {
      req.session.destroy(err => {
        if (err) reject(new AppError('Failed to destroy session.', 500));
        else {
          res.clearCookie(process.env.SESSION_NAME || 'nusacore_session');
          resolve(true);
        }
      });
    });
  },

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(token) {
    // Verify JWT
    const decoded = verifyRefreshToken(token);

    // Check in DB
    const stored = await AuthRepository.findRefreshToken(token);
    if (!stored) throw new AppError('Refresh token is invalid or has been revoked.', 401);

    // Load user
    const user = await UserRepository.findById(decoded.id);
    if (!user || user.status !== 'Active') {
      throw new AppError('User account not found or inactive.', 401);
    }

    // Generate new access token
    const payload = { id: user.id, email: user.email, role: user.role };
    const newAccessToken = generateAccessToken(payload);

    return { accessToken: newAccessToken };
  },

  /**
   * Initiate forgot password flow
   */
  async forgotPassword(email) {
    const user = await UserRepository.findByEmail(email);
    // Always return success (security: don't reveal if email exists)
    if (!user) return true;

    const token = generateSecureToken(32);
    const expiredAt = new Date(Date.now() + RESET_EXPIRES_MS);

    await AuthRepository.createPasswordReset(user.id, token, expiredAt);

    // Send email (non-blocking in production)
    await sendPasswordResetEmail(user.email, user.username, token);

    return true;
  },

  /**
   * Reset password with token
   */
  async resetPassword(token, newPassword) {
    const record = await AuthRepository.findValidResetToken(token);
    if (!record) throw new AppError('Invalid or expired reset token.', 400);

    const hashed = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    await UserRepository.updatePassword(record.user_id, hashed);
    await AuthRepository.deleteResetToken(token);

    return true;
  },
};

module.exports = AuthService;
