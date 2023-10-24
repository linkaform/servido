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

function loadDemoData(){
  unhideElement("title_demo")
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');

  getDrawTable('firstElement', columsTable1, dataTable1);
  document.getElementById("firstElement").style.removeProperty('display');

}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let date_from = document.getElementById("date_from");
  console.log(date_from)
  let date_to = document.getElementById("date_to"); 
  console.log(date_to) 
  let user = document.getElementById("userName");
  console.log(user)   
  let type_payment = document.getElementById("type_payment");
  console.log(type_payment) 
   /*let option_out = document.getElementById("out"); 
  check = 'on';
  if (document.getElementById('input_check').checked)
  {
    //---created date
    check = 'off';
  }*/
  getFirstElement(date_to.value, date_from.value, user.value, type_payment.value);
};

function getFirstElement(dateTo, dateFrom, user, type_payment){
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
      user: user,
      type_payment: type_payment,
      option:1,
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
      console.log("*******************")
      console.log(res.response.json)
      console.log("*******************")
      if (res.response.json.secondElement.data) {
        getDrawTable('firstElement', columsTable1, res.response.json.secondElement.data);
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
function getDrawTable(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    height:"550px",
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
function get_catalog() 
{
  arrayUser = []
  arrayOut = []


  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 111017,
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
      if (res.response.json.firstElement.data){
        console.log(res.response.json.firstElement.data)
        for (i = 0; i < res.response.json.firstElement.data.length; i++) {
          nameUser = res.response.json.firstElement.data[i]['user'];
          if (arrayUser.indexOf(nameUser) === -1 && nameUser != null) {
            arrayUser.push(nameUser);
          }
        }
        arrayUser.sort();
        //----Pais
        $("#userName").empty();
        $('#userName').append('<option value="--">--Seleccione--</option>');
        for (i = 0; i < arrayUser.length; i++) {
          value = arrayUser[i]
          $('#userName').append('<option value="'+ value +'">'+value+'</option>');
        }
      }
    } 
  })

  arrayIn = []
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 111017,
      option: 2,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if(res.success){
      //console.log("Datos devueltos")
      if(res.response.json.catalogtwo){
        console.log(res.response.json.catalogtwo)
        res.response.json.catalogtwo.forEach((element,index)=>{
          //console.log("FE:"+element['6442e4831198daf81456f274'])
          valueIn = element['6442e4831198daf81456f274'];
          console.log("EFE:"+valueIn)
          if(arrayIn.includes(valueIn) == false){
            console.log("Dato:"+valueIn)
            arrayIn.push(valueIn)
          }
          arrayIn.sort()
          //---Warehouse Out
          $("#in").empty();
          $("#in").append('<option value="--">--Seleccione--</option>');
          $('#in').append('<option value="scrap">Scrap</option>');
          for(i = 0; i < arrayIn.length; i++){
            value = arrayIn[i]
            $('#in').append('<option value="' + value + '">'+value + '</option>');
          }
        })
        /*for (i = 0; i < res.response.json.catalogtwo.length; i++) {
          valueIn = res.response.json.catalogtwo[i]['6442e4831198daf81456f274'];
          //console.log(valueIn)
          if(arrayIn.includes(valueIn) == false){
            //console.log("Dato:"+valueIn)
            arrayIn.push(valueIn)
          }
          arrayIn.sort()
          //---Warehouse Out
          $("#in").empty();
          $("#in").append('<option value="--">--Seleccione--</option>');
          for(i = 0; i < arrayIn.length; i++){
            value = arrayIn[i]
            $('#in').append('<option value="' + value + '">'+value + '</option>');
          }
        }*/
      }
    }
    })


};
