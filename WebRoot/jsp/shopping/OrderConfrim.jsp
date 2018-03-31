<%@page import="com.njwangbo.pojo.shopping.OrderChild"%>
<%@page import="com.njwangbo.pojo.shopping.Order"%>
<%@page import="com.njwangbo.pojo.common.User"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
User user = (User)session.getAttribute("user");
Order order = (Order)session.getAttribute("order");
String userName = "";
String userImage = "";
String orderId = "";
int orderNum = 0;
double totalPrice = 0;
if(user != null&&order != null){
	userName = user.getName();
	userImage = user.getImage();
	if(userName.equals(order.getUserName())){
		List<OrderChild> childList = order.getChildList();
		for(OrderChild child:childList){
			orderNum+=child.getNum();
			totalPrice+=child.getNum()*child.getPrice();
		}	
	}else{
		out.write("<script>alert('非法访问！');window.location.href='"+basePath+"login.jsp'</script>");
	}
}else{
	out.write("<script>alert('非法访问！');window.location.href='"+basePath+"login.jsp'</script>");
}
%>

<!DOCTYPE HTML>
<html>

	<head>
		<base href="<%=basePath%>">
		<link rel="icon" href="image/index/logo-footer.png" type="image/x-icon" />

		<title>小米订单确认页</title>
		<link rel="stylesheet" type="text/css" href="css/iconfont.css" />
		<link rel="stylesheet" type="text/css" href="css/index.css" />
		<link rel="stylesheet" type="text/css" href="css/cart/cart.css" />
		<link rel="stylesheet" type="text/css" href="css/common/new_tips.css" />
		<link rel="stylesheet" href="css/common/dialog.css" type="text/css"></link>
		<link rel="stylesheet" type="text/css" href="css/common/userdialog.css" />
		<link rel="stylesheet" type="text/css" href="css/order/orderConfrim.css"/>
		<script src="js/jquery-1.12.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/util.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/dialog.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/dialog/userdialog.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/new_tips.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/orderConfirm.js" type="text/javascript" charset="utf-8"></script>
	</head>

	<body>
		<div class="site-header site-mini-header">
			<div class="container">
				<div class="header-logo">
				</div>
				<div class="header-title has-more" id="J_miniHeaderTitle">
					<h2>确认订单</h2></div>
				<div class="topbar-info" id="J_userInfo">
					<span class="user "><a rel="nofollow" class="user-name" ><span class="name"><%=userName %></span><i class="iconfont">&#xe66e;</i></a>
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
					<span class="sep">|</span>
					<a rel="nofollow" class="link link-order" href="<%=basePath %>Order.jsp" target="_blank" >我的订单</a>
				</div>
			</div>
		</div>
		<div class="page-main">
			<div class="container">
				<div class="checkout-box" id="order_check" >
					<div class="section section-address">
						<div class="section-header clearfix">
							<h3 class="title">收货地址</h3>

						</div>
						<div class="section-body clearfix" id="J_addressList">

							<div class="address-item J_addressItem " data-address_id="10161204463600034" data-consignee="卢兆禹" data-tel="158****8576" data-province_id="11" data-province_name="江苏" data-city_id="109" data-city_name="南京市" data-district_id="1149" data-district_name="玄武区" data-area="1149002" data-area_name="梅园新村街道" data-address="北京东路41号 29号楼 5楼网站" data-tag_name="公司" data-zipcode="210018" data-editable="Y" data-neededit="N">
								<dl>
									<dt>
                                <span class="tag">公司</span>
                                <em class="uname"><%=userName %></em>
                            </dt>
									<dd class="utel">
										XXXXXXXX</dd>
									<dd class="uaddress">
										江苏 南京市 XXXXXXXX<br> XXXXXXXXXXXXXXX </dd>
								</dl>
							</div>
							<div class="address-item J_addressItem " data-address_id="10150217630001739" data-consignee="卢兆禹" data-tel="158****8576" data-province_id="11" data-province_name="江苏" data-city_id="109" data-city_name="南京市" data-district_id="1151" data-district_name="秦淮区" data-area="1151003" data-area_name="夫管办" data-address="龙蟠中路532号701室" data-tag_name="家" data-zipcode="210001" data-editable="Y" data-neededit="N">
								<dl>
									<dt>
                                <span class="tag">家</span>
                                <em class="uname"><%=userName %></em>
                            </dt>
									<dd class="utel">
										XXXXXXXX </dd>
									<dd class="uaddress">
										江苏 南京市 XXXXXXXX<br> XXXXXXXXXXXXXX </dd>
								</dl>
							</div>

						</div>
					</div>

					<div class="section section-options section-payment clearfix">
						<div class="section-header">
							<h3 class="title">支付方式</h3>
						</div>
						<div class="section-body clearfix">
							<ul class="J_optionList options ">
								<li data-type="pay" class="J_option selected" data-value="1">
									在线支付 <span>
                            （支持微信支付、支付宝、银联、财付通、小米钱包等）                            </span>
								</li>
							</ul>
						</div>
					</div>

					<div class="section section-options section-shipment clearfix">
						<div class="section-header">
							<h3 class="title">配送方式</h3>
						</div>
						<div class="section-body clearfix">
							<ul class="clearfix J_optionList options ">
								<li data-type="shipment" class="J_option selected" data-amount="10" data-value="2">
									快递配送（运费 10 元） </li>
							</ul>

						</div>
					</div>

					<div class="section section-options section-time hidden clearfix">
						<div class="section-header">
							<h3 class="title">配送时间</h3>
						</div>
						<div class="section-body clearfix">
							<ul class="J_optionList options options-list clearfix">
								<!-- besttime start -->
								<li data-type="time" class="J_option selected" data-value="1">
									不限送货时间：<span>周一至周日</span> </li>
								<li data-type="time" class="J_option " data-value="2">
									工作日送货：<span>周一至周五</span> </li>
								<li data-type="time" class="J_option " data-value="3">
									双休日、假日送货：<span>周六至周日</span> </li>
								<!-- besttime end -->
							</ul>
						</div>
					</div>

					<div class="section section-options section-invoice clearfix">
						<div class="section-header">
							<h3 class="title">发票</h3>
						</div>
						<div class="section-body clearfix">
							<div class="invoice-result">
								<span id="J_invoiceDesc">电子发票</span>
								<span id="J_invoiceTitle">个人</span>
								<span>商品明细</span>
							</div>
						</div>
					</div>
					
					<div class="section section-options section-way clearfix">
						<div class="section-header">
							<h3 class="title">付款方式</h3>
						</div>
						<div class="section-body clearfix">
							<ul class="J_wayList options options-list clearfix">
								<!-- besttime start -->
								<li data-type="time" class="J_way selected" data-value="0">
									立即付款 </li>
								<li data-type="time" class="J_way " data-value="1">
									稍后付款</li>
								<!-- besttime end -->
							</ul>
						</div>
					</div>
					
					<div class="section section-count clearfix">

						<div class="money-box" id="J_moneyBox">
							<ul>
								<li class="clearfix">
									<label>商品件数：</label>
									<span class="val"><%=orderNum %>件</span>
								</li>
								<li class="clearfix">
									<label>金额合计：</label>
									<span class="val"><%=totalPrice %>元</span>
								</li>

								<li class="clearfix total-price">
									<label>应付总额：</label>
									<span class="val"><em data-id="J_totalPrice"><%=totalPrice %></em>元</span>
								</li>

							</ul>
						</div>
					</div>

					<div class="section-bar clearfix">

						<div class="fr">
							<a href="javascript:void(0);" class="btn btn-primary" id="J_checkoutToPay" data-stat-id="4773f7ffc10003b8" >去结算</a>
						</div>
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
		<div id="userdialog" class="hidden"></div>
		<div id="newTips" class="hidden"></div>
	</body>

</html>