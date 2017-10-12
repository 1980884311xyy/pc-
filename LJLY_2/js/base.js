require(['config'], function() {
	require(["jquery", "cookie", "slick", "swiper","shoop"], 
	function($, cookie, slick, swiper,shoop) {
		$(function() {
			$(".head").load("../html/header1.html");
			$(".foot").load("../html/footer.html");
			$(".base").load("../html/base.html");
		})

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
				
		})
	})
})

