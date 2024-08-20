//-----Table
// Datos demo para Reporte ENcuestas MOntaje

//--TABLE
var columsTable1 = [
  { title:"Técnico", field:'tecnico',hozAlign:"left", headerFilter:"input",width:200},
  { title:"Servicios Realizados",field:'servicio',hozAlign:"left", headerFilter:"input",width:300 },
  { title:"Clientes",field:'cliente',hozAlign:"left", headerFilter:"input",width:300 },
  { title:"Tipo",field:'tipo_trabajo',hozAlign:"left", headerFilter:"input",width:300 },
  { title:"Equipos Realizados",field:'equipo',hozAlign:"left", headerFilter:"input",width:300 },
  { title:"Hora Inicio",  field:'hora_inicio',hozAlign:"left", headerFilter:"input",width:150 },
  { title:"Hora Fin",  field:'hora_fin',hozAlign:"left", headerFilter:"input",width:150 },
  { title:"Hras Efectivas",  field:'horas_totales',hozAlign:"left", headerFilter:"input",width:150 },
];





let dataTable1  = [
    {
        tecnico: "Carlos Gómez",
        color: '#0378A6',
        cliente: "Juan Pérez",
        horas_totales: 7.5,
        servicio : 3,
        _children:[
        	{
		        servicio: "d6b4e",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "14:15",
		        hora_fin: "16:45",
		        horas_totales: 2.5,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "e7c5b",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "07:45",
		        hora_fin: "10:00",
		        horas_totales: 2.25,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "f8d6c",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "13:30",
		        hora_fin: "15:30",
		        horas_totales: 2,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
        ]
    },
    {
        tecnico: "Laura Martínez",
        color: '#0378A6',
        cliente: "Ana López",
        horas_totales: 6.5,
        servicio : 3,
        _children:[
        	{
		        servicio: "a9e7d",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "08:00",
		        hora_fin: "09:45",
		        horas_totales: 1.75,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]

		    },
		    {
		        servicio: "b0f8e",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "10:15",
		        hora_fin: "12:30",
		        horas_totales: 2.25,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]

		    },
		    {
		        servicio: "c1a9f",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "09:00",
		        hora_fin: "11:30",
		        horas_totales: 2.5,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]

		    },
        ]
    },
    {
        tecnico: "Miguel Torres",
        color: '#0378A6',
        cliente: "Carlos Ramírez",
        horas_totales:7.25,
        servicio : 3,
        _children:[
        	{
		        servicio: "d2b0a",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "12:45",
		        hora_fin: "15:15",
		        horas_totales: 2.5,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "e3c1b",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "14:00",
		        hora_fin: "16:00",
		        horas_totales: 2,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "f4d2c",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "08:30",
		        hora_fin: "10:15",
		        horas_totales: 1.75,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
        ]
    },
    {
        tecnico: "María Fernández",
        color: '#0378A6',
        cliente: "Laura Sánchez",
        horas_totales: 6.75,
        servicio : 3,
        _children:[
			{
			    servicio: "a5e3d",
			    tipo_trabajo: "Preventivo",
			    hora_inicio: "11:45",
			    hora_fin: "14:00",
			    horas_totales: 2.25,
			    _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
			},
			{
			    servicio: "b6f4e",
			    tipo_trabajo: "Correctivo",
			    hora_inicio: "07:15",
			    hora_fin: "09:30",
			    horas_totales: 2.25,
			    _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
			},
			{
			    servicio: "c7a5f",
			    tipo_trabajo: "Preventivo",
			    hora_inicio: "10:30",
			    hora_fin: "12:45",
			    horas_totales: 2.25,
			    _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
			},
        ]
    },
    {
        tecnico: "Jorge Díaz",
        color: '#0378A6',
        cliente: "Pedro Gómez",
        horas_totales: 5.75,
        servicio : 3,
        _children:[
        	{
		        servicio: "d8b6a",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "13:15",
		        hora_fin: "15:15",
		        horas_totales: 2,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "e9c7b",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "08:45",
		        hora_fin: "11:00",
		        horas_totales: 2.25,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "f0d8c",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "14:30",
		        hora_fin: "16:00",
		        horas_totales: 1.5,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
        ]
    },
    {
        tecnico: "Sofía Herrera",
        color: '#0378A6',
        cliente: "Marta Ruiz",
        horas_totales: 6.25,
        servicio : 3,
        _children:[
        	{
		        servicio: "a1e9d",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "09:15",
		        hora_fin: "11:15",
		        horas_totales: 2,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "b2f0e",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "11:30",
		        hora_fin: "13:45",
		        horas_totales: 2.25,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "c3f1b",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "08:30",
		        hora_fin: "10:30",
		        horas_totales: 2,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
        ]
    },
    {
        tecnico: "Antonio Pérez",
        color: '#0378A6',
        cliente: "Luis García",
        horas_totales: 7,
        servicio : 3,
        _children:[
        	{
		        servicio: "d4a2c",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "12:00",
		        hora_fin: "14:30",
		        horas_totales: 2.5,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "e5b3d",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "15:00",
		        hora_fin: "17:00",
		        horas_totales: 2,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "f6c4e",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "09:45",
		        hora_fin: "12:15",
		        horas_totales: 2.5,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
        ]
    },
    {
        tecnico: "Elena López",
        color: '#0378A6',
        cliente: "Rosa Méndez",
        horas_totales: 6.5,
        servicio : 3,
        _children:[
        	{
		        servicio: "a7d5f",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "13:00",
		        hora_fin: "15:15",
		        horas_totales: 2.25,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "b8e6a",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "10:15",
		        hora_fin: "12:30",
		        horas_totales: 2.25,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "c9f7b",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "14:30",
		        hora_fin: "16:30",
		        horas_totales: 2,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
        ]
    },
    {
        tecnico: "Fernando Martínez",
        color: '#0378A6',
        cliente: "Javier Ortega",
        horas_totales: 6.5,
        servicio : 3,
        _children:[
        	{
		        servicio: "d0a8c",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "08:00",
		        hora_fin: "10:00",
		        horas_totales: 2,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "e1b9d",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "11:00",
		        hora_fin: "13:30",
		        horas_totales: 2.5,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "f2c0e",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "15:30",
		        hora_fin: "17:30",
		        horas_totales: 2,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
        ]
    },
    {
        tecnico: "Ana Torres",
        color: '#0378A6',
        cliente: "Isabel Paredes",
        horas_totales: 6.5,
        servicio : 3,
        _children:[
        	{
		        servicio: "a3d1f",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "09:00",
		        hora_fin: "11:15",
		        horas_totales: 2.25,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "b4e2a",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "07:30",
		        hora_fin: "09:30",
		        horas_totales: 2,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "c5f3b",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "10:45",
		        hora_fin: "13:00",
		        horas_totales: 2.25,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
        ]
    },
    {
        tecnico: "Luis Sánchez",
        color: '#0378A6',
        cliente: "Alejandro Silva",
        horas_totales: 7,
        servicio : 3,
        _children:[
        	{
		        servicio: "d6a4c",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "13:30",
		        hora_fin: "15:45",
		        horas_totales: 2.25,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "e7b5d",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "08:15",
		        hora_fin: "10:45",
		        horas_totales: 2.5,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "f8c6e",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "14:00",
		        hora_fin: "16:15",
		        horas_totales: 2.25,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
        ]
    },
    {
        tecnico: "Patricia Gómez",
        color: '#0378A6',
        cliente: "Carmen Vázquez",
        horas_totales: 4.5,
        servicio : 3,
        _children:[
        	{
		        servicio: "a9d7f",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "07:45",
		        hora_fin: "09:45",
		        horas_totales: 2,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    },
		    {
		        servicio: "b0e8a",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "12:00",
		        hora_fin: "14:30",
		        horas_totales: 2.5,
		        _children:[
		        	{
				        equipo: "CNC-M1000"
				    },
				    {
				        equipo: "LaserCut-500X"
				    },
				    {
				        equipo: "PressMaster-P200"
				    }
		        ]
		    }
        ]
    },
];


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
	        text: 'Servicios X Técnico',
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
	scales: {
	    x: {
	        stacked: true,
	    },
	    y: {
	        stacked: true,
	    }
	},
};

var dataChart1 = {
  	labels: ['Juan Pérez','Ana López','María Sánchez','Patricia Gómez'],
  	datasets: [
	    {
	      	label: 'Preventivo',
	      	data: [2,1,1,1],
	      	fill: false,
    		backgroundColor: '#F23847',
	    },
	    {
	      	label: 'Correctivo',
	      	data: [1,1,2,1],
	      	fill: false,
    		backgroundColor: '#0378A6',
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
	        text: 'Servicios por Tipo',
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
};

var dataChart2 = {
  	labels: ['Preventivo','Correctivo'],
  	datasets: [
	    {
	      	label: 'Porcentaje',
	      	data: [60,40],
	      	backgroundColor: ['#F23847','#0378A6'],
	      	borderColor: ['#F23847','#0378A6'],
	    },

  	]
};