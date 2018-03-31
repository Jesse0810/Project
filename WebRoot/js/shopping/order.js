var goodsImg;

var newTips;
//
var fillOrder;

$(function(){
	
	setCookie("loginUrl",encodeURIComponent(window.location.href));
	
	goodsImg = new GoodsImg({
		"renderTo":"goodsImgSee"
	});
	
	newTips = new NewTips({
		"renderTo":"newTips"
	});
	
	var orderState = $(".order-option").find("li.active").attr("data-state");
	
	
	
	fillOrder = new FillOrder({
		"renderTo": "J_orderList",
		"dataSource": "queryOrderForGrid.action",
		"state":orderState,
		"postData":{
			"pageSize":5,
			"pageNum":1
		},
		"onComplete":function(obj){
			new PageTurn({
				"renderTo": "pageTurn",
				"pageSize":obj.pageSize,
				"pageNum":obj.pageNum,
				"pageTotal":obj.pageTotal,
				"onClick": function(pageSize,pageNum) {
					$(window).scrollTop($(".order-list-content").offset().top);
					fillOrder.reload(pageSize,pageNum);
				}
			});
		}
	});
	
	new OrderTabs({
		"renderTo": "order_option"
	});
	
});
