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
    //----Search Catalogs
    get_catalog();
    //----Assing Events
    const buttonClose = document.getElementById("buttonClose");
    const buttonExecution = document.getElementById("buttonExecution");
    buttonExecution.addEventListener("click", () => {
        getInformation();
    });
    //---Select 
    $('#time').on('change', function() {
        const selectedValue = $(this).val(); 
        onChangeSelect(selectedValue);
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
       
    })
}

//----Events
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

function setupSwitches(switchClass) {
    const switches = document.querySelectorAll(`.${switchClass}`);
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

function setEvents() {
    //----Input FIlter
    $('#time').on('change', function() {
        const selectedValue = $(this).val(); 
        onChangeSelect(selectedValue);
    });

    //----Buttons Modal
    document.getElementById("modal-filter-chartFirst").addEventListener("click", () => {
        const eventModal = new bootstrap.Modal(document.getElementById('modalFilterFirst'));
        eventModal.show();
    });
    document.getElementById("modal-filter-chartSecond").addEventListener("click", () => {
        const eventModal = new bootstrap.Modal(document.getElementById('modalFilterSecond'));
        eventModal.show();
    });
    document.getElementById("modal-change-chartThird").addEventListener("click", () => {
        const eventModal = new bootstrap.Modal(document.getElementById('modalFilterThird'));
        eventModal.show();
    });

    document.getElementById("modal-change-chartFourth").addEventListener("click", () => {
        const eventModal = new bootstrap.Modal(document.getElementById('modalFilterFourth'));
        eventModal.show();
    });

    document.getElementById("modal-change-chartFiveth").addEventListener("click", () => {
        const eventModal = new bootstrap.Modal(document.getElementById('modalFilterFiveth'));
        eventModal.show();
    });

    document.getElementById("modal-filter-chartSixth").addEventListener("click", () => {
        const eventModal = new bootstrap.Modal(document.getElementById('modalFilterSixth'));
        eventModal.show();
    });

    //----Switch
    document.getElementById("switch1A").addEventListener("change", setupSwitches('switchChartFirst'));
    document.getElementById("switch1B").addEventListener("change", setupSwitches('switchChartFirst'));

    document.getElementById("switch2A").addEventListener("change", setupSwitches('switchChartSecond'));
    document.getElementById("switch2B").addEventListener("change", setupSwitches('switchChartSecond'));

    document.getElementById("switch3BarHorizontal").addEventListener("change", setupSwitches('switchChartThird'));
    document.getElementById("switch3Bar").addEventListener("change", setupSwitches('switchChartThird'));
    document.getElementById("switch3Line").addEventListener("change", setupSwitches('switchChartThird'));
    document.getElementById("switch3Pie").addEventListener("change", setupSwitches('switchChartThird'));

    
    document.getElementById("switch4BarHorizontal").addEventListener("change", setupSwitches('switchChartFourth'));
    document.getElementById("switch4Bar").addEventListener("change", setupSwitches('switchChartFourth'));
    document.getElementById("switch4Line").addEventListener("change", setupSwitches('switchChartFourth'));
    document.getElementById("switch4Pie").addEventListener("change", setupSwitches('switchChartFourth'));


    document.getElementById("switch5BarHorizontal").addEventListener("change", setupSwitches('switchChartFiveth'));
    document.getElementById("switch5Bar").addEventListener("change", setupSwitches('switchChartFiveth'));
    document.getElementById("switch5Line").addEventListener("change", setupSwitches('switchChartFiveth'));
    document.getElementById("switch5Pie").addEventListener("change", setupSwitches('switchChartFiveth'));


    document.getElementById("switch6A").addEventListener("change", setupSwitches('switchChartSixth'));
    document.getElementById("switch6B").addEventListener("change", setupSwitches('switchChartSixth'));
    document.getElementById("switch6C").addEventListener("change", setupSwitches('switchChartSixth'));
    document.getElementById("switch6D").addEventListener("change", setupSwitches('switchChartSixth'));





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

function setFilterChart(classSwitch){
    let switches = document.querySelectorAll(`.${classSwitch}:checked`);
    if (switches.length === 0) return null;

    switches.forEach(switchElement => {
        let switchId = switchElement.id; // Obtiene el ID del switch
        let itemDic = dicOptionsChart.find(item => item.key === switchId);
        if (itemDic) {
            drawChartElement(itemDic.id,'line', itemDic.data, itemDic.configs);
        }
    });
}

function setFilterTypeChart(classSwitch){
    let switches = document.querySelectorAll(`.${classSwitch}:checked`);
    if (switches.length === 0) return null;
    switches.forEach(switchElement => {
        let switchId = switchElement.id; // Obtiene el ID del switch
        let itemDic = dicOptionsChartTotals.find(item => item.key === switchId);
        if (itemDic) {
            drawChartElement(itemDic.id,itemDic.type, itemDic.data, itemDic.configs);
        }
    });
}