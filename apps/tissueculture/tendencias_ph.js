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
    get_catalog_productCode();
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
  ///---Selector
  $(document).ready(function(){
    //----Función que escucha al selector de params
    $("#productCode").on('select2:select', function(e){
      var data = e.params.data;
      get_lotNumber(data.id);
    })
  })
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

  drawFirstElement(data1Example, setOptions1)
  document.getElementById("graphicFirst").style.removeProperty('display');


  drawSecondElement(data2, setOptions2)
  document.getElementById("graphicSecond").style.removeProperty('display');

}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from").value;
  let date_to = document.getElementById("date_to").value;  
  let productCode = document.getElementById("productCode").value;  
  let lotNumber = document.getElementById("lotNumber").value;  
  getFirstElement(date_to, date_from, productCode, lotNumber);
};

function getFirstElement(dateTo, dateFrom, productCode, lotNumber){
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
      productCode: productCode,
      lotNumber: lotNumber,
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


      if (res.response.firstElement) {
        getDrawTable('firstElement', columsTable1, res.response.firstElement);
        document.getElementById("firstElement").style.removeProperty('display');
      }
      
      if (res.response.secondElement) {
        console.log('res.response.secondElement',res.response.secondElement)
        drawFirstElement(res.response.secondElement, setOptions1);
        document.getElementById("secondElement").style.removeProperty('display');
      }

      if (res.response.thirdElement) {
        drawSecondElement(res.response.thirdElement, setOptions2);
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
//-----CHART COLORS
function setFormatColor(data){
  let array_colors = getPAlleteColors(7,data['datasets'].length);
  if (data['datasets'].length > 0) {
    for (var i = 0; i < data['datasets'].length; i++) {
     let type = data['datasets'][i]['type'];
     if(type != 'line'){
       data['datasets'][i]['backgroundColor'] = array_colors[i];
       data['datasets'][i]['borderColor'] = array_colors[i];
     }
    }
  }
  return data
}


//-----TABLES
function getDrawTable(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    height:"400px",
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
function drawFirstElement(datasets, dataconfig){
  //---CHART
  var ctx = document.getElementById('graphicFirst').getContext('2d');
  
  if (chart1) {
    chart1.destroy();
  }
  newDatasets = setFormatColor(datasets)
  chart1 = new Chart(ctx, {
    type: 'line',
    data: newDatasets,
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
  newDatasets = setFormatColor(datasets)
  chart2 = new Chart(ctx, {
    type: 'bubble',
    data: datasets,
    //plugins: [ChartDataLabels],
    options: dataconfig
  });
}


//-----CATALOGS
function get_catalog_productCode() 
{
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_name: "get_report_filters.py",
      filters: ["products"],
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (res.response.productCode){
        $('#productCode').select2({
          placeholder: 'Select',
          allowClear: true, 
          selectionCssClass: "select2-selection",
        });
        $("#productCode").empty();
        $("#productCode").append("<option value=''/></option> ")
        for (i = 0; i < res.response.productCode.length; i++) {
          value = res.response.productCode[i]
          $('#productCode').append('<option value="'+ value +'">'+value+'</option>');
        }
      }
    }
  })
};

function get_lotNumber(id)
{
  fetch(url + 'infosync/scripts/run/',{
    method: 'POST',
    body: JSON.stringify({
      script_id: 112655,
      option:"getLotNumber",
      product_code: id
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if(res.success){
      if(res.response.json){
        //----Lot number
        $('#lotNumber').select2({
          placeholder: 'Select',
          allowClear: true,
          selectionCssClass: "select2-selection",
        });
        $("#lotNumber").empty();
        $("#lotNumber").append("<option value=''/></option> ")
        let dataLotNumber = res.response.json['lotNumber'];
        for(let i = 0; i < dataLotNumber.length; i++){
          value = dataLotNumber[i];
          $("#lotNumber").append('<option value="' + value + '">'+value+'</option>');
        }
      }
    }
  })
}
