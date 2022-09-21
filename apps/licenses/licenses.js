// Reporte Auditoria de Sucursrales
// Librerias: Dynatable y D3 charts

let us = null;
let usTy = null;
let jw = null;
let userId = null;
let userJwt = null;
let userName = null;
let userParentId = null;
var scriptId = null;



$('#divOptions').hide();
$('#title_report').hide();
$('.div_card').hide();
$('.title_tables').hide();

hideElement("title_demo");
hideElement("firstParameters");
hideElement("firstElement");
hideElement("secondElement");
hideElement("thirdElement");
hideElement("fourthElement");
hideElement("fivethElement");



window.onload = function(){
  console.log('ENtra al inciio')
  var qs = urlParamstoJson();
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

    var formNode = document.getElementById("appCont");
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
  if(us != "" && jw != "" || scriptId===null){
    hideElement("inicio_ses");
    unhideElement("close_sesion");
    userId = us;
    userJwt = jw;
    userName = getCookie("userName");
    if (scriptId == null) {
      unhideElement("firstElement");
      console.log('Entra a demo')
      loadDemoData();
    }
    //---HIDE AND SHOW
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
    document.getElementById("firstParameters").style.removeProperty('display');

  } else {
    console.log('ENtra al else')
    unhideElement("inicio_ses");
    hideElement("title_demo");
    $('#divOptions').hide();
    $('#title_report').hide();
    $('.title_tables').hide();
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
  $('.title_tables').show();
  unhideElement("firstParameters");
  unhideElement("firstElement");
  unhideElement("secondElement");
  unhideElement("thirdElement");
  unhideElement("fourthElement");
  unhideElement("fivethElement");
}



function loadDemoData(){
  $("#divContent").show();
  unhideElement("title_demo")
  document.getElementById("firstParameters").style.removeProperty('display');

  getDrawTable('firstElement',columsTable1,dataTable1, '500px');
  document.getElementById("firstElement").style.removeProperty('display');
  getDrawTable('fivethElement',columsTable2,dataTable5, '150px');
  document.getElementById("fivethElement").style.removeProperty('display');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';


function runFirstElement(){
  //--show alert
  let date_since = document.getElementById("date_from");
  firstElement = getFirstElement(date_since.value);
};




function getFirstElement(date_since){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();
  $('.div_card').hide();

  //----Clean
  $("#firstElement").html("");
  $("#secondElement").html("");
  $("#thirdElement").html("");
  $("#fourthElement").html("");
  $("#fivethElement").html("");
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_since: date_since,
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
      console.log(res.response.json);
      if (res.response.json.firstElement.data){
        getDrawTable('firstElement',columsTable1,res.response.json.firstElement.data, '500px');
        document.getElementById("firstElement").style.removeProperty('display');
      }
      if (res.response.json.secondElement.data){
        getDrawTable('secondElement',columsTable1,res.response.json.secondElement.data, '500px');
        document.getElementById("secondElement").style.removeProperty('display');
      }
      if (res.response.json.thirdElement.data){
        getDrawTable('thirdElement',columsTable1,res.response.json.thirdElement.data, '500px');
        document.getElementById("thirdElement").style.removeProperty('display');
      }
      if (res.response.json.fourthElement.data){
        getDrawTable('fourthElement',columsTable1,res.response.json.fourthElement.data, '500px');
        document.getElementById("fourthElement").style.removeProperty('display');
      }
      if (res.response.json.fivethElement.data){
        getDrawTable('fivethElement',columsTable2,res.response.json.fivethElement.data, '150px');
        document.getElementById("fivethElement").style.removeProperty('display');
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
  $('#'+id).empty();
  var table = new Tabulator("#" + id, {
    height: height,
    layout:"fitDataTable",
    //layout:"fitColumns",
    data:tableData,
    // responsiveLayout: "hide",
    resizableRows:true,
    clipboard:true,
    clipboardPasteAction:"replace",
    textDirection:"ltr",
    columns:columnsData,
    renderHorizontal:"virtual",
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


