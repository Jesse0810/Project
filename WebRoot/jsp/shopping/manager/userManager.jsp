<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>绘制下拉列表</title>
		<link rel="stylesheet" href="jquery-ui-1.12.1/jquery-ui.css"type="text/css"></link>
    <link rel="stylesheet" href="css/common.css" type="text/css"></link>   
    <link rel="stylesheet" href="css/iconfont.css" type="text/css"></link>
    <link rel="stylesheet" href="css/select.css" type="text/css"></link>
    <link rel="stylesheet" href="css/table.css" type="text/css"></link>
    <link rel="stylesheet" href="css/pageTurn.css" type="text/css"></link>
    <link rel="stylesheet" type="text/css" href="css/manager/userManager.css"/>
    <script type="text/javascript" src="js/jquery-1.12.0.js"></script>
    <script type="text/javascript" src="jquery-ui-1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="js/util.js"></script>
    <script type="text/javascript" src="laydate/laydate.js" ></script>
  	<script type="text/javascript" src="js/table.js"></script>
  	<script type="text/javascript" src="js/ddl.js"></script>
  	<script src="js/currentTime.js" type="text/javascript" charset="utf-8"></script>
  	<script type="text/javascript" src="js/manager/userManager.js"></script> 
  	
</head>
  
  <body id="userContent" class="tableContent" >
  	<div class="tableTitle">
  		用户管理/用户信息管理
  		<div class="tableTime" id="currentTime" ></div>
  	</div>
  	<div class="tableManage" >
  		<div class="manage_title" >
  			<span class="manage_name" ><i class="iconfont" >&#xe618;</i>用户信息查询</span>
  			<button class="manage_btn search" id="searchBtn" ><i class="iconfont" >&#xe651;</i>查询</button>
  		</div>
  		<table class="manage_search" border="0" cellpadding="0" cellspacing="0" >
  			<tr>
  				<td class="manage_item">
	  				<label for="userName" >用户名：</label>
	  			</td>
	  			<td class="manage_value" >
	  				<input id="userName" type="text" />
	  			</td>
	  			<td class="manage_item">
	  				<label for="userLvl" >用户级别：</label>
	  			</td>
	  			<td class="manage_value" >
	  				<div id="userLvl" class="manage_ddl"></div>
	  			</td>
	  			<td class="manage_item">
	  				<label for="userSex" >用户性别：</label>
	  			</td>
	  			<td class="manage_value" >
	  				<div id="userSex" class="manage_ddl"></div>
	  			</td>
  			</tr>
  			<tr>
  				<td class="manage_item">
	  				<label for="createtime1" >创建时间<br>(laydate)：</label>
	  			</td>
	  			<td class="manage_value" >
	  				<input id="createtime1" type="text" /><div style="text-align: center;width: 100%;margin: 0.3em 0;" >到</div>
	  				<input id="createtime2" type="text" />
	  			</td>
	  			<td class="manage_item">
	  				<label for="jqTime1" >创建时间(jQueryUI)：</label>
	  			</td>
	  			<td class="manage_value" >
	  				<input id="jqTime1" type="text" />
	  				<div style="text-align: center;width: 100%;margin: 0.3em 0;" >到</div>
	  				<input id="jqTime2" type="text" />
	  			</td>
  			</tr>  			
  		</table>
  	</div>
  	
  	<!--<div id="conBtn">
  		<input class="btn" id="addBtn" type="button" value="添加" />
  		<input class="btn" id="updateBtn" type="button" value="修改"/>
  		<input class="btn" id="delBtn" type="button" value="删除"/>
  	</div>-->
   	<div id="userGrid">
	   	<div id="conBtn" class="manage_title" >
	   		<span class="manage_name" ><i class="iconfont" >&#xe618;</i>用户信息列表管理</span>
	  		<button class="manage_btn del" id="delBtn" ><i class="iconfont" >&#xe634;</i>删除</button>
	  		<button class="manage_btn update" id="updateBtn" ><i class="iconfont" >&#xe608;</i>修改</button>
	  		<button class="manage_btn add" id="addBtn" ><i class="iconfont" >&#xe607;</i>添加</button>
	  	</div>
   	</div>
  </body>
</html>
