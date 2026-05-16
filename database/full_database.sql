/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.0.2-MariaDB, for osx10.21 (arm64)
--
-- Host: localhost    Database: nusacore_hris
-- ------------------------------------------------------
-- Server version	12.0.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_code` varchar(20) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `birth_date` date DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `division` varchar(100) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `salary` decimal(12,2) DEFAULT 0.00,
  `join_date` date DEFAULT NULL,
  `employment_status` enum('Active','Inactive','Resigned') DEFAULT 'Active',
  `profile_photo` varchar(255) DEFAULT NULL,
  `emergency_contact` varchar(100) DEFAULT NULL,
  `emergency_phone` varchar(20) DEFAULT NULL,
  `education` varchar(100) DEFAULT NULL,
  `marital_status` enum('Single','Married') DEFAULT 'Single',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_code` (`employee_code`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_employee_code` (`employee_code`),
  KEY `idx_email` (`email`),
  KEY `idx_division` (`division`),
  KEY `idx_employment_status` (`employment_status`),
  KEY `idx_full_name` (`full_name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `employees` VALUES
(1,'EMP-001','Ahmad Rizki Pratama','Male','1990-05-15','ahmad.rizki@ptdigitalnusantara.co.id','081234567890','Jl. Sudirman No. 10','Jakarta','DKI Jakarta','10220','Engineering','Senior Backend Engineer',15000000.00,'2020-01-15','Active',NULL,'Siti Pratama','081234567891','S1 Teknik Informatika','Married','2026-05-10 12:46:06','2026-05-10 12:46:06'),
(2,'EMP-002','Dewi Sartika Rahma','Female','1992-08-22','dewi.sartika@ptdigitalnusantara.co.id','082345678901','Jl. Thamrin No. 25','Jakarta','DKI Jakarta','10350','Human Resource','HR Manager',12000000.00,'2019-03-01','Active',NULL,'Budi Rahma','082345678902','S1 Psikologi','Married','2026-05-10 12:46:06','2026-05-10 12:46:06'),
(3,'EMP-003','Budi Santoso','Male','1988-11-30','budi.santoso@ptdigitalnusantara.co.id','083456789012','Jl. Gatot Subroto No. 5','Jakarta','DKI Jakarta','12930','Finance','Finance Manager',13500000.00,'2018-06-15','Active',NULL,'Ani Santoso','083456789013','S1 Akuntansi','Married','2026-05-10 12:46:06','2026-05-10 12:46:06'),
(4,'EMP-004','Sari Wulandari','Female','1995-03-10','sari.wulandari@ptdigitalnusantara.co.id','084567890123','Jl. Kebon Jeruk No. 12','Jakarta','DKI Jakarta','11530','Engineering','Frontend Developer',9000000.00,'2022-02-01','Active',NULL,'Eko Wulandari','084567890124','S1 Sistem Informasi','Single','2026-05-10 12:46:06','2026-05-10 12:46:06'),
(6,'EMP-006','Intan Permatasari','Female','1993-12-04','intan.permatasari@ptdigitalnusantara.co.id','086789012345','Jl. Raya Bogor No. 100','Bogor','Jawa Barat','16710','Design','UI/UX Designer',10000000.00,'2021-01-14','Active','/uploads/photos/photo_a11603b5-8f65-467e-906e-64d950225eb1.png','Deni Permatasari','086789012346','S1 Desain Komunikasi Visual','Single','2026-05-10 12:46:06','2026-05-14 00:06:11'),
(7,'EMP-007','Eko Prasetyo','Male','1987-04-25','eko.prasetyo@ptdigitalnusantara.co.id','087890123456','Jl. Ahmad Yani No. 50','Surabaya','Jawa Timur','60234','Engineering','DevOps Engineer',14000000.00,'2020-07-01','Inactive',NULL,'Retno Prasetyo','087890123457','S1 Teknik Komputer','Married','2026-05-10 12:46:06','2026-05-10 12:46:06'),
(8,'EMP-008','Nadia Putri Maharani','Female','1996-09-13','nadia.putri@ptdigitalnusantara.co.id','088901234567','Jl. Diponegoro No. 33','Bandung','Jawa Barat','40115','Finance','Accountant',7500000.00,'2023-01-01','Active','/uploads/photos/photo_879e5a3b-b9d0-4871-9fbc-2c9d1b0468bb.jpg','Hendra Maharani','088901234568','S1 Akuntansi','Single','2026-05-10 12:46:06','2026-05-14 00:04:17'),
(9,'EMP-009','Agus Setiawan','Male','1985-01-26','agus.setiawan@ptdigitalnusantara.co.id','089012345678','Jl. Veteran No. 15','Yogyakarta','DI Yogyakarta','55231','Management','Project Manager',18000000.00,'2017-04-29','Resigned','/uploads/photos/photo_4da8c159-f9b3-4121-b6ae-cab026d79b70.jpg','Yuni Setiawan','089012345679','S2 Manajemen','Married','2026-05-10 12:46:06','2026-05-14 00:16:39'),
(10,'EMP-010','Laila Nur Azizah','Female','1994-06-08','laila.nur@ptdigitalnusantara.co.id','081123456789','Jl. Hayam Wuruk No. 88','Semarang','Jawa Tengah','50134','Marketing','Digital Marketing',8000000.00,'2022-08-15','Active',NULL,'Kamil Azizah','081123456790','S1 Marketing','Single','2026-05-10 12:46:06','2026-05-10 12:46:06'),
(11,'EMP-0011','Contoh Karyawan','Male','1990-01-15','contoh@perusahaan.com','081234567890','Jl. Contoh No. 1','Jakarta','DKI Jakarta','10220','Engineering','Backend Developer',10000000.00,'2024-01-01','Active',NULL,NULL,NULL,'S1 Teknik Informatika','Single','2026-05-14 00:28:43','2026-05-14 00:28:43'),
(12,'EMP-0012','Sample Karyawan','Male','1990-01-15','sample@nusacore.com','081234567890','Jl. Contoh No. 1','Jakarta','DKI Jakarta','10220','Engineering','Backend Developer',10000000.00,'2024-01-01','Active',NULL,NULL,NULL,'S1 Teknik Informatika','Single','2026-05-16 03:27:24','2026-05-16 03:27:24'),
(13,'EMP-0013','Yusril Rapsanjani Wicaksono','Male','1999-06-25','yurapsanjani2@gmail.com','085156320712','Jalan kebun jeruk 19','Jakarta Barat','DKI Jakarta','111150','Engineering','Mobile Developer',8000000.00,'2026-05-15','Active','/uploads/photos/photo_fc2d6e16-67ac-470b-aae1-83dfc85b1cbb.jpg','Istri','08512233123','S1 Teknik Informatika','Married','2026-05-16 03:30:22','2026-05-16 03:38:09');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `login_logs`
--

DROP TABLE IF EXISTS `login_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `login_at` datetime DEFAULT current_timestamp(),
  `status` enum('Success','Failed') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_status` (`status`),
  KEY `idx_login_at` (`login_at`),
  CONSTRAINT `fk_login_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_logs`
--

LOCK TABLES `login_logs` WRITE;
/*!40000 ALTER TABLE `login_logs` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `login_logs` VALUES
(1,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-10 19:47:33','Success'),
(2,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-10 21:41:55','Success'),
(3,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-10 22:28:00','Success'),
(4,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-14 06:23:37','Success'),
(5,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-14 06:45:09','Success'),
(6,2,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-14 07:59:39','Success'),
(7,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-15 20:05:48','Success'),
(8,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-15 20:20:52','Failed'),
(9,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-15 20:20:57','Failed'),
(10,5,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-15 20:22:05','Failed'),
(11,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-15 20:22:44','Failed'),
(12,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-15 20:22:51','Failed'),
(13,1,'::1','Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1','2026-05-15 20:32:09','Success'),
(14,NULL,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-16 08:55:14','Failed'),
(15,NULL,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-16 08:55:29','Failed'),
(16,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-16 08:55:41','Failed'),
(17,NULL,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-16 08:57:33','Failed'),
(20,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-16 09:11:32','Success'),
(21,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-16 10:24:33','Success'),
(22,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-16 10:25:23','Success'),
(23,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-16 10:43:02','Success'),
(24,6,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-16 10:49:49','Success'),
(25,1,'::1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','2026-05-16 10:50:22','Success');
/*!40000 ALTER TABLE `login_logs` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expired_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_token` (`token`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `fk_password_resets_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` text NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_revoked` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_is_revoked` (`is_revoked`),
  CONSTRAINT `fk_refresh_tokens_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `refresh_tokens` VALUES
(1,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBudXNhY29yZS5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3Nzg0MTcyNTMsImV4cCI6MTc3OTAyMjA1MywiYXVkIjoibnVzYWNvcmUtY2xpZW50IiwiaXNzIjoibnVzYWNvcmUtaHJpcyJ9.C3hHp_RRm3itaZ8EhWDrr2Jg4KmHmt5vZRbcnZaXTEk','2026-05-17 19:47:33',0,'2026-05-10 12:47:33'),
(2,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBudXNhY29yZS5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3Nzg0MjQxMTUsImV4cCI6MTc3OTAyODkxNSwiYXVkIjoibnVzYWNvcmUtY2xpZW50IiwiaXNzIjoibnVzYWNvcmUtaHJpcyJ9.22cvXV_UTXt3V_pIpR8PleBr9Yo-rIBCJOd4CBVsnDY','2026-05-17 21:41:55',0,'2026-05-10 14:41:55'),
(3,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBudXNhY29yZS5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3Nzg0MjY4ODAsImV4cCI6MTc3OTAzMTY4MCwiYXVkIjoibnVzYWNvcmUtY2xpZW50IiwiaXNzIjoibnVzYWNvcmUtaHJpcyJ9.NurHB6WrpQlUA6lIajkJU0B-MkPUJIgG0K5Lxa7-atM','2026-05-17 22:28:00',0,'2026-05-10 15:28:00'),
(4,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBudXNhY29yZS5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3Nzg3MTQ2MTcsImV4cCI6MTc3OTMxOTQxNywiYXVkIjoibnVzYWNvcmUtY2xpZW50IiwiaXNzIjoibnVzYWNvcmUtaHJpcyJ9.s7iZnaxTAcFeEFzokPw3D9YuSXMUteL5l-JI3PD4no0','2026-05-21 06:23:37',1,'2026-05-13 23:23:37'),
(5,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBudXNhY29yZS5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3Nzg3MTU5MDksImV4cCI6MTc3OTMyMDcwOSwiYXVkIjoibnVzYWNvcmUtY2xpZW50IiwiaXNzIjoibnVzYWNvcmUtaHJpcyJ9.0XlkAmVoAXfF_zP1Mub4_NaZmkTPiIzMB7oicO2f5RY','2026-05-21 06:45:09',1,'2026-05-13 23:45:09'),
(6,2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ5dXJhcHNhbmphbmlAZ21haWwuY29tIiwicm9sZSI6IkVtcGxveWVlIiwiaWF0IjoxNzc4NzIwMzc5LCJleHAiOjE3NzkzMjUxNzksImF1ZCI6Im51c2Fjb3JlLWNsaWVudCIsImlzcyI6Im51c2Fjb3JlLWhyaXMifQ.ndGnHjuXK_RMfkKlR32uzn1GnmbGy2lA9Js6gaz9PH8','2026-05-21 07:59:39',1,'2026-05-14 00:59:39'),
(7,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBudXNhY29yZS5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3Nzg4NTAzNDgsImV4cCI6MTc3OTQ1NTE0OCwiYXVkIjoibnVzYWNvcmUtY2xpZW50IiwiaXNzIjoibnVzYWNvcmUtaHJpcyJ9.lA4gTjUOVrNhdY5RQyYuxmCVFx2hwXU7Q7zuAl7x6ys','2026-05-22 20:05:48',1,'2026-05-15 13:05:48'),
(8,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBudXNhY29yZS5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3Nzg4NTE5MjksImV4cCI6MTc3OTQ1NjcyOSwiYXVkIjoibnVzYWNvcmUtY2xpZW50IiwiaXNzIjoibnVzYWNvcmUtaHJpcyJ9.p9Fwm2MOtJnJpMYzABPfbRN5P4mmlNPgOvwwVkUniKI','2026-05-22 20:32:09',0,'2026-05-15 13:32:09'),
(9,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBudXNhY29yZS5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3Nzg4OTczNjAsImV4cCI6MTc3OTUwMjE2MCwiYXVkIjoibnVzYWNvcmUtY2xpZW50IiwiaXNzIjoibnVzYWNvcmUtaHJpcyJ9.0gCsZKynE4G08gOfYCLF6Bn26G_z72kSDMaXSPj-RgU','2026-05-23 09:09:20',0,'2026-05-16 02:09:20'),
(10,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBudXNhY29yZS5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3Nzg4OTc0OTIsImV4cCI6MTc3OTUwMjI5MiwiYXVkIjoibnVzYWNvcmUtY2xpZW50IiwiaXNzIjoibnVzYWNvcmUtaHJpcyJ9.gDbmfnv4B0S8TJbeUooQlVI_-Hg4Sz1Wx27n-ArSsro','2026-05-23 09:11:32',0,'2026-05-16 02:11:32'),
(11,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBudXNhY29yZS5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3Nzg5MDE4NzMsImV4cCI6MTc3OTUwNjY3MywiYXVkIjoibnVzYWNvcmUtY2xpZW50IiwiaXNzIjoibnVzYWNvcmUtaHJpcyJ9.4SvEw6VaxLPW2I1X2E-3NWD6SOBH1wjwb4x5DQ4b4dg','2026-05-23 10:24:33',0,'2026-05-16 03:24:33'),
(12,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBudXNhY29yZS5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3Nzg5MDE5MjMsImV4cCI6MTc3OTUwNjcyMywiYXVkIjoibnVzYWNvcmUtY2xpZW50IiwiaXNzIjoibnVzYWNvcmUtaHJpcyJ9.CU4xhA6bicTpmOnfQsL1UslTE1ZqS0DFBOMCbnUXI4g','2026-05-23 10:25:23',0,'2026-05-16 03:25:23'),
(13,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBudXNhY29yZS5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3Nzg5MDI5ODIsImV4cCI6MTc3OTUwNzc4MiwiYXVkIjoibnVzYWNvcmUtY2xpZW50IiwiaXNzIjoibnVzYWNvcmUtaHJpcyJ9.l6k2DjujJApItLUXxpzpdFeNdYWlBrFGpsXoleo3rzI','2026-05-23 10:43:02',0,'2026-05-16 03:43:02'),
(14,6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJ5dXJhcHNhbmphbmlAZ21haWwuY29tIiwicm9sZSI6IkVtcGxveWVlIiwiaWF0IjoxNzc4OTAzMzg5LCJleHAiOjE3Nzk1MDgxODksImF1ZCI6Im51c2Fjb3JlLWNsaWVudCIsImlzcyI6Im51c2Fjb3JlLWhyaXMifQ.v98gMm3RmUuYTmGdQZX66-myF5B0DUjBSlBX7f72Zt8','2026-05-23 10:49:49',0,'2026-05-16 03:49:49'),
(15,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBudXNhY29yZS5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3Nzg5MDM0MjIsImV4cCI6MTc3OTUwODIyMiwiYXVkIjoibnVzYWNvcmUtY2xpZW50IiwiaXNzIjoibnVzYWNvcmUtaHJpcyJ9.A_LuKf0rUtwtWDnc7fdNi8sOq--hingv8F6lNZ6RMXs','2026-05-23 10:50:22',0,'2026-05-16 03:50:22');
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(255) NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  KEY `idx_expires` (`expires`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `sessions` VALUES
('1sTWNRlE69pvXYQZg3uY8qdNRsWPQuph',1778989822,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2026-05-17T03:50:22.358Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":1,\"role\":\"Admin\"}'),
('8bPLTJcK4hXxd0Pcu2o8_A5GD1aKiGuC',1778983761,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2026-05-17T02:09:20.582Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":1,\"role\":\"Admin\"}'),
('gULZcZxlwGQIatEPUEiFulYF2WrfxAnw',1778989790,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2026-05-17T03:49:49.813Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":6,\"role\":\"Employee\"}'),
('k4MffXSHLS6vD3NqSOHDmMdzWmYl8d6t',1778983893,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2026-05-17T02:11:32.866Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":1,\"role\":\"Admin\"}'),
('L46uFP0UbpYNo5ytvHLpI5YpEdxaJZvn',1778988323,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2026-05-17T03:25:23.378Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":1,\"role\":\"Admin\"}'),
('m9rFpG2mB_NX7PlbuRJcBqKozURhjYRQ',1778938873,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2026-05-16T13:32:09.287Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":1,\"role\":\"Admin\"}'),
('sdWJDTiXJAv1iMhR5_HVwOnMCCIs47q0',1778989382,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2026-05-17T03:43:02.059Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":1,\"role\":\"Admin\"}'),
('ZZ0--_bMp8zC5_uLv-SDAlVkmDFoz_Dt',1778988273,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2026-05-17T03:24:33.479Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":1,\"role\":\"Admin\"}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `uploaded_files`
--

DROP TABLE IF EXISTS `uploaded_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `uploaded_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `original_name` varchar(255) NOT NULL,
  `stored_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_size` int(11) NOT NULL,
  `uploaded_by` int(11) DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_uploaded_by` (`uploaded_by`),
  KEY `idx_uploaded_at` (`uploaded_at`),
  CONSTRAINT `fk_uploaded_files_user` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uploaded_files`
--

LOCK TABLES `uploaded_files` WRITE;
/*!40000 ALTER TABLE `uploaded_files` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `uploaded_files` VALUES
(3,'ChatGPT Image Apr 30, 2026, 09_27_50 PM.png','photo_a11603b5-8f65-467e-906e-64d950225eb1.png','/Users/yurapsanjani/Documents/PROJECT/API/nusacore/src/uploads/photos/photo_a11603b5-8f65-467e-906e-64d950225eb1.png',2865234,1,'2026-05-14 00:06:08'),
(4,'IMG_9512.JPG','photo_4da8c159-f9b3-4121-b6ae-cab026d79b70.jpg','/Users/yurapsanjani/Documents/PROJECT/API/nusacore/src/uploads/photos/photo_4da8c159-f9b3-4121-b6ae-cab026d79b70.jpg',2932933,1,'2026-05-14 00:16:37'),
(5,'employee-import-template.xlsx','import_4e8554a8-1026-488b-98bf-b9aaab7269e0.xlsx','/Users/yurapsanjani/Documents/PROJECT/API/nusacore/src/uploads/imports/import_4e8554a8-1026-488b-98bf-b9aaab7269e0.xlsx',22595,1,'2026-05-14 00:28:43'),
(6,'employee-import-template (1).xlsx','import_18021b07-23be-49be-b797-7a3eafcdfdb9.xlsx','/Users/yurapsanjani/Documents/PROJECT/API/nusacore/src/uploads/imports/import_18021b07-23be-49be-b797-7a3eafcdfdb9.xlsx',10724,1,'2026-05-16 03:27:24'),
(7,'IMG_9522.JPG','photo_6d50a7fd-0cf4-438b-8901-10b64e154606.jpg','/Users/yurapsanjani/Documents/PROJECT/API/nusacore/src/uploads/photos/photo_6d50a7fd-0cf4-438b-8901-10b64e154606.jpg',2921036,1,'2026-05-16 03:35:49'),
(8,'IMG_9522.JPG','photo_fc2d6e16-67ac-470b-aae1-83dfc85b1cbb.jpg','/Users/yurapsanjani/Documents/PROJECT/API/nusacore/src/uploads/photos/photo_fc2d6e16-67ac-470b-aae1-83dfc85b1cbb.jpg',2921036,1,'2026-05-16 03:37:54');
/*!40000 ALTER TABLE `uploaded_files` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','Employee') DEFAULT 'Employee',
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `remember_token` varchar(255) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_users_employee` (`employee_id`),
  KEY `idx_username` (`username`),
  KEY `idx_email` (`email`),
  KEY `idx_role` (`role`),
  KEY `idx_status` (`status`),
  CONSTRAINT `fk_users_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `users` VALUES
(1,NULL,'superadmin','admin@nusacore.com','$2b$12$CxQ8.BTjgADFAyG7Lj5ymOwJAOX.17MuMB.XLr8CvIiC6GM7g9Mp.','Admin','Active',NULL,'2026-05-16 10:50:22','2026-05-10 12:46:06','2026-05-16 03:50:22'),
(2,1,'yusril.rapsanjani','testing@gmail.com','$2b$12$T9Y6LlZCOlTQLFrnXFzJRekfC7JSoLxJxvJouhBeYnlRuR/0CozbC','Employee','Active',NULL,'2026-05-14 07:59:39','2026-05-10 12:46:06','2026-05-16 02:07:35'),
(3,2,'dewi.sartika','dewi.sartika@ptdigitalnusantara.co.id','$2b$12$6756S4lVipR8Ib8UCWhKZePWAFacybi52wXpLdY6Mk7w7FeBq3rA2','Employee','Active',NULL,NULL,'2026-05-10 12:46:06','2026-05-10 12:46:06'),
(4,3,'budi.santoso','budi.santoso@ptdigitalnusantara.co.id','$2b$12$6756S4lVipR8Ib8UCWhKZePWAFacybi52wXpLdY6Mk7w7FeBq3rA2','Employee','Active',NULL,NULL,'2026-05-10 12:46:06','2026-05-10 12:46:06'),
(5,NULL,'yusriltakechi','takeuchi@gmail.com','$2b$12$kXXQwwCl7B/mWKTfJ018NuFiv4tW.P6LmbU.qTdkj4YC/pUAEhQmO','Employee','Active',NULL,NULL,'2026-05-15 13:21:55','2026-05-16 02:07:35'),
(6,NULL,'yurapsanjani','yurapsanjani@gmail.com','$2b$12$FfXd18KQsHJgl9bHRaK4setGeKwgZaq44zsqMl8dMFxaCBqaiGPdq','Employee','Active',NULL,'2026-05-16 10:49:49','2026-05-16 03:23:31','2026-05-16 03:49:49');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Dumping routines for database 'nusacore_hris'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-05-16 10:58:47
