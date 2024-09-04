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
	        text: 'Ordering Item',
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
	    	step: 1,
	    }
	},
    maintainAspectRatio: false ,
};

var dataChart1 = {
  	labels: ['Yes','No'],
  	datasets: [
	    {
	      	label: 'Records',
	      	data: [10,7],
	      	fill: false,
    		backgroundColor: ['#3498db','#2773a5'],
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
	        text: 'Hours project per week',
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
    maintainAspectRatio: false ,
};

var dataChart2 = {
  	labels: ['Other','Maitenance','Clean Up','Capex','Cutting Grass'],
  	datasets: [
	    {
	      	label: 'Horas',
	      	data: [20,40,40,50,10],
	    },

  	]
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
	        text: 'Percentage Projects Doing',
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
	responsive: true, 
    maintainAspectRatio: false ,
};


var dataChart3 = {
  	labels: ['Other','Maitenance','Clean Up','Capex','Cutting Grass'],
  	datasets: [
	    {
	      	label: 'Total',
	      	data: [80,40,70,96,30],
	      	fill: false,
	    },
  	]
};