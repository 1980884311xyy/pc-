require(['config'], function() {
	require(["jquery", "cookie", "shoop","layer"],
		function($, cookie, shoop,layer) {
			$(function() {
				$(".foot").load("../html/footer.html");
				$(".base").load("../html/base.html");
			})

			setTimeout(function() {
				shoop.iscookieStatus();
				shoop.deleCookie();
			}, 300)

			$(function() {
				setTimeout(function() {
						//分享到
						var shareF = {
							share: $(".share"),
							share_btn: $(".share #share_btn"),
							init: function() {
								var share_cont = $(".share .share_cont");
								var _this = this;
								this.share.mouseover(function() {
									share_cont.stop().animate({
										"width": 250
									});
									_this.share_btn.stop().animate({
										"left": 250
									});
									share_cont.css("display", "block");
								})
								this.share.mouseout(function() {
									share_cont.stop().animate({
										"width": 0
									});
									_this.share_btn.stop().animate({
										"left": 0
									});
									share_cont.css("display", "none");
								})

								//联系
								var contactN = $(".contactN");
								contactN.on("mouseover", "li", function() {
									$(this).find("div").stop().animate({
										"left": -($(this).find("div")).width()
									});
									$(this).find("div").show();
								})

								contactN.on("mouseout", "li", function() {
									$(this).find("div").stop().animate({
										"left": 0
									});
									$(this).find("div").hide();
								})

								//up
								contactN.on("click", ".up", function() {
										var scrooT = $(document).scrollTop();
										$('html,body').animate({
											scrollTop: scrooT - 500
										}, 400);
									})
									//down
								contactN.on("click", ".down", function() {
										var scrooT = $(document).scrollTop();
										$('html,body').stop().animate({
											scrollTop: scrooT + 500
										}, 400);
									})
									//显示隐藏
								var toggle = 0;
								$(".toggle").click(function() {
									if (toggle % 2 == 0) {
										contactN.stop().animate({
											"right": -50
										});
										$(this).css("background", "#858585 url(../images/show.png) no-repeat 7px center")
									} else {
										contactN.stop().animate({
											"right": 0
										});
										$(this).css("background", "#858585 url(../images/hide.png) no-repeat 10px center")
									}
									toggle++;
								})
							}
						}
						shareF.init();
					}, 500)
					//轮播

				isproducts_id("../json/index_hot.json");
				isproducts_id("../json/flower_hot.json");
				isproducts_id("../json/show.json");
				isproducts_id("../json/opening.json");
				isproducts_id("../json/guolan.json");

				//判断是否存在products_id cookie; 存在就生成内容
				function isproducts_id(url) {
					var cookieCar = JSON.parse($.cookie("cookieCar"));
					$.ajax({
						type: "get",
						url: url,
						dataType: "json",
						success: function(data) {
							var str = '';
							//index是下标
							//遍历data,查看cookieCar中的id是否在data中
							$.each(data, function(index) {
								for (var id in cookieCar) {
									if (id == data[index].id) {
										str += '<tr class="tab_con" data-id=' + data[index].id + '>' +
											'<td class="img_car" width="12%">' +
											'<input type="checkbox" class="select_car" checked="checked" />' +
											'<span><img src="' + data[index].small[0] + '" width="78" height="78" /></span>' +
											'</td>' +
											'<td class="title_car" width="38%">' +
											'<a href="##">' + data[index].title + '</a>' +
											'</td>' +
											'<td class="price_car" width="13%">￥<b>' + parseFloat(data[index].price.substr(1)) + '</b></td>' +
											'<td class="count_car" width="15%">' +
											'<div class="number">' +
											'<a href="##" class="reduce_car">-</a>' +
											'<input type="text" class="number_txt" value="' + cookieCar[id] + '"/>' +
											'<a href="##" class="add_car">+</a>' +
											'</div>' +
											'</td>' +
											'<td class="total_car" width="11%">' +
											'￥<b>' + (Number(parseFloat(data[index].price.substr(1))) * Number(cookieCar[id])).toFixed(2) + '</b>' +
											'</td>' +
											'<td class="dele_car" width="12%">' +
											'<a href="##" class="dele">删除</a>' +
											'<a href="##" class="add_btn1">加入我的收藏</a>' +
											'</td>' +
											'</tr>'
									}
								}
							});
							//在第一个之前插入
							$(".car_body tbody").prepend(str);
						}
					});
				}
				setTimeout(function(){
					changeCount() ;
					//获得所有的小计
					var all_total_car=$(".total_car b");
					var all_selectbtn=$(".img_car .select_car");
					var len=seleLen=all_selectbtn.length;
					sumFn();
					
					//计算总价
					function sumFn(){
						var total_price=$("#total_price").html();
						var sum=0;
						$.each(all_total_car, function(i) {
							if(all_selectbtn.eq(i).is(":checked")){
								var val=parseFloat((all_total_car.eq(i).html()));
								sum+=val;
							}
						});
						$("#total_price").html(sum.toFixed(2));
					}
				//全选，全不选
				var top_allselectBtn=$("#top_allselectBtn");
				all_Sele_Fn1();
				all_Sele_Fn2();
				function all_Sele_Fn1(){
					top_allselectBtn.click(function(){
						var flag=top_allselectBtn.prop("checked");
						if(flag){
							$.each(all_selectbtn, function(i) {
								all_selectbtn.eq(i).prop("checked",true);
								$(".all_select").prop("checked",true);
								sumFn();
								selectedFn()
							});
						}else{
							$.each(all_selectbtn, function(i) {
								all_selectbtn.eq(i).prop("checked",false);
								$(".all_select").prop("checked",false);
								sumFn();
								selectedFn()
							});
						}
					})
				}	
				function all_Sele_Fn2(){
					$(".all_select").click(function(){
						var flag=$(".all_select").prop("checked");
						if(flag){
							$.each(all_selectbtn, function(i) {
								all_selectbtn.eq(i).prop("checked",true);
								top_allselectBtn.prop("checked",true);
								sumFn();
								selectedFn()
							});
						}else{
							$.each(all_selectbtn, function(i) {
								all_selectbtn.eq(i).prop("checked",false);
								top_allselectBtn.prop("checked",false);
								sumFn();
								selectedFn()
							});
						}
					})
				}	
				//已选择多少件商品
				selectedFn()
				function selectedFn(){
					var count=0;
					$.each(all_selectbtn, function(i) {
						if(all_selectbtn.eq(i).prop("checked")==true){
							count+=Number($(this).parent().nextAll().eq(2).find(".number_txt").val())
						}
					});
					$("#amountSum").html(count)
				}
				
				//删除选择的商品
				$("#dele_product").click(function(){
					var cookieCar=JSON.parse($.cookie("cookieCar"));
					$.each(all_selectbtn, function(i) {
						if(all_selectbtn.eq(i).prop("checked")==true){
							var id=$(this).parent().parent().attr("data-id");
							for(var car_id in cookieCar){
								if(car_id==id){
									$(this).prop("checked",false)
									delete cookieCar[id];
									$(this).parent().parent().remove();
								}
							}
						}
					});
					selectedFn();
					sumFn();
					all_Sele_Fn1();
					all_Sele_Fn2();
					$.cookie("cookieCar",JSON.stringify(cookieCar),{expires:7,path:"/"})
				})
				
				
				//计算小计
				function changeCount() {
					var tab_con=$(".tab_con");
					var cookieCar=JSON.parse($.cookie("cookieCar"));
					//减
					tab_con.on("click",".number .reduce_car",function(){
						var cnt=Number($(this).next().val());
						var prePrice=Number($(this).parent().parent().prev().find("b").html());
						var total_carB=$(this).parent().parent().next().find("b");
						var id=$(this).parent().parent().parent().attr("data-id");
						var sum = 0;
						cnt--;
						if(cnt<=1){
							cnt=1;
						}	
						sum=prePrice*cnt;
						$(this).next().val(cnt)
						total_carB.html(sum.toFixed(2));
						cookieCar[id]=cnt;
						$.cookie("cookieCar",JSON.stringify(cookieCar),{path:"/",expires: 7})
						sumFn();
						selectedFn()
					})
					//加
					tab_con.on("click",".number .add_car",function(){
						var cnt=Number($(this).prev().val());
						var prePrice=Number($(this).parent().parent().prev().find("b").html());
						var total_carB=$(this).parent().parent().next().find("b");
						var id=$(this).parent().parent().parent().attr("data-id");
						var sum = 0;
						cnt++;
						sum=prePrice*cnt;
						$(this).prev().val(cnt)
						total_carB.html(sum.toFixed(2))
						cookieCar[id]=cnt;
						$.cookie("cookieCar",JSON.stringify(cookieCar),{path:"/",expires: 7})
						sumFn();
						selectedFn()
					})
					
					//删除
					tab_con.on("click",".dele_car .dele",function(){
						var id=$(this).parent().parent().attr("data-id");
						if($(this).parent().parent().children().eq(0).find(".select_car").prop("checked")==true){
							$(this).parent().parent().children().eq(0).find(".select_car").prop("checked",false);
							sumFn();
							selectedFn()
						}
						delete cookieCar[id];
						$.cookie("cookieCar",JSON.stringify(cookieCar),{expires: 7,path: '/'})
						$(this).parent().parent().remove();
					})
					
					//单选
					tab_con.on("click",".select_car",function(){
						var flag=$(this).prop("checked");
						if(flag){
							seleLen++;
							sumFn();
							selectedFn()
						}else{
							seleLen--;
							sumFn();
							selectedFn()
							$("#top_allselectBtn").prop("checked",false);
							$(".all_select").prop("checked",false)
						}
						//判断单选是否全部选中
						if(seleLen==len){
							$("#top_allselectBtn").prop("checked",true);
							$(".all_select").prop("checked",true)
						}
					})
				}
				
			},300)	
				
			//去结算
			$("#go_money").click(function(){
				layer.msg("购买页暂未完成，待。。。",{icon:2});
			})
				
				
			})
		})
})