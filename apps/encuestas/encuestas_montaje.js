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
$("#divContent").hide();
hideElement("title_demo");
hideElement("firstParameters");
hideElement("firstElement");
hideElement("secondElement");
hideElement("thirdElement");
hideElement("fourthElement");


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
    $('#divOptions').show();
    $('#title_report').show();

    
  } else {
    unhideElement("inicio_ses");
    $('.title_tables').hide();
    $('#divOptions').hide();
    $('#title_report').hide();
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
  unhideElement("firstElement");
  unhideElement("secondElement");
  unhideElement("thirdElement");
  unhideElement("firstElement-Buttons");
}



function loadDemoData(){
  unhideElement("title_demo")
  $('.title_tables').show();
  document.getElementById("firstElement").style.removeProperty('display');
  document.getElementById("secondElement").style.removeProperty('display');
  document.getElementById("thirdElement").style.removeProperty('display');
  document.getElementById("fourthElement").style.removeProperty('display');
  document.getElementById("firstParameters").style.removeProperty('display');
  getDrawTable('firstElement', columsTable1, dataTable1);
  drawSecondElement(dataSecondElement);
  getDrawTable('thirdElement', columsTable2, dataTable2);
  drawFourthElement(dataFourthElement);
  drawFivethElement(dataFivethElement);
}


const loading = document.querySelector('.loading-container');
loading.style.display = 'none';


function runFirstElement(){

  if ($("#date_from").length > 0 && $("#date_to").length > 0) {
    let date_from = document.getElementById("date_from");
    let date_to = document.getElementById("date_to");  
    getFirstElement(date_to.value, date_from.value);
  }else{
    getFirstElement();
  }
};


function getFirstElement(dateTo='', dateFrom=''){
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
      if (res.response.json.firstElement) {
        console.log(res)
        //--The data is same 
        getDrawTable('firstElement', columsTable1,res.response.json.firstElement.data);
        drawSecondElement(res.response.json.firstElement.data);
        document.getElementById("firstElement").style.removeProperty('display');
        document.getElementById("secondElement").style.removeProperty('display');
      }
      if (res.response.json.secondElement) {
        getDrawTable('thirdElement', columsTable2,res.response.json.secondElement.data);
        drawFivethElement(res.response.json.secondElement.data);
        document.getElementById("thirdElement").style.removeProperty('display');
      }
      if (res.response.json.thirdElement) {
        drawFourthElement(res.response.json.thirdElement.data[0]);
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

let chart2;
function drawSecondElement(data){
  //--- Data
  var labels = data.map(function(e) {
      return e.month;
  });
  var datasets = data.map(function(e) {
      return e.total;
  });

  //---CHART
  var ctx = document.getElementById('graphicSecond').getContext('2d');
  
  if (chart2) {
      chart2.destroy();
  }

  //----TITLE
  title = ''
  if ($("#date_from").length > 0 && $("#date_to").length > 0) {
    title = 'Bandas Mensuales Por Cliente'
  }else{
    title = 'Montajes Mensuales Por Cliente'
  }
  

  chart2 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,105,217,1.0)",
        borderColor: "rgba(33,136,56,0.4)",
        data: datasets
      }]
    },
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{ticks: {min: 6, max:16}}],
        },
        title: {
          display: true,
          text: title,
          font: {
            size: 25
          }
        },
        datalabels: {
          color: 'black',
          labels: {
            title: {
              font: {
                weight: 'bold'
              }
            },
          },
          align:'top',
        }
      },
    }
  });
}


let chart4;
function drawFourthElement(data){
  //---CHART
  var ctx = document.getElementById('graphicFourth').getContext('2d');
  
  //----TITLE
  title = ''
  if ($("#date_from").length > 0 && $("#date_to").length > 0) {
    title = 'Bandas Mensuales Por Region'
  }else{
    title = 'Montajes Mensuales Por Region'
  }

  if (chart4) {
    chart4.destroy();
  }
  chart4 = new Chart(ctx, {
    type: 'line',
    data: data,
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        legend: {
          display: true
        },
        scales: {
          yAxes: [{ticks: {min: 6, max:16}}],
        },
        title: {
          display: true,
          text: title,
          font: {
            size: 25
          }
        },
        datalabels: {
          color: 'black',
          labels: {
            title: {
              font: {
                weight: 'bold'
              }
            },
          },
          align:'top',
        }
      },
    }    
  });
}

let chart5;
function drawFivethElement(data){
    //--- Data
    var labels = data.map(function(e) {
        return e.region + ' - '+ e.total;
    });
    var datasets = data.map(function(e) {
        return e.total;
    });


    //--- Colors
    var array_colors = getPAlleteColors(6,datasets.length);
    //---CHART
    var ctx = document.getElementById('graphicFiveth').getContext('2d');
    
    if (chart5) {
        chart5.destroy();
    }

    chart5 = new Chart(ctx, {
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
                    text: 'Totales Regiones',
                    font: {
                        size: 25
                    }
                },
            },
        }
     
    });
}

//-----TABLES
function getDrawTable(id, columnsData, tableData){
  var  table = new Tabulator("#" + id, {
    height:"auto",
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
