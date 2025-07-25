let dataCatalogInstitucion = [];
let isProductFamiliesOpen = false;


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

    $('#product_families').on('select2:open', function () {
        isProductFamiliesOpen = true;
    });

    $('#product_families').on('select2:close', function () {
        isProductFamiliesOpen = false;
    });
}

//-----LOAD DATA DEMO
function loadDemoData(){
    //---Elements
    drawTableElement('tableFirst', dataTable1, columsTable1);
    drawTableElement('tableSecond', dataTable2, columsTable2);
    drawTableElement('tableThird', dataTable3, columsTable3);
    drawTableElement('tableFourth', dataTable4, columsTable4);

  
    //---Events
    document.getElementById("button-custom-tableFirst").addEventListener("click", () => {
        getRowsData('mty');
    });

    document.getElementById("button-custom-tableThird").addEventListener("click", () => {
        getRowsData('gdl');
    });

    //---Catalog
    get_catalog();
    


    setTimeout(() => { hide_loading();}, 2000);
}

//-----LOAD DATA ACTIVE
function loadData(data) {
    showLoadingProductFamilies();
    //----Search Catalogs
    get_catalog();
    //----Assing Events
    const buttonExecution = document.getElementById("buttonExecution");
    buttonExecution.addEventListener("click", () => {
        getInformation();
    });

    //---Events
    document.getElementById("button-custom-tableFirst").addEventListener("click", () => {
        getRowsData('mty');
    });

    document.getElementById("button-custom-tableThird").addEventListener("click", () => {
        getRowsData('gdl');
    });

    //-----Loading
    setTimeout(() => { hide_loading();}, 2000);
}

//-----SET REQUEST ACTIVE
async function getInformation(){
    showLoadingComponent();
    const scriptId = getParameterURL('script_id');
    const demo = getParameterURL('demo');
    const statusSession = getSession();
    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReport(scriptId);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
        if (data.tableFirst) {
            drawTableElement('tableFirst', data.tableFirst, columsTable1);
        }
        if (data.tableSecond) {
            drawTableElement('tableSecond', data.tableSecond, columsTable2);
        }
        if (data.tableThird) {
            drawTableElement('tableThird', data.tableThird, columsTable3);
        }
        if (data.tableFourth) {
            drawTableElement('tableFourth', data.tableFourth, columsTable4);
        }
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}

//----GET DATA
function getRowsData(type = null) {
    //-----Loader
    Swal.fire({
        title: 'Se ha enviado información',
        html: 'Por favor espera...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });
    //----Sesion
    const statusSession = getSession();
    if(statusSession == 'Active'){
        ///---Asign 
        let allSelected = []
        if(type == 'mty'){
            allSelected = getSelectedDataClean('tableFirst');
        }else if(type == 'gdl'){
            allSelected = getSelectedDataClean('tableThird');
        }
       
        if(allSelected.length > 0){
            Swal.fire({
                title: '¿Desea realizar el traspaso?',
                text: 'Confirme si desea continuar con el traspaso.',
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        title: 'Realizando traspaso...',
                        allowOutsideClick: false,
                        onBeforeOpen: () => {
                            Swal.showLoading();
                        }
                    });
                    sendTraspaso(type, allSelected);
                } else {
                    Swal.fire({
                        type: 'info',
                        title: 'Traspaso cancelado',
                        text: 'No se realizó ningún traspaso.',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        }else{
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'No se pudo enviar la información. Seleccione filas.',
                confirmButtonText: 'Cerrar'
            });
        }
    }else if(statusSession == 'Demo'){
        Swal.fire({
            title: '¿Desea realizar el traspaso?',
            text: 'Confirme si desea continuar con el traspaso.',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Realizando traspaso...',
                    allowOutsideClick: false,
                    onBeforeOpen: () => {
                        Swal.showLoading();
                    }
                });
                setTimeout(() => {
                    Swal.fire({
                        type: 'success',
                        title: 'Traspaso realizado',
                        text: 'El traspaso se ha realizado exitosamente.',
                        confirmButtonText: 'Aceptar'
                    });
                }, 2000);
            } else {
                Swal.fire({
                    type: 'info',
                    title: 'Traspaso cancelado',
                    text: 'No se realizó ningún traspaso.',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    }
}

function getSelectedDataClean(tableId) {
    const table = Tabulator.findTable(`#${tableId}`)[0];
    if (!table) return [];

    const selectedRows = table.getSelectedData(); // obtiene la data "cruda"
    
    // Solo conservar los campos definidos en las columnas
    const columnFields = table.getColumnDefinitions().map(col => col.field);

    const cleanedData = selectedRows.map(row => {
        let clean = {};
        columnFields.forEach(field => {
            clean[field] = row[field];
        });
        return clean;
    });

    return cleanedData;
}

function showLoadingProductFamilies() {
    const select = $('#product_families');
    select.empty();
    select.append('<option disabled>Cargando...</option>');
    select.trigger('change');
}

//-----GET CATALOG
function get_catalog(){
    const scriptId = getParameterURL('script_id');
    const JWT = getCookie("userJwt");
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: 125216,
            option: 'get_catalog',
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+JWT
        },
    })
    .then((res) => res.json())
    .then((res) => {
        const catalog = res.response && res.response.dataCatalogProductFamily ? res.response.dataCatalogProductFamily : {};
        if(catalog){
            setCatalogSimple(catalog,'product_families', undefined, true);
            if (isProductFamiliesOpen) {
                $('#product_families').trigger('change');
                $('#product_families').select2('close');
                $('#product_families').select2('open');
            }
        }
    })
}

const sendTraspaso = async (type, allSelected) => {
    const JWT = getCookie("userJwt");
    try {
        const respuesta = await fetch(getUrlRequest('script'), {
            method: 'POST',
            body: JSON.stringify({
                script_name: 'do_traspaso_lkf.py',
                to: type,
                data: allSelected,
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JWT
            },
        });
        const data = await respuesta.json();
        const sipre_folio = data?.response?.sipre_folio;
        Swal.fire({
            type: 'success',
            title: 'Traspaso realizado',
            html: 'El traspaso se ha realizado exitosamente. Guardado en SIPRE con folio: <strong>' + sipre_folio + '</strong>',
            confirmButtonText: 'Aceptar'
        });
        console.log(data);
    } catch (error) {
        Swal.fire({
            type: 'error',
            title: 'Traspaso fallido',
            text: 'El traspaso tuvo un error al realizarse, revisa el log.',
            confirmButtonText: 'Aceptar'
        });
        console.error('Error:', error);
    }
}