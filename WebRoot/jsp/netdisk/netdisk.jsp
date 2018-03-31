<%@page import="com.njwangbo.pojo.netdisk.NetDiskFolder"%>
<%@page import="com.njwangbo.pojo.common.User"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	NetDiskFolder baseFolder = (NetDiskFolder)session.getAttribute("basefolder");
	User user = (User)session.getAttribute("user");
	String userName = "";
	String userImage = "";
	String userId = "";
	String baseFolderPath = "";
	String ipPath = "http://"+request.getLocalAddr()+":"+request.getLocalPort()+"/";
	if(user != null && baseFolder != null){
		userName = user.getName();
		userImage = user.getImage();
		userId = user.getId();
		baseFolderPath = baseFolder.getId();	
	}else{
		out.write("<script>window.location.href='"+basePath+"jsp/netdisk/login.jsp'</script>");
	}
%>

<!DOCTYPE HTML>
<html>

	<head>
		<base href="<%=basePath%>" data-userid="<%=userId %>" data-ip="<%=ipPath %>" data-path="<%=request.getRequestURL()%>" data-basefolder="<%=baseFolderPath%>">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<link rel="icon" href="images/netdisk/bitbug_favicon.ico" type="image/x-icon" />
		<title>超级云</title>
		<link rel="stylesheet" type="text/css" href="css/common/common.css" />
		<link rel="stylesheet" type="text/css" href="css/common/iconfont/iconfont.css" />
		<link rel="stylesheet" type="text/css" href="css/common/font-awesome-4.7.0/css/font-awesome.css"/>
		<link rel="stylesheet" type="text/css" href="js/common/bootstrap-3.3.7-dist/css/buttons.css"/>
		<link rel="stylesheet" type="text/css" href="css/netdisk/playMusic.css" />
		<link rel="stylesheet" type="text/css" href="css/netdisk/playVideo.css" />
		<link rel="stylesheet" type="text/css" href="css/netdisk/tabs.css"/>
		<link rel="stylesheet" type="text/css" href="css/netdisk/page-home.css" />
		<link rel="stylesheet" type="text/css" href="js/common/messenger-master/css/messenger.css"/>
		<link rel="stylesheet" type="text/css" href="js/common/messenger-master/css/messenger-spinner.css"/>
		<link rel="stylesheet" type="text/css" href="js/common/messenger-master/css/messenger-theme-air.css"/>
		<link rel="stylesheet" type="text/css" href="css/common/sweetalert.min.css"/>
		<script src="js/common/jquery-1.12.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/util.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/messenger-master/js/messenger.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/jquery.form.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/highcharts/highcharts.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/highcharts/highcharts-3d.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/highcharts/highcharts-lang-zh_CN.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/sweetalert-dev.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/netdisk/tabs.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/netdisk/BreadCrumb.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/netdisk/fileManipulation.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/netdisk/playMusic.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/netdisk/playVideo.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/netdisk/charts.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/netdisk/table.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/netdisk/netdisk.js" type="text/javascript" charset="utf-8"></script>
	</head>

	<body>
		<div class="layout-wrapper">
			<div class="layout-header">
				<div class="layout-header-inner">
					<div class="mod-nav clearfix">
						<div class="logo">
							<a href="javascript:void(0)" title="超级云">超级云</a>
						</div>
						<div class="mod-act hide">
							<a href="" title="任务列表" class="act-link"><span class="act-icon"><i class="iconfont icon-sort_icon"></i></span> </a>
						</div>
						<div id="_search_bar" class="mod-search">
							<div class="search-panel is-focus">
								<div class="search-input">
									<input autocomplete="off" type="text" aria-label="输入文件名并按下回车进行搜索" tabindex="0" placeholder="搜索全部微云" class="mod-input">
								</div>
								<div class="btn-search">
									<i class="iconfont icon-sousuo"></i>
								</div>
							</div>
						</div>
						<!-- <div class="mod-act-group">
						<div class="act-item act-item-acc">
							<div class="act-item-txt">
								<a href="javascript:void(0)">Jesse<i
									class="iconfont icon-xiangxia1"></i></a>
							</div>
						</div>
					</div> -->
					</div>
				</div>
			</div>
			<div class="layout-body">
				<div class="layout-body-inner">
					<div class="layout-aside">
						<div class="layout-aside-hd">
							<div class="mod-user mod-user-vip ">
								<div class="user-avatar">
									<a href="javascript:void(0)" class="user-avatar-pic"><img src="images/shopping/user/<%=userImage %>" alt="用户昵称">
										<!---->
									</a>
								</div>
							</div>
							<p style="text-align: center" >
								<button class="button button-primary" id="charts_button" >图表</button>
							</p>
						</div>
						<div class="layout-aside-bd" id="netdisk_menu">
							<div class="mod-menu">
								<div class="menu-item">
									<div class="menu-item-bd">
										<ul class="menu-list">
											<li class="">
												<a href="javascript:void(0)" class="selected"><i class="iconfont icon-quanbu-copy"></i><span class="menu-tit">全部</span>
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
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="layout-main">
						<div class="layout-main-hd">
							<div class="mod-check" id="checkAll">
								<i class="icon icon-check-s icon-checkbox"></i>
							</div>
							<div class="mod-breadcrumb" id="netdisk_breadcrumb">
								<ul class="breadcrumb clearfix">
									<li class="item all">
										<a href="javascript:void(0)"><i class="iconfont"></i>全部</a>
									</li>
									<li class="item"><i class="iconfont icon-xiangyou"></i>
										<a href="javascript:void(0)" title="QQ">QQ</a>
									</li>
									<li class="item cur"><i class="iconfont icon-xiangyou"></i>
										<a href="javascript:void(0)" title="收到的QQ文件">收到的QQ文件</a>
									</li>
								</ul>
							</div>
							<div class="mod-upload">
								<a href="javascript:void(0)" id="uploadBtn" class="btn btn-l btn-upload"> <i class="iconfont icon-jia"></i><span class="btn-txt">添加</span>
								</a>
								<form id="uploadForm" class='hidden' method='post' enctype='multipart/form-data'></form>
								<div class="mod-bubble-menu mod-bubble-menu-upload with-border">
									<ul>
										<li class="menu-item" id="upload-file"><b class="icon icon-m icon-upload-file"></b> <span class="txt">上传文件</span></li>
										<li class="menu-item" id="upload-dir"><b class="icon icon-m icon-upload-dir"></b> <span class="txt">上传文件夹</span>
											<div class="spliter"></div>
										</li>
										<li class="menu-item" id="upload-create"><b class="icon icon-m icon-upload-create"></b> <span class="txt">新建文件夹</span>
											<!---->
									</ul>
								</div>
							</div>
							<div class="mod-action-wrap clearfix hidden">
								<div class="action-item" id="downFile">

									<div class="action-item-con">
										<i class="iconfont icon-xiazai"></i><span class="txt">下载</span>
									</div>
								</div>
								<div class="action-item" id="rename" >
									<div class="action-item-con" >
										<i class="iconfont icon-write"></i><span class="txt">重命名</span>
									</div>
								</div>
								<div class="action-item">
									<div class="action-item-con" style="border-right:0 ;" id="delFile">
										<i class="iconfont icon-shanchu"></i><span class="txt">删除</span>
									</div>
								</div>
							</div>
						</div>
						<div class="layout-main-bd" id="_main_body">
							<table border="0" cellspacing="0" cellpadding="0" class="mod-list-group" id="netDiskTable">
								<thead>
									<tr>
										<td class="list-group-tit label"></td>
										<td class="list-group-tit name"><span class="tit-con">名称<i
											class="iconfont icon-sort"></i></span></td>
										<td class="list-group-tit time"><span class="tit-con">上次修改时间<i
											class="iconfont icon-sort"></i></span></td>
										<td class="list-group-tit size"><span class="tit-con">大小<i
											class="iconfont icon-sort"></i></span></td>
									</tr>
								</thead>
								<tbody>
									<%--<tr>--%>
									<%--<td class="list-group-item label"></td>--%>
									<%--<td class="list-group-item item-name">--%>
									<%--<div class="thumb">--%>
									<%--<!---->--%>
									<%--<!---->--%>
									<%--<i class="icon icon-m icon-audio-m"></i>--%>
									<%--</div>--%>
									<%--<div class="info">--%>
									<%--<a href="javascript:void(0)" title="Craig David - Johnny.mp3"--%>
									<%--class="tit">Craig David - Johnny.mp3</a>--%>
									<%--<!---->--%>
									<%--</div>--%>
									<%--</td>--%>
									<%--<td class="list-group-item item-time">2018年03月01日 20:01</td>--%>
									<%--<td class="list-group-item item-size">9.98 MB</td>--%>
									<%--</tr>--%>
									<%--<tr>--%>
									<%--<td class="list-group-item label"></td>--%>
									<%--<td class="list-group-item item-name">--%>
									<%--<div class="thumb">--%>
									<%--<!---->--%>
									<%--<!---->--%>
									<%--<i class="icon icon-m icon-video-m"></i>--%>
									<%--</div>--%>
									<%--<div class="info">--%>
									<%--<a href="javascript:void(0)"--%>
									<%--title="Watch Dogs 06.29.2014 - 10.22.53.07.mp4" class="tit">Watch--%>
									<%--Dogs 06.29.2014 - 10.22.53.07.mp4</a>--%>
									<%--<!---->--%>
									<%--</div>--%>
									<%--</td>--%>
									<%--<td class="list-group-item item-time">2018年03月04日 19:23</td>--%>
									<%--<td class="list-group-item item-size">82.2MB</td>--%>
									<%--</tr>--%>
								</tbody>
							</table>
						</div>
					</div>
				</div>

			</div>
		</div>
		<div class="playMusic hidden" id="playMusic"></div>
		<div class="playVideo hidden" id="playVideo"></div>
	</body>

</html>