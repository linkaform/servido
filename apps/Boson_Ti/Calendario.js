
function getDataClient(nombreCliente) {

    const clearFields = () => {
        ['inputDescSocial', 'inputDescCliente', 'inputDescEmail'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        });
    };

    // 👉 Si viene vacío, limpiar y salir
    if (!nombreCliente) {
        clearFields();
        return;
    }

    if (!Array.isArray(informationCliente)) {
        clearFields();
        return;
    }

    // Buscar coincidencia
    const cliente = informationCliente.find(
        item => item.nombre_cliente === nombreCliente
    );

    // Si no se encuentra, limpiar
    if (!cliente) {
        clearFields();
        return;
    }

    // Rellenar datos
    document.getElementById('inputDescSocial').textContent = cliente.razon_cliente ?? '';
    document.getElementById('inputDescCliente').textContent = cliente.nombre_cliente ?? '';
    document.getElementById('inputDescEmail').textContent = cliente.email_cliente || cliente.email || '';
}

let informationTecnico = [];
let informationForma = [];

let isProcessing = false; 
let dateClick = '';
//-----IMPORTANT
let calendarInstance = null;

window.onload = function(){
  createElements(dicReportContext);
  setElementsStyle();
  const statusSession = getSession();
  if(statusSession == 'Active'){
    loadData();
  }else if(statusSession == 'Demo'){
    loadDemoData();
  }else if(statusSession == 'Offline'){
    loadDemoData();
  } 
}

//-----LOAD DATA DEMO
function loadDemoData(){
    //----Set Events
    drawCalendar('calendarFirst', events, configCustom);

    document.getElementById("button-succes-modalForm").addEventListener("click", () => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalForm'));
        modal.hide();
        alert('No se ha guardado su evento');
    });

    //---Hide Loader
    setTimeout(() => { hide_loading();}, 2000);
}

//-----LOAD DATA ACTIVE
function loadData(data) {
    //----Search Catalogs
    get_catalog();
    //----Assing Events
    document.getElementById("buttonExecution").addEventListener("click", () => {getInformation();});
    document.getElementById("button-succes-modalForm").addEventListener("click", () => {setCreateRecord();});
    document.getElementById("inputSelectCliente").addEventListener("change", (event) => {getDataClient(event.target.value);});

    //-----Loading
    setTimeout(() => { hide_loading();}, 2000);
}

//-----SET REQUEST ACTIVE
async function getInformation(){
    showLoadingComponent();
    const scriptId = getParameterURL('script_id');
    const demo = getParameterURL('demo');
    const statusSession = getSession();
    const dicAdional = {'option':'get_records'}

    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        //----Request
        const responseRequest = await sendRequestReport(scriptId, dicAdional);
        const dataCalendario = responseRequest.response && responseRequest.response.dataCalendario && responseRequest.response.dataCalendario.length > 0 ? responseRequest.response.dataCalendario : [];
        const newFormatDataCalendario = setColorTecnico(dataCalendario);
        console.log(newFormatDataCalendario)
        drawCalendar('calendarFirst', newFormatDataCalendario, configCustom);
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}

//-----GET CATALOG
function get_catalog(){
    const scriptId = getParameterURL('script_id');
    const JWT = getCookie("userJwt");
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: scriptId,
            option: 'get_catalog',
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+JWT
        },
    })
    .then((res) => res.json())
    .then((res) => {
        const catalog_cliente = res.response && res.response.data && res.response.data.catalog_cliente ? res.response.data.catalog_cliente : [];
        const catalog_tecnico = res.response && res.response.data && res.response.data.catalog_tecnico ? res.response.data.catalog_tecnico : [];
        const catalog_forma = res.response && res.response.data && res.response.data.catalog_forma ? res.response.data.catalog_forma : [];

        if(catalog_cliente.length > 0){
            informationCliente = catalog_cliente;
            set_catalog_select(catalog_cliente, 'nombre_cliente', 'cliente');
            set_catalog_select(catalog_cliente, 'nombre_cliente', 'inputSelectCliente');
        }
        if(catalog_tecnico.length > 0){
            informationTecnico = catalog_tecnico;
            set_catalog_select(catalog_tecnico, 'nombre_tecnico', 'tecnico');
        }
        if(catalog_forma.length > 0){
            informationForma = catalog_forma;
            set_catalog_select(catalog_forma, 'forma', 'inputSelectForma');
        }
    })
}

//-----SET PROD
function setColorTecnico(data = []) {
    if (!Array.isArray(data) || data.length === 0) return data;

    const tecnicos = [...new Set(
        data.map(e => e.description).filter(Boolean)
    )];

    const colors = getPAlleteColors(14, tecnicos.length);
    const tecnicoColorMap = {};
    tecnicos.forEach((tecnico, index) => {
        tecnicoColorMap[tecnico] = colors[index];
    });

    return data.map(event => ({
        ...event,
        backgroundColor: tecnicoColorMap[event.description],
        eventColor: tecnicoColorMap[event.description],
        borderColor: tecnicoColorMap[event.description],
        textColor: '#fff' // opcional
    }));
}

