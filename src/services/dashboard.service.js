'use strict';

const DashboardRepository = require('../repositories/dashboard.repository');

/**
 * Dashboard Service
 * Aggregates analytics data for the dashboard
 */
const DashboardService = {
  /**
   * Get complete dashboard statistics
   */
  async getStats() {
    const [employeeStats, totalDivisions, totalUsers, byDivision, byGender, byStatus, recentEmployees] =
      await Promise.all([
        DashboardRepository.getEmployeeStats(),
        DashboardRepository.countDivisions(),
        DashboardRepository.countUsers(),
        DashboardRepository.getEmployeeByDivision(),
        DashboardRepository.getEmployeeByGender(),
        DashboardRepository.getEmployeeByStatus(),
        DashboardRepository.getRecentEmployees(5),
      ]);

    return {
      summary: {
        total_employees: Number(employeeStats?.total_employees || 0),
        total_active: Number(employeeStats?.total_active || 0),
        total_inactive: Number(employeeStats?.total_inactive || 0),
        total_resigned: Number(employeeStats?.total_resigned || 0),
        total_divisions: Number(totalDivisions),
        total_users: Number(totalUsers),
      },
      charts: {
        employee_by_division: byDivision.map(r => ({
          label: r.label,
          value: Number(r.value),
        })),
        employee_by_gender: byGender.map(r => ({
          label: r.label,
          value: Number(r.value),
        })),
        employee_by_status: byStatus.map(r => ({
          label: r.label,
          value: Number(r.value),
        })),
      },
      recent_employees: recentEmployees,
    };
  },
};

module.exports = DashboardService;
