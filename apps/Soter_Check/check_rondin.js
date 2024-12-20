let listImagesDic = [];
window.onload = function(){
    get_validation_flow();
}

function getParameterURL(keyFound = null) {
    const params = new URLSearchParams(window.location.search);
    const dicParams = {};
    params.forEach((value, key) => {
        dicParams[key] = value;
    });
    if(keyFound != null){
        return dicParams.hasOwnProperty(keyFound) ? dicParams[keyFound] : null;
    }else{
        return parametros;
    }
}

function getListCheck(location) {
    let results = [];
    for (const [key, value] of Object.entries(checkListData)) {
        if (location === value['location']) {
            results = value['tasks'];
        }
    }
    return results;
}

function setElementsCheck(list) {
    const container = document.getElementById('listCheckDiv');
    const form = document.createElement("form");
    form.id = "checkForm"; 
    list.forEach((item, index) => {
        const row = document.createElement("div");
        row.className = "row align-items-center mb-3";

        const colText = document.createElement("div");
        colText.className = "col-10";
        colText.textContent = item;

        const colCheckbox = document.createElement("div");
        colCheckbox.className = "col-2 text-end";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = item.toLowerCase().replace(/\s+/g, '_');
        checkbox.className = "form-check-input border-secondary";
        checkbox.id = `item${index + 1}`;

        colCheckbox.appendChild(checkbox);

        row.appendChild(colText);
        row.appendChild(colCheckbox);

        form.appendChild(row);
    });
    container.appendChild(form);
}

function setElementImages(data) {
    const container = document.getElementById('divListImages');
    const loader = document.getElementById('divLoadingImage');
    loader.style.display = 'flex';
    container.innerHTML = ''; 

    setTimeout(() => {
        loader.style.display = 'none';
        data.forEach(image => {
            const colDiv = document.createElement("div");
            colDiv.className = "col-12 col-md-12 col-lg-12 mb-4 position-relative";

            const img = document.createElement("img");
            img.src = image.file_url; 
            img.alt = image.file_name;
            img.className = "img-fluid w-100 rounded";

            const deleteIconSpan = document.createElement("span");
            deleteIconSpan.className = "delete-icon position-absolute top-0 end-0 m-2 text-danger";
            deleteIconSpan.style.cursor = 'pointer';
            deleteIconSpan.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            deleteIconSpan.style.borderRadius = '50%';
            deleteIconSpan.style.padding = '5px';

            const icon = document.createElement("i");
            icon.className = "fas fa-trash fa-lg";

            deleteIconSpan.onclick = () => deleteImage(image.file_url);

            deleteIconSpan.appendChild(icon);

            let truncatedFileName = image.file_name;
            if (truncatedFileName.length > 15) {
                truncatedFileName = truncatedFileName.substring(0, 15) + '...';
            }

            const fileNameParagraph = document.createElement("p");
            fileNameParagraph.textContent = truncatedFileName;
            fileNameParagraph.className = "text-center mt-2";

            colDiv.appendChild(img);
            colDiv.appendChild(deleteIconSpan);
            colDiv.appendChild(fileNameParagraph);
            container.appendChild(colDiv);
        });

        const button = document.getElementById('buttonSend');
        button.disabled = false;
    }, 500);
}

function openCamera(callback) {
    console.log('openCamera');
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment"; 

    input.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file && callback) {
            callback(file);
        }
    });
    input.click();
}

function openFilePicker(callback) {
    console.log('openFilePicker');
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; 
    input.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file && callback) {
            callback(file); // Devuelve el archivo al callback
        }
    });

    input.click();
}

