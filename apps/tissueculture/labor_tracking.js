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
let isExpanded = false;
let dataTableGlobal = null;
$('#divOptions').hide();
$('#title_report').hide();
$('.title_tables').hide();
hideElement("title_demo");
hideElement("firstParameters");
hideElement("divContentFirst");
hideElement("divContentSecond");
hideElement("divContentThird");

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
      dataTableGlobal = dataTable1;
    }
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
  $('#title_report').show();
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');

  drawFirstElement(dataChart1, setOptions1)
  document.getElementById("divContentFirst").style.removeProperty('display');
  document.getElementById("graphicFirst").style.removeProperty('display');
  
  drawSecondElement(dataChart2, setOptions2)
  document.getElementById("divContentSecond").style.removeProperty('display');
  document.getElementById("graphicSecond").style.removeProperty('display');


  drawThirdElement(dataChart3, setOptions3)
  document.getElementById("divContentThird").style.removeProperty('display');
  document.getElementById("graphicThird").style.removeProperty('display');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");  
  getFirstElement(date_to.value, date_from.value);
};

function getFirstElement(dateTo, dateFrom){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();
  console.log('url',url)
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_to: dateTo,
      date_from: dateFrom,
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
      let data = res.response.data;

      if(data.graphicFirst ){
        drawFirstElement(data.graphicFirst, setOptions1)
        document.getElementById("divContentFirst").style.removeProperty('display');
        document.getElementById("graphicFirst").style.removeProperty('display');
      }
      
      if(data.graphicSecond ){
        drawSecondElement(data.graphicSecond, setOptions2)
        document.getElementById("divContentSecond").style.removeProperty('display');
        document.getElementById("graphicSecond").style.removeProperty('display');
      }

      if(data.graphicThird ){
        drawThirdElement(data.graphicThird, setOptions3)
        document.getElementById("divContentThird").style.removeProperty('display');
        document.getElementById("graphicThird").style.removeProperty('display');
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
function getDrawTable(id, columnsData, tableData, height, expanded = false){
  var  table = new Tabulator("#" + id, {
    height: height+"px",
    layout:"fitDataTable",
    data:tableData,
    resizableRows:false,
    dataTree:true,
    dataTreeStartExpanded:expanded,
    clipboard:true,
    clipboardPasteAction:"replace",
    textDirection:"ltr",
    columns:columnsData,
    rowFormatter: function(row){
      // Obtiene los datos de la fila
      var data = row.getData();
      if(data.tecnico !== undefined ){
        row.getElement().style.backgroundColor = data.color;
      }
    },
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


function changeTableExpanded(){
  isExpanded = !isExpanded; 
  getDrawTable('firstElement', columsTable1, dataTableGlobal, 350, expanded = isExpanded);
  document.getElementById("divContentFirst").style.removeProperty('display');
  document.getElementById("firstElement").style.removeProperty('display');
}

//-----GRAPICH
let chart1;
function drawFirstElement(datasets, dataconfig){

  //---CHART
  var ctx = document.getElementById('graphicFirst').getContext('2d');
  
  if (chart1) {
    chart1.destroy();
  }
  //---COLORS
  //array_colors = getPAlleteColors(6, datasets['labels'].length);
  //datasets['datasets'][0]['backgroundColor'] = array_colors
  //datasets['datasets'][0]['borderColor'] = array_colors

  chart1 = new Chart(ctx, {
    type: 'bar',
    data: datasets,
    plugins: [ChartDataLabels],
    options: dataconfig
  });
}

let chart2;
function drawSecondElement(datasets, dataconfig){

  //---CHART
  var ctx = document.getElementById('graphicSecond').getContext('2d');
  
  if (chart2) {
    chart2.destroy();
  }
  //---COLORS
  array_colors = getPAlleteColors(6, datasets['labels'].length);
  console.log('Colors',array_colors);
  datasets['datasets'][0]['backgroundColor'] = array_colors
  datasets['datasets'][0]['borderColor'] =  array_colors

  chart2 = new Chart(ctx, {
    type: 'bar',
    data: datasets,
    plugins: [ChartDataLabels],
    options: dataconfig
  });
}

let chart3;
function drawThirdElement(datasets, dataconfig){

  //---CHART
  var ctx = document.getElementById('graphicThird').getContext('2d');
  
  if (chart3) {
    chart3.destroy();
  }
  //---COLORS
  array_colors = getPAlleteColors(6, datasets['labels'].length);
  datasets['datasets'][0]['backgroundColor'] = array_colors
  datasets['datasets'][0]['borderColor'] =  array_colors

  chart3 = new Chart(ctx, {
    type: 'bar',
    data: datasets,
    plugins: [ChartDataLabels],
    options: dataconfig
  });
}