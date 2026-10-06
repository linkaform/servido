//------Diseño de reporte
let dicReportContext = [
    // PRIMERA FILA: 3 Cards
    {
        class: 'cards-row',
        _children: [
            { type: 'card', col: '4', id: 'statsOrdersContainer', title: 'Órdenes de Servicio' },
            { type: 'card', col: '4', id: 'statsIgualaContainer', title: 'UDS Iguala' },
            { type: 'card', col: '4', id: 'statsStatusContainer', title: 'Status OS' },
        ]
    },
    // SEGUNDA FILA: 3 Gráficas correspondientes
    {
        class: 'charts-row',
        _children: [
            { type: 'chart', col: '4', id: 'chartFirst', title: 'Pending Tickets By Category' },
            { type: 'chart', col: '4', id: 'chartSecond', title: '% Progress Tickets Solved' },
            { type: 'chart', col: '4', id: 'chartThird', title: 'Pending Tickets By Action' },
        ]
    },
    // TERCERA FILA: 3 Cards más
    {
        class: 'cards-row',
        _children: [
            { type: 'card', col: '4', id: 'statsTypeContainer', title: 'UDS por tipo de Mantto' },
            { type: 'card', col: '4', id: 'statsEstadosContainer', title: 'UDS por Estado' },
            { type: 'card', col: '4', id: 'statsMueblesContainer', title: 'UDS por Tipo de Mueble' },
        ]
    },
    // CUARTA FILA: 2 Gráficas + 1 Tabla
    {
        class: 'charts-row',
        _children: [
            { type: 'chart', col: '4', id: 'chartFourth', title: 'Pending Tickets By Category' },
            { type: 'table', col: '4', id: 'tableFirst', title: 'Pending Tickets By Town', buttonCustom: true },
            { type: 'chart', col: '4', id: 'chartFifth', title: 'Pending Tickets By Category' },
        ]
    },
    // QUINTA FILA: 1 Card + espacios vacíos
    {
        class: 'cards-row',
        _children: [
            { type: 'card', col: '4', id: 'statsCanalContainer', title: 'UDS por Canal' },
            { type: 'empty', col: '4', id: 'emptySpace1' },
            { type: 'empty', col: '4', id: 'emptySpace2' },
        ]
    },
    // SEXTA FILA: 1 Gráfica + espacios vacíos
    {
        class: 'charts-row',
        _children: [
            { type: 'chart', col: '4', id: 'chartSixth', title: 'Pending Tickets By Account' },
            { type: 'empty', col: '4', id: 'emptySpace3' },
            { type: 'empty', col: '4', id: 'emptySpace4' },
        ]
    },
];


//-----Configuiraciónes de las graficas
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
                    return `Tickets Resueltos: ${tooltipItem.raw}%`;
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
    labels: ['Tickets Resueltos', 'Pendientes'],
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
                    return context.label + ': ' + context.parsed + '%';
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
        'Liverpool',
        'Telcel',
        'Coppel',
        'AT&T',
        'Sears',
        'Sanborns',
        'Office Depot',
        'COTSCO'
    ],
    datasets: [
        {
            label: 'Visitas',
            data: [121, 86, 36, 34, 23, 18, 13, 12],
            fill: false,
            backgroundColor: '#007bff',
            borderColor: '#0056b3',
            borderWidth: 1
        },
    ]
};

let columsTable1 = [
    { title: "#", field: "id", headerTooltip: true, hozAlign: "center", width: 65 },
    { title: "Town", field: "type", headerTooltip: true, hozAlign: "left", width: 250 },
    {
        title: "Pending Tickets",
        field: "qty",
        headerTooltip: true,
        hozAlign: "center",
        width: 100,
        formatter: function (cell, formatterParams, onRendered) {
            const value = cell.getValue();
            const maxValue = 20; // Valor máximo de tu dataset
            const minValue = 10; // Valor mínimo de tu dataset

            // Calcular la intensidad del color basándose en el valor
            const intensity = (value - minValue) / (maxValue - minValue);

            // SUAVIZADO: Colores más suaves y menos intensos
            const red = Math.floor(240 + (15 * intensity)); // De 240 a 255 (menos rojo)
            const green = Math.floor(200 - (80 * intensity)); // De 200 a 120 (más suave)
            const blue = Math.floor(200 - (80 * intensity)); // De 200 a 120 (más suave)

            const backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            const textColor = '#000000';

            onRendered(function () {
                cell.getElement().style.backgroundColor = backgroundColor;
                cell.getElement().style.color = textColor;
                cell.getElement().style.fontWeight = 'light';
                cell.getElement().style.borderRadius = '4px';
                cell.getElement().style.padding = '8px';
            });

            return value;
        }
    },
];

