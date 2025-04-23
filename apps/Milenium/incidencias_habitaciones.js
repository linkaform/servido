
let dataCatalogs = [];

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
    drawCardElement('cardFirst', 20);
    drawCardElement('cardSecond', 30);
    drawCardElement('cardThird', 40);
    drawCardElement('cardFourth', 50);
    drawCardElement('cardFiveth', 50);
    drawCardElement('cardSixth', 50);

    drawTableElement('tableFirst', dataTable1, columsTable1, null, customConfig1);
    drawTableElement('tableSecond', dataTable2, columsTable2, null, customConfig2);
    drawChartElement('chartFirst','bar',dataChart1,setOptions1);
    drawChartElement('chartSecond','doughnut',dataChart2,setOptions2,undefined,true);
    setTimeout(() => { hide_loading();}, 2000);
}

//-----LOAD DATA ACTIVE
function loadData(data) {
  //----Search Catalogs
  //get_catalog();
  
  //----Assing Events
  const buttonExecution = document.getElementById("buttonExecution");
  buttonExecution.addEventListener("click", () => {
    getInformation();
  });
  const selectChange = document.getElementById("mes");
  const selectDateFrom = document.getElementById("filterDateFrom");
  const selectDateTo = document.getElementById("filterDateTo");
  const sDateFrom = document.getElementById("dateFrom");
  const sDateTo = document.getElementById("dateTo");
  selectChange.addEventListener("change", (e) => {
    if(e.target.value === 'custom'){
      selectDateFrom.classList.remove("d-none")
      selectDateTo.classList.remove("d-none")
    }else{
      selectDateFrom.classList.add("d-none")
      selectDateTo.classList.add("d-none")
      sDateFrom.value = ''
      sDateTo.value = ''
    }
  })
  //-----Loading
  setTimeout(() => { hide_loading();}, 2000);
}

//-----SET REQUEST
async function getInformation(){
    showLoadingComponent();
    const scriptId = getParameterURL('script_id');
    const demo = getParameterURL('demo');
    const statusSession = getSession();
    const dicAdional = {
      'option':'report',
    }
    const dicAdicional2 = {
      'option':'cards',
    }
    if(statusSession == 'Demo' || demo){
        Swal.fire({
          title: 'Advertencia',
          html: 'No es posible ejecutar el reporte, pues esta en formato demo.'
        });
    }else if(scriptId != null && statusSession == 'Active' && !demo){
        const responseRequest = await sendRequestReport(scriptId, dicAdional);
        const data = responseRequest.response && responseRequest.response.data ? responseRequest.response.data : {};
        
        //----CARDS
        const cardsData = data.cards_response
        if(cardsData){
          drawCardElement('cardFirst', cardsData.total_inspecciones ? cardsData.total_inspecciones: 0)
          drawCardElement('cardSecond', cardsData.total_proceso ? cardsData.total_proceso: 0)
          drawCardElement('cardThird', cardsData.total_incompleta ? cardsData.total_incompleta : 0)
          drawCardElement('cardFourth', cardsData.total_completada ? cardsData.total_completada : 0)
          drawCardElement('cardFiveth',cardsData.promedio_cumplimiento ? cardsData.promedio_cumplimiento : 0)
          drawCardElement('cardSixth',cardsData.total_nos ? cardsData.total_nos : 0)
        }
        //----TABLE
        const cantidadHabitacionesPiso = data.cantidad_habitaciones || [];
        let columnsTable1 = generarColumnasDinamicas(cantidadHabitacionesPiso);
        if(data.firstTable){
          drawTableElement('tableFirst', data.firstTable, columnsTable1, null, customConfig1);
        }

        if(data.secondTable){
          drawTableElement('tableSecond', data.secondTable, columsTable2, null, customConfig2);
        }

        //----CHART
        if(data.graphic_response){
          drawChartElement('chartFirst','bar',  data.graphic_response, setOptions1);
        }

        if(cardsData.porcentaje_inspeccion){
          const percentage = cardsData.porcentaje_inspeccion;
          let data = {
             datasets: [{
                  data: [percentage, 100 - percentage],
                  backgroundColor: [COLORS(percentage), '#eaeaea'],
                  borderWidth: 0,
                  cutout: '80%',
                  circumference: 180,
                  rotation: 270
              }]
          };
          drawChartElement('chartSecond', 'doughnut', data, setOptions2, undefined, true);
        }

        //----Carrousel
        if(data.firstImgs){
          drawCarrouselImgs('carrouselFirst', data.firstImgs);
        }


        //-----Style
        hideLoadingComponent();
        showElements();
    }
}

function capitalize(number) {
  const suffixes = [
    "First", "Second", "Third", "Fourth"
  ];
  return suffixes[number - 1];
}

function get_catalog(){
  const scriptId = getParameterURL('script_id');
  const JWT = getCookie("userJwt");
  fetch(getUrlRequest('script'), {
      method: 'POST',
      body: JSON.stringify({
          script_id: scriptId,
          option: 'first_filter',
      }),
      headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+JWT
      },
  })
  .then((res) => res.json())
  .then((res) => {
      const data = res.response ? res.response.data.response : [];
      if(data.length > 0){
        set_catalog_select(data, 'hotel', 'hotel');
      }
  })
}

function generarColumnasDinamicas(data) {
  let maxHabitaciones = 0;
  Object.values(data).forEach(habitaciones => {
    if (habitaciones > maxHabitaciones) {
      maxHabitaciones = habitaciones;
    }
  });

  let columnsTable = [
    {
      title: "Habitaciones Inspeccionadas", field: 'habitacionesinspeccionadas', width: 1000, headerSort: false, columns: []
    }
  ];

  for (let i = 1; i <= maxHabitaciones; i++) {
    columnsTable[0].columns.push({
      title: "",
      field: `hab${i}`,
      hozAlign: "center",
      headerSort: false,
      formatter: function (cell) {
          var value = cell.getValue();
          var inspecciones = value?.inspecciones;
          if (value?.status === "offline") {
              cell.getElement().style.backgroundColor = "lightgray";
          } else if (value?.status === "proceso") {
              cell.getElement().style.backgroundColor = "yellow";
          } else if (value?.status === "completada") {
              cell.getElement().style.backgroundColor = "lightgreen";
          }
          if(inspecciones?.length > 0){
            value.numero = value.numero + '(' + (inspecciones.length+1) + ')'
          }
          return value?.numero;
      },
      cellClick: function (e, cell) {
        let cellData = cell.getValue();
        var inspecciones = cellData.inspecciones;
        if (!cellData.id) {
          Swal.fire({
            title: 'Detalle',
            html: 'Esta habitación aún no tiene inspecciones realizadas.'
          });
        }else if(inspecciones?.length > 0){
          var content = "<ul class='list-group'>";
          content += "<li class='list-group-item'>" + `<a href="https://app.linkaform.com/#/records/detail/${cellData.id}" target="_blank"> Inspeccion 1`+ "</a>" + "</li>";
          inspecciones.forEach(function (inspeccion, index) {
            content += "<li class='list-group-item'>" + `<a href="https://app.linkaform.com/#/records/detail/${inspeccion}" target="_blank"> Inspeccion `+ (index+2) + "</a>"  + "</li>";
          });
          content += "</ul>";

          Swal.fire({
            title: 'Inspecciones',
            html: content
          });
        }else{
          window.open(`https://app.linkaform.com/#/records/detail/${cellData.id}`, "_blank");
        }
      }
    });
  }

  return columnsTable;
}



