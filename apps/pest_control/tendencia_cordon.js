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

  getDrawGraphicSecond(data2, setOptions2);
  document.getElementById("thirdElement").style.removeProperty('display');

}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");  
  let cordon = document.getElementById("cordon");  
  let cliente = document.getElementById("cliente");  
  getFirstElement(date_to.value, date_from.value, cordon.value, cliente.value);
};

function getFirstElement(dateTo, dateFrom, cordon, cliente){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 121299,
      date_to: dateTo,
      date_from: dateFrom,
      cordon: cordon,
      cliente: cliente,
      option: 'get_data',
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
      if (res.response.responseTable) {
        //console.log(res.response.json.firtsElement.data)
        getDrawTable('firstElement', columsTable1, res.response.responseTable);
        document.getElementById("firstElement").style.removeProperty('display');
      }
      if (res.response.responseFirstChart) {
        getDrawGraphicFirst(res.response.responseFirstChart, setOptions1);
        document.getElementById("secondElement").style.removeProperty('display');
      }
       if (res.response.responseSecondChart) {
        getDrawGraphicSecond(res.response.responseSecondChart, setOptions2);
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
    type: 'bar',
    data:data,
    plugins: [ChartDataLabels],
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
    type: 'pie',
    data:data,
    plugins: [ChartDataLabels],
    options: setOptions,
  });
}


//-----CATALOG
function get_catalog() 
{
  fetch(url + 'infosync/scripts/run/', {
      method: 'POST',
      body: JSON.stringify({
        script_id: 121299,
        option: 'get_catalog',
      }),
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+userJwt
      },
    })
    .then(res => res.json())
    .then(res => {
    if (res.success) {
      if (res.response.data.length){
        data = res.response.data;
        data.sort((a, b) => {
          let lowerA = a.toLowerCase();
          let lowerB = b.toLowerCase();
          if (lowerA > lowerB) return 1;
          if (lowerA < lowerB) return -1;
          return 0;
        });

        $("#cliente").empty();
        $('#cliente').append('<option value="">--Seleccione--</option>');
        for (i = 0; i <data.length; i++) {
          value = res.response.data[i];
          $('#cliente').append('<option value="'+ value +'">'+value+'</option>');
        }
      }
    } 
  })
};