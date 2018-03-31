function GoodsList(args){
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

GoodsList.prototype.init = function(args){
	var _ = this;
	_.renderTo = args.renderTo;
	_.dataSource = args.dataSource; 
	//点击事件
	_.onClick = args.onClick === undefined ? function(){} : args.onClick;
	//字段映射
	_.mapping = args.mapping === undefined ? {
		"key":"key",
		"value":["picture","name","title","price"]
	}: args.mapping;
	_.postData = args.postData === undefined ? {} : args.postData;
	_.byDataSource();
};

GoodsList.prototype.byDataSource = function(){
	var _ = this;
	if(typeof(_.dataSource) == "string"){
		$.ajax({
			type:"post",
			url:_.dataSource,
			async:true,
			data:_.postData,
			success:function(msg){
				_.dataSource = msg;
				_.build();
			}
		});
	}else{
		_.build();
	}	
};

GoodsList.prototype.build = function(){
	var _ = this;
	var goodslist = $("#"+_.renderTo);	
	var maxsize = 5;
	
	$(_.dataSource.rows).each(function(index,item){
		
		var itemId = index%maxsize;
		if(itemId == 0){
			itemId +=" first";
		}else if(itemId == maxsize-1){
			itemId +=" end";
		}
		
		var good_item = $("<div class='list_wrap rainbow-item-"+itemId+"' key='"
			+item[_.mapping["key"]]+"' ></div>").appendTo(goodslist);
		
		var picture = $("<div class='list_picture' ></div>").appendTo(good_item);
		
		var img = $("<img src='image/goods/"+item[_.mapping["key"]]+"/"+item[_.mapping["value"][0]][0].name+"' />").appendTo(picture);
		
		var name = $("<p class='list_name' >"+item[_.mapping["value"][1]]+"</p>").appendTo(good_item);
		
		var title = $("<p class='list_title' >"+item[_.mapping["value"][2]]+"</p>").appendTo(good_item);
	
		var price = $("<p class='list_price' >"+item[_.mapping["value"][3]]+"</p>").appendTo(good_item);
	});
	
	_.bindEvent();
};

GoodsList.prototype.bindEvent = function(){
	var _ = this;
	
	$(".list_wrap").click(function(){		
		_.onClick({			
			"id":$(this).attr("key")
		});
	});
};