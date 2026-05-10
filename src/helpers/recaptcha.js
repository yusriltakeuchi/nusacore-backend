'use strict';

const axios = require('axios').default;

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY || '';
const RECAPTCHA_VERIFY_URL = process.env.RECAPTCHA_VERIFY_URL || 'https://www.google.com/recaptcha/api/siteverify';

/**
 * Verify Google reCAPTCHA token
 * @param {string} token - reCAPTCHA token from client
 * @param {string} remoteIp - Client IP address (optional)
 * @returns {Promise<{ success: boolean, score?: number, errorCodes?: string[] }>}
 */
async function verifyRecaptcha(token, remoteIp = null) {
  if (!token) {
    return { success: false, errorCodes: ['missing-input-response'] };
  }

  // Skip verification in development/test if no secret set
  if (!RECAPTCHA_SECRET || RECAPTCHA_SECRET === 'your_google_recaptcha_secret_key') {
    console.warn('⚠️  reCAPTCHA secret not configured — skipping verification in development');
    return { success: true };
  }

  try {
    const params = new URLSearchParams({
      secret: RECAPTCHA_SECRET,
      response: token,
    });
    if (remoteIp) params.append('remoteip', remoteIp);

    const { data } = await axios.post(RECAPTCHA_VERIFY_URL, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      timeout: 5000,
    });

    return {
      success: data.success === true,
      score: data.score, // for reCAPTCHA v3
      errorCodes: data['error-codes'] || [],
    };
  } catch (err) {
    console.error('reCAPTCHA verification request failed:', err.message);
    return { success: false, errorCodes: ['network-error'] };
  }
}

module.exports = { verifyRecaptcha };
