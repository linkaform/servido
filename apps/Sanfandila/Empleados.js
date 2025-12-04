
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
    drawTableElement('tableFirstA', dataTable1A, columsTable1A);
    drawTableElement('tableFirstB', dataTable1B, columsTable1B);
    drawTableElement('tableFirstC', dataTable1C, columsTable1C);

    paintModalInformation(dataModalInformationExample);
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

//-----SET REQUEST
async function getInformation(){
    showLoadingComponent();
    const scriptId = getParameterURL('script_id');
    const demo = getParameterURL('demo');
    const statusSession = getSession();
    const dicAditional = {'option':'get_records'}

    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReport(scriptId, dicAditional);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
        //----ELEMENTS
        if(data.elementFirst){
            drawTableElement('tableFirst', data.elementFirst, columsTable1);
        }

        if(data.elementSecond){
            drawChartElement('chartFirst','bar', data.elementSecond,setOptions1, undefined, true);
        }

        if(data.elementThird){
            drawChartElement('chartSecond','pie', data.elementThird, setOptions2, undefined, true);
        }

        if(data.elementFourth){
            drawChartElement('chartThird','pie', data.elementFourth, setOptions3, undefined, true);
        }
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}

function paintModalInformation(dataArray) {
    const div = document.getElementById('divModalList');
    if (!div) return;

    // Limpiar contenido previo
    div.innerHTML = '';

    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        div.innerHTML = '<div class="alert alert-warning">No hay información disponible.</div>';
        return;
    }

    dataArray.forEach(item => {

        // Crear contenedor
        const block = document.createElement('div');
        block.className = 'border rounded p-3 mb-3 shadow-sm';

        // Movimiento
        const mov = document.createElement('p');
        mov.className = 'fw-bold';
        mov.innerHTML = `Movimiento: <span class="fw-normal">${item.movement || '---'}</span>`;

        // Fecha
        const date = document.createElement('p');
        date.innerHTML = `Fecha: <span class="fw-bold">${item.date || '---'}</span>`;

        // Descripción
        const desc = document.createElement('p');
        desc.innerHTML = `Descripción: <span class="fw-bold">${item.description || '---'}</span>`;

        // Agregar al bloque
        block.appendChild(mov);
        block.appendChild(date);
        block.appendChild(desc);

        // Agregar al div principal
        div.appendChild(block);
    });
}



function modalShow(){
    new bootstrap.Modal(document.getElementById('modalInformation')).show();
}