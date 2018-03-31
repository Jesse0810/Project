function Table(args) {
    try {
        //异常操作
        if (!args.renderTo)
            throw "缺少必要参数，请查看dataSource";
        if (!args.dataSource)
            throw "缺少必要参数，请查看dataSource";
        if (!args.dataSource)
            throw "缺少必要参数，请查看dataSource";
    } catch (e) {
        alert(e);
    }

    this.init(args);
}

Table.prototype.init = function (args) {
    var _ = this;
    _.renderTo = $("#" + args.renderTo);
    _.dataSource = args.dataSource;
    _.data = args.data;
    //点击事件
    _.onClick = args.onClick && typeof args.onClick == 'function' ? args.onClick : function () {
    };
    _.byDataSource();
};

//判断数据源（如果是字符串，调用ajax请求后台，如果是对象数组，直接调用build方法）
Table.prototype.byDataSource = function () {
    var _ = this;
    _.build();
    _.load({
        dataSource: _.dataSource,
        data: _.data
    });
};

Table.prototype.load = function (args) {
    var _ = this;
    //是请求地址
    if (typeof(args.dataSource) == "string") {
        //是请求地址
        $.ajax({
            type: "POST",
            url: args.dataSource,
            data: args.data,
            success: function (msg) {
                _.dataSource = msg;
                _.loadData();
            }
        });
    } else {
        _.dataSource = args.dataSource;
        _.loadData();
    }

};

Table.prototype.build = function () {
    var _ = this;

    _.renderTo.html("");

    var txt = [];
    txt.push("<thead><tr><td class='list-group-tit label'></td>");
    txt.push("<td class='list-group-tit name'><span class='tit-con'>名称<i class='icon'></i></span></td>");
    txt.push("<td class='list-group-tit time'><span class='tit-con'>上次修改时间<i class='icon'></i></span></td>");
    txt.push("<td class='list-group-tit size'><span class='tit-con'>大小<i class='icon'></i></span></td></tr></thead>");
    txt = txt.join("");
    _.tHead = $(txt).appendTo(_.renderTo);

    _.tbody = $("<tbody></tbody>").appendTo(_.renderTo);

    _.music = new PlayMusic({
        "renderTo": "playMusic"
    });

    _.video = new PlayVideo({
        "renderTo": "playVideo"
    });

    _.bindEvent();
};

Table.prototype.loadData = function () {
    var _ = this;
    _.tbody.html("");
    $(_.dataSource.folderRows).each(function (index, item) {
        var tr = $("<tr data-type='folder' data-id='" + item.id + "' data-name='" + item.name + "' ></tr>").appendTo(_.tbody);
        $("<td class='list-group-item label'><i class='icon icon-check-s icon-checkbox'></i></td>").appendTo(tr);
        var name = $("<td class='list-group-item item-name' ><div class='thumb'><i class='icon icon-m icon-file-m'></i></div></td>").appendTo(tr);
        $("<div class='info' ><a href='javascript:void(0)' data-type='folder' data-upperid='" + item.upperId + "' data-id='" + item.id + "' title='" + item.name + "' class='tit'>" + item.name + "</a></div>").appendTo(name);
        $("<td class='list-group-item item-time' >" + item.createDate + "</td>").appendTo(tr);
        $("<td class='list-group-item item-size' >-</td>").appendTo(tr);
    });

    $(_.dataSource.fileRows).each(function (index, item) {
        var tr = $("<tr data-type='file' data-id='" + item.id + "' data-name='" + item.name + "' data-suffix='" + item.suffix + "' ></tr>").appendTo(_.tbody);
        $("<td class='list-group-item label'><i class='icon icon-check-s icon-checkbox'></i></td>").appendTo(tr);
        var name = $("<td class='list-group-item item-name' ><div class='thumb'><i class='icon icon-m icon-" + _.formatIcon(item.suffix) + "-m'></i></div></td>").appendTo(tr);
        $("<div class='info' ><a href='javascript:void(0)' data-type='file' data-suffix='" + item.suffix + "' data-upperid='" + item.upperId + "' data-id='" + item.id + "' title='" + item.name + "' class='tit'>" + item.name + "." + item.suffix + "</a></div>").appendTo(name);
        $("<td class='list-group-item item-time' >" + item.createDate + "</td>").appendTo(tr);
        $("<td class='list-group-item item-size' >" + _.bytesToSize(item.fileSize) + "</td>").appendTo(tr);
    });
}

