//定义全局变量，接收对话框组件
var dialog;

var userdialog;

var goodsImg;

var tips;

$(function(){
	
	setCookie("loginUrl",encodeURIComponent(window.location.href));
	
	tips = new Tips({
		"renderTo":"tips"
	});
	
	new Menu({
		"renderTo": "MenuPage",
		"dataSource": [{
			"itemName": "用户管理",
			"icon":"&#xe60e;",
			"url": "manager/userManager.jsp"
		}, {
			"itemName": "商品管理",
			"icon":"&#xe60f;",
			"url": "manager/goodsManager.jsp"
		}, {
			"itemName": "商品类型管理",
			"icon":"&#xe635;",
			"url": "manager/typeManager.jsp"
//		}, {
//			"itemName": "订单管理",
//			"icon":"&#xe637;",
//			"url": "manager/orderManager.jsp"
//		}, {
//			"itemName": "购物车管理",
//			"icon":"&#xe63f;",
//			"url": "manager/cartManager.jsp"
//		}],
		}],
		"onClick": function(obj) {
			$("#rightIframe").attr("src", $(obj).attr("url"));
		}
	});
	
//	setIframeHeight($("#rightIframe")[0]);
//	$(window).resize(function(){
//		setIframeHeight($("#rightIframe")[0]);
//	});
	
	dialog = new Dialog({
		"renderTo":"dialog"
	});
	
	goodsImg = new GoodsImg({
		"renderTo":"goodsImgSee"
	});
	
	userdialog = new UserDialog({
		"renderTo":"userdialog"
	});
	
	
	
	
	$("#greet_time").text(Greet_time());
	
	//显示用户头像区域下拉菜单
	$(".personal_center .arrow,.personal_center .pc_menu").mouseover(function(){
		$(".pc_menu").addClass("active-menu");
	}).mouseout(function(){
		$(".pc_menu").removeClass("active-menu");
	});
	
	$(".personal_center .pc_menu").click(function(){
		
		$(".pc_menu").removeClass("active-menu");
	});
	
	
	$("#profile_photo").click(function(){
		top.goodsImg.show(this);
	});
	
	//修改密码按钮点击方法
	$("#mod_password").click(function(){
		//对话框显示
		top.userdialog.show({
			"title": "修改密码",
			"managerUrl": $(this).attr("data-url"),
			"dialogWidth": 28,
			"dialogHeight": 31,
			"confirm":false
		});
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
	
	window.setInterval("reinitIframe()", 200);	
	
});


//function getHeight(){
//	$("#rightIframe").css("height",document.body.scrollHeight-$("#head").height());
//}
//function setIframeHeight(iframe) {
//	if(iframe) {
//		var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
//		if(iframeWin.document.body) {
//			iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
//		}
//	}
//};
function reinitIframe(){
	var iframe = document.getElementById("rightIframe");
	try{
	var bHeight = iframe.contentWindow.document.body.scrollHeight;
	var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
	var height = Math.max(bHeight, dHeight);
	iframe.height = height;
	}catch (ex){}
}

