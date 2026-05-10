'use strict';

const mysql = require('mysql2/promise');

/**
 * MySQL Connection Pool
 * Uses mysql2/promise for async/await support
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nusacore_hris',
  waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS === 'true',
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT) || 0,
  charset: 'utf8mb4',
  timezone: '+07:00',
  decimalNumbers: true,
  dateStrings: false,
});

/**
 * Test database connection
 */
async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log(`✅ MySQL connected to: ${process.env.DB_NAME}@${process.env.DB_HOST}`);
    return true;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Execute a query with parameters
 * @param {string} sql - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<Array>} Query results
 */
async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

/**
 * Execute a query and return first row
 * @param {string} sql - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<Object|null>} First row or null
 */
async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Begin a transaction and return a connection
 * @returns {Promise<Connection>} MySQL connection with active transaction
 */
async function beginTransaction() {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  return connection;
}

/**
 * Commit a transaction and release connection
 * @param {Connection} connection
 */
async function commitTransaction(connection) {
  await connection.commit();
  connection.release();
}

/**
 * Rollback a transaction and release connection
 * @param {Connection} connection
 */
async function rollbackTransaction(connection) {
  await connection.rollback();
  connection.release();
}

module.exports = {
  pool,
  query,
  queryOne,
  testConnection,
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
};
