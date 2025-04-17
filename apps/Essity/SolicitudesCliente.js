let listCatalog = [];
let listImagesDic = [];

window.onload = function(){
    //----Get Params
    setParams();
    //----Get Catalogs
    getCatalog();
    //----Assing Events
    document.getElementById("buttonSend").addEventListener("click", () => {
        sendRequest();
    });
    document.getElementById("producto").addEventListener("change", () => {
        setDataProduct();
    });

    document.getElementById("cameraButton").addEventListener("click", () => {
        openCamera(handleFile);
    });

    document.getElementById("galleryButton").addEventListener("click", () => {
        openFilePicker(handleFile);
    });


    onchangeSwitch();
    //-----Loading
    setTimeout(() => { hide_loading();}, 2000);
}

//----REQUEST
function getData(){
    //----Text
    const country =document.getElementById("textCountry").textContent;
    const client = document.getElementById("textClient").textContent;

    //----Catalog
    let catalog = {};
    const valueProduct = document.getElementById("producto").value;
    if(valueProduct != ''){
        catalog = listCatalog.find(item => item.producto === valueProduct);
    }
    //----Solicitud
    let solicitud = document.querySelector("input[name='tipoSolicitud']:checked")?.value || null;

    if (solicitud === "Otro") {
        const otroTexto = document.getElementById("otroTexto").value.trim();
        solicitud = otroTexto ? otroTexto : null;
    }
    //----Dic Return Daata    
    const formData = {
        client: client,
        country: country,
        catalog: catalog,
        tipoSolicitud: solicitud,
        solicitante: document.getElementById("solicitante").value,
        puesto: document.getElementById("puesto").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        puntoDeVenta: document.getElementById("puntoDeVenta").value,
        direccion: document.getElementById("direccion").value,
        descripcion: document.getElementById("descripcion").value,
    };
    return formData;
}

function sendRequest() {
    //---Get Data Form
    const dataForm = getData();
    const validation = getValidation(dataForm);

    //---Images
    listImagesDic
    dataForm['listImagesDic'] = listImagesDic;
    if(validation){
        console.log('dataForm',dataForm)
        //---Show Loading
        const loading = document.getElementById("loading");
        loading.style.visibility = 'visible';
        fetch(getUrlRequest('script'), {
            method: 'POST',
            body: JSON.stringify({
                script_id: 128252,
                option: 'create_record',
                dataForm: dataForm,
            }),
            headers:{
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((res) => {
            const data = res.response && res.response.data ? res.response.data : {};
            if(data.status_code != '400'){
                setStyles('succes');
                document.getElementById("textFolio").textContent = data.folio ? data.folio : 0 ;
            }else{
                setStyles('error');
            }
        })
    }
}

//----HIDE AND SHOW
function setStyles(status){
    const loading = document.getElementById("loading");
    const divForm = document.getElementById("divForm");
    const divSucces = document.getElementById("divSuccess");
    const divError = document.getElementById("divError");

    setTimeout(() => {
        divForm.style.display = 'none';
        loading.style.visibility = 'hidden';
        if(status == 'succes'){
            divSucces.classList.remove("d-none");
            divSucces.style.height = '100vh';
        }else if(status == 'error'){
            divError.classList.remove("d-none");
            divError.style.height = '100vh';
        }
        
    }, 2000);
}

//-----SWICHT
function onchangeSwitch(){
    const radioButtons = document.querySelectorAll('input[name="tipoSolicitud"]');
    const otroInputContainer = document.getElementById('otroInputContainer');
    const otroInput = document.getElementById('otroTexto');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.id === 'otro' && radio.checked) {
                otroInputContainer.style.display = 'block';
            } else {
                otroInputContainer.style.display = 'none';
                otroInput.value = ''; // Limpiar el campo de texto
            }
        });
    });
}

//----CATALOG
function getCatalog(){
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: 128252,
            option: 'get_catalog',
        }),
        headers:{
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then((res) => {
        const data = res.response && res.response.data ? res.response.data : [];
        if(data.length > 0){
            listCatalog = data;
            const selector = document.getElementById('producto'); data.forEach(item => {
                const opcion = document.createElement("option"); 
                opcion.value = item.producto; 
                opcion.textContent = item.producto; 
                selector.appendChild(opcion); 
            });
        }
    })
}

