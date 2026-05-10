'use strict';

const xlsx = require('xlsx');
const PDFDocument = require('pdfkit');
const EmployeeService = require('./employee.service');

/**
 * Export Service
 * Handles Excel and PDF generation
 */
const ExportService = {
  /**
   * Export employees to Excel buffer
   * @param {Object} queryParams - Filters/search
   * @returns {Buffer} xlsx buffer
   */
  async exportToExcel(queryParams) {
    const employees = await EmployeeService.getAllForExport(queryParams);

    const worksheetData = employees.map((emp, index) => ({
      No: index + 1,
      'Employee Code': emp.employee_code,
      'Full Name': emp.full_name,
      Gender: emp.gender,
      'Birth Date': emp.birth_date ? new Date(emp.birth_date).toLocaleDateString('id-ID') : '',
      Email: emp.email,
      'Phone Number': emp.phone_number || '',
      Address: emp.address || '',
      City: emp.city || '',
      Province: emp.province || '',
      'Postal Code': emp.postal_code || '',
      Division: emp.division || '',
      Position: emp.position || '',
      Salary: Number(emp.salary) || 0,
      'Join Date': emp.join_date ? new Date(emp.join_date).toLocaleDateString('id-ID') : '',
      'Employment Status': emp.employment_status,
      Education: emp.education || '',
      'Marital Status': emp.marital_status || '',
      'Emergency Contact': emp.emergency_contact || '',
      'Emergency Phone': emp.emergency_phone || '',
      'Created At': emp.created_at ? new Date(emp.created_at).toLocaleDateString('id-ID') : '',
    }));

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(worksheetData);

    // Set column widths
    worksheet['!cols'] = [
      { wch: 5 }, { wch: 12 }, { wch: 25 }, { wch: 8 }, { wch: 12 },
      { wch: 30 }, { wch: 15 }, { wch: 30 }, { wch: 15 }, { wch: 15 },
      { wch: 12 }, { wch: 20 }, { wch: 20 }, { wch: 15 }, { wch: 12 },
      { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 12 },
    ];

    xlsx.utils.book_append_sheet(workbook, worksheet, 'Employees');

    // Add metadata sheet
    const metaData = [
      { Key: 'Report Name', Value: 'NusaCore HRIS - Employee Report' },
      { Key: 'Company', Value: 'PT Digital Nusantara' },
      { Key: 'Generated At', Value: new Date().toLocaleString('id-ID') },
      { Key: 'Total Records', Value: employees.length },
    ];
    const metaSheet = xlsx.utils.json_to_sheet(metaData);
    xlsx.utils.book_append_sheet(workbook, metaSheet, 'Report Info');

    return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  },

  /**
   * Export employees to PDF stream
   * @param {Object} queryParams - Filters
   * @returns {PDFDocument} pdf stream
   */
  async exportToPDF(queryParams) {
    const employees = await EmployeeService.getAllForExport(queryParams);

    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape',
      margins: { top: 40, bottom: 40, left: 40, right: 40 },
    });

    // ─── Header ─────────────────────────────────────────────────────
    doc
      .fillColor('#1a1a2e')
      .rect(0, 0, doc.page.width, 70)
      .fill();

    doc
      .fillColor('#ffffff')
      .fontSize(18)
      .font('Helvetica-Bold')
      .text('NusaCore HRIS - Employee Report', 40, 20);

    doc
      .fontSize(10)
      .font('Helvetica')
      .text(`PT Digital Nusantara | Generated: ${new Date().toLocaleString('id-ID')} | Total: ${employees.length} employees`, 40, 48);

    doc.moveDown(3);

    // ─── Table Header ────────────────────────────────────────────────
    const tableTop = 90;
    const rowHeight = 22;
    const colWidths = [30, 80, 120, 50, 100, 80, 70, 100];
    const colLabels = ['No', 'Code', 'Full Name', 'Gender', 'Email', 'Division', 'Status', 'Join Date'];

    let x = 40;
    doc
      .fillColor('#4f46e5')
      .rect(40, tableTop, doc.page.width - 80, rowHeight)
      .fill();

    doc.fillColor('#ffffff').fontSize(8).font('Helvetica-Bold');
    colLabels.forEach((label, i) => {
      doc.text(label, x + 3, tableTop + 7, { width: colWidths[i] - 6, lineBreak: false });
      x += colWidths[i];
    });

    // ─── Table Rows ──────────────────────────────────────────────────
    let y = tableTop + rowHeight;
    employees.forEach((emp, index) => {
      if (y > doc.page.height - 80) {
        doc.addPage();
        y = 40;
      }

      const rowColor = index % 2 === 0 ? '#f8f9fa' : '#ffffff';
      doc.fillColor(rowColor).rect(40, y, doc.page.width - 80, rowHeight).fill();

      doc.fillColor('#333333').fontSize(7).font('Helvetica');
      const rowData = [
        String(index + 1),
        emp.employee_code || '',
        emp.full_name || '',
        emp.gender || '',
        emp.email || '',
        emp.division || '',
        emp.employment_status || '',
        emp.join_date ? new Date(emp.join_date).toLocaleDateString('id-ID') : '',
      ];

      x = 40;
      rowData.forEach((val, i) => {
        doc.text(val, x + 3, y + 7, { width: colWidths[i] - 6, lineBreak: false, ellipsis: true });
        x += colWidths[i];
      });

      // Row border
      doc.strokeColor('#dee2e6').moveTo(40, y + rowHeight).lineTo(doc.page.width - 40, y + rowHeight).stroke();
      y += rowHeight;
    });

    // ─── Footer ──────────────────────────────────────────────────────
    doc
      .fillColor('#999999')
      .fontSize(8)
      .text(
        `NusaCore HRIS © ${new Date().getFullYear()} PT Digital Nusantara - Confidential`,
        40,
        doc.page.height - 30,
        { align: 'center', width: doc.page.width - 80 }
      );

    doc.end();
    return doc;
  },
};

module.exports = ExportService;
