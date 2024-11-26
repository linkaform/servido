let listImagesDic = [];

window.onload = function(){
    //---Hide Div
    const divContent = document.getElementById('divContent');
    divContent.style.display = 'none'; 

    const divLoader = document.getElementById('divLoading');
    divLoader.style.display = 'block'; 

    //---Create Element
    let parameter = getParameterURL('location');
    let listData = getListCheck(parameter);
    setElementsCheck(listData);
    //---Information 
    getInformationLocation(parameter);
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

    //---Show Div
    setTimeout(() => { 
        divContent.style.display = 'block'; 
        divLoader.style.display = 'none'; 
    }, 4000);
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
    container.innerHTML = '';
    //---Images 
    const ul = document.createElement("ul");
    ul.className = "list-group w-100";
    data.forEach(image => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        const text = document.createTextNode(image.file_name);
        const button = document.createElement("button");
        button.className = "btn btn-danger btn-sm";
        button.textContent = "Eliminar";
        button.setAttribute("onclick", `deleteImage('${image.file_url}')`);
        li.appendChild(text);
        li.appendChild(button);
        ul.appendChild(li);
    });
    container.appendChild(ul);
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
    input.accept = "image/*"; // Acepta solo imágenes

    input.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file && callback) {
            callback(file); // Devuelve el archivo al callback
        }
    });

    input.click();
}

function handleFile(file) {
    console.log("Archivo seleccionado:", file);
    if (!file) {
        alert('No existe archivo');
        return ;
    }
    const formData = new FormData();
    formData.append('File', file);
    formData.append('field_id', '6740cbd734849293fe5a2735');
    formData.append('is_image', true);
    formData.append('form_id',  126213);

    fetch('https://app.linkaform.com/api/infosync/cloud_upload/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(res => {
        imgUrl = res.file ? res.file : '';
        imgName = res.file_name ? res.file_name : '';
        listImagesDic.push({'file_name':imgName,'file_url':imgUrl});
        setElementImages(listImagesDic); 
    })
    .then((data) => {
        console.log(data); 
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
    return states;
}

function deleteImage(value) {
    //---Delte dic in list 
    listImagesDic.forEach((dict, index )=> {
        if (dict['value'] && dict['value'] == value) {
            if (index > -1) {
                listImagesDic.splice(index); 
            }
        }
    });
    setElementImages(listImagesDic);
}

function dataSend(){
    const location = getParameterURL('location');
    const checksSelected = getCheckboxStates();
    const inputComment = document.getElementById('commentCheck').value;
    const dicData = {
        'location': location.toLowerCase().replace(/\s+/g, '_'),
        'list_checks': checksSelected,
        'comment': inputComment,
        'list_img': listImagesDic,
    }

    let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
    fetch(urlLinkaform, {
        method: 'POST',
        body: JSON.stringify({
            script_id: 126428,
            formInformation: dicData,
            option: 'add_record',
        }),
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers':'*'
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res === '201') {
            alert('Se ingresó exitosamente el registro');
        } else {
            alert('Se ingresó exitosamente el registro.');
        }
    })
    .catch(error => {
        alert('Hubo un error al conectarse al servidor. Inténtalo de nuevo.');
        console.error('Error:', error);
    });
}

function getInformationLocation(location){
    const textTitle = document.getElementById('titleLocation');
    const textDir = document.getElementById('textDir');
    const textType = document.getElementById('textType');
    

    let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';
    fetch(urlLinkaform, {
        method: 'POST',
        body: JSON.stringify({
            script_id: 126428,
            location: location,
            option: 'get_catalog',
        }),
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers':'*'
        },
    })
    .then(res => res.json())
    .then(res => {
        if(res.response.data && res.response.data.name_location && res.response.data.name_location != ''){
            textTitle.textContent = res.response.data.name_location;
        }
        if(res.response.data && res.response.data.direction_location && res.response.data.direction_location != ''){
            textDir.textContent = `Ubicación: ${res.response.data.direction_location}`;
        }else{
            textDir.textContent = `Ubicación: N/A`;
        }
        if(res.response.data && res.response.data.type_location && res.response.data.type_location != ''){
            textType.textContent = `Tipo de Área: ${res.response.data.type_location}`;
        }else{
            textType.textContent = `Tipo de Área: N/A`;
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

    textTime.textContent = `Fecha y Hora de Inspección: ${year}-${month}-${day} ${hours}:${minutes}`;
}