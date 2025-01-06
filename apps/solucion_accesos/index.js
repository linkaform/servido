window.onload = function(){
	let protocol = window.location.protocol;
	let host = window.location.host;
	window.location.href =`${protocol}//${host}/login.html`;
}