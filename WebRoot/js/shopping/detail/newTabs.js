class Tabs{
	constructor(args) {
	    this.init(args);
	}
	
	init(args){
		var _ = this;
		_.renderTo = args.renderTo;
		//点击事件
		_.onClick = args.onClick === undefined ? function(){} : args.onClick;
		_.build();
	}
	
	build(){
		var _ = this;
		
		_.userTabs = $("#"+_.renderTo);
	
		_.tabs = _.userTabs.find(".Tabs");
	
		_.menu = _.userTabs.find(".Tabs_menu");
		
		$(".Tabs_option:first").addClass("selected");
		$(".Tabs_content:first").addClass("show");
		_.itemHover = $("<div id='itemHover'></div>").appendTo(_.tabs);
		_.itemSelect = $("<div id='itemSelect'></div>").appendTo(_.tabs);
		
		_.bindEvent();
	}
	
	bindEvent(){
		var _ = this;
	
		$(_.menu).mouseover(function(){
			$("#itemHover").css("opacity",1);
		}).mouseout(function(){
			$("#itemHover").css("opacity",0);
		});
		
		_.menu.find(".Tabs_option").mouseenter(function(){
			_.itemHover.width(($(this).width()+48)+"px"); 
			_.itemHover.css("left",$(this).position().left+"px");	
			
		}).click(function(){		
			_.select(this);
			_.onClick({
				"id":$(this).attr("key"),
				"name":$(this).text()
			});
		});	
	}
	
	select(obj){
		var _ = this;
		_.itemSelect.width(($(obj).width()+48)+"px");
		_.itemSelect.css("left",$(obj).position().left+"px");	
		
		$(".Tabs_option").removeClass("selected");
		$(obj).addClass("selected");
		
		var index = $(obj).index();
		
		$(".Tabs_content").removeClass("show");
		$(".Tabs_content").eq(index).addClass("show");
	}
};

