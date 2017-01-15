$(function() {
	if(user === undefined) {
		saveLastPage();
		window.location.href = html_path + "/user/login.html";
	}
});