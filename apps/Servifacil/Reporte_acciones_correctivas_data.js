//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'chart', col: '12', id:'chartFirst', title:'Acciones Correctivas por Estación'},
            { type:'chart', col: '6', id:'chartSecond', title:'Acciones Correctivas por Estatus'},
            { type:'chart', col: '6', id:'chartThird', title:'Porcentaje de cumplimiento'},
            { type:'table', col: '12', id:'tableFirst', title:'Cumplimiento de acciones correctivas'},
    ]},
];

let columsTable1 = [
    { 
        title: "Folio", 
        field: 'folio', 
        headerTooltip: true, 
        headerFilter:"input", 
        hozAlign: "left", 
        width: 200,
        formatter: function(cell, formatterParams, onRendered) {
            const folio = cell.getValue();
            const rowData = cell.getRow().getData();
            const recordId = rowData._id;
            
            if (recordId) {
                return `<a href="https://app.linkaform.com/#/records/detail/${recordId}" 
                           target="_blank" 
                           style="color: #007bff; text-decoration: underline; cursor: pointer;">
                           ${folio}
                        </a>`;
            } else {
                return folio;
            }
        }
    },
    { title: "Estación de Servicio", field: 'estacion', headerTooltip: true, headerFilter:"input", hozAlign: "left", width: 200},
    { title: "Acción Correctiva", field: 'accion', headerTooltip: true,  hozAlign: "left", width: 450},
    { title: "Días para cumplimiento", field: 'cumplimiento', headerTooltip: true,  hozAlign: "right", width: 130},
    { title: "Fecha Inicio", field: 'fecha_inicio', headerTooltip: true,  hozAlign: "left", width: 200},
    { title: "Fecha Limite", field: 'fecha_limite', headerTooltip: true,  hozAlign: "left", width: 200},
    { 
        title: "Días para Vencimiento", 
        field: 'dia_vencimiento', 
        headerTooltip: true,  
        hozAlign: "center", 
        width: 150,
        formatter: function(cell, formatterParams, onRendered) {
            const value = cell.getValue();
            
            if (value === null || value === undefined) {
                return '<span style="color: #999; font-style: italic;">Sin fecha</span>';
            }
            
            let backgroundColor = '';
            let textColor = 'white';
            let icon = '';
            let text = value;

            if (cell.getRow().getData().ultima_accion == 'Validada') {
                backgroundColor = '#28a745';
                icon = '✅';
                text = `Acción Realizada`;
            } else if (value < 0) {
                backgroundColor = '#dc3545';
                icon = '🔴';
                text = `${Math.abs(value)} días retrasado`;
            } else if (value === 0) {
                backgroundColor = '#ffc107';
                textColor = 'black';
                icon = '⚠️';
                text = 'Último día';
            } else if (value <= 3) {
                backgroundColor = '#fd7e14';
                icon = '🟡';
                text = `${value} días restantes`;
            } else {
                backgroundColor = '#28a745';
                icon = '🟢';
                text = `${value} días restantes`;
            }
            
            return `
                <div style="
                    background-color: ${backgroundColor}; 
                    color: ${textColor}; 
                    font-weight: bold; 
                    padding: 6px 10px; 
                    border-radius: 6px; 
                    text-align: center;
                    font-size: 12px;
                    line-height: 1.2;
                ">
                    <div>${icon}</div>
                    <div>${text}</div>
                </div>
            `;
        }
    },
    { title: "Estatus", field: 'ultima_accion', headerTooltip: true,  hozAlign: "left", width: 100},
];

let dataTable1 = [
  {
    folio: "AC-1001",
    estacion: "ES Toluca 01",
    accion: "Revisión tanque",
    cumplimiento: 5,
    fecha_inicio: "2025-06-20",
    fecha_limite: "2025-06-25",
    dia_vencimiento: 2,
    ultima_accion: "En revisión"
  },
  {
    folio: "AC-1002",
    estacion: "ES Lerma 02",
    accion: "Cambio válvula",
    cumplimiento: 10,
    fecha_inicio: "2025-06-15",
    fecha_limite: "2025-06-25",
    dia_vencimiento: 2,
    ultima_accion: "Validación"
  },
  {
    folio: "AC-1003",
    estacion: "ES Metepec 03",
    accion: "Revisión extintor",
    cumplimiento: 3,
    fecha_inicio: "2025-06-22",
    fecha_limite: "2025-06-25",
    dia_vencimiento: 2,
    ultima_accion: "Reprogramada"
  },
  {
    folio: "AC-1004",
    estacion: "ES Zinacantepec 04",
    accion: "Cambio de señalética",
    cumplimiento: 7,
    fecha_inicio: "2025-06-18",
    fecha_limite: "2025-06-25",
    dia_vencimiento: 2,
    ultima_accion: "Finalizada"
  },
  {
    folio: "AC-1005",
    estacion: "ES Temoaya 05",
    accion: "Ajuste presión",
    cumplimiento: 2,
    fecha_inicio: "2025-06-23",
    fecha_limite: "2025-06-25",
    dia_vencimiento: 2,
    ultima_accion: "En curso"
  },
  {
    folio: "AC-1006",
    estacion: "ES Almoloya 06",
    accion: "Inspección rutina",
    cumplimiento: 4,
    fecha_inicio: "2025-06-21",
    fecha_limite: "2025-06-25",
    dia_vencimiento: 2,
    ultima_accion: "Documentada"
  },
  {
    folio: "AC-1007",
    estacion: "ES Xonacatlán 07",
    accion: "Reemplazo lámpara",
    cumplimiento: 8,
    fecha_inicio: "2025-06-17",
    fecha_limite: "2025-06-25",
    dia_vencimiento: 2,
    ultima_accion: "Pendiente"
  },
  {
    folio: "AC-1008",
    estacion: "ES Otzolotepec 08",
    accion: "Actualización bitácora",
    cumplimiento: 6,
    fecha_inicio: "2025-06-19",
    fecha_limite: "2025-06-25",
    dia_vencimiento: 2,
    ultima_accion: "Observada"
  },
  {
    folio: "AC-1009",
    estacion: "ES Capultitlán 09",
    accion: "Revisión eléctrica",
    cumplimiento: 9,
    fecha_inicio: "2025-06-16",
    fecha_limite: "2025-06-25",
    dia_vencimiento: 2,
    ultima_accion: "Aprobada"
  },
  {
    folio: "AC-1010",
    estacion: "ES Cacalomacán 10",
    accion: "Instalación sensor",
    cumplimiento: 1,
    fecha_inicio: "2025-06-24",
    fecha_limite: "2025-06-25",
    dia_vencimiento: 2,
    ultima_accion: "Iniciada"
  }
];









