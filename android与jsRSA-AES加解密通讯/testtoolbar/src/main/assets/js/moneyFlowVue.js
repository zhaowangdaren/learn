var screenWidth = screen.width;

function getData(){
	var dataJSON = '[{"caption":"交易资金", "inItem":{"name":"买入","value":182000.10,"width":0.4},"outItem":{"name":"卖出","value":200000.00,"width":0.6}},'+
	'{"caption":"银证转帐", "inItem":{"name":"转入","value":182000.10,"width":0.7},"outItem":{"name":"转出","value":987999.00,"width":0.3}}]';
	var data = JSON.parse(dataJSON);
	for(var i=0; i<data.length; i++){//设置宽度占比
		data[i].inItem.width=data[i].inItem.width * 0.5 * 100+'%';
		data[i].outItem.width=data[i].outItem.width *  0.5 * 100+ '%';
	}
	return data;
}
var datas = getData();
var flow_vue=new Vue({
	el:'#table_money_flow',
	data:{
		money_flows:datas
	}
});
