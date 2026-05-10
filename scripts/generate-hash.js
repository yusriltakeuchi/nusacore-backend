'use strict';

/**
 * Script: Generate bcrypt hashes for seeder passwords
 * Run: node scripts/generate-hash.js
 */

require('dotenv').config();
const bcrypt = require('bcrypt');

const ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;

const passwords = [
  { label: 'Admin password (Admin@1234)', plain: 'Admin@1234' },
  { label: 'Employee password (Employee@1234)', plain: 'Employee@1234' },
];

async function run() {
  console.log('🔐 Generating bcrypt hashes...\n');
  for (const p of passwords) {
    const hash = await bcrypt.hash(p.plain, ROUNDS);
    console.log(`📌 ${p.label}`);
    console.log(`   Plain:  ${p.plain}`);
    console.log(`   Hash:   ${hash}`);
    console.log();
  }
  console.log('✅ Copy these hashes into database/seeder.sql');
}

run().catch(console.error);
