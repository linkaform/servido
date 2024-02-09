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
hideElement("fourthElement");
hideElement("fivethElement");
hideElement("content_button");

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
    get_catalog();
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

  getDrawTableFirst('firstElement', columsTable, dataTable, expand=[true, true]);
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

var dataTable1 = []
function getFirstElement(dateFrom, dateTo, cadena){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_from: dateFrom,
      date_to: dateTo,
      cadena: cadena,
      option:1
      
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
      unhideElement("content_button");
      console.log("Implementación pendiente")
      if(res.response.json.firstElement.data){
        dataTable1 = res.response.json.firstElement.data
        getDrawTableFirst('firstElement', columsTable, dataTable1, expand=[true, true]);
        document.getElementById("firstElement").style.removeProperty('display');
        
        document.getElementById("firstParameters").style.removeProperty('display');
      }

      if(res.response.json.secondElement.data){
        let dataGraphic = {}
        dataGraphic = res.response.json.secondElement.data[0]
        drawFirstElement(dataGraphic)
        document.getElementById("ThirdElement").style.removeProperty('display');
      }
      
      if(res.response.json.listIds){
        console.log("Solicitud pendiente")
        let array_ids = []
        array_ids = res.response.json.listIds;
        console.log("Los ids son")
        generar_urls_pdf(array_ids);
      }

      if(res.response.json.thirdElement.data){
        unhideElement("fourthElement");
        unhideElement("fivethElement");
        let data_general = {}
        data_general = res.response.json.thirdElement.data[0]
        $("#total_visitas").empty()
        $("#total_promotores").empty()
        $("#total_visitas").append("Total de visitas: ",data_general.total_visitas)
        $("#total_promotores").append("Total promotores: ",data_general.numero_promotor)
        drawFirstElement(dataGraphic)
        document.getElementById("ThirdElement").style.removeProperty('display');
      }

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
function getDrawTableFirst(id, columnsData, tableData, expand=true){
  var  table = new Tabulator("#" + id, {
    //columnHeaderVertAlign:"top",
    height:"100%",
    layout:"fitDataTable",
    /*columnDefaults:{
      resizable:false,
    },*/
    dataTree: true,
    dataTreeChildIndent:5,
    dataTreeStartExpanded:expand,
    clipboard:true,
    clipboardPasteAction:"replace",
    data:tableData,
    columns:columnsData,

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
  let structureColumns = [
      {header:'Usuario', key:"usuario"},
      {header:'Fecha', key:'fecha'},
      {header:'Ciudad', key:'ciudad'},
      {header:'Cadena', key:'cadena'},
      {header:'Tienda', key:'tienda'},
      {header:'Fecha inicio', key:'fecha_inicio'},
      {header:'Hora inicio de jornada', key:'hora_inicio'},
      {header:'Fecha final', key:'fecha_final'},
      {header:'Fecha final de jornada', key:'hora_final'},
      {header:'Duración visita', key:'duracion_visita'},
      {header:'Total horas x día en traslados', key:'total_hrs_dia'},
      {header:'Evidencia', key:'evidencia'},
    ]
  if (document.getElementById("download_xlsx_"+id)){
    document.getElementById("download_xlsx_"+id).replaceWith(document.getElementById("download_xlsx_"+id).cloneNode(true));
    document.getElementById("download_xlsx_"+id).addEventListener("click", function (){
    //table.download("xlsx", "data.xlsx", {sheetName:"data"});
      //obtener datos anidados
      var nestedData = table.getData(true);
      //Almacena los datos de las tablas anidadas
      var exportData = [];
      //Almacena
      var styleRows = [];
      let contRow = 1;

      nestedData.forEach(row =>{
        let titles = {
          'usuario':row.usuario || " ",
          'fecha': row.fecha || " ",
          'ciudad': row.ciudad || " ",
          'cadena': row.cadena || " ",
          'tienda': row.tienda || " ",
          'fecha_inicio': row.fecha_inicio || " ",
          'hora_inicio': row.hora_inicio || " ",
          'fecha_final': row.fecha_final || " ",
          'hora_final': row.hora_final || " ",
          'duracion_visita': row.duracion_visita || " ",
          'total_hrs_dia': row.total_hrs_dia || " ",
          'evidencia': "" 
        }
        if (row.hasOwnProperty("_children")){
          exportData.push(titles)
          row._children.forEach(element => {
            titles = {
              'usuario':element.usuario || " ",
              'fecha': element.fecha || " ",
              'ciudad': element.ciudad || " ",
              'cadena': element.cadena || " ",
              'tienda': element.tienda || " ",
              'fecha_inicio': element.fecha_inicio || " ",
              'hora_inicio': element.hora_inicio || " ",
              'fecha_final': element.fecha_final || " ",
              'hora_final': element.hora_final || " ",
              'duracion_visita': element.duracion_visita || " ",
              'total_hrs_dia': element.total_hrs_dia || " ",
              'evidencia': "" 
            }
            if(element.hasOwnProperty('_children')){
              exportData.push(titles)
              element._children.forEach(elementTwo => {
                let ciudad = 'element.ciudad'
                if(typeof elementTwo.ciudad == 'string'){
                  ciudad = ciudad
                }
                if(typeof elementTwo.ciudad == 'object'){
                  ciudad = elementTwo.ciudad[0]
                }

                titles = {
                  'usuario':elementTwo.usuario || " ",
                  'fecha': elementTwo.fecha || " ",
                  'ciudad': ciudad || " ",
                  'cadena': elementTwo.cadena || " ",
                  'tienda': elementTwo.tienda || " ",
                  'fecha_inicio': elementTwo.fecha_inicio || " ",
                  'hora_inicio': elementTwo.hora_inicio || " ",
                  'fecha_final': elementTwo.fecha_final || " ",
                  'hora_final': elementTwo.hora_final || " ",
                  'duracion_visita': elementTwo.duracion_visita || " ",
                  'total_hrs_dia': elementTwo.total_hrs_dia || " ",
                  'evidencia': elementTwo.url_download
                }
                exportData.push(titles)
                /*console.log("elementTwo")
                console.log(elementTwo)*/
              })
            }
            /*console.log("element")
            console.log(element)*/
          })
          //exportData.push(...row._children)
        }
      })

    const dataForXLSX = exportData.map(item => {
    return {
        'usuario':item.usuario || " ",
        'fecha': item.fecha || " ",
        'ciudad': item.ciudad || " ",
        'cadena': item.cadena || " ",
        'tienda': item.tienda || " ",
        'fecha_inicio': item.fecha_inicio || " ",
        'hora_inicio': item.hora_inicio || " ",
        'fecha_final': item.fecha_final || " ",
        'hora_final': item.hora_final || " ",
        'duracion_visita': item.duracion_visita || " ",
        'total_hrs_dia': item.total_hrs_dia || " ",
        'evidencia': item.evidencia || " " 
      };
    });

      //----Creación del libro de trabajo
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'linkaform';
    workbook.lastModifiedBy = 'Bot';
    workbook.created = new Date(2023, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2023, 7, 27);

    //----Creación de la hoja de trabajo
    const sheet = workbook.addWorksheet('NestedData');

    //----Creación de columnas
    sheet.columns = structureColumns;

    sheet.addRows(dataForXLSX);
    /*console.log("Data es")
    console.log(exportData)*/
        //----Generar el archivo y descárgalo
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'nombre_archivo.xlsx');
    });
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
function get_catalog() 
{
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 113918,
      option: 2,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      console.log(res)
      if (res.response.json.catalog){
        let data = []
        data = res.response.json.catalog
        console.log('CATALOGO',res.response.json.catalog);

        $("#cadena").empty();
        $('#cadena').append('<option value="--">Seleccione la cadena</option>');
        data.forEach(element => {
          value = element['64eecef6983b37deb80baec8']
          $('#cadena').append('<option value="'+value+'">'+value+'</option>');
        })

        
        /*if(arrayCeo.length){
          $("#ceo").empty();
          $('#ceo').append('<option value="--">--Seleccione--</option>');
          for (i = 0; i < arrayCeo.length; i++) {
            value = arrayCeo[i]
            $('#ceo').append('<option value="'+ value +'">'+value+'</option>');
          }
        }*/
        
      }
    } 
  })
};


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

//------PDF
function getDownloadPdf(id = 0) {
    Swal.fire('Espere Por Favor');
    Swal.showLoading();
    fetch(url + 'infosync/scripts/run/', {
        method: 'POST',
        body: JSON.stringify({
            script_id: 113904,
            ids: id,
            template: 409,
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userJwt
        },
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            if (res.response.json.download.data) {
                Swal.close();
                const linkR = res.response.json.download.data.download_url;
                console.log('LINK', linkR);

                /*// Crear un enlace temporal
                const downloadLink = document.createElement('a');
                downloadLink.href = link;
                downloadLink.download = 'archivo.pdf'; // Nombre del archivo a descargar*/

                /*// Simular un clic en el enlace para iniciar la descarga
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink); // Eliminar el enlace temporal*/

                // Crear un enlace para descargar el PDF
                var link = document.createElement('a');
                link.href = linkR;
                link.target = "_blank"; // Abrir en una nueva pestaña o ventana
                link.download = "archivo.pdf"; // Nombre de archivo para descargar
                document.body.appendChild(link);
                link.click();
                //document.body.removeChild(link);
            } else {
                Swal.fire('Error', 'No se pudo obtener el enlace de descarga', 'error');
            }
        } else {
            Swal.fire('Error', 'La solicitud no tuvo éxito', 'error');
        }
    })
    .catch(error => {
        Swal.fire('Error', 'Hubo un error en la solicitud: ' + error.message, 'error');
    });
}

//Generar pds
function generar_urls_pdf(ids){
  console.log("Realizando solicitud para crear pdfs");
  fetch(url + 'infosync/scripts/run/', {
        method: 'POST',
        body: JSON.stringify({
            script_id: 114350,
            ids: ids,
            template: 409,
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userJwt
        },
    })
  .then(() => {
    console.log('Solicitud enviada al servidor sin esperar respuesta');
  })
  .catch(error => {
    console.error('Error al enviar la solicitud:', error);
  });
}

var cont_check = 0;
var is_group = false;
var group_user = false
var group_date = false

document.getElementById('expandir').addEventListener('click', (e)=>{
  if(group_user == true && group_date == true){
    getDrawTableFirst('firstElement', columsTable, dataTable1, expand=[true, false])
    group_user = false;
    group_date = true;
  }else if(group_user == false && group_date == true){
    getDrawTableFirst('firstElement', columsTable, dataTable1, expand=[true, true])
    group_user = false;
    group_date = false;
  }else{
    Swal.fire({
      position: "top-end",
      icon: "success",
      text: "Expansión completa",
      showConfirmButton: false,
      timer: 1500
    });
  }
  console.log(group_user)
  console.log(group_date)
  console.log("Expandir")
})

document.getElementById('agrupar_fecha').addEventListener('click', (e)=>{
  if(group_user == false && group_date == false){
    getDrawTableFirst('firstElement', columsTable, dataTable1, expand=[true, false])
    group_date = true
    group_user = false;
  }else {
    Swal.fire({
      position: "top-end",
      icon: "success",
      text: "Agrupación por fecha realizada",
      showConfirmButton: false,
      timer: 1500
    });
  }
  console.log("Agrupar")
})

document.getElementById('agrupar_usuario').addEventListener('click', (e)=>{
  if(group_date == false && group_user == false){
    getDrawTableFirst('firstElement', columsTable, dataTable1, expand=[false, false])
    group_date = true;
    group_user = true;
  }else if(group_date == true && group_user == false) {
    getDrawTableFirst('firstElement', columsTable, dataTable1, expand=[false, false])
    group_date = true;
    group_user = true;
  }else{
    Swal.fire({
      position: "top-end",
      icon: "success",
      text: "Agrupación por usuario realizada",
      showConfirmButton: false,
      timer: 1500
    });
  }

  console.log("Agrupar")
})