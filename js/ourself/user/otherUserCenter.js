var pageSize = 8;
var submissionListSize;
var submissionCurPage = 1;
var collectListSize;
var collectCurPage = 1;
var followListSize;
var followCurPage = 1;
var otherUser = "";

$(function() {
	var username = getUrlParam("username");

	window.document.title = username;
	$.ajax({
		url: data_path + "/user/getById",
		data: {
			username: username
		},
		success: function(data) {
			if(data.status === successStatus) {
				otherUser = data.message.entity;
				setUserMessage();
				fillSubmissionList(1);
				fillCollectList(1);
				fillFollowList(1);
			}
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});

});

function fillSubmissionList(pageIndex) {
	$.ajax({
		url: data_path + "/video/getPageData",
		data: {
			pageIndex: pageIndex,
			pageSize: pageSize,
			condition_EQ_S_username: otherUser.username,
			order_property: "createTime",
			order_type: "desc"
		},
		success: function(data) {
			if(submissionListSize === undefined) {
				submissionListSize = data.total;
				initTabFenYe1();
			}

			var videoHengList = '<ul class="videoHengList">';
			$.each(data.data, function(i, item) {
				if(i >= 1 && i % 4 === 0) {
					videoHengList += '</ul><br/><ul class="videoHengList">';
				}
				videoHengList += '<li>' +
					'<a target="_blank" href="../video/watch.html?videoId=' + item.videoId + '" title="' + item.videoTitle + '">' +
					'<img src="' + item.coverRelativePath + '" class="videoCoverSize" /><br/>' +
					'<span class="videoTitle" title="' + item.videoTitle + '" >' + item.videoTitle + '</span></a></li>';
			});
			videoHengList += '</ul>';
			$("#submissionList").empty();
			$("#submissionList").append(videoHengList);
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function initTabFenYe1() {
	$('.tabFenYe1').empty();
	$('.tabFenYe1').pagination({
		jump: true,
		totalData: submissionListSize,
		showData: pageSize,
		callback: function(c) {
			submissionCurPage = c.getCurrent();
			fillSubmissionList(c.getCurrent());
		}
	}, function(c) {
		fillSubmissionList(submissionCurPage);
		c.filling(submissionCurPage);
	});
}

function fillCollectList(pageIndex) {
	$.ajax({
		url: data_path + "/collectVideo/getPageData",
		data: {
			pageIndex: pageIndex,
			pageSize: pageSize,
			condition_EQ_S_username: otherUser.username,
			order_property: "createTime",
			order_type: "desc"
		},
		success: function(data) {
			if(collectListSize === undefined) {
				collectListSize = data.total;
				initTabFenYe2();
			}

			var videoHengList = '<ul class="videoHengList">';
			$.each(data.data, function(i, item) {
				if(i >= 1 && i % 4 === 0) {
					videoHengList += '</ul><br/><ul class="videoHengList">';
				}
				videoHengList += '<li>' +
					'<a target="_blank" href="../video/watch.html?videoId=' + item.videoId + '" title="' + item.videoTitle + '">' +
					'<img src="' + item.coverRelativePath + '" class="videoCoverSize" /><br/>' +
					'<span class="videoTitle" title="' + item.videoTitle + '" >' + item.videoTitle + '</span></a></li>';
			});
			videoHengList += '</ul>';
			$("#collectList").empty();
			$("#collectList").append(videoHengList);
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function initTabFenYe2() {
	$('.tabFenYe2').empty();
	$('.tabFenYe2').pagination({
		jump: true,
		totalData: collectListSize,
		showData: pageSize,
		callback: function(c) {
			collectCurPage = c.getCurrent();
			fillCollectList(c.getCurrent());
		}
	}, function(c) {
		fillCollectList(collectCurPage);
		c.filling(collectCurPage);
	});
}

function fillFollowList(pageIndex) {
	$.ajax({
		url: data_path + "/collectUser/getList",
		data: {
			pageIndex: pageIndex,
			pageSize: pageSize,
			username: otherUser.username
		},
		success: function(data) {
			if(followListSize === undefined) {
				followListSize = data.total;
				initTabFenYe3();
			}

			var followHengList = '<ul class="videoHengList">';
			$.each(data.data, function(i, item) {
				if(i >= 1 && i % 4 === 0) {
					followHengList += '</ul><br/><ul class="videoHengList">';
				}
				followHengList += '<li>' +
					'<a target="_blank" href="../user/otherUserCenter.html?username=' + item.username + '" title="' + item.username + '">' +
					'<img src="' + item.relativePath + '" class="followHeadSize" /><br/>' +
					'<span class="videoTitle" title="' + item.username + '" >' + item.username + '</span></a></li>';
			});
			followHengList += '</ul>';
			$("#followList").empty();
			$("#followList").append(followHengList);
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function initTabFenYe3() {
	$('.tabFenYe3').empty();
	$('.tabFenYe3').pagination({
		jump: true,
		totalData: followListSize,
		showData: pageSize,
		callback: function(c) {
			followCurPage = c.getCurrent();
			fillFollowList(c.getCurrent());
		}
	}, function(c) {
		fillFollowList(followCurPage);
		c.filling(followCurPage);
	});
}

function setUserMessage() {
	console.info(otherUser);
	$("h2").text(otherUser.username);
	$(".bigHeadImage ").attr("src", otherUser.relativePath);
	$("#selectSex").val(otherUser.sex);
	if(otherUser.sex === null) {
		$("#selectSex").val("保密");
	}

	$("input[name='signature']").val(otherUser.signature);

	if(otherUser.sex === "男") {
		$(".icon").removeClass("secret").removeClass("female").addClass("male");
	} else if(otherUser.sex === "女") {
		$(".icon").removeClass("secret").removeClass("male").addClass("female");
	} else {
		$(".icon").removeClass("female").removeClass("male").addClass("secret");
	}
}