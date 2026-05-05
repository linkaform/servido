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
        if(data.response_first){
            let columsTable = data.response_first.data_colums ? data.response_first.data_colums : [];
            let dataTable = data.response_first.data_table ? data.response_first.data_table : [];

            columsTable = columsTable.map(col => {
                if (Array.isArray(col.columns)) {
                    col.columns = col.columns.map(subCol => ({
                        ...subCol,
                        formatter: statusFormatter
                    }));
                }
                return col;
            });
            drawTableElement('tableFirst', dataTable, columsTable);
        }
        if(data.response_second){
            drawTableElement('tableSecond', data.response_second, columsTable2);
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

    const el = cell.getElement();

    if (!status) return value;

    el.style.backgroundColor = status.color;
    el.style.textAlign = "center";
    el.style.fontWeight = "bold";

    if (status.textColor) {
        el.style.color = status.textColor;
    }

    if (value === "CM_R" || value === "INC_R" || value === "RCE_R") {
        const shortValue = value.replace("_R", ""); 

        return `
            <span style="display:flex;align-items:center;justify-content:center;gap:6px;">
            ⚠️ ${shortValue}
            </span>
        `;
    }

    return value;
}