//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'calendar', col: '12', id:'calendarFirst', title:'Calendario'},
        ] 
    },
    { class:'', _children : [
            { type:'modal', col: '12', id:'modalInformation', title:'Información', formElements : [
                    {type:'p', title:'Punto de venta:', id:'textPointSale'},
                    {type:'p', title:'Servicio:', id:'textService'},
                    {type:'p', title:'Horario:', id:'textSchedule'},
                    {type:'p', title:'Fecha:', id:'textDate'},
                    {type:'p', title:'Fase:', id:'textPhase'},
                    {type:'p', title:'Estatus:', id:'textStatus'},
                    {type:'p', title:'Coordinador:', id:'textCoordinator'},
                ]
            },
        ] 
    },
    { class:'', _children : [
            { type:'card-table', col: '4', id:'cardTableFirst', badge:false, title:'Ordenes de servicio'},
            { type: 'table', col: '4', id: 'tableFirst', title: 'UDS Iguala'},
            { type:'card-table', col: '4', id:'cardTableSecond', badge:false, title:'Estatus OS'},
        ] 
    },
    { class:'', _children : [
            { type: 'chart', col: '4', id: 'chartFirst', title: 'Grafíca Ordenes de servicio' },
            { type: 'chart', col: '4', id: 'chartSecond', title: 'Grafíca UDS Iguala' },
            { type: 'chart', col: '4', id: 'chartThird', title: 'Grafíca Estatus OS' },
        ] 
    },
    { class:'', _children : [
            { type:'card-table', col: '4', id:'cardTableThird', badge:false, title:'UDS por tipo de Mantto'},
            { type:'card-table', col: '4', id:'cardTableFourth', badge:false, title:'UDS por Estado'},
            { type:'card-table', col: '4', id:'cardTableFiveth', badge:false, title:' UDS por Tipo de Mueble'},
        ] 
    },
    { class:'', _children : [
            { type: 'chart', col: '4', id: 'chartFourth', title: 'Grafíca UDS por tipo de Mantto' },
            { type: 'chart', col: '4', id: 'chartFiveth', title: 'Grafíca UDS por Estado' },
            { type: 'chart', col: '4', id: 'chartSeventh', title: 'Grafíca UDS por Tipo de Mueble'},

        ] 
    },
    { class:'', _children : [
            { type:'card-table', col: '6', id:'cardTableSixth', badge:false, title:'UDS por Canal'},
            { type: 'chart', col: '6', id: 'chartSixth', title: 'Grafíca UDS por Canal'},
        ] 
    },
];

let events = [
    {
        extendedProps: {
            pointSale: "Laboratorio Clínico - SALUDESA",
            service: "Identificación Biomédica - BioTech BTX-1000",
            schedule: "2025-09-05",
            date: "2025-09-05",
            phase: "Levantamiento",
            status: "Pendiente",
            coordinator: "Juan Pérez"
        },
        allDay: true,
        description: "Levantamiento de información de equipo biomédico",
        title: "Levantamiento de Equipo Biomédico",
        color: "#3498db",
        start: "2025-09-05",
        eventBackgroundColor: "#3498db"
    },
    {
        extendedProps: {
            pointSale: "Microbiología - SALUDESA",
            service: "Microscopio Nikon CX-200",
            schedule: "2025-09-20",
            date: "2025-09-20",
            phase: "Ejecución",
            status: "Completado",
            coordinator: "María López"
        },
        allDay: true,
        description: "Ejecución de servicio de microscopía",
        title: "Ejecución de Servicio Microscopía",
        color: "#27ae60",
        start: "2025-09-20",
        eventBackgroundColor: "#27ae60"
    },
    {
        extendedProps: {
            pointSale: "Biología Molecular - SALUDESA",
            service: "Centrífuga ThermoFisher T-Spin 300",
            schedule: "2025-09-07",
            date: "2025-09-07",
            phase: "Ejecución",
            status: "En proceso",
            coordinator: "Luis Martínez"
        },
        allDay: true,
        description: "Ejecución de servicio de centrifugado",
        title: "Ejecución de Servicio Centrífuga",
        color: "#f39c12",
        start: "2025-09-07",
        eventBackgroundColor: "#f39c12"
    },
    {
        extendedProps: {
            pointSale: "Química Clínica - SALUDESA",
            service: "Espectrofotómetro Agilent Spec-200",
            schedule: "2025-09-04",
            date: "2025-09-04",
            phase: "Levantamiento",
            status: "Pendiente",
            coordinator: "Ana Gómez"
        },
        allDay: true,
        description: "Levantamiento de datos para espectrofotómetro",
        title: "Levantamiento de Espectrofotómetro",
        color: "#8e44ad",
        start: "2025-09-04",
        eventBackgroundColor: "#8e44ad"
    }
];


