let us = null;
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

  getDrawTable('firstElement', columsData1, dataTable1);
  document.getElementById("firstElement").style.removeProperty('dis
let usTy = null;
let jw = null;
let userId = null;
let userJwt = null;
let userName = null;
let userParentId = null;
let scriptId = null;


//-----Variables
const columsData = [
	{ title:"Folio", field:'folio',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fecha - Hora", field:'date',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Tipo de reporte", field:'type_report',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Descripción", field:'desc',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Realizo - Reporte", field:'user_create',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Numero Cedula", field:'num_cedula',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Cargo Realiza - Reporte", field:'job_user',hozAlign:"left",headerFilter:true,width:250},
]

const dataTable = [
	{'folio':'10','date':'20','columna3':'30','columna4':'40'},
	{'folio':'10','date':'20','columna3':'30','columna4':'40'},
	{'folio':'10','date':'20','columna3':'30','columna4':'40'},
]

var setOptions1 = {
  	responsive: true,
  	plugins: {
	    legend: {
	      display: true,
	      position: 'top',
	    },
	    title: {
	        display: true,
	        text: 'Grafica 1',
	        font: {
	          size: 25
	        }
	    },
	    datalabels: {
        color: 'white',
        font: {
            size: 25
         }
      }
	},
  	scales: {
	    y: {
	      	ticks: {
	        	stepSize: 1
	      	},
	    }
  	}
};

var setOptions2 = {
  	responsive: true,
  	plugins: {
	    legend: {
	      display: true,
	      position: 'top',
	    },
	    title: {
	        display: true,
	        text: 'Grafica 2',
	        font: {
	          size: 25
	        }
	    },
	    datalabels: {
        color: 'white',
        font: {
            size: 15
         }
      }
	},
  	scales: {
	    y: {
	    	display: false,
      	ticks: {
        	stepSize: 1
      	},
	    }
  	}
};

var setOptions3 = {
  	responsive: true,
  	plugins: {
	    legend: {
	      display: true,
	      position: 'top',
	    },
	    title: {
	        display: true,
	        text: 'Grafica 3',
	        font: {
	          size: 25
	        }
	    },
	    datalabels: {
        color: 'white',
        font: {
            size: 15
         }
      }
	},
  	scales: {
	    y: {
	    	display: false,
      	ticks: {
        	stepSize: 1
      	},
	    }
  	}
};

var setOptions4 = {
  	responsive: true,
  	plugins: {
	    legend: {
	      display: true,
	      position: 'top',
	    },
	    title: {
	        display: true,
	        text: 'Grafica 4',
	        font: {
	          size: 25
	        }
	    },
	    datalabels: {
        color: 'black',
        font: {
            size: 10
         }
      }
	},
  	scales: {
	    y: {
	      	ticks: {
	        	stepSize: 1
	      	},
	    },
	    x: {
	     	ticks: {
	       	stepSize: 1
	     	},
	    }
  	}
};

var data1 = {
  	labels: ['RECIBIDA DE TURNO','ENTREGA DE TURNO','REPORTES HURTO EN LOCALES','REPORTES ENGAÑOS - PAQUETE ENGAÑOSO'],
  	datasets: [
    {
      	label: 'Ventas',
      	data: [8,26,9,10],
      	backgroundColor: '#f1c40f',
    },
  ]
};

var data2 = {
  	labels: ['Enero-2023','Febrero-2023','Marzo-2023','Abril-2023','Mayo-2023'],
  	datasets: [
	    {
	      	label: 'Ventas',
	      	data: [8,26,9,10],
	      	borderColor: '#f1c40f',
	      	fill: false,
	    },
	    {
	      	label: 'Producción',
	      	data: [18,21,12,19],
	      	borderColor: '#d35400',
	      	fill: false,
	    },
	    {
	      	label: 'Logistica',
	      	data: [13,16,4,12],
	      	borderColor: '#95a5a6',
	      	fill: false,
	    },
	    {
	      	label: 'Almacen',
	      	data: [12,26,23,23],
	      	borderColor: '#34495e',
	      	fill: false,
	    },
  ]
};


window.onload = function(){
	setHideElements();
}

function getInformationRequest() {
	let search = $("#name").val();
	let cedula = $("#cedula").val();
	let optionTop = $("#optionTop").val();
	let period = $("#period").val();
	let urlLinkaform = 'https://app.linkaform.com/api/infosync/scripts/run/';

	$("#divLoad").show();
	setHideElements();
	//let urlLinkaform = 'https://preprod.linkaform.com/infosync/scripts/run/';

  fetch(urlLinkaform, {
    method: 'POST',
    body: JSON.stringify({
      script_id: 114777,
      filter_search: search,
      filter_cedula: cedula,
      filter_top: optionTop,
      filter_period: period,
    }),
    headers:{
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
  .then(res => {
    if (res.success) {
    	$("#divLoad").hide();
    	let elementTable = res.response && res.response.response_table ? res.response.response_table : [];
    	let elementGraphic = res.response && res.response.response_graphic ? res.response.response_graphic : {};
    	let elementGraphic2 = res.response && res.response.response_graphic2 ? res.response.response_graphic2 : {};
    	let elementGraphic3 = res.response && res.response.response_graphic3 ? res.response.response_graphic3 : {};


    	if( elementTable.length > 0 ){
				drawTable('firstElement',columsData, elementTable,400);
				document.getElementById("divContentFirst").style.removeProperty('display');
    	}
    	if( elementGraphic ){
    		drawGraphicFirst(elementGraphic,setOptions1);
    		document.getElementById("divContentSecond").style.removeProperty('display');
    	}
    	if( elementGraphic2 ){
    		drawGraphicSecond(elementGraphic2,setOptions2);
    		document.getElementById("divContentThird").style.removeProperty('display');
    	}
    	if( elementGraphic3 ){
    		drawGraphicThird(elementGraphic3,setOptions3);
    		document.getElementById("divContentFourth").style.removeProperty('display');
    	}

    	drawGraphicFourth(data2,setOptions4);
    	document.getElementById("divContentFiveth").style.removeProperty('display');
    } 
  })
}


//----STYLE
function setHideElements(){
	$('#divContentFirst').hide();
	$('#divContentSecond').hide();
	$('#divContentThird').hide();
	$('#divContentFourth').hide();
	$('#divContentFiveth').hide();
}

//-----TABLES
function drawTable(id, columnsData, tableData, height = 500){
  var  table = new Tabulator("#" + id, {
    height:height +"px",
    layout:"fitDataTable",
    data:tableData,
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
  //----Add Color
  let  length = data['labels'].length;
  let list_colors = getPAlleteColors(5,length);
  data['datasets'][0]['backgroundColor'] = list_colors;
  data['datasets'][0]['borderColor'] = list_colors;
  chart2 = new Chart(ctx, {
    type: 'pie',
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
  //----Add Color
  let  length = data['labels'].length;
  let list_colors = getPAlleteColors(5,length);
  data['datasets'][0]['backgroundColor'] = list_colors;
  data['datasets'][0]['borderColor'] = list_colors;


  chart3 = new Chart(ctx, {
    type: 'doughnut',
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
  //----Add Color
  /*let  length = data['labels'].length;
  let list_colors = getPAlleteColors(5,length);
  data['datasets'][0]['backgroundColor'] = list_colors;
  data['datasets'][0]['borderColor'] = list_colors;*/


  chart4 = new Chart(ctx, {
    type: 'line',
    data:data,
    options: setOptions,
    plugins: [ChartDataLabels],
  });
}