$(function() {
	var topDomLeft = '<header class="myTop"><div>' +
		'<div class="myLeft floatLeft">' +
		'<a class="blackLink" href="' + html_path + '/index.html"><img src="' + html_path + '/favicon.ico" height="20" />主站</a>' +
		'</div>';
	var topDomRight =
		'<div class="myRight floatRight">';
	$.ajax({
		type: "get",
		url: data_path + "/user/getUser",
		dataType: "json",
		success: function(data) {
			if(data.status === successStatus) {
				topDomRight += "呵呵";
			} else {
				topDomRight += '<a class="blackLink" href="javascript:void(0);" onclick="gotoLogin();">登录</a>|' +
					'<a class="blackLink" href="javascript:void(0);" onclick="gotoRegister();">注册</a>';
			}

			topDomRight = topDomRight + '</div>' +
				'</div></header>' +
				'<img src="' + html_path + '/img/index/vicky.jpg" class="img-responsive" />';
			$("body").prepend(topDomLeft + topDomRight);
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});

});

function gotoLogin() {
	window.sessionStorage.lastPage = window.location.href;
	window.location.href = html_path + "/user/login.html";
}

function gotoRegister() {
	window.sessionStorage.lastPage = window.location.href;
	window.location.href = html_path + "/user/register.html";
}