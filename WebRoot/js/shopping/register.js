$(function(){
	//隐藏所有的提示信息
	if( isIELow()){
		$(".errTips").css("opacity","0");
	}else{
		$(".placeholder").css("opacity","0");
	}

	//登录按钮点击事件
	$("[type='text'],[type='password']").each(function(){
		if($(this).val() != ""){
			$(this).next().css("opacity","0");
		}
	});

	$("#btn_register").click(function(){
		btn_register();
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
		if($(this).attr("id")=="comfrimpwd"&&$("#pwd").val() == ""){
			
		}else{
			checkTxt(this);
		}
		
	}).keydown(function(event){
		
		//让回车键支持 登录
		if(event.keyCode == "13"){
			btn_register();
		}
		
	}).keyup(function(){
		//键盘抬起 判断输入框中内容是否为空 
		if($(this).val() == ""){
			//让占位符显示
			$(this).next().removeClass("hidden");
		}else{
			//隐藏占位符
			$(this).next().addClass("hidden");
		}
		
	});
	
	$("#comfrimpwd").bind("input propertychange",function(){
		if($("#pwd").val() == ""){
			var msg = "请先输入密码";
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
		msg = $(obj).attr("placeholder");
		return showTips(obj,msg);
	}
	
	//最小长度
	
	if($(obj).val().length < $(obj).attr("minlength")){
		//显示提示信息
		msg = "字符长度不能小于"+$(obj).attr("minlength");
		return showTips(obj,msg);
	}
	
	
	//验证特殊字符
	if($(obj).attr("validate")&&!validate($(obj).val(),$(obj).attr("validate"))){
		//显示提示信息
		msg = $(obj).attr("errTips");
		return showTips(obj,msg);
	}
	
	if($(obj).attr("id")=="comfrimpwd"){
		if($(obj).val()!=$("#pwd").val()){
			msg = "两次密码输入不一致";
			return showTips(obj,msg);
		}
	}
	return hideTips(obj);
}


//错误信息显示
function showTips(obj,msg){
	$(obj).parent().addClass("txtError");
	$(obj).parent().next().html("<i class='iconfont' >&#xe610;</i>"+msg);
	if(isIELow()){
		$(obj).parent().next().animate({
			"opacity":"1",
			"left":"1em"
		},250);
	}else{
		$(obj).parent().next().css({
			"opacity":"1",
			"left":"1em"
		});
	}
	return 1;
	
}
//错误信息隐藏
function hideTips(obj){
	$(obj).parent().removeClass("txtError");
	if(isIELow()){
		$(obj).parent().next().animate({
			"opacity":"0",
			"left":"-0.4em"
		},250);
	}else{
		$(obj).parent().next().css({
			"opacity":"0",
			"left":"-0.4em"
		});
	}
	return 0;
}


//登录按钮点击事件
function btn_register(){
	
	//当页面正在请求时，不接受再次发送请求
	if($("#btn_register").hasClass("btnDisable")){
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
	
	$("#btn_register").addClass("btnDisable").text("正在发送请求，请稍候...");
	//事件提交
	
	
	$.post("register.action", { 
		"name": $("#userName").val(), 
		"pwd":$("#pwd").val(),
		"code":$("#txtCode").val(),
		"tel":$("#tel").val()
	}, function(res){
		//判断后台返回值
		if(res.isSuccess == "true"){
			//给登录按钮添加登录成功样式
			$(".login_message").addClass("messageSuccess").text(res.msg);
			//一秒后跳转到框架页
			setTimeout(function(){
				$("#btn_register").removeClass("btnDisable").text("注册");
				window.location.href = $("base").attr("href")+"homePage.jsp";
				
			},1000);
			$("#txtCode").val("");
		}else{
			//给按钮添加 登录失败 样式
			$(".login_message").addClass("messageError").text("注册失败，原因:"+res.msg)
			//1.5秒后设置成默认样式
			setTimeout(function(){
				$("#btn_register").removeClass("btnDisable").text("注册");
			},1500);
			//注册失败，刷新验证码
			getCode();
			//清空验证码输入框
			$("#txtCode").val("");
		}
		
      
    });

};