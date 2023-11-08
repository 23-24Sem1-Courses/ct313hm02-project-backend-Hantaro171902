-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2023 at 04:43 AM
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
CREATE DATABASE IF NOT EXISTS `coffee_shop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `coffee_shop`;

-- --------------------------------------------------------

--
-- Table structure for table `cf_cart_items`
--

CREATE TABLE `cf_cart_items` (
  `cart_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cf_cart_items`
--

INSERT INTO `cf_cart_items` (`cart_id`, `session_id`, `product_id`, `quantity`, `created_at`) VALUES
(10, 1, 1, 1, '2023-11-08 03:32:09'),
(11, 1, 2, 1, '2023-11-08 03:32:41');

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
(3, 'Tra Sen Vang ', 45000, 'TRA_SEN_VANG_CU_NANG.jpg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `cf_shopping_session`
--

CREATE TABLE `cf_shopping_session` (
  `session_id` int(255) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `total` decimal(10,0) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cf_shopping_session`
--

INSERT INTO `cf_shopping_session` (`session_id`, `user_id`, `total`, `created_at`) VALUES
(1, '100', '100000', '2023-11-08 03:30:42'),
(2, '100', '100000', '2023-11-08 03:31:16');

-- --------------------------------------------------------

--
-- Table structure for table `cf_user`
--

CREATE TABLE `cf_user` (
  `u_id` varchar(100) NOT NULL,
  `u_name` varchar(50) NOT NULL,
  `u_password` int(11) NOT NULL,
  `u_role` int(5) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `u_address` varchar(100) NOT NULL,
  `u_telephone` int(10) NOT NULL,
  `u_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cf_user`
--

INSERT INTO `cf_user` (`u_id`, `u_name`, `u_password`, `u_role`, `first_name`, `last_name`, `u_address`, `u_telephone`, `u_email`) VALUES
('100', 'admin', 123456, 0, 'han', 'chau', 'Can Tho', 708091645, 'hanb2014913@student.ctu.edu.vn'),
('101', 'user', 123456, 1, 'gia', 'chau', 'Can Tho', 123456789, 'chaugiahan001@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cf_cart_items`
--
ALTER TABLE `cf_cart_items`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `product_id` (`product_id`);

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
-- Indexes for table `cf_shopping_session`
--
ALTER TABLE `cf_shopping_session`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cf_user`
--
ALTER TABLE `cf_user`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `u_name` (`u_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cf_cart_items`
--
ALTER TABLE `cf_cart_items`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `cf_shopping_session`
--
ALTER TABLE `cf_shopping_session`
  MODIFY `session_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cf_cart_items`
--
ALTER TABLE `cf_cart_items`
  ADD CONSTRAINT `cf_cart_items_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `cf_shopping_session` (`session_id`),
  ADD CONSTRAINT `cf_cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `cf_drinks` (`dr_id`);

--
-- Constraints for table `cf_drinks`
--
ALTER TABLE `cf_drinks`
  ADD CONSTRAINT `cf_drinks_ibfk_1` FOREIGN KEY (`cate_id`) REFERENCES `cf_categories` (`cate_id`);

--
-- Constraints for table `cf_shopping_session`
--
ALTER TABLE `cf_shopping_session`
  ADD CONSTRAINT `cf_shopping_session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `cf_user` (`u_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
