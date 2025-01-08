window.onload = function(){
    get_validation_flow();
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

function checkDrawSummary(typeData) {
	//----Number Count
    const progressFill = document.getElementById('progressFill');
    const componentCount = document.getElementById('completedCount');
    const componentTotal = document.getElementById('completedTotal');
    const componentRemaning = document.getElementById('remainingCount');
    const container = document.getElementById('taskList');
    container.innerHTML = '';
    //---Get Data
    let dicListRecord = null;
    if(typeData == 'dicListRecordInspection'){
        dicListRecord = localStorage.getItem('dicListRecordInspection')
    }else if(typeData == 'dicListRecord'){
        dicListRecord = localStorage.getItem('dicListRecord')
    }
    console.log('dicListRecord',dicListRecord)
    if (dicListRecord) {
        dicListRecord = JSON.parse(dicListRecord);
        let locations = dicListRecord && dicListRecord.length > 0 ? dicListRecord : [];
        let countFinish = 0;
        let countInprogress = 0;
        console.log('locations',locations)
        locations.forEach(item => {

            let li = document.createElement('li');
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
            textDiv.textContent = item.title.nombre; 
            li.appendChild(iconDiv);
            li.appendChild(textDiv);
            if(item.status != 'completed'){
                countInprogress += 1;
            }else{
                //----Modal Open
                const key = item.information &&  item.information.tagId ? item.information.tagId : 0; 
                const myModal = new bootstrap.Modal(document.getElementById(`modalSummary_${key}`));
                li.addEventListener('click', () => myModal.show());
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

function checkDrawModal(typeData) {
    let dicListRecord = null;
    if(typeData == 'dicListRecordInspection'){
        dicListRecord = localStorage.getItem('dicListRecordInspection')
    }else if(typeData == 'dicListRecord'){
        dicListRecord = localStorage.getItem('dicListRecord')
    }

    console.log('dicListRecord modal',dicListRecord)
    if (dicListRecord) {
        dicListRecord = JSON.parse(dicListRecord);
        let locations = dicListRecord && dicListRecord.length > 0 ? dicListRecord : [];
        locations.forEach(itemData => {
            const key = itemData.information &&  itemData.information.tagId ? itemData.information.tagId : 0; 
            createModal(key, itemData);
        });
    }
}

function createModal(key, data) {
    const modalHTML = `
        <div class="modal fade" id="modalSummary_${key}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Resumen de Inspección</h5>
                    </div>
                    <div class="modal-body">
                        <div class="info-section col-6">
                            <h5 class="mb-1" id="titleLocation_${key}">Caseta de vigilancia planta 1</h5>
                            <p class="mb-1" ><strong>Ubicación:</strong> <span id="textUbic_${key}"></span></p>
                        </div>
                        <hr class="border border-secondary border-2 opacity-70">
                        <!-- Checklist -->
                        <div >
                            <h6 class="checklist-title"><strong>Checklist</strong></h6>
                            <p>Elementos Seleccionados</p>
                            <div id="listCheckDiv_${key}"></div>
                        </div>
                        <!-- Sección de comentarios -->
                        <div class="comments-section">
                            <h6 class="checklist-title"><strong>Comentarios</strong></h6>
                            <textarea class="form-control" id="commentCheck_${key}" rows="3" disabled></textarea>
                        </div>
                        <!-- Adjuntar fotos -->
                        <div class="mt-3">
                            <h6 class="checklist-title"><strong>Imagenes en Lista</strong></h6>
                            <div id="imageContainer_${key}" class="mt-3">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modalElement = document.getElementById(`modalSummary_${key}`);
    if (modalElement) {
        const myModal = new bootstrap.Modal(modalElement);
        modalElement.addEventListener('hidden.bs.modal', () => {
            modalElement.remove();
        });
    }

    showInformation(data, key);
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

function showInformation(data, id) {
	//---COmponents
	const textTitle = document.getElementById(`titleLocation_${id}`);
    const textUbic = document.getElementById(`textUbic_${id}`);
    const textComment = document.getElementById(`commentCheck_${id}`);
	//---Asign
	title = data.title && data.title.nombre ? data.title.nombre : '';
	dataInformation = data.information ? data.information : {};

	if(title && title != ''){
	    textTitle.textContent = title;
	}

	if (dataInformation.ubicacion && dataInformation.ubicacion != '') {
		textUbic.textContent = dataInformation.ubicacion;
	}

	if (dataInformation.list_checks && dataInformation.list_checks.length != 0) {
		setElementsCheck(dataInformation.list_checks, id);
	}

	if (dataInformation.comment && dataInformation.comment != '') {
		textComment.textContent = dataInformation.comment;
	}
	setImages(dataInformation.list_img, id);
}

function setImages(listImages, id) {
	const imageUrls = listImages;
	const container = document.getElementById(`imageContainer_${id}`);

    container.innerHTML = '';
	if (imageUrls == undefined) {
	  	container.innerHTML = '<p class="no-images">No hay imágenes</p>';
	} else {
        if(imageUrls.length > 0){
    	  	const grid = document.createElement("div");
    	  	grid.className = "image-grid";

    	  	imageUrls.forEach((image) => {
    	    	const img = document.createElement("img");
    	    	img.src = image.file_url;
    	    	img.alt = "Imagen";
    	    	grid.appendChild(img);
    	  	});
    	  	container.appendChild(grid);
        }else{
            container.innerHTML = '<p class="no-images">No hay imágenes</p>';
        }
	}
}

function setElementsCheck(list, id) {
    const container = document.getElementById(`listCheckDiv_${id}`);
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

//-----Flow System
async function get_validation_flow() {
    const statusSession = getSession('login');
    if(statusSession == 'Active'){
        if (localStorage.getItem('dicListRecord')) {
            getDatesUser();
            if(localStorage.getItem('dicListRecordInspection')){
                checkDrawModal('dicListRecordInspection');
                checkDrawSummary('dicListRecordInspection');
            }else if(localStorage.getItem('dicListRecord')){
                checkDrawModal('dicListRecord');
                checkDrawSummary('dicListRecord');
            }
            //----Asign
            document.getElementById("buttonFinish").addEventListener("click", () => {
                redirectionRondines();
            });
            setTimeout(() => {
                //---Delete Information
                if(localStorage.getItem('dicListRecordInspection')){
                    localStorage.removeItem('dicListRecordInspection');
                }else if(localStorage.getItem('dicListRecord')){
                    localStorage.removeItem('dicListRecord');
                }
                const loading = document.getElementById('loading');
                const mainContent = document.getElementById('main-content');
                loading.style.display = 'none';
                mainContent.classList.remove('hidden'); 
            }, 2000);
        } else {
            redirectionRondines();
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

function redirectionRondines() {
    const protocolo = window.location.protocol;    
    const hostname = window.location.hostname;      
    const puerto = window.location.port;            
    //---URL REDIRECTION LOGIN
    let urlRedirection = `${protocolo}//${hostname}:${puerto}/Soter_Check/list_rondines.html`
    window.location.href = urlRedirection;
}
