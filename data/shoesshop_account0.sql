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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone` varchar(20) NOT NULL,
  `gender` enum('MALE','FEMALE','UNKNOWN') DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `role` enum('ADMIN','EMPLOYEE','CUSTOMER') NOT NULL,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'admin','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Admin','User','admin@example.com','123 Main St','0365774121','UNKNOWN','1990-01-01','ADMIN','2024-01-01 00:00:00'),(2,'employee1','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Nguyễn Thanh','Trúc','thanhtruc@gmail.com','Khóm 4,Phường 5, Thành phố Trà Vinh, tỉnh Trà Vinh','0365774122','FEMALE','2002-05-15','EMPLOYEE','2024-01-01 00:00:00'),(3,'employee2','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Nguyễn Thị Mỹ','Yến','myyen@gmail.com','Khóm 1,Phường 5, Thành phố Trà Vinh, tỉnh Trà Vinh','0365774123','FEMALE','2002-05-29','EMPLOYEE','2024-01-01 00:00:00'),(4,'yenphuong','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Nguyễn Yến ','Phượng','yenphuong@gmail.com','Khóm 3,Phường 5, Thành phố Trà Vinh, tỉnh Trà Vinh','0365973224','FEMALE','2002-10-20','CUSTOMER','2024-01-03 00:00:00'),(5,'huyentran','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Nguyễn Thị','Huyền Trân','huyentran@gmail.com','Long Hưng 2, xã Hòa Minh, huyện Châu Thành, tỉnh Trà Vinh','0365786224','FEMALE','2002-09-29','CUSTOMER','2024-01-04 00:00:00'),(6,'phamdinh','$2a$10$qV/kQ6f4E7fQPEX/BXjsh.LMpq.yRYk/tG6jdXp5xcj.z5aafTrla','Phạm Quyển','Đình','pdinh0823@gmail.com','Khóm 1,Phường 2, Thành phố Trà Vinh, tỉnh Trà Vinh','0354174124','FEMALE','2002-02-09','CUSTOMER','2024-01-05 00:00:00'),(7,'khanguyen','$2a$10$KLZ6r/ojCT/534BdOAtvR.pJJ3Rb9hYNPXS.Y5qT9zVj3x8cfqA0S','Nguyễn Hoàng','Kha','hoangkha@gmail.com','Khóm 1,Phường 4, Thành phố Trà Vinh, tỉnh Trà Vinh','0384214810','FEMALE','2002-02-09','CUSTOMER','2024-01-06 00:00:00'),(8,'NgocKhanh','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Phạm Ngọc ','Khánh','ngockhanh@gmail.com',' 135, Phường 7, Thành phố Bến Tre, Tỉnh Bến Tre','0376577490','MALE','2002-08-11','CUSTOMER','2024-01-07 00:00:00'),(9,'ChauThanh','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Châu Văn ','Thanh','chauvanthanh@gmail.com',' 59, Xã Hòa Chính, Huyện Chương Mỹ, Thành phố Hà Nội','0365707070','MALE','1998-02-02','CUSTOMER','2024-01-11 00:00:00'),(10,'TrinhAn','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Trịnh Thùy Bảo ','An','trinhthuybaoan@gmail.com',' 23, Phường Mường Thanh, Thành phố Điện Biên Phủ, Tỉnh Điện Biên','0361588070','FEMALE','1998-02-05','CUSTOMER','2024-01-12 00:00:00'),(11,'PhamOanh','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Phạm Ngọc ','Oanh','phamngocoanh@gmail.com',' 23A5, Phường Phú Đức, Thị xã Bình Long, Tỉnh Bình Phước','0236565070','FEMALE','2003-09-08','CUSTOMER','2024-01-19 00:00:00'),(12,'NguyenAnh','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Nguyễn Nguyệt ','Ánh','nguyetanh@gmail.com',' 75, Phường Gia Đông, Thị xã Thuận Thành, Tỉnh Bắc Ninh','0364568970','FEMALE','1990-01-08','CUSTOMER','2024-01-19 00:00:00'),(13,'TranTran','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Trần Ngọc ','Trân','ngoctran@gmail.com',' 87, Xã Long Tân, Huyện Dầu Tiếng, Tỉnh Bình Dương','0364588070','FEMALE','1995-11-24','CUSTOMER','2024-01-22 00:00:00'),(14,'minhtrong2108','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Trần Minh ','Trọng','tranminhtrong@gmail.com',' 75, Xã Cát Lâm, Huyện Phù Cát, Tỉnh Bình Định','0365650709','MALE','1999-12-08','CUSTOMER','2024-01-25 00:00:00'),(15,'Lamquoc1905','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Lâm Khắc ','Quốc','lamkquoc@gmail.com',' 123, Xã Hàm Mỹ, Huyện Hàm Thuận Nam, Tỉnh Bình Thuận','0388769870','MALE','1985-09-05','CUSTOMER','2024-02-02 00:00:00'),(16,'dangkhoa0108','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Châu Đăng ','Khoa','nguyetanh@gmail.com',' 153, Xã Tam Giang, Huyện Năm Căn, Tỉnh Cà Mau ','0346565070','FEMALE','1990-01-08','CUSTOMER','2024-02-02 00:00:00'),(17,'ThuyAn1002','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Tôn Thị Thúy','An','thuyan123@gmail.com',' 235, Phường An Nghiệp, Quận Ninh Kiều, Thành phố Cần Thơ ','0365650796','FEMALE','1997-10-02','CUSTOMER','2024-02-02 00:00:00'),(18,'hoangkhiem','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Nguyễn Hoàng','Khiêm','hoangkhiemtvh@gmail.com',' 175, Xã Nhơn Ái, Huyện Phong Điền, Thành phố Cần Thơ','0365050701','MALE','2004-01-12','CUSTOMER','2024-02-16 00:00:00'),(19,'hoangkhoi55','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Nguyễn Hoàng ','Khôi','khoitvu@gmail.com',' 245, Phường Hợp Giang, Thành phố Cao Bằng, Tỉnh Cao Bằng ','0382065070','MALE','2005-12-08','CUSTOMER','2024-02-18 00:00:00'),(20,'trucmai890','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Phạm Thị Trúc','Mai','vantu@gmail.com',' 246, Phường Hòa Cường Bắc, Quận Hải Châu, Thành phố Đà Nẵng ','0364568090','FEMALE','1980-02-07','CUSTOMER','2024-02-26 00:00:00'),(21,'ngochoane','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Nguyễn Ngọc ','Hoa','thanhthanhhoa@gmail.com',' 136, Xã Hòa Thuận, Thành phố Buôn Ma Thuột, Tỉnh Đắk Lắk','0369865070','FEMALE','1990-01-08','CUSTOMER','2024-02-26 00:00:00'),(22,'chankhang564','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Lâm Chấn ','Khang','chankhang@gmail.com',' 275, Xã Đông Hòa, Huyện Châu Thành, Tỉnh Tiền Giang','0346587540','MALE','1980-12-10','CUSTOMER','2024-02-27 00:00:00'),(23,'huetran','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Trần Nguyệt ','Huế','nguyethue@gmail.com',' 164, Xã Đại Đồng, Huyện Vĩnh Tường, Tỉnh Vĩnh Phúc','0360987096','FEMALE','1990-03-08','CUSTOMER','2024-03-01 00:00:00'),(24,'Yenchi76','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Lam Yên','Chi','yenci890@gmail.com',' 75, Xã Sinh Long, Huyện Na Hang, Tỉnh Tuyên Quang','0365650740','FEMALE','1996-10-03','CUSTOMER','2024-03-05 00:00:00'),(25,'ynhi876','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Huỳnh Trần Ý','Nhi','ynhisenvang87@gmail.com',' 146, Xã Đồng Khê, Huyện Văn Chấn, Tỉnh Yên Bái','0365980701','FEMALE','1997-01-01','CUSTOMER','2024-03-10 00:00:00'),(26,'vannguyen','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Võ Văn','Nguyên','nguyenvo086@gmail.com',' 125, Phường Hương Vân, Thị xã Hương Trà, Tỉnh Thừa Thiên Huế','0364537289','MALE','1999-09-02','CUSTOMER','2024-03-18 00:00:00'),(27,'thanhdat863','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Nguyễn Thành','Đạt','thanhdat7653@gmail.com',' 125, Xã Hòa Tịnh, Huyện Chợ Gạo, Tỉnh Tiền Giang','0365608654','MALE','1997-02-02','CUSTOMER','2024-03-19 00:00:00'),(28,'chidien762','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Lữ Chí','Diện','ludien8963@gmail.com',' 45, Xã Hưng Mỹ, Huyện Châu Thành, Tỉnh Trà Vinh','0387507091','MALE','2000-09-09','CUSTOMER','2024-03-20 00:00:00'),(29,'duongvu986','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Dương Phan Hoàng','Vũ','hoangvu09@gmail.com',' 21, Xã Long Phú, Huyện Tam Bình, Tỉnh Vĩnh Long','0367654270','MALE','2000-04-11','CUSTOMER','2024-03-21 00:00:00'),(30,'hoangphu1256','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Dương Hoàng','Phú','hoangphu897@gmail.com',' 154, Thị trấn Tam Đảo, Huyện Tam Đảo, Tỉnh Vĩnh Phúc','0365609865','MALE','1990-01-11','CUSTOMER','2024-03-21 00:00:00'),(31,'hangthanh09','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Dương Thái','Hằng','hangthai87@gmail.com',' 54, Xã Đồng Thịnh, Huyện Sông Lô, Tỉnh Vĩnh Phúc','0365765470','FEMALE','1993-12-08','CUSTOMER','2024-03-28 00:00:00'),(32,'hangchaua9','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Dương Châu','Hằng','hangchau89@gmail.com',' 54, Phường 05, Quận 3, Thành phố Hồ Chí Minh','0365985470','FEMALE','1989-04-08','CUSTOMER','2024-04-01 00:00:00'),(33,'truongmy199','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Trương Thị Diễm','My','truongmy87@gmail.com',' 176, Phường Tân Hưng Thuận, Quận 12, Thành phố Hồ Chí Minh','0367655470','FEMALE','1995-12-09','CUSTOMER','2024-04-02 00:00:00'),(34,'tobbang','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Tôn','Bằng','tonbang562@gmail.com',' 265, Xã Phạm Văn Cội, Huyện Củ Chi, Thành phố Hồ Chí Minh','0365798770','MALE','1993-04-03','CUSTOMER','2024-06-19 00:00:00'),(35,'chaunganbang09','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Châu Ngạn','Bang','nganbang3535@gmail.com',' 235, Phường 08, Quận Phú Nhuận, Thành phố Hồ Chí Minh','0308635470','MALE','1998-10-01','CUSTOMER','2024-04-19 00:00:00'),(36,'maianhhuyen','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Mai Thị Ánh','Huyền','anhhuyen012@gmail.com',' 174, Phường 06, Quận Tân Bình, Thành phố Hồ Chí Minh','0363465470','FEMALE','1999-02-11','CUSTOMER','2024-04-20 00:00:00'),(37,'kienduong0123','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Kiên','Dương','duongkien@gmail.com',' 432, Phường 04, Quận Gò Vấp, Tỉnh Kon Tum','0365765470','FEMALE','1993-08-28','CUSTOMER','2024-04-21 00:00:00'),(38,'thanhtrang123','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Thanh Trang','Nguyễn','thanhtrang@gmail.com',' 98, Xã Hiệp Hưng, Huyện Phụng Hiệp, Tỉnh Hậu Giang','0365765471','FEMALE','1990-05-15','CUSTOMER','2024-04-23 00:00:00'),(39,'minhanh456','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Trần Minh ','Anh','minhanh@gmail.com',' 98, Phường Ngọc Xuyên, Quận Đồ Sơn, Thành phố Hải Phòng','0365765472','FEMALE','1995-02-20','CUSTOMER','2024-04-25 00:00:00'),(40,'thanhlong789','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Lê Thanh ','Long ','thanhlong@gmail.com',' 78, Xã Đức Phổ, Huyện Cát Tiên, Tỉnh Lâm Đồng','0365765473','MALE','1988-09-10','CUSTOMER','2024-05-11 00:00:00'),(41,'phuonghao234','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Hoàng Phương','Hao ','phuonghao@gmail.com',' 25, Phường 3, Thành phố Đà Lạt, Tỉnh Lâm Đồng','0365765474','MALE','1992-12-05','CUSTOMER','2024-05-13 00:00:00'),(42,'thilananh567','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Phạm Thị Lan','Anh','thilananh@gmail.com',' 68, Xã Đại Lào, Thành phố Bảo Lộc, Tỉnh Lâm Đồng','0365765475','FEMALE','1994-07-25','CUSTOMER','2024-05-13 00:00:00'),(43,'dinhquan890','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Vũ Đình','Quân','dinhquan@gmail.com',' 57, Xã Dương Xuân Hội, Huyện Châu Thành, Tỉnh Long An','0365765476','MALE','1991-04-30','CUSTOMER','2024-05-15 00:00:00'),(44,'thuthao1234','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Ngô Thu','Thảo','thuthao@gmail.com',' 71, Xã Nam Anh, Huyện Nam Đàn, Tỉnh Nghệ An','0365765477','FEMALE','1996-11-12','CUSTOMER','2024-05-19 00:00:00'),(45,'hoanglong5678','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Hoàng Long','Hoàng','hoanglong@gmail.com',' 83, Xã Quỳnh Lộc, Thị xã Hoàng Mai, Tỉnh Nghệ An','0365765478','MALE','1989-06-03','CUSTOMER','2024-05-20 00:00:00'),(46,'thikimchi7890','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Nguyễn Thi Kim','Chi','thikimchi@gmail.com',' 85, Phường Điện Minh, Thị xã Điện Bàn, Tỉnh Quảng Nam','0365765479','FEMALE','1997-03-08','CUSTOMER','2024-05-23 00:00:00'),(47,'thuytien123','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Lê Thúy','Tiên ','thuytien@gmail.com',' 92, Xã Đức Minh, Huyện Mộ Đức, Tỉnh Quảng Ngãi','0365765480','FEMALE','1998-10-05','CUSTOMER','2024-05-24 00:00:00'),(48,'minhduc456','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Nguyễn Minh','Đức','minhduc@gmail.com',' 84, Thị trấn Long Phú, Huyện Long Phú, Tỉnh Sóc Trăng','0365765481','MALE','1993-12-15','CUSTOMER','2024-05-29 00:00:00'),(49,'lananh789','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Trần Lan','Anh ','lananh@gmail.com',' 75, Phường Hoàng Quế, Thị xã Đông Triều, Tỉnh Quảng Ninh','0365765482','FEMALE','1997-08-20','CUSTOMER','2024-05-29 00:00:00'),(50,'tuananh234','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Phạm Tuấn ','Anh','tuananh@gmail.com',' 100, Xã Phước Đông, Huyện Gò Dầu, Tỉnh Tây Ninh','0365765483','MALE','1995-05-25','CUSTOMER','2024-05-29 00:00:00'),(51,'thikhanh567','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Hoàng Thị ','Khanh ','thikhanh@gmail.com',' 87, Xã Lộc An, Huyện Phú Lộc, Tỉnh Thừa Thiên Huế','0365765484','FEMALE','1996-04-10','CUSTOMER','2024-05-29 00:00:00'),(52,'quanghuy890','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Vũ Quang ','Huy ','quanghuy@gmail.com',' 84, Thị trấn Long Thành, Huyện Duyên Hải, Tỉnh Trà Vinh','0365765485','MALE','1992-02-18','CUSTOMER','2024-06-05 00:00:00'),(53,'thuthao12345','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Nguyễn Thu ','Thảo ','thuthao2@gmail.com',' 84, Xã Hòa Thạnh, Huyện Tam Bình, Tỉnh Vĩnh Long','0365765486','FEMALE','1999-11-28','CUSTOMER','2024-06-06 00:00:00'),(54,'trongkhai67890','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Hoàng Trọng ','Khải','trongkhai@gmail.com',' 85, Phường Tân Hòa, Thành phố Vĩnh Long, Tỉnh Vĩnh Long','0365765487','MALE','1987-07-08','CUSTOMER','2024-06-06 00:00:00'),(55,'thikimngan2345','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Nguyễn Thị Kim ','Ngân ','thikimngan@gmail.com',' 54, Xã Chiềng Lao, Huyện Mường La, Tỉnh Sơn La','0365765488','FEMALE','1994-03-03','CUSTOMER','2024-06-07 00:00:00'),(56,'hoanglong67890','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Phạm Hoàng ','Long','hoanglong2@gmail.com',' 187, Phường Hoà Nghĩa, Quận Dương Kinh, Thành phố Hải Phòng','0365765489','MALE','1991-01-12','CUSTOMER','2024-06-19 00:00:00'),(57,'phuongmai123','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Trần Phương ','Mai ','phuongmai@gmail.com',' 189, Phường Bến Tắm, Thành phố Chí Linh, Tỉnh Hải Dương','0365765490','FEMALE','1996-08-15','CUSTOMER','2024-06-27 00:00:00'),(58,'minhquan456','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Lê Minh ','Quân ','minhquan@gmail.com',' 180, Xã Mường Cang, Huyện Than Uyên, Tỉnh Lai Châu','0365765491','MALE','1994-10-20','CUSTOMER','2024-06-27 00:00:00'),(59,'thithu789','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Nguyễn Thị ','Thu ','thithu@gmail.com',' 297, Xã Cam Đường, Thành phố Lào Cai, Tỉnh Lào Cai','0365765492','FEMALE','1999-02-25','CUSTOMER','2024-06-28 00:00:00'),(60,'quocanh234','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Phan Quốc ','Anh ','quocanh@gmail.com',' 432, Xã Đại Sơn, Huyện Đô Lương, Tỉnh Nghệ An','0365765493','MALE','1993-04-30','CUSTOMER','2024-06-28 00:00:00'),(61,'thikimchi567','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Hoàng Thị','Kim Chi','thikimchi@gmail.com',' 243, Xã Mỹ Hương, Huyện Mỹ Tú, Tỉnh Sóc Trăng','0365765494','FEMALE','1997-02-10','CUSTOMER','2024-06-29 00:00:00'),(62,'anhquan890','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Đặng Anh ','Quân','anhquan@gmail.com',' 243, Phường 04, Quận 4, Thành phố Hồ Chí Minh','0365765495','MALE','1995-06-05','CUSTOMER','2024-06-29 00:00:00'),(63,'thuylinh12345','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Nguyễn Thúy','Linh','thuylinh@gmail.com',' 249, Phường 06, Quận 10, Thành phố Hồ Chí Minh','0365765496','FEMALE','1998-09-12','CUSTOMER','2024-06-30 00:00:00'),(64,'thanhphong67890','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Võ Thanh','Phong','thanhphong@gmail.com',' 249, Phường Phú Trung, Quận Tân Phú, Thành phố Hồ Chí Minh','0365765497','MALE','1992-07-18','CUSTOMER','2024-06-30 00:00:00'),(65,'hongnga2345','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',' Trương Hồng ','Nga','hongnga@gmail.com',' 240, Phường Hiệp Tân, Quận Tân Phú, Thành phố Hồ Chí Minh','0365765498','FEMALE','1991-03-22','CUSTOMER','2024-07-01 00:00:00'),(66,'thanhdat67890','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi','Nguyễn Thành','Đạt','thanhdat@gmail.com',' 240, Xã Nhơn Đức, Huyện Nhà Bè, Thành phố Hồ Chí Minh','0365765499','MALE','1989-01-08','CUSTOMER','2024-07-02 00:00:00');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-02 17:58:14
