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
    drawChartElement('chartFirst','bar',dataChart1,setOptions1);
    drawChartElement('chartSecond','bar',dataChart2, setOptions1);
    drawChartElement('chartThird','bar',dataChart3, setOptions1);
    drawChartElement('chartFourth','radar',dataChart4, setOptions4, false);
    drawChartElement('chartFiveth','line',dataChart5, setOptions5);
    drawChartElement('chartSixth','line',dataChart6, setOptions5);
    drawChartElement('chartSeventh','line',dataChart7, setOptions5);
    drawChartElement('chartEigth','line',dataChart8, setOptions5);
    drawTableElement('tableFirst', dataTable1, columsTable1);
    setTimeout(() => { hide_loading();}, 2000);
}

//-----FUNCTION ACTIVE
function loadData(data) {
    //----Search Catalogs
    get_catalog();
    //----Assing Events
    const buttonClose = document.getElementById("buttonClose");
    const buttonExecution = document.getElementById("buttonExecution");
    buttonExecution.addEventListener("click", () => {
        getInformation();
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
            set_clean_select('sucursal');
            $('#campus').select2();
            $('#sucursal').select2();
        }
    });

    $('#campus').on('change', function() {
        const selectedValues = $(this).val(); 
        if (selectedValues && selectedValues.length > 0) {
            dicFind = findListDictionary(dataCatalogs, 'campus', selectedValues);
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
    const demo = getParameterURL('demo');
    const scriptId = getParameterURL('script_id');
    const statusSession = getSession();
    const dicAdional = {'user_name':getCookie("userName").replace(/"/g, ''),'option':'get_data'}
    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReport(scriptId, dicAdional);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};

        if(data.data_first){
            drawChartElement('chartFirst','bar',data.data_first, setOptions1);
        }

        if(data.data_second){
            drawChartElement('chartSecond','bar',data.data_second, setOptions1);
        }

        if(data.data_third){
            drawChartElement('chartThird','bar',data.data_third, setOptions1);
        }

        if(data.data_fourth){
            drawChartElement('chartFourth','radar',data.data_fourth, setOptions4, false);
        }

        if(data.data_five){
            drawChartElement('chartFiveth','line',data.data_five, setOptions5);
        }
        if(data.data_sixth){
            drawChartElement('chartSixth','line',data.data_sixth, setOptions5);
        }

        if(data.data_seventh){
            drawChartElement('chartSeventh','line',data.data_seventh, setOptions5);
        }

        if(data.data_eigth){
            drawChartElement('chartEigth','line',data.data_eigth, setOptions5);
        }

        if(data.data_nineth){
            drawTableElement('tableFirst', data.data_nineth, columsTable1);
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
    const scriptId = getParameterURL('script_id');
    const JWT = getCookie("userJwt");
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: scriptId,
            user_name: getCookie("userName").replace(/"/g, ''),
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
        const data_catalog = data.res_catalog ? data.res_catalog : [];
        const data_forms = data.res_forms ? data.res_forms : [];

        if(data_catalog.length > 0){
            set_catalog_select(data_catalog, 'auditoria', 'auditoria');
        }
        if(data_forms.length > 0){
            setSelect(data_forms, 'name', 'id', 'formIds');
        }
    })
}

//----DOWNLOAPDF
function getDownloadPdf(id_record = 0){
    //---Alert
    Swal.fire('Espere Por Favor');
    Swal.showLoading();
    //---Request
    const scriptId = getParameterURL('script_id');
    const JWT = getCookie("userJwt");
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: 128556,
            id_record: id_record,
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+JWT
        },
    })
    .then((res) => res.json())
    .then((res) => {
        const data = res.response && res.response.data ? res.response.data : [];
        if(data.status  == '200'){
            Swal.close();
            link = data.url;
            Object.assign(document.createElement('a'), {
                target: '_blank',
                rel: 'noopener noreferrer',
                href: link,
            }).click();
        }else{
            Swal.close();
        }
    })
  return link;
}