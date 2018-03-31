function GoodsEvaluation(arg){
	this.init(arg);
}

GoodsEvaluation.prototype.init = function(args){
	var _ = this;
	_.renderTo = args.renderTo;
	_.dataUrl = args.dataSource;
	_.dataSource = {};
	_.onClick = args.onClick === "undefined" ? function(){}:args.onClick;
	_.onComplete = args.onComplete === "undefined" ? function(){}:args.onComplete;
//	_.percent = args.percent === "undefined" ? [{
//		"name":"好评",
//		"rate":100
//	},{
//		"name":"中评",
//		"rate":0
//	},{
//		"name":"差评",
//		"rate":0
//	}]:args.niceRate
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

GoodsEvaluation.prototype.byDataSource = function(){
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

GoodsEvaluation.prototype.reload = function(pageSize,pageNum,condition){
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

GoodsEvaluation.prototype.build = function(){
	var _ = this;
	_.Tabs = $("#"+_.renderTo);
	_.Tabs.html("");
	
	_.comment = $("<div class='GoodsEvaluation' ></div>").appendTo(_.Tabs);
	
	var mt = $("<div class='mt' ><h3>商品评价</h3></div>").appendTo(_.comment);
	
	var comment_info = $("<div class='comment-info' ></div>").appendTo(_.comment);
	
	var comment_percent = $("<div class='comment-percent' ><strong class='percent-tit'>好评度</strong></div>").appendTo(comment_info);
	
	var niceRate = _.dataSource.total == 0?100:Math.ceil(_.dataSource.niceNum/_.dataSource.total*100);
	var percent_con = $("<div class='percent-con' >"+niceRate+"<span>%</span></div>").appendTo(comment_percent);
	
	var percent = $("<div class='percent' ></div>").appendTo(comment_info);
	
	var percent_item = $("<dl><dt>好评<span>（"+niceRate+"%）</span></dt> <dd> <div style='width: "+niceRate+"px;'></div></dd></dl>").appendTo(percent);
	var normalRate = _.dataSource.total == 0?0:Math.ceil(_.dataSource.normalNum/_.dataSource.total*100);
	percent_item = $("<dl><dt>中评<span>（"+normalRate+"%）</span></dt> <dd> <div style='width: "+normalRate+"px;'></div></dd></dl>").appendTo(percent);
	var negativeRate = _.dataSource.total == 0?0:Math.ceil(_.dataSource.negativeNum/_.dataSource.total*100);
	percent_item = $("<dl><dt>差评<span>（"+negativeRate+"%）</span></dt> <dd> <div style='width: "+negativeRate+"px;'></div></dd></dl>").appendTo(percent);
	
	
	$("#comment_num").text(_.dataSource.total);
	
	if(_.dataSource.total == 0){
		$("<div class='no_comment' >暂时没有评论</div>").appendTo(_.comment);
		return;
	}
	
	_.tab_con = $("<div class='tab-con' ></div>").appendTo(_.comment);
	
//	for(var i = 0;i < _.itemList.length; i++){
//		_.addItemList(i);
//	}
	$(_.dataSource.rows).each(function(index,item){
		_.addItemList(item);
	});
	
	_.bindEvent();
};

GoodsEvaluation.prototype.addItemList = function(item){
	var _ = this;

	var itemList = $("<div class='comment-item' ></div>").appendTo(_.tab_con);
	
	var user_column = $("<div class='user-column' ></div>").appendTo(itemList);
	
	var userName = item.userName.charAt(0)+"***"+item.userName.charAt(item.userName.length-1);
	
	var user_info = $("<div class='user-info' >"+userName+"</div>").appendTo(user_column);
	
	var user_picture = $("<img class='avatar' src='image/user/"+item.userImg+"' width='32' height='32' />").appendTo(user_info);
	
	var user_level = $("<div class='user-level' ></div>").appendTo(user_info);
	if(item.userLvl == "0"){
		user_level.html("<i title='普通用户' class='iconfont icon-user' ></i>普通会员");
		user_level.addClass("User");
	}else if(item.userLvl == "1"){
		user_level.html("<i title='管理员' class='iconfont icon-guanliyuan1' ></i>管理员");
		user_level.addClass("maUser");
	}else if(item.userLvl == "2"){
		user_level.html("<i title='超级管理员' class='iconfont icon-kehuguanli' ></i>超级管理员");
		user_level.addClass("superMaUser");
	}
	
	var comment_column = $("<div class='comment-column' ></div>").appendTo(itemList);
	
	var comment_star = $("<div class='comment-star star"+item.star+"' ></div>").appendTo(comment_column);
	
	var comment_con = $("<p class='comment-con' >"+item.con+"</p>").appendTo(comment_column);
	
	var pic_list = $("<div class='pic-list' ></div>").appendTo(comment_column);
	
	$(item.imgList).each(function(index,column){
		var thumb_img = $("<div class='J-thumb-img' ></div>").appendTo(pic_list);
		
		var img = $("<img src='image/review/"+column.reviewId+"/"+
		column.name+"' width='48' height='48' />").appendTo(thumb_img);
	
	});
	
	var comment_message = $("<div class='comment-message' ></div>").appendTo(comment_column);
	
	var order_info = $("<div class='order-info' ></div>").appendTo(comment_message);
	
	var time = $("<span>"+item.createDate+"</span>").appendTo(order_info);
	
	var comment_op = $("<div class='comment-op' ></div>").appendTo(comment_message);
	
	var J_report = $("<a class='J-report' >举报</a>").appendTo(comment_op);
	
	var J_nice = $("<a class='J-nice' ><i class='sprite-praise'></i></a>").appendTo(comment_op);
	
	var nicenum = $("<span>"+item.nicenum+"</span>").appendTo(J_nice);
	
	var J_comment = $("<a class='J-comment' ><i class='sprite-comment'></i></a>").appendTo(comment_op);

	var commentnum = $("<span>"+item.commentnum+"</span>").appendTo(J_comment);
	
//	if(user.append){
//		var append_comment = document.createElement("div");
//		append_comment.className = "append-comment";
//		comment_column.appendChild(append_comment);
//		
//		var append_time = document.createElement("div");
//		append_time.className = "append-time";
//		append_time.innerText = "[购买"+user.append.day+"天后追评]";
//		append_comment.appendChild(append_time);
//		
//		var append_con = document.createElement("p");
//		append_con.className = "comment-con";
//		append_con.innerHTML = user.append.con;
//		append_comment.appendChild(append_con);
//	}
};

GoodsEvaluation.prototype.bindEvent = function(){
	var _ = this;
	
	_.onComplete({
		"pageNum":_.postData.pageNum,
		"pageSize":_.postData.pageSize,
		"pageTotal":Math.ceil( _.dataSource.total/_.postData.pageSize)
	});
	
	$(".J-thumb-img img").click(function(){
		_.onClick(this);
	});
};