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
    drawCardElement('cardThird','70.6 | Cruz');

    drawCardElement('cardFourth','90.6 | Mercadotecnia');
    drawCardElement('cardFiveth','50.7 | Ventas');

    drawCardElement('cardSixth',40);
    drawChartElement('chartFirst','bar',dataChart1,optionsChart1, undefined, true);
    drawChartElement('chartSecond','bar',dataChart2,optionsChart2, undefined,true);
    drawChartElement('chartThird','line',dataChart3,optionsChart3, undefined, true);
    drawChartElement('chartFourth','bar',dataChart4,optionsChart4, undefined, true);

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
async function getInformation(){
    showLoadingComponent();
    const demo = getParameterURL('demo');
    const scriptId = getParameterURL('script_id');
    const statusSession = getSessionNew();
    const dicAdional =  {'option':'report'};

    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReportNew(scriptId, dicAdional);
        if ( typeof responseRequest === 'object' && responseRequest !== null && Object.keys(responseRequest).length > 0) {
            const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
            drawReport(data);
            //-----Style
            hideLoadingComponent();
            showElements();
        }
    }
}

function drawReport(data){
    if(data.response_cards){
        const cards = data.response_cards;
        drawCardElement('cardFirst', cards.promedio_general);
        drawCardElement('cardSecond', formatCard(cards.estacion_mayor));
        drawCardElement('cardThird', formatCard(cards.estacion_menor));
        drawCardElement('cardFourth', formatCard(cards.depto_mayor));
        drawCardElement('cardFiveth', formatCard(cards.depto_menor));
        drawCardElement('cardSixth', cards.auditorias);
    }
    if(data.response_first){
        drawChartElement('chartFirst','bar',setColorsCalificacion(data.response_first),optionsChart1, undefined, true);
    }
    if(data.response_second){
        drawChartElement('chartSecond','bar',setColorsCalificacion(data.response_second),optionsChart2, undefined, true);
    }
    if(data.response_third){
        drawChartElement('chartThird','line',setColorsTendencia(data.response_third),getOptionsTendencia(data.response_third), undefined, true);
    }
    if(data.response_table){
        drawTableElement('tableFirst', data.response_table, columnsTable1);
    }
    if(data.response_fourth){
        setPreguntasNegativas(data.response_fourth);
        drawChartElement('chartFourth','bar',buildChartData(),optionsChart4, undefined, true);
    }
}

//----CATALOG
function get_catalog(){
    const scriptId = getParameterURL('script_id');
    const JWT = getJwtSession();
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
        const data = res.response && res.response.data ? res.response.data : {};
        dataCatalogs = data;
        setCatalogSimple(data.departamentos || [], 'dept');
        setCatalogSimple(data.supervisores || [], 'supv');
        setCatalogSimple(data.gerentes || [], 'gerente');
        setCatalogSimple(data.estaciones || [], 'servicio');
    })
}

//-----Function Format
const colorsDepartamento = {
    'Operaciones': '#5B4FBE',
    'Mantenimiento': '#00A878',
    'Sistemas': '#FF4500',
    'Desarrollo Humano': '#E91E8C',
    'Finanzas': '#2196F3',
    'Servicio a Clientes': '#7CB342',
    'Mercadotecnia': '#E8A000',
    'Cumplimiento': '#888888',
    'Lemargo': '#795548',
    'Seguridad Patrimonial': '#009688',
    'Compras': '#3F51B5',
};

function formatCard(item){
    return item && item.nombre ? `${item.calificacion} | ${item.nombre}` : '-';
}

function getColorCalificacion(value){
    if (value >= 9.0) return '#4CAF50';      // Aprobado
    if (value >= 7.5) return '#FFA726';      // En observación
    return '#F44336';                        // Crítico
}

function setColorsCalificacion(dataChart){
    dataChart.datasets.forEach(dataset => {
        dataset.backgroundColor = dataset.data.map(getColorCalificacion);
        dataset.borderColor = 'transparent';
        dataset.borderWidth = 0;
        dataset.borderRadius = 2;
    });
    return dataChart;
}

function setColorsTendencia(dataChart){
    dataChart.datasets.forEach(dataset => {
        const color = colorsDepartamento[dataset.label] || '#888888';
        Object.assign(dataset, {
            borderColor: color, backgroundColor: color, borderWidth: 2,
            pointRadius: 4, pointStyle: 'circle', tension: 0.50, fill: false, spanGaps: true,
        });
    });
    return dataChart;
}

function getOptionsTendencia(dataChart){
    // La escala de la maqueta empieza en 7; se baja si algún promedio queda debajo
    const values = dataChart.datasets.flatMap(dataset => dataset.data).filter(v => v !== null);
    const minValue = values.length ? Math.min(...values) : 7;
    const minScale = minValue < 7 ? Math.floor(minValue) : 7;
    return {
        ...optionsChart3,
        scales: { ...optionsChart3.scales, y: { ...optionsChart3.scales.y, min: minScale } },
    };
}

function setPreguntasNegativas(list){
    // Se reemplaza en sitio el contenido que usa buildChartData() de la maqueta
    const departamentos = [...new Set(list.map(item => item.departamento))];
    preguntasOrdenadas.splice(0, preguntasOrdenadas.length, ...list);
    departamentosOrden.splice(0, departamentosOrden.length, ...departamentos);
    departamentos.forEach(dep => {
        departamentoColors[dep] = colorsDepartamento[dep] || '#888888';
        departamentoVisible[dep] = true;
    });
}
