let dataCatalogInstitucion = [];


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

    document.getElementById('product_family').addEventListener('change', function () {
        getCatalogLine();
    });
    //---Catalog
    get_catalog();
    


    setTimeout(() => { hide_loading();}, 2000);
}

//-----LOAD DATA ACTIVE
function loadData(data) {
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
        didOpen: () => {
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
            //----Fetch data
            const JWT = getCookie("userJwt");
            fetch(getUrlRequest('script'), {
                method: 'POST',
                body: JSON.stringify({
                    script_name: 'crea_transpaso_sipre.py',
                    option: 'send_data',
                    to: type,
                    data: allSelected,
                }),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+JWT
                },
            })
            .then((res) => res.json())
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Información recibida',
                    text: `Folio: 001`, 
                    confirmButtonText: 'Aceptar'
                });

                //---Manda la petición de nuevo
                getInformation();

            })
            .catch(error => {
                // Manejo de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo enviar la información. Inténtalo de nuevo.',
                    confirmButtonText: 'Cerrar'
                });
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo enviar la información. Seleccione filas.',
                confirmButtonText: 'Cerrar'
            });
        }
    }else if(statusSession == 'Demo'){
        Swal.fire({
            icon: 'success',
            title: 'Información recibida',
            text: `Folio: 001`, 
            confirmButtonText: 'Aceptar'
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
            setCatalogSimple(catalog,'product_family');
        }
    })
}

//-------GET CATALOG LINE
function getCatalogLine() {
    const familySelect = document.getElementById('product_family');
    const lineSelect = document.getElementById('product_line');


    //---Validation Select
    if (!familySelect || !lineSelect) {
        return;
    }
    const selectedFamily = familySelect.value;

    //---Clean
    lineSelect.innerHTML = '';
      
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione una opción';
    lineSelect.appendChild(defaultOption);

    //---Validation Empty
    if (!selectedFamily) {
        return;
    }



    const scriptId = getParameterURL('script_id');
    const JWT = getCookie("userJwt");
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: 125216,
            option: 'get_product_line',
            product_code: selectedFamily,
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+JWT
        },
    })
    .then((res) => res.json())
    .then((res) => {
        const catalog = res.response && res.response.product_line ? res.response.product_line : {};
        if(catalog){
            setCatalogSimple(catalog,'product_line');
        }
    })
}

