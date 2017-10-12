require(['config'], function() {
	require(["jquery", "cookie", "base", "layer","shoop"],
		function($, cookie, base, layer,shoop) {
			//生成验证码
			createCodeFn()
			setTimeout(function() {
				$("#login").click(function() {
					var userTxt = $("#username").val().trim();
					var pswTxt = $("#psw").val().trim();
					var flag = true;
					if (!userTxt) {
						layer.msg("请输入用户名",{icon:2,shade: [0.8, '#393D49'],time:2000},)
						flag = false;
					} else if (pswTxt == "") {
						layer.msg("请输入密码",{icon:2,shade: [0.8, '#393D49'],time:2000},)
						flag = false;
					} else if (!$("#codeTxt").val()) {
						layer.msg("请输入验证码",{icon:2,shade: [0.8, '#393D49'],time:2000},)
						flag = false;
					} else if ($("#codeTxt").val()) {
						var url = "http://route.showapi.com/932-1?showapi_appid=" + "47023&showapi_sign=d420aa00b8e54d1e8f7735987c2f2f92&checkcode=" + $('#codeTxt').val() + "&sid=" + $("#yzm").data("sid");
						$.getJSON(url, function(data) {
							if (!data.showapi_res_body.valid) {
								layer.msg("验证码错误",{icon:2,shade: [0.8, '#393D49'],time:2000},)
								flag = false;
							}
						})
					}
					if (flag) {
						$.ajax({
							type: "get",
							url: "../php/logincheck.php?username=" + userTxt + "&psw=" + pswTxt,
							dataType: "json",
							success: function(data) {
								//console.log(data)
								//如果验证通过，就进行页面跳转，设置cookie，记录登录状态
								if (data.status == 0) {
									//设置cookie
									$.cookie("loginstatus",userTxt , {
										expires: 7,
										path: '/'
									});
									//登陆成功后跳转
									location.href="../index.html"
								}else{
									layer.msg("用户名或密码错误",{icon:2,shade: [0.8, '#393D49'],time:2000},)
								}

							}
						});
					}

				})
			}, 100)


			function createCodeFn() {
				var url = "http://route.showapi.com/932-2?showapi_appid=47023&showapi_sign=d420aa00b8e54d1e8f7735987c2f2f92&length=4&specials=false";
				$.ajax({
					type: "get",
					url: url,
					async: true,
					dataType: "json",
					success: function(data) {
						$("#yzm").attr("src", data.showapi_res_body.image);
						$("#yzm").data("sid", data.showapi_res_body.sid);
					}
				});
			}
			$("#yzm").click(function() {
				createCodeFn()
			})
			shoop.deleCookie()	
		})
})