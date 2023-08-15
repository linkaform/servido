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

$('.div-card').hide();
$('#divContent').hide();
$('#divOptions').hide();
$('#title_report').hide();
$('.title_tables').hide();
hideElement("title_demo");
hideElement("firstParameters");
hideElement("div_alert1");
hideElement("div_alert2");
hideElement("firstElement");
hideElement("secondElement");

window.onload = function(){
  var qs = urlParamstoJson();
  var formNode = document.getElementById("appCont");
	for(var key in qs){
    if (key === 'script_id' ){
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
    //---MULTIPLE
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
  console.log('DEMO')
  unhideElement("title_demo")
  $('.title_tables').show();
  $('#divContent').show();
  $('.div-card').show();
  document.getElementById("firstParameters").style.removeProperty('display');

  getDrawGauge('gaugeFirst', dataGauge1)
  document.getElementById("firstElement").style.removeProperty('display');

  drawFirstElement(data1, setOptions1)
  document.getElementById("secondElement").style.removeProperty('display');
  document.getElementById("graphicFirst").style.removeProperty('display');


  getDrawTable('thirdElement', columsTable1, dataTable1, 350);
  document.getElementById("thirdElement").style.removeProperty('display');

  getDrawTable('fourthElement', columsTable2, dataTable2, 350);
  document.getElementById("thirdElement").style.removeProperty('display');


  drawSecondElement(data2, setOptions2)
  document.getElementById("fivethElement").style.removeProperty('display');
  document.getElementById("graphicSecond").style.removeProperty('display');


  drawThirdElement(data3, setOptions3)
  document.getElementById("sixthElement").style.removeProperty('display');
  document.getElementById("graphicThird").style.removeProperty('display');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  //--show alert
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");
  let periodo = document.getElementById("periodo");
  firstElement =getFirstElement(date_from.value, date_to.value, periodo.value);
};


function getFirstElement(date_from, date_to, periodo){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();
  $('.div_card').hide();
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_from: date_from,
      date_to: date_to,
      periodo: periodo,
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
      $('.div-card').show();
      $('.load-wrapp').hide();
      $("#divContent").show();
      $('.title_tables').show();
      //----CLEAN
      hideElement("firstElement");
      hideElement("secondElement");
      hideElement("thirdElement");
      hideElement("fourthElement");
      hideElement("fivethElement");
      hideElement("sixthElement");
      $('#titleCard1').text('')
      $('#textCard1').text('')
      $('#titleCard2').text('')
      $('#textCard2').text('')
      $('#titleCard3').text('')
      $('#textCard3').text('')
      $('#titleCard4').text('')
      $('#textCard4').text('')
      $('#titleCard5').text('')
      $('#textCard5').text('')
      $('#titleCard6').text('')
      $('#textCard6').text('')

      if (res.response.json.firstElement) {
        getDrawGauge('gaugeFirst', res.response.json.firstElement)
        document.getElementById("firstElement").style.removeProperty('display');
      }
      if (res.response.json.secondElement) {
        drawFirstElement(res.response.json.secondElement, setOptions1)
        document.getElementById("secondElement").style.removeProperty('display');
        document.getElementById("graphicFirst").style.removeProperty('display');
      }
      if (res.response.json.thirdElement.data.length) {
        getDrawTable('thirdElement', columsTable1, res.response.json.thirdElement.data, 350);
        document.getElementById("thirdElement").style.removeProperty('display');
      }
      if (res.response.json.fourthElement.data.length) {
        getDrawTable('fourthElement', columsTable2, res.response.json.fourthElement.data, 350);
        document.getElementById("fourthElement").style.removeProperty('display');
      }
      if (res.response.json.fivethElement) {
        drawSecondElement(res.response.json.fivethElement, setOptions2)
        document.getElementById("fivethElement").style.removeProperty('display');
        document.getElementById("graphicSecond").style.removeProperty('display');
      }
      if (res.response.json.sixthElement) {
        drawThirdElement(res.response.json.sixthElement, setOptions3)
        document.getElementById("sixthElement").style.removeProperty('display');
        document.getElementById("graphicThird").style.removeProperty('display');
      }
      if (res.response.json.cards.cardFirst) {
        $('#titleCard1').text(res.response.json.cards.cardFirst.label)
        $('#textCard1').text(res.response.json.cards.cardFirst.value)
      }
      if (res.response.json.cards.cardSecond) {
        $('#titleCard2').text(res.response.json.cards.cardSecond.label )
        $('#textCard2').text(res.response.json.cards.cardSecond.value )
      }
      if (res.response.json.cards.cardThree) {
        $('#titleCard3').text(res.response.json.cards.cardThree.label )
        $('#textCard3').text(res.response.json.cards.cardThree.value )
      }
      if (res.response.json.cards.cardFourth) {
        $('#titleCard4').text(res.response.json.cards.cardFourth.label )
        $('#textCard4').text(res.response.json.cards.cardFourth.value )
      }
      if (res.response.json.cards.cardFiveth) {
        $('#titleCard5').text(res.response.json.cards.cardFiveth.label )
        $('#textCard5').text(res.response.json.cards.cardFiveth.value )
      }
      if (res.response.json.cards.cardSixth) {
        $('#titleCard6').text(res.response.json.cards.cardSixth.label )
        $('#textCard6').text(res.response.json.cards.cardSixth.value )
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
    height:"500px",
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

//-----GAUGE
function getDrawGauge(id, data){
  var layout = { width: 400, height: 400, margin: { t: 0 , b: 0 } };
  Plotly.newPlot(id, data, layout);
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
  array_colors = getPAlleteColors(8, datasets['labels'].length);
  datasets['datasets'][0]['backgroundColor'] = array_colors

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
  array_colors = getPAlleteColors(8, datasets['labels'].length);
  datasets['datasets'][0]['backgroundColor'] = array_colors


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
  array_colors = getPAlleteColors(8, datasets['labels'].length);
  datasets['datasets'][0]['backgroundColor'] = array_colors


  chart3 = new Chart(ctx, {
    type: 'bar',
    data: datasets,
    plugins: [ChartDataLabels],
    options: dataconfig
  });
}
