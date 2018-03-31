<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String [] arrplace = {"用户名","密码","验证码"};
String [] arrTips = {"只能输入英文、数字、下划线","只能输入英文、数字","请和密码输入一致","只能输入数字"};
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <link rel="icon" href="image/index/logo-footer.png" type="image/x-icon"/>
    <title>小米注册页面</title>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
		<link rel="stylesheet" href="css/iconfont.css" />
  	<link rel="stylesheet" href="css/register.css" type="text/css"></link>
  	<script src="js/jquery-1.12.0.js" type="text/javascript" charset="utf-8"></script>
  	<script src="js/util.js" type="text/javascript" charset="utf-8"></script>
  	<script src="js/register.js" type="text/javascript" charset="utf-8"></script>
  </head>
  
  <body>
  	<div id="form-header" class="header">
			<div class="logo-con w clearfix">
				<a href="<%=basePath%>homePage.jsp" class="logo">
				</a>
				<div class="logo-title">欢迎注册</div>
				<div class="have-account">已有账号？
					<a href="<%=basePath%>login.jsp">请登录</a>
				</div>
			</div>
		</div>
		<div class="container clearfix">
			<div class="main">
				<div class="context">
					<div class="inputbox">
						<div class="logo name">
						</div>
						<label class="logo_title" for="userName" >用  户  名</label>
						<input type="text" placeholder="请输入用户名" name="username" id="userName" " validate="en_ " errTips="<%=arrTips[0] %>" minlength="3" maxlength="20" autocomplete="off" >
						<div class="placeholder">
							请输入用户名
						</div>
					</div>
					<div class="errTips">
							
					</div>
					<div class="inputbox">
						<div class="logo pwd">
						</div>
						<label class="logo_title" for="pwd" >设 置 密 码</label>
						<input type="password" placeholder="请设置您的密码" name="pwd" id="pwd" " validate="en_ " errTips="<%=arrTips[1] %>" minlength="3" maxlength="16" autocomplete="off">
						<div class="placeholder">
							请设置您的密码
						</div>
					</div>
					<div class="errTips">
							<%=arrplace[0] %>
					</div>
					<div class="inputbox">
						<div class="logo pwd">
						</div>
						<label class="logo_title" for="comfrimpwd" >确 认 密 码</label>
						<input type="password" placeholder="请确认您的密码" name="pwd" id="comfrimpwd" validate="en_" errTips="<%=arrTips[2] %>" minlength="3" maxlength="16" autocomplete="off">
						<div class="placeholder">
							请确认您的密码
						</div>
					</div>
					<div class="errTips">
						
					</div>
					<div class="inputbox">
						<div class="logo tel">
						</div>
						<label class="logo_title" for="tel" >手 机 号 码</label>
						<input type="text" placeholder="请设置手机号码" name="tel" id="tel" validate="n" errTips="<%=arrTips[3] %>" minlength="8" maxlength="11" autocomplete="off">
						<div class="placeholder confirm">
							请设置手机号码
						</div>
					</div>
					<div class="errTips">
							
					</div>
					<div class="inputbox">
						<div class="logo code">
						</div>
						<label class="logo_title" for="txtCode" >验 证 码</label>
						<input type="text" class="inputbox-code" placeholder="请输入验证码" name="code" id="txtCode">
						<div class="placeholder">
							请输入验证码
						</div>
						<img id="codePic" class="code_btn" src="" dataSource="makeCertPic.action" title="验证码" />
					</div>
					<div class="errTips">
							
					</div>
					<div class="login_message"></div>
					<div class="login_btn" id="btn_register">完成注册</div>
				</div>
			</div>
		</div>
		<div id="custom_display_4" class="n-footer">  
      <div class="nf-link-area clearfix">
        <ul class="lang-select-list">
          <li><a href="javascript:void(0)" data-lang="zh_CN" class="lang-select-li current">简体</a>|</li>
          <li><a href="?callback=https%3A%2F%2Forder.mi.com%2Flogin%2Fcallback%3Ffollowup%3Dhttps%253A%252F%252Fwww.mi.com%252Fredmi5%252F%26sign%3DOTlkZmRiOTlmZmI4N2ZiMjBkOGVmM2IxZWQwNTNkYzM3MWIzNzVlZg%2C%2C&amp;sid=mi_eshop&amp;_bannerBiz=mistore&amp;_qrsize=180&amp;_locale=zh_TW" data-lang="zh_TW" class="lang-select-li">繁体</a>|</li>
          <li><a href="?callback=https%3A%2F%2Forder.mi.com%2Flogin%2Fcallback%3Ffollowup%3Dhttps%253A%252F%252Fwww.mi.com%252Fredmi5%252F%26sign%3DOTlkZmRiOTlmZmI4N2ZiMjBkOGVmM2IxZWQwNTNkYzM3MWIzNzVlZg%2C%2C&amp;sid=mi_eshop&amp;_bannerBiz=mistore&amp;_qrsize=180&amp;_locale=en" data-lang="en" class="lang-select-li">English</a>|</li>
          <li><a href="https://static.account.xiaomi.com/html/faq/faqList.html" target="_blank">常见问题</a></li>
        </ul>
      </div>
      <p class="nf-intro">小米公司版权所有-京ICP备10046444-<a class="beian-record-link" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020134"><span><img src="https://account.xiaomi.com/static/res/9204d06/account-static/respassport/acc-2014/img/ghs.png"></span>京公网安备11010802020134号</a>-京ICP证110507号</p>
    </div>
		
  </body>
</html>
