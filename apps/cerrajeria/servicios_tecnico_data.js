//-----Table
// Datos demo para Reporte ENcuestas MOntaje

//--TABLE
var columsTable1 = [
  { title:"Técnico", field:'tecnico',hozAlign:"left", headerFilter:"input",width:200},
  { title:"Servicios Realizados",field:'servicio',hozAlign:"left", headerFilter:"input",width:300 },
  { title:"Tipo de Servicio",field:'tipo_trabajo',hozAlign:"left", headerFilter:"input",width:300 },
  { title:"Requirió apoyo",field:'apoyo',hozAlign:"left", headerFilter:"input",width:300 },
  { title:"Hora Inicio",  field:'hora_inicio',hozAlign:"left", headerFilter:"input",width:150 },
  { title:"Hora Fin",  field:'hora_fin',hozAlign:"left", headerFilter:"input",width:150 },
  { title:"Hras Efectivas",  field:'hora_total',hozAlign:"left", headerFilter:"input",width:150 },
  { title:"Total Cobrado",  field:'total_cobrado',hozAlign:"left", headerFilter:"input",width:150 },
];


let dataTable1 =  [
    {
        tecnico: "Juan Pérez",
        servicio:'4',
        hora_total: 16,
        color: '#7FA1C3',
        total_cobrado:680,
        _children : [
        	{
				servicio: "AB123",
				tipo_trabajo: "Instalación",
				apoyo: "Sí",
				hora_inicio: "08:00",
				hora_fin: "12:00",
				hora_total: 4,
				total_cobrado: 170,
        	},
        	{
		        servicio: "KL678",
		        tipo_trabajo: "Reparación",
		        apoyo: "No",
		        hora_inicio: "14:00",
		        hora_fin: "18:00",
		        hora_total: 4,
		        total_cobrado: 170,
		    },
		    {
		        servicio: "MN901",
		        tipo_trabajo: "Instalación",
		        apoyo: "Sí",
		        hora_inicio: "08:30",
		        hora_fin: "12:30",
		        hora_total: 4,
		        total_cobrado: 170,
		    },
		    {
		        servicio: "OP234",
		        tipo_trabajo: "Mantenimiento",
		        apoyo: "No",
		        hora_inicio: "09:30",
		        hora_fin: "13:30",
		        hora_total: 4,
		        total_cobrado: 170,
		    },
        ]
    },
    {
        tecnico: "Ana López",
        servicio:'4',
        hora_total: 16,
        color: '#E2DAD6',
        total_cobrado:400,
        _children : [
        	{
        		servicio: "CD456",
		        tipo_trabajo: "Mantenimiento",
		        apoyo: "No",
		        hora_inicio: "09:00",
		        hora_fin: "13:00",
		        hora_total: 4,
		        total_cobrado:100
        	},
		    {
		        servicio: "QR567",
		        tipo_trabajo: "Reparación",
		        apoyo: "Sí",
		        hora_inicio: "10:30",
		        hora_fin: "14:30",
		        hora_total: 4,
		        total_cobrado:100
		    },
		    {
		        servicio: "ST890",
		        tipo_trabajo: "Instalación",
		        apoyo: "No",
		        hora_inicio: "11:00",
		        hora_fin: "15:00",
		        hora_total: 4,
		        total_cobrado:100
		    },
		    {
		        servicio: "UV123",
		        tipo_trabajo: "Mantenimiento",
		        apoyo: "Sí",
		        hora_inicio: "12:30",
		        hora_fin: "16:30",
		        hora_total: 4,
		        total_cobrado:100
		    },
        ]
    },
    {
        tecnico: "Carlos Gómez",
        servicio:'4',
        hora_total: 20,
        color: '#7FA1C3',
        total_cobrado:480,
        _children : [
        	{
        		servicio: "EF789",
		        tipo_trabajo: "Reparación",
		        apoyo: "Sí",
		        hora_inicio: "10:00",
		        hora_fin: "14:00",
		        hora_total: 4,
		        total_cobrado:120
        	},
        	{
		        servicio: "CD567",
		        tipo_trabajo: "Reparación",
		        apoyo: "Sí",
		        hora_inicio: "10:00",
		        hora_fin: "14:00",
		        hora_total: 4,
		        total_cobrado:120
		    },
		    {
		        servicio: "EF890",
		        tipo_trabajo: "Instalación",
		        apoyo: "No",
		        hora_inicio: "11:00",
		        hora_fin: "15:00",
		        hora_total: 4,
		        total_cobrado:120
		    },
		    {
		        servicio: "GH123",
		        tipo_trabajo: "Mantenimiento",
		        apoyo: "Sí",
		        hora_inicio: "12:00",
		        hora_fin: "16:00",
		        hora_total: 4,
		        total_cobrado:120
		    },
        ]
    },
    {
        tecnico: "María Sánchez",
        servicio:'2',
        hora_total: 8,
        color: '#E2DAD6',
        total_cobrado:700,
        _children : [
        	{
        		servicio: "GH012",
		        tipo_trabajo: "Instalación",
		        apoyo: "No",
		        hora_inicio: "07:00",
		        hora_fin: "11:00",
		        hora_total: 4,
		        total_cobrado:350
        	},
        	{
		        servicio: "IJ456",
		        tipo_trabajo: "Reparación",
		        apoyo: "No",
		        hora_inicio: "07:00",
		        hora_fin: "11:00",
		        hora_total: 4,
		        total_cobrado:350
		    },
        ]
    },
    {
        tecnico: "Luis Martínez",
        servicio:'3',
        hora_total: 11,
        color: '#7FA1C3',
        total_cobrado:963,
        _children : [
        	{
		        servicio: "KL789",
		        tipo_trabajo: "Instalación",
		        apoyo: "Sí",
		        hora_inicio: "08:30",
		        hora_fin: "12:30",
		        hora_total: 4,
		        total_cobrado:263
		    },
		    {
		        servicio: "MN012",
		        tipo_trabajo: "Mantenimiento",
		        apoyo: "No",
		        hora_inicio: "09:30",
		        hora_fin: "13:30",
		        hora_total: 4,
		        total_cobrado:200
		    },
		    {
				servicio: "IJ345",
				tipo_trabajo: "Mantenimiento",
				apoyo: "Sí",
				hora_inicio: "12:00",
				hora_fin: "16:00",
				hora_total: 3,
				total_cobrado:500
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
	        text: 'Rendimiento monetario por Técnico',
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
  	labels: ['Juan Pérez','Ana López','María Sánchez','Luis Martínez'],
  	datasets: [
	    {
	      	label: 'Instalación',
	      	data: [2,1,1,1],
	      	fill: false,
    		backgroundColor: '#6482AD',
	    },
	    {
	      	label: 'Reparación',
	      	data: [1,1,2,1],
	      	fill: false,
    		backgroundColor: '#7FA1C3',
	    },
	    {
	      	label: 'Mantenimiento',
	      	data: [1,2,1,2],
	      	fill: false,
    		backgroundColor: '#E2DAD6',
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
  	labels: ['Reparación','Instalación','Mantenimiento'],
  	datasets: [
	    {
	      	label: 'Porcentaje',
	      	data: [20,40,40],
	      	backgroundColor: ['#6482AD','#7FA1C3','#E2DAD6'],
	      	borderColor: ['#6482AD','#7FA1C3','#E2DAD6'],
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
	        text: 'Rendimiento monetario por Técnico',
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
  	labels: ['Juan Pérez','Ana López','María Sánchez','Luis Martínez'],
  	datasets: [
	    {
	      	label: 'Total',
	      	data: [680,400,700,963],
	      	fill: false,
    		backgroundColor: '#7FA1C3',
	    },
  	]
};