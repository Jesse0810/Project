function GoodsList_Search(args){
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

GoodsList_Search.prototype.init = function(args){
	var _ = this;
	_.renderTo = args.renderTo;
	_.dataUrl = args.dataSource;
	_.dataSource = {};
	//点击事件
	_.onClick = args.onClick === undefined ? function(){} : args.onClick;
	//字段映射
	_.onComplete = args.onComplete === undefined ? function(){}:args.onComplete;
	_.mapping = args.mapping === undefined ? {
		"key":"key",
		"value":["picture","name","title","price"]
	}: args.mapping;
	if(args.postData){
		if(args.postData.pageSize == null){
			args.postData.pageSize = 12;
		}
		if(args.postData.pageNum == null){
			args.postData.pageNum = 1;
		}
	}else{
		args.postData = {
			"pageSize":12,
			"pageNum":1
		};
	}
	_.postData = args.postData;
	_.byDataSource();
};

GoodsList_Search.prototype.byDataSource = function(){
	var _ = this;
	if(typeof(_.dataUrl) == "string"){
		$.ajax({
			type:"post",
			url:_.dataUrl,
			data:_.postData,
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

GoodsList_Search.prototype.reload = function(pageSize,pageNum,condition){
	var _ = this;
	if(pageSize){
		_.postData.pageSize = pageSize;
	}
	if(pageNum){
		_.postData.pageNum = pageNum;
	}
	if(condition){
		_.postData.condition = condition;
	}
	_.byDataSource();
	
};

GoodsList_Search.prototype.build = function(){
	var _ = this;
	var goodslist = $("#"+_.renderTo);	
	var maxsize = 4;
	
	goodslist.html("");
	
	if(_.dataSource.total == 0){
		goodslist.html("<p class='empty'>抱歉，没有搜索到 相关的商品</p>");
		return;
	}
	
	
	$(".filter-list:eq(0)").html("<dt>分类：</dt><dd class='active'>全部</dd>");
	
	$(".filter-list:eq(1)").html("<dt>分类：</dt><dd class='active'>全部</dd>");
	
	var typeList = [];
	i = 0;
	$(_.dataSource.rows).each(function(index,item){
		
		var itemId = index%maxsize;
		if(itemId == 0){
			itemId +=" first";
		}else if(itemId == maxsize-1){
			itemId +=" end";
		}
		
		var good_item = $("<div class='list_wrap_search rainbow-item-"+itemId+"' key='"
			+item[_.mapping["key"]]+"' ></div>").appendTo(goodslist);
		
		var picture = $("<div class='list_picture' ></div>").appendTo(good_item);
		
		var img = $("<img src='image/goods/"+item[_.mapping["key"]]+"/"+item[_.mapping["value"][0]][0].name+"' />").appendTo(picture);
		
		var name = $("<p class='list_name' >"+item[_.mapping["value"][1]]+"</p>").appendTo(good_item);
		
//		var title = $("<p class='list_title' >"+decodeURIComponent(item[_.mapping["value"][2]].replace(/\+/g, '%20'))+"</p>").appendTo(good_item);
	
		var price = $("<p class='list_price' >"+item[_.mapping["value"][3]]+"元</p>").appendTo(good_item);
		
		var small_picture = $("<ul class='list_small_picture' ></ul>").appendTo(good_item);
		
		$(item[_.mapping["value"][0]]).each(function(index,column){
			var small_img = $("<li ><img src='image/goods/"+item[_.mapping["key"]]+"/"+
			column.name+"' /></li>").appendTo(small_picture);
		});
		
		var goods = $("<dd><a href='"+$("base").attr("href")+"production_information.jsp?id="+item[_.mapping["key"]]+"' >"+item[_.mapping["value"][1]]+"</a></dd>").appendTo($(".filter-list:eq(1)"));
		
		if($.inArray(item.typeName, typeList)==-1){
			typeList.push(item.typeName);
		}
		
	});
	
	for(var i = 0;i < typeList.length;i++){
		var type = $("<dd><a href='"+$("base").attr("href")+"Search.jsp?name="+typeList[i]+"' >"+typeList[i]+"</a></dd>").appendTo($(".filter-list:eq(0)"));
	}
	
	_.bindEvent();
};

GoodsList_Search.prototype.bindEvent = function(){
	var _ = this;
	
	_.onComplete({
		"pageNum":_.postData.pageNum,
		"pageSize":_.postData.pageSize,
		"pageTotal":Math.ceil( _.dataSource.total/_.postData.pageSize)
	});
	
	$(".list_small_picture").find("li").mouseover(function(){
		$(this).parent().parent().find(".list_picture img").attr("src",$(this).find("img").attr("src"));
	});
	
	$(".list_wrap_search").click(function(){		
		_.onClick({			
			"id":$(this).attr("key")
		});
	});
	
	$(".filter-list-wrap .more").click(function(){
		
		var list = $(this).prev();
		var num = Math.ceil(list.find("dd").length/6);
		if(list.hasClass("filter-list-row-"+num)){		
			list.removeClass("filter-list-row-"+num);
		}else{
			list.addClass("filter-list-row-"+num);
		}
		
	});
};