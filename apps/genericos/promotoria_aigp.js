// Reporte Production Forscast
// Librerias: Chart.js

let us = null;
let usTy = null;
let jw = null;
let userId = null;
let userJwt = null;
let userName = null;
let userParentId = null;
let scriptId = null;

$('#divOptions').hide();
$('#title_report').hide();
$('.title_tables').hide();
hideElement("title_demo");
hideElement("firstParameters");
hideElement("firstElement");
hideElement("secondElement");
hideElement("ThirdElement");
hideElement("filter_date")

window.onload = function(){
  var qs = urlParamstoJson();
  var formNode = document.getElementById("appCont");
  for(var key in qs){
    if (key === 'script_id' ){
      console.log('script id', key)
      scriptId = parseInt(qs[key]);
    }
    if (key === 'env') {
      if (qs[key] === 'test'){
         url = "https://preprod.linkaform.com/api/";
      }
    }
    if (key ==='title'){
      $("#title_report").text(qs[key]);
    }
    var elements = getAllElementsWithAttribute(formNode, 'data-infosync-id', key);
    var value = decodeURI(qs[key]);
    if (key === 'infosyncRecordID'){
      var recId = document.getElementById("infosyncRecordID");
      recId.value = value;
    }
    else if(elements.length > 0){
      switch(elements[0].type){
        case 'text':
          elements[0].value = value;
          break;
        case 'textarea':
          elements[0].value = value;
          break;
        case 'select-one':
          elements[0].value = value;
          break;
        case 'radio':
          for(var idx in elements){
            if(elements[idx].value === value){
              elements[idx].checked = true;
            }
          }
          break;
        case 'checkbox':
          var values = value.split(';');
          for(var idx in elements){
            if(values.indexOf(elements[idx].value) !== -1){
              elements[idx].checked = true;
            }
          }
          break;
      }
    }
  }

  us = getCookie("userId");
  jw = getCookie("userJwt");
  userParentId = getCookie("userParentId");
  hideElement("close_sesion");
  //hideElement("firstParameters");
  hideElement("firstParameters");


  if(us != "" && jw != "" || scriptId===null){
    hideElement("inicio_ses");
    unhideElement("close_sesion");
    getCompanyLogo(userParentId);
    userId = us;
    userJwt = jw;
    userName = getCookie("userName");
    document.getElementById("firstParameters").style.removeProperty('display');
    $('#firstParameters').addClass('show'); //---IMPORTANTE: Quitar cuando no se ocupe la librería de JQuery Multiple Select.
    unHideReportElements()
    if (scriptId == null) {
      loadDemoData();
    }
    //--Styles
    setSpinner();
    console.log('-------------script id', scriptId)
    get_catalog(scriptId);
    $('#divOptions').show();
    $('#title_report').show();
    document.getElementById("firstParameters").style.removeProperty('display');
    
  } else {
    unhideElement("inicio_ses");
    $('#divContent').hide();
    $('#divOptions').hide();
    $('#title_report').hide();
    $('.title_tables').hide();
    /* I M P O R T A N T E */
    /*Se tiene que eliminar la clase de show al elemento con clase firstParameters ya que las librerías
    para los multiselectores alteran ligeramente si se muestran o no.*/
    $('#firstParameters').removeClass('show'); //----IMPORTANTE: Quitar cuando no se ocupe la librería de JQuery Multiple Select.
    $("#warehouse").multipleSelect('refresh');
    hideElement("firstElement-Buttons");
  }
  ///-----HIDE AND SHOW
  for(var key in qs){
    if (key === 'embed'){
      if (qs[key]){
        $("#close_sesion").hide();
        $("#image_log").hide();
      }
    }
  }

}

function unHideReportElements(){
  //Set here all report elements that need to be unHiden on a loggin
  unhideElement("firstElement-Buttons");
  unhideElement("firstParameters");
  unhideElement("close_sesion");
  unhideElement("firstElement");
  unhideElement("secondElement");
  hideElement("ThirdElement");

}

function loadDemoData(){
  console.log('dem,o data....')
  unhideElement("title_demo")
  $('.title_tables').show();

  //$("#warehouse").multiselect('refresh');

  getDrawTableTwo('firstElement', columsTable, dataTable);
  document.getElementById("firstElement").style.removeProperty('display');
  
  document.getElementById("firstParameters").style.removeProperty('display');

  drawFirstElement(dataFirstElement)
  document.getElementById("ThirdElement").style.removeProperty('display');
  
}