//----Data Tables
let columsTable1 = [
    { title: "División", field: "division", headerTooltip: true, hozAlign: "center", width: 120 },
    { title: "Asignadas", field: "assigned", headerTooltip: true, hozAlign: "left", width: 150 },
    { title: "Pendientes", field: "pending", headerTooltip: true, hozAlign: "left", width: 150 },
    { title: "Restantes", field: "remaining", headerTooltip: true, hozAlign: "left", width: 150 },
];

const dataTable1 = [
    { division: 'CE', assigned: 110, pending: 47, remaining: 63 },
    { division: 'IM', assigned: 110, pending: 30 , remaining: 90},
];

//----Data CardTables

let cardTableFirstData = [
    {'title':'GUADALAJARA','value':19},
    {'title':'PUEBLA','value':18},
    {'title':'MONTERREY','value':17},
    {'title':'NAUCALPAN DE JUAREZ','value':16},
    {'title':'CIUDAD DE MEXICO','value':15},
    {'title':'QUERETARO','value':14}
];


let cardTableSecondData = [
    {'title':'Generadas','value':20},
    {'title':'Viabilidad','value':30},
    {'title':'Levantamiento','value':40},
    {'title':'Autorizacion SEM','value':50},
    {'title':'Ejecucion','value':60},
    {'title':'Terminadas','value':70}
];

let cardTableThirdData = [
    {'title':'Mini','value':20},
    {'title':'Bajo','value':30},
    {'title':'Medio','value':40},
    {'title':'Alto','value':50},
];

let cardTableFourthData = [
    {'title':'CDMX','value':20},
    {'title':'Edo. Mex.','value':30},
    {'title':'Queretaro','value':40},
    {'title':'Puebla','value':50},
    {'title':'Monterrey','value':60},
    {'title':'Guadalajara','value':70},
    {'title':'Merida','value':80},
];

let cardTableFivethData = [
    {'title':'Counter','value':20},
    {'title':'Mesa','value':30},
    {'title':'Muros','value':40},
    {'title':'Iluminacion','value':50},
];

let cardTableSixthData = [
    {'title':'SES','value':50},
    {'title':'Telcel','value':40},
    {'title':'Liverpool','value':10},
    {'title':'Sears','value':5},
];

//---Data Chart
var setOptions1 = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15,
                weight: 'bold'
            },
            anchor: 'end',
            align: 'right',
            offset: 10,
            formatter: function (value) {
                return value;
            }
        }
    },
    maintainAspectRatio: false,
    scales: {
        x: {
            display: false,
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            },
            ticks: {
                font: {
                    size: 12
                }
            }
        }
    },
};

var dataChart1 = {
    labels: [
        'Celulares',
        'Mantenimiento Mobiliario',
        'Tablets',
        'Otras incidencias',
        'Smartwatch',
        'True Wireless / Audifonos',
        'Ring',
        'Quick Fixes Lanzamiento S25'
    ],
    datasets: [
        {
            label: 'Visitas',
            data: [183, 68, 46, 34, 25, 9, 5, 2],
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
            display: false,
        },
        datalabels: {
            display: false,
        },
        tooltip: {
            titleFont: { size: 20 },
            bodyFont: { size: 17 },
            filter: function (tooltipItem) {
                return tooltipItem.dataIndex === 0;
            },
            callbacks: {
                label: function (tooltipItem) {
                    return `${tooltipItem.raw}%`;
                }
            }
        }
    },
    maintainAspectRatio: false,
    rotation: 0,
    circumference: 360,
    animation: {
        onComplete: function (animation) {
            const chart = animation.chart;
            const ctx = chart.ctx;
            const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
            const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;

            const value = chart.data.datasets[0].data[0];

            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 36px Arial';
            ctx.fillStyle = '#333';
            ctx.fillText(value + '%', centerX, centerY);
            ctx.restore();
        }
    }
};

var dataChart2 = {
    labels: ['Uds Resueltos', 'Pendientes'],
    datasets: [
        {
            label: 'Progreso',
            data: [70, 30],
            backgroundColor: [
                '#0099F9',
                'rgba(0,0,0,0.1)'
            ],
            borderWidth: 0,
            cutout: '70%',
        },
    ]
};

var setOptions3 = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'right',
            labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                    size: 14
                }
            }
        },
        title: {
            display: false,
        },
        datalabels: {
            display: true,
            color: 'white',
            font: {
                size: 16,
                weight: 'bold'
            },
            backgroundColor: function (context) {
                return context.dataset.backgroundColor[context.dataIndex];
            },
            borderColor: 'white',
            borderRadius: 6,
            borderWidth: 2,
            padding: 8,
            formatter: function (value, context) {
                return value + '%';
            }
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return context.label + ': ' + context.parsed + '';
                }
            }
        }
    },
    maintainAspectRatio: false,
    cutout: '50%',
};

var dataChart3 = {
    labels: ['SEM', 'Cheil'],
    datasets: [
        {
            label: 'Distribución',
            data: [87, 13],
            backgroundColor: [
                '#0099F9',
                '#FF6384'
            ],
            borderWidth: 2,
            borderColor: '#fff'
        },
    ]
};

