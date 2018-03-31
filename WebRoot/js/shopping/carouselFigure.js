function CarouselFigure(args){
	this.init(args);
}

CarouselFigure.prototype.init = function(args){
	var _ = this;
	_.renderTo = args.renderTo;
	_.dataSource = args.dataSource;
	_.onClick = args.onClick === "undefined" ? function(){}:args.onClick;
	//初始化pageSize和pageNum
	if(args.postData){
		if(args.postData.pageSize == null){
			args.postData.pageSize = 5;
		}
		if(args.postData.pageNum == null){
			args.postData.pageNum = 1;
		}
	}else{
		args.postData = {
			"pageSize":5,
			"pageNum":1
		};
	}
	_.postData = args.postData;
	_.byDataSource();

};


CarouselFigure.prototype.byDataSource = function(){
	var _ = this;
	if(typeof(_.dataSource) == "string"){
		$.ajax({
			type:"post",
			url:_.dataSource,
			data:_.postData,
			async:true,
			success:function(msg){
				_.dataSource = msg;
				console.log(_.dataSource);
				_.build();
			}
		});
	}else{
		_.build();
	}	
};

CarouselFigure.prototype.build = function(){
	var _ = this;
	_.userTabs = $("#"+_.renderTo);

	_.main = $("<div class='CarouselFigure_main'></div>").appendTo(_.userTabs);
	
	_.picture_list = $("<ul class='picture' ></ul>").appendTo(_.main);
	
	_.control_list = $("<ul class='control' ></ul>").appendTo(_.main);
	
	$(_.dataSource.rows).each(function(index,item){
		
		var picture = $("<li class='picture_item' data-id='"+item.id+"' ><img src='"+
			item.slideImage+"' /></li>").appendTo(_.picture_list);
		
		var control = $("<li class='control_item' ></li>").appendTo(_.control_list);
				
	});
	
	_.btn_left = $("<div class='btn left' ></div>").appendTo(_.main);
	
	_.btn_right = $("<div class='btn right' ></div>").appendTo(_.main);
	
	$(".control_item:first").addClass("selected");
	var width = _.userTabs.width();
	//初始化固定宽度
	_.main.width(width);
	$(".CarouselFigure_main .picture_item").width(width);
	$(".CarouselFigure_main .picture_item img").width(width);
	_.picture_list.width(width*_.dataSource.total);
	
	_.bindEvent();
	
};

CarouselFigure.prototype.bindEvent = function(){	
	var _ = this;
	_.offset = $(".picture_item").width();
	_.index = 0;
	_.picture_rotate;
	_.judege = false;
	_.autorotate();
	
	$(_.control_list).find(".control_item").click(function(){
		_.index = $(this).index();
		_.rotate();
	});
	
	$(_.btn_left).click(function(){		
		if(_.index > 0){
			_.index--;
			console.log(_.index);
			_.rotate();
		}
	});
	
	$(_.btn_right).click(function(){		
		if(_.index < _.dataSource.total - 1){
			_.index++;
			console.log(_.index);
			_.rotate();
		}
	});
	
	$(_.main).mouseover(function(){
		$(_.btn_left).css({
			"left": "17em"
		});
		setTimeout(function(){
			$(_.btn_left).css({
				"opacity": 1
			});
		},50);
		$(_.btn_right).css({
			right: "1em"
		});
		clearInterval(_.picture_rotate);
	});
	
	$(_.main).mouseout(function(){
		$(_.btn_left).css({
			"left": "15em"
		});
		setTimeout(function(){
			$(_.btn_left).css({
				"opacity": 0
			});
		},50);
		$(_.btn_right).css({
			right: "-2em"
		});
		_.autorotate();
	});
	
	$(".picture_item").click(function(){		
		_.onClick({			
			"id":$(this).attr("data-id")
		});
	});
};

CarouselFigure.prototype.autorotate = function(){
	var _ = this;
	_.picture_rotate = setInterval(function(){
		
//		console.log(num);
		if(_.index == _.dataSource.total - 1) {
			_.judege = true;
		} else if(_.index == 0) {
			_.judege = false;
		}
		if(_.judege) {
			_.index--;
		} else {
			_.index++;
		}
		_.rotate();		
		
		
	},2500);
};

CarouselFigure.prototype.rotate = function(){
	var _ = this;
	$(".control_item").removeClass("selected");
	$(".control_item").eq(_.index).addClass("selected");
	
//	console.log(_.index);
	if(isIELow()) {
		$(".picture").animate({
			left: (0-_.index*_.offset) + "px"
		}, 1000);
	} else {
		$(".picture").css({
			left: (0-_.index*_.offset) + "px"
		});
	}
};
