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

let columnsTable1 = [
    {
        title: "Área",
        field: "area",
        hozAlign: "left",
        widthGrow: 2,
        cssClass: "col-area",
        tooltip: true,
        width: 180,
    },
    {
        title: "🛡️<br>Seguridad<br>(50)",
        field: "seguridad",
        hozAlign: "center",
        formatter: "money",
        formatterParams:{
            precision:2,
            symbol:""
        },
        tooltip: true,
        width: 150,
    },
    {
        title: "🧹<br>Orden y limpieza<br>(25)",
        field: "orden_limpieza",
        hozAlign: "center",
        formatter: "money",
        formatterParams:{
            precision:2,
            symbol:""
        },
        tooltip: true,
        width: 150,
    },
    {
        title: "🎓<br>Capacitación<br>(15)",
        field: "capacitacion",
        hozAlign: "center",
        formatter: "money",
        formatterParams:{
            precision:2,
            symbol:""
        },
        tooltip: true,
        width: 150,
    },
    {
        title: "🍃<br>Medio ambiente<br>(10)",
        field: "medio_ambiente",
        hozAlign: "center",
        formatter: "money",
        formatterParams:{
            precision:2,
            symbol:""
        },
        tooltip: true,
        width: 150,
    },
    {
        title: "Resultado<br>mensual",
        field: "resultado",
        hozAlign: "center",
        formatter: "money",
        formatterParams:{
            precision:2,
            symbol:""
        },
        tooltip: true,
        width: 150,
        cssClass: "col-total"
    }
];

let configTable1 = {
    layout: "fitColumns",
    responsiveLayout: false,
    movableColumns: false,
    resizableColumns: false,
    selectable: false,

    rowFormatter:function(row){

        const data = row.getData();

        if(data.rowType === "total"){
            row.getElement().classList.add("row-total");
        }
    }
};

let dataTable1 = [
    {
        area: "Producción",
        seguridad: 48.00,
        orden_limpieza: 24.00,
        capacitacion: 14.50,
        medio_ambiente: 10.00,
        resultado: 96.50
    },
    {
        area: "Mantenimiento",
        seguridad: 50.00,
        orden_limpieza: 25.00,
        capacitacion: 15.00,
        medio_ambiente: 10.00,
        resultado: 100.00
    },
    {
        area: "Calidad",
        seguridad: 49.00,
        orden_limpieza: 24.50,
        capacitacion: 14.80,
        medio_ambiente: 9.80,
        resultado: 98.10
    },
    {
        area: "Logística",
        seguridad: 47.50,
        orden_limpieza: 23.00,
        capacitacion: 14.20,
        medio_ambiente: 10.00,
        resultado: 94.70
    },
    {
        area: "Administración",
        seguridad: 50.00,
        orden_limpieza: 25.00,
        capacitacion: 15.00,
        medio_ambiente: 10.00,
        resultado: 100.00
    },
    {
        area: "Total por indicador",
        seguridad: 244.50,
        orden_limpieza: 121.50,
        capacitacion: 73.50,
        medio_ambiente: 49.80,
        resultado: 489.30,
        rowType: "total"
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
            data: [72, 70, 74, 77, 79, 78, 75, 74, 76, 77, 75, 77],
            backgroundColor: '#f07c2b',
            borderColor: '#f07c2b',
            borderWidth: 1,
            tension: 0.45,
        },
        {
            label: 'NO INCAP',
            data: [76, 74, 78, 80, 82, 84, null, null, null, null, null, null],
            backgroundColor: '#6cab44',
            borderColor: '#6cab44',
            borderWidth: 1,
            tension: 0.45,
        }
    ]
};
var optionsChart1 = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        // Leyenda personalizada (abajo, centrada)
        legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 24,
            font: {
                size: 11,
                family: "'Segoe UI', Arial, sans-serif",
            },
            color: '#555555',
            generateLabels(chart) {
                return chart.data.datasets.map((ds, i) => ({
                    text: ds.label,
                    fillStyle: ds.borderColor,
                    strokeStyle: ds.borderColor,
                    lineWidth: 0,
                    pointStyle: 'circle',
                    datasetIndex: i,
                    fontColor: ds.borderColor,  // color del texto = color de la línea
                }));
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(255,255,255,0.95)',
            titleColor: '#333',
            bodyColor: '#555',
            borderColor: '#ddd',
            borderWidth: 1,
            padding: 10,
            callbacks: {
                label(ctx) {
                    return ` ${ctx.dataset.label}: ${ctx.parsed.y}`;
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: '#cccccc',
                lineWidth: 0.8,
                borderDash: [4, 4],           // cuadrícula punteada
            },
            border: {
                display: false,
            },
            ticks: {
                display: false,               // ocultar etiquetas del eje X (igual que la imagen)
            }
        },
        y: {
            grid: {
                color: '#cccccc',
                lineWidth: 0.8,
                borderDash: [4, 4],           // cuadrícula punteada
            },
            border: {
                display: false,
            },
            ticks: {
                display: false,               // ocultar etiquetas del eje Y (igual que la imagen)
            },
            min: 60,
            max: 95,
        }
    },
    layout: {
        padding: {
            top: 8,
            right: 8,
            bottom: 0,
            left: 8,
        }
    }
}


