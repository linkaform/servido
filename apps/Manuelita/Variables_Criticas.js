window.onload = function(){
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

    createElements(dicReportContextClarificacion);
    drawTableElement('tableFirst', dataTable1, columsTable1);
    drawChartElement('chartFirst', 'bar', dataChart1, setOptions1, undefined, true);

    drawTableElement('tableSecond', dataTable2, columsTable2);
    drawChartElement('chartSecond', 'bar', dataChart2, setOptions2, undefined, true);

    drawTableElement('tableThird', dataTable3, columsTable3);
    drawChartElement('chartThird', 'bar', dataChart3, setOptions3, undefined, true);

    //----Input FIlter
    $('#type_date').on('change', function() {
        const selectedValue = $(this).val(); 
        onChangeSelect(selectedValue);
    });
    
    setTimeout(() => { hide_loading();}, 2000);
}

//-----LOAD DATA ACTIVE
function loadData(data) {
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
