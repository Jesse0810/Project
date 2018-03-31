require(["js/common/requireConfig.js"], function () {
    require(["util","loadCSS!../css/common/common.css"], function (util) {
        if (util.isIELow()) {
            require(["js/common/bootstrap-3.3.7-dist/js/html5shiv.js", "js/common/bootstrap-3.3.7-dist/js/respond.js"]);
        }
        require(["jquery", "util", "toastr", "bootstrap", "bootstrap_switch",
            "loadCSS!common/bootstrap-3.3.7-dist/css/buttons.css",
            "loadCSS!../css/netdisk/login.css"], function ($, util, toastr) {
            //启动背景轮播图
            var result = "error";

            $('#loginBackground').carousel({
                interval: 3000,
                pause: null
            });

            if (!util.isIELow()) {
                $('#remenberPWD').bootstrapSwitch({
                    state: false,
                    size: 'small',
                    onText: '<i class="glyphicon glyphicon-ok " style="color: #FFFFFF" ></i>',
                    offText: '<i class="glyphicon glyphicon-remove " style="color: #333333" ></i>'
                });
            }

            //刷新验证码
            getCode();
            //发验证码图片点击事件
            $("#codePic").click(function () {
                getCode();
            });

            //判断cookie中是否有用户名
            var userName = util.cookie.get("userName");
            var pwd = util.cookie.get("pwd");
            if (userName != "undefined" && userName != "" && userName != null
                && pwd != "undefined" && pwd != "" && pwd != null) {
                //如果有就默认填充用户名和密码
                $("#userName").val(userName);
                $("#pwd").val(pwd);
                //默认帮用户选中checkbox框
                $('#remenberPWD').bootstrapSwitch('state', true);
                //焦点默认选中密码框
                // $("#inputCode").focus();
                // $("#inputCode").next().css("visibility", "visible");
            } else {
                $("#userName").val("");
                $("#pwd").val("");
                $('#remenberPWD').bootstrapSwitch('state', false);
                // $("#userName").focus();
                // $("#userName").next().css("visibility", "visible");
            }

            $(".help-block").css("visibility", "hidden");


            $("#login_btn").on("click", function () {
                // $(this).removeClass("button-primary").removeClass("button-royal");
                btn_confirm();
            });

            //输入框添加各种事件
            $("[type='text'],[type='password']").focus(function () {
                $(this).next().css("visibility", "visible");
            }).blur(function () {
                checkTxt(this);
                if (!$(this).next().hasClass("text-danger")) {
                    $(this).next().css("visibility", "hidden");
                }
            }).keydown(function (event) {
                //让回车键支持 登录
                if (event.keyCode == "13") {
                    btn_confirm();
                }

            });

            //刷新验证码
            function getCode() {
                $("#codePic").attr("src", $("#codePic").attr("dataSource") + "?t=" + Date.parse(new Date()));
            }

            function helpBlockJudge(item, state, message) {
                if (state == "correct") {
                    $(item).next().removeClass("text-danger").html("<i class='glyphicon glyphicon-info-sign' ></i>" + $(item).attr("placeholder"));
                    return 0;
                } else if (state == "error") {
                    $(item).next().addClass("text-danger").html("<i class='glyphicon glyphicon-exclamation-sign' ></i>" + message);
                    return 1;
                }
            }

            function checkTxt(obj) {
                //判断内容是否输入
                var msg;
                var judge = "correct";
                if ($(obj).val() == "") {
                    //显示提示信息
                    msg = $(obj).attr("data-name") + "不能为空!";
                    judge = "error";
                }

                //最小长度

                if ($(obj).val().length < $(obj).attr("minlength")) {
                    //显示提示信息
                    msg = $(obj).attr("data-name") + "长度至少" + $(obj).attr("minlength") + "位";
                    judge = "error";
                }

                if ($(obj).attr("id") == "pwd") {
                    if (!util.validate($(obj).val(), "en")) {
                        msg = "密码不能输入其他字符";
                        judge = "error";
                    }
                }
                return helpBlockJudge(obj, judge, msg);
            }

            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            toastr.options.onHidden = function () {
                if(result == "success"){
                    if($("#remenberPWD").prop("checked")){
                        util.cookie.set("userName",$("#userName").val());
                        util.cookie.set("pwd",$("#pwd").val());
                    }
                    $("#login_btn").removeClass("button-action").text("登录");
                    top.location.href = $("base").attr("href")+"jsp/netdisk/netdisk.jsp";
                }else{
                    $("#login_btn").removeClass("button-caution").text("登录");
                    //注册失败，刷新验证码
                    getCode();
                    //清空验证码输入框
                    $("#inputCode").val("");
                }
            }

            //修改密码按钮点击事件
            function btn_confirm() {

                //当页面正在请求时，不接受再次发送请求
                if ($("#login_btn").hasClass("button-highlight")) {
                    return;
                }

                var errCount = 0;
                //是否有输入框没有正确输入值
                $("[type='text'],[type='password']").each(function () {
                    errCount += checkTxt(this);
                });
                if (errCount > 0) {
                    return;
                }

                $("#login_btn").addClass("button-highlight").text("正在发送请求...");
                //事件提交

                $.post("loginNetDisk.action", {
                    name: $("#userName").val(),
                    pwd: $("#pwd").val(),
                    code: $("#inputCode").val()
                }, function (res) {
                    $("#login_btn").removeClass("button-highlight");
                    //判断后台返回值
                    if (res.isSuccess == "true") {
                        //给登录按钮添加登录成功样式
                        $("#login_btn").addClass("button-action");
                        toastr["success"]("<p class='netdisk-toast' >"+res.msg+"</p>" , "<h4 class='netdisk-toast' >登录成功</h4>");
                        //一秒后跳转到框架页
                        result = "success";
                    } else {
                        //给按钮添加 登录失败 样式
                        $("#login_btn").addClass("button-caution");
                        toastr["error"]("<p class='netdisk-toast' >"+res.msg+"</p>", "<h4 class='netdisk-toast' >登录失败</h4>");
                        //一秒后跳转到框架页
                        result = "error";
                    }
                });

            }
        });
    });
});

