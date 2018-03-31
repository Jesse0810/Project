window.onload = function() {
	var dataS = [{
		"id": "001",
		"name": "nihao01"
	}, {
		"id": "002",
		"name": "nihao02"
	}, {
		"id": "003",
		"name": "nihao03"
	}];

	var dataStr = "queryGoodsForGrid.action";

	new Tabs({
		"renderTo": "userTabs",
		"dataSource": dataStr,
		"mapping": {
			"key": "id",
			"value": "name"
		},
		"onClick": function(obj) {
//			alert(obj.id + ":" + obj.name);
		}
	});
	
//	new Tabs({
//		"renderTo": "GoodsTabs",
//		"dataSource":"QueryGoodsAllServlet.action"
//	});
//	new Tabs({
//		"renderTo": "GoodsTypeTabs",
//		"dataSource":"QueryGoodsTypeAllServlet.action"
//	});
}