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
    //--Styles
    setSpinner();
    setDate();
    get_catalog();
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

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';


//-----DEMO 
function loadDemoData(){
  $('.title_tables').show();
  unhideElement("title_demo")
  document.getElementById("firstParameters").style.removeProperty('display');

  getDrawTable('firstElement', columsTable1, dataTable1, 350);
  document.getElementById("firstElement").style.removeProperty('display');
}

//-----DATE
function setDate(){
  array_month = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  //---DATE TO
  date_to = new Date();
  year = date_to.getFullYear();
  month = array_month[date_to.getMonth()];
  day = date_to.getDate();
  date_to = year +'-'+ month +'-'+ day;
  $('#date_to').val(date_to);
  //---DATE FROM
  date_from = new Date();
  date_from.setDate(date_from.getDate() - 30)

  year = date_from.getFullYear();
  month = array_month[date_from.getMonth()];
  day = date_from.getDate();
  date_from = year +'-'+ month +'-'+ day;
  $('#date_from').val(date_from);
}



//-----EXCUTION
function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");  
  let promotor = document.getElementById("promotor");  

  if (date_from.value != null && date_to.value != null && date_from.value != "" && date_to.value != ""){
    getFirstElement(date_to.value, date_from.value, promotor.value);
  }
  else
  {
    Swal.fire({
      title: 'Rango de Fechas Requerido',
    });
  }


  
}

function getFirstElement(dateTo, dateFrom, promotor){
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
      promotor: promotor,
      option: 1,
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
      
      if (res.response.firstElement.tabledata) {
        getDrawTable('firstElement', columsTable1, res.response.firstElement.tabledata, 450);
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
}

//-----TABLES
function getDrawTable(id, columnsData, tableData, height = 500){
  var  table = new Tabulator("#" + id, {
    height:height +"px",
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
        script_id: 95556,
        option: 0,
      }),
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+userJwt
      },
    })
    .then(res => res.json())
    .then(res => {
    if (res.success) {
      if (res.response.catalog.length){
        array_value = []
        for (i = 0; i < res.response.catalog.length; i++) {
          if (!array_value.includes(res.response.catalog[i]['63dc0f1ec29b8336b7b72615'])) {
            array_value.push(res.response.catalog[i]['63dc0f1ec29b8336b7b72615'])
          }
        }
        array_value.sort();
        $("#promotor").empty();
        $('#promotor').append('<option value="--">--Seleccione--</option>');
        for (i = 0; i <array_value.length; i++) {
          $('#promotor').append('<option value="'+ array_value[i] +'">'+array_value[i]+'</option>');
        }

      }
    } 
  })
};

