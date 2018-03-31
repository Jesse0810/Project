function operateUse(args){
	new TableOperate(args);
}

function TableOperate(args){
	this.init(args);
}

TableOperate.prototype.init = function(args){
	var _ = this;
//	$("body").html("");
	parent.document.getElementById("frameDialog").height=0;
	parent.document.getElementById("frameDialog").height=document.body.scrollHeight;
	_.renderTo = "tableoperate";
	_.dataSource = args.columns;
	_.columns = args.columns.operate;
	_.type = args.dialogType;
	_.content = args.columns.deleteText  === "undefined" ? "删除记录操作":args.columns.deleteText;
	_.submit_element = [];
	_.ddl_element = {};
	_.dialogType = "";
	//_.type决定增删改操作类型
	//0代表添加记录，1代表修改记录，2代表删除记录
	switch (_.type){
		case 0://添加记录时用法
			_.dialogType = "add";
			_.build("add");
			break;
		case 1://修改记录时用法
			if(top.editid){
				_.queryId = top.editid;
				_.dialogType = "update";
				_.build("update");
				_.init_information();
			}else{
				document.write("id没有找到！");
			}
			break;
		case 2://删除记录时用法
			if(top.editid){
				_.queryId = top.editid;
				_.dialogType = "delete";
				_.build_delete("delete");
			}else{
				document.write("id没有找到！");
			}
			break;
	}
};

//添加修改记录时页面的公有组件
TableOperate.prototype.build = function(msg){
	var _ = this;
	_.operateGrid = $("#"+_.renderTo);
	_.table = $("<table class='OperateGrid' border='0' cellspacing='0' cellpadding='0'></table>").appendTo(_.operateGrid);
	$(_.columns).each(function(index,row){
		var tdr = $("<tr class='bodyTr' ></tr>").appendTo(_.table);
		
		var left_td = $("<td class='name' ></td>").appendTo(tdr);
		
		var label = $("<label class='usertxt' >"+row["name"]+"</label>").appendTo(left_td);
		
		var right_td = $("<td class='operate_layer' ></td>").appendTo(tdr);
		
		var right_function;
		
		
		switch (row["op_type"]){
			case "text":
				var defaultvalue = row["defaultvalue"];
				right_function = $("<input id='txt"+row["alias"]+"' type='text' data-type='"+row["op_type"]+"' placeholder='"+row["placeholder"]+"'  validate='"+row["validate"]
					+"' errTips='"+row["errTips"]+"'  minlength="+row["minlength"]+" maxlength="+row["maxlength"]+" autocomplete='off'/>").appendTo(right_td);
				$("<div class='errTips'>"+row["errTips"]+"</div>"+
				"<div class='placeholder'>"+row["placeholder"]+"</div>").appendTo(right_td);
				if(defaultvalue){
					right_function.val(defaultvalue);
				}
				break;
			case "password":
				right_function = $("<input id='txt"+row["alias"]+"' type='password' data-type='"+row["op_type"]+"'  placeholder='"+row["placeholder"]+"'   validate='"+row["validate"]
					+"' errTips='"+row["errTips"]+"'  minlength="+row["minlength"]+" maxlength="+row["maxlength"]+" autocomplete='off'/>").appendTo(right_td);
				$("<div class='errTips'>"+row["errTips"]+"</div>"+
				"<div class='placeholder'>"+row["placeholder"]+"</div>").appendTo(right_td);
				break;
			case "textarea":
				right_function = $("<textarea id='txt"+row["alias"]+"' data-type='"+row["op_type"]+"'  placeholder='"+row["placeholder"]+"'   validate='"+row["validate"]
					+"' errTips='"+row["errTips"]+"'  minlength="+row["minlength"]+" maxlength="+row["maxlength"]+" autocomplete='off' ></textarea>").appendTo(right_td);
				$("<div class='errTips'>"+row["errTips"]+"</div>"+
				"<div class='placeholder'>"+row["placeholder"]+"</div>").appendTo(right_td);
				break;
			case "image":
				left_td.html("<input id='txt"+row["alias"]+"' data-type='"+row["op_type"]+"' class='uploadImgBtn' type='button' value='"+row["name"]+"'/>");
				right_function = $("<div class='imgList'  minlength="+row["minlength"]+" maxlength="+row["maxlength"]+" data-basepath='"+row["basePath"]+"'  ></div>").appendTo(right_td);
				$("<div class='errTips'></div>").appendTo(right_td);
				$("<form action='upload.action' class='hidden' method='post' target='hidden_iframe_txt"+row["alias"]+"' enctype='multipart/form-data'></form>"+
				"<iframe class='hidden' id='hidden_iframe_txt"+row["alias"]+"' name='hidden_iframe_txt"+row["alias"]+"' ></iframe>").appendTo(right_td);			
				break;
			case "ddl":
				right_function = $("<div class='operate' id='txt"+row["alias"]+"' data-type='"+row["op_type"]+"' errTips='"+row["errTips"]+"' ></div>").appendTo(right_td);
				_.ddl_element["txt"+row["alias"]] = new DDL({
					"renderTo": "txt"+row["alias"],
					"dataSource": row["DropDownList"],
					"defaultSelect": row["defaultSelect"],
					"preloadItem":row["preloadItem"],
					"mapping":row["mapping"],
					"direction":row["direction"],
					"onClick": function(obj) {
						//刷新表格
		
					}
				});
				break;
			default:
				right_function = $("<input id=txt'"+row["alias"]+"' type='text' data-type='"+row["op_type"]+"' />").appendTo(right_td);
				break;
		}
	
		if(row[msg+"_not_use"]){
			tdr.remove();
		}else{
			_.submit_element.push(row["alias"]);
		}
		
	});
	
//	var tdr_message = $("<tr class='bodyTr' ><td  colspan='2'  ><div class='message' >&nbsp;</div></td></tr>").appendTo(_.table);
	var tdr = $("<tr class='bodyTr' ></tr>").appendTo(_.table);
	var btn_td = $("<td class='btn' colspan='2' ></td>").appendTo(tdr);
			
	_.confirm = $("<input id='btn_confirm' type='button' value='确定'>").appendTo(btn_td);
	_.cancle = $("<input id='btn_cancle' type='button' value='取消'>").appendTo(btn_td);
	_.bindEvent(msg);
};

