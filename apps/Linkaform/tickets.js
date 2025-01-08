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

function loadDemoData(){
    drawCardElement('cardFirst',20);
    drawCardElement('cardSecond',30);
    drawCardElement('cardThird',40);
    drawCardElement('cardFourth',50);
    drawCardElement('cardFiveth',60);
    drawCardElement('cardSixth',70);
    drawCardElement('cardSeventh',60);
    drawCardElement('cardEigth',10);
    drawCardElement('cardNineth',50);
    drawCardElement('cardTenth',60);
    drawCardElement('cardEleventh',90);
    drawTableElement('tableFirst', dataTable1, columsTable1);
    drawChartElement('chartFirst','line',dataChart1,setOptions1);
    drawChartElement('chartSecond','line',dataChart2, setOptions2);
    drawChartElement('chartThird','pie',dataChart3, setOptions3);
    setTimeout(() => { hide_loading();}, 2000);
}

//-----LOAD DATA ACTIVE
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
    const scriptId = getParameterURL('script_id');
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

