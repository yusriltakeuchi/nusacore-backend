'use strict';

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const { sessionMiddleware } = require('./config/session');
const { testConnection } = require('./config/database');
const { setupSwagger } = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
const requestLogger = require('./middlewares/requestLogger');
const cronJobs = require('./cron/index');

// Import Routes
const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employee.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const uploadRoutes = require('./routes/upload.routes');
const exportRoutes = require('./routes/export.routes');
const fileRoutes = require('./routes/file.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================
// SECURITY MIDDLEWARES
// ============================================================
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));

// CORS Configuration
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map(origin => origin.trim());

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ============================================================
// CORE MIDDLEWARES
// ============================================================
app.options('*', cors());
app.use(compression());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================================
// LOGGING
// ============================================================
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });
app.use(morgan(process.env.LOG_LEVEL || 'combined', { stream: accessLogStream }));
app.use(morgan('dev'));
app.use(requestLogger);

// ============================================================
// SESSION
// ============================================================
app.use(sessionMiddleware);

// ============================================================
// STATIC FILES
// ============================================================
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use('/uploads', express.static(uploadDir));

// ============================================================
// API DOCUMENTATION (Swagger)
// ============================================================
setupSwagger(app);

// ============================================================
// HEALTH CHECK
// ============================================================
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'NusaCore HRIS API is running',
    data: {
      version: '1.0.0',
      environment: process.env.APP_ENV || 'development',
      timestamp: new Date().toISOString(),
    },
    meta: null,
  });
});

// ============================================================
// API ROUTES
// ============================================================
const API_PREFIX = '/api';
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/employees`, employeeRoutes);
app.use(`${API_PREFIX}/dashboard`, dashboardRoutes);
app.use(`${API_PREFIX}/upload`, uploadRoutes);
app.use(`${API_PREFIX}/export`, exportRoutes);
app.use(`${API_PREFIX}/files`, fileRoutes);

// ============================================================
// ERROR HANDLERS
// ============================================================
app.use(notFoundHandler);
app.use(errorHandler);

// ============================================================
// START SERVER
// ============================================================
async function startServer() {
  try {
    await testConnection();

    app.listen(PORT, () => {
      console.log('╔════════════════════════════════════════════╗');
      console.log('║     NusaCore HRIS API - PT Digital Nusantara     ║');
      console.log('╚════════════════════════════════════════════╝');
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 Environment: ${process.env.APP_ENV || 'development'}`);
      console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
      console.log(`🏥 Health: http://localhost:${PORT}/health`);
    });

    // Start cron jobs
    cronJobs.start();
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
