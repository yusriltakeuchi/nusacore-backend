'use strict';

const cron = require('node-cron');
const AuthRepository = require('../repositories/auth.repository');

/**
 * Cron Jobs
 * Scheduled tasks for maintenance
 */
const cronJobs = {
  /**
   * Start all cron jobs
   */
  start() {
    // ─── Cleanup Expired Tokens ────────────────────────────────────────
    // Runs every day at 02:00 AM
    cron.schedule('0 2 * * *', async () => {
      try {
        const result = await AuthRepository.deleteExpiredTokens();
        console.log(
          `🧹 [CRON] Token cleanup: ${result.refreshTokensDeleted} refresh tokens, ${result.resetTokensDeleted} reset tokens deleted.`
        );
      } catch (err) {
        console.error('❌ [CRON] Token cleanup failed:', err.message);
      }
    }, {
      timezone: 'Asia/Jakarta',
    });

    // ─── Cleanup Old Login Logs ────────────────────────────────────────
    // Runs every Sunday at 03:00 AM — delete logs older than 90 days
    cron.schedule('0 3 * * 0', async () => {
      try {
        const { pool } = require('../config/database');
        const [result] = await pool.execute(
          'DELETE FROM login_logs WHERE login_at < DATE_SUB(NOW(), INTERVAL 90 DAY)'
        );
        console.log(`🧹 [CRON] Login logs cleanup: ${result.affectedRows} old records deleted.`);
      } catch (err) {
        console.error('❌ [CRON] Login logs cleanup failed:', err.message);
      }
    }, {
      timezone: 'Asia/Jakarta',
    });

    console.log('⏰ Cron jobs started');
  },
};

module.exports = cronJobs;
