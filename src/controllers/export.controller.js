'use strict';

const ExportService = require('../services/export.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

/**
 * Export Controller
 */
const ExportController = {
  /**
   * GET /api/export/excel
   * Export employees to Excel (.xlsx)
   */
  exportExcel: asyncHandler(async (req, res) => {
    const buffer = await ExportService.exportToExcel(req.query);
    const filename = `employees_${new Date().toISOString().slice(0, 10)}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  }),

  /**
   * GET /api/export/pdf
   * Export employees to PDF
   */
  exportPDF: asyncHandler(async (req, res) => {
    const doc = await ExportService.exportToPDF(req.query);
    const filename = `employees_${new Date().toISOString().slice(0, 10)}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    doc.pipe(res);
  }),
};

module.exports = ExportController;
