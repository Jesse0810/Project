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
    <base href="<%=basePath%>">
    <link rel="icon" href="image/index/logo-footer.png" type="image/x-icon"/>
    <title>小米主页</title>
		<link rel="stylesheet" type="text/css" href="css/iconfont.css"/>
		<link rel="stylesheet" type="text/css" href="css/goods_list.css"/>
		<link rel="stylesheet" type="text/css" href="css/carouselFigure.css"/>
		<link rel="stylesheet" type="text/css" href="css/index.css"/>
		<link rel="stylesheet" type="text/css" href="css/index/home_brick_box.css" />
		<link rel="stylesheet" href="css/common/dialog.css" type="text/css"></link>
    	<link rel="stylesheet" type="text/css" href="css/common/userdialog.css"/>
		<script src="js/jquery-1.12.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/util.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="js/index/header_nav_menu.js" ></script>
		<script src="js/GoodsList.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="js/carouselFigure.js" ></script>
		<script src="js/index/home_brick_box.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/dialog.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/dialog/userdialog.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/common.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/index.js" type="text/javascript" charset="utf-8"></script>		
	</head>
	<body>
		<div class="site-bn-bar" style="background-image:url('image/index/main_hd.jpg');">
			<a class="site-bn-bar-link exposure" href="<%=basePath %>production_information.jsp?id=9E9768506C1C422F81D25D52ACE06FDC" target="_blank"></a>
		</div>
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
					<ul class="user-menu hidden">
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
		<div class="site-body">
			<div class="container">
				<ul class="J_categoryList" >
					<li class="category-item">手机 电话卡<i class="iconfont icon-xiangyoujiantou"></i></li>
					<li class="category-item">笔记本<i class="iconfont icon-xiangyoujiantou"></i></li>
					<li class="category-item">电视 盒子<i class="iconfont icon-xiangyoujiantou"></i></li>
					<li class="category-item">路由器 智能硬件<i class="iconfont icon-xiangyoujiantou"></i></li>
					<li class="category-item">移动电源 电池 插线板<i class="iconfont icon-xiangyoujiantou"></i></li>
					<li class="category-item">耳机 音箱<i class="iconfont icon-xiangyoujiantou"></i></li>
					<li class="category-item">保护套 贴膜<i class="iconfont icon-xiangyoujiantou"></i></li>
					<li class="category-item">线材 支架 存储卡<i class="iconfont icon-xiangyoujiantou"></i></li>
					<li class="category-item">箱包 服饰 鞋 眼镜<i class="iconfont icon-xiangyoujiantou"></i></li>
					<li class="category-item">米兔 生活周边<i class="iconfont icon-xiangyoujiantou"></i></li>
				</ul>
				<div class="slide" id="slide" ></div>
			</div>
		</div>
		<div class="container">
            <div class="span4">
                <div class="home-channel-list clearfix">
                                        <div class="exposure top left"><a><i class="iconfont icon-shoujidaoshouji"></i>选购手机</a></div>
                                        <div class="exposure top"><a><i class="iconfont icon-lipin"></i>企业团购</a></div>
                                        <div class="exposure top"><a><i class="iconfont icon-facebookfacebook51"></i>F码通道</a></div>
                                        <div class="exposure left"><a><i class="iconfont icon-SIMqiaguanli"></i>米粉卡</a></div>
                                        <div class="exposure "><a><i class="iconfont icon-11"></i>以旧换新</a></div>
                                        <div class="exposure "><a><i class="iconfont icon-huafei"></i>话费充值</a></div>
                                    </div>
            </div>
            <div class="span16" id="J_homePromo" data-stat-title="焦点图下方小图">
                <ul class="home-promo-list clearfix">
                                        <li class="first">
                        <a class="item exposure" href="<%=basePath %>production_information.jsp?id=87BBFAF0F42B43649986B1A26441C327" target="_blank" ><img alt="小米5X 干推-黄" src="//i1.mifile.cn/a4/xmad_15145541454323_YMAFN.jpg" ></a>
                    </li>
                                        <li>
                        <a class="item exposure" href="<%=basePath %>production_information.jsp?id=CA24B4D1D62841B9B3678105F533FC8E" target="_blank" ><img alt="红米Note 5A 高配领券减100" src="//i1.mifile.cn/a4/xmad_15150748721719_UpeAC.jpg" ></a>
                    </li>
                                        <li>
                        <a class="item exposure" href="<%=basePath %>production_information.jsp?id=F5DEA0D6F46740B6A480D6FB83610EEB" target="_blank" ><img alt="声波电动牙刷" src="//i1.mifile.cn/a4/xmad_1515151060201_EhQzc.jpg"></a>
                    </li>
                                    </ul>
            </div>
        </div>
		<div class="site-good">
			<div class="container">
				<h2 class="title" >小米明星单品</h2>
				<div class="more" id="more" >
					
				</div>
			</div>
		</div>
		<div class="page-main home-main">
			<div class="container">
				<div class="home-brick-box home-brick-row-2-box" id="homeelec" >
					
				</div>
				<div class="home-brick-box home-brick-row-2-box" id="smart" >
					
				</div>
				<div class="home-brick-box home-brick-row-2-box" id="match" >
					
				</div>
				<div class="home-brick-box home-brick-row-2-box" id="accessories" >
					
				</div>
				<div class="home-brick-box home-brick-row-2-box" id="around" >
					
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