var dataChart2 = {
    labels: [
        'Servilleta-T04',
        'Recursos humanos',
        'Materiales',
        'Mantenimiento eléctrico',
        'Mantenimiento automotriz',
        'Calidad',
        'Higiene B',
        'Almacén',
        'Mantenimiento mecánico',
        'Higiene',
        'Edificio'
    ],
    datasets: [
        {
            label: 'Seguridad',
            data: [50, 50, 50, 49, 50, 49, 47, 46, 43, 43, 35],
            backgroundColor: '#A86D3A'
        },
        {
            label: 'Orden y limpieza',
            data: [25, 25, 24.5, 25, 24, 24.5, 23, 22, 21, 20, 18],
            backgroundColor: '#C8C8C8'
        },
        {
            label: 'Capacitación',
            data: [15, 14.7, 15, 15, 14.7, 14, 13.5, 13, 12, 11, 10],
            backgroundColor: '#F48A06'
        },
        {
            label: 'Medio ambiente',
            data: [10, 10, 10, 10, 10, 9.5, 9, 8.5, 8, 8, 7],
            backgroundColor: '#67C23A'
        }
    ]
};

var optionsChart2 = {
    indexAxis: 'y',

    responsive: true,
    maintainAspectRatio: false,

    plugins: {

        legend: {
            position: 'top',
            align: 'start'
        },

        tooltip: {
            callbacks: {
                label: function(context){
                    return context.dataset.label + ': ' +
                           context.raw.toFixed(2) + '%';
                }
            }
        },

        datalabels: {
            color: '#fff',
            anchor: 'center',
            align: 'center',
            font: {
                size: 10
            },
            formatter: function(value){
                return value >= 8
                    ? value.toFixed(2) + '%'
                    : '';
            }
        }
    },

    scales: {

        x: {
            stacked: true,
            min: 0,
            max: 100,
            display: false
        },

        y: {
            stacked: true,
            grid: {
                display: false
            }
        }
    },

    elements: {
        bar: {
            borderRadius: 4
        }
    }
};


var dataChart3 = {
    labels: [
        "CON MXL",
        "CON GDL",
        "MOLINO",
        "CON MTY"
    ],
    datasets: [
        {
            label: 'Seguridad',
            data: [50,50,50,50],
            backgroundColor: '#A9713A'
        },
        {
            label: 'Orden y limpieza',
            data: [25,25,25,25],
            backgroundColor: '#BEBEBE'
        },
        {
            label: 'Capacitación',
            data: [15,15,15,15],
            backgroundColor: '#FF9200'
        },
        {
            label: 'Medio ambiente',
            data: [10,10,10,10],
            backgroundColor: '#6DBB2D'
        }
    ]
};

var optionsChart3 = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {

        legend: {
            display: true,
            position: 'top',
            align: 'start'
        },

        datalabels: {
            color: '#FFF',
            font: {
                size: 11,
                weight: 'bold'
            },
            formatter: function(value) {
                return value + '%';
            }
        }

    },

    scales: {

        x: {
            stacked: true,
            grid: {
                display: false
            }
        },

        y: {
            stacked: true,
            min: 0,
            max: 100,
            ticks: {
                callback: function(value) {
                    return value + '%';
                }
            }
        }

    }
};

var dataChart4 = {
    labels: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
    datasets: [
        {
            label: 'Incapacitantes',
            data: [2, 1, 3, 1, 0, 2, 1, 0, 1, 2, 1, 1],
            backgroundColor: '#7B4F2E',
            borderColor: '#7B4F2E',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.45,
            fill: false,
        },
        {
            label: 'No Incapacitantes',
            data: [5, 3, 4, 2, 1, 3, 2, 4, 2, 3, 1, 2],
            backgroundColor: '#C8854A',
            borderColor: '#C8854A',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.45,
            fill: false,
        }
    ]
};

