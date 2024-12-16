let listImagesDic = [];

window.onload = function(){
	const statusSession = getSession('login');
	if(statusSession == 'Active'){
		resquestLocation();
		resquestForm();
        //---Asign Events
        document.getElementById("buttonStartRondin").addEventListener("click", () => {
            redirection('start_rondin');
        });
	}else{
		//----Cookie
        const LOCATION = getParameterURL('location');
        setCookie("locationOrigin", LOCATION, 7);
        //----Url
        redirection('login')
	}
	setTimeout(() => {
		const loading = document.getElementById('loading');
		const mainContent = document.getElementById('main-content');
		loading.style.display = 'none';
		mainContent.classList.remove('hidden'); 
	}, 3000);
}

function resquestLocation(){
	//---Modal Components
    const textTitle = document.getElementById('titleLocation');
    const textDir = document.getElementById('textDir');
    const textUbic = document.getElementById('textUbic');
    const textType = document.getElementById('textType');
	//---Form Components
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
		//---Information FOrm
		const data = res.response && res.response.data ? res.response.data : {};
		if(data.name_location){
			componentTitle.textContent = data.name_location;
		}
		if(data.image_location && data.image_location.length > 0){
            componentImage.src = data.image_location[0].file_url;
            modalImage.src = data.image_location[0].file_url;
		}else{
            componentImage.src = 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/673f54428183892c605a26d2.png';
		}
		if(data.time){
			componentTime.textContent = `Ultima inspección hace ${data.time} días`;
		}else{
			componentTime.textContent = `No hay registro de ultima inspección`;
		}
		//---Modal Information
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

function resquestForm() {
	const LOCATION = getCookie("locationOrigin");
	let listData = getListCheck(LOCATION);
	setElementsCheck(listData);
	//---Information 
    getTimeNow();

    //---Asign Events
    document.getElementById("cameraButton").addEventListener("click", () => {
        openCamera(handleFile);
    });

    document.getElementById("galleryButton").addEventListener("click", () => {
        openFilePicker(handleFile);
    });

	document.getElementById("buttonSendModal").addEventListener("click", () => {
	    dataSend();
	});

    document.getElementById("buttonCloseModal").addEventListener("click", () => {
        cleanModalForm();
    });
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

function openCamera(callback) {
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
    if (!file) {
        alert('No existe archivo');
        return ;
    }
    //--Show Loading
    const divContent = document.getElementById('divListImages');
    divContent.style.display = 'none'; 

    const divLoader = document.getElementById('divLoadingImage');
    divLoader.style.display = 'flex';
    
    const button = document.getElementById('buttonSendModal');
    button.disabled = true; 

    //--Fetch
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
        divContent.style.display = 'block'; 
        divLoader.style.display = 'none'; 
        setTimeout(() => { 
            setElementImages(listImagesDic);
        }, 500);
    })
    .then((data) => {
        console.log(data); 
    })
    .catch((error) => console.error("Error en el fetch:", error));
} 

function dataSend(){
    const location = getParameterURL('location');
    const checksSelected = getCheckboxStates();
    const inputComment = document.getElementById('commentCheck').value;
    const dicData = {
        'location': location,
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
            alert('Hubo un error en el registro, contacte a soporte.');
        }
    })
    .catch(error => {
        alert('Hubo un error al conectarse al servidor. Inténtalo de nuevo.');
        console.error('Error:', error);
    });
}

function setElementImages(data) {
    const container = document.getElementById('divListImages');
    const loader = document.getElementById('divLoadingImage');
    loader.style.display = 'flex';
    container.innerHTML = ''; 

    setTimeout(() => {
        loader.style.display = 'none';
        data.forEach(image => {
            const attachment = document.createElement("div");
            attachment.className = "attachment";

            const fileNameSpan = document.createElement("span");
            fileNameSpan.textContent = image.file_name;

            const deleteIconSpan = document.createElement("span");
            deleteIconSpan.className = "delete-icon";

            const icon = document.createElement("i");
            icon.className = "fas fa-trash";

            deleteIconSpan.onclick = () => deleteImage(image.file_url);

            deleteIconSpan.appendChild(icon);
            attachment.appendChild(fileNameSpan);
            attachment.appendChild(deleteIconSpan);

            container.appendChild(attachment);
        });
        const button = document.getElementById('buttonSendModal');
        button.disabled = false; 
    }, 500);
}

function cleanModalForm() {
    const checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    const commentField = document.getElementById('commentCheck');
    if (commentField) {
        commentField.value = '';
    }

    listImagesDic = [];
    setElementImages(listImagesDic);
}

function redirection(file){
    const protocolo = window.location.protocol;    
    const hostname = window.location.hostname;      
    const puerto = window.location.port;            
    //---URL REDIRECTION LOGIN
    let urlRedirection = `${protocolo}//${hostname}:${puerto}/Soter_Check/${file}.html`
    window.location.href = urlRedirection;
}