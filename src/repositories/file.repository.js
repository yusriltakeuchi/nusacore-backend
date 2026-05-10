'use strict';

const { queryOne, pool, query } = require('../config/database');

/**
 * File Repository
 * Handles uploaded_files table operations
 */
const FileRepository = {
  /**
   * Save file record to DB
   */
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO uploaded_files (original_name, stored_name, file_path, file_size, uploaded_by)
       VALUES (?, ?, ?, ?, ?)`,
      [data.originalName, data.storedName, data.filePath, data.fileSize, data.uploadedBy || null]
    );
    return result;
  },

  /**
   * Find file by ID
   */
  async findById(id) {
    return queryOne('SELECT * FROM uploaded_files WHERE id = ?', [id]);
  },

  /**
   * Get all files (with optional uploader join)
   */
  async findAll() {
    return query(`
      SELECT f.*, u.username as uploaded_by_username
      FROM uploaded_files f
      LEFT JOIN users u ON f.uploaded_by = u.id
      ORDER BY f.uploaded_at DESC
    `);
  },

  /**
   * Delete file record by ID
   */
  async delete(id) {
    const [result] = await pool.execute('DELETE FROM uploaded_files WHERE id = ?', [id]);
    return result;
  },
};

module.exports = FileRepository;
