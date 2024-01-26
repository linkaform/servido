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
    //get_catalog(scriptId);
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

  getDrawTableFirst('firstElement', columsTable, dataTable);
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
  let cadena = document.getElementById("cadena");  
  
  getFirstElement(dateFrom.value, dateTo.value, cadena.value);
};

function getFirstElement(dateFrom, dateTo, cadena){
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
      cadena: cadena,
      
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
      console.log("Implementación pendiente")
      /*if(res.response.json.secondElement.data){
        //----Se crea y define una variable que almacene la data de la query para no escribir toda la ruta
        let dataTableTwo = res.response.json.secondElement.data;
        console.log('tabel 2')
        getDrawTableFirst('firstElement', columsTable2, dataTableTwo);
        document.getElementById("firstElement").style.removeProperty('display');

        //document.getElementById("secondElement").style.removeProperty('display');
        unhideElement("secondElement");
        document.getElementById("secondElement").style.removeProperty('display');
        
      }*/

      
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
function getDrawTableFirst(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    //columnHeaderVertAlign:"top",
    height:"100%",
    layout:"fitDataTable",
    /*columnDefaults:{
      resizable:false,
    },*/
    dataTree: true,
    dataTreeChildIndent:5,
    dataTreeStartExpanded:true,
    clipboard:true,
    clipboardPasteAction:"replace",
    data:tableData,
    columns:columnsData,
    dataMutate:function(data){
      //alert("Pruebas")
      var firstChild = data._children && data._children[0];
        if(firstChild){
            // Mueve los datos del primer hijo al nivel superior
            data.folio = firstChild.folio;
            data.ciudad = firstChild.ciudad;
            data.cadena = firstChild.cadena;
            data.fecha_inicio = firstChild.fecha_inicio;
            data.hora_inicio = firstChild.hora_inicio;
            data.fecha_final = firstChild.fecha_final;
            data.hora_final = firstChild.hora_final;
            data.duracion_visita = firstChild.duracion_visita;
            data.total_hrs_dia = firstChild.total_hrs_dia;
            data.record_id = firstChild.record_id;
        }
        return data;
    },

    //Primer anidamiento
    /*rowFormatter:function(row){
     

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
    },*/
    downloadConfig:{
    columnGroups: true,
    rowGroups: true,
    }
  });

  if (document.getElementById("download_xlsx_"+id)){
    document.getElementById("download_xlsx_"+id).replaceWith(document.getElementById("download_xlsx_"+id).cloneNode(true));
    document.getElementById("download_xlsx_"+id).addEventListener("click", function (){
    table.download("xlsx", "data.xlsx", {sheetName:"data"});
    });
  }

  if (document.getElementById("download_csv_"+id)){
    document.getElementById("download_csv_"+id).replaceWith(document.getElementById("download_csv_"+id).cloneNode(true));
    document.getElementById("download_csv_"+id).addEventListener("click", function (){
      table.download("csv", "data.csv");
    });
  }
}


function get_structure_xlsx_csv(nestedData){
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
    //console.log(dataForXLSX)
    

    return dataForXLSXTwo

}

//----- CATALOGS
function get_catalog(){
  fetch(url + 'infosync/scripts/run/',{
    method:'POST',
    body: JSON.stringify({
      script_id:id,
      option: 2
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + userJwt
    }
  })
  .then(res => res.json())
  .then(res =>{
    if(res.success){
      if(res.response.json.catalog){
        console.log("Estas recibiendo el catálogo");
      }
    }
  })
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

