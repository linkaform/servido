//-----URL LOGIN
//let URL = "https://preprod.linkaform.com/";
let URL = "https://app.linkaform.com";
// let URL = "http://192.168.0.25:8000";
// let URL = "http://127.0.0.1:8011";

//-Funciona para definir una cookie
function setCookie(cname, cvalue, exdays, options = {}) {
    // Calcula la fecha de expiración
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();

    // Configuración predeterminada
    const defaultOptions = {
        path: "/", // Hacer la cookie accesible en todo el dominio
        domain: null, // Si no se pasa, se usará el dominio actual
        secure: false, // Si quieres asegurarla para HTTPS, usa `true`
        sameSite: "Lax", // Cambiar a "None" si es necesario
    };

    // Combina las opciones predeterminadas con las personalizadas
    const { path, domain, secure, sameSite } = { ...defaultOptions, ...options };

    // Construye la cookie
    let cookie = `${cname}=${cvalue}; ${expires}; path=${path}`;
    if (domain) cookie += `; domain=${domain}`;
    if (secure) cookie += `; Secure`;
    if (sameSite) cookie += `; SameSite=${sameSite}`;

    // Establece la cookie
    document.cookie = cookie;
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
function setRedirectionLogin() {
  const urlOrigin = window.location.href;      
  const protocolo = window.location.protocol;    
  const hostname = window.location.hostname;      
  const puerto = window.location.port;            
  //---URL DATA STORAGE
  localStorage.setItem('urlOrigin', JSON.stringify(urlOrigin));
  //---URL REDIRECTION LOGIN
  let urlRedirection = `${protocolo}//${hostname}:${puerto}/Servido_Login/login.html`
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
  const SCRIPTID = getParameterURL('script_id');
  const DEMO = getParameterURL('demo');
  const EMBEDED = getParameterURL('embeded');

  if(DEMO != "" && DEMO != null){
    return 'Demo';
  }else if(USERID != null && JWT != null && USERID != "" && JWT != ""){
    return 'Active';
  }else{
    if(location != 'login' || location == null){
        if(EMBEDED == "" || EMBEDED == null){
            setRedirectionLogin();
        }else{
            //---Show Alert

            let div1 = document.getElementById("content-div-noseession");
            div1.style.display = "block";
            div1.style.height = "100vh";
            let div2 = document.getElementById("content-div-empty");
            div2.style.display = "none";
            let div3 = document.getElementById("content-div-buttons");
            div3.style.display = "none";
            let div4 = document.getElementById("content-div-filter");
            div4.style.display = "none";
            //---Hide COmponents
            const divElements = document.querySelectorAll('.div-content-element');
            divElements.forEach(div => {
              div.style.display = 'none';
            });
            const buttonsElements = document.querySelectorAll('.btn-elements');
            buttonsElements.forEach(div => {
              div.style.display = 'none';
            });
            document.getElementById("buttonExecution").style.display = 'none';
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
async function sendRequestReport(script, dicFilterAd = null){
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
        flagValidation = false;
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
  //----Check Filter Aditional
  if(dicFilterAd != null){
    dicFilter = { ...dicFilter, ...dicFilterAd };
  }
  //----Cookie 
  const JWTSESSION =  getCookie("userJwt");
  //----Fetch

    if(flagValidation){
        try {
            const response = await fetch(getUrlRequest('script'), {
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
    const divNoSession = document.querySelectorAll('.div-content-no-session');
    divNoSession.forEach(div => {
      div.style.display = 'none';
    });
  }else if(statusSession == 'Active'){
    //----Div Containers
    const divEmpty = document.querySelectorAll('.div-content-empty');
    const divNoSession = document.querySelectorAll('.div-content-no-session');
    const divElements = document.querySelectorAll('.div-content-element');
    divElements.forEach(div => {
      div.style.visibility = 'hidden';
    });
    divNoSession.forEach(div => {
      div.style.display = 'none';
    });
    divEmpty.forEach(div => {
      div.style.visibility = 'visible';
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

                    //#-----PROPS-----#//
                    //-----Title
                    const titleElement = element.title ?  element.title : "";
                    ///----PDF
                    const optionPDF = element.optionPDF ?  element.optionPDF : false;
                    ///----PDF
                    const optionExpanded = element.optionExpanded ?  element.optionExpanded : false;
                    //-----Color
                    let colorElement = element.color ? `border-left-${element.color}` : "";
                    let colorBg = element.color ? `bg-${element.color}` : "";
                    //-----Color Hexadecimal
                    let colorHexadecimal = element.hexadecimal ? `style="border-left-color: ${element.hexadecimal} !important; border-left-width: 5.3333px !important; "` : "";
                    let colorBgHexadecimal = element.hexadecimal ? `style="background: ${element.hexadecimal} !important;"` : "";
                    if(!colorHexadecimal && !colorElement){
                        colorElement = `border-left-primary`;
                        colorBg = `bg-primary`;
                    }
                    //-----Class
                    const classElement = element.col ? `col-xl-${element.col} col-md-${element.col} col-sm-12 mb-4` : "col-xl-3 col-md-6 mb-4";
                    divElement.className = classElement;
                    //-----Progress
                    const progressElement = element.progress ? true : false;
                    //-----List Progress
                    const listProgress = element.listProgress? element.listProgress : [];
                    //-----Id
                    const idElement = element.id ? element.id : Math.floor(Math.random() * 1000);
                    //-----Id
                    const columsKanva = element.columsKanva? element.columsKanva : [];
                    //-----Components Form
                    const formElements = element.formElements? element.formElements : [];
                    //-----Filter Modal
                    const filterCustom = element.filterCustom? element.filterCustom : false;
                    //-----Button Filter Modal
                    const optionButtonModal  = element.optionButtonModal ? element.optionButtonModal  : false;

                    //#-----COMPONENTS-----#//
                    if(element.type == 'card'){
                        //-----Element Progress
                        let progressDiv = '';
                        if(progressElement){
                            progressDiv = `<div class="col">
                                <div class="progress progress-sm mr-2">
                                    <div class="progress-bar ${colorBg}" ${colorBgHexadecimal} role="progressbar"
                                        style="width: 70%" aria-valuenow="50" aria-valuemin="0"
                                        aria-valuemax="100" id="progress-${idElement}"></div>
                                </div>
                            </div>`;
                        }
                        //-----Element Card
                        divElement.innerHTML = `<div class="card ${colorElement} shadow h-100 py-2" ${colorHexadecimal} >
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-${colorElement} text-uppercase mb-1">
                                                ${titleElement}
                                            </div>
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-auto ml-3">
                                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800" id="text-${idElement}"></div>
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
                        //-----Option Modal Custom
                        let buttonModal = '';
                        if(filterCustom){
                            buttonModal = `<button class="btn btn-sm btn-secondary mr-2" id="modal-filter-${idElement}">
                                <i class="fa-solid fa-filter"></i>
                            </button>`
                        }

                        //-----Element Card
                        divElement.innerHTML = `<div class="card shadow mb-4">
                            <div
                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">${titleElement}</h6>
                                <div class="d-flex justify-content-end">
                                    ${buttonModal}
                                    <button class="btn btn-sm btn-primary me-2"  onclick="get_chartDownload('${idElement}','chart_screenIV');return false;">
                                        <i class="fas fa-download"></i>
                                    </button>
                                </div>
                            </div>
                            <!-- Card Body -->
                            <div class="card-body">
                                <div>
                                    <canvas id="${idElement}" height="400"></canvas>
                                </div>
                            </div>
                        </div>`;
                    }else if(element.type == 'table'){
                        //-----Option PDF
                        let buttonPDF = '';
                        if(optionPDF){
                            buttonPDF = `<button class="btn btn-sm btn-danger ml-2" id="download-pdf-${idElement}">
                                <i class="fa-solid fa-file-pdf"></i>
                            </button>`
                        }
                        //-----Option Expanded All
                        let buttonExpanded = '';
                        if(optionExpanded){
                            buttonExpanded = `<button class="btn btn-sm btn-primary mr-2" id="button-expand-all-${idElement}">
                                <i class="fa-solid fa-expand"></i>
                            </button>`
                        }
                        //-----Element Table
                        divElement.innerHTML = `<div class="card shadow mb-4">
                            <div
                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">${titleElement}</h6>
                                <div class="d-flex justify-content-end">
                                    ${buttonExpanded}
                                    <button class="btn btn-sm btn-success me-2" id="download-xls-${idElement}">
                                        <i class="fas fa-file-excel"></i>
                                    </button>
                                    <button class="btn btn-sm btn-warning" id="download-csv-${idElement}">
                                        <i class="fas fa-file-csv"></i>
                                    </button>
                                    ${buttonPDF}
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
                    }else if(element.type == 'kanva'){
                        if (columsKanva.length > 0) {
                                let divCustom = `<div class="row full-height">`;

                                columsKanva.forEach((colElement) => {
                                    const titleColum = colElement.title ? colElement.title : '';
                                    const idColum = colElement.id ? colElement.id : '';
                                    const classGrid = colElement.grid ? colElement.grid : 'col-lg-2 col-md-4 col-sm-6';

                                    divCustom += `
                                        <div class="${classGrid} column dropzone" ondragover="allowDrop(event)" ondrop="dropCard(event)">
                                            <h5>${titleColum}</h5>
                                            <div  id="${idColum}" >
                                            </div>
                                        </div>`;
                                });

                                divCustom += `</div>`;
                                divElement.innerHTML = divCustom;
                            }
                    }else if(element.type == 'calendar'){
                        divElement.innerHTML = `<div class="card shadow mb-4">
                            <div
                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">${titleElement}</h6>
                            </div>
                            <div class="card-body">
                                <div id="${idElement}" ></div>
                            </div>
                        </div>`;
                    }else if(element.type == 'modal'){
                        //----Button
                        let buttonSucces = '';
                        if(optionButtonModal){
                            buttonSucces = `<button class="btn btn-success ml-2" id="button-succes-${idElement}">
                                Guardar
                            </button>`
                        }
                        //----Elements
                        let htmlFormElements = ``
                        if (formElements.length > 0) {
                            formElements.forEach((itemElement, index) => {
                                htmlFormElements += drawModalBody(itemElement);
                            });
                        }
                        divElement.innerHTML = `<div class="modal fade" id="${idElement}" tabindex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">${titleElement}</h5>
                                    </div>
                                    <div class="modal-body">
                                        ${htmlFormElements}
                                    </div>
                                    <div class="modal-footer">
                                        ${buttonSucces}
                                        <button type="button" class="btn ml-2 btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    }else if(element.type == 'separator'){
                        divElement.innerHTML = `<div class="col-12 mt-2 mb-2 p-2  ">
                            <h3 class="border-bottom pb-2">${titleElement}</h3>
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
function drawChartElement(canvasId, type, datasets, dataconfig, datalabels = true) {
    if (document.getElementById(canvasId)){
        var ctx = document.getElementById(canvasId).getContext('2d');
        if (chartInstances[canvasId]) {
            chartInstances[canvasId].destroy();
        }
        let config = {
            type: type, 
            data: datasets, 
            options: dataconfig
        }
        if(datalabels){
            config['plugins'] = [ChartDataLabels];
        }
        datasets = setColorsDatasets(datasets, type)
        chartInstances[canvasId] = new Chart(ctx, config);
    }
}

//-Funciona para agregar diferentes paletas de color
function setColorsDatasets(data = null, type = null){
    if(data != null){
        if(data.datasets.length == 1){
            let array_colors = data.labels.length > 0 ? getPAlleteColors(6, data.labels.length) : getPAlleteColors(6, 5);
            if(type == 'line'){
                data.datasets[0].borderColor = array_colors;
                data.datasets[0].backgroundColor = array_colors;
                data.datasets[0].fill = false;
            }else{
                data.datasets[0].backgroundColor = array_colors;
                data.datasets[0].borderColor = array_colors;
            }

        }else if(data.datasets.length > 1){
            let array_colors = data.labels.length > 0 ? getPAlleteColors(6,  data.datasets.length) : getPAlleteColors(6, 5);
            data.datasets.forEach((item, index) => {
                if(type == 'line'){
                    item.backgroundColor = array_colors[index];
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
    const element = document.getElementById(`text-${cardId}`);
    if (element) {
        if(scroll != null){
            document.getElementById(`text-${cardId}`).textContent = `${value}%`;
            document.getElementById(`progress-${cardId}`).style.width = value;
        }else{
            document.getElementById(`text-${cardId}`).textContent = value;
        }
    } else {
        console.error('Element not found!',`text-${cardId}`);
    }
}

//-Función para pintar table
function drawTableElement(tableId, tableData, tableColums, nameDownload = null, tableConfig = null, desingPDF = null ){
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
    let nameFileXlsx = 'data.xlsx';
    let nameFileCsv = 'data.csv';
    let nameSheet = 'data';
    if(nameDownload != null){
        nameFileXlsx = `${nameDownload}.xlsx`;
        nameFileCsv = `${nameDownload}.csv`;
        nameSheet = `${nameDownload}`;
    }
    //----Table Options XLS
    let table = new Tabulator(`#${tableId}`, configDefault);
    if (document.getElementById(`download-xls-${tableId}`)){
        document.getElementById(`download-xls-${tableId}`).replaceWith(document.getElementById(`download-xls-${tableId}`).cloneNode(true));
        document.getElementById(`download-xls-${tableId}`).addEventListener("click", function (){
            table.download("xlsx", nameFileXlsx , {sheetName:nameSheet});
        });
    }

    //----Table Options CSV
    if (document.getElementById(`download-csv-${tableId}`)){
        document.getElementById(`download-csv-${tableId}`).replaceWith(document.getElementById(`download-csv-${tableId}`).cloneNode(true));
        document.getElementById(`download-csv-${tableId}`).addEventListener("click", function (){
            table.download("csv", nameFileCsv);
        });
    }

    //----Table Options PDF
    if (document.getElementById(`download-pdf-${tableId}`)){
        document.getElementById(`download-pdf-${tableId}`).replaceWith(document.getElementById(`download-pdf-${tableId}`).cloneNode(true));
        document.getElementById(`download-pdf-${tableId}`).addEventListener("click", function (){
            table.download("pdf", "data.pdf", desingPDF);
        });
    }

    //----Table Options EXPANDED
    let isExpanded = false;

    if (document.getElementById(`button-expand-all-${tableId}`)) {
        document.getElementById(`button-expand-all-${tableId}`).addEventListener("click", function () {
            table.getRows().forEach(row => {
                if (row.getTreeChildren().length > 0) {
                    if (isExpanded) {
                        row.treeCollapse();
                    } else {
                        row.treeExpand();
                    }
                }
            });
            isExpanded = !isExpanded;
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

//----Funciona para escoger la URL de petición
function getUrlRequest(type) {
    //-----HOST
    const params = new URLSearchParams(window.location.search);
    const env = params.get("env");
    if(env == 'preprod'){
        URL = "https://preprod.linkaform.com/";
    }
    //-----ENDPOINT
    if(type == 'script'){
        return `${URL}/api/infosync/scripts/run/`
    }else if(type == 'login'){
        return `${URL}/api/infosync/user_admin/login/`
    }else if(type == 'uploadPicture'){
        return `${URL}/api/infosync/cloud_upload/`
    }
    return ''
}

//------Funciona para saber cual era la anterior tab y redirigir
function redirection_before_tab() {
    // Obtener la URL de la pestaña anterior
    const previousTab = document.referrer;
    if (previousTab) {
        let urlRedirection = previousTab;
        window.location.href = urlRedirection;
    } 
}

//-----Funciona para ocultar loading
function hide_loading() {
    const loading = document.getElementById('loading');
    const mainContent = document.getElementById('wrapper');
    loading.style.visibility = 'hidden';
    mainContent.classList.remove('hidden'); 
}


function hideLoadingComponent() {
    const loading = document.getElementById('content-div-loadingComponent');
    loading.style.visibility = 'hidden';
}

//-----Funciona para mostrar loading
function showLoadingComponent() {
    const loading = document.getElementById('content-div-loadingComponent');
    const empty = document.getElementById('content-div-empty');

    /*
    const divElements = document.querySelectorAll('.div-content-element');
    divElements.forEach(div => {
        div.style.visibility = 'hidden';
    });
    */
    loading.style.visibility = 'visible';
    empty.style.display = 'none';
}

//-----Funciona para mostrar todos los elementos (graficas, tablas, cards) bajo la estructura del template
function showElements() {
    const divEmpty = document.querySelectorAll('.div-content-empty');
    const divElements = document.querySelectorAll('.div-content-element');
    divElements.forEach(div => {
      div.style.visibility = 'visible';
    });
    divEmpty.forEach(div => {
      div.style.display = 'none';
    });
}

//-----Prototipo de KANVAAS
function drawKanva(data) {
    data.forEach((element) => {
        if (element.key) {
            let targetDiv = document.getElementById(element.key);

            if (targetDiv) {
                let divCustom = `
                    <div 
                        class="card mb-3 draggable" 
                        draggable="true" 
                        ondragstart="dragCard(event)" 
                        id="card-${element.key}"
                    >
                        <div class="card-body">
                            <h6 class="card-title">${element.title}</h6>
                            <p 
                                class="badge"
                                style="background-color: ${element.color ? element.color : '#28a745'};"
                            >
                                ${element.type}
                            </p>
                            <p class="card-text">${element.name}</p>
                            <small>${element.date}</small>
                        </div>
                    </div>
                `;
                targetDiv.innerHTML += divCustom;
            }
        }
    });
}

function dragCard(event) {
    // Guardar el ID del elemento que se está arrastrando
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    // Permitir el drop solo en zonas válidas
    console.log('Es valido?',event.target.classList.contains("dropzone"))
    if (event.target.classList.contains("dropzone")) {
        event.preventDefault();
    }
}

function dropCard(event) {
    // Prevenir el comportamiento predeterminado
    event.preventDefault();

    // Verificar que el objetivo es una zona de drop válida
    console.log('Es valido?',event.target.classList.contains("dropzone"))
    if (event.target.classList.contains("dropzone")) {
        // Obtener el ID del elemento arrastrado
        const cardId = event.dataTransfer.getData("text");
        const draggedElement = document.getElementById(cardId);

        // Añadir el elemento arrastrado al contenedor destino
        event.target.appendChild(draggedElement);
    }
}

//-----Funcion para Calendario
function drawCalendar(id, data, config = null){
    //----Config Default
    let configDefault = {
        locale : 'es',
        selectable : false,
        aspectRatio: 2,
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        initialView: window.innerWidth < 768 ? 'dayGridMonth' : 'dayGridMonth', 
        height: window.innerWidth < 768 ? 800 : 1200,
        headerToolbar: {
            left: 'prev,next', 
            center: 'title',
            right: 'today',
        },
        windowResize: function (view) {
            const newView = window.innerWidth < 768 ? 'dayGridMonth' : 'dayGridMonth';
            calendar.changeView(newView);
        },
    }
    if(config){ configDefault = config;}
    
    //----Data Events
    configDefault['events'] = data ? data : [];

    //----Start Calendar
    const calendarDiv = document.getElementById(id);
    const calendar = new FullCalendar.Calendar(calendarDiv, configDefault);
    calendar.render();
}

//-----Función para crear Modal BOdy
function drawModalBody(itemElement){
    //---Props
    const type = itemElement.type ? itemElement.type : '';
    const title = itemElement.title ? itemElement.title : '';
    const id = itemElement.id ? itemElement.id : '';
    const checked = itemElement.checked ? itemElement.checked : '';
    const name = itemElement.name ? itemElement.name : '';

    //---Elements
    if (type == 'p') {
        return  `<p><strong>${title}</strong> <span id="${id}"></span></p>`
    }else if(type == 'switch'){
        const element = `<div class="form-check form-switch">
            <input class="form-check-input switch ${name}" type="checkbox" name="${name}" id="${id}" ${checked}>
            <label class="form-check-label">${title}</label>
        </div>`;
        return element;
    }
    return '';
}