window.onload = function(){
	const statusSession = getSession('login');
	if(statusSession == 'Active'){
		checkDrawSummary();
		getDatesUser();
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

function setRedirection(file) {
	//----Url
	const protocolo = window.location.protocol;    
	const hostname = window.location.hostname;      
	const puerto = window.location.port;            
	//---URL REDIRECTION LOGIN
	let urlRedirection = `${protocolo}//${hostname}:${puerto}/Soter_Check/${file}.html`
	window.location.href = urlRedirection;
}

function checkDrawSummary() {
	//----Number Count
    const progressFill = document.getElementById('progressFill');
    const componentCount = document.getElementById('completedCount');
    const componentTotal = document.getElementById('completedTotal');
    const componentRemaning = document.getElementById('remainingCount');
    const container = document.getElementById('taskList');
    container.innerHTML = '';
    //---Get Data
    let dicListRecord = localStorage.getItem('dicListRecord');
    if (dicListRecord) {
        dicListRecord = JSON.parse(dicListRecord);
        let locations = dicListRecord && dicListRecord.length > 0 ? dicListRecord : [];
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
            li.addEventListener('click', () => showInformation(item));
            
            if(item.status != 'completed'){
                countInprogress += 1;
            }else{
                countFinish += 1;
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
    }
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
    inputUser.value = `${USERNAME}`;
}

function showInformation(data) {
	console.log('Data',data);
	//---COmponents
	const textTitle = document.getElementById('titleLocation');
    const textUbic = document.getElementById('textUbic');
    const textComment = document.getElementById('commentCheck');
	//---Asign
	title = data.title ? data.title : '';
	dataInformation = data.information ? data.information : {};

	if(title && title != ''){
	    textTitle.textContent = title;
	}

	if (dataInformation.ubicacion && dataInformation.ubicacion != '') {
		textUbic.textContent = dataInformation.ubicacion;
	}

	if (dataInformation.list_checks && dataInformation.list_checks.length != 0) {
		setElementsCheck(dataInformation.list_checks);
	}

	if (dataInformation.comment && dataInformation.comment != '') {
		textComment.textContent = dataInformation.comment;
	}

	setImages(dataInformation.list_img);
	const myModal = new bootstrap.Modal(document.getElementById('modalSummary'));
    myModal.show();
}


function setImages(listImages) {
	const imageUrls = listImages;
	const container = document.getElementById("imageContainer");
	container.innerHTML = '';
	if (imageUrls.length == 0) {
	  	container.innerHTML = '<p class="no-images">No hay imágenes</p>';
	} else {
	  	const grid = document.createElement("div");
	  	grid.className = "image-grid";

	  	imageUrls.forEach((image) => {
	    	const img = document.createElement("img");
	    	img.src = image.file_url;
	    	img.alt = "Imagen";
	    	grid.appendChild(img);
	  	});
	  	container.appendChild(grid);
	}
}


function setElementsCheck(list) {
    const container = document.getElementById('listCheckDiv');
    container.innerHTML = '';
    const form = document.createElement("form");
    form.id = "checkForm"; 

	for (const key in list) {
		const row = document.createElement("div");
        row.className = "row align-items-center mb-3";

        const colText = document.createElement("div");
        colText.className = "col-10";
        colText.textContent = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

        const colCheckbox = document.createElement("div");
        colCheckbox.className = "col-2 text-end";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = key.toLowerCase().replace(/\s+/g, '_');
        checkbox.className = "form-check-input border-secondary";
        checkbox.disabled = true;
        checkbox.checked = true;

        colCheckbox.appendChild(checkbox);

        row.appendChild(colText);
        row.appendChild(colCheckbox);

        form.appendChild(row);
	}
    container.appendChild(form);
}
