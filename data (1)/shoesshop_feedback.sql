-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: shoesshop
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedbackID` int unsigned NOT NULL AUTO_INCREMENT,
  `customerId` int unsigned DEFAULT NULL,
  `productId` int unsigned DEFAULT NULL,
  `rating` enum('VERY_BAD','BAD','AVERAGE','GOOD','EXCELLENT') NOT NULL,
  `comment` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `feedbackDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedbackID`),
  KEY `customerId` (`customerId`),
  KEY `productId` (`productId`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `account` (`id`),
  CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,4,1,'EXCELLENT','hàng đúng mẫu','2024-01-10 00:00:00'),(2,5,17,'EXCELLENT','hàng đẹp','2024-01-11 00:00:00'),(3,5,18,'EXCELLENT','hàng chất lượng, đúng mẫu','2024-01-11 00:00:00'),(4,5,9,'EXCELLENT','hàng chất lượng, đúng mẫu','2024-01-11 00:00:00'),(5,6,4,'EXCELLENT','hàng đẹp','2024-01-12 00:00:00'),(6,6,7,'EXCELLENT','đóng gói cẩn thận, chất lượng','2024-01-12 00:00:00'),(7,7,2,'EXCELLENT','đóng gói cẩn thận, chất lượng','2024-01-15 00:00:00'),(8,8,3,'EXCELLENT','hàng đẹp','2024-01-10 00:00:00'),(9,6,1,'GOOD','hàng chất lượng, đúng mẫu','2024-01-12 00:00:00'),(10,8,2,'GOOD','chất lượng ngoài mong đợi','2024-01-14 00:00:00'),(11,5,6,'GOOD','hàng tốt','2024-01-07 00:00:00'),(12,10,18,'GOOD','hàng đúng mẫu','2024-01-15 00:00:00'),(13,9,12,'GOOD','hàng tốt','2024-01-20 00:00:00'),(14,9,16,'GOOD','sản phẩm chất lượng','2024-01-20 00:00:00'),(15,9,14,'GOOD','sản phẩm chất lượng','2024-01-15 00:00:00'),(16,10,11,'EXCELLENT','sản phẩm tốt','2024-01-15 00:00:00'),(17,11,12,'EXCELLENT','sản phẩm đúng mẫu','2024-01-25 00:00:00'),(18,12,6,'EXCELLENT','sản phẩm đẹp lắm','2024-01-25 00:00:00'),(19,13,4,'EXCELLENT','sản phầm tốt','2024-01-27 00:00:00'),(20,13,7,'EXCELLENT','sản phầm tốt','2024-01-28 00:00:00'),(21,5,2,'EXCELLENT','hàng đúng mẫu','2024-01-15 00:00:00'),(22,10,3,'EXCELLENT','hàng đẹp','2024-01-20 00:00:00'),(23,5,4,'EXCELLENT','hàng chất lượng, đúng mẫu','2024-01-21 00:00:00'),(24,6,5,'EXCELLENT','hàng chất lượng, đúng mẫu','2024-01-10 00:00:00'),(25,6,6,'EXCELLENT','hàng đẹp','2024-01-11 00:00:00'),(26,6,7,'EXCELLENT','đóng gói cẩn thận, chất lượng','2024-01-12 00:00:00'),(27,7,1,'EXCELLENT','đóng gói cẩn thận, chất lượng','2024-01-10 00:00:00'),(28,6,1,'EXCELLENT','hàng đẹp','2024-01-15 00:00:00'),(29,14,6,'EXCELLENT','hàng chất lượng, đúng mẫu','2024-01-28 00:00:00'),(30,11,2,'EXCELLENT','chất lượng ngoài mong đợi','2024-01-25 00:00:00'),(31,15,2,'EXCELLENT','hàng tốt','2024-02-08 00:00:00'),(32,13,2,'EXCELLENT','hàng đúng mẫu','2024-02-09 00:00:00'),(33,14,2,'EXCELLENT','hàng tốt','2024-02-01 00:00:00'),(34,10,4,'EXCELLENT','sản phẩm chất lượng','2024-01-20 00:00:00'),(35,10,6,'EXCELLENT','sản phẩm chất lượng','2024-01-21 00:00:00'),(36,11,7,'EXCELLENT','sản phẩm tốt','2024-01-22 00:00:00'),(37,12,6,'EXCELLENT','sản phẩm đúng mẫu','2024-01-23 00:00:00'),(38,5,1,'EXCELLENT','sản phẩm đẹp lắm','2024-01-15 00:00:00'),(39,10,8,'EXCELLENT','sản phầm tốt','2024-01-20 00:00:00'),(40,9,14,'EXCELLENT','sản phầm tốt','2024-01-15 00:00:00'),(41,7,12,'EXCELLENT','hàng đúng mẫu','2024-02-15 00:00:00'),(42,4,18,'EXCELLENT','hàng đẹp','2024-02-16 00:00:00'),(43,13,15,'EXCELLENT','hàng chất lượng, đúng mẫu','2024-01-25 00:00:00'),(44,13,10,'EXCELLENT','hàng chất lượng, đúng mẫu','2024-01-27 00:00:00'),(45,17,10,'EXCELLENT','hàng đẹp','2024-02-18 00:00:00'),(46,10,10,'EXCELLENT','đóng gói cẩn thận, chất lượng','2024-02-17 00:00:00'),(47,14,10,'EXCELLENT','đóng gói cẩn thận, chất lượng','2024-02-19 00:00:00'),(48,6,9,'EXCELLENT','hàng đẹp','2024-02-20 00:00:00'),(49,6,10,'EXCELLENT','hàng chất lượng, đúng mẫu','2024-02-21 00:00:00'),(50,18,8,'EXCELLENT','chất lượng ngoài mong đợi','2024-02-20 00:00:00'),(51,19,7,'EXCELLENT','hàng tốt','2024-02-21 00:00:00'),(52,20,7,'EXCELLENT','hàng đúng mẫu','2024-03-01 00:00:00'),(53,21,14,'EXCELLENT','hàng tốt','2024-03-02 00:00:00'),(54,22,5,'EXCELLENT','sản phẩm chất lượng','2024-03-03 00:00:00'),(56,18,1,'EXCELLENT','sản phẩm tốt','2024-03-09 00:00:00'),(57,15,3,'EXCELLENT','sản phẩm đúng mẫu','2024-03-10 00:00:00'),(58,24,3,'EXCELLENT','sản phẩm đẹp lắm','2024-03-11 00:00:00'),(59,18,2,'EXCELLENT','sản phầm tốt','2024-02-20 00:00:00'),(60,19,4,'EXCELLENT','sản phầm tốt','2024-02-21 00:00:00'),(61,20,1,'EXCELLENT','hàng đúng mẫu','2024-03-01 00:00:00'),(62,23,5,'EXCELLENT','hàng đẹp','2024-03-07 00:00:00'),(63,23,6,'EXCELLENT','hàng chất lượng, đúng mẫu','2024-03-08 00:00:00'),(64,18,2,'EXCELLENT','hàng chất lượng, đúng mẫu','2024-03-09 00:00:00'),(65,18,16,'EXCELLENT','hàng đẹp','2024-02-20 00:00:00'),(66,19,9,'EXCELLENT','đóng gói cẩn thận, chất lượng','2024-02-21 00:00:00');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-02 18:10:43
