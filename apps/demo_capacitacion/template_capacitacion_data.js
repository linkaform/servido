//-----Configuración de la tabla
const columsData1 = [
	{ title:"Nombre del empleado", field:'nameUser',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Apellido Paterno", field:'lastnameUser1',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Apellido Materno", field:'lastnameUser2',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Apellido Edad", field:'age',hozAlign:"left",headerFilter:true,width:250},
	{ title:"Fecha de nacimiento", field:'dateBorn',hozAlign:"left",headerFilter:false,width:250},
]

const dataTable1 =  [
    {"nameUser": "Juan", "lastnameUser1": "González", "lastnameUser2": "López", "age": 35, "dateBorn": "10/05/1989"},
    {"nameUser": "María", "lastnameUser1": "Martínez", "lastnameUser2": "García", "age": 28, "dateBorn": "15/12/1996"},
    {"nameUser": "Pedro", "lastnameUser1": "Díaz", "lastnameUser2": "Sánchez", "age": 40, "dateBorn": "03/07/1982"},
    {"nameUser": "Ana", "lastnameUser1": "Hernández", "lastnameUser2": "Rodríguez", "age": 30, "dateBorn": "22/09/1991"},
    {"nameUser": "Luis", "lastnameUser1": "López", "lastnameUser2": "Pérez", "age": 45, "dateBorn": "05/11/1979"},
    {"nameUser": "Laura", "lastnameUser1": "Gómez", "lastnameUser2": "Fernández", "age": 25, "dateBorn": "12/04/1999"},
    {"nameUser": "Carlos", "lastnameUser1": "Torres", "lastnameUser2": "Jiménez", "age": 33, "dateBorn": "18/07/1990"},
    {"nameUser": "Sofía", "lastnameUser1": "Ruiz", "lastnameUser2": "Santos", "age": 38, "dateBorn": "30/03/1986"},
    {"nameUser": "David", "lastnameUser1": "Moreno", "lastnameUser2": "Morales", "age": 29, "dateBorn": "08/06/1995"},
    {"nameUser": "Elena", "lastnameUser1": "Castro", "lastnameUser2": "Ortega", "age": 42, "dateBorn": "20/02/1982"},
    {"nameUser": "Javier", "lastnameUser1": "Ramírez", "lastnameUser2": "Navarro", "age": 31, "dateBorn": "14/10/1993"},
    {"nameUser": "Marta", "lastnameUser1": "Vargas", "lastnameUser2": "Molina", "age": 27, "dateBorn": "25/01/1997"},
    {"nameUser": "Alejandro", "lastnameUser1": "Cruz", "lastnameUser2": "Iglesias", "age": 36, "dateBorn": "09/08/1988"},
    {"nameUser": "Lucía", "lastnameUser1": "Fuentes", "lastnameUser2": "Romero", "age": 34, "dateBorn": "17/06/1990"},
    {"nameUser": "Adrián", "lastnameUser1": "Serrano", "lastnameUser2": "Martín", "age": 39, "dateBorn": "28/04/1985"},
    {"nameUser": "Paula", "lastnameUser1": "Reyes", "lastnameUser2": "Gutiérrez", "age": 26, "dateBorn": "11/03/1998"},
    {"nameUser": "Antonio", "lastnameUser1": "Núñez", "lastnameUser2": "Silva", "age": 32, "dateBorn": "23/08/1992"},
    {"nameUser": "Isabel", "lastnameUser1": "Ortiz", "lastnameUser2": "Vázquez", "age": 37, "dateBorn": "06/01/1987"},
    {"nameUser": "Diego", "lastnameUser1": "Garrido", "lastnameUser2": "Luna", "age": 29, "dateBorn": "19/07/1995"},
    {"nameUser": "Carmen", "lastnameUser1": "Flores", "lastnameUser2": "Díaz", "age": 41, "dateBorn": "04/09/1983"}
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
	        display: true,
	        text: 'Grafica Capacitación Usuarios 1',
	        font: {
	          size: 20
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


var dataChart1 = {
  	labels: ['Rango 20-30','Rango 31-40','Rango 41-50','Rango 51-60'],
  	datasets: [
	    {
	      	label: 'Cantidad',
	      	data: [20,15,4,3],
	      	backgroundColor: '#f1c40f',
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
	        text: 'Grafica Capacitación Usuarios 1',
	        font: {
	          size: 20
	        }
	    },
	    datalabels: {
        color: 'black',
        font: {
            size: 20
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
	      	label: 'Cantidad de Familia',
	      	data: [3,4,2,3],
	      	backgroundColor: '#f1c40f',
	      	borderColor: '#f1c40f',
	      	type:'line'
	    },
	    {
	      	label: 'Cantidad',
	      	data: [20,15,4,3],
	      	backgroundColor: '#f1c40f',
	      	borderColor: '#f1c40f',
	    },

  	]
};