Table.prototype.formatIcon = function (suffix) {
    suffix = suffix.toLowerCase();
    if (suffix == "mp3" || suffix == "wav" || suffix == "ape") {
        return "audio";
    } else if (suffix == "mp4" || suffix == "mkv" || suffix == "wmv") {
        return "video";
    } else if (suffix == "ppt" || suffix == "pptx") {
        return "ppt";
    } else if (suffix == "doc" || suffix == "docx") {
        return "doc";
    } else if (suffix == "xls" || suffix == "xlsx") {
        return "xls";
    } else if (suffix == "sql" || suffix == "js") {
        return "code";
    } else if (suffix == "pdf") {
        return "pdf";
    } else if (suffix == "txt") {
        return "txt";
    } else if (suffix == "zip" || suffix == "rar" || suffix == "7z") {
        return "zip";
    } else if (suffix == "jpg" || suffix == "png" || suffix == "gif") {
        return "pic";
    } else if (suffix == "torrent") {
        return "bt";
    } else {
        return "nor";
    }
};

Table.prototype.bytesToSize = function (bytes) {
    if (bytes === 0) return '0 B';

    var k = 1024;

    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    var i = Math.floor(Math.log(bytes) / Math.log(k));

    return this.cutZero((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];

    //toPrecision(3) 后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
};

Table.prototype.cutZero = function (old) {
    //拷贝一份 返回去掉零的新串
    var newstr = old;
    //循环变量 小数部分长度
    var leng = old.length - old.indexOf(".") - 1
    //判断是否有效数
    if (old.indexOf(".") > -1) {
        //循环小数部分
        for (var i = leng; i > 0; i--) {
            //如果newstr末尾有0
            if (newstr.lastIndexOf("0") > -1 && newstr.substr(newstr.length - 1, 1) == 0) {
                var k = newstr.lastIndexOf("0");
                //如果小数点后只有一个0 去掉小数点
                if (newstr.charAt(k - 1) == ".") {
                    return newstr.substring(0, k - 1);
                } else {
                    //否则 去掉一个0
                    newstr = newstr.substring(0, k);
                }
            } else {
                //如果末尾没有0
                return newstr;
            }
        }
    }
    return old;
};

Table.prototype.bindEvent = function () {
    var _ = this;

    $("#netDiskTable").on("click", ".tit", function () {
        if ($(this).attr("data-type") == "folder") {
            _.onClick({
                upperId: $(this).attr("data-upperid"),
                id: $(this).attr("data-id"),
                name: $(this).attr("title")
            });
            window.location.href = $("base").attr("data-path") + "#folder=" + $(this).attr("data-id");
            $("#checkAll").removeClass("act").removeClass("hover");
            $(".mod-action-wrap").addClass("hidden");
            _.load({
                dataSource: "queryNetDiskFolderAndFileAll.action",
                data: {
                    upperId: $(this).attr("data-id")
                }
            });
        } else if ($(this).attr("data-type") == "file") {
            var name = $(this).text();
            var relPath = $(".mod-breadcrumb").find("li.item").map(function () {
                if ($(this).hasClass("all")) {
                    return "";
                } else {
                    return $(this).find("a").text();
                }
            }).get().join("/");
            var filePath = $("base").attr("data-ip") + "netdisk/" + $("base").attr("data-userid") + relPath + "/" + name;
            if (name.lastIndexOf(".mp3") != -1) {
                _.music.show(filePath);
            } else if (name.lastIndexOf(".mp4") != -1) {
                _.video.show(filePath);
            }
        }

    });

    $(".layout-main").on("click", ".mod-list-group tbody tr", function (e) {
        var event = e || window.event;
        var element = event.target || event.srcElement;
        if ($(element).prop('nodeName').toUpperCase() != 'A') {
            if ($(this).hasClass("act")) {
                $(this).removeClass("act");
                $("#checkAll").removeClass("act");
                if ($(".mod-list-group tbody tr").filter(".act").length == 0) {
                    $("#checkAll").removeClass("hover");
                    $(".mod-action-wrap").addClass("hidden");
                }
            } else {
                $(this).addClass("act");
                $("#checkAll").addClass("hover");
                $(".mod-action-wrap").removeClass("hidden");
                if ($(".mod-list-group tbody tr").filter(".act").length == $(".mod-list-group tbody tr").length) {
                    $("#checkAll").addClass("act");
                }
            }
        }

    });

    $("#checkAll").on("click", function () {
        if ($(".mod-list-group tbody tr").length == 0) {
            return;
        }
        if ($(this).hasClass("act")) {
            $(this).removeClass("act");
            $(".mod-list-group tbody tr").removeClass("act");
            $("#checkAll").removeClass("hover");
            $(".mod-action-wrap").addClass("hidden");
        } else {
            $(this).addClass("act");
            $(".mod-list-group tbody tr").addClass("act");
            $(".mod-action-wrap").removeClass("hidden");
        }
    });

};