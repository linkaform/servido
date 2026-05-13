window.onload = function(){
    createElements(dicReportContext);
    setElementsStyleNew();
    const statusSession = getSessionNew();
    if (statusSession === 'Active') {
        loadData();
    } else {
        loadDemoData();
    }
}

function loadDemoData(){
    drawKanva(kanvaData);
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
    const statusSession = getSessionNew();
    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReportNew(scriptId, dicAdional);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
        //-----Style
        hideLoadingComponent();
        showElements();
    }
}

