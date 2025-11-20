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
            { type:'separator', col: '12', title:'Lectura Pol'},
            { type:'table', col: '4', id:'tableThird', title:'Datos de Lectura Pol'},
            { type:'chart', col: '8', id:'chartThird', title:'Linea de tiempo de Lectura Pol'},
        ] 
    },
];
let dicReportContextEnergia = [
    { class:'', _children : [
            { type:'separator', col: '12', title:'Conductividad'},
            { type:'table', col: '4', id:'tableFirst', title:'Datos de Conductividad'},
            { type:'chart', col: '8', id:'chartFirst', title:'Linea de tiempo de Conductividad'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Solidos Totales'},
            { type:'table', col: '4', id:'tableSecond', title:'Datos de Solidos Totales'},
            { type:'chart', col: '8', id:'chartSecond', title:'Linea de tiempo de Solidos Totales'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'pH'},
            { type:'table', col: '4', id:'tableThird', title:'Datos de pH'},
            { type:'chart', col: '8', id:'chartThird', title:'Linea de tiempo de pH'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Fosfatos'},
            { type:'table', col: '4', id:'tableFourth', title:'Datos de Fosfatos'},
            { type:'chart', col: '8', id:'chartFourth', title:'Linea de tiempo de Fosfatos'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Flujo de Agua'},
            { type:'table', col: '4', id:'tableFiveth', title:'Datos de Flujo de Agua'},
            { type:'chart', col: '8', id:'chartFiveth', title:'Linea de tiempo de Flujo de Agua'},
        ] 
    },
];
let dicReportContextMolinos = [
    { class:'', _children : [
            { type:'separator', col: '12', title:'Pol de Bagazo'},
            { type:'table', col: '4', id:'tableFirst', title:'Datos de Pol de Bagazo'},
            { type:'chart', col: '8', id:'chartFirst', title:'Linea de tiempo de Pol de Bagazo'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Humedad Bagazo'},
            { type:'table', col: '4', id:'tableSecond', title:'Datos de Humedad Bagazo'},
            { type:'chart', col: '8', id:'chartSecond', title:'Linea de tiempo de Humedad Bagazo'},
        ] 
    },
];
let dicReportContextSupervisor = [
    { class:'', _children : [
            { type:'separator', col: '12', title:'pH'},
            { type:'table', col: '4', id:'tableFirst', title:'Datos de pH'},
            { type:'chart', col: '8', id:'chartFirst', title:'Linea de tiempo de pH'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Brix'},
            { type:'table', col: '4', id:'tableSecond', title:'Datos de Brix'},
            { type:'chart', col: '8', id:'chartSecond', title:'Linea de tiempo de Brix'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Pureza'},
            { type:'table', col: '4', id:'tableThird', title:'Datos de Pureza'},
            { type:'chart', col: '8', id:'chartThird', title:'Linea de tiempo de Pureza'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Pol'},
            { type:'table', col: '4', id:'tableFourth', title:'Datos de Pol'},
            { type:'chart', col: '8', id:'chartFourth', title:'Linea de tiempo de Pol'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Humedad'},
            { type:'table', col: '4', id:'tableFiveth', title:'Datos de Humedad'},
            { type:'chart', col: '8', id:'chartFiveth', title:'Linea de tiempo de Humedad'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Color'},
            { type:'table', col: '4', id:'tableSixth', title:'Datos de Color'},
            { type:'chart', col: '8', id:'chartSixth', title:'Linea de tiempo de Color'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Turbiedad'},
            { type:'table', col: '4', id:'tableSeventh', title:'Datos de Turbiedad'},
            { type:'chart', col: '8', id:'chartSeventh', title:'Linea de tiempo de Turbiedad'},
        ] 
    },
];

//----Config Table Clarificación
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
            color: 'black',
            display: true,
            anchor: 'end',        // Ubica el label al final de la barra
            align: 'end',         // Alinea al extremo
            clamp: true,          // evita que el texto se salga
            rotation: -90,        // Texto vertical
            font: {
                size: 12
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
                size: 16
            },
            display: true,
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
            display: true,
            anchor: 'end',        // Ubica el label al final de la barra
            align: 'end',         // Alinea al extremo
            clamp: true,          // evita que el texto se salga
            rotation: -90,        // Texto vertical
            font: {
                size: 9
            }
        }
    },
    scales: {
        y: {
            step: 1,
        }
    }
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



//------Config Table Energia
let columsTableEnergia1 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Conductividad",field:'conductividad',headerTooltip: true,hozAlign:"center", width:150},
];

let columsTableEnergia2 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Solidos Totales Caldera 5",field:'solido_total_5',headerTooltip: true,hozAlign:"center", width:130},
    { title:"Solidos Totales Caldera 6",field:'solido_total_6',headerTooltip: true,hozAlign:"center", width:130},
    { title:"Solidos Totales Caldera 7",field:'solido_total_7',headerTooltip: true,hozAlign:"center", width:130},
];

let columsTableEnergia3 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"pH Caldera 5",field:'ph_caldera_5',headerTooltip: true,hozAlign:"center", width:130},
    { title:"pH Caldera 6",field:'ph_caldera_6',headerTooltip: true,hozAlign:"center", width:130},
    { title:"pH Caldera 7",field:'ph_caldera_7',headerTooltip: true,hozAlign:"center", width:130},
];

let columsTableEnergia4 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Fosfatos Caldera 5",field:'fosfatos_caldera_5',headerTooltip: true,hozAlign:"center", width:130},
    { title:"Fosfatos Caldera 6",field:'fosfatos_caldera_6',headerTooltip: true,hozAlign:"center", width:130},
    { title:"Fosfatos Caldera 7",field:'fosfatos_caldera_7',headerTooltip: true,hozAlign:"center", width:130},
];

let columsTableEnergia5 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Flujo Agua Caldera 5",field:'flujo_agua_caldera_5',headerTooltip: true,hozAlign:"center", width:100},
    { title:"Flujo Agua Caldera 6",field:'flujo_agua_caldera_6',headerTooltip: true,hozAlign:"center", width:100},
    { title:"Flujo Agua Caldera 7",field:'flujo_agua_caldera_7',headerTooltip: true,hozAlign:"center", width:100},
];

var setOptionsEnergia1 = {
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
            display: true,
            anchor: 'end',        
            align: 'end',         
            clamp: true,          
            rotation: -90,        
            font: {
                size: 12
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

var setOptionsEnergia2 = {
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
            display: true,
            anchor: 'end',        
            align: 'end',         
            clamp: true,          
            rotation: -90,        
            font: {
                size: 12
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

var setOptionsEnergia3 = {
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
            display: true,
            anchor: 'end',        
            align: 'end',         
            clamp: true,          
            rotation: -90,        
            font: {
                size: 12
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

var setOptionsEnergia4 = {
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
            display: true,
            anchor: 'end',        
            align: 'end',         
            clamp: true,          
            rotation: -90,        
            font: {
                size: 12
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

var setOptionsEnergia5 = {
    responsive: true,
    layout: {
        padding: {
            top: 40   // espacio extra arriba
        }
    },
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: false,
        },
        datalabels: {
            display: true,
            color: 'black',
            anchor: 'end',
            align: 'top',
            offset: 6,
            rotation: 0,
            formatter: function(value, context) {
                if (context.dataIndex % 2 !== 0) return '';
                return value.toString();
            },
            font: {
                size: 10
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

//------Config Table Molinos
let columsTableMolinos1 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Pol Bagazo",field:'pol_bagazo',headerTooltip: true,hozAlign:"center", width:150},
];

let columsTableMolinos2 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Humedad Bagazo",field:'humedad_bagazo',headerTooltip: true,hozAlign:"center", width:150},
];

var setOptionsMolinos1 = {
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
            display: true,
            anchor: 'end',        
            align: 'end',         
            clamp: true,          
            rotation: -90,        
            font: {
                size: 12
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

var setOptionsMolinos2 = {
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
            display: true,
            anchor: 'end',        
            align: 'end',         
            clamp: true,          
            rotation: -90,        
            font: {
                size: 12
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

//------Config Table Supervisor
let columsTableSupervisor1 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Jugo Mezclado",field:'jugo_mezclado',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Jugo Claro",field:'jugo_claro',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Licor Clarificado",field:'licor_clarificado',headerTooltip: true,hozAlign:"center", width:150},
];

let columsTableSupervisor2 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Brix Jugo Mezclado",field:'brix_mezclado',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Brix Jugo Claro",field:'brix_claro',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Brix Jarabe",field:'brix_jarabe',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Brix Miel A",field:'brix_miel_a',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Brix Miel B",field:'brix_miel_b',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Brix Licor Fundido",field:'brix_licor_fundido',headerTooltip: true,hozAlign:"center", width:150},
];

let columsTableSupervisor3 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Jugo Diluido",field:'jugo_diluido',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Pureza Jugo Claro",field:'pureza_jugo_claro',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Pureza Jarabe",field:'pureza_jarabe',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Pureza Semilla B",field:'pureza_semilla_b',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Pureza Miel A",field:'pureza_miel_a',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Pureza Miel B",field:'pureza_miel_b',headerTooltip: true,hozAlign:"center", width:150},
];

let columsTableSupervisor4 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Pol de Bagazo",field:'pol_bagazo',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Pol de Cachaza",field:'pol_cachaza',headerTooltip: true,hozAlign:"center", width:150},
];

let columsTableSupervisor5 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Humedad Bagazo",field:'humedad_bagazo',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Humedad Cachaza",field:'humedad_cachaza',headerTooltip: true,hozAlign:"center", width:150},
];

let columsTableSupervisor6 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Color Jugo Diluido",field:'color_jugo_diluido',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Color Jugo Claro",field:'color_jugo_claro',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Color Jarabe",field:'color_jarabe',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Color Semilla B",field:'color_semilla_B',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Color Licor Fundido",field:'color_licor_fundido',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Color Licor Clarificado",field:'color_licor_clarificado',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Color Licor Decolorado",field:'color_licor_decolorado',headerTooltip: true,hozAlign:"center", width:150},
];

let columsTableSupervisor7 = [
    { title:"Hora", field:'hour',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Turbiedad Jugo Diluido",field:'turbiedad_jugo_diluido',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Turbiedad Jugo Claro",field:'turbiedad_jugo_claro',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Turbiedad Licor Fundido",field:'turbiedad_licor_fundido',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Turbiedad Licor Clarificado",field:'turbiedad_licor_clarificado',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Turbiedad Licor Decolorado",field:'turbiedad_licor_decolorado',headerTooltip: true,hozAlign:"center", width:150},
];

var setOptionsSupervisor1 = {
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
            display: true,
            anchor: 'end',        
            align: 'end',         
            clamp: true,          
            rotation: -90,        
            font: {
                size: 12
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

var setOptionsSupervisor2 = {
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
            display: true,
            anchor: 'end',        
            align: 'end',         
            clamp: true,          
            rotation: -90,        
            font: {
                size: 12
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

var setOptionsSupervisor3 = {
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
            display: true,
            anchor: 'end',        
            align: 'end',         
            clamp: true,          
            rotation: -90,        
            font: {
                size: 12
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

var setOptionsSupervisor4 = {
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
            display: true,
            anchor: 'end',        
            align: 'end',         
            clamp: true,          
            rotation: -90,        
            font: {
                size: 12
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

var setOptionsSupervisor5 = {
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
            display: true,
            anchor: 'end',        
            align: 'end',         
            clamp: true,          
            rotation: -90,        
            font: {
                size: 12
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

var setOptionsSupervisor6 = {
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
            display: true,
            anchor: 'end',        
            align: 'end',         
            clamp: true,          
            rotation: -90,        
            font: {
                size: 12
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

var setOptionsSupervisor7 = {
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
            display: true,
            anchor: 'end',        
            align: 'end',         
            clamp: true,          
            rotation: -90,        
            font: {
                size: 12
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

