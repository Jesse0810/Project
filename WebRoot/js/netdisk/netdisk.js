$(function () {
    new Tabs({
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

    var bc = new BreadCrumb({
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

    var t = new Table({
        renderTo:"netDiskTable",
        dataSource:"queryNetDiskFolderAndFileAll.action",
        data:{
            upperId:currentFolder
        },
        onClick:function (obj) {
            bc.add(obj);
        }
    });

    new Charts({
        renderTo:"charts_button"
    });

    new FileManipulation({
        onClick:function (upperId) {
            t.load({
                dataSource:"queryNetDiskFolderAndFileAll.action",
                data: {
                    upperId: upperId
                }
            });
        },
        onNewFloder:function () {
            return t.$addTr(0,{
                id:"",
                name:"新建文件夹",
                upperId:"",
                createDate:""
            },"folder");
        }
    });
});


