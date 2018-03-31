//原型
function DropDownList(args){
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
	
	//调用初始化方法
	this.init(args);
}

//实例化成员（属性/方法）
DropDownList.prototype.init = function(args){
	this.renderTo = $("#"+args.renderTo);
	this.dataSource = args.dataSource; 
	//预加载项
	this.preloadItem = args.preloadItem;
	//点击事件
	this.onClick = args.onClick === undefined ? function(){} : args.onClick;
	//字段映射
	this.mapping = args.mapping === undefined ? {
		"key":"key",
		"value":"value"
	}: args.mapping;
	this.byDataSource();
};
//判断数据源（如果是字符串，调用ajax请求后台，如果是对象数组，直接调用build方法）
DropDownList.prototype.byDataSource = function(){
	var t = this;
	if(typeof(this.dataSource) == "string"){
		//是请求地址
		$.ajax({
			   type: "POST",
			   url: this.dataSource,
			   success: function(msg){
				   t.dataSource = JSON.parse(msg);
				   t.build();
			   }
			});
	}else{
		this.build();
	}
};

//创建页面元素
DropDownList.prototype.build = function(){
	var t = this;
	
	//创建头部;
	var ddlTitle = $("<div class='title'></div>").appendTo(this.renderTo);
	
//	var ddlTitle = document.createElement("div");
	//添加class样式
//	ddlTitle.className = "title";
	//把创建的头部添加到渲染区域
//	this.ddlAdd.appendChild(ddlTitle);
	
	//绘制选中元素
	
	this.selectText = $("<div class='seText'>南京</div>").appendTo(ddlTitle);
	
//	this.selectText = document.createElement("div");
//	this.selectText.className = "seText";
//	this.selectText.innerText = "南京";
//	ddlTitle.appendChild(this.selectText);
	
	//绘制三角箭头
	var arrow = $("<div class='arrow'></div>").appendTo(ddlTitle);
	
//	var arrow = document.createElement("div");
//	arrow.className = "arrow";
//	ddlTitle.appendChild(arrow);
	//绘制选择列表
	this.selectList = $("<ul class='ddlList hidden'></ul>").appendTo(this.renderTo);
	
//	this.selectList = document.createElement("ul");
//	this.selectList.className = "ddlList hidden";
//	this.ddlAdd.appendChild(this.selectList);
	
	//拼接预加载项和数据源
	if(this.preloadItem){
		this.dataSource = this.preloadItem.concat(t.dataSource);
	}
	

	//绘制选择项
	$(this.dataSource).each(function(index,item){
		
		var listItem = $("<li class='item' key='"+item[t.mapping["key"]]+"'>"+item[t.mapping["value"]]+"</li>").appendTo(t.selectList);
		  
	});
//	for(var i = 0;i<this.dataSource.length;i++){
//		var listItem = document.createElement("li");
//		listItem.className = "item";
//		listItem.setAttribute("key",this.dataSource[i]["id"]);
//		listItem.innerText = this.dataSource[i]["name"];
//		this.selectList.appendChild(listItem);
//	}
	
	//设置默认选中向
	this.select(t.selectList.children().first());
	
	this.bindEvent();
};
//绑定注册事件
DropDownList.prototype.bindEvent = function(){
	var t = this;
	//注册事件：让选择列表显示
	$(this.renderTo).click(function(){
		//判断ul列表是否有hidden样式
		if(t.selectList.hasClass("hidden")){
			//如果有，则删除
//			t.selectList.removeClass("hidden");
			
			t.show();
		}else{
			//如果没有则添加
//			t.selectList.addClass("hidden");
			t.hide();
		}
	});
	//给选择项添加点击事件
	$("li",this.renderTo).click(function(){
		//添加选中样式
		t.select(this);
		t.onClick({
			"id":$(this).attr("key"),
			"name":$(this).text()
		});
	});
} ;


//下拉列表显示动画
DropDownList.prototype.show = function(){
	var t = this;
	this.selectList.removeClass("hidden");
	setTimeout(function(){
		$(t.selectList).css({
			"opacity":"1",
			"top":"2em"
		});
	},1);
};
//下拉列表隐藏动画
DropDownList.prototype.hide = function(){
	var t = this;
	$(this.selectList).css({
		"opacity":"0",
		"top":"1em"
	});
	setTimeout(function(){
		t.selectList.addClass("hidden");
	},250);
	
	
};

DropDownList.prototype.select= function(li){
	var t = this;
	//让所有li取消选中样式
	$("li",t.renderTo).removeClass("itemSelect");
	//给当前选中的li添加选中样式
	$(li).addClass("itemSelect");
	//修改选中的文字
	t.selectText.text($(li).text());
};





