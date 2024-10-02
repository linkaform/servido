var columsTable1 = [
  	{ title:"Empleado",field:'empleado',hozAlign:"left", headerFilter:"input",width:200 },
  	{ title:"Fecha",field:'fecha',hozAlign:"left", headerFilter:"input",width:150 },
  	{ title:"Causa",  field:'causa',hozAlign:"right", headerFilter:"input",width:100 },
];

let dataTable1 = [
    {"empleado": "Carlos Pérez", "fecha": "2024-10-01", "causa": "Enfermedad"},
    {"empleado": "María Gómez", "fecha": "2024-09-30", "causa": "Día personal"},
    {"empleado": "Juan Martínez", "fecha": "2024-09-29", "causa": "Cita médica"},
    {"empleado": "Ana Rodríguez", "fecha": "2024-09-28", "causa": "Accidente de tráfico"},
    {"empleado": "Pedro Jiménez", "fecha": "2024-09-27", "causa": "Enfermedad"},
    {"empleado": "Lucía Fernández", "fecha": "2024-09-26", "causa": "Día de vacaciones"},
    {"empleado": "Javier Ramírez", "fecha": "2024-09-25", "causa": "Problema familiar"},
    {"empleado": "Laura Torres", "fecha": "2024-09-24", "causa": "Maternidad"},
    {"empleado": "Andrés López", "fecha": "2024-09-23", "causa": "Permiso sin goce de sueldo"},
    {"empleado": "Sara Díaz", "fecha": "2024-09-22", "causa": "Fallecimiento de familiar"}
]





//-----Configuiración de la grafica
var setOptions1 = {
  	responsive: true,
  	plugins: {
	    legend: {
	      display: true,
	      position: 'top',
	    },
	    title: {
	        display: false,
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
	scales: {
	    y: {
	        step: 1,
	    }
	},
};

var dataChart1 = {
  	labels: ['02-Oct','03-Oct','04-Oct','05-Oct'],
  	datasets: [
	    {
	      	label: 'Asistencia',
	      	data: [9,9,8,7],
	      	fill: false,
    		backgroundColor: '#007CB3',
	    },
	    {
	      	label: 'Falta',
	      	data: [1,1,2,3],
	      	fill: false,
    		backgroundColor: '#e74c3c',
	    },
  	]
};

var setOptions2 = {
  	responsive: true,
  	maintainAspectRatio: false,
  	plugins: {
	    legend: {
	      display: true,
	      position: 'top',
	    },
	    title: {
	        display: false,
	    },
	    datalabels: {
        color: 'black',
        font: {
            size: 15
         }
      }
	},
};

var dataChart2 = {
  	labels: ['Enfermedad','Incapacidad','Retardo','Falta'],
  	datasets: [
	    {
	      	label: 'Cantidad',
	      	data: [20,5,50,10],
	      	backgroundColor: ['#007CB3','#EFB03B'],
	      	borderColor: ['#007CB3','#EFB03B'],
	    },

  	]
};