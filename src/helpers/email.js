'use strict';

const { transporter } = require('../config/mail');

const FROM = process.env.EMAIL_FROM || 'NusaCore HRIS <noreply@nusacore.com>';
const BASE_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

/**
 * Send password reset email
 * @param {string} toEmail - Recipient email
 * @param {string} userName - Recipient name
 * @param {string} resetToken - Password reset token
 */
async function sendPasswordResetEmail(toEmail, userName, resetToken) {
  const resetUrl = `${BASE_URL}/reset-password?token=${resetToken}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: #1a1a2e; padding: 30px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 24px; }
        .header p { color: #a0aec0; margin: 5px 0 0; font-size: 14px; }
        .body { padding: 40px 30px; }
        .body h2 { color: #1a1a2e; margin-top: 0; }
        .body p { color: #555; line-height: 1.6; }
        .btn { display: inline-block; padding: 14px 32px; background: #4f46e5; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        .token-box { background: #f0f4ff; border: 1px solid #c3d1ff; border-radius: 6px; padding: 12px 20px; font-family: monospace; font-size: 14px; word-break: break-all; color: #3730a3; }
        .footer { background: #f4f6f9; padding: 20px 30px; text-align: center; color: #999; font-size: 12px; }
        .warning { color: #e53e3e; font-size: 13px; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>NusaCore HRIS</h1>
          <p>PT Digital Nusantara</p>
        </div>
        <div class="body">
          <h2>Reset Password Request</h2>
          <p>Hi <strong>${userName}</strong>,</p>
          <p>You have requested to reset your password. Click the button below to proceed:</p>
          <a href="${resetUrl}" class="btn" style="color: #ffffff;">Reset My Password</a>
          <p>Or copy and paste the following link to your browser:</p>
          <div class="token-box">${resetUrl}</div>
          <p class="warning">⚠️ This link will expire in <strong>1 hour</strong>. If you did not request a password reset, please ignore this email.</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} PT Digital Nusantara. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: FROM,
    to: toEmail,
    subject: 'Reset Your NusaCore HRIS Password',
    html,
  });
}

/**
 * Send welcome email after registration
 * @param {string} toEmail
 * @param {string} userName
 */
async function sendWelcomeEmail(toEmail, userName) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: #1a1a2e; padding: 30px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 24px; }
        .header p { color: #a0aec0; margin: 5px 0 0; font-size: 14px; }
        .body { padding: 40px 30px; }
        .body p { color: #555; line-height: 1.6; }
        .footer { background: #f4f6f9; padding: 20px 30px; text-align: center; color: #999; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to NusaCore HRIS</h1>
          <p>PT Digital Nusantara</p>
        </div>
        <div class="body">
          <p>Hi <strong>${userName}</strong>,</p>
          <p>Your account has been successfully created in the <strong>NusaCore HRIS</strong> system. You can now log in using your registered email and password.</p>
          <p>If you have any questions, please contact your HR administrator.</p>
          <p>Best regards,<br><strong>PT Digital Nusantara Team</strong></p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} PT Digital Nusantara. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: FROM,
    to: toEmail,
    subject: 'Welcome to NusaCore HRIS',
    html,
  });
}

module.exports = { sendPasswordResetEmail, sendWelcomeEmail };
