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

function loadDemoData(){
    drawChartElement('chartFirst','bar',dataChart1,optionsChart1, undefined,  true);
    drawChartElement('chartSecond','bar',dataChart2,optionsChart2, undefined,  true);
    drawChartElement('chartThird','bar',dataChart3,optionsChart3, undefined,  true);
    drawTableElement('tableFirst', dataTable1, columsTable1);


    drawChartElement('chartFourth','line',dataChart4,optionsChart4, undefined,  true);

    drawTableElement('tableSecond', dataTable2, columsTable2);
    drawChartElement('chartFiveth','line',dataChart5,optionsChart5, undefined,  true);

    drawChartElement('chartSixth','line',dataChart6,optionsChart6, undefined,  true);

    drawTableElement('tableThird', dataTable3, columsTable3);
    drawChartElement('chartSeven','line',dataChart7,optionsChart7, undefined,  true);
    drawChartElement('chartEigth','bar',dataChart8,optionsChart8, undefined,  true);
    drawChartElement('chartNineth','bar',dataChart9,optionsChart9, undefined,  true);

    enhanceSeparators();
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
        if(data.response_first){
            let columsTable = data.response_first.data_colums ? data.response_first.data_colums : [];
            let dataTable = data.response_first.data_table ? data.response_first.data_table : [];

            columsTable = columsTable.map(col => {
                if (Array.isArray(col.columns)) {
                    col.columns = col.columns.map(subCol => ({
                        ...subCol,
                        formatter: statusFormatter
                    }));
                }
                return col;
            });
            drawTableElement('tableFirst', dataTable, columsTable);
        }
        if(data.response_second){
            drawTableElement('tableSecond', data.response_second, columsTable2);
        }
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}


function enhanceSeparators() {
    const separators = document.querySelectorAll('.custom-separator');

    separators.forEach((el) => {
        if (el.querySelector('.separator-icon')) return;

        const title = el.querySelector('h3');
        const text = title ? title.innerText.toUpperCase() : '';

        let icon = '⚙️'; // default
        if (text.includes('ACCIDENTES')) icon = '⚠️';
        if (text.includes('VENTAS')) icon = '💰';
        if (text.includes('USUARIOS')) icon = '👤';

        // Crear icono
        const iconDiv = document.createElement('div');
        iconDiv.className = 'separator-icon';
        iconDiv.innerText = icon;


        el.insertBefore(iconDiv, title);
    });
}