function handleFile(file) {
    if (!file) {
        alert('No existe archivo');
        return ;
    }
    //--Show Loading
    const divContent = document.getElementById('divListImages');
    divContent.style.display = 'none'; 

    const divLoader = document.getElementById('divLoadingImage');
    divLoader.style.display = 'flex';
    
    const button = document.getElementById('buttonSend');
    button.disabled = true; 

    //--Fetch
    const formData = new FormData();
    formData.append('File', file);
    formData.append('field_id', '6740cbd734849293fe5a2735');
    formData.append('is_image', true);
    formData.append('form_id',  126213);

    fetch(getUrlRequest('uploadPicture'), {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(res => {
        imgUrl = res.file ? res.file : '';
        imgName = res.file_name ? res.file_name : '';
        listImagesDic.push({'file_name':imgName,'file_url':imgUrl});
        divContent.style.display = 'block'; 
        divLoader.style.display = 'none'; 
        setTimeout(() => { 
            setElementImages(listImagesDic);
        }, 500);
    })
    .catch((error) => console.error("Error en el fetch:", error));
}   

function getCheckboxStates() {
    const form = document.getElementById('checkForm');
    if (!form) {
        return;
    }
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    const states = {};
    checkboxes.forEach((checkbox) => {
        states[checkbox.name] = checkbox.checked;
    });
    console.log('states',states)
    return states;
}

function deleteImage(value) {
    //---Delte dic in list 
    listImagesDic.forEach((dict, index )=> {
        if (dict['file_url'] && dict['file_url'] == value) {
            if (index > -1) {
                listImagesDic.splice(index); 
            }
        }
    });
    setElementImages(listImagesDic);
}

function dataSend(){
    //---DIsable
    const button = document.getElementById('buttonSend');
    button.disabled = true; 
    //---TYPE
    let tagId = getParameterURL('tagId');
    let dicFetch = {}
    let type = getParameterURL('type');
    let checksSelected = getCheckboxStates();
    let inputComment = document.getElementById('commentCheck').value;
    let textAlert = document.getElementById('textModalSuccess');
    let dicDaga;
    if(type){
        dicData = {
            'tagId': tagId,
            'list_checks': checksSelected,
            'comment': inputComment,
            'list_img': listImagesDic,
        }
        dicFetch = {
            script_name: 'create_record_check.py',
            formInformation: dicData,
            option: 'add_inspection_check',
        }
    }else{
        //---Get data form
        let configuration = JSON.parse( localStorage.getItem('configuration'));
        dicData = {
            'folio': configuration.folio,
            'rondin': configuration.nombre_rondin,
            'ubicacion': configuration.ubicacion,
            'tagId': tagId,
            'list_checks': checksSelected,
            'comment': inputComment,
            'list_img': listImagesDic,
        }
        //---Get data local storage
        let recordConfig = localStorage.getItem('recordBitacora');
        recordConfig = JSON.parse(recordConfig);

        dicFetch = {
            script_name: 'create_record_check.py',
            formInformation: dicData,
            folioUpdate:recordConfig.folio,
            option: 'add_record_check',
        }

    }
    let JWT = getCookie("userJwt");
    //---Request
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify(dicFetch),
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers':'*',
            'Authorization': 'Bearer '+JWT
        },
    })
    .then(res => res.json())
    .then(res => {
        let data = res.response && res.response.data ? res.response.data : {};
        if (data.status_create == '201') {
            if(!type){
                let dicListRecord = localStorage.getItem('dicListRecord');
                if(!dicListRecord){
                    let configuration = JSON.parse( localStorage.getItem('configuration'));
                    const dicData = {
                        'folio': configuration.folio,
                        'rondin': configuration.nombre_rondin,
                        'ubicacion': configuration.ubicacion,
                        'tagId': tagId,
                        'list_checks': checksSelected,
                        'comment': inputComment,
                        'list_img': listImagesDic,
                    }
                    createDicRecord(configuration, dicData);
                }else{
                    updateDicRecord(dicListRecord, dicData);
                }
                textAlert.textContent = '¡Se a registrado su Rondin Check!';
                let modal = new bootstrap.Modal(document.getElementById('alertaModalSuccess'));
                modal.show();
                setTimeout(() => {
                    setRedirection();
                }, 2000);
            }else{
                textAlert.textContent = '¡Se a registrado su inspección de Área!';
                let modal = new bootstrap.Modal(document.getElementById('alertaModalSuccess'));
                modal.show();
            }
        } else {
            let modal = new bootstrap.Modal(document.getElementById('alertaModalFail'));
            modal.show();
        }
    })
}

function getInformationLocation(location){
    const tagId = getParameterURL('tagId');
    const textTitle = document.getElementById('titleLocation');
    const textDir = document.getElementById('textDir');
    const textUbic = document.getElementById('textUbic');
    const textType = document.getElementById('textType');
    let JWT = getCookie("userJwt");
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_name: 'create_record_check.py',
            tagId: tagId,
            option: 'get_catalog',
        }),
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers':'*',
            'Authorization': 'Bearer '+JWT
        },
    })
    .then(res => res.json())
    .then(res => {
        if(res.response.data && res.response.data.name_location && res.response.data.name_location != ''){
            textTitle.textContent = res.response.data.name_location;
        }
        if(res.response.data && res.response.data.direction_location && res.response.data.direction_location != ''){
            textDir.textContent = `${res.response.data.direction_location}`;
        }else{
            textDir.textContent = `N/A`;
        }
        if(res.response.data && res.response.data.ubication_location && res.response.data.ubication_location != ''){
            textUbic.textContent = `${res.response.data.ubication_location}`;
        }else{
            textUbic.textContent = `N/A`;
        }
        if(res.response.data && res.response.data.type_location && res.response.data.type_location != ''){
            textType.textContent = `${res.response.data.type_location}`;
        }else{
            textType.textContent = `N/A`;
        }
        if(res.response.data && res.response.data.image_location && res.response.data.image_location.length > 0 ){
            const imageElement = document.getElementById('imgLocation');
            imageElement.src = res.response.data.image_location[0].file_url;
        }
    })
}

function getTimeNow() {
    const textTime = document.getElementById('textTime');
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    textTime.textContent = `${year}-${month}-${day} ${hours}:${minutes}`;
}

