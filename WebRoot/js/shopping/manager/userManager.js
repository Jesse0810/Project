//接收表格
var userGird;
//用来保存删除的id
var userId;

var condition="";//查询条件
var jqTime1="";
var jqTime2="";
$(function() {
	//修改和删除按钮禁用
	$("#updateBtn,#delBtn").addClass("btnDisable");
	
	new CurrentTime({
		"renderTo": "currentTime"
	});
	
	new DDL({
		"renderTo": "userLvl",
		"dataSource": [{
			"key": "-1",
			"value": "请选择"
		}, {
			"key": "0",
			"value": "普通用户"
		}, {
			"key": "1",
			"value": "管理员"
		}, {
			"key": "2",
			"value": "超级管理员"
		}],
		"direction":"down",
		"defaultSelect": "-1",
		"onClick": function(obj) {
			//刷新表格

		}
	});

	//加载用户级别下拉列表
	new DDL({
		"renderTo": "userSex",
		"dataSource": [{
			"key": "-1",
			"value": "请选择"
		}, {
			"key": "1",
			"value": "女"
		}, {
			"key": "0",
			"value": "男"
		}],
		"direction":"down",
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
	
	$.datepicker.regional['zh-CN'] = {
		closeText: '关闭',
		prevText: '<上月',
		nextText: '下月>',
		currentText: '今天',
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
			'七月', '八月', '九月', '十月', '十一月', '十二月'
		],
		monthNamesShort: ['一', '二', '三', '四', '五', '六',
			'七', '八', '九', '十', '十一', '十二'
		],
		dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
		dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
		dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
		weekHeader: '周',
		dateFormat: 'yy年mm月dd日',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '年'
	};
	
	$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
	
	$("#jqTime1").datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		onClose: function(selectedDate) {
			jqTime1 = selectedDate;
			$("#jqTime2").datepicker("option", "minDate", selectedDate);
		}
	});
	
	$("#jqTime2").datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		onClose: function(selectedDate) {
			jqTime2 = selectedDate;
			$("#jqTime1").datepicker("option", "maxDate", selectedDate);
		}
	});
	
