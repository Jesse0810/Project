$(function(){
	//隐藏所有的提示信息
	if( isIELow()){
		$(".errTips").css("opacity","0");
	}else{
		$(".placeholder").css("opacity","0");
	}
	$("[type='text'],[type='password']").each(function(){
		if($(this).val() != ""){
			$(this).next().next().css("opacity","0");
		}
	});

	//登录按钮点击事件
	$("#btn_login").click(function(){
		btn_login();
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
		checkTxt(this);	
	}).keydown(function(event){
		
		//让回车键支持 登录
		if(event.keyCode == "13"){
			btn_login();
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
	
	$(".u-checkbox").click(function(){
		if($(this).hasClass("checked")){
			$(this).removeClass("checked");
			$(this).children().prop("checked",false);
		}else{
			$(this).addClass("checked");
			$(this).children().prop("checked",true);
		}
	});
	
	//判断cookie中是否有用户名
	var userName = getCookie("userName");
	if(userName != "undefined" &&  userName !="" && userName != null  ){
		//如果有就默认填充用户名输入框
		$("#tel").val(userName);
		//默认帮用户选中checkbox框
		$(".u-checkbox").addClass("checked");
		$("#un-login").prop("checked",true);
		//焦点默认选中密码框
		$("#pwd").focus();
	}else{
		$("#tel").val("");
		$(".u-checkbox").removeClass("checked");
		$("#un-login").prop("checked",false);
		$("#tel").focus();
	}
	
	$("#changepage").click(function(){
		window.location.href = $("base").attr("href")+"register.jsp";
	});
		
	//如果IE灰色占位符被点击，默认点击下面的input输入框
	$(".placeholder").click(function(){
		$(this).prev().prev().focus();
	});
		
});

//刷新验证码
function getCode(){
	$("#codePic").attr("src",$("#codePic").attr("dataSource")+"?t="+ Date.parse(new Date()));
}


function checkTxt(obj){
	//判断内容是否输入
	var msg;
	if($(obj).val() == ""){
		//显示提示信息		
		msg = "请输入"+$(obj).attr("placeholder");
		return showTips(obj,msg);
	}else{
		return hideTips(obj);
	}
	
}


//错误信息显示
function showTips(obj,msg){
	$(obj).parent().addClass("txtError");
	$(obj).next().text(msg);
	if(isIELow()){
		$(obj).next().animate({
			"opacity":"1",
			"right":"1em"
		},250);
	}else{
		$(obj).next().css({
			"opacity":"1",
			"right":"1em"
		});
	}
	return 1;
	
}
//错误信息隐藏
function hideTips(obj){
	$(obj).parent().removeClass("txtError");
	if(isIELow()){
		$(obj).next().animate({
			"opacity":"0",
			"right":"-0.4em"
		},250);
	}else{
		$(obj).next().css({
			"opacity":"0",
			"right":"-0.4em"
		});
	}
	return 0;
}


//登录按钮点击事件
function btn_login(){
	
	//当页面正在请求时，不接受再次发送请求
	if($("#btn_login").hasClass("btnDisable")){
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
	
	$("#btn_login").addClass("btnDisable").text("正在发送请求，请稍候...");
	//事件提交
	
	
	$.post("login.action", { 
		"name": $("#tel").val(), 
		"pwd":$("#pwd").val(),
		"code":$("#code").val()
	}, function(res){
		//判断后台返回值
		if(res.isSuccess == "true"){			
			//判断记住我有没有被选中
			setCookie("userName",$("#un-login").is(":checked") ? $("#tel").val() : "");
			
			$(".login_message").removeClass("messageError");
			$(".login_message").addClass("messageSuccess").text(res.msg)
			//一秒后跳转到框架页
			setTimeout(function(){
				$("#btn_login").removeClass("btnDisable").text("登录");
				var cookies= getCookie("loginUrl");
				if(cookies!=null){
					cookies = decodeURIComponent(cookies);
					setCookie("loginUrl",null);
					console.log(cookies);
					window.location.href = cookies;
				}else{
					window.location.href = $("base").attr("href")+"frame.jsp";
				}		
				
//				document.referrer === '' ?
//		          window.location.href = $("base").attr("href")+"frame.jsp" :
//		          window.history.go(-1);
			},1000);
			$("#code").val("");
		}else{
			//给按钮添加 登录失败 样式
			$(".login_message").addClass("messageError").text("登录失败，原因:"+res.msg)
			//1.5秒后设置成默认样式
			setTimeout(function(){
				$("#btn_login").removeClass("btnDisable").text("登录");
			},1500);
			//登录失败，刷新验证码
			getCode();
			//清空验证码输入框
			$("#code").val("");
		}
		
      
    });

};