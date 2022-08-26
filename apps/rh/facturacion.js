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
$('.div_card').hide();
$('.title_tables').hide();
hideElement("title_demo")
hideElement("firstParameters")
hideElement("firstElement")


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
    // getCompanyLogo(userParentId);
    userId = us;
    userJwt = jw;
    userName = getCookie("userName");
    unHideReportElements();
    if (scriptId == null) {
      loadDemoData();
    }
    
    getCatalog(86374,85937,1,catalogType='custom');
    
    //---HIDE AND SHOW
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
    document.getElementById("firstParameters").style.removeProperty('display');
  } else {
    unhideElement("inicio_ses");
    $('#divOptions').hide();
    $('#title_report').hide();
    $('.title_tables').hide();
    $('.div_card').hide();
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
  unhideElement("close_sesion");
  unhideElement("firstParameters");
  unhideElement("firstElement");
  unhideElement("firstElement-Buttons");
}

function loadDemoData(){
  //----
  $('.title_tables').show();
  $('.div_card').show();


  getDrawTable('firstElement', columsTable1, dataTable1);
  getDrawTable('secondElement', columsTable2, dataTable2);
  //---Remove Format
  document.getElementById("firstParameters").style.removeProperty('display');
  document.getElementById("firstElement").style.removeProperty('display');
  document.getElementById("secondElement").style.removeProperty('display');
  unhideElement("title_demo");
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");
  let product = document.getElementById("catalog-79039-level-1");

  firstElement  = getFirstElement( date_from.value, date_to.value, product.value );
};


function getEmpleadoNumber(){
  var nameEmp = $("#catalog-79040-level-1").val();

  empleados = getCatalog(79041,79040,2,catalogType='custom');
  console.log('empleados',empleados);
}

function getFirstElement(date_from , date_to, product){
  $('.load-wrapp').show();
  $("#divContent").hide();
  $('.title_tables').hide();
  $("#firstElement").html("");
  $("#secondElement").html("");

  
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      date_from: date_from,
      date_to: date_to,
      product: product,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      //----SHOW STYLES
      $('.load-wrapp').hide();
      $("#divContent").show();
      $('.title_tables').show();
      if (res.response.json.firstElement) {
        console.log('drawFirstElement.........');
        getDrawTable('firstElement', columsTable1, res.response.json.firstElement.data)
      }
      if (res.response.json.secondElement) {
        console.log('drawsecondElement.........');
        getDrawTable('secondElement', columsTable2, res.response.json.secondElement.data)
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


function editableData(){
  //create and style input
  console.log('entra a editable data')
  var dateEditor = function(cell, onRendered, success, cancel){
    console.log('data editor', cell)
    var cellValue = luxon.DateTime.fromFormat(cell.getValue(), "dd/MM/yyyy").toFormat("yyyy-MM-dd"),
    input = document.createElement("input");

    input.setAttribute("type", "date");

    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    input.value = cellValue;

    onRendered(function(){
        input.focus();
        input.style.height = "100%";
    });

    function onChange(){
        console.log('on change')
        if(input.value != cellValue){
            success(luxon.DateTime.fromFormat(input.value, "yyyy-MM-dd").toFormat("dd/MM/yyyy"));
        }else{
            cancel();
        }
    }

    //submit new value on blur or change
    input.addEventListener("blur", onChange);

    //submit new value on enter
    input.addEventListener("keydown", function(e){
        if(e.keyCode == 13){
          console.log('onchange>>>')
          onChange();
          console.log('onchange<<<<<')
        }

        if(e.keyCode == 27){
            cancel();
        }
    });
    console.log('return inpunt', input)
    return input;
   };
};

//-----TABLES
function getDrawTable(id, columnsData, tableData){
  $('#'+id).empty();
  var table = new Tabulator("#" + id, {
    height:"300px",
    layout:"fitDataTable",
    data:tableData,
    resizableRows:true,
    clipboard:true,
    clipboardPasteAction:"replace",
    textDirection:"ltr",
    columns:columnsData,
  });

  //trigger download of data.xlsx file
  if (document.getElementById("download_xlsx_"+id)){
    document.getElementById("download_xlsx_"+id).replaceWith(document.getElementById("download_xlsx_"+id).cloneNode(true));
    document.getElementById("download_xlsx_"+id).addEventListener("click", function (){
      table.download("xlsx", "data.xlsx", {sheetName:"data"});
    });
  }

  //trigger download of data.csv file
  if (document.getElementById("download_csv_"+id)){
    document.getElementById("download_csv_"+id).replaceWith(document.getElementById("download_csv_"+id).cloneNode(true));
    document.getElementById("download_csv_"+id).addEventListener("click", function (){
      table.download("csv", "data.csv");
    });
  }
}

