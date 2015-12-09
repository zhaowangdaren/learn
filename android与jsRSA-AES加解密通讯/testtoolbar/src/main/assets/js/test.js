var divtest = document.getElementById("div_test");
divtest.innerHTML='test';
var data = '[{"name":"Jack","age":30}]';

var data2 = new Object();
data2.name="Tom";

var jsonData = JSON.parse(data);
// var jsonStr = JSON.stringify(data2);
divtest.innerHTML=jsonData[0].name+jsonData[0].age;