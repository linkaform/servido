
let informationCliente = [];
let informationEquipo = [];
let informationForma = [];
let isProcessing = false; 
let dateClick = '';
//-----IMPORTANT
let calendarInstance = null;

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
    //----Set Events
    drawCalendar('calendarFirst', events, configCustom);

    drawTableElement('tableFirst', dataTable1, columsTable1);

    drawCardTable('cardTableFirst', cardTableFirstData, 190);
    drawCardTable('cardTableSecond', cardTableSecondData, 270);
    drawCardTable('cardTableThird', cardTableThirdData, 140);
    drawCardTable('cardTableFourth', cardTableFourthData, 350);
    drawCardTable('cardTableFiveth', cardTableFivethData,140);
    drawCardTable('cardTableSixth', cardTableSixthData, 140);

    drawChartElement('chartFirst', 'bar', dataChart1, setOptions1, true, true);
    drawChartElement('chartSecond', 'doughnut', dataChart2, setOptions2, false, true);
    drawChartElement('chartThird', 'doughnut', dataChart3, setOptions3, true, true);
    drawChartElement('chartFourth', 'bar', dataChart4, setOptions4, true, true);
    drawChartElement('chartFiveth', 'bar', dataChart5, setOptions5, true, true);
    drawChartElement('chartSixth', 'bar', dataChart6, setOptions6, true, true);
    drawChartElement('chartSeventh', 'bar', dataChart7, setOptions7, true, true);

    //---Hide Loader
    setTimeout(() => { hide_loading();}, 2000);
}

//-----LOAD DATA ACTIVE
function loadData(data) {
    //----Assing Events
    document.getElementById("buttonExecution").addEventListener("click", () => {getInformation();});
    //-----Loading
    setTimeout(() => { hide_loading();}, 2000);
}

//-----SET REQUEST ACTIVE
async function getInformation(){
    showLoadingComponent();
    const scriptId = getParameterURL('script_id');
    const demo = getParameterURL('demo');
    const statusSession = getSession();
    const dicAdional = {'option':'get_records'}

    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        //----Request
        const responseRequest = await sendRequestReport(scriptId, dicAdional);
        if ( typeof responseRequest === 'object' && responseRequest !== null && Object.keys(responseRequest).length > 0) {
            const response = responseRequest.response  ? responseRequest.response : {};
            console.log('response',response);

            if (response.calendarFirst) {
                drawCalendar('calendarFirst', response.calendarFirst, configCustom);
            }
            
            if (response.tableFirst) {
                drawTableElement('tableFirst', response.tableFirst, columsTable1);
            }
            
            if (response.cardTableFirst) {
                drawCardTable('cardTableFirst', response.cardTableFirs);                
            }
            
            if (response.cardTableSecond) {
                drawCardTable('cardTableSecond', response.cardTableSecond);
            }
            
            if (response.cardTableThird) {
                drawCardTable('cardTableThird', response.cardTableThird);
            }
            
            if (response.cardTableFourth) {
                drawCardTable('cardTableFourth', response.cardTableFourth);
            }
            
            if (response.cardTableFiveth) {
                drawCardTable('cardTableFiveth', response.cardTableFiveth);
            }
            
            if (response.cardTableSixth) {
                drawCardTable('cardTableSixth', response.cardTableSixth);
            }
            
            if (response.chartFirst) {
                drawChartElement('chartFirst', 'bar', response.chartFirst, setOptions1, true, true);
            }
            
            if (response.chartSecond) {
                drawChartElement('chartSecond', 'doughnut', response.chartSecond, setOptions2, false, true);
            }
            
            if (response.chartThird) {
                drawChartElement('chartThird', 'doughnut', response.chartThird, setOptions3, true, true);
            }
            
            if (response.chartFourth) {
                drawChartElement('chartFourth', 'bar', response.chartFourth, setOptions4, true, true);
            }
            
            if (response.chartFiveth) {
                drawChartElement('chartFiveth', 'bar', response.chartFiveth, setOptions5, true, true);
            }
            
            if (response.chartSixth) {
                drawChartElement('chartSixth', 'bar', response.chartSixth, setOptions6, true, true);
            }
            
            if (response.chartSeventh) {
                drawChartElement('chartSeventh', 'bar', response.chartSeventh, setOptions7, true, true);
            }
            showElements();
        }
        //-----Style
        hideLoadingComponent();
      
    }
}

//-----GET CATALOG
function get_catalog(){
    const scriptId = getParameterURL('script_id');
    const JWT = getCookie("userJwt");
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: scriptId,
            option: 'get_catalog',
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+JWT
        },
    })
    .then((res) => res.json())
    .then((res) => {
        const catalog_cliente = res.response && res.response.data && res.response.data.catalog_cliente ? res.response.data.catalog_cliente : [];
        const catalog_equipo = res.response && res.response.data && res.response.data.catalog_equipo ? res.response.data.catalog_equipo : [];
        const catalog_forma = res.response && res.response.data && res.response.data.catalog_forma ? res.response.data.catalog_forma : [];

        if(catalog_cliente.length > 0){
            informationCliente = catalog_cliente;
            set_catalog_select(catalog_cliente, 'razon_cliente', 'cliente');
            set_catalog_select(catalog_cliente, 'razon_cliente', 'inputSelectCliente');
        }
        if(catalog_equipo.length > 0){
            informationEquipo = catalog_equipo;
            set_catalog_select(catalog_equipo, 'nombre_equipo', 'inputSelectEquipo');
        }
        if(catalog_forma.length > 0){
            informationForma = catalog_forma;
            set_catalog_select(catalog_forma, 'forma', 'inputSelectForma');
        }
    })
}