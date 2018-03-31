function PlayVideo(args) {
    try {
        //异常操作
        if (!args.renderTo)
            throw "缺少必要参数，请查看dataSource";
    } catch (e) {
        alert(e);
    }

    this.init(args);
}

PlayVideo.prototype.init = function (args) {
    var _ = this;
    _.renderTo = $("#" + args.renderTo);
//		_.dataSource = args.dataSource;
//		_.data = args.data;
    _.build();
};

PlayVideo.prototype.build = function () {
    var _ = this;

    _.renderTo.html("");

    _.playVideoHide = $("<div id='playVideoHide'></div>").appendTo(_.renderTo);
    var play = $("<div class='playVideoDialog' ></div>").appendTo(_.renderTo);
    _.playVideo = $("<video controls>" +
        "<source src=''  type='video/mp4'>" +
        "您的浏览器不支持 video  元素。</video>").appendTo(play);
    _.videoExit = $("<div id='videoExit'><i class='iconfont icon-guanbi' ></i></div>").appendTo(_.renderTo);

    _.renderTo.height($(document).height());
    _.bindEvent();
};

PlayVideo.prototype.bindEvent = function () {
    var _ = this;

    //关闭按钮点击事件
    _.videoExit.click(function () {
        _.hide();
    });

};

PlayVideo.prototype.show = function (url) {
    var _ = this;
    _.playVideo.find("source").attr("src", url);
    _.playVideo[0].load();
    _.playVideo[0].play();
    //给弹出层以及黑色背景加上动画特效 兼容IE8
    if (util.isIELow()) {
        _.renderTo.animate({
            "opacity": "1"
        }, 250);
    } else {
        _.renderTo.css({
            "opacity": "1",
            "transform": "skew(180deg,180deg)"
        });
    }
    //50毫秒之后给弹出层以及黑色背景加上隐藏样式
    setTimeout(function () {
        _.renderTo.removeClass("hidden");
    }, 50);
};

//弹出层关闭
PlayVideo.prototype.hide = function () {
    var _ = this;
    _.playVideo[0].pause();
    //给弹出层以及黑色背景加上动画特效 兼容IE8
    if (util.isIELow()) {
        _.renderTo.animate({
            "opacity": "0"
        }, 250);
    } else {
        _.renderTo.css({
            "opacity": "0",
            "transform": "skew(10deg,10deg)"
        });
    }
    //50毫秒之后给弹出层以及黑色背景加上隐藏样式
    setTimeout(function () {
        _.renderTo.addClass("hidden");
    }, 50);
};
