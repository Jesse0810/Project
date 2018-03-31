<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String [] arrplace = {"用户名","密码","验证码"};
String [] arrTips = {"只能输入英文、数字、下划线","只能输入英文、数字","请和密码输入一致"};
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>修改密码页面</title>
		
		<link rel="stylesheet" href="css/iconfont.css" />
  	<link rel="stylesheet" href="css/mod_password.css" type="text/css"></link>
  	<script src="js/jquery-1.12.0.js" type="text/javascript" charset="utf-8"></script>
  	<script src="js/util.js" type="text/javascript" charset="utf-8"></script>
  	<script src="js/userOperate/mod_password.js" type="text/javascript" charset="utf-8"></script>
  </head>
  
  <body>
  	<div class="main">
				<div class="inputbox" >
					<h4>原密码</h4>
					<div class="input-item" >
						<input type="password" placeholder="输入原密码" name="pwd"  id="oldpwd" data-tip= "oldpwd_tip"  validate="en_" errTips="只能输入字母、数字和下划线" minlength="3" maxlength="16" autocomplete="off">
						<div class="placeholder">输入原密码</div>
					</div>
					<div id="oldpwd_tip" class="err_tip oldpwd" ></div>
				</div>
				<div class="inputbox" >
					<h4>新密码</h4>
					<div class="input-item" >
						<input type="password" placeholder="输入新密码" name="pwd"  id="newpwd" data-tip= "newpwd_tip"  validate="en_" errTips="只能输入字母、数字和下划线" minlength="3" maxlength="16" autocomplete="off">
						<div class="placeholder">输入新密码</div>
					</div>
					<div class="input-item" >
						<input type="password" placeholder="重复新密码" name="pwd"  id="confirmpwd" data-tip= "newpwd_tip"  validate="en_" errTips="只能输入字母、数字和下划线" minlength="3" maxlength="16" autocomplete="off">
						<div class="placeholder confirm">重复新密码</div>
					</div>
					<div id="newpwd_tip" class="err_tip newpwd" ></div>
				</div>
				<div class="inputbox" >
					<h4>验证码</h4>
					<div class="input-item code" >
						<input type="text" placeholder="输入图片验证码" name="code" data-tip= "code_tip"   id="code" minlength="4" maxlength="4" autocomplete="off">
						<div class="placeholder">输入图片验证码</div>
					</div>
					<img id="codePic"  class="code_btn"  src=""  dataSource="makeCertPic.action" title="验证码"/>
					<div id="code_tip" class="err_tip codetip" ></div>
				</div>
				<div class="err_tip message" ></div>
				<div class="tip_btns">
					<input type="button" id="btn_confirm" value="确认" />
					<input type="button" id="btn_cancle" value="取消" />
				</div>
		</div>
  </body>
</html>
