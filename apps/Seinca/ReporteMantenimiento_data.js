//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'separator', col: '12', title:'Resumen'},
            { type:'table', col: '12', id:'tableFirst', title:'Resumen de Puntuación'},
            { type:'chart', col: '12', id:'chartFirst', title:'Porcentaje Por Técnico'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Detalle Mantenimiento Técnicos  '},
            { type:'table', col: '6', id:'tableSecond', title:'Cantidad de Equípos Intervenidos por Técnicos'},
            { type:'chart', col: '6', id:'chartSecond', title:'Cantidad Por Técnico'},

            { type:'table', col: '6', id:'tableThird', title:'Detalle de Actividades'},
            { type:'chart', col: '6', id:'chartThird', title:'Porcentaje Por Técnico'},

            { type:'table', col: '6', id:'tableFourth', title:'Temperatura por Suministro'},
            { type:'chart', col: '6', id:'chartFourth', title:'Porcentaje Por Técnico'},

            { type:'table', col: '6', id:'tableFiveth', title:'Fotos de Técnicos'},
            { type:'chart', col: '6', id:'chartFiveth', title:'Porcentaje Por Técnico'},

            { type:'table', col: '6', id:'tableSixth', title:'Estado Operativo'},
            { type:'chart', col: '6', id:'chartSixth', title:'Porcentaje Por Técnico'},

            { type:'table', col: '6', id:'tableSeventh', title:'Condición del Equipo'},
            { type:'chart', col: '6', id:'chartSeventh', title:'Porcentaje Por Técnico'},

            { type:'table', col: '6', id:'tableEigth', title:'Reporte de Voltajes'},
            { type:'chart', col: '6', id:'chartEigth', title:'Porcentaje Por Técnico'},
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


let columsTable1 = [
    { title: "Técnico", field: 'tecnico', headerTooltip: true, hozAlign: "left", width: 300},
    { title: "Reporte de Actividades", field: 'num_actividades', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Temp - Suministro", field: 'num_suministro', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:210},
    { title: "Foto", field: 'num_foto', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width: 160},
    { title: "Estado Operativo", field: 'num_operativo', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:210},
    { title: "Condición del Equípo", field: 'num_equipo', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:210},
    { title: "Voltaje Ab", field: 'num_voltaje', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width: 180},
    { title: "Puntuación", field: 'num_sum', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width: 180},
    { title: "Cumplimiento", field: 'num_cumplimiento', headerTooltip: true, formatter: styleLigth, hozAlign: "center", width:250},
];

let dataTable1 = [
    {
        tecnico: "Juan Pérez",
        num_actividades: 3.2,
        num_suministro: 2.5,
        num_foto: 4.0,
        num_operativo: 3.8,
        num_equipo: 2.1,
        num_voltaje: 3.4,
        num_sum: 19.0,
        num_cumplimiento:19,
    },
    {
        tecnico: "María López",
        num_actividades: 2.7,
        num_suministro: 3.3,
        num_foto: 3.9,
        num_operativo: 2.8,
        num_equipo: 3.5,
        num_voltaje: 2.6,
        num_sum: 18.8,
        num_cumplimiento:78,
    },
    {
        tecnico: "Carlos Ramírez",
        num_actividades: 1.9,
        num_suministro: 2.4,
        num_foto: 3.1,
        num_operativo: 2.2,
        num_equipo: 1.8,
        num_voltaje: 2.0,
        num_sum: 13.4,
        num_cumplimiento:75,
    },
    {
        tecnico: "Ana Torres",
        num_actividades: 3.5,
        num_suministro: 3.7,
        num_foto: 4.0,
        num_operativo: 3.9,
        num_equipo: 3.2,
        num_voltaje: 3.6,
        num_sum: 21.9,
        num_cumplimiento:90,
    },
    {
        tecnico: "Luis Hernández",
        num_actividades: 2.1,
        num_suministro: 2.8,
        num_foto: 3.0,
        num_operativo: 2.5,
        num_equipo: 2.9,
        num_voltaje: 3.1,
        num_sum: 16.4,
        num_cumplimiento:80,
    }
];

let columsTable2 = [
    { title: "Técnico", field: 'tecnico', headerTooltip: true, hozAlign: "left", width: 300},
    { title: "Cantidad de Equipos Intervenido / Técnicos", field: 'num_equipos_intervenidos', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width: 180},
];

let dataTable2 = [
    {
        tecnico: "Juan Pérez",
        num_equipos_intervenidos: 55
    },
    {
        tecnico: "María López",
        num_equipos_intervenidos: 44
    },
    {
        tecnico: "Carlos Ramírez",
        num_equipos_intervenidos: 33
    },
    {
        tecnico: "Ana Torres",
        num_equipos_intervenidos: 66
    },
    {
        tecnico: "Luis Hernández",
        num_equipos_intervenidos: 45
    }
];

let columsTable3 = [
    { title: "Técnico", field: 'tecnico', headerTooltip: true, hozAlign: "left", width: 300},
    { title: "Reporte de Actividades", field: 'num_actividades', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Equipos intervenidos", field: 'num_mantenimiento', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Cumplimiento", field: 'num_cumplimiento', headerTooltip: true, formatter: styleLigth, hozAlign: "center", width:250},
    { title: "Puntuación", field: 'num_puntuacion', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
];

let dataTable3 = [
    {
        tecnico: "Juan Pérez",
        num_actividades: 260,
        num_mantenimiento: 285,
        num_cumplimiento: 91,    
        num_puntuacion: 0.91     
    },
    {
        tecnico: "María López",
        num_actividades: 210,
        num_mantenimiento: 230,
        num_cumplimiento: 88,
        num_puntuacion: 0.88
    },
    {
        tecnico: "Carlos Ramírez",
        num_actividades: 180,
        num_mantenimiento: 190,
        num_cumplimiento: 85,
        num_puntuacion: 0.85
    },
    {
        tecnico: "Ana Torres",
        num_actividades: 300,
        num_mantenimiento: 320,
        num_cumplimiento: 94,
        num_puntuacion: 0.94
    },
    {
        tecnico: "Luis Hernández",
        num_actividades: 240,
        num_mantenimiento: 250,
        num_cumplimiento: 89,
        num_puntuacion: 0.89
    }
];

let columsTable4 = [
    { title: "Técnico", field: 'tecnico', headerTooltip: true, hozAlign: "left", width: 300},
    { title: "Temperatura de Suministro", field: 'num_temp', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Equipos intervenidos", field: 'num_mantenimiento', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Cumplimiento", field: 'num_cumplimiento', headerTooltip: true, formatter: styleLigth, hozAlign: "center", width:250},
    { title: "Puntuación", field: 'num_puntuacion', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
];

let dataTable4 = [
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

let columsTable5 = [
    { title: "Técnico", field: 'tecnico', headerTooltip: true, hozAlign: "left", width: 300},
    { title: "Fotos", field: 'num_foto', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Equipos intervenidos", field: 'num_mantenimiento', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Cumplimiento", field: 'num_cumplimiento', headerTooltip: true, formatter: styleLigth, hozAlign: "center", width:250},
    { title: "Puntuación", field: 'num_puntuacion', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
];

let dataTable5  = [
    {
        tecnico: "Juan Pérez",
        num_foto: 200,
        num_mantenimiento: 180,
        num_cumplimiento: 90,   // (180 / 200) * 100
        num_puntuacion: 0.90
    },
    {
        tecnico: "María López",
        num_foto: 150,
        num_mantenimiento: 120,
        num_cumplimiento: 80,
        num_puntuacion: 0.80
    },
    {
        tecnico: "Carlos Ramírez",
        num_foto: 100,
        num_mantenimiento: 95,
        num_cumplimiento: 95,
        num_puntuacion: 0.95
    },
    {
        tecnico: "Ana Torres",
        num_foto: 220,
        num_mantenimiento: 210,
        num_cumplimiento: 95.45,
        num_puntuacion: 0.95
    },
    {
        tecnico: "Luis Hernández",
        num_foto: 180,
        num_mantenimiento: 140,
        num_cumplimiento: 77.78,
        num_puntuacion: 0.78
    }
];


let columsTable6 = [
    { title: "Técnico", field: 'tecnico', headerTooltip: true, hozAlign: "left", width: 300},
    { title: "Reporte Presión de Liquido", field: 'num_presion', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Equipos intervenidos", field: 'num_mantenimiento', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Cumplimiento", field: 'num_cumplimiento', headerTooltip: true, formatter: styleLigth, hozAlign: "center", width:250},
    { title: "Puntuación", field: 'num_puntuacion', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
];

let dataTable6 = [
    {"tecnico": "Juan Pérez", "num_presion": 120, "num_mantenimiento": 150, "num_cumplimiento": 80.0, "num_puntuacion": 1.5},
    {"tecnico": "María López", "num_presion": 200, "num_mantenimiento": 220, "num_cumplimiento": 90.91, "num_puntuacion": 1.8},
    {"tecnico": "Carlos Ramírez", "num_presion": 75, "num_mantenimiento": 100, "num_cumplimiento": 75.0, "num_puntuacion": 1.2},
    {"tecnico": "Ana Torres", "num_presion": 180, "num_mantenimiento": 200, "num_cumplimiento": 90.0, "num_puntuacion": 1.7},
    {"tecnico": "Luis Hernández", "num_presion": 90, "num_mantenimiento": 120, "num_cumplimiento": 75.0, "num_puntuacion": 1.1},
];


let columsTable7 = [
    { title: "Técnico", field: 'tecnico', headerTooltip: true, hozAlign: "left", width: 300},
    { title: "Reporte Consumo Compresor", field: 'num_compresor', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Equipos intervenidos", field: 'num_mantenimiento', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Cumplimiento", field: 'num_cumplimiento', headerTooltip: true, formatter: styleLigth, hozAlign: "center", width:250},
    { title: "Puntuación", field: 'num_puntuacion', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
];

let dataTable7 = [
    {"tecnico": "Juan Pérez", "num_compresor": 130, "num_mantenimiento": 160, "num_cumplimiento": 81.25, "num_puntuacion": 1.5},
    {"tecnico": "María López", "num_compresor": 210, "num_mantenimiento": 240, "num_cumplimiento": 87.5, "num_puntuacion": 1.9},
    {"tecnico": "Carlos Ramírez", "num_compresor": 80, "num_mantenimiento": 100, "num_cumplimiento": 80.0, "num_puntuacion": 1.2},
    {"tecnico": "Ana Torres", "num_compresor": 190, "num_mantenimiento": 210, "num_cumplimiento": 90.48, "num_puntuacion": 1.8},
    {"tecnico": "Luis Hernández", "num_compresor": 95, "num_mantenimiento": 120, "num_cumplimiento": 79.17, "num_puntuacion": 1.3},
];

let columsTable8 = [
    { title: "Técnico", field: 'tecnico', headerTooltip: true, hozAlign: "left", width: 300},
    { title: "Count of Voltaje AB", field: 'num_voltaje', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Equipos intervenidos", field: 'num_mantenimiento', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
    { title: "Cumplimiento", field: 'num_cumplimiento', headerTooltip: true, formatter: styleLigth, hozAlign: "center", width:250},
    { title: "Puntuación", field: 'num_puntuacion', headerTooltip: true, formatter: "money", formatterParams:CONFIG_DECIMAL , hozAlign: "center", width:250},
];

let dataTable8 = [
    {"tecnico": "Juan Pérez", "num_voltaje": 140, "num_mantenimiento": 180, "num_cumplimiento": 77.78, "num_puntuacion": 1.5},
    {"tecnico": "María López", "num_voltaje": 220, "num_mantenimiento": 250, "num_cumplimiento": 88.0, "num_puntuacion": 1.9},
    {"tecnico": "Carlos Ramírez", "num_voltaje": 90, "num_mantenimiento": 120, "num_cumplimiento": 75.0, "num_puntuacion": 1.2},
    {"tecnico": "Ana Torres", "num_voltaje": 200, "num_mantenimiento": 230, "num_cumplimiento": 86.96, "num_puntuacion": 1.8},
    {"tecnico": "Luis Hernández", "num_voltaje": 100, "num_mantenimiento": 130, "num_cumplimiento": 76.92, "num_puntuacion": 1.3},
];

//-------------Charts Colums
var dataChart1 = {
    labels: ["Ana Torres","Juan Pérez","María López","Luis Hernández","Carlos Ramírez"],
    datasets: [
        {
            label: 'Porcentaje',
            data: [21.9,19.0,18.8,16.4,13.4],
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
    labels: ["Carlos Ramírez","Ana Torres","Juan Pérez","María López","Luis Hernández"],
    datasets: [
        {
            label: 'Cantidad',
            data: [95,95.45,90,80,77.78],
            fill: false,
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        },
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
    labels: ["Carlos Ramírez","Ana Torres","Juan Pérez","María López","Luis Hernández"],
    datasets: [
        {
            label: 'Cantidad',
            data: [95,95.45,90,80,77.78],
            fill: false,
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        },
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

var dataChart6 = {
    labels: ["Ana Torres","María López","Luis Hernández","Juan Pérez","Carlos Ramírez"],
    datasets: [
        {
            label: 'Cumplimiento (%)',
            data: [90.48,88.46,81.25,80,75],
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
    labels: ["María López","Ana Torres","Luis Hernández","Carlos Ramírez","Juan Pérez"],
    datasets: [
        {
            label: 'Cumplimiento (%)',
            data: [87.64,87.50,79.25,78.35,77.84],
            fill: false,
            backgroundColor: [],
            borderColor: [],
            borderWidth: 2,
            tension: 0.3
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

var dataChart8 = {
    labels: ["María López","Ana Torres","Luis Hernández","Juan Pérez","Carlos Ramírez"],
    datasets: [
        {
            label: 'Cumplimiento Voltaje (%)',
            data: [88.13,87.04,78.57,77.08,75.32],
            fill: false,
            backgroundColor: [],
            borderColor: [],
            borderWidth: 2,
            tension: 0.3
        }
    ]
};

var setOptions8 = {
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