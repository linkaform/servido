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
  drawChartElement('chartFirst','bar',dataChart1A,setOptions1A);
  drawChartElement('chartSecond','bar',dataChart2A,setOptions2A);
  drawChartElement('chartThird','bar',dataChart3A,setOptions3A);
  drawChartElement('chartFourth','bar',dataChart4A,setOptions4A);
  drawChartElement('chartFiveth','bar',dataChart5A,setOptions5A);
  drawChartElement('chartSixth','bar',dataChart6A,setOptions6A);
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
    showLoadingComponent();
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
            const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
            if(data.response_first){
                const estacionValue = document.querySelector('#estacion').value; 
                if (estacionValue && estacionValue.trim() !== '') {
                    drawChartElement('chartFirst', 'bar', data.response_first, setOptions1A);
                } else {
                    drawChartElement('chartFirst', 'bar', data.response_first, setOptions1B);
                }
            }
            if(data.response_second){
                drawChartElement('chartSecond','bar',data.response_second,setOptions2A);
            }
            if(data.response_third){
                drawChartElement('chartThird','bar',data.response_third,setOptions3A);
            }
            if(data.response_fourth){
                drawChartElement('chartFourth','bar',data.response_fourth,setOptions4A);
            }
            if(data.response_fiveth){
                drawChartElement('chartFiveth','bar',data.response_fiveth,setOptions5A);
            }
            if(data.response_sixth){
                drawChartElement('chartSixth','bar',data.response_sixth,setOptions6A);
            }
            //-----Style
            hideLoadingComponent();
            showElements();
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
          setCatalogSimple(data, 'estacion', true);
        }
    })
}