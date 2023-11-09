-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 09, 2023 lúc 02:38 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `coffee_shop`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cf_drinks`
--

CREATE TABLE `cf_drinks` (
  `dr_id` int(3) NOT NULL,
  `dr_name` varchar(25) NOT NULL,
  `dr_price` int(255) NOT NULL,
  `dr_img` varchar(255) NOT NULL,
  `cate_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cf_drinks`
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
(14, 'Caramel Freeze Phindi', 55000, 'CARAMEL_FREEZE_PHINDI.jpg', 4);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cf_drinks`
--
ALTER TABLE `cf_drinks`
  ADD PRIMARY KEY (`dr_id`),
  ADD KEY `cate_id` (`cate_id`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cf_drinks`
--
ALTER TABLE `cf_drinks`
  ADD CONSTRAINT `cf_drinks_ibfk_1` FOREIGN KEY (`cate_id`) REFERENCES `cf_categories` (`cate_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
