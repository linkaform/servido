
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
    drawTableElement('tableFirst', dataTable1, columsTable1);

    drawChartElement('chartFirst','bar',dataChart1,setOptions1, undefined, true);
    drawChartElement('chartSecond','pie',dataChart2,setOptions2, undefined, true);
    drawChartElement('chartThird','pie',dataChart3,setOptions3, undefined, true);
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
    const dicAditional = {'option':'get_records'}

    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReport(scriptId, dicAditional);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
        //----ELEMENTS
        if(data.elementFirst){
            drawTableElement('tableFirst', data.elementFirst, columsTable1);
        }

        if(data.elementSecond){
            drawChartElement('chartFirst','bar', data.elementSecond,setOptions1, undefined, true);
        }

        if(data.elementThird){
            drawChartElement('chartSecond','pie', data.elementThird, setOptions2, undefined, true);
        }

        if(data.elementFourth){
            drawChartElement('chartThird','pie', data.elementFourth, setOptions3, undefined, true);
        }
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}

