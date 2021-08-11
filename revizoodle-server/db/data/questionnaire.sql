-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 04, 2020 at 09:26 AM
-- Server version: 5.7.25
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `adele2`
--

-- --------------------------------------------------------

--
-- Table structure for table `questionnaire`
--

CREATE TABLE `questionnaire` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `enseignant_id` text NOT NULL,
  `date_creation` text NOT NULL,
  `nom` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `questionnaire`
--

INSERT INTO `questionnaire` (`id`, `uuid`, `enseignant_id`, `date_creation`, `nom`) VALUES
(7, 'e6f5be88-5da2-4da5-80f0-a9315237b5c3', '87174801-f117-4bd1-bd5f-177c5042a9ac', '27/08/2020', 'Questionnaire CM1'),
(8, 'a3741e72-afa5-4e6f-b541-27cb0f81d5ec', '87174801-f117-4bd1-bd5f-177c5042a9ac', '30/08/2020', 'Repérage point'),
(9, 'afbe791c-0c28-4a52-a6ce-73298624113a', '304619b5-447f-42b2-b866-9187246f525a', '03/09/2020', 'Questionnaire du CM1'),
(10, '860dfcee-e278-436f-9666-99a2bbba26ff', '87174801-f117-4bd1-bd5f-177c5042a9ac', '03/09/2020', 'forces');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `questionnaire`
--
ALTER TABLE `questionnaire`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questionnaire`
--
ALTER TABLE `questionnaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
