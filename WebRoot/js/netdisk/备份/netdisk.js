require(["js/common/requireConfig.js"],function(){
    require(["jqueryFrom","loadCSS!../css/common/common.css","loadCSS!../css/common/iconfont/iconfont.css","loadCSS!../css/netdisk/page-home.css"]);
    require(["jquery","tabs_netdisk","js/netdisk/table.js","js/netdisk/BreadCrumb.js","js/netdisk/fileManipulation.js"],function($,tabs,table,breadcrumb,filemanipulation){
        new tabs({
            renderTo : "netdisk_menu"
        });

        var baseFolder = $("base").attr("data-basefolder");
        var currentFolder = window.location.hash.substr(1);
        if(currentFolder == ""||currentFolder.split("=")[0]!="folder"|| currentFolder.split("=")[1]==""||
            currentFolder.split("=")[1]=="null"||currentFolder.split("=")[1]=="undefined"){
            currentFolder = baseFolder;
        }else{
            currentFolder = currentFolder.split("=")[1];
        }

        var bc = new breadcrumb({
            renderTo:"netdisk_breadcrumb",
            dataSource:"querySrc.action",
            data:{
                upperId:currentFolder
            },
            onClick:function (upperId) {
                t.load({
                    dataSource:"queryNetDiskFolderAndFileAll.action",
                    data: {
                        upperId: upperId
                    }
                });
            }
        });

        var t = new table({
            renderTo:"netDiskTable",
            dataSource:"queryNetDiskFolderAndFileAll.action",
            data:{
                upperId:currentFolder
            },
            onClick:function (obj) {
                bc.add(obj);
            }
        });

        new filemanipulation({
            onClick:function (upperId) {
                t.load({
                    dataSource:"queryNetDiskFolderAndFileAll.action",
                    data: {
                        upperId: upperId
                    }
                });
            }
        });

    });
})