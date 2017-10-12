<?php
	header("Content-Type: text/html; charset=utf-8");
	//获取请求中传递的用户名
	$name = $_REQUEST["username"];
	$psw = $_REQUEST["psw"];
	 /*在数据库中去查询是否有这条数据的用户信息 */
	// 连接数据库服务器
	mysql_connect("localhost:3306","root","root");
	//选择数据库
	mysql_select_db("lylj");
	//创建查询SQL语句
	$sql = "SELECT * FROM  `register` WHERE  `username` LIKE  '$name' AND  `password` LIKE  '$psw'";
	// 执行SQL语句，返回查询结果集
	$result = mysql_query($sql);
	//print_r (mysql_fetch_array($result));
	$row = mysql_fetch_array($result);
	//print_r($row) ;
	if($row){
		//echo $row[1];
		if($row[0] > 0){
			echo '{"status":0,"message":"验证通过"}';
		}
	} else {
		echo '{"status":1, "message":"用户名或密码错误"}';
	}
	//关闭数据库链接
	mysql_close();

?>