var optionsChart4 = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 24,
                font: {
                    size: 11,
                    family: "'Segoe UI', Arial, sans-serif",
                },
                generateLabels(chart) {
                    return chart.data.datasets.map((ds, i) => ({
                        text: ds.label,
                        fillStyle: ds.borderColor,
                        strokeStyle: ds.borderColor,
                        lineWidth: 0,
                        pointStyle: 'circle',
                        datasetIndex: i,
                        fontColor: ds.borderColor,
                    }));
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(255,255,255,0.95)',
            titleColor: '#333',
            bodyColor: '#555',
            borderColor: '#ddd',
            borderWidth: 1,
            padding: 10,
            callbacks: {
                label(ctx) {
                    return ` ${ctx.dataset.label}: ${ctx.parsed.y}`;
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: '#eeeeee',
                lineWidth: 0.8,
            },
            border: { display: false },
            ticks: {
                font: { size: 11, family: "'Segoe UI', Arial, sans-serif" },
                color: '#888',
            }
        },
        y: {
            grid: {
                color: '#eeeeee',
                lineWidth: 0.8,
            },
            border: { display: false },
            ticks: {
                stepSize: 2,
                font: { size: 11, family: "'Segoe UI', Arial, sans-serif" },
                color: '#888',
            },
            min: 0,
            max: 8,
        }
    },
    layout: {
        padding: { top: 8, right: 8, bottom: 0, left: 8 }
    }
};

var dataChart5A = {
    labels: ["Ene","Feb","Mar","Abr","May"],
    datasets: [
        {
            label: 'Guadalajara',
            data: [4, 3, 5, 2, 3],
            backgroundColor: '#5C3317',
            borderColor: '#5C3317',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.45,
            fill: false,
        },
        {
            label: 'Mexicali',
            data: [3, 2, 4, 1, 1],
            backgroundColor: '#8B5E3C',
            borderColor: '#8B5E3C',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.45,
            fill: false,
        },
        {
            label: 'Monterrey',
            data: [2, 1, 3, 1, 0],
            backgroundColor: '#C8854A',
            borderColor: '#C8854A',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.45,
            fill: false,
        },
        {
            label: 'Molino',
            data: [3, 2, 3, 2, 1],
            backgroundColor: '#D4A96A',
            borderColor: '#D4A96A',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.45,
            fill: false,
        }
    ]
};

var optionsChart5A = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 24,
                font: {
                    size: 11,
                    family: "'Segoe UI', Arial, sans-serif",
                },
                generateLabels(chart) {
                    return chart.data.datasets.map((ds, i) => ({
                        text: ds.label,
                        fillStyle: ds.borderColor,
                        strokeStyle: ds.borderColor,
                        lineWidth: 0,
                        pointStyle: 'circle',
                        datasetIndex: i,
                        fontColor: ds.borderColor,
                    }));
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(255,255,255,0.95)',
            titleColor: '#333',
            bodyColor: '#555',
            borderColor: '#ddd',
            borderWidth: 1,
            padding: 10,
            callbacks: {
                label(ctx) {
                    return ` ${ctx.dataset.label}: ${ctx.parsed.y}`;
                }
            }
        }
    },
    scales: {
        x: {
            grid: { color: '#eeeeee', lineWidth: 0.8 },
            border: { display: false },
            ticks: {
                font: { size: 11, family: "'Segoe UI', Arial, sans-serif" },
                color: '#888',
            }
        },
        y: {
            grid: { color: '#eeeeee', lineWidth: 0.8 },
            border: { display: false },
            ticks: {
                stepSize: 2,
                font: { size: 11, family: "'Segoe UI', Arial, sans-serif" },
                color: '#888',
            },
            min: 0,
            max: 8,
        }
    },
    layout: {
        padding: { top: 8, right: 8, bottom: 0, left: 8 }
    }
};

var dataChart5B = {
    labels: ["Conv. Guadalajara", "Conv. Mexicali", "Conv. Monterrey", "Molino"],
    datasets: [
        {
            label: 'Incapacitantes',
            data: [3, 5, 2, 4],
            backgroundColor: '#7B4F2E',
            borderColor: '#7B4F2E',
            borderWidth: 0,
        },
        {
            label: 'No Incapacitantes',
            data: [11, 17, 8, 14],
            backgroundColor: '#C8854A',
            borderColor: '#C8854A',
            borderWidth: 0,
        }
    ]
};

