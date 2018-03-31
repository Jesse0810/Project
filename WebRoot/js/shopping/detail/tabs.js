function Tabs(args){
	try{
		//异常操作
		if( !args.renderTo )
			throw "缺少必要参数，请查看renderTo";
	}catch(e){
		alert(e);
	}
	
	this.init(args);
}

Tabs.prototype.init = function(args){
	var _ = this;
	_.renderTo = args.renderTo;
	//点击事件
	_.onClick = args.onClick === undefined ? function(){} : args.onClick;
	_.build();

};

Tabs.prototype.build = function(){
	var _ = this;
	_.userTabs = $("#"+_.renderTo);
	
	_.tabs = _.userTabs.find(".Tabs");

	_.menu = _.userTabs.find(".Tabs_menu");
	
//	if(_.preloadItem){
//		_.dataSource =_.preloadItem.concat(_.dataSource);
//	}
//	
//	$(_.dataSource).each(function(index,item){
//		var option = $("<span class='Tabs_option' key='"+item[_.mapping["key"]]+"'>"
//			+item[_.mapping["value"]]+"</span>").appendTo(_.menu);
//		
//		var content = $("<div class='Tabs_content' key='"+item[_.mapping["key"]]+"'>"
//			+item[_.mapping["value"]]+"</div>").appendTo(_.tabs);
//	});
	
	$(".Tabs_option:first").addClass("selected");
	$(".Tabs_content:first").addClass("show");
	_.itemHover = $("<div id='itemHover'></div>").appendTo(_.tabs);
	_.itemSelect = $("<div id='itemSelect'></div>").appendTo(_.tabs);
	
	_.bindEvent();
};

Tabs.prototype.bindEvent = function(){
	var _ = this;
	
	$(_.menu).mouseover(function(){
		$("#itemHover").css("opacity",1);
	}).mouseout(function(){
		$("#itemHover").css("opacity",0);
	});
	
	_.menu.find(".Tabs_option").mouseenter(function(){
		_.itemHover.width(($(this).width()+48)+"px"); 
		if(isIELow()){
			_.itemHover.animate({
				"left":$(this).position().left+"px"
			},250);
		}else{
			_.itemHover.css("left",$(this).position().left+"px");
		}	
		
	}).click(function(){		
		_.select(this);
		_.onClick({
			"id":$(this).attr("key"),
			"name":$(this).text()
		});
	});	
	
};
Tabs.prototype.select = function(obj){
	var _ = this;
	_.itemSelect.width(($(obj).width()+48)+"px");
	if(isIELow()){
		_.itemSelect.animate({
			"left":$(obj).position().left+"px"
		},250);
	}else{
		_.itemSelect.css("left",$(obj).position().left+"px");
	}	
	
	$(".Tabs_option").removeClass("selected");
	$(obj).addClass("selected");
	
	var index = $(obj).index();
	
	$(".Tabs_content").removeClass("show");
	$(".Tabs_content").eq(index).addClass("show");
	
	
};