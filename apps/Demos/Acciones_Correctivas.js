let dataCatalogInstitucion = [];


window.onload = function(){
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

//-----LOAD DATA DEMO
function loadDemoData(){
    //----Input FIlter
    $('#type_date').on('change', function() {
        const selectedValue = $(this).val(); 
        onChangeSelect(selectedValue);
    });
    document.getElementById("button-left-chartSecond").addEventListener("click", () => {
        onClickBack();
    });

    //----Load Demo Elements
    drawChartElement('chartFirst','pie',dataChart1,setOptions1);
    drawChartElement('chartSecond','bar',dataChart2,setOptions2);
    drawChartElement('chartThird','bar',dataChart3,setOptions3);
    drawChartElement('chartFourth','bar',dataChart4,setOptions4);
    drawChartElement('chartFiveth','line',dataChart5,setOptions5, undefined, true);

    setTimeout(() => { hide_loading();}, 2000);
}

//-----LOAD DATA ACTIVE
function loadData(data) {
    //----Search Catalogs
    get_catalog();
    //----Assing Events
    const buttonExecution = document.getElementById("buttonExecution");
    buttonExecution.addEventListener("click", () => {
        getInformation();
    });
    //-----Loading
    setTimeout(() => { hide_loading();}, 2000);
}

//-----SET REQUEST ACTIVE
async function getInformation(){
    showLoadingComponent();
    const scriptId = getParameterURL('script_id');
    const demo = getParameterURL('demo');
    const statusSession = getSession();
    const dicAdional = {'option':'report'}
    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}

//-----GET CATALOG
function get_catalog(){
    const scriptId = getParameterURL('script_id');
    const JWT = getCookie("userJwt");
    fetch(getUrlRequest('script'), {
        method: 'POST',
        body: JSON.stringify({
            script_id: scriptId,
            option: 'filter',
        }),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+JWT
        },
    })
    .then((res) => res.json())
    .then((res) => {
        const catalog_institucion = res.response && res.response.catalog_institucion ? res.response.catalog_institucion : [];
        const catalog_taller = res.response && res.response.catalog_taller ? res.response.catalog_taller : [];

        if(catalog_institucion.length > 0){
            dataCatalogInstitucion = catalog_institucion;
            set_catalog_select(catalog_institucion, 'institucion', 'institucion');
            set_catalog_select(catalog_institucion, 'grupo', 'grupo');
            set_catalog_select(catalog_institucion, 'mentor', 'mentor');
        }

        if(catalog_taller.length > 0){
            set_catalog_select(catalog_taller, 'taller', 'taller');
        }
    })
}

//----Custom Dates Active/Demo
function onChangeSelect(value) {
    const divFromInput = document.getElementById('divDateFrom');
    const divToInput = document.getElementById('divDateTo');
    const className = 'd-none';
    if (value == '10') {
        divFromInput.classList.remove(className);
        divToInput.classList.remove(className); 
    } else {
        divFromInput.classList.add(className);
        divToInput.classList.add(className);
    }
}


function onClickBack(){
    drawChartElement('chartSecond','bar',dataChart2,setOptions2);  
}