TableOperate.prototype.init_information = function(msg){
	var _ = this;
	$.post(_.dataSource["queryUrl"], {
		"id":_.queryId
	}, function(res){
		var data = res;
		$(_.submit_element).each(function(index,column){
			switch($("#txt"+column).attr("data-type")) {
				case "text":
					$("#txt"+column).val(res[column]);
					break;
				case "password":
					$("#txt"+column).val(res[column]);
					break;
				case "image":				
					var imgList = $("#txt"+column).parent().next().find(".imgList");
					if(Object.prototype.toString.call(res[column])=='[object Array]'){
						$(res[column]).each(function(index1,item){
						
							var ndiv = $("<div class='img-div' ></div>").appendTo(imgList);
				
							var imgstr = $("<img data-src='"+item.name+"' class='uploadImg' src='"+imgList.attr("data-basepath") + item.goodsId +"/"+item.name+"'/>").appendTo(ndiv);
							
							var dialogExit = $("<div class='imgExit' >删除</div>").appendTo(ndiv);
						
	//						imgstr.attr("data-src",getBase64Image(imgstr[0]));
						});
					}else{
						var ndiv = $("<div class='img-div' ></div>").appendTo(imgList);
				
						var imgstr = $("<img data-src='"+res[column]+"' class='uploadImg' src='"+imgList.attr("data-basepath") +res[column]+"'/>").appendTo(ndiv);
							
						var dialogExit = $("<div class='imgExit' >删除</div>").appendTo(ndiv);
					}
					
					break;
				case "textarea":
					$("#txt"+column).val(res[column]);
					break;
				case "ddl":
					_.ddl_element["txt"+column].select($("#txt"+column).find("li[key='"+res[column]+"']"));
					break;		
			}
		});
		//IE8兼容，隐藏placeholder提示
		$("[type='text'],[type='password'],textarea").each(function(){
			//隐藏占位符
			$(this).next().next().addClass("hidden");
		});
	});
};