//-----SET REQUEST CREATE
async function setCreateRecord(){
    //---Parametros
    const scriptId = getParameterURL('script_id');
    const JWT = getCookie("userJwt");
    //---Validation Executions
    if (isProcessing) return; 
    isProcessing = true;
    document.getElementById("button-succes-modalForm").disabled = true;

    //---Data Information
    let formData = getFormData();
    const validation = validationsForm(formData)
    if(validation){
        formData = getInformationCatalog(formData);
        fetch(getUrlRequest('script'), {
            method: 'POST',
            body: JSON.stringify({
                script_id: scriptId,
                option: 'creation_record',
                formInformation: formData,
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+JWT
            },
        })
        .then((res) => res.json())
        .then((res) => {
            let status = res.response && res.response.status_request ? res.response.status_request : '400';
            let folio = res.response && res.response.folio_request ? res.response.folio_request : '';
            if(status == '201'){
                //----Clean
                cleanForm();
                isProcessing = false;
                document.getElementById("button-succes-modalForm").disabled = false;
                //----Close Modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalForm'));
                modal.hide();
                alert('Su programación se a creado, procederemos a recargar');
                //----Update
                setTimeout(() => {
                    getInformation();
                }, 1500);
            }else{
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalForm'));
                modal.hide();
                alert('No se ha programado su servicio');
                isProcessing = false;
                document.getElementById("button-succes-modalForm").disabled = false;
            }
        })

    }else{
        isProcessing = false;
        document.getElementById("button-succes-modalForm").disabled = false;
    }
}

//-------Get Data
function getDataClient(nombreCliente) {

    const clearFields = () => {
        ['inputDescSocial', 'inputDescCliente', 'inputDescEmail'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        });
    };

    if (!nombreCliente) {
        clearFields();
        return;
    }

    if (!Array.isArray(informationCliente)) {
        clearFields();
        return;
    }

    const cliente = informationCliente.find(
        item => item.nombre_cliente === nombreCliente
    );

    if (!cliente) {
        clearFields();
        return;
    }

    // Rellenar datos
    document.getElementById('inputDescSocial').textContent = cliente.razon_cliente ?? '';
    document.getElementById('inputDescCliente').textContent = cliente.nombre_cliente ?? '';
    document.getElementById('inputDescEmail').textContent = cliente.email_cliente || cliente.email || '';
}



//-----VALIDATION FORM
function validationsForm(data) {

    const showError = (msg, focusId = null) => {
        alert(msg);
        document.getElementById("button-succes-modalForm").disabled = false;
        if (focusId) {
            const el = document.getElementById(focusId);
            if (el) el.focus();
        }
        return false;
    };

    // Validaciones principales
    if (!data.inputDatetimeServicio) return showError("Seleccione Fecha de Programación de Servicio", "inputDatetimeServicio");
    if (!data.inputSelectCliente) return showError("Seleccione un Cliente", "inputSelectCliente");
    if (!data.inputSelectForma) return showError("Seleccione una forma", "inputSelectForma");
    if (!data.inputTextDireccion) return showError("Especifique una Dirección", "inputTextDireccion");
    if (!data.inputTextNick) return showError("Especifique un Nick/Eco", "inputTextNick");

    return true;
}

//----GET CATALOG INFORMATION
function getInformationCatalog(datos) {
    const mappings = [
        {
            key: "inputSelectCliente",
            catalog: informationCliente,
            compare: "nombre_cliente",
            assign: "dicClient"
        },
        {
            key: "inputSelectForma",
            catalog: informationForma,
            compare: "forma",
            assign: "dicForm"
        },
    ];

    mappings.forEach(({ key, catalog, compare, assign, condition }) => {
        if (datos[key] && (!condition || condition(datos))) {
            const match = catalog.find(item => item[compare] === datos[key]);
            datos[assign] = match || null;
        }
    });

    return datos;
}

//-----GET DATA 
function cleanForm() {
    //---Clean
    const elements = document.querySelectorAll('.classFormInputs');
    elements.forEach(element => {
        if (element.tagName === 'INPUT') {
            element.value = '';
        } else if (element.tagName === 'SELECT') {
            element.selectedIndex = 0;
        } else if (element.tagName === 'TEXTAREA') {
            element.value = '';
        }
    });
}

//-----FORM DATA
function getFormData(){
    const datos = {};
    const inputs = document.querySelectorAll(".classFormInputs");
    inputs.forEach((input) => {
        if (input.type === "radio") {
            if (input.checked) {
                datos[input.id] = input.value;
            }
        } else if (input.tagName.toLowerCase() === "select") {
            datos[input.id] = input.value; 
        } else {
            datos[input.id] = input.value;
        }
    });
    //-----Add Date
    if (dateClick) {
        datos["eventDate"] = dateClick;
    }

    return datos
}

