//---Tabla

var columsTable1 = [
  { title:"Ruma", field:'ruma',hozAlign:"left",width:200},
  { title:"Cliente", field:'cliente',hozAlign:"left",width:200},
  { title:"Toneladas en cancha de Minerales", field:'toneladas_cancha',hozAlign:"right",width:230},
  { title:"Toneladas en proceso", field:'toneladas_proceso',hozAlign:"right",width:220},
  { title:"Total", field:'toneladas_total',hozAlign:"right",width:220},
  { title:"Viajes Diarios",  field:'viajes',hozAlign:"right",width:200 },
];

var dataTable1 = [
  {
    ruma: "19", 
    cliente:"Cliente Ejemplo",
    toneladas_cancha: 500,
    toneladas_proceso:300,
    toneladas_total : 200,
    viajes:12
  },
  {
    ruma: "20", 
    cliente:"Cliente Ejemplo",
    toneladas_cancha: 760,
    toneladas_proceso:380,
    toneladas_total : 380,
    viajes:45,
  },
  {
    ruma: "21", 
    cliente:"Cliente Ejemplo",
    toneladas_cancha: 259,
    toneladas_proceso:100,
    toneladas_total : 159,
    viajes:78,
  },
  {
    ruma: "22", 
    cliente:"Cliente Ejemplo",
    toneladas_cancha: 478,
    toneladas_proceso:150,
    toneladas_total : 328,
    viajes:36,
  },
  {
    ruma: "23", 
    cliente:"Cliente Ejemplo",
    toneladas_cancha: 741,
    toneladas_proceso:500,
    toneladas_total : 241,
    viajes:23,
  },
];


//---Grafica 

var dataElement2 = {
	labels: ["Ruma 19","Ruma 20","Ruma 21","Ruma 22","Ruma 23"],
	datasets: [
		{
			label: "Toneladas en Cancha",
		  	data: [500,760,380,259,478,741],
		  	yAxisID: "ay",
		  	backgroundColor: "#5fa55a",
		},
		{
			label: "Toneladas en Proceso",
		  	data: [300,380,100,150,500],
		  	yAxisID: "ay",
		  	backgroundColor: "#01b4bc",
		},
		{
			label: "Toneladas totales",
		  	data: [200,380,159,328,241],
		  	yAxisID: "ay",
		  	backgroundColor: "#fa5457",
		},
		{
			label: "Viajes",
		  	data: [12,45,78,36,23],
		  	yAxisID: "ay1",
		  	backgroundColor: "#fa8925",
		}
	]
};

var dataElement3 = {
	labels: ["Total"],
	datasets: [
		{
			label: "Ruma 1",
		  	data: [150],
		  	backgroundColor: "#5fa55a",
		},
		{
			label: "Ruma 2",
			data: [780],
			backgroundColor: "#01b4bc",
		},
		{
			label: "Ruma 3",
		  	data: [630],
		  	backgroundColor: "#f6d51f",
		},
		{
			label: "Ruma 4",
			data: [230],
			backgroundColor: "#fa8925",
		},
		{
			label: "Ruma 5",
		  	data: [890],
		  	backgroundColor: "#fa5457",
		}
	]
};

var dataElement4 = {
	labels: ["Total"],
	datasets: [
		{
			label: "Ruma 1",
		  	data: [12],
		  	backgroundColor: "#5fa55a",
		},
		{
			label: "Ruma 2",
			data: [45],
			backgroundColor: "#01b4bc",
		},
		{
			label: "Ruma 3",
		  	data: [78],
		  	backgroundColor: "#f6d51f",
		},
		{
			label: "Ruma 4",
			data: [36],
			backgroundColor: "#fa8925",
		},
		{
			label: "Ruma 5",
		  	data: [23],
		  	backgroundColor: "#fa5457",
		}
	]
};



var setOptions = {
	plugins: {
		legend: {
			display: true,
		},
		title: {
          	display: true,
          	text: 'Reporte General',
          	font: {
            	size: 25
          	}
        },
		datalabels: {
		    color: 'white',
		    font: {
		        weight: 'bold',
		        size: 18,
			},
		    align:'bot',
    	}
	},
	scales: {
		x: {
			display: true,
			gridLines: {
				display: true,
			},
		},
		"ay": {
			type: 'linear',
			display: true,
			title:{
				display: true,
				text: 'Reporte General',
				size: 20,
			},
			ticks: {
				fontSize: 30
			},
			position: 'left',
		},
		"ay1": {
			type: 'linear',
			display: true,
			title:{
				display: true,
				text: 'Viajes',
				size: 20,
			},
			ticks: {
				fontSize: 30
			},
			position: 'right',
		}
	},
};


var setOptions3 = {
	plugins: {
		legend: {
			display: true,
		},
		title: {
          	display: true,
          	text: 'Reporte de Toneladas en Cancha',
          	font: {
            	size: 25
          	}
        },
		datalabels: {
		    color: 'white',
		    font: {
		        weight: 'bold',
		        size: 20,
			},
		    align:'bot',
    	}
	},
	scales: {
		x: {
			display: true,
			stacked: true,
			gridLines: {
				display: true,
			},
		},
		y: {
			display: true,
			stacked: true,
			gridLines: {
				display: true,
			},
		},
	},
};


var setOptions4 = {
	plugins: {
		legend: {
			display: true,
		},
		title: {
          	display: true,
          	text: 'Reporte de Toneladas en Proceso',
          	font: {
            	size: 25
          	}
        },
		datalabels: {
		    color: 'white',
		    font: {
		        weight: 'bold',
		        size: 20,
			},
		    align:'bot',
    	}
	},
	scales: {
		x: {
			display: true,
			stacked: true,
			gridLines: {
				display: true,
			},
		},
		y: {
			display: true,
			stacked: true,
			gridLines: {
				display: true,
			},
		},
	},
};
