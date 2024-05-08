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

let listDivision = [];
let listRegion = [];
let listSucursal = [];
let listBodega = [];

$('#divOptions').hide();
$('#title_report').hide();
//$('.div_card').hide();
//$('.title_tables').hide();
$('.button-chart').hide();


hideElement("download_firstElement")
hideElement("download_secondElement")
hideElement("download_thirdElement")
hideElement("download_fourthElement")
hideElement("download_graphicFiveth")

hideElement("title_demo")
hideElement("firstParameters");
hideElement("firstElement");
hideElement("sixthElement");
hideElement("secondElement");
hideElement("thirdElement");
hideElement("fourthElement");
hideElement("fivethElement");
hideElement("seventhElement");
hideElement("eigthElement");

hideElement("div_alert1");
hideElement("div_alert2");
hideElement("div_alert3");

window.onload = function(){
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
    if (key ==='report'){
      $("#close_sesion").hide();
    }
    //get_parameters();
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

    unHideReportElements()
    if (scriptId == null) {
      loadDemoData();
      //---MULTIPLE
    }else{
      $('.div_card').hide();
      $('.title_tables').hide();
    }
    get_catalog_request();
    //---HIDE AND SHOW
    $("#pais").select2();
    $("#division").select2();
    $("#region").select2();
    $("#sucursal").select2();
    $("#bodega").select2();
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
    document.getElementById("firstParameters").style.removeProperty('display');
  } else {
    //loadDemoData()
    unhideElement("inicio_ses");
    hideElement("title_demo");
    $('#divOptions').hide();
    $('#title_report').hide();
    $('.title_tables').hide();
    $("#tienda").multipleSelect('refresh');
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

function get_parameters(){
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 113130,
      only_users: true
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.response)
    {
      console.log(res.response)
      
    }
  })
}

function unHideReportElements(){
  //Set here all report elements that need to be unHiden on a loggin
  //$('.title_tables').show();
  unhideElement("firstParameters");
  unhideElement("close_sesion");
  unhideElement("firstElement");
  unhideElement("secondElement");
  unhideElement("thirdElement");
  unhideElement("fivethElement");
  unhideElement("seventhElement");
  unhideElement("fourthElement");
  unhideElement("sixthElement");
}

function loadDemoData(){
  unhideElement("title_demo")
  unhideElement("div_alert1");
  unhideElement("div_alert2");
  unhideElement("div_alert3");

  document.getElementById("firstParameters").style.removeProperty('display');

  //---Accountans
  document.getElementById("textAlert1").innerText = 10;
  document.getElementById("textAlert2").innerText = 10;
  getDrawGauge('gaugeFirst', 80);

  //---Graphic

  drawGraphicFirst(dataGraphic1,setOptions1)
  drawGraphicSecond(dataGraphic2,setOptions2)
  drawGraphicThird(dataGraphic3,setOptions3)
  drawGraphicFourth(dataGraphic4,setOptions4)
  drawFivethElement(dataFivethElement);
  //----Css
  unhideElement("seventhElement")
  unhideElement("eigthElement");
  unhideElement("fivethElement")
  $("#tienda").multipleSelect('refresh');
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  //--show alert
  unHideReportElements()
  let date_from = $("#date_from").val();
  let date_to = $("#date_to").val(); 
  let pais = $("#pais").val();
  let division = $("#division").val(); 
  let region = $("#region").val(); 
  let sucursal = $("#sucursal").val(); 
  let bodega = $("#bodega").val();
  let option = 'terminada';
  if (document.getElementById('input_check').checked)
  {
    option = 'programada';
  }
  if(region != '' && region != '--'){
    firstElement =getFirstElement( 
      date_from, 
      date_to,
      pais,
      division,
      region,
      sucursal,
      bodega,
      option
    );

  }else{
    Swal.fire({
      title:"Opps",
      text:"Necesita seleccionar un regional.",
    })
  }
  //--Syle
  unhideElement("div_alert1");
  unhideElement("div_alert2");
  unhideElement("div_alert3");

  document.getElementById("firstParameters").style.removeProperty('display');
};

