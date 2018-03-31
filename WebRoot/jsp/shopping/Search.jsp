<%@page import="com.njwangbo.pojo.common.User"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
User user = (User)session.getAttribute("user");
int cartNum = 0;
String userName = "";
String userImage = "";
String login = "hidden";
String unlogin = "hidden";
String shopState = "";
String shopIconfont = "icon-gouwuche";
String keyword = "";
if(request.getParameter("name")!=null){
	keyword = new String(request.getParameter("name").getBytes("iso-8859-1"), "utf-8");
}
if(user != null){
	userName = user.getName();
	userImage = user.getImage();
	login = "";	
	cartNum = (Integer)session.getAttribute("cartNum");
	if(cartNum>0){
		shopState = "topbar-cart-filled";
		shopIconfont = "icon-msnui-cart-full";
	}
}else{
	unlogin = "";
}
%>

<!DOCTYPE HTML>
<html>
  <head>
  	<link rel="icon" href="image/index/logo-footer.png" type="image/x-icon"/>
    <base href="<%=basePath%>" data-keyword="<%=keyword %>" >
    <link rel="stylesheet" type="text/css" href="css/iconfont.css"/>
		<link rel="stylesheet" type="text/css" href="css/common/pageTurn.css"/>
		<link rel="stylesheet" type="text/css" href="css/search/goods_list_search.css"/>
		<link rel="stylesheet" type="text/css" href="css/index.css"/>
		<link rel="stylesheet" href="css/common/dialog.css" type="text/css"></link>
    	<link rel="stylesheet" type="text/css" href="css/common/userdialog.css"/>
		<link rel="stylesheet" type="text/css" href="css/goods_list.css"/>
		<link rel="stylesheet" type="text/css" href="css/search.css" />
		<script src="js/jquery-1.12.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/util.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="js/index/header_nav_menu.js" ></script>
		<script src="js/common/pageTurn.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/GoodsList.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/search/GoodsList_Search.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/dialog.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/dialog/userdialog.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/common.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/Search.js" type="text/javascript" charset="utf-8"></script>
    <title>搜索</title>    
		

  </head>
  
  <body>
		<div class="site-topbar">
			<div class="container">
				<div class="topbar-nav">
					<a rel="nofollow" href="<%=basePath %>homePage.jsp" >小米商城</a><span class="sep">|</span>
					<a rel="nofollow" >MIUI</a><span class="sep">|</span>
					<a rel="nofollow" >IoT</a><span class="sep">|</span>
					<a rel="nofollow" >云服务</a><span class="sep">|</span>
					<a rel="nofollow" >水滴</a><span class="sep">|</span>
					<a rel="nofollow" >金融</a><span class="sep">|</span>
					<a rel="nofollow" >有品</a><span class="sep">|</span>
					<a rel="nofollow" >Select Region</a>
				</div>
				<div class="topbar-cart" id="J_miniCartTrigger">
					<a rel="nofollow" class="cart-mini <%=shopState %>" id="J_miniCartBtn" href="<%=basePath %>CartPage.jsp" target="_blank" ><i class="iconfont <%=shopIconfont %>"></i>购物车<span class="cart-mini-num J_cartNum">（<%=cartNum %>）</span></a>
				</div>
				<div class="topbar-info" id="J_userInfo">
					<span class="user <%=login %>"><a rel="nofollow" class="user-name" ><span class="name"><%=userName %></span><i class="iconfont">&#xe66e;</i></a>
					<ul class="user-menu hidden" >
						<li>
							<a rel="nofollow" href="<%=basePath %>homePage.jsp">商品主页</a>
						</li>
						<li>
							<a rel="nofollow" href="<%=basePath %>CartPage.jsp">我的购物车</a>
						</li>
						<li>
							<a rel="nofollow" href="<%=basePath %>Order.jsp">评价晒单</a>
						</li>
						<li>
							<a rel="nofollow" id="logout">退出登录</a>
						</li>
					</ul>
					</span>
					<span class="unlogin_tip <%=unlogin %>" >
					<a rel="nofollow" class="link" href="<%=basePath %>login.jsp" >登录</a><span class="sep">|</span>
					<a rel="nofollow" class="link" href="<%=basePath %>register.jsp" >注册</a></span>
					<span class="sep">|</span>
					
					<span class="message"><a rel="nofollow" >消息通知<i class="J_miMessageTotal"></i></a></span></div>
			</div>
		</div>
		<div class="site-header">
			<div class="container">
				<div class="header-logo"></div>
				<div class="doodle"></div>
				<ul class="nav-list" >
					<li class="nav-item" data-type = "手机" >小米手机</li>
					<li class="nav-item" data-type = "红米" >红米</li>
					<li class="nav-item" data-type = "笔记本" >笔记本</li>
					<li class="nav-item" data-type = "电视" >电视</li>
					<li class="nav-item" data-type = "盒子" >盒子</li>
					<li class="nav-item" data-type = "新品" >新品</li>
					<li class="nav-item" data-type = "路由器" >路由器</li>
					<li class="nav-item" data-type = "智能硬件" >智能硬件</li>
					<li class="nav-item" data-type = "服务" >服务</li>
					<li class="nav-item" data-type = "社区" >社区</li>
				</ul>
				<div class="header-search">
					<div class="iconfont icon-sousuo search-btn" ></div>
					<input type="text" class="search-text" id="search-text" />	
				</div>
			</div>
			<div class="header-nav-menu hidden" id="nav_menu" >
				<div class="container">
					<ul class="children-list clearfix" >
					</ul>
				</div>
			</div>
		</div>
	<div class="breadcrumbs">
		<div class="container">
			<a href="<%=basePath %>homePage.jsp" >首页</a><span class="sep">&gt;</span>
			<a href="<%=basePath %>Search.jsp?name=<%=keyword %>" >全部结果</a><span class="sep">&gt;</span><span><%=keyword %></span> </div>
	</div>
	<div class="container">
	   <div class="filter-box">
		<div class="filter-list-wrap" >
			<dl class="filter-list clearfix" id="type_filter_list" >
				<dt>分类：</dt>
				<dd class="active">全部</dd>
				<!--<dd>
					<a href="//search.mi.com/search_手机-9" data-stat-id="6ffd32407769e0fe" onclick="_msq.push(['trackEvent', '33aefb32eef77931-6ffd32407769e0fe', '//search.mi.com/search_手机-9', 'pcpid', '']);">贴膜</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-8" data-stat-id="319c6e96b81e56ac" onclick="_msq.push(['trackEvent', '33aefb32eef77931-319c6e96b81e56ac', '//search.mi.com/search_手机-8', 'pcpid', '']);">保护套/保护壳</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-118" data-stat-id="c1352c6cd0364560" onclick="_msq.push(['trackEvent', '33aefb32eef77931-c1352c6cd0364560', '//search.mi.com/search_手机-118', 'pcpid', '']);">小米头戴式耳机</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-143" data-stat-id="5927294963c4755a" onclick="_msq.push(['trackEvent', '33aefb32eef77931-5927294963c4755a', '//search.mi.com/search_手机-143', 'pcpid', '']);">小米圈铁耳机</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-16" data-stat-id="f0765dd05efc2e85" onclick="_msq.push(['trackEvent', '33aefb32eef77931-f0765dd05efc2e85', '//search.mi.com/search_手机-16', 'pcpid', '']);">线材</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-128" data-stat-id="cea0c7462fa03333" onclick="_msq.push(['trackEvent', '33aefb32eef77931-cea0c7462fa03333', '//search.mi.com/search_手机-128', 'pcpid', '']);">小米蓝牙耳机</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-30" data-stat-id="1019119c80b2cb60" onclick="_msq.push(['trackEvent', '33aefb32eef77931-1019119c80b2cb60', '//search.mi.com/search_手机-30', 'pcpid', '']);">配件优惠套装</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-22" data-stat-id="bc2001b8fb329b2b" onclick="_msq.push(['trackEvent', '33aefb32eef77931-bc2001b8fb329b2b', '//search.mi.com/search_手机-22', 'pcpid', '']);">服装</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-24" data-stat-id="d802d067af946dd3" onclick="_msq.push(['trackEvent', '33aefb32eef77931-d802d067af946dd3', '//search.mi.com/search_手机-24', 'pcpid', '']);">生活周边</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-18" data-stat-id="9b4a40fdb036368c" onclick="_msq.push(['trackEvent', '33aefb32eef77931-9b4a40fdb036368c', '//search.mi.com/search_手机-18', 'pcpid', '']);">品牌耳机</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-15" data-stat-id="abe1a05e33f00934" onclick="_msq.push(['trackEvent', '33aefb32eef77931-abe1a05e33f00934', '//search.mi.com/search_手机-15', 'pcpid', '']);">充电器</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-5" data-stat-id="ca195950e438c3b6" onclick="_msq.push(['trackEvent', '33aefb32eef77931-ca195950e438c3b6', '//search.mi.com/search_手机-5', 'pcpid', '']);">手机支架</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-136" data-stat-id="4e69249fd8fa6f5b" onclick="_msq.push(['trackEvent', '33aefb32eef77931-4e69249fd8fa6f5b', '//search.mi.com/search_手机-136', 'pcpid', '']);">智能硬件配件</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-152" data-stat-id="65fb0f483bb0630c" onclick="_msq.push(['trackEvent', '33aefb32eef77931-65fb0f483bb0630c', '//search.mi.com/search_手机-152', 'pcpid', '']);">小米胶囊耳机</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-173" data-stat-id="d5a70efbb93d5ace" onclick="_msq.push(['trackEvent', '33aefb32eef77931-d5a70efbb93d5ace', '//search.mi.com/search_手机-173', 'pcpid', '']);">手机套装</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-182" data-stat-id="616d709c61b9cf5b" onclick="_msq.push(['trackEvent', '33aefb32eef77931-616d709c61b9cf5b', '//search.mi.com/search_手机-182', 'pcpid', '']);">降噪耳机</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-31" data-stat-id="1216fe4c28e60d4f" onclick="_msq.push(['trackEvent', '33aefb32eef77931-1216fe4c28e60d4f', '//search.mi.com/search_手机-31', 'pcpid', '']);">手机</a>
				</dd>-->
			</dl>
			<a class="more J_filterToggle" href="javascript: void(0);" >更多<i class="iconfont icon-xiangxia"></i></a>
		</div>
		<div class="filter-list-wrap">
			<dl class="filter-list clearfix" id="goods_filter_list" >
				<dt>机型：</dt>
				<dd class="active">全部</dd>
				<!--<dd>
					<a href="//search.mi.com/search_手机-0-55677" data-stat-id="c1e1e4aae3889626" onclick="_msq.push(['trackEvent', '33aefb32eef77931-c1e1e4aae3889626', '//search.mi.com/search_手机-0-55677', 'pcpid', '']);">红米5 Plus</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-55676" data-stat-id="ed2366a65d72dfc3" onclick="_msq.push(['trackEvent', '33aefb32eef77931-ed2366a65d72dfc3', '//search.mi.com/search_手机-0-55676', 'pcpid', '']);">红米5</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-55675" data-stat-id="01f76e11eb9492ef" onclick="_msq.push(['trackEvent', '33aefb32eef77931-01f76e11eb9492ef', '//search.mi.com/search_手机-0-55675', 'pcpid', '']);">小米MIX 2</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-55671" data-stat-id="e384de24594e47e8" onclick="_msq.push(['trackEvent', '33aefb32eef77931-e384de24594e47e8', '//search.mi.com/search_手机-0-55671', 'pcpid', '']);">小米Note3</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-55673" data-stat-id="0e5a610bd44d1d71" onclick="_msq.push(['trackEvent', '33aefb32eef77931-0e5a610bd44d1d71', '//search.mi.com/search_手机-0-55673', 'pcpid', '']);">红米Note 5A</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-55672" data-stat-id="9145f2bc17fd62bf" onclick="_msq.push(['trackEvent', '33aefb32eef77931-9145f2bc17fd62bf', '//search.mi.com/search_手机-0-55672', 'pcpid', '']);">小米5X</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-55670" data-stat-id="a1cf192f395010f8" onclick="_msq.push(['trackEvent', '33aefb32eef77931-a1cf192f395010f8', '//search.mi.com/search_手机-0-55670', 'pcpid', '']);">小米Max2</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-55669" data-stat-id="27c2c1c3061b3546" onclick="_msq.push(['trackEvent', '33aefb32eef77931-27c2c1c3061b3546', '//search.mi.com/search_手机-0-55669', 'pcpid', '']);">小米6</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-55667" data-stat-id="9698a000aea2b5a8" onclick="_msq.push(['trackEvent', '33aefb32eef77931-9698a000aea2b5a8', '//search.mi.com/search_手机-0-55667', 'pcpid', '']);">小米5c</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-55668" data-stat-id="f66d734e1bffd2a3" onclick="_msq.push(['trackEvent', '33aefb32eef77931-f66d734e1bffd2a3', '//search.mi.com/search_手机-0-55668', 'pcpid', '']);">红米4X</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-11224" data-stat-id="ac08722257e965bb" onclick="_msq.push(['trackEvent', '33aefb32eef77931-ac08722257e965bb', '//search.mi.com/search_手机-0-11224', 'pcpid', '']);">小米Note2</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-54329" data-stat-id="3fe342dc558f79ff" onclick="_msq.push(['trackEvent', '33aefb32eef77931-3fe342dc558f79ff', '//search.mi.com/search_手机-0-54329', 'pcpid', '']);">红米Note4X</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-6235" data-stat-id="352058eee15ded8d" onclick="_msq.push(['trackEvent', '33aefb32eef77931-352058eee15ded8d', '//search.mi.com/search_手机-0-6235', 'pcpid', '']);">小米5s</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-6236" data-stat-id="b72a03b0e9466549" onclick="_msq.push(['trackEvent', '33aefb32eef77931-b72a03b0e9466549', '//search.mi.com/search_手机-0-6236', 'pcpid', '']);">小米5s Plus</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-54321" data-stat-id="57a61576bf4fdec4" onclick="_msq.push(['trackEvent', '33aefb32eef77931-57a61576bf4fdec4', '//search.mi.com/search_手机-0-54321', 'pcpid', '']);">小米Max</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-6234" data-stat-id="2bcedcfb34a3ae76" onclick="_msq.push(['trackEvent', '33aefb32eef77931-2bcedcfb34a3ae76', '//search.mi.com/search_手机-0-6234', 'pcpid', '']);">小米手机5</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-7193" data-stat-id="aa84b57fd7f94fee" onclick="_msq.push(['trackEvent', '33aefb32eef77931-aa84b57fd7f94fee', '//search.mi.com/search_手机-0-7193', 'pcpid', '']);">小米手机4s</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-54323" data-stat-id="19700caffe5bc5c6" onclick="_msq.push(['trackEvent', '33aefb32eef77931-19700caffe5bc5c6', '//search.mi.com/search_手机-0-54323', 'pcpid', '']);">红米4</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-45622" data-stat-id="ef97d2df897174d3" onclick="_msq.push(['trackEvent', '33aefb32eef77931-ef97d2df897174d3', '//search.mi.com/search_手机-0-45622', 'pcpid', '']);">红米 Note4</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-45615" data-stat-id="319184369ce2a0ce" onclick="_msq.push(['trackEvent', '33aefb32eef77931-319184369ce2a0ce', '//search.mi.com/search_手机-0-45615', 'pcpid', '']);">红米Pro</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-12432" data-stat-id="9c5f2643e5c07bd4" onclick="_msq.push(['trackEvent', '33aefb32eef77931-9c5f2643e5c07bd4', '//search.mi.com/search_手机-0-12432', 'pcpid', '']);">红米Note3</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-45614" data-stat-id="58906f076c38e884" onclick="_msq.push(['trackEvent', '33aefb32eef77931-58906f076c38e884', '//search.mi.com/search_手机-0-45614', 'pcpid', '']);">红米手机3s</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-45613" data-stat-id="4430988aad113982" onclick="_msq.push(['trackEvent', '33aefb32eef77931-4430988aad113982', '//search.mi.com/search_手机-0-45613', 'pcpid', '']);">红米手机3高配版</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-45612" data-stat-id="4f68b630097743e6" onclick="_msq.push(['trackEvent', '33aefb32eef77931-4f68b630097743e6', '//search.mi.com/search_手机-0-45612', 'pcpid', '']);">红米手机3标准版</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-32134" data-stat-id="751e880102331bdb" onclick="_msq.push(['trackEvent', '33aefb32eef77931-751e880102331bdb', '//search.mi.com/search_手机-0-32134', 'pcpid', '']);">小米平板2</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-4321" data-stat-id="a189b6d6937edae1" onclick="_msq.push(['trackEvent', '33aefb32eef77931-a189b6d6937edae1', '//search.mi.com/search_手机-0-4321', 'pcpid', '']);">小米Note</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-45231" data-stat-id="2285bdef14a625f4" onclick="_msq.push(['trackEvent', '33aefb32eef77931-2285bdef14a625f4', '//search.mi.com/search_手机-0-45231', 'pcpid', '']);">小米手机4c</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-321" data-stat-id="42b51d9c5eff56fa" onclick="_msq.push(['trackEvent', '33aefb32eef77931-42b51d9c5eff56fa', '//search.mi.com/search_手机-0-321', 'pcpid', '']);">红米2A</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-6543" data-stat-id="8aeab229c954ef56" onclick="_msq.push(['trackEvent', '33aefb32eef77931-8aeab229c954ef56', '//search.mi.com/search_手机-0-6543', 'pcpid', '']);">红米手机2</a>
				</dd>
				<dd>
					<a href="//search.mi.com/search_手机-0-64" data-stat-id="8083d90e7eb48126" onclick="_msq.push(['trackEvent', '33aefb32eef77931-8083d90e7eb48126', '//search.mi.com/search_手机-0-64', 'pcpid', '']);">红米手机</a>
				</dd>-->
			</dl>
			<a class="more J_filterToggle" href="javascript: void(0);" >更多<i class="iconfont icon-xiangxia"></i></a>
		</div>
		<div class="filter-list-wrap">
			<dl class="filter-list clearfix">
				<dt>品牌：</dt>
				<dd class="active">全部</dd>
				<dd>
					<a href="<%=basePath %>Search.jsp?name=小米" >小米</a>
				</dd>
				<dd>
					<a href="<%=basePath %>Search.jsp?name=第三方品牌" >第三方品牌</a>
				</dd>
				<dd>
					<a href="<%=basePath %>Search.jsp?name=1MORE" >1MORE</a>
				</dd>
			</dl>
		</div>
	</div>
	</div>
	<div class="content" >
		<div class="container">
			<div class="order-list-box clearfix">
				<ul class="order-list">
					<li class="active first">
						<a >推荐</a>
					</li>
					<li>
						<a >新品</a>
					</li>
					<li class="up">
						<a >价格 <i class="iconfont icon-xiangshang"></i></a>
					</li>
					<li>
						<a >评论最多</a>
					</li>
				</ul>
				<ul class="type-list">
					<li>
						<a ><span class="checkbox"><i class="iconfont">√</i></span>查看评价</a>
					</li>
					<li>
						<a ><span class="checkbox"><i class="iconfont">√</i></span>仅显示特惠商品</a>
					</li>
					<li>
						<a ><span class="checkbox"><i class="iconfont">√</i></span>仅显示有货商品</a>
					</li>
				</ul>
			</div>
			<div class="goods-list-box">
				<div class="goods-list clearfix" id="gooods_list" >
					
				</div>
				<!--<div class="xm-pagenavi">
					<span class="numbers first iconfont"></span><span class="numbers current">1</span>
					<a class="numbers" href="//search.mi.com/search_手机-0-0-0-0-0-0-0-0-2" data-stat-id="4a821a9d8667b0e4" onclick="_msq.push(['trackEvent', '68d6962069cc2485-4a821a9d8667b0e4', '//search.mi.com/search_手机-0-0-0-0-0-0-0-0-2', 'pcpid', '']);">2</a>
					<a class="numbers" href="//search.mi.com/search_手机-0-0-0-0-0-0-0-0-3" data-stat-id="a18acbc49ea33ec4" onclick="_msq.push(['trackEvent', '68d6962069cc2485-a18acbc49ea33ec4', '//search.mi.com/search_手机-0-0-0-0-0-0-0-0-3', 'pcpid', '']);">3</a>
					<a class="numbers" href="//search.mi.com/search_手机-0-0-0-0-0-0-0-0-4" data-stat-id="bdbe6171d93393d3" onclick="_msq.push(['trackEvent', '68d6962069cc2485-bdbe6171d93393d3', '//search.mi.com/search_手机-0-0-0-0-0-0-0-0-4', 'pcpid', '']);">4</a>
					<a class="numbers" href="//search.mi.com/search_手机-0-0-0-0-0-0-0-0-5" data-stat-id="0acf2786235c2d98" onclick="_msq.push(['trackEvent', '68d6962069cc2485-0acf2786235c2d98', '//search.mi.com/search_手机-0-0-0-0-0-0-0-0-5', 'pcpid', '']);">5</a>
					<a class="numbers" href="//search.mi.com/search_手机-0-0-0-0-0-0-0-0-6" data-stat-id="4e3dfb874b6d78fd" onclick="_msq.push(['trackEvent', '68d6962069cc2485-4e3dfb874b6d78fd', '//search.mi.com/search_手机-0-0-0-0-0-0-0-0-6', 'pcpid', '']);">6</a>
					<a class="numbers" href="//search.mi.com/search_手机-0-0-0-0-0-0-0-0-7" data-stat-id="c6dfdb71b6870222" onclick="_msq.push(['trackEvent', '68d6962069cc2485-c6dfdb71b6870222', '//search.mi.com/search_手机-0-0-0-0-0-0-0-0-7', 'pcpid', '']);">7</a>
					<a class="numbers" href="//search.mi.com/search_手机-0-0-0-0-0-0-0-0-8" data-stat-id="716931dbd4c36bca" onclick="_msq.push(['trackEvent', '68d6962069cc2485-716931dbd4c36bca', '//search.mi.com/search_手机-0-0-0-0-0-0-0-0-8', 'pcpid', '']);">8</a><span class="numbers">…</span>
					<a class="numbers last iconfont" href="//search.mi.com/search_手机-0-0-0-0-0-0-0-0-2" data-stat-id="477bace837581101" onclick="_msq.push(['trackEvent', '68d6962069cc2485-477bace837581101', '//search.mi.com/search_手机-0-0-0-0-0-0-0-0-2', 'pcpid', '']);"></a>
				</div>-->
			</div>
		</div>
	</div>
	<div class="site-page" >
		<div class="pageTurn" id="pageTurn" >
				
		</div>
		<div class="container">
			<h2 class="title" >小米销量TOP10</h2>
			<div class="more" id="more" >
					
			</div>
		</div>
	</div>
	
	<div class="site-footer">
			<div class="container">
				<div class="footer-service">
					<ul class="list-service clearfix">
						<li>
							<a rel="nofollow" ><i class="iconfont icon-weixiu"></i>预约维修服务</a>
						</li>
						<li>
							<a rel="nofollow" ><i class="iconfont icon-7tian"></i>7天无理由退货</a>
						</li>
						<li>
							<a rel="nofollow" ><i class="iconfont icon-15tian"></i>15天免费换货</a>
						</li>
						<li>
							<a rel="nofollow" ><i class="iconfont icon-lipin"></i>满150元包邮</a>
						</li>
						<li>
							<a rel="nofollow" ><i class="iconfont icon-dizhi"></i>520余家售后网点</a>
						</li>
					</ul>
				</div>
				<div class="footer-links">
					<table class="footer-table" border="0" cellspacing="0" cellpadding="0">
						<thead>
							<tr>
								<td>帮助中心</td>
								<td>服务支持</td>
								<td>线下门面</td>
								<td>关于小米</td>
								<td>关注我们</td>
								<td>特色服务</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><a href="">帐号管理</a></td>
								<td><a href="">售后服务</a></td>
								<td><a href="">小米之家</a></td>
								<td><a href="">了解小米</a></td>
								<td><a href="">新浪微博</a></td>
								<td><a href="">F码通道</a></td>
							</tr>
							<tr>
								<td><a href="">购物指南</a></td>
								<td><a href="">自助服务</a></td>
								<td><a href="">服务网点</a></td>
								<td><a href="">加入小米</a></td>
								<td><a href="">小米部落</a></td>
								<td><a href="">礼品码</a></td>
							</tr>
							<tr>
								<td><a href="">订单操作</a></td>
								<td><a href="">相关下载</a></td>
								<td><a href="">零售网点</a></td>
								<td><a href="">联系我们</a></td>
								<td><a href="">官方微信</a></td>
								<td><a href="">防伪查询</a></td>
							</tr>
						</tbody>
					</table>
					<div class="col-contact">
						<p class="phone">400-100-5678</p>
						<p>
							周一至周日 8:00-18:00<br>（仅收市话费）
						</p>
						<a rel="nofollow" class="btn btn-line-primary btn-small" href="//www.mi.com/service/contact/" target="_blank" data-stat-id="5b2a716d6de71f78" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-5b2a716d6de71f78', '//www.mi.com/service/contact/', 'pcpid', '']);"><i class="iconfont icon-pinglun"></i> 24小时在线客服</a>
					</div>
				</div>
			</div>
		</div>
		<div class="site-info">
			<div class="container">
				<div class="logo ir"></div>
				<div class="info-text">
					<p class="sites">
						<a rel="nofollow">小米商城</a><span class="sep">|</span>
						<a rel="nofollow">MIUI</a><span class="sep">|</span>
						<a rel="nofollow">米家</a><span class="sep">|</span>
						<a rel="nofollow">米聊</a><span class="sep">|</span>
						<a rel="nofollow">多看</a><span class="sep">|</span>
						<a rel="nofollow">路由器</a><span class="sep">|</span>
						<a rel="nofollow">米粉卡</a><span class="sep">|</span>
						<a rel="nofollow">小米天猫店</a><span class="sep">|</span>
						<a rel="nofollow">隐私政策</a><span class="sep">|</span>
						<a rel="nofollow">问题反馈</a><span class="sep">|</span>
						<a rel="nofollow">Select Region</a>
					</p>
					<p>©
						<a href="//www.mi.com/" target="_blank" title="mi.com" data-stat-id="836cacd9ca5b75dd" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-836cacd9ca5b75dd', '//www.mi.com/', 'pcpid', '']);">mi.com</a> 京ICP证110507号
						<a href="http://www.miitbeian.gov.cn/" target="_blank" rel="nofollow" data-stat-id="f96685804376361a" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-f96685804376361a', 'http://www.miitbeian.gov.cn/', 'pcpid', '']);">京ICP备10046444号</a>
						<a rel="nofollow" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020134" target="_blank" data-stat-id="57efc92272d4336b" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-57efc92272d4336b', 'http://www.beian.gov.cn/portal/registerSystemInforecordcode=11010802020134', 'pcpid', '']);">京公网安备11010802020134号 </a>
						<a rel="nofollow" href="//c1.mifile.cn/f/i/2013/cn/jingwangwen.jpg" target="_blank" data-stat-id="c5f81675b79eb130" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-c5f81675b79eb130', '//c1.mifile.cn/f/i/2013/cn/jingwangwen.jpg', 'pcpid', '']);">京网文[2014]0059-0009号</a>
				
						<br> 违法和不良信息举报电话：185-0130-1238，本网站所列数据，除特殊说明，所有数据均出自我司实验室测试</p>
				</div>
				<div class="info-links">
                    <a rel="nofollow" ><img rel="nofollow" src="//i1.mifile.cn/f/i/17/site/truste.png" alt="TRUSTe Privacy Certification"></a>
                    <a rel="nofollow" href="//search.szfw.org/cert/l/CX20120926001783002010" target="_blank" data-stat-id="d44905018f8d7096" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d44905018f8d7096', '//search.szfw.org/cert/l/CX20120926001783002010', 'pcpid', '']);"><img rel="nofollow" src="//s01.mifile.cn/i/v-logo-2.png" alt="诚信网站"></a>
                    <a rel="nofollow" href="https://ss.knet.cn/verifyseal.dll?sn=e12033011010015771301369&amp;ct=df&amp;pa=461082" target="_blank" data-stat-id="3e1533699f264eac" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-3e1533699f264eac', 'https://ss.knet.cn/verifyseal.dllsn=e12033011010015771301369&amp;ct=df&amp;pa=461082', 'pcpid', '']);"><img rel="nofollow" src="//s01.mifile.cn/i/v-logo-1.png" alt="可信网站"></a>
                    <a rel="nofollow" href="http://www.315online.com.cn/member/315140007.html" target="_blank" data-stat-id="b085e50c7ec83104" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-b085e50c7ec83104', 'http://www.315online.com.cn/member/315140007.html', 'pcpid', '']);"><img rel="nofollow" src="//s01.mifile.cn/i/v-logo-3.png" alt="网上交易保障中心"></a>
                    <a rel="nofollow" href="https://www.mi.com/service/buy/commitment/" target="_blank" data-stat-id="58f7ed00e65efc90" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-58f7ed00e65efc90', 'https://www.mi.com/service/buy/commitment/', 'pcpid', '']);"><img rel="nofollow" src="//i8.mifile.cn/b2c-mimall-media/ba10428a4f9495ac310fd0b5e0cf8370.png" alt="诚信经营 放心消费"></a>
               </div>
			</div>
			<div class="slogan ir"></div>
		</div>
		<div id="userdialog" class="hidden" ></div>
</body>

</html>