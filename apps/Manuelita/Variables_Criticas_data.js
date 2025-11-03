//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'separator', col: '12', title:'Turbiedad'},
            { type:'table', col: '4', id:'tableFirst', title:'Datos de Turbiedad'},
            { type:'chart', col: '8', id:'chartFirst', title:'Linea de tiempo de Turbiedad'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Lectura Brix'},
            { type:'table', col: '4', id:'tableSecond', title:'Datos de Lectura Brix'},
            { type:'chart', col: '8', id:'chartSecond', title:'Linea de tiempo de Lectura Brix'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Fosfatos'},
            { type:'table', col: '4', id:'tableThird', title:'Datos de Fosfatos'},
            { type:'chart', col: '8', id:'chartThird', title:'Linea de tiempo de Fosfatos'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'% Pureza'},
            { type:'table', col: '4', id:'tableFourth', title:'Datos de % Pureza'},
            { type:'chart', col: '8', id:'chartFourth', title:'Linea de tiempo de % Pureza'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Lectura Pool'},
            { type:'table', col: '4', id:'tableFiveth', title:'Datos de Lectura Pool'},
            { type:'chart', col: '8', id:'chartFiveth', title:'Linea de tiempo de Lectura Pool'},
        ] 
    },
];


//----Config Table
let columsTable1 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:120},
    { title:"Turbiedad",field:'turbiedad',headerTooltip: true,hozAlign:"center", width:150},
];
let dataTable1 = [
    { 'hour': '07:00', 'turbiedad': '312' },
    { 'hour': '08:00', 'turbiedad': '45' },
    { 'hour': '09:00', 'turbiedad': '687' },
    { 'hour': '10:00', 'turbiedad': '228' },
    { 'hour': '11:00', 'turbiedad': '0' },
    { 'hour': '12:00', 'turbiedad': '514' },
    { 'hour': '13:00', 'turbiedad': '751' },
    { 'hour': '14:00', 'turbiedad': '189' },
    { 'hour': '15:00', 'turbiedad': '623' },
    { 'hour': '16:00', 'turbiedad': '0' },
    { 'hour': '17:00', 'turbiedad': '478' },
    { 'hour': '18:00', 'turbiedad': '820' },
    { 'hour': '19:00', 'turbiedad': '63' },
    { 'hour': '20:00', 'turbiedad': '259' },
    { 'hour': '21:00', 'turbiedad': '394' },
    { 'hour': '22:00', 'turbiedad': '0' },
    { 'hour': '23:00', 'turbiedad': '701' },
    { 'hour': '24:00', 'turbiedad': '92' },
    { 'hour': '01:00', 'turbiedad': '510' },
];

let columsTable2 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:120},
    { title:"Jugo Diluido Tandem 2",field:'jugo_diluido',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Jugo Clarificado",field:'jugo_clarificado',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Variables Criticas producción",field:'variable',headerTooltip: true,hozAlign:"center", width:150},
];
let dataTable2 = [
    { 'hour': '07:00', 'jugo_diluido': '13.98', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '08:00', 'jugo_diluido': '13.92', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '09:00', 'jugo_diluido': '14.46', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '10:00', 'jugo_diluido': '13.74', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '11:00', 'jugo_diluido': '14.46', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '12:00', 'jugo_diluido': '13.92', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '13:00', 'jugo_diluido': '13.98', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '14:00', 'jugo_diluido': '13.74', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '15:00', 'jugo_diluido': '14.46', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '16:00', 'jugo_diluido': '13.98', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '17:00', 'jugo_diluido': '13.92', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '18:00', 'jugo_diluido': '13.74', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '19:00', 'jugo_diluido': '14.46', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '20:00', 'jugo_diluido': '13.92', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '21:00', 'jugo_diluido': '13.98', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '22:00', 'jugo_diluido': '13.74', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '23:00', 'jugo_diluido': '14.46', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '24:00', 'jugo_diluido': '13.92', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '01:00', 'jugo_diluido': '13.98', 'jugo_clarificado': '14.04', 'variable': 'Jugo Diluido Tandem 2' },
];

let columsTable3 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:120},
    { title:"Fosfatos (PPM)",field:'fosfato',headerTooltip: true,hozAlign:"center", width:150},
];
let dataTable3 = [
    { 'hour': '07:00', 'fosfato': '235', },
    { 'hour': '08:00', 'fosfato': '0', },
    { 'hour': '09:00', 'fosfato': '541', },
    { 'hour': '10:00', 'fosfato': '286', },
    { 'hour': '11:00', 'fosfato': '0', },
    { 'hour': '12:00', 'fosfato': '0', },
    { 'hour': '13:00', 'fosfato': '123', },
    { 'hour': '14:00', 'fosfato': '846', },
    { 'hour': '15:00', 'fosfato': '0', },
    { 'hour': '16:00', 'fosfato': '125', },
    { 'hour': '17:00', 'fosfato': '0', },
    { 'hour': '18:00', 'fosfato': '0', },
    { 'hour': '19:00', 'fosfato': '139', },
    { 'hour': '20:00', 'fosfato': '0', },
    { 'hour': '21:00', 'fosfato': '123', },
    { 'hour': '22:00', 'fosfato': '234', },
    { 'hour': '23:00', 'fosfato': '0', },
    { 'hour': '24:00', 'fosfato': '0', },
    { 'hour': '01:00', 'fosfato': '278', },
];

