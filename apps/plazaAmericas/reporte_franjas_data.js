
//-----Configuiración de la grafica
var setOptions1 = {
  	responsive: true,
  	plugins: {
	    legend: {
	      display: true,
	      position: 'top',
	    },
	    title: {
	        display: true,
	        text: 'Grafica Franjas Horarias X Mes',
	        font: {
	          size: 20
	        }
	    },
	    datalabels: {
        color: 'black',
        font: {
            size: 15
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

var dataChart1 = {
  	labels: ['Mes Enero','Mes Marzo','Mes Abril','Mes Mayo'],
  	datasets: [
	    {
	      	label: 'Franja 1',
	      	data: [20,15,4,3,10],
	      	fill: false,
    		borderColor: 'rgb(75, 192, 192)',
	    },
	    {
	      	label: 'Franja 1',
	      	data: [20,15,4,3,10],
	      	fill: false,
    		borderColor: 'rgb(75, 192, 192)',
	    },
	    {
	      	label: 'Franja 1',
	      	data: [20,15,4,3,10],
	      	fill: false,
    		borderColor: 'rgb(75, 192, 192)',
	    },
	    {
	      	label: 'Franja 1',
	      	data: [20,15,4,3,10],
	      	fill: false,
    		borderColor: 'rgb(75, 192, 192)',
	    },
	    {
	      	label: 'Franja 1',
	      	data: [20,15,4,3,10],
	      	fill: false,
    		borderColor: 'rgb(75, 192, 192)',
	    },
  	]
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
	        text: 'Grafica Franjas Horarias X Mes especifico',
	        font: {
	          size: 20
	        }
	    },
	    datalabels: {
        color: 'black',
        font: {
            size: 15
         }
      }
	},
  	scales: {
	    y: {
	    	display: true,
	      	ticks: {
	        	stepSize: 1
	      	},
	    }
  	}
};

var dataChart2 = {
  	labels: ['Rango 20-30','Rango 31-40','Rango 41-50','Rango 51-60'],
  	datasets: [
	    {
	      	label: 'Cantidad',
	      	data: [20,15,4,3],
	      	backgroundColor: '#f1c40f',
	      	borderColor: '#f1c40f',
	    },

  	]
};