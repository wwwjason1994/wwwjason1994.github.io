-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-12-29 09:10:16
-- 服务器版本： 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baidunews`
--

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `newstype` char(200) NOT NULL,
  `newstitle` varchar(200) NOT NULL,
  `newsimg` varchar(200) NOT NULL,
  `newstime` datetime NOT NULL,
  `newssrc` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`id`, `newstype`, `newstitle`, `newsimg`, `newstime`, `newssrc`) VALUES
(15, '精选', '【第一届全国文明家庭】郭良玉家庭', 'img/1.jpg', '2016-12-21 11:06:00', '热点'),
(16, '精选', '“中国不存在雾霾”？ 不能再让这种论调遮人心', 'img/2.jpeg', '2016-12-21 17:00:00', '搜狐头条'),
(17, '精选', '中国经济靠什么留住曹德旺', 'img/3.png', '2016-12-21 00:00:00', '猜你喜欢'),
(18, '精选', '石家庄22日继续停课 23日是否停课另行通知', 'img/4.png', '2016-12-21 17:00:00', '网易要闻'),
(19, '百家', '2017年中国房地产市场会走向哪里？', 'img/5.jpeg', '2016-12-29 00:15:00', '百家原创'),
(20, '百家', '从改变购买方式到建立生态系统 任务盟选择从生活服务领域进入市场', 'img/6.jpeg', '2016-12-21 10:20:00', '百家原创'),
(21, '本地', '北京违法拍摄探头不受雾霾天气影响(图)', 'img/7.jpeg', '2016-12-21 12:12:00', '本地'),
(22, '本地', '北京违法拍摄探头不受雾霾天气影响(图)', 'img/1.png', '2016-12-21 00:00:00', '测试'),
(23, '娱乐', '国剧盛典李易峰开玩笑要拿“终身成就奖”', 'img/8.jpeg', '2016-12-21 17:00:00', '李易峰'),
(25, '百家', '&lt;script&gt;alert(1)&lt;/script&gt;', 'img/6.jpeg', '2016-12-21 03:21:00', 'html'),
(30, '科技', 'nodetest11', 'img/1.jpg', '2016-12-29 15:27:00', 'node'),
(31, '科技', '&lt;script&gt;alert(1)&lt;/script&gt;', 'img/6.jpeg', '2016-12-29 13:54:00', 'script'),
(32, '科技', '&lt;script&gt;alert(1)&lt;/script&gt;', 'img/6.jpeg', '2016-12-29 11:11:00', 'script');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
