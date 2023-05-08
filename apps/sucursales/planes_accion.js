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







hideElement("download_graphicFirst");
hideElement("download_graphicSecond");
hideElement("download_graphicThird");
hideElement("download_graphicFourth");
hideElement("download_graphicFiveth");
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
    getSucursales();
    getRegionales();
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
  document.getElementById("firstElement").style.removeProperty('display');
  document.getElementById("secondElement").style.removeProperty('display');
  getDrawTable('firstElement', columsTable1, dataTable1);
  getDrawTable('secondElement', columsTable2, dataTable2);
  getDrawGraphicFirst(data1, setOptions1);
  getDrawGraphicSecond(data2, setOptions2);
  getDrawGraphicThird(data3, setOptions3);
  getDrawGraphicFourth(data4, setOptions4);
  getDrawGraphicFiveth(data5, setOptions5);
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
  let sucursal = document.getElementById("sucursal");  
  let seccion = document.getElementById("seccion");  
  let regional = document.getElementById("catalog-79950-level-1");  
  let check = 'on';
  if (document.getElementById('input_check').checked)
  {
    check = 'off';
  }
    getFirstElement(date_to.value, date_from.value, sucursal.value, seccion.value, regional.value, check);
};

function getFirstElement(dateTo, dateFrom, sucursal, seccion, regional, check){
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
      sucursal: sucursal,
      seccion: seccion,
      regional: regional,
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
      //------CLEAN
      $("#download_graphicFirst").hide();
      $("#download_graphicSecond").hide();
      $("#download_graphicThird").hide();
      $("#download_graphicFourth").hide();
      $("#download_graphicFiveth").hide();


      //----Date
      getTextTitle();
      if (res.response.json.firstElement && res.response.json.firstElement.data) {
        getDrawTable('secondElement', columsTable2, res.response.json.firstElement.data, check);
        document.getElementById("secondElement").style.removeProperty('display');
      }
      if (res.response.json.secondElement) {
        getDrawGraphicFirst(res.response.json.secondElement, setOptions1);
        $("#download_graphicFirst").show();
        document.getElementById("thirdElement").style.removeProperty('display');
      }
      if (res.response.json.thirdElement) {
        getDrawGraphicSecond(res.response.json.thirdElement, setOptions2);
        $("#download_graphicSecond").show();
        document.getElementById("fourthElement").style.removeProperty('display');
      }
      if (res.response.json.fourthElement) {
        getDrawGraphicThird(res.response.json.fourthElement, setOptions3);
        $("#download_graphicThird").show();
        document.getElementById("fivethElement").style.removeProperty('display');
      }
      if (res.response.json.fivethElement) {
        getDrawGraphicFourth(res.response.json.fivethElement, setOptions4);
        $("#download_graphicFourth").show();
        document.getElementById("sixthElement").style.removeProperty('display');
      }
      if (res.response.json.sixthElement) {
        getDrawGraphicFiveth(res.response.json.sixthElement, setOptions5);
        $("#download_graphicFiveth").show();
        document.getElementById("seventhElement").style.removeProperty('display');
      }
      if (res.response.json.seventhElement && res.response.json.seventhElement.data) {
        getDrawTable('firstElement', columsTable1, res.response.json.seventhElement.data, check);
        $("#download_graphicFiveth").show();
        document.getElementById("firstElement").style.removeProperty('display');
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
function getDrawTable(id, columnsData, tableData, checked='off'){
  //----Expanded
  valueExpanded = false;
  if (checked == 'on'){
    valueExpanded = true;
  }
  //-----Table
  var  table = new Tabulator("#" + id, {
    height:"265px",
    layout:"fitDataTable",
    data:tableData,
    resizableRows:false,
    dataTree:true,
    dataTreeStartExpanded:valueExpanded,
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
    type: 'bar',
    data:data,
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
    type: 'bar',
    data:data,
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
    options: setOptions,
  });
}

//----TEXT
function getTextTitle(){
  date = new Date();
  date_from = date.toLocaleDateString();
  date_to = date.toLocaleDateString();

 if ($('#date_from').val() !== ""){
    date_from = new Date($('#date_from').val());
    date_from.setDate(date_from.getDate() + 1)
    date_from = date_from.toLocaleDateString()
  }

 if ($('#date_to').val() !== ""){
    date_to = new Date($('#date_to').val());
    date_to.setDate(date_to.getDate() + 1)
    date_to = date_to.toLocaleDateString()
  }
  
  $('.text_date').text(' del '+date_from+' al '+ date_to)
}

//---CATALOG
function getSucursales(){
  //--Form ID , Catalog, Level , Type
  getCatalog(82135,79950,1,catalogType='custom');
}

function getRegionales(){
  regionales = getCatalog(83987, 79950, 1, catalogType='select')
}

function customCatalogView(res){
  if (res){
    $("#sucursal").empty();
    $('#sucursal').append('<option value="--">--Seleccione--</option>');

    for (i = 0; i < res.rows.length; i++) {
      $('#sucursal').append('<option value="'+res.rows[i].key+'">'+res.rows[i].key+'</option>');
    }
  }
}

