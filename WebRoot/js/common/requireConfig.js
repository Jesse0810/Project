require.config({
	// 基础路径，下面所有的路径都可以省略左边js/部分
	baseUrl : "js/",
	// 配置模块的加载位置和别名 
	paths:{
		//这里的css是扩展包的文件名css.js不是css文件夹 
		loadCSS : "common/css",
		jquery:"common/jquery-1.12.0",
        jqueryFrom:"common/jquery.form",
        bootstrap : "common/bootstrap-3.3.7-dist/js/bootstrap",
        bootstrap_switch:"common/bootstrap-switch",
		toastr:"common/toastr/toastr.min",
        messenger:"common/messenger-master/js/messenger",
		util : "common/util",
		ddl : "shopping/DropDownList",
		tabs_netdisk:"netdisk/tabs",
		addUser : "shopping/addUser",
		playMusic : "netdisk/playMusic",
		playVideo : "netdisk/playVideo"
	},
	// 依赖关系：表示加载顺序
	shim:{
		jquery:{
            exports: "common/jquery-1.12.0"
		},
        jqueryFrom:{
			deps : ["jquery"]
		},
        bootstrap:{
            deps : ["jquery","loadCSS!common/bootstrap-3.3.7-dist/css/bootstrap.css","loadCSS!../css/common/font-awesome-4.7.0/css/font-awesome.css"]
        },
        bootstrap_switch:{
            deps : ["jquery","loadCSS!../css/common/bootstrap-switch.css"]
		},
        toastr:{
			deps : ["jquery","loadCSS!common/toastr/toastr.css"]
		},
        messenger:{
			deps : ["jquery","loadCSS!common/messenger-master/css/messenger.css","loadCSS!common/messenger-master/css/messenger-spinner.css","loadCSS!common/messenger-master/css/messenger-theme-air.css","common/jquery-1.12.0"]
		},
		ddl:{
			deps : ["loadCSS!../css/shopping/ddl.css"]
		},
		tabs_netdisk:{
			deps : ["loadCSS!../css/netdisk/tabs.css"]
		},
		addUser:{
			deps : ["loadCSS!../css/shopping/addUser.css"]
		},
		playMusic:{
			deps : ["loadCSS!../css/netdisk/playMusic.css"]
		},
		playVideo:{
			deps : ["loadCSS!../css/netdisk/playVideo.css"]
		}
	}
})