let dataCatalogs = [];
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

//-----LOAD DEMO
function loadDemoData(){
    drawCalendar('calendarFirst', events, configCustom);
    setTimeout(() => { hide_loading();}, 2000);
}

//-----LOAD DATA ACTIVE
function loadData(data) {
    //----Catalog
    getCatalog();
    //----Assing Events
    const buttonExecution = document.getElementById("buttonExecution");
    buttonExecution.addEventListener("click", () => {
        getInformation();
    });
    //-----Loading
    setTimeout(() => { hide_loading();}, 2000);
}

//-----SET REQUEST
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

        if(data.response_first){
            drawCalendar('calendarFirst', data.response_first, configCustom);
        }
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}

//----CATALOG
function getCatalog(){
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: 129147,
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
            const selector = document.getElementById('cliente'); 
            data.forEach(item => {
                const opcion = document.createElement("option"); 
                opcion.value = item.cliente; 
                opcion.textContent = item.cliente; 
                selector.appendChild(opcion); 
            });
        }
    })
}

//----SHOW INFORMATION
function showInformation(info){
    let event = info.event && info.event.extendedProps ? info.event.extendedProps : {};
    console.log('event',event)
    document.getElementById('textFolio').textContent = event.folio ?  event.folio : '';
    document.getElementById('textInstrument').textContent = event.instrument ? event.instrument : '';
    document.getElementById('textClient').textContent = event.client ? event.client : '';
    document.getElementById('textBrand').textContent = event.brand ? event.brand : '';
    document.getElementById('textModel').textContent = event.model ? event.model: '';
    document.getElementById('textSerie').textContent = event.serie ? event.serie: '';
    let eventModal = new bootstrap.Modal(document.getElementById('modalData'));
    eventModal.show();
}