const loading = document.querySelector('.loading-container');
loading.style.display = 'none';
function runFirstElement(){
  let dateFrom = document.getElementById("dateFrom");
  let dateTo = document.getElementById("dateTo");  
  let dateOptions = document.getElementById("dateOptions");  
  let productCode = document.getElementById("productCode");  
  let lotNumber = document.getElementById("lotNumber");  
  let warehouse = document.getElementById("warehouse"); 
  let selectedWarehouse = [...warehouse.selectedOptions].map(option => option.value);
  getFirstElement(dateFrom.value, dateTo.value, dateOptions.value, productCode.value, lotNumber.value, selectedWarehouse);
};

function getFirstElement(dateFrom, dateTo, dateOptions, productCode, lotNumber, warehouse){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();

  console.log('logNumber', lotNumber)
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_from: dateFrom,
      date_to: dateTo,
      date_options: dateOptions,
      product_code: productCode,
      lot_number: lotNumber,
      warehouse: warehouse,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      //----Hide and show
      $('.load-wrapp').hide();
      $("#divContent").show();
      $('.title_tables').show();
      console.log("RESPUESTA")
      console.log(res.response.json)
      if(res.response.json.secondElement.data){
        //----Se crea y define una variable que almacene la data de la query para no escribir toda la ruta
        let dataTableTwo = res.response.json.secondElement.data;
        console.log('tabel 2')
        getDrawTableTwo('firstElement', columsTable2, dataTableTwo);
        document.getElementById("firstElement").style.removeProperty('display');

        //document.getElementById("secondElement").style.removeProperty('display');
        unhideElement("secondElement");
        document.getElementById("secondElement").style.removeProperty('display');
        
      }
      
    } else {
      hideLoading();
      if(res.code == 11){
        Swal.fire({
          title: 'Error',
          html: res.error
        });
        $('.load-wrapp').hide();
      } else {
        Swal.fire({
          title: 'Error',
          html: res.error
        });
        $('.load-wrapp').hide();
      }
    }
  })
};

//-----TABLES