TableOperate.prototype.build_delete = function(msg){
	var _ = this;
	_.operateGrid = $("#"+_.renderTo);
	_.operate = $("<div class='operateDelete' ></div>").appendTo(_.operateGrid);
	var conTitle = $("<div class='conTitle' ><i class='iconfont icon-shanchu'></i></div>").appendTo(_.operate);
	var conTxt = $("<div class='conTxt' >"+_.content+"</div>").appendTo(conTitle);
	
//	var message = $("<div class='message' >&nbsp;</div>").appendTo(_.operate);
	
	var btn_td = $("<div class='btnList'></div>").appendTo(_.operate);
	_.confirm = $("<input id='btn_confirm' type='button' value='完成'>").appendTo(btn_td);
	_.cancle = $("<input id='btn_cancle' type='button' value='取消'>").appendTo(btn_td);
	_.bindEvent();
};

TableOperate.prototype.bindEvent = function(){
	var _ = this;
	//隐藏所有的提示信息
	if( isIELow()){
		$(".errTips").css("opacity","0");
	}else{
		$(".placeholder").css("opacity","0");
	}
	
	$("[type='text'],[type='password'],textarea").each(function(){
		if($(this).val() != ""){
			$(this).next().next().css("opacity","0");
		}
	});

	//登录按钮点击事件
	$("#btn_confirm").click(function(){
		_.btn_confirm();
	});
	
	
	$("#btn_cancle").click(function(){
		top.dialog.hide();
	});
	//输入框添加各种事件
	$("[type='text'],[type='password'],textarea").focus(function(){

		hideTips(this);
	}).blur(function(){
		checkTxt(this);
	}).keydown(function(event){
		
		//让回车键支持 登录
		if(event.keyCode == "13"){
			_.btn_confirm();
		}
		
	}).keyup(function(){
		//键盘抬起 判断输入框中内容是否为空 
		if($(this).val() == ""){
			//让占位符显示
			$(this).next().next().removeClass("hidden");
		}else{
			//隐藏占位符
			$(this).next().next().addClass("hidden");
		}
		
	});
	
	//如果IE灰色占位符被点击，默认点击下面的input输入框
	$(".placeholder").click(function(){
		$(this).prev().prev().focus();
	});
	
	//上传按钮点击事件
	$(".uploadImgBtn").click(function(){
		//找到form表单
		var form = $(this).parent().next().find("form");
		var imgList = $(this).parent().next().find(".imgList");
		//每次点击清空form表单
		form.html("");
		//手动向form表单中添加input type=file
		var file = $("<input type='file' name='file'/>").appendTo(form);
		//点击文件上传
		file.click();//文件上传之后，只是选中了文件，还没有提交
		
		//判断file的值是否有变动
		file.change(function(){
//			//手动提交form表单
//			if(file.val() != ""){
//				form.submit();
//				
//			}
			xmTanUploadImg(this,imgList);
		});
		
		
		
	});
	
	//上传图片放大事件
	$(_.operateGrid).on("click",".uploadImg",function(){
		top.goodsImg.show(this);
	});
	
	$(".imgList").on("mouseover",".img-div",function(){
		$(this).children(".imgExit").css({
			"bottom":"0em"
		});
	}).on("mouseout",".img-div",function(){
		$(this).children(".imgExit").css({
			"bottom":"-2em"
		});
	});
	
	//上传图片删除事件
	$(".imgList").on("click",".img-div .imgExit",function(){
		$(this).parent().remove();
	});
};

