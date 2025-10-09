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

    //---Example re format colors for value 0
    drawChartElement('chartFiveth','bar',dataChart5A,setOptions5A);
    drawChartElement('chartSixth','bar',dataChart6A,setOptions6A);
    drawChartElement('chartSeventh','bar',dataChart7A,setOptions7A);


    drawTableElement('tableFirst', dataTable1, columsTable1);
    drawTableElement('tableSecond', dataTable2, columsTable2);
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
            if(data.response_sixth){
                drawChartElement('chartFiveth','bar',data.response_sixth,setOptions5A);
            }
            if(data.response_seventh){
                drawChartElement('chartSixth','bar',data.response_seventh,setOptions6A);
            }
            if(data.response_eigth){
                drawChartElement('chartSeventh','bar',data.response_eigth,setOptions7A);
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

    //-----Size Font
    let fontSize = 16;
    if(data.length > 10 ){
        fontSize = 13;
    }else if(data.length > 20){
        fontSize = 1;
    }
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
                    size: fontSize
                },
                align: 'center',
                textAlign: 'center', 
                formatter: function (value, context) {
                    const index = context.dataIndex;
                    const total = listCant[index] || 1; 
                    if(data.length > 20 ){
                        const message = `${value} - ${total}`;
                        return message.split(" ");  
                    }else{
                        const message = `${value}% / ${total}`;
                        return message;  
                    }
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

//----Function Get Folio
function getInformationQuest(questName) {
    const divModalList = document.getElementById('divModalList');
    if (!divModalList) return;

    // Limpiar contenido previo
    divModalList.innerHTML = '';

    // Revisar si existe la key en dicSearchFolio
    if (dicSearchFolio.hasOwnProperty(questName)) {
        const dataArray = dicSearchFolio[questName];

        dataArray.forEach(item => {
            // Crear li con estructura de Bootstrap
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

            // Crear enlace con folio
            const a = document.createElement('a');
            a.href = `https://example.com/folio/${item.idRecord}`;
            a.target = '_blank';
            a.className = 'fw-bold text-decoration-none';
            a.textContent = `Folio: ${item.folio}`;

            // Crear badge con grading
            const span = document.createElement('span');
            span.className = `badge rounded-pill ${
                item.grading.toLowerCase() === 'positivo' ? 'bg-success' :
                item.grading.toLowerCase() === 'negativo' ? 'bg-danger' : 'bg-warning text-dark'
            }`;
            span.textContent = item.grading;

            // Añadir elementos al li
            li.appendChild(a);
            li.appendChild(span);

            // Añadir li al divModalList
            divModalList.appendChild(li);
        });
    } else {
        // Si no hay coincidencia
        divModalList.innerHTML = '<li class="list-group-item">No se encontraron resultados.</li>';
    }
}
