<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>测试下拉框</title>   
		<script src="js/common/require.js" data-main="js/test.js" type="text/javascript" charset="utf-8"></script>
  </head>
  
  <body>
    <div style="position: relative;width: 10em;" id="test">
    	
    </div>
  </body>
</html>
