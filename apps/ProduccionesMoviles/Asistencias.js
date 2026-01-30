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

function loadDemoData(){
    drawTableElement('tableFirst', dataTable1, columsTable1Test);
    drawTableElement('tableSecond', dataTable2, columsTable2);
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
    const dicAditional = {'option':'report'}

    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReport(scriptId, dicAditional);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
        //----ELEMENTS
        if(data.table_first){
            drawTableElement('tableFirstA', data.table_first, columsTable1A);
        }
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}


function getDayName(dateStr) {
  const days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  const [y,m,d] = dateStr.split("-");
  return days[new Date(y, m-1, d).getDay()];
}

function statusFormatter(cell) {
  const value = cell.getValue();
  const status = STATUS_MAP[value];

  if (!status) return value;

  cell.getElement().style.backgroundColor = status.color;
  if (status.textColor) {
    cell.getElement().style.color = status.textColor;
  }
  cell.getElement().style.textAlign = "center";
  cell.getElement().style.fontWeight = "bold";

  return value;
}
