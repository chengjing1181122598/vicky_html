var user;
$(function() {
	var topDomLeft = '<header class="myTop"><div>' +
		'<div class="allWidth">' +
		'<div class="floatLeft">' +
		'<a target="_self" class="blackLink" href="' + html_path + '/index.html"><img src="' + html_path + '/favicon.ico" height="20" />主站</a>' +
		'</div>';
	var topDomRight =
		'<div class="floatRight"><ul class="topHengList">';

	user = getLoginUser();
	//	console.info(user);

	if(user !== null && user !== "") {

		var headImage = '<li><a target="_blank" title="' + user.username + '" class="hover" href="' + html_path + '/user/userCenter.html">' +
			'<img class="topHeadImage" src="' + user.relativePath + '"/></a></li>';
		var message = '<li><a target="_blank" id="topMessage" class="blackLink" href="' + html_path + '/user/userCenter.html?tabType=tab4">消息 </a></li>';
		var collect = '<li><a target="_blank" class="blackLink" href="' + html_path + '/user/userCenter.html?tabType=tab2">收藏夹</a></li>';
		var publish = '<li><a target="_blank" class="blackLink" href="' + html_path + '/video/uploadVideo.html' + '">投稿</a></li>';
		var logout = '<li><a class="blackLink" href="javascript:void(0);" onclick="logout();">退出</a></li>';
		topDomRight += headImage + message + collect + publish + logout;
		loadMessageNotifyNumber();
	} else {
		topDomRight += '<a class="blackLink" href="javascript:void(0);" onclick="gotoLogin();">登录</a>|' +
			'<a class="blackLink" href="javascript:void(0);" onclick="gotoRegister();">注册</a>';
	}

	topDomRight = topDomRight + '</div></ul>' +
		'</div></div></header>' +
		'<img src="' + html_path + '/img/index/vicky.jpg" class="img-responsive" />';
	$(".mainContainer").prepend(topDomLeft + topDomRight);

});

$(function() {
	var bottom = '<footer class="bottomDiv"><div class="allWidth"><div>' +
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
		'</div></div></div></footer>';
	$(".mainContainer").after(bottom);
});

function loadMessageNotifyNumber() {
	$.ajax({
		url: data_path + "/message/getPageData",
		data: {
			pageIndex: 1,
			pageSize: 999,
			condition_EQ_S_username: user.username,
			condition_EQ_S_status: "001"
		},
		success: function(data) {
			var notifyNumber = 0;
			var nowDate = new Date().getTime();
			$.each(data.data, function(i, item) {
				if((nowDate - item.createTime) <= 7 * 24 * 60 * 60 * 1000) {
					notifyNumber++;
				}
			});
			console.info(notifyNumber);
			if(notifyNumber > 0) {
				$("#topMessage").append('<span class="badge" style="background-color: rgb(255, 20, 147);vertical-align: baseline;">' + notifyNumber + '</span>');
			}
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function logout() {
	$.ajax({
		type: "get",
		url: data_path + "/user/logout",
		dataType: "json",
		success: function(data) {
			clearLoginUser();
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