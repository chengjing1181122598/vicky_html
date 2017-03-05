var videoId = "";
var videoEntity = "";
var collectStatus = "";
var followStatus = "";
var collectBtn = $("#collectBtn");
var followContent = $("#followBtn");
$(function() {
	console.info(user);
	videoId = getUrlParam("videoId");
	loadVideo();
	loadCollectStatus();
	loadComment();
	loadPlayNumber();
	incrementNumber();

	collectBtn.hover(function() {
		if(collectStatus === "yes") {
			collectBtn.text("取消收藏");
		}
	});
	collectBtn.mouseleave(function() {
		changeCollect();
	});

	followContent.hover(function() {
		if(followStatus === "yes") {
			followContent.text("取消关注");
		}
	});
	followContent.mouseleave(function() {
		changeFollow();
	});

	if(user !== null && user !== undefined) {
		$(".saveComment").removeAttr("disabled");
		$(".commentHeadImg").attr("src", user.relativePath);
		$(".saveComment").html("发表<br/>评论");
	}
});

function loadFollowStatus() {
	$.ajax({
		url: data_path + "/collectUser/isCollected",
		dataType: "json",
		data: {
			username: videoEntity.username
		},
		success: function(data) {
			if(data.message.message === "yes") {
				followStatus = "yes";
			} else {
				followStatus = "no";
			}
			changeFollow();
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function changeFollow() {
	if(followStatus === "yes") {
		followContent.text("已关注");
		followContent.css("background-color", "red");
	} else {
		followContent.text("关注");
		followContent.css("background-color", "#00b5e5");
	}
}

function followOrUnfollow() {
	if(user === null) {
		saveLastPage();
		window.location.href = "../user/login.html";
	} else {
		var url = "";
		if(followStatus === "yes") {
			url = data_path + "/collectUser/uncollect";
		} else {
			url = data_path + "/collectUser/collect";
		}
		$.ajax({
			url: url,
			dataType: "json",
			data: {
				collectedUsername: videoEntity.username,
			},
			success: function(data) {
				loadFollowStatus();
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true
		});
	}
}

function loadCollectStatus() {
	loadCollectNumber();
	$.ajax({
		url: data_path + "/collectVideo/isCollected",
		dataType: "json",
		data: {
			videoId: videoId,
		},
		success: function(data) {
			if(data.message.message === "yes") {
				collectStatus = "yes";
			} else {
				collectStatus = "no";
			}
			changeCollect();
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function changeCollect() {
	if(collectStatus === "yes") {
		$(".collect").removeClass("uncollect");
		$(".collect").addClass("collected");
		collectBtn.html("已收藏");
	} else {
		$(".collect").removeClass("collected");
		$(".collect").addClass("uncollect");
		collectBtn.html("收藏");
	}
}

function loadCollectNumber() {
	$.ajax({
		url: data_path + "/collectVideo/getPageData",
		dataType: "json",
		data: {
			condition_EQ_S_videoId: videoId,
			pageIndex: 1,
			pageSize: 1
		},
		success: function(data) {
			$(".collectNumber").text(data.total);
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function loadPlayNumber() {
	$.ajax({
		url: data_path + "/videoPlayNumber/getPlayNumber",
		dataType: "json",
		data: {
			videoId: videoId
		},
		success: function(data) {
			if(data.status === successStatus) {
				$(".playNumberText").text(data.message.entity.number);
			}
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function incrementNumber() {
	$.ajax({
		url: data_path + "/videoPlayNumber/increment",
		dataType: "json",
		data: {
			videoId: videoId
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function collectOrUncollect() {
	if(user === null) {
		saveLastPage();
		window.location.href = "../user/login.html";
	} else {
		var url = "";
		if(collectStatus === "yes") {
			url = data_path + "/collectVideo/uncollect";
		} else {
			url = data_path + "/collectVideo/collect";
		}
		$.ajax({
			url: url,
			dataType: "json",
			data: {
				videoId: videoId,
			},
			success: function(data) {
				loadCollectStatus();
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true
		});
	}
}

function loadAuthor() {
	loadAuthorVideoNumber();
	$.ajax({
		url: data_path + "/user/getById",
		dataType: "json",
		data: {
			username: videoEntity.username,
		},
		success: function(data) {
			if(data.status === successStatus) {
				var user = data.message.entity;
				$(".touXiang").attr("src", user.relativePath);
				if(user.signature !== null) {
					$(".signature").text(user.signature);
					$(".signature").attr("title", user.signature);
				}
				$("#authorUsername").text(user.username);
				$("#authorUsername").attr("href", "../user/otherUserCenter.html?username=" + user.username);
			}
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function loadAuthorVideoNumber() {
	$.ajax({
		url: data_path + "/video/getPageData",
		dataType: "json",
		data: {
			pageIndex: 1,
			pageSize: 1,
			condition_EQ_S_username: videoEntity.username,
		},
		success: function(data) {
			console.info(data);
			$("#videoNumbers").text("投稿：" + data.total);
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function loadVideo() {
	$.ajax({
		url: data_path + "/video/getById",
		dataType: "json",
		data: {
			primaryKey: videoId,
		},
		success: function(data) {
			if(data.status === successStatus) {
				videoEntity = data.message.entity;
				loadAuthor();
				loadFollowStatus();

				$("video").attr("src", videoEntity.relativePath);
				$("video").attr("poster", videoEntity.coverRelativePath);
				window.document.title = videoEntity.videoTitle;
				$("#videoTitle").text(videoEntity.videoTitle);
				$("#videoExplain").text(videoEntity.videoExplain);
				$("#videoExplain").attr("title", videoEntity.videoExplain);
				$(".createTime").text(new Date(videoEntity.createTime).format("yyyy-MM-dd hh:mm:ss"));
			}
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

var commentPerSize = 10;
var commentCurPage = 1;
var commentListSize;
var isInit = false;
var delFloorId;

function loadComment(pageIndex) {
	$.ajax({
		url: data_path + "/commentFloor/getList",
		dataType: "json",
		data: {
			videoId: videoId,
			pageIndex: pageIndex,
			pageSize: commentPerSize
		},
		success: function(data) {
			if(data.data.length >= 5) {
				$("#secondCommentForm").show();
			} else {
				$("#secondCommentForm").hide();
			}

			if(commentListSize === undefined) {
				commentListSize = data.total;
				if(data.total > 0) {
					initFenYe(commentListSize);
				}
			}

			var commentList = "";
			if(data.total === 0) {
				commentList = "<div class='emptyList'>目前还没有评论，赶紧抢一楼吧</div>";
			} else {
				$.each(data.data, function(i, item) {
					var isSelf = "";
					try {
						if(item.username === user.username) {
							isSelf = '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a class="deleteComment" href="javascript:void(0);" onclick=prepareDelete("' + item.floorId + '");>删除</a>';
						}
					} catch(e) {}

					commentList += '<li style="list-style-type: none;">' +
						'<img src="' + item.relativePath + '" class="commentHeadImg" style="position: absolute;" />' +
						'<span style="margin-left: 90px;">' +
						'<a target="_blank" href="../user/otherUserCenter.html?username=' + item.username + '" class="commentUsername">' + item.username + '</a>' +
						isSelf + '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;第' + (i + 1 + (commentCurPage - 1) * commentPerSize) + '楼&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;' + (new Date(item.createTime).format("yyyy-MM-dd hh:mm:ss"))+
						'</span><br />' +
						'<span style="margin-left: 90px;display: inline-block;width: 680px;">' + item.content + '</span>' +
						'</li><br/>' +
						'<hr />';
				});
			}
			$("#commentContent").empty();
			$("#commentContent").append(commentList);
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function initFenYe() {
	$('.M-box').empty();
	$('.M-box').pagination({
		jump: true,
		totalData: commentListSize,
		showData: commentPerSize,
		callback: function(c) {
			commentCurPage = c.getCurrent();
			loadComment(commentCurPage);
		}
	}, function(c) {
		if(isInit) {
			loadComment(commentCurPage);
			c.filling(commentCurPage);
		}
		isInit = true;
	});
	if(!(commentListSize > 0)) {
		$('.M-box').empty();
	}
}

function saveComment(from) {
	var content = "";
	if(from === 1) {
		content = $("#content1").val();
	}
	if(from === 2) {
		content = $("#content2").val();
	}

	$.ajax({
		url: data_path + "/commentFloor/save",
		dataType: "json",
		data: {
			videoId: videoId,
			content: content
		},
		success: function(data) {
			if(data.status === successStatus) {
				commentListSize++;
				isInit = true;
				initFenYe();
				$("#saveTip").modal("show");
			}
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
	return false;

}

function prepareDelete(floorId) {
	delFloorId = floorId;
	$("#deleteTip").modal("show");
}

function finishDelete() {
	$.ajax({
		url: data_path + "/commentFloor/deleteById",
		dataType: "json",
		data: {
			primaryKey: delFloorId
		},
		success: function(data) {
			if(data.status === successStatus) {
				commentListSize--;
				if(commentListSize % commentPerSize === 0) {
					commentCurPage--;
					if(commentCurPage === 0) {
						commentCurPage = 1;
					}
				}
				initFenYe();
			}
			delFloorId = undefined;
			$("#deleteTip").modal("hide");
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}