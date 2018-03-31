function PageTurn(args){
	this.init(args);
}
PageTurn.prototype.init = function(args){
	var _ = this;
	_.renderTo = args.renderTo;
	_.onClick = args.onClick === "undefined" ? function(){}:args.onClick;
	_.pageSize = args.pageSize;
	_.pageNum = args.pageNum;
	_.pageTotal = args.pageTotal;
	_.build();
};

PageTurn.prototype.build = function(){
	var _ = this;
	_.page = $("#"+_.renderTo);
	_.page.html("");
	if(_.pageNum == 1){
		_.pageUp = $("<span class='iconfont numbers up' >&#xe729;</span>").appendTo(_.page);
	}else{
		_.pageUp = $("<a class='iconfont numbers up' >&#xe729;</a>").appendTo(_.page);	
	}
	
	var pageNum = $("<span class='pageNum' ></span>").appendTo(_.page);	
	
	if(_.pageNum==_.pageTotal){
		_.pageDown = $("<span class='iconfont numbers down' >&#xe60c;</span>").appendTo(_.page);	
	}else{
		_.pageDown = $("<a class='iconfont numbers down' >&#xe60c;</a>").appendTo(_.page);	
	}
	
	var item = _.calculatePage(_.pageNum,_.pageTotal);
	_.page.find(".pageNum").html(item);
	
//	_.page.find(".pageTurn").css("margin-left",-(_.page.find(".pageTurn").width()/2)+"px");
	
	_.bindEvent();

};

PageTurn.prototype.bindEvent = function(){
	var _ = this;
	
	_.pageUp.click(function(){
		_.pageNum--;
		_.onClick(_.pageSize,_.pageNum);				
	});
	
	_.pageDown.click(function(){
		_.pageNum++;
		_.onClick(_.pageSize,_.pageNum);
	});
	
	_.page.find(".pageNum a").click(function(){
		var pagenum = parseInt($(this).attr("data-pagenum"));
		_.pageNum = pagenum;
		_.onClick(_.pageSize,_.pageNum);
	});
};

PageTurn.prototype.calculatePage = function(dqPage,pageCount){
	var item="";
	var i = 1;
	if(pageCount <= 5) { //总页数小于五页，则加载所有页
		for(i; i <= pageCount; i++) {
			if(i == dqPage) {
				item += "<span class='numbers current' >" + i + "</span>";
			} else {
				item += "<a data-pagenum='"+i+"' class='numbers' >" + i + "</a>";
			}
		};
	} else if(pageCount > 5) { //总页数大于五页，则加载五页
		if(dqPage < 5) { //当前页小于5，加载1-5页
			for(i; i <= 5; i++) {
				if(i == dqPage) {
					item += "<span class='numbers current' >" + i + "</span>";
				} else {
					item += "<a data-pagenum='"+i+"'  class='numbers' >" + i + "</a>";
				}
			};
			if(dqPage <= pageCount - 2) { //最后一页追加“...”代表省略的页
				item += "<span class='numbers' > . . . </span>";
			}
		} else if(dqPage >= 5) { //当前页大于5页
			for(i; i <= 2; i++) { //1,2页码始终显示
				item += "<a data-pagenum='"+i+"' class='numbers current' >" + i + "</a>";
			}
			item += "<span class='numbers' > . . . </span>"; //2页码后面用...代替部分未显示的页码
			if(dqPage + 1 == pageCount) { //当前页+1等于总页码
				for(i = dqPage - 1; i <= pageCount; i++) { //“...”后面跟三个页码当前页居中显示
					if(i == dqPage) {
						item += "<span class='numbers current'>" + i + "</span>";
					} else {
						item += "<a data-pagenum='"+i+"' class='numbers' >" + i + "</a>";
					}
				}
			} else if(dqPage == pageCount) { //当前页数等于总页数则是最后一页页码显示在最后
				for(i = dqPage - 2; i <= pageCount; i++) { //...后面跟三个页码当前页居中显示
					if(i == dqPage) {
						item += "<span class='numbers current'>" + i + "</span>";
					} else {
						item += "<a data-pagenum='"+i+"' class='numbers' >" + i + "</a>";
					}
				}
			} else { //当前页小于总页数，则最后一页后面跟...
				for(i = dqPage - 1; i <= dqPage + 1; i++) { //dqPage+1页后面...
					if(i == dqPage) {
						item += "<span class='numbers current' >" + i + "</span>";
					} else {
						item += "<a data-pagenum='"+i+"' class='numbers' >" + i + "</a>";
					}
				}
				item += "<span class='numbers' > . . . </span>";
			}
		}
	}
	return item;
};