var html_path = "";
var data_path = "/vicky_data";

var successStatus = "success";
var errorStatus = "error";

var daoJiShiSeconds = 10;

var male = "男";
var female = "女";
var secret = "保密";

$(function() {
	$("[data-toggle='tooltip']").tooltip();
	$.ajaxSetup({
		cache: false
	});
});

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2]);
	return null; //返回参数值
}

function saveLastPage() {
	window.localStorage.lastPage = window.location.href;
}

function getLastPage() {
	return window.localStorage.lastPage;
}

var cookieUserString = "user";

function setLoginUser(user) {
	setCookie(cookieUserString, JSON.stringify(user));
}

function getLoginUser() {
	var userJSONString = getCookie(cookieUserString);
	if(userJSONString.length > 0) {
		return $.parseJSON(userJSONString);
	} else {
		return null;
	}
}

function clearLoginUser() {
	setCookie(cookieUserString, "");
}

function setCookie(c_name, value, minute) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + minute * 60 * 1000);
	window.document.cookie = c_name + "=" + escape(value) + ";path=/" +
		((minute == null) ? "" : ";expires=" + exdate.toGMTString());
}

function getCookie(c_name) {
	if(document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if(c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if(c_end == -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}