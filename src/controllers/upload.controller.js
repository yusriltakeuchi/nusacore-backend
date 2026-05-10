'use strict';

const path = require('path');
const UploadService = require('../services/upload.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

/**
 * Upload Controller
 */
const UploadController = {
  /**
   * POST /api/upload/employees
   * Import employees from Excel or CSV
   */
  importEmployees: asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new AppError('No file uploaded. Please upload an Excel (.xlsx) or CSV file.', 400);
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    let result;

    if (ext === '.csv') {
      result = await UploadService.importFromCSV(
        req.file.path,
        req.file.originalname,
        req.user.id
      );
    } else if (['.xlsx', '.xls'].includes(ext)) {
      result = await UploadService.importFromExcel(
        req.file.path,
        req.file.originalname,
        req.user.id
      );
    } else {
      throw new AppError('Unsupported file format. Use .xlsx, .xls, or .csv', 400);
    }

    return ApiResponse.success(
      res,
      `Import completed. ${result.inserted} employees inserted, ${result.failed} failed.`,
      result
    );
  }),

  /**
   * POST /api/upload/profile-photo
   * Upload profile photo for an employee
   */
  uploadProfilePhoto: asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new AppError('No photo uploaded. Please upload an image file.', 400);
    }

    const employeeId = req.body.employee_id || req.query.employee_id;
    if (!employeeId) {
      throw new AppError('employee_id is required.', 400);
    }

    const result = await UploadService.saveProfilePhoto(
      req.file,
      parseInt(employeeId),
      req.user.id
    );

    return ApiResponse.success(res, 'Profile photo uploaded successfully.', result);
  }),
};

module.exports = UploadController;
