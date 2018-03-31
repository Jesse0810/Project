//原型
function Tips(args){
	
	//调用初始化方法
	this.init(args);
}

//实例化成员（属性/方法）
Tips.prototype.init = function(args){
	var _ = this;
	_.renderTo = $("#"+args.renderTo);
	
};
//提示组件显示动画
Tips.prototype.show = function(obj){
	var _ = this;
	//切换别景色
	_.renderTo.removeClass("errorTips");
	_.renderTo.removeClass("successTips");
	_.renderTo.addClass(obj.addClass);
	
	//切换显示信息
	_.renderTo.text(obj.tipsTxt);
	//动画效果
	_.renderTo.removeClass("hidden").css({
		"opacity":0
//		"margin-left":0-_.renderTo.innerWidth()/2
	});
	//延迟1毫秒让下拉框显示（重绘和回流）
	setTimeout(function(){
		$(_.renderTo).css({
			"opacity":"1",
			"top":"4em"
		});
	},50);
};
//提示组件隐藏动画
Tips.prototype.hide = function(){
	var _ = this;
	//让tips变透明
	_.renderTo.css({
		"opacity":"0",
		"top":"3em"
	});
	//tips消失
	setTimeout(function(){
		_.renderTo.addClass("hidden");
	},250);
	
	
};





