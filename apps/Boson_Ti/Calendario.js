
let informationCliente = [];
let informationEquipo = [];
let informationForma = [];
let isProcessing = false; 
let dateClick = '';
let selectedEmployees = new Set(); // Guarda idUser seleccionados
let selectedDataEmployees = new Set(); // Guarda Usuarios generales


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
    selectedDataEmployees = lisDataEmployee;

    setInformationModal(selectedDataEmployees);
    document.getElementById("textSearch").addEventListener("input", function() {
        filterEmployees(this.value, selectedDataEmployees);
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
        drawCalendar('calendarFirst', dataCalendario, configCustom);
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
            let status = res.response && res.response.status_request ? res.response.status_request : '400';
            let folio = res.response && res.response.folio_request ? res.response.folio_request : '';

            if(status == '201'){
                //-----Event In
                const title = document.getElementById('inputSelectCliente').value;
                calendarInstance.addEvent({
                    title: document.getElementById('inputSelectCliente').value,
                    start: dateClick,
                    allDay: true
                });
                //----Clean
                cleanForm();
                isProcessing = false;
                document.getElementById("button-succes-modalForm").disabled = false;
                //----Close Modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalForm'));
                modal.hide();
                alert(`Se ha programado el servicio con folio ${folio}`);
              
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


//------SET CARD FILTER MODAL
function setInformationModal(data) {
    const div = document.getElementById("divEmpleados");
    div.innerHTML = ""; // Limpia contenido previo

    data.forEach((item, index) => {
        const isChecked = selectedEmployees.has(item.idUser) ? "checked" : "";

        const card = `
            <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                <div class="d-flex align-items-center bg-light rounded-3 p-3">
                    <div class="row w-100">
                        <div class="col-4 d-flex align-items-center">
                            <img src="${item.img}" 
                                 class="rounded-circle img-fluid"
                                 alt="foto"
                                 style="width:80px; height:60px; object-fit:cover;">
                        </div>
                        <div class="col-8 d-flex flex-column justify-content-center">
                            <div class="fw-bold person-name">${item.nombre}</div>
                            <div class="mt-2">
                                <input class="form-check-input chk-emp" type="checkbox" data-id="${item.idUser}" ${isChecked}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        div.insertAdjacentHTML("beforeend", card);
    });

    // Agregar eventos nuevamente (porque el DOM fue regenerado)
    document.querySelectorAll(".chk-emp").forEach(chk => {
        chk.addEventListener("change", function () {
            const id = this.getAttribute("data-id");
            if (this.checked) selectedEmployees.add(id);
            else selectedEmployees.delete(id);
        });
    });
}


function filterEmployees(text, fullData) {
    const search = text.toLowerCase();
    const filtered = fullData.filter(emp => emp.nombre.toLowerCase().includes(search));
    setInformationModal(filtered);
}
