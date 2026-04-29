//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'separator', col: '12', title:'Resumen'},
            { type:'table', col: '12', id:'tableFirst', title:'Resumen de Puntuación'},
            { type:'chart', col: '12', id:'chartFirst', title:'Porcentaje Por Técnico'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Detalle Evaluación de Servicios Tecnicos'},
            { type:'table', col: '6', id:'tableSecond', title:'Fallas Identificadas'},
            { type:'chart', col: '6', id:'chartSecond', title:'Porcentaje Por Técnico'},

            { type:'table', col: '6', id:'tableThird', title:'Trabajo Realizado'},
            { type:'chart', col: '6', id:'chartThird', title:'Porcentaje Por Técnico'},

            { type:'table', col: '6', id:'tableFourth', title:'Como se Dejo el Equipo'},
            { type:'chart', col: '6', id:'chartFourth', title:'Porcentaje Por Técnico'},

            { type:'table', col: '6', id:'tableFiveth', title:'Temperatura del Suministro'},
            { type:'chart', col: '6', id:'chartFiveth', title:'Porcentaje Por Técnico'},

            { type:'table', col: '6', id:'tableSixth', title:'Fotos'},
            { type:'chart', col: '6', id:'chartSixth', title:'Porcentaje Por Técnico'},

            { type:'table', col: '6', id:'tableSeventh', title:'Condición del Equipo'},
            { type:'chart', col: '6', id:'chartSeventh', title:'Porcentaje Por Técnico'},

        ] 
    },
];

//-------------Tables Colum
const CONFIG_DECIMAL =  { symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 2 }
const CONFIG_PERCENTAGE =  { symbol: "%", symbolAfter: "true", decimal: ".", thousand: ",", precision: 2 }

function styleLigth(cell) {
    let value = cell.getValue();

    if (value === null || value === undefined) return "";

    let color = "";

    if (value >= 75) {
        color = "#28a745"; // verde
    } else if (value > 50) {
        color = "#fd7e14"; // naranja
    } else {
        color = "#dc3545"; // rojo
    }
    return `<span style="color:${color}; font-weight:bold;">${value}%</span>`;
}


var columsTable1  = [
    { title: "Técnico", field: "tecnico", hozAlign: "left", width: 250 },
    {
        title: "Fallas Identificadas",
        columns: [
            { title: "Valor", field: "fallas_val", formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 120 },
            { title: "%", field: "fallas_pct", formatter: styleLigth, hozAlign: "center", width: 120 },
        ],
    },
    {
        title: "Trabajo Realizado",
        columns: [
            { title: "Valor", field: "trabajo_val", formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 120 },
            { title: "%", field: "trabajo_pct", formatter: styleLigth, hozAlign: "center", width: 120 },
        ],
    },
    {
        title: "Cómo Se Dejó el Equipo",
        columns: [
            { title: "Valor", field: "equipo_val", formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 120 },
            { title: "%", field: "equipo_pct", formatter: styleLigth, hozAlign: "center", width: 120 },
        ],
    },
    {
        title: "Temperatura de Suministro",
        columns: [
            { title: "Valor", field: "temp_val", formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 120 },
            { title: "%", field: "temp_pct", formatter: styleLigth, hozAlign: "center", width: 120 },
        ],
    },
    {
        title: "Fotos",
        columns: [
            { title: "Valor", field: "fotos_val", formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 120 },
            { title: "%", field: "fotos_pct", formatter: styleLigth, hozAlign: "center", width: 120 },
        ],
    },
    {
        title: "Condición del Equipo",
        columns: [
            { title: "Valor", field: "condicion_val", formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 120 },
            { title: "%", field: "condicion_pct", formatter: styleLigth, hozAlign: "center", width: 120 },
        ],
    },
    { title: "Acumulado", field: "acumulado", formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 140 }
];