//---Chart First
var setOptions1A = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        datalabels: {
            color: 'white',
            font: {
                size: 19
            },
        },
        tooltip: {
            titleFont: { size: 20 }, 
            bodyFont: { size: 17 }, 
            callbacks: {
                label: function (tooltipItem) {
                    const datasetLabel = tooltipItem.dataset.label || '';
                    const value = tooltipItem.raw;
                    
                    return `${datasetLabel}: ${value}`;
                }
            }
        }
    },
    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true
        }
    }
};



var dataChart1A = {
    labels: ['Estación 1','Estación 2','Estación 3','Estación 4','Estación 5','Estación 6'],
    datasets: [
        {
            label: '1. Área de tanques',
            data: [73, 27, 45, 38, 52, 61],
            backgroundColor: [], 
        },
        {
            label: '2. Área de despacho',
            data: [98, 17, 55, 40, 66, 59],
            backgroundColor: [], 
        },
        {
            label: '3. Sanitarios clientes',
            data: [91, 12, 94, 50, 43, 71],
            backgroundColor: [], 
        },
        {
            label: '4. Facturación',
            data: [10, 20, 13, 18, 22, 19],
            backgroundColor: [], 
        },
        {
            label: '5. Cuartos en edificio',
            data: [28, 35, 15, 33, 25, 30],
            backgroundColor: [], 
        },
        {
            label: '6. Extintores',
            data: [10, 17, 25, 14, 20, 16],
            backgroundColor: [], 
        },
        {
            label: '7. Varios',
            data: [83, 67, 55, 60, 79, 72],
            backgroundColor: [], 
        },
        {
            label: '8. Procesos',
            data: [13, 27, 25, 20, 29, 24],
            backgroundColor: [], 
        },
    ]
};


//---Chart Second
var setOptions2A = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        datalabels: {
            color: 'white',
            font: {
                size: 19
            },
        },
        tooltip: {
            titleFont: { size: 20 }, 
            bodyFont: { size: 17 }, 
            callbacks: {
                label: function (tooltipItem) {
                    const label = tooltipItem.dataset.label || '';
                    const value = tooltipItem.raw;
                    return `${label}: ${value}`;
                }
            }
        }
    },
    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true
        }
    },
    responsive: true, 
    maintainAspectRatio: false ,
};

var dataChart2A = {
    labels: ['Estación 1', 'Estación 2', 'Estación 3', 'Estación 4', 'Estación 5', 'Estación 6'],
    datasets: [
        {
            label: 'Pendiente',
            data: [300, 150, 100, 120, 180, 90],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            stack: 'Material 1'
        },
        {
            label: 'En proceso de validación',
            data: [200, 130, 90, 110, 150, 80],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            stack: 'Material 1'
        },
        {
            label: 'Rechazada',
            data: [100, 80, 60, 50, 40, 70],
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            stack: 'Material 1'
        },
        {
            label: 'Validada',
            data: [250, 200, 220, 210, 230, 240],
            backgroundColor: 'rgba(153, 102, 255, 0.7)',
            stack: 'Material 1'
        },
    ]
};


//---Chart Second
var setOptions3A = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        datalabels: {
            color: 'white',
            font: {
                size: 19
            },
            formatter: function(value, context) {
                if (value === null || value === undefined || value === 0) {
                    return '';
                }
                return value + '%';
            }
        },
        tooltip: {
            titleFont: { size: 20 }, 
            bodyFont: { size: 17 }, 
            callbacks: {
                label: function (tooltipItem) {
                    const value = tooltipItem.raw;
                    if (value === null || value === undefined || value === 0) {
                        return null;
                    }
                    return `${tooltipItem.dataset.label}: ${value}%`;
                }
            }
        }
    },
    responsive: true, 
    maintainAspectRatio: false,
};

var dataChart3A = {
    labels: ['Tareas Validadas ','Tareas Pendientes', 'Tareas en Validación'],
    datasets: [
        {
            label: 'Porcentaje',
            data: [73, 17, 10],
            backgroundColor: [
                '#0099F9',
                '#FF6384',
                '#FFC107'
            ],
        },
    ]
};


