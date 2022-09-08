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

    //----
    get_catalog_rumas();
    //--Styles
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();

  } else {
    unhideElement("inicio_ses");
    $('.title_tables').hide();
    $('#divOptions').hide();
    $('#title_report').hide();
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
  unhideElement("close_sesion");
  unhideElement("firstParameters");
  unhideElement("firstElement");
  unhideElement("secondElement");
}



function loadDemoData(){

  $('.title_tables').show();
  document.getElementById("firstElement").style.removeProperty('display');
  document.getElementById("secondElement").style.removeProperty('display');
  document.getElementById("thirdElement").style.removeProperty('display');
  document.getElementById("fourthElement").style.removeProperty('display');
  
  getDrawTable('firstElement', columsTable1, dataTable1);
  drawSecondElement(dataElement2);
  drawThirdElement(dataElement3);
  drawFourthElement(dataElement4);
}


const loading = document.querySelector('.loading-container');
loading.style.display = 'none';


function runFirstElement(){

  let ruma = document.getElementById("ruma");
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");
  getFirstElement(ruma.value, date_from.value, date_to.value);
};


function getFirstElement(ruma, date_from, date_to){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      ruma: ruma,
      date_to: date_to,
      date_from: date_from,
      option: 1,
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
      if (res.response.json.firstElement) {
        //--The data is same 
        getDrawTable('firstElement', columsTable1,res.response.json.firstElement.data);
        drawSecondElement(res.response.json.firstElement.data);
        document.getElementById("firstElement").style.removeProperty('display');
        document.getElementById("secondElement").style.removeProperty('display');
      }
      if (res.response.json.secondElement) {
        console.log('drawSecondElement.........');
        getDrawTable('thirdElement', columsTable2,res.response.json.secondElement.data);
        drawFivethElement(res.response.json.secondElement.data);
        document.getElementById("thirdElement").style.removeProperty('display');
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
function getDrawTable(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    height:"auto",
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
let chart2;
function drawSecondElement(data){

  //---CHART
  var ctx = document.getElementById('graphicSecond').getContext('2d');
  
  if (chart2) {
    chart2.destroy();
  }

  chart2 = new Chart(ctx, {
    type: 'bar',
    data: data,
    plugins: [ChartDataLabels],
    options: setOptions,
  });
}

let chart3;
function drawThirdElement(data){

  //---CHART
  var ctx = document.getElementById('graphicThird').getContext('2d');
  
  if (chart3) {
    chart3.destroy();
  }

  chart3 = new Chart(ctx, {
    type: 'bar',
    data: data,
    plugins: [ChartDataLabels],
    options: setOptions3,
  });
}


let chart4;
function drawFourthElement(data){

  //---CHART
  var ctx = document.getElementById('graphicFourth').getContext('2d');
  
  if (chart4) {
    chart4.destroy();
  }

  chart4 = new Chart(ctx, {
    type: 'bar',
    data: data,
    plugins: [ChartDataLabels],
    options: setOptions4,
  });
}

//----- CATALOG 
function get_catalog_rumas(){
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 88782,
      option: 2,
      ruma: '',
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      //----SHOW STYLES
      if (res.response.json.catalog.data) {
        console.log(res.response.json.catalog.data);
        $("#ruma").empty();
        $('#ruma').append('<option value="--">--Seleccione--</option>');
        for (i = 0; i < res.response.json.catalog.data.length; i++) {
          text = res.response.json.catalog.data[i]['62d9c7c53521a9920d897464'];
          value = res.response.json.catalog.data[i]['62cf337f577dd60f5f7e5ccf'];
          $('#ruma').append('<option value="'+ value +'">'+text+'</option>');
        }
      }
    } 
  })
}

