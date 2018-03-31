define(["jquery","util"],function($,util){
	function PlayMusic(args){
		try{
			//异常操作
			if( !args.renderTo )
				throw "缺少必要参数，请查看dataSource";
		}catch(e){
			alert(e);
		}
		
		this.init(args);
	}
	
	PlayMusic.prototype.init = function(args){
		var _ = this;
		_.renderTo = $("#"+args.renderTo);
//		_.dataSource = args.dataSource;
//		_.data = args.data;
		_.build();
	};
	
	PlayMusic.prototype.build = function(){
		var _ = this;
		
		_.renderTo.html("");

		_.playMusicHide = $("<div id='playMusicHide'></div>").appendTo(_.renderTo);
		var play = $("<div class='playMusicDialog' ></div>").appendTo(_.renderTo);
		_.img = $("<img src='images/netdisk/music_cove.png' ></img>").appendTo(play);
		_.playMusic = $("<audio controls>" +
			"<source src='' type='audio/mpeg'>" +
			"您的浏览器不支持 audio 元素。</audio>").appendTo(play);
		_.musicExit = $("<div id='musicExit'><i class='iconfont icon-guanbi' ></i></div>").appendTo(_.renderTo);

		_.renderTo.height($(document).height());
		_.bindEvent();
	};
	
	PlayMusic.prototype.bindEvent = function(){
		var _ = this;
		
		//关闭按钮点击事件
		_.musicExit.click(function(){
			_.hide();
		});
	
	};
	
	PlayMusic.prototype.show = function(url){
		var _ = this;
		_.playMusic.find("source").attr("src",url);
		_.playMusic[0].load();
		_.playMusic[0].play();
		//给弹出层以及黑色背景加上动画特效 兼容IE8
		if(util.isIELow()){
			_.renderTo.animate({
				"opacity":"1"
			},250);
		}else{		
			_.renderTo.css({
				"opacity":"1",
				"transform":"skew(180deg,180deg)"
			});
		}
		//50毫秒之后给弹出层以及黑色背景加上隐藏样式
		setTimeout(function(){
			_.renderTo.removeClass("hidden");
		},50);
	};
	
	//弹出层关闭
	PlayMusic.prototype.hide = function(){
		var _= this;
		_.playMusic[0].pause();
		//给弹出层以及黑色背景加上动画特效 兼容IE8
		if(util.isIELow()){
			_.renderTo.animate({
				"opacity":"0"
			},250);
		}else{		
			_.renderTo.css({
				"opacity":"0",
				"transform":"skew(10deg,10deg)"
			});
		}
		//50毫秒之后给弹出层以及黑色背景加上隐藏样式
		setTimeout(function(){
			_.renderTo.addClass("hidden");
		},50);
	};
	
	
	return PlayMusic;
});