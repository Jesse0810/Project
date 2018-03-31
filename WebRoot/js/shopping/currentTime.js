function CurrentTime(args){
	//调用初始化事件
	this.init(args);
}

//实例化成员（属性/方法）
CurrentTime.prototype.init = function(args){
	//实例化参数
	var _ = this;
	_.renderTo = $("#"+args.renderTo);
	_.build();
	_.bindEvent();
};

//创建页面元素
CurrentTime.prototype.build = function(){
	var _ = this;
	
	var myDate = new Date();
	
	var month = myDate.getMonth()+1>9?myDate.getMonth()+1:"0"+(myDate.getMonth()+1);
	var nowdate = myDate.getDate()>9?myDate.getDate():("0"+myDate.getDate());
	var hours = myDate.getHours()>9?myDate.getHours():("0"+myDate.getHours());
	var minutes = myDate.getMinutes()>9?myDate.getMinutes():("0"+myDate.getMinutes());
	var seconds = myDate.getSeconds()>9?myDate.getSeconds():("0"+myDate.getSeconds());
	var day = "星期";
	switch (myDate.getDay()){
		case 0:
			day+="天";
			break;
		case 1:
			day+="一";
			break;
		case 2:
			day+="二";
			break;
		case 3:
			day+="三";
			break;
		case 4:
			day+="四";
			break;
		case 5:
			day+="五";
			break;
		case 6:
			day+="六";
			break;
		default:
			break;
	}
	
	
	var currenttime = myDate.getFullYear()+"年"+
	month+"月"+nowdate+"日     "+hours+":"+minutes
	+":"+seconds+"     "+day;
	
	_.renderTo.text(currenttime);
};
CurrentTime.prototype.bindEvent = function(){
	var _ = this;
	setInterval(function(){
		_.build();
	},1000);
	
};