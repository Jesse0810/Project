function Grid(args){
	this.init(args);
}

Grid.prototype.init = function(args){
	var _ = this;
	_.renderTo = args.renderTo;
	_.columns = args.columns;
	_.pagesize_id = args.pagesize_id;
	_.dataUrl = args.dataSource;
	_.dataSource = {};
	_.onClick = args.onClick === "undefined" ? function(){}:args.onClick;
	_.onComplate = args.onComplate === "undefined" ? function(){}:args.onComplate;
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
	_.currentpage = _.postData.pageNum;
	_.build();

};


Grid.prototype.byDataSource = function(){
	var _ = this;	
	
	if(typeof(_.dataUrl) == "string"){
		$.ajax({
			type:"post",
			url:_.dataUrl,
			async:true,
			data:_.postData,
			success:function(msg){
				_.dataSource = msg;
				_.pageTurn();
			}
		});
	}else{
		_.pageTurn();
	}	
};

Grid.prototype.reload = function(pageSize,pageNum,condition){
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
	_.currentpage = _.postData.pageNum;
	_.byDataSource();
	
};

Grid.prototype.build = function(){
	var _ = this;
	_.userGrid = $("#"+_.renderTo);
	_.table = $("<table class='Grid' border='0' cellspacing='0' cellpadding='0'></table>").appendTo(_.userGrid);
	
	_.thead = $("<thead></thead>").appendTo(_.table);
	
	_.thr = $("<tr></tr>").appendTo(_.thead);
	
	var colNum = 0;
	$(_.columns).each(function(index,column){
		//判断当前列有没有hide属性，如果有则不计入计数器，没有则计入计数器
		if(!column.hide){
			colNum++;
		}
	});
	
	$(_.columns).each(function(index,column){
		var th = $("<th>"+column["name"]+"</th>").appendTo(_.thr);
		//隐藏不必要的列
		if(column.hide){
			th.addClass("hidden");
		}
	});
	
	_.tbody = $("<tbody></tbody>").appendTo(_.table);
	//页面应该显示多少个页数
	_.keepnum = 5;
	
	//加载表单翻页功能
	_.page = $("<div class='page' ></div>").appendTo(_.userGrid);
	var pageSize = $("<div class='pageSize' ></div>").appendTo(_.page);
	var pageSize_txt_left = $("<div class='left' >每页显示</div>").appendTo(pageSize);
	var page_title = $("<div id='"+_.pagesize_id+"' class='pagetitle' ></div>").appendTo(pageSize);
	var pageSize_txt_right = $("<div class='right' >条</div>").appendTo(pageSize);
	var pageSize_value = $("<div class='value' >共<span class='total' ></span>条</div>").appendTo(pageSize);
	var pageTurn = $("<div class='pageTurn' ></div>").appendTo(_.page);
	var pageUp = $("<input type='button' value='上一页' class='up pagehidden' />").appendTo(pageTurn);
	var pageNum = $("<span class='pageNum' ></span>").appendTo(pageTurn);		
	var pageDown = $("<input type='button' value='下一页' class='down' />").appendTo(pageTurn);	
	
	_.onComplate();
	_.bindEvent();

};

Grid.prototype.bindEvent = function(){
	var _ = this;
	
//	_.page.css("width",_.table.width()*0.95+"px");
	
	
	//组件完成之后条用 分页中的下拉列表
	new DDL({
		"renderTo":_.pagesize_id,
		"dataSource":[{
			"key":"5",
			"value":"5"
		},{
			"key":"10",
			"value":"10"
		},{
			"key":"20",
			"value":"20"
		}],
		"defaultSelect":_.postData.pageSize,
		"direction":"up",
		"onClick":function(obj){
			//刷新表格
			_.PageSizeChange($(obj).attr("key"),1);
		}
	});
	
	_.PageSizeChange(_.postData.pageSize,_.currentpage);
		
	_.page.find(".up").click(function(){
		if(!$(this).hasClass("pagehidden")){
			_.currentpage--;
			_.reload(_.postData.pageSize,_.currentpage);
		}				
	});
	
	_.page.find(".down").click(function(){
		if(!$(this).hasClass("pagehidden")){
			_.currentpage++;
			_.reload(_.postData.pageSize,_.currentpage);
		}
	});
	
};

//表格行选中特效
Grid.prototype.select = function(tr){
	var _ = this;
	//判断当前选中行是否具有选中样式，
	if($(tr).hasClass("itemtrSelect")){
		//如果有选中样式：说明我现在向取消选中
		$(tr).removeClass("itemtrSelect");
	}else{
		//如果没有选中样式，说明我现在向选中
		$("tr",_.table).removeClass("itemtrSelect");
		$(tr).addClass("itemtrSelect");
	}
	
	
};

Grid.prototype.PageSizeChange = function(pageSize,pageNum){
	var _ = this;
	_.currentpage = pageNum;
	_.reload(pageSize,pageNum);
};

