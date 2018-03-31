<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML>
<html>

	<head lang="zh-CN">
		<base href="<%=basePath%>">

		<meta charset="utf-8" http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="icon" href="images/netdisk/bitbug_favicon.ico" type="image/x-icon" />
		<title>网盘登录页</title>
		<link rel="stylesheet" type="text/css" href="js/common/bootstrap-3.3.7-dist/css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="js/common/toastr/toastr.css" />
		<link rel="stylesheet" type="text/css" href="css/common/font-awesome-4.7.0/css/font-awesome.css" />
		<link rel="stylesheet" type="text/css" href="js/common/bootstrap-3.3.7-dist/css/buttons.css" />
		<link rel="stylesheet" type="text/css" href="css/common/bootstrap-switch.css" />
		<link rel="stylesheet" type="text/css" href="css/netdisk/login.css" />
		<!--[if lt IE 9]>
	    　	 	<script src="js/common/bootstrap-3.3.7-dist/js/html5shiv.js"></script>
	       	<script src="js/common/bootstrap-3.3.7-dist/js/respond.js"></script>
	    <![endif]-->
		<script src="js/common/jquery-1.12.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/util.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/bootstrap-3.3.7-dist/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/toastr/toastr.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/bootstrap-switch.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/netdisk/login.js" type="text/javascript" charset="utf-8"></script>
	</head>

	<body>
		<div id="loginBackground" class="background">
			<!-- 轮播（Carousel）项目 -->
			<div class="carousel-inner">
				<div class="item active">
					<div class='item-img slide-img1'></div>
					<%--<img src="images/netdisk/login/save.jpg" alt="First slide">--%>
				</div>
				<div class="item">
					<div class='item-img slide-img2'></div>
					<%--<img src="images/netdisk/login/part-login@2x.jpg" alt="Second slide">--%>
				</div>
				<div class="item">
					<div class='item-img slide-img3'></div>
					<%--<img src="images/netdisk/login/secrect.jpg" alt="Third slide">--%>
				</div>
			</div>

		</div>
		<div class="content">
			<nav class="navbar navbar-default navbar-static-top netdisk-nav" role="navigation">
				<div class="navbar-header">
					<a class="navbar-brand nav-icon" href="javascript:void(0)"> <img src="images/netdisk/logo-v2.png" class="img-responsive" /> </a>
				</div>
			</nav>
			<div class="container netdisk-container ">
				<div class="row">
					<div class="col-md-5 col-lg-3 info">
						<h1>超级云</h1>
						<h3>智能存储</h3>
					</div>
					<div class="col-md-5 col-md-offset-2 col-lg-5 col-lg-offset-4 ">
						<div class="panel panel-primary login">
							<div class="panel-heading">
								<h1 class="panel-title text-center">账号登录</h1>
							</div>
							<div class="panel-body">
								<form class="form-horizontal">
									<div class="form-group">
										<label for="userName" class="col-sm-3 control-label">用户名</label>
										<div class="col-sm-7">
											<input type="text" tabindex="1" class="form-control" minlength="4" maxlength="16" id="userName" data-name="用户名" placeholder="用户名至少四位，至多16位" autocomplete="off">
											<span class="help-block"><i class="glyphicon glyphicon-info-sign"></i>用户名至少四位，至多16位</span>
										</div>
									</div>
									<div class="form-group">
										<label for="pwd" class="col-sm-3 control-label">密码</label>
										<div class="col-sm-7">
											<input type="password" tabindex="2" class="form-control" id="pwd" minlength="3" maxlength="16" data-name="密码" placeholder="密码至少3位,只能输入英文和数字" autocomplete="off">
											<span class="help-block"><i class="glyphicon glyphicon-info-sign"></i>密码至少3位,只能输入英文和数字</span>
										</div>
									</div>
									<div class="form-group">
										<label for="inputCode" class="col-sm-3 control-label">验证码</label>
										<div class="col-sm-4">
											<input type="password" tabindex="2" class="form-control" id="inputCode" minlength="4" maxlength="4" data-name="验证码" placeholder="验证码必须四位">
											<span class="help-block"><i class="glyphicon glyphicon-info-sign"></i>验证码必须四位</span>
										</div>
										<div class="col-sm-3">
											<img src="images/netdisk/login/code.png" class="img-responsive code_btn" id="codePic" src="" dataSource="makeCertPic.action" title="验证码" height="35" alt="验证码" />
										</div>
									</div>
									<div class="form-group">
										<div class="col-sm-offset-3 col-sm-7">
											<div class="checkbox">
												<input type="checkbox" id="remenberPWD" data-on-label="<i class='icon-ok icon-white'></i>" data-off-label="<i class='icon-remove'></i>" data-switch-no-init="data-switch-no-init" />
												<label for="remenberPWD">

                                                记住密码
                                            </label>

											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="col-sm-offset-1 col-sm-10 text-center">
											<button type="button" id="login_btn" class="button button-glow button-rounded button-primary loginbtn">登录</button>
										</div>
								</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

	</body>

</html>