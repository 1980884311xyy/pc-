require(['config'], function() {
	require(["jquery", "cookie", "base", "shoop"],
		function($, cookie, base, shoop) {
			$(function() {
				var tishi = $(".cont_reg form .tishi");
				$("#username").blur(function() {
						userName();
					})
					//验证用户名格式
				function userName() {
					var utxt = $("#username").val().trim();
					if (!utxt) {
						tishi.eq(0).css("display", "block");
						$(".cont_reg form .userN .top").html("用户名不能为空")
						return false;
					} else if
					(!/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/.test(utxt)) {
						tishi.eq(0).css("display", "block");
						$(".cont_reg form .userN .top").html("用户名格式有误")
						$(".cont_reg form .userN .info1").html("")
						return false;
					} else {
						tishi.eq(0).css("display", "none");
						//$(".cont_reg form .userN .info1").html("")
						//验证用户名是否存在
						$.ajax({
							type: "get",
							url: "../php/check.php?username=" + utxt,
							dataType: "json",
							success: function(data) {
								if (data.status == 0) {
									tishi.eq(0).css("display", "block");
									$(".cont_reg form .userN .top").html("该用户名已被注册");
									$(".cont_reg form .userN .info1").html("");
									return false;
								} else {
									$(".cont_reg form .userN .info1").html("");
								}
							}
						});
					}
				}
				//验证密码
				$("#psw").blur(function() {
					pswFn();
				})

				function pswFn() {
					var pswtxt = $("#psw").val();
					if (pswtxt == '') {
						tishi.eq(1).css("display", "block");
						$(".cont_reg form .psw .top").html("密码格式错误");
						return false;
					} else if (pswtxt.length < 6) {
						$(".cont_reg form .psw .top").html("密码格式错误");
						$(".cont_reg form .psw .info2").html("");
						return false;
					} else {
						tishi.eq(1).css("display", "none");
						$(".cont_reg form .psw .info2").html("");
						pswSFn()
					}
				}

				//确认密码
				$("#pswS").blur(function() {
					pswSFn()
				})

				function pswSFn() {
					var txt = $("#pswS").val();
					var txt1 = $("#psw").val();
					if (txt != txt1) {
						tishi.eq(2).css("display", "block");
						$(".cont_reg form .pswS .top").html("两次密码不一致");
						return false;
					} else {
						tishi.eq(2).css("display", "none");
						Check();
					}
				}

				//验证码
				createCodeFn()

				function createCodeFn() {
					var url = "http://route.showapi.com/932-2?showapi_appid=47023&showapi_sign=d420aa00b8e54d1e8f7735987c2f2f92&length=4&specials=false";
					$.ajax({
						type: "get",
						url: url,
						async: true,
						dataType: "json",
						success: function(data) {
							$("#codeImg>img").attr("src", data.showapi_res_body.image);
							$("#codeImg>img").data("sid", data.showapi_res_body.sid);
						}
					});
				}
				$("#codeImg>img").click(function() {
					createCodeFn();
				})

				//验证验证码
				$("#codeTxt").blur(function() {
					Check();
				})

				function Check() {
					var url = "http://route.showapi.com/932-1?showapi_appid=" + "47023&showapi_sign=d420aa00b8e54d1e8f7735987c2f2f92&checkcode=" + $('#codeTxt').val() + "&sid=" + $("#codeImg>img").data("sid");
					$.getJSON(url, function(data) {
						if ($("#codeTxt").val() == '') {
							$("#info_yzm").css({
								display: "block",
								color: "red"
							})
							$("#info_yzm").html("验证码不能为空");
							return false;
						} else if (!data.showapi_res_body.valid) {
							$("#info_yzm").css({
								display: "block",
								color: "red"
							})
							$("#info_yzm").html("验证码错误");
							return false;
						} else {
							$("#info_yzm").css("display", "none");
							insertMysql();
						}
					})
				}
				function lastFn(){
					var utxt = $("#username").val().trim();
					if (!utxt) {
						tishi.eq(0).css("display", "block");
						$(".cont_reg form .userN .top").html("用户名不能为空")
						return false;
					} else if
					(!/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/.test(utxt)) {
						tishi.eq(0).css("display", "block");
						$(".cont_reg form .userN .top").html("用户名格式有误")
						$(".cont_reg form .userN .info1").html("")
						return false;
					} else {
						tishi.eq(0).css("display", "none");
						//验证用户名是否存在
						$.ajax({
							type: "get",
							url: "../php/check.php?username=" + utxt,
							dataType: "json",
							success: function(data) {
								if (data.status == 0) {
									tishi.eq(0).css("display", "block");
									$(".cont_reg form .userN .top").html("该用户名已被注册");
									$(".cont_reg form .userN .info1").html("");
									return false;
								} else {
									$(".cont_reg form .userN .info1").html("");
									pswFn();
								}
							}
						});
					}
				}
				
				//插入到数据库
				function insertMysql() {
					$.post(
						"../php/register.php", {
							username: $('#username').val(),
							password: $('#psw').val()
						},
						function(data) {
							location.href = "register_success.html"
						}, "json"
					);
				}
				//提交
				$("#reg").click(function() {
					userName();
					pswFn();
					pswSFn();
					Check();
					lastFn()
				})

			})

		})
})