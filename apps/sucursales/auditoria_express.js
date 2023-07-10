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
hideElement("thirdElement");
hideElement("fourthElement");
hideElement("fivethElement");
hideElement("sixthElement");
hideElement("seventhElement");


hideElement("downloadGraphicFirst")
hideElement("downloadGraphicSecond")
hideElement("downloadGraphicThird")
hideElement("downloadGraphicFourth")
hideElement("downloadGraphicFiveth")



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
    $("#perfil").multipleSelect('refresh');
    //---HIDE AND SHOW
    get_catalog();
    get_parameters();
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

  getDrawGraphic1(data1, setOptions1, 'graphicFirst', 'bar')
  document.getElementById("firstElement").style.removeProperty('display');
  document.getElementById("graphicFirst").style.removeProperty('display');

  getDrawGraphic2(data2, setOptions2, 'graphicSecond', 'bar')
  document.getElementById("secondElement").style.removeProperty('display');
  document.getElementById("graphicSecond").style.removeProperty('display');

  getDrawGraphic3(data3, setOptions3, 'graphicThird', 'bar')
  document.getElementById("thirdElement").style.removeProperty('display');
  document.getElementById("graphicThird").style.removeProperty('display');


  getDrawGraphic4(data4, setOptions4, 'graphicFourth', 'bar')
  document.getElementById("fourthElement").style.removeProperty('display');
  document.getElementById("graphicFourth").style.removeProperty('display');


  getDrawGraphic5(data5, setOptions5, 'graphicFiveth', 'bar')
  document.getElementById("fivethElement").style.removeProperty('display');
  document.getElementById("graphicFiveth").style.removeProperty('display');



  getDrawTable('sixthElement', columsTable1, dataTable1);
  document.getElementById("sixthElement").style.removeProperty('display');


  getDrawTable('seventhElement', columsTable2, dataTable2);
  document.getElementById("seventhElement").style.removeProperty('display');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  //--show alert
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");
  let regional = document.getElementById("regional");
  let perfil = $('#perfil').val();
  let seccion = document.getElementById("seccion");
  let sucursal = document.getElementById("unidades");
  let ceo = document.getElementById("ceo");
  let check = 'on';
  if (document.getElementById('input_check').checked)
  {
    check = 'off';
  }



  firstElement =getFirstElement( 
    date_from.value, 
    date_to.value,
    regional.selectedOptions[0].value,
    perfil,
    seccion.value, 
    sucursal.value,
    ceo.value,
    check
    );
  //--Syle
  unhideElement("div_alert1");
  unhideElement("div_alert2");
  document.getElementById("firstParameters").style.removeProperty('display');
};



