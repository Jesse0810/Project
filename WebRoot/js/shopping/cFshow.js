$(function(){
	
	var dataSource = {
		"total":"5",
		"rows":[{
			"id":"001",
			"name":"admin01",
			"picture":"image/CarouselFigure/main1.jpg"
		},{
			"id":"002",
			"name":"admin02",
			"picture":"image/CarouselFigure/main2.jpg"
		},{
			"id":"003",
			"name":"admin03",
			"picture":"image/CarouselFigure/main3.jpg"
		},{
			"id":"004",
			"name":"admin04",
			"picture":"image/CarouselFigure/main4.jpg"
		},{
			"id":"005",
			"name":"admin05",
			"picture":"image/CarouselFigure/main5.jpg"
		}]
	};
	
	var dataSourceStr = "QuerySlideShowAllServlet.action";
	
	new CarouselFigure({
		"renderTo":"userTabs",
		"dataSource":dataSourceStr,
		"onClick":function(obj){
			alert(obj.id);
		}
	});
});