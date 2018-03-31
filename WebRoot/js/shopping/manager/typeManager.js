//接收表格
var userGird;
//用来保存删除的id
var userId;
$(function() {
	//修改和删除按钮禁用
	$("#updateBtn,#delBtn").addClass("btnDisable");

	new CurrentTime({
		"renderTo": "currentTime"
	});

	lay('#version').html('-v' + laydate.v);

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
	
	$('.modal').modal({
		ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
	
			$.get("queryGoodsTypeGroupByGoodsCount.action", function(msg) {
				
				var myChart = echarts.init(document.getElementById('main'));
				
				var data = {
					legendData:[],
					selected:{},
					seriesData:[]
				};
				
				$(msg).each(function(value,item){
					data.legendData.push(item.name);
					data.selected[item.name] = true;
					data.seriesData.push({
						name:item.name,
						value:item.num
					});
				});
				
//				var data = genData(50);
				
				console.log(data);
				
				option = {
					title: {
						text: '相同类型商品数量统计',
						x: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						type: 'scroll',
						orient: 'vertical',
						right: 10,
						top: 20,
						bottom: 20,
						data: data.legendData,
	
						selected: data.selected
					},
					series: [{
						name: '商品类型名',
						type: 'pie',
						radius: '55%',
						center: ['40%', '50%'],
						data: data.seriesData,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};
	
//				function genData(count) {
//					var nameList = [
//						'赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
//					];
//					var legendData = [];
//					var seriesData = [];
//					var selected = {};
//					for(var i = 0; i < 50; i++) {
//						name = Math.random() > 0.65 ?
//							makeWord(4, 1) + '·' + makeWord(3, 0) :
//							makeWord(2, 1);
//						legendData.push(name);
//						seriesData.push({
//							name: name,
//							value: Math.round(Math.random() * 100000)
//						});
//						selected[name] = i < 6;
//					}
//	
//					return {
//						legendData: legendData,
//						seriesData: seriesData,
//						selected: selected
//					};
//	
//					function makeWord(max, min) {
//						var nameLen = Math.ceil(Math.random() * max + min);
//						var name = [];
//						for(var i = 0; i < nameLen; i++) {
//							name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
//						}
//						return name.join('');
//					}
//				}
	
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			});
	
		}
	});
	
	//增删改需要的数据
	var operate = {
		"addUrl": "insertGoodsType.action",
		"updateUrl": "updateGoodsType.action",
		"deleteUrl": "deleteGoodsType.action",
		"queryUrl": "queryGoodsTypeById.action",
		"deleteText": "删除后无法恢复，确认删除码？",
		"operate": [{
			"name": "商品类型编号",
			"alias": "id",
			//操作（增删改）该列数据要用的html元素类型，text代表普通文本框
			"op_type": "text",
			"add_not_use": true,
			"update_not_use": true
		}, {
			"name": "商品类型名",
			"alias": "name",
			"op_type": "text",
			"placeholder": "请输入商品类型名",
			"validate": "ecpbn_",
			"errTips": "只能输入汉字、英文、数字、下划线",
			"minlength": 2,
			"maxlength": 15,
			"add_not_use": false,
			"update_not_use": false
		}]
	};

	var columns_type = [{
		"name": "类型编号",
		"alias": "id",
		"not_use": true,
		"align": "center",
		"op_type": "text" //操作（增删改）该列数据要用的html元素类型，text代表普通文本框
	}, {
		"name": "类型名",
		"alias": "name",
		"align": "center",
		"op_type": "text"
	}, {
		"name": "创建时间",
		"alias": "createDate",
		"align": "center",
		"not_use": true,
		"op_type": "text"
	}];

	var pagesize_type_id = "typePageSize";

	var dataSourceStr_type = "queryGoodsTypeForGrid.action";

	userGird = new Grid({
		"renderTo": "typeGrid",
		"columns": columns_type,
		"dataSource": dataSourceStr_type,
		"pagesize_id": pagesize_type_id,
		"postData": {
			"pageSize": 10,
			"pageNum": 1
		},
		"onClick": function(obj) {
			userId = obj.id;
			//行点击事件 改变修改按钮和删除按钮的禁用状态
			//判断是否有选中行 
			var row = $("#typeGrid .itemtrSelect");
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
			"title": "添加商品类型", //弹出窗提示信息
			"managerUrl": "jsp/tableOperate/tableOperate.jsp", //弹出窗内嵌页面路径
			"dialogWidth": 40, //动态改变弹出窗宽度以及定位
			"dialogHeight": 12, //动态改变弹出窗高度以及定位
			"columns": operate,
			"dialogType": 0
		});
	});
	//修改按钮点击事件
	$("#updateBtn").click(function() {
		//判断当前按钮是否在禁用状态
		if($(this).hasClass("btnDisable")) {
			//如果在禁用状态，则return，不能让他走下面的代码
			return;
		}
		top.editid = userId;
		//对话框显示
		top.dialog.show({
			"title": "修改商品类型",
			"managerUrl": "jsp/tableOperate/tableOperate.jsp",
			"dialogWidth": 40,
			"dialogHeight": 12,
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
		if($(this).hasClass("btnDisable")) {
			//如果在禁用状态，则return，不能让他走下面的代码
			return;
		}
		top.editid = userId;
		//对话框显示
		top.dialog.show({
			"title": "删除商品类型",
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
	
	var goodsTypeName = $("#goodsTypeName").val();
	if(goodsTypeName!=""){
		condition+=" upper(NAME) LIKE upper('%"+goodsTypeName+"%') AND ";
	}
	
	var createtime1 = $("#createtime1").val();
	var createtime2 = $("#createtime2").val();
	
	if(createtime1!=""&&createtime2!=""){
		condition+=" CREATEDATE between to_date('"+createtime1+"','yyyy\"年\"mm\"月\"dd\"日\" hh24:mi:ss')"+
		" and to_date('"+createtime2+"','yyyy\"年\"mm\"月\"dd\"日\" hh24:mi:ss') AND ";
	}
	
	
	condition+=" 1=1 ";
	
	userGird.reload(10,1,condition);
	
}