function getFirstElement(date_from, date_to, regional, perfil, seccion, sucursal, ceo, check){
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
      regional: regional,
      perfil: perfil,
      seccion: seccion,
      sucursal: sucursal,
      ceo: ceo,
      check:check
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
      document.getElementById("textAlert1").innerText = 0;
      document.getElementById("textAlert2").innerText = 0;
      
      hideElement("firstElement");
      hideElement("secondElement");
      hideElement("thirdElement");
      hideElement("fourthElement");
      hideElement("fivethElement");
      hideElement("sixthElement");
      hideElement("seventhElement");
      hideElement("eigthElement");
      
      //---Notas
      if (res.response.json.totalSucursales)
      {
        document.getElementById("textAlert1").innerText = res.response.json.totalSucursales;
      }
      if (res.response.json.totalSucursales)
      {
        document.getElementById("textAlert2").innerText = res.response.json.totalEvaluaciones;
      }

      if (res.response.json.firstElement.length) {
        //---Grafica Evaluaciones por Unidad de negocio
        data = getFormatQuery(res.response.json.firstElement, 'grafica_unidades')
        getDrawGraphic1(data, setOptions1, 'graphicFirst', 'bar')
        document.getElementById("firstElement").style.removeProperty('display');
        document.getElementById("graphicFirst").style.removeProperty('display');
        document.getElementById("downloadGraphicFirst").style.removeProperty('display');
      }
      if (res.response.json.secondElement.length) {
        //---Grafica Evaluaciones por regional
        data = getFormatQuery(res.response.json.secondElement, 'grafica_regional')
        getDrawGraphic2(data, setOptions2, 'graphicSecond', 'bar')
        document.getElementById("secondElement").style.removeProperty('display');
        document.getElementById("graphicSecond").style.removeProperty('display');
        document.getElementById("downloadGraphicSecond").style.removeProperty('display');
      }
      if (res.response.json.fourthElement.length){
        //---Tabla % de servicio
        getDrawTable('seventhElement', columsTable2, res.response.json.fourthElement);
        document.getElementById("seventhElement").style.removeProperty('display');
      }
      if (res.response.json.fivethElement.length){
        //---Grafica Evaluaciones por seccion
        data = getFormatQuery(res.response.json.fivethElement, 'grafica_evaluaciones')
        getDrawGraphic3(data, setOptions3, 'graphicThird', 'bar')
        document.getElementById("thirdElement").style.removeProperty('display');
        document.getElementById("graphicThird").style.removeProperty('display');
        document.getElementById("downloadGraphicThird").style.removeProperty('display');
      }
      if (res.response.json.sixthElement.length){
        //---Grafica Evaluaciones por Perfil
        data = getFormatQuery(res.response.json.sixthElement, 'grafica_perfil')
        getDrawGraphic4(data, setOptions4, 'graphicFourth', 'bar')
        document.getElementById("fourthElement").style.removeProperty('display');
        document.getElementById("graphicFourth").style.removeProperty('display');
        document.getElementById("downloadGraphicFourth").style.removeProperty('display');
      }
      if (res.response.json.sevenElement.length){
        data = getFormatQuery(res.response.json.sevenElement, 'grafica_ceo')
        getDrawGraphic5(data, setOptions5, 'graphicFiveth', 'bar')
        document.getElementById("fivethElement").style.removeProperty('display');
        document.getElementById("graphicFiveth").style.removeProperty('display');
        document.getElementById("downloadGraphicFiveth").style.removeProperty('display');
      }
      if (res.response.json.eigthElement.length){
        getDrawTable('sixthElement', columsTable1, res.response.json.eigthElement, '300px');
        document.getElementById("sixthElement").style.removeProperty('display');
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

//-----GRAPHIC
let chart1;
function getDrawGraphic1(data, setOptions, canvas, type){
  //---CHART
  var ctx = document.getElementById(canvas).getContext('2d');
  if (chart1) {
    chart1.destroy();
  }

  chart1 = new Chart(ctx, {
    type: type,
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

let chart2;
function getDrawGraphic2(data, setOptions, canvas, type){
  //---CHART
  var ctx = document.getElementById(canvas).getContext('2d');
  if (chart2) {
    chart2.destroy();
  }

  chart2 = new Chart(ctx, {
    type: type,
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

let chart3;
function getDrawGraphic3(data, setOptions, canvas, type){
  //---CHART
  var ctx = document.getElementById(canvas).getContext('2d');
  if (chart3) {
    chart3.destroy();
  }

  chart3 = new Chart(ctx, {
    type: type,
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

let chart4;
function getDrawGraphic4(data, setOptions, canvas, type){
  //---CHART
  var ctx = document.getElementById(canvas).getContext('2d');
  if (chart4) {
    chart4.destroy();
  }

  chart4 = new Chart(ctx, {
    type: type,
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

let chart5;
function getDrawGraphic5(data, setOptions, canvas, type){
  //---CHART
  var ctx = document.getElementById(canvas).getContext('2d');
  if (chart5) {
    chart5.destroy();
  }

  chart5 = new Chart(ctx, {
    type: type,
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

//-----FORMAT QUERY
function getFormatQuery(data, type){
  console.log('type',type)
  let structureGrapic = {
    labels: [],
    datasets: [
      {
        label: 'Evaluaciones',
        data: [],
        numData: [],
        backgroundColor: [],
      },
    ]
  }
  let typeGraphic = type
  if (typeGraphic == 'grafica_regional' && data != undefined) {
    for (var i = 0; i < data.length; i++) {
      //---ASIGN
      valueLabel = data[i]['regional']
      valueData = data[i]['score']
      valueNumData = data[i]['total']
      //---APPEND
      structureGrapic['labels'].push(valueLabel)
      structureGrapic['datasets'][0]['data'].push(valueData)
      structureGrapic['datasets'][0]['numData'].push(valueNumData)
      //---VALIDATION COLOR
      color = getColorStatus(valueData)
      structureGrapic['datasets'][0]['backgroundColor'].push(color)
    }
  }
  else if( typeGraphic == 'grafica_unidades' && data != undefined){
    for (var i = 0; i < data.length; i++) {
      //---ASIGN
      valueLabel = data[i]['sucursal']
      valueData = data[i]['score']
      valueNumData = data[i]['total']
      //---APPEND
      structureGrapic['labels'].push(valueLabel)
      structureGrapic['datasets'][0]['data'].push(valueData)
      structureGrapic['datasets'][0]['numData'].push(valueNumData)
      //---VALIDATION COLOR
      color = getColorStatus(valueData)
      structureGrapic['datasets'][0]['backgroundColor'].push(color)
    }
  }
  else if( typeGraphic == 'grafica_evaluaciones' && data != undefined){
    for (var i = 0; i < data.length; i++) {
      //---ASIGN
      valueLabel = data[i]['pagina']
      valueData = data[i]['section_grade']
      valueNumData = data[i]['total']
      //---APPEND
      structureGrapic['labels'].push(valueLabel)
      structureGrapic['datasets'][0]['data'].push(valueData)
      structureGrapic['datasets'][0]['numData'].push(valueNumData)
      //---VALIDATION COLOR
      color = getColorStatus(valueData)
      structureGrapic['datasets'][0]['backgroundColor'].push(color)
    }
  }
  else if( typeGraphic == 'grafica_perfil' && data != undefined){
    for (var i = 0; i < data.length; i++) {
      //---ASIGN
      valueLabel = data[i]['perfil']
      valueData = data[i]['score']
      valueNumData = data[i]['total']
      //---APPEND
      structureGrapic['labels'].push(valueLabel)
      structureGrapic['datasets'][0]['data'].push(valueData)
      structureGrapic['datasets'][0]['numData'].push(valueNumData)
      //---VALIDATION COLOR
      color = getColorStatus(valueData)
      structureGrapic['datasets'][0]['backgroundColor'].push(color)
    }
  }
  else if( typeGraphic == 'grafica_ceo' && data != undefined){
    for (var i = 0; i < data.length; i++) {
      //---ASIGN
      valueLabel = data[i]['ceo']
      valueData = data[i]['score']
      valueNumData = data[i]['total']
      //---APPEND
      structureGrapic['labels'].push(valueLabel)
      structureGrapic['datasets'][0]['data'].push(valueData)
      structureGrapic['datasets'][0]['numData'].push(valueNumData)
      //---VALIDATION COLOR
      color = getColorStatus(valueData)
      structureGrapic['datasets'][0]['backgroundColor'].push(color)
    }
  }
  return structureGrapic
}

function getColorStatus(value){
  color = ''
  if (valueData  >= 80) {
    color = "#27ae60"
  } else if (valueData  >= 60 && valueData <=79.999) {
    color = "#f1c40f"
  }
  else if(valueData <=59.999)
  {
    color = "#e74c3c"
  }
  return color
}

//-----CATALOG
function get_catalog() 
{
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 104863,
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
        arrayCeo = []
        arrayRegional = []
        arrayUnidad = []
        for (i = 0; i <res.response.json.catalog.length; i++) {
          valueCeo = res.response.json.catalog[i]['61d7aed1647e2b73d9b1f681']
          valueRegional = res.response.json.catalog[i]['61d7aed1647e2b73d9b1f67d']
          valueSucursal = res.response.json.catalog[i]['61d7aed1647e2b73d9b1f67f']
          if (!arrayCeo.includes(valueCeo)){
            arrayCeo.push(valueCeo);
          }
          if (!arrayRegional.includes(valueRegional)){
            arrayRegional.push(valueRegional);
          }
          if (!arrayUnidad.includes(valueSucursal)){
            arrayUnidad.push(valueSucursal);
          }
        }

        ///-----Catalog Ceo
        if(arrayCeo.length){
          $("#ceo").empty();
          $('#ceo').append('<option value="--">--Seleccione--</option>');
          for (i = 0; i < arrayCeo.length; i++) {
            value = arrayCeo[i]
            $('#ceo').append('<option value="'+ value +'">'+value+'</option>');
          }
        }

        ///-----Catalog Regional
        if(arrayRegional.length){
          $("#regional").empty();
          $('#regional').append('<option value="--">--Seleccione--</option>');
          for (i = 0; i < arrayRegional.length; i++) {
            value = arrayRegional[i]
            $('#regional').append('<option value="'+ value +'">'+value+'</option>');
          }
        }
        ///-----Catalog Unidad
        if(arrayUnidad.length){
          $("#unidades").empty();
          $('#unidades').append('<option value="--">--Seleccione--</option>');
          for (i = 0; i < arrayUnidad.length; i++) {
            value = arrayUnidad[i]
            $('#unidades').append('<option value="'+ value +'">'+value+'</option>');
          }
        }
      }
    } 
  })
};

function get_parameters(){
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 104863,
      only_users: true
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.response.perfiles)
    {
      $('#perfil').empty()
      $("#perfil").append('<option >--Seleccione--</option>')
      for (var i = 0 ; i < res.response.perfiles.length; i++) {
        $("#perfil").append("<option value='" + res.response.perfiles[i] + "'>" + res.response.perfiles[i] + "</option>")
      }
      $("#perfil").multipleSelect('refresh');
    }
  })
}