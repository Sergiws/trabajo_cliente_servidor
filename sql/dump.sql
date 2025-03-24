-- CREATE DATABASE  IF NOT EXISTS `trabajo_servidor` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trabajoservidor`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: trabajoservidor
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (3,'sergiws967@gmail.com','123456'),(4,'auto','123456');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aula`
--

DROP TABLE IF EXISTS `aula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aula` (
  `id_aula` int NOT NULL AUTO_INCREMENT,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`id_aula`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aula`
--

LOCK TABLES `aula` WRITE;
/*!40000 ALTER TABLE `aula` DISABLE KEYS */;
INSERT INTO `aula` VALUES (1,'Esta es el aula 1'),(2,'Esta es el aula 2'),(3,'Esta es el aula 3'),(4,'Esta es el aula 4'),(5,'Esta es el aula 5'),(6,'Esta es el aula 6');
/*!40000 ALTER TABLE `aula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clase`
--

DROP TABLE IF EXISTS `clase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clase` (
  `id_clase` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `hora_inicio` varchar(5) NOT NULL,
  `hora_fin` varchar(5) NOT NULL,
  `aula` int NOT NULL,
  `descripcion` text,
  `dia_semana` int NOT NULL,
  PRIMARY KEY (`id_clase`),
  KEY `aula` (`aula`),
  CONSTRAINT `clase_ibfk_1` FOREIGN KEY (`aula`) REFERENCES `aula` (`id_aula`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clase`
--

LOCK TABLES `clase` WRITE;
/*!40000 ALTER TABLE `clase` DISABLE KEYS */;
INSERT INTO `clase` VALUES (1,'Canto','16:00','17:00',1,NULL,3),(2,'Guitarra','16:00','17:00',2,NULL,3),(3,'Lenguaje Musical','17:00','18:00',3,NULL,3),(4,'Guitarra','17:00','18:00',2,NULL,3),(5,'Piano','17:00','18:00',4,NULL,3),(6,'Piano','18:00','19:00',4,NULL,3),(7,'Violín','19:00','20:00',2,NULL,3),(8,'Lenguaje Musical','20:30','21:30',3,NULL,3),(9,'Danza Oriental','18:15','19:15',5,NULL,3),(10,'Danza Oriental','19:15','20:45',5,NULL,3),(11,'Iniciación Muscial','18:00','19:00',6,NULL,3),(12,'Bachata Inicio','20:30','21:30',6,NULL,3),(13,'Bachata Avanzado','21:30','22:30',6,NULL,3),(14,'Lenguaje Musical','16:00','17:00',1,NULL,1),(15,'Lenguaje Musical','18:00','19:00',1,NULL,1),(16,'Lenguaje Musical','17:00','18:00',3,NULL,1),(17,'Lenguaje Musical','18:00','19:00',3,NULL,1),(18,'Piano','17:00','18:00',4,NULL,1),(19,'Piano','19:00','20:00',4,NULL,1),(20,'Pre-danza','16:30','17:30',5,NULL,1),(21,'Danza Infantil','17:30','18:30',5,NULL,1),(22,'Danza clásica','18:30','19:30',5,NULL,1),(23,'Danza clásica','19:30','21:00',5,NULL,1),(24,'Danza contemporánea','21:00','22:30',5,NULL,1),(25,'Salsa y Bachata','20:30','22:00',6,NULL,1),(26,'Guitarra','17:00','18:00',1,NULL,2),(27,'Canto','18:00','19:00',1,NULL,2),(28,'Saxofón','16:00','16:50',2,NULL,2),(29,'Saxofón','16:50','17:40',2,NULL,2),(30,'Saxofón','17:40','18:30',2,NULL,2),(31,'Saxofón','18:30','19:20',2,NULL,2),(32,'Saxofón','19:20','20:10',2,NULL,2),(33,'Saxofón','20:10','21:00',2,NULL,2),(34,'Saxofón','16:50','17:40',2,NULL,2),(35,'Lenguaje Musical','16:00','17:00',3,NULL,2),(36,'Lenguaje Musical','17:00','18:00',3,NULL,2),(37,'Baile','17:00','18:00',5,NULL,2),(38,'Salsa y Bachata','20:00','21:30',5,NULL,2),(39,'Música bebes','18:00','19:00',6,NULL,2),(40,'Lenguaje Musical','16:30','17:30',3,NULL,4),(41,'Lenguaje Musical','17:30','18:00',3,NULL,4),(42,'Violín','18:00','18:30',3,NULL,4),(43,'Piano','16:00','17:00',4,NULL,4),(44,'Piano','17:00','18:00',4,NULL,4),(45,'Piano','18:00','19:00',4,NULL,4),(46,'Lady Style','19:30','20:30',5,NULL,4),(47,'Canto','16:00','17:00',1,NULL,5),(48,'Guitarra','17:00','18:00',2,NULL,5),(49,'Guitarra','18:00','19:00',2,NULL,5),(50,'Violín','16:30','17:00',3,NULL,5),(51,'Lenguaje Musical','17:00','18:00',3,NULL,5),(52,'Piano','17:00','18:00',4,NULL,5);
/*!40000 ALTER TABLE `clase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gestion_peticion`
--

DROP TABLE IF EXISTS `gestion_peticion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gestion_peticion` (
  `id_peticion` int NOT NULL,
  `id_admin` int DEFAULT NULL,
  `estado` enum('ACEPTADA','RECHAZADA') DEFAULT NULL,
  PRIMARY KEY (`id_peticion`),
  KEY `ID_ADMIN` (`id_admin`),
  CONSTRAINT `gestion_peticion_ibfk_1` FOREIGN KEY (`id_peticion`) REFERENCES `peticion` (`id_peticion`),
  CONSTRAINT `gestion_peticion_ibfk_2` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gestion_peticion`
--

LOCK TABLES `gestion_peticion` WRITE;
/*!40000 ALTER TABLE `gestion_peticion` DISABLE KEYS */;
INSERT INTO `gestion_peticion` VALUES (7,3,'ACEPTADA');
/*!40000 ALTER TABLE `gestion_peticion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peticion`
--

DROP TABLE IF EXISTS `peticion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peticion` (
  `id_peticion` int NOT NULL AUTO_INCREMENT,
  `contacto` varchar(255) NOT NULL,
  `id_aula` int NOT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` varchar(5) DEFAULT NULL,
  `hora_fin` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id_peticion`),
  KEY `ID_AULA` (`id_aula`),
  CONSTRAINT `peticion_ibfk_1` FOREIGN KEY (`id_aula`) REFERENCES `aula` (`id_aula`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peticion`
--

LOCK TABLES `peticion` WRITE;
/*!40000 ALTER TABLE `peticion` DISABLE KEYS */;
INSERT INTO `peticion` VALUES (7,'sergiws967@gmail.com',4,'2025-03-26','16:00','17:00'),(8,'sergiws967@gmail.com',4,'2025-03-24','16:00','17:00'),(9,'sergiws967@gmail.com',4,'2025-03-24','16:00','17:00'),(10,'sergiws967@gmail.com',2,'2025-03-24','18:00','19:00'),(11,'sergiws967@gmail.com',4,'2025-03-24','18:00','19:00'),(12,'sergiws967@gmail.com',2,'2025-03-26','16:00','17:00'),(13,'sergiws967@gmail.com',6,'2025-03-26','16:00','17:00'),(14,'sergiws967@gmail.com',2,'2025-03-24','16:00','17:00'),(15,'sergiws967@gmail.com',6,'2025-03-24','16:00','17:00'),(16,'sergiws967@gmail.com',6,'2025-03-24','19:00','20:00'),(17,'sergiws967@gmail.com',4,'2025-03-24','20:00','21:00'),(18,'sergiws967@gmail.com',2,'2025-03-24','22:00','23:00');
/*!40000 ALTER TABLE `peticion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-24 14:46:51
