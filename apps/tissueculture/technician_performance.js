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
$("#divContent").hide();

hideElement("title_demo");
hideElement("firstParameters");
hideElement("firstElement");

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
      if (qs[key] === 'local'){
         url = "http://192.168.0.25:8000/api/";
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
      $('#divContent').show();
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

  getDrawTable('firstElement', columsTable1, dataTable1);
  document.getElementById("firstElement").style.removeProperty('display');

  getDrawGraphicFirst(dataElement1, setOptions1)
  document.getElementById("secondElement").style.removeProperty('display');

  getDrawGraphicSecond(dataElement2, setOptions2)
  document.getElementById("thirdElement").style.removeProperty('display');

  getDrawTable('fourthElement', columsTable2, dataTable2);
  document.getElementById("fourthElement").style.removeProperty('display');

  getDrawTable('fivethElement', columsTable3, dataTable3);
  document.getElementById("fivethElement").style.removeProperty('display');

  getDrawGraphicThird(dataElement3, setOptions3)
  document.getElementById("sixthElement").style.removeProperty('display');

  getDrawTable('seventhElement', columsTable4, dataTable4);
  document.getElementById("seventhElement").style.removeProperty('display');

  getDrawGraphicFourth(dataElement4, setOptions4)
  document.getElementById("eigthElement").style.removeProperty('display');

  getDrawGraphicFiveth(dataElement5, setOptions5)
  document.getElementById("nineElement").style.removeProperty('display');

  getDrawGraphicSixth(dataElement6, setOptions6)
  document.getElementById("tenthElement").style.removeProperty('display');

  getDrawTable('eleventhElement', columsTable5, dataTable5);
  document.getElementById("eleventhElement").style.removeProperty('display');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");  
  getFirstElement(date_to.value, date_from.value, '200px');
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
      console.log(res.response)
      
      if (res.response.json.firstElement.tabledata) {
        getDrawTable('firstElement', columsTable1, res.response.json.firstElement.tabledata);
        document.getElementById("firstElement").style.removeProperty('display');
      }

      if (res.response.json.secondElement) {
        getDrawGraphicFirst(res.response.json.secondElement, setOptions1)
        document.getElementById("secondElement").style.removeProperty('display');
      }

      if (res.response.json.thirdElement) {
        getDrawGraphicSecond(res.response.json.thirdElement, setOptions2)
        document.getElementById("thirdElement").style.removeProperty('display');
      }

      if (res.response.json.fourthElement.tabledata) {
        getDrawTable('fourthElement', columsTable2, res.response.json.fourthElement.tabledata);
        document.getElementById("fourthElement").style.removeProperty('display');
      }

      if (res.response.json.fivethElement.tabledata) {
        getDrawTable('fivethElement', columsTable3, res.response.json.fivethElement.tabledata);
        document.getElementById("fivethElement").style.removeProperty('display');
      }

      if (res.response.json.sixthElement) {
        getDrawGraphicThird(res.response.json.sixthElement, setOptions3)
        document.getElementById("sixthElement").style.removeProperty('display');
      }

      if (res.response.json.seventhElement.tabledata) {
        getDrawTable('seventhElement', columsTable4, res.response.json.seventhElement.tabledata);
        document.getElementById("seventhElement").style.removeProperty('display');
      }

      if (res.response.json.eighthElement) {
        getDrawText(res.response.json.eighthElement)
        getDrawGraphicFourth(res.response.json.eighthElement, setOptions4);
        document.getElementById("eigthElement").style.removeProperty('display');
      }

      if (res.response.json.ninthElement) {
        getDrawGraphicFiveth(res.response.json.ninthElement, setOptions5)
        document.getElementById("nineElement").style.removeProperty('display');
      }

      if (res.response.json.tenthElement) {
        getDrawGraphicSixth(res.response.json.tenthElement, setOptions6)
        document.getElementById("tenthElement").style.removeProperty('display');
      }

      if (res.response.json.eleventhElement.tabledata) {
        getDrawTable('eleventhElement', columsTable5, res.response.json.eleventhElement.tabledata);
        document.getElementById("eleventhElement").style.removeProperty('display');
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
  .catch(function(error)
  {
    Swal.fire({
      title: 'Error',
      html: res.error
    });
    $('.load-wrapp').hide();
  });
};

//-----CARDS
function getDrawText(data){
  total = 0
  count = 0
  datasets   = data.datasets[0].data
  if (datasets.length>0){
    for (var i = 0; i  <= datasets.length; i++) {
      if (i < 3) {
        total += datasets[i]
        $("#textAlert"+i).text(datasets[i]+' hr')
      }
    }
  }
  $("#textAlert3").text(total)

}

//-----TABLES
function getDrawTable(id, columnsData, tableData, size){
  var  table = new Tabulator("#" + id, {
    height:size,
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

  //----DATA COLORS
  if (data.datasets[0].data.length){
    array_colors = getPAlleteColors(7,data.datasets[0].data.length);
    data.datasets[0].backgroundColor = array_colors
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

  //----DATA COLORS
  if (data.datasets[0].data.length){
    array_colors = getPAlleteColors(7,data.datasets[0].data.length);
    data.datasets[0].backgroundColor = array_colors
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

  //----DATA COLORS
  if (data.datasets[0].data.length){
    array_colors = getPAlleteColors(7,data.datasets[0].data.length);
    data.datasets[0].backgroundColor = array_colors
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

  //----DATA COLORS
  if (data.datasets[0].data.length){
    array_colors = getPAlleteColors(7,data.datasets[0].data.length);
    data.datasets[0].backgroundColor = array_colors
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

  //----DATA COLORS
  if (data.datasets[0].data.length){
    array_colors = getPAlleteColors(7,data.datasets[0].data.length);
    data.datasets[0].backgroundColor = array_colors
  }
  
  chart6 = new Chart(ctx, {
    type: 'bar',
    data:data,
    plugins: [ChartDataLabels],
    options: setOptions,
  });
}

