let listCatalog = [];

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
    if(validation){
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.correo)) {
        Swal.fire({
            title: "Error",
            html: "Por favor, ingresa un correo válido.",
            icon: "error",
        });
        return false;
    }

    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(data.telefono)) {
        Swal.fire({
            title: "Error",
            html:"Por favor, ingresa un teléfono válido (10 dígitos).",
            icon: "error",
        });
        return false;
    }

    if (!data.tipoSolicitud || data.tipoSolicitud.trim() === "") {
        Swal.fire({
            title: "Error",
            html:"Por favor, selecciona o escribe un tipo de solicitud válido.",
            icon: "error",
        });
        return false;
    }

    if (!data.catalog ) {
        
        Swal.fire({
            title: "Error",
            html:"Por favor, selecciona un catálogo válido.",
            icon: "error",
        });
        return false;
    }

    if (!data.client || data.client.trim() === "") {
        Swal.fire({
            title: "Error",
            html:"Por favor, selecciona un cliente válido.",
            icon: "error",
        });
        return false;
    }

    if (!data.country || data.country.trim() === "") {
        Swal.fire({
            title: "Error",
            html:"Por favor, selecciona un cliente válido.",
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