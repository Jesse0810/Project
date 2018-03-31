$(function(){
	//隐藏所有的提示信息
	if( isIELow()){
		
	}else{
		$(".placeholder").css("opacity","0");
	}

	//登录按钮点击事件
	$("[type='text'],[type='password']").each(function(){
		if($(this).val() != ""){
			$(this).next().next().css("opacity","0");
		}
	});

	$("#btn_confirm").click(function(){
		btn_confirm();
	});
	
	$("#btn_cancle").click(function(){
		top.userdialog.hide();
	});
	
	//刷新验证码
	getCode();
	//发验证码图片点击事件
	$("#codePic").click(function(){
		getCode();
	});
	
	//输入框添加各种事件
	$("[type='text'],[type='password']").focus(function(){

		hideTips(this);
	}).blur(function(){
		if($(this).attr("id")=="comfrimpwd"&&$("#newpwd").val() == ""){
			
		}else{
			checkTxt(this);
		}
		
	}).keydown(function(event){
		
		//让回车键支持 登录
		if(event.keyCode == "13"){
			btn_confirm();
		}
		
	}).keyup(function(){
		//键盘抬起 判断输入框中内容是否为空 
		if($(this).val() == ""){
			//让占位符显示
			$(this).next().next().removeClass("hidden");
		}else{
			//隐藏占位符
			$(this).next().next().addClass("hidden");
		}
		
	});
	
	$("#confirmpwd").bind("input propertychange",function(){
		if($("#newpwd").val() == ""){
			var msg = "请输入新密码";
			showTips(this,msg);
			$(this).val("");
		}else{
			hideTips(this);
		}
	});
	
	//如果IE灰色占位符被点击，默认点击下面的input输入框
	$(".placeholder").click(function(){
		$(this).prev().prev().focus();
	});
		
});

//刷新验证码
function getCode(){
	$("#codePic").attr("src",$("#codePic").attr("dataSource")+"?t="+ new Date());
}

function checkTxt(obj){
	//判断内容是否输入
	var msg;
	if($(obj).val() == ""){
		//显示提示信息
		msg = "请"+$(obj).attr("placeholder");
		return showTips(obj,msg);
	}
	
	//最小长度
	
	if($(obj).val().length < $(obj).attr("minlength")){
		//显示提示信息
		msg = "";
		if($(obj).attr("id") == "newpwd"){
			msg+="新密码";
		}else if($(obj).attr("id") == "confirmpwd"){
			msg+="重复密码";
		}
		
		msg += "字符长度不能小于"+$(obj).attr("minlength");
		return showTips(obj,msg);
	}
	
	
	//验证特殊字符
	if($(obj).attr("validate")&&!validate($(obj).val(),$(obj).attr("validate"))){
		//显示提示信息
		msg = "";
		if($(obj).attr("id") == "newpwd"){
			msg+="新密码";
		}else if($(obj).attr("id") == "confirmpwd"){
			msg+="重复密码";
		}
		
		msg+= $(obj).attr("errTips");
		return showTips(obj,msg);
	}
	
	if($(obj).attr("id")=="confirmpwd"){
		if($(obj).val()!=$("#newpwd").val()){
			msg = "密码输入不一致";
			return showTips(obj,msg);
		}
	}
	return hideTips(obj);
}


//错误信息显示
function showTips(obj,msg){
	$("#"+$(obj).attr("data-tip")).html("<i class='iconfont' >&#xe610;</i>"+msg);
	return 1;
	
}
//错误信息隐藏
function hideTips(obj){
	$("#"+$(obj).attr("data-tip")).html("");
	return 0;
}


//修改密码按钮点击事件
function btn_confirm(){
	
	//当页面正在请求时，不接受再次发送请求
	if($("#btn_confirm").hasClass("btnDisable")){
		return;
	}
	
	var errCount = 0;
	//是否有输入框没有正确输入值
	$("[type='text'],[type='password']").each(function(){
		errCount += checkTxt(this);
	});
	if(errCount>0){
		return ;
	}
	
	$("#btn_confirm").addClass("btnDisable").val("正在发送请求...");
	//事件提交
	
	
	$.post("modifyUserPassWord.action", { 
		"oldpassword": $("#oldpwd").val(), 
		"newpassword":$("#newpwd").val(),
		"code":$("#code").val()
	}, function(res){
		//判断后台返回值
		if(res.isSuccess == "true"){
			//给登录按钮添加登录成功样式
			$(".message").addClass("messageSuccess").text(res.msg);
			//一秒后跳转到框架页
			setTimeout(function(){
				$("#btn_confirm").removeClass("btnDisable").val("确认");
				top.location.href = $("base").attr("href")+"frame.jsp";
				
			},2000);
			$("#code").val("");
		}else{
			//给按钮添加 登录失败 样式
			$(".message").removeClass("messageSuccess").html("<i class='iconfont' >&#xe610;</i>修改密码失败，原因:"+res.msg)
			//1.5秒后设置成默认样式
			setTimeout(function(){
				$("#btn_confirm").removeClass("btnDisable").val("确认");
			},1500);
			//注册失败，刷新验证码
			getCode();
			//清空验证码输入框
			$("#code").val("");
		}
		
      
    });

};