function checkTxt(obj){
	//判断内容是否输入 非空验证
	if($(obj).hasClass("imgList")){
		var imgCount = $(obj).children(".img-div").length; 
		if(imgCount < $(obj).attr("minlength") || imgCount > $(obj).attr("maxlength")){
			var msg = "图片个数要在"+$(obj).attr("minlength")+"到"+$(obj).attr("maxlength")+"之间";
			return showTips(obj,msg);
		}
		return hideTips(obj);
	}
	
	if($(obj).val() == ""){
		//显示提示信息
		var msg = $(obj).attr("placeholder");
		return showTips(obj,msg);
	}
	
	//最小长度
	
	if($(obj).val().length < $(obj).attr("minlength")){
		//显示提示信息
		var msg = "字符长度不能小于"+$(obj).attr("minlength");
		return showTips(obj,msg);
	}
	
	
	//验证特殊字符
	if($(obj).attr("validate")&&$(obj).attr("validate")!="undefined"){
		if(!validate($(obj).val(),$(obj).attr("validate"))){
			//显示提示信息
			var msg = $(obj).attr("errTips");
			return showTips(obj,msg);
		}
	}	
	
	if($(obj).attr("id") == "userPwdRe" && $("#userPwd").val().length>0){
		if($(obj).val() != $("#userPwd").val()){
			//显示提示信息
			var msg = "两次密码输入不一致";
			return showTips(obj,msg);
		}
	}
	
	return hideTips(obj);
	
}


