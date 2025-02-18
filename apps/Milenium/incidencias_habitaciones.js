let dataCatalogs = [];
const cardKeys = [
  "totalinspecciones",
  "calificacionpromedio",
  "porcentajeinspeccion",
  "totalnos",
];
let customConfig1 = {
  height: "500px",
  layout: "fitData",
  rowFormatter: function(row) {
    row.getElement().style.fontSize = "10px";
    row.getElement().style.height = "20px";
  },
  cellFormatter: function(cell) {
      cell.getElement().style.padding = "1px 1px";
  },
  initialSort: [
    { column: "piso", dir: "desc" }
  ],
}
let customConfig2 = {
  height: "500px",
}

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
    drawTableElement('tableFirst', dataTable1, columsTable1, null, customConfig1);
    drawTableElement('tableSecond', dataTable2, columsTable2, null, customConfig2);
    drawChartElement('chartFirst','bar',dataChart1,setOptions1);
    setTimeout(() => { hide_loading();}, 2000);
}

//-----LOAD DATA ACTIVE
function loadData(data) {
  //----Search Catalogs
  get_catalog();
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
          cardKeys.forEach((key, index) => {
            drawCardElement(`card${capitalize(index + 1)}`, cardsData[key] || 0);
          });
        }

        //----ELEMENTS
        const cantidadHabitacionesPiso = data.cantidad_habitaciones || []
        let columnsTable1 = generarColumnasDinamicas(cantidadHabitacionesPiso);
        if(data.firstTable){
          console.log(data.firstTable)
          drawTableElement('tableFirst', data.firstTable, columnsTable1, null, customConfig1);
        }

        const graphicData = data.graphic_response
        if(graphicData){
            drawChartElement('chartFirst','bar', graphicData, setOptions1);
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
        set_catalog_select(data, 'ubicacion', 'ubicacion');
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
          if (value?.status === "revisada") {
              cell.getElement().style.backgroundColor = "lightgreen";
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