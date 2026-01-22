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
  drawChartElement('chartThird','doughnut',dataChart3A,setOptions3A, true, true);
  drawChartElement('chartFourth','doughnut',dataChart4A,setOptions4A, true, true);
  drawChartElement('chartFiveth','doughnut',dataChart4A,setOptions4A, true, true);

 

  drawTableElement('tableFirst', dataTable1, columsTable1, null, configTableCustomFooter);
  drawTableElement('tableSecond', dataTable2, columsTable2, null, configTableCustomFooter);
  drawTableElement('tableThird', dataTable3, columsTable3, null, configTableCustomFooter);
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
            if (data.response_first) {
              drawChartElement('chartFirst', 'bar', data.response_first, setOptions1A);
            }
            if (data.response_second) {
              drawChartElement('chartSecond', 'bar', data.response_second, setOptions2A);
            }
            if (data.response_third) {
              drawChartElement('chartThird','doughnut',data.response_third,setOptions3A, true, true);
            }
            if (data.response_fourth) {
              drawTableElement('tableFirst', data.response_fourth, columsTable1);
            }

            //--OPeraciones
            if (data.response_fiveth) {
                drawCardElement('cardSecond',data.response_fiveth);
            }else{
                drawCardElement('cardSecond',0);
            }
            if (data.response_sixth) {
                console.log('data.response_sixth',data.response_sixth)
                drawChartElement('chartFiveth','doughnut',data.response_sixth,setOptions4A, true, true);
            }
            if (data.response_seventh) {
                drawTableElement('tableThird', data.response_seventh, columsTable2, null, configTableCustomFooter);
            }


            //--Mantenimiento
            if (data.response_eigth) {
                drawCardElement('cardFirst',data.response_eigth);
            }else{
                drawCardElement('cardFirst',0);
            }
            if (data.response_nineth) {
                console.log('data.response_nineth',data.response_nineth)
                drawChartElement('chartFourth','doughnut',data.response_nineth,setOptions4A, true, true);
            }
            if (data.response_tenth) {
                drawTableElement('tableSecond', data.response_tenth, columsTable3, null, configTableCustomFooter);
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
          setCatalogSimple(data, 'servicio', true);
        }
    })
}