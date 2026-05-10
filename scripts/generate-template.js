'use strict';

/**
 * Script: Generate employee import template (Excel)
 * Run: node scripts/generate-template.js
 * Output: src/docs/employee-import-template.xlsx
 */

require('dotenv').config();
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'docs');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const headers = [
  'full_name', 'gender', 'birth_date', 'email', 'phone_number',
  'address', 'city', 'province', 'postal_code',
  'division', 'position', 'salary', 'join_date',
  'employment_status', 'education', 'marital_status',
  'emergency_contact', 'emergency_phone',
];

const sampleData = [
  {
    full_name: 'Contoh Karyawan',
    gender: 'Male',
    birth_date: '1990-01-15',
    email: 'contoh@perusahaan.com',
    phone_number: '081234567890',
    address: 'Jl. Contoh No. 1',
    city: 'Jakarta',
    province: 'DKI Jakarta',
    postal_code: '10220',
    division: 'Engineering',
    position: 'Backend Developer',
    salary: '10000000',
    join_date: '2024-01-01',
    employment_status: 'Active',
    education: 'S1 Teknik Informatika',
    marital_status: 'Single',
    emergency_contact: 'Nama Darurat',
    emergency_phone: '081234567899',
  },
];

const wb = xlsx.utils.book_new();
const ws = xlsx.utils.json_to_sheet(sampleData, { header: headers });

// Highlight header row
ws['!cols'] = headers.map(() => ({ wch: 20 }));

// Info sheet
const infoData = [
  { Field: 'full_name', Required: 'YES', Type: 'Text', Example: 'Ahmad Rizki' },
  { Field: 'gender', Required: 'YES', Type: 'Enum', Example: 'Male / Female' },
  { Field: 'birth_date', Required: 'NO', Type: 'Date', Example: '1990-05-15' },
  { Field: 'email', Required: 'YES', Type: 'Email', Example: 'ahmad@company.com' },
  { Field: 'phone_number', Required: 'NO', Type: 'Text', Example: '081234567890' },
  { Field: 'address', Required: 'NO', Type: 'Text', Example: 'Jl. Sudirman No. 10' },
  { Field: 'city', Required: 'NO', Type: 'Text', Example: 'Jakarta' },
  { Field: 'province', Required: 'NO', Type: 'Text', Example: 'DKI Jakarta' },
  { Field: 'postal_code', Required: 'NO', Type: 'Text', Example: '10220' },
  { Field: 'division', Required: 'NO', Type: 'Text', Example: 'Engineering' },
  { Field: 'position', Required: 'NO', Type: 'Text', Example: 'Backend Developer' },
  { Field: 'salary', Required: 'NO', Type: 'Number', Example: '10000000' },
  { Field: 'join_date', Required: 'NO', Type: 'Date', Example: '2024-01-01' },
  { Field: 'employment_status', Required: 'NO', Type: 'Enum', Example: 'Active / Inactive / Resigned' },
  { Field: 'education', Required: 'NO', Type: 'Text', Example: 'S1 Teknik Informatika' },
  { Field: 'marital_status', Required: 'NO', Type: 'Enum', Example: 'Single / Married' },
  { Field: 'emergency_contact', Required: 'NO', Type: 'Text', Example: 'Nama Darurat' },
  { Field: 'emergency_phone', Required: 'NO', Type: 'Text', Example: '081234567890' },
];
const wsInfo = xlsx.utils.json_to_sheet(infoData);
wsInfo['!cols'] = [{ wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 35 }];

xlsx.utils.book_append_sheet(wb, ws, 'Employees');
xlsx.utils.book_append_sheet(wb, wsInfo, 'Field Guide');

const outputPath = path.join(OUTPUT_DIR, 'employee-import-template.xlsx');
xlsx.writeFile(wb, outputPath);
console.log(`✅ Template created: ${outputPath}`);
