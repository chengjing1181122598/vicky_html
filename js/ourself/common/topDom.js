var user;
$(function() {
	var topDomLeft = '<header class="myTop"><div>' +
		'<div class="myLeft floatLeft">' +
		'<a class="blackLink" href="' + html_path + '/index.html"><img src="' + html_path + '/favicon.ico" height="20" />主站</a>' +
		'</div>';
	var topDomRight =
		'<div class="myRight floatRight"><ul class="hengList">';
	$.ajax({
		type: "get",
		url: data_path + "/user/getUser",
		dataType: "json",
		success: function(data) {
			if(data.status === successStatus) {
				user = data.message.entity;
				var headImage = '<li><a class="hover" href="' + html_path + '/user/userCenter.html?username=' + user.username + '">' +
					'<img class="topHeadImage" src="' + user.relativePath + '"/></a></li>';
				var message = '<li><a class="blackLink" href="javascript:void(0);">消息</a></li>';
				var collect = '<li><a class="blackLink" href="javascript:void(0);">收藏夹</a></li>';
				var publish = '<li><a class="blackLink" href="javascript:void(0);">投稿</a></li>';
				var logout = '<li><a class="blackLink" href="javascript:void(0);" onclick="logout();">退出</a></li>';
				topDomRight += headImage + message + collect + publish + logout;
			} else {
				topDomRight += '<a class="blackLink" href="javascript:void(0);" onclick="gotoLogin();">登录</a>|' +
					'<a class="blackLink" href="javascript:void(0);" onclick="gotoRegister();">注册</a>';
			}

			topDomRight = topDomRight + '</div></ul>' +
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

function logout() {
	$.ajax({
		type: "get",
		url: data_path + "/user/logout",
		dataType: "json",
		success: function(data) {
			window.location.reload();
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function gotoLogin() {
	window.sessionStorage.lastPage = window.location.href;
	window.location.href = html_path + "/user/login.html";
}

function gotoRegister() {
	window.sessionStorage.lastPage = window.location.href;
	window.location.href = html_path + "/user/register.html";
}