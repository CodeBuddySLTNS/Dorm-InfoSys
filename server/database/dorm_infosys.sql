-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 23, 2025 at 01:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dorm_infosys`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `departmentId` int(11) NOT NULL,
  `acronym` varchar(15) NOT NULL,
  `departmentName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`departmentId`, `acronym`, `departmentName`) VALUES
(1, 'BSCS', 'Bachelor of Science in Computer Science'),
(2, 'BSIT', 'Bachelor of Science in Information Technology'),
(3, 'BSSW', 'Bachelor of Science in Social Work'),
(4, 'BECED', 'Bachelor of Early Childhood Education');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `studentId` int(11) DEFAULT NULL,
  `firstName` varchar(30) NOT NULL,
  `middleName` varchar(30) DEFAULT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `guardian` varchar(80) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `role` enum('student','admin') NOT NULL DEFAULT 'student'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `studentId`, `firstName`, `middleName`, `lastName`, `username`, `password`, `address`, `guardian`, `phone`, `departmentId`, `year`, `role`) VALUES
(1, NULL, 'Juan', NULL, 'Tamad', 'juan', '$2b$10$uGBQO1gNiAK.dltmHI.Fse13yuAs5jijaI3Xli3pLQKGVEhPw8.ze', NULL, NULL, NULL, NULL, NULL, 'admin'),
(21, NULL, 'Marian', 'Lana', 'Marayas', 'maria', '$2b$10$uGBQO1gNiAK.dltmHI.Fse13yuAs5jijaI3Xli3pLQKGVEhPw8.ze', 'Canawan, Salug, Z.N.', 'Juan Luna', '091645625155', 3, NULL, 'student'),
(22, NULL, 'Gina', '', 'Macaraig', 'gina', '$2b$10$Can6uz/MHLmuDCVSt9xMYeQa.P0s4QSw1yU3kw/DeSUkjC1TzPNUu', 'Labag, Salug, Z.N.', 'Goryo Macaraig', '09492516487', 1, NULL, 'student'),
(23, NULL, 'Jana', '', 'Kin', 'jana', '$2b$10$V0nLLL/xugwThQbW/5Yvp.R9yEffgxo7wFjdUaP/z5oRCPH3.5JFO', 'Ipilan, Salug, Z.N.', 'Kentoy Kin', '0913181323496', 2, NULL, 'student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`departmentId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `departmentId` (`departmentId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `departmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`departmentId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
