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
    //-----Loading
    setTimeout(() => { hide_loading();}, 2000);
}


//----REQUEST
function getData(){
    //----Catalog
    let catalog = {};
    const valueProduct = document.getElementById("producto").value;
    if(valueProduct != ''){
        catalog = listCatalog.find(item => item.producto === valueProduct);
    }
    //----Dic Return Daata    
    const formData = {
        nombreCliente: document.getElementById("nombreCliente").value,
        solicitante: document.getElementById("solicitante").value,
        puesto: document.getElementById("puesto").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        puntoDeVenta: document.getElementById("puntoDeVenta").value,
        direccion: document.getElementById("direccion").value,
        tipoSolicitud: document.querySelector("input[name='tipoSolicitud']:checked")?.value || null,
        descripcion: document.getElementById("descripcion").value,
        catalog: catalog,
    };
    return formData;
}

function sendRequest() {
    //---Show Loading
    const loading = document.getElementById("loading");
    loading.style.visibility = 'visible';
    //---Get Data Form
    const dataForm = getData();
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
        const data = res.response && res.response.data ? res.response.data : [];
        if(data.status_code != '400'){
            setStyles('succes');
        }else{
            setStyles('error');
        }
    })
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
    const params = {
        name: "nombreCliente",
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
        const radios = document.getElementsByName("tipoSolicitud");
        radios.forEach(radio => {
            if (radio.value === tipoSolicitud) {
                radio.checked = true; 
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