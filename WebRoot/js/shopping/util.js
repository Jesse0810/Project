//判断浏览器版本
function isIELow(){
	var str = window.navigator.userAgent;
	return str.indexOf("MSIE 8.0") > -1 || str.indexOf("MSIE 9.0") > -1 ;
}

//封装IE8下byClassName方法
function getElementsByClassName(elememt,className){
	//根据HTML节点获取需要的元素
	var arrDiv = document.getElementsByTagName(elememt);
	//创建空数组，用来存放项找到的元素
	var arrCls = [];
	for(var i = 0;i<arrDiv.length;i++){
		//获取每一个元素的className
		var str = arrDiv[i].className;
		//根据空格分割
		var arrClassName = str.split(" ");
		//遍历单个元素className数组，比对，寻找需要的className
		for(var j = 0;j<arrClassName.length;j++){
			if(arrClassName[j] == className){
				//找到之后把元素放进数组
				arrCls.push(arrDiv[i]);
				//找到一个符合的className之后，直接退出
				break;
			}
		}
		
	}
	return arrCls;
}


//参数1：地址 ；参数2：请求数据；参数三：回调函数（获取后台返回值之后，对返回值的操作） 
function ajax(url,data,callback){
	//通过XMlHttpRequest向后台发送请求
	var xhp = new XMLHttpRequest();
	//开始向后台发送请求
	xhp.open("post", url, false);
	//拼接参数
	var str = "";//txtName=124&txtPwd=32
	for(var d in data){
		str += d+"="+data[d]+"&";
	}
	
	str = str.substring(0, str.length-1);
	
	//http 状态码 服务端
	//当发送状态和服务端返回值  改变时 会触发  onreadystatechange事件
	xhp.onreadystatechange = function(){
		//如果想获取返回值：readystate和服务端返回状态都成功
		if(xhp.readyState == "4" && xhp.status == "200"){
			callback(xhp.responseText);
		}
	};
	//post提交数据，需要向后台申明提交的头
	xhp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//post提交在send方法内传递参数
	xhp.send(str);
}

//保存cookie
function setCookie(key,value){
	var time = new Date();
	//希望cookie保存7天  当前时间 +7
	time.setDate(time.getDate()+7);
	
	//设定cookie保存日期  日期格式要转成 时间字符串格式 
	//通过 expires 拼接日期
	document.cookie=key+"="+escape(value)+";expires="+time.toGMTString();
}

//获取cookie
function getCookie(key){
	//获取浏览器中所有的cookie
	var arrCookie = unescape(document.cookie).split("; ");
	for(var i =0;i<arrCookie.length;i++ ){
		var value = arrCookie[i].split("=");
		if(value[0] == key){
			return value[1];
		}
	};
};
//封装字符验证方法
function validate(str,type){   //"e:a-zA-Z   c:\u4e00-\u9fa5"   ec :a-zA-Z\u4e00-\u9fa5
	
	var regStr = "";
	var rules = {
			"e":"a-zA-Z",
			"c":"\u4e00-\u9fa5",
			"n":"0-9",
			"@":"@",
			"p":"\.",
			"_":"_",
			"b":"，。；‘“ "
	};
	
	for(var r in rules){
		if( type.indexOf(r)>-1 ){
			regStr +=  rules[r];
		};
	};
	//拼接正则字符串
	var re = new RegExp(eval("/^["+regStr+"]+$/"));  
	
	return re.test(str);
	
	
	
};

//$(function(){
//	setTimeout(function(){
//		$(".browsehappy").animate({"top":"-12px"},250);
//		setTimeout(function(){
//			$(".browsehappy").hide();
//		},500);
//		
//	},5000);
//});








