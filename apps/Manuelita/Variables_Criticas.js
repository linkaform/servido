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
    drawTableElement('tableFirst', dataTable1, columsTable1);
    drawChartElement('chartFirst', 'bar', dataChart1, setOptions1, undefined, true);

    drawTableElement('tableSecond', dataTable2, columsTable2);
    drawChartElement('chartSecond', 'bar', dataChart2, setOptions2, undefined, true);

    drawTableElement('tableThird', dataTable3, columsTable3);
    drawChartElement('chartThird', 'bar', dataChart3, setOptions3, undefined, true);

    drawTableElement('tableFourth', dataTable4, columsTable4);
    drawChartElement('chartFourth', 'bar', dataChart4, setOptions4, undefined, true);

    drawTableElement('tableFiveth', dataTable5, columsTable5);
    drawChartElement('chartFiveth', 'bar', dataChart5, setOptions5, undefined, true);


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
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}


