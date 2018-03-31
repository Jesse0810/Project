function FileManipulation(args) {

    this.init(args);
}

FileManipulation.prototype.init = function (args) {
    //点击事件
    this.onClick = args.onClick && typeof args.onClick == 'function' ? args.onClick : function () {
    };
    this.onNewFloder = args.onNewFloder && typeof args.onNewFloder == 'function' ? args.onNewFloder : function () {
    };
    $.fn.autoHide = function () {
        var element = $(this);
        $(document).on("click", function (e) {
            if (element.is(".act")
                && (!$(e.target)[0].isEqualNode(element[0]) && element.has(e.target).length === 0)) {
                element.removeClass("act");
            }
        });
        return this;
    }
    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-top',
        theme: 'air'
    }

    this.bindEvent();
};

FileManipulation.prototype.bindEvent = function () {
    //打开下载下拉菜单
    $("#uploadBtn").click(function (event) {
        if ($(this).parent().is(".act")) {
            $(this).parent().removeClass("act").autoHide();
        } else {
            $(this).parent().addClass("act").autoHide();
        }
    });
    var t = this;
    //下拉菜单功能
    $(".mod-bubble-menu-upload").on("click", "li.menu-item", function () {
        var form = $("#uploadForm");
        var upperId = $(".mod-breadcrumb .item.cur a").attr("data-id");
        var relPath = $(".mod-breadcrumb").find("li.item").map(function (index, item) {
            if ($(this).hasClass("all")) {
                return "";
            } else {
                return $(this).find("a").text();
            }
        }).get().join("/");
        if ($(this).attr("id") == "upload-file") {
            console.log("文件上传");
            //每次点击清空form表单
            form.html("");
            //手动向form表单中添加input type=file
            var file = $("<input type='file' name='file'/>").appendTo(form);
            $("<input type='text' name='asdasd' value='222'/>").appendTo(form);
            //点击文件上传
            file.click();//文件上传之后，只是选中了文件，还没有提交
            //判断file的值是否有变动
            file.change(function () {
                // //手动提交form表单
                if (file.val() != "") {
                    $.post("preFileManipulation.action", {
                        upperId: upperId,
                        relPath: relPath
                    }, function () {
                        form.ajaxSubmit({
                            url: "uploadNetDiskFile.action",
                            type: "post",
                            success: function (res) {
                                if (res.isSuccess == "true") {
                                    t.onClick(upperId);
                                    Messenger().post({
                                        message: res.msg,
                                        type: 'success',
                                        showCloseButton: true
                                    });
                                } else {
                                    Messenger().post({
                                        message: "上传失败：" + res.msg,
                                        type: 'error',
                                        showCloseButton: true
                                    });
                                }
                            },
                            error: function (responseError) {
                                console.log(22222222222);
                                console.log(responseError);
                            }

                        });
                    });
                }
            });
        }else if($(this).attr("id") == "upload-create"){
            var tr = t.onNewFloder();
            tr.prependTo($("#netDiskTable").find("tbody"));
            t.inputName(tr);
            tr.addClass("newFolder");
        }
    });
    //下载文件
    $("#downFile").click(function () {
        var downFile = $(".mod-list-group tbody tr").filter(".act");
        if (downFile.length == 0) {
            Messenger().post({
                message: "未选中任何文件！",
                type: 'error',
                showCloseButton: true
            });
        } else if (downFile.length > 1) {
            Messenger().post({
                message: "目前不支持多文件下载！",
                type: 'error',
                showCloseButton: true
            });
        } else if (downFile.first().attr("data-type") == "folder") {
            Messenger().post({
                message: "目前不支持文件夹下载！",
                type: 'error',
                showCloseButton: true
            });
        } else if (downFile.length == 1) {
            var relPath = $(".mod-breadcrumb").find("li.item").map(function () {
                if ($(this).hasClass("all")) {
                    return "";
                } else {
                    return $(this).find("a").text();
                }
            }).get().join("/");
            var data = downFile.map(function (index, item) {
                return {
                    suffix: $(item).attr("data-suffix"),
                    name: $(item).attr("data-name")
                }
            }).get()[0];
            var filePath = $("base").attr("data-ip") + "netdisk/" + $("base").attr("data-userid") + relPath + "/" + data.name + "." + data.suffix;
            Messenger().post({
                message: "马上下载:" + data.name + "." + data.suffix + "文件！",
                type: 'success',
                showCloseButton: true
            });
            var link = document.createElement('a');
            link.setAttribute("href", filePath);
            link.setAttribute("download", data.name + "." + data.suffix);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            // var $form = $("#downForm");
            // $form.attr('action', filePath);
            // $form.submit();
            // $.post("preFileManipulation.action",{
            //     upperId:upperId,
            //     relPath:relPath
            // },function () {
            //     $.post("downLoadNetDiskFile.action",data,function (path) {
            //
            //     });
            // });
        }
    });
    //删除文件
    $("#delFile").on("click", function () {
        var upperId = $(".mod-breadcrumb .item.cur a").attr("data-id");
        var temp = $(".mod-list-group tbody tr").filter(".act");
        if (temp.length == 0) {
            Messenger().post({
                message: "未选中任何文件！",
                type: 'error',
                showCloseButton: true
            });
            return;
        }
        var data = temp.map(function (index, item) {
            return {
                id: $(item).attr("data-id"),
                type: $(item).attr("data-type")
            }
        }).get();
        console.log(data);
        $.ajax({
            url: "recycleNetDiskFileANDFolder.action",
            type: "post",
            data: {
                delList: JSON.stringify(data)
            },
            success: function (res) {
                t.onClick(upperId);
                if (res.isSuccess == "true") {
                    Messenger().post({
                        message: res.msg,
                        type: 'success',
                        showCloseButton: true
                    });
                } else {
                    Messenger().post({
                        message: res.msg,
                        type: 'error',
                        showCloseButton: true
                    });
                }
            }
        });
    });
    //重命名
    $("#rename").on("click", function () {
        var $temp = $(".mod-list-group tbody tr").filter(".act");
        if ($temp.length == 0) {
            Messenger().post({
                message: "未选中任何文件！",
                type: 'error',
                showCloseButton: true
            });
            return;
        }else if($temp.length>1){
            Messenger().post({
                message: "只能选中一个文件！",
                type: 'error',
                showCloseButton: true
            });
            return;
        }else{
            $temp = $temp.first();
            t.inputName($temp);
        }
    });

    $("#netDiskTable").on("focus", "input[type='text'].writetext", function () {
        if ($(this)[0].setSelectionRange) {
            $(this)[0].setSelectionRange(0, $(this).parent().prev().attr("title").length);
        }
    }).on("click",".submit_btn",function () {
        var writetext = $(this).prev().val();
        var reg = new RegExp('[\\\\/:*?\"<>|]');
        if(writetext.length>120||writetext.length<1) {
            Messenger().post({
                message: "文件(夹)名长度要在1到120之间!",
                type: 'error',
                showCloseButton: true
            });
            return;
        }
        else if(reg.test(writetext)){
            Messenger().post({
                message: "文件(夹)名有非法字符!",
                type: 'error',
                showCloseButton: true
            });
            return;
        }else {
            var upperId = $(".mod-breadcrumb .item.cur a").attr("data-id");
            var relPath = $(".mod-breadcrumb").find("li.item").map(function (index, item) {
                if ($(this).hasClass("all")) {
                    return "";
                } else {
                    return $(this).find("a").text();
                }
            }).get().join("/");
            var type = $(this).parent().prev().attr("data-type");
            var id = $(this).parent().prev().attr("data-id");
            var suffix = $(this).parent().prev().attr("suffix");
            if(type=="file"){
                suffix = writetext.substr(writetext.lastIndexOf(".")+1);
                writetext = writetext.substring(0,writetext.lastIndexOf("."));
            }
            if($(this).parents("tr").hasClass("newFolder")){
                $.post("preFileManipulation.action", {
                    upperId: upperId,
                    relPath: relPath
                }, function () {
                    $.post("newNetDiskFolder.action",{
                        name:writetext
                    },function (res) {
                        t.onClick(upperId);
                        if (res.isSuccess == "true") {
                            Messenger().post({
                                message: res.msg,
                                type: 'success',
                                showCloseButton: true
                            });
                        } else {
                            Messenger().post({
                                message: res.msg,
                                type: 'error',
                                showCloseButton: true
                            });
                        }
                    });
                });
            }else {
                $.post("updateNetDiskName.action",{
                    id:id,
                    name:writetext,
                    type:type,
                    suffix:suffix,
                    relPath:relPath
                },function (res) {
                    t.onClick(upperId);
                    if (res.isSuccess == "true") {
                        Messenger().post({
                            message: res.msg,
                            type: 'success',
                            showCloseButton: true
                        });
                    } else {
                        Messenger().post({
                            message: res.msg,
                            type: 'error',
                            showCloseButton: true
                        });
                    }
                });
            }
        }
    }).on("click",".cancel_btn",function () {
        t.cancleInputName(this);
        if($(this).parents("tr").hasClass("newFolder")){
            $(this).parents("tr").remove();
        }
    });


};
//取消命名
FileManipulation.prototype.cancleInputName = function (obj) {
    var $info = $(obj).parents(".info");
    $info.find(".tit").removeClass("hidden");
    $info.find(".infotext .writetext").val($info.find("a").text());
    $info.find(".infotext").addClass("hidden");
    $(obj).parents("tr").removeClass("act");
};
//
FileManipulation.prototype.inputName = function ($temp) {
    var $info = $temp.find(".info");
    $info.find(".tit").addClass("hidden");
    $info.find(".infotext").removeClass("hidden");
    var $writetext = $info.find(".infotext .writetext");
    $writetext[0].focus();
};