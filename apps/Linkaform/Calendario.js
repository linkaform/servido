
let informationCliente = [];
let informationEquipo = [];
let informationForma = [];
let isProcessing = false; 
let dateClick = '';


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

    //---Click Check
    document.getElementById("inputSwitchCatalogI_option_0").addEventListener("click", () => {
       setFormItem('si')
    });
    document.getElementById("inputSwitchCatalogI_option_1").addEventListener("click", () => {
       setFormItem('no')
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
    document.getElementById("inputSwitchCatalogI_option_0").addEventListener("click", () => {setFormItem('si')});
    document.getElementById("inputSwitchCatalogI_option_1").addEventListener("click", () => {setFormItem('no')});
    //-----Loading
    setTimeout(() => { hide_loading();}, 2000);
}

//-----SET REQUEST ACTIVE
async function getInformation(){
    showLoadingComponent();
    const scriptId = getParameterURL('script_id');
    const demo = getParameterURL('demo');
    const statusSession = getSession();
    const dicAdional = {'option':'report'}
    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        //----Request
        const responseRequest = await sendRequestReport(scriptId);
        const dataCalendario = responseRequest.response && responseRequest.response.dataCalendario && responseRequest.response.dataCalendario.length > 0 ? responseRequest.response.dataCalendario : [];
        drawCalendar('calendarFirst', dataCalendario, configCustom);
        console.log('data',dataCalendario)
        //-----Style
        hideLoadingComponent();
        showElements();
    }
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
            let status = res.response && res.response.status ? res.response.status : '400';
            if(status == '201'){
                //----Close Modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalForm'));
                modal.hide();
                cleanForm();
                alert('Se ha guardado su evento');

                //-----Event In
                const title = document.getElementById('inputSelectCliente').value;
                const date = document.getElementById('eventDate').value;
                calendar.addEvent({
                    title: title,
                    start: date,
                    allDay: true
                });
            }else{
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalForm'));
                modal.hide();
                alert('No se ha guardado su evento');
            }
        })
    }else{
        isProcessing = false;
        document.getElementById("button-succes-modalForm").disabled = false;
    }
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
    if (!data.inputSelectCliente) return showError("Seleccione Cliente", "inputSelectCliente");
    if (!data.inputTextContacto) return showError("Ingrese datos requeridos de Nombre de contacto", "inputTextContacto");
    if (!data.inputTextAreaTrabajo) return showError("Ingrese datos requeridos de Trabajo a realizar", "inputTextAreaTrabajo");

    if (data.inputNumberCelular) {
        if (!/^\d+$/.test(data.inputNumberCelular)) {
            return showError("El número debe contener solo dígitos", "inputNumberCelular");
        }
    }

    if (!data.inputSelectForma) return showError("Seleccione un tipo de checklist", "inputSelectForma");

    // Validación de catálogo vs input manual
    if (data.inputSwitchCatalogI_option_0 === "Sí") {
        if (!data.inputSelectEquipo) return showError("Seleccione un Equipo del catálogo", "inputSelectEquipo");
    } else {
        if (!data.inputTextCatalogEquipo) return showError("Ingrese datos del Equipo", "inputTextCatalogEquipo");
        if (!data.inputTextCatalogMarca) return showError("Ingrese Marca del Equipo", "inputTextCatalogMarca");
        if (!data.inputTextCatalogModelo) return showError("Ingrese Modelo del Equipo", "inputTextCatalogModelo");
    }

    if (!data.inputTextOrden) return showError("Especifique Orden", "inputTextOrden");
    return true;
}

//-----GET DATA 
function cleanForm() {
    //---Clean
    const elements = document.querySelectorAll('.classFormInputs');
    elements.forEach(element => {
        if (element.tagName === 'INPUT') {
        if (element.type === 'checkbox' || element.type === 'radio') {
        element.checked = false;
        } else {
        element.value = '';
        }
        } else if (element.tagName === 'SELECT') {
        element.selectedIndex = 0;
        } else if (element.tagName === 'TEXTAREA') {
        element.value = '';
        }
    });

    //---Hide and Show
    const classDivCatalog = document.querySelectorAll(".div-catalog-item");
    const classDivItem = document.querySelectorAll(".div-input-item");

    classDivCatalog.forEach((elemento) => { elemento.style.display = "none"; });
    classDivItem.forEach((elemento) => { elemento.style.display = "none"; });
}

//----GET CATALOG
function getInformationCatalog(datos) {
    const mappings = [
        {
            key: "inputSelectCliente",
            catalog: informationCliente,
            compare: "razon_cliente",
            assign: "dicClient"
        },
        {
            key: "inputSelectEquipo",
            catalog: informationEquipo,
            compare: "nombre_equipo",
            assign: "dicItem",
            condition: d => d.inputSwitchCatalogI_option_0 === "Sí"
        },
        {
            key: "inputSelectForma",
            catalog: informationForma,
            compare: "forma",
            assign: "dicCheck"
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

//-----SHOW AND HIDE OPTIONS
function setFormItem(option) {
    const divCatalog =  document.getElementById('inputSelectEquipo')?.closest("div");
    const divItemEquipo =  document.getElementById('inputTextCatalogEquipo')?.closest("div");
    const divItemMarca =  document.getElementById('inputTextCatalogMarca')?.closest("div");
    const divItemModelo =  document.getElementById('inputTextCatalogModelo')?.closest("div");
    if (option == 'si') {
        divCatalog.style.display = "block"; 
        divItemEquipo.style.display = "none";
        divItemMarca.style.display = "none";
        divItemModelo.style.display = "none";
    }else if(option == 'no'){
        divCatalog.style.display = "none"; 
        divItemEquipo.style.display = "block";
        divItemMarca.style.display = "block";
        divItemModelo.style.display = "block";
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
        const catalog_equipo = res.response && res.response.data && res.response.data.catalog_equipo ? res.response.data.catalog_equipo : [];
        const catalog_forma = res.response && res.response.data && res.response.data.catalog_forma ? res.response.data.catalog_forma : [];

        if(catalog_cliente.length > 0){
            informationCliente = catalog_cliente;
            set_catalog_select(catalog_cliente, 'razon_cliente', 'cliente');
            set_catalog_select(catalog_cliente, 'razon_cliente', 'inputSelectCliente');
        }
        if(catalog_equipo.length > 0){
            informationEquipo = catalog_equipo;
            set_catalog_select(catalog_equipo, 'nombre_equipo', 'inputSelectEquipo');
        }
        if(catalog_forma.length > 0){
            informationForma = catalog_forma;
            set_catalog_select(catalog_forma, 'forma', 'inputSelectForma');
        }
    })
}