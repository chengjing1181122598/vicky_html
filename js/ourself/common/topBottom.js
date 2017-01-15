var user;
$(function() {
	var topDomLeft = '<header class="myTop"><div>' +
		'<div class="allWidth">' +
		'<div class="floatLeft">' +
		'<a class="blackLink" href="' + html_path + '/index.html"><img src="' + html_path + '/favicon.ico" height="20" />主站</a>' +
		'</div>';
	var topDomRight =
		'<div class="floatRight"><ul class="topHengList">';
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
				var publish = '<li><a class="blackLink" href="' + html_path + '/video/uploadVideo.html' + '">投稿</a></li>';
				var logout = '<li><a class="blackLink" href="javascript:void(0);" onclick="logout();">退出</a></li>';
				topDomRight += headImage + message + collect + publish + logout;
			} else {
				topDomRight += '<a class="blackLink" href="javascript:void(0);" onclick="gotoLogin();">登录</a>|' +
					'<a class="blackLink" href="javascript:void(0);" onclick="gotoRegister();">注册</a>';
			}

			topDomRight = topDomRight + '</div></ul>' +
				'</div></div></header>' +
				'<img src="' + html_path + '/img/index/vicky.jpg" class="img-responsive" />';
			$("body").prepend(topDomLeft + topDomRight);
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		async: false
	});

});

$(function() {
	var bottom = '<br /><br /><div class="bottomDiv"><div class="allWidth"><div>' +
		'<div class="floatLeft footPic"></div>' +
		'<div class="floatLeft">' +
		'<p>广播电视节目制作经营许可证：（粤）字第1248号</p>' +
		'<p>网络文化经营许可证：粤网文[2013]0480-056号</p>' +
		'<p>信息网络传播视听节目许可证：0910417</p>' +
		'</div>' +
		'<div class="floatLeft">' +
		'<p>互联网ICP备案： 粤ICP备16090012号-1</p>' +
		'<p>粤ICP证：粤B2-20100043</p>' +
		'</div>' +
		'<div class="floatRight">' +
		'<p>违法不良信息举报邮箱：help@livicky.com</p>' +
		'<p>违法不良信息举报电话：4000233233 转 3</p>' +
		'<i class="dianHuaBg"></i><a href="http://www.12377.cn/" target="_blank">中国互联网举报中心</a>' +
		'</div></div></div></div>';
	$("body").append(bottom);
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
	saveLastPage();
	window.location.href = html_path + "/user/login.html";
}

function gotoRegister() {
	saveLastPage();
	window.location.href = html_path + "/user/register.html";
}