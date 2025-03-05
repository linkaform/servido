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
    drawTableElement('tableFirst', dataTable1, columsTable1, undefined, configTableCustom1);
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

    //----Assign Selector
    $('#institucion').on('change', function() {
        const selectedValues = $(this).val(); 
        if (selectedValues && selectedValues.length > 0) {
            dicFind = findListDictionary(dataCatalogInstitucion, 'institucion', selectedValues);
            set_catalog_select(dicFind, 'grupo', 'grupo');
            $('#grupo').select2();
        } else {
            set_clean_select('grupo');
            set_clean_select('mentor');
            $('#grupo').select2();
            $('#mentor').select2();
        }
    });

    $('#grupo').on('change', function() {
        const selectedValues = $(this).val(); 
        if (selectedValues && selectedValues.length > 0) {
            dicFind = findListDictionary(dataCatalogInstitucion, 'grupo', selectedValues);
            set_catalog_select(dicFind, 'mentor', 'mentor');
            $('#grupo').select2();
        } else {
            set_clean_select('mentor');
            $('#mentor').select2();
        }
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
    const dicAdional = {'option':'report'}
    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReport(scriptId,dicAdional);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
        const colums = data.colums ? data.colums : [];
        const dataTable = data.data  ? data.data : [];
        console.log('dataTable',dataTable)
        if(dataTable){
            let insertIndex = columsTable1Prod.findIndex(col => col.field === 'name') + 1;
            columsTable1Prod.splice(insertIndex, 0, ...colums);
            drawTableElement('tableFirst', dataTable, columsTable1Prod, undefined, configTableCustom1);
        }
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}


function get_catalog(){
    const scriptId = getParameterURL('script_id');
    const JWT = getCookie("userJwt");
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: scriptId,
            option: 'filter',
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+JWT
        },
    })
    .then((res) => res.json())
    .then((res) => {
        const catalog_institucion = res.response && res.response.catalog_institucion ? res.response.catalog_institucion : [];
        const catalog_taller = res.response && res.response.catalog_taller ? res.response.catalog_taller : [];

        if(catalog_institucion.length > 0){
            dataCatalogInstitucion = catalog_institucion;
            set_catalog_select(catalog_institucion, 'institucion', 'institucion');
        }

        if(catalog_taller.length > 0){
            set_catalog_select(catalog_taller, 'taller', 'taller');
        }
    })
}