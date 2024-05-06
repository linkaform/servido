//-----Configuración de la tabla
const columsData1 = [
	{ title:"Folio", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
        url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
        target:"_blank",
    },headerFilter:"input", width:150},
 	{
        title:"Información del Usuario",
        columns: [
			{ title:"Nombre del empleado", field:'name_user',hozAlign:"left",headerFilter:true,width:250},
			{ title:"Apellido Paterno", field:'lastname1_user',hozAlign:"left",headerFilter:true,width:250},
			{ title:"Apellido Materno", field:'lastname2_user',hozAlign:"left",headerFilter:true,width:250},
			{ title:"Apellido Edad", field:'age_user',hozAlign:"left",headerFilter:true,width:250},
			{ title:"Fecha de nacimiento", field:'dateborn_user',hozAlign:"left",headerFilter:false,width:250},
			{ title:"Compañia de Usuario", field:'company_user',hozAlign:"left",headerFilter:false,width:250},
		],
	},
	{
        title:"Información del Familiar",
        columns: [
			{ title:"Nombre familiar", field:'name_parent',hozAlign:"left",headerFilter:true,width:250},
			{ title:"Edad familiar", field:'age_parent',hozAlign:"left",headerFilter:true,width:250},
			{ title:"Tipo familiar", field:'type_parent',hozAlign:"left",headerFilter:true,width:250},
		]
	}

]

const dataTable1 =  [
    {"name_user": "Juan", "lastname1_user": "González", "lastname2_user": "López", "age_user": 35, "dateborn_user": "10/05/1989"},
    {"name_user": "María", "lastname1_user": "Martínez", "lastname2_user": "García", "age_user": 28, "dateborn_user": "15/12/1996"},
    {"name_user": "Pedro", "lastname1_user": "Díaz", "lastname2_user": "Sánchez", "age_user": 40, "dateborn_user": "03/07/1982"},
    {"name_user": "Ana", "lastname1_user": "Hernández", "lastname2_user": "Rodríguez", "age_user": 30, "dateborn_user": "22/09/1991"},
    {"name_user": "Luis", "lastname1_user": "López", "lastname2_user": "Pérez", "age_user": 45, "dateborn_user": "05/11/1979"},
    {"name_user": "Laura", "lastname1_user": "Gómez", "lastname2_user": "Fernández", "age_user": 25, "dateborn_user": "12/04/1999"},
    {"name_user": "Carlos", "lastname1_user": "Torres", "lastname2_user": "Jiménez", "age_user": 33, "dateborn_user": "18/07/1990"},
    {"name_user": "Sofía", "lastname1_user": "Ruiz", "lastname2_user": "Santos", "age_user": 38, "dateborn_user": "30/03/1986"},
    {"name_user": "David", "lastname1_user": "Moreno", "lastname2_user": "Morales", "age_user": 29, "dateborn_user": "08/06/1995"},
    {"name_user": "Elena", "lastname1_user": "Castro", "lastname2_user": "Ortega", "age_user": 42, "dateborn_user": "20/02/1982"},
    {"name_user": "Javier", "lastname1_user": "Ramírez", "lastname2_user": "Navarro", "age_user": 31, "dateborn_user": "14/10/1993"},
    {"name_user": "Marta", "lastname1_user": "Vargas", "lastname2_user": "Molina", "age_user": 27, "dateborn_user": "25/01/1997"},
    {"name_user": "Alejandro", "lastname1_user": "Cruz", "lastname2_user": "Iglesias", "age_user": 36, "dateborn_user": "09/08/1988"},
    {"name_user": "Lucía", "lastname1_user": "Fuentes", "lastname2_user": "Romero", "age_user": 34, "dateborn_user": "17/06/1990"},
    {"name_user": "Adrián", "lastname1_user": "Serrano", "lastname2_user": "Martín", "age_user": 39, "dateborn_user": "28/04/1985"},
	{"name_user": "Paula", "lastname1_user": "Reyes", "lastname2_user": "Gutiérrez", "age_user": 26, "dateborn_user": "11/03/1998"},
	{"name_user": "Antonio", "lastname1_user": "Núñez", "lastname2_user": "Silva", "age_user": 32, "dateborn_user": "23/08/1992"},
	{"name_user": "Isabel", "lastname1_user": "Ortiz", "lastname2_user": "Vázquez", "age_user": 37, "dateborn_user": "06/01/1987"},
	{"name_user": "Diego", "lastname1_user": "Garrido", "lastname2_user": "Luna", "age_user": 29, "dateborn_user": "19/07/1995"},
	{"name_user": "Carmen", "lastname1_user": "Flores", "lastname2_user": "Díaz", "age_user": 41, "dateborn_user": "04/09/1983"}
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
	        text: 'Grafica Capacitación Usuarios 2',
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
	      	label: 'Cantidad',
	      	data: [20,15,4,3],
	      	backgroundColor: '#f1c40f',
	      	borderColor: '#f1c40f',
	    },

  	]
};