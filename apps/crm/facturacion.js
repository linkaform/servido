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
  
  getDrawTable('firstElement', columsTable1, dataTable1, '270');
  document.getElementById("firstElement").style.removeProperty('display');

  getDrawGraphic1(data1, setOptions1, 'graphicFirst', 'pie')
  document.getElementById("secondElement").style.removeProperty('display');
  document.getElementById("graphicFirst").style.removeProperty('display');


  getDrawTable('thirdElement', columsTable2, dataTable2,'300');
  document.getElementById("thirdElement").style.removeProperty('display');

  getDrawGraphic2(data2, setOptions2, 'graphicSecond', 'bar')
  document.getElementById("fourthElement").style.removeProperty('display');
  document.getElementById("graphicSecond").style.removeProperty('display');



  getDrawTable('fivethElement', columsTable3, dataTable3,'200');
  document.getElementById("fivethElement").style.removeProperty('display');




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
      console.log(res.response.json)
      if (res.response.json.firstElement.data) {
        getDrawTable('firstElement', columsTable1, res.response.json.firstElement.data, '500px');
        document.getElementById("firstElement").style.removeProperty('display');
      }

      if (res.response.json.secondElement) {
        getDrawGraphic1(res.response.json.secondElement, setOptions1, 'graphicFirst', 'pie')
        document.getElementById("secondElement").style.removeProperty('display');
        document.getElementById("graphicFirst").style.removeProperty('display');
      }


      if (res.response.json.thirdElement.data) {
        getDrawTable('thirdElement', columsTable2, res.response.json.thirdElement.data, '500px');
        document.getElementById("thirdElement").style.removeProperty('display');
      }

      if (res.response.json.fourthElement) {
        getDrawGraphic2(res.response.json.fourthElement, setOptions2, 'graphicSecond', 'bar')
        document.getElementById("fourthElement").style.removeProperty('display');
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

//-----TABLES
function getDrawTable(id, columnsData, tableData, height){
  var  table = new Tabulator("#" + id, {
    height:height+"px",
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

//-----GHRAPICH
let chart1;
function getDrawGraphic1(data, setOptions, canvas, type){
  //---CHART
  var ctx = document.getElementById(canvas).getContext('2d');
  if (chart1) {
    chart1.destroy();
  }

  //---SET COLORS
  array_colors = getPAlleteColors(7,data['labels'].length);
  data['datasets'][0]['backgroundColor'] = array_colors


  chart1 = new Chart(ctx, {
    type: type,
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

let chart2;
function getDrawGraphic2(data, setOptions, canvas, type){
  //---CHART
  var ctx = document.getElementById(canvas).getContext('2d');
  if (chart2) {
    chart2.destroy();
  }

  chart2 = new Chart(ctx, {
    type: type,
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}
