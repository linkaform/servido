//------Diseño de reporte
let dicReportContextClarificacion = [
    { class:'', _children : [
            { type:'separator', col: '12', title:'Turbiedad'},
            { type:'table', col: '4', id:'tableFirst', title:'Datos de Turbiedad'},
            { type:'chart', col: '8', id:'chartFirst', title:'Linea de tiempo de Turbiedad'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Jugo Mezclado'},
            { type:'table', col: '4', id:'tableSecond', title:'Datos de Jugo Mezclado'},
            { type:'chart', col: '8', id:'chartSecond', title:'Linea de tiempo de Jugo Mezclado'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Lectura Pool'},
            { type:'table', col: '4', id:'tableThird', title:'Datos de Lectura Pool'},
            { type:'chart', col: '8', id:'chartThird', title:'Linea de tiempo de Lectura Pool'},
        ] 
    },
];

//----Config Table
let columsTableClarificacion1 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Turbiedad",field:'turbiedad',headerTooltip: true,hozAlign:"center", width:150},
];
let dataTableClarificacion1 = [
    { 'hour': '2025-11-11 07:00', 'turbiedad': '312' },
    { 'hour': '2025-11-11 08:00', 'turbiedad': '45' },
    { 'hour': '2025-11-11 09:00', 'turbiedad': '687' },
    { 'hour': '2025-11-11 10:00', 'turbiedad': '228' },
    { 'hour': '2025-11-11 11:00', 'turbiedad': '0' },
    { 'hour': '2025-11-11 12:00', 'turbiedad': '514' },
    { 'hour': '2025-11-11 13:00', 'turbiedad': '751' },
    { 'hour': '2025-11-11 14:00', 'turbiedad': '189' },
    { 'hour': '2025-11-11 15:00', 'turbiedad': '623' },
    { 'hour': '2025-11-11 16:00', 'turbiedad': '0' },
    { 'hour': '2025-11-11 17:00', 'turbiedad': '478' },
    { 'hour': '2025-11-11 18:00', 'turbiedad': '820' },
    { 'hour': '2025-11-11 19:00', 'turbiedad': '63' },
    { 'hour': '2025-11-11 20:00', 'turbiedad': '259' },
    { 'hour': '2025-11-11 21:00', 'turbiedad': '394' },
    { 'hour': '2025-11-11 22:00', 'turbiedad': '0' },
    { 'hour': '2025-11-11 23:00', 'turbiedad': '701' },
    { 'hour': '2025-11-11 24:00', 'turbiedad': '92' },
    { 'hour': '2025-11-12 01:00', 'turbiedad': '510' },
];

let columsTableClarificacion2 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Jugo Mezclado",field:'jugo',headerTooltip: true,hozAlign:"center", width:150},
];
let dataTableClarificacion2 = [
    { 'hour': '2025-11-11 07:00', 'jugo': '235' },
    { 'hour': '2025-11-11 08:00', 'jugo': '0' },
    { 'hour': '2025-11-11 09:00', 'jugo': '541' },
    { 'hour': '2025-11-11 10:00', 'jugo': '286' },
    { 'hour': '2025-11-11 11:00', 'jugo': '0' },
    { 'hour': '2025-11-11 12:00', 'jugo': '0' },
    { 'hour': '2025-11-11 13:00', 'jugo': '123' },
    { 'hour': '2025-11-11 14:00', 'jugo': '846' },
    { 'hour': '2025-11-11 15:00', 'jugo': '0' },
    { 'hour': '2025-11-11 16:00', 'jugo': '125' },
    { 'hour': '2025-11-11 17:00', 'jugo': '0' },
    { 'hour': '2025-11-11 18:00', 'jugo': '0' },
    { 'hour': '2025-11-11 19:00', 'jugo': '139' },
    { 'hour': '2025-11-11 20:00', 'jugo': '0' },
    { 'hour': '2025-11-11 21:00', 'jugo': '123' },
    { 'hour': '2025-11-11 22:00', 'jugo': '234' },
    { 'hour': '2025-11-11 23:00', 'jugo': '0' },
    { 'hour': '2025-11-11 24:00', 'jugo': '0' },
    { 'hour': '2025-11-12 01:00', 'jugo': '278' },
];


