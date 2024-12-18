//-Funciona para definir una cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
//-Funciona para obtener una cookie especifica
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i=0; i<ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length,c.length); 
  }
  return null;
}

//-Funciona para obtener el logo de la empresa
function getCompanyLogo(userParentId){
  let urlImg = '';
  if (userParentId !=0){
    urlImg = `https://f001.backblazeb2.com/file/lkf-media/company_pictures/company_pic_${userParentId}.thumbnail`;
  }else{
    urlImg = `https://f001.backblazeb2.com/file/lkf-media/company_pictures/company_pic_126.thumbnail`;
  }

  if (document.getElementById("image_log")){
    document.getElementById("image_log").setAttribute("src", urlImg)
    document.getElementById("image_log").setAttribute("width","125");
    document.getElementById("image_log").setAttribute("height","75");
  }
}

//-Funciona para obtener los parametros de la url actual o uno especifico
function getParameterURL(keyFound = null) {
  const params = new URLSearchParams(window.location.search);
  const dicParams = {};
  params.forEach((value, key) => {
    dicParams[key] = value;
  });
  if(keyFound != null){
    return dicParams.hasOwnProperty(keyFound) ? dicParams[keyFound] : null;
  }else{
    return parametros;
  }
}

//-Funciona para guardar en local storage una url y redireccionar al login
function setRedirection() {
  const urlOrigin = window.location.href;      
  const protocolo = window.location.protocol;    
  const hostname = window.location.hostname;      
  const puerto = window.location.port;            
  //---URL DATA STORAGE
  localStorage.setItem('urlOrigin', JSON.stringify(urlOrigin));
  //---URL REDIRECTION LOGIN
  let urlRedirection = `${protocolo}//${hostname}:${puerto}/Servido_v2/login.html`
  window.location.href = urlRedirection;
}

//-Funciona para redireccionar a lista de reportes
function setRedirectionList(){
  const urlOrigin = window.location.href;      
  const protocolo = window.location.protocol;    
  const hostname = window.location.hostname;      
  const puerto = window.location.port; 
  let urlRedirection = `${protocolo}//${hostname}:${puerto}/Servido_v2/list_reports.html`
  window.location.href = urlRedirection;     
}

//-Funciona para obtener los valores de sesion
function getSession(location = null) {
  const USERID = getCookie("userId");
  const JWT = getCookie("userJwt");
  const SCRIPTID = getParameterURL('scriptId');
  const DEMO = getParameterURL('demo');
  const EMBEDED = getParameterURL('embeded');
  if(DEMO != "" && DEMO != null){
    return 'Demo';
  }else if(USERID != null && JWT != null && USERID != "" && JWT != ""){
    return 'Active';
  }else{
    if(location != 'login' || location == null){
        if(EMBEDED == "" || EMBEDED == null){
            setRedirection();
        }else{
            //---Show Alert
            let div1 = document.getElementById("content-div-noseession");
            div1.style.display = "flex";
            let div2 = document.getElementById("content-div-empty");
            div2.style.display = "none";
            //---Hide COmponents
            const divElements = document.querySelectorAll('.div-content-element');
            divElements.forEach(div => {
              div.style.display = 'none';
            });

            const buttonsElements = document.querySelectorAll('.btn-elements');
            buttonsElements.forEach(div => {
              div.style.display = 'none';
            });

        }
    }
    return 'Offline';
  }
}

//-Funciona para cerrar la sesión 
function closeSession(){
  let cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++){ 
    var spcook = cookies[i].split("="); 
    document.cookie = spcook[0] + "=;expires=Thu, 21 Sep 1979 00:00:01 UTC;"; 
  }
  location.reload();
}

//-Funciona para redireccionar a el listado de reportes
function getReportUrl() {
  const protocolo = window.location.protocol;    
  const hostname = window.location.hostname;      
  const puerto = window.location.port;
  //---URL REDIRECTION LOGIN
  let urlRedirection = `${protocolo}//${hostname}:${puerto}/Soter/list_reports.html`
  window.location.href = urlRedirection;
}

