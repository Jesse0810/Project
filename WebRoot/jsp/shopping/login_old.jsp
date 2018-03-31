<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String [] arrplace = {"用户名","密码","验证码"};
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <link rel="icon" href="image/index/logo-footer.png" type="image/x-icon"/>
    <title>小米登录界面</title>
		
		<link rel="stylesheet" type="text/css" href="css/iconfont.css"/>
  	<link rel="stylesheet" href="css/login.css" type="text/css"/>
  	<script type="text/javascript" src="js/jquery-1.12.0.js" ></script>
  	<script src="js/util.js" type="text/javascript" charset="utf-8"></script>
  	<script type="text/javascript"  src="js/login.js"></script>
  </head>
  
  <body>
  	<div class="h_panel">
        <div class="h_logo">
            <a href="<%=basePath%>frame.jsp" target="_parent" >小米网</a>
        </div>
    </div>
    <div class="login_banner_panel">
			<div class="container">
				<div class="main">
					<div class="top">
						<div class="title">
							用户登录
						</div>
					</div>
					<div class="context">
						<div class="inputbox">
							<div class="logo tel">
							</div>
							<input type="text" placeholder="<%=arrplace[0] %>" name="tel" id="tel">
							<div class="errTips">
								<%=arrplace[0] %>
							</div>
							<div class="placeholder">
								<%=arrplace[0] %>
							</div>
						</div>
						<div class="inputbox">
							<div class="logo pwd">
							</div>
							<input type="password" placeholder="<%=arrplace[1] %>" name="pwd" id="pwd">
							<div class="errTips">
								<%=arrplace[1] %>
							</div>
							<div class="placeholder">
								<%=arrplace[1] %>
							</div>
						</div>
						<div class="code-input">
							<div class="inputbox-code">
								<div class="logo code">
								</div>
								<input type="text" placeholder="<%=arrplace[2] %>" name="code" id="code">
								<div class="errTips">
									<%=arrplace[2] %>
								</div>
								<div class="placeholder">
									<%=arrplace[2] %>
								</div>
							</div>
							<img id="codePic" class="code_btn" src="" dataSource="makeCertPic.action" title="验证码" />
						</div>
						<div class="login_message"></div>
						<div class="login_btn" id="btn_login">登录</div>
						<div class="m-unlogin">
							<label for="un-login">
												<div class="b-unlogin">
													<span class="u-checkbox checked"> <input type="checkbox"
														id="un-login" name="un-login" class="un-login" >
													</span> <label for="un-login">十天内免登录</label>
						</div>
						<div id="changepage" class="u-regbtn bgcolor tabfocus j-redirect">立即注册</div>
						</label>
					</div>
				</div>
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
