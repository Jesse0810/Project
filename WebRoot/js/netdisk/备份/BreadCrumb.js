define(["jquery"], function ($) {
    function BreadCrumb(args) {
        try {
            //异常操作
            if (!args.renderTo)
                throw "缺少必要参数，请查看renderTo";
            //异常操作
            if (!args.dataSource)
                throw "缺少必要参数，请查看dataSource";
            //异常操作
            if (!args.data)
                throw "缺少必要参数，请查看dataSource";
        } catch (e) {
            alert(e);
            return;
        }

        this.init(args);
    }

    BreadCrumb.prototype.init = function (args) {
        this.renderTo = $("#" + args.renderTo);
        this.dataSource = args.dataSource ? args.dataSource : [];
        this.data = args.data ? args.data : {};
        //点击事件
        this.onClick = args.onClick && typeof args.onClick == 'function' ? args.onClick : function () {
        };
        this.getDataByDataSource();
    };

    BreadCrumb.prototype.getDataByDataSource = function () {
        var t = this;
        this.build();
        if (typeof this.dataSource == 'string') {
            $.get(this.dataSource, this.data, function (msg) {
                t.dataSource = msg.reverse();
                t.loadData();
            });
        } else {
            this.loadData();
        }
    };

    BreadCrumb.prototype.build = function (args) {
        if (!this.renderTo.hasClass('mod-breadcrumb')) {
            this.renderTo.addClass('mod-breadcrumb');
        }
        this.renderTo.html("");
        this.breadcrumb = $("<ol class='breadcrumb clearfix' ></ol>").appendTo(this.renderTo);
        this.eventBind();
    };

    BreadCrumb.prototype.loadData = function () {
        var t = this;
        $(this.dataSource).each(function (index, item) {
            t.add(item);
        });
    };

    BreadCrumb.prototype.add = function (v) {
        $("li.item:last",this.breadcrumb).removeClass("cur");
        var item = $("<li class='item cur' ></li>").appendTo(this.breadcrumb);
        var i = $(item).index("li.item",this.breadcrumb);
        if (i == 0) {
            item.addClass('all');
        } else {
            $("<i class='iconfont icon-xiangyou' ></i>").appendTo(item);
        }

        $("<a href='javascript:void(0)' data-upperid='"+v.upperId+"' data-id='"+v.id+"' >" + v.name + "</a>").appendTo(item);
    };

    BreadCrumb.prototype.eventBind = function () {
        var t = this;
        this.breadcrumb.on('click', '.item:not(.cur) a', function () {
            var upperId = $(this).attr("data-id");
            $(this).parent().nextAll().remove();
            $(this).parent().addClass("cur");
            t.onClick(upperId);
            window.location.href = $("base").attr("data-path")+"#folder="+upperId;
            $("#checkAll").removeClass("act").removeClass("hover");
            $(".mod-action-wrap").addClass("hidden");
        });
    };

    return BreadCrumb;
});

