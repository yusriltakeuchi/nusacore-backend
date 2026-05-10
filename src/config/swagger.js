'use strict';

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NusaCore HRIS API',
      version: '1.0.0',
      description: `
# NusaCore HRIS API

**PT Digital Nusantara** - Centralized Employee Management & Authentication System

## Features
- JWT Authentication with refresh token
- Session-based login with MySQL store  
- Role-based access control (Admin, Employee)
- Employee CRUD with search, filter, pagination
- Dashboard analytics
- File upload (Excel/CSV import, profile photo)
- Export to Excel/PDF
- Google reCAPTCHA verification
- Forgot/reset password via email

## Authentication
Use the **Bearer** token (JWT access token) in Authorization header:
\`\`\`
Authorization: Bearer <access_token>
\`\`\`
      `,
      contact: {
        name: 'PT Digital Nusantara',
        email: 'admin@nusacore.com',
      },
      license: { name: 'MIT' },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT access token',
        },
      },
      schemas: {
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Success' },
            data: { type: 'object' },
            meta: { type: 'object', nullable: true },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' },
            errors: { type: 'array', items: { type: 'object' } },
          },
        },
        PaginationMeta: {
          type: 'object',
          properties: {
            currentPage: { type: 'integer', example: 1 },
            limit: { type: 'integer', example: 10 },
            totalData: { type: 'integer', example: 100 },
            totalPages: { type: 'integer', example: 10 },
            hasNextPage: { type: 'boolean', example: true },
            hasPrevPage: { type: 'boolean', example: false },
          },
        },
        Employee: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            employee_code: { type: 'string' },
            full_name: { type: 'string' },
            gender: { type: 'string', enum: ['Male', 'Female'] },
            birth_date: { type: 'string', format: 'date' },
            email: { type: 'string', format: 'email' },
            phone_number: { type: 'string' },
            address: { type: 'string' },
            city: { type: 'string' },
            province: { type: 'string' },
            postal_code: { type: 'string' },
            division: { type: 'string' },
            position: { type: 'string' },
            salary: { type: 'number' },
            join_date: { type: 'string', format: 'date' },
            employment_status: { type: 'string', enum: ['Active', 'Inactive', 'Resigned'] },
            profile_photo: { type: 'string', nullable: true },
            emergency_contact: { type: 'string' },
            emergency_phone: { type: 'string' },
            education: { type: 'string' },
            marital_status: { type: 'string', enum: ['Single', 'Married'] },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            employee_id: { type: 'integer', nullable: true },
            username: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['Admin', 'Employee'] },
            status: { type: 'string', enum: ['Active', 'Inactive'] },
            last_login: { type: 'string', format: 'date-time', nullable: true },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    security: [{ BearerAuth: [] }],
    tags: [
      { name: 'Authentication', description: 'Login, Register, Logout, Token management' },
      { name: 'Employees', description: 'Employee CRUD operations' },
      { name: 'Dashboard', description: 'Analytics and statistics' },
      { name: 'Upload', description: 'File upload (import, photo)' },
      { name: 'Export', description: 'Export data to Excel/PDF' },
      { name: 'Files', description: 'File management' },
    ],
  },
  apis: ['./src/routes/*.js', './src/docs/*.yaml'],
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { background-color: #1a1a2e; }',
    customSiteTitle: 'NusaCore HRIS API Docs',
    swaggerOptions: { persistAuthorization: true },
  }));

  // Serve raw spec
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`📚 Swagger docs available at /api-docs`);
}

module.exports = { setupSwagger, swaggerSpec };