let columsTable4 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:120},
    { title:"Jugo Diluido Tandem 2",field:'jugo_diluido',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Jugo clarificado SRI1",field:'jugo_clarificado',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Jugo filtro mezcla",field:'jugo_filtro_mezcla',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Variables Criticas producción",field:'variable',headerTooltip: true,hozAlign:"center", width:150},
];
let dataTable4 = [
    { 'hour': '07:00', 'jugo_diluido': '86.45', 'jugo_clarificado': '88.72', 'jugo_filtro_mezcla': '', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '08:00', 'jugo_diluido': '0', 'jugo_clarificado': '87.33', 'jugo_filtro_mezcla': '89.12', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '09:00', 'jugo_diluido': '88.54', 'jugo_clarificado': '0', 'jugo_filtro_mezcla': '86.29', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '10:00', 'jugo_diluido': '', 'jugo_clarificado': '89.45', 'jugo_filtro_mezcla': '87.18', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '11:00', 'jugo_diluido': '85.91', 'jugo_clarificado': '', 'jugo_filtro_mezcla': '88.77', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '12:00', 'jugo_diluido': '87.62', 'jugo_clarificado': '85.89', 'jugo_filtro_mezcla': '', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '13:00', 'jugo_diluido': '0', 'jugo_clarificado': '88.24', 'jugo_filtro_mezcla': '89.33', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '14:00', 'jugo_diluido': '86.37', 'jugo_clarificado': '', 'jugo_filtro_mezcla': '87.94', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '15:00', 'jugo_diluido': '89.12', 'jugo_clarificado': '87.45', 'jugo_filtro_mezcla': '0', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '16:00', 'jugo_diluido': '', 'jugo_clarificado': '85.77', 'jugo_filtro_mezcla': '88.68', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '17:00', 'jugo_diluido': '86.45', 'jugo_clarificado': '88.72', 'jugo_filtro_mezcla': '', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '18:00', 'jugo_diluido': '0', 'jugo_clarificado': '87.33', 'jugo_filtro_mezcla': '89.12', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '19:00', 'jugo_diluido': '88.54', 'jugo_clarificado': '0', 'jugo_filtro_mezcla': '86.29', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '20:00', 'jugo_diluido': '', 'jugo_clarificado': '89.45', 'jugo_filtro_mezcla': '87.18', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '21:00', 'jugo_diluido': '85.91', 'jugo_clarificado': '', 'jugo_filtro_mezcla': '88.77', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '22:00', 'jugo_diluido': '87.62', 'jugo_clarificado': '85.89', 'jugo_filtro_mezcla': '', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '23:00', 'jugo_diluido': '0', 'jugo_clarificado': '88.24', 'jugo_filtro_mezcla': '89.33', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '24:00', 'jugo_diluido': '86.37', 'jugo_clarificado': '', 'jugo_filtro_mezcla': '87.94', 'variable': 'Jugo Diluido Tandem 2' },
    { 'hour': '01:00', 'jugo_diluido': '89.12', 'jugo_clarificado': '87.45', 'jugo_filtro_mezcla': '0', 'variable': 'Jugo Diluido Tandem 2' },
];

let columsTable5 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:120},
    { title:"Cachaza mezcla",field:'cachaza_mezcla',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Cachaza filtro prensa",field:'cachaza_filtro_prensa',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Variables Criticas producción",field:'variable',headerTooltip: true,hozAlign:"center", width:150},
];

