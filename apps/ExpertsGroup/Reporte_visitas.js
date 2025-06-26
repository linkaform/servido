let dataCatalogs = [];

window.onload = function(){
  createElements(dicReportContext);
  setElementsStyle();
  const statusSession = getSession();
  console.log('statusSession',statusSession)
  if(statusSession == 'Active'){
    loadData();
  }else if(statusSession == 'Demo'){
    loadDemoData();
  }else if(statusSession == 'Offline'){
    loadDemoData();
  }
}

//-----FUNCTIONS DEMO
function loadDemoData(){
  //---Definitions ELements
  drawTableElement('tableFirst', dataTable1, columsTable1);
  drawChartElement('chartFirst','pie',dataChart1A,setOptions1A, undefined, true);
  //----TEST MAP
  drawMapElement('mapFirst', 'Delivery progress by state' , dataMap1, configMap1, configToltipMap)
  setTimeout(() => { hide_loading();}, 2000);
}


//-----FUNCTION ACTIVE
function loadData(data) {
    //----Search Catalogs
    get_catalog();
    //----Assing Events
    const buttonExecution = document.getElementById("buttonExecution");
    buttonExecution.addEventListener("click", () => {
        getInformation();
    });

    //---Hide
    setTimeout(() => { hide_loading();}, 2000);
}

//-----SET REQUEST
async function getInformation(dicAditional){
    const demo = getParameterURL('demo');
    const scriptId = getParameterURL('script_id');
    const statusSession = getSession();
    const dicAdional =  dicAditional;

    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReport(scriptId, dicAdional);
        if ( typeof responseRequest === 'object' && responseRequest !== null && Object.keys(responseRequest).length > 0) {
            console.log('Entra',responseRequest)
            const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
            if(data.tableFirst){
              drawTableElement('tableFirst', data.tableFirst, columsTable1);   
            }
            if(data.chartFirst){
              drawChartElement('chartFirst','pie',data.chartFirst,setOptions1A, undefined, true);     
            }
            if(data.mapFirst){
              drawMapElement('mapFirst', 'Delivery progress by state' , data.mapFirst, configMap1, configToltipMap)   
            }
            //-----Style
            const divEmpty = document.querySelectorAll('.div-content-empty');
            const divElements = document.querySelectorAll('.div-content-element');
            divElements.forEach(div => {
              div.style.visibility = 'visible';
            });
            divEmpty.forEach(div => {
              div.style.display = 'none';
            });
        }
    }
}

//----CATALOG
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
        const data = res.response && res.response.data ? res.response.data : [];
        if(data.length > 0){
          setCatalogSimple(data, 'chain', true);
        }
    })
}