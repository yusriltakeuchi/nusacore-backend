'use strict';

const fs = require('fs');
const FileRepository = require('../repositories/file.repository');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

/**
 * File Controller
 */
const FileController = {
  /**
   * GET /api/files
   * List all uploaded files (Admin only)
   */
  getAll: asyncHandler(async (req, res) => {
    const files = await FileRepository.findAll();
    return ApiResponse.success(res, 'Files retrieved successfully.', files);
  }),

  /**
   * DELETE /api/files/:id
   * Delete file from storage and DB
   */
  delete: asyncHandler(async (req, res) => {
    const file = await FileRepository.findById(parseInt(req.params.id));
    if (!file) throw new AppError('File record not found.', 404);

    // Delete physical file
    if (fs.existsSync(file.file_path)) {
      fs.unlinkSync(file.file_path);
    }

    // Delete DB record
    await FileRepository.delete(file.id);

    return ApiResponse.success(res, 'File deleted successfully.');
  }),
};

module.exports = FileController;
