require.config({
	baseUrl:"/",
	paths : {
		"jquery" : "./LJLY_2/lib/jquery-3.2.1.min",
		"cookie" : "./LJLY_2/lib/jquery.cookie",
		"swiper" : "./LJLY_2/lib/swiper/swiper.min",
		"slick" : "./LJLY_2/lib/slick/slick.min",
		"slick1" : "./LJLY_2/lib/slick/jquery-migrate",
		"base" : "./LJLY_2/js/base",
		"pagination" : "./LJLY_2/lib/pagination/jquery.pagination",
		"shoop" : "./LJLY_2/js/shoop",
		"layer" : "./LJLY_2/lib/layer/layer",
		//"baiduMap" : "./LJLY_2/lib/bidu-map/js/jquery.baiduMap.min"
	},
	shim : {
		"elevatezoom" : {
			deps : ["jquery"]
		},
		"baiduMap" : {
			deps : ["jquery"]
		},
		"slick":{
			deps : ["slick1"],
			deps : ["jquery"]
		},
		"pagination":{
			deps : ["jquery"]
		},
		"layer":{
			deps : ["jquery"]
		}
	}
});