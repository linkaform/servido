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
let dicCatalog = null;
let dataTable = null;


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
    }else{
      getCatalog();
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
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');


  dataTable = dataTable1;
  getDrawTable('firstElement', columsTable1, dataTable1, 350);
  document.getElementById("divContentFirst").style.removeProperty('display');
  document.getElementById("firstElement").style.removeProperty('display');
  
  drawFirstElement(dataChart1, setOptions1)
  document.getElementById("divContentSecond").style.removeProperty('display');
  document.getElementById("graphicFirst").style.removeProperty('display');
  
  drawSecondElement(dataChart2, setOptions2)
  document.getElementById("divContentThird").style.removeProperty('display');
  document.getElementById("graphicSecond").style.removeProperty('display');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  const date_from = document.getElementById("date_from").value;
  const date_to = document.getElementById("date_to").value;  
  const valueEdificio = document.getElementById("edificio").value;
  const valuePiso = document.getElementById("piso").value;
  const valueCliente = document.getElementById("cliente").value;

  getFirstElement(date_to, date_from, valueEdificio, valuePiso, valueCliente);
};

function getFirstElement(dateTo, dateFrom, edificio, piso, cliente){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      option:'get_query',
      date_to: dateTo,
      date_from: dateFrom,
      edificio: edificio,
      piso: piso,
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

      if (res.response.data.firtsElement) {
        dataTable = res.response.data.firtsElement;
        getDrawTable('firstElement', columsTable1, res.response.data.firtsElement, 350);
        document.getElementById("divContentFirst").style.removeProperty('display');
        document.getElementById("firstElement").style.removeProperty('display');
      }
      if (res.response.data.secondElement) {
        drawFirstElement(res.response.data.secondElement, setOptions1)
        document.getElementById("divContentSecond").style.removeProperty('display');
        document.getElementById("graphicFirst").style.removeProperty('display');
      }
      if (res.response.data.thirdElement) {
        drawSecondElement(res.response.data.thirdElement, setOptions2)
        document.getElementById("divContentThird").style.removeProperty('display');
        document.getElementById("graphicSecond").style.removeProperty('display');
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

//-----CATALOGS
function getCatalog() {
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
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
      if (res && res.response && res.response.data) {
        dicCatalog = res.response.data;
        setSelectors();
      } 
    } 
  })
}

function setSelectors() {
  let edificios = [...new Set(dicCatalog.map(item => item.edificio))];
  edificios.sort();
  //----New Options
  const select = document.getElementById("edificio");
  edificios.forEach(item => {
    let newOption = document.createElement("option");
    newOption.value = item;      
    newOption.text = item;       
    select.appendChild(newOption); 
  });
}

function changeSelectors(type){
    console.log('entra a cambio de selector ',type)
    const valueEdificio = document.getElementById("edificio").value;
    const valuePiso = document.getElementById("piso").value;

    if (type == 'piso' && valueEdificio!=''){
      console.log('Entra a piso')
      //---Clean Selects
      $("#piso").empty();
      $("#cliente").empty();

      const defaultOptionPiso = $("<option>", {
          value: "",
          text: "--Seleccione--"
      });
      const defaultOptionCliente = $("<option>", {
          value: "",
          text: "--Seleccione--"
      });

      $("#piso").append(defaultOptionPiso);
      $("#cliente").append(defaultOptionCliente);

      //---Order
      const listFilter = dicCatalog.filter(item => item.edificio === valueEdificio);
      let pisos = [...new Set(listFilter.map(item => item.piso))];
      pisos.sort();

      //----New Options
      const selectPiso = document.getElementById("piso");
      pisos.forEach(item => {
        let newOption = document.createElement("option");
        newOption.value = item;      
        newOption.text = item;       
        selectPiso.appendChild(newOption); 
      });

    }else if (type == 'cliente' && valuePiso!=''){
      //---Clean Select
      $("#cliente").empty();
      
      const defaultOptionCliente = $("<option>", {
        value: "",
        text: "--Seleccione--"
      });
      
      $("#cliente").append(defaultOptionCliente);

      //---Order
      const selectCliente = document.getElementById("cliente");
      const listFilter = dicCatalog.filter(item => item.piso === valuePiso);
      let clientes = [...new Set(listFilter.map(item => item.cliente))];
      clientes.sort();

      //----New Options
      clientes.forEach(item => {
        let newOption = document.createElement("option");
        newOption.value = item;      
        newOption.text = item;       
        selectCliente.appendChild(newOption); 
      });
    }
}

//-----TABLES
function getDrawTable(id, columnsData, tableData, height, expanded = false){
    let table = new Tabulator("#" + id, {
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
        //row.getElement().style.color = '#FFFFFF';
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
  getDrawTable('firstElement', columsTable1, dataTable, 350, expanded = isExpanded);
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
  //---Color
  array_colors = getPAlleteColors(13,datasets['datasets'].length);
  for (let i = 0; i < datasets['datasets'].length; i++) {
    datasets['datasets'][i]['backgroundColor'] = array_colors[i];
  }
  chart1 = new Chart(ctx, {
    type: 'bar',
    data: datasets,
    //plugins: [ChartDataLabels],
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
  //---Color
  array_colors = getPAlleteColors(13,datasets['datasets'].length);
  for (let i = 0; i < datasets['datasets'].length; i++) {
    datasets['datasets'][i]['backgroundColor'] = array_colors;
  }

  chart2 = new Chart(ctx, {
    type: 'pie',
    data: datasets,
    //plugins: [ChartDataLabels],
    options: dataconfig
  });
}