let dataTable1  = [
    {
        tecnico: "Juan Pérez",
        fallas_val: 0.67, fallas_pct: 33,
        trabajo_val: 0.80, trabajo_pct: 40,
        equipo_val: 0.50, equipo_pct: 25,
        temp_val: 0.20, temp_pct: 10,
        fotos_val: 0.70, fotos_pct: 35,
        condicion_val: 0.60, condicion_pct: 30,
        acumulado: 3.47
    },
    {
        tecnico: "María López",
        fallas_val: 0.75, fallas_pct: 38,
        trabajo_val: 0.65, trabajo_pct: 32,
        equipo_val: 0.55, equipo_pct: 28,
        temp_val: 0.10, temp_pct: 5,
        fotos_val: 0.80, fotos_pct: 40,
        condicion_val: 0.70, condicion_pct: 35,
        acumulado: 3.55
    },
    {
        tecnico: "Carlos Ramírez",
        fallas_val: 0.60, fallas_pct: 30,
        trabajo_val: 0.70, trabajo_pct: 35,
        equipo_val: 0.40, equipo_pct: 20,
        temp_val: 0.15, temp_pct: 8,
        fotos_val: 0.65, fotos_pct: 33,
        condicion_val: 0.50, condicion_pct: 25,
        acumulado: 3.00
    },
    {
        tecnico: "Ana Torres",
        fallas_val: 0.90, fallas_pct: 45,
        trabajo_val: 0.85, trabajo_pct: 42,
        equipo_val: 0.70, equipo_pct: 35,
        temp_val: 0.30, temp_pct: 15,
        fotos_val: 0.88, fotos_pct: 44,
        condicion_val: 0.80, condicion_pct: 40,
        acumulado: 4.43
    },
    {
        tecnico: "Luis Hernández",
        fallas_val: 0.55, fallas_pct: 28,
        trabajo_val: 0.60, trabajo_pct: 30,
        equipo_val: 0.45, equipo_pct: 22,
        temp_val: 0.05, temp_pct: 2,
        fotos_val: 0.50, fotos_pct: 25,
        condicion_val: 0.48, condicion_pct: 24,
        acumulado: 2.63
    }
];

