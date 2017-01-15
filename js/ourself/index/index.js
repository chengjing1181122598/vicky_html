$(function() {
	$('#myCarousel').carousel({
		interval: 5000
	});

	$("img").lazyload({
		effect: "fadeIn"
	});
});

/*
 * 加载右侧推荐
 */
$(function() {
	$.ajax({
		url: data_path + "/video/getPageData",
		dataType: "json",
		data: {
			pageIndex: 1,
			pageSize: 6,
			condition_EQ_S_moduleId: "001"
		},
		success: function(data) {
			$.each(data.data, function(i, item) {
				$("#youCeTuJianA" + i).attr("href", "video/watch.html?videoId=" + item.videoId);
				$("#youCeTuiJianImg" + i).attr("src", item.coverRelativePath);
				$("#youCeTuJianSpan" + i).text(item.videoTitle);
				$("#youCeTuJianSpan" + i).attr("title", item.videoTitle);
			});
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
});

/*
 * 加载分类视频
 */
$(function() {
	loadModuleList("001");
	loadModuleList("002");
	loadModuleList("003");
	loadModuleList("004");
	loadModuleList("005");
	loadModuleList("006");
	loadModuleList("007");
	loadModuleList("008");
	loadModuleList("009");
	loadModuleList("010");
	loadModuleList("011");
	loadModuleList("012");
});

/*
 * 
 */
function loadModuleList(moduleId) {
	$.ajax({
		url: data_path + "/video/getPageData",
		dataType: "json",
		data: {
			pageIndex: 1,
			pageSize: 10,
			condition_EQ_S_moduleId: moduleId
		},
		success: function(data) {
			$.each(data.data, function(i, item) {
				var videoHengList = '<ul class="videoHengList">';
				$.each(data.data, function(i, item) {
					if(i % 5 === 0) {
						videoHengList += '</ul><br/><ul class="videoHengList">';
					}
					videoHengList += '<li><a target="_blank" href="video/watch.html?videoId=' + item.videoId + '" title="' + item.videoTitle + '">' +
						'<div><img src="' + item.coverRelativePath + '" class="videoCoverSize" /></div>' +
						'<span class="videoTitle" title="' + item.videoTitle + '" >' + item.videoTitle + '</span></a></li>';
				});
				videoHengList += '</ul>';
				$("#moduleList" + moduleId).empty();
				$("#moduleList" + moduleId).append(videoHengList);
			});
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
}

/*
 * 加载轮播图
 */
$(function() {
	$.ajax({
		url: data_path + "/video/getSlipeData",
		dataType: "json",
		success: function(data) {
			$.each(data.data, function(i, item) {
				$("#lunBoTuHref" + i).attr("href", "video/watch.html?videoId=" + item.videoId);
				$("#lunBoTuSrc" + i).attr("src", item.coverRelativePath);
				$("#lunBoTuTitle" + i).text(item.videoTitle);
			});
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
});

/*
 * 加载分类导航栏数量
 */
$(function() {
	$.ajax({
		url: data_path + "/video/getPerSize",
		dataType: "json",
		success: function(data) {
			if(data.status === successStatus) {
				var entity = data.message.entity;
				var total = 0;
				var badges = $(".badge").toArray();
				$.each(entity, function(i, item) {
					total += item.size;
					if(item.size <= 999) {
						badges[i + 1].innerHTML = item.size + "";
					} else {
						badges[i + 1].innerHTML = "999+";
					}
					badges[i + 1].title = item.size + "";
				});
				if(total <= 999) {
					badges[0].innerHTML = total + "";
				} else {
					badges[0].innerHTML = "999+";
				}
				badges[0].title = total + "";
			}
		},
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	});
});