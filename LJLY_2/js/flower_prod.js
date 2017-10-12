require(['config'], function() {
	require(["jquery", "cookie", "base", "shoop", "slick"],
		function($, cookie, base, shoop, slick) {
			setTimeout(function() {
				//给此页的导航添加 active
				shoop.isActiveFn(1);
				//判断登录状态
				shoop.iscookieStatus();
				shoop.deleCookie();
				//是否可以立即购买
				shoop.isNowBuy();
				//数量加减
				shoop.changeCount();
				//首页  判断是否存在products_id cookie;
				shoop.isproducts_id("../json/index_hot.json");
				shoop.isproducts_id("../json/show.json");
				shoop.isproducts_id("../json/guolan.json");
				shoop.isproducts_id("../json/opening.json");
				
				//鲜花页  判断是否存在products_id cookie;
				shoop.isproducts_id("../json/flower_hot.json");
				//shoop.isproducts_id("../json/flower_shoop.json");
				//鲜花果篮
				
				//放大镜
				/*function fdjFn(){
					$("#zoomImg").elevateZoom({
						tintColour:true,
						zoomWindowWidth:310,
						zoomWindowHeight:310,
						zoomWindowOffetx:20,
						tintColour:'#F9C882',
						borderSize:1
					});
				}*/

				//选项卡
				var ul = $(".zoom .select");
				ul.on("click", "li", function() {
					var middlesrc = $(this).find("img").attr("src");
					var largesrc = $(this).find("img").attr("data-img");
					$(".jqzoom").find(".zoomImg").attr("src", middlesrc);
					$(".bigimg").find("img").attr("src", largesrc)
					$(this).addClass("active").siblings().removeClass("active")		
				})
					//放大镜
				$(".jqzoom").mousemove(function(e) {
					var fk = $(".jqzoom .filter");
					var scrollT = $('body').scrollTop();
					var l = e.clientX - fk.outerWidth() / 2 - $(".jqzoom").offset().left;
					var t = e.clientY - fk.outerHeight() / 2 - $(".jqzoom").offset().top + scrollT;
					if (l > $(".jqzoom").outerWidth() - fk.outerWidth()) {
						l = $(".jqzoom").outerWidth() - fk.outerWidth();
					}
					if (l < 0) {
						l = 0;
					}
					if (t > $(".jqzoom").outerHeight() - fk.outerHeight()) {
						t = $(".jqzoom").outerHeight() - fk.outerHeight();
					}
					if (t < 0) {
						t = 0;
					}
					fk.css({
						"left": l,
						"top": t
					})
					$(".bigimg>img").css({
						"left": -2* l,
						"top": -2* t
					})
				})
				$(".jqzoom").mouseover(function(){
					$(".bigimg").css("display","block")
				})
				$(".jqzoom").mouseleave(function(){
					$(".bigimg").css("display","none")
				})
				//加载相关商品
				var relevant = $(".relevant");
				var everybodyDiv = $(".everybody div");
				var recommendDiv = $(".recommend div");

				productsFn(everybodyDiv, "../json/flower_hot.json", 3);
				productsFn(relevant, "../json/red_rose.json");
				products1Fn(recommendDiv, "../json/flower_hot.json", 5);
				//relevant轮播

				//设置relevant的宽
				setTimeout(function() {
					var dl = relevant.find("dl");
					//relevant.width((dl.eq(0).width()+40)*dl.length);
					relevant.slick({
						autoplay: true,
						arrows: true,
						slidesToScroll: 4,
						slidesToShow: 4,
						autoplaySpeed: 10000
					});
					relevant.mouseover(function() {
						$(".slick-slider button").show();
						$(".slick-slider button").css({
							"width": "30px",
							"height": "50px",
							"background": "rgba(0,0,0,0.4)",
							"z-index": 9999,
							"border-radius": "10px"
						})
						$(".slick-slider button").eq(0).css({
							"left": 10
						});
						$(".slick-slider button").eq(1).css({
							"right": 10
						});
					})
					relevant.mouseout(function() {
						$(".slick-slider button").hide();
					})
					
					//设置大图片的高度
					$(".introduce_detail").height($(".introduce_detail").find("img").height());
				}, 200)

				function productsFn(obj, url, len) {
					var str = '';
					$.get(url, function(data) {
						len ? len = len : len = data.length;
						for (var i = 0; i < len; i++) {
							str += '<dl>' +
								'<dt><img src=' + data[i].src + ' alt="" /></dt>' +
								'<dd>' +
								'<p>' + data[i].price + '</p>' +
								'<p><a href="##">' + data[i].title + '</a></p>' +
								'</dd>' +
								'</dl>'
						}
						obj.html(str);
					}, "json")
				}
				
				function products1Fn(obj, url, len) {
					var str = '';
					$.get(url, function(data) {
						len ? len = len : len = data.length;
						for (var i = 0; i < len; i++) {
							str += '<dl>' +
								'<dt><img src=' + data[i].src + ' alt="" /></dt>' +
								'<dd>' +
								'<p><a href="javascript:void(0)">' + data[i].title + '</a></p>' +
								'<p>' + data[i].price + '</p>' +
								'</dd>' +
								'</dl>'
						}
						obj.html(str);
					}, "json")
				}
				//点击加入购物车
				var cookie;
				if($.cookie("cookieCar")==undefined){
					cookie={};
				}else{
					cookie=JSON.parse($.cookie("cookieCar"));
				}
				$(".buy-btn #addCar").click(function(){
					//判断用户是否登录、如果登录跳转到购物车页面
					//else 跳转登录页面
					
					var id=$(".jqzoom").attr("data-id");
					var cookieCar=$.cookie("cookieCar");
					var cnt=Number($("#cnt").val());
					if(cookie[id]==undefined){
						cookie[id]=cnt;
					}else{
						cookie[id]=Number(cnt)+Number(cookie[id]);
					}
					//设置cookie
					$.cookie("cookieCar",JSON.stringify(cookie),{expires: 7,path:"/"})
					alert("该商品已成功加入购物车");
					var sum=Number($("#car").html());
					sum+=cnt; 
					$("#car").html(sum)
				})
				
				//购物车数量显示
				shoop.carCount();
				//点击我的购物车跳转
				shoop.goCarList("car.html","login.html")
			}, 300)
		})
})