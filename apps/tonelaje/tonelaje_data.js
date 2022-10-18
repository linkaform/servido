
//---Grafica Hora
var dataElement2 = {
	labels: ["Excelente"],
	datasets: [{
    data: [10],
    backgroundColor: ["#e74c3c"],
	 }]
};

//---Grafica Densidad
var dataElement5 = {
	labels: ["Alerta"],
	datasets: [{
    data: [1300],
    backgroundColor: ["#2ecc71"],
	 }]
};

//---Grafica Malla
var dataElement1 = {
	labels: ["Alerta"],
	datasets: [{
    data: [1450],
    backgroundColor: ["#e74c3c"],
	 }]
};


//---Grafica BOLAS
var dataElement3 = {
	labels: ["Alerta"],
	datasets: [
		{
			label: "Menos De La Mitad",
		  data: [50],
		  backgroundColor: "#abb2b9",
		 },
		 {
				label: "La Mitad",
			  data: [50],
			  backgroundColor: "#abb2b9",
		 },
		 {
				label: "Completo",
			  data: [50],
			  //backgroundColor: "#abb2b9",
			  backgroundColor: "#2ecc71",
		 }

	 ]
};

var dataElement4 = {
	labels: ["Acido","Acido","Acido","Acido","Acido","Acido","Neutral","Alcalino","Alcalino","Alcalino","Alcalino","Alcalino","Alcalino","Alcalino"],
	datasets: [{
    backgroundColor: ["#F21D2F","#FF7A1B","#F6C715","#F6E501","#B7D333","#86C045","#50B74A","#36A944","#24B46F","#08BCB6","#4C8ECA","#3A53A3","#594E9A","#583D9A","#37247E"],
    data: [1,1,1,1,2,1,1,1,1,1,1,1,1,1],
  }]
};


var setOptions = {
	plugins: {
		legend: {
			display: false,
		},
		datalabels: {
		    color: 'white',
		    font: {
		        weight: 'bold',
		        size: 35,
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
			gridLines: {
				display: false,
			},
		},
		y:{
			display: false,
			gridLines: {
				display: false,
			},
		}
	},
};

var setOptionsBolas = {
	plugins: {
		legend: {
			display: false,
		},
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
	indexAxis: 'y',
};




var setOptionsPh = {
	plugins: {
		legend: {
			display: false,
		},
		datalabels: {
		    color: 'white',
		    font: {
		        weight: 'bold',
		        size: 35,
			},
		  align:'bot',
		  formatter: function (value, context){
      	return context.dataIndex + 1;
    	}
    },
	},
	scales: {
		x: {
			display: false,
			gridLines: {
				display: false,
			},
		},
		y:{
			display: false,
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
			font: {
		    weight: 'bold',
		    size: 15,
			},
		},
		
		datalabels: {
		    color: 'white',
		    font: {
		        weight: 'bold',
		        size: 35,
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