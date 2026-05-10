'use strict';

const xlsx = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const EmployeeRepository = require('../repositories/employee.repository');
const FileRepository = require('../repositories/file.repository');
const { beginTransaction, commitTransaction, rollbackTransaction } = require('../config/database');
const { generateEmployeeCode } = require('../helpers/helpers');
const AppError = require('../utils/AppError');

const VALID_GENDERS = ['Male', 'Female'];
const VALID_STATUSES = ['Active', 'Inactive', 'Resigned'];
const VALID_MARITAL = ['Single', 'Married'];

/**
 * Validate a single employee row from import
 */
function validateRow(row, rowNum) {
  const errors = [];
  if (!row.full_name) errors.push(`Row ${rowNum}: full_name is required`);
  if (!row.email) errors.push(`Row ${rowNum}: email is required`);
  if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email))
    errors.push(`Row ${rowNum}: invalid email format`);
  if (!row.gender) errors.push(`Row ${rowNum}: gender is required`);
  if (row.gender && !VALID_GENDERS.includes(row.gender))
    errors.push(`Row ${rowNum}: gender must be Male or Female`);
  if (row.employment_status && !VALID_STATUSES.includes(row.employment_status))
    errors.push(`Row ${rowNum}: employment_status must be Active, Inactive, or Resigned`);
  if (row.marital_status && !VALID_MARITAL.includes(row.marital_status))
    errors.push(`Row ${rowNum}: marital_status must be Single or Married`);
  return errors;
}

/**
 * Normalize a row from Excel/CSV to employee fields
 */
function normalizeRow(row) {
  return {
    full_name: row['full_name'] || row['Full Name'] || row['Name'] || '',
    gender: row['gender'] || row['Gender'] || '',
    birth_date: row['birth_date'] || row['Birth Date'] || null,
    email: row['email'] || row['Email'] || '',
    phone_number: row['phone_number'] || row['Phone'] || row['Phone Number'] || '',
    address: row['address'] || row['Address'] || '',
    city: row['city'] || row['City'] || '',
    province: row['province'] || row['Province'] || '',
    postal_code: row['postal_code'] || row['Postal Code'] || '',
    division: row['division'] || row['Division'] || '',
    position: row['position'] || row['Position'] || '',
    salary: parseFloat(row['salary'] || row['Salary'] || 0) || 0,
    join_date: row['join_date'] || row['Join Date'] || null,
    employment_status: row['employment_status'] || row['Employment Status'] || 'Active',
    education: row['education'] || row['Education'] || '',
    marital_status: row['marital_status'] || row['Marital Status'] || 'Single',
    emergency_contact: row['emergency_contact'] || row['Emergency Contact'] || '',
    emergency_phone: row['emergency_phone'] || row['Emergency Phone'] || '',
  };
}

/**
 * Upload / Import Service
 */
const UploadService = {
  /**
   * Import employees from Excel file
   */
  async importFromExcel(filePath, originalName, userId) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawRows = xlsx.utils.sheet_to_json(sheet);

    return UploadService._processRows(rawRows, filePath, originalName, userId);
  },

  /**
   * Import employees from CSV file
   */
  async importFromCSV(filePath, originalName, userId) {
    return new Promise((resolve, reject) => {
      const rawRows = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', row => rawRows.push(row))
        .on('end', async () => {
          try {
            const result = await UploadService._processRows(rawRows, filePath, originalName, userId);
            resolve(result);
          } catch (err) {
            reject(err);
          }
        })
        .on('error', reject);
    });
  },

  /**
   * Process imported rows — validate, bulk insert, generate summary
   */
  async _processRows(rawRows, filePath, originalName, userId) {
    const validRows = [];
    const invalidRows = [];

    rawRows.forEach((raw, index) => {
      const row = normalizeRow(raw);
      const errors = validateRow(row, index + 2); // +2 for header row
      if (errors.length > 0) {
        invalidRows.push({ row: index + 2, data: row, errors });
      } else {
        validRows.push(row);
      }
    });

    // Bulk insert valid rows in a transaction
    let insertedCount = 0;
    let failedCount = 0;
    const insertErrors = [];

    if (validRows.length > 0) {
      const connection = await beginTransaction();
      try {
        // Generate codes
        const seq = await EmployeeRepository.getNextSequence();
        for (let i = 0; i < validRows.length; i++) {
          validRows[i].employee_code = generateEmployeeCode(seq + i);
        }

        const results = await EmployeeRepository.bulkCreate(validRows, connection);
        results.forEach(r => {
          if (r.success) insertedCount++;
          else {
            failedCount++;
            insertErrors.push({ email: r.email, error: r.error });
          }
        });

        await commitTransaction(connection);
      } catch (err) {
        await rollbackTransaction(connection);
        throw new AppError(`Import transaction failed: ${err.message}`, 500);
      }
    }

    // Save file record
    const stats = fs.statSync(filePath);
    await FileRepository.create({
      originalName,
      storedName: path.basename(filePath),
      filePath,
      fileSize: stats.size,
      uploadedBy: userId,
    });

    return {
      total_rows: rawRows.length,
      valid_rows: validRows.length,
      invalid_rows: invalidRows.length,
      inserted: insertedCount,
      failed: failedCount + insertErrors.length,
      invalid_details: invalidRows,
      insert_errors: insertErrors,
    };
  },

  /**
   * Save profile photo record
   */
  async saveProfilePhoto(file, employeeId, userId) {
    const relativePath = `/uploads/photos/${file.filename}`;

    // Update employee profile_photo field
    await EmployeeRepository.update(employeeId, { profile_photo: relativePath });

    // Record in uploaded_files
    const fileRecord = await FileRepository.create({
      originalName: file.originalname,
      storedName: file.filename,
      filePath: file.path,
      fileSize: file.size,
      uploadedBy: userId,
    });

    return {
      file_id: fileRecord.insertId,
      file_path: relativePath,
      original_name: file.originalname,
    };
  },
};

module.exports = UploadService;
