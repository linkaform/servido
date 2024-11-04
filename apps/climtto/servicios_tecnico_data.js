//-----Table
// Datos demo para Reporte ENcuestas MOntaje

//--TABLE
var columsTable1 = [
  	{ title:"Servicio Realizado",field:'folio',hozAlign:"left",formatter:"link", formatterParams:{
		url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData()._id}, 
		target:"_blank",},headerFilter:"input",	width:150 },
  	{ title:"Cliente",field:'cliente',hozAlign:"left", headerFilter:"input",width:200 },
  	{ title:"Tipo",field:'tipo_trabajo',hozAlign:"left", headerFilter:"input",width:180 },
  	{ title:"Hora Inicio",  field:'hora_inicio',hozAlign:"right", headerFilter:"input",width:120 },
  	{ title:"Hora Fin",  field:'hora_fin',hozAlign:"right", headerFilter:"input",width:120 },
  	{ title:"Hras Efectivas",  field:'horas_totales',hozAlign:"right", headerFilter:"input",width:120 },
  	{ title:"Técnico", field:'tecnico',hozAlign:"left", width:150},
  	{ title:"Equipos Realizados",field:'equipo',hozAlign:"left", width:150 },
];




let dataTable1  = [
    {
        tecnico: "Carlos Gómez",
        color: '#b2babb',
        folio: "d6b4e",
        cliente: "Juan Pérez",
        hora_inicio: "14:15",
        hora_fin: "16:45",
        horas_totales: 2.5,
        _children:[
        	{
		        tipo_trabajo: "Correctivo",
		        equipo:5
		    },
		    {
		        tipo_trabajo: "Preventivo",
		        equipo:5
		    },
		    {
		        tipo_trabajo: "Correctivo",
		        equipo:5
		    },
        ]
    },
    {
        tecnico: "Laura Martínez",
        color: '#b2babb',
        cliente : 5,	
        horas_totales: 6.5,
        folio: "a9e7d",
        cliente: "Carlos Rodríguez",
        hora_inicio: "08:00",
		hora_fin: "09:45",
		horas_totales: 1.75,
        _children:[
        	{
		        tipo_trabajo: "Preventivo",
		        equipo:5
		    },
		    {
		        tipo_trabajo: "Correctivo",
		        equipo:5

		    },
		    {
		        tipo_trabajo: "Preventivo",
		        equipo:5

		    },
        ]
    },
    {
        tecnico: "Miguel Torres",
        color: '#b2babb',
        cliente : 5,	
        folio: "d2b0a",
        cliente: "Luis Hernández",
        hora_inicio: "08:30",
		hora_fin: "10:15",
		horas_totales: 1.75,
        _children:[
        	{
		        tipo_trabajo: "Correctivo",
		        equipo:5
		    },
		    {
		        tipo_trabajo: "Preventivo",
		        equipo:5
		    },
		    {
		        tipo_trabajo: "Correctivo",
		        
		        equipo:5
		    },
        ]
    },
    {
        tecnico: "María Fernández",
        color: '#b2babb',
        cliente : 5,	
        horas_totales: 6.75,
        folio: "a5e3d",
        cliente: "Pedro Sánchez",
        hora_inicio: "08:30",
        hora_fin: "14:00",
	    horas_totales: 2.25,
	    equipo:5,
        _children:[
			{
			    tipo_trabajo: "Preventivo",
			    hora_inicio: "11:45",
			},
			{
			    tipo_trabajo: "Correctivo",
			    hora_inicio: "07:15",
			},
			{
			    tipo_trabajo: "Preventivo",
			    hora_inicio: "10:30",
			},
        ]
    },
    {
        tecnico: "Jorge Díaz",
        color: '#b2babb',
        cliente : 5,	
        horas_totales: 5.75,
        folio : 3,
        folio: "d8b6a",
        cliente: "Miguel Gómez",
        hora_inicio: "08:30",
        hora_fin: "15:15",
        horas_totales: 2,
        equipo:5,
        _children:[
        	{
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "13:15",
		    },
		    {
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "08:45",
		    },
		    {
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "14:30",
		    },
        ]
    },
    {
        tecnico: "Patricia Gómez",
        color: '#b2babb',
        cliente : 5,	
        horas_totales: 4.5,
        folio: "a9d7f",
        cliente: "Lucía Castro",
        hora_inicio: "08:30",
        hora_fin: "09:45",
        horas_totales: 2,
        equipo:5,
        _children:[
        	{
		        tipo_trabajo: "Preventivo",
		        hora_inicio: "07:45",
		    },
		    {
		        tipo_trabajo: "Correctivo",
		        hora_inicio: "12:00",
		       
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
	        text: 'Equipos X Técnico',
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
	      	label: 'Equipo 5',
	      	data: [2,1,1,1],
	      	fill: false,
    		backgroundColor: '#007CB3',
	    },
	    {
	      	label: 'Equipo 6',
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
	        text: 'Registros X Tipo',
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