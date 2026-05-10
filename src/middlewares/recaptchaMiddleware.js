'use strict';

const { verifyRecaptcha } = require('../helpers/recaptcha');
const ApiResponse = require('../utils/ApiResponse');
const { getClientIp } = require('../helpers/helpers');

/**
 * reCAPTCHA Verification Middleware
 * Expects req.body.recaptcha_token
 */
async function recaptchaMiddleware(req, res, next) {
  const { recaptcha_token } = req.body;
  const ip = getClientIp(req);

  const result = await verifyRecaptcha(recaptcha_token, ip);

  if (!result.success) {
    return ApiResponse.badRequest(res, 'reCAPTCHA verification failed. Please try again.', [
      { field: 'recaptcha_token', message: result.errorCodes?.join(', ') || 'Invalid captcha' },
    ]);
  }

  next();
}

module.exports = recaptchaMiddleware;
