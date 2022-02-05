-- MariaDB dump 10.19  Distrib 10.5.10-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: sapo_mock
-- ------------------------------------------------------
-- Server version	10.5.10-MariaDB-1:10.5.10+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `description` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Áo thun',''),(2,'Thun',''),(3,'Quần bò','Quần bò tạo bởi Hiếu'),(4,'Hoodie','Áo hoodie'),(5,'Áo khoác','Danh mục test lúc thêm sản phẩm'),(6,'Quần âu','');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `check_sheets`
--

DROP TABLE IF EXISTS `check_sheets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `check_sheets` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(8) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_by` bigint(20) unsigned NOT NULL,
  `note` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `check_sheets_created_by_foreign` (`created_by`),
  CONSTRAINT `check_sheets_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `check_sheets`
--

LOCK TABLES `check_sheets` WRITE;
/*!40000 ALTER TABLE `check_sheets` DISABLE KEYS */;
/*!40000 ALTER TABLE `check_sheets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `import_receipts`
--

DROP TABLE IF EXISTS `import_receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `import_receipts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(8) NOT NULL,
  `order_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_by` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `import_receipts_fk_orders` (`order_id`),
  KEY `import_receipts_fk_users` (`created_by`),
  CONSTRAINT `import_receipts_fk_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `import_receipts_fk_users` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_receipts`
--

