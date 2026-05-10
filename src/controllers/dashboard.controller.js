'use strict';

const DashboardService = require('../services/dashboard.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Dashboard Controller
 */
const DashboardController = {
  /**
   * GET /api/dashboard/stats
   * Returns all analytics summary + chart data
   */
  getStats: asyncHandler(async (req, res) => {
    const data = await DashboardService.getStats();
    return ApiResponse.success(res, 'Dashboard statistics retrieved successfully.', data);
  }),
};

module.exports = DashboardController;
