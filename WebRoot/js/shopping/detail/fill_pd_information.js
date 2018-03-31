function FillPDInformation(args){
	try{
		//异常操作
		if( !args.goodsId )
			throw "缺少必要参数，请查看renderTo";
		if( !args.dataSource )	
			throw "缺少必要参数，dataSource";
	}catch(e){
		alert(e);
	}
	this.init(args);	
}

FillPDInformation.prototype.init = function(args){
	var _ = this;
	_.renderTo = args.renderTo;
	_.dataSource = args.dataSource;
	_.onClick = args.onClick === "undefined" ? function(){}:args.onClick;
	_.goodsId = args.goodsId;
	_.width = args.width;
	_.height = args.height;
	_.byDataSource();
};

FillPDInformation.prototype.byDataSource = function(){
	var _ = this;
	if(typeof(_.dataSource) == "string"){
		$.ajax({
			type:"post",
			url:_.dataSource,
			data:{
				"id":_.goodsId
			},
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
FillPDInformation.prototype.build = function(){
	var _ = this;
	if(!isIELow()){
		$("title").text(_.dataSource.name+" "+_.dataSource.title);
	}else{
		document.title = _.dataSource.name+" "+_.dataSource.title;
	}
	
	$(".J_proName").each(function(){
		$(this).html(_.dataSource.name+" "+_.dataSource.title);
	});
	
	$(".J_proName:last").html(_.dataSource.name);
	
	$("#J_desc").html(_.dataSource.description);
	
	$(".J_proPrice").html(_.dataSource.price+"元");
	
	$("#J_proList").find("li:first").html(_.dataSource.name+"<span>"+_.dataSource.price+"元</span>");
	$("#J_proList").find(".totlePrice").html("总计："+_.dataSource.price+"元");
	
	if(_.dataSource.stock > 0){
		$("#nostock_btn").addClass("hidden");
	}else{
		$("#addCart_btn").addClass("hidden");
	}
	
	//轮播图组件加载
	_.userTabs = $("#"+_.renderTo);
	_.main = $("<div class='CarouselFigure_pd'></div>").appendTo(_.userTabs);
	
	_.picture_list = $("<ul class='picture' ></ul>").appendTo(_.main);
	
	_.control_list = $("<ul class='control' ></ul>").appendTo(_.userTabs);
	
	_.total = _.dataSource.imgList.length;
	
	$(_.dataSource.imgList).each(function(index,item){
		
		var picture = $("<li class='picture_item' ><img src='image/goods/"+item.goodsId
			+"/"+item.name+"' /></li>").appendTo(_.picture_list);
		
		var control = $("<li class='control_item' ></li>").appendTo(_.control_list);
		
		if(index == 0){
			control.addClass("first");
		}	
		
		var detail_img = $("<img src='image/goods/"+item.goodsId
			+"/"+item.name+"' />").appendTo($("#tab3"));
		
	});
	
	_.btn_left = $("<div class='btn left' ></div>").appendTo(_.main);
	
	_.btn_right = $("<div class='btn right' ></div>").appendTo(_.main);
	
	$(".control_item:first").addClass("selected");
	//初始化固定宽度
	_.main.width(_.width).height(_.height);
	$(".CarouselFigure_pd .picture_item").width(_.width).height(_.height);
	$(".CarouselFigure_pd .picture_item img").width(_.width).height(_.height);
	_.picture_list.width(_.width*_.total).height(_.height);
	
	_.bindEvent();
};

FillPDInformation.prototype.bindEvent = function(){
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
		if(_.index < _.total - 1){
			_.index++;
			console.log(_.index);
			_.rotate();
		}
	});
	
	$(_.main).mouseover(function(){
		$(_.btn_left).css({
			"left": "1em"
		});
		$(_.btn_right).css({
			right: "1em"
		});
		setTimeout(function(){
			$(_.btn_left).css({
				"opacity": 1
			});
			$(_.btn_right).css({
				"opacity": 1
			});
		},50);
		clearInterval(_.picture_rotate);
	});
	
	$(_.main).mouseout(function(){
		$(_.btn_left).css({
			"left": "-2em"
		});
		$(_.btn_right).css({
			right: "-2em"
		});
		setTimeout(function(){
			$(_.btn_left).css({
				"opacity": 0
			});
			$(_.btn_right).css({
				"opacity": 0
			});
		},50);	
		_.autorotate();
	});
	
	$(".CarouselFigure_pd .picture_item img").click(function(){		
		_.onClick(this);
	});
	
	$("#addCart_btn").click(function(){
		var addBtn = $(this);
		if($(this).hasClass("btn-disabled")){
			return;
		}
		
		$.ajax({
			type:"post",
			url:"returnUser.action",
			async:true,
			success:function(msg){
				var user = msg;
				if(typeof(user.id) === "undefined"){
					$(".login-notic").removeClass("hidden").css({
						"transform":"scaleY(1)"
					});				
					$(window).scrollTop($("#login_href").offset().top/2);
				}else{
					addBtn.addClass("btn-disabled");
					$.ajax({
						type:"post",
						url:"addCart.action",
						data:{
							"goodsId":_.dataSource.id
						},
						async:true,
						success:function(res){
							if(res.isSuccess == "true"){
								top.newTips.show({
									"result":"success",
									"tipsTxt":res.msg
								});
								setTimeout(function(){
									top.newTips.hide();
									addBtn.removeClass("btn-disabled");
									window.location.href=$("base").attr("href")+"CartPage.jsp";
								},2000);	
							}else{
								top.newTips.show({
									"result":"fail",
									"tipsTxt":"操作失败："+res.msg
								});
								
								//1.5秒后设置成默认样式
								setTimeout(function(){
									top.newTips.hide();
									addBtn.removeClass("btn-disabled");
								},1500);
							}
						}
					});
				}
			}
		});
	});
	
	$("#close_unlogin").click(function(){
		$(".login-notic").css({
			"transform":"scaleY(0)"
		});
		setTimeout(function(){
			$(".login-notic").addClass("hidden");
		},250);
		
	});

	var goodsEvaluation = new GoodsEvaluation({
		"renderTo": "tabs4",
		"dataSource": "queryReviewForGrid.action",
		"postData":{
			"pageSize":5,
			"pageNum":1,
			"condition":" WHERE G.ID = '"+_.dataSource.id+"' "
		},
		"onClick": function(obj) {
			top.goodsImg.show(obj);
		},
		"onComplete":function(obj){
			new PageTurn({
				"renderTo": "pageTurn",
				"pageSize":obj.pageSize,
				"pageNum":obj.pageNum,
				"pageTotal":obj.pageTotal,
				"onClick": function(pageSize,pageNum) {
					$(window).scrollTop($("#comment_num").offset().top);
					goodsEvaluation.reload(pageSize,pageNum);
				}
			});
		}
	});
};

FillPDInformation.prototype.autorotate = function(){
	var _ = this;
	_.picture_rotate = setInterval(function(){
		
//		console.log(num);
		if(_.index == _.total - 1) {
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

FillPDInformation.prototype.rotate = function(){
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
