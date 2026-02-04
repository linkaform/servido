//-----URL LOGIN
// let URL = "https://preprod.linkaform.com";
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
    const btnExecution = document.getElementById("buttonExecution");
    if (btnExecution) btnExecution.style.display = 'none';

    const btnClose = document.getElementById("buttonClose");
    if (btnClose) btnClose.style.display = 'none';

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
    const btnClose = document.getElementById("buttonClose");
    if (btnClose) btnClose.style.display = 'none';
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
function createElements(dataConfig = []) {
    if (!Array.isArray(dataConfig) || dataConfig.length === 0) return;

    const container = document.getElementById('content-list');

    dataConfig.forEach(item => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row', 'div-content-element', 'ml-1', 'mr-1');
        if (item.class) rowDiv.classList.add(item.class);

        (item._children || []).forEach(el => {
            const {
                title = '', type = '', color = 'primary', hexadecimal = null, col = 3,
                progress = false, badge = false, listProgress = [], id = Math.random()*1000|0,
                fileURL = '', columsKanva = [], formElements = [], filterCustom = false,
                buttonLeftArrow = false, optionButtonModal = false, chartChange = false,
                buttonCustom = false, language = 'es', cardIcon = '<i class="fas fa-clipboard-list fa-2x text-gray-300"></i>',
                modalSize = '', optionPDF = false, optionExpanded = false, optionsTabs = [], elementsTabs = []
            } = el;

            const divElement = document.createElement('div');
            divElement.className = `col-xl-${col} col-lg-${col} col-md-12 col-sm-12 col-xs-12 mb-4`;

            const colorElement = hexadecimal ? '' : `border-left-${color}`;
            const colorHexadecimal = hexadecimal ? `style="border-left-color: ${hexadecimal} !important; border-left-width: 5.3333px !important;"` : '';
            const colorBg = `bg-${color}`;
            const colorBgHexadecimal = hexadecimal ? `style="background: ${hexadecimal} !important;"` : '';

            switch (type) {
                case 'card': divElement.innerHTML = buildCardHTML({ titleElement: title, colorElement, colorHexadecimal, colorBg, colorBgHexadecimal, idElement: id, progressElement: progress, cardIcon }); break;
                case 'chart': divElement.innerHTML = buildChartHTML({ titleElement: title, idElement: id, filterCustom, chartChange, buttonLeftArrow }); break;
                case 'table': divElement.innerHTML = buildTableHTML({ titleElement: title, idElement: id, optionPDF, optionExpanded, buttonCustom }); break;
                case 'progressbar': divElement.innerHTML = buildProgressbarHTML({ titleElement: title, listProgress }); break;
                case 'kanva': divElement.innerHTML = buildKanvaHTML({ columsKanva }); break;
                case 'calendar': divElement.innerHTML = buildCalendarHTML({ titleElement: title, idElement: id }); break;
                case 'modal': divElement.innerHTML = buildModalHTML({ titleElement: title, idElement: id, formElements, optionButtonModal, language, modalSize }); break;
                case 'separator': divElement.innerHTML = buildSeparatorHTML({ titleElement: title }); break;
                case 'carrousel-img': divElement.innerHTML = buildCarrouselHTML({ titleElement: title, idElement: id }); break;
                case 'map': divElement.innerHTML = buildMapHTML({ titleElement: title, idElement: id }); break;
                case 'card-custom-image': divElement.innerHTML = buildCardImageHTML({ titleElement: title, colorElement, colorHexadecimal, fileURL, idElement: id }); break;
                case 'card-table': divElement.innerHTML = buildCardTableHTML({ titleElement: title, idElement: id, badge }); break;
                case 'tabs': divElement.innerHTML = buildTabsHTML({ idElement: id, optionsTabs, elementsTabs }); break;
                default: break;
            }
            rowDiv.appendChild(divElement);
        });

        container.appendChild(rowDiv);
    });
}


