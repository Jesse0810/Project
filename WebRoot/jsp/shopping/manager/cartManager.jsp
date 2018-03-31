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
    <link rel="stylesheet" href="css/common.css" type="text/css"></link>   
    <link rel="stylesheet" href="css/iconfont.css" type="text/css"></link>
    <link rel="stylesheet" href="css/select.css" type="text/css"></link>
    <link rel="stylesheet" href="css/table.css" type="text/css"></link>
    <link rel="stylesheet" href="css/pageTurn.css" type="text/css"></link>
    <link rel="stylesheet" type="text/css" href="css/manager/userManager.css"/>
    <link rel="stylesheet" type="text/css" href="css/manager/goodsManager.css"/>
    <script type="text/javascript" src="js/jquery-1.12.0.js"></script>
    <script type="text/javascript" src="laydate/laydate.js" ></script>
    <script type="text/javascript" src="js/util.js"></script>
  	<script type="text/javascript" src="js/table.js"></script>
  	<script type="text/javascript" src="js/ddl.js"></script>
  	<script src="js/currentTime.js" type="text/javascript" charset="utf-8"></script>
  	<script type="text/javascript" src="js/manager/typeManager.js" ></script>
  	
  	
</head>
  
  <body  class="tableContent" >
	<div class="tableTitle">
  		购物车管理/购物车信息管理
  		<div class="tableTime" id="currentTime" ></div>
  	</div>
  	<div class="tableManage" >
  		<div class="manage_title" >
  			<span class="manage_name" ><i class="iconfont" >&#xe618;</i>购物车信息查询</span>
  			<button class="manage_btn search" id="searchBtn" ><i class="iconfont" >&#xe651;</i>查询</button>
  		</div>
  		<table class="manage_search" border="0" cellpadding="0" cellspacing="0" >
  			<tr>
  				<td class="manage_item">
	  				<label for="goodsTypeName" >购物车：</label>
	  			</td>
	  			<td class="manage_value" >
	  				<input id="goodsTypeName" type="text" />
	  			</td>
  				<td class="manage_item">
	  				<label for="createtime1" >创建时间：</label>
	  			</td>
	  			<td class="manage_value" >
	  				<input id="createtime1" type="text" /><div style="text-align: center;width: 100%;margin: 0.3em 0;" >到</div>
	  				<input id="createtime2" type="text" />
	  			</td>
	  			<td class="manage_item">
	  			</td>
	  			<td class="manage_value" >
	  			</td>
  			</tr>  			
  		</table>
  	</div>


    <div id="typeGrid">
    	<div id="conBtn" class="manage_title" >
	   		<span class="manage_name" ><i class="iconfont" >&#xe618;</i>商品类型信息列表管理</span>
	  		<button class="manage_btn del" id="delBtn" ><i class="iconfont" >&#xe634;</i>删除</button>
	  		<button class="manage_btn update" id="updateBtn" ><i class="iconfont" >&#xe608;</i>修改</button>
	  		<button class="manage_btn add" id="addBtn" ><i class="iconfont" >&#xe607;</i>添加</button>
	  	</div>
    </div>
 	</body>
</html>
