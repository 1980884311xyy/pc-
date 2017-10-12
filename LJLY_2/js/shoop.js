define(["jquery", "cookie", 'pagination', "swiper"],
	function($, cookie, pagination, swiper) {
		function shoopFn(url, cont) {
			//每页的分页
			var shoop = $(".shoop");
			$.ajax({
				type: "get",
				url: url,
				async: true,
				dataType: 'json',
				success: function(data) {
					$(".page").pagination({
						showData: cont,
						//超过五页就会出现首页。尾页
						pageCount: Math.ceil(data.length / cont),
						current: 1,
						keepShowPN: true,
						coping: true,
						isHide: false,
						homePage: '首页',
						prevContent: '上一页',
						nextContent: '下一页',
						endPage: '末页',
						callback: function(api) {
							var n = api.getCurrent();
							dataparse(n - 1, this.showData);
							smallSrcFn(n - 1, this.showData)
						}
					})
					dataparse(0, cont);
					smallSrcFn(0, cont);
					//给所有的第一个li添加active
					$(".smallPic").on("click", "li", function() {
						var src = $(this).children().eq(0).attr("src");
						$(this).parent().parent().prev().children().eq(0).attr("src", src);
						$(this).addClass("active").siblings().removeClass("active");
					})

					function dataparse(n, showData) {
						var str = '';
						for (var i = n * showData; i < Math.min(data.length, (n + 1) * showData); i++) {
							str += '<dl data-id=' + data[i].id + '><dt><img src=' + data[i].src + '><div class="collection">收藏</div></dt>' +
								'<dd><ul class="smallPic"></ul>' +
								'<p><span class="price">' + data[i].price + '</span>' +
								'<span>销量：' + data[i].sales + '</span>' +
								'<a href="javascript:void(0)" class="car"></a>' +
								'</p><p><a href="##">' + data[i].title + '</a></p>' +
								'<p>累计销量<span>' + data[i].sales + '</span></p></dd></dl>';
						}
						shoop.html(str);
					}

					function smallSrcFn(n, showData) {
						var smallPic = $(".smallPic");
						for (var i = n * showData; i < Math.min(data.length, (n + 1) * showData); i++) {
							//判断有几个li，就创建几个
							var str1 = '';
							for (var j = 0; j < data[i].smallSrc.length; j++) {
								str1 += '<li><img src=' + data[i].smallSrc[j] + '></li>';
							}
							smallPic.eq(i - n * showData).html(str1);
						}
					}
				}
			})
		}

		function swiperFn() {
			var wrap = $("#wrap");
			var swiper_slide = wrap.find(".swiper-slide");
			if (swiper_slide.length <= 2) {
				return;
			} else {
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
			}
		}
		//给当前页的导航添加active样式 index 是li的下标
		function isActiveFn(index){
			var firsetLi=$(".guide ul li").eq(index);
			firsetLi.attr("class","active").siblings().attr("class","");
		}
		
		//登录状态
		function iscookieStatus() {
			var username = $.cookie("loginstatus");
			if ($.cookie("loginstatus")) {
				$("header #status").html('<span>欢迎你：' + username + '</span><a href="index.html">会员中心</a>|<a href="##" id="exit">退出</a>')
			}
		}
		//点击退出，删除loginstatus cookie;
		function deleCookie() {
			$("header #status #exit").click(function() {
				//删除cookie
				$.cookie("loginstatus", null, {
					expires: -1,
					path: "/"
				});
				$("header #status").html('<a href="html/login.html">登录</a>|<a href="html/register.html">免费注册</a>')
			})
		}
		//点击立即购买，检测是否可以立即购买
		function isNowBuy() {
			var nowBuy = $(".buy-btn #nowBuy");
			nowBuy.click(function() {
				if ($.cookie("loginstatus")) {
					//跳转到购买页 购买页暂未完成
					alert("购买页暂未完成")
				} else {
					alert("请先登录");
					location.href = "../html/login.html"
				}
			})
		}
		//详情页数量加减
		function changeCount() {
			var addbtn = $(".count #add");
			var reduce = $(".count #reduce");
			var cnt = $(".count #cnt");
			var total = $(".totalSum #total");
			var prePrice = Number($(".jiage .price b").html().substr(1));

			var sum = 0;
			//var sumobjtxt=parseFloat(sumobj.html().substr(1));
			//加
			addbtn.click(function() {
					var cnttxt = Number(cnt.val());
					cnttxt++;
					cnt.val(cnttxt)
					sum = (cnttxt * prePrice);
					total.html(sum.toFixed(2))
				})
				//减
			reduce.click(function() {
				var cnttxt = Number(cnt.val());
				cnttxt--;
				if (cnttxt <= 1) {
					cnttxt = 1;
				}
				cnt.val(cnttxt)
				sum = (cnttxt * prePrice);
				total.html(sum.toFixed(2))
			})
		}
		//判断是否存在products_id cookie;
		function isproducts_id(url) {
//			var id = $.cookie("products_id");
			/*var id = location.search;
			console.log(id);*/
			var reg = /products_id=(\w*)/g;
			var result = reg.exec(location.search)
			var id = result[1];
			var select = $(".select");
			$.ajax({
				type: "get",
				url: url,
				dataType: "json",
				success: function(data) {
					//console.log(data[0].small)
					for (let i = 0; i < data.length; i++) {
						if (data[i].id == id) {
							var len = data[i].small.length;
							var str = '';
							for (var j = 0; j < len; j++) {
								str += '<li><img src="' + data[i].small[j] + '" data-img="' + data[i].large[j] + '" width="83" height="88"/></li>'
							}
							select.html(str);
							$(".jqzoom .zoomImg").attr("src", data[i].small[0]);
							$(".zoom .bigimg img").attr("src", data[i].large[0]);
							$(".products_In .title").html(data[i].title);
							$(".price b").html(data[i].price);
							$(".sale span").html(data[i].sale);
							$(".introduce_detail img").attr("src", data[i].detail);
							$(".jqzoom").attr("data-id", id);
						}
					}
				}
			});
		}

		//点击商品跳转到详情页
		function goDetailFn(obj1, obj2, url) {
			obj1.on("click", obj2, function() {
				var id = $(this).attr("data-id");
				//console.log(id)
				/*$.cookie("products_id", id, {
					path: "/"
				});*/
				location.href = url + "?products_id=" + id;
			})
		}
		//购物车总数
		function carCount() {
			var cookieCar = JSON.parse($.cookie("cookieCar"));
			var sum = Number($("#car").html());
			for (var val in cookieCar) {
				sum += cookieCar[val]
			}
			$("#car").html(sum)
		}
		//点击我的购物车 跳转
		function goCarList(url1,url2){
			//判断用户是否登录、如果登录跳转到购物车页面
			//else 跳转登录页面
			$(".car").click(function(){
				if($.cookie("loginstatus")){
					location.href=url1;
				}else{
					alert("你未登录，请先登录...")
					location.href=url2;
				}
			})
			
		}
		return {
			shoopFn: shoopFn,
			swiperFn: swiperFn,
			iscookieStatus: iscookieStatus,
			deleCookie: deleCookie,
			isNowBuy: isNowBuy,
			changeCount: changeCount,
			isproducts_id: isproducts_id,
			goDetailFn: goDetailFn,
			carCount:carCount,
			goCarList:goCarList,
			isActiveFn:isActiveFn 
		}
	})