// Datos demo para Reporte Desempeno Jornales

//---Grafica Malla
var dataElement1 = {
	labels: ["Total"],
	datasets: [
		{
			label: "Muy Grueso",
	        data: [10],
	        backgroundColor: "#d35400",
	        hoverBackgroundColor: "#d35400"
	    },
	    {
	    	label: "Grueso",
	        data: [10],
	        backgroundColor: " #f4d03f",
	        hoverBackgroundColor: " #f4d03f"
	    },
	    {
	    	label: "Normal",
	        data: [50],
	        backgroundColor: " #28b463 ",
	        hoverBackgroundColor: " #28b463"
	    },
	    {
	    	label: "Fino",
	        data: [10],
	        backgroundColor: " #1e8449 ",
	        hoverBackgroundColor: "#1e8449"
	    },
	    {
	    	label: "Muy Fino",
	        data: [10],
	        backgroundColor: " #0e6655",
	        hoverBackgroundColor: " #0e6655"
	    },
    ]
};

//---Grafica Hora
var dataElement2 = {
	labels: ["Total"],
	datasets: [
		{
			label: "Excelente",
	        data: [10],
	        backgroundColor: "#d35400",
	        hoverBackgroundColor: "#d35400"
	    }
    ]
};


//---Grafica PH
var dataElement4 = {
	labels: ["Total"],
	datasets: [
		{
			label: "Muy Grueso",
	        data: [10],
	        backgroundColor: "#d35400",
	        hoverBackgroundColor: "#d35400"
	    },
	    {
	    	label: "Grueso",
	        data: [10],
	        backgroundColor: " #f4d03f",
	        hoverBackgroundColor: " #f4d03f"
	    },
	    {
	    	label: "Normal",
	        data: [50],
	        backgroundColor: " #28b463 ",
	        hoverBackgroundColor: " #28b463"
	    },
	    {
	    	label: "Fino",
	        data: [10],
	        backgroundColor: " #1e8449 ",
	        hoverBackgroundColor: "#1e8449"
	    },
	    {
	    	label: "Muy Fino",
	        data: [10],
	        backgroundColor: " #0e6655",
	        hoverBackgroundColor: " #0e6655"
	    },
    ]
};


var setOptions = {
	plugins: {
		legend: {
			display: true,
		},
		datalabels: {
		    color: 'white',
		    font: {
		        weight: 'bold',
		        size: 45,
			},
		    align:'bot',
    	}
	},
	tooltips: {
		enabled: false
	},
	scales: {
		x: {
			display: false,
			stacked: true,
			gridLines: {
				display: false,
			},
		},
		y:{
			display: false,
			stacked: true,
			gridLines: {
				display: false,
			},
		}
	},
};

var setOptionsBolas = {
	plugins: {
		legend: {
			display: true,
		},
		 tooltips: {
        callbacks: {
           		label: function(tooltipItem) {
                  return tooltipItem.xLabel;
           		}
        	}
    	}
	},
	hover: {mode: null},
	scales: {
		x: {
			display: false,
			stacked: true,
			gridLines: {
				display: false,
			},
		},
		y:{
			display: false,
			stacked: true,
			gridLines: {
				display: false,
			},
		}
	},
};


var setOptionsDounougth = {
	plugins: {
		legend: {
			display: true,
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
	tooltips: {
		enabled: false
	},
	scales: {
		x: {
			display: false,
			stacked: true,
			gridLines: {
				display: false,
			},
		},
		y:{
			display: false,
			stacked: true,
			gridLines: {
				display: false,
			},
		}
	},
};