//错误信息显示
function showTips(obj,msg){
	$(obj).addClass("txtError");
	$(obj).next().text(msg);
	if(isIELow()){
		$(obj).next().animate({
			"opacity":"1",
			"right":"1em"
		},250);
	}else{
		$(obj).next().css({
			"opacity":"1",
			"right":"1em"
		});
	}
	return 1;
	
}
//错误信息隐藏
function hideTips(obj){
	$(obj).removeClass("txtError");
	if(isIELow()){
		$(obj).next().animate({
			"opacity":"0",
			"right":"-0.4em"
		},250);
	}else{
		$(obj).next().css({
			"opacity":"0",
			"right":"-0.4em"
		});
	}
	return 0;
	
}
//完成按钮点击事件,负责处理增删改功能
TableOperate.prototype.btn_confirm = function(){
	var _ = this;
	//当页面正在请求时，不接受再次发送请求
	if($("#btn_confirm").hasClass("btnDisable")){
		return;
	}
	
	var errCount = 0;
	//是否有输入框没有正确输入值
	$("[type='text'],[type='password'],textarea").each(function(){
		errCount += checkTxt(this);
	});
	
	$.each(_.ddl_element,function(index,column){
		if(column.returnValue().key == column.defaultSelect){
			var msg = $("#"+index).attr("errTips");
			errCount++;
			top.tips.show({
				"addClass": "successTips",
				"tipsTxt": msg
			});
			setTimeout(function(){
				top.tips.hide();
			},2000);
		}
		
	});
	
	$(".imgList").each(function(index,colum){
		errCount += checkTxt(this);		
	});
	
	
	if(errCount>0){
		return ;
	}
	
	$("#btn_confirm").addClass("btnDisable").val("正在发送请求，请稍候...");
	//事件提交
	//submit_information用来填充需要提交的数据，用json格式
	var submit_information = {};
	$(_.submit_element).each(function(index,column){
		switch($("#txt"+column).attr("data-type")) {
			case "text":
				submit_information[column] = $("#txt"+column).val();
				break;
			case "password":
				submit_information[column] = $("#txt"+column).val();
				break;
			case "image":
				var oimgbox = $("#txt"+column).parent().next().find(".imgList");
				submit_information["fileImgName"] = oimgbox.find(".uploadImg").map(function(){
					return $(this).attr("data-src");
				}).get();
				submit_information["fileImgName"] = submit_information["fileImgName"].length>1
				?submit_information["fileImgName"]:submit_information["fileImgName"][0];
				break;
			case "textarea":
				submit_information[column] = $("#txt"+column).val();
				break;
			case "ddl":
				submit_information[column] = $("#txt"+column).find(".itemSelect").attr("key");
				break;
		
		}
	});
	console.log(submit_information);
	if(_.type==1){
		submit_information["id"] = _.queryId;
	}else if(_.type==2){
		submit_information = {
			"id": _.queryId
		};
	}
//	
//	 $.ajax({  
//      url: _.dataSource[_.dialogType+"Url"],  
//      async: false,//这一步是非常重要的，作用是设置为同步执行  
//      type: "POST",  
//      data: submit_information,  
//      dataType: "json",  
//      success: function (data) {  
//          alert("success");  
//      }  
//  }); 
	
	$.post(_.dataSource[_.dialogType+"Url"], submit_information, function(res){
		//判断后台返回值
		if(res.isSuccess == "true"){
			//给登录按钮添加登录成功样式
//			$(".message").addClass("messageSuccess").text(res.msg);
//			//给登录按钮添加登录成功样式
			
			//一秒后跳转到框架页
			setTimeout(function(){
				$("#btn_confirm").removeClass("btnDisable").val("完成");
				top.dialog.hide();
				//显示tips提示信息
				top.tips.show({
					"addClass":"successTips",
					"tipsTxt":"操作成功"
				});
				
				var rightIframe;
				if(isIELow()){
					rightIframe = top.window.frames["rightIframe"];
				}else{
					rightIframe = top.window.frames["rightIframe"].contentWindow;
				}			
				$(rightIframe.document).find("#updateBtn,#delBtn").addClass("btnDisable");
				rightIframe.userGird.reload(10,1);
				setTimeout(function(){
					top.tips.hide();
				},250);
			},1500);
		}else{
//			//给按钮添加 登录失败 样式
//			$(".message").addClass("messageError").text(res.msg)
			//显示tips提示信息
			top.tips.show({
				"addClass":"errorTips",
				"tipsTxt":"操作失败："+res.msg
			});
			
			//1.5秒后设置成默认样式
			setTimeout(function(){
				top.tips.hide();
				$("#btn_confirm").removeClass("btnDisable").val("完成");
				top.dialog.hide();			
			},1500);
			
		}
		
      
    });

};
////展示图片
//function showImg(fileName){
//	fileName = fileName.replace(/[\[\]]/g,"");
//	$(fileName.split(",")).each(function(){
//		$("<img class='uploadImg' key='"+fileName+"' src='"+fileName+"'/>").appendTo($(".imgList"));
//	});
//};
//图片上传为base64格式直接存到页面上显示
function xmTanUploadImg(obj,oimgbox) {

	var fl = obj.files.length;
	for(var i = 0; i < fl; i++) {
		var file = obj.files[i];
		var reader = new FileReader();

		//读取文件过程方法  

		reader.onloadstart = function(e) {
			console.log("开始读取....");
		}
		reader.onprogress = function(e) {
			console.log("正在读取中....");
		}
		reader.onabort = function(e) {
			console.log("中断读取....");
		}
		reader.onerror = function(e) {
			console.log("读取异常....");
		}
		reader.onload = function(e) {
			console.log("成功读取....");
			
		//	var imgstr = '<img style="width:100px;height:100px;" src="' + e.target.result + '"/>';
			var ndiv = $("<div class='img-div' ></div>").appendTo(oimgbox);
			
			var imgstr = $("<img class='uploadImg' data-src='"+e.target.result+"' src='"+e.target.result+"'/>").appendTo(ndiv);
			
			var dialogExit = $("<div class='imgExit' >删除</div>").appendTo(ndiv);
		}

		reader.readAsDataURL(file);
		//alert(1);  
	}

}
//图片转化为base64格式
function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL
        // return dataURL.replace("data:image/png;base64,", "");
    }