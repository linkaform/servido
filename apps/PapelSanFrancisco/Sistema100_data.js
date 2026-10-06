//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'separator', col: '12', title:'ACCIDENTES'},
            { type:'chart', col: '4', id:'chartFirst', title:'Grafica Comparativo Mensual'},
            { type:'chart', col: '4', id:'chartSecond', title:'Grafica Incapacitantes / No Incapacitantes'},
            { type:'chart', col: '4', id:'chartThird', title:'Graficas de accidente'},
            { type:'table', col: '12', id:'tableFirst', title:'Tabla de Resultados Mensuales'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'ORDEN Y LIMPIEZA | Objetivo: 50%'},
            { type:'chart', col: '12', id:'chartFourth', title:'Grafica Comparativo Mensual'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'CAPACITACIÓN | Objetivo: 15%'},
            { type:'table', col: '4', id:'tableSecond', title:'Tabla de Resultados Mensuales'},
            { type:'chart', col: '8', id:'chartFiveth', title:'Grafica Comparativo Mensual'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'MEDIO AMBIENTE | Objetivo: 10%'},
            { type:'chart', col: '12', id:'chartSixth', title:'Grafica Comparativo Mensual'},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'RESULTADOS GENERALES POR ÁREA '},
            { type:'table', col: '4', id:'tableThird', title:'Desglose de resultados mensuales'},
            { type:'chart', col: '8', id:'chartSeven', title:'Grafica Comparativo Mensual'},
            { type:'chart', col: '6', id:'chartEigth', title:'Acumulado anual por área'},
            { type:'chart', col: '6', id:'chartNineth', title:'Comparativo por planta'},
        ] 
    },
];

//-----Configuraciones de la tabla
const CONFIG_PERCENTAGE =  { symbol: "%", symbolAfter: "true", decimal: ".", thousand: ",", precision: 2 }

function percentFormatter(cell) {
    const value = cell.getValue() || 0;
    const rowData = cell.getRow().getData();

    // 👉 detectar si es fila TOTAL
    const isTotal = rowData.indicador === "TOTAL";

    // 🔹 SOLO formato simple para filas normales
    if (!isTotal) {
        return `${value.toFixed(0)}%`;
    }

    // 🔥 SOLO la última fila lleva semáforo
    let color = "#d9534f"; // rojo
    if (value >= 50) color = "#6cab44"; // verde
    else if (value >= 25) color = "#f0ad4e"; // naranja

    return `<div style="
        background:${color};
        color:white;
        padding:4px;
        border-radius:4px;
        font-weight:bold;
    ">
        ${value.toFixed(2)}%
    </div>`;
}

function percentFormatter2(cell) {
    let value = cell.getValue();

    if (value === null || value === undefined || value === "") return "";

    const rowData = cell.getRow().getData();
    const isTotalRow = rowData.indicador === "Resultado Mensual";

    // 🔹 formato normal
    let formatted = value % 1 === 0 ? value + "%" : value.toFixed(2) + "%";

    // 🔥 última columna en negrita
    if (cell.getColumn().getField() === "total") {
        formatted = `<b>${formatted}</b>`;
    }

    // 🟢 última fila en verde
    if (isTotalRow) {
        return `<div style="
            background:#16a34a;
            color:white;
            padding:4px;
            border-radius:4px;
            font-weight:bold;
        ">${formatted}</div>`;
    }

    return formatted;
}

let columsTable1 = [
    { title: "Indicador", field: "indicador", hozAlign: "left", width: 260 },
    { title: "Almacén", field: "almacen", hozAlign: "center", formatter: percentFormatter, width: 260  },
    { title: "Calidad", field: "calidad", hozAlign: "center", formatter: percentFormatter, width: 260  },
    { title: "Mant. Auto", field: "mant_auto", hozAlign: "center", formatter: percentFormatter, width: 260  },
    { title: "Mant. Eléctrico", field: "mant_elec", hozAlign: "center", formatter: percentFormatter, width: 260  },
    { title: "Mant. Mecánico", field: "mant_mec", hozAlign: "center", formatter: percentFormatter, width: 260  },
    { title: "Materiales", field: "materiales", hozAlign: "center", formatter: percentFormatter, width: 260  },
    { title: "RH", field: "rh", hozAlign: "center", formatter: percentFormatter, width: 260  },
    { title: "Higiene", field: "higiene", hozAlign: "center", formatter: percentFormatter, width: 260  },
    { title: "Higiene B", field: "higiene_b", hozAlign: "center", formatter: percentFormatter, width: 260  },
    { title: "Servilleta", field: "servilleta", hozAlign: "center", formatter: percentFormatter, width: 260  },
    { title: "Edificio", field: "edificio", hozAlign: "center", formatter: percentFormatter, width: 260  },
    { title: "Total", field: "total", hozAlign: "center", formatter: percentFormatter, cssClass: "col-total",width: 260  }
];

