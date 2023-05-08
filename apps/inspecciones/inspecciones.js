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
      //--Catalog
      console.log('entra quí')
      get_catalog(1);
    }
    //--Styles
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
    $("#provincia").multipleSelect('refresh');
    $("#canton").multipleSelect('refresh');
    $("#parroquia").multipleSelect('refresh');
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
  
  getDrawTable('firstElement', columsTable1, dataTable1, '295px');
  document.getElementById("firstElement").style.removeProperty('display');
  

  getDrawTable('secondElement', columsTable2, dataTable2, '380px');
  document.getElementById("secondElement").style.removeProperty('display');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");  
  let date_inspeccion  = document.getElementById("date_inspeccion");        
  let provincia = document.getElementById("provincia");  
  let canton = document.getElementById("canton");  
  let parroquia = document.getElementById("parroquia");  
  getFirstElement(
    date_to.value,
    date_from.value, 
    date_inspeccion.value, 
    provincia.value, 
    canton.value, 
    parroquia.value
  );
};



function getFirstElement(dateTo, dateFrom, dateInspeccion, provincia, canton, parroquia){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();


  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_to: dateTo,
      dateFrom: dateFrom,
      dateInspeccion: dateInspeccion,
      provincia: provincia,
      canton: canton,
      parroquia: parroquia,
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
        getDrawTable('firstElement', columsTable1, res.response.json.firstElement.data);
        document.getElementById("firstElement").style.removeProperty('display');
      }
      if (res.response.json.secondElement.data) {
        getDrawTable('secondElement', columsTable2, res.response.json.secondElement.data);
        document.getElementById("secondElement").style.removeProperty('display');
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
function getDrawTable(id, columnsData, tableData, heightTable='300px'){
  var  table = new Tabulator("#" + id, {
    height:heightTable,
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

//----- CATALOGS

function get_catalog(option = 1) 
{
  option = option
  filterArrayA = ''
  filterArrayB = ''
  if (option == 2) {
    filterArrayA = $('#provincia').val();
    console.log('Valores',filterArrayA)
  }else if (option == 3){
    filterArrayA = $('#provincia').val();
    filterArrayB = $('#canton').val();
  } 

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 100512,
      option: option,
      filter_arrayA:filterArrayA,
      filter_arrayB:filterArrayB,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
      if (res.response.json.catalog){
        
        if (option == 1){
          //-----FILTER PROVINCIA 
          $("#provincia").empty();
          $('#provincia').append('<option value="--">--Seleccione--</option>');
          for (i = 0; i < res.response.json.catalog.length; i++) {
            value = res.response.json.catalog[i]
            $('#provincia').append('<option value="'+ value +'">'+value+'</option>');
          }
          $("#provincia").multipleSelect('refresh');
        }else if (option == 2){
          $("#canton").empty();
          $('#canton').append('<option value="--">--Seleccione--</option>');

          $("#parroquia").empty();
          $('#parroquia').append('<option value="--">--Seleccione--</option>');

          for (i = 0; i < res.response.json.catalog.length; i++) {
            value = res.response.json.catalog[i]
            $('#canton').append('<option value="'+ value +'">'+value+'</option>');
          }
          $("#canton").multipleSelect('refresh');
        }else if (option == 3){
          $("#parroquia").empty();
          $('#parroquia').append('<option value="--">--Seleccione--</option>');
          for (i = 0; i < res.response.json.catalog.length; i++) {
            value = res.response.json.catalog[i]
            $('#parroquia').append('<option value="'+ value +'">'+value+'</option>');
          }
          $("#parroquia").multipleSelect('refresh');
        }

      }
  })
};


//-----SELECT

$(function() {
    $('#provincia').multipleSelect({
      filter: true,
      /*
      onClick: function (view) {
        console.log('onClick event fire! view: ' + JSON.stringify(view) + '\n');
      },
      */
      onClose: function () {
        get_catalog(2);
      },
    })

    $('#canton').multipleSelect({
      filter: true,
      /*
      onClick: function (view) {
        console.log('onClick event fire! view: ' + JSON.stringify(view) + '\n');
      },
      */
      onClose: function () {
        get_catalog(3);
      },
    })

})