var subData;
function getDrawTableTwo(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    //columnHeaderVertAlign:"top",
    height:"100%",
    layout:"fitDataTable",
    columnDefaults:{
      resizable:false,
    },
    data:tableData,
    columns:columnsData,

    //Primer anidamiento
    rowFormatter:function(row){
      //Crea y dá estilos a los elementos contenedores
      var holderEl = document.createElement("div")
      var tableEl = document.createElement("div")

      holderEl.style.boxSizing = "border-box";
      holderEl.style.padding = "0px";
      holderEl.style.borderTop = "1px solid #333";
      holderEl.style.borderBotom = "1px solid #333";

      tableEl.style.border = "0px solid #333";

      holderEl.appendChild(tableEl);

      row.getElement().appendChild(holderEl);

      var subTable = new Tabulator(tableEl, {
           height:"100%",
           layout:"fitDataTable",
           headerVisible:false,
           addRowPos: "bottom",
           columnDefaults:{
              resizable:false,
           },
           data:row.getData().serviceHistory,
           columns:columsTableTwo,

           //Segundo anidamiento
           rowFormatter:function(subRow){
            //Crea y da estilos a los elementos contenedores
            var subHolderEl = document.createElement("div")
            var subTableEl = document.createElement("div")

            subHolderEl.style.boxSizing = "border-box";
            subHolderEl.style.padding = "0px";
            subHolderEl.style.borderTop = "1px solid #333";
            subHolderEl.style.borderBotom = "1px solid #333";

            subTableEl.style.border = "0px solid #333";

            subHolderEl.appendChild(subTableEl);

            subRow.getElement().appendChild(subHolderEl);

            var subTable2 = new Tabulator(subTableEl, {
               height:"100%",
               layout:"fitDataTable",
               headerVisible:false,
               addRowPos: "bottom",
               columnDefaults:{
                  resizable:false,
               },
               data: subRow.getData().serviceHistoryTwo,
                   columns:columsTableThree, 
                });

                var cellTwo = subRow.getCell("fecha");
                cellTwo.getElement().style.backgroundColor = "#007bff"
                cellTwo.getElement().style.color = "white"

                var cellTwo = subRow.getCell("ciudad");
                cellTwo.getElement().style.backgroundColor = "#007bff"
                cellTwo.getElement().style.color = "white"

                var cellTwo = subRow.getCell("cadena");
                cellTwo.getElement().style.backgroundColor = "#007bff"
                cellTwo.getElement().style.color = "white"

                var cellTwo = subRow.getCell("tienda");
                cellTwo.getElement().style.backgroundColor = "#007bff"
                cellTwo.getElement().style.color = "white"

                var cellTwo = subRow.getCell("fecha_inicio");
                cellTwo.getElement().style.backgroundColor = "#007bff"
                cellTwo.getElement().style.color = "white"

                var cellTwo = subRow.getCell("actividad_inicial");
                cellTwo.getElement().style.backgroundColor = "#007bff"
                cellTwo.getElement().style.color = "white"

                var cellTwo = subRow.getCell("hora_final");
                cellTwo.getElement().style.backgroundColor = "#007bff"
                cellTwo.getElement().style.color = "white"

                var cellTwo = subRow.getCell("actividad_final");
                cellTwo.getElement().style.backgroundColor = "#007bff"
                cellTwo.getElement().style.color = "white"

                var cellTwo = subRow.getCell("duracion_visita");
                cellTwo.getElement().style.backgroundColor = "#007bff"
                cellTwo.getElement().style.color = "white"

                var cellTwo = subRow.getCell("total_movimiento");
                cellTwo.getElement().style.backgroundColor = "#007bff"
                cellTwo.getElement().style.color = "white"

                var cellTwo = subRow.getCell("evidencia");
                cellTwo.getElement().style.backgroundColor = "#007bff"
                cellTwo.getElement().style.color = "white"

           },
       });

      var cell = row.getCell("usuario");
      cell.getElement().style.backgroundColor = "#c450cf"
      cell.getElement().style.color = "white"

      var cell = row.getCell("ciudad");
      cell.getElement().style.backgroundColor = "#c450cf"
      cell.getElement().style.color = "white"

      var cell = row.getCell("cadena");
      cell.getElement().style.backgroundColor = "#c450cf"
      cell.getElement().style.color = "white"

      var cell = row.getCell("tienda");
      cell.getElement().style.backgroundColor = "#c450cf"
      cell.getElement().style.color = "white"

      var cell = row.getCell("fecha_inicio");
      cell.getElement().style.backgroundColor = "#c450cf"
      cell.getElement().style.color = "white"

      var cell = row.getCell("hora_inicio");
      cell.getElement().style.backgroundColor = "#c450cf"
      cell.getElement().style.color = "white"

      var cell = row.getCell("fecha_final");
      cell.getElement().style.backgroundColor = "#c450cf"
      cell.getElement().style.color = "white"

      var cell = row.getCell("hora_final");
      cell.getElement().style.backgroundColor = "#c450cf"
      cell.getElement().style.color = "white"

      var cell = row.getCell("total_hrs_dia");
      cell.getElement().style.backgroundColor = "#c450cf"
      cell.getElement().style.color = "white"

      var cell = row.getCell("evidencia");
      cell.getElement().style.backgroundColor = "#c450cf"
      cell.getElement().style.color = "white"

      var cell = row.getCell("duracion_visita");
      cell.getElement().style.backgroundColor = "#c450cf"
      cell.getElement().style.color = "white"
    },
    downloadConfig:{
    columnGroups: true,
    rowGroups: true,
    }
  });

//---Definición de la estructura de las columnas del archivo xlsx y csv

  let structureColumns = [
      {header:'Usuario', key:"usuario"},
      {header:'Ciudad', key:'ciudad'},
      {header:'Cadena', key:'cadena'},
      {header:'Tienda', key:'tienda'},
      {header:'Fecha inicio', key:'fecha_inicio'},
      {header:'Hora Inicio', key:'hora_inicio'},
      {header:'Fecha final', key:'fecha_final'},
      {header:'Hora final', key:'hora_final'},
      {header:'Duración visita', key:'duracion_visita'},
      {header:'Total horas x día', key:'total_hrs_dia'},
      {header:'Evidencia', key:'evidencia'},
    ]

