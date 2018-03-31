define(["jquery","util"],function($,util) {
	function DDL(args){
		try{
			//异常操作
			if( !args.renderTo )
				throw "缺少必要参数，请查看renderTo";
			if( !args.dataSource )	
				throw "缺少必要参数，dataSource";
			if( !args.onClick )	
				throw "缺少必要参数，onClick";
		}catch(e){
			alert(e);
		}
		
		this.init(args);
	}
	
	DDL.prototype.init = function(args){
		var _ = this;
		_.renderTo = args.renderTo;
		_.dataSource = args.dataSource;
		//下拉方向，向上而是向下
		_.direction = args.direction === undefined ? "down" : args.direction;
		//预加载项
		_.preloadItem = args.preloadItem;
		//点击事件
		_.onClick = args.onClick === undefined ? function(){} : args.onClick;
		//默认加载项
		_.defaultSelect = args.defaultSelect;
		//字段映射
		_.mapping = args.mapping === undefined ? {
			"key":"key",
			"value":"value"
		}: args.mapping;
		_.byDataSource();
	};
	
	DDL.prototype.byDataSource = function(){
		var _ = this;
		if(typeof(_.dataSource) == "string"){
			$.ajax({
				type:"post",
				url:_.dataSource,
				async:true,
				success:function(msg){
					_.dataSource = msg;
					_.build();
				}
			});
		}else{
			_.build();
		}	
	};
	
	DDL.prototype.build = function(){
		var _ = this;
		_.ddlAdd = $("#"+_.renderTo);
		_.ddlTitle = $("<div class='title' ></div>").appendTo(_.ddlAdd);
		
		_.selectText = $("<div class='seText' >"+_.dataSource[0][_.mapping["value"]]+"</div>").appendTo(_.ddlTitle);
		
		var arrow = $("<div class='arrow"+_.direction+"' ></div>").appendTo(_.ddlTitle);
		
		_.selectList = $("<ul class='ddlList "+_.direction+"' ></ul>").appendTo(_.ddlAdd);
		
		if(_.preloadItem){
			_.dataSource =_.preloadItem.concat(_.dataSource);
		}
		
		if(_.direction == "up"){
			_.dataSource.reverse();
		}
		
		$(_.dataSource).each(function(index,item){
			var listItem = $("<li class='item' key='"+item[_.mapping["key"]]+"'>"+item[_.mapping["value"]]+"</li>").appendTo(_.selectList);
		});
		
		if(_.defaultSelect){
			_.select("li[key='"+_.defaultSelect+"']");
		}else{
			_.select("li:eq(0)");
		}
		
		_.bindEvent();
	};
	
	DDL.prototype.bindEvent = function(){
		var _ = this;
		
		_.ddlTitle.click(function(){
			if(_.selectList.hasClass("show")){
				_.hide();
			}else{
				_.show();
			}
		});
		
		_.selectList.find(".item").click(function(){
			_.select(this);
			_.onClick({
				"key":$(this).attr("key"),
				"value":$(this).text()
			});
			_.hide();
		});
	};
	
	DDL.prototype.show = function(){
		var _ = this;
		_.selectList.addClass("show");
		if(_.direction == "up"){
			if(util.isIELow()){
				setTimeout(function(){
					_.selectList.animate({
						"opacity":"1",
						"bottom":"2em"
					},250);
				},1);
			}else{
				setTimeout(function(){
					_.selectList.css({
						"opacity":"1",
						"bottom":"2em"
					});
				},1);
			}
		}else if(_.direction == "down"){
			if(util.isIELow()){
				setTimeout(function(){
					_.selectList.animate({
						"opacity":"1",
						"top":"2em"
					},250);
				},1);
			}else{
				setTimeout(function(){
					_.selectList.css({
						"opacity":"1",
						"top":"2em"
					});
				},1);
			}
		}
		
		
		
	};
	
	DDL.prototype.hide = function(){
		var _ = this;
		if(_.direction == "up"){
			if(util.isIELow()){
				_.selectList.animate({
					"opacity": "0",
					"bottom": "1em"
				},250);
			}else{
				_.selectList.css({
					"opacity": "0",
					"bottom": "1em"
				});
			}
		}else if(_.direction == "down"){
			if(util.isIELow()){
				_.selectList.animate({
					"opacity": "0",
					"top": "1em"
				},250);
			}else{
				_.selectList.css({
					"opacity": "0",
					"top": "1em"
				});
			}
		}
		
		
		setTimeout(function(){
			_.selectList.removeClass("show");
		},250);
	};
	
	DDL.prototype.select= function(li){
		var _ = this;
		//让所有li取消选中样式
		$("li",_.selectList).removeClass("itemSelect");
		//给当前选中的li添加选中样式
		$(li).addClass("itemSelect");
		//修改选中的文字
		_.selectText.text($(li)[0].innerText);
	};
	
	DDL.prototype.returnValue= function(li){
		var _ = this;
		
		var key = $("li.itemSelect",_.selectList).attr("key");
		var value = $("li.itemSelect",_.selectList).text();
		
		return {
			"key":key,
			"value":value
		};
	};
	
	return DDL;
	
});