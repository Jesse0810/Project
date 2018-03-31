//var userdialog;
//
//var nav_menu;

$(function() {

	setCookie("loginUrl",encodeURIComponent(window.location.href));

	new GoodsList({
		"renderTo": "more",
		"dataSource": "queryGoodsByPurchases.action",
		"postData":{
			"pageSize":5,
			"pageNum":1
		},
		"mapping": {
			"key": "id",
			"value": ["imgList", "name", "title", "price"]
		},
		"onClick": function(obj) {
			top.location = $("base").attr("href")+"production_information.jsp?id="+obj.id;
		}
	});
	
	new CarouselFigure({
		"renderTo": "slide",
		"dataSource":"queryGoodsBySlideImage.action",
		"onClick":function(obj){
			top.location = $("base").attr("href")+"production_information.jsp?id="+obj.id;
		}
	});
	
	new BrickBox({
		"renderTo":"homeelec",
		"dataSource":"queryGoodsForGrid.action",
		"postData":{
			"pageSize":10,
			"pageNum":1,
			"condition":" WHERE T.NAME = '出行' "
		},
		"title":"出行",
		"tab_list":[
			"热门",
			"电视影音",
			"电脑",
			"家居"
		],
		"onClick":function(obj){
			top.location = $("base").attr("href")+"production_information.jsp?id="+obj.id;
		}
	});
	
	new BrickBox({
		"renderTo":"smart",
		"dataSource":"queryGoodsForGrid.action",
		"postData":{
			"pageSize":10,
			"pageNum":1,
			"condition":" WHERE T.NAME = '手机' "
		},
		"title":"手机",
		"tab_list":[
			"热门",
			"出行",
			"健康",
			"酷玩",
			"路由器"
		],
		"onClick":function(obj){
			top.location = $("base").attr("href")+"production_information.jsp?id="+obj.id;
		}
	});
	
	new BrickBox({
		"renderTo":"match",
		"dataSource":"queryGoodsForGrid.action",
		"postData":{
			"pageSize":10,
			"pageNum":1,
			"condition":" WHERE T.NAME = '健康' "
		},
		"title":"健康",
		"tab_list":[
			"热门",
			"耳机音箱",
			"电源",
			"电池存储卡"
		],
		"onClick":function(obj){
			top.location = $("base").attr("href")+"production_information.jsp?id="+obj.id;
		}
	});
	
	new BrickBox({
		"renderTo":"accessories",
		"dataSource":"queryGoodsForGrid.action",
		"postData":{
			"pageSize":10,
			"pageNum":1,
			"condition":" WHERE T.NAME = '电视' "
		},
		"title":"电视",
		"tab_list":[
			"热门",
			"保护套",
			"贴膜",
			"其他配件"
		],
		"onClick":function(obj){
			top.location = $("base").attr("href")+"production_information.jsp?id="+obj.id;
		}
	});
	
	new BrickBox({
		"renderTo":"around",
		"dataSource":"queryGoodsForGrid.action",
		"postData":{
			"pageSize":10,
			"pageNum":1,
			"condition":" WHERE T.NAME = '智能硬件' "
		},
		"title":"智能硬件",
		"tab_list":[
			"热门",
			"出行",
			"居家",
			"生活周边",
			"箱包"
		],
		"onClick":function(obj){
			top.location = $("base").attr("href")+"production_information.jsp?id="+obj.id;
		}
	});
		
//	userdialog = new UserDialog({
//		"renderTo":"userdialog"
//	});
//	
//	nav_menu = new HeaderNavMenu({
//		"renderTo":"nav_menu"
//	});
//	
//	$(".site-topbar .user").mouseover(function(){
//		$(".site-topbar .user-name").addClass("active-user");
//		$(".site-topbar .user-menu").removeClass("hidden");
//		if(isIELow()){
//			$(".site-topbar .user-menu").animate({
//				"opacity":1,
//				"top":"34px"
//			},250);			
//		}else{
//			setTimeout(function(){
//				$(".site-topbar .user-menu").css({
//					"opacity":1,
//					"top":"34px"
//				});
//			},50);	
//		}
//		
//	}).mouseout(function(){
//		$(".site-topbar .user-name").removeClass("active-user");
//		$(".site-topbar .user-menu").addClass("hidden");
//		if(isIELow()){
//			$(".site-topbar .user-menu").animate({
//				"opacity":0,
//				"top":"0px"
//			},250);			
//		}else{
//			setTimeout(function(){
//				$(".site-topbar .user-menu").css({
//					"opacity":0,
//					"top":"0px"
//				});
//			},50);
//		}
//	});
//	
//	$(".site-header").mouseover(function(e){
//		var event = e || window.event; 
//		var nav_item= event .target || event .srcElement; //获取document 对象的引用 
//		var search_name = $(nav_item).attr("data-type");
//		if($(nav_item).hasClass("nav-item")){
//			nav_menu.show();
//			nav_menu.fill({
//				"dataSource":"queryGoodsForGridNotTotal.action",
//				"postData":{
//					"pageSize":6,
//					"pageNum":1,
//					"condition":" where TYPENAME = '"+search_name+"' or GNAME like '%"+search_name+"%' "
//				},
//				"onClick":function(obj){
//					
//				}
//			});
//		}
//	});
//	
//	$(".header-nav-menu").mouseenter(function(){
//		nav_menu.show();
//	}).mouseleave(function(){
//		nav_menu.hide();
//	});
//	
//	
//	$("#logout").click(function(){
//		//对话框显示
//		top.userdialog.show({
//			"title": "注销当前用户",
//			"confirm":true,
//			"dialogWidth": 20,
//			"dialogHeight": 10
//		});
//	});
//	
//	$(".cart-mini").mouseover(function(){
//		$(this).css({
//			"color": "#FF6700",
//			"background-color": "#fff"
//		});
//	}).mouseout(function(){
//		$(this).css({
//			"color": "#b0b0b0",
//			"background-color": "#424242"
//		});
//	});
//	
//	$("#search-text").focus(function(){
//		$(this).prev().css("border-color","#FF6700");
//	}).blur(function(){
//		$(this).prev().css("border-color","#e0e0e0");
//	}).keydown(function(event){
//		
//		//让回车键支持 登录
//		if(event.keyCode == "13"){
//			top.location = $("base").attr("href")+"Search.jsp?name="+$(this).val();
//		}
//		
//	});
//	
//	$(".search-btn").click(function(){
//		top.location = $("base").attr("href")+"Search.jsp?name="+$("#search-text").val();
//	});
//	
//	$("li.picture_item,.list_wrap,li.brick-item").click(function(){
//		console.log($(this).attr("data-id"));
//	});
	
	
});