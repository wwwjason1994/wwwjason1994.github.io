var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./dbConfig');//数据库信息
var makeDate = require('./makeDate');//修改时差错误和时间格式


/* 新闻主页请求设置*/
router.get('/', function(req, res, next) {
  var newtype = req.query.newtype;

  var connection = mysql.createConnection(dbConfig);
  connection.connect();
  connection.query('SELECT * FROM `news` WHERE `newstype` LIKE ? ORDER BY `news`.`newstime` DESC',[newtype],function(err,rows){
  	//遍历查询内容修改改时间
  	rows.forEach(function(item,index,array){
  		item.newstime = makeDate(item.newstime);
  		//console.log(item.newstime);
  	});
  	//console.log(rows);
  	res.json(rows);
  });
  connection.end();

});
 
module.exports = router;
