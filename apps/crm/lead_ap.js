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
hideElement("seventhElement");
hideElement("eigthElement");
hideElement("nineElement");
hideElement("tenthElement");
hideElement("eleventhElement");



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

    ///----ASSIGN VALUES
    var dateF = new Date();
    var dateT = new Date();
    dateF.setMonth(dateF.getMonth() - 6)

    var dateFrom = dateF.toISOString().substring(0, 10);
    var dateTo = dateT.toISOString().substring(0, 10);

    $("#date_from").val(dateFrom);
    $("#date_to").val(dateTo);



    //--Styles
    setSpinner();
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
    unhideElement("seventhElement");
    unhideElement("eigthElement");
    unhideElement("nineElement");
    unhideElement("tenthElement");
    unhideElement("eleventhElement");
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
  let date_from = document.getElementById("date_from");
  let date_to = document.getElementById("date_to");

  firstElement = getFirstElement(date_from.value, date_to.value);
};

function getFirstElement(date_from, date_to){
    //----Hide Css
    $("#divContent").hide();
    $('.load-wrapp').show();
    $('.title_tables').hide();

    fetch(url + 'infosync/scripts/run/', {
        method: 'POST',
        body: JSON.stringify({
          script_id: scriptId,
          date_from: date_from,
          date_to: date_to,
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
                console.log('drawFirstElement.........');
                drawFirstElement(res.response.json.firstElement.data[0]);
            }
            if (res.response.json.secondElement.data) {
                console.log('drawsecondElement.........');
                drawSecondElement(res.response.json.secondElement.data[0]);
            }
             if (res.response.json.thirdElement.data) {
                console.log('drawthirdElement.........');
                drawThirdElement(res.response.json.thirdElement.data[0]);
            }
             if (res.response.json.fourthElement.data) {
                console.log('drawfourthElement.........');
                drawFourthElement(res.response.json.fourthElement.data[0]);
            }
             if (res.response.json.fivethElement.data) {
                console.log('drawfivethElement.........');
                drawFivethElement(res.response.json.fivethElement.data[0]);
            }
             if (res.response.json.sixthElement.data) {
                console.log('drawsixthElement.........');
                drawSixthElement(res.response.json.sixthElement.data[0]);
            }
             if (res.response.json.seventhElement.data) {
                console.log('drawseventhElement.........');
                drawSeventhElement(res.response.json.seventhElement.data[0]);
            }
             if (res.response.json.eigthElement.data) {
                console.log('draweigthElement.........');
                drawEigthElement(res.response.json.eigthElement.data[0]);
            }
            if (res.response.json.ninethElement.data) {
                console.log('drawninethElement.........');
                drawNineElement(res.response.json.ninethElement.data[0]);
            }
            if (res.response.json.tenthElement.data) {
                console.log('drawTenthlement.........');
                drawTenthElement(res.response.json.tenthElement.data[0]);
            }
            
            if (res.response.json.eleventhElement.data) {
                console.log('drawTenthlement.........');
                drawEleventhElement(res.response.json.eleventhElement.data[0]);
            }
        }else{
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
        plugins: [ChartDataLabels],
        options: {
            plugins: {
                legend: {
                    display: true
                },
                title: {
                    display: true,
                    text: 'Reporte Tamaño de Leads',
                    font: {
                        size: 25
                    }
                },
                datalabels: {
                    color: '#707B7C',
                    labels: {
                        title: {
                            font: {
                                weight: 'bold',
                                size: 12,
                            }
                        },
                    },
                    padding:{
                        top: 20,
                        bottom:10,
                    },
                    align:'bot',
                    formatter: function (value, context){
                      var formato = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      return formato;
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title:{
                        display: true,
                        text: '',
                        size: 30,
                    },
                    ticks: {
                        fontSize: 40
                    }
                },
            }
        },
    });
}

let chart2;
function drawSecondElement(data){
    //--- Data
    console.log('SECOND',data)
    var labels = data.map(function(e) {
        return e.nombre +' - ' + e.total.toFixed(2) + '%';
    });
    var datasets = data.map(function(e) {
        return e.total;
    });

    //--- Colors
    var array_colors = getPAlleteColors(7,datasets.length);


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
                    text: 'Porcentaje X Tamaño Lead',
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

    chart3 = new Chart(ctx, {
        type: 'line',
        data: data,
        plugins: [ChartDataLabels],
        options: {
            plugins: {
                legend: {
                    display: true
                },
                title: {
                    display: true,
                    text: 'Reporte Calificación de Leads',
                    font: {
                        size: 25
                    }
                },
                datalabels: {
                    color: '#707B7C',
                    labels: {
                        title: {
                            font: {
                                weight: 'bold',
                                size: 12,
                            }
                        },
                    },
                    padding:{
                        top: 20,
                        bottom:10,
                    },
                    align:'bot',
                    formatter: function (value, context){
                      var formato = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      return formato;
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title:{
                        display: true,
                        text: '',
                        size: 30,
                    },
                    ticks: {
                        fontSize: 40
                    }
                },
            }
        },
    });
}

let chart4;
function drawFourthElement(data){
    //---CHART
    var ctx = document.getElementById('graphicFourth').getContext('2d');
    
    if (chart4) {
        chart4.destroy();
    }

    //plugins: [ChartDataLabels],
    chart4 = new Chart(ctx, {
        type: 'line',
        data: data,
        plugins: [ChartDataLabels],
        options: {
            plugins: {
                legend: {
                    display: true
                },
                title: {
                    display: true,
                    text: 'Reporte Campañas',
                    font: {
                        size: 25
                    }
                },
                datalabels: {
                    color: '#707B7C',
                    labels: {
                        title: {
                            font: {
                                weight: 'bold',
                                size: 12,
                            }
                        },
                    },
                    padding:{
                        top: 20,
                        bottom:10,
                    },
                    align:'bot',
                    formatter: function (value, context){
                      var formato = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      return formato;
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title:{
                        display: true,
                        text: '',
                        size: 30,
                    },
                    ticks: {
                        fontSize: 40
                    }
                },
            }
        },
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
        plugins: [ChartDataLabels],
        options: {
            plugins: {
                legend: {
                    display: true
                },
                title: {
                    display: true,
                    text: 'Reporte Campañas Por Tipos',
                    font: {
                        size: 25
                    }
                },
                datalabels: {
                    color: '#707B7C',
                    labels: {
                        title: {
                            font: {
                                weight: 'bold',
                                size: 12,
                            }
                        },
                    },
                    padding:{
                        top: 20,
                        bottom:10,
                    },
                    align:'bot',
                    formatter: function (value, context){
                      var formato = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      return formato;
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title:{
                        display: true,
                        text: '',
                        size: 30,
                    },
                    ticks: {
                        fontSize: 40
                    }
                },
            }
        },
    });
}

let chart6;
function drawSixthElement(data){
    //---CHART
    var ctx = document.getElementById('graphicSixth').getContext('2d');
    
    if (chart6) {
        chart6.destroy();
    }

    //plugins: [ChartDataLabels],
    chart6 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: true
                },
                title: {
                    display: true,
                    text: 'Reporte Leads X Status',
                    font: {
                        size: 25
                    }
                },
                
            },
            scales: {
                x: {
                    display: true,
                    title:{
                        display: true,
                        text: '',
                        size: 30,
                    },
                    stacked: true,
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        fontSize: 40
                    }
                },
            }
        },
    });
}

