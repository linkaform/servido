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
    drawChartElement('chartFirst','bar',dataChart1A,setOptions1A, undefined, true);
    drawChartElement('chartSecond','bar',dataChart2A,setOptions2A, undefined, true);
    drawChartElement('chartThird','bar',dataChart3A,setOptions3A, undefined, true);
    drawChartElement('chartFourth','line',dataChart4A,setOptions4A);
    drawTableElement('tableFirst', dataTable1, columsTable1);
    drawCardElement('cardFirst',20);
    drawCardElement('cardSecond',30);
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
async function getInformation(){
    showLoadingComponent();
    const demo = getParameterURL('demo');
    const scriptId = getParameterURL('script_id');
    const statusSession = getSession();
    const dicAdional =  {'option':'report'};
    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReport(scriptId, dicAdional);
        if ( typeof responseRequest === 'object' && responseRequest !== null && Object.keys(responseRequest).length > 0) {
            const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
            
            if(data.response_first){
                formatChartData(data.response_first, 'response_first', 'chartFirst');
            }
            if(data.response_second){
                formatChartData(data.response_second, 'response_second', 'chartSecond');
            }
            if(data.response_third){
                formatChartData(data.response_third, 'response_third', 'chartThird');
            }
            if(data.response_fourth){
                drawChartElement('chartFourth','line',data.response_fourth,setOptions4A);
            }
            if(data.response_fiveth){
                drawTableElement('tableFirst', data.response_fiveth, columsTable1);
            }
            if(data.response_cards && data.response_cards.cardFirst){
                drawCardElement('cardFirst',data.response_cards.cardFirst);
            }
            if(data.response_cards && data.response_cards.cardSecond){
                drawCardElement('cardSecond',data.response_cards.cardSecond);
            }

            //-----Style
            hideLoadingComponent();
            showElements();

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
          setCatalogSimple(data, 'estacion', true);
        }
    })
}

//-----Function Format
function formatChartData(data,type, divId){
    let listLabel = [];
    let listData = [];
    let listCant = [];
    let listBackGround = [];

    data.forEach(item => {
        if (type === 'response_first') {
            listLabel.push(item.estacion || '');
        } else if (type === 'response_second') {
            listLabel.push(item.supervisor || '');
        } else if (type === 'response_third') {
           listLabel.push(item.pagina || '');
        }

        listData.push(item.ratio || 0);
        listCant.push(item.cant || 0);
        let color = '';
        if(item.ratio > 90){
            color = '#04BF45';
        }else if(item.ratio >= 80 && item.ratio <= 89.99){
            color = '#F1C40F';
        }else if(item.ratio >= 60 && item.ratio <= 79.99){
            color = '#F24405';
        }else if(item.ratio < 59.99){
            color = '#F20505';
        }
        listBackGround.push(color|| '');
    });

    let optionsCustom = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            datalabels: {
                color: 'white',
                font: {
                    size: 13
                },
                formatter: function (value, context) {
                    const index = context.dataIndex;
                    const total = listCant[index] || 1; 
                    return `${value}% / ${total}`;
                }
            },
            tooltip: {
                titleFont: { size: 20 },
                bodyFont: { size: 17 },
                callbacks: {
                    label: function (context) {
                        const index = context.dataIndex;
                        const value = context.raw;
                        const total = listCant[index] || 1; 
                        return `${value} % / ${total}`;
                    }
                }
            }
        },
        maintainAspectRatio: false,
    };

    let dataChart = {
        labels: listLabel,
        datasets: [
            {
                label: 'Total',
                data: listData,
                fill: false,
                backgroundColor: listBackGround,
            },
        ]
    };

    if(divId !=''){
        drawChartElement(divId,'bar',dataChart, optionsCustom, undefined, true);
    }
}