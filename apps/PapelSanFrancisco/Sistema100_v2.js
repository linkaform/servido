const LOADER_TARGETS = [
  '#chartFirst', '#chartSecond', '#chartThird', '#chartFourth',
  '#chartFiveth', '#chartSixth', '#chartSeventh', '#chartEigth', '#chartNineth',
  '#tableFirst'
];
const PROGRESS_CHIPS_SELECTOR = '.section-progress-blue, .section-progress-brown, .section-progress-grey, .section-progress-orange, .section-progress-green';

let dataChartA = {}
let dataChartB = {}


window.onload = function(){
    const statusSession = getSessionNew(null);
    console.log('statusSession',statusSession)
    if (statusSession === 'Active') {
        loadData();
    } else {
        loadDemoData();
    }
}

function initDropdown(dropdownId){
    const dropdown = document.getElementById(dropdownId);

    if(!dropdown){
        return;
    }

    const button = dropdown.querySelector('.dropdown-btn');
    const items = dropdown.querySelectorAll('.item');
    const selected = dropdown.querySelector('.selected-text');

    button.addEventListener('click', (e) => {

        e.stopPropagation();

        document.querySelectorAll('.dropdown.active').forEach(d => {
            if(d !== dropdown){
                d.classList.remove('active');
            }
        });

        dropdown.classList.toggle('active');
    });

    items.forEach(item => {

        item.addEventListener('click', () => {

            const value = item.dataset.value || item.textContent.replace('✓ ','').trim();

            selected.textContent = value;

            // Guardar valor en el botón
            button.dataset.value = value;

            items.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');

            dropdown.classList.remove('active');
        });

    });
}

function switchChart(option, demo = false) {
    // Actualizar botones activos
    document.querySelectorAll('.chart-toggle-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === option);
    });

    // Seleccionar el set de datos según el modo
    const dataA = demo ? dataChartA : dataChart5A;
    const dataB = demo ? dataChartB : dataChart5B;

    // Lógica de la gráfica
    if (option === 'tendencia') {
        drawChartElement('chartFiveth', 'line', dataA, optionsChart5A, undefined, true);
    } else {
        drawChartElement('chartFiveth', 'bar', dataB, optionsChart5B, undefined, true);
    }
}

function loadDemoData(){
    //----Loader ON
    mostrarLoaders();
    mostrarBotonExecution();

    //----Dropdown 
    initDropdown('filterFabrica');

    //----Selectores
    initDropdown('filterFabrica');
    drawChartElement('chartFirst','line',dataChart1,optionsChart1, undefined,  true);
    drawChartElement('chartSecond','bar',dataChart2,optionsChart2, undefined,  true);
    drawChartElement('chartThird','bar',dataChart3,optionsChart3, undefined,  true);
    drawChartElement('chartFourth','line',dataChart4,optionsChart4, undefined,  true);
    drawChartElement('chartFiveth','line',dataChart5A,optionsChart5A, undefined,  true);
    drawChartElement('chartSixth','bar',dataChart6,optionsChart6, undefined,  true);
    drawChartElement('chartSeventh','line',dataChart7,optionsChart7, undefined,  true);
    drawChartElement('chartEigth','line',dataChart8,optionsChart8, undefined,  true);
    drawChartElement('chartNineth','line',dataChart9,optionsChart9, undefined,  true);
    drawTableElement('tableFirst', dataTable1, columnsTable1, undefined, configTable1);

    document.getElementById('filterMes').addEventListener('change', (event) => {
      const valor = event.target.value; // formato "YYYY-MM", ej. "2026-07"

    });

    document.getElementById('btnBarras').addEventListener('click', function() {
        switchChart('barras');
    });

    document.getElementById('btnTendencia').addEventListener('click', function() {
        switchChart('tendencia');
    });


    //----Loader OFF (5 segundos después)
    setTimeout(() => {
        ocultarLoaders();
    }, 5000);
}

function loadData(data) {
    //----Catalog
    get_catalog();

    //----Dropdown 
    initDropdown('filterFabrica');
    
    //----Loader ON
    mostrarLoaders();
    mostrarBotonExecution();

    //----Assing Events
    document.getElementById('btnBarras').addEventListener('click', function() {
        switchChart('barras',true);
    });

    document.getElementById('btnTendencia').addEventListener('click', function() {
        switchChart('tendencia',true);
    });

    const buttonExecution = document.getElementById("buttonExecution");
    buttonExecution.addEventListener("click", () => {
        getInformation();
    });
    
}

