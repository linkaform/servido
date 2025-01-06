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
  }
}

function loadDemoData(){
    drawChartElement('chartFirst','bar',dataChart1,setOptions1);
    drawChartElement('chartSecond','bar',dataChart2, setOptions2);
    drawChartElement('chartThird','line',dataChart3, setOptions3);
    drawChartElement('chartFourth','line',dataChart4, setOptions4);
    drawChartElement('chartFiveth','line',dataChart5, setOptions5);
    setTimeout(() => { hide_loading();}, 2000);
}

function loadData(data) {
    //----Search Catalogs
    get_catalog();
    //----Assing Events
    const buttonClose = document.getElementById("buttonClose");
    const buttonExecution = document.getElementById("buttonExecution");
    buttonExecution.addEventListener("click", () => {
        getInformation();
    });
    buttonClose.addEventListener("click", () => {
        console.log('Cierra sesión');
    });
    //----Assign Selector
    $('#auditoria').on('change', function() {
        const selectedValues = $(this).val(); 
        if (selectedValues && selectedValues.length > 0) {
            dicFind = findListDictionary(dataCatalogs, 'auditoria', selectedValues);
            set_catalog_select(dicFind, 'sede', 'sede');
            $('#sede').select2();
        } else {
            set_clean_select('sede');
            set_clean_select('campus');
            set_clean_select('local');
            set_clean_select('sucursal');
            $('#sede').select2();
            $('#campus').select2();
            $('#local').select2();
            $('#sucursal').select2();
        }
    });

    $('#sede').on('change', function() {
        const selectedValues = $(this).val(); 
        if (selectedValues && selectedValues.length > 0) {
            dicFind = findListDictionary(dataCatalogs, 'sede', selectedValues);
            set_catalog_select(dicFind, 'campus', 'campus');
            $('#campus').select2();
        } else {
            set_clean_select('campus');
            set_clean_select('local');
            set_clean_select('sucursal');
            $('#campus').select2();
            $('#local').select2();
            $('#sucursal').select2();
        }
    });

    $('#campus').on('change', function() {
        const selectedValues = $(this).val(); 
        if (selectedValues && selectedValues.length > 0) {
            dicFind = findListDictionary(dataCatalogs, 'campus', selectedValues);
            set_catalog_select(dicFind, 'local', 'local');
            $('#local').select2();
        } else {
            set_clean_select('local');
            set_clean_select('sucursal');
            $('#local').select2();
            $('#sucursal').select2();
        }
    });

    $('#local').on('change', function() {
        const selectedValues = $(this).val(); 
        if (selectedValues && selectedValues.length > 0) {
            dicFind = findListDictionary(dataCatalogs, 'local', selectedValues);
            set_catalog_select(dicFind, 'sucursal', 'sucursal');
            $('#sucursal').select2();
        } else {
            set_clean_select('sucursal');
            $('#sucursal').select2();
        }
    });
    //---Hide
    setTimeout(() => { hide_loading();}, 2000);
}

//-----SET REQUEST
async function getInformation(){
    const scriptId = getParameterURL('scriptId');
    const demo = getParameterURL('demo');
    const statusSession = getSession();
    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReport(scriptId);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
        if(data.data_first){
            drawChartElement('chartFirst','bar',data.data_first,setOptions1);
        }
        if(data.data_second){
            drawChartElement('chartSecond','bar',data.data_second, setOptions2);
        }
        if(data.data_third){
            drawChartElement('chartThird','line',data.data_third, setOptions3);
        }
        if(data.data_fourth){
            drawChartElement('chartFourth','line',data.data_fourth, setOptions4);
        }
        if(data.data_five){
            drawChartElement('chartFiveth','line',data.data_five, setOptions5);
        }
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

//----CATALOG
function get_catalog(){
    const scriptId = getParameterURL('scriptId');
    const JWT = getCookie("userJwt");
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: scriptId,
            option: 'get_catalog',
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
            dataCatalogs = data;
            set_catalog_select(data, 'auditoria', 'auditoria');
        }
    })
}