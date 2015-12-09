
var screenWidth = screen.width;
var barWidth = screenWidth * 2 / 5;
var barHeight = screenWidth / 25;

//资金流向
var divMoneyFlow=document.getElementById("div_money_flow");
//资金流
var moneyFlowsJson;
var moneyFlows;
// alert("hello");
getData();
showFlowData();

function getData(){
	moneyFlowsJson='['+
	'{"caption":"交易资金","inItem":{"name":"买入","value":182000.10},"outItem":{"name":"卖出","value":200000.00}},'+
	'{"caption":"银证转帐","inItem":{"name":"转入","value":18200.00},"outItem":{"name":"转出","value":987999.00}}]';
	moneyFlows = JSON.parse(moneyFlowsJson);
}

function showFlowData(){
	var middle = barWidth /2;
	var tableWidth = '95%';
	var valueTabelCellWidth = screenWidth * 1 / 5;
	for(var i=0; i<moneyFlows.length; i++){
		var tableMoneyFlow = document.createElement("table");
		tableMoneyFlow.setAttribute("align","center");
		// tableMoneyFlow.setAttribute("border",1);	
		tableMoneyFlow.setAttribute("width",tableWidth);
		tableMoneyFlow.createCaption().innerHTML=moneyFlows[i].caption;
		var tableRow = tableMoneyFlow.insertRow();
		tableRow.insertCell().innerHTML=moneyFlows[i].inItem.name;
		var inValueCell = tableRow.insertCell();
		inValueCell.setAttribute("width",'20%');
		inValueCell.setAttribute("align","center");
		inValueCell.innerHTML=moneyFlows[i].inItem.value.toFixed(2);

		tableRow.insertCell().innerHTML='<canvas id="moneyFlow'+i+'" width="'+barWidth+'" height="'+barHeight+'"></canvas>';

		var outValueCell = tableRow.insertCell();
		outValueCell.setAttribute("width",'20%');
		outValueCell.setAttribute("align","center");
		outValueCell.innerHTML=moneyFlows[i].outItem.value.toFixed(2);
		tableRow.insertCell().innerHTML=moneyFlows[i].outItem.name;

		divMoneyFlow.appendChild(tableMoneyFlow);

		var inDrawWidth =middle* moneyFlows[i].inItem.value / (moneyFlows[i].inItem.value + moneyFlows[i].outItem.value);
		var outDrawWidth = middle * moneyFlows[i].outItem.value / (moneyFlows[i].inItem.value + moneyFlows[i].outItem.value);
		
		var inOut=document.getElementById("moneyFlow"+i);
		var buyCxt=inOut.getContext("2d");
		buyCxt.fillStyle="#FF0000";
		buyCxt.fillRect( (middle-inDrawWidth) ,0,middle,barHeight);
		buyCxt.fillStyle="#00FF00";
		buyCxt.fillRect(middle,0, (middle + outDrawWidth) ,barHeight);

	}
}