if (document.getElementById("download_xlsx_"+id)){
    //trigger download of data.xlsx file
    document.getElementById("download_xlsx_"+id).replaceWith(document.getElementById("download_xlsx_"+id).cloneNode(true));
    document.getElementById("download_xlsx_"+id).addEventListener("click", function (){
    //table.download("xlsx", "data.xlsx", {sheetName:"data"});

    //Obtener datos anidados
    var nestedData = table.getData(true);
    //----Almacena los datos de las tablas anidadas
    var exportData = [];
    //----Almacena 
    var styleRows = [];
    let contRow = 1;

    nestedData.forEach(row => {
      console.log("Nested Data")
      console.log(row)
      console.log("Nested Data")
      let titles = {
        'usuario': row.usuario,
        'ciudad': row.ciudad,
        'cadena': row.cadena,
        'tienda': row.tienda,
        'fecha_inicio': row.fecha_inicio,
        'hora_inicio': row.hora_inicio,
        'fecha_final': row.fecha_final,
        'hora_final': row.hora_final,
        'duracion_visita': row.duracion_visita,
        'total_hrs_dia': row.total_hrs_dia,
        'evidencia': row.evidencia
      }
      contRow ++;
      styleRows.push(contRow)
      if (row.hasOwnProperty("serviceHistory")) {
          exportData.push(titles);
          exportData.push(...row.serviceHistory);
          contRow = contRow + (row.serviceHistory.length)
      }
    })

    const dataForXLSX = exportData.map(item => {
      console.log("row")
      console.log(item)
      return {
        'usuario': item.fecha || item.usuario,
        'ciudad': item.ciudad || " ",
        'cadena': item.cadena || " ",
        'tienda': item.tienda || " ",
        'fecha_inicio': item.fecha_inicio || " ",
        'hora_inicio': item.actividad_inicial || " ",
        'fecha_final': item.hora_final || " ",
        'hora_final': item.total_movimiento || " ",
        'duracion_visita': item.duracion_visita || " ",
        'total_hrs_dia': item.total_movimiento || " ",
        'evidencia': item.evidencia || " ",
      };
    });

    let dataForXLSXTwo = []
    exportData.forEach(item => {
      dataForXLSXTwo.push(
        {
        'usuario': item.fecha || item.usuario,
        'ciudad': item.ciudad || " ",
        'cadena': item.cadena || " ",
        'tienda': item.tienda || " ",
        'fecha_inicio': item.fecha_inicio || " ",
        'hora_inicio': item.actividad_inicial || " ",
        'fecha_final': item.hora_final || " ",
        'hora_final': item.total_movimiento || " ",
        'duracion_visita': item.duracion_visita || " ",
        'total_hrs_dia': item.total_movimiento || " ",
        'evidencia': item.evidencia || " ",
      })

      if(item.serviceHistoryTwo){
        item.serviceHistoryTwo.forEach(element => {
          dataForXLSXTwo.push(
            {
            'usuario': element.folio || ' ',
            'ciudad': element.ciudad || " ",
            'cadena': element.cadena || " ",
            'tienda': element.tienda || " ",
            'fecha_inicio': element.fecha_inicio || " ",
            'hora_inicio': element.actividad_inicial || " ",
            'fecha_final': element.fecha_final || " ",
            'hora_final': element.hora_final || " ",
            'duracion_visita': element.duracion_visita || " ",
            'total_hrs_dia': element.total_movimiento || " ",
            'evidencia': element.evidencia || " ",
          })
        })
      }

    })
    console.log(dataForXLSXTwo)

    console.log("La data en excel es: ")
    console.log(dataForXLSX)
    //----Creación del libro de trabajo
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'linkaform';
    workbook.lastModifiedBy = 'Bot';
    workbook.created = new Date(2024, 1, 23);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2024, 1, 23);

    //----Creación de la hoja de trabajo
    const sheet = workbook.addWorksheet('NestedData');

    //----Creación de columnas
    sheet.columns = structureColumns;

  sheet.addRows(dataForXLSXTwo);

  //----Generar el archivo y descárgalo
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'nombre_archivo.xlsx');
  });

    });
  }

  if (document.getElementById("download_csv_"+id)){
    //trigger download of data.csv file
    document.getElementById("download_csv_"+id).replaceWith(document.getElementById("download_csv_"+id).cloneNode(true));
    document.getElementById("download_csv_"+id).addEventListener("click", function (){
      //table.download("csv", "data.csv");
      //Obtener datos anidados
    var nestedData = table.getData(true);
    //----Almacena los datos de las tablas anidadas
    var exportData = [];
    //----Almacena 
    var styleRows = [];
    let contRow = 1;

    nestedData.forEach(row => {
      console.log("Nested Data")
      console.log(row)
      console.log("Nested Data")
      let titles = {
        'usuario': row.usuario,
        'ciudad': row.ciudad,
        'cadena': row.cadena,
        'tienda': row.tienda,
        'fecha_inicio': row.fecha_inicio,
        'hora_inicio': row.hora_inicio,
        'fecha_final': row.fecha_final,
        'hora_final': row.hora_final,
        'duracion_visita': row.duracion_visita,
        'total_hrs_dia': row.total_hrs_dia,
        'evidencia': row.evidencia
      }
      contRow ++;
      styleRows.push(contRow)
      if (row.hasOwnProperty("serviceHistory")) {
          exportData.push(titles);
          exportData.push(...row.serviceHistory);
          contRow = contRow + (row.serviceHistory.length)
      }
    })

    const dataForXLSX = exportData.map(item => {
      console.log("row")
      console.log(item)
      return {
        'usuario': item.fecha || item.usuario,
        'ciudad': item.ciudad || " ",
        'cadena': item.cadena || " ",
        'tienda': item.tienda || " ",
        'fecha_inicio': item.fecha_inicio || " ",
        'hora_inicio': item.actividad_inicial || " ",
        'fecha_final': item.hora_final || " ",
        'hora_final': item.total_movimiento || " ",
        'duracion_visita': item.duracion_visita || " ",
        'total_hrs_dia': item.total_movimiento || " ",
        'evidencia': item.evidencia || " ",
      };
    });

    let dataForXLSXTwo = []
    exportData.forEach(item => {
      dataForXLSXTwo.push(
        {
        'usuario': item.fecha || item.usuario,
        'ciudad': item.ciudad || " ",
        'cadena': item.cadena || " ",
        'tienda': item.tienda || " ",
        'fecha_inicio': item.fecha_inicio || " ",
        'hora_inicio': item.actividad_inicial || " ",
        'fecha_final': item.hora_final || " ",
        'hora_final': item.total_movimiento || " ",
        'duracion_visita': item.duracion_visita || " ",
        'total_hrs_dia': item.total_movimiento || " ",
        'evidencia': item.evidencia || " ",
      })

      if(item.serviceHistoryTwo){
        item.serviceHistoryTwo.forEach(element => {
          dataForXLSXTwo.push(
            {
            'usuario': element.folio || ' ',
            'ciudad': element.ciudad || " ",
            'cadena': element.cadena || " ",
            'tienda': element.tienda || " ",
            'fecha_inicio': element.fecha_inicio || " ",
            'hora_inicio': element.actividad_inicial || " ",
            'fecha_final': element.fecha_final || " ",
            'hora_final': element.hora_final || " ",
            'duracion_visita': element.duracion_visita || " ",
            'total_hrs_dia': element.total_movimiento || " ",
            'evidencia': element.evidencia || " ",
          })
        })
      }

    })
    console.log(dataForXLSXTwo)

    console.log("La data en excel es: ")
    console.log(dataForXLSX)
    //----Creación del libro de trabajo
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'linkaform';
    workbook.lastModifiedBy = 'Bot';
    workbook.created = new Date(2024, 1, 23);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2024, 1, 23);

    //----Creación de la hoja de trabajo
    const sheet = workbook.addWorksheet('NestedData');

    //----Creación de columnas
    sheet.columns = structureColumns;

  sheet.addRows(dataForXLSXTwo);

  //----Generar el archivo y descárgalo
  workbook.csv.writeBuffer().then((data) => {
    const csvBlob = new Blob([data], { type: 'text/csv' });
    saveAs(csvBlob, 'nombre_archivo.csv');
  });
    });
  }

}

