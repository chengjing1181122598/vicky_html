$("img").lazyload({
	effect: "fadeIn"
});

var videoId = "";
var videoEntity = "";
var collectStatus = "";
var followStatus = "";
var collectContent = $(".collect").next();
var followContent = $("#followBtn");
$(function() {
	videoId = getUrlParam("videoId");
	loadVideo();
	loadCollectStatus();
	loadFollowStatus();

	collectContent.hover(function() {
		if(collectStatus === "yes") {
			collectContent.text("取消收藏");
		}
	});
	collectContent.mouseleave(function() {
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
});

function loadFollowStatus() {
	$.ajax({
		url: data_path + "/collectUser/isCollected",
		dataType: "json",
		data: {
			videoId: videoId,
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
	if(user === undefined) {
		saveLastPage();
		window.location.href = html_path + "/user/login.html";
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
		collectContent.text("已收藏");
	} else {
		$(".collect").removeClass("collected");
		$(".collect").addClass("uncollect");
		collectContent.text("收藏");
	}
}

function collectOrUncollect() {
	if(user === undefined) {
		saveLastPage();
		window.location.href = html_path + "/user/login.html";
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
				$(".signature").text(user.signature);
				$(".signature").attr("title", user.signature);
				$("#authorUsername").text(user.username);
			}
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

				$("video").attr("src", videoEntity.relativePath);
				$("video").attr("poster", videoEntity.coverRelativePath);
				window.document.title = videoEntity.videoTitle;
				$("#videoTitle").text(videoEntity.videoTitle);
				$("#videoExplain").text(videoEntity.videoExplain);
				$("#videoExplain").attr("title", videoEntity.videoExplain);
			}
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}