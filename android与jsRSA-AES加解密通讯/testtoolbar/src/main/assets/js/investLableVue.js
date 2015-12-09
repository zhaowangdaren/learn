var investLableJson='[{"name":"高频交易","value":"您一共交易了89笔，超过了34%用户"},'
	+'{"name":"翻山越岭","value":"您的收益波幅为28%"},'
	+'{"name":"分散投资","value":"平均同时持仓7个股票"}]';
var bgColors=[ '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0' ];//投资标签的背景色

function getData(){
	var data = JSON.parse(investLableJson);
	for(var i = 0; i<data.length; i++){
		data[i].bgcolor=bgColors[i];
	}
	return data;
}
//创建vue实例，绘制页面
var invest_lable_vue = new Vue({
	el:'#table_invest_lable',
	data:{
		invest_lables:getData()
	}
});
