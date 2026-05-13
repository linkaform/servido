
let informationCliente = [];
let informationEquipo = [];
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
    //---Hide Loader
    setTimeout(() => { hide_loading();}, 2000);
}

//-----LOAD DATA ACTIVE
function loadData(data) {
    //----Search Catalogs
    get_catalog();
    //----Assing Events
    document.getElementById("buttonExecution").addEventListener("click", () => {getInformation();});
    //-----Loading
    setTimeout(() => { hide_loading();}, 2000);
}

//-----SET REQUEST ACTIVE
async function getInformation(){
    showLoadingComponent();
    const scriptId = getParameterURL('script_id');
    const demo = getParameterURL('demo');
    const statusSession = getSession();
    const dicAdional = {'option':'calendar'}

    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        //----Request
        const responseRequest = await sendRequestReport(scriptId, dicAdional);
        const dataCalendario = responseRequest.response && responseRequest.response.data.dataCalendario && responseRequest.response.data.dataCalendario.length > 0 ? responseRequest.response.data.dataCalendario : [];
        drawCalendar('calendarFirst', dataCalendario, configCustom);
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
            option: 'catalog',
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+JWT
        },
    })
    .then((res) => res.json())
    .then((res) => {
        const catalog_empleado = res.response && res.response.data ? res.response.data : [];
        if(catalog_empleado.length > 0){
            set_catalog_select(catalog_empleado, 'empleado', 'empleado');
        }
    })
}