<?php
	require_once 'dbController.php';

	header("Content-type:application/json; charset=utf-8");

	$db = new DateBase('news');//数据库操作类
	$link = $db->connectDb();

	if ($link) {
		foreach ($_REQUEST as $key => $value) {
			//过滤html标签
			$_REQUEST[$key] = addslashes(htmlspecialchars($value));
		}
		//修改新闻
		if(isset($_REQUEST['newid'])){
			$newid = $_REQUEST['newid'];
			$newtype = $_REQUEST['newtype'];
			$newtitle = $_REQUEST['newtitle'];
			$newimg = $_REQUEST['newimg'];
			$newtime = $_REQUEST['newtime'];
			$newsrc = $_REQUEST['newsrc'];
			
			$relust = $db->updateDate($newid,$newtype,$newtitle,$newimg,$newtime,$newsrc);
			echo json_encode(array('修改状态' => '修改成功' ));
		}
		
	}
	$db->closeConnect();
?>