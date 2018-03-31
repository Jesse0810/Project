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
	if(user.getLvl()<=0){
		out.write("<script>window.location.href='"+basePath+"homePage.jsp'</script>");
	}
}else{
	out.write("<script>window.location.href='"+basePath+"login.jsp'</script>");
}
%>

<!DOCTYPE HTML >
<html>
  <head>
    <base href="<%=basePath%>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="icon" href="image/index/logo-footer.png" type="image/x-icon"/>
    <title>小米管理后台</title>
    <!--<link rel="stylesheet" href="css/common.css" type="text/css"></link>
    <link rel="stylesheet" href="css/iconfont.css" type="text/css"></link>
    <link rel="stylesheet" href="css/menu.css" type="text/css"></link>
    <link rel="stylesheet" type="text/css" href="css/common/tips.css"/>
    <link rel="stylesheet" href="css/frame.css" type="text/css"></link>
    <link rel="stylesheet" href="css/common/dialog.css" type="text/css"></link>
    <link rel="stylesheet" type="text/css" href="css/common/userdialog.css"/>
    <link rel="stylesheet" type="text/css" href="css/common/goodsimg.css"/>
    <script type="text/javascript" src="js/jquery-1.12.0.js"></script>
	<script src="js/util.js" type="text/javascript" charset="utf-8"></script>	
	<script type="text/javascript" src="js/menu.js"></script>
	<script type="text/javascript" src="js/common/greet_time.js" ></script>	
	<script src="js/common/tips.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/dialog.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/dialog/userdialog.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/goodsimg.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="js/frame.js"></script>-->
	<script type="text/javascript" data-main="js/frame.js" src="js/common/require.js"></script>
  </head>
  
  <body  style="">
    <table id="framePage" cellpadding="0" cellspacing="0">
    	<tr id="head" >
    		<td class="logo_td" ><a href="homePage.jsp" class="logo"  /></td>
    		<td colspan="2" style="position: relative;" >
    			<div class="loginTitle">
    				<div class="title"><span id="greet_time" >早上好!</span><em id="userName"><%=userName %></em>!欢迎进入购物管理系统</div>			
    			</div>
				<div class="personal_center">
					<div class="profile_photo">
						<img id="profile_photo" src="image/user/<%=userImage %>" alt="头像" />
					</div>
					<div class="arrow"></div>
					<div id="username" class="pc_name" ><%=userName %></div>
					<ul class="pc_menu">
						<li class="menu_item" id="mod_password" data-url= "jsp/userOperate/mod_password.jsp" >修改密码</li>
						<li class="menu_item" id="logout" >注销</li>
					</ul>
				</div>	
    		</td>
    	</tr>
    	<tr id="content">
    		<td id="Menu">
    			<div id="MenuPage" >
			    	
			    </div>
    		</td>
    		<td id="rightPage">
    			<iframe id="rightIframe" src="manager/userManager.jsp" frameborder="0" scrolling="no" ></iframe>
    		</td>
    	</tr>
    </table>
    <div id="dialog" class="hidden" >
    </div>
    <div id="goodsImgSee" class="hidden" ></div>
    <div id="userdialog" class="hidden" ></div>
    <div id="tips" class="hidden">操作成功</div>
  </body>
</html>
