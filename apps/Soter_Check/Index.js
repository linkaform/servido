window.onload = function(){
	const statusSession = getSession('login');
	if(statusSession == 'Active'){
		console.log('Sesión activa')
		loadComponent('content-wrapper', './login.html')
	}else{
		console.log('Sessión no activa')
		loadComponent('content-wrapper', './login.html')
	}
}


