let dicConfigs = [];

window.onload = function(){
	const statusSession = getSession('login');
	console.log('Entra aaaa');
	if(statusSession == 'Active'){
		const configData = getParsedConfiguration();
		if (configData) {
		    getDatesUser();
            drawConfigLocation(configData) 

		} else {
		    setRedirection('start_rondin');
		}
		//--Asign Events
        document.getElementById("buttonSend").addEventListener("click", () => {
            set_config_rondin();
        });
	}else{
        setRedirection('login');
	}

	setTimeout(() => {
		const loading = document.getElementById('loading');
		const mainContent = document.getElementById('main-content');
		loading.style.display = 'none';
		mainContent.classList.remove('hidden'); 
	}, 2000);
}

function getParsedConfiguration() {
    const configuration = localStorage.getItem('configuration');
    if (configuration) {
        return JSON.parse(configuration);
    } else {
        console.log('No hay configuración en localStorage.');
        return null;
    }
}


function setRedirection(file) {
	//----Url
	const protocolo = window.location.protocol;    
	const hostname = window.location.hostname;      
	const puerto = window.location.port;            
	//---URL REDIRECTION LOGIN
	let urlRedirection = `${protocolo}//${hostname}:${puerto}/Soter_Check/${file}.html`
	window.location.href = urlRedirection;
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

function drawConfigLocation(dataConfig) {
    //----Number Count
    const progressFill = document.getElementById('progressFill');
    const componentCount = document.getElementById('completedCount');
    const componentTotal = document.getElementById('completedTotal');
    const componentRemaning = document.getElementById('remainingCount');
    const container = document.getElementById('taskList');
    container.innerHTML = '';
    //---Get Data
    const dicListRecord = localStorage.getItem('dicListRecord');
    if (dicListRecord) {
        let locations = dicListRecord && dicListRecord.length > 0 ? dicListRecord.length : [];
        let countFinish = 0;
        let countInprogress = 0;

        locations.forEach(item => {
            const li = document.createElement('li');
            if(item.status != 'completed'){
                li.className = 'task-item task-pointer';
            }else{
                li.className = 'task-item completed';
            }

            const iconDiv = document.createElement('div');
            iconDiv.className = 'task-icon';
            iconDiv.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
            const textDiv = document.createElement('div');
            textDiv.className = 'task-text ';
            textDiv.textContent = item.title; 

            li.appendChild(iconDiv);
            li.appendChild(textDiv);
            if(item.status != 'completed'){
                countFinish += 1;
                li.addEventListener('click', () => set_redirection_rondin(task));
            }else{
                countInprogress += 1;
            }
            container.appendChild(li);
        });
        //----Assing Count
        componentCount.textContent = `${countFinish}`;
        componentTotal.textContent = `/${ countFinish + countInprogress}`;
        componentRemaning.textContent = `${countFinish}`;
        //----Assing Count
        const progressPercentage = (countFinish / (countFinish + countInprogress)) * 100;
        progressFill.style.width = `${progressPercentage}%`;

    } else {
        let locations = dataConfig.area && dataConfig.area.length > 0 ? dataConfig.area : [];
        locations.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item task-pointer';

            const iconDiv = document.createElement('div');
            iconDiv.className = 'task-icon';
            iconDiv.innerHTML = '<i class="fas fa-map-marker-alt"></i>';

            const textDiv = document.createElement('div');
            textDiv.className = 'task-text';
            textDiv.textContent = task; 

            li.appendChild(iconDiv);
            li.appendChild(textDiv);
            li.addEventListener('click', () => set_redirection_rondin(task));
            container.appendChild(li);
        });        
        if(dataConfig.area && dataConfig.area.length){
            componentCount.textContent = `0`;
            componentTotal.textContent = `/${ dataConfig.area.length}`;
            componentRemaning.textContent = `0`;
        }else{
            componentCount.textContent = `0`;
            componentTotal.textContent = `/0`;
            componentRemaning.textContent = `0`;
        }
    }
}

function set_redirection_rondin(location) {
    //----Url
    const protocolo = window.location.protocol;    
    const hostname = window.location.hostname;      
    const puerto = window.location.port;            
    //---URL REDIRECTION LOGIN
    let urlRedirection = `${protocolo}//${hostname}:${puerto}/Soter_Check/check_rondin.html?location=${location}`;
    window.location.href = urlRedirection;
}

