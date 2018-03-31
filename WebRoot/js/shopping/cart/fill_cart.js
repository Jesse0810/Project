function FillCart(args){
	this.init(args);	
}

FillCart.prototype.init = function(args){
	var _ = this;
	_.renderTo = args.renderTo;
	_.dataSource = {};
	_.queryUrl = args.queryUrl;
	_.updateUrl = args.updateUrl;
	_.checkUrl = args.checkUrl;
	_.checkOffsUrl = args.checkOffsUrl;
	_.delUrl = args.delUrl;
	_.submitUrl = args.submitUrl;
	_.onClick = args.onClick === "undefined" ? function(){}:args.onClick;
	_.byDataSource();
};

FillCart.prototype.byDataSource = function(){
	var _ = this;
	if(typeof(_.queryUrl) == "string"){
		$.ajax({
			type:"post",
			url:_.queryUrl,
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
FillCart.prototype.build = function(){
	var _ = this;
	
	_.cartTabs = $("#cartTabs");
	
	_.tbody = _.cartTabs.find(".cart-goods-list tbody");
	
	_.tbody.html("");
	
	if(_.dataSource.total == 0){
		$("#J_cartBar,.cart-goods-list").addClass("hidden");
		$("#J_cartEmpty").removeClass("hidden");
		return;
	}
	
	var totalPrice = 0;
	
	var totalNum = 0;
	
	var checkNum = 0;
	
	$(_.dataSource.rows).each(function(index,item){
		
		var item_box = $("<tr class='item-box' ></tr>").appendTo(_.tbody);
	
		var col_check = $("<td class='col col-check' ></td>").appendTo(item_box);
		
		var check = $("<i class='iconfont icon-gou J_itemCheckbox' data-cartid='"+
			item.id+"' ></i>").appendTo(col_check);
		
		if(item.checked==1){
			totalPrice+= item.num*item.goodsPrice;
			checkNum+=item.num;
			check.addClass("icon-checkbox-selected");
		}
		
		var col_img = $("<td class='col col-img' ></td>").appendTo(item_box);
		
		var img = $("<a href='"+$("base").attr("href")+"production_information.jsp?id="+item.goodsId
			+"' target='_blank'><img alt='"+item.goodsName+"' src='image/goods/"+item.goodsId+"/"+
			item.imgList[0].name+"' ></a>").appendTo(col_img);
		
		var col_name = $("<td class='col col-name' ><a href='"+$("base").attr("href")+"production_information.jsp?id="+item.goodsId
			+"' target='_blank'>"+item.goodsName+"</a></td>").appendTo(item_box);
		
		var col_price = $("<td class='col col-price' data-price='"+item.goodsPrice+"' >"+item.goodsPrice+"元</td>").appendTo(item_box);
	
		var col_num =$("<td class='col col-num' ></td>").appendTo(item_box);
		
		var change_num = $("<div class='change-goods-num clearfix J_changeGoodsNum'>" +
		"<i class='iconfont minus'>&#xe689;</i>" +
		"<input tyep='text' name='" + item.id + "_num' value='" + item.num + "' data-minlength='1' data-buylimit='" + item.goodsStock + "' data-cartid='" +
		item.id + "' autocomplete='off' class='goods-num J_goodsNum' >" +
		"<i class='iconfont plus'>&#xe602;</i><div class='msg J_canBuyLimit hidden'>总共还有 " + item.goodsStock + " 件</div></div>").appendTo(col_num);
	
		var col_total = $("<td class='col col-total' data-totalprice='"+item.num*item.goodsPrice+"' >"+item.num*item.goodsPrice+"元</td>").appendTo(item_box);
	
		var col_action = $("<td class='col col-action' ><i class='iconfont del' data-cartid='" +
		item.id + "' >&#xe624;</i></td>").appendTo(item_box);
		
		totalNum+=item.num;
	});
	
	if(totalNum == checkNum){
		$("#J_selectAll").addClass("icon-checkbox-selected");
	}else{
		$("#J_selectAll").removeClass("icon-checkbox-selected");
	}
	
	if(totalPrice<=0){
		$("#J_noSelectTip").removeClass("hidden");
		$("#J_goCheckout").addClass("btn-disabled");
	}else{
		$("#J_noSelectTip").addClass("hidden");
		$("#J_goCheckout").removeClass("btn-disabled");
	}
	
	$("#J_cartTotalNum").text(totalNum);
	
	$("#J_selTotalNum").text(checkNum);
	
	$("#J_cartTotalPrice").text(totalPrice);
	
	_.bindEvent();
};

FillCart.prototype.bindEvent = function(){
	var _ = this;
	
	$("#J_selectAll").click(function(){
		if($(this).hasClass("icon-checkbox-selected")){
			$(".J_itemCheckbox",_.tbody).each(function(index,item){
				_.checkoff(item);
			});
			$(this).removeClass("icon-checkbox-selected");
		}else{
			$(".J_itemCheckbox",_.tbody).each(function(index,item){
				_.checked(item);
			});
			$(this).addClass("icon-checkbox-selected");
		}
	});
	
	$(".J_itemCheckbox").click(function(){
		if($(this).hasClass("icon-checkbox-selected")){
			_.checkoff(this);
		}else{
			_.checked(this);
		}
	});
	
	$(".J_goodsNum",_.tbody).focus(function(){
		$(this).next().next().removeClass("hidden");
	}).blur(function(){
		_.changeNum(this);
	}).bind("input propertychange",function(){
		var minlength = parseInt($(this).attr("data-minlength"));
		var maxlength = parseInt($(this).attr("data-buylimit"));
		var value = $(this).val().replace(/\D/gi,"");
		if(value<minlength){
			value = minlength;
		}else if(value>maxlength){
			top.newTips.show({
				"result": "fail",
				"tipsTxt": "商品总共只有"+maxlength+"件"
			});
			value = maxlength;
			
			//1.5秒后设置成默认样式
			setTimeout(function() {			
				top.newTips.hide();
			}, 1000);
		}
		$(this).val(value);
	});
	
	$(".change-goods-num .minus",_.tbody).click(function(){
		var goodsNum = $(this).next();
		var value = parseInt(goodsNum.val());
		var minlength = parseInt(goodsNum.attr("data-minlength"));
		goodsNum.next().next().removeClass("hidden");
		value--;
		if(value<minlength){
			value = minlength;
		}		
		goodsNum.val(value);
		_.changeNum(goodsNum[0]);
	});
	
	$(".change-goods-num .plus",_.tbody).click(function(){
		var goodsNum = $(this).prev();
		var value = parseInt(goodsNum.val());
		var maxlength = parseInt(goodsNum.attr("data-buylimit"));
		goodsNum.next().next().removeClass("hidden");
		value++;
		if(value>maxlength){
			top.newTips.show({
				"result": "fail",
				"tipsTxt": "商品总共只有"+maxlength+"件"
			});
			value = maxlength;
			
			//1.5秒后设置成默认样式
			setTimeout(function() {			
				top.newTips.hide();
			}, 1000);
		}
		goodsNum.val(value);
		_.changeNum(goodsNum[0]);
	});
	
	$(".del",_.tbody).click(function(){
		_.delItem(this);
	});
	
	$("#J_goCheckout").click(function(){
		if(!$(this).hasClass("btn-disabled")){
			var addBtn = $(this);
			addBtn.addClass("btn-disabled");
			$.ajax({
				type:"post",
				url:_.submitUrl,
				async:true,
				success:function(res){
					if(res.isSuccess == "true") {
						top.newTips.show({
							"result": "success",
							"tipsTxt": res.msg
						});
						setTimeout(function() {
							top.newTips.hide();
							addBtn.removeClass("btn-disabled");
							window.location.href = $("base").attr("href") + "OrderConfrim.jsp";
						}, 2000);
					} else {
						top.newTips.show({
							"result": "fail",
							"tipsTxt": "操作失败：" + res.msg
						});
					
						//1.5秒后设置成默认样式
						setTimeout(function() {
							top.newTips.hide();
							addBtn.removeClass("btn-disabled");
						}, 1500);
					}
				}
			});
		}
	});
};

FillCart.prototype.delItem = function(obj){
	var _ = this;
	$.ajax({
		type:"post",
		url:_.delUrl,
		data: {
			"id": $(obj).attr("data-cartid"),
		},
		async: false,
		success: function(res) {
			if(res.isSuccess == "true") {
				var item = $(obj).parents(".item-box");
				item.addClass("trhidden");		
				setTimeout(function(){
					item.remove();
					_.updateCartBar();
				},500);							
			} else {
				top.newTips.show({
					"result": "fail",
					"tipsTxt": "操作失败：" + res.msg
				});

				//1.5秒后设置成默认样式
				setTimeout(function() {
					top.newTips.hide();
				}, 1500);
			}
		}
	});
}

FillCart.prototype.changeNum = function(obj){
	var _ = this;
	var goodsNum = obj;
	$.ajax({
		type: "post",
		url: _.updateUrl,
		data: {
			"id": $(goodsNum).attr("data-cartid"),
			"num": $(goodsNum).val()
		},
		async: false,
		success: function(res) {
			if(res.isSuccess == "true") {
				var value = parseInt($(goodsNum).val());
				var totalprice = value * parseFloat($(goodsNum).parents(".item-box").find(".col-price").attr("data-price"));
				$(goodsNum).parents(".item-box").find(".col-total").text(totalprice + "元").attr("data-totalprice", totalprice);
				$(goodsNum).next().next().addClass("hidden");
				_.updateCartBar();
			} else {
				top.newTips.show({
					"result": "fail",
					"tipsTxt": "操作失败：" + res.msg
				});

				//1.5秒后设置成默认样式
				setTimeout(function() {
					top.newTips.hide();
				}, 1500);
			}
		}
	});
};

FillCart.prototype.checked = function(obj){
	var _ = this;
	$.ajax({
		type:"post",
		url:_.checkUrl,
		data:{
			"id":$(obj).attr("data-cartid")
		},
		async:false,
		success:function(res){
			if(res.isSuccess == "true"){
				$(obj).addClass("icon-checkbox-selected");
				_.updateCartBar();
			} else {
				top.newTips.show({
					"result": "fail",
					"tipsTxt": "操作失败：" + res.msg
				});
				
				//1.5秒后设置成默认样式
				setTimeout(function() {
					top.newTips.hide();
				}, 1500);
			}
			
			
		}
	});
};

FillCart.prototype.checkoff = function(obj){
	var _ = this;
	$.ajax({
		type:"post",
		url:_.checkOffsUrl,
		data:{
			"id":$(obj).attr("data-cartid")
		},
		async:false,
		success:function(res){
			if(res.isSuccess == "true"){
				$(obj).removeClass("icon-checkbox-selected");
				_.updateCartBar();
			} else {
				top.newTips.show({
					"result": "fail",
					"tipsTxt": "操作失败：" + res.msg
				});
			
				//1.5秒后设置成默认样式
				setTimeout(function() {
					top.newTips.hide();
				}, 1500);
			}
			
			
		}
	});
	
};

FillCart.prototype.updateCartBar = function(obj){
	var _ = this;
	
	var totalPrice = 0;
	
	var totalNum = 0;
	
	var checkNum = 0;
	
	$(".item-box",_.tbody).each(function(index,column){				
		if($(column).find(".J_itemCheckbox").hasClass("icon-checkbox-selected")){
			checkNum+= parseInt($(column).find(".J_goodsNum").val());
			totalPrice+= parseFloat($(column).find(".col-total").attr("data-totalprice"));
		}
		totalNum+= parseInt($(column).find(".J_goodsNum").val());
		
//		var totalJson = JSON.parse("{'totalprice':'"+totalPrice+"'}");
//		
//		totalPrice = totalJson.totalprice;
	});
	
	$("#J_cartTotalNum").text(totalNum);
	
	$("#J_selTotalNum").text(checkNum);
	
	$("#J_cartTotalPrice").text(totalPrice);
	
	if(totalPrice<=0){
		$("#J_noSelectTip").removeClass("hidden");
		$("#J_goCheckout").addClass("btn-disabled");
	}else{
		$("#J_noSelectTip").addClass("hidden");
		$("#J_goCheckout").removeClass("btn-disabled");
	}
	
	if(totalNum == checkNum){
		$("#J_selectAll").addClass("icon-checkbox-selected");
	}else{
		$("#J_selectAll").removeClass("icon-checkbox-selected");
	}
};