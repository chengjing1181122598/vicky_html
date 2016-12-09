var data_apps = "/vicky_data";
var file_apps = "/vicky_file";
var html_apps = "/vicky_html";
var successStatus = "success";
var errorStatus = "error";

var unreadStatus = "001";
var readStatus = "002";

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2]);
	return null; //返回参数值
}