function createDicRecord(configuration, dicData){
    //---Create Dic
    let resultList = [];
    for (const key in configuration) {
        if(key == 'area' ){
            const items = configuration[key];
            for (var i = 0; i < items.length; i++) {
                const newObject = {
                    title: items[i],
                    status: 'in_progress',
                    information: {},
                };
                resultList.push(newObject);
            }
        }
    }
    //---Update Dic
    const updatedData = {
        status: "completed",
        information: dicData,
    };

    const foundIndex = resultList.findIndex(item => 
        item.title.tagId.includes(dicData.tagId) 
    );

    if (foundIndex !== -1) {
        resultList[foundIndex] = {
            ...resultList[foundIndex],
            ...updatedData,
        };
    }
    localStorage.setItem('dicListRecord', JSON.stringify(resultList));
}


function updateDicRecord(dicList, data){
    //---Update Dic
    const updatedData = {
        status: "completed",
        information: data,
    };
    dicList = JSON.parse(dicList);
    if(dicList){
        const foundIndex = dicList.findIndex(item => 
            item.title.tagId.includes(dicData.tagId) // Buscar en el array tagId
        );
        if (foundIndex !== -1) {
            // Actualizar el elemento encontrado
            dicList[foundIndex] = {
                ...dicList[foundIndex],
                ...updatedData,
            };
        }
    }
    localStorage.setItem('dicListRecord', JSON.stringify(dicList));
}

function setRedirection() {
    //----Url
    const protocolo = window.location.protocol;    
    const hostname = window.location.hostname;      
    const puerto = window.location.port;            
    //---URL REDIRECTION LOGIN
    let urlRedirection = `${protocolo}//${hostname}:${puerto}/Soter_Check/time_line_rondin.html`;
    window.location.href = urlRedirection;
}

//----Validation Flow
async function get_validation_flow() {
    const statusSession = getSession('login');
    if(statusSession == 'Active'){
        let data = await validationTagId(); 
        if(data.status_request && data.status_request == 'included'){
            let area = data.data_tag && data.data_tag.nombre_area_catalog ? data.data_tag.nombre_area_catalog  :'undefined';
            let configuration = localStorage.getItem('configuration');
            if(configuration){
                status_config = validationConfigTag(configuration);
                if(status_config){
                    loadCheckArea(area);
                }else{
                    let type = getParameterURL('type');
                    if(type){
                        loadCheckArea(area);
                    }else{
                        redirectionArea(area);
                    }
                }
            }else{
                let type = getParameterURL('type');
                if(type){
                    loadCheckArea(area);
                }else{
                    redirectionArea(area);
                }
            }
        }else if(data.status_request && data.status_request == 'not_included'){
            redirectionConfig();
        }
    }else {
        //----Save Cookie Tag Id
        const tagId = getParameterURL('tagId');
        setCookie("tagId", tagId, 7);
        //----Redirection Login 
        redirectionLogin();
    }
}

async function validationTagId() {
    let statusTag = '';
    let tagId = getParameterURL('tagId');
    const JWT = getCookie("userJwt");
    const response = await fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_name: 'create_record_check.py',
            tagId: tagId,
            option: 'get_information_tag',
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'Authorization': 'Bearer '+JWT
        },
    });
    const res = await response.json();
    let data = res.response && res.response.data ? res.response.data : {};
    if (data.status_request) {
        return data; 
    } else {
        return null; 
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

function redirectionConfig() {
    let tagId = getParameterURL('tagId');
    const protocolo = window.location.protocol;    
    const hostname = window.location.hostname;      
    const puerto = window.location.port;            
    //---URL REDIRECTION LOGIN
    let urlRedirection = `${protocolo}//${hostname}:${puerto}/Soter_Check/config_tag.html?tagId=${tagId}`
    window.location.href = urlRedirection;
}

function redirectionArea() {
    let tagId = getParameterURL('tagId');
    const protocolo = window.location.protocol;    
    const hostname = window.location.hostname;      
    const puerto = window.location.port;            
    //---URL REDIRECTION LOGIN
    let urlRedirection = `${protocolo}//${hostname}:${puerto}/Soter_Check/rondin.html?tagId=${tagId}`
    window.location.href = urlRedirection;
}

function loadCheckArea(area) {
    let listData = getListCheck(area);
    setElementsCheck(listData);
    //---Information 
    getInformationLocation(area);
    getTimeNow();
    //---Asign Events
    document.getElementById("cameraButton").addEventListener("click", () => {
        openCamera(handleFile);
    });

    document.getElementById("galleryButton").addEventListener("click", () => {
        openFilePicker(handleFile);
    });

    document.getElementById("buttonSend").addEventListener("click", () => {
        dataSend();
    });
    setTimeout(() => {
        const loading = document.getElementById('loading');
        const mainContent = document.getElementById('main-content');
        loading.style.display = 'none';
        mainContent.classList.remove('hidden'); 
    }, 2000);
}

function validationConfigTag(dicData) {
    let statusReturn = false;
    let tagId = getParameterURL('tagId');
    let data  = JSON.parse(dicData);
    let listConfig = data.area && data.area.length > 0 ? data.area : [];

    listConfig.forEach(item => {
        if(item.tagId == tagId){
            statusReturn = true;
        }
    });
    return statusReturn;
}