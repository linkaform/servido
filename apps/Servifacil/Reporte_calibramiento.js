let dataCatalogs = [];

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

//-----FUNCTIONS DEMO
function loadDemoData(){
    //---Definitions ELements
    drawCardElement('cardFirst',84.7);
    drawCardElement('cardSecond','87.0 | Paso del Toro');
    drawCardElement('cardThird','90.6 | Mercadotecnia');
    drawCardElement('cardFourth',40);
    drawChartElement('chartFirst','bar',dataChart1,optionsChart1, undefined, true);
    drawChartElement('chartSecond','bar',dataChart2,optionsChart2, undefined,true);
    drawChartElement('chartThird','line',dataChart3,optionsChart3, undefined, true);
    drawTableElement('tableFirst', dataTable1, columnsTable1);

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
    showLoadingComponent();
    const demo = getParameterURL('demo');
    const scriptId = getParameterURL('script_id');
    const statusSession = getSessionNew();
    const dicAdional =  dicAditional;

    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReportNew(scriptId, dicAdional);
        if ( typeof responseRequest === 'object' && responseRequest !== null && Object.keys(responseRequest).length > 0) {
            const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
            if(data.response_first){
                const estacionValue = document.querySelector('#estacion').value; 
                if (estacionValue && estacionValue.trim() !== '') {
                    drawChartElement('chartFirst', 'bar', data.response_first, setOptions1A);
                } else {
                    drawChartElement('chartFirst', 'bar', data.response_first, setOptions1B);
                }
            }
            if(data.response_second){
                drawChartElement('chartSecond','bar',data.response_second,setOptions2A);
            }
            if(data.response_third){
                drawChartElement('chartThird','bar',data.response_third,setOptions3A);
            }
            if(data.response_fourth){
                drawChartElement('chartFourth','bar',data.response_fourth,setOptions4A);
            }
            if(data.response_fiveth){
                drawChartElement('chartFiveth','bar',data.response_fiveth,setOptions5A);
            }
            if(data.response_sixth){
                drawChartElement('chartSixth','bar',data.response_sixth,setOptions6A);
            }
            //-----Style
            hideLoadingComponent();
            showElements();
        }
    }
}