let dataTable1 = [
    {
        indicador: "Seguridad basada en conductas",
        almacen: 25, calidad: 25, mant_auto: 25, mant_elec: 25, mant_mec: 25,
        materiales: 25, rh: 25, higiene: 25, higiene_b: 25, servilleta: 25, edificio: 25,
        total: 25
    },
    {
        indicador: "Observaciones de condiciones inseguras",
        almacen: 5, calidad: 5, mant_auto: 5, mant_elec: 5, mant_mec: 5,
        materiales: 5, rh: 5, higiene: 5, higiene_b: 5, servilleta: 5, edificio: 5,
        total: 5
    },
    {
        indicador: "Comisión de seguridad",
        almacen: 10, calidad: 10, mant_auto: 10, mant_elec: 10, mant_mec: 10,
        materiales: 10, rh: 10, higiene: 10, higiene_b: 10, servilleta: 10, edificio: 10,
        total: 10
    },
    {
        indicador: "Mejora de área",
        almacen: 10, calidad: 10, mant_auto: 10, mant_elec: 10, mant_mec: 10,
        materiales: 10, rh: 10, higiene: 10, higiene_b: 10, servilleta: 10, edificio: 10,
        total: 10
    },
    {
        indicador: "Entrevistas de Seguridad",
        almacen: 0, calidad: 0, mant_auto: 0, mant_elec: 0, mant_mec: 0,
        materiales: 0, rh: 0, higiene: 0, higiene_b: 0, servilleta: 0, edificio: 0,
        total: 0
    },
    {
        indicador: "TOTAL",
        almacen: 50, calidad: 50, mant_auto: 50, mant_elec: 50, mant_mec: 50,
        materiales: 50, rh: 50, higiene: 50, higiene_b: 50, servilleta: 50, edificio: 50,
        total: 50,
        _rowClass: "row-total"
    }
];

let columsTable2 = [
    { title: "ÁREA", field: "area", hozAlign: "left" },
    { title: "CUMPLIMIENTO", field: "cumplimiento",hozAlign: "center",formatter: CONFIG_PERCENTAGE},
    { title: "CALIFICACIÓN", field: "calificacion",hozAlign: "center",formatter: CONFIG_PERCENTAGE}
];

let dataTable2 = [
    {area: "MANTENIMIENTO MECÁNICO",cumplimiento: 96.43,calificacion: 14.46
    },
    {
        area: "",
        cumplimiento: "",
        calificacion: 14.96 // total / promedio
    }
];

let columsTable3 = [
    { title: "Indicador", field: "indicador", hozAlign: "left", width: 220 },
    { title: "Accidentes incapacitantes", field: "accidentes", hozAlign: "center",formatter: CONFIG_PERCENTAGE},
    { title: "Total final por indicador", field: "total", hozAlign: "center",formatter: CONFIG_PERCENTAGE}
];

let dataTable3 = [
    { indicador: "Seguridad", accidentes: 50.00, total: 50.00 },
    { indicador: "Orden y limpieza", accidentes: 25.00, total: 25.00 },
    { indicador: "Capacitación", accidentes: 14.96, total: 14.96 },
    { indicador: "Medio Ambiente", accidentes: 10.00, total: 10.00 },
    { indicador: "Resultado Mensual", accidentes: 99.96, total: 99.96 }
];


//-----Configuraciones de Grafica!

var dataChart1 = {
    labels: ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"],
    datasets: [
        {
            label: 'INCAP',
            data: [1,0,0,0,0,0,0,0,0,0,0,0],
            backgroundColor: '#f07c2b',
            borderColor: '#f07c2b',
            borderWidth: 1
        },
        {
            label: 'NO INCAP',
            data: [0,2,1,0,0,0,0,0,0,0,0,0],
            backgroundColor: '#6cab44',
            borderColor: '#6cab44',
            borderWidth: 1
        }
    ]
};

