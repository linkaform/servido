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
    //----Search Catalogs
    get_catalog();
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

        if ( typeof responseRequest === 'object' && responseRequest !== null && Object.keys(responseRequest).length > 0) {
        
            const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
            //----ELEMENTS
            if(data.cardFirst){
                drawCardElement('cardFirst',data.cardFirst);
            }
            if(data.cardSecond){
                drawCardElement('cardSecond',data.cardSecond);
            }
            if(data.cardThird){
                drawCardElement('cardThird',data.cardThird);
            }
            if(data.cardFourth){
                drawCardElement('cardFourth',data.cardFourth);
            }

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
            if(data.tableFiveth){
                drawTableElement('tableFiveth', data.tableFiveth, columsTable5);
            }

            if(data.chartFirst){
                drawChartElement('chartFirst','doughnut',data.chartFirst,setOptions1);
            }
            if(data.chartSecond){
                drawChartElement('chartSecond','bar',data.chartSecond,setOptions2);
            }
            if(data.chartThird){
                drawChartElement('chartThird','bar',data.chartThird,setOptions3);
            }
            if(data.chartFourth){
                drawChartElement('chartFourth','bar',data.chartFourth,setOptions4);
            }
            showElements();
        }
        //-----Style
        hideLoadingComponent();
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
        if(data.cadena && data.cadena.length > 0){
            setCatalogSimple(data.cadena, 'cadena', true);
        }
        if(data.marca && data.marca.length > 0){
            setCatalogSimple(data.marca, 'marca', true);
        }
        if(data.tienda && data.tienda.length > 0){
            setCatalogSimple(data.tienda, 'tienda', true);
        }
        if(data.month && data.month.length > 0){
            setCatalogSimple(data.month, 'month', true);
        }
        if(data.year && data.year.length > 0){
            setCatalogSimple(data.year, 'year', true);
        }
    })
}