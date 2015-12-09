//资产结构

var screenWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//饼图和样例整体table控件
var tableAssetStructure=document.getElementById("table_asset_structure");
//饼图区域
var divAssetPie = document.getElementById('div_asset_pie');
//样例区域，table
var tableAssetStructureLegend=document.getElementById("table_asset_structure_legend");

//下列分别对应不同资产的不同属性，如果使用Object封装三个属性下面的function需要修改
var colors=[ '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700', 
    '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'];//资产颜色


//var assetStructureJson = '[{"name":"现金","value":99999.99},'
//	+'{"name":"股票","value":878.88},'
//	+'{"name":"开放式基金","value":67676.67},'
//	+'{"name":"债券","value":53658.88},'
//	+'{"name":"融资","value":78965.99},'
//	+'{"name":"融券","value":987987.88},'
//	+'{"name":"质押","value":569807.00},'
//	+'{"name":"天汇宝","value":6353849.99},'
//	+'{"name":"其他","value":3487.00}]';
var assetStructure;
//设置饼图区域尺寸，注意不能过大，否则会导致一屏容不下样例
function setDivAssetPieSize(pieTag){
	pieTag.style.width=14 * screenWidth/25+"px";
	pieTag.style.height=14 * screenWidth/25+"px";
}

//设置资产属性
function getAssetData(msg){
	assetStructure=JSON.parse(msg);
}
//设置样例内容
function setLegendTable(tableV){
		for(var i=0; i<assetStructure.length;i++){
			//add line
			var newTr=tableV.insertRow();
			//add column
			var legend =newTr.insertCell();
			var legendName=newTr.insertCell();
			var legendValue=newTr.insertCell();
			legendValue.setAttribute("align","right");
			//set attr
			legend.innerHTML='<canvas id="legend'+i+'" height="20" width="20"></canvas>';
			legendName.innerHTML=assetStructure[i].name;
			legendValue.innerHTML=assetStructure[i].value.toFixed(2);

			//draw color for legend
			var legendRect=document.getElementById("legend"+i);
			var legendCxt=legendRect.getContext("2d");
			legendCxt.fillStyle=colors[i];
			legendCxt.fillRect(0,0,20,20);
		}
}

//设置饼图的series的data属性
function setPieData(){
	return assetStructure;
}

function showAsset(msg){
		getAssetData(msg);
		setDivAssetPieSize(div_asset_pie);
		setLegendTable(tableAssetStructureLegend);
		assetPie=echarts.init(divAssetPie);
		var assetOption = {
			title : {
				text: '资产结构'
			},
			color:colors,
			tooltip : {
			 	trigger: 'item',
			 	 formatter: "{a} <br/>{b}:{c}"
			},
			calculable : false,
			series : [{
				name:'Asset Structure',
				type:'pie',
				radius : ['30%', '60%'],//内外圈占比
				itemStyle : {
				                normal : {
				                    	label : {
				                        		show : false
				                    	},
				                	labelLine : {
				                        		show : false
				                	}
				 	},
					emphasis : {
				                	label : {
					                        show : false,
					                        position : 'center',
					                        textStyle : {
					                            fontSize : '30',
					                            fontWeight : 'bold'
					                        }
				                	}
					}
				},	
				data:setPieData()
			}]
		};
		assetPie.setOption(assetOption);
		
}


