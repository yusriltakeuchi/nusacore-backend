-- ============================================================
-- NusaCore HRIS API - Database Seeder
-- PT Digital Nusantara
-- ============================================================

USE nusacore_hris;

-- ============================================================
-- SEED: employees
-- ============================================================
INSERT INTO employees (
  employee_code, full_name, gender, birth_date, email, phone_number, address,
  city, province, postal_code, division, position, salary, join_date,
  employment_status, emergency_contact, emergency_phone, education, marital_status
) VALUES
  ('EMP-001', 'Ahmad Rizki Pratama', 'Male', '1990-05-15', 'ahmad.rizki@ptdigitalnusantara.co.id', '081234567890',
   'Jl. Sudirman No. 10', 'Jakarta', 'DKI Jakarta', '10220', 'Engineering', 'Senior Backend Engineer',
   15000000.00, '2020-01-15', 'Active', 'Siti Pratama', '081234567891', 'S1 Teknik Informatika', 'Married'),

  ('EMP-002', 'Dewi Sartika Rahma', 'Female', '1992-08-22', 'dewi.sartika@ptdigitalnusantara.co.id', '082345678901',
   'Jl. Thamrin No. 25', 'Jakarta', 'DKI Jakarta', '10350', 'Human Resource', 'HR Manager',
   12000000.00, '2019-03-01', 'Active', 'Budi Rahma', '082345678902', 'S1 Psikologi', 'Married'),

  ('EMP-003', 'Budi Santoso', 'Male', '1988-11-30', 'budi.santoso@ptdigitalnusantara.co.id', '083456789012',
   'Jl. Gatot Subroto No. 5', 'Jakarta', 'DKI Jakarta', '12930', 'Finance', 'Finance Manager',
   13500000.00, '2018-06-15', 'Active', 'Ani Santoso', '083456789013', 'S1 Akuntansi', 'Married'),

  ('EMP-004', 'Sari Wulandari', 'Female', '1995-03-10', 'sari.wulandari@ptdigitalnusantara.co.id', '084567890123',
   'Jl. Kebon Jeruk No. 12', 'Jakarta', 'DKI Jakarta', '11530', 'Engineering', 'Frontend Developer',
   9000000.00, '2022-02-01', 'Active', 'Eko Wulandari', '084567890124', 'S1 Sistem Informasi', 'Single'),

  ('EMP-005', 'Rudi Hartono', 'Male', '1991-07-19', 'rudi.hartono@ptdigitalnusantara.co.id', '085678901234',
   'Jl. Mangga Dua No. 7', 'Jakarta', 'DKI Jakarta', '14430', 'Marketing', 'Marketing Specialist',
   8500000.00, '2021-09-01', 'Active', 'Rina Hartono', '085678901235', 'S1 Komunikasi', 'Married'),

  ('EMP-006', 'Intan Permatasari', 'Female', '1993-12-05', 'intan.permatasari@ptdigitalnusantara.co.id', '086789012345',
   'Jl. Raya Bogor No. 100', 'Bogor', 'Jawa Barat', '16710', 'Design', 'UI/UX Designer',
   10000000.00, '2021-01-15', 'Active', 'Deni Permatasari', '086789012346', 'S1 Desain Komunikasi Visual', 'Single'),

  ('EMP-007', 'Eko Prasetyo', 'Male', '1987-04-25', 'eko.prasetyo@ptdigitalnusantara.co.id', '087890123456',
   'Jl. Ahmad Yani No. 50', 'Surabaya', 'Jawa Timur', '60234', 'Engineering', 'DevOps Engineer',
   14000000.00, '2020-07-01', 'Inactive', 'Retno Prasetyo', '087890123457', 'S1 Teknik Komputer', 'Married'),

  ('EMP-008', 'Nadia Putri Maharani', 'Female', '1996-09-14', 'nadia.putri@ptdigitalnusantara.co.id', '088901234567',
   'Jl. Diponegoro No. 33', 'Bandung', 'Jawa Barat', '40115', 'Finance', 'Accountant',
   7500000.00, '2023-01-02', 'Active', 'Hendra Maharani', '088901234568', 'S1 Akuntansi', 'Single'),

  ('EMP-009', 'Agus Setiawan', 'Male', '1985-01-28', 'agus.setiawan@ptdigitalnusantara.co.id', '089012345678',
   'Jl. Veteran No. 15', 'Yogyakarta', 'DI Yogyakarta', '55231', 'Management', 'Project Manager',
   18000000.00, '2017-05-01', 'Resigned', 'Yuni Setiawan', '089012345679', 'S2 Manajemen', 'Married'),

  ('EMP-010', 'Laila Nur Azizah', 'Female', '1994-06-08', 'laila.nur@ptdigitalnusantara.co.id', '081123456789',
   'Jl. Hayam Wuruk No. 88', 'Semarang', 'Jawa Tengah', '50134', 'Marketing', 'Digital Marketing',
   8000000.00, '2022-08-15', 'Active', 'Kamil Azizah', '081123456790', 'S1 Marketing', 'Single');

-- ============================================================
-- SEED: users (password: Admin@1234 for admin, Employee@1234 for others)
-- ============================================================
-- Admin password hash for 'Admin@1234'
-- Employee password hash for 'Employee@1234'
-- Note: Generate fresh hashes using bcrypt with 12 rounds in production

INSERT INTO users (employee_id, username, email, password, role, status) VALUES
  (NULL, 'superadmin', 'admin@nusacore.com',
   '$2b$12$CxQ8.BTjgADFAyG7Lj5ymOwJAOX.17MuMB.XLr8CvIiC6GM7g9Mp.',  -- Admin@1234
   'Admin', 'Active'),

  (1, 'ahmad.rizki', 'ahmad.rizki@ptdigitalnusantara.co.id',
   '$2b$12$6756S4lVipR8Ib8UCWhKZePWAFacybi52wXpLdY6Mk7w7FeBq3rA2',  -- Employee@1234
   'Employee', 'Active'),

  (2, 'dewi.sartika', 'dewi.sartika@ptdigitalnusantara.co.id',
   '$2b$12$6756S4lVipR8Ib8UCWhKZePWAFacybi52wXpLdY6Mk7w7FeBq3rA2',  -- Employee@1234
   'Employee', 'Active'),

  (3, 'budi.santoso', 'budi.santoso@ptdigitalnusantara.co.id',
   '$2b$12$6756S4lVipR8Ib8UCWhKZePWAFacybi52wXpLdY6Mk7w7FeBq3rA2',  -- Employee@1234
   'Employee', 'Active');