var optionsChart1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: true, position: 'top' },
        title: { display: false },
        datalabels: {
            color: 'white',
            anchor: 'center',
            align: 'center',
            font: { size: 14 },
            formatter: function(value) {
                return value > 0 ? value : '';
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
        }
    }
};

var dataChart2 = {
    labels: ["CON MXL","CON GDL","MOLINO","CON MTY"],
    datasets: [
        {
            label: 'INCAP',
            data: [0,1,0,0],
            backgroundColor: '#f07c2b',
            borderColor: '#f07c2b',
            borderWidth: 1
        },
        {
            label: 'NO INCAP',
            data: [1,3,1,3],
            backgroundColor: '#6cab44',
            borderColor: '#6cab44',
            borderWidth: 1
        }
    ]
};

var optionsChart2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: true, position: 'top' },
        datalabels: {
            color: 'white',
            font: { size: 14 },
            formatter: function(value) {
                return value > 0 ? value : '';
            }
        }
    },
    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true,
            beginAtZero: true,
            ticks: { stepSize: 1 }
        }
    }
};

var dataChart3 = {
    labels: ["CON MXL","CON GDL","MOLINO","CON MTY"],
    datasets: [
        {
            type: 'line',
            label: 'INCAP',
            data: [0,1,0,0],
            borderColor: '#f07c2b',
            backgroundColor: '#f07c2b',
            tension: 0.4
        },
        {
            type: 'bar',
            label: 'NO INCAP',
            data: [0,4,0,0],
            backgroundColor: '#6cab44',
            borderColor: '#6cab44',
            borderWidth: 1
        },
    ]
};

var optionsChart3 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: true, position: 'top' },
        datalabels: {
            color: 'white',
            font: { size: 14 },
            formatter: function(value) {
                return value > 0 ? value : '';
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            position: 'left',
            ticks: { stepSize: 1 }
        },
        y1: {
            beginAtZero: true,
            position: 'right',
            grid: { drawOnChartArea: false }
        }
    }
};

var dataChart4 = {
    labels: ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"],
    datasets: [
        {
            label: '2023',
            data: [50.00,47.50,46.64,50.00,50.00,48.86,50.00,47.73,45.45,50.00,50.00,50.00],
            borderColor: '#7fbf4d',
            backgroundColor: '#7fbf4d',
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 6,
            fill: false
        },
        {
            label: '2024',
            data: [48.00,50.00,50.00,null,null,null,null,null,null,null,null,null],
            borderColor: '#f28c38',
            backgroundColor: '#f28c38',
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 6,
            fill: false
        }
    ]
};

var optionsChart4 = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: true,
            position: 'right'
        },
        datalabels: {
            align: 'top',
            anchor: 'end',
            color: '#333',
            font: {
                size: 12,
                weight: 'bold'
            },
            formatter: function(value) {
                if (value === null) return '';
                return value.toFixed(2) + '%';
            }
        }
    },

    scales: {
        y: {
            beginAtZero: false,
            min: 44,
            max: 52,
            ticks: {
                callback: function(value) {
                    return value + '%';
                }
            }
        }
    }
};


var dataChart5 = {
    labels: ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"],
    datasets: [
        {
            label: '2024',
            data: [15.00,14.82,14.96,null,null,null,null,null,null,null,null,null],
            borderColor: '#f07c2b',
            backgroundColor: '#f07c2b',
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 7,
            fill: false
        }
    ]
};

var optionsChart5 = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: true,
            position: 'right'
        },
        datalabels: {
            align: 'top',
            anchor: 'end',
            color: '#333',
            font: {
                size: 12,
                weight: 'bold'
            },
            formatter: function(value) {
                if (value === null) return '';
                return value.toFixed(2) + '%';
            }
        }
    },

    scales: {
        y: {
            beginAtZero: false,
            min: 14,
            max: 15.5,
            ticks: {
                callback: function(value) {
                    return value + '%';
                }
            }
        }
    }
};


var dataChart6 = {
    labels: ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"],
    datasets: [
        {
            label: '2024',
            data: [14.90,15.10,14.75,15.20,14.95,15.05,null,null,null,null,null,null],
            borderColor: '#f07c2b',
            backgroundColor: '#f07c2b',
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 7,
            fill: false
        }
    ]
};

