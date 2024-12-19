let listImagesDic = [];

window.onload = function(){
    get_validation_flow();
}

function resquestLocation(){
    let tagId = getParameterURL('tagId');
    //---Modal Components
    const textLocation = document.getElementById('textLocation');
	const JWT = getCookie("userJwt");
	fetch('https://app.linkaform.com/api/infosync/scripts/run/', {
		method: 'POST',
		body: JSON.stringify({
			script_id: 126428,
			tagId: tagId,
			option: 'get_catalog',
		}),
		headers:{
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+JWT
		},
	})
	.then((res) => res.json())
	.then((res) => {
		//---Information FOrm
		const data = res.response && res.response.data ? res.response.data : {};

		if(res.response.data && res.response.data.name_location && res.response.data.name_location != ''){
            textLocation.textContent = res.response.data.name_location;
        }
        if(res.response.data && res.response.data.image_location && res.response.data.image_location.length > 0 ){
            const imageElement = document.getElementById('imgLocation');
            imageElement.src = res.response.data.image_location[0].file_url;
        }

		//---Hide Loading
		setTimeout(() => {
			const loading = document.getElementById('loading');
			const mainContent = document.getElementById('main-content');
			loading.style.display = 'none';
			mainContent.classList.remove('hidden'); 
		}, 2000);
	})
}

//----Validation Flow
async function get_validation_flow() {
    const statusSession = getSession('login');
    if(statusSession == 'Active'){
        resquestLocation();
        //---Asign Events
        document.getElementById("buttonStartRondin").addEventListener("click", () => {
            redirectionStartRondin();
        });
        document.getElementById("buttonStartRondin").addEventListener("click", () => {
            buttonInspectionArea();
        });
    }else{  
        redirectionLogin();
    }
}

function redirectionLogin() {
    const protocolo = window.location.protocol;    
    const hostname = window.location.hostname;      
    const puerto = window.location.port;            
    //---URL REDIRECTION LOGIN
    let urlRedirection = `${protocolo}//${hostname}:${puerto}/Soter_Check/login.html`
    window.location.href = urlRedirection;
}

function redirectionInspectionArea(){
    let tagId = getParameterURL('tagId');
    const protocolo = window.location.protocol;    
    const hostname = window.location.hostname;      
    const puerto = window.location.port;            
    //---URL REDIRECTION LOGIN
    let urlRedirection = `${protocolo}//${hostname}:${puerto}/Soter_Check/check_rondin.html?tagId=${tagId}&type=inspection`
    window.location.href = urlRedirection;
}

function redirectionStartRondin(file){
    let tagId = getParameterURL('tagId');
    const protocolo = window.location.protocol;    
    const hostname = window.location.hostname;      
    const puerto = window.location.port;            
    //---URL REDIRECTION LOGIN
    let urlRedirection = `${protocolo}//${hostname}:${puerto}/Soter_Check/start_rondin.html?tagId=${tagId}`
    window.location.href = urlRedirection;
}
