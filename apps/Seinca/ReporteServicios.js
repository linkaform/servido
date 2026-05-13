
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
    drawChartElement('chartFirst','bar',dataChart1,setOptions1);

    drawTableElement('tableSecond', dataTable2, columsTable2);
    drawChartElement('chartSecond','bar',dataChart2,setOptions2);

    drawTableElement('tableThird', dataTable3, columsTable3);
    drawChartElement('chartThird','bar',dataChart3,setOptions3);

    drawTableElement('tableFourth', dataTable4, columsTable4);
    drawChartElement('chartFourth','bar',dataChart4,setOptions4);

    drawTableElement('tableFiveth', dataTable5, columsTable5);
    drawChartElement('chartFiveth','bar',dataChart5,setOptions5);

    drawTableElement('tableSixth', dataTable6, columsTable6);
    drawChartElement('chartSixth','bar',dataChart6,setOptions6);

    drawTableElement('tableSeventh', dataTable7, columsTable7);
    drawChartElement('chartSeventh','bar',dataChart7,setOptions7);


    setTimeout(() => { setStylesReport();}, 1000);
    setTimeout(() => { hide_loading();}, 3000);
}

//-----LOAD DATA ACTIVE
function loadData(data) {
    //----Assing Events
    const buttonExecution = document.getElementById("buttonExecution");
    buttonExecution.addEventListener("click", () => {
        getInformation();
    });
    //-----Loading
    setTimeout(() => { setStylesReport();}, 1000);
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
        const responseRequest = await sendRequestReport(scriptId,dicAdional);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
        if(data.response_first){
            drawTableElement('tableFirst', data.response_first, columsTable1, undefined, configTableCustom1);
        }

        //-----Style
        hideLoadingComponent();
        showElements();
    }
}

function setStylesReport() {
    document.querySelectorAll('.card-header').forEach(el => {
        el.style.setProperty('background-color', '#003A74', 'important');
    });

    document.querySelectorAll('h6.text-primary').forEach(el => {
        el.style.setProperty('color', '#FFFFFF', 'important');
    });

    document.querySelectorAll('.tabulator-col').forEach(el => {
        el.style.setProperty('background-color', '#F9C546', 'important');
    });
}