//----PARAMS
function setParams() {
    //----Data Text
    const textCountry =document.getElementById("textCountry");
    const textClient = document.getElementById("textClient");
    const valueCountry = getParameterURL('pais'); 
    const valueClient = getParameterURL('cliente'); 
    if(valueCountry){textCountry.textContent = valueCountry}
    if(valueClient){textClient.textContent = valueClient}


    //----Form Input
    const params = {
        applicant: "solicitante",
        position: "puesto",
        email: "correo",
        phone: "telefono",
        point: "puntoDeVenta",
        addres: "direccion",
        description: "descripcion",
    };

    for (const [key, elementId] of Object.entries(params)) {
        const value = getParameterURL(key); 
        if (value != null) { 
            document.getElementById(elementId).value = value;
        }
    }

    const tipoSolicitud = getParameterURL("request");
    if (tipoSolicitud != null) {
        const otroInputContainer = document.getElementById('otroInputContainer');
        const otroInput = document.getElementById('otroTexto');
        const radios = document.getElementsByName("tipoSolicitud");
        radios.forEach(radio => {
            if (radio.value === tipoSolicitud) {
                radio.checked = true; 
            }
            if (radio.id === "otro") {
                otroInputContainer.style.display = "block";
                otroInput.value = ""; 
            }
        });
    }

    const producto = getParameterURL("product");
    if (producto != null) {
        const selectElement = document.getElementById("producto");
        const options = Array.from(selectElement.options); 
        const match = options.find(option => option.value === producto);
        if (match) {
            match.selected = true; 
        }
    }
}

//-----VALIDATION
function getValidation(data){

    if (!data.solicitante || data.solicitante.trim() === "") {
        Swal.fire({
            title: "Error",
            html: "Por favor, ingrese un solicitante.",
            icon: "error",
        });
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.correo)) {
        Swal.fire({
            title: "Error",
            html: "Por favor, ingresa un correo válido.",
            icon: "error",
        });
        return false;
    }


    if (!data.tipoSolicitud || data.tipoSolicitud.trim() === "") {
        Swal.fire({
            title: "Error",
            html:"Por favor, selecciona o escribe un tipo de solicitud.",
            icon: "error",
        });
        return false;
    }

    if (!data.catalog ) {
        Swal.fire({
            title: "Error",
            html:"Por favor, selecciona un producto válido.",
            icon: "error",
        });
        return false;
    }

    if (!data.client || data.client.trim() === "") {
        Swal.fire({
            title: "Error",
            html:"Por favor, ingresa el cliente.",
            icon: "error",
        });
        return false;
    }

    if (!data.country || data.country.trim() === "") {
        Swal.fire({
            title: "Error",
            html:"Por favor, selecciona un pais.",
            icon: "error",
        });
        return false;
    }

    return true;
}

//----Data Product
function setDataProduct(){
    //----Elements
    const divDataProduct = document.getElementById("divDataProduct");
    const textFeature = document.getElementById("textFeature");
    const textFeatureSystem = document.getElementById("textFeatureSystem");
    const imgProduct = document.getElementById("imgProduct");

    //----Catalog
    let catalog = {};
    const valueProduct = document.getElementById("producto").value;
    if(valueProduct != ''){
        catalog = listCatalog.find(item => item.producto === valueProduct);
        textFeature.textContent = catalog.caracteristicas ? catalog.caracteristicas :'';
        textFeatureSystem.textContent = catalog.dispensador ? catalog.dispensador :'';
        if(catalog.foto.length > 0 && catalog.foto[0].file_url){
            const url =  catalog.foto[0].file_url;
            imgProduct.src = url;
        }else{
            imgProduct.src = 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6792643a1eea22cd5b0fc601.png';
        }
        divDataProduct.style.display = 'block';
    }
}


//---Function Images
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
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; 
    input.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file && callback) {
            callback(file); 
        }
    });

    input.click();
}

function handleFile(file) {
    if (!file) {
        alert('No existe archivo');
        return;
    }
    
    // Validar tipo de archivo
    const validTypes = ['image/png', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
        alert('Solo se permiten archivos PNG y JPG');
        return;
    }
    
    //--Clean List
    listImagesDic = [];

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
    formData.append('field_id', '67c216a1771dad0cfc67d732');
    formData.append('is_image', true);
    formData.append('form_id', 127391);

    fetch(getUrlRequest('uploadPicture'), {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(res => {
        imgUrl = res.file ? res.file : '';
        imgName = res.file_name ? res.file_name : '';
        listImagesDic.push({'file_name': imgName, 'file_url': imgUrl});
        divContent.style.display = 'block'; 
        divLoader.style.display = 'none'; 
        setTimeout(() => { 
            setElementImages(listImagesDic);
        }, 500);
    })
    .catch((error) => console.error("Error en el fetch:", error));
}


function setElementImages(data) {
    const container = document.getElementById('divListImages');
    const loader = document.getElementById('divLoadingImage');
    loader.style.display = 'flex';
    container.innerHTML = ''; 

    setTimeout(() => {
        loader.style.display = 'none';

        const rowDiv = document.createElement("div");
        rowDiv.className = "row justify-content-center"; 

        data.forEach(image => {
            const colDiv = document.createElement("div");
            colDiv.className = "col-12 col-md-6 col-lg-6 mb-4 position-relative"; 

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

            rowDiv.appendChild(colDiv);
        });

        container.appendChild(rowDiv);

        const button = document.getElementById('buttonSend');
        button.disabled = false;
    }, 500);
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