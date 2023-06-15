CREATE DATABASE  IF NOT EXISTS `final` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `final`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: final
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `Order_id` varchar(100) NOT NULL,
  `Customer` varchar(100) NOT NULL,
  `Total_price` int DEFAULT NULL,
  PRIMARY KEY (`Order_id`),
  KEY `Customer` (`Customer`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`Customer`) REFERENCES `customer` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
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
  PRIMARY KEY (`Order_id`,`Item`),
  CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`Order_id`) REFERENCES `order` (`Order_id`)
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
INSERT INTO `product` VALUES (1,'涼感抗UV連帽外套-女',5,690,'A001.jpeg,A002.jpeg,A003.jpeg','WOMEN'),(2,'抗UV羅紋連帽外套-童',7,350,'A004.jpeg,A005.jpeg,A006.jpeg','KIDS'),(3,'輕薄牛仔短袖襯衫-女',6,590,'A007.jpeg,A008.jpeg','WOMEN'),(4,'純棉網眼條紋領polo衫-男',7,350,'A009.jpeg,A010.jpeg,A011.jpeg','MEN'),(5,'涼感抗UV連帽外套-男',10,690,'A012.jpeg,A013.jpeg,A014.jpeg','MEN'),(6,'柔棉長袖襯衫-女',7,399,'A015.jpeg,A016.jpeg,A017.jpeg','WOMEN'),(7,'鯊魚印花T恤-01-童',6,220,'A018.jpeg','KIDS'),(8,'粗紡寬版印花T恤-01-男',9,350,'A019.jpeg,A020.jpeg','MEN'),(9,'莫代爾V領文字上衣-02-女',4,299,'A021.jpeg,A022.jpeg','WOMEN'),(10,'彈力圓領T恤-男',5,196,'A023.jpeg,A024.jpeg,A025.jpeg','MEN');
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

-- Dump completed on 2023-05-15 12:53:43