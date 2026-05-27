window.onload = function(){
    createElements(dicReportContext);
    setElementsStyleNew();
    const statusSession = getSessionNew();
    if (statusSession === 'Active') {
        loadData();
    } else {
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

    drawTableElement('tableEigth', dataTable8, columsTable8);
    drawChartElement('chartEigth','bar',dataChart8,setOptions8);
    setTimeout(() => { setStylesReport();}, 1000);
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
    setTimeout(() => { setStylesReport();}, 1000);
    setTimeout(() => { hide_loading();}, 2000);
}

//-----SET REQUEST ACTIVE
async function getInformation(){
    showLoadingComponent();
    const scriptId = getParameterURL('script_id');
    const demo = getParameterURL('demo');
    const statusSession = getSessionNew();
    const dicAdional = {'option':'report'}
    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReportNew(scriptId, dicAdional);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};

        if(data.tableFirst){
            drawTableElement('tableFirst', data.tableFirst, columsTable1);
        }
        if(data.chartFirst){
            drawChartElement('chartFirst','bar',data.chartFirst,setOptions1);
        }

        if(data.tableSecond){
            drawTableElement('tableSecond', data.tableSecond, columsTable2);
        }
        if(data.chartSecond){
            drawChartElement('chartSecond','bar',data.chartSecond,setOptions2);
        }

        if(data.tableThird){
            drawTableElement('tableThird', data.tableThird, columsTable3);
        }
        if(data.chartThird){
            drawChartElement('chartThird','bar',data.chartThird,setOptions3);
        }

        if(data.tableFourth){
            drawTableElement('tableFourth', data.tableFourth, columsTable4);
        }
        if(data.chartFourth){
            drawChartElement('chartFourth','bar',data.chartFourth,setOptions4);
        }

        if(data.tableFiveth){
            drawTableElement('tableFiveth', dataTable5, columsTable5);
        }
        if(data.chartFiveth){
            drawChartElement('chartFiveth','bar',dataChart5,setOptions5);
        }

        if(data.tableSixth){
            drawTableElement('tableSixth', data.tableSixth, columsTable6);
        }
        if(data.chartSixth){
            drawChartElement('chartSixth','bar',data.chartSixth,setOptions6);
        }

        if(data.tableSeventh){
            drawTableElement('tableSeventh', data.tableSeventh, columsTable7);
        }
        if(data.chartSeventh){
            drawChartElement('chartSeventh','bar',data.chartSeventh,setOptions7);
        }

        if(data.tableEigth){
            drawTableElement('tableEigth', data.tableEigth, columsTable8);
        }
        if(data.chartEigth){
            drawChartElement('chartEigth','bar',data.chartEigth, setOptions8);
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