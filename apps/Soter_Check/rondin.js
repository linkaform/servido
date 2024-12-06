window.onload = function(){
	const statusSession = getSession('login');
	/*
	if(statusSession == 'Active'){
		resquestLocation();
		resquestLocation();
	}else{
		//----Cookie
        const LOCATION = getParameterURL('location');
        setCookie("locationOrigin", LOCATION, 7);
        //----Url
        const protocolo = window.location.protocol;    
        const hostname = window.location.hostname;      
        const puerto = window.location.port;            
        //---URL REDIRECTION LOGIN
        let urlRedirection = `${protocolo}//${hostname}:${puerto}/Soter_Check/Login.html`
        window.location.href = urlRedirection;
	}*/
	const componentTitle = document.getElementById('textLocation');
	const componentTime = document.getElementById('textTime');
	componentTitle.textContent = 'Caseta';
	componentTime.textContent = `Ultima inspección hace 2 días`;


	setTimeout(() => {
		const loading = document.getElementById('loading');
		const mainContent = document.getElementById('main-content');
		loading.style.display = 'none';
		mainContent.classList.remove('hidden'); 
	}, 2000);
}

function resquestLocation(){
    const componentImage = document.getElementById('imageLocation');
	const componentTitle = document.getElementById('textLocation');
    const componentTime = document.getElementById('textTime');
    const modalImage = document.getElementById('imageModal');
	const LOCATION = getCookie("locationOrigin");
	const JWT = getCookie("userJwt");
	fetch('https://app.linkaform.com/api/infosync/scripts/run/', {
		method: 'POST',
		body: JSON.stringify({
			script_id: 126428,
			location: LOCATION,
			option: 'get_catalog',
		}),
		headers:{
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+JWT
		},
	})
	.then((res) => res.json())
	.then((res) => {
		const data = res.response && res.response.data ? res.response.data : {};
		if(data.name_location){
			componentTitle.textContent = data.name_location;
		}
		if(data.image_location && data.image_location.length > 0){
            componentImage.src = data.image_location[0].file_url;
            modalImage.src = data.image_location[0].file_url;
		}else{
            componentImage.src = 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/67523b3dda6ccc1afe31023e.png';
            modalImage.src = 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/67523b3dda6ccc1afe31023e.png';
		}
		if(data.time){
			componentTime.textContent = `Ultima inspección hace ${data.time} días`;
		}else{
			componentTime.textContent = `No hay registro de ultima inspección`;
		}
		//---Hide Loading
		setTimeout(() => {
			const loading = document.getElementById('loading');
			const mainContent = document.getElementById('main-content');
			loading.style.display = 'none';
			mainContent.classList.remove('hidden'); 
		}, 2000);
	})
	/*
	// Mostrar todas las cookies
	const cookies = document.cookie.split(';');
	cookies.forEach(cookie => {
	  console.log(cookie.trim());
	});
	*/
}