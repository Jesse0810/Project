<%@page import="com.njwangbo.pojo.netdisk.NetDiskFolder"%>
<%@page import="com.njwangbo.pojo.common.User"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	NetDiskFolder baseFolder = (NetDiskFolder) session
			.getAttribute("basefolder");
	User user = (User) session.getAttribute("user");
	String userName = "";
	String userImage = "";
	String baseFolderPath = "";
	if (user != null && baseFolder != null) {
		userName = user.getName();
		userImage = user.getImage();
		baseFolderPath = baseFolder.getId();
	} else {
		out.write("<script>window.location.href = '" + basePath
				+ "jsp/netdisk/login.jsp'</script>");
	}
%>

<!DOCTYPE HTML>
<html>

	<head>
		<base href="<%=basePath%>" data-path="<%=request.getRequestURL()%>" data-basefolder="<%=baseFolderPath%>">
		<meta charset="utf-8" http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="icon" href="images/netdisk/bitbug_favicon.ico" type="image/x-icon" />
		<title>超级云</title>
		<link rel="stylesheet" type="text/css" href="js/common/bootstrap-3.3.7-dist/css/bootstrap.css" />
		<!--		<link rel="stylesheet" type="text/css" href="js/common/bootstrap-table-master/bootstrap-table.css">-->
		<link rel="stylesheet" type="text/css" href="css/common/iconfont/iconfont.css" />
		<link rel="stylesheet" type="text/css" href="css/common/font-awesome-4.7.0/css/font-awesome.css" />
		<link rel="stylesheet" type="text/css" href="js/common/bootstrap-3.3.7-dist/css/buttons.css" />
		<link rel="stylesheet" type="text/css" href="js/common/messenger-master/css/messenger.css" />
		<link rel="stylesheet" type="text/css" href="js/common/messenger-master/css/messenger-spinner.css" />
		<link rel="stylesheet" type="text/css" href="js/common/messenger-master/css/messenger-theme-air.css" />
		<link rel="stylesheet" type="text/css" href="css/netdisk/netdisk.css" />
		<!--[if lt IE 9]>
    　
    <script src="js/common/bootstrap-3.3.7-dist/js/html5shiv.js"></script>
    <script src="js/common/bootstrap-3.3.7-dist/js/respond.js"></script>
    <![endif]-->
		<script src="js/common/jquery-1.12.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/util.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/bootstrap-3.3.7-dist/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
		<!--<script src="js/common/bootstrap-table-master/bootstrap-table.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/common/bootstrap-table-master/locale/bootstrap-table-zh-CN.js" type="text/javascript" charset="utf-8"></script>-->
		<script src="js/common/messenger-master/js/messenger.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/jquery.form.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/netdisk/tabs_temp.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/netdisk/netdisk_temp.js" type="text/javascript" charset="utf-8"></script>
	</head>

	<body>
		<nav class="navbar navbar-default netdisk-title">
			<div class="container-fluid">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<a class="navbar-brand" href="javascript:void(0)"> <img alt="Brand" class="img-responsive netdisk-icon" src="images/netdisk/logo-v2.png"> </a>
				</div>

				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse">
					<form class="navbar-form navbar-left">
						<div class="form-group">
							<input type="text" class="form-control" placeholder="搜索文件和文件夹">
						</div>
						<button type="button" class="btn btn-default ">
						<i class="fa fa-search"></i>
					</button>
					</form>
					<ul class="nav navbar-nav navbar-right user-area ">
						<li class="dropdown">
							<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <img src="images/shopping/user/<%=userImage %>" class="img-responsive img-circle user-img" /> <span class="caret"></span>
							</a>
							<ul class="dropdown-menu">
								<li>
									<a href="javascript:void(0)">用户名:<span class="user-text"><%=userName %></span>
									</a>
								</li>
								<li role="separator" class="divider"></li>
								<li>
									<a href="javascript:void(0)">查看饼状图</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<!-- /.navbar-collapse -->
			</div>
			<!-- /.container-fluid -->
		</nav>
		<!--