let dataTable5 = [
    { hour: '07:00', cachaza_mezcla: '3.45', cachaza_filtro_prensa: '6.00', variable: 'Cachaza mezcla' },
    { hour: '08:00', cachaza_mezcla: '0', cachaza_filtro_prensa: '6.00', variable: 'Cachaza mezcla' },
    { hour: '09:00', cachaza_mezcla: '', cachaza_filtro_prensa: '6.00', variable: 'Cachaza mezcla' },
    { hour: '10:00', cachaza_mezcla: '2.78', cachaza_filtro_prensa: '0', variable: 'Cachaza mezcla' },
    { hour: '11:00', cachaza_mezcla: '4.12', cachaza_filtro_prensa: '', variable: 'Cachaza mezcla' },
    { hour: '12:00', cachaza_mezcla: '3.90', cachaza_filtro_prensa: '6.00', variable: 'Cachaza mezcla' },
    { hour: '13:00', cachaza_mezcla: '2.34', cachaza_filtro_prensa: '6.00', variable: 'Cachaza mezcla' },
    { hour: '14:00', cachaza_mezcla: '', cachaza_filtro_prensa: '6.00', variable: 'Cachaza mezcla' },
    { hour: '15:00', cachaza_mezcla: '4.88', cachaza_filtro_prensa: '0', variable: 'Cachaza mezcla' },
    { hour: '16:00', cachaza_mezcla: '3.67', cachaza_filtro_prensa: '6.00', variable: 'Cachaza mezcla' },
    { hour: '17:00', cachaza_mezcla: '0', cachaza_filtro_prensa: '6.00', variable: 'Cachaza mezcla' },
    { hour: '18:00', cachaza_mezcla: '2.99', cachaza_filtro_prensa: '', variable: 'Cachaza mezcla' },
    { hour: '19:00', cachaza_mezcla: '3.54', cachaza_filtro_prensa: '6.00', variable: 'Cachaza mezcla' },
    { hour: '20:00', cachaza_mezcla: '', cachaza_filtro_prensa: '6.00', variable: 'Cachaza mezcla' },
    { hour: '21:00', cachaza_mezcla: '4.25', cachaza_filtro_prensa: '0', variable: 'Cachaza mezcla' },
    { hour: '22:00', cachaza_mezcla: '3.11', cachaza_filtro_prensa: '6.00', variable: 'Cachaza mezcla' },
    { hour: '23:00', cachaza_mezcla: '2.88', cachaza_filtro_prensa: '6.00', variable: 'Cachaza mezcla' },
    { hour: '24:00', cachaza_mezcla: '', cachaza_filtro_prensa: '', variable: 'Cachaza mezcla' },
    { hour: '01:00', cachaza_mezcla: '4.00', cachaza_filtro_prensa: '6.00', variable: 'Cachaza mezcla' }
];


//-----Configuiraciónes de las graficas
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
var dataChart1 = {
    labels: [
        '07:00','08:00','09:00','10:00','11:00','12:00','13:00',
        '14:00','15:00','16:00','17:00','18:00','19:00','20:00',
        '21:00','22:00','23:00','24:00','01:00'
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

var setOptions2 = {
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
var dataChart2 = {
    labels: [
        '07:00','08:00','09:00','10:00','11:00','12:00','13:00',
        '14:00','15:00','16:00','17:00','18:00','19:00','20:00',
        '21:00','22:00','23:00','24:00','01:00'
    ],
    datasets: [
        {
            label: 'Jugo Diluido Tandem 2',
            data: ['13.98','13.92','14.46','13.74','14.46','13.92','13.98','13.74','14.46','13.98','13.92','13.74','14.46','13.92','13.98','13.74','14.46','13.92','13.98'],
            fill: false,
            backgroundColor: '#007bff',
            borderColor: '#0056b3',
            borderWidth: 1
        },
        {
            label: 'Jugo Clarificado',
            data: ['14.04','14.04','14.04','14.04','14.04','14.04','14.04','14.04','14.04','14.04','14.04','14.04','14.04','14.04','14.04','14.04','14.04','14.04','14.04'],
            fill: false,
            backgroundColor: '#28a745',
            borderColor: '#1e7e34',
            borderWidth: 1
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
var dataChart3 = {
    labels: ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00','01:00',],
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

var setOptions4 = {
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
var dataChart4 = {
    labels: [
        '07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00',
        '16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00','01:00'
    ],
    datasets: [
        {
            label: 'Jugo Diluido',
            data: [
                '86.45','0','88.54','','85.91','87.62','0','86.37','89.12',
                '','86.45','0','88.54','','85.91','87.62','0','86.37','89.12'
            ],
            fill: false,
            backgroundColor: '#007bff',
            borderColor: '#0056b3',
            borderWidth: 1
        },
        {
            label: 'Jugo Clarificado',
            data: [
                '88.72','87.33','0','89.45','','85.89','88.24','','87.45',
                '85.77','88.72','87.33','0','89.45','','85.89','88.24','','87.45'
            ],
            fill: false,
            backgroundColor: '#28a745',
            borderColor: '#1e7e34',
            borderWidth: 1
        },
        {
            label: 'Jugo Filtro Mezcla',
            data: [
                '','89.12','86.29','87.18','88.77','','89.33','87.94','0',
                '88.68','','89.12','86.29','87.18','88.77','','89.33','87.94','0'
            ],
            fill: false,
            backgroundColor: '#ffc107',
            borderColor: '#e0a800',
            borderWidth: 1
        }
    ]
};

var setOptions5 = {
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
var dataChart5 = {
    labels: [
        '07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00',
        '16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00','01:00'
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
