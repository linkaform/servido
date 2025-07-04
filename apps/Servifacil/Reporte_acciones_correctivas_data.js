//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'chart', col: '12', id:'chartFirst', title:'Acciones Correctivos por Estación'},
            { type:'chart', col: '6', id:'chartSecond', title:'Acciones Correctivos por Status'},
            { type:'chart', col: '6', id:'chartThird', title:'ODT por Status'},
            { type:'table', col: '12', id:'tableFirst', title:'Datos de Ordenes'},
    ]},
];

let columsTable1 = [
    { title: "Folio", field: 'folio', headerTooltip: true, headerFilter:"input", hozAlign: "left", width: 200},
    { title: "Estación de Servicio", field: 'estacion', headerTooltip: true, headerFilter:"input", hozAlign: "left", width: 200},
    { title: "Sucursal", field: 'sucursal', headerTooltip: true, headerFilter:"input", hozAlign: "left", width: 250},
    { title: "Acción Correctiva", field: 'accion', headerTooltip: true,  hozAlign: "left", width: 250},
    { title: "Días para cumplimiento", field: 'cumplimiento', headerTooltip: true,  hozAlign: "left", width: 130},
    { title: "Fecha Inicio", field: 'fecha_inicio', headerTooltip: true,  hozAlign: "left", width: 200},
    { title: "Fecha Limite", field: 'fecha_limite', headerTooltip: true,  hozAlign: "left", width: 200},
    { title: "Días para Vencimiento", field: 'dia_vencimiento', headerTooltip: true,  hozAlign: "left", width: 150},
    { title: "Ultima Acción", field: 'ultima_accion', headerTooltip: true,  hozAlign: "left", width: 100},
];

let dataTable1 = [
  {
    folio: "AC-1001",
    estacion: "ES Toluca 01",
    sucursal: "Sucursal Norte",
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
    sucursal: "Sucursal Sur",
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
    sucursal: "Sucursal Oriente",
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
    sucursal: "Sucursal Poniente",
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
    sucursal: "Sucursal Centro",
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
    sucursal: "Sucursal Altos",
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
    sucursal: "Sucursal Express",
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
    sucursal: "Sucursal Urbana",
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
    sucursal: "Sucursal Valles",
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
    sucursal: "Sucursal Central",
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
                    return `${tooltipItem.raw}`; 
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
        },
        tooltip: {
            titleFont: { size: 20 }, 
            bodyFont: { size: 17 }, 
            callbacks: {
                label: function (tooltipItem) {
                    return `${tooltipItem.raw}`; 
                }
            }
        }
    },
   
    responsive: true, 
    maintainAspectRatio: false ,
};

var dataChart3A = {
    labels: ['Tareas Realizadas ','Tareas Pendientes'],
    datasets: [
        {
            label: 'Porcentaje',
            data: [73,27],
            fill: false,
            backgroundColor: ['#0099F9', '#8C8C8C'], 
        },
    ]
};


