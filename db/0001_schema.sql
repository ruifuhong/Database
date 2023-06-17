CREATE DATABASE  IF NOT EXISTS `final` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `final`;
-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: final
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `Category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`Category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('KIDS'),('MEN'),('WOMEN');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `Username` varchar(100) NOT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `First_name` varchar(100) DEFAULT NULL,
  `Last_name` varchar(100) DEFAULT NULL,
  `Joined_since` date DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('1','$2b$10$7Boar0S8oL9pIIW7vq2FoOZccoqWUJbNV2m.pnoS3P5xjqJVnhCCW','1','1','2023-06-16','1'),('222','$2b$10$JA/jYvwCLvy6UyRY.CHb3.9k002k.XK4XE1Wco1ZqGVOVKB8Z8hKi','222','222','2023-06-16','222');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `on_sale_product`
--

DROP TABLE IF EXISTS `on_sale_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `on_sale_product` (
  `Product_id` int NOT NULL,
  `Promotion_price` int DEFAULT NULL,
  `Promotion_end_date` date DEFAULT NULL,
  PRIMARY KEY (`Product_id`),
  CONSTRAINT `on_sale_product_ibfk_1` FOREIGN KEY (`Product_id`) REFERENCES `product` (`Product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `on_sale_product`
--

LOCK TABLES `on_sale_product` WRITE;
/*!40000 ALTER TABLE `on_sale_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `on_sale_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `Order_id` varchar(100) NOT NULL,
  `Item` varchar(100) NOT NULL,
  `Product_id` int DEFAULT NULL,
  `Color` varchar(100) DEFAULT NULL,
  `Size` varchar(100) DEFAULT NULL,
  `Category` varchar(100) DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Price` int DEFAULT NULL,
  PRIMARY KEY (`Order_id`,`Item`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderlist`
--

DROP TABLE IF EXISTS `orderlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderlist` (
  `Order_id` varchar(100) NOT NULL,
  `Customer` varchar(100) NOT NULL,
  `Total_price` int DEFAULT NULL,
  KEY `Customer` (`Customer`),
  KEY `orderlisit_ibfk_2_idx` (`Order_id`),
  CONSTRAINT `orderlist_ibfk_1` FOREIGN KEY (`Customer`) REFERENCES `customer` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderlist`
--

LOCK TABLES `orderlist` WRITE;
/*!40000 ALTER TABLE `orderlist` DISABLE KEYS */;
INSERT INTO `orderlist` VALUES ('ENOIpt9RuQW0UgX','222',490);
/*!40000 ALTER TABLE `orderlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `Product_id` int NOT NULL,
  `Product_name` varchar(100) DEFAULT NULL,
  `Storage_quantity` int DEFAULT NULL,
  `Price` int DEFAULT NULL,
  `Image` varchar(500) DEFAULT NULL,
  `Category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Product_id`),
  KEY `Category` (`Category`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`Category`) REFERENCES `category` (`Category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'印花短袖T恤-01-女',5,300,'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80','WOMEN'),(2,'牛仔外套-童',7,450,'https://images.unsplash.com/photo-1606841466616-795c2c8dec72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80','KIDS'),(3,'休閒襯衫-女',6,490,'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80','WOMEN'),(4,'印花短袖T恤-01-男',7,300,'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80','MEN'),(5,'牛仔外套-男',10,690,'https://images.unsplash.com/photo-1591213954196-2d0ccb3f8d4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80','MEN'),(6,'圓領印花短袖T恤-女',7,350,'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80','WOMEN'),(7,'格紋短袖襯衫-童',6,390,'https://images.unsplash.com/photo-1592424388874-04d8b432a25e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80','KIDS'),(8,'休閒襯衫-男',9,490,'https://images.unsplash.com/photo-1505233040952-e43a3a015bc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=704&q=80','MEN'),(9,'印花短袖T恤-02-女',4,350,'https://images.unsplash.com/photo-1519568470290-c0c1fbfff16f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1208&q=80','WOMEN'),(10,'印花短袖T恤-02-男',5,350,'https://images.unsplash.com/photo-1519568470290-c0c1fbfff16f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1208&q=80','MEN');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_color`
--

DROP TABLE IF EXISTS `product_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_color` (
  `Product_id` int NOT NULL,
  `Color` varchar(100) NOT NULL,
  PRIMARY KEY (`Product_id`,`Color`),
  CONSTRAINT `product_color_ibfk_1` FOREIGN KEY (`Product_id`) REFERENCES `product` (`Product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_color`
--

LOCK TABLES `product_color` WRITE;
/*!40000 ALTER TABLE `product_color` DISABLE KEYS */;
INSERT INTO `product_color` VALUES (1,'淺粉'),(1,'淺藍'),(1,'白色'),(2,'淺灰'),(2,'淺藍'),(3,'淺藍'),(3,'藍色'),(4,'淺藍'),(4,'白色'),(4,'黑色'),(5,'藍色'),(5,'黑色'),(6,'淺粉'),(6,'白色'),(6,'藍色'),(7,'淺藍'),(8,'淺灰'),(8,'藍色'),(9,'淺灰'),(9,'米白'),(10,'淺灰'),(10,'白色'),(10,'黑色');
/*!40000 ALTER TABLE `product_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_purchased`
--

DROP TABLE IF EXISTS `product_purchased`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_purchased` (
  `Customer` varchar(100) NOT NULL,
  `Product_id` int NOT NULL,
  `Color` varchar(100) DEFAULT NULL,
  `Size` varchar(100) DEFAULT NULL,
  `Purchase_date` date DEFAULT NULL,
  `Category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Customer`,`Product_id`),
  KEY `Product_id` (`Product_id`),
  KEY `Category` (`Category`),
  CONSTRAINT `product_purchased_ibfk_1` FOREIGN KEY (`Customer`) REFERENCES `customer` (`Username`),
  CONSTRAINT `product_purchased_ibfk_2` FOREIGN KEY (`Product_id`) REFERENCES `product` (`Product_id`),
  CONSTRAINT `product_purchased_ibfk_3` FOREIGN KEY (`Category`) REFERENCES `category` (`Category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_purchased`
--

LOCK TABLES `product_purchased` WRITE;
/*!40000 ALTER TABLE `product_purchased` DISABLE KEYS */;
INSERT INTO `product_purchased` VALUES ('1',4,'red','small','2023-06-16','MEN');
/*!40000 ALTER TABLE `product_purchased` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_size`
--

DROP TABLE IF EXISTS `product_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_size` (
  `Product_id` int NOT NULL,
  `Size` varchar(100) NOT NULL,
  PRIMARY KEY (`Product_id`,`Size`),
  CONSTRAINT `product_size_ibfk_1` FOREIGN KEY (`Product_id`) REFERENCES `product` (`Product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_size`
--

LOCK TABLES `product_size` WRITE;
/*!40000 ALTER TABLE `product_size` DISABLE KEYS */;
INSERT INTO `product_size` VALUES (1,'L'),(1,'M'),(1,'S'),(2,'L'),(2,'M'),(2,'S'),(3,'L'),(3,'M'),(3,'S'),(4,'L'),(4,'M'),(4,'S'),(5,'L'),(5,'M'),(5,'S'),(6,'L'),(6,'M'),(6,'S'),(7,'L'),(7,'M'),(7,'S'),(8,'L'),(8,'M'),(8,'S'),(9,'L'),(9,'M'),(9,'S'),(10,'L'),(10,'M'),(10,'S');
/*!40000 ALTER TABLE `product_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wish_product`
--

DROP TABLE IF EXISTS `wish_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wish_product` (
  `Customer` varchar(100) NOT NULL,
  `Product_id` int NOT NULL,
  `Color` varchar(100) DEFAULT NULL,
  `Size` varchar(100) DEFAULT NULL,
  `Category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Customer`,`Product_id`),
  KEY `Product_id` (`Product_id`),
  KEY `Category` (`Category`),
  CONSTRAINT `wish_product_ibfk_1` FOREIGN KEY (`Customer`) REFERENCES `customer` (`Username`),
  CONSTRAINT `wish_product_ibfk_2` FOREIGN KEY (`Product_id`) REFERENCES `product` (`Product_id`),
  CONSTRAINT `wish_product_ibfk_3` FOREIGN KEY (`Category`) REFERENCES `category` (`Category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wish_product`
--

LOCK TABLES `wish_product` WRITE;
/*!40000 ALTER TABLE `wish_product` DISABLE KEYS */;
INSERT INTO `wish_product` VALUES ('1',4,NULL,NULL,'MEN');
/*!40000 ALTER TABLE `wish_product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-16 22:09:44
