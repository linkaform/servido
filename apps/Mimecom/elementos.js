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
    //---Data
    setEvents();
    //---Definitions ELements
    drawChartElement('chartFirst','line',dataChart1A,setOptions1A);
    drawChartElement('chartSecond','line',dataChart2A, setOptions2A);
    drawChartElement('chartThird','bar',dataChart3, setOptions3BarHorizontal);
    drawChartElement('chartFourth','bar',dataChart4, setOptions4BarHorizontal);
    drawChartElement('chartFiveth','bar',dataChart5, setOptions5Bar);
    drawChartElement('chartSixth','line',dataChart6D, setOptions6D);
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

        if(data.chartFirst){
            let itemDic = dicOptionsChart.find(item => item.key === dicAdional.chartFirst);
            console.log('itemDic',itemDic)
            drawChartElement('chartFirst','line',data.chartFirst, itemDic.configs);
        }
        if(data.chartSecond){
            let itemDic = dicOptionsChart.find(item => item.key === dicAdional.chartSecond);
            console.log('itemDic',itemDic)
            drawChartElement('chartSecond','line', data.chartSecond, itemDic.configs);
        }
        if(data.chartThird){
            let itemDic = dicOptionsChartTotals.find(item => item.key === dicAdional.chartThird);
            console.log('itemDic',itemDic)
            drawChartElement('chartThird',itemDic.type, data.chartThird, itemDic.configs);
        }
        if(data.chartFourth){
            let itemDic = dicOptionsChartTotals.find(item => item.key === dicAdional.chartFourth);
            console.log('chartFourth',itemDic.type, data.chartFourth, itemDic.configs)
            drawChartElement('chartFourth',itemDic.type, data.chartFourth, itemDic.configs);
        }
        if(data.chartFiveth){
            let itemDic = dicOptionsChartTotals.find(item => item.key === dicAdional.chartFiveth);
            console.log('chartFiveth',itemDic.type, data.chartFiveth, itemDic.configs)
            drawChartElement('chartFiveth',itemDic.type, data.chartFiveth, itemDic.configs);
        }
        if(data.chartSixth){
            let itemDic = dicOptionsChart.find(item => item.key === dicAdional.chartSixth);
            console.log('chartSixth','line',data.chartSixth, itemDic.configs)
            drawChartElement('chartSixth','line',data.chartSixth, itemDic.configs);
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

//-----Get switches
function getSwitchsAll() {
    let dic_return = {}; 
    const dic_first = setFilterChart('switchChartFirst', true, 'chartFirst' );
    const dic_Second = setFilterChart('switchChartSecond', true, 'chartSecond' );
    const dic_Third = setFilterChart('switchChartThird', true, 'chartThird' );
    const dic_Fourth = setFilterChart('switchChartFourth', true, 'chartFourth' );
    const dic_Fiveth = setFilterChart('switchChartFiveth', true, 'chartFiveth' );
    const dic_Sixth = setFilterChart('switchChartSixth', true, 'chartSixth' );


    dic_return = { ...dic_return,  ...(dic_first  || {})  };  
    dic_return = { ...dic_return,  ...(dic_Second || {})  };  
    dic_return = { ...dic_return,  ...(dic_Third  || {})  };  
    dic_return = { ...dic_return,  ...(dic_Fourth || {})  };  
    dic_return = { ...dic_return,  ...(dic_Fiveth || {})  };  
    dic_return = { ...dic_return,  ...(dic_Sixth  || {})  };  

    return dic_return;
}

//----Custom Date  Active/Demo
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

//----Setup Switch Active/Demo
function setupSwitches(switchClass) {
    const switches = document.querySelectorAll(`.${switchClass}`);
    let checkedSwitch = Array.from(switches).find(s => s.checked);
    if (!checkedSwitch && switches.length > 0) {
        switches[0].checked = true; 
        checkedSwitch = switches[0];
    }
    switches.forEach(switchEl => {
        switchEl.addEventListener("change", function () {
            if (this.checked) {
                const groupName = this.name;
                switches.forEach(s => {
                    if (s !== this && s.name === groupName) {
                        s.checked = false;
                    }
                });
            }
        });
    });
}


//----Events Demo
function setEvents() {
    //----Input FIlter
    $('#time').on('change', function() {
        const selectedValue = $(this).val(); 
        onChangeSelect(selectedValue);
    });

    //----Buttons Modal
    Object.entries(modalMappings).forEach(([buttonId, modalId]) => {
        const button = document.getElementById(buttonId);
        const modalElement = document.getElementById(modalId);

        if (button && modalElement) {
            button.addEventListener("click", () => {
                const eventModal = new bootstrap.Modal(modalElement);
                eventModal.show();
            });
        }
    });

    //---Asign Function Change Switch
    Object.entries(switchGroups).forEach(([chart, switches]) => {
        switches.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener("change", () => setupSwitches(chart));
            }
        });
        setupSwitches(chart);
    });



    //----Save Filter
    document.getElementById("button-succes-modalFilterFirst").addEventListener("click", () => {
        setFilterChart('switchChartFirst');
        setTimeout(function(){
            const modalElement = document.getElementById('modalFilterFirst');
            const eventModal = bootstrap.Modal.getInstance(modalElement);
            if (eventModal) {
                eventModal.hide();
            }
        }, 500);
    });


    document.getElementById("button-succes-modalFilterSecond").addEventListener("click", () => {
        setFilterChart('switchChartSecond');
        setTimeout(function(){
            const modalElement = document.getElementById('modalFilterSecond');
            const eventModal = bootstrap.Modal.getInstance(modalElement);
            if (eventModal) {
                eventModal.hide();
            }
        }, 500);
    });

    document.getElementById("button-succes-modalFilterThird").addEventListener("click", () => {
        setFilterTypeChart('switchChartThird');
        setTimeout(function(){
            const modalElement = document.getElementById('modalFilterThird');
            const eventModal = bootstrap.Modal.getInstance(modalElement);
            if (eventModal) {
                eventModal.hide();
            }
        }, 500);
    });

    document.getElementById("button-succes-modalFilterFourth").addEventListener("click", () => {
        setFilterTypeChart('switchChartFourth');
        setTimeout(function(){
            const modalElement = document.getElementById('modalFilterFourth');
            const eventModal = bootstrap.Modal.getInstance(modalElement);
            if (eventModal) {
                eventModal.hide();
            }
        }, 500);
    });


    document.getElementById("button-succes-modalFilterFiveth").addEventListener("click", () => {
        setFilterTypeChart('switchChartFiveth');
        setTimeout(function(){
            const modalElement = document.getElementById('modalFilterFiveth');
            const eventModal = bootstrap.Modal.getInstance(modalElement);
            if (eventModal) {
                eventModal.hide();
            }
        }, 500);
    });



    document.getElementById("button-succes-modalFilterSixth").addEventListener("click", () => {
        setFilterChart('switchChartSixth');
        setTimeout(function(){
            const modalElement = document.getElementById('modalFilterSixth');
            const eventModal = bootstrap.Modal.getInstance(modalElement);
            if (eventModal) {
                eventModal.hide();
            }
        }, 500);
    });
}