function getFirstElement(date_from, date_to, pais, division, region, sucursal, bodega, status){
  //----Hide Css
  $("#divContent").hide();
  $('.load-wrapp').show();
  $('.title_tables').hide();
  $('.div_card').hide();

  //----Clean
  $("#firstElement").html("");
  $("#secondElement").html("");
  $("#thirdElement").html("");
  $("#fivethElement").html("");

  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 113130,
      date_from: date_from,
      date_to: date_to,
      pais:pais,
      division: division,
      region: region,
      sucursal: sucursal,
      bodega:bodega,
      status:status,
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

      $("#download_firstElement").hide();
      $("#download_secondElement").hide();
      $("#download_thirdElement").hide();
      $("#download_fourthElement").hide();
      $("#download_graphicFiveth").hide();

      hideElement("firstElement");
      hideElement("secondElement");
      hideElement("thirdElement");
      hideElement("fivethElement");
      hideElement("fourthElement");
      hideElement("seventhElement");

      let sucEvaluada = 0
      let numEval = 0
      if (res.response.json.firstElement)
      {
        document.getElementById("textAlert1").innerText = res.response.json.firstElement.numSucursales[0]['total'];
        sucEvaluada = res.response.json.firstElement.numSucursales[0]['total'];
      }
      if (res.response.json.firstElement)
      {
        document.getElementById("textAlert2").innerText = res.response.json.firstElement.numEvaluaciones[0]['total'];
        numEval = res.response.json.firstElement.numEvaluaciones[0]['total'];
      }
      if (res.response.json.thirdElement){
        let data = res.response.json.thirdElement.data;
        average = data.datasets[0].data.length > 0 ?  getAverageData(data.datasets[0].data) : 0;
        drawGraphicFirst(data, setOptions1);
        getDrawGauge('gaugeFirst', average)
      }
      if (res.response.json.fourthElement){
        let data = res.response.json.fourthElement.data;
        drawGraphicSecond(data, setOptions2);
      }
      if (res.response.json.fivethElement){
        let data = res.response.json.fivethElement.data;
        drawGraphicThird(data, setOptions3);
      }
      if (res.response.json.sixthElement){
        let data = res.response.json.sixthElement.data;
        drawGraphicFourth(data, setOptions4);
      }
      if (res.response.json.seventhElement){
        unhideElement("seventhElement")
        unhideElement("eigthElement");
        unhideElement("fivethElement")
        drawFivethElement(res.response.json.seventhElement);
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
function drawGraphicFirst(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicFirst').getContext('2d');
  if (chart1) {
    chart1.destroy();
  }

  chart1 = new Chart(ctx, {
    type: 'bar',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

let chart2;
function drawGraphicSecond(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicSecond').getContext('2d');
  if (chart2) {
    chart2.destroy();
  }
  chart2 = new Chart(ctx, {
    type: 'bar',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

let chart3;
function drawGraphicThird(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicThird').getContext('2d');
  if (chart3) {
    chart3.destroy();
  }
  chart3 = new Chart(ctx, {
    type: 'bar',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

let chart4;
function drawGraphicFourth(data, setOptions){
  //---CHART
  var ctx = document.getElementById('graphicFourth').getContext('2d');
  if (chart4) {
    chart4.destroy();
  }
  chart4 = new Chart(ctx, {
    type: 'bar',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}


function drawFivethElement(data){
  name_array = []
  name_array.push(data);
  id = 'fivethElement'
  getDrawGraphicFiveth(data, setOptions6, id,'line', 'Historico');
}

function getDrawGraphicFiveth(data, setOptions, canvas, type, name){
  let chart;
  //---CHART
  var ctx = document.getElementById(canvas).getContext('2d');
  if (chart) {
    chart.destroy();
  }

  setOptions['plugins']['title']['text'] = name
  chart = new Chart(ctx, {
    type: type,
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}

//-----GAUGE
function getDrawGauge(id, promedio){
  dataGauge = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: promedio,
      title: { text: "Resultado promedio" , 'font': {'size': 22} },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 100], tickwidth: 1},
        bar: { color: "#018088" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 100], color: "#fff" }
        ],
      },
    }
  ];
  var layout = { width: 340, height: 190, margin: { t: 42 , b: 0 } };
  Plotly.newPlot(id, dataGauge, layout);
}

//-----ALERTS
function getAverageData(data){
  let average = 0;
  if( data.length > 0){
    for (var i = 0; i < data.length; i++) {
      average += data[i];
    }
    average = average/data.length;
    average = average.toFixed(2);

  }
  return average;
}
//-----CATALOGS
function get_catalog_request(){
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 113130,
      option: 'get_catalogs',
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      let data = res.response;

      if ('catalog_country' in data && data['catalog_country'] !== '') {
        set_data_catalog('catalogAll',data);
      }
    } else {
      console.log('Error',res.error);
    }
  })
}

function set_data_catalog(type, data = []){
  if(type ==  'catalogAll'){
    //----CLEAN
    $('#division').empty();
    $('#division').append($('<option>', {
      value: '--',
      text: 'Seleccione una opción'
    }));
    $("#division").select2();

    $('#region').empty();
    $('#region').append($('<option>', {
      value: '--',
      text: 'Seleccione una opción'
    }));
    $("#region").select2();

    $('#sucursal').empty();
    $('#sucursal').append($('<option>', {
      value: '--',
      text: 'Seleccione una opción'
    }));
    $("#sucursal").select2();

    $('#bodega').empty();
    $('#bodega').append($('<option>', {
      value: '--',
      text: 'Seleccione una opción'
    }));
    $("#bodega").select2();
    //----Asigna Values
    let dataCountry = data.catalog_country.country;
    let dataDivision = data.catalog_country.division;
    let dataRegion = data.catalog_country.region;
    let dataBranch = data.catalog_branch_winery.winery ;
    let dataWinery = data.catalog_branch_winery.branch;
    listDivision = dataDivision;
    listRegion = dataRegion;
    listSucursal = dataBranch ;
    listBodega = dataWinery;
    //---Select Country
    var select = document.getElementById("pais");
    for (var i = 0; i < dataCountry.length; i++) {
      var element = dataCountry[i];
      var optionElement = document.createElement("option"); 
      optionElement.text = element; 
      optionElement.value = element; 
      select.appendChild(optionElement); 
    }
    $("#pais").select2();
  }else if(type == 'catalogDivision'){
    //----CLEAN
    $('#division').empty();
    $('#division').append($('<option>', {
      value: '--',
      text: 'Seleccione una opción'
    }));
    $("#division").select2();

    $('#region').empty();
    $('#region').append($('<option>', {
      value: '--',
      text: 'Seleccione una opción'
    }));
    $("#region").select2();

    $('#sucursal').empty();
    $('#sucursal').append($('<option>', {
      value: '--',
      text: 'Seleccione una opción'
    }));
    $("#sucursal").select2();

    $('#bodega').empty();
    $('#bodega').append($('<option>', {
      value: '--',
      text: 'Seleccione una opción'
    }));
    $("#bodega").select2();


    //----Data
    let country = $("#pais").val();
    let listSearch = listDivision.filter(item => item['country'] === country);
    //---Select Division
    var select = document.getElementById("division");
    for (var i = 0; i < listSearch.length; i++) {
      var element = listSearch[i].division;
      var optionElement = document.createElement("option"); 
      optionElement.text = element; 
      optionElement.value = element; 
      select.appendChild(optionElement); 
    }
    $("#division").select2();
  }else if(type == 'catalogRegion'){
    //----CLEAN
    $('#region').empty();
    $('#region').append($('<option>', {
      value: '--',
      text: 'Seleccione una opción'
    }));
    $("#region").select2();

    $('#sucursal').empty();
    $('#sucursal').append($('<option>', {
      value: '--',
      text: 'Seleccione una opción'
    }));
    $("#sucursal").select2();

    $('#bodega').empty();
    $('#bodega').append($('<option>', {
      value: '--',
      text: 'Seleccione una opción'
    }));
    $("#bodega").select2();
    //----Data
    let division = $("#division").val();
    let listSearch = listRegion.filter(item => item['division'] === division);
    //---Select Región
    var select = document.getElementById("region");
    for (var i = 0; i < listSearch.length; i++) {
      var element = listSearch[i].region;
      var optionElement = document.createElement("option"); 
      optionElement.text = element; 
      optionElement.value = element; 
      select.appendChild(optionElement); 
    }
    $("#region").select2();
  }else if(type == 'catalogSucursal'){
    //----CLEAN
    $('#sucursal').empty();
    $('#sucursal').append($('<option>', {
      value: '--',
      text: 'Seleccione una opción'
    }));
    $("#sucursal").select2();
    $('#bodega').empty();
    $('#bodega').append($('<option>', {
      value: '--',
      text: 'Seleccione una opción'
    }));
    $("#bodega").select2();
    //---Data
    let region = $("#region").val();

    console.log('listSucursal',listSucursal);
    let listSearch = listSucursal.filter(item => region.includes(item['region']));
    //---Select Región
    var select = document.getElementById("sucursal");
    for (var i = 0; i < listSearch.length; i++) {
      var element = listSearch[i].winery;
      var optionElement = document.createElement("option"); 
      optionElement.text = element; 
      optionElement.value = element; 
      select.appendChild(optionElement); 
    }
    $("#sucursal").select2();
  }else if(type == 'catalogBodega'){
    //----CLEAN
    $('#bodega').empty();
    $('#bodega').append($('<option>', {
      value: '--',
      text: 'Seleccione una opción'
    }));
    $("#bodega").select2();

    let sucursal = $("#sucursal").val();
    let listSearch = listBodega.filter(item => item => sucursal.includes(item['winery']));
    //---Select Región
    var select = document.getElementById("bodega");
    for (var i = 0; i < listSearch.length; i++) {
      var element = listSearch[i].branch;
      var optionElement = document.createElement("option"); 
      optionElement.text = element; 
      optionElement.value = element; 
      select.appendChild(optionElement); 
    }
    $("#bodega").select2();
  }
}

