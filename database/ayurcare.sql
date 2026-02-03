CREATE DATABASE  IF NOT EXISTS `ayurcare` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `ayurcare`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: ayurcare
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `billing`
--

DROP TABLE IF EXISTS `billing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `package_days` int(11) DEFAULT NULL,
  `payment_mode` varchar(20) DEFAULT NULL,
  `payment_status` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `doctor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `billing_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `billing_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing`
--

LOCK TABLES `billing` WRITE;
/*!40000 ALTER TABLE `billing` DISABLE KEYS */;
INSERT INTO `billing` VALUES (1,1,5600.00,14,'UPI','Paid','2026-02-02 11:58:34',NULL),(2,1,0.00,0,'','Paid','2026-02-03 04:15:49',1);
/*!40000 ALTER TABLE `billing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultations`
--

DROP TABLE IF EXISTS `consultations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `diagnosis` text DEFAULT NULL,
  `dosha` text DEFAULT NULL,
  `treatment_plan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `consultations_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultations`
--

LOCK TABLES `consultations` WRITE;
/*!40000 ALTER TABLE `consultations` DISABLE KEYS */;
INSERT INTO `consultations` VALUES (1,1,'jgerg','ergrth','erg5rthb','2026-02-02 04:33:40'),(2,2,'cough','pitta','meds','2026-02-02 07:26:08');
/*!40000 ALTER TABLE `consultations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `specialization` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,6,'Dr. Aditya Singh','Panchkarma');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `prakriti` varchar(50) DEFAULT NULL,
  `vikriti` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'Vedika Singh',21,'Female','91676798','gfbf','fdbgf','2026-02-01 19:14:45'),(2,'Amay Naik',22,'Male','9867347854','Pitta','Pitta','2026-02-02 07:23:49'),(3,'Vedant Singh',17,'Male','7698235678','Vata-Pitta','Vata Imbalance','2026-02-03 04:44:31');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `therapies`
--

DROP TABLE IF EXISTS `therapies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `therapies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `therapies`
--

LOCK TABLES `therapies` WRITE;
/*!40000 ALTER TABLE `therapies` DISABLE KEYS */;
INSERT INTO `therapies` VALUES (1,'Vaman',60),(2,'Virechan',45),(3,'Basti',30),(4,'Nasya',20),(5,'Raktamokshan',40);
/*!40000 ALTER TABLE `therapies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `therapy_schedule`
--

DROP TABLE IF EXISTS `therapy_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `therapy_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) DEFAULT NULL,
  `therapy_id` int(11) DEFAULT NULL,
  `therapist_name` varchar(50) DEFAULT NULL,
  `therapy_date` date DEFAULT NULL,
  `therapy_time` time DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Scheduled',
  `notes` text DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `therapy_id` (`therapy_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `therapy_schedule_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `therapy_schedule_ibfk_2` FOREIGN KEY (`therapy_id`) REFERENCES `therapies` (`id`),
  CONSTRAINT `therapy_schedule_ibfk_3` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `therapy_schedule`
--

LOCK TABLES `therapy_schedule` WRITE;
/*!40000 ALTER TABLE `therapy_schedule` DISABLE KEYS */;
INSERT INTO `therapy_schedule` VALUES (1,1,4,'Aditya Singh','2026-02-10','15:20:00','Completed','the patient is recovering well.',NULL),(2,2,3,'Aditya Singh','2026-02-12','17:00:00','Scheduled',NULL,NULL);
/*!40000 ALTER TABLE `therapy_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','doctor','therapist','receptionist') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2b$10$g/Tu7QXcwhEUU/YfhLsNwejjDMwNK2WYlzOrP0akok.2Z.IN2oJ1e','admin'),(2,'doctor','$2b$10$g/Tu7QXcwhEUU/YfhLsNwejjDMwNK2WYlzOrP0akok.2Z.IN2oJ1e','doctor'),(3,'therapist','$2b$10$g/Tu7QXcwhEUU/YfhLsNwejjDMwNK2WYlzOrP0akok.2Z.IN2oJ1e','therapist'),(4,'reception','$2b$10$Rc80lCiAEEdbuCs6Henw2.GFjSZs0xpYz2hUwg1hSs2BPPtKtJbf2','receptionist'),(6,'doctor1','$2b$10$7gYeJcIceyV8cHpprHT3P.Ee9Y/apgsiaA8ER2heAksKl2pDAvn4a','doctor');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-03 12:52:25
