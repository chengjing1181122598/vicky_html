$(function() {
	if(user === undefined) {
		window.sessionStorage.lastPage = window.location.href;
		window.location.href = html_path + "/user/login.html";
	}
});