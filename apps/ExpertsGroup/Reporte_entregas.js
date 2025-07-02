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

    drawCardImageElement('cardStoreA','Stores Visited: 1041 ','Pending delivery: 438 ');
    drawCardImageElement('cardStoreB','Stores Visited: 243 ','Pending delivery: 101');
    drawCardImageElement('cardStoreC','Stores Visited: 0 ','Pending delivery: 0');

    drawChartElement('chartFirst','doughnut',dataChart1A,setOptions1A, undefined, true);
    drawChartElement('chartSecond','bar',dataChart2A, setOptions2A, undefined, true);
    drawChartElement('chartThird','bar',dataChart3A, setOptions3A, undefined, true);
    drawChartElement('chartFourth','line',dataChart4A, setOptions4A, undefined, true);
    drawChartElement('chartFiveth','doughnut',dataChart5A, setOptions5A, undefined, true);

    //----TEST MAP
    drawMapElement('mapFirst', 'Delivery progress by state' , dataMap1, configMap1, configToltipMap)
    setTimeout(() => { hide_loading();}, 2000);
}


//-----FUNCTION ACTIVE
function loadData(data) {
  //---Data
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
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
        //----Cards
        if(data.cardFirst){
          drawCardElement('cardFirst',1500);
        }
        if(data.cardSecond){
          drawCardElement('cardSecond',1200);
        }
        if(data.cardThird){
          drawCardElement('cardThird',75);
        }

        //----Card Custom
        if(data.cardStoreA){
          drawCardImageElement('cardStoreA',  data.cardStoreA.visited ? `Stores Visited: ${data.cardStoreA.visited}` : 'Stores Visited: 0',
          data.cardStoreA.visited ? `Pending delivery: ${data.cardStoreA.pending}` : 'Pending delivery: 0 ');
        }
        if(data.cardStoreB){
          drawCardImageElement('cardStoreB',  data.cardStoreB.visited ? `Stores Visited: ${data.cardStoreB.visited}` : 'Stores Visited: 0',
          data.cardStoreB.visited ? `Pending delivery: ${data.cardStoreB.pending}` : 'Pending delivery: 0 ');
        }
        if(data.cardStoreC){
          drawCardImageElement('cardStoreC',  data.cardStoreC.visited ? `Stores Visited: ${data.cardStoreC.visited}` : 'Stores Visited: 0',
          data.cardStoreC.visited ? `Pending delivery: ${data.cardStoreC.pending}` : 'Pending delivery: 0 ');
        }
        ///-----Charts
        if(data.chartFirst){
          drawChartElement('chartFirst','doughnut',data.chartFirst,setOptions1A, undefined, true);
        }
        if(data.chartSecond){
          drawChartElement('chartSecond','bar',data.chartSecond, setOptions2A, undefined, true);
        }
        if(data.chartThird){
          drawChartElement('chartThird','bar',data.chartThird, setOptions3A, undefined, true);
        }
        if(data.chartFourth){
          drawChartElement('chartFourth','line',data.chartFourth, setOptions4A, undefined, true);
        }
        if(data.chartFiveth){
          drawChartElement('chartFiveth','doughnut',data.chartFiveth, setOptions5A, undefined, true);
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

