<?php
	//从页面拿到数据
	$username=$_REQUEST["username"];
	$password=$_REQUEST["password"];
	//链接数据库
	mysql_connect("localhost:3306", "root", "root");
	//选择数据库
	mysql_select_db("lylj");
	if($username && $password){
		$sql = "INSERT INTO  `lylj`.`register` (`username`, `password`) VALUES ('$username', '$password')";
		// 执行SQL语句，返回执行结果的boolean值
		$result = mysql_query($sql);
	}	
	// 根据查询结果集判断
	if ($result) {
		echo '{"status":1, "message":"success"}';
	} else {
		echo '{"status":0, "message":"failed"}';
	}
	// 关闭数据库连接
	mysql_close();
	
?>