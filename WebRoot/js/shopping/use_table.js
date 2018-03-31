$(function(){
	var columns = [{
		"name":"用户编号",
		"alias":"id"
	},{
		"name":"登录名",
		"alias":"name"
	},{
		"name":"登录密码",
		"alias":"pwd"
	},{
		"name":"创建时间",
		"alias":"createDate"
	}];
	
	var pagesize_id = "userPageSize";
	
	var dataSource = {
		"total":"100",
		"rows":[{
			"id":"001",
			"name":"admin01",
			"pwd":"admin01pwd",
			"createDate":"2017-8-8"
		},{
			"id":"002",
			"name":"admin02",
			"pwd":"admin02pwd",
			"createDate":"2017-8-8"
		},{
			"id":"003",
			"name":"admin03",
			"pwd":"admin03pwd",
			"createDate":"2017-8-8"
		},{
			"id":"004",
			"name":"admin04",
			"pwd":"admin04pwd",
			"createDate":"2017-8-8"
		}]
	};
	
	var dataSourceStr = "QueryUserForGridServlet.action";
	
	new Grid({
		"renderTo":"userGrid",
		"columns":columns,
		"dataSource":dataSourceStr,
		"postData":{
			"pageNum":1,
			"pageSize":10
		},
		"pagesize_id":pagesize_id,
		"onClick":function(obj){
			alert(obj.id);
		},
		"onComplate":function(){
			//组件完成之后条用 分页中的下拉列表
			new DDL({
				"renderTo":pagesize_id,
				"dataSource":[{
					"key":"3",
					"value":"3"
				},{
					"key":"5",
					"value":"5"
				},{
					"key":"7",
					"value":"7"
				}],
				"onClick":function(obj){
					
				}
			});
			
		}
	});
	
	/*商品表*/
	
	var columns_goods = [{
		"name":"商品编号",
		"alias":"id"
	},{
		"name":"商品名",
		"alias":"name"
	},{
		"name":"商品图片",
		"alias":"picture"
	},{
		"name":"商品标题",
		"alias":"title"
	},{
		"name":"价格",
		"alias":"price"
	}];
	
	var pagesize_goods_id = "goodsPageSize";
	
	var dataSource_goods = {
		"total":"50",
		"rows":[{
			"id":"001",
			"name":"admin01",
			"pwd":"admin01pwd",
			"createDate":"2017-8-8"
		},{
			"id":"002",
			"name":"admin02",
			"pwd":"admin02pwd",
			"createDate":"2017-8-8"
		},{
			"id":"003",
			"name":"admin03",
			"pwd":"admin03pwd",
			"createDate":"2017-8-8"
		},{
			"id":"004",
			"name":"admin04",
			"pwd":"admin04pwd",
			"createDate":"2017-8-8"
		}]
	};
	
	var dataSourceStr_goods = "QueryGoodsForGridServlet.action";
	
	new Grid({
		"renderTo":"goodsGrid",
		"columns":columns_goods,
		"dataSource":dataSourceStr_goods,
		"pagesize_id":pagesize_goods_id,
		"onClick":function(obj){
			alert(obj.id);
		},
		"onComplate":function(){
			//组件完成之后条用 分页中的下拉列表
			new DDL({
				"renderTo":pagesize_goods_id,
				"dataSource":[{
					"key":"3",
					"value":"3"
				},{
					"key":"5",
					"value":"5"
				},{
					"key":"7",
					"value":"7"
				}],
				"onClick":function(obj){
					
				}
			});
			
		}
	});
	
	/*类型表*/
	
	var columns_type = [{
		"name":"类型编号",
		"alias":"id"
	},{
		"name":"类型名",
		"alias":"name"
	}];
	
	var pagesize_type_id = "typePageSize";
	
	var dataSource_type = {
		"total":"50",
		"rows":[{
			"id":"001",
			"name":"admin01",
			"pwd":"admin01pwd",
			"createDate":"2017-8-8"
		},{
			"id":"002",
			"name":"admin02",
			"pwd":"admin02pwd",
			"createDate":"2017-8-8"
		},{
			"id":"003",
			"name":"admin03",
			"pwd":"admin03pwd",
			"createDate":"2017-8-8"
		},{
			"id":"004",
			"name":"admin04",
			"pwd":"admin04pwd",
			"createDate":"2017-8-8"
		}]
	};
	
	var dataSourceStr_type = "QueryGoodsTypeForGridServlet.action";
	
	new Grid({
		"renderTo":"typeGrid",
		"columns":columns_type,
		"dataSource":dataSourceStr_type,
		"pagesize_id":pagesize_type_id,
		"onClick":function(obj){
			alert(obj.id);
		},
		"onComplate":function(){
			//组件完成之后条用 分页中的下拉列表
			new DDL({
				"renderTo":pagesize_type_id,
				"dataSource":[{
					"key":"3",
					"value":"3"
				},{
					"key":"5",
					"value":"5"
				},{
					"key":"7",
					"value":"7"
				}],
				"onClick":function(obj){
					
				}
			});
			
		}
	});
});