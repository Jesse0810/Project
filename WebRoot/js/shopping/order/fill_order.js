function FillOrder(args){
	this.init(args);	
}

FillOrder.prototype.init = function(args){
	var _ = this;
	_.renderTo = args.renderTo;
	_.dataSource = {};
	_.dataUrl = args.dataSource;
	_.state = args.state;
	_.onClick = args.onClick === "undefined" ? function(){}:args.onClick;
	_.onComplete = args.onComplete === "undefined" ? function(){}:args.onComplete;
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

FillOrder.prototype.byDataSource = function(){
	var _ = this;
	
	$.ajax({
		type: "post",
		url: "returnUser.action",
		async: true,
		success: function(msg) {
			var user = msg;
			if(typeof(user.id) === "undefined") {
				top.newTips.show({
					"result": "fail",
					"tipsTxt": "登录信息过期，请重新登录！"
				});
	
				//1.5秒后设置成默认样式
				setTimeout(function() {
					top.newTips.hide();
				}, 1500);
			} else {
				_.postData.condition = " WHERE U.ID = '"+user.id+"' AND O.STATE = '"+_.state+"' ";
				if(typeof(_.dataUrl) == "string") {
					$.ajax({
						type: "post",
						url: _.dataUrl,
						data: _.postData,
						async: true,
						success: function(msg) {
							_.dataSource = msg;
							_.build();
						}
					});
				} else {
					_.build();
				}
			}
		}
	});
	
};

FillOrder.prototype.reload = function(pageSize,pageNum,state){
	var _ = this;
	if(pageSize){
		_.postData.pageSize = pageSize;
	}
	if(pageNum){
		_.postData.pageNum = pageNum;
	}
	if(state){
		_.state = state;
	}
	_.byDataSource();
	
};

//创建页面元素
FillOrder.prototype.build = function(){
	var _ = this;
	
	_.orderTabs = $("#"+_.renderTo);
	
	_.orderTabs.html("");
	
	var stateName = "";
	switch (_.state){
		case '0':
			stateName = "已完成";
			break;
		case '1':
			stateName = "待付款";
			break;
		case '2':
			stateName = "已关闭";
			break;
	}
	
	if(_.dataSource.total == 0){
		_.orderTabs.html("<p class='empty'>当前没有"+stateName+"订单。</p>");
		return;
	}
	
//	var totalPrice = 0;
//	
//	var totalNum = 0;
//	
//	var checkNum = 0;
//	
	$(_.dataSource.rows).each(function(index,item){
		
		var order_item = $("<div class='order-item' ></div>").appendTo(_.orderTabs);
	
		var order_summary = $("<div class='order-summary'><div class='order-status'>"+
			stateName+"</div></div>").appendTo(order_item);
	
		var order_detail = $("<div class='order-detail' ></div>").appendTo(order_item);
	
		var caption_info = $("<p class='caption-info'>"+item.createDate+"<span class='sep'>|</span>"+item.userName+
							"<span class='sep'>|</span>订单号："+item.id+"</p>").appendTo(order_detail);
		
		var caption_price = $("<p class='caption-price'>订单金额：<span class='num'></span>元</p>").appendTo(order_detail);
		
		var totalpice = 0;
		
		$(item.childList).each(function(index1,column){
			
			var goods_list = $("<div class='goods-list' ></div>").appendTo(order_item);
			
			var figure = $("<div class='figure figure-thumb' ></div>").appendTo(goods_list);
			
			var img = $("<a href='"+$("base").attr("href")+"production_information.jsp?id="+column.goodsId+
			"' target='_blank'><img src='image/goods/"+column.goodsId+"/"+column.imgList[0].name+"' alt='"+column.goodsName+
			"' width=80 height=80 ></a>").appendTo(figure);
			
			var name = $("<div class='name'></div>").appendTo(goods_list);
			
			var goodname = $("<a href='"+$("base").attr("href")+"production_information.jsp?id="+column.goodsId+
			"' target='_blank'>"+column.goodsName+"</a>").appendTo(name);
			
			var price = $("<p class='price'>"+column.price+"元 × "+column.num+"</p>").appendTo(name);
			
			if(_.state == 0){
				var btn_comment = $("<a href='javascript:void(0);' class='btn J_goComment' >去评价</a>").appendTo(goods_list);
				
				var comment_item = $("<div class='comment-item comment_hidden' ></div>").appendTo(goods_list);
				
				var comment_column = $("<div class='comment-column' ></div>").appendTo(comment_item);
				
				var comment_star = $("<div data-star='1' class='comment-star star1' ></div>").appendTo(comment_column);
			
				var star_tips = $("<div class='star-tips' >1星</div>").appendTo(comment_column);
				
				var comment_con = $("<textarea placeholder='请输入评论' class='comment-con'></textarea>").appendTo(comment_column);
				
				var pic_list = $("<div class='pic-list'></div>").appendTo(comment_column);
			
				var btn_upload = $("<a href='javascript:void(0);' class='btn_upload J_uploadPicture' >上传图片</a>").appendTo(pic_list);
			
				var form = $("<form action='upload.action' class='hidden' method='post' "+
				" enctype='multipart/form-data'></form>").appendTo(pic_list);
				
				var uploadImg = $("<div class='uploadImg' ></div>").appendTo(pic_list);
				
				var comment_message = $("<div class='comment-message'><div class='order-info'><span></span></div>"+
				"<a href='javascript:void(0);' data-userId='"+item.userId+"' data-goodsId='"+column.goodsId+"' class='btn_commit J_submitComment' >提交评论</a></div>").appendTo(comment_column);
				
				_.fillComment({
					"userId":item.userId,
					"goodsId":column.goodsId
				},goods_list);
			}
			
			totalpice+=parseFloat(column.price)*parseInt(column.num);
			
		});
		
		totalpice = totalpice.toFixed(2);
		
		caption_price.find(".num").text(totalpice);
		
		if(_.state == 1){
			var btn_pay = $("<a data-id='"+item.id+"' href='javascript:void(0);' class='btn J_goPay' >立即付款</a>"+
			"<a data-id='"+item.id+"' href='javascript:void(0);' class='btn J_goClose' >关闭订单</a>").appendTo(order_item.find(".goods-list:first"));
		}
		
	});
	
	_.bindEvent();
};

FillOrder.prototype.fillComment = function(obj,goods_list){
	var _ = this;
	$.ajax({
		type:"post",
		url:"queryReviewByUserAndGoods.action",
		data:obj,
		async:false,
		success:function(review){
			if(review == ""||review == null){
				
			}else{
				goods_list.find(".J_goComment").text("已评价").addClass("btn-disabled");
				goods_list.find(".comment-item").remove();
			}
		}
	});
}

FillOrder.prototype.bindEvent = function(){
	var _ = this;
	
	_.onComplete({
		"pageNum":_.postData.pageNum,
		"pageSize":_.postData.pageSize,
		"pageTotal":Math.ceil( _.dataSource.total/_.postData.pageSize)
	});
	
	$(".J_goComment").click(function(){
		if($(this).hasClass("btn-disabled")){
			return;
		}
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(this).parents(".goods-list").find(".comment-item").addClass("comment_hidden");
		}else{
			$(this).addClass("active");
			$(this).parents(".goods-list").find(".comment-item").removeClass("comment_hidden");
		}
	});
	
	$(".J_goPay").click(function(){
		if($(this).hasClass("btn-disabled")){
			return;
		}
		var addBtn = $(this);
		addBtn.addClass("btn-disabled");
		$.ajax({
			type:"post",
			url:"reOpenOrder.action",
			data:{
				"id":addBtn.attr("data-id")
			},
			async: true,
			success: function(res) {
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
	});
	
	$(".J_goClose").click(function(){
		if($(this).hasClass("btn-disabled")){
			return;
		}
		var addBtn = $(this);
		addBtn.addClass("btn-disabled");
		$.ajax({
			type:"post",
			url:"closeOrder.action",
			data:{
				"id":addBtn.attr("data-id")
			},
			async: true,
			success: function(res) {
				if(res.isSuccess == "true") {
					top.newTips.show({
						"result": "success",
						"tipsTxt": res.msg
					});
					
					setTimeout(function() {
						top.newTips.hide();
						addBtn.removeClass("btn-disabled");
						_.reload(5,1);
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
	});
	
	$(".comment-star").click(function(event){
		var e = event || window.event;
		var offsetX = e.clientX - $(this).offset().left;  
  		var starNum = Math.ceil(offsetX/15.8);
  		$(this).removeClass("star"+$(this).attr("data-star"));
  		$(this).next().text(starNum+"星");
  		$(this).attr("data-star",starNum).addClass("star"+starNum);
	});
	
	$(".J_submitComment").click(function(){
		if($(this).hasClass("btn-disabled")){
			return;
		}
		var addBtn = $(this);
		var column = $(this).parents(".comment-column");
		var goods_list = $(this).parents(".goods-list");
		var con = column.find(".comment-con").val();
		if(con.length<10||con.length>1500){
			top.newTips.show({
				"result": "fail",
				"tipsTxt": "评论字数要在10到1500之间" 
			});
			
				//1.5秒后设置成默认样式
			setTimeout(function() {
				top.newTips.hide();
			}, 1500);
		}else{
			addBtn.addClass("btn-disabled");
			var star = column.find(".comment-star").attr("data-star");
			var oimgbox = column.find(".uploadImg");
			var imgList = oimgbox.find("img").map(function(){
				return $(this).attr("data-src");
			}).get();
			$.ajax({
				type:"post",
				url:"insertReview.action",
				data:{
					"con":con,
					"userId":addBtn.attr("data-userId"),
					"goodsId":addBtn.attr("data-goodsId"),
					"fileImgName":imgList,
					"star":star
				},
				async:true,
				success: function(res) {
					if(res.isSuccess == "true") {
						top.newTips.show({
							"result": "success",
							"tipsTxt": res.msg
						});
						column.find(".comment-item").addClass("comment_hidden");
						setTimeout(function() {
							top.newTips.hide();
							addBtn.removeClass("btn-disabled");
							goods_list.find(".J_goComment").text("已评价").addClass("btn-disabled");
							goods_list.find(".comment-item").remove();
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
	
	$(".J_uploadPicture").click(function(){
		//找到form表单
		var form = $(this).next();
		var imgList = $(this).next().next();
		var imglength = imgList.find("img").length;
		if(imglength == 10) {
				top.newTips.show({
					"result": "fail",
					"tipsTxt": "上传图片最多不能超过十个" 
				});
			
				//1.5秒后设置成默认样式
				setTimeout(function() {
					top.newTips.hide();
				}, 1500);
		}else{
			//每次点击清空form表单
			form.html("");
			//手动向form表单中添加input type=file
			var file = $("<input type='file' name='file'/>").appendTo(form);
			//点击文件上传
			file.click();//文件上传之后，只是选中了文件，还没有提交
			
			//判断file的值是否有变动
			file.change(function(){
	//			//手动提交form表单
	//			if(file.val() != ""){
	//				form.submit();
	//				
	//			}
				xmTanUploadImg(this,imgList);
			});
		}
	});
	
	$(".uploadImg").on("mouseover",".J-thumb-img",function(){
		$(this).children(".imgExit").css({
			"bottom":"0em"
		});
	}).on("mouseout",".J-thumb-img",function(){
		$(this).children(".imgExit").css({
			"bottom":"-2em"
		});
	});
	
	//上传图片删除事件
	$(".uploadImg").on("click",".J-thumb-img .imgExit",function(){
		$(this).parent().remove();
	});
	
	//上传图片放大事件
	$(".uploadImg").on("click","img",function(){
		top.goodsImg.show(this);
	});
};
//图片上传为base64格式直接存到页面上显示
function xmTanUploadImg(obj,oimgbox) {

	var fl = obj.files.length;
	for(var i = 0; i < fl; i++) {
		var file = obj.files[i];
		var reader = new FileReader();

		//读取文件过程方法  

		reader.onloadstart = function(e) {
			console.log("开始读取....");
		}
		reader.onprogress = function(e) {
			console.log("正在读取中....");
		}
		reader.onabort = function(e) {
			console.log("中断读取....");
		}
		reader.onerror = function(e) {
			console.log("读取异常....");
		}
		reader.onload = function(e) {
			console.log("成功读取....");
			
		//	var imgstr = '<img style="width:100px;height:100px;" src="' + e.target.result + '"/>';
			var ndiv = $("<div class='J-thumb-img' ></div>").appendTo(oimgbox);
			
			var imgstr = $("<img width='48' height='48' data-src='"+e.target.result+"' src='"+e.target.result+"'/>").appendTo(ndiv);
			
			var dialogExit = $("<div class='imgExit' >删除</div>").appendTo(ndiv);
		}

		reader.readAsDataURL(file);
		//alert(1);  
	}

}