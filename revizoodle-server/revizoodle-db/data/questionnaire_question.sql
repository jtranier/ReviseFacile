-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 04, 2020 at 09:27 AM
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
-- Table structure for table `questionnaire_question`
--

CREATE TABLE `questionnaire_question` (
  `id` int(11) NOT NULL,
  `questionnaire_id` int(11) NOT NULL,
  `questionnaire_uuid` text NOT NULL,
  `question_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `questionnaire_question`
--

INSERT INTO `questionnaire_question` (`id`, `questionnaire_id`, `questionnaire_uuid`, `question_id`) VALUES
(60, 7, 'e6f5be88-5da2-4da5-80f0-a9315237b5c3', 5),
(61, 7, 'e6f5be88-5da2-4da5-80f0-a9315237b5c3', 6),
(62, 7, 'e6f5be88-5da2-4da5-80f0-a9315237b5c3', 7),
(63, 7, 'e6f5be88-5da2-4da5-80f0-a9315237b5c3', 11),
(64, 7, 'e6f5be88-5da2-4da5-80f0-a9315237b5c3', 14),
(65, 7, 'e6f5be88-5da2-4da5-80f0-a9315237b5c3', 16),
(66, 7, 'e6f5be88-5da2-4da5-80f0-a9315237b5c3', 21),
(67, 7, 'e6f5be88-5da2-4da5-80f0-a9315237b5c3', 23),
(68, 7, 'e6f5be88-5da2-4da5-80f0-a9315237b5c3', 24),
(69, 7, 'e6f5be88-5da2-4da5-80f0-a9315237b5c3', 25),
(70, 7, 'e6f5be88-5da2-4da5-80f0-a9315237b5c3', 831),
(71, 7, 'e6f5be88-5da2-4da5-80f0-a9315237b5c3', 847),
(72, 8, 'a3741e72-afa5-4e6f-b541-27cb0f81d5ec', 121),
(73, 8, 'a3741e72-afa5-4e6f-b541-27cb0f81d5ec', 496),
(74, 8, 'a3741e72-afa5-4e6f-b541-27cb0f81d5ec', 903),
(75, 8, 'a3741e72-afa5-4e6f-b541-27cb0f81d5ec', 904),
(76, 8, 'a3741e72-afa5-4e6f-b541-27cb0f81d5ec', 905),
(77, 8, 'a3741e72-afa5-4e6f-b541-27cb0f81d5ec', 906),
(78, 8, 'a3741e72-afa5-4e6f-b541-27cb0f81d5ec', 907),
(79, 8, 'a3741e72-afa5-4e6f-b541-27cb0f81d5ec', 908),
(80, 8, 'a3741e72-afa5-4e6f-b541-27cb0f81d5ec', 909),
(81, 9, 'afbe791c-0c28-4a52-a6ce-73298624113a', 5),
(82, 9, 'afbe791c-0c28-4a52-a6ce-73298624113a', 6),
(83, 9, 'afbe791c-0c28-4a52-a6ce-73298624113a', 7),
(84, 9, 'afbe791c-0c28-4a52-a6ce-73298624113a', 11),
(85, 9, 'afbe791c-0c28-4a52-a6ce-73298624113a', 14),
(86, 9, 'afbe791c-0c28-4a52-a6ce-73298624113a', 16),
(87, 9, 'afbe791c-0c28-4a52-a6ce-73298624113a', 21),
(88, 9, 'afbe791c-0c28-4a52-a6ce-73298624113a', 23),
(89, 9, 'afbe791c-0c28-4a52-a6ce-73298624113a', 24),
(90, 9, 'afbe791c-0c28-4a52-a6ce-73298624113a', 25),
(91, 9, 'afbe791c-0c28-4a52-a6ce-73298624113a', 831),
(92, 9, 'afbe791c-0c28-4a52-a6ce-73298624113a', 847),
(93, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 214),
(94, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 215),
(95, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 216),
(96, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 218),
(97, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 219),
(98, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 220),
(99, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 222),
(100, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 224),
(101, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 225),
(102, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 376),
(103, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 412),
(104, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 418),
(105, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 866),
(106, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 886),
(107, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 895),
(108, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 967),
(109, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 968),
(110, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 969),
(111, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 970),
(112, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 971),
(113, 10, '860dfcee-e278-436f-9666-99a2bbba26ff', 1140);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `questionnaire_question`
--
ALTER TABLE `questionnaire_question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `id` (`id`),
  ADD KEY `questionnaire_id` (`questionnaire_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questionnaire_question`
--
ALTER TABLE `questionnaire_question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
