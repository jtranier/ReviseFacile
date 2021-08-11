-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 04, 2020 at 09:29 AM
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
-- Table structure for table `reponses_questionnaire`
--

CREATE TABLE `reponses_questionnaire` (
  `id` int(11) NOT NULL,
  `etudiant_id` text NOT NULL,
  `questionnaire_id` int(11) NOT NULL,
  `choix` text NOT NULL,
  `correctes` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reponses_questionnaire`
--

INSERT INTO `reponses_questionnaire` (`id`, `etudiant_id`, `questionnaire_id`, `choix`, `correctes`, `date`) VALUES
(2, '87174801-f117-4bd1-bd5f-177c5042a9ac', 7, '[1,2,1,3,2,1,4,1,1,1,2,1]', '[1,0,1,1,0,1,0,0,0,1,0,1]', '2020-08-29 14:07:01'),
(3, 'ogswrxdedq', 7, '[1,3,1,3,1,1,2,2,4,1,3,4]', '[1,1,1,1,1,1,1,1,1,1,1,0]', '2020-08-30 11:40:55'),
(4, '304619b5-447f-42b2-b866-9187246f525a', 7, '[1,5,2,1,1,1,2,4,1,1,3,1]', '[1,0,0,0,1,1,1,0,0,1,1,1]', '2020-08-30 13:24:19'),
(5, '87174801-f117-4bd1-bd5f-177c5042a9ac', 7, '[2,1,3,3,2,2,4,2,2,1,1,3]', '[0,0,0,1,0,0,0,1,0,1,0,0]', '2020-09-02 11:30:14'),
(6, '304619b5-447f-42b2-b866-9187246f525a', 9, '[1,2,2,2,2,3,1,1,1,3,4,5]', '[1,0,0,0,0,0,0,0,0,0,0,0]', '2020-09-03 14:01:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reponses_questionnaire`
--
ALTER TABLE `reponses_questionnaire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questionnaire_id` (`questionnaire_id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reponses_questionnaire`
--
ALTER TABLE `reponses_questionnaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
