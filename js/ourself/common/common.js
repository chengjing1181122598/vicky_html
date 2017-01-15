var html_path = "http://127.0.0.1:8083/vicky_html";
var file_path = "http://127.0.0.1:8084/vicky_file";
var data_path = "http://127.0.0.1:8080/vicky_data";

var successStatus = "success";
var errorStatus = "error";

var daoJiShiSeconds = 10;

var male = "男";
var female = "女";
var secret = "保密";

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2]);
	return null; //返回参数值
}

function saveLastPage() {
	window.sessionStorage.lastPage = window.location.href;
}