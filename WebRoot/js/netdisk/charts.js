function Charts(args) {

    this.init(args);
}

Charts.prototype.init = function (args) {
    this.renderTo = $("#" + args.renderTo);

    this.bindEvent();
};

Charts.prototype.bindEvent = function () {
    var t = this;
    this.renderTo.click(function () {
        swal({
                title: "",
                text: "<div id='container_charts' style='height: 400px'></div>",
                allowOutsideClick:true,
                html: true,
                showCancelButton: true,
                confirmButtonText: "打开图表!",
                cancelButtonText: "退出图表!",
                closeOnConfirm: false
            },
            function () {
                $('#container_charts').highcharts({
                    chart: {
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45
                        }
                    },
                    title: {
                        text: '网盘中各个种类'
                    },
                    plotOptions: {
                        pie: {
                            innerSize: 100,
                            depth: 45,
                            showInLegend: true,
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        name: '货物金额',
                        data: [
                            ['香蕉', 8],
                            ['猕猴桃', 3],
                            ['桃子', 1],
                            ['橘子', 6],
                            ['苹果', 8],
                            ['梨', 4],
                            ['柑橘', 4],
                            ['橙子', 1],
                            ['葡萄 (串)', 1]
                        ]
                    }],
                    credits: {
                        enabled:false
                    }
                });
            });
    });


};