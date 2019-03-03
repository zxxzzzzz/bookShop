/*
Navicat MySQL Data Transfer

Source Server         : shop
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : bookshop

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-03-03 10:26:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `press` varchar(255) NOT NULL,
  `price` float(10,1) NOT NULL,
  `pageCount` int(11) NOT NULL,
  `extract` varchar(1000) NOT NULL,
  `author` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `introduction` varchar(255) NOT NULL,
  `stockCount` int(11) NOT NULL COMMENT '库存',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('00000000001', '西游记', '长江文艺', '15.5', '354', '这是西游记的试读', '吴承恩', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549461517793&di=b2b20c9bd0d6f76868b29ee9973bb238&imgtype=0&src=http%3A%2F%2Fimg32.ddimg.cn%2F81%2F15%2F1900348542-1_w_1.jpg', '这是西游记的简介', '98');
INSERT INTO `book` VALUES ('00000000002', '水浒传', '黄河文艺', '16.5', '569', '这是水浒的试读', '施耐庵', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549461517793&di=b2b20c9bd0d6f76868b29ee9973bb238&imgtype=0&src=http%3A%2F%2Fimg32.ddimg.cn%2F81%2F15%2F1900348542-1_w_1.jpg', '这是水浒的简介', '99');
INSERT INTO `book` VALUES ('00000000003', '悲伤逆流成黄河', '大世界', '35.0', '387', '这是悲伤的试读', '郭敬明', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549461517793&di=b2b20c9bd0d6f76868b29ee9973bb238&imgtype=0&src=http%3A%2F%2Fimg32.ddimg.cn%2F81%2F15%2F1900348542-1_w_1.jpg', '这是悲伤的简介', '99');
INSERT INTO `book` VALUES ('00000000007', '樱桃种植', '南京农业', '19.0', '679', '这是樱桃种植的试读', '刘广才', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549461517793&di=b2b20c9bd0d6f76868b29ee9973bb238&imgtype=0&src=http%3A%2F%2Fimg32.ddimg.cn%2F81%2F15%2F1900348542-1_w_1.jpg', '这是樱桃的简介', '99');

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `bookId` int(11) NOT NULL,
  `class` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('0000000002', '2', '历史');
INSERT INTO `class` VALUES ('0000000003', '3', '小说');
INSERT INTO `class` VALUES ('0000000004', '7', '农业');
INSERT INTO `class` VALUES ('0000000006', '1', '神话');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `bookId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('00000000001', '1', '读了这本书，我进生哈', '1', '0000-00-00 00:00:00');
INSERT INTO `comment` VALUES ('00000000002', '1', '这书很好', '1', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for delivery
-- ----------------------------
DROP TABLE IF EXISTS `delivery`;
CREATE TABLE `delivery` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL COMMENT '下一条物流信息的id',
  `info` varchar(255) NOT NULL COMMENT '物流信息',
  `date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of delivery
-- ----------------------------

-- ----------------------------
-- Table structure for history
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `action` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `bookId` int(11) DEFAULT NULL,
  `searchParam` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of history
-- ----------------------------
INSERT INTO `history` VALUES ('0000000001', 'buy', '2019-02-05 13:16:18', '1', null, '1');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `bookId` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `userId` int(11) NOT NULL,
  `state` varchar(255) NOT NULL COMMENT '待发货 已发货 已收货 已评价',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('0000000001', '1', '2019-02-24 14:24:34', '1', '已评价');
INSERT INTO `order` VALUES ('0000000003', '2', '0000-00-00 00:00:00', '1', '待发货');
INSERT INTO `order` VALUES ('0000000004', '3', '0000-00-00 00:00:00', '1', '待发货');
INSERT INTO `order` VALUES ('0000000005', '3', '0000-00-00 00:00:00', '1', '待发货');
INSERT INTO `order` VALUES ('0000000006', '1', '2019-02-24 13:35:36', '1', '已发货');
INSERT INTO `order` VALUES ('0000000007', '1', '2019-02-24 13:36:19', '1', '已发货');
INSERT INTO `order` VALUES ('0000000008', '1', '2019-02-24 13:36:22', '1', '已发货');
INSERT INTO `order` VALUES ('0000000009', '1', '0000-00-00 00:00:00', '1', '待发货');

-- ----------------------------
-- Table structure for shoppingcart
-- ----------------------------
DROP TABLE IF EXISTS `shoppingcart`;
CREATE TABLE `shoppingcart` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `bookId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shoppingcart
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` tinyint(255) unsigned NOT NULL,
  `active` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('00000000009', 'qq', 'qq', '1', 'unactive', '812603872@qq.com');
INSERT INTO `user` VALUES ('00000000010', 'qqq', 'qqq', '1', 'unactive', '812603872@qq.com');
INSERT INTO `user` VALUES ('00000000011', 'qqqq', 'qqqq', '1', 'unactive', '812603872@qq.com');
INSERT INTO `user` VALUES ('00000000012', 'zxx', 'zxx', '0', 'active', 'null');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `overage` int(11) NOT NULL COMMENT '余额',
  `sex` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL COMMENT '收获地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('0000000001', '1', '1000', '女', '小裙子', '你好，我是小裙子', '北京一区六栋');
