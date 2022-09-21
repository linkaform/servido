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
    userId = us;
    userJwt = jw;
    userName = getCookie("userName");
    unHideReportElements();

    if (scriptId == null) {
      loadDemoData();
    }else{ 
      get_catalog_rumas();
      $('#divContent').hide();
    }
    //---HIDE AND SHOW
    setSpinner();
    $('#divOptions').show();
    $('#title_report').show();
  } else {
    unhideElement("inicio_ses");
    $('#divOptions').hide();
    $('#title_report').hide();
    $('.title_tables').hide();
    $('#divContent').hide();
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

  getDrawGraphicFirst(dataElement1);
  getDrawGraphicSecond(dataElement2);
  getDrawGraphicFourth(dataElement4);
  getDrawGraphicFive(dataElement5);
  getDrawGraphicSixth(60);

 
  getDrawGraphicBolas2();
  getDrawGraphicBolas3();

  getDrawGraphicThird(dataElement3);
  
}

const loading = document.querySelector('.loading-container');
loading.style.display = 'none';

function runFirstElement(){
  let ruma = document.getElementById("ruma");
  firstElement  = getFirstElement(ruma.value);
};



function getFirstElement(ruma){
  $('.load-wrapp').show();
  $("#divContent").hide();
  $('.title_tables').hide();
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      ruma: ruma,
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
      //----SHOW STYLES
      $('.load-wrapp').hide();
      $('.title_tables').show();
      $("#divContent").show();
      console.log(res.response.json);
      if (res.response.json.firstElement) {
        if (res.response.json.firstElement['fecha_inicio'][0]) {
          $('#textFechaInicio').text(res.response.json.firstElement['fecha_inicio'][0])
        }
        if (res.response.json.firstElement['peso_faja'][0]) {
          $('#textPesoFaja').text(res.response.json.firstElement['peso_faja'][0])
        }
        if (res.response.json.firstElement['proceso'][0]) {
          $('#textProceso').text(res.response.json.firstElement['proceso'][0])
        }
         if (res.response.json.firstElement['toneladas_procesadas'][0]) {
          $('#textToneladasProceso').text(res.response.json.firstElement['toneladas_procesadas'][0])
        }
        if (res.response.json.firstElement['toneladas_procesadas'][0]) {
          $('#textToneladasMolienda').text(res.response.json.firstElement['toneladas_molienda'][0])
        }
      }
      if (res.response.json.secondElement) {
        if (res.response.json.secondElement['sacos_cal'][0]) {
          $('#textSacosCal').text(res.response.json.secondElement['sacos_cal'][0]['valor'])
          $('#textFechaSacosCal').text(res.response.json.secondElement['sacos_cal'][0]['fecha'])
        }  
        if (res.response.json.secondElement['ph']) {
          getDrawGraphicFourth(res.response.json.secondElement['ph']);
        }  
        if (res.response.json.secondElement['bolas_2_5'][0]) {
          $('#textBolas25').text(res.response.json.secondElement['bolas_2_5'][0]['valor'])
          $('#textFechaBolas25').text(res.response.json.secondElement['bolas_2_5'][0]['fecha'])
          getDrawGraphicBolas2();
        }  
        if (res.response.json.secondElement['bolas_3_5'][0]) {
          $('#textBolas35').text(res.response.json.secondElement['bolas_3_5'][0]['valor'])
          $('#textFechaBolas35').text(res.response.json.secondElement['bolas_3_5'][0]['fecha'])
          getDrawGraphicBolas3();
        }  
      }
      if (res.response.json.thirdElement) {

        if (res.response.json.thirdElement['malla']) {
          getDrawGraphicFirst(res.response.json.thirdElement['malla']);
        }

        if (res.response.json.thirdElement['capacidad_hora']) {
          console.log(res.response.json.thirdElement['capacidad_hora'])
          getDrawGraphicSecond(res.response.json.thirdElement['capacidad_hora']);
        } 
        if (res.response.json.thirdElement['porcentaje_hora'][0]) {
          valor = res.response.json.thirdElement['porcentaje_hora'][0];
          getDrawGraphicSixth(valor);
        }   

        if (res.response.json.thirdElement['nivel_bolas']) {
          getDrawGraphicThird(res.response.json.thirdElement['nivel_bolas']);
        }

        if (res.response.json.thirdElement['densidad']) {
          getDrawGraphicFive(res.response.json.thirdElement['densidad']);
        } 
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


//----- CATALOG 
function get_catalog_rumas(){
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: 88782,
      option: 2,
      ruma: '',
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
      if (res.response.json.catalog.data) {
        console.log(res.response.json.catalog.data);
        $("#ruma").empty();
        $('#ruma').append('<option value="--">--Seleccione--</option>');
        for (i = 0; i < res.response.json.catalog.data.length; i++) {
          text = res.response.json.catalog.data[i]['62d9c7c53521a9920d897464'];
          value = res.response.json.catalog.data[i]['62cf337f577dd60f5f7e5ccf'];
          $('#ruma').append('<option value="'+ value +'">'+text+'</option>');
        }
      }
    } 
  })
}