//-Funciona para mandar la petición a script de un report
async function sendRequestReport(script, env = null){
  let dicRes = {};
  let flagValidation = true;

  //----Get value Filter
  let dicFilter = {};
  let componentes = document.querySelectorAll('.filters-servido');
  for (let i = 0; i < componentes.length; i++) {
    let valor = componentes[i].value;
    const id = componentes[i].id;
    const multiple = componentes[i].multiple;
    const required = componentes[i].required;
    if (multiple) {
        valor = [];
        const component = componentes[i];
        Array.from(component.selectedOptions).forEach(option => {
          valor.push(option.value);  
        });
    }
    if(required){
      if(!valor || valor.length == 0){
        let flagValidation = false;
        Swal.fire({
          title: 'Advertencia',
          html:'No es posible ejecutar reporte, faltan filtros requeridos.'
        });
        break;
      }else{
        dicFilter[id] = valor;
      }
    }else{
      dicFilter[id] = valor;
    }
  }
  //----Update Script id
  dicFilter['script_id'] = script;
  //---Conditional env
  let urlRequest = 'https://app.linkaform.com/api/infosync/scripts/run/';
  if(env != null && env == 'test'){
    urlRequest = 'https://preprod.linkaform.com/api/infosync/scripts/run/';
  }
  //----Cookie 
  const JWTSESSION =  getCookie("userJwt");
  //----Fetch

  if(flagValidation){

        try {
            const response = await fetch(urlRequest, {
                method: 'POST',
                body: JSON.stringify(dicFilter),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JWTSESSION}`
                },
            });
            const res = await response.json();  
            if (res.success) {
                dicRes = res;
            } else {
                Swal.fire({
                  title: 'Error',
                  html: res.error
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                html: 'Ocurrió un problema en la solicitud.'
            });
        }
    }
    return dicRes;
}

//-Funciona para poner elementos como buscador por defecto
function setElementsStyle(){
  //---Check Session
  const statusSession = getSession();
  if(statusSession == 'Demo'){
    //---Buttons
    document.getElementById("buttonExecution").style.display = 'none';
    document.getElementById("buttonClose").style.display = 'none';
    const divEmpty = document.querySelectorAll('.div-content-empty');
    divEmpty.forEach(div => {
      div.style.display = 'none';
    });

  }else if(statusSession == 'Active'){
    //----Div Containers
    const divEmpty = document.querySelectorAll('.div-content-empty');
    const divElements = document.querySelectorAll('.div-content-element');
    divElements.forEach(div => {
      div.style.display = 'none';
    });
    divEmpty.forEach(div => {
      div.style.display = 'block';
    });
  }
  //---Check Parameter
  let embeded = getParameterURL('embeded');
  if(embeded != null){
    document.getElementById("buttonClose").style.display = 'none';
    document.getElementById("buttonList").style.display = 'none';
  }
  if (document.getElementById("buttonClose")){
   document.getElementById("buttonClose").addEventListener("click", function() {
        closeSession() ;
    });
  }
  if (document.getElementById("buttonList")){
   document.getElementById("buttonList").addEventListener("click", function() {
        setRedirectionList() ;
    });
  }
  //---Load Select2
  let componentes = document.querySelectorAll('.filters-servido');
  for (let i = 0; i < componentes.length; i++) {
    const multiple = componentes[i].multiple;
    const id = componentes[i].id;
    if (multiple) {
      $(`#${id}`).select2();
      id
    }
  }
}


//-Funciona para crear un esquema por defecto
function createElements(dataConfig = null){
    if(dataConfig != null && dataConfig.length > 0){
        const container = document.getElementById('content-list');

        dataConfig.forEach((item, index) => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row','div-content-element', 'ml-1', 'mr-1');
            //---Class row
            if(item.class){
                rowDiv.classList.add(item.class);
            }
            //---Add Elements
            if(item._children && item._children.length > 0){
                let children = item._children;
                children.forEach((element, index) => {
                    const divElement = document.createElement('div');
                    //-----Title
                    const titleElement = element.title ?  element.title : "";
                    //-----Color
                    const colorElement = element.color ? element.color : "primary";
                    //-----Class
                    const classElement = element.col ? `col-xl-${element.col} col-md-6 mb-4` : "col-xl-3 col-md-6 mb-4";
                    divElement.className = classElement;
                    //-----Progress
                    const progressElement = element.progress ? true : false;
                    //-----List Progress
                    const listProgress = element.listProgress? element.listProgress : [];
                    //-----Id
                    const idElement = element.id ? element.id : Math.floor(Math.random() * 1000);
                    //---Type Elements
                    if(element.type == 'card'){
                        //-----Element Progress
                        let progressDiv = '';
                        if(progressElement){
                            progressDiv = `<div class="col">
                                <div class="progress progress-sm mr-2">
                                    <div class="progress-bar bg-${colorElement}" role="progressbar"
                                        style="width: 70%" aria-valuenow="50" aria-valuemin="0"
                                        aria-valuemax="100" id="progress-${idElement}"></div>
                                </div>
                            </div>`;
                        }
                        //-----Element Card
                        divElement.innerHTML = `<div class="card border-left-${colorElement} shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-${colorElement} text-uppercase mb-1">
                                                ${titleElement}
                                            </div>
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-auto ml-3">
                                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800" id="text-${idElement}">70%</div>
                                                </div>
                                                ${progressDiv}
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }else if(element.type == 'chart'){
                        //-----Element Card
                        divElement.innerHTML = `<div class="card shadow mb-4">
                            <div
                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">${titleElement}</h6>
                                <div class="dropdown no-arrow">
                                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                        aria-labelledby="dropdownMenuLink">
                                        <div class="dropdown-header">Dropdown Header:</div>
                                        <a class="dropdown-item" href="#" onclick="get_chartDownload('${idElement}','chart_screenIV');return false;">Descargar</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Card Body -->
                            <div class="card-body">
                                <div id="secondElement">
                                    <canvas id="${idElement}" height="400"></canvas>
                                </div>
                            </div>
                        </div>`;
                    }else if(element.type == 'table'){
                        //-----Element Card
                        divElement.innerHTML = `<div class="card shadow mb-4">
                            <div
                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">${titleElement}</h6>
                                <div class="dropdown no-arrow">
                                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                        aria-labelledby="dropdownMenuLink">
                                        <div class="dropdown-header">Dropdown Header:</div>
                                        <a class="dropdown-item" id="download-csv-${idElement}" href="#">Descargar CSV</a>
                                        <a class="dropdown-item" id="download-xls-${idElement}" href="#">Descargar Excel</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Card Body -->
                            <div class="card-body">
                                <div id="${idElement}" ></div>
                            </div>
                        </div>`;
                    }else if(element.type == 'progressbar'){
                        //----List Element
                        let divProgress = '';
                        listProgress.forEach((itemProgress, index) => {
                            //-----Title
                            const titleProgresBar = itemProgress.titleProgresBar ?  itemProgress.titleProgresBar : "";
                            //-----Color
                            const colorProgresBar = itemProgress.color ? itemProgress.color : "primary";
                            //-----Percentage
                            const percentageProgresBar = itemProgress.col ? itemProgress.col : 0;
                            //-----Id
                            const idProgresBar = itemProgress.id ? itemProgress.id : Math.floor(Math.random() * 1000);
                            //-Element
                            divProgress +=`
                            <h4 class="small font-weight-bold">${titleProgresBar} 
                                <span class="float-right" id="text-progress-${idProgresBar}">${percentageProgresBar} %</span>
                            </h4>
                            <div class="progress mb-4">
                                <div class="progress-bar bg-${colorProgresBar}" role="progressbar" style="width: 90%"
                                    aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" id="value-progress-${idProgresBar}"></div>
                            </div>`;
                        });
                        //-----Body Element
                        divElement.innerHTML = `<div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">${titleElement}</h6>
                            </div>
                            <div class="card-body">
                                ${divProgress}
                            </div>
                        </div>`;
                    }
                    rowDiv.appendChild(divElement);
                });
            }
            container.appendChild(rowDiv);
        });
    }
}

//-Funciona para pintar graficas de manera generica
let chartInstances = {};
function drawChartElement(canvasId, type, datasets, dataconfig) {
    if (document.getElementById(canvasId)){
        var ctx = document.getElementById(canvasId).getContext('2d');
        if (chartInstances[canvasId]) {
            chartInstances[canvasId].destroy();
        }
        datasets = setColorsDatasets(datasets, type)
        chartInstances[canvasId] = new Chart(ctx, {
            type: type, 
            data: datasets,
            plugins: [ChartDataLabels],
            options: dataconfig
        });
    }
}

//-Funciona para agregar diferentes paletas de color
function setColorsDatasets(data = null, type = null){
    if(data != null){
        if(data.datasets.length == 1){
            let array_colors = data.labels.length > 0 ? getPAlleteColors(6, data.labels.length) : getPAlleteColors(6, 5);
            if(type == 'line'){
                data.datasets[0].borderColor = array_colors;
                data.datasets[0].fill = false;
            }else{
                data.datasets[0].backgroundColor = array_colors;
                data.datasets[0].borderColor = array_colors;
            }

        }else if(data.datasets.length > 1){
            console.log('datasets.labels',data)
            let array_colors = data.labels.length > 0 ? getPAlleteColors(6,  data.labels.length) : getPAlleteColors(6, 5);
            data.datasets.forEach((item, index) => {
                if(type == 'line'){
                    item.borderColor = array_colors[index];
                    item.fill = array_colors[index];

                }else{
                    item.backgroundColor = array_colors[index];
                    item.borderColor = array_colors[index];
                }

            });
        }
        return data;
    }
}

//-Funciona para llenar datos de una card
function drawCardElement(cardId, value, scroll = null) {
    if(scroll != null){
        document.getElementById(`text-${cardId}`).textContent = `${value}%`;
        document.getElementById(`progress-${cardId}`).style.width = value;
    }else{
        document.getElementById(`text-${cardId}`).textContent = value;
    }
}

//-Función para pintar table
function drawTableElement(tableId, tableData, tableColums, tableConfig = null){
    //----Config default
    let configDefault = {
        height: "400px",
        theme: "bootstrap5", 
        layout: "fitDataStretch", 
        columnMinWidth: 100,
        autoColumns: false, 
        scrollX: true, 
        dataTree:true,
        data:tableData,
        columns:tableColums,
    }
    //----Change COnfig
    if(tableConfig != null){
        for (let [key, value] of Object.entries(tableConfig)) {
            configDefault[key] = value
        }
    }
    //----Table
    let table = new Tabulator(`#${tableId}`, configDefault);

    if (document.getElementById(`download-xls-${tableId}`)){
        document.getElementById(`download-xls-${tableId}`).replaceWith(document.getElementById(`download-xls-${tableId}`).cloneNode(true));
        document.getElementById(`download-xls-${tableId}`).addEventListener("click", function (){
        table.download("xlsx", "data.xlsx", {sheetName:"data"});
        });
    }

    if (document.getElementById(`download-csv-${tableId}`)){
        document.getElementById(`download-csv-${tableId}`).replaceWith(document.getElementById(`download-csv-${tableId}`).cloneNode(true));
        document.getElementById(`download-csv-${tableId}`).addEventListener("click", function (){
          table.download("csv", "data.csv");
        });
    }
}

//--Funciona para cargar  estilos
function setStylesLoading(state = null){
    if(state == 'loading'){

    }else if(state == 'finish'){

    }

}

//----Funciona para Cargar elementos en un div
function loadComponent(content, file) {
    fetch(file)
    .then(response => {
        if (!response.ok) throw new Error("Error al cargar el archivo");
        return response.text();
    })
    .then(html => {
        document.getElementById(content).innerHTML = html;
    })
    .catch(error => console.error("Error:", error));
}