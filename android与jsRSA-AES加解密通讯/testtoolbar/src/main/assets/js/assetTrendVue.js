//资产走势
var screenWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var divAssetTrend=document.getElementById("asset_trend");
//资产走势的X坐标
var assetTrendX;
//资产走势Y坐标
var assetTrendY;

//获取资产数据
function getAssetTrendData(){
	assetTrendX=[1,2,3,4,5,6,7,8,9,0];
	assetTrendY=[110,122,333,44,555,6,66,777,888,99];
}

//设置资产走势区域尺寸
function setDivAssetTrendSize(){
	divAssetTrend.style.width=screenWidth+"px";
	divAssetTrend.style.height=(screenWidth / 16 ) * 9+"px";
}

var assetTrend;
//创建vue实例，监听Y轴坐标值的变化，如发生变化则刷新
var vm = new Vue({
	el:'#asset_trend',
	data:{
		ass1:assetTrendY
	},
	watch:{
		'ass1':function(){
			var option = assetTrend.getOption();
			option.series[0].data=this.ass1;
			assetTrend.setOption(option);
		}
	}
});

function show(){
			setDivAssetTrendSize();
			getAssetTrendData();
			assetTrend = echarts.init(divAssetTrend);
			var assetTrendOption = {
				    title : {
				        text: '资产走势'
				    },
				    tooltip : {
				        trigger: 'axis',
				        formatter:"{c}"
				    },
				    calculable : false,
				    grid:{
				    	x:"40px",
				    	y:"40px",
				    	x2:"40px",
				    	y2:"40px",
				    	borderColor:"rgba(200, 54, 54, 0)"
				    },
				    xAxis : [
				        {
				        	axisLabel:{
				        		show:false//不显示x坐标的坐标值
				        	},
				            splitLine:{
				            	show:false//不显示网格
				            },
				            type : 'category',
				            boundaryGap : false,
				            data : assetTrendX
				        }
				    ],
				    yAxis : [
				        {
				        	axisLabel:{
				        		show:false//不显示Y坐标的坐标值
				        	},
				            splitLine:{
				            	show:false//不显示网格
				            },
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            type:'line',
				            data:assetTrendY
				        }
				       
				    ]
			};
			assetTrend.setOption(assetTrendOption);
		}
