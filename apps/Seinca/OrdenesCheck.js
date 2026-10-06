let dataCatalogs = [];
window.onload = function(){
    createElements(dicReportContext);
    setElementsStyleNew();
    const statusSession = getSessionNew();
    if (statusSession === 'Active') {
        loadData();
    } else {
        loadDemoData();
    }
}

function loadDemoData(){
    drawTableElement('tableFirst', dataTable1, columsTable1, 'Ordenes_Checks', undefined, designPDF);
    drawTableElement('tableSecond', dataTable2, columsTable2, 'Ordenes_Tardanza', configTableCustom2, designPDF2);
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

    //-----Select All
    controllerAllOptions("empleado"); 

    //-----Loading
    setTimeout(() => { hide_loading();}, 2000);
}

//-----SET REQUEST
async function getInformation(){
    showLoadingComponent();
    const scriptId = getParameterURL('script_id');
    const demo = getParameterURL('demo');
    const statusSession = getSessionNew();
    const dicAdional = {'option':'report'}
    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReportNew(scriptId, dicAdional);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
        if(data.response_first){
            drawTableElement('tableFirst', data.response_first, columsTable1, 'Ordenes_Checks', undefined, designPDF);
        }
        if(data.response_second){
            drawTableElement('tableSecond', data.response_second, columsTable2, 'Ordenes_Tardanza', configTableCustom2, designPDF2);
        }
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}



//------CATALOG
function get_catalog(){
    const scriptId = getParameterURL('script_id');
    const JWT = getJwtSession();
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
        const data = res.response && res.response.data ? res.response.data : [];
        if(data.length > 0){
            set_catalog_select(data, 'empleado', 'empleado', true);
        }
    })
}


//------SELECT ACTIVE