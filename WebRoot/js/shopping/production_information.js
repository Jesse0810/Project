//var userdialog;

var goodsImg;

var newTips;
//
//var nav_menu;

$(function(){
	
	setCookie("loginUrl",encodeURIComponent(window.location.href));
	
	var top = $("#J_ProductBox").offset().top + $("#J_ProductBox").height();
	console.log(top);
	$(window).scroll(function(){
		if($(this).scrollTop()>top){
			$("#J_fixNarBar").addClass("nav_fix");
		}else{
			$("#J_fixNarBar").removeClass("nav_fix");
		}
	});
	
	goodsImg = new GoodsImg({
		"renderTo":"goodsImgSee"
	});
	
	newTips = new NewTips({
		"renderTo":"newTips"
	});
	
	new FillPDInformation({
		"goodsId":$("base").attr("data-goodsid"),
		"dataSource":"queryGoodsById.action",
		"renderTo":"sildeImage",
		"width":450,
		"height":450,
		"onClick":function(obj){
			goodsImg.show(obj);	
		}
	});
	
	new Tabs({
		"renderTo": "userTabs",
		"onClick": function(obj) {
			
		}
	});
	
	
});