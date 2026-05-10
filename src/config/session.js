'use strict';

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

/**
 * MySQL session store options
 */
const sessionStoreOptions = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nusacore_hris',
  clearExpired: true,
  checkExpirationInterval: 900000, // 15 minutes
  expiration: parseInt(process.env.SESSION_MAX_AGE) || 86400000,
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data',
    },
  },
};

const sessionStore = new MySQLStore(sessionStoreOptions);

/**
 * Express session middleware configuration
 */
const sessionMiddleware = session({
  name: process.env.SESSION_NAME || 'nusacore_session',
  secret: process.env.SESSION_SECRET || 'fallback_session_secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE === 'true',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: parseInt(process.env.SESSION_MAX_AGE) || 86400000,
  },
});

module.exports = { sessionMiddleware, sessionStore };
