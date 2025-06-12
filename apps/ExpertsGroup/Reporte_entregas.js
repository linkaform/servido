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
    drawCardElement('cardFirst',1500);
    drawCardElement('cardSecond',1200);
    drawCardElement('cardThird',75);

    drawCardImageElement('cardStoreA','Tiendas Visitadas:1041 ','Pendientes: 438 ');
    drawCardImageElement('cardStoreB','Tiendas Visitadas:243 ','Pendientes: 101');
    drawCardImageElement('cardStoreC','Tiendas Visitadas:0 ','Pendientes: 0');

    drawChartElement('chartFirst','pie',dataChart1A,setOptions1A, undefined, true);
    drawChartElement('chartSecond','bar',dataChart2A, setOptions2A, undefined, true);
    drawChartElement('chartThird','bar',dataChart3A, setOptions3A, undefined, true);
    drawChartElement('chartFourth','line',dataChart4A, setOptions4A, undefined, true);
    drawChartElement('chartFiveth','pie',dataChart5A, setOptions5A, undefined, true);



    //----TEST MAP
    drawMapElement('mapFirst', 'Progreso de entrega por estado' , dataMap1, configMap1)
    setTimeout(() => { hide_loading();}, 2000);
}


//-----FUNCTION ACTIVE
function loadData(data) {
    //---Data
    setEventsLoad();
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
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};

        
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

