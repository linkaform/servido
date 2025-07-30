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

    drawTableElement('tableFirst', dataTable1 ,columnsTable1 );

    drawChartElement('chartFirst','doughnut',dataChart1A,setOptions1A, undefined, true);
    drawChartElement('chartSecond','bar',dataChart2A, setOptions2A, undefined, true);
    drawChartElement('chartThird','bar',dataChart3A, setOptions3A, undefined, true);
    drawChartElement('chartFourth','line',dataChart4A, setOptions4A, undefined, true);
    drawChartElement('chartFiveth','doughnut',dataChart5A, setOptions5A, undefined, true);

    //----TEST MAP
    drawMapElement('mapFirst', 'Delivery progress by state' , dataMap1, configMap1, configTooltipMap)
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
        if ( typeof responseRequest === 'object' && responseRequest !== null && Object.keys(responseRequest).length > 0) {
          const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
          //----Cards
          if(data.cardFirst){
            drawCardElement('cardFirst',data.cardFirst);
          }
          if(data.cardSecond){
            drawCardElement('cardSecond',data.cardSecond);
          }
          if(data.cardThird){
            drawCardElement('cardThird',data.cardThird);
          }

          //----Card Custom
          const selectedChain = document.getElementById('chain')?.value?.toUpperCase();
          // No hay valor seleccionado, mostrar todos si existen
          if(selectedChain != ''){
            if (data.cardStoreA) {
              drawCardImageElement('cardStoreA',
                data.cardStoreA.visited && selectedChain == 'OXXO'? `Stores Visited: ${data.cardStoreA.visited}` : 'Stores Visited: N/A',
                data.cardStoreA.pending && selectedChain == 'OXXO'? `Pending delivery: ${data.cardStoreA.pending}` : 'Pending delivery: N/A'
              );
            }
            if (data.cardStoreB) {
              drawCardImageElement('cardStoreB',
                data.cardStoreB.visited && selectedChain == 'FRAGUA'? `Stores Visited: ${data.cardStoreB.visited}` : 'Stores Visited: N/A',
                data.cardStoreB.pending && selectedChain == 'FRAGUA'? `Pending delivery: ${data.cardStoreB.pending}` : 'Pending delivery: N/A'
              );
            }
            if (data.cardStoreC) {
              drawCardImageElement('cardStoreC',
                data.cardStoreC.visited && selectedChain == 'NETO'? `Stores Visited: ${data.cardStoreC.visited}` : 'Stores Visited: N/A',
                data.cardStoreC.pending && selectedChain == 'NETO'? `Pending delivery: ${data.cardStoreC.pending}` : 'Pending delivery: N/A'
              );
            }
          }else{
            if (data.cardStoreA) {
              drawCardImageElement('cardStoreA',
                data.cardStoreA.visited ? `Stores Visited: ${data.cardStoreA.visited}` : 'Stores Visited: 0',
                data.cardStoreA.pending ? `Pending delivery: ${data.cardStoreA.pending}` : 'Pending delivery: 0'
              );
            }
            if (data.cardStoreB) {
              drawCardImageElement('cardStoreB',
                data.cardStoreB.visited ? `Stores Visited: ${data.cardStoreB.visited}` : 'Stores Visited: 0',
                data.cardStoreB.pending ? `Pending delivery: ${data.cardStoreB.pending}` : 'Pending delivery: 0'
              );
            }
            if (data.cardStoreC) {
              drawCardImageElement('cardStoreC',
                data.cardStoreC.visited ? `Stores Visited: ${data.cardStoreC.visited}` : 'Stores Visited: 0',
                data.cardStoreC.pending ? `Pending delivery: ${data.cardStoreC.pending}` : 'Pending delivery: 0'
              );
            }
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
          if(data.tableFirst){
            drawTableElement('tableFirst', data.tableFirst ,columnsTable1 );
          }
          if(data.mapFirst){
            drawMapElement('mapFirst', 'Delivery progress by state' , data.mapFirst, configMap1, configTooltipMap)
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

//----DATA TABLE DETAIL
function getDataTableDetail(state){
    const scriptId = getParameterURL('script_id');
    const JWT = getCookie("userJwt");
    const MONTH = document.getElementById('month').value;
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: scriptId,
            option: 'table_detail',
            month: MONTH,
            state: state,
        }),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+JWT
        },
    })
    .then((res) => res.json())
    .then((res) => {
      const data = res.response && res.response.data ? res.response.data : [];
      console.log('Data',data)
      if(data.length > 0){
        drawTableElement('tableAModal', data, columsTableModal1);

        const modalElement = document.getElementById('modalFilterFirst');
        if (modalElement) {
          //---Mostral Modal
          const eventModal = new bootstrap.Modal(modalElement);
          eventModal.show();
        } else {
          console.error('No se encontró el modal con ID: modalFilterFirst');
        }
      }else{
        Swal.fire({
          title: 'Advertencia',
          html:'No fue posible encontrar la información solicitada.'
        });
      }
    })
}


function hideAllCardStores() {
  document.getElementById('cardStoreA')?.classList.add('hidden');
  document.getElementById('cardStoreB')?.classList.add('hidden');
  document.getElementById('cardStoreC')?.classList.add('hidden');
}