var setOptions4 = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15,
                weight: 'bold'
            },
            anchor: 'end',
            align: 'right',
            offset: 10,
            formatter: function (value) {
                return value;
            }
        }
    },
    maintainAspectRatio: false,
    scales: {
        x: {
            display: false,
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            },
            ticks: {
                font: {
                    size: 12
                }
            }
        }
    },
};

var dataChart4 = {
    labels: [
        'Celulares',
        'Mantenimiento Mobiliario',
        'Tablets',
        'Otras incidencias',
        'Smartwatch',
        'True Wireless / Audifonos',
        'Ring',
        'Quick Fixes Lanzamiento S25'
    ],
    datasets: [
        {
            label: 'Visitas',
            data: [183, 68, 46, 34, 25, 9, 5, 2],
            fill: false,
            backgroundColor: '#007bff',
            borderColor: '#0056b3',
            borderWidth: 1
        },
    ]
};

var setOptions5 = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15,
                weight: 'bold'
            },
            anchor: 'end',
            align: 'right',
            offset: 10,
            formatter: function (value) {
                return value;
            }
        }
    },
    maintainAspectRatio: false,
    scales: {
        x: {
            display: false,
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            },
            ticks: {
                font: {
                    size: 12
                }
            }
        }
    },
};

var dataChart5 = {
    labels: [
        'Celulares',
        'Mantenimiento Mobiliario',
        'Tablets',
        'Otras incidencias',
        'Smartwatch',
        'True Wireless / Audifonos',
        'Ring',
        'Quick Fixes Lanzamiento S25'
    ],
    datasets: [
        {
            label: 'Visitas',
            data: [183, 68, 46, 34, 25, 9, 5, 2],
            fill: false,
            backgroundColor: '#007bff',
            borderColor: '#0056b3',
            borderWidth: 1
        },
    ]
};

var setOptions6 = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15,
                weight: 'bold'
            },
            anchor: 'end',
            align: 'right',
            offset: 10,
            formatter: function (value) {
                return value;
            }
        }
    },
    maintainAspectRatio: false,
    scales: {
        x: {
            display: false,
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            },
            ticks: {
                font: {
                    size: 12
                }
            }
        }
    },
};

var dataChart6 = {
    labels: [
        'Cuenta 1',
        'Cuenta 2',
        'Cuenta 3',
        'Cuenta 4',
        'Cuenta 5',
    ],
    datasets: [
        {
            label: 'Visitas',
            data: [183, 68, 46, 34, 25, 9, 5, 2],
            fill: false,
            backgroundColor: '#007bff',
            borderColor: '#0056b3',
            borderWidth: 1
        },
    ]
};

var setOptions7 = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15,
                weight: 'bold'
            },
            anchor: 'end',
            align: 'right',
            offset: 10,
            formatter: function (value) {
                return value;
            }
        }
    },
    maintainAspectRatio: false,
    scales: {
        x: {
            display: false,
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            },
            ticks: {
                font: {
                    size: 12
                }
            }
        }
    },
};

var dataChart7 = {
    labels: [
        'Cuenta 1',
        'Cuenta 2',
        'Cuenta 3',
        'Cuenta 4',
        'Cuenta 5',
    ],
    datasets: [
        {
            label: 'Visitas',
            data: [183, 68, 46, 34, 25, 9, 5, 2],
            fill: false,
            backgroundColor: '#007bff',
            borderColor: '#0056b3',
            borderWidth: 1
        },
    ]
};



//----Config Calendar
let configCustom = {
    locale : 'es',
    selectable : false,
    aspectRatio: 2,
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    initialView: window.innerWidth < 768 ? 'dayGridMonth' : 'dayGridMonth', 
    height: window.innerWidth < 768 ? 800 : 1200,
    scrollTime: '06:00',
    headerToolbar: {
        left: 'prev,next', 
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    eventContent: function (arg) {
        var event = arg.event;
        var html = '<b>' + event.extendedProps.coordinator + '</b><br>' + event.title;

        // MODIFICAR: Asegurar que el color se aplique
        var containerStyle = `
            max-width: 250px; 
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis;
            background-color: ${event.backgroundColor || event.color} !important;
            border-color: ${event.borderColor || event.color} !important;
            color: white !important;
            padding: 2px 4px;
            border-radius: 3px;
        `;

        html = '<div style="' + containerStyle + '">' + html + '</div>';

        return { html: html };
    },
    eventClick: function (info) {
        const event = info.event;
        const props = event.extendedProps || {};
        // Función helper para asignar valor por defecto
        const getValue = (key, defaultVal = 'N/A') => props[key] ?? defaultVal;
        const data = {
            textPointSale: getValue('pointSale'),
            textService: getValue('service'),
            textSchedule: getValue('schedule'),
            textDate: getValue('date'),
            textPhase: getValue('phase'),
            textStatus: getValue('status'),
            textCoordinator: getValue('coordinator'),
        };
        Object.entries(data).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        });
        new bootstrap.Modal(document.getElementById('modalInformation')).show();
    },
}