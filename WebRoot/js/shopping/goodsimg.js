function GoodsImg(args){
	//调用初始化事件
	this.init(args);
}

//实例化成员（属性/方法）
GoodsImg.prototype.init = function(args){
	//实例化参数
	var _ = this;
	_.imgsrc = "";
	_.renderTo = $("#"+args.renderTo);
};

//创建页面元素
GoodsImg.prototype.build = function(){
	var _ = this;
//	每次重建dialog组建都先清空内部内容
	_.renderTo.html("");
////	添加提示的头部盒子
//	_.titleBar = $("<div id='titleBar'></div>").appendTo(_.renderTo);
////	//添加头部提示信息
////	_.titleTxt = $("<div id='titleTxt'></div>").appendTo(_.titleBar);
	//添加关闭弹窗的按钮
	_.goodsImg = $("<img src='"+_.imgsrc+"' />").appendTo(_.renderTo);
	_.dialogExit = $("<div id='dialogExit'><i class='iconfont icon-guanbi' ></i></div>").appendTo(_.renderTo);

	//判断黑色背景朦层是否存在
	if(!_.renderTo.next().hasClass("goodsImgDialogHide")){
		//添加背景朦层
		_.dialogHide = $("<div class='goodsImgDialogHide hidden' id='goodsImgDialogHide'></div>").insertAfter(_.renderTo);
	}
	_.dialogHide.height($(document).height());
	
	_.bindEvent();

};
//绑定注册事件
GoodsImg.prototype.bindEvent = function(){
	var _ = this;
	//关闭按钮点击事件
	_.dialogExit.click(function(){
		_.hide();
	});
//	_.renderTo.click(function(){
//		_.hide();
//	});
};

//弹出层显示
GoodsImg.prototype.show = function(obj){
	var _ = this;
	if(obj.naturalWidth) {
		//		　　 HTML5 browsers			　　
		var w = obj.naturalWidth;
		var h = obj.naturalHeight;
		if(w > 600) {
			h = 600 * (h / w);
			w = 600;
		}
		if(h > 500) {
			w = 500 * (w / h);
			h = 500;
		}
		//			console.log(w+":"+h);
		_.showResult({
			"src": obj.src,
			"width": w,
			"height": h
		});
	} else {//ie8
		var nImg = new Image();
		nImg.onload = function() {
			var w = nImg.width;
			var h = nImg.height;
			if(w > 600) {
				h = 600 * (h / w);
				w = 600;
			}
			if(h > 500) {
				w = 500 * (w / h);
				h = 500;
			}
			console.log(w + "  " + h);
			_.showResult({
				"src": nImg.src,
				"width": w,
				"height": h
			});
		}
		nImg.src = obj.src;
	}
};

GoodsImg.prototype.showResult = function(obj){
	var _= this;
	
	_.renderTo.css({
		"width":obj.width+"px",
		"height":obj.height+"px",
		"margin-left":-(obj.width/2)+"px",
		"margin-top":-(obj.height/2)+"px",
	});
	
	_.imgsrc = obj.src;
	//创建弹出层
	_.build();
	
//	//修改对话框标题
//	_.titleTxt.text(obj.title);
//	//修改对话框中 内嵌页面的高度
//	$("#frameDialog").css("height",(obj.dialogHeight-3)+"em");
//	//修改对话框嵌套页面
//	_.frameDialog.attr("src",obj.managerUrl);
	//修改对话框的隐藏属性
	_.renderTo.removeClass("hidden").css("opacity","0");
	_.dialogHide.removeClass("hidden").css("opacity","0");
	//50毫秒后给弹出层以及黑色背景加上动画特效 兼容IE8 
	if(isIELow()){
		setTimeout(function(){
			_.renderTo.animate({
				"opacity":"1"
			},250);
			
			_.dialogHide.animate({
				"opacity":"0.5"
			},250);
			
		},50);
		
	}else{
		//对话框添加transition属性
		_.renderTo.css("transition","all 250ms");
		//背景朦层添加transition属性
		_.dialogHide.css("transition","all 250ms");
		setTimeout(function(){
			_.renderTo.css({
				"opacity":"1",
				"transform":"skew(180deg,180deg)"
			});
			_.dialogHide.css({
				"opacity":"0.5"
			});
			
		},50);
	}
};
//弹出层关闭
GoodsImg.prototype.hide = function(){
	var _= this;
	//给弹出层以及黑色背景加上动画特效 兼容IE8
	if(isIELow()){
		_.renderTo.animate({
			"opacity":"0"
		},250);
		
		_.dialogHide.animate({
			"opacity":"0"
		},250);
	}else{		
		_.renderTo.css({
			"opacity":"0",
			"transform":"skew(10deg,10deg)"
		});
		_.dialogHide.css({
			"opacity":"0"
		});
	}
	//50毫秒之后给弹出层以及黑色背景加上隐藏样式
	setTimeout(function(){
		_.renderTo.addClass("hidden");
		_.dialogHide.addClass("hidden");
	},50);
};










