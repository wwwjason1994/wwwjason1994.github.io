<?php
	require_once 'dbController.php';

	header("Content-type:application/json; charset=utf-8");

	$db = new DateBase('news');//数据库操作类
	$link = $db->connectDb();
	if($link){
		if(isset($_REQUEST['newid'])){//ajax传入id时
			$newid = $_REQUEST['newid'];
			$result = $db->selectData('id',$newid);
		}else if(isset($_REQUEST['newtype'])){//ajax传入newtype时
			$newtype = $_REQUEST['newtype'];
			$result = $db->selectData('newstype',$newtype);
		}else{//什么都不传是全部输出
			$result = $db->selectData('id','%');
		}
	}
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
	//echo json_encode($result);

	$db->closeConnect();


	// echo json_encode($arr);
?>