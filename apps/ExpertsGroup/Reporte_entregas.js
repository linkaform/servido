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
    drawCardElement('cardFirst',1500);
    drawCardElement('cardSecond',1200);
    drawCardElement('cardThird',75);

    drawCardImageElement('cardStoreA','Tiendas Visitadas:1041 ','Pendientes: 438 ');
    drawCardImageElement('cardStoreB','Tiendas Visitadas:243 ','Pendientes: 101');
    drawCardImageElement('cardStoreC','Tiendas Visitadas:0 ','Pendientes: 0');

    drawChartElement('chartFirst','pie',dataChart1A,setOptions1A, undefined, true);
    drawChartElement('chartSecond','bar',dataChart2A, setOptions2A, undefined, true);
    drawChartElement('chartThird','bar',dataChart3A, setOptions3A, undefined, true);
    drawChartElement('chartFourth','line',dataChart4A, setOptions4A, undefined, true);
    drawChartElement('chartFiveth','pie',dataChart5A, setOptions5A, undefined, true);


    //----TEST MAP
    (async () => {
        const topology = await fetch('https://code.highcharts.com/mapdata/countries/mx/mx-all.topo.json').then(response => response.json());

        const data = [
            ['mx-3622', 10], ['mx-bc', 11], ['mx-bs', 12], ['mx-so', 13],
            ['mx-cl', 14], ['mx-na', 15], ['mx-cm', 16], ['mx-qr', 17],
            ['mx-mx', 18], ['mx-mo', 19], ['mx-df', 20], ['mx-qt', 21],
            ['mx-tb', 22], ['mx-cs', 23], ['mx-nl', 24], ['mx-si', 25],
            ['mx-ch', 26], ['mx-ve', 27], ['mx-za', 28], ['mx-ag', 29],
            ['mx-ja', 30], ['mx-mi', 31], ['mx-oa', 32], ['mx-pu', 33],
            ['mx-gr', 34], ['mx-tl', 35], ['mx-tm', 36], ['mx-co', 37],
            ['mx-yu', 38], ['mx-dg', 39], ['mx-gj', 40], ['mx-sl', 41],
            ['mx-hg', 42]
        ];

            // Create the chart
        Highcharts.mapChart('mapFirst', {
            chart: {
                map: topology
            },

            title: {
                text: 'Highcharts Maps basic demo'
            },

            subtitle: {
                text: 'Source map: <a href="https://code.highcharts.com/mapdata/countries/mx/mx-all.topo.json">Mexico</a>'
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            colorAxis: {
                min: 0
            },

            series: [{
                data: data,
                name: 'Random data',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }]
        });
    })();

    setTimeout(() => { hide_loading();}, 2000);
}


//-----FUNCTION ACTIVE
function loadData(data) {
    //---Data
    setEventsLoad();
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
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};

        
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

