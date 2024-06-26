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
hideElement("fourthElement");
hideElement("fivethElement");
hideElement("sixthElement");

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
    userId  = us;
    userJwt = jw;
    userName = getCookie("userName");

    if (scriptId == null) {
      loadDemoData();
    }
    ///----ASSIGN VALUES
    var dateT = new Date();
    var dateTo = dateT.toISOString().substring(0, 10);
    $("#date_from").val(dateTo);
    $("#date_to").val(dateTo);
    //--Catalog
    get_catalog(1);
    //--Styles
    setSpinner();
    $('#divUsuario').hide();
    $('#divOptions').show();
    $('#title_report').show();
    
    document.getElementById("firstParameters").style.removeProperty('display');
    
  } else {
    unhideElement("inicio_ses");
    $('#divOptions').hide();
    $('#divContent').hide();
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
  unhideElement("close_sesion");
  unhideElement("firstParameters");
  unhideElement("firstElement");
  unhideElement("secondElement");
  unhideElement("thirdElement");
  unhideElement("fourthElement");
}

function loadDemoData(){
  unhideElement("title_demo")
  $('.title_tables').show();
  document.getElementById("firstParameters").style.removeProperty('display');
  document.getElementById("firstElement").style.removeProperty('display');
  document.getElementById("secondElement").style.removeProperty('display');
  document.getElementById("thirdElement").style.removeProperty('display');
  document.getElementById("fourthElement").style.removeProperty('display');
  document.getElementById("fivethElement").style.removeProperty('display');
  document.getElementById("sixthElement").style.removeProperty('display');

  getDrawTable('firstElement', columsTable1, dataTable1);
  getDrawTable('secondElement', columsTable2, dataTable2);
  getDrawTable('thirdElement', columsTable3, dataTable3);
  getDrawTable('fourthElement', columsTable4, dataTable4);

  drawFourthElement(dataFourthElement, dataConfigFourth);
  drawFivethElement(dataFivethElement, dataConfigFiveth);

}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';


function runFirstElement(){
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");    
  let usuario = document.getElementById("usuario");
  let id_forma = $("#formas").val()    
  let paises = $('#paises').val();
  let localidades = $('#localidades').val();
  let tiendas = $('#tiendas').val();
  check = 'on';
  if (document.getElementById('input_check').checked)
  {
    check = 'off';
  }
  console.log('TIENDAS :',tiendas);
  getFirstElement(date_to.value, date_from.value, id_forma, paises, localidades, tiendas, usuario.value, check);
};


