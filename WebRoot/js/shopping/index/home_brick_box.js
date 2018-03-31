function BrickBox(args){
	try{
		//异常操作
		if( !args.renderTo )
			throw "缺少必要参数，请查看renderTo";
		if( !args.dataSource )	
			throw "缺少必要参数，dataSource";
	}catch(e){
		alert(e);
	}
	this.init(args);	
}

BrickBox.prototype.init = function(args){
	var _ = this;
	_.renderTo = args.renderTo;
	_.dataSource = args.dataSource;
	_.onClick = args.onClick === "undefined" ? function(){}:args.onClick;
	_.title = args.title === "undefined" ? "家电":args.title; 
	_.tab_list_message = args.tab_list === "undefined" ? [
		"热门",
		"电视影音",
		"电脑",
		"家居"
	]: args.tab_list;
	//初始化pageSize和pageNum
	if(args.postData){
		if(args.postData.pageSize == null){
			args.postData.pageSize = 10;
		}
		if(args.postData.pageNum == null){
			args.postData.pageNum = 1;
		}
	}else{
		args.postData = {
			"pageSize":10,
			"pageNum":1
		};
	}
	_.postData = args.postData;
	_.byDataSource();
};

BrickBox.prototype.byDataSource = function(){
	var _ = this;
	if(typeof(_.dataSource) == "string"){
		$.ajax({
			type:"post",
			url:_.dataSource,
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

//创建页面元素
BrickBox.prototype.build = function(){
	var _ = this;
	
	_.userTabs = $("#"+_.renderTo);
	
	var box_hd = $("<div class='box-hd' ><h2 class='title'>"+_.title+"</h2></div>").appendTo(_.userTabs);
	
	var tab_more = $("<div class='tab-more' ></div>").appendTo(_.userTabs);

	_.tab_list = $("<ul class='tab-list' ></ul>").appendTo(tab_more);
	
	$(_.tab_list_message).each(function(index,row){
		var li = $("<li>"+row+"</li>").appendTo(_.tab_list);
	});
	
	$(".tab-list li:first").addClass("tab-active");
	
	_.itemHover = $("<div id='itemHover'></div>").appendTo(tab_more);
	_.itemSelect = $("<div id='itemSelect'></div>").appendTo(tab_more);
	
	var box_bd = $("<div class='box-bd' ></div>").appendTo(_.userTabs);
	
	_.brick_promo_list = $("<img src='image/index/homeelec/xmad_15157563510002_VJwfD.jpg' data-id='695640E67E6047ABAA42F2538D5A03DC' class='brick-promo-list' />").appendTo(box_bd);
	
	var brick_list = $("<ul class='brick-list' ></ul>").appendTo(box_bd);
	
	
	$(_.dataSource.rows).each(function(index, row) {
		if(index < 7){
			var brick_item = $("<li class='brick-item brick-item-m' data-id='"+row.id+"' ></li>").appendTo(brick_list);

			var figure_img = $("<div class='figure-img' ></div>").appendTo(brick_item);
	
			var img = $("<img src='image/goods/"+row.id+"/"+ row.imgList[0].name + "' />").appendTo(figure_img);
		
			var name = $("<h3 class='title' >"+row["name"]+"</h3>").appendTo(brick_item);
		
			var title = $("<p class='desc' >"+row["title"]+"</p>").appendTo(brick_item);
		
			var price = $("<p class='price' ><span class='num' >"+row["price"]+"</span>元</p>").appendTo(brick_item);
		
			var review_wrapper = $("<div class='review-wrapper' >"+row["description"]+"</div>").appendTo(brick_item);
		
		}else if(index == 7){
			var brick_item = $("<li class='brick-item brick-item-s' data-id='"+row.id+"' ></li>").appendTo(brick_list);
			
			var figure_img = $("<div class='figure-img' ></div>").appendTo(brick_item);
	
			var img = $("<img src='image/goods/"+row.id+"/"+ row.imgList[0].name + "' />").appendTo(figure_img);
		
			var name = $("<h3 class='title' >"+row["name"]+"</h3>").appendTo(brick_item);
		
			var price = $("<p class='price' ><span class='num' >"+row["price"]+"</span>元</p>").appendTo(brick_item);
			
		}else{
			return;
		}				
	});
	var brick_item = $("<li class='brick-item brick-item-s' data-id='' ></li>").appendTo(brick_list);

	var figure_more = $("<div class='figure-more' ></div>").appendTo(brick_item);
	
	var img = $("<i class='iconfont' >&#xe719;</i>").appendTo(figure_more);
	
	var more = $("<p class='more' >浏览更多<small>热门</small></p>").appendTo(brick_item);
	
	_.bindEvent();

};

BrickBox.prototype.bindEvent = function(){
	var _ = this;
	
	$(".brick-promo-list,.brick-item").mouseover(function(){
		$(this).addClass("brick-item-active");
	}).mouseout(function(){
		$(this).removeClass("brick-item-active");
	}).click(function(){
		_.onClick({			
			"id":$(this).attr("data-id")
		});
	});
	
	_.tab_list.find("li").mouseenter(function(){
		_.itemHover.width($(this).width()+"px"); 
		if(isIELow()){
			_.itemHover.animate({
				"left":$(this).position().left+"px"
			},250);
		}else{
			_.itemHover.css("left",($(this).position().left+36)+"px");
		}	
		
	}).click(function(){		
		_.select(this);	
	});;
}

BrickBox.prototype.select = function(obj){
	var _ = this;
	_.itemSelect.width($(obj).width()+"px");
	if(isIELow()){
		_.itemSelect.animate({
			"left":$(obj).position().left+"px"
		},250);
	}else{
		_.itemSelect.css("left",($(obj).position().left+36)+"px");
	}	
	
	$(".tab-list li").removeClass("tab-active");
	$(obj).addClass("tab-active");	
	
};