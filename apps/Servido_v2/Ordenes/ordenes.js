window.onload = function(){
    createElements(dicReportContext);
    setElementsStyle();
    const statusSession = getSession();
    if(statusSession == 'Active'){
      loadData();
      //---Assign Onclicks
      if (document.getElementById("buttonExecution")){
        document.getElementById("buttonExecution").addEventListener("click", function() {
          getInformation();
        });
      }
    }else if(statusSession == 'Demo'){
      loadDemoData();
    }
}

function loadDemoData(){
	drawCardElement('cardFirst',20);
  drawCardElement('cardSecond',30);
  drawChartElement('chartFirst','bar',dataChart1,setOptions1);
  drawChartElement('chartSecond','bar',dataChart2, setOptions2);
  drawTableElement('tableFirst', dataTable1, columsTable1);
}

function loadData(response) {
  console.log('response',response)
  if (response && response.data && response.data.chartFirst) {
    drawChartElement('chartFirst','bar',response.data.chartFirst,setOptions1);
  } 
  if (response && response.data && response.data.chartFirst) {
    drawChartElement('chartSecond','bar',response.data.chartSecond,setOptions2);
  } 
  if (response && response.data && response.data.tableFirst) {
    drawTableElement('tableFirst', response.data.tableFirst, columsTable1);
  }
  if (response && response.data && response.data.cardFirst) {
    drawCardElement('cardFirst',response.data.cardFirst);
  }
  if (response && response.data && response.data.cardSecond) {
    drawCardElement('cardFirst',response.data.cardSecond);
  } 
}

function getInformation(){
    console.log('Entra a get information')
    const scriptId = getParameterURL('script_id');
    const demo = getParameterURL('demo');
    const statusSession = getSession();
    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
      sendRequestReport(scriptId)
      .then(responseRequest => {
        loadData(responseRequest);  
      })
      .catch(error => {
        console.error('Error:', error);  
      });
    }
}

