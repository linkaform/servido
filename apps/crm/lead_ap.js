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


  if(us != "" && jw != ""){
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
    $('#divOptions').show();
    $('#title_report').show();
  } else {
    unhideElement("inicio_ses");
    $('.title_tables').hide();
    $('#divOptions').hide();
    $('#title_report').hide();
    hideElement("firstElement-Buttons");
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
  unhideElement("fivethElement");
  unhideElement("fivethElement");
  unhideElement("sixthElement");
  unhideElement("firstElement-Buttons");
}



function loadDemoData(){
    unhideElement("title_demo")
    document.getElementById("firstElement").style.removeProperty('display');
    document.getElementById("secondElement").style.removeProperty('display');
    document.getElementById("thirdElement").style.removeProperty('display');
    document.getElementById("fourthElement").style.removeProperty('display');
    document.getElementById("fivethElement").style.removeProperty('display');
    document.getElementById("sixthElement").style.removeProperty('display');
    document.getElementById("firstParameters").style.removeProperty('display');

    drawFirstElement(dataElement1);
    drawSecondElement(dataElement2);
    drawThirdElement(dataElement3);
    drawFivethElement(dataElement5);
    drawSixththElement(dataElement6);

    
}


const loading = document.querySelector('.loading-container');
loading.style.display = 'none';


function runFirstElement(){
  let plant_code = document.getElementById("plant_code");
  firstElement = getFirstElement( plant_code.value,);
};


function getFirstElement(plant_code){
  $("#firstElement").html("");
  $('.title_tables').hide();
  fetch(url + 'infosync/scripts/run/', {
    method: 'POST',
    body: JSON.stringify({
      script_id: scriptId,
      plant_code: plant_code,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+userJwt
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
      $('.title_tables').show();
      if (res.response.firstElement) {
        console.log('drawFirstElement.........');
      }
    } else {
      hideLoading();
      if(res.code == 11){
        Swal.fire({
          title: 'Error',
          html: res.error
        });
      } else {
        Swal.fire({
          title: 'Error',
          html: res.error
        });
      }
    }
  })
};


//-----GRAPICHS
let chart1;

function drawFirstElement(data){
    //---CHART
    var ctx = document.getElementById('graphicFirst').getContext('2d');
    
    if (chart1) {
        chart1.destroy();
    }

    //plugins: [ChartDataLabels],
    chart1 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            plugins: {
                tooltip:{
                    enabled: true,
                },
                legend:{
                    display: true,
                },
                title: {
                    display: true,
                    text: 'Tamaño de Lead Año',
                    font: {
                        size: 25
                    }
                },
            },
        }
        
    });
}

let chart2;
function drawSecondElement(data){
    //--- Data
    var labels = data.map(function(e) {
        return e.nombre;
    });
    var datasets = data.map(function(e) {
        return e.total;
    });

    //--- Colors
    var array_colors = getPAlleteColors(5,datasets.length);


    //---CHART
    var ctx = document.getElementById('graphicSecond').getContext('2d');
    
    if (chart2) {
        chart2.destroy();
    }

    chart2 = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: array_colors,
                data: datasets
            }]
        },
       
        options: {
            plugins: {
                tooltip:{
                    enabled: true,
                },
                legend:{
                    display: true,
                },
                title: {
                    display: true,
                    text: 'Tamaño Lead Mes',
                    font: {
                        size: 25
                    }
                },
            },
        }
     
    });
}


let chart3;
function drawThirdElement(data){
 //---CHART AND CLEAN
    var ctx = document.getElementById('graphicThird').getContext('2d');
    
    if (chart3) {
        chart3.destroy();
    }

    //plugins: [ChartDataLabels],
    chart3 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            plugins: {
                tooltip:{
                    enabled: true,
                },
                legend:{
                    display: true,
                },
                title: {
                    display: true,
                    text: 'Calificación Lead',
                    font: {
                        size: 25
                    }
                },
            },
        }     
    });
}

let chart5;
function drawFivethElement(data){
    //---CHART
    var ctx = document.getElementById('graphicFiveth').getContext('2d');
    
    if (chart5) {
        chart5.destroy();
    }

    //plugins: [ChartDataLabels],
    chart5 = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            plugins: {
                tooltip:{
                    enabled: true,
                },
                legend:{
                    display: true,
                },
                title: {
                    display: true,
                    text: 'Campaña Lead',
                    font: {
                        size: 25
                    }
                },
            },
        }   
    });
}


let chart6;
function drawSixththElement(data){
    //--- Data
    var labels = data.map(function(e) {
        return e.nombre;
    });
    var datasets = data.map(function(e) {
        return e.total;
    });

    //--- Colors
    var array_colors = getPAlleteColors(6,datasets.length);

    //---CHART
    var ctx = document.getElementById('graphicSixth').getContext('2d');
    
    if (chart6) {
        chart6.destroy();
    }

    chart6 = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: array_colors,
                data: datasets
            }]
        },
        options: {
            plugins: {
                tooltip:{
                    enabled: true,
                },
                legend:{
                    display: true,
                },
                title: {
                    display: true,
                    text: 'Campaña Lead Mes',
                    font: {
                        size: 25
                    }
                },
            },
        }
     
    });
}
