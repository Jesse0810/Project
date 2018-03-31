function OrderTabs(args){
	try{
		//异常操作
		if( !args.renderTo )
			throw "缺少必要参数，请查看renderTo";
	}catch(e){
		alert(e);
	}
	
	this.init(args);
}

OrderTabs.prototype.init = function(args){
	var _ = this;
	_.renderTo = args.renderTo;
	//点击事件
	_.onClick = args.onClick === undefined ? function(){} : args.onClick;
	_.build();

};

OrderTabs.prototype.build = function(){
	var _ = this;
	
	_.order_option = $(".order-option");
	
	_.itemHover = $("<div id='itemHover'></div>").appendTo(_.order_option);
	_.itemSelect = $("<div id='itemSelect'></div>").appendTo(_.order_option);
	
	_.bindEvent();
};

OrderTabs.prototype.bindEvent = function(){
	var _ = this;
	
	$(_.order_option).mouseover(function(){
		$("#itemHover").css("opacity",1);
	}).mouseout(function(){
		$("#itemHover").css("opacity",0);
	});
	
	_.order_option.find("li").mouseenter(function(){
		_.itemHover.width($(this).width()+"px"); 
		if(isIELow()){
			_.itemHover.animate({
				"left":($(this).position().left+20)+"px"
			},250);
		}else{
			_.itemHover.css("left",($(this).position().left+20)+"px");
		}	
		
	}).click(function(){		
		_.select(this);
	});	
	
};

OrderTabs.prototype.select = function(obj){
	var _ = this;
	_.itemSelect.width($(obj).width()+"px");
	if(isIELow()){
		_.itemSelect.animate({
			"left":($(obj).position().left+20)+"px"
		},250);
	}else{
		_.itemSelect.css("left",($(obj).position().left+20)+"px");
	}	
	
	_.order_option.find("li").removeClass("active");
	$(obj).addClass("active");
	var state = $(obj).attr("data-state");
	
	top.fillOrder.reload(5,1,state);
	
	
};