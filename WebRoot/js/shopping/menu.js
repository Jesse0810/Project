function Menu(args){
	
	this.init(args);
}

//实例化成员（属性/方法）
Menu.prototype.init = function(args){
	this.renderTo = $("#"+args.renderTo);
	this.dataSource = args.dataSource;
	this.onClick = args.onClick;
	this.build();

};

//创建页面元素
Menu.prototype.build = function(){
	var _ = this;
	_.menuList = $("<ul class='menuList'></ul>").appendTo(_.renderTo);
	$(_.dataSource).each(function(index,item){
		var menuItem = $("<li class='menuItem' title='"+item["itemName"]+"' url='"+item["url"]+
		"'><i class='iconfont' >"+item["icon"]+"</i></li>").appendTo(_.menuList);
	});
	_.itemHover = $("<div id='itemHover' ></div>").appendTo(_.renderTo);
	_.itemSelect = $("<div id='itemSelect'></div>").appendTo(_.renderTo);
	
	//默认选中第一个
	_.select($("li:eq(0)",".menuList"))
	
	_.itemHover.height($(".menuList li").innerHeight());
	_.itemSelect.height($(".menuList li").innerHeight());
	
	_.bindEvent();
	
	
};
//绑定注册事件
Menu.prototype.bindEvent = function(){
	var _=this;
	
	$(_.menuList).mouseover(function(){
		$("#itemHover").css("opacity",1);
	}).mouseout(function(){
		$("#itemHover").css("opacity",0);
	});
	
	$("li",".menuList").mouseenter(function(){
		if(isIELow()){
			$("#itemHover").animate({
				"top":$(this).index()*$("#itemHover").height()+"px"
			},250);
		}else{
			$("#itemHover").css("top",$(this).index()*$("#itemHover").height()+"px");		
		}		
	}).click(function(){
		_.select(this);
		_.onClick({
			"url":$(this).attr("url")
		});
	});
	
	
	
	
};

Menu.prototype.select = function(obj){
	
	if(isIELow()) {
		$("#itemSelect").animate({
			"top": $(obj).index()*$("#itemSelect").height() + "px"
		}, 250);
	} else {
		$("#itemSelect").css("top",$(obj).index()*$("#itemSelect").height() +"px");
	}
	
	$("li",".menuList").removeClass("selectColor");
	$(obj).addClass("selectColor");
	
	
};