let columsTable2 = [
    { title: "Ténico", field: 'tecnico', headerTooltip: true, hozAlign: "left", width: 300},
    { title: "Fallas Identificadas", field: 'num_fallas', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Cantidad De Equipos Intervenidos / Técnicos", field: 'num_equipos', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:450},
    { title: "Cumplimiento", field: 'num_cumplimiento', headerTooltip: true, formatter: styleLigth, hozAlign: "center", width:210},
    { title: "Puntuación", field: 'num_puntuacion', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:210},
];

let dataTable2 = [
    {
        tecnico: "Juan Pérez",
        num_fallas: 120,
        num_equipos: 240,
        num_cumplimiento: 50.0,
        num_puntuacion: 1.45
    },
    {
        tecnico: "María López",
        num_fallas: 95,
        num_equipos: 190,
        num_cumplimiento: 50.0,
        num_puntuacion: 1.30
    },
    {
        tecnico: "Carlos Ramírez",
        num_fallas: 80,
        num_equipos: 200,
        num_cumplimiento: 40.0,
        num_puntuacion: 1.10
    },
    {
        tecnico: "Ana Torres",
        num_fallas: 150,
        num_equipos: 250,
        num_cumplimiento: 60.0,
        num_puntuacion: 1.80
    },
    {
        tecnico: "Luis Hernández",
        num_fallas: 70,
        num_equipos: 175,
        num_cumplimiento: 40.0,
        num_puntuacion: 0.95
    }
];

let columsTable3 = [
    { title: "Ténico", field: 'tecnico', headerTooltip: true, hozAlign: "left", width: 300},
    { title: "Temperatura de Suministro", field: 'num_temp', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Cantidad de Equipos Intervenido / Tecnicos", field: 'num_mantenimiento', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Cumplimiento", field: 'num_cumplimiento', headerTooltip: true, formatter: styleLigth, hozAlign: "center", width:250},
    { title: "Puntuación", field: 'num_puntuacion', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
];

let dataTable3 = [
    {
        tecnico: "Juan Pérez",
        num_temp: 200,
        num_mantenimiento: 180,
        num_cumplimiento: 90,   
        num_puntuacion: 0.90
    },
    {
        tecnico: "María López",
        num_temp: 150,
        num_mantenimiento: 120,
        num_cumplimiento: 80,
        num_puntuacion: 0.80
    },
    {
        tecnico: "Carlos Ramírez",
        num_temp: 100,
        num_mantenimiento: 95,
        num_cumplimiento: 95,
        num_puntuacion: 0.95
    },
    {
        tecnico: "Ana Torres",
        num_temp: 220,
        num_mantenimiento: 210,
        num_cumplimiento: 95.45,
        num_puntuacion: 0.95
    },
    {
        tecnico: "Luis Hernández",
        num_temp: 180,
        num_mantenimiento: 140,
        num_cumplimiento: 77.78,
        num_puntuacion: 0.78
    }
];

let columsTable4 = [
    { title: "Técnico", field: "tecnico", hozAlign: "left", width: 260 },
    { title: "Reporte Presión de Succión", field: "reporte_succion", headerTooltip: true, formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 220 },
    { title: "Cantidad de Equipos Intervenidos / Técnicos", field: "num_equipos", headerTooltip: true, formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 320 },
    { title: "Cumplimiento", field: "cumplimiento", headerTooltip: true, formatter: styleLigth, hozAlign: "center", width: 180 },
    { title: "Puntuación", field: "puntuacion", headerTooltip: true, formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 160 }
];

let dataTable4  = [
    {
        tecnico: "Juan Pérez",
        reporte_succion: 2,
        num_equipos: 6,
        cumplimiento: 33,
        puntuacion: 0.33
    },
    {
        tecnico: "María López",
        reporte_succion: 3,
        num_equipos: 9,
        cumplimiento: 33,
        puntuacion: 0.33
    },
    {
        tecnico: "Carlos Ramírez",
        reporte_succion: 1,
        num_equipos: 5,
        cumplimiento: 20,
        puntuacion: 0.20
    },
    {
        tecnico: "Ana Torres",
        reporte_succion: 4,
        num_equipos: 10,
        cumplimiento: 40,
        puntuacion: 0.40
    },
    {
        tecnico: "Luis Hernández",
        reporte_succion: 2,
        num_equipos: 8,
        cumplimiento: 25,
        puntuacion: 0.25
    }
];

let columsTable5 = [
    { title: "Técnico", field: "tecnico", hozAlign: "left", width: 260 },
    { title: "Reporte Presión de Líquido", field: "reporte_liquido", headerTooltip: true, formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 230 },
    { title: "Cantidad de Equipos Intervenidos / Técnicos", field: "num_equipos", headerTooltip: true, formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 320 },
    { title: "Cumplimiento", field: "cumplimiento", headerTooltip: true, formatter: styleLigth, hozAlign: "center", width: 180 },
    { title: "Puntuación", field: "puntuacion", headerTooltip: true, formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 160 }
];

var dataTable5 = [
    {
        tecnico: "Juan Pérez",
        reporte_liquido: 2,
        num_equipos: 6,
        cumplimiento: 33,
        puntuacion: 0.33
    },
    {
        tecnico: "María López",
        reporte_liquido: 4,
        num_equipos: 10,
        cumplimiento: 40,
        puntuacion: 0.40
    },
    {
        tecnico: "Carlos Ramírez",
        reporte_liquido: 1,
        num_equipos: 5,
        cumplimiento: 20,
        puntuacion: 0.20
    },
    {
        tecnico: "Ana Torres",
        reporte_liquido: 5,
        num_equipos: 10,
        cumplimiento: 50,
        puntuacion: 0.50
    },
    {
        tecnico: "Luis Hernández",
        reporte_liquido: 3,
        num_equipos: 8,
        cumplimiento: 38,
        puntuacion: 0.38
    }
];


let columsTable6 = [
    { title: "Técnico", field: "tecnico", hozAlign: "left", width: 260 },
    { title: "Reporte Consumo Compresor", field: "reporte_compresor", headerTooltip: true, formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 240 },
    { title: "Cantidad de Equipos Intervenidos / Técnicos", field: "num_equipos", headerTooltip: true, formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 320 },
    { title: "Cumplimiento", field: "cumplimiento", headerTooltip: true, formatter: styleLigth, hozAlign: "center", width: 180 },
    { title: "Puntuación", field: "puntuacion", headerTooltip: true, formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 160 }
];

let dataTable6  = [
    {
        tecnico: "Juan Pérez",
        reporte_compresor: 3,
        num_equipos: 9,
        cumplimiento: 33,
        puntuacion: 0.33
    },
    {
        tecnico: "María López",
        reporte_compresor: 5,
        num_equipos: 10,
        cumplimiento: 50,
        puntuacion: 0.50
    },
    {
        tecnico: "Carlos Ramírez",
        reporte_compresor: 2,
        num_equipos: 8,
        cumplimiento: 25,
        puntuacion: 0.25
    },
    {
        tecnico: "Ana Torres",
        reporte_compresor: 6,
        num_equipos: 12,
        cumplimiento: 50,
        puntuacion: 0.50
    },
    {
        tecnico: "Luis Hernández",
        reporte_compresor: 4,
        num_equipos: 10,
        cumplimiento: 40,
        puntuacion: 0.40
    }
];



let columsTable7 = [
    { title: "Técnico", field: "tecnico", hozAlign: "left", width: 260 },
    { title: "Condición del Equipo", field: "condicion_equipo", headerTooltip: true, formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 220 },
    { title: "Cantidad de Equipos Intervenidos / Técnicos", field: "num_equipos", headerTooltip: true, formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 320 },
    { title: "Cumplimiento", field: "cumplimiento", headerTooltip: true, formatter: styleLigth, hozAlign: "center", width: 180 },
    { title: "Puntuación", field: "puntuacion", headerTooltip: true, formatter: "money", formatterParams: CONFIG_DECIMAL, hozAlign: "center", width: 160 }
];


let dataTable7  = [
    {
        tecnico: "Juan Pérez",
        condicion_equipo: 4,
        num_equipos: 10,
        cumplimiento: 40,
        puntuacion: 0.40
    },
    {
        tecnico: "María López",
        condicion_equipo: 6,
        num_equipos: 12,
        cumplimiento: 50,
        puntuacion: 0.50
    },
    {
        tecnico: "Carlos Ramírez",
        condicion_equipo: 3,
        num_equipos: 9,
        cumplimiento: 33,
        puntuacion: 0.33
    },
    {
        tecnico: "Ana Torres",
        condicion_equipo: 8,
        num_equipos: 10,
        cumplimiento: 80,
        puntuacion: 0.80
    },
    {
        tecnico: "Luis Hernández",
        condicion_equipo: 5,
        num_equipos: 11,
        cumplimiento: 45,
        puntuacion: 0.45
    }
];
//-------------Charts Colums
var dataChart1 = {
    labels: ["Ana Torres","Juan Pérez","María López","Carlos Ramírez","Luis Hernández"],
    datasets: [
        {
            label: 'Porcentaje',
            data: [60.0,50.0,50.0,40.0,40.0],
            fill: false,
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        },
    ]
};

var setOptions1 = {
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
            color: 'white',
            display: true,
            font: {
                size: 18
            },
            formatter: function(value) {
                return value + ' %';
            }
        },
    },
    scales: {
        y: {
            ticks: {
                stepSize: 1
            }
        }
    }
};