var optionsChart6 = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: true,
            position: 'right'
        },
        datalabels: {
            align: 'top',
            anchor: 'end',
            color: '#333',
            font: {
                size: 12,
                weight: 'bold'
            },
            formatter: function(value) {
                if (value === null) return '';
                return value.toFixed(2) + '%';
            }
        }
    },

    scales: {
        y: {
            beginAtZero: false,
            min: 14,
            max: 15.5,
            ticks: {
                callback: function(value) {
                    return value + '%';
                }
            }
        }
    }
};

var dataChart7 = {
    labels: ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"],
    datasets: [
        {
            label: '2024',
            data: [97.50,98.93,99.96,null,null,null,null,null,null,null,null,null],
            borderColor: '#7fbf4d',
            backgroundColor: '#7fbf4d',
            tension: 0.4,
            pointRadius: 5,
            fill: false
        },
        {
            label: '2023',
            data: [95.32,96.18,92.47,98.07,96.51,98.97,100.00,97.73,95.45,99.83,100.00,99.73],
            borderColor: '#f07c2b',
            backgroundColor: '#f07c2b',
            tension: 0.4,
            pointRadius: 5,
            fill: false
        }
    ]
};

var optionsChart7 = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: true,
            position: 'right'
        },
        datalabels: {
            align: 'top',
            anchor: 'end',
            color: '#333',
            font: {
                size: 11,
                weight: 'bold'
            },
            formatter: function(value) {
                if (value === null) return '';
                return value.toFixed(2) + '%';
            }
        }
    },

    scales: {
        y: {
            min: 90,
            max: 101,
            ticks: {
                callback: function(value) {
                    return value + '%';
                }
            }
        }
    }
};

var dataChart8 = {
    labels: [
        "Servilleta-T04",
        "Recursos humanos",
        "Materiales",
        "Mantenimiento eléctrico",
        "Mantenimiento automotriz",
        "Higiénico B",
        "Calidad",
        "Almacén de producto terminado",
        "Mantenimiento mecánico",
        "Higiénico C",
        "Mantenimiento de edificio",
        "Higiénico A/ Profesional"
    ],
    datasets: [
        {
            label: 'Seguridad',
            data: [50,50,50,50,50,50,50,50,50,50,50,50],
            backgroundColor: '#6b3f0b' // café
        },
        {
            label: 'O&L',
            data: [25,25,25,25,25,25,25,25,25,25,23.81,22.62],
            backgroundColor: '#6cab44' // verde
        },
        {
            label: 'Capacitación',
            data: [15,15,15,15,15,15,15,15,14.82,14.29,15,15],
            backgroundColor: '#f07c2b' // naranja
        },
        {
            label: 'Medio Ambiente',
            data: [10,10,10,10,10,10,10,10,10,10,10,10],
            backgroundColor: '#bdbdbd' // gris
        }
    ]
};

var optionsChart8 = {
    indexAxis: 'y', 

    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            position: 'bottom'
        },
        datalabels: {
            color: '#fff',
            formatter: function(value) {
                return value > 0 ? value.toFixed(2) + '%' : '';
            }
        }
    },

    scales: {
        x: {
            stacked: true,
            max: 100,
            ticks: {
                callback: function(value) {
                    return value + '%';
                }
            }
        },
        y: {
            stacked: true
        }
    }
};

var dataChart9 = {
    labels: ["CON GDL","CON MTY","CON MXL 1","MOLINO"],
    datasets: [
        {
            label: 'Seguridad',
            data: [49.17,48.63,48.83,48.43],
            backgroundColor: '#6b3f0b' // café
        },
        {
            label: 'O&L',
            data: [24.70,24.66,20.89,21.15],
            backgroundColor: '#6cab44' // verde
        },
        {
            label: 'Capacitación',
            data: [14.93,15.00,14.97,14.89],
            backgroundColor: '#f07c2b' // naranja
        },
        {
            label: 'Medio Ambiente',
            data: [10.00,9.36,9.89,9.87],
            backgroundColor: '#9e9e9e' // gris
        }
    ]
};

var optionsChart9 = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            position: 'bottom'
        },
        datalabels: {
            color: '#fff',
            font: {
                weight: 'bold',
                size: 11
            },
            formatter: function(value) {
                return value.toFixed(2) + '%';
            }
        }
    },

    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true,
            max: 100,
            ticks: {
                callback: function(value) {
                    return value + '%';
                }
            }
        }
    }
};