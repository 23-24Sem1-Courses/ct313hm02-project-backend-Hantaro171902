-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2023 at 02:39 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coffee_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cf_categories`
--

CREATE TABLE `cf_categories` (
  `cate_id` int(3) NOT NULL COMMENT 'id of category',
  `cate_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cf_categories`
--

INSERT INTO `cf_categories` (`cate_id`, `cate_name`) VALUES
(1, 'Coffee'),
(2, 'Tea'),
(3, 'Cake'),
(4, 'Freeze');

-- --------------------------------------------------------

--
-- Table structure for table `cf_drinks`
--

CREATE TABLE `cf_drinks` (
  `dr_id` int(3) NOT NULL,
  `dr_name` varchar(25) NOT NULL,
  `dr_price` int(255) NOT NULL,
  `dr_img` varchar(255) NOT NULL,
  `cate_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cf_drinks`
--

INSERT INTO `cf_drinks` (`dr_id`, `dr_name`, `dr_price`, `dr_img`, `cate_id`) VALUES
(1, 'Hot Americano', 55000, 'AMERICANO_NONG.jpg', 1),
(2, 'Bac Xiu', 25000, 'BAC_XIU.jpg', 1),
(3, 'Tra Sen Vang ', 45000, 'TRA_SEN_VANG_CU_NANG.jpg', 2),
(4, 'Freeze So-co-la', 55000, 'FREEZE_CHOCO.jpg', 4),
(5, 'Banh So-co-la Highlands', 35000, 'SOCOLAHL.png', 3),
(6, 'Banh Caramel Pho Mai', 35000, 'CARAMELPHOMAI.jpg', 3),
(7, 'Banh Pho Mai Chanh Day', 29000, 'PHOMAICHANHDAY.jpg', 3),
(8, 'Tra Qua Mong Anh Dao', 59000, 'TEA_BERRY.jpg', 2),
(9, 'Tra Xanh Dau Do', 45000, 'TRA_XANH_DAU_DO.jpg', 2),
(10, 'Cookies & Cream', 55000, 'COOKIES_FREEZE.jpg', 4),
(11, 'Phinidi Choco', 45000, 'PHINDI_CHOCO.jpg', 1),
(12, 'Tra Thach Vai', 45000, 'TRA_THACH_VAI', 2),
(13, 'Mocha Macchiato', 69000, 'MOCHA_MACCHIATO.jpg', 1),
(14, 'Caramel Freeze Phindi', 55000, 'CARAMEL_FREEZE_PHINDI.jpg', 4),
(16, 'Hot Americano', 55000, 'AMERICANO_NONG.jpg', 1),
(17, 'Hot Americano', 55000, 'AMERICANO_NONG.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cf_user`
--

CREATE TABLE `cf_user` (
  `u_id` int(100) UNSIGNED NOT NULL,
  `u_name` varchar(50) NOT NULL,
  `u_password` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `u_address` varchar(100) NOT NULL,
  `u_telephone` int(10) NOT NULL,
  `u_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cf_user`
--

INSERT INTO `cf_user` (`u_id`, `u_name`, `u_password`, `first_name`, `last_name`, `u_address`, `u_telephone`, `u_email`) VALUES
(1, 'Jake_Smitham', 0, 'Tristian', 'Dietrich', 'New Rochelle', 952889254, 'Lee3@gmail.com'),
(2, 'Hazel_Shields', 0, 'Hilbert', 'Little', 'Fort Baileehaven', 922326697, 'Mercedes.Schamberger39@gmail.com'),
(3, 'Savion34', 0, 'Christine', 'Marvin', 'Marysville', 948543294, 'Brennan_Wolff74@hotmail.com'),
(4, 'Karlee77', 0, 'Mariah', 'Douglas', 'Fort Blazeburgh', 944096822, 'Olen.Rippin-Kiehn1@hotmail.com'),
(5, 'Katlynn74', 0, 'Myron', 'Herzog', 'Mertzburgh', 904966734, 'Paige37@hotmail.com'),
(6, 'Ashleigh.Legros45', 0, 'Henderson', 'Altenwerth', 'Napa', 961539958, 'Lucy86@yahoo.com'),
(7, 'Frieda_Veum-Gislason9', 0, 'Juvenal', 'Waelchi', 'Callieton', 998252041, 'Dan74@gmail.com'),
(8, 'Eugenia40', 0, 'Hosea', 'Crooks', 'Cypress', 907310236, 'Reed.Effertz@gmail.com'),
(9, 'Orpha.Roob', 0, 'Janie', 'Waters', 'Brekkeport', 975375736, 'Cary_Leffler@hotmail.com'),
(10, 'Rafael88', 0, 'Raymundo', 'Becker', 'New Camryn', 915888135, 'Joaquin5@yahoo.com'),
(11, 'Jake_Smitham', 0, 'Tristian', 'Dietrich', 'New Rochelle', 952889255, 'Lee3@gmail.com'),
(12, 'Hantaro', 123, 'Han', 'Chau', 'Can Tho', 708091645, 'hanB2014913@gmail.com'),
(13, 'Test', 0, 'Tristian', 'Dietrich', 'New Rochelle', 952889254, 'Lee3@gmail.com'),
(14, '', 0, '', '', '', 0, ''),
(15, '', 0, '', '', '', 0, ''),
(16, '', 0, '', '', '', 0, ''),
(17, '', 0, '', '', '', 0, ''),
(18, '', 0, '', '', '', 0, ''),
(19, '', 0, '', '', '', 0, ''),
(20, '', 0, '', '', '', 0, ''),
(21, '', 0, '', '', '', 0, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cf_categories`
--
ALTER TABLE `cf_categories`
  ADD PRIMARY KEY (`cate_id`);

--
-- Indexes for table `cf_drinks`
--
ALTER TABLE `cf_drinks`
  ADD PRIMARY KEY (`dr_id`),
  ADD KEY `cate_id` (`cate_id`);

--
-- Indexes for table `cf_user`
--
ALTER TABLE `cf_user`
  ADD PRIMARY KEY (`u_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cf_drinks`
--
ALTER TABLE `cf_drinks`
  MODIFY `dr_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `cf_user`
--
ALTER TABLE `cf_user`
  MODIFY `u_id` int(100) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cf_drinks`
--
ALTER TABLE `cf_drinks`
  ADD CONSTRAINT `cf_drinks_ibfk_1` FOREIGN KEY (`cate_id`) REFERENCES `cf_categories` (`cate_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
