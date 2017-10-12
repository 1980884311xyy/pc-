require(['config'], function() {
	require(["jquery", "cookie", "slick", "swiper", "base", "pagination","shoop"],
		function($, cookie, slick, swiper,base, pagination,shoop) {
			shoop.shoopFn("../json/plants.json",20);
			shoop.swiperFn();
			setTimeout(function(){
				shoop.iscookieStatus();
				shoop.deleCookie();
				
				shoop.carCount();
				//给此页的导航添加 active
				shoop.isActiveFn(5);
			},300)
		})
})