//-----GRAPICH
let chart1;
function getDrawGraphicFirst(data){
  //---CHART
  var ctx = document.getElementById('graphicMalla').getContext('2d');
  
  if (chart1) {
    chart1.destroy();
  }

  chart1 = new Chart(ctx, {
    type: 'pie',
    data:data,
    plugins: [ChartDataLabels],
    options: setOptions,
  });
}

let chart2;
function getDrawGraphicSecond(data){
  //---CHART
  var ctx = document.getElementById('graphicHora').getContext('2d');
  
  if (chart2) {
    chart2.destroy();
  }

  chart2 = new Chart(ctx, {
    type: 'pie',
    data:data,
    plugins: [ChartDataLabels],
    options: setOptions,
  });
}

let chart3;
function getDrawGraphicThird(data){
  //---CHART
  var ctx = document.getElementById('graphicBolas').getContext('2d');
  
  if (chart3) {
    chart3.destroy();
  }

  chart3 = new Chart(ctx, {
    type: 'bar',
    data:data,
    options: setOptionsBolas,
  });
}

let chart4;
function getDrawGraphicFourth(data){
  //---CHART
  var ctx = document.getElementById('graphicPh').getContext('2d');
  
  if (chart4) {
    chart4.destroy();
  }

  chart4 = new Chart(ctx, {
    type: 'bar',
    data:data,
    plugins: [ChartDataLabels],
    options: setOptionsPh,
  });
}

let chart5;
function getDrawGraphicFive(data){
  //---CHART
  var ctx = document.getElementById('graphicDensidad').getContext('2d');
  
  if (chart5) {
    chart5.destroy();
  }

  chart5 = new Chart(ctx, {
    type: 'pie',
    data:data,
    plugins: [ChartDataLabels],
    options: setOptions,
  });
}

let chart6;
function getDrawGraphicSixth(value){
  //---CHART
  var ctx = document.getElementById('graphicCapacidad').getContext('2d');
  
  if (chart6) {
    chart6.destroy();
  }

  //---Value
  obtenido = value;
  faltante = 100 - value;


  chart6 = new Chart(ctx, {
    type: 'doughnut',
    data:{
        labels: ["% Obtenido",'% Faltante'],
        datasets: [
            {
              label: '% Obtenido',
              data: [obtenido, faltante],
              backgroundColor: ['#3498db', '#b03a2e'],
            }
          ]
      },
      plugins: [ChartDataLabels],
      options: setOptionsDounougth,
  });
}

let chart7;
function getDrawGraphicBolas2(){
  //---CHART
  var ctx = document.getElementById('graphicBolas2').getContext('2d');
  
  if (chart7) {
    chart7.destroy();
  }
  chart7 = new Chart(ctx, {
    type: 'pie',
    data:{
        labels: ['Total'],
        datasets: [
            {
              label: 'Valor',
              data: [2.5],
              backgroundColor: ['#17202a'],
            }
          ]
      },
      plugins: [ChartDataLabels],
      options: setOptions,
  });
}

let chart8;
function getDrawGraphicBolas3(){
  //---CHART
  var ctx = document.getElementById('graphicBolas3').getContext('2d');
  
  if (chart8) {
    chart8.destroy();
  }
  chart8 = new Chart(ctx, {
    type: 'pie',
    data:{
        labels: ['Total'],
        datasets: [
            {
              label: 'Valor',
              data: [3.5],
              backgroundColor: ['#17202a'],
            }
          ]
      },
      plugins: [ChartDataLabels],
      options: setOptions,
  });
}