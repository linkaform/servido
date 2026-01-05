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
    drawTableElement('tableFirst', dataTableClarificacion1, columsTableClarificacion1);
    drawChartElement('chartFirst', 'bar', dataChartClarificacion1, setOptionsClarificacion1, undefined, true);

    drawTableElement('tableSecond', dataTableClarificacion2, columsTableClarificacion2);
    drawChartElement('chartSecond', 'line', dataChartClarificacion2, setOptionsClarificacion2, undefined, true);

    drawTableElement('tableThird', dataTableClarificacion3, columsTableClarificacion3);
    drawChartElement('chartThird', 'bar', dataChartClarificacion3, setOptionsClarificacion3, undefined, true);

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
    //----Input FIlter
    $('#type_date').on('change', function() {
        const selectedValue = $(this).val(); 
        onChangeSelect(selectedValue);
    });

    //-----Loading
    setTimeout(() => { hide_loading();}, 2000);
}

//-----SET REQUEST ACTIVE
async function getInformation(){
    const flagElements = declareteCreateElements();
    if(flagElements){
        showLoadingComponent();
        const scriptId = getParameterURL('script_id');
        const demo = getParameterURL('demo');
        const statusSession = getSession();
        const dicAdional = {'option':'get_records'}
        if(statusSession == 'Demo' || demo){
            Swal.fire({
              title: 'Advertencia',
              html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
            });
        }else if(scriptId != null && statusSession == 'Active' && !demo){
            const responseRequest = await sendRequestReport(scriptId, dicAdional);
            if ( typeof responseRequest === 'object' && responseRequest !== null && Object.keys(responseRequest).length > 0) {
                const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
                setDataInformation(data)
            }
            //-----Style
            hideLoadingComponent();
            showElements();
        }
    }else{
        Swal.fire({
            title: 'Advertencia',
            html: 'No es posible ejecutar el reporte, pues no a seleccionado el filtro de bitacora.'
        });
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

function declareteCreateElements() {
    let flagStatus = false;
    const valueSelector = document.getElementById("bitacora").value;
    if(valueSelector == 'clarificacion'){
        flagStatus = true;
        clearDivContentElements()
        createElements(dicReportContextClarificacion);
    }else if(valueSelector == 'energia'){
        flagStatus = true;
        clearDivContentElements()
        createElements(dicReportContextEnergia);
    }else if(valueSelector == 'molinos'){
        flagStatus = true;
        clearDivContentElements()
        createElements(dicReportContextMolinos);
    }else if(valueSelector == 'supervisor'){
        flagStatus = true;
        clearDivContentElements()
        createElements(dicReportContextSupervisor);
    }
    return flagStatus;
}

function clearDivContentElements() {
  const elements = document.querySelectorAll('.div-content-element');
  elements.forEach(el => el.remove());
}

function setDataInformation(data){
    const valueSelector = document.getElementById("bitacora").value;
    if(valueSelector == 'clarificacion'){
        if(data.tableClarificacion){
            drawTableElement('tableFirst', data.tableClarificacion, columsTableClarificacion1);
        }
        if(data.chartClarificacion){
            drawChartElement('chartFirst', 'bar', data.chartClarificacion, setOptionsClarificacion1, undefined, true);
        }
        if(data.tableJugoMezclado){
            drawTableElement('tableSecond', data.tableJugoMezclado, columsTableClarificacion2);
        }
        if(data.chartJugoMezclado){
            drawChartElement('chartSecond', 'bar', data.chartJugoMezclado, setOptionsClarificacion2, undefined, true);
        }
        if(data.tablePool){
            drawTableElement('tableThird', data.tablePool, columsTableClarificacion3);
        }
        if(data.chartPool){
            drawChartElement('chartThird', 'bar', data.chartPool, setOptionsClarificacion3, undefined, true);
        }
    }else if(valueSelector == 'energia'){
        if(data.tableConductividad){
            drawTableElement('tableFirst', data.tableConductividad, columsTableEnergia1);
        }
        if(data.chartConductividad){
            drawChartElement('chartFirst', 'bar', data.chartConductividad, setOptionsEnergia1, undefined, true);
        }
        if(data.tableSolidosTotales){
            drawTableElement('tableSecond', data.tableSolidosTotales, columsTableEnergia2);
        }
        if(data.chartSolidosTotales){
            drawChartElement('chartSecond', 'line', data.chartSolidosTotales, setOptionsEnergia2, undefined, true);
        }
        if(data.tablePh){
            drawTableElement('tableThird', data.tablePh, columsTableEnergia3);
        }
        if(data.chartPh){
            drawChartElement('chartThird', 'bar', data.chartPh, setOptionsEnergia3, undefined, true);
        }
        if(data.tableFosfatos){
            drawTableElement('tableFourth', data.tableFosfatos, columsTableEnergia4);
        }
        if(data.chartFosfatos){
            drawChartElement('chartFourth', 'bar', data.chartFosfatos, setOptionsEnergia4, undefined, true);
        }
        if(data.tableFlujoAgua){
            drawTableElement('tableFiveth', data.tableFlujoAgua, columsTableEnergia5);
        }
        if(data.chartFlujoAgua){
            drawChartElement('chartFiveth', 'bar', data.chartFlujoAgua, setOptionsEnergia5, undefined, true);
        }
    }else if(valueSelector == 'molinos'){
        if(data.tablePolBagazo){
            drawTableElement('tableFirst', data.tablePolBagazo, columsTableMolinos1);
        }
        if(data.chartPolBagazo){
            drawChartElement('chartFirst', 'bar', data.chartPolBagazo, setOptionsMolinos1, undefined, true);
        }
        if(data.tableHumedadBagazo){
            drawTableElement('tableSecond', data.tableHumedadBagazo, columsTableMolinos2);
        }
        if(data.chartHumedadBagazo){
            drawChartElement('chartSecond', 'bar', data.chartHumedadBagazo, setOptionsMolinos2, undefined, true);
        }
    }else if(valueSelector == 'supervisor'){
        if(data.tablePH){
            drawTableElement('tableFirst', data.tablePH, columsTableSupervisor1);
        }
        if(data.chartPH){
            drawChartElement('chartFirst', 'bar', data.chartPH, setOptionsSupervisor1, undefined, true);
        }
        if(data.tableBrix){
            drawTableElement('tableSecond', data.tableBrix, columsTableSupervisor2);
        }
        if(data.chartBrix){
            drawChartElement('chartSecond', 'bar', data.chartBrix, setOptionsSupervisor2, undefined, true);
        }
        if(data.tablePureza){
            drawTableElement('tableThird', data.tablePureza, columsTableSupervisor3);
        }
        if(data.chartPureza){
            drawChartElement('chartThird', 'bar', data.chartPureza, setOptionsSupervisor3, undefined, true);
        }
        if(data.tablePol){
            drawTableElement('tableFourth', data.tablePol, columsTableSupervisor4);
        }
        if(data.chartPol){
            drawChartElement('chartFourth', 'bar', data.chartPol, setOptionsSupervisor4, undefined, true);
        }
        if(data.tableHumedad){
            drawTableElement('tableFiveth', data.tableHumedad, columsTableSupervisor5);
        }
        if(data.chartHumedad){
            drawChartElement('chartFiveth', 'bar', data.chartHumedad, setOptionsSupervisor5, undefined, true);
        }
        if(data.tableColor){
            drawTableElement('tableSixth', data.tableColor, columsTableSupervisor6);
        }
        if(data.chartColor){
            drawChartElement('chartSixth', 'bar', data.chartColor, setOptionsSupervisor6, undefined, true);
        }
        if(data.tableTurbiedad){
            drawTableElement('tableSeventh', data.tableTurbiedad, columsTableSupervisor7);
        }
        if(data.chartTurbiedad){
            drawChartElement('chartSeventh', 'bar', data.chartTurbiedad, setOptionsSupervisor7, undefined, true);
        }
    }
}