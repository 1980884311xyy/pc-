require(['config'], function() {
	require(["jquery", "cookie", "slick", "swiper", "base", "pagination", "shoop"],
		function($, cookie, slick, swiper, base, pagination, shoop) {
			shoop.swiperFn();
			setTimeout(function() {
				//给此页的导航添加 active
				shoop.isActiveFn(6);
				shoop.iscookieStatus();
				shoop.deleCookie();
				shoop.carCount();
				//点击我的购物车跳转
				shoop.goCarList("car.html","login.html")
				//ShowMap('坐标地址', '公司名称', '地址', '电话', '传真', '放大倍数');
				/*获得坐标 ：在坐标拾取器中获得*/
				ShowMap('104.083154,30.629567', '丽景兰园', '四川省成都市武侯区', '09887777','1232456546' ,'30');
				function getInfo(id) {
			        $.ajax({
			            type: "POST",
			            url: "WebUserControl/Contact/GetInfo.ashx",
			            cache: false,
			            async: false,
			            data: { ID: id },
			            success: function (data) {
			                data = eval(data);
			                var length = data.length;
			                if (length > 0) {
			                    ShowMap(data[0]["Image"], data[0]["NewsTitle"], data[0]["Address"], data[0]["Phone"], data[0]["NewsTags"], data[0]["NewsNum"]);
			                }
			            }
			        });
			    }
			    function ShowMap(zuobiao, name, addrsee, phone, chuanzhen, zoom) {
			        var arrzuobiao = zuobiao.split(',');
			        var map = new BMap.Map("allmap");
			        map.centerAndZoom(new BMap.Point(arrzuobiao[0], arrzuobiao[1]), zoom);
			        map.addControl(new BMap.NavigationControl());
			        var marker = new BMap.Marker(new BMap.Point(arrzuobiao[0], arrzuobiao[1]));
			        map.addOverlay(marker);
			        var infoWindow = new BMap.InfoWindow('<p style="color: #bf0008;font-size:14px;">' + name + '</p><p>地址：' + addrsee + '</p><p>电话：' + phone + '</p><p>传真：' + chuanzhen + '</p>');
			        marker.addEventListener("click", function () {
			            this.openInfoWindow(infoWindow);
			        });
			        marker.openInfoWindow(infoWindow);
			    }
				
			}, 300)
		})
})