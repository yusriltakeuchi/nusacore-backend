'use strict';

const nodemailer = require('nodemailer');

/**
 * Create reusable nodemailer transporter
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 * Verify SMTP connection
 */
async function verifyMailConnection() {
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified');
    return true;
  } catch (error) {
    console.warn('⚠️  SMTP connection failed:', error.message);
    return false;
  }
}

module.exports = { transporter, verifyMailConnection };
