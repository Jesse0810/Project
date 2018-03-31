var userdialog;

var newTips;

$(function() {
	
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
	
	$(".options-list li").click(function(){
		$(".options-list li").removeClass("selected");
		if($(this).hasClass("selected")){
			$(this).removeClass("selected");
		}else{
			$(this).addClass("selected");
		}
	});
	
	$("#J_checkoutToPay").click(function(){
		var state = $(".J_wayList li.selected").attr("data-value");
		var addBtn = $(this);
		addBtn.addClass("btn-disabled");
		$.ajax({
			type:"post",
			url:"updateOrder.action",
			data:{
				"state":state
			},
			async:true,
			success:function(res){
				if(res.isSuccess == "true") {
					newTips.show({
						"result": "success",
						"tipsTxt": res.msg
					});
					setTimeout(function() {
						top.newTips.hide();
						addBtn.removeClass("btn-disabled");
						window.location.href = $("base").attr("href") + "Order.jsp";
					}, 2000);
				} else {
					newTips.show({
						"result": "fail",
						"tipsTxt": "操作失败：" + res.msg
					});
				
					//1.5秒后设置成默认样式
					setTimeout(function() {
						top.newTips.hide();
						addBtn.removeClass("btn-disabled");
						window.location.href = $("base").attr("href") + "Order.jsp";
					}, 1500);
				}
			}
		});
	});
	
});