//----Events Load
function setEventsLoad() {
    //----Input FIlter
    $('#time').on('change', function() {
        const selectedValue = $(this).val(); 
        onChangeSelect(selectedValue);
    });

    //----Buttons Modal
    Object.entries(modalMappings).forEach(([buttonId, modalId]) => {
        const button = document.getElementById(buttonId);
        const modalElement = document.getElementById(modalId);

        if (button && modalElement) {
            button.addEventListener("click", () => {
                const eventModal = new bootstrap.Modal(modalElement);
                eventModal.show();
            });
        }
    });

    //---Asign Function Change Switch
    Object.entries(switchGroups).forEach(([chart, switches]) => {
        switches.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener("change", () => setupSwitches(chart));
            }
        });
        setupSwitches(chart);
    });
    
    //----Save Filter
    document.getElementById("button-succes-modalFilterFirst").addEventListener("click", () => {
        const dic_return = setFilterChart('switchChartFirst', true, 'chartFirst' );
        getInformation(dic_return);
        setTimeout(function(){
            const modalElement = document.getElementById('modalFilterFirst');
            const eventModal = bootstrap.Modal.getInstance(modalElement);
            if (eventModal) {
                eventModal.hide();
            }
        }, 500);
    });

    document.getElementById("button-succes-modalFilterSecond").addEventListener("click", () => {
        const dic_return = setFilterChart('switchChartSecond', true, 'chartSecond' )
        getInformation(dic_return);
        setTimeout(function(){
            const modalElement = document.getElementById('modalFilterSecond');
            const eventModal = bootstrap.Modal.getInstance(modalElement);
            if (eventModal) {
                eventModal.hide();
            }
        }, 500);
    });

    document.getElementById("button-succes-modalFilterThird").addEventListener("click", () => {
        const dic_return = setFilterChart('switchChartThird', true, 'chartThird' );
        getInformation(dic_return);
        setTimeout(function(){
            const modalElement = document.getElementById('modalFilterThird');
            const eventModal = bootstrap.Modal.getInstance(modalElement);
            if (eventModal) {
                eventModal.hide();
            }
        }, 500);
    });

    document.getElementById("button-succes-modalFilterFourth").addEventListener("click", () => {
        const dic_return = setFilterChart('switchChartFourth', true, 'chartFourth' );
        getInformation(dic_return);
        setTimeout(function(){
            const modalElement = document.getElementById('modalFilterFourth');
            const eventModal = bootstrap.Modal.getInstance(modalElement);
            if (eventModal) {
                eventModal.hide();
            }
        }, 500);
    });

    document.getElementById("button-succes-modalFilterFiveth").addEventListener("click", () => {
        const dic_return = setFilterChart('switchChartFiveth', true, 'chartFiveth' );
        getInformation(dic_return);
        setTimeout(function(){
            const modalElement = document.getElementById('modalFilterFiveth');
            const eventModal = bootstrap.Modal.getInstance(modalElement);
            if (eventModal) {
                eventModal.hide();
            }
        }, 500);
    });

    document.getElementById("button-succes-modalFilterSixth").addEventListener("click", () => {
        const dic_return = setFilterChart('switchChartSixth', true, 'chartSixth' );
        getInformation(dic_return);
        setTimeout(function(){
            const modalElement = document.getElementById('modalFilterSixth');
            const eventModal = bootstrap.Modal.getInstance(modalElement);
            if (eventModal) {
                eventModal.hide();
            }
        }, 500);
    });

    //---Request All
    document.getElementById("buttonExecution").addEventListener("click", () => {
        let dic_all = getSwitchsAll();
        getInformation(dic_all);
    });
}

//----Events Filter Chart Active/ Demo
function setFilterChart(classSwitch, filter = null, nameElement = null) {
    let switches = document.querySelectorAll(`.${classSwitch}:checked`);
    if (switches.length === 0) return null;

    for (let switchElement of switches) {
        let switchId = switchElement.id; 
        let itemDic = dicOptionsChart.find(item => item.key === switchId);

        if (filter == null) {
            if (itemDic) {
                drawChartElement(itemDic.id, itemDic.type, itemDic.data, itemDic.configs);
            }
        } else {
            if(switchId !=null && nameElement !=null){
                let dic_return = {}
                dic_return[nameElement] = switchId;
                return dic_return;
            }
        }
    }
    return null; 
}