var optionsChart5B = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                padding: 24,
                font: {
                    size: 11,
                    family: "'Segoe UI', Arial, sans-serif",
                },
                generateLabels(chart) {
                    return chart.data.datasets.map((ds, i) => ({
                        text: ds.label,
                        fillStyle: ds.backgroundColor,
                        strokeStyle: ds.backgroundColor,
                        lineWidth: 0,
                        pointStyle: 'rect',
                        datasetIndex: i,
                        fontColor: '#555555',
                    }));
                }
            }
        },
        datalabels: {
            display: true,
            color: '#ffffff',
            font: {
                size: 12,
                weight: '700',
                family: "'Segoe UI', Arial, sans-serif",
            },
            formatter: (value) => value,
            anchor: 'center',
            align: 'center',
        },
        tooltip: {
            backgroundColor: 'rgba(255,255,255,0.95)',
            titleColor: '#333',
            bodyColor: '#555',
            borderColor: '#ddd',
            borderWidth: 1,
            padding: 10,
            callbacks: {
                label(ctx) {
                    return ` ${ctx.dataset.label}: ${ctx.parsed.y}`;
                }
            }
        }
    },
    scales: {
        x: {
            stacked: true,
            grid: { display: false },
            border: { display: false },
            ticks: {
                font: { size: 11, family: "'Segoe UI', Arial, sans-serif" },
                color: '#888',
            }
        },
        y: {
            stacked: true,
            grid: {
                color: '#eeeeee',
                lineWidth: 0.8,
            },
            border: { display: false },
            ticks: {
                stepSize: 5,
                font: { size: 11, family: "'Segoe UI', Arial, sans-serif" },
                color: '#888',
            },
            min: 0,
            max: 20,
        }
    },
    layout: {
        padding: { top: 8, right: 8, bottom: 0, left: 8 }
    }
};

var dataChart6 = {
    labels: [
        "#1  Materiales",
        "#2  RH",
        "#3  Servilleta",
        "#4  Calidad",
        "#5  Mant. Eléctrico",
        "#6  Higiene B",
        "#7  Almacén",
        "#8  Mant. Mecánico",
        "#9  Higiene",
        "#10 Mant. Auto",
        "#11 Edificio"
    ],
    datasets: [
        {
            label: 'Entrevistas de Seguridad',
            data: [5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 3],
            backgroundColor: '#4A2C0A',
            borderColor: '#4A2C0A',
            borderWidth: 0,
            borderRadius: 2,
        },
        {
            label: 'Observaciones de condiciones inseguras',
            data: [5, 5, 5, 5, 5, 4, 4, 4, 4, 3, 3],
            backgroundColor: '#7B4F2E',
            borderColor: '#7B4F2E',
            borderWidth: 0,
            borderRadius: 2,
        },
        {
            label: 'Comisión de seguridad',
            data: [10, 10, 10, 10, 10, 10, 9, 9, 9, 8, 7],
            backgroundColor: '#A67850',
            borderColor: '#A67850',
            borderWidth: 0,
            borderRadius: 2,
        },
        {
            label: 'Mejora de área',
            data: [10, 10, 10, 9, 10, 9, 10, 9, 8, 8, 7],
            backgroundColor: '#C8954A',
            borderColor: '#C8954A',
            borderWidth: 0,
            borderRadius: 2,
        },
        {
            label: 'Seguridad basada en conductas',
            data: [20, 20, 20, 20, 19, 19, 18, 17, 18, 16, 15],
            backgroundColor: '#E8C99A',
            borderColor: '#E8C99A',
            borderWidth: 0,
            borderRadius: 2,
        }
    ]
};

var optionsChart6 = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 16,
                font: {
                    size: 10,
                    family: "'Segoe UI', Arial, sans-serif",
                },
                color: '#555555',
                generateLabels(chart) {
                    return chart.data.datasets.map((ds, i) => ({
                        text: ds.label,
                        fillStyle: ds.backgroundColor,
                        strokeStyle: ds.backgroundColor,
                        lineWidth: 0,
                        pointStyle: 'circle',
                        datasetIndex: i,
                        fontColor: '#555555',
                    }));
                }
            }
        },
        datalabels: {
            display: true,
            color: '#ffffff',
            font: {
                size: 10,
                weight: '700',
                family: "'Segoe UI', Arial, sans-serif",
            },
            formatter: (value) => value > 0 ? value : '',
            anchor: 'center',
            align: 'center',
        },
        tooltip: {
            backgroundColor: 'rgba(255,255,255,0.95)',
            titleColor: '#333',
            bodyColor: '#555',
            borderColor: '#ddd',
            borderWidth: 1,
            padding: 10,
            callbacks: {
                label(ctx) {
                    return ` ${ctx.dataset.label}: ${ctx.parsed.x}`;
                }
            }
        }
    },
    scales: {
        x: {
            stacked: true,
            display: false,
            max: 50,
        },
        y: {
            stacked: true,
            grid: { display: false },
            border: { display: false },
            ticks: {
                font: { size: 11, family: "'Segoe UI', Arial, sans-serif" },
                color: '#333',
            }
        }
    },
    layout: {
        padding: { top: 0, right: 60, bottom: 0, left: 8 }
    }
};

