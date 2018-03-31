<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>操作页面</title>
	<link rel="stylesheet" href="css/iconfont.css" type="text/css"></link>
    <link rel="stylesheet" href="css/common.css" type="text/css"></link>
    <link rel="stylesheet" href="css/select.css" type="text/css"></link>
    <link rel="stylesheet" href="css/tableOperate/tableOperate.css" type="text/css"></link>
  	<script type="text/javascript" src="js/jquery-1.12.0.js"></script>
  	<script type="text/javascript" src="js/util.js"></script>
  	<script type="text/javascript" src="js/ddl.js"></script>
  	<script type="text/javascript" src="js/tableOperate/tableOperate.js"></script>
  </head>
  <div id="tableoperate"  ></div>
  <body>
  </body>
</html>