Grid.prototype.JudgePageTurnButton = function(totalpage){
	var _ = this;
	_.page.find(".up,.down").removeClass("pagehidden");
	if(_.currentpage==1){
		_.page.find(".up").addClass("pagehidden");	
	}
	if(_.currentpage==totalpage){
		_.page.find(".down").addClass("pagehidden");	
	}
}
Grid.prototype.calculatePage = function(dqPage,pageCount,keepCount){
	var item="";
	var i = 1;
	if(pageCount <= keepCount) { //总页数小于五页，则加载所有页
		for(i; i <= pageCount; i++) {
			if(i == dqPage) {
				item += "<span class='disabled'>" + i + "</span>";
			} else {
				item += "<a data-pagenum='"+i+"' >" + i + "</a>";
			}
		};
	} else if(pageCount > keepCount) { //总页数大于五页，则加载五页
		if(dqPage < keepCount) { //当前页小于5，加载1-5页
			for(i; i <= keepCount; i++) {
				if(i == dqPage) {
					item += "<span class='disabled'>" + i + "</span>";
				} else {
					item += "<a data-pagenum='"+i+"' >" + i + "</a>";
				}
			};
			if(dqPage <= pageCount - 2) { //最后一页追加“...”代表省略的页
				item += "<span> . . . </span>";
			}
		} else if(dqPage >= keepCount) { //当前页大于5页
			for(i; i <= 2; i++) { //1,2页码始终显示
				item += "<a data-pagenum='"+i+"' >" + i + "</a>";
			}
			item += "<span> . . . </span>"; //2页码后面用...代替部分未显示的页码
			if(dqPage + 1 == pageCount) { //当前页+1等于总页码
				for(i = dqPage - 1; i <= pageCount; i++) { //“...”后面跟三个页码当前页居中显示
					if(i == dqPage) {
						item += "<span class='disabled'>" + i + "</span>";
					} else {
						item += "<a data-pagenum='"+i+"' >" + i + "</a>";
					}
				}
			} else if(dqPage == pageCount) { //当前页数等于总页数则是最后一页页码显示在最后
				for(i = dqPage - 2; i <= pageCount; i++) { //...后面跟三个页码当前页居中显示
					if(i == dqPage) {
						item += "<span class='disabled'>" + i + "</span>";
					} else {
						item += "<a data-pagenum='"+i+"' >" + i + "</a>";
					}
				}
			} else { //当前页小于总页数，则最后一页后面跟...
				for(i = dqPage - 1; i <= dqPage + 1; i++) { //dqPage+1页后面...
					if(i == dqPage) {
						item += "<span class='disabled'>" + i + "</span>";
					} else {
						item += "<a data-pagenum='"+i+"' >" + i + "</a>";
					}
				}
				item += "<span> . . . </span>";
			}
		}
	}
	return item;
};
Grid.prototype.pageTurn = function(){
	var _ = this;
	var totalpage = Math.ceil(parseInt(_.dataSource["total"]) / _.postData.pageSize);
	//计算当前页数下各个页数链接该怎么排列
	var item = _.calculatePage(_.currentpage,totalpage,_.keepnum);
	_.page.find(".pageNum").html(item);
	_.page.find(".pageTurn").css("margin-left",-(_.page.find(".pageTurn").width()/2)+"px");
//	_.page.find(".currentPage").text(_.currentpage);
//	_.page.find(".totalPage").text(totalpage);
	_.page.find(".total").text(_.dataSource["total"]);
	_.JudgePageTurnButton(totalpage);
	_.tbody.html("");
	$(_.dataSource.rows).each(function(index,row){
		var tdr = $("<tr class='bodyTr' id='"+row["id"]+"'></tr>").appendTo(_.tbody);
		$(_.columns).each(function(index,column){
			//列值格式化
			var txt;
//			var txt = row[column["alias"]];
//			newTxt = txt = decodeURIComponent(txt.replace(/\+/g, '%20'));
			newTxt = txt = row[column["alias"]];
			if(column.formatter && $.isFunction(column.formatter)){
				newTxt = column.formatter(txt);
			}		
			var td = $("<td>"+newTxt+"</td>").appendTo(tdr);
			//列内容对齐方式
			if(column.align){
				td.addClass("align"+column.align);
			}
			//列内容是否隐藏
			if(column.hide){
				td.addClass("hidden");
			}
//			var td = $("<td class='normal' >"+row[column["alias"]]+"</td>").appendTo(tdr);
		
		});
	});
	
	//点击页数换页
	_.page.find(".pageNum a").click(function(){
		var pagenum = parseInt($(this).attr("data-pagenum"));
		_.currentpage = pagenum;
		_.reload(_.postData.pageSize,_.currentpage);
	});
	
	//table中tr点击事件
	$(".bodyTr",_.table).click(function(){
		_.select(this);
		_.onClick({
			"id":$(this).attr("id")
		});
	});
	
	//商品图片放大事件
	$("img",_.table).click(function(){
		top.goodsImg.show(this);
	});
};


















































































