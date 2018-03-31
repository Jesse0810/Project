function Dialog(args){
	//调用初始化事件
	this.init(args);
}

//实例化成员（属性/方法）
Dialog.prototype.init = function(args){
	//实例化参数
	var _ = this;
	_.renderTo = $("#"+args.renderTo);
};

//创建页面元素
Dialog.prototype.build = function(){
	var _ = this;
	//每次重建dialog组建都先清空内部内容
	_.renderTo.html("");
	//添加提示的头部盒子
	_.titleBar = $("<div id='titleBar'></div>").appendTo(_.renderTo);
	//添加头部提示信息
	_.titleTxt = $("<div id='titleTxt'></div>").appendTo(_.titleBar);
	//添加关闭弹窗的按钮
	_.dialogExit = $("<div id='dialogExit'><i class='iconfont icon-guanbi' ></i></div>").appendTo(_.titleBar);
//	//判断是否是删除
//	if(_.confirm){
//		//生成删除界面
//		_.content = $("<div id='content'></div>").appendTo(_.renderTo);
//		//生成存放提示信息的盒子
//		_.conTitle = $("<div id='conTitle'></div>").appendTo(_.content);
//		//生成垃圾桶小图标
//		_.icon = $("<i class='fa fa-trash trash' aria-hidden='true'></i>").appendTo(_.conTitle);
//		//生成删除提示信息
//		_.conTxt = $("<div id='conTxt'></div>").appendTo(_.conTitle);
//		//生成确认删除按钮
//		_.btnList = $("<div id='btnList'></div>").appendTo(_.content);
//		//生成确定按钮
//		_.btnOK = $("<input id='btn_register' type='button' value='确定'  />").appendTo(_.btnList);
//		//生成取消按钮
//		_.btnNO = $("<input id='' type='button' value='取消'  />").appendTo(_.btnList);
//	
//	}else{
//		//添加/修改
		_.frameDialog = $("<iframe id='frameDialog' src='' frameborder='0'></iframe>").appendTo(_.renderTo);
//	}

	//判断黑色背景朦层是否存在
	if(!_.renderTo.next().hasClass("dialogHide")){
		//添加背景朦层
		_.dialogHide = $("<div class='dialogHide hidden' id='dialogHide'></div>").insertAfter(_.renderTo);
	}
	
	_.dialogHide.height($(document).height());
	
	_.bindEvent();

};
//绑定注册事件
Dialog.prototype.bindEvent = function(){
	var _ = this;
	//关闭按钮点击事件
	_.dialogExit.click(function(){
		_.hide();
	});
};

//弹出层显示
Dialog.prototype.show = function(obj){
	var _= this;
	//直接获取对象传过来的confirm，添加到组件中
	
	//根据传过来的width和height 定位弹出层
	_.renderTo.css({
		"width":obj.dialogWidth+"em",
		"height":obj.dialogHeight+"em",
		"margin-left":-(obj.dialogWidth/2)+"em",
		"margin-top":-(obj.dialogHeight/2)+"em",
	});
	//创建弹出层
	_.build();
	
	//修改对话框标题
	_.titleTxt.text(obj.title);
	//修改对话框中 内嵌页面的高度
	$("#frameDialog").css("height",(obj.dialogHeight-3)+"em");
	//修改对话框嵌套页面
	_.frameDialog.attr("src",obj.managerUrl);
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
				"transform":"rotateY(0deg)"
			});
			_.dialogHide.css({
				"opacity":"0.5"
			});
			
		},50);
	}
	var iframe =  _.frameDialog[0];
	if (isIELow()) {
	  iframe.onreadystatechange = function(){
	    if(iframe.readyState == "loaded" || iframe.readyState == "complete"){
	      iframe.contentWindow.operateUse({
		    	"dialogType":obj.dialogType,
		    	"columns":obj.columns,
		    	"text":obj.text
		    });
	    }
	  };
	} else {
	  iframe.onload = function(){
	    iframe.contentWindow.operateUse({
	    	"dialogType":obj.dialogType,
	    	"columns":obj.columns,
	    	"text":obj.text
	    });
	  };
	}
};
//弹出层关闭
Dialog.prototype.hide = function(){
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
			"transform":"rotateY(80deg)"
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










