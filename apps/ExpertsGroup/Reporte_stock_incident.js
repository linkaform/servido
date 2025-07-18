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
  drawTableElement('tableSecond', dataTable2, columsTable2);
  drawTableElement('tableThird', dataTable3, columsTable3);
  drawTableElement('tableFourth', dataTable4, columsTable4);
  drawTableElement('tableFiveth', dataTable5, columsTable5);
  drawTableElement('tableSixth', dataTable6, columsTable6);


  drawChartElement('chartFirst','bar',dataChart1A,setOptions1A, undefined, true);
  drawChartElement('chartSecond','bar',dataChart2A,setOptions2A, undefined, true);
  //----TEST MAP
  setTimeout(() => { hide_loading();}, 2000);
}


//-----FUNCTION ACTIVE
function loadData(data) {
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
            const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
            if(data.tableFirst){
              drawTableElement('tableFirst', data.tableFirst, columsTable1);   
            }
            if(data.tableSecond){
              drawTableElement('tableSecond', data.tableSecond, columsTable2);   
            }
            if(data.tableThird){
              drawTableElement('tableThird', data.tableThird, columsTable3);   
            }
            if(data.tableFourth){
              drawTableElement('tableFourth', data.tableFourth, columsTable4);   
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

