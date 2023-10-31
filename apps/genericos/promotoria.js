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
    //get_catalog();
    $("#promotores").multipleSelect('refresh');
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


  getDrawTable('secondElement', columsTable2, dataTable2);
  document.getElementById("secondElement").style.removeProperty('display');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  //--show alert
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");
  let promotores = $("#promotores").val();
  firstElement =getFirstElement(date_from.value, date_to.value, promotores);
};


function getFirstElement(date_from, date_to, promotores){
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
      promotores: promotores,
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
      //----CLEAN
      hideElement("firstElement");
      if (res.response.json.firstElement.data.length) {
        console.log("-----------------------")
        console.log(res.response)
        console.log("------------------------")
        getDrawTable('firstElement', columsTable1, res.response.json.firstElement.data);
        document.getElementById("firstElement").style.removeProperty('display');
      }
      if (res.response.json.secondElement.data.length) {
        getDrawTable('secondElement', columsTable2, res.response.json.secondElement.data);
        document.getElementById("secondElement").style.removeProperty('display');
      }
      if (res.response.json.group_users) {
        let selectPromotores = $('#list_promotores');
        let listaPromotores = res.response.json.group_users;
        selectPromotores.empty()
        listaPromotores.forEach(element => {
          selectPromotores.append('<option value="' + element + '">' + element + '</option>');
        })
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

var  table;

//-----TABLES
function getDrawTable(id, columnsData, tableData){
  table = new Tabulator("#" + id, {
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

//-----CATALOG
function get_catalog() 
{
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 105099,
      option: 2,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if (res.response.json.catalog){
        console.log('CATALOGO',res.response.json.catalog);

        
        /*if(arrayCeo.length){
          $("#ceo").empty();
          $('#ceo').append('<option value="--">--Seleccione--</option>');
          for (i = 0; i < arrayCeo.length; i++) {
            value = arrayCeo[i]
            $('#ceo').append('<option value="'+ value +'">'+value+'</option>');
          }
        }*/
        
      }
    } 
  })
};


function select_promotor(selectPromotor){
  var nombrePromotor = selectPromotor.value;
  alert("El nombre del promotor es: " + nombrePromotor);
  table.setFilter("promotor", "=", nombrePromotor);
}