//投资标签
//总承载table
var tableInvestLable=document.getElementById("table_invest_lable");

var bgColors=[ '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0' ];//投资标签的背景色
var investNames;//标签名
var investValues;//标签内容

var investLableJson='[{"name":"高频交易","value":"您一共交易了89笔，超过了34%用户"},'
	+'{"name":"翻山越岭","value":"您的收益波幅为28%"},'
	+'{"name":"分散投资","value":"平均同时持仓7个股票"}]';
var investLable;
//获取标签数据
function getInvestData(){
	
	// investNames=["高频交易","翻山越岭","分散投资"];
	// investValues=["您一共交易了89笔，超过了34%用户","您的收益波幅为28%","平均同时持仓7个股票"];
	investLable=JSON.parse(investLableJson);
}

getInvestData();

//添加标签内容
for(var i=0; i<investLable.length;i++){
	var newRow = tableInvestLable.insertRow();
	var investName=newRow.insertCell();
	var investValue=newRow.insertCell();
	investName.setAttribute("bgcolor",bgColors[i]);
	investName.innerHTML='<text style="color:white">'+investLable[i].name+'</text>';
	investValue.innerHTML=investLable[i].value;
}
