'use strict';

const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const logStream = fs.createWriteStream(path.join(logDir, 'requests.log'), { flags: 'a' });

/**
 * Request Logger Middleware
 * Logs all incoming requests with method, URL, IP, and response time
 */
function requestLogger(req, res, next) {
  const start = Date.now();
  const { method, originalUrl, ip } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = `[${new Date().toISOString()}] ${method} ${originalUrl} ${res.statusCode} ${duration}ms - ${ip}\n`;
    logStream.write(log);
  });

  next();
}

module.exports = requestLogger;
