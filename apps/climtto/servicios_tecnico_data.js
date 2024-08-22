//-----Table
// Datos demo para Reporte ENcuestas MOntaje

//--TABLE
var columsTable1 = [
  	{ title:"Técnico", field:'tecnico',hozAlign:"left", headerFilter:"input",width:200},
  	{ title:"Servicios Realizados",field:'servicio',hozAlign:"left", headerFilter:"input",width:300 },
  	{ title:"Cliente",field:'cliente',hozAlign:"left", headerFilter:"input",width:300 },
  	{ title:"Tipo",field:'tipo_trabajo',hozAlign:"left", headerFilter:"input",width:300 },
  	{ title:"Equipos Realizados",field:'equipo',hozAlign:"left", headerFilter:"input",width:300 },
  	{ title:"Hora Inicio",  field:'hora_inicio',hozAlign:"left", headerFilter:"input",width:150 },
  	{ title:"Hora Fin",  field:'hora_fin',hozAlign:"left", headerFilter:"input",width:150 },
  	{ title:"Hras Efectivas",  field:'horas_totales',hozAlign:"left", headerFilter:"input",width:150 },
];





let dataTable1  = [
    {
        tecnico: "Carlos Gómez",
        color: '#b2babb',
        horas_totales: 7.5,
        servicio : 3,
        _children:[
        	{
        		cliente: "Juan Pérez",
		        servicio: "d6b4e",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "14:15",
		        hora_fin: "16:45",
		        horas_totales: 2.5,
		        equipo:5
		    },
		    {
		    	cliente: "María García",
		        servicio: "e7c5b",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "07:45",
		        hora_fin: "10:00",
		        horas_totales: 2.25,
		        equipo:5
		    },
		    {
		    	cliente: "María García",
		        servicio: "f8d6c",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "13:30",
		        hora_fin: "15:30",
		        horas_totales: 2,
		        equipo:5
		    },
        ]
    },
    {
        tecnico: "Laura Martínez",
        color: '#b2babb',
        cliente : 5,	
        horas_totales: 6.5,
        servicio : 3,
        _children:[
        	{
        		cliente: "Carlos Rodríguez",
		        servicio: "a9e7d",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "08:00",
		        hora_fin: "09:45",
		        horas_totales: 1.75,
		        equipo:5

		    },
		    {
		    	cliente: "Sofía Martínez",
		        servicio: "b0f8e",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "10:15",
		        hora_fin: "12:30",
		        horas_totales: 2.25,
		        equipo:5

		    },
		    {
		    	cliente: "Sofía Martínez",
		        servicio: "c1a9f",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "09:00",
		        hora_fin: "11:30",
		        horas_totales: 2.5,
		        equipo:5

		    },
        ]
    },
    {
        tecnico: "Miguel Torres",
        color: '#b2babb',
        cliente : 5,	
        horas_totales:7.25,
        servicio : 3,
        _children:[
        	{
        		cliente: "Luis Hernández",
		        servicio: "d2b0a",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "12:45",
		        hora_fin: "15:15",
		        horas_totales: 2.5,
		        equipo:5
		    },
		    {
		    	cliente: "Elena López",
		        servicio: "e3c1b",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "14:00",
		        hora_fin: "16:00",
		        horas_totales: 2,
		        equipo:5
		    },
		    {
		    	cliente: "Elena López",
		        servicio: "f4d2c",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "08:30",
		        hora_fin: "10:15",
		        horas_totales: 1.75,
		        equipo:5
		    },
        ]
    },
    {
        tecnico: "María Fernández",
        color: '#b2babb',
        cliente : 5,	
        horas_totales: 6.75,
        servicio : 3,
        _children:[
			{
				cliente: "Pedro Sánchez",
			    servicio: "a5e3d",
			    tipo_trabajo: "Preventivo",
			    hora_inicio: "11:45",
			    hora_fin: "14:00",
			    horas_totales: 2.25,
			    equipo:5
			},
			{
				cliente: "Ana Fernández",
			    servicio: "b6f4e",
			    tipo_trabajo: "Correctivo",
			    hora_inicio: "07:15",
			    hora_fin: "09:30",
			    horas_totales: 2.25,
			    equipo:5
			},
			{
				cliente: "Ana Fernández",
			    servicio: "c7a5f",
			    tipo_trabajo: "Preventivo",
			    hora_inicio: "10:30",
			    hora_fin: "12:45",
			    horas_totales: 2.25,
			    equipo:5
			},
        ]
    },
    {
        tecnico: "Jorge Díaz",
        color: '#b2babb',
        cliente : 5,	
        horas_totales: 5.75,
        servicio : 3,
        _children:[
        	{
        		cliente: "Miguel Gómez",
		        servicio: "d8b6a",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "13:15",
		        hora_fin: "15:15",
		        horas_totales: 2,
		        equipo:5
		    },
		    {
		    	cliente: "José Torres",
		        servicio: "e9c7b",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "08:45",
		        hora_fin: "11:00",
		        horas_totales: 2.25,
		        equipo:5
		    },
		    {
		    	cliente: "Laura Ruiz",
		        servicio: "f0d8c",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "14:30",
		        hora_fin: "16:00",
		        horas_totales: 1.5,
		        equipo:5
		    },
        ]
    },
    {
        tecnico: "Sofía Herrera",
        color: '#b2babb',
        cliente : 5,	
        horas_totales: 6.25,
        servicio : 3,
        _children:[
        	{
        		cliente: "Laura Ruiz",
		        servicio: "a1e9d",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "09:15",
		        hora_fin: "11:15",
		        horas_totales: 2,
		        equipo:5
		    },
		    {
		    	cliente: "Laura Ruiz",
		        servicio: "b2f0e",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "11:30",
		        hora_fin: "13:45",
		        horas_totales: 2.25,
		        equipo:5
		    },
		    {
		    	cliente: "Laura Ruiz",
		        servicio: "c3f1b",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "08:30",
		        hora_fin: "10:30",
		        horas_totales: 2,
		        equipo:5
		    },
        ]
    },
    {
        tecnico: "Antonio Pérez",
        color: '#b2babb',
        cliente : 5,	
        horas_totales: 7,
        servicio : 3,
        _children:[
        	{
        		cliente: "José Torres",
		        servicio: "d4a2c",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "12:00",
		        hora_fin: "14:30",
		        horas_totales: 2.5,
		        equipo:5
		    },
		    {
		    	cliente: "José Torres",
		        servicio: "e5b3d",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "15:00",
		        hora_fin: "17:00",
		        horas_totales: 2,
		        equipo:5
		    },
		    {
		    	cliente: "José Torres",
		        servicio: "f6c4e",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "09:45",
		        hora_fin: "12:15",
		        horas_totales: 2.5,
		        equipo:5
		    },
        ]
    },
    {
        tecnico: "Elena López",
        color: '#b2babb',
        cliente : 5,	
        horas_totales: 6.5,
        servicio : 3,
        _children:[
        	{
        		cliente: "Antonio Jiménez",
		        servicio: "a7d5f",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "13:00",
		        hora_fin: "15:15",
		        horas_totales: 2.25,
		        equipo:5
		    },
		    {
		    	cliente: "Antonio Jiménez",
		        servicio: "b8e6a",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "10:15",
		        hora_fin: "12:30",
		        horas_totales: 2.25,
		        equipo:5
		    },
		    {
		    	cliente: "Antonio Jiménez",
		        servicio: "c9f7b",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "14:30",
		        hora_fin: "16:30",
		        horas_totales: 2,
		        equipo:5
		    },
        ]
    },
    {
        tecnico: "Fernando Martínez",
        color: '#b2babb',
        cliente : 5,	
        horas_totales: 6.5,
        servicio : 3,
        _children:[
        	{
        		cliente: "Rafael Díaz",
		        servicio: "d0a8c",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "08:00",
		        hora_fin: "10:00",
		        horas_totales: 2,
		        equipo:5
		    },
		    {
		    	cliente: "Rafael Díaz",
		        servicio: "e1b9d",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "11:00",
		        hora_fin: "13:30",
		        horas_totales: 2.5,
		        equipo:5
		    },
		    {
		    	cliente: "Rafael Díaz",
		        servicio: "f2c0e",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "15:30",
		        hora_fin: "17:30",
		        horas_totales: 2,
		        equipo:5
		    },
        ]
    },
    {
        tecnico: "Ana Torres",
        color: '#b2babb',
        cliente : 5,	
        horas_totales: 6.5,
        servicio : 3,
        _children:[
        	{
        		cliente: "Silvia Vargas",
		        servicio: "a3d1f",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "09:00",
		        hora_fin: "11:15",
		        horas_totales: 2.25,
		        equipo:5
		    },
		    {
		    	cliente: "Silvia Vargas",
		        servicio: "b4e2a",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "07:30",
		        hora_fin: "09:30",
		        horas_totales: 2,
		        equipo:5
		    },
		    {
		    	cliente: "Silvia Vargas",
		        servicio: "c5f3b",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "10:45",
		        hora_fin: "13:00",
		        horas_totales: 2.25,
		        equipo:5
		    },
        ]
    },
    {
        tecnico: "Luis Sánchez",
        color: '#b2babb',
        cliente : 5,	
        horas_totales: 7,
        servicio : 3,
        _children:[
        	{
        		cliente: "Francisco Muñoz",
		        servicio: "d6a4c",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "13:30",
		        hora_fin: "15:45",
		        horas_totales: 2.25,
		        equipo:5
		    },
		    {
		    	cliente: "Francisco Muñoz",
		        servicio: "e7b5d",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "08:15",
		        hora_fin: "10:45",
		        horas_totales: 2.5,
		        equipo:5
		    },
		    {
		    	cliente: "Francisco Muñoz",
		        servicio: "f8c6e",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "14:00",
		        hora_fin: "16:15",
		        horas_totales: 2.25,
		        equipo:5
		    },
        ]
    },
    {
        tecnico: "Patricia Gómez",
        color: '#b2babb',
        cliente : 5,	
        horas_totales: 4.5,
        servicio : 3,
        _children:[
        	{
        		cliente: "Lucía Castro",
		        servicio: "a9d7f",
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "07:45",
		        hora_fin: "09:45",
		        horas_totales: 2,
		        equipo:5
		    },
		    {
		    	cliente: "Lucía Castro",
		        servicio: "b0e8a",
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "12:00",
		        hora_fin: "14:30",
		        horas_totales: 2.5,
		        equipo:5
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
    		backgroundColor: '#007CB3',
	    },
	    {
	      	label: 'Correctivo',
	      	data: [1,1,2,1],
	      	fill: false,
    		backgroundColor: '#EFB03B',
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
	      	backgroundColor: ['#007CB3','#EFB03B'],
	      	borderColor: ['#007CB3','#EFB03B'],
	    },

  	]
};