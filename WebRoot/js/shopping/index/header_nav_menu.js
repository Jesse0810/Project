function HeaderNavMenu(args){
	this.init(args);	
}

HeaderNavMenu.prototype.init = function(args){
	var _ = this;
	_.renderTo = args.renderTo;
	
	_.userTabs = $("#"+_.renderTo);
};

HeaderNavMenu.prototype.byDataSource = function(){
	var _ = this;
	if(typeof(_.dataSource) == "string"){
		$.ajax({
			type:"post",
			url:_.dataSource,
			data:_.postData,
			async:true,
			success:function(msg){
				_.dataSource = msg;
				if(_.dataSource.rows.length==0){
					_.hide();
				}else{
					_.build();
				}				
			}
		});
	}else{
		if(_.dataSource.rows.length == 0) {
			_.hide();
		} else {
			_.build();
		}
	}
	
};

//创建页面元素
HeaderNavMenu.prototype.build = function(){
	var _ = this;
	
	var ul = _.userTabs.find(".children-list");
	
	ul.html("");
	
	$(_.dataSource.rows).each(function(index,item){
		var li = $("<li></li>").appendTo(ul);
		if(index == 0){
			li.addClass("first");
		}
		
		var figure = $("<div class='figure figure-thumb'></div>").appendTo(li);
		
		var picture = $("<a href='"+$("base").attr("href")+"production_information.jsp?id="+
			item.id+"' ><img src='image/goods/"+item.id+"/"+item.imgList[0].name+"' /></a>").appendTo(figure);
			
		var title = $("<div class='title' ><a href='"+$("base").attr("href")+"production_information.jsp?id="+
			item.id+"' >"+item.name+"</a></div>").appendTo(li);
		
		var price = $("<p class='price'>"+item.price+"元起</p>").appendTo(li);
	
	});
	
//	_.bindEvent();

};

HeaderNavMenu.prototype.show = function(obj){
	var _ = this;
	_.userTabs.removeClass("hidden");
	
	setTimeout(function(){
		_.userTabs.css({
			"transform": "scaleY(1)"
		});
	},1);
	
	
	
	
};

HeaderNavMenu.prototype.fill = function(obj){
	var _ = this;
	
	_.dataSource = obj.dataSource;	
	_.onClick = obj.onClick === "undefined" ? function(){}:obj.onClick;
	//初始化pageSize和pageNum
	if(obj.postData){
		if(obj.postData.pageSize == null){
			obj.postData.pageSize = 6;
		}
		if(obj.postData.pageNum == null){
			obj.postData.pageNum = 1;
		}
	}else{
		obj.postData = {
			"pageSize":6,
			"pageNum":1
		};
	}
	_.postData = obj.postData;
	_.byDataSource();
}

HeaderNavMenu.prototype.hide = function(){
	var _ = this;
	
	_.userTabs.css({
		"transform": "scaleY(0)"
	});
	
	setTimeout(function(){
		_.userTabs.addClass("hidden");
	},250);
	
};