var dataChart2 = {
    labels: ["Ana Torres","Juan Pérez","Luis Hernández","María López","Carlos Ramírez"],
    datasets: [
        {
            label: 'Cantidad',
            data: [66,55,45,44,33],
            fill: false,
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        },
    ]
};

var setOptions2 = {
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
            color: 'white',
            display: true,
            font: {
                size: 18
            },
        },
    },
    scales: {
        y: {
            ticks: {
                stepSize: 1
            }
        }
    }
};

var dataChart3 = {
    labels: ["Ana Torres","Juan Pérez","Luis Hernández","María López","Carlos Ramírez"],
    datasets: [
        {
            label: 'Cantidad',
            data: [94,91,89,88,85],
            fill: false,
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        },
    ]
};

var setOptions3 = {
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
            color: 'white',
            display: true,
            font: {
                size: 18
            },
            formatter: function(value) {
                return value + ' %';
            }
        },
    },
    scales: {
        y: {
            ticks: {
                stepSize: 1
            }
        }
    }
};

var dataChart4 = {
    labels: ["Ana Torres","Juan Pérez","María López","Luis Hernández","Carlos Ramírez"],
    datasets: [
        {
            label: 'Cumplimiento (%)',
            data: [40,33,33,25,20],
            fill: false,
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }
    ]
};

var setOptions4 = {
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
            color: 'white',
            display: true,
            font: {
                size: 18
            },
            formatter: function(value) {
                return value + ' %';
            }
        },
    },
    scales: {
        y: {
            ticks: {
                stepSize: 1
            }
        }
    }
};

var dataChart5 = {
    labels: ["Ana Torres","María López","Luis Hernández","Juan Pérez","Carlos Ramírez"],
    datasets: [
        {
            label: 'Cumplimiento (%)',
            data: [50,40,38,33,20],
            fill: false,
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }
    ]
};

var setOptions5 = {
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
            color: 'white',
            display: true,
            font: {
                size: 18
            },
            formatter: function(value) {
                return value + ' %';
            }
        },
    },
    scales: {
        y: {
            ticks: {
                stepSize: 1
            }
        }
    }
};

var dataChart6  = {
    labels: ["María López","Ana Torres","Luis Hernández","Juan Pérez","Carlos Ramírez"],
    datasets: [
        {
            label: 'Cumplimiento (%)',
            data: [50,50,40,33,25],
            fill: false,
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }
    ]
};

var setOptions6 = {
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
            color: 'white',
            display: true,
            font: {
                size: 18
            },
            formatter: function(value) {
                return value + ' %';
            }
        },
    },
    scales: {
        y: {
            ticks: {
                stepSize: 1
            }
        }
    }
};

var dataChart7 = {
    labels: ["Ana Torres","María López","Luis Hernández","Juan Pérez","Carlos Ramírez"],
    datasets: [
        {
            label: 'Cumplimiento (%)',
            data: [80,50,45,40,33],
            fill: false,
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }
    ]
};

var setOptions7 = {
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
            color: 'white',
            display: true,
            font: {
                size: 18
            },
            formatter: function(value) {
                return value + ' %';
            }
        },
    },
    scales: {
        y: {
            ticks: {
                stepSize: 1
            }
        }
    }
};

