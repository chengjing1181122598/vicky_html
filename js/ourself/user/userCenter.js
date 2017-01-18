var pageSize = 2;
var submissionListSize;
var submissionCurPage = 1;
var collectListSize;
var collectCurPage = 1;
var followListSize;
var followCurPage = 1;
var messageListSize;
var messageCurPage = 1;

$(function() {
	$("img").lazyload({
		effect: "fadeIn"
	});
	$("#headImage").prev().text("更改头像");
	$("#tab2").attr("checked", "checked");
	window.document.title = user.username;
	$("h2").text(user.username);
	setUserMessage();

	fillSubmissionList(1);
	fillCollectList(1);
	fillFollowList(1);
	fillMessageList(1);

});

function fillSubmissionList(pageIndex) {
	$.ajax({
		url: data_path + "/video/getPageData",
		data: {
			pageIndex: pageIndex,
			pageSize: pageSize,
			username: user.username,
			order_property: "createTime",
			order_type: "desc"
		},
		success: function(data) {
			if(submissionListSize === undefined) {
				submissionListSize = data.total;
				initTabFenYe1();
			}

			$.each(data.data, function(i, item) {

			});
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function initTabFenYe1() {
	$('.tabFenYe1').pagination({
		jump: true,
		totalData: submissionListSize,
		showData: pageSize,
		callback: function(c) {
			submissionCurPage = c.getCurrent();
			fillSubmissionList(c.getCurrent());
		}
	}, function(c) {
		c.filling(2);
	});
}

function fillCollectList(pageIndex) {
	$.ajax({
		url: data_path + "/collectVideo/getPageData",
		data: {
			pageIndex: pageIndex,
			pageSize: pageSize,
			username: user.username,
			order_property: "createTime",
			order_type: "desc"
		},
		success: function(data) {
			if(collectListSize === undefined) {
				collectListSize = data.total;
				initTabFenYe2();
			}

			$.each(data.data, function(i, item) {

			});
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function initTabFenYe2() {
	$('.tabFenYe2').pagination({
		jump: true,
		totalData: collectListSize,
		showData: pageSize,
		callback: function(c) {
			collectCurPage = c.getCurrent();
			fillCollectList(c.getCurrent());
		}
	});
}

function fillFollowList(pageIndex) {
	$.ajax({
		url: data_path + "/collectUser/getList",
		data: {
			pageIndex: pageIndex,
			pageSize: pageSize,
			username: user.username
		},
		success: function(data) {
			if(followListSize === undefined) {
				followListSize = data.total;
				initTabFenYe3();
			}

			$.each(data.data, function(i, item) {

			});
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function initTabFenYe3() {
	$('.tabFenYe3').pagination({
		jump: true,
		totalData: followListSize,
		showData: pageSize,
		callback: function(c) {
			followCurPage = c.getCurrent();
			fillFollowList(c.getCurrent());
		}
	});
}

function fillMessageList(pageIndex) {
	$.ajax({
		url: data_path + "/message/getPageData",
		data: {
			pageIndex: pageIndex,
			pageSize: pageSize,
			username: user.username,
			order_property: "createTime",
			order_type: "desc"
		},
		success: function(data) {
			if(messageListSize === undefined) {
				messageListSize = data.total;
				initTabFenYe4();
			}

			$.each(data.data, function(i, item) {

			});
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function initTabFenYe4() {
	$('.tabFenYe4').pagination({
		jump: true,
		totalData: messageListSize,
		showData: pageSize,
		callback: function(c) {
			messageCurPage = c.getCurrent();
			fillMessageList(c.getCurrent());
		}
	});
}

$('#headImage').fileinput({
	showPreview: false,
	language: 'zh',
	uploadUrl: data_path + "/user/updateHead",
	allowedFileExtensions: ['jpg', 'png', 'gif', 'jpeg'],
});

$("#headImage").on("fileuploaded", function(event, data, previewId, index) {
	data = data.response;
	if(data.status === successStatus) {
		user = data.message.entity;
		setLoginUser(user);
		$("#tip").modal("show");
	} else {
		$(".redTip").text(data.message.message);
	}
});

$("#headImage").change(function() {
	var objUrl = getObjectURL(this.files[0]);
	console.log("objUrl = " + objUrl);
	if(objUrl) {
		$(".bigHeadImage").attr("src", objUrl);
	}
});
//建立一個可存取到該file的url
function getObjectURL(file) {
	var url = null;
	if(window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(file);
	} else if(window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if(window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}

$("#tip").on("hide.bs.modal", function() {
	window.location.reload();
});

function update() {
	$.ajax({
		url: data_path + "/user/update",
		data: $("form").serialize(),
		success: function(data) {
			if(data.status === successStatus) {
				user = data.message.entity;
				setLoginUser(user);
				$("#tip").modal("show");
			} else {
				$(".redTip").text(data.message.message);
			}
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});

}

function showSex() {
	$("select").css("display", "inline-block");
}

$(document).bind('click', function(e) {
	var e = e || window.event; //浏览器兼容性 
	var elem = e.target || e.srcElement;
	while(elem) { //循环判断至跟节点，防止点击的是div子元素 
		if(elem.id && (elem.id == 'selectSex' || elem.id == 'showSex')) {
			return;
		}
		elem = elem.parentNode;
	}

	$('#selectSex').css('display', 'none'); //点击的不是div或其子元素 
});

function setUserMessage() {
	$(".bigHeadImage ").attr("src", user.relativePath);
	$("#selectSex").val(user.sex);
	$("input[name='signature']").val(user.signature);
	if(user.sex === male) {
		$(".secret").removeClass("secret").removeClass("female").addClass("male");
	} else if(user.sex === female) {
		$(".secret").removeClass("secret").removeClass("male").addClass("female");
	} else {
		$(".secret").removeClass("female").removeClass("male").addClass("secret");
	}
}