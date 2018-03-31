//接收表格
var userGird;
//用来保存删除的id
var userId;

var condition="";//查询条件
$(function() {
	//修改和删除按钮禁用
	$("#updateBtn,#delBtn").addClass("btnDisable");
	
	new CurrentTime({
		"renderTo": "currentTime"
	});
	
	new DDL({
		"renderTo": "goodsPrice",
		"dataSource": [{
			"key": "-1",
			"value": "请选择"
		}, {
			"key": "between 0 and 499 ",
			"value": "0元到499元"
		}, {
			"key": "between 500 and 999 ",
			"value": "500元到999元"
		}, {
			"key": "between 1000 and 1699 ",
			"value": "1000元到1699元"
		}, {
			"key": "between 1700 and 2799 ",
			"value": "1700元到2799元"
		}, {
			"key": "between 2800 and 4499 ",
			"value": "2800元到4499元"
		}, {
			"key": ">= 4499 ",
			"value": "4499元以上"
		}],
		"direction":"down",
		"defaultSelect": "-1",
		"onClick": function(obj) {
			//刷新表格

		}
	});

	//加载用户级别下拉列表
	new DDL({
		"renderTo": "goodsType",
		"dataSource": "queryGoodsTypeAll.action",
		"preloadItem": [{
			"id": "-1",
			"name": "请选择"
		}],
		"mapping": {
			"key": "id",
			"value": "name"
		},
		"direction": "down",
		"defaultSelect": "-1",
		"onClick": function(obj) {
			//刷新表格
		
		}
	});
	
	
	lay('#version').html('-v'+ laydate.v);
	
	//执行一个laydate实例
	laydate.render({
		elem: '#createtime1',
		type: 'datetime', //指定元素
		format: 'yyyy年MM月dd日 HH:mm:ss',
		done: function(value, date, endDate) {
			//	    console.log(value); //得到日期生成的值，如：2017-08-18
			//	    console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
			//	    console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
			//	  	createtime1 = value;
		}
	});

	laydate.render({
		elem: '#createtime2',
		type: 'datetime', //指定元素
		format: 'yyyy年MM月dd日 HH:mm:ss',
		done: function(value, date, endDate) {
			//	    console.log(value); //得到日期生成的值，如：2017-08-18
			//	    console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
			//	    console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
			//	  	createtime2 = value;
		}
	});
	

	//增删改需要的数据
	var operate = {
		"addUrl": "insertGoods.action",
		"updateUrl": "updateGoods.action",
		"deleteUrl": "deleteGoods.action",
		"queryUrl":"queryGoodsById.action",
		"deleteText": "删除后无法恢复，确认删除码？",
		"operate": [{
			"name": "商品编号",
			"alias": "id",
			//操作（增删改）该列数据要用的html元素类型，text代表普通文本框
			"op_type": "text",
			"add_not_use": true,
			"update_not_use": true
		}, {
			"name": "商品名",
			"alias": "name",
			"op_type": "text",
			"placeholder": "请输入商品名",
			"minlength": 2,
			"maxlength": 30,
			"encode":true,
			"add_not_use": false,
			"update_not_use": false
		},{
			"name": "商品图片",
			"alias": "picture",
			"op_type": "image",
			"add_not_use": true,
			"update_not_use": true
		},{
			"name": "商品标题",
			"alias": "title",
			"op_type": "text",
			"placeholder": "请输入商品标题",
			"minlength": 3,
			"maxlength": 50,
			"encode":true,
			"add_not_use": false,
			"update_not_use": false
		},{
			"name": "商品说明",
			"alias": "description",
			"op_type": "textarea",
			"placeholder": "请输入商品说明",
			"minlength": 0,
			"maxlength": 200,
			"encode":true,
			"add_not_use": false,
			"update_not_use": false
		},{
			"name": "价格",
			"alias": "price",
			"op_type": "text",
			"placeholder": "请输入价格",
			"validate": "np",
			"errTips": "只能输入数字",
			"minlength": 1,
			"maxlength": 6,
			"add_not_use": false,
			"update_not_use": false
		},{
			"name": "库存",
			"alias": "stock",
			"op_type": "text",
			"placeholder": "请输入库存数",
			"validate": "np",
			"errTips": "只能输入数字",
			"defaultvalue":999,
			"minlength": 1,
			"maxlength": 8,
			"add_not_use": false,
			"update_not_use": false
		}, {
			"name": "类型",
			"alias": "typeId",
			"op_type": "ddl", //ddl代表下拉列表框
			"DropDownList": "queryGoodsTypeAll.action",
			"preloadItem": [{
				"id": "-1",
				"name": "请选择"
			}],
			"mapping":{
				"key":"id",
				"value":"name"
			},
			"defaultSelect": "-1",
			"direction":"up",
			"errTips": "请输入商品类型",
			"add_not_use": false,
			"update_not_use": false
			
		}, {
			"name": "厂商",
			"alias": "producer",
			"op_type": "text",
			"placeholder": "请输入厂商名",
			"validate": "ecpbn_",
			"errTips": "只能输入汉字、英文、数字、下划线",
			"minlength": 2,
			"maxlength": 30,
			"add_not_use": false,
			"update_not_use": false
		},{
			"name": "商品图片",
			"alias": "imgList",
			"op_type": "image",
			"minlength": 3,
			"maxlength": 6,
			"basePath":"image/goods/",
			"add_not_use": false,
			"update_not_use": false
		}]
	};
	
	var columns_goods = [{
		"name": "商品编号",
		"alias": "id",
		"hide": true
	}, {
		"name": "商品名",
		"alias": "name",
		"align": "center"
	}, {
		"name": "商品图片",
		"alias": "imgList",
		"formatter": function(txt) {
			return $(txt).map(function(){
				return "<img class='goodsImg' src='"+this.basePath + this.goodsId +"/"+ this.name + "'/>";
			}).get().join("");
		},
		"align": "center"
	}, {
		"name": "商品标题",
		"alias": "title",
		"align": "center"
	}, {
		"name": "商品说明",
		"alias": "description"
	}, {
		"name": "价格",
		"alias": "price",
		"formatter": function(txt) {
			return "<span class='goodsPrice' >" + txt + "</span>";
		},
		"align": "right"
	},{
		"name": "类型id",
		"alias": "typeId",
		"align": "center",
		"hide": true
	}, {
		"name": "类型",
		"alias": "typeName",
		"align": "center"
	}, {
		"name": "累计评论",
		"alias": "comments"
	}, {
		"name": "购买量",
		"alias": "purchases"
	}, {
		"name": "库存",
		"alias": "stock"
	}, {
		"name": "创建时间",
		"alias": "createDate",
		"align": "center"
	}];

	var pagesize_goods_id = "goodsPageSize";
	var dataSourceStr_goods = "queryGoodsForGrid.action";
	
	userGird = new Grid({
		"renderTo": "goodsGrid",
		"columns": columns_goods,
		"dataSource": dataSourceStr_goods,
		"pagesize_id": pagesize_goods_id,
		"postData": {
			"pageSize": 10,
			"pageNum": 1
		},
		"onClick": function(obj) {
			userId = obj.id;
			//行点击事件 改变修改按钮和删除按钮的禁用状态
			//判断是否有选中行 
			var row = $("#goodsGrid .itemtrSelect");
			if(row.length > 0) {
				//如果有选中行，给修改/删除按钮取消禁用
				$("#updateBtn,#delBtn").removeClass("btnDisable");
			} else {
				//如果没有，给修改/删除按钮加上禁用
				$("#updateBtn,#delBtn").addClass("btnDisable");
			}
		},
		"onComplate": function() {
			//组件完成之后条用 分页中的下拉列表

		}
	});
	
	//添加查询按钮点击事件
	$("#searchBtn").click(function(){
		Search_Btn();
	});
	//添加按钮点击事件
	//增删改操作公用一个网页由dialogType决定类型
	//0代表添加记录，1代表修改记录，2代表删除记录
	$("#addBtn").click(function() {
		//对话框显示 在frame.js中定义dialog全局变量，此处才能调用
		top.dialog.show({
			"title": "添加商品", //弹出窗提示信息
			"managerUrl": "jsp/tableOperate/tableOperate.jsp", //弹出窗内嵌页面路径
			"dialogWidth": 40, //动态改变弹出窗宽度以及定位
			"dialogHeight": 38, //动态改变弹出窗高度以及定位
			"columns": operate,
			"dialogType": 0
		});
	});
	//修改按钮点击事件
	$("#updateBtn").click(function() {
		
		//判断当前按钮是否在禁用状态
		if($(this).hasClass("btnDisable")){
			//如果在禁用状态，则return，不能让他走下面的代码
			return;
		}
		top.editid = userId;
		//对话框显示
		top.dialog.show({
			"title": "修改商品",
			"managerUrl": "jsp/tableOperate/tableOperate.jsp",
			"dialogWidth": 40,
			"dialogHeight": 38,
			"columns": operate,
			"dialogType": 1
		});
	}).mouseover(function(){
		//判断当前按钮是否在禁用状态
		if($(this).hasClass("btnDisable")){
			//如果在禁用状态，则return，不能让他走下面的代码
			return;
		}
		$(this).addClass("activeUpdate");
	}).mouseout(function(){
		//判断当前按钮是否在禁用状态
		if($(this).hasClass("btnDisable")){
			//如果在禁用状态，则return，不能让他走下面的代码
			return;
		}
		$(this).removeClass("activeUpdate");
	});
	
	//删除按钮点击事件
	$("#delBtn").click(function() {
		//判断当前按钮是否在禁用状态
		if($(this).hasClass("btnDisable")){
			//如果在禁用状态，则return，不能让他走下面的代码
			return;
		}
		top.editid = userId;
		//对话框显示
		top.dialog.show({
			"title": "删除商品",
			"managerUrl": "jsp/tableOperate/tableOperate.jsp",
			"dialogWidth": 25,
			"dialogHeight": 10,
			"columns": operate,
			"text": "删除后无法恢复，确认删除码？",
			"dialogType": 2
		});
	}).mouseover(function(){
		//判断当前按钮是否在禁用状态
		if($(this).hasClass("btnDisable")){
			//如果在禁用状态，则return，不能让他走下面的代码
			return;
		}
		$(this).addClass("activeDel");
	}).mouseout(function(){
		//判断当前按钮是否在禁用状态
		if($(this).hasClass("btnDisable")){
			//如果在禁用状态，则return，不能让他走下面的代码
			return;
		}
		$(this).removeClass("activeDel");
	});
	
});

