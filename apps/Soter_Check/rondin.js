let listImagesDic = [];

window.onload = function(){
    get_validation_flow();
}

function resquestLocation(){
    let tagId = getParameterURL('tagId');
    //---Modal Components
    const textLocation = document.getElementById('textLocation');
    const textUbication = document.getElementById('textUbicacion');
    const textTime = document.getElementById('textTime');
	const JWT = getCookie("userJwt");
	fetch(getUrlRequest('script'), {
		method: 'POST',
		body: JSON.stringify({
			script_name: 'create_record_check.py',
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
        if(res.response.data && res.response.data.ubication_location && res.response.data.ubication_location != ''){
            textTime.textContent = res.response.data.ubication_location;
        }
        if(res.response.data && res.response.data.last_record && res.response.data.last_record != ''){
            textUbication.textContent = res.response.data.last_record;
        }
        if(res.response.data && res.response.data.image_location && res.response.data.image_location.length > 0 ){
            const imageElement = document.getElementById('imageLocation');
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
        let configuration = localStorage.getItem('configuration');
        if(configuration){
            resquestLocation();
            const buttonInspectionArea = document.getElementById("buttonInspectionArea");
            buttonInspectionArea.classList.remove('btn-secondary');
            buttonInspectionArea.classList.add('btn-primary');
            buttonInspectionArea.classList.remove('hidden');
            buttonInspectionArea.addEventListener("click", () => {
                redirectionInspectionArea();
            });
        }else{
            const buttonStartRondin = document.getElementById("buttonStartRondin");
            const buttonInspectionArea = document.getElementById("buttonInspectionArea");
            resquestLocation();
            //---Asign Events
            buttonStartRondin.classList.remove('hidden');
            buttonInspectionArea.classList.remove('hidden');
            buttonStartRondin.addEventListener("click", () => {
                redirectionStartRondin();
            });
            buttonInspectionArea.addEventListener("click", () => {
                redirectionInspectionArea();
            });
        }
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
