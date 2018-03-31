function Tabs(args) {
    try {
        //异常操作
        if (!args.renderTo)
            throw "缺少必要参数，请查看renderTo";
    } catch (e) {
        alert(e);
    }

    this.init(args);
}

Tabs.prototype.init = function (args) {
    var _ = this;
    _.renderTo = args.renderTo;
    //点击事件
    _.onClick = args.onClick === undefined ? function () {
    } : args.onClick;
    _.build();

};

Tabs.prototype.build = function () {
    var _ = this;
    _.userTabs = $("#" + _.renderTo);

//		_.tabs = _.userTabs.find(".menu-item");

    _.menu = _.userTabs.find(".menu-item");

    //	if(_.preloadItem){
    //		_.dataSource =_.preloadItem.concat(_.dataSource);
    //	}
    //
    //	$(_.dataSource).each(function(index,item){
    //		var option = $("<span class='Tabs_option' key='"+item[_.mapping["key"]]+"'>"
    //			+item[_.mapping["value"]]+"</span>").appendTo(_.menu);
    //
    //		var content = $("<div class='Tabs_content' key='"+item[_.mapping["key"]]+"'>"
    //			+item[_.mapping["value"]]+"</div>").appendTo(_.tabs);
    //	});

    // _.menu.find("a:first").addClass("selected");
    _.itemHover = $("<div id='itemHover'></div>").appendTo(_.menu);
    _.itemSelect = $("<div id='itemSelect'></div>").appendTo(_.menu);

    _.bindEvent();
};

Tabs.prototype.bindEvent = function () {
    var _ = this;

    $(_.menu).mouseover(function () {
        $("#itemHover").css("opacity", 1);
    }).mouseout(function () {
        $("#itemHover").css("opacity", 0);
    });

    _.menu.find("li").mouseenter(function () {
        _.itemHover.width(($(this).width()) + "px");
        if (util.isIELow()) {
            _.itemHover.animate({
                "top": ($(this).position().top + 10) + "px"
            }, 250);
        } else {
            _.itemHover.css("top", ($(this).position().top + 10) + "px");
        }

    }).click(function () {
        _.select(this);
        _.onClick({
            "id": $(this).attr("key"),
            "name": $(this).text()
        });
    });

    _.select(_.menu.find("li:first")[0]);
};
Tabs.prototype.select = function (obj) {
    var _ = this;
//		_.itemSelect.width(($(obj).width())+"px");
    if (util.isIELow()) {
        _.itemSelect.animate({
            "left": ($(obj).position().top + 10) + "px"
        }, 250);
    } else {
        _.itemSelect.css("top", ($(obj).position().top + 10) + "px");
    }

    _.menu.find("li a").removeClass("selected");
    $(obj).find("a").addClass("selected");

};