function mostrarLoaders() {
    LOADER_TARGETS.forEach(sel => {
        const el = document.querySelector(sel);
        if (!el) return;
        const wrapper = el.closest('.chart-wrapper, .table-wrapper');
        if (wrapper) wrapper.classList.add('is-loading');
    });
    document.querySelectorAll(PROGRESS_CHIPS_SELECTOR).forEach(chip => chip.classList.add('is-loading'));
}

function ocultarLoaders() {
    document.querySelectorAll('.chart-wrapper.is-loading, .table-wrapper.is-loading')
    .forEach(w => w.classList.remove('is-loading'));

    document.querySelectorAll(PROGRESS_CHIPS_SELECTOR)
    .forEach(chip => chip.classList.remove('is-loading'));
}

function mostrarBotonExecution() {
    const btn = document.getElementById('buttonExecution');
    if (btn) btn.style.display = 'block';
}

function ocultarBotonExecution() {
    const btn = document.getElementById('buttonExecution');
    if (btn) btn.style.display = 'none';
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
        const data = res.response && res.response.data.catalog ? res.response.data.catalog : {};
        pintarCatalogoDropdown(data, 'filterFabrica');
    })
}

//----PINTAR OPCIONES DEL DROPDOWN A PARTIR DE LAS KEYS DE "data"
function pintarCatalogoDropdown(data, dropdownId){
    const dropdown = document.getElementById(dropdownId);
    if(!dropdown) return;

    const btn = dropdown.querySelector('.dropdown-btn');
    const menu = dropdown.querySelector('.dropdown-menu');
    const selectedText = btn.querySelector('.selected-text');

    // Limpiar opciones previas
    menu.innerHTML = '';

    // -------- Opción colchón "Seleccione planta"
    const placeholderDiv = document.createElement('div');
    placeholderDiv.classList.add('item', 'item-placeholder', 'selected');
    placeholderDiv.setAttribute('data-value', '');
    placeholderDiv.textContent = 'Seleccione planta';
    menu.appendChild(placeholderDiv);

    // -------- Opciones reales desde las keys de "data"
    const keys = Object.keys(data);
    keys.forEach(key => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('item');
        optionDiv.setAttribute('data-value', key);
        optionDiv.textContent = key;
        menu.appendChild(optionDiv);
    });

    // -------- Dejar el placeholder como valor inicial del botón
    btn.setAttribute('data-value', '');
    selectedText.textContent = 'Seleccione planta';

    // -------- Reasignar eventos click a todas las opciones (placeholder + reales)
    menu.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', () => {
            const value = item.getAttribute('data-value');
            const text = item.textContent;

            btn.setAttribute('data-value', value);
            selectedText.textContent = text;

            menu.querySelectorAll('.item').forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');

            dropdown.classList.remove('active');
        });
    });
}

async function getInformation(dicAditional = {}){
    const demo = getParameterURL('demo');
    const scriptId = getParameterURL('script_id');
    const statusSession = getSessionNew();
    const dicAdional = dicAditional;
    // Obtener valores de los filtros
    const mesValue = document.getElementById('filterMes').value;
    const fabricaValue = document.querySelector('#filterFabrica .filters-fabrica').getAttribute('data-value');

    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    } else if(!mesValue || !fabricaValue){
        Swal.fire({
          title: 'Advertencia',
          html: 'Debe seleccionar una planta y un mes antes de continuar.'
        });
    } else if(scriptId != null && statusSession == 'Active' && !demo){
        mostrarLoaders(); // se muestra solo cuando la validación pasó
        dicAdional.month = mesValue;
        dicAdional.planta = fabricaValue;
        const responseRequest = await sendRequestReportNew(scriptId, dicAdional);
        if ( typeof responseRequest === 'object' && responseRequest !== null && Object.keys(responseRequest).length > 0) {
            const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
            if (data.response_chart_fourth) {
              drawChartElement('chartFourth', 'line', data.response_chart_fourth, optionsChart4, undefined,  true);
            }
            if (data.response_chart_fiveth) {
                dataChartA = data.response_chart_fiveth.chart5A ? data.response_chart_fiveth.chart5A : {};
                dataChartB = data.response_chart_fiveth.chart5A ? data.response_chart_fiveth.chart5A : {};
                drawChartElement('chartFiveth', 'line', data.response_chart_fiveth.chart5A, optionsChart5A, undefined,  true);
            }
            if (data.response_chart_sixth) {
              drawChartElement('chartSixth', 'bar', data.response_chart_sixth, optionsChart6, undefined,  true);
            }
        }
        ocultarLoaders(); 
    }
}