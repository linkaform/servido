window.onload = function(){
    Chart.register(ChartDataLabels);
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

function loadDemoData(){

    drawCardElement('cardFirst',20);
    drawCardElement('cardSecond',30);
    drawCardElement('cardThird',40);
    drawCardElement('cardFourth',50);


    drawTableElement('tableFirst', dataTable1, columsTable1);
    drawTableElement('tableSecond', dataTable2, columsTable2);
    drawTableElement('tableThird', dataTable3, columsTable3);
    drawTableElement('tableFourth', dataTable4, columsTable4);
    drawTableElement('tableFiveth', dataTable5, columsTable5);

    drawChartElement('chartFirst','doughnut',dataChart1,setOptions1);
    drawChartElement('chartSecond','bar',dataChart2,setOptions2);
    drawChartElement('chartThird','bar',dataChart3,setOptions3);
    drawChartElement('chartFourth','bar',dataChart4,setOptions4);

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
    const dicAditional = {'option':'report'}

    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReport(scriptId, dicAditional);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
        //----ELEMENTS
        if(data.table_first){
            drawTableElement('tableFirstA', data.table_first, columsTable1A);
        }
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}


