var userdialog;

var nav_menu;

$(function() {
		
	userdialog = new UserDialog({
		"renderTo":"userdialog"
	});
	
	nav_menu = new HeaderNavMenu({
		"renderTo":"nav_menu"
	});
	
	$(".site-topbar .user").mouseover(function(){
		$(".site-topbar .user-name").addClass("active-user");
		$(".site-topbar .user-menu").removeClass("hidden");
		if(isIELow()){
//			$(".site-topbar .user-menu").animate({
//				"opacity":1,
//				"top":"34px"
//			},250);			
		}else{
			setTimeout(function(){
				$(".site-topbar .user-menu").css({
					"opacity":1,
					"top":"34px"
				});
			},50);	
		}
		
	}).mouseout(function(){
		$(".site-topbar .user-name").removeClass("active-user");
		$(".site-topbar .user-menu").addClass("hidden");
		if(isIELow()){
//			$(".site-topbar .user-menu").animate({
//				"opacity":0,
//				"top":"0px"
//			},250);			
		}else{
			setTimeout(function(){
				$(".site-topbar .user-menu").css({
					"opacity":0,
					"top":"0px"
				});
			},50);
		}
	});
	
	$(".site-header").mouseover(function(e){
		var event = e || window.event; 
		var nav_item= event .target || event .srcElement; //获取document 对象的引用 
		var search_name = $(nav_item).attr("data-type");
		if($(nav_item).hasClass("nav-item")){
			nav_menu.show();
			nav_menu.fill({
				"dataSource":"queryGoodsForGrid.action",
				"postData":{
					"pageSize":6,
					"pageNum":1,
					"condition":" where T.NAME = '"+search_name+"' or G.NAME like '%"+search_name+"%' "
				},
				"onClick":function(obj){
					
				}
			});
		}
	});
	
	$(".header-nav-menu").mouseenter(function(){
		nav_menu.show();
	}).mouseleave(function(){
		nav_menu.hide();
	});
	
	
	$("#logout").click(function(){
		//对话框显示
		top.userdialog.show({
			"title": "注销当前用户",
			"confirm":true,
			"dialogWidth": 20,
			"dialogHeight": 10
		});
	});
	
	$(".cart-mini").mouseover(function(){
		if(!$(this).hasClass("topbar-cart-filled")){
			$(this).css({
				"color": "#FF6700",
				"background-color": "#fff"
			});
		}
	}).mouseout(function(){
		if(!$(this).hasClass("topbar-cart-filled")){
			$(this).css({
				"color": "#b0b0b0",
				"background-color": "#424242"
			});
		}
	});
	
	$("#search-text").focus(function(){
		$(this).prev().css("border-color","#FF6700");
	}).blur(function(){
		$(this).prev().css("border-color","#e0e0e0");
	}).keydown(function(event){
		
		//让回车键支持 登录
		if(event.keyCode == "13"){
			if($(this).val()==""){
				return;
			}
			location.href = $("base").attr("href")+"Search.jsp?name="+$(this).val();
		}
		
	});
	
	$(".search-btn").click(function(){
		if($("#search-text").val()==""){
			return;
		}
		location.href = $("base").attr("href")+"Search.jsp?name="+$("#search-text").val();
	});
	
//	$("li.picture_item,.list_wrap,li.brick-item").click(function(){
//		console.log($(this).attr("data-id"));
//	});
	
	
});