function Search_Btn(){
	condition = " WHERE";
	
	var goodsName = $("#goodsName").val();
	if(goodsName!=""){
		condition+=" upper(G.NAME) LIKE upper('%"+goodsName+"%') AND ";
	}
	
	var goodsPrice = $("#goodsPrice .itemSelect").attr("key");
	if(goodsPrice!="-1"){
		condition+=" G.PRICE "+goodsPrice+" AND ";
	}
	
	var goodsType = $("#goodsType .itemSelect").attr("key");
	if(goodsType!="-1"){
		condition+=" T.ID = '"+goodsType+"' AND ";
	}
	
	var goodsProducer = $("#goodsProducer").val();
	if(goodsProducer!=""){
		condition+=" upper(G.PRODUCER) LIKE upper('%"+goodsProducer+"%') AND ";
	}
	
	var createtime1 = $("#createtime1").val();
	var createtime2 = $("#createtime2").val();
	
	if(createtime1 != "" && createtime2 != "") {
		condition+=" G.CREATEDATE between to_date('"+createtime1+"','yyyy\"年\"mm\"月\"dd\"日\" hh24:mi:ss')"+
		" and to_date('"+createtime2+"','yyyy\"年\"mm\"月\"dd\"日\" hh24:mi:ss') AND ";
	}else{
		if($("#eyTime1").val() != "" && $("#eyTime2").val()  != "") {
			condition += " G.CREATEDATE between to_date('" + $("#eyTime1").val() + "','yyyy-mm-dd hh24:mi:ss')" +
				" and to_date('" + $("#eyTime2").val() + "','yyyy-mm-dd hh24:mi:ss') AND ";
		}
	}	
	
	
	condition+=" 1=1 ";
	
	userGird.reload(10,1,condition);
	
}