var dataChart7 = {
    labels: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
    datasets: [
        {
            label: 'Año 2025',
            data: [88, 89, 90, 91, 91, 92, 92, 92, 93, 93, 93, 93],
            backgroundColor: '#888888',
            borderColor: '#888888',
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            tension: 0.3,
            fill: false,
        },
        {
            label: 'Año 2026',
            data: [91, 92, 92, 93, 93, 93, 93, 93, 93, 93, 93, 93],
            backgroundColor: '#bbbbbb',
            borderColor: '#bbbbbb',
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            tension: 0.3,
            fill: false,
            borderDash: [5, 4],
        }
    ]
};

var dataChart8 = {
    labels: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
    datasets: [
        {
            label: 'Año 2025',
            data: [30, 95, 45, 55, 50, 50, 50, 50, 50, 50, 50, 50],
            backgroundColor: '#F5A623',
            borderColor: '#F5A623',
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            tension: 0.3,
            fill: false,
        },
        {
            label: 'Año 2026',
            data: [35, 45, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            backgroundColor: '#F5C96A',
            borderColor: '#F5C96A',
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            tension: 0.3,
            fill: false,
            borderDash: [5, 4],
        }
    ]
};

var dataChart9 = {
    labels: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
    datasets: [
        {
            label: 'Año 2025',
            data: [78, 80, 82, 84, 85, 83, 82, 82, 83, 83, 82, 80],
            backgroundColor: '#4CAF50',
            borderColor: '#4CAF50',
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            tension: 0.3,
            fill: false,
        },
        {
            label: 'Año 2026',
            data: [75, 76, 77, 78, 76, 75, 74, 74, 74, 74, 74, 73],
            backgroundColor: '#90D993',
            borderColor: '#90D993',
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            tension: 0.3,
            fill: false,
            borderDash: [5, 4],
        }
    ]
};

function getOptionsComplianceTrend(minVal, maxVal) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                align: 'center',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20,
                    font: {
                        size: 10,
                        family: "'Segoe UI', Arial, sans-serif",
                    },
                    color: '#555555',
                    generateLabels(chart) {
                        return chart.data.datasets.map((ds, i) => ({
                            text: ds.label,
                            fillStyle: ds.borderColor,
                            strokeStyle: ds.borderColor,
                            lineWidth: 0,
                            pointStyle: 'circle',
                            datasetIndex: i,
                            fontColor: ds.borderColor,
                        }));
                    }
                }
            },
            datalabels: { display: false },
            tooltip: {
                backgroundColor: 'rgba(255,255,255,0.95)',
                titleColor: '#333',
                bodyColor: '#555',
                borderColor: '#ddd',
                borderWidth: 1,
                padding: 10,
                callbacks: {
                    label(ctx) {
                        return ` ${ctx.dataset.label}: ${ctx.parsed.y}%`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: '#e0e0e0',
                    lineWidth: 0.8,
                    borderDash: [3, 3],
                },
                border: { display: false },
                ticks: {
                    font: { size: 10, family: "'Segoe UI', Arial, sans-serif" },
                    color: '#aaa',
                }
            },
            y: {
                grid: {
                    color: '#e0e0e0',
                    lineWidth: 0.8,
                    borderDash: [3, 3],
                },
                border: { display: false },
                ticks: {
                    font: { size: 10, family: "'Segoe UI', Arial, sans-serif" },
                    color: '#aaa',
                    callback: (val) => val + '%',
                },
                min: minVal,
                max: maxVal,
            }
        },
        layout: {
            padding: { top: 8, right: 16, bottom: 0, left: 8 }
        }
    };
}

// Uso individual por gráfica:
let optionsChart7 = getOptionsComplianceTrend(85, 100);
let optionsChart8 = getOptionsComplianceTrend(20, 100);
let optionsChart9 = getOptionsComplianceTrend(60, 90);