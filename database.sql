-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: rab1board
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (5,'color.red','#cd1313','2023-08-22 13:47:49','2023-08-22 13:47:49'),(6,'color.green','#106710','2023-08-22 13:47:49','2023-08-22 13:47:49'),(7,'color.orange','#D64D00','2023-08-22 13:48:40','2023-08-22 13:48:40'),(8,'color.blue','#5050ff','2023-08-22 13:48:40','2023-08-22 13:48:40');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `columns`
--

DROP TABLE IF EXISTS `columns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `columns` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order` int DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dashboard_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `columns_dashboard_id_foreign` (`dashboard_id`),
  CONSTRAINT `columns_dashboard_id_foreign` FOREIGN KEY (`dashboard_id`) REFERENCES `dashboards` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `columns`
--

LOCK TABLES `columns` WRITE;
/*!40000 ALTER TABLE `columns` DISABLE KEYS */;
INSERT INTO `columns` VALUES (26,0,'Taskss',16,'2023-08-09 03:54:23','2023-08-11 06:06:27'),(42,0,'Process',16,'2023-08-09 05:33:48','2023-08-11 06:20:33'),(43,0,'Ready',16,'2023-08-09 05:38:07','2023-08-11 06:20:31'),(98,NULL,'55569954',29,'2023-11-30 08:50:21','2023-12-01 07:07:52'),(102,NULL,'gfdg54gg5',29,'2023-12-01 06:56:27','2023-12-01 07:08:31'),(103,NULL,'fdgfdg543',29,'2023-12-01 07:08:24','2023-12-01 07:08:27'),(104,NULL,'22211',42,'2023-12-04 00:45:22','2023-12-04 00:45:27'),(105,NULL,'33322255',42,'2023-12-04 00:45:24','2023-12-04 06:33:13'),(106,NULL,'44',42,'2023-12-04 07:03:10','2023-12-04 07:03:10');
/*!40000 ALTER TABLE `columns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `count_likes` int NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `desk_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_user_id_foreign` (`user_id`),
  KEY `comments_desk_id_foreign` (`desk_id`),
  CONSTRAINT `comments_desk_id_foreign` FOREIGN KEY (`desk_id`) REFERENCES `desks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dashboards`
--

DROP TABLE IF EXISTS `dashboards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dashboards` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `desk_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dashboards_user_id_foreign` (`user_id`),
  KEY `dashboards_desk_id_foreign` (`desk_id`),
  CONSTRAINT `dashboards_desk_id_foreign` FOREIGN KEY (`desk_id`) REFERENCES `desks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `dashboards_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dashboards`
--

LOCK TABLES `dashboards` WRITE;
/*!40000 ALTER TABLE `dashboards` DISABLE KEYS */;
INSERT INTO `dashboards` VALUES (16,'Pingvi',1,NULL,'2023-08-09 03:30:49','2023-08-11 08:07:42'),(17,'test7',1,NULL,'2023-08-29 03:16:04','2023-11-30 06:58:36'),(28,'6661114',1,NULL,'2023-11-24 08:57:48','2023-11-28 00:51:55'),(29,'3243',1,NULL,'2023-11-24 08:58:28','2023-11-30 07:00:13'),(30,'666',1,NULL,'2023-11-24 08:58:35','2023-11-24 08:58:35'),(31,'555',1,NULL,'2023-11-24 08:59:15','2023-11-24 08:59:15'),(32,'777',1,NULL,'2023-11-24 08:59:21','2023-11-24 08:59:21'),(33,'111',1,NULL,'2023-11-24 09:20:24','2023-11-24 09:20:24'),(41,'111',1,NULL,'2023-12-01 09:22:47','2023-12-01 09:22:47'),(42,'222',1,NULL,'2023-12-04 00:45:13','2023-12-04 00:45:13'),(43,'44',1,NULL,'2023-12-04 06:33:00','2023-12-04 06:33:00'),(44,'55',1,NULL,'2023-12-04 06:39:41','2023-12-04 06:39:41');
/*!40000 ALTER TABLE `dashboards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desk_files`
--

DROP TABLE IF EXISTS `desk_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `desk_files` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `desk_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `desk_files_desk_id_foreign` (`desk_id`),
  CONSTRAINT `desk_files_desk_id_foreign` FOREIGN KEY (`desk_id`) REFERENCES `desks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desk_files`
--

LOCK TABLES `desk_files` WRITE;
/*!40000 ALTER TABLE `desk_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `desk_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desk_images`
--

DROP TABLE IF EXISTS `desk_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `desk_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `desk_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `desk_images_desk_id_foreign` (`desk_id`),
  CONSTRAINT `desk_images_desk_id_foreign` FOREIGN KEY (`desk_id`) REFERENCES `desks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desk_images`
--

LOCK TABLES `desk_images` WRITE;
/*!40000 ALTER TABLE `desk_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `desk_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desks`
--

DROP TABLE IF EXISTS `desks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `desks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order` int DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `data_start` datetime DEFAULT NULL,
  `data_end` datetime DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `dashboard_id` bigint unsigned NOT NULL,
  `column_id` bigint unsigned NOT NULL,
  `color_id` bigint unsigned DEFAULT NULL,
  `comment_id` bigint unsigned DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `desks_dashboard_id_foreign` (`dashboard_id`),
  KEY `desks_column_id_foreign` (`column_id`),
  KEY `color_id` (`color_id`),
  KEY `desks_comment_id_foreign` (`comment_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `desks_column_id_foreign` FOREIGN KEY (`column_id`) REFERENCES `columns` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `desks_comment_id_foreign` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `desks_dashboard_id_foreign` FOREIGN KEY (`dashboard_id`) REFERENCES `dashboards` (`id`),
  CONSTRAINT `desks_ibfk_1` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `desks_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desks`
--

LOCK TABLES `desks` WRITE;
/*!40000 ALTER TABLE `desks` DISABLE KEYS */;
/*!40000 ALTER TABLE `desks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `langs`
--

DROP TABLE IF EXISTS `langs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `langs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ru` varchar(999) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `en` varchar(999) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `langs`
--

LOCK TABLES `langs` WRITE;
/*!40000 ALTER TABLE `langs` DISABLE KEYS */;
INSERT INTO `langs` VALUES (1,'mk.asdasd','выаываы','adad','2023-08-02 06:27:42','2023-08-02 06:27:42');
/*!40000 ALTER TABLE `langs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_tasks`
--

DROP TABLE IF EXISTS `list_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_tasks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dashboard_id` bigint unsigned NOT NULL,
  `desk_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `list_tasks_dashboard_id_foreign` (`dashboard_id`),
  KEY `list_tasks_desk_id_foreign` (`desk_id`),
  CONSTRAINT `list_tasks_dashboard_id_foreign` FOREIGN KEY (`dashboard_id`) REFERENCES `dashboards` (`id`) ON DELETE CASCADE,
  CONSTRAINT `list_tasks_desk_id_foreign` FOREIGN KEY (`desk_id`) REFERENCES `desks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_tasks`
--

LOCK TABLES `list_tasks` WRITE;
/*!40000 ALTER TABLE `list_tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `list_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2014_10_12_100000_create_password_resets_table',1),(4,'2019_08_19_000000_create_failed_jobs_table',1),(5,'2019_12_14_000001_create_personal_access_tokens_table',1),(6,'2023_07_25_091108_create_langs_table',1),(7,'2023_08_01_044819_create_roles_table',1),(8,'2023_08_01_113500_create_dashboards_table',1),(9,'2023_08_01_114245_create_desks_table',1),(10,'2023_08_01_044610_add_column_role_id_table',2),(11,'2023_08_01_120034_create_tasks_table',3),(12,'2023_08_02_035853_add_task_id_to_desks_table',4),(13,'2023_08_02_040740_add_desk_id_to_tasks_table',5),(14,'2023_08_02_041845_create_columns_table',6),(15,'2023_08_02_044435_create_comments_table',7),(16,'2023_08_02_045350_create_user_desks_table',8),(17,'2023_08_02_045904_create_color_desks_table',9),(18,'2023_08_02_055033_drop_foreign_key_desk_id_in_color_desks_table',10),(19,'2023_08_02_055416_rename_color_desks_table',11),(20,'2023_08_02_055538_create_color_desks_table',12),(21,'2023_08_03_113609_add_defautl_image_to_desks_table',13),(23,'2023_08_04_085251_add_foreig_id_to_dashboards_table',14),(24,'2023_08_04_085745_add_column_title_to_dashboards_table',15),(25,'2023_08_07_054048_add_column_image_to_users_table',16),(26,'2023_08_07_095555_add_column_premium_to_users_table',17),(27,'2023_08_08_092711_add_column_dashboard_id_to_columns_table',18),(29,'2023_08_08_121604_create_column_desks_table',19),(30,'2023_08_08_121152_add_columns_to_desks_table',20),(31,'2023_08_10_055018_drop_foreign_key_desk_id_to_columns_table',21),(32,'2023_08_15_054543_add_foreign_key_dashboard_id_to_tasks_table',22),(33,'2023_08_15_063134_add_column_done_to_tasks_table',23),(34,'2023_08_15_065043_drop_columns_to_tasks_table',24),(35,'2023_08_15_065301_create_list_tasks_table',25),(36,'2023_08_15_065911_add_column_Listtaskid_to_tasks_table',26),(37,'2023_08_22_113444_drop_foreign_key_to_color_desks_table',27),(38,'2023_08_22_114611_add_foreign_key_to_desks_table',28),(39,'2023_08_25_100502_add_column_files_to_desks_table',29),(40,'2023_08_28_095855_create_desk_images_table',30),(41,'2023_08_28_105150_create_desk_files_table',31),(42,'2023_08_28_115730_add_column_confirmed_to_user_desks_table',32),(43,'2023_08_29_045322_create_user_dashboards_table',33),(44,'2023_08_29_063854_add_column_invited_to_user_dashboards_table',34),(45,'2023_08_29_072511_drop_columns_to_user_desks_table',35),(46,'2023_08_29_073710_add_user_id_to_tasks_table',36),(47,'2023_08_29_084140_create_user_tasks_table',37),(48,'2023_08_29_084505_add_foreign_task_id_to_user_tasks_table',38),(49,'2023_08_29_093908_add_foreign_desk_id_to_comments_table',39),(50,'2023_09_05_040608_add_column_confirmed_to_user_dashboards_table',40),(51,'2023_09_06_094600_create_notifications_table',41),(52,'2023_09_06_102231_create_notification_types_table',42),(53,'2023_09_06_103025_create_notifications_table',43),(54,'2023_09_07_102658_add_column_read_to_notifications_table',44),(55,'2023_09_07_102914_add_column_read_to_notifications_table',45),(56,'2023_09_08_120032_add_column_user_id_to_desk_table',46),(57,'2023_09_11_092226_add_order_to_desks_table',46),(58,'2023_09_13_050927_add_order_to_columns_table',47);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_types`
--

DROP TABLE IF EXISTS `notification_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_types`
--

LOCK TABLES `notification_types` WRITE;
/*!40000 ALTER TABLE `notification_types` DISABLE KEYS */;
INSERT INTO `notification_types` VALUES (1,'invite_dashboard',NULL,NULL),(2,'add_desk',NULL,NULL),(3,'add_you_desk',NULL,NULL),(4,'deadline',NULL,NULL),(5,'comment',NULL,NULL),(6,'chat',NULL,NULL),(7,'join_to_dashboard',NULL,NULL);
/*!40000 ALTER TABLE `notification_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `type_id` bigint unsigned NOT NULL,
  `message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_user_id_foreign` (`user_id`),
  KEY `notifications_type_id_foreign` (`type_id`),
  CONSTRAINT `notifications_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `notification_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (80,6,5,'Это тестовое сообщение для проверки',1,NULL,'2023-12-05 03:39:50');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'token','ebd11ad31cf3a448b4e3cd7350fe621e41cdadb477237d8ce4c6191276845179','[\"*\"]',NULL,NULL,'2023-08-25 08:40:10','2023-08-25 08:40:10'),(2,'App\\Models\\User',1,'token','5ec4fa3df7a320909d31b34b9c6cdf00aa9c734c48a78774ea4962694639e036','[\"*\"]',NULL,NULL,'2023-08-25 08:40:21','2023-08-25 08:40:21'),(3,'App\\Models\\User',3,'token','6a5a341a875954c2783d39832286ec0dd8d9b000db092b876de8c15b08e56c5a','[\"*\"]',NULL,NULL,'2023-08-25 08:56:40','2023-08-25 08:56:40'),(4,'App\\Models\\User',3,'token','c33a74c52d783535fa29e0ec1a5a6bd488ae2070a7bb6dcd009ded437996fd88','[\"*\"]',NULL,NULL,'2023-08-25 09:10:02','2023-08-25 09:10:02'),(5,'App\\Models\\User',1,'token','5976470b459a4b99e24a6c2469f940df55d95f540ad84eb6e1b081448c2cedb1','[\"*\"]',NULL,NULL,'2023-08-28 00:52:06','2023-08-28 00:52:06'),(6,'App\\Models\\User',1,'token','a54965dd0cfa41301a66503342662892f4665cd4688f5957c365787024fc8816','[\"*\"]',NULL,NULL,'2023-08-28 01:22:55','2023-08-28 01:22:55'),(7,'App\\Models\\User',1,'token','bfe3f9968129b0e0358c796535b529f1627c435d31b2fb336b495297087cdba7','[\"*\"]',NULL,NULL,'2023-08-28 01:25:31','2023-08-28 01:25:31'),(8,'App\\Models\\User',1,'token','4c2ad147ad1998e34f38ff2fe23ec2a5698b30d7911e7fccc5a9c7f953924627','[\"*\"]',NULL,NULL,'2023-08-28 01:26:27','2023-08-28 01:26:27'),(9,'App\\Models\\User',1,'token','c6b661e92c5c781b1cda6ef41fb6c5daf1cdc45dbdc7b34c67b56c93e590f845','[\"*\"]',NULL,NULL,'2023-08-28 01:26:53','2023-08-28 01:26:53'),(10,'App\\Models\\User',1,'token','0c2da8d2cc563f4011119e0da4d8a2fc0f28291caa000bf274cd68be65bf85e2','[\"*\"]',NULL,NULL,'2023-08-28 01:32:36','2023-08-28 01:32:36'),(11,'App\\Models\\User',4,'token','94f1b86d2911daa286600e1b52e505ba4c1b23525bacf4a3d55d28f3700b0191','[\"*\"]',NULL,NULL,'2023-08-28 01:39:17','2023-08-28 01:39:17'),(12,'App\\Models\\User',1,'token','c28deb28d8b6d74314436f8a96a5d5ecbc51d6275a711cc1ba71d6fdd0511cbd','[\"*\"]',NULL,NULL,'2023-08-29 07:13:48','2023-08-29 07:13:48'),(13,'App\\Models\\User',1,'API Access Token','24534e5068d37d310df4cc612f858c1a80437385ab05df672d82ff79b8612549','[\"*\"]',NULL,NULL,'2023-11-22 09:24:22','2023-11-22 09:24:22'),(14,'App\\Models\\User',1,'GFNHSshfI6IeqFxq9QfJugPzH5cl4c35xj8HLpyIO2qPGrFWM0','286a3af694423384c20b61953c8f0c1b0af230c79b506de5b5d8643c36647a8e','[\"*\"]',NULL,NULL,'2023-11-22 09:26:21','2023-11-22 09:26:21'),(15,'App\\Models\\User',1,'mggM60cjll5OrPmFAGHf4nZArQyTAmcyQLLmHrUFpTIzfrtfYT0pxgZ3gEIFRilync81MXBJY77GVkDtwQWglaKdAXtQi3P80E91','442f6462fb57fcbdd2779e6f9c9a4013c823ac435f71906c4a48bc02aaa8d02c','[\"*\"]',NULL,NULL,'2023-11-22 09:26:31','2023-11-22 09:26:31'),(16,'App\\Models\\User',1,'token','9a7065fac8663d8ef5fd22b134cc8aa95ae743dd7bea7a78b91e5bf8ffbb026d','[\"*\"]',NULL,NULL,'2023-11-22 09:29:11','2023-11-22 09:29:11'),(17,'App\\Models\\User',1,'token','9c89eee2e5618da7c2ed4974682c56bda2bc111be44fa45824f058dca33d4161','[\"*\"]',NULL,NULL,'2023-11-22 09:29:21','2023-11-22 09:29:21'),(18,'App\\Models\\User',1,'token','f0d521a9f10d3ee0ecc13f5ac4a52890b3885fc64f98405b6d609dddb480d534','[\"*\"]',NULL,NULL,'2023-11-23 01:54:14','2023-11-23 01:54:14'),(19,'App\\Models\\User',1,'token','7a032add4380f7e01982f75322f770728e8bcd061f8a6584c3621c5050e4ab89','[\"*\"]',NULL,NULL,'2023-11-23 01:54:52','2023-11-23 01:54:52'),(20,'App\\Models\\User',1,'token','a27ac02a435e493ffc91735f0784ccb0c53bdf9c828f3ed84887385ff66e5d6d','[\"*\"]',NULL,NULL,'2023-11-23 01:55:36','2023-11-23 01:55:36'),(21,'App\\Models\\User',1,'token','95f5de2347d077a649a42b2da99f1ca8cc129b0fd7d226071824c95b88ecc679','[\"*\"]',NULL,NULL,'2023-11-23 01:55:55','2023-11-23 01:55:55'),(22,'App\\Models\\User',1,'token','a02e81b62d9b83e0d8ce0ed5f83ecf053529aa17a3f6d52379cd17fe6b06f938','[\"*\"]',NULL,NULL,'2023-11-23 03:37:46','2023-11-23 03:37:46'),(23,'App\\Models\\User',1,'token','cb113e97049b75520c1a993284444af6ecddf4d6561d593fd8731512b78f2f61','[\"*\"]',NULL,NULL,'2023-11-23 06:05:58','2023-11-23 06:05:58'),(24,'App\\Models\\User',1,'token','fefbaa32012b9c63123aaa28370f0e325e0dd90683fb4d4ac7783abf38fc9b1a','[\"*\"]',NULL,NULL,'2023-11-23 06:12:08','2023-11-23 06:12:08'),(25,'App\\Models\\User',1,'token','f63912caf540015315fb43366ac50d99b698a906224a6172e9d38bd3005f3f54','[\"*\"]',NULL,NULL,'2023-11-23 06:12:32','2023-11-23 06:12:32'),(26,'App\\Models\\User',1,'token','6f13de7ea220de4a0457fb88ab93f352403aeaf70262e81c4c6a902c065fb144','[\"*\"]',NULL,NULL,'2023-11-23 06:13:53','2023-11-23 06:13:53'),(27,'App\\Models\\User',1,'token','053ff16fcc835375a40ce113b6b1865141c253f8b877470afe41828e75be402b','[\"*\"]',NULL,NULL,'2023-11-23 06:51:15','2023-11-23 06:51:15'),(28,'App\\Models\\User',1,'token','1df098fa5694f241e3085ce8afe75266d3632506aa914c94bf7610e8a9cac244','[\"*\"]',NULL,NULL,'2023-11-23 06:52:14','2023-11-23 06:52:14'),(29,'App\\Models\\User',1,'token','f8a0605658047015247d6ae10b043b3801f54dd91586f83c3e563729cb12b420','[\"*\"]',NULL,NULL,'2023-11-23 06:53:04','2023-11-23 06:53:04'),(30,'App\\Models\\User',1,'token','9197dec9d80a5dcefb4bf94ad8679b75939faebb2c0617bcf4d92536b0c8e784','[\"*\"]',NULL,NULL,'2023-11-23 07:02:12','2023-11-23 07:02:12'),(31,'App\\Models\\User',1,'token','1859bfc089e0f1091069750ef86d89a8aadf26cfaa506967a8fe57930bb5ff73','[\"*\"]',NULL,NULL,'2023-11-23 07:03:17','2023-11-23 07:03:17'),(32,'App\\Models\\User',1,'token','342d4a4be0e9d458ed824143c4d907c3447303539e977614d2875ab75eb4ea55','[\"*\"]',NULL,NULL,'2023-11-23 07:07:04','2023-11-23 07:07:04'),(33,'App\\Models\\User',1,'token','9862959ee2066ea6e7b08d512cb36871e761ab80c654e2934e92c0fcf1c01a8e','[\"*\"]',NULL,NULL,'2023-11-23 07:07:15','2023-11-23 07:07:15'),(34,'App\\Models\\User',1,'token','82f50da88745b683ad9cbb0b2d329ceb1846f17352b2ff11a368514b353b8bd9','[\"*\"]',NULL,NULL,'2023-11-23 07:07:25','2023-11-23 07:07:25'),(35,'App\\Models\\User',1,'token','f384650d4e13b39ae02c179de720f26ed501bd33b3f9069aa60715c7183af2e3','[\"*\"]',NULL,NULL,'2023-11-23 07:19:01','2023-11-23 07:19:01'),(36,'App\\Models\\User',1,'token','e222b83260e5bf88aed5f82dec60fab4d8fa7f6d6fe6718bb498f8f8d1feb4ad','[\"*\"]',NULL,NULL,'2023-11-23 07:21:29','2023-11-23 07:21:29'),(37,'App\\Models\\User',1,'token','9727b21b59ad2d8773cf51a106a840cc751537bd33e5828d8e01ee6371db13da','[\"*\"]',NULL,NULL,'2023-11-23 07:28:04','2023-11-23 07:28:04'),(38,'App\\Models\\User',1,'token','6717d6e7bdc62cff09f08c9bb53e77a5d57feff2c76ab1642b6707ee1251f21c','[\"*\"]',NULL,NULL,'2023-11-23 07:28:55','2023-11-23 07:28:55'),(39,'App\\Models\\User',1,'token','ff1df5e28a90204332ef59f21fe56b640668c4a49824496e290435cf332af3cc','[\"*\"]',NULL,NULL,'2023-11-23 07:35:24','2023-11-23 07:35:24'),(40,'App\\Models\\User',10,'token','b68a6ed3406cdd8ebe5ebb32ca9710e663a959d254bf7e34e0218ca396f6c776','[\"*\"]',NULL,NULL,'2023-11-23 08:32:16','2023-11-23 08:32:16'),(41,'App\\Models\\User',11,'token','6f5c9639c419bb5c7f9f07c9e35d84864b881d83d1934a1f8391e1d02b9ad232','[\"*\"]',NULL,NULL,'2023-11-23 08:33:11','2023-11-23 08:33:11'),(42,'App\\Models\\User',1,'token','bd9adc0acc6d659162a33fd7a2b9d00f00acbf4f03d9f818995d662fde6a6df2','[\"*\"]',NULL,NULL,'2023-11-23 08:35:14','2023-11-23 08:35:14'),(43,'App\\Models\\User',1,'token','ab3ad1942d847ed5afbe3f3623e7bbc81295c7d012278379ce7b6f660c18da62','[\"*\"]',NULL,NULL,'2023-11-23 08:35:33','2023-11-23 08:35:33'),(44,'App\\Models\\User',1,'token','83d376193bb7f6bd53d8c2f134c0f29d10c37e4a626264661bd7a13e375c7471','[\"*\"]',NULL,NULL,'2023-11-23 08:40:05','2023-11-23 08:40:05'),(45,'App\\Models\\User',1,'token','3a4b61bea1c9dcdf60e95c68b39f6dff1c4cbaf8b7e8388f1780549930ff9a7e','[\"*\"]',NULL,NULL,'2023-11-23 08:42:20','2023-11-23 08:42:20'),(46,'App\\Models\\User',1,'token','2f4e56dc93727b03e2c24585abda7575d8c191f1a6fe06975855a7f4be88bfee','[\"*\"]',NULL,NULL,'2023-11-23 08:43:19','2023-11-23 08:43:19'),(47,'App\\Models\\User',1,'token','01c80d90a549c66c33f8a22a5c830ae5090346389a20a1337d4aa12852927a0f','[\"*\"]',NULL,NULL,'2023-11-23 08:44:19','2023-11-23 08:44:19'),(48,'App\\Models\\User',1,'token','25ce0654578afd9fab693840b4855bbf58c4f7ae2f390011ace6bec650d6ce73','[\"*\"]',NULL,NULL,'2023-11-23 08:45:04','2023-11-23 08:45:04'),(49,'App\\Models\\User',1,'token','d7b7ea05832fffa7edf51b4d545991be6d6abc70e2444144c6b537d76ca16db9','[\"*\"]',NULL,NULL,'2023-11-23 08:45:56','2023-11-23 08:45:56'),(50,'App\\Models\\User',1,'token','bb1a27cd091d0df87b1c9915c88c8fdcf4bb9c1957c8b82655cd8388b29bd9a2','[\"*\"]',NULL,NULL,'2023-11-23 08:46:49','2023-11-23 08:46:49'),(51,'App\\Models\\User',1,'token','c129d455142c7d6c7d6bc7748a0c999389258f73ce1438141f35d4642a228c97','[\"*\"]',NULL,NULL,'2023-11-23 08:47:36','2023-11-23 08:47:36'),(52,'App\\Models\\User',1,'token','c6e242f0fc0afbbfdc0942ad55d5cb3af9f69938650038b7a19eae7586f9adf0','[\"*\"]',NULL,NULL,'2023-11-23 08:48:45','2023-11-23 08:48:45'),(53,'App\\Models\\User',1,'token','e5c09f5be7eda562c589397fdc300ec59a738abe80305eea645774cdfdda14ea','[\"*\"]',NULL,NULL,'2023-11-23 08:51:15','2023-11-23 08:51:15'),(54,'App\\Models\\User',1,'token','f57fc44c620e6abe8b083585c1fe3c98bda587f8ebf96206fa91854fe7f747e0','[\"*\"]',NULL,NULL,'2023-11-23 08:59:53','2023-11-23 08:59:53'),(55,'App\\Models\\User',1,'token','2124674eccf88e1d01fa0a869ddd17c62fb0d9da580f2618a0e7f507c697e7f7','[\"*\"]',NULL,NULL,'2023-11-23 09:00:28','2023-11-23 09:00:28'),(56,'App\\Models\\User',1,'token','302d5d30af2d76e87aabbaae9b2c5195abce2fcb6b02a2708886761e8976d03e','[\"*\"]',NULL,NULL,'2023-11-23 09:27:04','2023-11-23 09:27:04'),(57,'App\\Models\\User',6,'token','2d94e31916d78ad8bbf5f5357c18d4db3b91f4c7966d05ec4784e4a4baf4e217','[\"*\"]',NULL,NULL,'2023-12-01 08:26:52','2023-12-01 08:26:52'),(58,'App\\Models\\User',6,'token','64d67cefbafe3e2da3f0c437d63b3cba85fb474e660a5e38822bea05fed58cd2','[\"*\"]',NULL,NULL,'2023-12-04 07:44:14','2023-12-04 07:44:14'),(59,'App\\Models\\User',6,'token','fa3edda89cb89f5e9a2dbc0a13c197058297264e74ad370ab148c4b7da2f02cb','[\"*\"]',NULL,NULL,'2023-12-05 01:08:01','2023-12-05 01:08:01'),(60,'App\\Models\\User',6,'token','9851e420d99177bc98bdd8b4d704552f0b0857b0ff7e220ee32d21c7072c7ec9','[\"*\"]',NULL,NULL,'2023-12-06 06:50:53','2023-12-06 06:50:53'),(61,'App\\Models\\User',1,'token','7007ea02510ae139afab73781cbcd6567fd72116ba10de2e42e728a24cc4cad7','[\"*\"]',NULL,NULL,'2023-12-06 08:55:28','2023-12-06 08:55:28');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'User',NULL,NULL),(2,'admin',NULL,NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emoji` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_start` datetime DEFAULT NULL,
  `data_end` datetime DEFAULT NULL,
  `done` tinyint(1) NOT NULL,
  `list_task_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tasks_list_task_id_foreign` (`list_task_id`),
  CONSTRAINT `tasks_list_task_id_foreign` FOREIGN KEY (`list_task_id`) REFERENCES `list_tasks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_dashboards`
--

DROP TABLE IF EXISTS `user_dashboards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_dashboards` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `dashboard_id` bigint unsigned NOT NULL,
  `invited` tinyint(1) NOT NULL DEFAULT '0',
  `confirmed` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_dashboards_user_id_foreign` (`user_id`),
  KEY `user_dashboards_dashboard_id_foreign` (`dashboard_id`),
  CONSTRAINT `user_dashboards_dashboard_id_foreign` FOREIGN KEY (`dashboard_id`) REFERENCES `dashboards` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_dashboards_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_dashboards`
--

LOCK TABLES `user_dashboards` WRITE;
/*!40000 ALTER TABLE `user_dashboards` DISABLE KEYS */;
INSERT INTO `user_dashboards` VALUES (107,1,41,1,1,'2023-12-01 09:22:47','2023-12-01 09:22:47'),(108,1,42,1,1,'2023-12-04 00:45:13','2023-12-04 00:45:13'),(109,1,43,1,1,'2023-12-04 06:33:00','2023-12-04 06:33:00'),(110,1,44,1,1,'2023-12-04 06:39:41','2023-12-04 06:39:41');
/*!40000 ALTER TABLE `user_dashboards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_desks`
--

DROP TABLE IF EXISTS `user_desks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_desks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `desk_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_desks_desk_id_foreign` (`desk_id`),
  KEY `user_desks_user_id_foreign` (`user_id`),
  CONSTRAINT `user_desks_desk_id_foreign` FOREIGN KEY (`desk_id`) REFERENCES `desks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_desks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_desks`
--

LOCK TABLES `user_desks` WRITE;
/*!40000 ALTER TABLE `user_desks` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_desks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tasks`
--

DROP TABLE IF EXISTS `user_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tasks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `desk_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `task_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_tasks_user_id_foreign` (`user_id`),
  KEY `user_tasks_desk_id_foreign` (`desk_id`),
  KEY `user_tasks_task_id_foreign` (`task_id`),
  CONSTRAINT `user_tasks_desk_id_foreign` FOREIGN KEY (`desk_id`) REFERENCES `desks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_tasks_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `list_tasks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_tasks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tasks`
--

LOCK TABLES `user_tasks` WRITE;
/*!40000 ALTER TABLE `user_tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'avatar_none.png',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `premium` tinyint(1) DEFAULT '0',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role_id` bigint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_login_unique` (`login`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_role_id_foreign` (`role_id`),
  CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Masya Sagitov','Rab1d','avatar_none.png','onetaphack@gmail.com',NULL,'$2y$10$BSL8K8ULtETndLJVRYmET.giPP9IhZX9eBM1PMM08YT4KZ78BLsbe',1,'$2y$10$if37DpCfMEQUQHVYM7vb6eacixhNrtiik7DAxGYeHXpEP3sHugBAG',NULL,'2023-12-06 08:55:29',2),(3,'sdfsdf','sfsdfsdfsdf','avatar_none.png','sdfsdfsdf@mail.ru',NULL,'$2y$10$XUTAX4mRyVQ9XiGT5S8cz.1qkc1knz.o304R51EfaldPACqn8xgoy',0,NULL,'2023-08-25 08:56:40','2023-08-25 08:56:40',1),(4,'авпвапва','вапвапвапва','avatar_none.png','sfdsfn@mail.ru',NULL,'$2y$10$sbDWr2E7ky5PONK7nnLbxOTirLuOh84tr0nIXXR8z63QIXyaSPvla',0,'$2y$10$zqgPhL/eGQGW23ZHDFgfgOoTc/28hU2kn0bo8uAML5lXjN6tZv07u','2023-08-28 01:39:17','2023-08-28 01:39:17',1),(5,'Сагитов Максим','123123123','avatar_none.png','asadasd@mail.ru',NULL,'$2y$10$e6o0QIB17DD4qeTdY6Ug2u9nU676ri59nplMhf3t9DSKLxwQkxn06',0,NULL,'2023-08-28 09:20:18','2023-08-28 09:20:18',1),(6,'Reserve man 1','reserve1','avatar_none.png','reserv1@gmail.com',NULL,'$2y$10$gxXcZU2gIa78L1KWyOqS4.6yQveSwPg4axWFdJCfW.hcQLIH578yK',0,'$2y$10$gMv6zPOMp8n7gMaFmogVl.vB2VZazwk7XAuKFhhZ2hGOpZs.MQuDS',NULL,'2023-12-06 06:50:53',1),(7,'Reserve man 2','reserve2','avatar_none.png','reserv2@gmail.com',NULL,'$2y$10$S98jy2qzfNZvHPU4kFvkTe8b8Rnj3gFyX0dfopeXv4LhveFZmviwq',0,'QCVRfGXTxWXFqbjNp03T8PiHmu60qjfvht4QiSZBhfPPkz213TPHFHm6bdUL',NULL,NULL,1),(11,'Тест','test','avatar_none.png','sagitov@mks-group.ru',NULL,'$2y$10$wjJ7NA9wAE//FcI6Sw8G9uH8DT1OaaAvqk6j7X6VJ5azp/5XoZCHa',0,NULL,'2023-11-23 08:33:11','2023-11-23 08:33:26',1);
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

-- Dump completed on 2023-12-06 17:36:33