let columsTableClarificacion3 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Cachaza mezcla",field:'cachaza_mezcla',headerTooltip: true,hozAlign:"center", width:180},
    { title:"Cachaza filtro prensa",field:'cachaza_filtro_prensa',headerTooltip: true,hozAlign:"center", width:150},
];
let dataTableClarificacion3 = [
    { hour: '2025-11-11 07:00', cachaza_mezcla: '3.45', cachaza_filtro_prensa: '6.00' },
    { hour: '2025-11-11 08:00', cachaza_mezcla: '0', cachaza_filtro_prensa: '6.00' },
    { hour: '2025-11-11 09:00', cachaza_mezcla: '', cachaza_filtro_prensa: '6.00' },
    { hour: '2025-11-11 10:00', cachaza_mezcla: '2.78', cachaza_filtro_prensa: '0' },
    { hour: '2025-11-11 11:00', cachaza_mezcla: '4.12', cachaza_filtro_prensa: '' },
    { hour: '2025-11-11 12:00', cachaza_mezcla: '3.90', cachaza_filtro_prensa: '6.00' },
    { hour: '2025-11-11 13:00', cachaza_mezcla: '2.34', cachaza_filtro_prensa: '6.00' },
    { hour: '2025-11-11 14:00', cachaza_mezcla: '', cachaza_filtro_prensa: '6.00' },
    { hour: '2025-11-11 15:00', cachaza_mezcla: '4.88', cachaza_filtro_prensa: '0' },
    { hour: '2025-11-11 16:00', cachaza_mezcla: '3.67', cachaza_filtro_prensa: '6.00' },
    { hour: '2025-11-11 17:00', cachaza_mezcla: '0', cachaza_filtro_prensa: '6.00' },
    { hour: '2025-11-11 18:00', cachaza_mezcla: '2.99', cachaza_filtro_prensa: '' },
    { hour: '2025-11-11 19:00', cachaza_mezcla: '3.54', cachaza_filtro_prensa: '6.00' },
    { hour: '2025-11-11 20:00', cachaza_mezcla: '', cachaza_filtro_prensa: '6.00' },
    { hour: '2025-11-11 21:00', cachaza_mezcla: '4.25', cachaza_filtro_prensa: '0' },
    { hour: '2025-11-11 22:00', cachaza_mezcla: '3.11', cachaza_filtro_prensa: '6.00' },
    { hour: '2025-11-11 23:00', cachaza_mezcla: '2.88', cachaza_filtro_prensa: '6.00' },
    { hour: '2025-11-11 24:00', cachaza_mezcla: '', cachaza_filtro_prensa: '' },
    { hour: '2025-11-12 01:00', cachaza_mezcla: '4.00', cachaza_filtro_prensa: '6.00' }
];


//-----Configuiraciónes de las graficas
var setOptionsClarificacion1 = {
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
            color: 'white',
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
var dataChartClarificacion1 = {
    labels: [
        '2025-11-11 07:00','2025-11-11 08:00','2025-11-11 09:00','2025-11-11 10:00',
        '2025-11-11 11:00','2025-11-11 12:00','2025-11-11 13:00','2025-11-11 14:00',
        '2025-11-11 15:00','2025-11-11 16:00','2025-11-11 17:00','2025-11-11 18:00',
        '2025-11-11 19:00','2025-11-11 20:00','2025-11-11 21:00','2025-11-11 22:00',
        '2025-11-11 23:00','2025-11-11 24:00','2025-11-11 01:00'
    ],
    datasets: [
        {
            label: 'Cantidad',
            data: ['312','45','687','228','0','514','751','189','623','0','478','820','63','259','394','0','701','92','510'],
            fill: false,
            backgroundColor: '#007bff',
            borderColor: '#0056b3',
            borderWidth: 1
        },
    ]
};

var setOptionsClarificacion2 = {
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
            color: 'white',
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
var dataChartClarificacion2 = {
    labels: [
        '2025-11-11 07:00','2025-11-11 08:00','2025-11-11 09:00','2025-11-11 10:00',
        '2025-11-11 11:00','2025-11-11 12:00','2025-11-11 13:00','2025-11-11 14:00',
        '2025-11-11 15:00','2025-11-11 16:00','2025-11-11 17:00','2025-11-11 18:00',
        '2025-11-11 19:00','2025-11-11 20:00','2025-11-11 21:00','2025-11-11 22:00',
        '2025-11-11 23:00','2025-11-11 24:00','2025-11-12 01:00'
    ],
    datasets: [
        {
            label: 'Cantidad',
            data: ['235','0','541','286','0','0','123','846','0','125','0','0','139','0','123','234','0','0','278'],
            fill: false,
            backgroundColor: '#007bff',
            borderColor: '#0056b3',
            borderWidth: 1
        },
    ]
};

var setOptionsClarificacion3 = {
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
            color: 'white',
             display: false,
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
var dataChartClarificacion3 = {
    labels: [
        '2025-11-11 07:00','2025-11-11 08:00','2025-11-11 09:00','2025-11-11 10:00',
        '2025-11-11 11:00','2025-11-11 12:00','2025-11-11 13:00','2025-11-11 14:00',
        '2025-11-11 15:00','2025-11-11 16:00','2025-11-11 17:00','2025-11-11 18:00',
        '2025-11-11 19:00','2025-11-11 20:00','2025-11-11 21:00','2025-11-11 22:00',
        '2025-11-11 23:00','2025-11-11 24:00','2025-11-12 01:00'
    ],
    datasets: [
        {
            label: 'Cachaza Mezcla',
            data: [
                '3.45','0','','2.78','4.12','3.90','2.34','','4.88',
                '3.67','0','2.99','3.54','','4.25','3.11','2.88','','4.00'
            ],
            fill: false,
            backgroundColor: '#007bff',
            borderColor: '#0056b3',
            borderWidth: 1
        },
        {
            label: 'Cachaza Filtro Prensa',
            data: [
                '6.00','6.00','6.00','0','','6.00','6.00','6.00','0',
                '6.00','6.00','6.00','6.00','6.00','0','6.00','6.00','','6.00'
            ],
            fill: false,
            backgroundColor: '#28a745',
            borderColor: '#1e7e34',
            borderWidth: 1
        }
    ]
};
