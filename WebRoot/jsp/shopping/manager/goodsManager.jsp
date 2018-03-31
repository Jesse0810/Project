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
    <link rel="stylesheet" type="text/css" href="jquery-easyui-1.5.4.2/themes/default/easyui.css"/>
    <link rel="stylesheet" type="text/css" href="jquery-easyui-1.5.4.2/themes/icon.css"/>
    <link rel="stylesheet" href="css/common.css" type="text/css"></link>   
    <link rel="stylesheet" href="css/iconfont.css" type="text/css"></link>
    <link rel="stylesheet" href="css/select.css" type="text/css"></link>
    <link rel="stylesheet" href="css/table.css" type="text/css"></link>
    <link rel="stylesheet" href="css/pageTurn.css" type="text/css"></link>
    <link rel="stylesheet" type="text/css" href="css/manager/userManager.css"/>
    <link rel="stylesheet" type="text/css" href="css/manager/goodsManager.css"/>
    <script type="text/javascript" src="js/jquery-1.12.0.js"></script>
    <script src="jquery-easyui-1.5.4.2/jquery.easyui.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="jquery-easyui-1.5.4.2/locale/easyui-lang-zh_CN.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" src="js/util.js"></script>
    <script type="text/javascript" src="laydate/laydate.js" ></script>
  	<script type="text/javascript" src="js/table.js"></script>
  	<script type="text/javascript" src="js/ddl.js"></script>
  	<script src="js/currentTime.js" type="text/javascript" charset="utf-8"></script>
  	<script type="text/javascript" src="js/manager/goodsManager.js" ></script>
  	
  	
</head>
  
  <body id="goodsContent" class="tableContent" >
    <div class="tableTitle">
  		商品管理/商品信息管理
  		<div class="tableTime" id="currentTime" ></div>
  	</div>
  	<div class="tableManage" >
  		<div class="manage_title" >
  			<span class="manage_name" ><i class="iconfont" >&#xe618;</i>商品信息查询</span>
  			<button class="manage_btn search" id="searchBtn" ><i class="iconfont" >&#xe651;</i>查询</button>
  		</div>
  		<table class="manage_search" border="0" cellpadding="0" cellspacing="0" >
  			<tr>
  				<td class="manage_item">
	  				<label for="goodsName" >商品名：</label>
	  			</td>
	  			<td class="manage_value" >
	  				<input id="goodsName" type="text" />
	  			</td>
	  			<td class="manage_item">
	  				<label for="goodsPrice" >商品价格：</label>
	  			</td>
	  			<td class="manage_value" >
	  				<div id="goodsPrice" class="manage_ddl"></div>
	  			</td>
	  			<td class="manage_item">
	  				<label for="goodsType" >商品类型：</label>
	  			</td>
	  			<td class="manage_value" >
	  				<div id="goodsType" class="manage_ddl"></div>
	  			</td>
  			</tr>
  			<tr>
  				<td class="manage_item">
	  				<label for="goodsProducer" >厂商：</label>
	  			</td>
	  			<td class="manage_value" >
	  				<input id="goodsProducer" type="text" />
	  			</td>
  				<td class="manage_item">
	  				<label for="createtime1" >创建时间<br>(laydate)：</label>
	  			</td>
	  			<td class="manage_value" >
	  				<input id="createtime1" type="text" /><div style="text-align: center;width: 100%;margin: 0.3em 0;" >到</div>
	  				<input id="createtime2" type="text" />
	  			</td>
	  			<td class="manage_item">
	  				<label for="eyTime1" >创建时间(easyUI)：</label>
	  			</td>
	  			<td class="manage_value" >
	  				<input class="easyui-datetimebox" id="eyTime1" type="text"  style="width:100%" />
	  				<div style="text-align: center;width: 100%;margin: 0.3em 0;" >到</div>
	  				<input class="easyui-datetimebox" id="eyTime2" type="text"  style="width:100%" />
	  			</td>
  			</tr>  			
  		</table>
  	</div>
    <!--<div id="conBtn">
  		<input class="btn" id="addBtn" type="button" value="添加" />
  		<input class="btn" id="updateBtn" type="button" value="修改"/>
  		<input class="btn" id="delBtn" type="button" value="删除"/>
  	</div>-->
    <div id="goodsGrid">
    	<div id="conBtn" class="manage_title" >
	   		<span class="manage_name" ><i class="iconfont" >&#xe618;</i>商品信息列表管理</span>
	  		<button class="manage_btn del" id="delBtn" ><i class="iconfont" >&#xe634;</i>删除</button>
	  		<button class="manage_btn update" id="updateBtn" ><i class="iconfont" >&#xe608;</i>修改</button>
	  		<button class="manage_btn add" id="addBtn" ><i class="iconfont" >&#xe607;</i>添加</button>
	  	</div>
    </div>
 	</body>
</html>
