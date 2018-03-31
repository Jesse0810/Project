$(function(){
	
	setCookie("loginUrl",encodeURIComponent(window.location.href));
	
	new GoodsList({
		"renderTo": "more",
		"dataSource": "queryGoodsByPurchases.action",
		"postData":{
			"pageSize":10,
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
	
	var keyword = $("base").attr("data-keyword");
	
	var goodsList = new GoodsList_Search({
		"renderTo": "gooods_list",
		"dataSource": "queryGoodsForGrid.action",
		"postData":{
			"pageSize":12,
			"pageNum":1,
			"condition":" WHERE upper(G.NAME) LIKE upper('%"+
				keyword+"%') OR upper(T.NAME) LIKE upper('%"+
				keyword+"%') "
		},
		"mapping": {
			"key": "id",
			"value": ["imgList", "name", "title", "price"]
		},
		"onClick": function(obj) {
			top.location = $("base").attr("href")+"production_information.jsp?id="+obj.id;
		},
		"onComplete":function(obj){
			new PageTurn({
				"renderTo": "pageTurn",
				"pageSize":obj.pageSize,
				"pageNum":obj.pageNum,
				"pageTotal":obj.pageTotal,
				"onClick": function(pageSize,pageNum) {
					$(window).scrollTop($(".goods-list-box").offset().top);
					goodsList.reload(pageSize,pageNum);
				}
			});
		}
	});
//	
//	userdialog = new UserDialog({
//		"renderTo":"userdialog"
//	});
//	
//	nav_menu = new HeaderNavMenu({
//		"renderTo":"nav_menu"
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
//	$(".search-text").focus(function(){
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
});