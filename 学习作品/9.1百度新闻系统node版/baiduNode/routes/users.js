var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./dbConfig');//数据库信息
var makeDate = require('./makeDate');//修改时差错误和时间格式
var pool = mysql.createPool(dbConfig);//数据库连接池创建

/*后台页面请求*/
router.get('/all', function(req, res, next) {
  	pool.getConnection(function(err, connection) {
  		// Use the connection 
	  	connection.query( 'SELECT * FROM `news` ORDER BY `news`.`newstime` DESC', function(err, rows) {
		  	//遍历查询内容修改改时间
		  	rows.forEach(function(item,index,array){
		  		item.newstime = makeDate(item.newstime);
		  		//console.log(item.newstime);
		  	});
		  	res.json(rows);
		    // 操作完数据库，把连接释放回连接池
		    connection.release();
	  	});
	});
});

//添加新闻
router.post('/insert',function(req,res,next){
	var newtitle = req.body.newtitle;
	var newtype = req.body.newtype;
	var newimg = req.body.newimg;
	var newsrc = req.body.newsrc;
	var newtime = req.body.newtime;
	var newArray = [newtitle,newtype,newimg,newtime,newsrc];
	//console.log(newArray);
	pool.getConnection(function(err,connection){
		if(!err){
			connection.query(
			'INSERT INTO `news` (newstitle,newstype,newsimg,newstime,newssrc) VALUES (?,?,?,?,?)',
			newArray,function(err,rows){
				res.json({'Insert':'Inerst success'});
			});
		}
		connection.release();
	});
});

//删除新闻
router.post('/delete',function(req,res,next){
	var newid = req.body.newid;
	pool.getConnection(function(err,connection){
		if(!err){
			connection.query(
			'DELETE FROM `news` WHERE id = ?',
			[newid],function(err,rows){
				if (!err) {
					res.json({'Delete':'Delete success'});
				}else{
					res.json(err);
				}
			});
		}
		connection.release();
	});
});

//编辑新闻
router.post('/update',function(req,res,next){
	var newtitle = req.body.newtitle;
	var newtype = req.body.newtype;
	var newimg = req.body.newimg;
	var newtime = req.body.newtime;
	var newsrc = req.body.newsrc;	
	var id = req.body.newid;
	var newArray = [newtitle,newtype,newimg,newtime,newsrc,id];
	//console.log(newArray);
	pool.getConnection(function(err,connection){
		if (!err) {
			connection.query(
			'UPDATE `news` SET  newstitle = ?, newstype = ?, newsimg = ?, newstime = ?, newssrc = ? WHERE news.id = ?',
			newArray,function(err,rows){
				res.json({'Update':'Update success'});
		});
		connection.release();
		}
	});
});
//模态框查询
router.post('/curnews', function(req, res, next) {
  var newid = req.body.newid;
  pool.getConnection(function(err,connection){
  	if (!err) {
	  	connection.query('SELECT * FROM `news` WHERE `id` = ? ',
	  		[newid],function(err,rows){
		  	//修改查询内容时间
		  	rows[0].newstime = makeDate(rows[0].newstime);
		  	//console.log(rows);
		  	res.json(rows);
		  	
	  	});
  	}
  	connection.release();
  });

});


module.exports = router;
