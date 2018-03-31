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
	out.write("<script>window.location.href='"+basePath+"login.jsp'</script>");
}
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
	<link rel="icon" href="image/index/logo-footer.png" type="image/x-icon" />
    <title>小米订单管理页</title>
		<link rel="stylesheet" type="text/css" href="css/iconfont.css"/>
		<link rel="stylesheet" type="text/css" href="css/index.css"/>
		<link rel="stylesheet" type="text/css" href="css/common/pageTurn.css"/>
		<link rel="stylesheet" type="text/css" href="css/common/new_tips.css"/>
		<link rel="stylesheet" href="css/common/dialog.css" type="text/css"></link>
    	<link rel="stylesheet" type="text/css" href="css/common/userdialog.css"/>
    	<link rel="stylesheet" type="text/css" href="css/common/goodsimg.css"/>
		<link rel="stylesheet" type="text/css" href="css/details/mt.css"/>
		<link rel="stylesheet" type="text/css" href="css/order/order.css"/>
		<script src="js/jquery-1.12.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/util.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="js/index/header_nav_menu.js" ></script>
		<script src="js/dialog.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/dialog/userdialog.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/goodsimg.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/new_tips.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/pageTurn.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/common.js" type="text/javascript" charset="utf-8"></script>
 		<script src="js/order/fill_order.js" type="text/javascript" charset="utf-8"></script>
 		<script src="js/order/orderTabs.js" type="text/javascript" charset="utf-8"></script>
 		<script src="js/order.js" type="text/javascript" charset="utf-8"></script>		 
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
		        <a href="<%=basePath %>homePage.jsp" >首页</a><span class="sep">&gt;</span><span>交易订单</span>
		    </div>
		</div>
		<div class="page-main">
			<div class="container">
				<div class="order-list-content" >
					<h1 class="title">我的订单</h1>
					<div id="order_option" class="order-option clearfix">
						<ul class="filter-list J_orderType">
							<li class="first active" data-state = "0" >
								已付款订单
							</li>
							<li data-state = "1" >
								待付款
							</li>
							<li data-state = "2" >
								已关闭
							</li>
						</ul>
					</div>
					<div id="J_orderList">
						<!--<p class="empty">当前没有待支付订单。</p>-->
						<!--<div class="order-item">
							<div class="order-summary">
								<div class="order-status">已收货</div>
							</div>
							<div class="order-detail">
								<p class="caption-info">2017年05月20日 18:39
									<span class="sep">|</span>卢兆禹
									<span class="sep">|</span>订单号：1170520958703904
									<span class="sep">|</span>小米钱包
								</p>
								<p class="caption-price">订单金额：<span class="num">171.00</span>元</p>
							</div>
							<div class="goods-list">
								<div class="figure figure-thumb">
									<a href="//item.mi.com/1171300055.html" target="_blank">
										<img src="//i1.mifile.cn/a1/pms_1491376442.10212059!80x80.jpg" width="80" height="80" alt="红米Note 4X 高配版 智能显示保护套 金色">
									</a>
								</div>
								<div class="name">
									<a href="//item.mi.com/1171300055.html" target="_blank">红米Note 4X 高配版 智能显示保护套 金色</a>
									<p class="price">39元 × 1</p>
								</div>
								<a href="javascript:void(0);" class="btn J_goComment" >去评价</a>
							</div>
							<div class="goods-list">
								<div class="figure figure-thumb">
									<a href="//item.mi.com/1171300055.html" target="_blank">
										<img src="//i1.mifile.cn/a1/pms_1491376442.10212059!80x80.jpg" width="80" height="80" alt="红米Note 4X 高配版 智能显示保护套 金色">
									</a>
								</div>
								<div class="name">
									<a href="//item.mi.com/1171300055.html" target="_blank">红米Note 4X 高配版 智能显示保护套 金色</a>
									<p class="price">39元 × 1</p>
								</div>
								<a href="javascript:void(0);" class="btn J_goComment" >去评价</a>
							</div>
							<div class="goods-list">
								<div class="figure figure-thumb">
									<a href="//item.mi.com/1171300055.html" target="_blank">
										<img src="//i1.mifile.cn/a1/pms_1491376442.10212059!80x80.jpg" width="80" height="80" alt="红米Note 4X 高配版 智能显示保护套 金色">
									</a>
								</div>
								<div class="name">
									<a href="//item.mi.com/1171300055.html" target="_blank">红米Note 4X 高配版 智能显示保护套 金色</a>
									<p class="price">39元 × 1</p>
								</div>
								<a href="javascript:void(0);" class="btn J_goComment" >去评价</a>
								<div class="comment-item">
									<div class="user-column">
										<div class="user-info">A***N<img class="avatar" src="image/user/1517221781511_0.jpg" width="32" height="32">
											<div class="user-level superMaUser"><i title="超级管理员" class="iconfont icon-kehuguanli"></i>超级管理员</div>
										</div>
									</div>
									<div class="comment-column">
										<div class="comment-star star1"></div>
										<div class="star-tips" >1星</div>
										<textarea autofocus="autofocus" class="comment-con">给亲爱的老公大人买的? 老公用了说不错呢，双十一当天晚上抢到的[胜利]为了买苹果X我也是狠了心做好了勒紧裤腰带的准备[捂脸]现在心还是隐痛隐痛滴[心碎]开始的前几天一直没有货十六号配送的，原本以为起码要等十多天的[坏笑][坏笑]机子刚拿到手内心还是有点小激动的！！！机子整体没有毛病，唯一不足的就是 人脸解锁没有指纹的快，有点小沮丧。。。应该时间用长了就习惯了吧? 主要是它的芯片是智能的。这点还是非常棒的。<br> 其实买很多产品都会出现瑕疵品，就像中奖一样，看你运气好不好了。我在这里呢跟大家分享下自己的一些小经验哟：大家怎么看自己的手机是否有问题，而且还支持退货！<br> 首先 不要激活，检查外观，看看手机是否有小裂痕之类的，然后检查摄像头是否有灰尘。如果外观没有任何问题的话，然后开机检查屏幕 是否有 红线等情况。记住哟先不要激活，因为激活之后很难退货或者换新了? 因为X开机是白色的 所以很好分辨，如果没有问题那就可以激活了，到这个步骤的话没有出现问题~那恭喜你，没有中奖！希望这些技巧 能帮到大家，如果对大家有用的话 就给我点个赞吧 。<br> 机子不错</textarea>
										
										<div class="pic-list">
											<a href="javascript:void(0);" class="btn_upload J_uploadPicture" >上传图片</a>
											<form action="upload.action" class="hidden" method="post" target="hidden_iframe_txtimgList" enctype="multipart/form-data"></form>
											<div class="uploadImg" >
												<div class="J-thumb-img"><img src="image/review/42A3B693C94043208C896585210DA04A/user1_1.jpg" width="48" height="48"></div>
												<div class="J-thumb-img"><img src="image/review/42A3B693C94043208C896585210DA04A/user1_2.jpg" width="48" height="48"></div>
												<div class="J-thumb-img"><img src="image/review/42A3B693C94043208C896585210DA04A/user1_3.jpg" width="48" height="48"></div>
												<div class="J-thumb-img"><img src="image/review/42A3B693C94043208C896585210DA04A/user1_4.jpg" width="48" height="48"></div>
												<div class="J-thumb-img"><img src="image/review/42A3B693C94043208C896585210DA04A/user1_5.jpg" width="48" height="48"></div>
												<div class="J-thumb-img"><img src="image/review/42A3B693C94043208C896585210DA04A/user1_1.jpg" width="48" height="48"></div>
												<div class="J-thumb-img"><img src="image/review/42A3B693C94043208C896585210DA04A/user1_2.jpg" width="48" height="48"></div>
												<div class="J-thumb-img"><img src="image/review/42A3B693C94043208C896585210DA04A/user1_3.jpg" width="48" height="48"></div>
												<div class="J-thumb-img"><img src="image/review/42A3B693C94043208C896585210DA04A/user1_4.jpg" width="48" height="48"></div>
												<div class="J-thumb-img"><img src="image/review/42A3B693C94043208C896585210DA04A/user1_5.jpg" width="48" height="48"></div>
												<div class="J-thumb-img"><img src="image/review/42A3B693C94043208C896585210DA04A/user1_4.jpg" width="48" height="48"></div>
												<div class="J-thumb-img"><img src="image/review/42A3B693C94043208C896585210DA04A/user1_5.jpg" width="48" height="48"></div>
											</div>
										</div>
										<div class="comment-message">
											<div class="order-info"><span>2018年01月30日 14:53:06</span></div>
											<a href="javascript:void(0);" class="btn_commit J_submitComment" >提交评论</a>
										</div>
									</div>
								</div>
							</div>
						</div>-->
					</div>
					<div class="pageTurn" id="pageTurn" >
							
					</div>
				</div>
			</div>
		</div>
		<div class="site-footer">
			<div class="container">
				<div class="footer-service">
					<ul class="list-service clearfix">
						<li>
							<a rel="nofollow"><i class="iconfont icon-weixiu"></i>预约维修服务</a>
						</li>
						<li>
							<a rel="nofollow"><i class="iconfont icon-7tian"></i>7天无理由退货</a>
						</li>
						<li>
							<a rel="nofollow"><i class="iconfont icon-15tian"></i>15天免费换货</a>
						</li>
						<li>
							<a rel="nofollow"><i class="iconfont icon-lipin"></i>满150元包邮</a>
						</li>
						<li>
							<a rel="nofollow"><i class="iconfont icon-dizhi"></i>520余家售后网点</a>
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
								<td>
									<a href="">帐号管理</a>
								</td>
								<td>
									<a href="">售后服务</a>
								</td>
								<td>
									<a href="">小米之家</a>
								</td>
								<td>
									<a href="">了解小米</a>
								</td>
								<td>
									<a href="">新浪微博</a>
								</td>
								<td>
									<a href="">F码通道</a>
								</td>
							</tr>
							<tr>
								<td>
									<a href="">购物指南</a>
								</td>
								<td>
									<a href="">自助服务</a>
								</td>
								<td>
									<a href="">服务网点</a>
								</td>
								<td>
									<a href="">加入小米</a>
								</td>
								<td>
									<a href="">小米部落</a>
								</td>
								<td>
									<a href="">礼品码</a>
								</td>
							</tr>
							<tr>
								<td>
									<a href="">订单操作</a>
								</td>
								<td>
									<a href="">相关下载</a>
								</td>
								<td>
									<a href="">零售网点</a>
								</td>
								<td>
									<a href="">联系我们</a>
								</td>
								<td>
									<a href="">官方微信</a>
								</td>
								<td>
									<a href="">防伪查询</a>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="col-contact">
						<p class="phone">400-100-5678</p>
						<p>
							周一至周日 8:00-18:00<br>（仅收市话费）
						</p>
						<a rel="nofollow" class="btn btn-line-primary btn-small" href="//www.mi.com/service/contact/" target="_blank" data-stat-id="5b2a716d6de71f78" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-5b2a716d6de71f78', '//www.mi.com/service/contact/', 'pcpid', '']);" style="line-height: 17px;"><i class="iconfont icon-pinglun"></i> 24小时在线客服</a>
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
					<a rel="nofollow"><img rel="nofollow" src="//i1.mifile.cn/f/i/17/site/truste.png" alt="TRUSTe Privacy Certification"></a>
					<a rel="nofollow" href="//search.szfw.org/cert/l/CX20120926001783002010" target="_blank" data-stat-id="d44905018f8d7096" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d44905018f8d7096', '//search.szfw.org/cert/l/CX20120926001783002010', 'pcpid', '']);"><img rel="nofollow" src="//s01.mifile.cn/i/v-logo-2.png" alt="诚信网站"></a>
					<a rel="nofollow" href="https://ss.knet.cn/verifyseal.dll?sn=e12033011010015771301369&amp;ct=df&amp;pa=461082" target="_blank" data-stat-id="3e1533699f264eac" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-3e1533699f264eac', 'https://ss.knet.cn/verifyseal.dllsn=e12033011010015771301369&amp;ct=df&amp;pa=461082', 'pcpid', '']);"><img rel="nofollow" src="//s01.mifile.cn/i/v-logo-1.png" alt="可信网站"></a>
					<a rel="nofollow" href="http://www.315online.com.cn/member/315140007.html" target="_blank" data-stat-id="b085e50c7ec83104" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-b085e50c7ec83104', 'http://www.315online.com.cn/member/315140007.html', 'pcpid', '']);"><img rel="nofollow" src="//s01.mifile.cn/i/v-logo-3.png" alt="网上交易保障中心"></a>
					<a rel="nofollow" href="https://www.mi.com/service/buy/commitment/" target="_blank" data-stat-id="58f7ed00e65efc90" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-58f7ed00e65efc90', 'https://www.mi.com/service/buy/commitment/', 'pcpid', '']);"><img rel="nofollow" src="//i8.mifile.cn/b2c-mimall-media/ba10428a4f9495ac310fd0b5e0cf8370.png" alt="诚信经营 放心消费"></a>
				</div>
			</div>
			<div class="slogan ir"></div>
		</div>
		</div>
		<div id="goodsImgSee" class="hidden"></div>
		<div id="userdialog" class="hidden"></div>
		<div id="newTips" class="hidden"></div>
  </body>
</html>
