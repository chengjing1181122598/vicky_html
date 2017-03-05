var pageSize = 8;
var submissionListSize;
var submissionCurPage = 1;
var collectListSize;
var collectCurPage = 1;
var followListSize;
var followCurPage = 1;
var messageListSize;
var messageCurPage = 1;
var submissionDeleteType = "delS";
var collectDeleteType = "delC";
var followDeleteType = "delF";
var messageDeleteType = "delM";
var currentDeleteType;
var currentDeleteParam;

$(function() {
	$("#headImage").prev().text("选择图片");

	fillSubmissionList(1);
	fillCollectList(1);
	fillFollowList(1);
	fillMessageList(1);

	window.document.title = user.username;
	//	console.info(user);
	setUserMessage();

	var tabType = getUrlParam("tabType");
	if(tabType !== null) {
		$('html,body').animate({
			scrollTop: $(".tabs").offset().top
		}, 1000, function() {
			$("#" + tabType).attr("checked", "checked");
		});
	}
});

function fillSubmissionList(pageIndex) {
	$.ajax({
		url: data_path + "/video/getPageData",
		data: {
			pageIndex: pageIndex,
			pageSize: pageSize,
			condition_EQ_S_username: user.username,
			order_property: "createTime",
			order_type: "desc"
		},
		success: function(data) {
			if(submissionListSize === undefined) {
				submissionListSize = data.total;
				initTabFenYe1();
			}
			var videoHengList = "";
			if(data.total === 0) {
				videoHengList = "<div class='emptyList'>空间主人还没有投过视频哦~~</div>";
			} else {
				videoHengList += '<ul class="videoHengList">';
				$.each(data.data, function(i, item) {
					if(i >= 1 && i % 4 === 0) {
						videoHengList += '</ul><br/><ul class="videoHengList">';
					}
					videoHengList += '<li>' +
						'<button type="button" onclick=prepareDelete("' + submissionDeleteType + '","' + item.videoId + '"); class="btn btn-danger delelte">删除</button>' +
						'<a target="_blank" href="../video/watch.html?videoId=' + item.videoId + '" title="' + item.videoTitle + '">' +
						'<img src="' + item.coverRelativePath + '" class="videoCoverSize" /><br/>' +
						'<span class="videoTitle" title="' + item.videoTitle + '" >' + item.videoTitle + '</span></a></li>';
				});
				videoHengList += '</ul>';
			}
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
	if(!(submissionListSize > 0)) {
		$('.tabFenYe1').empty();
	}
}

function fillCollectList(pageIndex) {
	$.ajax({
		url: data_path + "/collectVideo/getPageData",
		data: {
			pageIndex: pageIndex,
			pageSize: pageSize,
			condition_EQ_S_username: user.username,
			order_property: "createTime",
			order_type: "desc"
		},
		success: function(data) {
			if(collectListSize === undefined) {
				collectListSize = data.total;
				initTabFenYe2();
			}

			var videoHengList = "";
			if(data.total === 0) {
				videoHengList += "<div class='emptyList'>空间主人还没有收藏过视频哦~~</div>";
			} else {
				videoHengList += '<ul class="videoHengList">';
				$.each(data.data, function(i, item) {
					if(i >= 1 && i % 4 === 0) {
						videoHengList += '</ul><br/><ul class="videoHengList">';
					}
					videoHengList += '<li>' +
						'<button type="button" onclick=prepareDelete("' + collectDeleteType + '","' + item.videoId + '"); class="btn btn-danger delelte">删除</button>' +
						'<a target="_blank" href="../video/watch.html?videoId=' + item.videoId + '" title="' + item.videoTitle + '">' +
						'<img src="' + item.coverRelativePath + '" class="videoCoverSize" /><br/>' +
						'<span class="videoTitle" title="' + item.videoTitle + '" >' + item.videoTitle + '</span></a></li>';
				});
				videoHengList += '</ul>';
			}
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
	if(!(collectListSize > 0)) {
		$('.tabFenYe2').empty();
	}
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

			var followHengList = "";
			if(data.total === 0) {
				followHengList += "<div class='emptyList'>空间主人还没有关注过其他用户哦~~</div>";
			} else {
				followHengList += '<ul class="videoHengList">';
				$.each(data.data, function(i, item) {
					if(i >= 1 && i % 4 === 0) {
						followHengList += '</ul><br/><ul class="videoHengList">';
					}
					followHengList += '<li>' +
						'<button type="button" onclick=prepareDelete("' + followDeleteType + '","' + item.username + '"); class="btn btn-danger delelte">删除</button>' +
						'<a target="_blank" href="../user/otherUserCenter.html?username=' + item.username + '" title="' + item.username + '">' +
						'<img src="' + item.relativePath + '" class="followHeadSize" /><br/>' +
						'<span class="videoTitle" title="' + item.username + '" >' + item.username + '</span></a></li>';
				});
				followHengList += '</ul>';
			}
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
	if(!(followListSize > 0)) {
		$('.tabFenYe3').empty();
	}
}

function fillMessageList(pageIndex) {
	$.ajax({
		url: data_path + "/message/getPageData",
		data: {
			pageIndex: pageIndex,
			pageSize: pageSize,
			condition_EQ_S_username: user.username,
			order_property: "createTime",
			order_type: "desc"
		},
		success: function(data) {
			if(messageListSize === undefined) {
				messageListSize = data.total;
				initTabFenYe4();
			}

			var messageList = "";
			if(data.total === 0) {
				messageList += "<div class='emptyList'>已经没有消息可读了~~</div>";
			} else {
				$.each(data.data, function(i, item) {
					var messageStatus = "";
					var nowDate = new Date().getTime();
					if(item.status === "001" && (nowDate - item.createTime) <= 7 * 24 * 60 * 60 * 1000) {
						messageStatus = '<span class="badge" style="font-size:15px;">新</span>';
					}
					var content = item.content.replace(/ /g,"&nbsp;");
					messageList += '<a href="javascript:void(0);" ' +
						'onclick=showMessage("' + messageDeleteType + '","' + item.messageId + '","' + item.messageTitle + '",\'' + content + '\'' + ');' +
						' class="list-group-item hide-text">' +
						'<span style="font-size: 18px;">' + item.messageTitle + '</span>&nbsp;&nbsp;' +
						'<span style="font-size: 14px;">' + item.content + '</span>' +
						messageStatus +
						'</a>';
				});
			}
			$("#messageList").empty();
			$("#messageList").append(messageList);
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

function initTabFenYe4() {
	$('.tabFenYe4').empty();
	$('.tabFenYe4').pagination({
		jump: true,
		totalData: messageListSize,
		showData: pageSize,
		callback: function(c) {
			messageCurPage = c.getCurrent();
			fillMessageList(c.getCurrent());
		}
	}, function(c) {
		fillMessageList(messageCurPage);
		c.filling(messageCurPage);
	});
	if(!(messageListSize > 0)) {
		$('.tabFenYe4').empty();
	}

}

function showMessage(deleteType, deleteParam, messageTitle, content) {
	$.ajax({
		url: data_path + "/message/read",
		data: {
			primaryKey: deleteParam
		},
		success: function(data) {
			if(data.status === successStatus) {
				initTabFenYe4();
			}
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
	console.info(deleteType);
	console.info(deleteParam);
	currentDeleteType = deleteType;
	currentDeleteParam = deleteParam;
	$("#messageTitle").text(messageTitle);
	$("#messageContent").text(content);
	$("#messageWindow").modal("show");
}

function prepareDelete(deleteType, deleteParam) {
	console.info(deleteType);
	console.info(deleteParam);
	currentDeleteType = deleteType;
	currentDeleteParam = deleteParam;
	$("#deleteTip").modal("show");
}

function finishDelete() {
	console.info(currentDeleteType);
	console.info(currentDeleteParam);
	var url = data_path;
	var data = "";
	switch(currentDeleteType) {
		case submissionDeleteType:
			url += "/video/deleteById";
			data = {
				primaryKey: currentDeleteParam
			};
			break;
		case collectDeleteType:
			url += "/collectVideo/uncollect";
			data = {
				videoId: currentDeleteParam
			};
			break;
		case followDeleteType:
			url += "/collectUser/uncollect";
			data = {
				collectedUsername: currentDeleteParam
			};
			break;
		case messageDeleteType:
			url += "/message/deleteById";
			data = {
				primaryKey: currentDeleteParam
			};
			break;
		default:
			return;
	}
	$.ajax({
		url: url,
		data: data,
		success: function(data) {
			if(data.status === successStatus) {
				switch(currentDeleteType) {
					case submissionDeleteType:
						submissionListSize--;
						if(submissionListSize % pageSize === 0) {
							submissionCurPage--;
						}
						initTabFenYe1();
						break;
					case collectDeleteType:
						collectListSize--;
						if(collectListSize % pageSize === 0) {
							collectCurPage--;
						}
						initTabFenYe2();
						break;
					case followDeleteType:
						followListSize--;
						if(followListSize % pageSize === 0) {
							followCurPage--;
						}
						initTabFenYe3();
						break;
					case messageDeleteType:
						messageListSize--;
						if(messageListSize % pageSize === 0) {
							messageCurPage--;
						}
						initTabFenYe4();
						break;
				}
			} else {
				$(".redTip").text(data.message.message);
			}
			$("#deleteTip").modal("hide");
			$("#messageWindow").modal("hide");
			currentDeleteType = undefined;
			currentDeleteParam = undefined;
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

$('#headImage').fileinput({
	showPreview: false,
	showUpload: false,
	showRemove: false,
	language: 'zh'
		//	uploadUrl: data_path + "/user/updateHead",
		//	allowedFileExtensions: ['jpg', 'png', 'gif', 'jpeg']
});

$(function() {
	var clipArea = new bjj.PhotoClip("#clipArea", {
		size: [300, 300],
		outputSize: [300, 300],
		file: "#headImage",
		//				view: "#view",
		ok: "#clipBtn",
		loadStart: function() {
			console.log("照片读取中");
		},
		loadComplete: function() {
			console.log("照片读取完成");
		},
		clipFinish: function(dataURL) {
			//			console.log(dataURL);
			$(".bigHeadImage").attr("src", dataURL);
			var url = $("#headImage").val();
			var filename = "";
			if(url.indexOf("/") != -1) {
				filename = url.substring(url.lastIndexOf("/") + 1, url.length);
			}
			if(url.indexOf("\\") != -1) {
				filename = url.substring(url.lastIndexOf("\\") + 1, url.length);
			}
			$.ajax({
				type: "post",
				url: data_path + "/user/updateHead",
				data: {
					headImage: dataURL,
					imageName: filename
				},
				success: function(data) {
					if(data.status === successStatus) {
						user = data.message.entity;
						setLoginUser(user);
//						setUserMessage();
						$(".topHeadImage").attr("src", user.relativePath);
						$("#headImgCut").modal("hide");
					}
				},
				dataType: "json",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true
			});
		}
	});
});

//$("#headImage").on("fileuploaded", function(event, data, previewId, index) {
//	data = data.response;
//	if(data.status === successStatus) {
//		user = data.message.entity;
//		setLoginUser(user);
//		$("#updateTip").modal("show");
//		//		$(".fileinput-remove-button").trigger("click");
//	} else {
//		$(".redTip").text(data.message.message);
//	}
//});

//$('#headImage').on('filecleared', function(event, data, previewId, index) {
//	setUserMessage();
//});

//$("#headImage").change(function() {
//	
//
//	//	var objUrl = getObjectURL(this.files[0]);
//	//	console.log("objUrl = " + objUrl);
//	//	if(objUrl) {
//	//		$(".bigHeadImage").attr("src", objUrl);
//	//	}
//});
////建立一個可存取到該file的url
//function getObjectURL(file) {
//	var url = null;
//	if(window.createObjectURL != undefined) { // basic
//		url = window.createObjectURL(file);
//	} else if(window.URL != undefined) { // mozilla(firefox)
//		url = window.URL.createObjectURL(file);
//	} else if(window.webkitURL != undefined) { // webkit or chrome
//		url = window.webkitURL.createObjectURL(file);
//	}
//	return url;
//}

//$("#updateTip").on("hide.bs.modal", function() {
//	$(".fileinput-remove-button").trigger("click");
//});

function update() {
	$.ajax({
		url: data_path + "/user/update",
		data: $("form").serialize(),
		success: function(data) {
			if(data.status === successStatus) {
				user = data.message.entity;
				setLoginUser(user);
				$("#updateTip").modal("show");
				setUserMessage();
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
	$("h2").text(user.username);
	console.info(user.relativePath);
	$(".bigHeadImage").attr("src", user.relativePath);
	$("#selectSex").val(user.sex);
	if(user.sex === null) {
		$("#selectSex").val("保密");
	}

	$("input[name='signature']").val(user.signature);

	if(user.sex === "男") {
		$(".icon").removeClass("secret").removeClass("female").addClass("male");
	} else if(user.sex === "女") {
		$(".icon").removeClass("secret").removeClass("male").addClass("female");
	} else {
		$(".icon").removeClass("female").removeClass("male").addClass("secret");
	}
}