-->
		<div class="netdisk-body clearfix">
			<nav class="navbar " id="sidebar-wrapper" role="navigation">
				<ul class="nav nav-pills nav-stacked">
					<li class="">搜索列表</li>
					<li class="active">
						<a href="javascript:void(0)"><i class="iconfont icon-59"></i><span class="menu-tit">最近
				</a>
				</li>
				<li class=""><a href="javascript:void(0)" class="selected"><i
						class="iconfont icon-quanbu-copy"></i><span class="menu-tit">全部</span>
							<!---->
						</a>
					</li>
					<li class="">
						<a href="javascript:void(0)"><i class="iconfont icon-wendang"></i><span class="menu-tit">文档</span>
							<!---->
						</a>
					</li>
					<li class="">
						<a href="javascript:void(0)"><i class="iconfont icon-tupian"></i><span class="menu-tit">图片</span>
							<!---->
						</a>
					</li>
					<li class="">
						<a href="javascript:void(0)"><i class="iconfont icon-shipin"></i><span class="menu-tit">视频</span>
							<!---->
						</a>
					</li>
					<li class="">
						<a href="javascript:void(0)"><i class="iconfont icon-musicbyinle"></i><span class="menu-tit">音乐</span>
							<!---->
						</a>
					</li>
					<li class="">
						<a href="javascript:void(0)"><i class="iconfont icon-fenxiang2"></i><span class="menu-tit">分享链接</span>
							<!---->
						</a>
					</li>
					<li class="">
						<a href="javascript:void(0)"><i class="iconfont icon-huishouzhan"></i><span class="menu-tit">回收站</span>
							<!---->
						</a>
					</li>
				</ul>
			</nav>
			<div class="container-fluid table-area">
				<div class="row">
					<div class="col-md-9 col-sm-7 ">
						<ol class="breadcrumb">
							<li>
								<a href="#">Home</a>
							</li>
							<li>
								<a href="#">Library</a>
							</li>
							<li class="active">Data</li>
						</ol>
					</div>
					<div class="col-md-3 col-sm-5">
						<div class="btn-group file-operate">
							<button type="button" class="btn btn-default">
							<i style="margin-right: 0"
								class="glyphicon glyphicon-download-alt"></i> 下载
						</button>
							<button type="button" class="btn btn-default">
							<i class="glyphicon glyphicon-edit"></i>重命名
						</button>
							<button type="button" class="btn btn-default">
							<i class="glyphicon glyphicon-trash"></i>删除
						</button>
						</div>
						<div class="btn-group">
							<button type="button" class="btn button button-primary button-rounded">
							<i class="glyphicon glyphicon-plus"></i> 添加
						</button>
							<button type="button" class="btn button button-primary button-rounded dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<span class="caret"></span> <span class="sr-only">Toggle
								Dropdown</span>
						</button>
							<ul class="dropdown-menu">
								<li>
									<a href="#">上传文件</a>
								</li>
								<li>
									<a href="#">新建文件夹</a>
								</li>
								<li>
									<a href="#">Something else here</a>
								</li>
								<li role="separator" class="divider"></li>
								<li>
									<a href="#">Separated link</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-md-12 col-sm-12">
						<div class="table-responsive">
							<table id="netdisk_table" class="table table-hover">
								<thead>
									<tr>
										<th>产品</th>
										<th>付款日期</th>
										<th>状态</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>产品1</td>
										<td>23/11/2013</td>
										<td>待发货</td>
									</tr>
									<tr>
										<td>产品2</td>
										<td>10/11/2013</td>
										<td>发货中</td>
									</tr>
									<tr>
										<td>产品3</td>
										<td>20/10/2013</td>
										<td>待确认</td>
									</tr>
									<tr>
										<td>产品4</td>
										<td>20/10/2013</td>
										<td>已退货</td>
									</tr>
								</tbody>
							</table>

						</div>
					</div>
				</div>
			</div>
	</body>

</html>