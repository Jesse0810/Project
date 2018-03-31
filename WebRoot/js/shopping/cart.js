var userdialog;

var newTips;

$(function() {
	
	setCookie("loginUrl",encodeURIComponent(window.location.href));
	
	userdialog = new UserDialog({
		"renderTo":"userdialog"
	});
	
	$(".site-mini-header .user").mouseover(function(){
		$(".site-mini-header .user-name").addClass("active-user");
		$(".site-mini-header .user-menu").removeClass("hidden");
		if(isIELow()){
//			$(".site-mini-header .user-menu").animate({
//				"opacity":1,
//				"top":"34px"
//			},250);			
		}else{
			setTimeout(function(){
				$(".site-mini-header .user-menu").css({
					"opacity":1,
					"top":"34px"
				});
			},50);	
		}
		
	}).mouseout(function(){
		$(".site-mini-header .user-name").removeClass("active-user");
		$(".site-mini-header .user-menu").addClass("hidden");
		if(isIELow()){
//			$(".site-mini-header .user-menu").animate({
//				"opacity":0,
//				"top":"0px"
//			},250);			
		}else{
			setTimeout(function(){
				$(".site-mini-header .user-menu").css({
					"opacity":0,
					"top":"0px"
				});
			},50);
		}
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
	
	newTips = new NewTips({
		"renderTo":"newTips"
	});
	
	new FillCart({
		"queryUrl":"queryCartByUser.action",
		"updateUrl":"updateCartNum.action",
		"checkUrl":"checkCart.action",
		"checkOffsUrl":"checkOffCart.action",
		"delUrl":"deleteCartByUser.action",
		"submitUrl":"submitOrder.action",
		"renderTo":"cartTabs"
	});
	
});