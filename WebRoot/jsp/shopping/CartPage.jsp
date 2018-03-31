<%@page import="com.njwangbo.pojo.common.User"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
User user = (User)session.getAttribute("user");
String userName = "";
String userImage = "";
if(user != null){
	userName = user.getName();
	userImage = user.getImage();	
}else{
	out.write("<script>window.location.href='"+basePath+"login.jsp'</script>");
}

%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
  	<link rel="icon" href="image/index/logo-footer.png" type="image/x-icon"/>
    <title>小米购物车页</title>
		<link rel="stylesheet" type="text/css" href="css/iconfont.css"/>
		<link rel="stylesheet" type="text/css" href="css/index.css"/>
		<link rel="stylesheet" type="text/css" href="css/cart/cart.css"/>
		<link rel="stylesheet" type="text/css" href="css/common/new_tips.css"/>
		<link rel="stylesheet" href="css/common/dialog.css" type="text/css"></link>
    	<link rel="stylesheet" type="text/css" href="css/common/userdialog.css"/>
		<script src="js/jquery-1.12.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/util.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/dialog.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/dialog/userdialog.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/common/new_tips.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/cart/fill_cart.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/cart.js" type="text/javascript" charset="utf-8"></script>
<!-- 		<script src="js/index.js" type="text/javascript" charset="utf-8"></script>	 -->	

  </head>
  
  <body>
  	<div class="site-header site-mini-header">
	    <div class="container">
	        <div class="header-logo">
	        </div>
	        <div class="header-title has-more" id="J_miniHeaderTitle"><h2>我的购物车</h2><p>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</p></div>
	        <div class="topbar-info" id="J_userInfo">
	        	<span class="user "><a rel="nofollow" class="user-name" ><span class="name"><%=userName %></span><i class="iconfont">&#xe66e;</i></a>
							<ul class="user-menu hidden" >
								<li>
									<a rel="nofollow" href="<%=basePath %>homePage.jsp" >商品主页</a>
								</li>
								<li>
									<a rel="nofollow" href="<%=basePath %>CartPage.jsp" >我的购物车</a>
								</li>					
								<li>
									<a rel="nofollow" href="<%=basePath %>Order.jsp" >评价晒单</a>
								</li>
								<li>
									<a rel="nofollow" id="logout" >退出登录</a>
								</li>
							</ul>
						</span>
					<span class="sep">|</span>
					<a rel="nofollow" class="link link-order" href="<%=basePath %>Order.jsp" target="_blank" >我的订单</a>
				</div>
	    </div>
	</div>
	<div class="page-main" id="cartTabs" >
    	<div class="container">
    		<table class="cart-goods-list" cellpadding="0" cellspacing="0" border="0" >
    			<thead>
    				<tr>
    					<td class="col col-check" >
    						<i class="iconfont icon-gou" id="J_selectAll"></i>
    						全选
    					</td>
    					<td class="col col-img" >
    						&nbsp;
    					</td>
    					<td class="col col-name" >
    						商品名称
    					</td>
    					<td class="col col-price" >
    						单价
    					</td>
    					<td class="col col-num" >
    						数量
    					</td>
    					<td class="col col-total" >
    						小计
    					</td>
    					<td class="col col-action" >
    						删除
    					</td>
    				</tr>
    			</thead>
    			<tbody>
    				<!--<tr class="item-box" >
    					<td class="col col-check" >
    						<i class="iconfont icon-gou icon-checkbox-selected" id="J_selectAll"></i>
    					</td>
    					<td class="col col-img" >
    						<a href="//item.mi.com/1161800009.html" target="_blank"> 
    							<img alt="" src="//i1.mifile.cn/a1/T1SkV_BCd_1RXrhCrK!80x80.jpg" width="80" height="80"> 
    						</a>
    					</td>
    					<td class="col col-name" >
    						<a href="//item.mi.com/1161800009.html" target="_blank"> 小米胶囊耳机 黑色 </a>
    					</td>
    					<td class="col col-price" >
    						69元
    					</td>
    					<td class="col col-num" >
    						<div class="change-goods-num clearfix J_changeGoodsNum">
								<i class="iconfont minus">&#xe689;</i>
								<input tyep="text" name="2161800006_0_buy" value="1" data-num="1" data-buylimit="5" autocomplete="off" class="goods-num J_goodsNum" > 
								<i class="iconfont plus">&#xe602;</i>
    						</div>
    					</td>
    					<td class="col col-total" >
    						69元
    					</td>
    					<td class="col col-action" >
    						<i class="iconfont del">&#xe624;</i>
    					</td>
    				</tr>
    				<tr class="item-box" >
    					<td class="col col-check" >
    						<i class="iconfont icon-gou icon-checkbox-selected" id="J_selectAll"></i>
    					</td>
    					<td class="col col-img" >
    						<a href="//item.mi.com/1161800009.html" target="_blank"> 
    							<img alt="" src="//i1.mifile.cn/a1/T1SkV_BCd_1RXrhCrK!80x80.jpg" width="80" height="80"> 
    						</a>
    					</td>
    					<td class="col col-name" >
    						<a href="//item.mi.com/1161800009.html" target="_blank"> 小米胶囊耳机 黑色 </a>
    					</td>
    					<td class="col col-price" >
    						69元
    					</td>
    					<td class="col col-num" >
    						<div class="change-goods-num clearfix J_changeGoodsNum">
								<i class="iconfont minus">&#xe689;</i>
								<input tyep="text" name="2161800006_0_buy" value="1" data-num="1" data-buylimit="5" autocomplete="off" class="goods-num J_goodsNum" > 
								<i class="iconfont plus">&#xe602;</i>
    						</div>
    					</td>
    					<td class="col col-total" >
    						69元
    					</td>
    					<td class="col col-action" >
    						<i class="iconfont del">&#xe624;</i>
    					</td>
    				</tr>-->
    			</tbody>
    		</table>
            <div class="cart-bar clearfix" id="J_cartBar">
				<div class="section-left">
					<a href="<%=basePath %>homePage.jsp" class="back-shopping J_goShoping" >继续购物</a>
					<span class="cart-total">共 <i id="J_cartTotalNum">3</i> 件商品，已选择 <i id="J_selTotalNum">3</i> 件</span>
			
				</div>
			
				<span class="total-price">
			                    合计：<em id="J_cartTotalPrice">117.9</em>元
			                </span>
				<a href="javascript:void(0);" class="btn-primary" id="J_goCheckout" >去结算</a>
			
				<div class="no-select-tip hidden" id="J_noSelectTip">
					请勾选需要结算的商品
					<!--<i class="arrow arrow-a"></i>
					<i class="arrow arrow-b"></i>-->
				</div>
			</div>
	        <div class="cart-empty hidden" id="J_cartEmpty">
	            <h2>您的购物车还是空的！</h2>
	            
	            
	            <a href="<%=basePath %>homePage.jsp" class="btn-shoping" >马上去购物</a>
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
	</div>
		<div id="userdialog" class="hidden" ></div>
		<div id="newTips" class="hidden" ></div>
  </body>
</html>
