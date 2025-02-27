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
hideElement("thirdElement");
hideElement("fourthElement");

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
  hideElement("firstParameters");


  if(us != "" && jw != "" || scriptId===null){
    hideElement("inicio_ses");
    unhideElement("close_sesion");
    getCompanyLogo(userParentId);
    userId = us;
    userJwt = jw;
    userName = getCookie("userName");
    document.getElementById("firstParameters").style.removeProperty('display');
    unHideReportElements()
    if (scriptId == null) {
      loadDemoData();
    }
    //--Catalog
    get_catalog();
    //--Styles
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
    document.getElementById("firstParameters").style.removeProperty('display');
    
  } else {
    unhideElement("inicio_ses");
    $('#divContent').hide();
    $('#divOptions').hide();
    $('#title_report').hide();
    $('.title_tables').hide();
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
}

function loadDemoData(){
  unhideElement("title_demo")
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');
  
  getDrawTable('firstElement', columsTable1, dataTable1);
  document.getElementById("firstElement").style.removeProperty('display');

  getDrawGraphicFirst(data1, setOptions1);
  document.getElementById("secondElement").style.removeProperty('display');

}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");  
  let dispositivo = document.getElementById("dispositivo");  
  let cliente = document.getElementById("cliente");  
  
  if (date_from.value != null && date_from.value!="" && date_to.value != null && date_to.value!=""){
    getFirstElement(date_to.value, date_from.value, dispositivo.value, cliente.value);
  }
  else
  {
    Swal.fire({
      title: 'Rango de fechas requerido!!',
    });
  }
};

function getFirstElement(dateTo, dateFrom, dispositivo, cliente){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();

  console.log(dateTo)
  console.log(dateFrom)
  console.log(dispositivo)
  console.log(cliente)

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 112056,
      date_to: dateTo,
      date_from: dateFrom,
      dispositivo: dispositivo,
      cliente: cliente,
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
      console.log("Respuesta")
      console.log(res)
      if (res.response.json.firstElement.data) {
        //console.log(res.response.json.firtsElement.data)
        getDrawTable('firstElement', columsTable1, res.response.json.firstElement.data);
        document.getElementById("firstElement").style.removeProperty('display');
      }
      if (res.response.json.secondElement) {
        getDrawGraphicFirst(res.response.json.secondElement, setOptions1);
        document.getElementById("secondElement").style.removeProperty('display');
      }
      if (res.response.json.secondElement) {
        getDrawGraphicSecond(res.response.json.secondElement, setOptions2);
        document.getElementById("thirdElement").style.removeProperty('display');
      }
      if (res.response.json.secondElement) {
        let dataFormat = setFormat(res.response.json.secondElement);
        getDrawGraphicThird(dataFormat, setOptions3);
        document.getElementById("fourthElement").style.removeProperty('display');
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

//-----FORMAT
function setFormat(data) {
  let dicReturn = {
    'labels': [],
    'datasets': [
      {
        'label': 'Cantidad',
        'data': [],
        'backgroundColor': [],
      },
    ]
  };

  for (var i = 0; i < data['datasets'].length; i++) {
    let suma = data['datasets'][i]['data'].reduce((count, value) => count + value, 0);
    dicReturn['labels'].push(data['datasets'][i]['label'])
    dicReturn['datasets'][0]['backgroundColor'].push(data['datasets'][i]['backgroundColor'])
    dicReturn['datasets'][0]['data'].push(suma)
  }

  return dicReturn
}


//-----CATALOG
function get_catalog() 
{
  fetch(url + 'infosync/scripts/run/', {
      method: 'POST',
      body: JSON.stringify({
        script_id: 112056,
        option: 0,
      }),
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+userJwt
      },
    })
    .then(res => res.json())
    .then(res => {
    if (res.success) {
      console.log("CATALOGO")
      console.log(res)
      if (res.response.json.array_filters.dispositivo.length){

        $("#dispositivo").empty();
        $('#dispositivo').append('<option value="--">--Seleccione--</option>');
        for (i = 0; i <res.response.json.array_filters.dispositivo.length; i++) {
          value = res.response.json.array_filters.dispositivo[i]
          $('#dispositivo').append('<option value="'+ value +'"> Dispositivo '+value+'</option>');
        }

        data = res.response.json.catalogClient;
        data.sort((a, b) => {
          let clientA = (a['653fd525b96022a0f257926f'] || a['653fd525b96022a0f257926f']).toLowerCase();
          let clientB = (b['653fd525b96022a0f257926f'] || b['653fd525b96022a0f257926f']).toLowerCase();
          if (clientA < clientB) return -1;
          if (clientA > clientB) return 1;
          return 0;
        });
        
        $("#cliente").empty();
        $('#cliente').append('<option value="--">--Seleccione--</option>');
        for (i = 0; i <data.length; i++) {
          value = data[i]['653fd525b96022a0f257926f']
          $('#cliente').append('<option value="'+ value +'">'+value+'</option>');
        }
      }
    } 
  })
};

//-----TABLES
function getDrawTable(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    height:"300px",
    layout:"fitDataTable",
    data:tableData,
    resizableRows:false,
    dataTree:true,
    dataTreeStartExpanded:false,
    clipboard:true,
    clipboardPasteAction:"replace",
    textDirection:"ltr",
    columns:columnsData,
  });

  if (document.getElementById("download_xlsx_"+id)){
    //trigger download of data.xlsx file
    document.getElementById("download_xlsx_"+id).replaceWith(document.getElementById("download_xlsx_"+id).cloneNode(true));
    document.getElementById("download_xlsx_"+id).addEventListener("click", function (){
    table.download("xlsx", "data.xlsx", {sheetName:"data"});
    });
  }

  if (document.getElementById("download_csv_"+id)){
    //trigger download of data.csv file
    document.getElementById("download_csv_"+id).replaceWith(document.getElementById("download_csv_"+id).cloneNode(true));
    document.getElementById("download_csv_"+id).addEventListener("click", function (){
      table.download("csv", "data.csv");
    });
  }
}


//-----GRAPICH
let chart1;
function getDrawGraphicFirst(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicFirst').getContext('2d');
  
  if (chart1) {
    chart1.destroy();
  }

  chart1 = new Chart(ctx, {
    type: 'line',
    data:data,
    options: setOptions,
  });
}

let chart2;
function getDrawGraphicSecond(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicSecond').getContext('2d');
  
  if (chart2) {
    chart2.destroy();
  }

  chart2 = new Chart(ctx, {
    type: 'bar',
    data:data,
    options: setOptions,
  });
}


let chart3;
function getDrawGraphicThird(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicThird').getContext('2d');
  
  if (chart3) {
    chart3.destroy();
  }

  chart3 = new Chart(ctx, {
    type: 'doughnut',
    data:data,
    options: setOptions,
  });
}
