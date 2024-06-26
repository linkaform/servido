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

    console.log('Entro al reporte');
    hideElement("inicio_ses");
    unhideElement("close_sesion");
    getCompanyLogo(userParentId);
    userId = us;
    userJwt = jw;
    userName = getCookie("userName");
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
    unHideReportElements();
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
  unhideElement("inicio_ses");
}

function loadDemoData(){
  unhideElement("title_demo")
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');

  getDrawTable('firstElement', columsData1, dataTable1);
  document.getElementById("firstElement").style.removeProperty('display');

  drawGraphicFirst(dataChart1, setOptions1);
  document.getElementById("graphicFirst").style.removeProperty('display');

  drawGraphicSecond(dataChart2, setOptions2);
  document.getElementById("graphicSecond").style.removeProperty('display');
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
      servicio: servicio,
      cliente: cliente,
      tecnico: tecnico,
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
      if (res.response.json.firstElement.data) {
        console.log('drawFirstElement.........');
        getDrawTable('firstElement', columsTable1, res.response.json.firstElement.data);
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

//----Request
function getInformationRequest(){
  //---Get filters
  let date_from = $("#date_from").val();
  let date_to = $("#date_to").val();
  let company = $("#company").val();

  if(date_from != '' && date_to!= ''){
    //----Hide Css
    $("#divContent").hide();
    $('.load-wrapp').show();
    $('.title_tables').hide();

    fetch(url + 'infosync/scripts/run/', {
      method: 'POST',
      body: JSON.stringify({
        script_id: scriptId,
        date_from: date_from,
        date_to: date_to,
        company: company,
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
        //----Data
        let data = res.response;
        if(data.response_table){
          getDrawTable('firstElement', columsData1, data.response_table);
          document.getElementById("firstElement").style.removeProperty('display');
        }
        if(data.response_graphic1){
          drawGraphicFirst(data.response_graphic1, setOptions1);
          document.getElementById("graphicFirst").style.removeProperty('display');
        }
        if(data.response_graphic2){
          drawGraphicSecond(data.response_graphic2, setOptions2);
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
  }else{
    Swal.fire({
      title: 'Error',
      html: 'Seleccione el periodo de fechas'
    });
  }
}



//-----TABLES
function getDrawTable(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    height:"395px",
    layout:"fitDataTable",
    data:tableData,
    resizableRows:false,
    dataTree:true,
    textDirection:"ltr",
    columns:columnsData,
    pagination:true, 
    paginationSize:10,
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
function drawGraphicFirst(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicFirst').getContext('2d');
  if (chart1) {
    chart1.destroy();
  }
  //----Add Color
  let length = data['labels'].length;
  let list_colors = getPAlleteColors(5,length);
  data['datasets'][0]['backgroundColor'] = list_colors;

  chart1 = new Chart(ctx, {
    type: 'bar',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

let chart2;
function drawGraphicSecond(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicSecond').getContext('2d');
  if (chart2) {
    chart2.destroy();
  }
  //----Add Color
  let  length = data['labels'].length;
  let list_colors = getPAlleteColors(5,length);
  data['datasets'][0]['backgroundColor'] = list_colors;
  data['datasets'][0]['borderColor'] = list_colors;
  chart2 = new Chart(ctx, {
    type: 'bar',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}