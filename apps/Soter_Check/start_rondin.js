let dicConfigs = [];

window.onload = function(){
	get_validation_flow();
    setTimeout(() => {
        const loading = document.getElementById('loading');
        const mainContent = document.getElementById('main-content');
        loading.style.display = 'none';
        mainContent.classList.remove('hidden'); 
    }, 2000);
}

function getDatesUser() {
    const inputDate = document.getElementById('inputDate');
    const inputTime = document.getElementById('inputTime');
    const inputUser = document.getElementById('inputUser');
    //--Get Time
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    //--- Get User
    const USERNAME = getCookie("userName");
    //---Asign
    inputDate.value = `${year}-${month}-${day}`;
    inputTime.value = `${hours}:${minutes}`;
    inputUser.value = `${USERNAME}`;
}

function resquestLocation(){
    let tagId = getParameterURL('tagId');
	const JWT = getCookie("userJwt");
	fetch('https://app.linkaform.com/api/infosync/scripts/run/', {
		method: 'POST',
		body: JSON.stringify({
			script_id: 126428,
			tagId: tagId,
			option: 'get_config',
		}),
		headers:{
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+JWT
		},
	})
	.then((res) => res.json())
	.then((res) => {
		const data = res.response && res.response.data ? res.response.data : [];
		if(data.length > 0){
			dicConfigs = data;
			setListAreas(data);
		}
	})
}

function setListAreas(data) {
    const selectRondin = document.getElementById('selectRondin');
    selectRondin.innerHTML = '';
    //--Config
	const option_empty = document.createElement('option');
	option_empty.textContent = 'Seleccione un Rondin';
	option_empty.value = "";
	selectRondin.appendChild(option_empty);

    data.forEach(rondin => {
        // --- Rellenar el selector <select>
        const option = document.createElement('option');
        option.textContent = rondin.nombre_rondin;
        option.value = rondin.folio;
        selectRondin.appendChild(option);
    });
}

function changeRondin() {
    const valueSelect = document.getElementById('selectRondin').value;
    const ulContainer = document.getElementById('ulLocations');
    if(valueSelect != ''){
        ulContainer.innerHTML = '';
        const selectedData = dicConfigs.find(rondin => rondin.folio === valueSelect);
        if (selectedData && selectedData.area) {
            selectedData.area.forEach(area => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                const span = document.createElement('span');
                span.innerHTML = `<i class="bi bi-geo-alt-fill"></i> ${area}`;
                li.appendChild(span);
                ulContainer.appendChild(li);
            });
        }
        document.getElementById("buttonSend").disabled = false;
    }else{
        document.getElementById("buttonSend").disabled = true;
        ulContainer.innerHTML = '';
    }
}

function set_config_rondin() {
    //---Load
    const loading = document.getElementById('loading');
    const mainContent = document.getElementById('main-content');
    mainContent.classList.add('hidden'); 
    loading.style.display = 'flex';

    //---Create
    const valueSelect = document.getElementById('selectRondin').value;
    const selectedData = dicConfigs.find(rondin => rondin.folio === valueSelect);
    localStorage.setItem('configuration', JSON.stringify(selectedData));
    setRequestCreatedBitacora();
}

function set_redirection() {
    //----Url
    let tagId = getParameterURL('tagId');
    const protocolo = window.location.protocol;    
    const hostname = window.location.hostname;      
    const puerto = window.location.port;            
    //---URL REDIRECTION LOGIN
    let urlRedirection = `${protocolo}//${hostname}:${puerto}/Soter_Check/time_line_rondin.html?tagId=${tagId}`
    window.location.href = urlRedirection;
}

function getAllLocalStorageData() {
    const allData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); 
        const value = localStorage.getItem(key);
        allData[key] = value;
    }
    return allData;
}

function setRequestCreatedBitacora(){
    const valueSelect = document.getElementById('selectRondin').value;
    const JWT = getCookie("userJwt");
    const LOCATION = getCookie("locationOrigin");
    fetch('https://app.linkaform.com/api/infosync/scripts/run/', {
        method: 'POST',
        body: JSON.stringify({
            script_id: 126428,
            location: LOCATION,
            config: valueSelect,
            option: 'add_record_bitacora',
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+JWT
        },
    })
    .then((res) => res.json())
    .then((res) => {
        const data = res.response && res.response.data ? res.response.data : [];
        if(data.folio){
            localStorage.setItem('recordBitacora', JSON.stringify(data));
            setTimeout(() => {
                set_redirection();
            }, 1000);
        }
    })
}

//----Validation Flow
async function get_validation_flow() {
    const statusSession = getSession('login');
    if(statusSession == 'Active'){
        getDatesUser();
        resquestLocation();
        //--Asign Events
        document.getElementById('selectRondin').addEventListener('change', () => {
            changeRondin();
        });
        document.getElementById("buttonSend").addEventListener("click", () => {
            set_config_rondin();
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