//----- CATALOGS
function get_catalog(scriptId) 
{
  arrayPlant = []
  arrayOut = []


  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      option: "getFilters",
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (res.response.json){
        //Creamos una variable para renderizar el elemento multiselect
        var warehouseOptions = $("#warehouse")
        res.response.json['productCode'].sort();
        res.response.json['warehouse'].sort();
        //----Product code
        $('#productCode').select2({
              placeholder: 'Select',
              allowClear: true, // Opcional, para agregar una "X" para deseleccionar
              selectionCssClass: "select2-selection",

        });
        $("#productCode").empty();
        $("#productCode").append("<option value=''/></option> ")
        for (i = 0; i < res.response.json['productCode'].length; i++) {
          value =  res.response.json['productCode'][i]
          $('#productCode').append('<option value="'+ value +'">'+value+'</option>');
        }

        //----Warehouse
        $("#warehouse").empty();

        //----Almacenar los datos de la query en una variable para procesarla
        let data_warehouse = res.response.json['warehouse'];
        //----La variable permitirá guardar la data en el formato aceptado por la librería, la cual es: [{label: "elemento1", value: "elemento1"},]
        let data_multiselect = [];

        //---Iterar a través de los datos y crear objetos para el multiselect
        for (let i = 0; i < data_warehouse.length; i++) {
            let valueMultiselect = data_warehouse[i];
            let objMultiselect = { label: valueMultiselect, value: valueMultiselect };
            data_multiselect.push(objMultiselect);
        }

        
        $('#warehouse').multiselect('dataprovider', data_multiselect);
        $('#warehouse').multiselect('refresh');
      }
    } 
  })

};

