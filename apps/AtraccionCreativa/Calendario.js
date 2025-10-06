
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
                dataFormat = setFormatColor(response.calendarFirst);
                drawCalendar('calendarFirst', dataFormat, configCustom);
            }
            
            if (response.tableFirst) {
                drawTableElement('tableFirst', response.tableFirst, columsTable1);
            }
            
            if (response.cardTableFirst) {
                drawCardTable('cardTableFirst', response.cardTableFirst);                
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
                drawChartElement('chartFirst', 'bar', response.chartFirst, setOptions1, true, false);
            }
            
            if (response.chartSecond) {
                drawChartElement('chartSecond', 'doughnut', response.chartSecond, setOptions3, false, false);
            }
            
            if (response.chartThird) {
                drawChartElement('chartThird', 'doughnut', response.chartThird, setOptions3, true, false);
            }
            
            if (response.chartFourth) {
                drawChartElement('chartFourth', 'bar', response.chartFourth, setOptions4, true, false);
            }
            
            if (response.chartFiveth) {
                drawChartElement('chartFiveth', 'bar', response.chartFiveth, setOptions5, true, false);
            }
            
            
            if (response.chartSixth) {
                drawChartElement('chartSixth', 'bar', response.chartSixth, setOptions6, true, false);
            }


            if (response.chartSeventh) {
                drawChartElement('chartSeventh', 'bar', response.chartSeventh, setOptions7, true, false);
            }
            showElements();
        }
        //-----Style
        hideLoadingComponent();
      
    }
}

function setFormatColor(dataList) {
    if (!Array.isArray(dataList)) return dataList;

    const coordinadoresSet = new Set();
    dataList.forEach(item => {
        const coord = item.extendedProps?.coordinator;
        if (coord) {
            coordinadoresSet.add(coord);
        }
    });

    const coordinadores = Array.from(coordinadoresSet);

    const colors = getPAlleteColors(14, coordinadores.length);

    const colorMap = {};
    coordinadores.forEach((coord, index) => {
        colorMap[coord] = colors[index % colors.length]; // por si hay más coordinadores que colores
    });

    const formattedData = dataList.map(item => {
        const coord = item.extendedProps?.coordinator;
        if (coord && colorMap[coord]) {
            return {
                ...item,
                backgroundColor: colorMap[coord]
            };
        } else {
            return item;
        }
    });

    return formattedData;
}