// ---------- Helpers HTML por tipo ----------
// Tarjeta simple con progress opcional
function buildCardHTML({ titleElement, colorElement, colorHexadecimal, colorBg, colorBgHexadecimal, idElement, progressElement, cardIcon }) {
    const progressDiv = progressElement ? `
        <div class="col">
            <div class="progress progress-sm mr-2">
                <div class="progress-bar ${colorBg}" ${colorBgHexadecimal} role="progressbar"
                    style="width: 70%" aria-valuenow="50" aria-valuemin="0"
                    aria-valuemax="100" id="progress-${idElement}"></div>
            </div>
        </div>` : '';

    return `
        <div class="card ${colorElement} shadow h-100 py-2 mb-4" ${colorHexadecimal}>
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
                        ${cardIcon}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Chart con botones opcionales
function buildChartHTML({ titleElement, idElement, filterCustom, chartChange, buttonLeftArrow }) {
    const btnModal = filterCustom ? `<button class="btn btn-sm btn-secondary mr-2" id="modal-filter-${idElement}">
        <i class="fa-solid fa-filter"></i></button>` : '';

    const btnChange = chartChange ? `<button class="btn btn-sm btn-warning mr-2" id="modal-change-${idElement}">
        <i class="fa-solid fa-chart-simple"></i></button>` : '';

    const btnLeft = buttonLeftArrow ? `<button class="btn btn-sm btn-primary mr-2" id="button-left-${idElement}">
        <i class="fa-solid fa-arrow-left"></i></button>` : '';

    return `
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">${titleElement}</h6>
                <div class="d-flex justify-content-end">
                    ${btnModal}
                    ${btnChange}
                    ${btnLeft}
                    <button class="btn btn-sm btn-primary me-2" onclick="get_chartDownload('${idElement}','chart_screenIV');return false;">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div style="height: 400px; overflow: hidden;">
                    <canvas id="${idElement}" height="400"></canvas>
                </div>
            </div>
        </div>
    `;
}

// Tabla con botones opcionales
function buildTableHTML({ titleElement, idElement, optionPDF, optionExpanded, buttonCustom }) {
    const btnPDF = optionPDF ? `<button class="btn btn-sm btn-danger ml-2" id="download-pdf-${idElement}">
        <i class="fa-solid fa-file-pdf"></i></button>` : '';
    const btnExpand = optionExpanded ? `<button class="btn btn-sm btn-primary mr-2" id="button-expand-all-${idElement}">
        <i class="fa-solid fa-expand"></i></button>` : '';
    const btnCustom = buttonCustom ? `<button class="btn btn-sm btn-primary mr-2" id="button-custom-${idElement}">
        <i class="fa-solid fa-bars"></i></button>` : '';

    return `
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">${titleElement}</h6>
                <div class="d-flex justify-content-end">
                    ${btnCustom}
                    ${btnExpand}
                    <button class="btn btn-sm btn-success me-2" id="download-xls-${idElement}">
                        <i class="fas fa-file-excel"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" id="download-csv-${idElement}">
                        <i class="fas fa-file-csv"></i>
                    </button>
                    ${btnPDF}
                </div>
            </div>
            <div class="card-body"><div id="${idElement}"></div></div>
        </div>
    `;
}

// ProgressBar con lista dinámica
function buildProgressbarHTML({ titleElement, listProgress }) {
    const bars = listProgress.map(p => `
        <h4 class="small font-weight-bold">${p.titleProgresBar ?? ''} 
            <span class="float-right" id="text-progress-${p.id ?? Math.random()*1000|0}">${p.col ?? 0} %</span>
        </h4>
        <div class="progress mb-4">
            <div class="progress-bar bg-${p.color ?? 'primary'}" role="progressbar" style="width: ${p.col ?? 0}%"></div>
        </div>
    `).join('');

    return `
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">${titleElement}</h6>
            </div>
            <div class="card-body">${bars}</div>
        </div>
    `;
}

// Kanva layout
function buildKanvaHTML({ columsKanva }) {
    const columns = columsKanva.map(c => `
        <div class="${c.grid ?? 'col-lg-2 col-md-4 col-sm-6'} column dropzone" ondragover="allowDrop(event)" ondrop="dropCard(event)">
            <h5>${c.title ?? ''}</h5>
            <div id="${c.id ?? ''}"></div>
        </div>
    `).join('');

    return `<div class="row full-height">${columns}</div>`;
}

// Calendar
function buildCalendarHTML({ titleElement, idElement }) {
    return `
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">${titleElement}</h6>
            </div>
            <div class="card-body">
                <div id="${idElement}"></div>
            </div>
        </div>
    `;
}

// Modal
function buildModalHTML({ titleElement, idElement, formElements, optionButtonModal, language, modalSize }) {
    const textClose = language === 'es' ? 'Cerrar' : 'Close';
    const textSave = language === 'es' ? 'Guardar' : 'Save';

    const btnSuccess = optionButtonModal ? `<button class="btn btn-success ml-2" id="button-succes-${idElement}">
        ${textSave}</button>` : '';

    const modalSizeClass = modalSize === 'lg' ? 'modal-lg' : modalSize === 'xl' ? 'modal-xl' : modalSize === 'sm' ? 'modal-sm' : '';

    const bodyHTML = formElements.map(drawModalBody).join('');

    return `
        <div class="modal fade" id="${idElement}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog ${modalSizeClass}">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${titleElement}</h5>
                    </div>
                    <div class="modal-body">${bodyHTML}</div>
                    <div class="modal-footer">
                        ${btnSuccess}
                        <button type="button" class="btn ml-2 btn-secondary" data-bs-dismiss="modal">${textClose}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Separador visual
function buildSeparatorHTML({ titleElement }) {
    return `
        <div class="col-12 mt-2 mb-2 p-2">
            <h3 class="border-bottom pb-2">${titleElement}</h3>
        </div>
    `;
}

// Carrousel de imágenes
function buildCarrouselHTML({ titleElement, idElement }) {
    return `
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">${titleElement}</h6>
            </div>
            <div class="card-body">
                <div id="carousel-${idElement}" class="row overflow-auto custom-carousel"></div>
            </div>
        </div>
    `;
}

// Mapa
function buildMapHTML({ titleElement, idElement }) {
    return `
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">${titleElement}</h6>
            </div>
            <div class="card-body">
                <div id="${idElement}" style="height: 600px;width:100%;"></div>
            </div>
        </div>
    `;
}

// Card personalizada con imagen
function buildCardImageHTML({ titleElement, colorElement, colorHexadecimal, fileURL, idElement }) {
    return `
        <div class="card ${colorElement} shadow h-100 py-2" ${colorHexadecimal}>
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="h5 font-weight-bold text-${colorElement} text-uppercase mb-1">
                            <div class="col-auto">${titleElement}</div>
                        </div>
                    </div>
                </div>
                <div class="row no-gutters align-items-center justify-content-center mt-3">
                    <img src="${fileURL}" alt="Imagen circular" id="image-${idElement}">
                </div>
                <div class="mt-3">
                    <div class="col-12 mb-2">
                        <div class="d-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded p-2">
                            <i class="fas fa-store me-2"></i>
                            <span class="h6 mb-0 font-weight-bold text-success" id="textA-${idElement}">1041</span>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-flex align-items-center justify-content-center bg-warning bg-opacity-10 text-warning rounded p-2">
                            <i class="fas fa-clock me-2"></i>
                            <span class="h6 mb-0 font-weight-bold" style="color: #B58A09;" id="textB-${idElement}">439</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Card Table
function buildCardTableHTML({ titleElement, idElement, badge }) {
    const badgeItem = badge ? `<p class="total-badge" id="text-badge-${idElement}"></p>` : '';
    return `
        <div id="${idElement}" class="custom-card-container shadow">
            <div class="list-card">
                <div class="list-card-header">
                    <h5 class="list-card-title text-primary">${titleElement}</h5>
                    ${badgeItem}
                </div>
                <div class="list-card-body" id="div-card-table-body-${idElement}"></div>
            </div>
        </div>
    `;
}

function buildTabsHTML({ idElement, optionsTabs = [], elementsTabs = [] }) {
    // Generar las opciones de la pestaña
    const listOptions = optionsTabs.map((tab, index) => `
        <li class="nav-item">
            <button class="nav-link ${index === 0 ? 'active' : ''}" 
                    id="${tab.id}-tab" 
                    data-bs-toggle="pill" 
                    data-bs-target="#${tab.id}" 
                    type="button">
                ${tab.name}
            </button>
        </li>
    `).join('');


    // Generar los contenidos de las pestañas usando la función auxiliar
    const divOptions = optionsTabs.map((tab, index) => `
        <div class="tab-pane fade ${index === 0 ? 'show active' : ''}" id="${tab.id}">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                ${renderElementsForTab(tab.id, elementsTabs)}
            </div>
        </div>
    `).join('');

    return `
        <div class="card shadow mb-4">
            <div class="card-body">
                <ul class="nav nav-pills mb-3" id="${idElement}-pills-tab">${listOptions}</ul>
                <div class="tab-content" id="${idElement}-pills-tabContent">${divOptions}</div>
            </div>
        </div>
    `;
}


function renderElementsForTab(tabId, elementsTabs = []) {
    // Filtrar los elementos que pertenecen a esta pestaña
    const elementsInTab = elementsTabs.filter(el => el.tabId === tabId);
    // Renderizar cada elemento según su type
    return elementsInTab.map(el => {
        const {
            title = '', type = '', color = 'primary', hexadecimal = null, col = 3,
            progress = false, badge = false, listProgress = [], id = Math.random() * 1000 | 0,
            fileURL = '', columsKanva = [], formElements = [], filterCustom = false,
            buttonLeftArrow = false, optionButtonModal = false, chartChange = false,
            buttonCustom = false, language = 'es', cardIcon = '<i class="fas fa-clipboard-list fa-2x text-gray-300"></i>',
            modalSize = '', optionPDF = false, optionExpanded = false, optionsTabs = [], elementsTabs: nestedElements = []
        } = el;

        const colorElement = hexadecimal ? '' : `border-left-${color}`;
        const colorHexadecimal = hexadecimal ? `style="border-left-color: ${hexadecimal} !important; border-left-width: 5.3333px !important;"` : '';
        const colorBg = `bg-${color}`;
        const colorBgHexadecimal = hexadecimal ? `style="background: ${hexadecimal} !important;"` : '';

        switch (type) {
            case 'card': return buildCardHTML({ titleElement: title, colorElement, colorHexadecimal, colorBg, colorBgHexadecimal, idElement: id, progressElement: progress, cardIcon });
            case 'chart': return buildChartHTML({ titleElement: title, idElement: id, filterCustom, chartChange, buttonLeftArrow });
            case 'table': return buildTableHTML({ titleElement: title, idElement: id, optionPDF, optionExpanded, buttonCustom });
            case 'progressbar': return buildProgressbarHTML({ titleElement: title, listProgress });
            case 'calendar': return buildCalendarHTML({ titleElement: title, idElement: id });
            case 'separator': return buildSeparatorHTML({ titleElement: title });
            case 'carrousel-img': return buildCarrouselHTML({ titleElement: title, idElement: id });
            case 'map': return buildMapHTML({ titleElement: title, idElement: id });
            case 'card-custom-image': return buildCardImageHTML({ titleElement: title, colorElement, colorHexadecimal, fileURL, idElement: id });
            case 'card-table': return buildCardTableHTML({ titleElement: title, idElement: id, badge });
            default: return '';
        }
    }).join('');
}


///------HELPERS Para pintar datos
//-Funciona para pintar graficas de manera generica
let chartInstances = {};
function drawChartElement(canvasId, type, datasets, dataconfig, datalabels = true, flagColors = false) {
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
        if(!flagColors){
            datasets = setColorsDatasets(datasets, type);
        }
        chartInstances[canvasId] = new Chart(ctx, config);
    }
}

//-Funciona para pintar las imagenes dentro de un Carrousel
function drawCarrouselImgs(divId, listImg) {
    const container = document.getElementById(`carousel-${divId}`);
    if (!container) return;
    // Limpia el contenido anterior
    container.innerHTML = '';

    listImg.forEach(imgObj => {
        const fileUrl = imgObj?.file_url;
        if (fileUrl) {
            const col = document.createElement('div');
            col.className = 'col-xl-2 col-lg-2 col-sm-12 mb-3';

            const img = document.createElement('img');
            img.src = fileUrl;
            img.alt = '';
            img.className = 'img-fluid';
            img.style.width = '360px';
            img.style.height = '360px';
            img.style.objectFit = 'cover';

            col.appendChild(img);
            container.appendChild(col);
        }
    });
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

//-Funciona para llenar datos de una card custom con imagen
function drawCardImageElement(cardId, valueA, valueB) {
    const elementA = document.getElementById(`textA-${cardId}`);
    if (elementA) {
        document.getElementById(`textA-${cardId}`).textContent = `${valueA}`;
    } else {
        console.error('Element not found!',`text-${cardId}`);
    }

    const elementB = document.getElementById(`textB-${cardId}`);
    if (elementB) {
        document.getElementById(`textB-${cardId}`).textContent = `${valueB}`;
    } else {
        console.error('Element not found!',`text-${cardId}`);
    }
}

//-Funciona para crear un mapa chart en reporte
function drawMapElement(elementId , title , data, configs = null, toltip = null) {
    const element = document.getElementById(`${elementId}`);
    if (element) {

        let configMap = {
            name: 'Información',
            states: {
                hover: {
                    color: '#416CA6'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
        if(configs){
            configMap = configs;
        }

        if (data && Array.isArray(data) && data.length > 0) {
            configMap.data = data;
        }


        (async () => {
            const topology = await fetch('https://code.highcharts.com/mapdata/countries/mx/mx-all.topo.json').then(response => response.json());
            Highcharts.mapChart(`${elementId}`, {
                chart: {
                    map: topology
                },

                title: {
                    text: `${title}`
                },

                subtitle: {
                    text: 'Source map: <a href="https://code.highcharts.com/mapdata/countries/mx/mx-all.topo.json">Mexico</a>'
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },
                tooltip: toltip,
                colorAxis: {
                    min: 0,
                    max: 100,
                    stops: [
                        [0, '#8C8C8C'],   
                        [1, '#0099F9']  
                    ],
                },

                series: [configMap]
            });
        })();
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

//- Función para crear una table Card
function drawCardTable(cardId, listDic = [], valueBadge){
    // Si listDic no es un array, lo forzamos a []
    if (!Array.isArray(listDic)) {
        listDic = [];
    }

    // Contenedor del body
    const bodyDiv = document.getElementById(`div-card-table-body-${cardId}`);
    if(!bodyDiv) return;

    // Limpiar contenido previo
    bodyDiv.innerHTML = '';

    // Actualizar badge si existe
    const badgeEl = document.getElementById(`text-badge-${cardId}`);
    if(badgeEl && valueBadge !== undefined){
        badgeEl.textContent = valueBadge;
    }

    // Obtener paleta de colores según tamaño de la lista
    let listColors = [];
    if(listDic.length > 0){
        listColors = getPAlleteColors(6, listDic.length);
    }

    // Iterar sobre la lista de items
    listDic.forEach((item, index) => {
        const color = listColors[index] || '#999999';

        const listItem = document.createElement('div');
        listItem.className = 'list-item';

        listItem.innerHTML = `
            <div class="list-item-content">
                <div class="list-item-indicator" style="background-color: ${color};"></div>
                <div class="list-item-text">
                    <span class="item-type">${item.title ?? ''}</span>
                </div>
                <div class="item-quantity" style="color: ${color};">
                    ${item.value ?? 0}
                </div>
            </div>
        `;

        bodyDiv.appendChild(listItem);
    });
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
        URL = "https://preprod.linkaform.com";
    }else if(env == 'local'){
        URL = "http://192.168.0.25:8000";
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

    const divElements = document.querySelectorAll('.div-content-element');
    divElements.forEach(div => {
        div.style.visibility = 'hidden';
    });
    
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
            calendarInstance.changeView(newView);
        },
    }

    if(config){
        configDefault = config;
    }

    //----Data Events
    configDefault['events'] = data ? data : [];

    //----Start Calendar
    const calendarDiv = document.getElementById(id);
    calendarInstance = new FullCalendar.Calendar(calendarDiv, configDefault);
    calendarInstance.render();
}

//-----Función para crear Modal BOdy
function drawModalBody(itemElement){
    //---Props
    const type = itemElement.type ? itemElement.type : '';
    const title = itemElement.title ? itemElement.title : '';
    const id = itemElement.id ? itemElement.id : '';
    const name = itemElement.name ? itemElement.name : '';
    const classInput = itemElement.classInput ? itemElement.classInput : '';
    const hideComponent = itemElement.hideComponent ? itemElement.hideComponent : false;

    //---Elements
    if (type == 'p') {
        return  `<p id="p-${id}" class="p-text-modal"><strong>${title}</strong> <span id="${id}"></span></p>`
    }else if(type == 'switch'){
        const checked = itemElement.checked ? itemElement.checked : '';
        const element = `<div class="form-check form-switch" ${hideComponent ? 'style="display:none;"' : ''}>
            <input class="form-check-input switch ${name}" type="checkbox" name="${name}" id="${id}" ${checked}>
            <label class="form-check-label">${title}</label>
        </div>`;
        return element;
    }else if(type == 'div'){
        const element = `<div class="col-12 ">
            <p><strong>${title}</strong></p>
            <div id="${id}" class="${classInput}"></div>
        </div>`;
        return element;
    }else if(type == 'input-select'){
        const element = `<div class="mb-3" ${hideComponent ? 'style="display:none;"' : ''}>
            <label class="form-label">${title}</label>
            <select class="form-select ${classInput}" id="${id}">
                <option value="">Seleccione Opción</option>
            </select>
        </div>`;
        return element;
    }else if(type == 'input-text'){
        const element = `<div class="mb-3" ${hideComponent ? 'style="display:none;"' : ''}>
            <label class="form-label">${title}</label>
            <input type="text" class="form-control ${classInput}" id="${id}">
        </div>`;
        return element;
    }else if(type == 'input-number'){
        const element = `<div class="mb-3" ${hideComponent ? 'style="display:none;"' : ''}>
            <label class="form-label ">${title}</label>
            <input type="number" class="form-control ${classInput}" id="${id}">
        </div>`;
        return element;
    }else if(type == 'input-switch'){
        const options = itemElement.switchs ? itemElement.switchs : ["Sí", "No"];  
        const element = `<div class="mb-3"  ${hideComponent ? 'style="display:none;"' : ''}>
            <label class="form-label">${title}</label>
            ${options.map((opt, index) => `
                <div class="form-check">
                    <input 
                        class="form-check-input ${classInput}" 
                        type="radio"  
                        id="${id}_option_${index}"  
                        name="${name}" 
                        value="${opt}">
                    <label class="form-check-label" for="${name}_option_${index}">${opt}</label>
                </div>
            `).join('')}
        </div>`;
        return element;
    }else if(type == 'input-textArea'){
        const element = `<div class="form-floating" ${hideComponent ? 'style="display:none;"' : ''}>
            <textarea class="form-control ${classInput}" placeholder="${title}" id="${id}" style="height: 100px"></textarea>
            <label for="floatingTextarea2">${title}</label>
        </div>`;
        return element;
    }else if (type === 'input-datetime') {
        const element = `<div class="form-floating mb-2" ${hideComponent ? 'style="display:none;"' : ''}>
            <input
                type="datetime-local"
                class="form-control ${classInput}"
                id="${id}"
                placeholder="${title}"
            >
            <label for="${id}">${title}</label>
        </div>`;
        return element;
    }else if (type === 'input-link-text') {
        const element = `
            <div class="mb-2" id="container-${id}" ${hideComponent ? 'style="display:none;"' : ''}>
                <span id="text-${id}" class="me-1">${title}</span>
                <a
                    href="#"
                    id="${id}"
                    target="_blank"
                    class="link-primary"
                >
                    Ver enlace
                </a>
            </div>
        `;
        return element;
    }
    return '';
}