let chart7;
function drawSeventhElement(data){
    //---CHART
    var ctx = document.getElementById('graphicSeventh').getContext('2d');
    
    if (chart7) {
        chart7.destroy();
    }

    //plugins: [ChartDataLabels],
    chart7 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: true
                },
                title: {
                    display: true,
                    text: 'Reporte Leads X Etapa',
                    font: {
                        size: 25
                    }
                },
                
            },
            scales: {
                x: {
                    display: true,
                    title:{
                        display: true,
                        text: '',
                        size: 30,
                    },
                    stacked: true,
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        fontSize: 40
                    }
                },
            }
        },
    });
}

let chart8;
function drawEigthElement(data){
    //---CHART
    var ctx = document.getElementById('graphicEigth').getContext('2d');
    
    if (chart8) {
        chart8.destroy();
    }

    //plugins: [ChartDataLabels],
    chart8 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: true
                },
                title: {
                    display: true,
                    text: 'Reporte Camapaña X Etapa',
                    font: {
                        size: 25
                    }
                },
                
            },
            scales: {
                x: {
                    display: true,
                    title:{
                        display: true,
                        text: '',
                        size: 30,
                    },
                    stacked: true,
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        fontSize: 40
                    }
                },
            }
        },
    });
}

let chart9;
function drawNineElement(data){
    //---CHART
    var ctx = document.getElementById('graphicNineth').getContext('2d');
    
    if (chart9) {
        chart9.destroy();
    }

    //plugins: [ChartDataLabels],
    chart9 = new Chart(ctx, {
        type: 'bar',
        data: data,
        plugins: [ChartDataLabels],
        options: {
            plugins: {
                legend: {
                    display: true
                },
                title: {
                    display: true,
                    text: 'Reporte Camapañas',
                    font: {
                        size: 25
                    }
                },
                datalabels: {
                    color: '#fbeee6 ',
                    labels: {
                        title: {
                            font: {
                                weight: 'bold',
                                size: 12,
                            }
                        },
                    },
                    padding:{
                        top: 20,
                        bottom:10,
                    },
                    align:'bot',
                    formatter: function (value, context){
                      var formato = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      return formato;
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title:{
                        display: true,
                        text: '',
                        size: 30,
                    },
                    
                    ticks: {
                        fontSize: 40
                    }
                },
            }
        },
    });
}

let chart10;
function drawTenthElement(data){
    //--- Data
    var labels = data.map(function(e) {
        return e.nombre +' - ' + e.total.toFixed(2) + '%';
    });
    var datasets = data.map(function(e) {
        return e.total;
    });

    //--- Colors
    var array_colors = getPAlleteColors(7,datasets.length);


    //---CHART
    var ctx = document.getElementById('graphicTenth').getContext('2d');
    
    if (chart10) {
        chart10.destroy();
    }

    chart10 = new Chart(ctx, {
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
                    text: 'Porcentaje X Status',
                    font: {
                        size: 25
                    }
                },
            },
        }
     
    });
}


let chart11;
function drawEleventhElement(data){
    //--- Data
    var labels = data.map(function(e) {
        return e.nombre +' - ' + e.porcentaje.toFixed(2) + '% - ' + e.total.toFixed(2) ;
    });
    var datasets = data.map(function(e) {
        return e.porcentaje;
    });

    //--- Colors
    var array_colors = getPAlleteColors(7,datasets.length);

    //---CHART
    var ctx = document.getElementById('graphicEleventh').getContext('2d');
    
    if (chart11) {
        chart11.destroy();
    }

    chart11 = new Chart(ctx, {
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
                    text: 'Porcentaje Ganancia Campaña',
                    font: {
                        size: 25
                    }
                },
            },
        }
     
    });
}
