-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Aug 11, 2020 at 03:28 PM
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
-- Table structure for table `diffusion`
--

CREATE TABLE `diffusion` (
  `id` int(11) NOT NULL,
  `classe_id` int(11) DEFAULT NULL,
  `nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date_creation` date NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date DEFAULT NULL,
  `notes` longtext COLLATE utf8_unicode_ci,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `diffusion`
--

INSERT INTO `diffusion` (`id`, `classe_id`, `nom`, `date_creation`, `date_debut`, `date_fin`, `notes`, `slug`) VALUES
(7, 2258, 'Physique  - culture générale', '2017-12-27', '2018-02-01', '2018-08-31', NULL, 'physique-culture-generale'),
(8, 2258, 'Physique - compréhension conceptuelle', '2017-12-27', '2018-02-01', '2018-08-31', NULL, 'physique-comprehension-conceptuelle'),
(9, 2258, 'Physique - raisonnement et démarche scientifique', '2017-12-27', '2018-02-01', '2018-08-31', NULL, 'physique-raisonnement-et-demarche-scientifique'),
(14, 4110, 'Champs électrique et force de Coulomb', '2018-02-04', '2019-01-20', '2019-06-30', '14 questions.', 'champs-electrique-et-force-de-coulomb'),
(16, 4110, 'Distribution de charge', '2018-02-23', '2018-03-03', '2019-06-30', NULL, 'distribution-de-charge'),
(18, 4110, 'Conducteur', '2018-03-12', '2019-03-17', '2019-06-30', NULL, 'conducteur'),
(19, 4110, 'Potentiel électrostatique', '2018-03-12', '2018-03-11', '2019-06-30', NULL, 'potentiel-electrostatique'),
(20, 4110, 'Théorème de Gauss', '2018-03-12', '2018-03-18', '2019-06-30', NULL, 'theoreme-de-gauss'),
(21, 4378, 'DemainIntegrale', '2018-03-14', '2018-03-14', '2018-03-28', NULL, 'demainintegrale'),
(22, 4378, 'cours proba', '2018-03-14', '2018-03-02', '2018-03-30', NULL, 'cours-proba'),
(36, 2258, 'Conducteur 2', '2018-07-05', '2018-07-05', '2018-07-08', NULL, 'conducteur-2'),
(37, 7467, 'Raisonnement', '2018-08-02', '2018-08-02', '2020-12-31', NULL, 'raisonnement'),
(42, 4986, 'Chapitre 2 - analyse dimensionnelle', '2018-08-16', '2018-09-10', '2019-06-30', NULL, 'chapitre-2-analyse-dimensionnelle'),
(43, 4986, 'Chapitre 3 - constantes fondamentales', '2018-08-16', '2018-09-17', '2019-06-30', NULL, 'chapitre-3-constantes-fondamentales'),
(44, 4986, 'Chapitre 2 - compléments', '2018-08-16', '2018-09-10', '2019-06-30', NULL, 'chapitre-2-complements'),
(45, 4986, 'Chapitre 5 - Repérage dans l\'espace', '2018-09-17', '2018-09-17', '2019-06-30', NULL, 'chapitre-5-reperage-dans-lespace'),
(46, 4986, 'Chapitre 6 - cinématique 1D', '2018-09-17', '2018-09-23', '2019-06-30', NULL, 'chapitre-6-cinematique-1d'),
(47, 4986, 'Chapitre 7 - cinématique 2D et 3D', '2018-09-20', '2018-09-30', '2019-06-30', NULL, 'chapitre-7-cinematique-2d-et-3d'),
(48, 4986, 'Chapitre 6 et 7 : compléments', '2018-09-24', '2018-09-30', '2019-06-30', NULL, 'chapitre-6-et-7-complements'),
(49, 7467, 'Physique', '2018-09-30', '2018-09-30', '0000-00-00', NULL, 'physique'),
(50, 4986, 'Chapitre 8 - masse, quantité de mouvement, barycentre', '2018-09-30', '2018-10-10', '2019-06-30', NULL, 'chapitre-8-masse-quantite-de-mouvement-barycentre'),
(51, 4986, 'Chapitre 9 - généralités sur les forces', '2018-09-30', '2018-10-10', '2019-06-30', NULL, 'chapitre-9-generalites-sur-les-forces'),
(52, 1177, 'Courbure', '2018-10-05', '2018-10-07', '2019-01-31', NULL, 'courbure'),
(53, 8608, 'Champs de vecteur', '2018-10-09', '2018-10-09', '2019-07-31', NULL, 'champs-de-vecteur'),
(54, 8608, 'Champ électrostatique', '2018-10-09', '2018-10-09', '2019-07-31', NULL, 'champ-electrostatique'),
(55, 8608, 'Potentiel électrostatique', '2018-10-09', '2018-10-09', '2019-07-31', NULL, 'potentiel-electrostatique'),
(56, 8608, 'Dipole électrostatique', '2018-10-09', '2018-10-14', '2019-07-31', NULL, 'dipole-electrostatique'),
(57, 8608, 'Théorème de Gauss', '2018-10-09', '2018-10-09', '2019-07-31', NULL, 'theoreme-de-gauss'),
(58, 4986, 'Chapitre 9 - forces exercées par un fluide : poussée d\'Archimède et frottement fluide', '2018-10-10', '2018-10-14', '2019-06-30', NULL, 'chapitre-9-forces-exercees-par-un-fluide-poussee-darchimede-et-frottement-fluide'),
(60, 4986, '3LA - révision QCM n°2', '2018-10-12', '2018-10-07', '2019-06-30', NULL, '3la-revision-qcm-n2'),
(61, 4986, 'Chapitre 9 - forces exercées par un solide', '2018-10-14', '2018-10-15', '2019-06-30', NULL, 'chapitre-9-forces-exercees-par-un-solide'),
(62, 4986, 'Chapitre 10 - lois de Newton', '2018-10-16', '2018-10-20', '2019-06-30', NULL, 'chapitre-10-lois-de-newton'),
(63, 4986, 'Chapitre 10 - bilan de forces', '2018-10-20', '2018-10-20', '2019-06-30', NULL, 'chapitre-10-bilan-de-forces'),
(64, 4986, 'Chapitre 10 - compléments', '2018-10-20', '2018-10-24', '2019-06-30', NULL, 'chapitre-10-complements'),
(65, 4986, 'Chapitre 11 - introduction à l\'énergie', '2018-10-26', '2018-10-28', '2019-06-30', NULL, 'chapitre-11-introduction-a-lenergie'),
(66, 4986, 'Chapitre 12 - travail et énergie cinétique', '2018-10-26', '2018-10-31', '2019-06-30', NULL, 'chapitre-12-travail-et-energie-cinetique'),
(67, 4986, 'Chapitre 13 - énergie potentielle et forces conservatives', '2018-10-27', '2018-10-31', '2019-06-30', NULL, 'chapitre-13-energie-potentielle-et-forces-conservatives'),
(68, 4986, 'Chapitre 12 et 13 : compléments sur l\'énergie', '2018-10-31', '2018-11-05', '2019-06-30', NULL, 'chapitre-12-et-13-complements-sur-lenergie'),
(69, 4986, 'Chapitre 12 - complément FACULTATIF sur les chocs', '2018-11-01', '2018-11-06', '2019-06-30', NULL, 'chapitre-12-complement-facultatif-sur-les-chocs'),
(70, 4986, 'Chapitre 15 - chute avec frottement fluide', '2018-11-06', '2018-11-11', '2019-06-30', NULL, 'chapitre-15-chute-avec-frottement-fluide'),
(71, 4986, 'Chapitre 15 - évolution des systèmes d\'ordre 1', '2018-11-06', '2018-11-11', '2019-06-30', NULL, 'chapitre-15-evolution-des-systemes-dordre-1'),
(72, 4986, 'Chapitre 16 - évolution des systèmes d\'ordre 2 sans frottement', '2018-11-14', '2018-11-20', '2019-06-30', NULL, 'chapitre-16-evolution-des-systemes-dordre-2-sans-frottement'),
(73, 3827, 'Composée de fonctions', '2018-12-09', '2018-12-09', '2019-06-30', NULL, 'composee-de-fonctions'),
(74, 9142, 'Chapitre 1 - analyse dimensionnelle', '2019-03-08', '2019-05-01', NULL, NULL, 'chapitre-1-analyse-dimensionnelle'),
(75, 9142, 'Compléments du chapitre 1 - analyse dimensionnelle', '2019-03-08', '2019-05-01', NULL, NULL, 'complements-du-chapitre-1-analyse-dimensionnelle'),
(76, 9142, 'Chapitre 2 - constantes et interactions fondamentales', '2019-03-10', '2019-05-01', NULL, NULL, 'chapitre-2-constantes-et-interactions-fondamentales'),
(77, 9142, 'Compléments du chapitre 2 - constantes et interactions fondamentales', '2019-03-10', '2019-05-01', NULL, NULL, 'complements-du-chapitre-2-constantes-et-interactions-fondamentales'),
(78, 9142, 'Chapitre 3 - repérage d\'un point dans l\'espace(-temps)', '2019-03-10', '2019-05-01', NULL, NULL, 'chapitre-3-reperage-dun-point-dans-lespace-temps'),
(79, 9142, 'Compléments du chapitre 3 - repérage d\'un point dans l\'espace(-temps)', '2019-03-10', '2019-05-01', NULL, NULL, 'complements-du-chapitre-3-reperage-dun-point-dans-lespace-temps'),
(80, 9142, 'Chapitre 4 - cinématique 1D', '2019-03-10', '2019-05-01', NULL, NULL, 'chapitre-4-cinematique-1d'),
(81, 9142, 'Compléments du chapitre 4 - cinématique 1D', '2019-03-10', '2019-05-01', NULL, NULL, 'complements-du-chapitre-4-cinematique-1d'),
(82, 9142, 'Chapitre 5 - cinématique 2D et 3D', '2019-03-10', '2019-05-01', NULL, NULL, 'chapitre-5-cinematique-2d-et-3d'),
(83, 9142, 'Compléments du chapitre 5 - cinématique 2D et 3D', '2019-03-10', '2019-05-01', NULL, NULL, 'complements-du-chapitre-5-cinematique-2d-et-3d'),
(84, 9142, 'Introduction de la partie III : masse, quantité de mouvement, barycentre', '2019-03-14', '2019-05-01', NULL, NULL, 'introduction-de-la-partie-iii-masse-quantite-de-mouvement-barycentre'),
(85, 9142, 'Chapitre 6 - les forces', '2019-03-14', '2019-05-01', NULL, NULL, 'chapitre-6-les-forces'),
(86, 9142, 'Compléments du chapitre 6 - les forces', '2019-03-14', '2019-05-01', NULL, NULL, 'complements-du-chapitre-6-les-forces'),
(87, 9142, 'Chapitre 7 - lois de Newton', '2019-03-14', '2019-05-01', NULL, NULL, 'chapitre-7-lois-de-newton'),
(88, 9142, 'Compléments du chapitre 7 - lois de Newton', '2019-03-14', '2019-05-01', NULL, NULL, 'complements-du-chapitre-7-lois-de-newton'),
(89, 9142, 'Introduction de la partie IV : énergie cinétique', '2019-03-14', '2019-05-01', NULL, NULL, 'introduction-de-la-partie-iv-energie-cinetique'),
(90, 9142, 'Chapitre 8 - travail et énergie cinétique', '2019-03-14', '2019-05-01', NULL, NULL, 'chapitre-8-travail-et-energie-cinetique'),
(91, 9142, 'Compléments du chapitre 8 - travail et énergie cinétique', '2019-03-14', '2019-05-01', NULL, NULL, 'complements-du-chapitre-8-travail-et-energie-cinetique'),
(92, 9142, 'Chapitre 9 - énergie potentielle et forces conservatives', '2019-03-15', '2019-05-01', NULL, NULL, 'chapitre-9-energie-potentielle-et-forces-conservatives'),
(93, 9142, 'Compléments du chapitre 9 - énergie potentielle et forces conservatives', '2019-03-15', '2019-05-01', NULL, NULL, 'complements-du-chapitre-9-energie-potentielle-et-forces-conservatives'),
(94, 9142, 'Chapitre 10 - évolution temporelle des systèmes d\'ordre 1', '2019-03-15', '2019-05-01', NULL, NULL, 'chapitre-10-evolution-temporelle-des-systemes-dordre-1'),
(95, 9142, 'Compléments du chapitre 10 - évolution temporelle des systèmes d\'ordre 1', '2019-03-15', '2019-05-01', NULL, NULL, 'complements-du-chapitre-10-evolution-temporelle-des-systemes-dordre-1'),
(96, 9142, 'Chapitre 11 - évolution temporelle des systèmes d\'ordre 2', '2019-03-15', '2019-05-01', NULL, NULL, 'chapitre-11-evolution-temporelle-des-systemes-dordre-2'),
(97, 9142, 'Compléments du chapitre 11 - évolution temporelle des systèmes d\'ordre 2', '2019-03-15', '2019-05-01', NULL, NULL, 'complements-du-chapitre-11-evolution-temporelle-des-systemes-dordre-2'),
(99, 4346, 'Test Chris Diff infinie', '2019-04-12', '2019-04-12', NULL, NULL, 'test-chris-diff-infinie');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `diffusion`
--
ALTER TABLE `diffusion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_5938415B8F5EA509` (`classe_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `diffusion`
--
ALTER TABLE `diffusion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
