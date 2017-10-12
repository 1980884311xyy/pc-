require(['config'], function() {
	require(["jquery", "cookie", "slick", "swiper", "base", "pagination","shoop"], function($, cookie, slick, swiper,base, pagination,shoop) {
		setTimeout(function(){
				shoop.iscookieStatus();
				shoop.deleCookie();
				//点击跳转详情页
				shoop.goDetailFn($(".content_f .hot"),"dl","flower_prod.html")
				shoop.goDetailFn($(".shoop"),"dl","flower_prod.html")	
				//给此页的导航添加 active
				shoop.isActiveFn(1);
				//点击我的购物车跳转
				shoop.goCarList("car.html","login.html")
		},300)
		var contentF = {
			content_f: $(".content_f"),
			init: function() {
				this.hotFn();
				this.shoopFn();
			},
			//加载hot
			hotFn: function() {
				var hot = this.content_f.find(".hot");
				$.ajax({
					type: "get",
					url: "../json/flower_hot.json",
					async: true,
					dataType: "json",
					success: function(data) {
						console.log(data[0].src)
						var str = '';
						for (var i = 0; i < data.length; i++) {
							str += '<dl data-id=' + data[i].id + '>' +
								'<dt><img src= ' + data[i].src + ' /></dt>' +
								'<dd>' +
								'<p>' + data[i].price + '</p>' +
								'<p><a href="##">' + data[i].title + '</a></p>' +
								'</dd>' +
								'</dl>'
						}
						hot.html(str);
					},
				});
			},
			//加载shoop
			shoopFn: function() {
				shoop.shoopFn('../json/flower_shoop.json',20)
			}
		}
		shoop.swiperFn();
		contentF.init();
		setTimeout(function(){
			shoop.carCount();
		},300)
		
	})
})