//	laydate.render({
//	  elem: '#createtime2',
//	  type: 'datetime',//指定元素
//	  format: 'yyyy年MM月dd日 HH:mm:ss',
//	  done: function(value, date, endDate){
////	    console.log(value); //得到日期生成的值，如：2017-08-18
////	    console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
////	    console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
////	  	createtime2 = value;
//	  }
//	});

	
	//增删改需要的数据
	var operate = {
		"addUrl": "insertUser.action",
		"updateUrl": "updateUser.action",
		"deleteUrl": "deleteUser.action",
		"queryUrl":"queryUserById.action",
		"deleteText": "删除后无法恢复，确认删除码？",
		"operate": [{
			"name": "用户编号",
			"alias": "id",
			//操作（增删改）该列数据要用的html元素类型，text代表普通文本框
			"op_type": "text",
			"add_not_use": true,
			"update_not_use": true
		}, {
			"name": "用户头像",
			"alias": "image",
			//image代表图片上传控件
			"op_type": "image",
			"minlength": 0,
			"maxlength": 1,
			"basePath":"image/user/",
			"add_not_use": false,
			"update_not_use": false
		}, {
			"name": "登录名",
			"alias": "name",
			"op_type": "text",
			"placeholder": "请输入用户名",
			"validate": "en_",
			"errTips": "只能输入英文、数字、下划线",
			"minlength": 3,
			"maxlength": 20,
			"add_not_use": false,
			"update_not_use": false
		}, {
			"name": "登录密码",
			"alias": "pwd",
			//password代表密码输入框
			"op_type": "password",
			"placeholder": "请输入密码",
			"validate": "en",
			"errTips": "只能输入英文、数字",
			"minlength": 3,
			"maxlength": 16,
			"add_not_use": false,
			"update_not_use": false
		}, {
			"name": "用户级别",
			"alias": "lvl",
			//ddl代表下拉列表框
			"op_type": "ddl",
			"DropDownList": [{
				"key": "-1",
				"value": "请选择"
			}, {
				"key": "0",
				"value": "普通用户"
			}, {
				"key": "1",
				"value": "管理员"
			}, {
				"key": "2",
				"value": "超级管理员"
			}],
			"defaultSelect": "-1",
			"direction": "up",
			"errTips": "请输入用户级别",
			"add_not_use": false,
			"update_not_use": false
		}, {
			"name": "用户性别",
			"alias": "sex",
			//ddl代表下拉列表框
			"op_type": "ddl",
			"DropDownList": [{
				"key": "-1",
				"value": "请选择"
			}, {
				"key": "0",
				"value": "男"
			}, {
				"key": "1",
				"value": "女"
			}],
			"defaultSelect": "-1",
			"direction": "up",
			"errTips": "请输入用户性别",
			"add_not_use": false,
			"update_not_use": false
		}]
	};

	var columns = [{
		"name": "用户编号",
		"alias": "id",
		"hide": true, //列表是否隐藏该列，true就代表隐藏

	}, {
		"name": "用户头像",
		"alias": "image",
		"formatter": function(txt) {
			return "<img class='userImg' src='image/user/" + txt + "'/>";
		},
		"align": "center"

	}, {
		"name": "登录名",
		"alias": "name",
		"align": "center"
	}, {
		"name": "登录密码",
		"alias": "pwd",
		"align": "center"

	}, {
		"name": "用户级别",
		"alias": "lvl",
		"formatter": function(txt) {
			//如果后台传过来性别是 0  1    我在前台页面 转成可视化 效果
			var newTxt = "";
			if(txt == "0") {
				newTxt = "<i title='普通用户' class='iconfont icon-user User' ></i>";				
			} else if(txt == "1"){
				newTxt = "<i title='管理员' class='iconfont icon-guanliyuan1 maUser' ></i>";
			}else if(txt == "2"){
				newTxt = "<i title='超级管理员' class='iconfont icon-kehuguanli superMaUser' ></i>";
			}
			return newTxt;
		},
		"align": "center"
	}, {
		"name": "用户性别",
		"alias": "sex",
		"formatter": function(txt) {
			//如果后台传过来性别是 0  1    我在前台页面 转成可视化 效果
			var newTxt = "";
			if(txt == "0") {
				newTxt = "<i class='iconfont icon-nan fMan' ></i>";
			} else {
				newTxt = "<i class='iconfont icon-nv woMan' ></i>";
			}
			return newTxt;
		},
		"align": "center"
	}, {
		"name": "创建时间",
		"alias": "createDate",
		"align": "center"
	}];

	var pagesize_id = "userPageSize";
	var dataSourceStr = "queryUserForGrid.action";
	
	
	userGird = new Grid({
		"renderTo": "userGrid",
		"columns": columns,
		"dataSource": dataSourceStr,
		"pagesize_id": pagesize_id,
		"postData":{
			"condition":condition
		},
		"onClick": function(obj) {
			userId = obj.id;
			//行点击事件 改变修改按钮和删除按钮的禁用状态
			//判断是否有选中行 
			var row = $("#userGrid .itemtrSelect");
			if(row.length > 0){
				//如果有选中行，给修改/删除按钮取消禁用
				$("#updateBtn,#delBtn").removeClass("btnDisable");
			}else{
				//如果没有，给修改/删除按钮加上禁用
				$("#updateBtn,#delBtn").addClass("btnDisable");
			}
		},
		"onComplate": function(obj) {
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
			"title": "添加用户", //弹出窗提示信息
			"managerUrl": "jsp/tableOperate/tableOperate.jsp", //弹出窗内嵌页面路径
			"dialogWidth": 40, //动态改变弹出窗宽度以及定位
			"dialogHeight": 28, //动态改变弹出窗高度以及定位
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
			"title": "修改用户",
			"managerUrl": "jsp/tableOperate/tableOperate.jsp",
			"dialogWidth": 40,
			"dialogHeight": 28,
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
			"title": "删除用户",
			"managerUrl": "jsp/tableOperate/tableOperate.jsp",
			"dialogWidth": 25,
			"dialogHeight": 10,
			"columns": operate,
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
	
	var userName = $("#userName").val();
	if(userName!=""){
		condition+=" upper(NAME) LIKE upper('%"+userName+"%') AND ";
	}
	
	var userLvl = $("#userLvl .itemSelect").attr("key");
	if(userLvl!="-1"){
		condition+=" LVL = "+userLvl+" AND ";
	}
	
	var userSex = $("#userSex .itemSelect").attr("key");
	if(userSex!="-1"){
		condition+=" SEX = "+userSex+" AND ";
	}
	
	var createtime1 = $("#createtime1").val();
	var createtime2 = $("#createtime2").val();
	
	if(createtime1 != "" && createtime2 != "") {
		condition += " CREATEDATE between to_date('" + createtime1 + "','yyyy\"年\"mm\"月\"dd\"日\" hh24:mi:ss')" +
			" and to_date('" + createtime2 + "','yyyy\"年\"mm\"月\"dd\"日\" hh24:mi:ss') AND ";
	}else {
		if(jqTime1 != "" && jqTime2 != "") {
			condition += " CREATEDATE between to_date('" + jqTime1 + "','yyyy\"年\"mm\"月\"dd\"日\"')" +
				" and to_date('" + jqTime2 + "','yyyy\"年\"mm\"月\"dd\"日\"') AND ";
		}
	}
	
	condition += " 1=1 ";
	
	userGird.reload(10, 1, condition);
}