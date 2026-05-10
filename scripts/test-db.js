'use strict';

/**
 * Script: Test database connection
 * Run: node scripts/test-db.js
 */

require('dotenv').config();
const { testConnection, pool } = require('../src/config/database');

async function run() {
  try {
    await testConnection();

    const [tables] = await pool.execute('SHOW TABLES');
    console.log('\n📋 Tables in database:');
    tables.forEach(t => {
      const name = Object.values(t)[0];
      console.log(`   • ${name}`);
    });

    const [empCount] = await pool.execute('SELECT COUNT(*) as total FROM employees');
    const [userCount] = await pool.execute('SELECT COUNT(*) as total FROM users');
    console.log('\n📊 Record counts:');
    console.log(`   • Employees: ${empCount[0].total}`);
    console.log(`   • Users:     ${userCount[0].total}`);

    console.log('\n✅ Database is healthy!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Database test failed:', err.message);
    process.exit(1);
  }
}

run();