LOCK TABLES `import_receipts` WRITE;
/*!40000 ALTER TABLE `import_receipts` DISABLE KEYS */;
INSERT INTO `import_receipts` VALUES (4,'ICN00001',3,'2021-12-21 11:27:07',2),(5,'ICN00002',3,'2021-12-21 11:29:02',2),(6,'ICN00003',8,'2021-12-24 20:22:42',2),(7,'ICN00003',30,'2022-01-07 11:54:43',4),(12,'ICN00004',31,'2022-01-10 19:35:24',4),(16,'ICN00005',31,'2022-01-10 19:37:36',4),(17,'ICN00007',35,'2022-01-12 11:15:32',4),(18,'ICN00008',36,'2022-01-13 15:04:22',2),(19,'ICN00009',36,'2022-01-13 15:05:36',2),(20,'ICN00010',37,'2022-01-13 15:19:43',2),(21,'ICN00011',39,'2022-01-13 15:25:41',2),(22,'ICN00012',40,'2022-01-13 15:34:22',2),(24,'ICN00013',40,'2022-01-13 15:36:02',2),(25,'ICN00014',41,'2022-01-13 16:44:11',2),(26,'ICN00015',41,'2022-01-13 16:45:07',2),(27,'ICN00016',42,'2022-01-15 18:37:21',2),(28,'ICN00017',45,'2022-01-17 17:59:30',4),(29,'ICN00018',47,'2022-01-18 16:47:56',4),(30,'ICN00019',47,'2022-01-18 16:50:11',4);
/*!40000 ALTER TABLE `import_receipts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(8) NOT NULL,
  `supplier_id` bigint(20) unsigned NOT NULL,
  `total_amount` decimal(12,2) NOT NULL,
  `paid_amount` decimal(12,2) DEFAULT 0.00,
  `expected_time` date NOT NULL,
  `transaction_status` varchar(32) DEFAULT 'Chưa thanh toán' CHECK (`transaction_status` in ('Chưa thanh toán','Thanh toán một phần','Đã thanh toán')),
  `imported_status` varchar(32) DEFAULT 'Chờ nhập kho' CHECK (`imported_status` in ('Chờ nhập kho','Nhập kho một phần','Đã nhập kho','Hoàn trả một phần','Hoàn trả toàn bộ')),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `created_by` bigint(20) unsigned NOT NULL,
  `status` varchar(32) DEFAULT 'Đang giao dịch' CHECK (`status` in ('Đang giao dịch','Đã huỷ','Đã hoàn thành')),
  `description` varchar(255) NOT NULL DEFAULT '',
  `discount` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_code_unique` (`code`),
  KEY `orders_supplier_id_foreign` (`supplier_id`),
  KEY `orders_created_by_foreign` (`created_by`),
  CONSTRAINT `orders_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_supplier_id_foreign` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (3,'SON00001',4,100000.00,0.00,'2021-12-12','Chưa thanh toán','Chờ nhập kho','2021-12-21 04:22:50','2021-12-21 04:22:50',2,'Đang giao dịch','',0),(5,'SON00002',4,60000.00,60000.00,'2021-09-12','Chưa thanh toán','Chờ nhập kho','2021-12-24 08:59:31','2021-12-24 08:59:31',2,'Đang giao dịch','',0),(6,'SON00003',4,200000.00,200000.00,'2021-09-12','Đã thanh toán','Chờ nhập kho','2021-12-24 11:43:04','2021-12-24 11:43:04',2,'Đang giao dịch','',0),(7,'SON00004',4,200000.00,0.00,'2021-09-12','Chưa thanh toán','Chờ nhập kho','2021-12-24 15:04:38','2021-12-24 15:04:38',2,'Đang giao dịch','',0),(8,'SON00005',4,200000.00,140000.00,'2021-09-12','Thanh toán một phần','Đã nhập kho','2021-12-24 15:12:09','2021-12-24 15:12:09',2,'Đang giao dịch','',0),(15,'SON00006',3,6000000.00,0.00,'2021-12-09','Chưa thanh toán','Chờ nhập kho','2021-12-30 13:12:43','2021-12-30 13:12:43',2,'Đang giao dịch','',0),(17,'SON00007',3,6000000.00,0.00,'2021-12-09','Chưa thanh toán','Chờ nhập kho','2021-12-30 13:14:41','2021-12-30 13:14:41',2,'Đang giao dịch','',0),(19,'SON00008',3,6000000.00,0.00,'2021-12-09','Chưa thanh toán','Chờ nhập kho','2021-12-30 13:18:31','2021-12-30 13:18:31',2,'Đang giao dịch','',0),(21,'SON00009',3,6000000.00,0.00,'2021-12-09','Chưa thanh toán','Chờ nhập kho','2021-12-30 13:19:16','2021-12-30 13:19:16',2,'Đang giao dịch','',0),(23,'SON00010',3,6000000.00,0.00,'2021-12-09','Chưa thanh toán','Chờ nhập kho','2021-12-30 13:22:53','2021-12-30 13:22:53',2,'Đang giao dịch','',0),(24,'SON00011',3,5100000.00,0.00,'2022-01-05','Chưa thanh toán','Chờ nhập kho','2022-01-05 10:19:58','2022-01-05 10:19:58',2,'Đang giao dịch','',0),(25,'SON00012',3,5100000.00,0.00,'2022-01-05','Chưa thanh toán','Chờ nhập kho','2022-01-05 10:32:03','2022-01-05 10:32:03',2,'Đang giao dịch','',0),(26,'SON00015',3,5640000.00,1000000.00,'2021-12-09','Thanh toán một phần','Chờ nhập kho','2022-01-05 11:54:13','2022-01-05 11:54:13',4,'Đang giao dịch','',0),(27,'SON00013',3,94094000.00,0.00,'2022-01-06','Chưa thanh toán','Chờ nhập kho','2022-01-05 12:38:08','2022-01-05 12:38:08',2,'Đang giao dịch','',0),(28,'PBN00020',7,10105000.00,0.00,'2022-01-06','Chưa thanh toán','Chờ nhập kho','2022-01-05 17:01:16','2022-01-05 17:01:16',2,'Đang giao dịch','',0),(30,'SON00016',5,5640000.00,0.00,'2021-12-09','Chưa thanh toán','Nhập kho một phần','2022-01-07 11:47:21','2022-01-07 11:47:21',4,'Đang giao dịch','',0),(31,'SON00017',8,5640000.00,0.00,'2021-12-09','Chưa thanh toán','Đã nhập kho','2022-01-10 19:28:40','2022-01-10 19:28:40',4,'Đang giao dịch','',0),(33,'SON00018',11,5640000.00,0.00,'2021-12-09','Chưa thanh toán','Chờ nhập kho','2022-01-11 10:22:32','2022-01-11 10:22:32',4,'Đang giao dịch','',0),(34,'SON00019',15,24400000.00,15400000.00,'2022-01-13','Đã thanh toán','Chờ nhập kho','2022-01-12 10:35:37','2022-01-12 10:42:44',2,'Đang giao dịch','',0),(35,'SON00020',11,5640000.00,0.00,'2021-12-09','Chưa thanh toán','Nhập kho một phần','2022-01-12 11:15:02','2022-01-12 11:15:02',4,'Đang giao dịch','',0),(36,'SON00021',16,14100000.00,14100000.00,'2022-01-14','Đã thanh toán','Đã nhập kho','2022-01-13 15:03:33','2022-01-13 15:03:33',2,'Đã hoàn thành','',0),(37,'SON00022',16,940000.00,0.00,'2022-01-14','Chưa thanh toán','Đã nhập kho','2022-01-13 15:19:19','2022-01-13 15:19:19',2,'Đã hoàn thành','',0),(38,'SON00023',14,940000.00,940000.00,'2022-01-14','Đã thanh toán','Chờ nhập kho','2022-01-13 15:23:32','2022-01-13 15:23:32',2,'Đã hoàn thành','',0),(39,'SON00024',14,940000.00,940000.00,'2022-01-14','Đã thanh toán','Đã nhập kho','2022-01-13 15:25:13','2022-01-13 15:25:13',2,'Đã hoàn thành','',0),(40,'SON00025',16,1880000.00,1880000.00,'2022-01-14','Đã thanh toán','Đã nhập kho','2022-01-13 15:33:44','2022-01-13 15:33:44',2,'Đã hoàn thành','',0),(41,'SON00026',17,9400000.00,9400000.00,'2022-01-14','Đã thanh toán','Hoàn trả toàn bộ','2022-01-13 16:43:02','2022-01-13 16:43:02',2,'Đã hoàn thành','',0),(42,'SON00027',11,1880000.00,13160000.00,'2022-01-16','Đã thanh toán','Đã nhập kho','2022-01-15 18:36:02','2022-01-15 18:36:54',2,'Đã hoàn thành','',0),(43,'SON00028',11,5640000.00,5640000.00,'2021-12-09','Đã thanh toán','Chờ nhập kho','2022-01-16 12:31:16','2022-01-16 12:31:16',2,'Đang giao dịch','',0),(44,'SON00029',17,940000.00,0.00,'2022-01-18','Chưa thanh toán','Chờ nhập kho','2022-01-17 12:55:22','2022-01-17 12:55:22',4,'Đang giao dịch','',6),(45,'SON00030',17,95000.00,0.00,'2022-01-18','Chưa thanh toán','Hoàn trả toàn bộ','2022-01-17 12:57:30','2022-01-17 12:57:30',4,'Đang giao dịch','',5),(46,'SON00031',3,950000.00,0.00,'2022-01-19','Chưa thanh toán','Chờ nhập kho','2022-01-18 09:52:10','2022-01-18 09:52:10',4,'Đã hủy','',5),(47,'SON00032',18,1425000.00,1425000.00,'2022-01-20','Đã thanh toán','Hoàn trả toàn bộ','2022-01-18 16:47:29','2022-01-18 16:47:29',4,'Đã hoàn thành','',5);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_invoice`
--

DROP TABLE IF EXISTS `payment_invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_invoice` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) NOT NULL CHECK (`amount` >= 0),
  `order_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_by` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_invoice_fk_orders` (`order_id`),
  KEY `payment_invoice_fk_users` (`created_by`),
  CONSTRAINT `payment_invoice_fk_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `payment_invoice_fk_users` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_invoice`
--

LOCK TABLES `payment_invoice` WRITE;
/*!40000 ALTER TABLE `payment_invoice` DISABLE KEYS */;
INSERT INTO `payment_invoice` VALUES (3,50000.00,5,'2021-12-24 09:01:57',2),(4,50000.00,5,'2021-12-24 09:10:04',2),(5,60000.00,5,'2021-12-24 09:10:39',2),(6,60000.00,5,'2021-12-24 09:11:31',2),(7,60000.00,6,'2021-12-24 11:43:57',2),(8,140000.00,6,'2021-12-24 11:44:33',2),(9,140000.00,8,'2021-12-24 15:14:02',2),(10,1000000.00,26,'2022-01-05 12:26:38',4),(11,1400000.00,34,'2022-01-12 10:36:37',2),(12,7000000.00,34,'2022-01-12 10:37:23',2),(13,7000000.00,34,'2022-01-12 10:37:43',2),(14,14100000.00,36,'2022-01-13 15:03:57',2),(15,940000.00,38,'2022-01-13 15:23:53',2),(16,940000.00,39,'2022-01-13 15:25:24',2),(17,880000.00,40,'2022-01-13 15:34:07',2),(18,1000000.00,40,'2022-01-13 15:35:37',2),(19,400000.00,41,'2022-01-13 16:43:54',2),(20,9000000.00,41,'2022-01-13 16:44:49',2),(21,13160000.00,42,'2022-01-15 18:37:06',2),(22,1000000.00,43,'2022-01-16 12:34:51',7),(23,4640000.00,43,'2022-01-16 12:35:12',7),(24,425000.00,47,'2022-01-18 16:47:46',4),(25,1000000.00,47,'2022-01-18 16:50:05',4);
/*!40000 ALTER TABLE `payment_invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `category_id` bigint(20) unsigned NOT NULL,
  `brand` varchar(32) DEFAULT '',
  `description` varchar(255) DEFAULT '',
  `image_url` varchar(255) DEFAULT '',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `weight` decimal(10,2) NOT NULL DEFAULT 0.00,
  `record_status` varchar(32) DEFAULT 'Đang hoạt động',
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Áo thun mẫu',1,'','','','2021-12-21 03:20:40','2021-12-21 03:20:40',10.00,'Đang hoạt động'),(2,'Áo thun mẫu 2',1,'','','','2021-12-21 03:23:10','2021-12-21 03:23:10',0.00,'Đã xóa'),(3,'Áo thun mẫu 3',1,'Gucci','','','2021-12-28 14:11:28','2021-12-28 14:11:28',0.00,'Đã xóa'),(5,'Áo thun mẫu 4',1,'Chanel','','','2021-12-28 14:11:57','2021-12-28 14:11:57',0.00,'Đã xóa'),(11,'Test san pham',1,'Gucci','','','2021-12-29 11:06:50','2021-12-29 11:06:50',10.00,'Đang hoạt động'),(12,'Test san pham',1,'Nike','','','2022-01-05 00:03:35','2022-01-05 00:03:35',100.00,'Đã xóa'),(13,'Áo sơ mi',1,'Adidas','','','2022-01-05 16:55:53','2022-01-05 16:55:53',100.00,'Đã xóa'),(16,'Áo',1,'','','','2022-01-05 17:27:17','2022-01-05 17:27:17',0.00,'Đang hoạt động'),(18,'Sản phẩm để test',1,'','','','2022-01-10 21:38:21','2022-01-10 21:38:21',0.00,'Đã xóa'),(19,'test',1,'','','','2022-01-10 21:50:15','2022-01-10 21:50:15',0.00,'Đang hoạt động'),(20,'Tét sản phẩm',1,'','','','2022-01-10 22:01:56','2022-01-10 22:01:56',0.00,'Đã xóa'),(21,'Tét sản phẩm',1,'','','','2022-01-10 22:12:40','2022-01-10 22:12:40',0.00,'Đã xóa'),(27,'Test',1,'','','','2022-01-10 22:33:46','2022-01-10 22:33:46',0.00,'Đang hoạt động'),(28,'Áo sơ mi của Hiếu',1,'Gucci','','','2022-01-11 19:11:29','2022-01-11 19:11:29',10.00,'Đang hoạt động'),(29,'Quần bò của Hiếu',3,'','','','2022-01-12 09:24:35','2022-01-12 09:24:35',0.00,'Đang hoạt động'),(30,'Quần bò của Hiếu',3,'','','','2022-01-12 09:28:53','2022-01-12 09:28:53',1000.00,'Đang hoạt động'),(31,'Quần bò',3,'Đôn Chề','Đây là một chiếc quần bỏ của hiệu Đồn Chề','','2022-01-12 10:23:24','2022-01-12 10:23:24',3000.00,'Đang hoạt động'),(32,'Quần bò của Hiếu',3,'Gu Chì','Đay là sản phẩm để test 1 lượt ','','2022-01-12 14:54:26','2022-01-12 14:54:26',1000.00,'Đã xóa'),(33,'Hoodie thời thượng',4,'Luôn Vui Tươi','Đây là mô tả ở phần chỉnh sửa','','2022-01-13 15:29:47','2022-01-13 15:29:47',1000.00,'Đang hoạt động'),(34,'Áo hoodie',4,'Gu Chì','Mô tả lúc chỉnh sửa sản phẩm','','2022-01-13 16:35:58','2022-01-13 16:35:58',1000.00,'Đang hoạt động'),(35,'Test validation',1,'','','','2022-01-14 15:44:16','2022-01-14 15:44:16',0.00,'Đang hoạt động'),(36,'Test validation 2',1,'','','','2022-01-14 16:25:14','2022-01-14 16:25:14',0.00,'Đang hoạt động'),(37,'Sản phẩm test security config',5,'','','','2022-01-16 12:42:22','2022-01-16 12:42:22',0.00,'Đang hoạt động'),(38,'Sản phẩm test security config',1,'','','','2022-01-16 12:48:29','2022-01-16 12:48:29',0.00,'Đang hoạt động'),(39,'Quần bò của Hiếu',5,'','','','2022-01-17 16:59:04','2022-01-17 16:59:04',0.00,'Đang hoạt động'),(40,'Quần bò của Hiếu',5,'','','https://firebasestorage.googleapis.com/v0/b/mockproject-8a6f6.appspot.com/o/images%2F15be61e33a22f77cae33.jpg?alt=media&token=8d47f8e7-a23f-4d65-8538-b21c02a6c893','2022-01-17 17:00:17','2022-01-17 17:00:17',0.00,'Đang hoạt động'),(41,'Quần âu',6,'H&M','','https://firebasestorage.googleapis.com/v0/b/mockproject-8a6f6.appspot.com/o/images%2F9b2426657ca4b1fae8b5.jpg?alt=media&token=41061d4d-63c6-4561-a2ec-dcac20343685','2022-01-18 16:41:36','2022-01-18 16:41:36',0.00,'Đang hoạt động');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `return_receipts`
--

DROP TABLE IF EXISTS `return_receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `return_receipts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(8) DEFAULT NULL,
  `order_id` bigint(20) unsigned DEFAULT NULL,
  `note` varchar(32) DEFAULT '',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_by` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  KEY `fk_return_receipts_2_idx` (`created_by`),
  KEY `fk_return_receipts_1_idx` (`order_id`),
  CONSTRAINT `fk_return_receipts_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_return_receipts_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `return_receipts`
--

LOCK TABLES `return_receipts` WRITE;
/*!40000 ALTER TABLE `return_receipts` DISABLE KEYS */;
INSERT INTO `return_receipts` VALUES (7,'REN00001',41,NULL,NULL,4),(8,'REN00002',45,'','2022-01-17 17:59:47',4),(9,'REN00003',47,'','2022-01-18 16:50:55',4),(10,'REN00004',47,'','2022-01-18 16:51:18',4);
/*!40000 ALTER TABLE `return_receipts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN'),(2,'Nhân viên kho'),(3,'Kế toán');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suppliers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(16) NOT NULL,
  `name` varchar(64) NOT NULL,
  `address` varchar(128) NOT NULL,
  `phone` varchar(11) DEFAULT '',
  `email` varchar(128) DEFAULT '',
  `website` varchar(128) DEFAULT '',
  `description` varchar(255) DEFAULT '',
  `fax` varchar(32) DEFAULT '',
  `debt` decimal(12,2) DEFAULT 0.00,
  `activity_status` varchar(32) DEFAULT 'Đang hợp tác' CHECK (`activity_status` in ('Đang hợp tác','Ngừng hợp tác')),
  `record_status` varchar(32) DEFAULT 'Đang hoạt động' CHECK (`record_status` in ('Đang hoạt động','Đã xoá')),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (2,'NCC00001','Samsung Corp.','266 Đội Cấn','123456789','fakeemail@gmail.com','samsung.vn','','',0.00,'Đang hợp tác','Đã xóa'),(3,'NCC00003','Samsung Corp.','266 Đội Cấn Ba Đình Hà Nội','','','abc.com','','',150450000.00,'Đang hợp tác','Đang hoạt động'),(4,'NCC00002','Samsung Corp.','266 Đội Cấn','','','abc.com','','',60000.00,'Đang hợp tác','Đang hoạt động'),(5,'NCC00004','Apple','Đội Cấn','','','','','',5640000.00,'Đang hợp tác','Đang hoạt động'),(7,'NCC00005','Apple Store','Ba Đình','','','','','',20750000.00,'Đang hợp tác','Đang hoạt động'),(8,'NCC00007','Sapo Store','Đội Cấn','','','','','',5640000.00,'Đang hợp tác','Đang hoạt động'),(9,'NCC0006','Lmao lmao.','266 Đội Cấn','0123456789','','abc.com','','',0.00,'Đang hợp tác','Đang hoạt động'),(10,'NCC0008','Lmao lmao.','266 Đội Cấn','0123456789','','abc.com','','',0.00,'Đang hợp tác','Đã xóa'),(11,'','Test generate code','Số 1 Việt Nam','0123456789','','abc.com','','',0.00,'Đang hợp tác','Đã xóa'),(12,'','Test generate code','Số 1 Việt Nam','0123456789','','abc.com','','',0.00,'Đang hợp tác','Đã xóa'),(13,'NCC00010','Test generate code','Số 1 Việt Nam','0123456789','','abc.com','','',0.00,'Đang hợp tác','Đã xóa'),(14,'NCC00011','Test generate code','Số 1 Việt Nam','0123456789','','abc.com','','',0.00,'Đang hợp tác','Đã xóa'),(15,'NCC00013','Nhà cung cấp mới','Đội Cấn, Ba Đình, Hà Nội','0912345678','','website.sapo.vn','','',9000000.00,'Đang hợp tác','Đã xóa'),(16,'NCC00014','Test generate code','Số 1 Việt Nam','0123456789','','abc.com','','',940000.00,'Đang hợp tác','Đã xóa'),(17,'NCC00015','Nhà cung cấp số 1','Số 1 Đội Cấn','','','','','',1035000.00,'Đang hợp tác','Đang hoạt động'),(18,'NCC00016','H&M Retail Store','Đội Cấn','','','','','',0.00,'Đang hợp tác','Đang hoạt động');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `user_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (2,2),(4,1),(5,2),(7,3),(8,1),(9,3);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(128) NOT NULL,
  `record_status` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'hieutran29','$2a$10$R0/ZBOYVDDZZcz9hvB7wjuEGqx7TZxi8cZiuoERblD4ryMclbpKVi','hieu.trantrung@gmail.com','Đang hoạt động'),(4,'hieutrantrung','$2a$10$lvQBsqG/HWguN5uCbJGJWeC0HZ9SVzOkZsltA2Vp9wEAiWG79AovG','rokclone201@gmail.com','Đang hoạt động'),(5,'ad','$2a$10$1khL65NzntKIhq4/rsLhLOv110Rny7sLq76dcrMhrQwTwDLHcs3Pa','fakeemail@gmail.com','Đang hoạt động'),(7,'accountant','$2a$10$mbMkmyuh5p9ge0OtiPSReO1LtKgpU9UsPEVt0HV3HaHeYRV51S8je','bubu@gmail.com','Đang hoạt động'),(8,'hieu','$2a$10$/FUVoGMWBhTkqNqG.f0P0u2CCnRMSGcinaEi1Bfjw5.yb4m3IsPPS','hieutran@gmail.com','Đang hoạt động'),(9,'ketoan1','$2a$10$rprx4wSLXsRS.IOnCMUVXuIbbd./VdJUhDN3u54GIdflM87hJ3h0i','ketoan@mail.com','Đang hoạt động');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variants`
--

DROP TABLE IF EXISTS `variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `variants` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `code` varchar(16) NOT NULL,
  `inventory_quantity` bigint(20) NOT NULL,
  `sellable_quantity` bigint(20) NOT NULL,
  `size` varchar(8) DEFAULT '',
  `color` varchar(16) DEFAULT '',
  `material` varchar(32) DEFAULT '',
  `unit` varchar(16) DEFAULT '',
  `original_price` decimal(12,2) NOT NULL,
  `whole_sale_price` decimal(12,2) NOT NULL,
  `retail_price` decimal(12,2) NOT NULL,
  `record_status` varchar(32) DEFAULT 'Đang hoạt động' CHECK (`record_status` in ('Đang hoạt động','Đã xoá')),
  `sell_status` varchar(32) DEFAULT 'Có thể bán',
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `variants_code_unique` (`code`),
  KEY `variants_product_id_foreign` (`product_id`),
  CONSTRAINT `variants_products_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variants`
--

LOCK TABLES `variants` WRITE;
/*!40000 ALTER TABLE `variants` DISABLE KEYS */;
INSERT INTO `variants` VALUES (1,1,'PBN00001',310,300,'XL','Đỏ','','',100000.00,100000.00,100000.00,'Đang hoạt động','Có thể bán',''),(2,1,'PBN00002',300,290,'','','','',100000.00,100000.00,100000.00,'Đã xóa','Có thể bán',''),(3,3,'PBN00003',90,55,'','','','',50000.00,50000.00,50000.00,'Đã xóa','Có thể bán',''),(4,1,'PBN00005',210,100,'','','','',25000.00,25000.00,25000.00,'Đang hoạt động','Có thể bán',''),(5,1,'PBN00006',1500,1400,'','','','',125000.00,250000.00,250000.00,'Đang hoạt động','Có thể bán',''),(6,11,'PBN00007',100,100,'XL','Đỏ','Vải','Cái',150000.00,150000.00,150000.00,'Đang hoạt động','Có thể bán',''),(7,12,'PBN00008',100,90,'XL','Đỏ','Len','Cái',100000.00,100000.00,100000.00,'Đã xóa','Có thể bán',''),(8,1,'PBN00009',90,90,'XL','Đỏ','Vải','Cái',150000.00,150000.00,150000.00,'Đang hoạt động','Có thể bán',''),(12,16,'PBN00004',0,0,'','','','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(14,19,'PBN00010',0,0,'','','','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(15,20,'PBN00011',0,0,'','','','',0.00,0.00,0.00,'Đã xóa','Có thể bán',''),(25,27,'PBN00012',0,0,'L','vang','vai','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(26,27,'PBN00013',0,0,'XL','vang','vai','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(27,27,'PBN00014',0,0,'L','vang','giay','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(28,27,'PBN00015',0,0,'XL','vang','giay','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(29,27,'PBN00016',0,0,'L','do','vai','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(30,27,'PBN00017',0,0,'XL','do','vai','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(31,27,'PBN00018',0,0,'L','do','giay','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(32,27,'PBN00019',0,0,'XL','do','giay','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(33,27,'PBN00020',0,0,'L','xanh','vai','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(34,27,'PBN00021',0,0,'XL','xanh','vai','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(35,27,'PBN00022',0,0,'L','xanh','giay','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(36,27,'PBN00023',0,0,'XL','xanh','giay','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(37,28,'PBN00024',0,0,'L','vang','vai','',0.00,0.00,0.00,'Đã xóa','Có thể bán',''),(38,28,'PBN00025',0,0,'XL','vang','vai','',0.00,0.00,0.00,'Đã xóa','Có thể bán',''),(39,28,'PBN00026',0,0,'L','vang','giay','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(40,28,'PBN00027',0,0,'XL','vang','giay','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(41,28,'PBN00028',0,0,'L','do','vai','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(42,28,'PBN00029',0,0,'XL','do','vai','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(43,28,'PBN00030',0,0,'L','do','giay','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(44,28,'PBN00031',0,0,'XL','do','giay','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(45,29,'PBN00032',0,0,'','','','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(46,30,'PBN00033',0,0,'XL','Đỏ','Vari','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(47,30,'PBN00034',0,0,'XL','Xanh','Vari','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(48,30,'PBN00035',1000,800,'XL','Xanh dương','Vải','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(49,31,'PBN00036',660,160,'XL','Xanh dương','Bò','Chiếc',0.00,0.00,100000.00,'Đang hoạt động','Có thể bán',''),(50,32,'PBN00037',100,90,'','Xanh','Bò','Cái',0.00,0.00,0.00,'Đã xóa','Có thể bán',''),(51,32,'PBN00038',0,0,'','Xanh dương','Vải','',100000.00,100000.00,100000.00,'Đã xóa','Có thể bán',''),(52,33,'PBN00039',110,110,'XL','Đỏ','Chất liệu mẫu','',100000.00,150000.00,149997.00,'Đang hoạt động','Có thể bán',''),(53,33,'PBN00040',100,100,'L','Đỏ','','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(54,33,'PBN00041',0,0,'XL','Xanh','','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(55,33,'PBN00042',0,0,'L','Xanh','','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(56,34,'PBN00043',0,0,'L','Đỏ','Vải','',99999.00,100000.00,100000.00,'Đang hoạt động','Có thể bán',''),(57,34,'PBN00044',0,0,'XL','Đỏ','Vải','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(58,34,'PBN00045',0,0,'L','Đỏ','Len','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(59,34,'PBN00046',0,0,'XL','Đỏ','Len','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(60,34,'PBN00047',0,0,'L','Xanh','Vải','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(61,34,'PBN00048',0,0,'XL','Xanh','Vải','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(62,34,'PBN00049',0,0,'L','Xanh','Len','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(63,34,'PBN00050',0,0,'XL','Xanh','Len','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(64,35,'PBN00051',0,0,'','','','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(65,36,'PBN00052',0,0,'','','','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',''),(66,37,'PBN00053',100,90,'L','Đỏ','Vải','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',NULL),(67,37,'PBN00054',100,50,'XL','Đỏ','Vải','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',NULL),(68,37,'PBN00055',100,50,'L','Nâu','Vải','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',NULL),(69,37,'PBN00056',100,50,'XL','Nâu','Vải','',0.00,0.00,0.00,'Đang hoạt động','Có thể bán',NULL),(70,38,'PBN00057',0,0,'L','Đỏ','Vải','',100000.00,0.00,0.00,'Đang hoạt động','Có thể bán','https://firebasestorage.googleapis.com/v0/b/mockproject-8a6f6.appspot.com/o/images%2Fchristmas_avatar.jpg?alt=media&token=ae793a9a-3196-4ccf-914d-f94ccb4b347c'),(71,38,'PBN00058',0,0,'XL','Đỏ','Vải','',100000.00,0.00,0.00,'Đang hoạt động','Có thể bán',NULL),(72,38,'PBN00059',0,0,'L','Nâu','Vải','',100000.00,0.00,0.00,'Đang hoạt động','Có thể bán',NULL),(73,38,'PBN00060',0,0,'XL','Nâu','Vải','',100000.00,0.00,0.00,'Đang hoạt động','Có thể bán',NULL),(74,39,'PBN00061',0,0,'L','Đỏ','Vải','',50000.00,50000.00,50000.00,'Đang hoạt động','Có thể bán',NULL),(75,39,'PBN00062',0,0,'XL','Đỏ','Vải','',100000.00,100000.00,100000.00,'Đang hoạt động','Có thể bán',NULL),(76,39,'PBN00063',0,0,'L','Xanh','Vải','',100000.00,100000.00,100000.00,'Đang hoạt động','Có thể bán',NULL),(77,39,'PBN00064',0,0,'XL','Xanh','Vải','',100000.00,100000.00,100000.00,'Đang hoạt động','Có thể bán',NULL),(78,40,'PBN00065',50,50,'L','Đỏ','Vải','',50000.00,50000.00,50000.00,'Đang hoạt động','Có thể bán','https://firebasestorage.googleapis.com/v0/b/mockproject-8a6f6.appspot.com/o/images%2Fchristmas_avatar.jpg?alt=media&token=b08d3378-1929-4f92-9fde-1e3471ac8a7e'),(79,40,'PBN00066',100,99,'XL','Đỏ','Vải','',100000.00,100000.00,100000.00,'Đang hoạt động','Có thể bán','https://firebasestorage.googleapis.com/v0/b/mockproject-8a6f6.appspot.com/o/images%2Fdownload.jpeg?alt=media&token=505bf729-f949-4ebc-bf77-435aa27c6c85'),(80,40,'PBN00067',100,99,'L','Xanh','Vải','',100000.00,100000.00,100000.00,'Đang hoạt động','Có thể bán',NULL),(81,40,'PBN00068',100,99,'XL','Xanh','Vải','',100000.00,100000.00,100000.00,'Đang hoạt động','Có thể bán',NULL),(82,41,'PBN00069',100,100,'XL','Trắng','Vải','',150000.00,150000.00,150000.00,'Đang hoạt động','Có thể bán','https://firebasestorage.googleapis.com/v0/b/mockproject-8a6f6.appspot.com/o/images%2F0fcc608c3a4df713ae5c.jpg?alt=media&token=3c77f893-92d1-42a7-a0c9-73ad44a904f7'),(83,41,'PBN00070',0,0,'XXL','Trắng','Vải','',100000.00,100000.00,100000.00,'Đang hoạt động','Có thể bán',NULL),(84,41,'PBN00071',0,0,'XL','Nâu','Vải','',100000.00,100000.00,100000.00,'Đang hoạt động','Có thể bán',NULL),(85,41,'PBN00072',0,0,'XXL','Nâu','Vải','',100000.00,100000.00,100000.00,'Đang hoạt động','Có thể bán',NULL);
/*!40000 ALTER TABLE `variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variants_check_sheets`
--

DROP TABLE IF EXISTS `variants_check_sheets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `variants_check_sheets` (
  `variant_id` bigint(20) unsigned NOT NULL,
  `checksheet_id` bigint(20) unsigned NOT NULL,
  `inventory_quantity` bigint(20) NOT NULL,
  `real_quantity` bigint(20) NOT NULL,
  `note` varchar(255) DEFAULT '',
  PRIMARY KEY (`variant_id`,`checksheet_id`),
  KEY `checksheet_id` (`checksheet_id`),
  CONSTRAINT `variants_check_sheets_ibfk_1` FOREIGN KEY (`checksheet_id`) REFERENCES `check_sheets` (`id`),
  CONSTRAINT `variants_check_sheets_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variants_check_sheets`
--

LOCK TABLES `variants_check_sheets` WRITE;
/*!40000 ALTER TABLE `variants_check_sheets` DISABLE KEYS */;
/*!40000 ALTER TABLE `variants_check_sheets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variants_import_receipts`
--

DROP TABLE IF EXISTS `variants_import_receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `variants_import_receipts` (
  `variant_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `import_receipt_id` bigint(20) unsigned NOT NULL,
  `quantity` bigint(20) NOT NULL CHECK (`quantity` >= 0),
  PRIMARY KEY (`variant_id`,`import_receipt_id`),
  KEY `fk_import_receipts` (`import_receipt_id`),
  CONSTRAINT `fk_import_receipts` FOREIGN KEY (`import_receipt_id`) REFERENCES `import_receipts` (`id`),
  CONSTRAINT `fk_variants` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variants_import_receipts`
--

LOCK TABLES `variants_import_receipts` WRITE;
/*!40000 ALTER TABLE `variants_import_receipts` DISABLE KEYS */;
INSERT INTO `variants_import_receipts` VALUES (1,12,50),(1,16,50),(1,17,50),(1,27,10),(1,28,1),(2,12,100),(3,4,100),(3,5,200),(4,27,10),(49,18,50),(49,19,50),(49,20,50),(49,21,10),(52,22,10),(52,24,0),(53,22,50),(53,24,50),(57,25,50),(57,26,50),(82,29,5),(82,30,5);
/*!40000 ALTER TABLE `variants_import_receipts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variants_orders`
--

DROP TABLE IF EXISTS `variants_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `variants_orders` (
  `order_id` bigint(20) unsigned NOT NULL,
  `variant_id` bigint(20) unsigned NOT NULL,
  `supplied_quantity` bigint(20) NOT NULL,
  `price` decimal(12,2) DEFAULT 0.00,
  PRIMARY KEY (`order_id`,`variant_id`),
  KEY `variant_id` (`variant_id`),
  CONSTRAINT `variants_orders_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `variants_orders_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variants_orders`
--

LOCK TABLES `variants_orders` WRITE;
/*!40000 ALTER TABLE `variants_orders` DISABLE KEYS */;
INSERT INTO `variants_orders` VALUES (3,1,100,0.00),(3,2,200,0.00),(15,1,100,10000.00),(15,2,100,50000.00),(17,1,100,10000.00),(17,2,100,50000.00),(19,1,100,10000.00),(19,2,100,50000.00),(21,1,100,10000.00),(21,2,100,50000.00),(23,1,100,10000.00),(23,2,100,50000.00),(24,1,50,100000.00),(24,2,1,100000.00),(25,1,1,100000.00),(25,2,50,100000.00),(26,1,100,10000.00),(26,2,100,50000.00),(27,1,1001,100000.00),(28,1,100,100000.00),(28,8,5,150000.00),(30,1,100,10000.00),(30,2,100,50000.00),(31,1,100,10000.00),(31,2,100,50000.00),(33,1,100,10000.00),(33,2,100,50000.00),(34,45,150000,100.00),(34,49,100000,100.00),(35,1,100,10000.00),(35,2,100,50000.00),(36,49,100,150000.00),(37,49,50,20000.00),(38,49,100,10000.00),(39,49,10,100000.00),(40,52,10,100000.00),(40,53,100,10000.00),(41,57,100,100000.00),(42,1,10,100000.00),(42,4,10,100000.00),(43,1,100,10000.00),(43,2,100,50000.00),(44,73,10,100000.00),(45,1,1,100000.00),(46,1,10,100000.00),(47,82,10,150000.00);
/*!40000 ALTER TABLE `variants_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variants_return_receipts`
--

DROP TABLE IF EXISTS `variants_return_receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `variants_return_receipts` (
  `variant_id` bigint(20) unsigned NOT NULL,
  `return_receipt_id` int(10) unsigned NOT NULL,
  `quantity` bigint(20) DEFAULT 0,
  `amount_each` decimal(12,2) DEFAULT 0.00,
  PRIMARY KEY (`variant_id`,`return_receipt_id`),
  KEY `fk_variants_return_receipts_2_idx` (`return_receipt_id`),
  CONSTRAINT `fk_variants_return_receipts_1` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_variants_return_receipts_2` FOREIGN KEY (`return_receipt_id`) REFERENCES `return_receipts` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variants_return_receipts`
--

LOCK TABLES `variants_return_receipts` WRITE;
/*!40000 ALTER TABLE `variants_return_receipts` DISABLE KEYS */;
INSERT INTO `variants_return_receipts` VALUES (1,8,1,NULL),(57,7,100,NULL),(82,9,5,NULL),(82,10,5,NULL);
/*!40000 ALTER TABLE `variants_return_receipts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sapo_mock'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-18 13:14:57
