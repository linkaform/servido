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
$('.div_card').hide();
hideElement("title_demo");
hideElement("firstParameters");
hideElement("firstElement");
hideElement("secondElement");
hideElement("thirdElement");
hideElement("fourthElement");
hideElement("fivethElement");
hideElement("sixthElement");
hideElement("seventhElement");

window.onload = function(){
  var qs = urlParamstoJson();
  var formNode = document.getElementById("appCont");
  for(var key in qs){
    if (key === 'script_id' ){
      scriptId = parseInt(qs[key]);
    }
    if (key === 'env') {
      if (qs[key] === 'test'){
         url = "http://127.0.0.1:8000/api/";
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
    //----Dates Assing
    date = new Date();
    primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $("#date_from").val(primerDia.toISOString().substring(0, 10));
    $("#date_to").val(ultimoDia.toISOString().substring(0, 10));


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
  unhideElement("firstElement-Buttons");
  unhideElement("firstParameters");
  unhideElement("close_sesion");
}

function loadDemoData(){
  unhideElement("title_demo")
  $('.title_tables').show();

  getDrawGraphicFirst(dataElement, setOptions1)
  getDrawGraphicSecond(dataElement, setOptions2)
  getDrawGraphicThird(dataElement, setOptions3)
  getDrawGraphicFourth(dataElement, setOptions4)
  getDrawGraphicFiveth(dataElement2, setOptions5)

  getDrawTable('sixthElement', columsTable1, dataTable1);
  getDrawTable('seventhElement', columsTable2, dataTable2);
  $('.div_card').show();
  document.getElementById("firstParameters").style.removeProperty('display');
  document.getElementById("firstElement").style.removeProperty('display');
  document.getElementById("secondElement").style.removeProperty('display');
  document.getElementById("thirdElement").style.removeProperty('display');
  document.getElementById("fourthElement").style.removeProperty('display');
  document.getElementById("fivethElement").style.removeProperty('display');
  document.getElementById("sixthElement").style.removeProperty('display');
  document.getElementById("seventhElement").style.removeProperty('display');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");
  let plant_code = document.getElementById("plant_code");
  let stage = document.getElementById("stage");
  getFirstElement(date_to.value, date_from.value, plant_code.value, stage.value);
};

//-----PETICION
function getFirstElement(dateTo, dateFrom, plantCode, stage){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();


  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_to: dateTo,
      date_from: dateFrom,
      plant_code: plantCode,
      stage: stage,
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
      if (res.response.firstElement.tabledata) {
        $('#textAlert1').text(res.response.firstElement.tabledata.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      }
      if (res.response.secondElement.tabledata) {
        $('#textAlert2').text(res.response.secondElement.tabledata.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      }
      if (res.response.thirdElement.tabledata) {
        $('#textAlert3').text(res.response.thirdElement.tabledata.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      }
      if (res.response.firstElement.tabledata && res.response.secondElement.tabledata) {
        percentage = (res.response.firstElement.tabledata/res.response.secondElement.tabledata)
        percentage = (percentage *100)

        var data = [
          {
            domain: { x: [0, 1], y: [0, 1] },
            value: percentage,
            title: { text: "Percentage %" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
              axis: { range: [null, 100], tickwidth: 1},
              bar: { color: "#f7bd53" },
              bgcolor: "white",
              borderwidth: 2,
              bordercolor: "gray",
              steps: [
                { range: [0, 70], color: "#ff5252" },
                { range: [71, 90], color: "#fdfc8b" },
                { range: [91, 100], color: "#8db600" }
              ],
            },
          }
        ];

        var layout = { width: 400, height: 220, margin: { t: 0 , b: 0 } };
        Plotly.newPlot('GaugeTest', data, layout);
      }

      if (res.response.fourthElement.tabledata) {
        dataElementFormat = getFormatterFirst(res.response.fourthElement.tabledata);
        getDrawGraphicFirst(dataElementFormat, setOptions1)
        document.getElementById("firstElement").style.removeProperty('display');
      }
      if (res.response.fifthElement.tabledata) {
        dataElementFormat = getFormatterSecond(res.response.fifthElement.tabledata);
        getDrawGraphicSecond(dataElementFormat, setOptions2)
        document.getElementById("secondElement").style.removeProperty('display');
      }
      if (res.response.sixthElement.tabledata) {
        dataElementFormat = getFormatterThird(res.response.sixthElement.tabledata);
        getDrawGraphicThird(dataElementFormat, setOptions3)
        document.getElementById("thirdElement").style.removeProperty('display');
      }
      if (res.response.seventhElement.tabledata) {
        dataElementFormat = getFormatterFourth(res.response.seventhElement.tabledata);
        getDrawGraphicFourth(dataElementFormat, setOptions4)
        document.getElementById("fourthElement").style.removeProperty('display');
      }
      if (res.response.ninthElement.tabledata) {
        getDrawTable('sixthElement', columsTable1, res.response.ninthElement.tabledata);
        document.getElementById("sixthElement").style.removeProperty('display');
      }
      if (res.response.tenthElement.tabledata) {
        getDrawTable('seventhElement', columsTable2, res.response.tenthElement.tabledata);
        document.getElementById("seventhElement").style.removeProperty('display');
      }
      if (res.response.fourthElementCutDay.tabledata){
        dataElementFormat = getFormatterFiveth(res.response.fourthElementCutDay.tabledata);
        getDrawGraphicFiveth(dataElementFormat, setOptions5)
        document.getElementById("fivethElement").style.removeProperty('display');
      }
      if (res.response.fourthElementWeek.tabledata){
        dataElementFormat = getFormatterSixth(res.response.fourthElementWeek.tabledata);
        getDrawGraphicSixth(dataElementFormat, setOptions6)
        document.getElementById("eigthElement").style.removeProperty('display');
      }
      $('.div_card').show();
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
    dataTreeStartExpanded:true,
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
    type: 'pie',
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
    type: 'bar',
    data:data,
    plugins: [ChartDataLabels],
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
    type: 'bar',
    data:data,
    plugins: [ChartDataLabels],
    options: setOptions,
  });
}

let chart4;
function getDrawGraphicFourth(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicFourth').getContext('2d');

  if (chart4) {
    chart4.destroy();
  }

  chart4 = new Chart(ctx, {
    type: 'pie',
    data:data,
    plugins: [ChartDataLabels],
    options: setOptions,
  });
}

let chart5;
function getDrawGraphicFiveth(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicFiveth').getContext('2d');

  if (chart5) {
    chart5.destroy();
  }

  chart5 = new Chart(ctx, {
    type: 'bar',
    data:data,
    plugins: [ChartDataLabels],
    options: setOptions,
  });
}

let chart6;
function getDrawGraphicSixth(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicSixth').getContext('2d');

  if (chart6) {
    chart6.destroy();
  }

  chart6 = new Chart(ctx, {
    type: 'pie',
    data:data,
    //plugins: [ChartDataLabels],
    options: setOptions,
  });
}

//-----FORMATER
function getFormatterFirst(data){
  labelsValue = data.map(function(e) {
    return e.team + ' / ' + e.total;
  });

  dataValue = data.map(function(e) {
    return e.percentage;
  });

  array_colors = getPAlleteColors(7,dataValue.length);

  dataElement1 = {
    labels: labelsValue,
    datasets: [
      {
        label: 'Valores:',
        data: dataValue,
        backgroundColor: array_colors,
      },
    ]
  }

  return dataElement1;
}

function getFormatterSecond(data){
  labelsValue = data.map(function(e) {
    return e.plant_code + ' - '+ e.total;
  });

  dataValue = data.map(function(e) {
    return e.total;
  });

  array_colors = getPAlleteColors(7,dataValue.length);

  dataElement2 = {
    labels: labelsValue,
    datasets: [
      {
        label: 'Valores:',
        data: dataValue,
        backgroundColor: array_colors,
      },
    ]
  }

  return dataElement2;
}

function getFormatterThird(data){
  labelsValue = data.map(function(e) {
    return e.plant_code + ' - '+ e.total;
  });

  dataValue = data.map(function(e) {
    return e.total;
  });

  array_colors = getPAlleteColors(7,dataValue.length);

  dataElement3 = {
    labels: labelsValue,
    datasets: [
      {
        label: 'Valores:',
        data: dataValue,
        backgroundColor: array_colors,
      },
    ]
  }

  return dataElement3;
}

function getFormatterFourth(data){
  labelsValue = data.map(function(e) {
    return 'Stage ' + e.stage + ' / ' + e.total;
  });

  dataValue = data.map(function(e) {
    return e.percentage;
  });

  array_colors = getPAlleteColors(7,dataValue.length);

  dataElement4 = {
    labels: labelsValue,
    datasets: [
      {
        label: 'Valores:',
        data: dataValue,
        backgroundColor: array_colors,
      },
    ]
  }

  return dataElement4;
}


function getFormatterFiveth(data){
  labelsValue = data.map(function(e) {
    return  e.date;
  });

  dataValueEaches = data.map(function(e) {
    return e.eaches;
  });

  dataValueProduced = data.map(function(e) {
    return e.produced;
  });

  arrayColorsProd = getPAlleteColors(7,dataValueEaches.length);

  arrayColorsEaches = getPAlleteColors(7,dataValueProduced.length);

  dataElement5 = {
    labels: labelsValue,
    datasets: [
      {
        label: 'Containers',
        type: "line",
        borderColor: "#2d6073",
        yAxisID: "ay",
        data: dataValueProduced,
        fill: false,
      },
      {
        label: 'Eaches',
        type: "line",
        borderColor: "#65b8a6",
        yAxisID: "ay1",
        data: dataValueEaches,
        fill: false,
      },
    ]
  }

  return dataElement5;
}

function getFormatterSixth(data){
  labelsValue = data.map(function(e) {
    return 'Week: '+ e.cut_week;
  });

  dataValue = data.map(function(e) {
    return e.eaches;
  });

  array_colors = getPAlleteColors(7,dataValue.length);

  dataElement1 = {
    labels: labelsValue,
    datasets: [
      {
        label: 'Eaches',
        data: dataValue,
        backgroundColor: array_colors,
      },
    ]
  }

  return dataElement1;
}