/*Esta función será llamada al seleccionar un plant code determinado.
  La función llamará a los lot_number correspondientes a cada plant code y los agregará al selector lotNumber."
*/
function get_lotNumber(id)
{
  fetch(url + 'infosync/scripts/run/',{
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      option:"getLotNumber",
      product_code: id
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if(res.success){
      if(res.response.json){
        
          //----Lot number
          $('#lotNumber').select2({
              placeholder: 'Select',
              allowClear: true, // Opcional, para agregar una "X" para deseleccionar
              selectionCssClass: "select2-selection",

          });
          $("#lotNumber").empty();
          $("#lotNumber").append("<option value=''/></option> ")
          let dataLotNumber = res.response.json['lotNumber'];
          for(let i = 0; i < dataLotNumber.length; i++){
            value = dataLotNumber[i];
            $("#lotNumber").append('<option value="' + value + '">'+value+'</option>');
          }
        
      }
    }
  })
}

function filtro_fechas(selectElement) {
  var valorSeleccionado = selectElement.value;
  if (valorSeleccionado === "custom") {
    $("#filter_range").hide()
    $("#filter_date").show()
    realizarAccionCustom();
  }
}

//------PDF
function getDownloadPdf(id = 0){
  Swal.fire('Espere Por Favor');
  Swal.showLoading();
  link = ''
  fetch(url + 'infosync/scripts/run/', {
      method: 'POST',
      body: JSON.stringify({
        script_id: 98210,
        ids: id,
        template: 254,
      }),
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+userJwt
      },
    })
    .then(res => res.json())
    .then(res => {
    if (res.success) {
      if (res.response.json.download.data){
        Swal.close()
        link = res.response.json.download.data.download_url;
        console.log('LINK',link)

        Object.assign(document.createElement('a'), {
          target: '_blank',
          rel: 'noopener noreferrer',
          href: link,
        }).click();
      }
    } 
  })
  return link;
}

//Configuration for the graphic
let chart2;
function  drawFirstElement(data){
  var ctx = document.getElementById("graphicFirst").getContext('2d');

  if (chart2){
    chart2.destroy()
  }

  chart2 = new Chart(ctx,{
    type: "bar",
    data:data,
    plugins: [ChartDataLabels],
    options: {
      plugins:{
        legend: {
          display: false
        },
        scales:{
          yAxes: [{ticks: {min:1, max:200}}],
        },
        title:{
          display: true,
          text: 'Visitas por promotor',
          font: {
            size: 25
          }
        },
        datalabels:{
          color: 'black',
          labels: {
            title: {
              font: {
                weight: 'bold'
              }
            },
          },
          align: 'top'
        }
      }
    }
  })
}

