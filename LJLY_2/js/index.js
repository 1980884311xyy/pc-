require(["config"], function() {
	require(["jquery", "cookie", "swiper", "slick","shoop"],
	function($, cookie, swiper, slick,shoop) {
		$(function() {
			//加载头部尾部
			$(".head").load("html/header.html");
			$(".foot").load("html/footer.html");
			$(".base").load("html/base.html");
			//轮播图
			var mySwiper = new Swiper('.swiper-container', {
				direction: 'horizontal',
				loop: true,
				autoplay: 3000,
				speed: 300,

				pagination: '.swiper-pagination',
				// 如果需要前进后退按钮
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',

			})

			//加载数据
			/*鲜花展示*/
			var show = $(".show");
			var str = '';
			$.ajax({
				type: "get",
				url: "json/show.json",
				async: true,
				dataType: "json",
				success: function(data) {
					for (var i = 0; i < data.length; i++) {
						str += '<dl data-id=' + data[i].id + '><dt><img src=' + data[i].src + '></dt>' +
							'<dd>' + data[i].title + '</dd></dl>';
					}
					show.html(str);
				}
			});
			
			setTimeout(function(){
				shoop.iscookieStatus();
				shoop.deleCookie();
			},100)
			
			
			//滚动距离
			$(document).scroll(function() {
				var scrooT = $(document).scrollTop();
				if (scrooT >= 800) {
					show.animate({
						"top": 0
					}, 1000);
				}
			})
			//hot
			var hot=$(".hot");
			$.ajax({
				type:"get",
				url:"json/index_hot.json",
				async:true,
				dataType:"json",
				success:function(data){
					var str='';
					str='<h6>热门款式推荐</h6>'+
						'<div>'+
							'<a href="javascript:void(0);" ><img src='+data[0].src+' data-id='+data[0].id+' title='+data[0].title+' data-price='+data[0].price+' /></a>'+
						'</div>'+
						'<div>'+
							'<a href="javascript:void(0);"><img src='+data[1].src+' data-id='+data[1].id+' title='+data[1].title+' data-price='+data[1].price+' /></a>'+
							'<a href="javascript:void(0);"><img src='+data[2].src+' data-id='+data[2].id+' title='+data[2].title+' data-price='+data[2].price+' /></a>'+
							'<a href="javascript:void(0);"><img src='+data[3].src+' data-id='+data[3].id+' title='+data[3].title+' data-price='+data[3].price+' /></a>'+
							'<a href="javascript:void(0);"><img src='+data[4].src+' data-id='+data[4].id+' title='+data[4].title+' data-price='+data[4].price+' /></a>'+
						'</div>'+
						'<div>'+
							'<a href="javascript:void(0);"><img src='+data[5].src+' data-id='+data[5].id+' title='+data[5].title+' data-price='+data[5].price+' /></a>'+
						'</div>'
						hot.html(str);
				}
				
			});
			
			//鲜花果篮
			var basket_show = $(".basket_show");
			var str1 = '';
			$.ajax({
				type: "get",
				url: "json/guolan.json",
				async: true,
				success: function(data) {
					for (var i = 0; i < data.length; i++) {
						str1 += '<dl data-id=' + data[i].id + '>' +
							'<dt><img src=' + data[i].src + '></dt>' +
							'<dd>' +
							'<p class="price">' + data[i].price + '</p>' +
							'<p class="title"><a href="##">' + (data[i].title) + '</a></p>' +
							'</dd>' +
							'</dl>';
					}
					basket_show.html(str1);
					basket_show.slick({
						autoplay: true,
						slidesToShow: 4
					});
				}
			});

			//开业花篮
			var opening_show = $(".opening_show");
			var str2 = '';
			$.ajax({
				type: "get",
				url: "json/opening.json",
				async: true,
				success: function(data) {
					for (var i = 0; i < data.length; i++) {
						str2 += '<dl data-id=' + data[i].id + '>' +
							'<dt><img src=' + data[i].src + '></dt>' +
							'<dd>' + data[i].title + '</dd>' +
							'</dl>';
					}
					opening_show.html(str2);
					opening_show.slick({
						autoplay: true,
						slidesToShow: 4
					})
				}
			});
		});
		setTimeout(function(){
			$(document).ready(function(){
				//分享到
				var shareF = {
					share: $(".share"),
					share_btn: $(".share #share_btn"),
					init: function() {
						var share_cont = $(".share .share_cont");
						var _this=this;
						this.share.mouseover(function(){
							share_cont.stop().animate({"width":250});
							_this.share_btn.stop().animate({"left":250});
							share_cont.css("display","block");
						})
						this.share.mouseout(function(){
							share_cont.stop().animate({"width":0});
							_this.share_btn.stop().animate({"left":0});
							share_cont.css("display","none");
						})
						
						//联系
						var contactN=$(".contactN");
						contactN.on("mouseover","li",function(){
							$(this).find("div").stop().animate({"left":-($(this).find("div")).width()});
							$(this).find("div").show();
						})
						
						contactN.on("mouseout","li",function(){
							$(this).find("div").stop().animate({"left":0});
							$(this).find("div").hide();
						})
						
						//up
						contactN.on("click",".up",function(){
							var scrooT=$(document).scrollTop();
							$('html,body').animate({scrollTop: scrooT-500}, 400);
						})
						//down
						contactN.on("click",".down",function(){
							var scrooT=$(document).scrollTop();
							$('html,body').stop().animate({scrollTop: scrooT+500}, 400);
						})
						//显示隐藏
						var toggle=0;
						$(".toggle").click(function(){
							 if(toggle%2==0){
							 	contactN.stop().animate({"right":-50});
								$(this).css("background","#858585 url(images/show.png) no-repeat 6px center")
							 }else{
							 	contactN.stop().animate({"right":0});
								$(this).css("background","#858585 url(images/hide.png) no-repeat 10px center")
							 	
							 }
							 toggle++;
							//contactN.toggle('slow')
						})
					}
				}
				shareF.init();
				var guideF={
					init:function(){
						$(".guide").on("click","a",function(){
						})
					}
				}
				guideF.init();
			})
			//给此页的导航添加 active
			shoop.isActiveFn(0);
			//点击商品跳转到详情页
			var hot=$(".hot");
			var show=$(".show");
			var basketbox=$(".basket .box");
			var openingbox=$(".opening .box");
			shoop.goDetailFn(hot,"div a img","html/flower_prod.html")
			shoop.goDetailFn(show,"dl","html/flower_prod.html")
			shoop.goDetailFn(basketbox,"dl","html/flower_prod.html")
			//shoop.goDetailFn(openingbox,"dl","html/flower_prod.html")
			
			shoop.carCount();
			//点击我的购物车跳转
				shoop.goCarList("html/car.html","html/login.html")
		},500)
		
	});
});