function getFirstElement(dateTo, dateFrom, id_forma, paises, localidades, tiendas, usuario, check){
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
      id_forma: id_forma,
      paises: paises,
      localidades: localidades,
      tiendas: tiendas,
      usuario: usuario,
      check: check,
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
      if (res.response.json.firstElement.data) {
        getDrawTable('firstElement', columsTable1, res.response.json.firstElement.data);
        document.getElementById("firstElement").style.removeProperty('display');
      }
      if (res.response.json.secondElement.data) {
        getDrawTable('secondElement', columsTable2, res.response.json.secondElement.data);
        document.getElementById("secondElement").style.removeProperty('display');
      }
      if (res.response.json.thirdElement.data) {
        getDrawTable('thirdElement', columsTable3, res.response.json.thirdElement.data);
        document.getElementById("thirdElement").style.removeProperty('display');
      }
      if (res.response.json.fourthElement) {
        drawFourthElement(res.response.json.fourthElement, dataConfigFourth);
        document.getElementById("fivethElement").style.removeProperty('display');
      }
      if (res.response.json.fivethElement) {
        drawFivethElement(res.response.json.fivethElement, dataConfigFiveth);
        document.getElementById("sixthElement").style.removeProperty('display');
      }
      if (res.response.json.sixthElement) {
        console.log(res.response.json.sixthElement.colums_data)
        getDrawTable('fourthElement', res.response.json.sixthElement.colums_data, res.response.json.sixthElement.data);
        document.getElementById("fourthElement").style.removeProperty('display');
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


//-----GRAPICH
let chart1;
function drawFourthElement(datasets, dataconfig){

  //---CHART
  var ctx = document.getElementById('graphicFourth').getContext('2d');
  
  if (chart1) {
    chart1.destroy();
  }

  chart1 = new Chart(ctx, {
    type: 'bar',
    data: datasets,
    plugins: [ChartDataLabels],
    options: dataconfig
  });
}

let chart2;
function drawFivethElement(datasets, dataconfig){

  //---CHART
  var ctx = document.getElementById('graphicFiveth').getContext('2d');
  
  if (chart2) {
      chart2.destroy();
  }

  chart2 = new Chart(ctx, {
    type: 'bar',
    data: datasets,
    plugins: [ChartDataLabels],
    options: dataconfig,
  });
}

//-----TABLES
function getDrawTable(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    height:"250px",
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
function get_catalog(option) {

  pais  = $("#paises").val();
  localidades = $("#localidades").val();
  filter_data = ''
  type_catalog = ''
  if (option == 1) {
    type_catalog = 'pais'
  }
  if (option == 2) {
    type_catalog = 'localidad'
    filter_data = pais
  }
  else if(option == 3){
    type_catalog = 'tienda'
    filter_data = localidades
  }


  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 103097,
      option: 2,
      filter: filter_data,
      type_catalog: type_catalog,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      if(res.response.json.array_filters.formas){
        $("#formas").empty()
        $("#formas").append('<option value="--">Seleccione la forma</option>');
        for(i = 0; i < res.response.json.array_filters.formas.length; i++){
          id_forma = res.response.json.array_filters.formas[i].id;
          str_id = id_forma.toString()
          name = res.response.json.array_filters.formas[i].name;
          value = id_forma + '-' + name;
          $('#formas').append('<option value="'+value+'">'+name+'</option>');
        }
      }

      if (option == 1){
        if (res.response.json.array_filters.paises){
          $("#paises").empty();
          $("#localidades").empty();
          $("#localidades").multipleSelect('refresh');
          $("#tiendas").empty();
          $("#tiendas").multipleSelect('refresh');
          $('#paises').append('<option value="--">--Seleccione--</option>');
          for (i = 0; i < res.response.json.array_filters.paises.length; i++) {
            value = res.response.json.array_filters.paises[i]
            $('#paises').append('<option value="'+ value +'">'+value+'</option>');
          }
        }
      }
      if (option == 2){
        if (res.response.json.array_filters.localidades){
          $("#tiendas").empty();
          $("#tiendas").multipleSelect('refresh');
          $("#localidades").empty();
          $('#localidades').append('<option value="--">--Seleccione--</option>');
          $("#localidades").multipleSelect('refresh');
          for (i = 0; i < res.response.json.array_filters.localidades.length; i++) {
            value = res.response.json.array_filters.localidades[i];
            $('#localidades').append('<option value="'+ value +'">'+value+'</option>');
          }
          $("#localidades").multipleSelect('refresh');
        }
      }
      if (option == 3){
        if (res.response.json.array_filters.tiendas){
          $("#tiendas").empty();
          $('#tiendas').append('<option value="--">--Seleccione--</option>');
          $("#tiendas").multipleSelect('refresh');
          for (i = 0; i < res.response.json.array_filters.tiendas.length; i++) {
            value = res.response.json.array_filters.tiendas[i];
            $('#tiendas').append('<option value="'+ value +'">'+value+'</option>');
          }
          $("#tiendas").multipleSelect('refresh');
        }
      }
    } 
  })
};
//----EVENTS FILTERS
$(function() {
  $('#localidades').multipleSelect({
    filter: true,
    onClose: function () {
      get_catalog(3);
    },
  })
})