const dataTable1 = [
    { id: 1, type: "GUADALAJARA", qty: 19 },
    { id: 2, type: "PUEBLA", qty: 18 },
    { id: 3, type: "MONTERREY", qty: 17 },
    { id: 4, type: "NAUCALPAN DE JUAREZ", qty: 16 },
    { id: 5, type: "CIUDAD DE MEXICO", qty: 15 },
    { id: 6, type: "QUERETARO", qty: 14 },
    { id: 7, type: "MERIDA", qty: 13 },
    { id: 8, type: "TOLUCA", qty: 12 },
    { id: 9, type: "CANCUN", qty: 11 },
    { id: 10, type: "LEON", qty: 10 },
    { id: 11, type: "CHIHUAHUA", qty: 9 },
    { id: 12, type: "TIJUANA", qty: 8 },
    { id: 13, type: "MONCLOVA", qty: 7 },
    { id: 14, type: "SAN LUIS POTOSI", qty: 6 },
    { id: 15, type: "VERACRUZ", qty: 5 },
    { id: 16, type: "AGUASCALIENTES", qty: 4 },
    { id: 17, type: "HERMOSILLO", qty: 3 },
    { id: 18, type: "OAXACA", qty: 2 },
    { id: 19, type: "MORELIA", qty: 1 },
];

let columsTable2 = [
    { title: "Tipo", field: "type", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 250 },
    { title: "Cantidad", field: "qty", headerTooltip: true, hozAlign: "center", width: 100 },
];

const dataTable2 = [
    { type: "Iguala", qty: 20 },
    { type: "Asignadas", qty: 30 },
    { type: "Pendientes", qty: 40 },
    { type: "Adelantadas", qty: 50 },
];

let columsTable3 = [
    { title: "Tipo", field: "type", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 250 },
    { title: "Cantidad", field: "qty", headerTooltip: true, hozAlign: "center", width: 100 },
];

const dataTable3 = [
    { type: "Generadas", qty: 20 },
    { type: "Viabilidad", qty: 30 },
    { type: "Levantamiento", qty: 40 },
    { type: "Autorizacion SEM", qty: 50 },
    { type: "Ejecucion", qty: 60 },
    { type: "Terminadas", qty: 70 },
];

let columsTable4 = [
    { title: "Tipo", field: "type", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 250 },
    { title: "Cantidad", field: "qty", headerTooltip: true, hozAlign: "center", width: 100 },
];

const dataTable4 = [
    { type: "Mini", qty: 20 },
    { type: "Bajo", qty: 30 },
    { type: "Medio", qty: 40 },
    { type: "Alto", qty: 50 },
];

let columsTable5 = [
    { title: "Tipo", field: "type", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 250 },
    { title: "Cantidad", field: "qty", headerTooltip: true, hozAlign: "center", width: 100 },
];

const dataTable5 = [
    { type: "CDMX", qty: 20 },
    { type: "Edo. Mex.", qty: 30 },
    { type: "Queretaro", qty: 40 },
    { type: "Puebla", qty: 50 },
    { type: "Monterrey", qty: 60 },
    { type: "Guadalajara", qty: 70 },
    { type: "Merida", qty: 80 },
];

let columsTable6 = [
    { title: "Tipo", field: "type", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 250 },
    { title: "Cantidad", field: "qty", headerTooltip: true, hozAlign: "center", width: 100 },
];

const dataTable6 = [
    { type: "Counter", qty: 20 },
    { type: "Mesa", qty: 30 },
    { type: "Muros", qty: 40 },
    { type: "Iluminacion", qty: 50 },
];

let columsTable7 = [
    { title: "Tipo", field: "type", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 250 },
    { title: "Cantidad", field: "qty", headerTooltip: true, hozAlign: "center", width: 100 },
];

const dataTable7 = [
    { type: "SES", qty: 20 },
    { type: "Telcel", qty: 30 },
    { type: "Liverpool", qty: 40 },
    { type: "Sears", qty: 50 },
];

// let configTableCustom3 = {
//     height: "900px",
//     layout: "fitData",
//     theme: "bootstrap5",
//     columnMinWidth: 100,
//     scrollX: true,
// };