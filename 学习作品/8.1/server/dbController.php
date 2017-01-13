<?php
/**
 * Created by PhpStorm.
 * User: Jason
 * Date: 2016/11/3
 * Time: 14:37
 */
header("Content-type:application/json; charset=utf-8");

require_once 'config.php';
 /**
 * 数据库操作类
 */
 class DateBase 
 {
 	public $dbName;//数据库名称
 	public $connect;//当前连接的数据库表
 	public $tableName;//表名字
 	//构造函数
 	function __construct($tableN)
 	{
 		$this->tableName = $tableN;
 	}
 	//链接数据库方法
	function connectDb(){
	    $this->connect = mysqli_connect(MYSQL_HOST,MYSQL_USER,MYSQL_PW);
	    $this->dbName = MYSQL_DBNAME;
	    $conn = $this->connect;
	    if(!$conn){
	        return false;
	    }else{
	    	mysqli_query($conn,"SET NAMES 'utf8'");//记得要设置编码方式，这样才能从mysql输入输出中文数据
	    	$result = mysqli_select_db($conn,$this->dbName);
	    	return $result;
	    }
	}
	//检索数据
	function selectData($key,$value){
		$conn = $this->connect;
		$table = $this->tableName;
		if (!$conn) {
			return $arrayName = array('error' => '还没有连接数据库' );
		}else{
			//查询操作
			$result = mysqli_query($conn,"SELECT * FROM ".$table." WHERE `{$key}` LIKE '{$value}' ORDER BY `news`.`newstime` DESC");
			$datacount = mysqli_num_rows($result);
			$result_data = array();
			for($i = 0;$i<$datacount;$i++) {
    			$result_arr = mysqli_fetch_assoc($result);
    			$result_data[$i] = $result_arr;
			}
			return $result_data;
		}
	}
	//插入数据
	/**
	*$table ->表名,$newType ->新闻类型,$newtitle->新闻标题
	*$newimg ->新闻图片,$newtime->新闻时间,$newsrc ->新闻来源
	*/
	function insertData($newtype,$newtitle,$newimg,$newtime,$newsrc){
		$conn = $this->connect;
		$table = $this->tableName;
		if (!$conn) {
			return $arrayName = array('error' => '还没有连接数据库' );
		}else{
			//插入操作
			$result = mysqli_query($conn,"INSERT INTO ".$table."(newstype,newstitle,newsimg,newstime,newssrc) VALUES ('{$newtype}','{$newtitle}','{$newimg}','{$newtime}','{$newsrc}')");
			return $result;
		}
	}
	//删除数据
	function deleteData($id){
		$conn = $this->connect;
		$table = $this->tableName;
		if (!$conn) {
			return $arrayName = array('error' => '还没有连接数据库' );
		}else{
			//删除操作
			$result = mysqli_query($conn,"DELETE FROM ".$table." WHERE id = ".$id);
			return $result;
		}
	}
	//修改数据库
	function updateDate($newid,$newtype,$newtitle,$newimg,$newtime,$newsrc){
		$conn = $this->connect;
		$table = $this->tableName;
		if (!$conn) {
			return $arrayName = array('error' => '还没有连接数据库' );
		}else{
			//修改操作
			$result = mysqli_query($conn,"UPDATE ".$table." SET newstype = '{$newtype}', newstitle = '{$newtitle}', newsimg = '{$newimg}', newstime = '{$newtime}', newssrc = '{$newsrc}' WHERE news.id = '{$newid}'");
			return $result;
		}
	}
	//断了连接数据库
	function closeConnect(){
		$conn = $this->connect;
		if (!$conn) {
			return $arrayName = array('error' => '还没有连接数据库' );
		}else{
			mysqli_close($conn);
		}
		
	}
 }

?>

