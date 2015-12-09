var screenWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//饼图区域
var divAssetPie = document.getElementById('div_asset_pie');

//下列分别对应不同资产的不同属性，如果使用Object封装三个属性下面的function需要修改

 var colors=[ '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
     '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'];//资产颜色

 var assetStructureJson = '[{"name":"现金","value":99999.99},'
 	+'{"name":"股票","value":878.88},'
 	+'{"name":"开放式基金","value":67676.67},'
 	+'{"name":"债券","value":53658.88},'
 	+'{"name":"融资","value":78965.99},'
 	+'{"name":"融券","value":987987.88},'
 	+'{"name":"质押","value":569807.00},'
 	+'{"name":"天汇宝","value":6353849.99},'
 	+'{"name":"其他","value":3487.00}]';

//
//function initData(items){
//	assetStructureJson = items;
//}
function getData(jsonData){
	var assets=JSON.parse(jsonData);
	for(var i=0; i < assets.length; i++){
		assets[i].color=colors[i];
	}
	return assets;
}

function setDivAssetPieSize(pieTag){
	pieTag.style.width=14 * screenWidth/25+"px";
	pieTag.style.height=14 * screenWidth/25+"px";
}


var assetPie;
var asset_structures;


function show1(){
	asset_structures = getData(assetStructureJson);


    //创建vue实例，绘制legend
    var asset_vue = new Vue({
    	el:'#table_asset_structure_lengend_ul',
    	data:{
    		asset_items:asset_structures
    	}
    });

//    //添加对asset_items的数据监听，如数据发生变化则刷新echarts视图
//    asset_vue.$watch('asset_items', function(){
//    	var option = assetPie.getOption();
//    	option.series[0].data=this.asset_items;
//    	assetPie.setOption(option);
//    },{deep:true});


}

function drawGraph(){
	setDivAssetPieSize(divAssetPie);
    assetPie=echarts.init(divAssetPie);
    var assetOption={
    	title:{
    		text:'资产结构'
    	},
    	color:colors,
    	tooltip : {
    		trigger: 'item',
    		formatter: "{a} <br/>{b}:{c}"
        },
        calculable : false,
        series:[{
        	name:'资产结构',
        	type:'pie',
        	radius:['30%','60%'],
        	itemStyle:{
				normal:{
					label:{show:false},
					labelLine:{show:false}
				},
				emphasis:{
					label:{
						show:false,
						position:'center',
						textStyle:{
							fontSize:'30',
							fontWeight:'bold'
						}
					}
				}
        	},
        	data:asset_structures
        }]
    };
    assetPie.setOption(assetOption);
}
