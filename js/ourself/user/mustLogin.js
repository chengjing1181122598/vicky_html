$(function() {
	console.info(user);
	if(user === undefined || user === null || user === "") {
		saveLastPage();
		window.location.href = html_path + "/user/login.html";
	}
});