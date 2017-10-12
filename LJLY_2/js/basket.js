require(['config'], function() {
	require(["jquery", "cookie", "slick", "swiper", "base", "pagination","shoop"],
		function($, cookie, slick, swiper,base, pagination,shoop) {
			shoop.shoopFn("../json/basket.json",30);
			shoop.swiperFn();
			setTimeout(function(){
				shoop.iscookieStatus();
				
				shoop.deleCookie();
				
				shoop.carCount();
				
				//给此页的导航添加 active
				shoop.isActiveFn(2);
				
				//点击我的购物车跳转
				shoop.goCarList("car.html","login.html")
			},300)
		})
})