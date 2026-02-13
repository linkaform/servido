let informationTecnico = [];
let informationForma = [];
let informationCompany = [];
let informationCliente = [];
let informationApoyo = [];

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
    document.getElementById('button-succes-modalForm').innerText = 'Enviar';
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
    //----Change title
    document.getElementById('button-succes-modalForm').innerText = 'Enviar';
    

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
        const newFormatDataCalendario = setColor(dataCalendario);
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
        const catalog_company = res.response && res.response.data && res.response.data.catalog_company ? res.response.data.catalog_company : [];
        const catalog_apoyo = res.response && res.response.data && res.response.data.catalog_apoyo ? res.response.data.catalog_apoyo : [];

        if(catalog_cliente.length > 0){
            informationCliente = catalog_cliente;
            set_catalog_select(catalog_cliente, 'nombre_cliente', 'cliente');
            set_catalog_select(catalog_cliente, 'nombre_cliente', 'inputSelectCliente');
        }
        if(catalog_tecnico.length > 0){
            informationTecnico = catalog_tecnico;
            set_catalog_select(catalog_tecnico, 'nombre_tecnico', 'tecnico');
            set_catalog_select(catalog_tecnico, 'nombre_tecnico', 'inputSelectTecnico');
        }
        if(catalog_forma.length > 0){
            informationForma = catalog_forma;
            set_catalog_select(catalog_forma, 'forma', 'inputSelectForma');
        }
        if(catalog_company.length > 0){
            informationCompany = catalog_company;
            set_catalog_select(catalog_company, 'company', 'company');
            set_catalog_select(catalog_company, 'company', 'inputSelectCompany');
        }
        if(catalog_apoyo.length > 0){
            informationApoyo = catalog_apoyo;
            setDivTecnicianAux();
        }
    })
}

//-----SET PROD
function setColor(data = []) {
    if (!Array.isArray(data) || data.length === 0) return data;

    return data.map(event => {
        const company = event?.extendedProps?.textCompany;
        const status = event?.extendedProps?.textStatus;

        let backgroundColor = '#9e9e9e'; // gris por defecto
        let textColor = '#ffffff';

        // PRIORIDAD 1: Finalizado
        if (status === 'Finalizado' || status === 'finalizado') {
            backgroundColor = '#ff9800'; // naranja
        }
        // PRIORIDAD 2: Cancelado
        else if (status === 'Cancelado' || status === 'cancelado') {
            backgroundColor = '#D73219'; // rojo
        }
        // PRIORIDAD 3: Reprogramado
        else if (status === 'Reprogramado' || status === 'reprogramado') {
            backgroundColor = '#D7195F'; // rosa
        }
        // PRIORIDAD 2: Compañía
        else if (company === 'Boson TI' || company === 'Boson') {
            backgroundColor = '#4caf50'; // verde
        }
        else if (company === 'Ditran') {
            backgroundColor = '#2196f3'; // azul
        }

        return {
            ...event,
            backgroundColor,
            borderColor: backgroundColor,
            eventColor: backgroundColor,
            textColor,
        };
    });
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
    const validation = validationsForm(formData);
    if(validation){
        formData = getInformationCatalog(formData);
        formData = getTecnicosAuxSeleccionados(formData);

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
                alert('Programación de servicio creado con éxito');
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
    console.log('data',data)
    if (!data.inputDatetimeServicio) return showError("Seleccione Fecha de Programación de Servicio", "inputDatetimeServicio");
    if (!data.inputSelectCliente) return showError("Seleccione un Cliente", "inputSelectCliente");
    if (!data.inputSelectTecnico) return showError("Seleccione un Técnico", "inputSelectTecnico");
    if (!data.inputSelectForma) return showError("Seleccione una forma", "inputSelectForma");
    if (!data.inputTextDireccion) return showError("Especifique una Dirección", "inputTextDireccion");
    //if (!data.inputTextNick) return showError("Especifique un Nick/Eco", "inputTextNick");

    return true;
}

//----GET CATALOG INFORMATION
function getInformationCatalog(datos) {
    const mappings = [
        {
            key: "inputSelectCompany",
            catalog: informationCompany,
            compare: "company",
            assign: "dicCompany"
        },
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
        {
            key: "inputSelectTecnico",
            catalog: informationTecnico,
            compare: "nombre_tecnico",
            assign: "dicTecnico"
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
    // --- Limpiar inputs principales
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

    // --- Restaurar estados específicos
    document.getElementById('inputDatetimeServicio').disabled = false;
    document.getElementById('inputDescSocial').textContent = '';
    document.getElementById('inputDescCliente').textContent = '';

    // --- Limpiar completamente los técnicos auxiliares
    const containerAux = document.getElementById('divSelectTecnicosAux');
    if (containerAux) {
        containerAux.innerHTML = ''; // elimina todo
        setDivTecnicianAux();        // crea solo uno nuevo
    }
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

//-----Tecnicos Auxiliares
function setDivTecnicianAux() {

    const container = document.getElementById('divSelectTecnicosAux');
    if (!container) return;

    const selectClass = 'select-tecnico-aux';
    const randomId = `selectAux_${crypto.randomUUID()}`;

    // Ordenar apoyos A → Z
    const apoyosOrdenados = Array.isArray(informationApoyo)
        ? [...informationApoyo].sort((a, b) =>
            (a.apoyo || '').localeCompare(b.apoyo || '', 'es', { sensitivity: 'base' })
        )
        : [];

    // Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'mb-3 d-flex align-items-center gap-2';

    // Select
    const select = document.createElement('select');
    select.className = `form-select ${selectClass}`;
    select.id = randomId;

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione Opción';
    select.appendChild(defaultOption);

    apoyosOrdenados.forEach(item => {
        const option = document.createElement('option');
        option.value = item.apoyo;
        option.textContent = item.apoyo;
        select.appendChild(option);
    });

    // Botón eliminar
    const btnDelete = document.createElement('button');
    btnDelete.type = 'button';
    btnDelete.className = 'btn btn-outline-danger';
    btnDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';

    btnDelete.addEventListener('click', () => {
        const totalSelects = container.querySelectorAll(`.${selectClass}`).length;
        if (totalSelects <= 1) {
            alert('Debe existir al menos un técnico auxiliar');
            return;
        }
        wrapper.remove();
    });

    // Botón agregar
    const btnAdd = document.createElement('button');
    btnAdd.type = 'button';
    btnAdd.className = 'btn btn-outline-success';
    btnAdd.innerHTML = '<i class="fa-solid fa-plus"></i>';

    btnAdd.addEventListener('click', () => {
        setDivTecnicianAux();
    });

    // Append
    wrapper.appendChild(select);
    wrapper.appendChild(btnAdd);
    wrapper.appendChild(btnDelete);
    container.appendChild(wrapper);
}


function getTecnicosAuxSeleccionados(formData) {

    const listaApoyo = Array.from(
        document.querySelectorAll('.select-tecnico-aux')
    )
    .map(select => select.value)
    .filter(value => value !== '');

    formData['lista_apoyo'] = listaApoyo;

    return formData;
}
