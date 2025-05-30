
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

function loadDemoData(){
    drawCardElement('cardFirst',20);
    drawCardElement('cardSecond',30);
    drawCardElement('cardThird',40);
    drawCardElement('cardFourth',50);
    drawCardElement('cardFiveth',60);
    
    drawTableElement('tableFirst', dataTable1, columsTable1);
    drawChartElement('chartFirst','line',dataChart1,setOptions1);
    setTimeout(() => { hide_loading();}, 2000);
}

//-----LOAD DATA ACTIVE
function loadData(data) {
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
        const cardsDic = data.response_first && data.response_first.dic_cards ? data.response_first.dic_cards : {} ; 

        //----CARDS
        cardKeys.forEach((key, index) => {
          drawCardElement(`card${capitalize(index + 1)}`, cardsDic[key] || 0);
        });

        //----ELEMENTS
        if(data.response_first && data.response_first.data_table ){
            drawTableElement('tableFirst', data.response_first.data_table, columsTable1, "Detalle_de_empleados");
        }

        if(data.response_second){
            drawChartElement('chartFirst','line', data.response_second,setOptions1);
        }

        if(data.response_third){
            drawChartElement('chartSecond','line', data.response_third, setOptions2);
        }

        if(data.response_fourth){
            drawChartElement('chartThird','pie', data.response_fourth, setOptions3);
        }
    
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}

function capitalize(number) {
  const suffixes = ["First", "Second", "Third", "Fourth", "Fiveth", ];
  return suffixes[number - 1];
}