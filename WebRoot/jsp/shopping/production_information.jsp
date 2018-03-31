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
String goodsId = request.getParameter("id");
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
   <base href="<%=basePath%>" data-goodsid="<%=goodsId %>">
	<link rel="icon" href="image/index/logo-footer.png" type="image/x-icon" />
	<title>商品详情页</title>
	<link rel="stylesheet" type="text/css" href="css/iconfont.css" />
	<!--<link rel="stylesheet" type="text/css" href="css/index/goods_list_search.css" />-->
	<link rel="stylesheet" type="text/css" href="css/index.css" />
	<link rel="stylesheet" type="text/css" href="css/details/tabs.css" />
	<link rel="stylesheet" type="text/css" href="css/details/mt.css" />
	<link rel="stylesheet" type="text/css" href="css/common/pageTurn.css"/>
	<link rel="stylesheet" type="text/css" href="css/common/new_tips.css"/>
	<link rel="stylesheet" href="css/common/dialog.css" type="text/css"></link>
	<link rel="stylesheet" type="text/css" href="css/common/userdialog.css" />
	<link rel="stylesheet" type="text/css" href="css/common/goodsimg.css"/>
	<link rel="stylesheet" href="css/production_information.css" />
	<script src="js/jquery-1.12.0.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/util.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="js/index/header_nav_menu.js"></script>
	<script src="js/dialog.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/dialog/userdialog.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/goodsimg.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/common/new_tips.js" type="text/javascript" charset="utf-8"></script>
	<!--<script type="text/javascript" src="js/detail/tabs.js" ></script>-->
	<script type="text/javascript" src="js/detail/newTabs.js" ></script>
	<script src="js/common/pageTurn.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="js/detail/GoodsEvaluation.js" ></script>
	<script type="text/javascript" src="js/detail/fill_pd_information.js" ></script>
	<script src="js/common/common.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="js/production_information.js"></script>
	
    

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
		<div class="xm-product-box" id="J_ProductBox" >
			<div class="nav-bar" id="J_headNav">
				<div class="container J_navSwitch">
					<h2 class="J_proName"></h2>
					<div class="con">
						<div class="right">
							<a>概述</a> <span class="separator">|</span>
							<a>图集</a> <span class="separator">|</span>
							<a>参数</a> <span class="separator">|</span>
							<a>F码通道</a> <span class="separator">|</span>
							<a>用户评价</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="xm-product-box nav-bar-hidden" id="J_fixNarBar">
			<div class="nav-bar">
				<div class="container J_navSwitch">
					<h2 class="J_proName"></h2>
					<div class="con">
						<div class="right">
							<a>概述</a> <span class="separator">|</span>
							<a>图集</a> <span class="separator">|</span>
							<a>参数</a> <span class="separator">|</span>
							<a>F码通道</a> <span class="separator">|</span>
							<a>用户评价</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="login-notic J_notic <%=unlogin %>">
            <!-- 未登录提示 -->
            <div class="container">
               	为方便您购买，请提前登录 <a id="login_href" href="<%=basePath %>login.jsp" >立即登录</a>
               	<i id='close_unlogin' class="iconfont" >&#xe624;</i>
            </div>
        </div>
		<div class="pro-choose-main container clearfix">
			<div class="pro-view span10" id="sildeImage" >
				<!--<img class="sliderWrap" src="image/production_information/pms_1.jpg" />
				<img class="sliderWrap hidden" src="image/production_information/pms_2.jpg" />-->
			</div>
			<div class="pro-info span10">
				<h1 class="pro-title J_proName"></h1>
				<!-- 提示 -->
				<p class="sale-desc" id="J_desc">
					</p>
				<!-- 选择第一级别 -->
				<span class="pro-price J_proPrice"></span>
		
				<!-- 主体 -->
				<div class="J_main">
					<!-- 分仓地址 -->
					<div class="J_addressWrap address-wrap">
						<div class="user-default-address" id="J_userDefaultAddress"> <i class="iconfont iconfont-location">&#xe614;</i>
							<div>
								<div class="address-info"><span class="item">北京</span><span class="item">北京市</span><span class="item">东城区</span><span class="item">永定门外街道</span></div> <span class="switch-choose-regions" id="J_switchChooseRegions"> 修改 </span> </div>
							<div class="product-status active" id="J_productStatus">  <span class="sale">有现货</span></div>
						</div>
					</div>
					<!-- 产品版本 -->
					<!--<div class="list-wrap" id="J_list">
						<div class="pro-choose pro-choose-col2 J_step" data-index="0">
							<div class="step-title" data-name="选择版本"> 选择版本 </div>
							<ul class="step-list step-one clearfix">
								<li class="btn btn-biglarge active" data-name="4GB+64GB" data-price="1899元  " data-index="0" data-value="4GB+64GB">
									<span class="name">4GB+64GB </span> <span class="price"> 1899元 </span>
								</li>
								<li class="btn btn-biglarge" data-name="6GB+64GB" data-price="2099元  " data-index="1" data-value="6GB+64GB">
									<span class="name">6GB+64GB </span> <span class="price"> 2099元 </span>
								</li>
								<li class="btn btn-biglarge" data-name="6GB+128GB" data-price="2299元  起  " data-index="2" data-value="6GB+128GB">
									<span class="name">6GB+128GB </span> <span class="price"> 2299元起 </span>
								</li>
							</ul>
						</div>
						<div class="pro-choose pro-choose-col2 J_step" data-index="1">
							<div class="step-title" data-name="选择颜色"> 选择颜色 </div>
							<ul class="step-list clearfix">
								<li class="btn btn-biglarge imgchange active" data-id="2174200039" data-cid="1174200056" data-name="小米Note 3 4GB+64GB 亮黑色 " data-price="1899元" data-value="亮黑色" data-index="0">
									<img src="https://i8.mifile.cn/b2c-mimall-media/bc99af80103f531296be0be09811bd7f.png" data-src="//i8.mifile.cn/b2c-mimall-media/bc99af80103f531296be0be09811bd7f.png" alt="亮黑色" class="done"> 亮黑色 
								</li>
								<li class="btn btn-biglarge imgchange" data-id="2174500009" data-cid="1174500029" data-name="小米Note 3 4GB+64GB 亮蓝色 " data-price="1899元" data-value="亮蓝色" data-index="1">
									<img src="https://i8.mifile.cn/b2c-mimall-media/30ad61e2bbafa9ce7aa3488baa14081f.png" data-src="//i8.mifile.cn/b2c-mimall-media/30ad61e2bbafa9ce7aa3488baa14081f.png" alt="亮蓝色" class="done"> 亮蓝色 
								</li>
							</ul>
						</div>
					</div>-->
					<!-- 上面安装服务 -->
					<!--                    <div class="pro-choose list-choose hide" id="J_install">
		                        <div class="step-title">
		                            可选 上门安装服务
		                        </div>
		                        <div class="list-box">
		                            <a class="iconfont J_extend" href="javascript:void(0);">&#xe61b;</a>
		                            <p class="list-tips J_listTips">搭配手机一起购买，<span>最多省 <span class="J_salePrice">39</span>元</span></p>
		                            <div class="list-desc J_listDescBox hide">
		                                <p class="tips">已选择 <span class="J_listNum">0</span> 款配件 <a href="javascript:void(0);" class="J_listDelete">移除</a></p>
		                                <p class="desc"></p>
		                                <p class="price"></p>
		                            </div>
		                        </div>
		                        <div class="list">
		
		                        </div>
		                    </div> -->
					<!-- 已选择的产品 -->
					
					<div class="pro-list" id="J_proList">
						<ul>
							<li></li>
							<li class="totlePrice"> 总计 ：1899元 </li>
						</ul>
					</div>
					<!-- 购买按钮 -->
					<ul class="btn-wrap clearfix" id="J_buyBtnBox">
						<li >
							<a id="addCart_btn" class="btn btn-primary  btn-biglarge J_proBuyBtn" data-type="common" data-isbigtap="false" data-name="加入购物车">加入购物车</a>
						</li>
						<li id="nostock_btn" >
							<a data-type="common" data-sign="disabled" data-tip="" class="btn btn-line-primary btn-biglarge J_setRemind disabled" href="javascript:void(0);" data-name="加入购物车">到货通知</a>
						</li>
					</ul>
				</div>
				<!-- 获取商品失败 -->
			</div>
		</div>
		<div class="comment-row" >
			<div id="userTabs" class="container TabContext" >
				<div class='Tabs_menu' >
					<span class='Tabs_option' key='detail'>商品详情</span>
					<span class='Tabs_option' key='comment'>评论（<span id="comment_num" ></span>）</span>
					<span class='Tabs_option' key='after_sales'>售后</span>
				</div>
				<div class='Tabs' >
					<div class='Tabs_content' key='detail'>
						<div id="tab3">
							
						</div>	
					</div>
					<div class='Tabs_content' key='comment' >
						<div id="tabs4" ></div>
						<div id="pageTurn" class="pageTurn" ></div>
					</div>
					<div class='Tabs_content' key='after_sales'>
						<div class="pro-infomation" id="J_proInfo">	
							<div class="infor-con">
								<div class="section is-visible preload">
									<div class="container">
										<h3>包装清单  </h3>
										<div class="con"><img data-src="//i8.mifile.cn/b2c-mimall-media/cbe8936aca3c2833562a3c58175a1225.jpg" class="slider done" src="https://i8.mifile.cn/b2c-mimall-media/cbe8936aca3c2833562a3c58175a1225.jpg"></div>
									</div>
								</div>
								<div class="section is-visible preload">
									<div class="container">
										<h3>小米承诺  <a href="https://order.mi.com/service/serviceAgreement?id=34" target="_blank">查看详情 <i class="iconfont">&#xe65f;</i></a>  </h3>
										<div class="con"><img data-src="//i8.mifile.cn/b2c-mimall-media/913dbcde8a3e02bded640b3cd12837a9.png" class="slider done" src="https://i8.mifile.cn/b2c-mimall-media/913dbcde8a3e02bded640b3cd12837a9.png"></div>
									</div>
								</div>
								<div class="section is-visible preload">
									<div class="container">
										<h3>官方微信  </h3>
										<div class="con"><img data-src="//i8.mifile.cn/b2c-mimall-media/1a84b2b629512205bf528aae91361efb.jpg" class="slider done" src="https://i8.mifile.cn/b2c-mimall-media/1a84b2b629512205bf528aae91361efb.jpg"></div>
									</div>
								</div>
							</div>
					</div>
				</div>
			</div>
		</div>		
		<!--<div class="pro-infomation" id="J_proInfo">	
			<div class="infor-con">
				<div class="section is-visible preload">
					<div class="container">
						<h3>包装清单  </h3>
						<div class="con"><img data-src="//i8.mifile.cn/b2c-mimall-media/cbe8936aca3c2833562a3c58175a1225.jpg" class="slider done" src="https://i8.mifile.cn/b2c-mimall-media/cbe8936aca3c2833562a3c58175a1225.jpg"></div>
					</div>
				</div>
				<div class="section is-visible preload">
					<div class="container">
						<h3>小米承诺  <a href="https://order.mi.com/service/serviceAgreement?id=34" target="_blank">查看详情 <i class="iconfont">&#xe65f;</i></a>  </h3>
						<div class="con"><img data-src="//i8.mifile.cn/b2c-mimall-media/913dbcde8a3e02bded640b3cd12837a9.png" class="slider done" src="https://i8.mifile.cn/b2c-mimall-media/913dbcde8a3e02bded640b3cd12837a9.png"></div>
					</div>
				</div>
				<div class="section is-visible preload">
					<div class="container">
						<h3>官方微信  </h3>
						<div class="con"><img data-src="//i8.mifile.cn/b2c-mimall-media/1a84b2b629512205bf528aae91361efb.jpg" class="slider done" src="https://i8.mifile.cn/b2c-mimall-media/1a84b2b629512205bf528aae91361efb.jpg"></div>
					</div>
				</div>
			</div>
		</div>-->
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
						<a rel="nofollow" class="btn btn-line-primary btn-small" href="//www.mi.com/service/contact/" target="_blank" data-stat-id="5b2a716d6de71f78" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-5b2a716d6de71f78', '//www.mi.com/service/contact/', 'pcpid', '']);" style="line-height: 17px;" ><i class="iconfont icon-pinglun"></i> 24小时在线客服</a>
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
	</div>
		<div id="goodsImgSee" class="hidden" ></div>
		<div id="userdialog" class="hidden" ></div>
		<div id="newTips" class="hidden" ></div>
  </body>
</html>
