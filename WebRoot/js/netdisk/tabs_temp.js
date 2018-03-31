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

    _.menu = _.userTabs.find(".nav-stacked");

    _.bindEvent();
};

Tabs.prototype.bindEvent = function () {
    var _ = this;

    _.menu.find("li").click(function () {
        _.menu.find("li").removeClass("active");
        $(this).addClass("active");
        _.onClick({
            "id": $(this).attr("key"),
            "name": $(this).text()
        });
    });

};
