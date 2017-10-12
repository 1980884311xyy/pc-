<?php
	//获取请求中传递的用户名
	$name = $_GET["username"];
	//$psw = $_REQUEST["psw"];
	 /*在数据库中去查询是否有这条数据的用户信息 */
	// 连接数据库服务器
	mysql_connect("localhost:3306","root","root");
	//选择数据库
	mysql_select_db("lylj");
	//创建查询SQL语句
	$sql = "SELECT count(*) FROM  `register` WHERE  `username` LIKE '$name'";
	// 执行SQL语句，返回查询结果集
	$result = mysql_query($sql);
	if($row = mysql_fetch_array($result)){
		if($row[0] == 1){
			echo '{"status":0,"message":"存在"}';
		}else{
			echo '{"status":1,"message":"不存在"}';
		}
	} else {
		echo '{"status":2, "message":"error"}';
	}
	//关闭数据库链接
	mysql_close();

?>