require.config({
	// 基础路径，下面所有的路径都可以省略左边js/部分
	baseUrl : "js/",
	// 配置模块的加载位置和别名 
	paths:{
		//这里的css是扩展包的文件名css.js不是css文件夹 
		loadCSS : "common/css",
		jquery:"common/jquery-1.12.0",
		util : "common/util",
		ddl : "common/ddl"
	},
	// 依赖关系：表示加载顺序
	shim:{
		jquery:{
			deps : ["loadCSS!../css/common.css"]
		},
		ddl:{
			deps : ["loadCSS!../css/select.css"]
		}
	}
})

require(["jquery","ddl"],function($,ddl){
	new ddl({
		renderTo: "test",
		dataSource: "queryGoodsTypeAll.action",
		preloadItem: [{
			id: "-1",
			name: "请选择"
		}],
		mapping: {
			key: "id",
			value: "name"
		},
		direction: "down",
		defaultSelect: "-1",
		onClick: function(obj) {
			//刷新表格
		
		}
	});
})