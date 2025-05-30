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
    drawCardElement('cardFirst',20);
    drawCardElement('cardSecond',30);
    drawTableElement('tableFirst', dataTable1, columsTable1);
    drawChartElement('chartFirst','bar',dataChart1,setOptions1);
    setTimeout(() => { hide_loading();}, 2000);
}

//-----LOAD DATA ACTIVE
function loadData(data) {
    //----Search Catalogs
    get_filters();
    //----Assing Events
    const buttonExecution = document.getElementById("buttonExecution");
    buttonExecution.addEventListener("click", () => {
        getInformation();
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
        const responseRequest = await sendRequestReport(scriptId);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
        if (data.cardFirst !== null) {
            drawCardElement('cardFirst',data.cardFirst);
        }
        if (data.cardSecond !== null) {
            drawCardElement('cardSecond',data.cardSecond);
        }
        if (data.chartFirst !== null) {
            drawChartElement('chartFirst','bar',data.chartFirst,setOptions1);
        }
        if (data.tableFirst !== null) {
            drawTableElement('tableFirst', data.tableFirst, columsTable1);
        }
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}

//-----GET CATALOG
function get_filters(){
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
        const data = res.response && res.response.data ? res.response.data : [];

        if(data.length > 0){
            setCatalogSimple(data, 'promotor')
        }
    })
}