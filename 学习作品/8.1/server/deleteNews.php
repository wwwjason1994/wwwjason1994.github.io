<?php
	require_once 'dbController.php';

	header("Content-type:application/json; charset=utf-8");

	$db = new DateBase('news');//数据库操作类
	$link = $db->connectDb();
	if ($link) {
		$newid = $_POST['newid'];
		$result = $db->deleteData($newid);
		echo json_encode($result);
	}
	$db->closeConnect();
?>