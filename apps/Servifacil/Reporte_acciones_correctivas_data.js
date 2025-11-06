//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
        { type:'chart', col: '12', id:'chartFirst', title:'Acciones Correctivas por Estación'},
        { type:'chart', col: '6', id:'chartSecond', title:'Acciones Correctivas por Estatus'},
        { type:'chart', col: '6', id:'chartThird', title:'Porcentaje de cumplimiento'},
        { type:'table', col: '12', id:'tableFirst', title:'Cumplimiento de acciones correctivas'},
    ]},
    { class:'', _children : [
        { 
            type:'tabs', 
            col: '12', 
            id:'tabFirst', 
            optionsTabs:[
                {id:'tabOperaciones',name:'Operaciones'},
                {id:'tabMantenimiento',name:'Mantenimiento'},
            ],
            elementsTabs:[
                {tabId:'tabMantenimiento', type:'card', id:'cardFirst', title:'Tareas Pendientes Mantenimiento', hexadecimal:'#FF5733'}, 
                {tabId:'tabMantenimiento', type:'chart', id:'chartFourth', title:'Cumplimiento Mantenimiento'}, 
                {tabId:'tabMantenimiento', type:'table', id:'tableSecond', title:'Cumplimiento de acciones correctivas Mantenimiento'}, 

                {tabId:'tabOperaciones', type:'card', id:'cardSecond', title:'Tareas Pendientes Operaciones', hexadecimal:'#FF5733'}, 
                {tabId:'tabOperaciones', type:'chart', id:'chartFiveth', title:'Cumplimiento Operaciones'}, 
                {tabId:'tabOperaciones', type:'table', id:'tableThird', title:'Cumplimiento de acciones correctivas Operaciones'} 
            ]
        },
    ]},
];



//-----Tables
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
    { title: "Acción Correctiva", field: 'accion', headerTooltip: true,  tooltip: true,  hozAlign: "left", width: 450},
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

let columsTable2 = [
    { 
        title: "Folio", 
        field: 'folio', 
        headerTooltip: true, 
        headerFilter:"input", 
        hozAlign: "left", 
        width: 150,
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
    { title: "Estación de Servicio", field: 'estacion', headerTooltip: true, headerFilter:"input", hozAlign: "left", width: 150},
    { title: "Acción Correctiva", field: 'accion', headerTooltip: true,  tooltip: true, hozAlign: "left", width: 450},
    { title: "Días para cumplimiento", field: 'cumplimiento', headerTooltip: true,  hozAlign: "right", width: 130},
    { title: "Fecha Inicio", field: 'fecha_inicio', headerTooltip: true,  hozAlign: "left", width: 200},
    { title: "Fecha Limite", field: 'fecha_limite', headerTooltip: true,  hozAlign: "left", width: 200},
    { title: "Fecha de Solución", field: 'fecha_solucion', headerTooltip: true,  hozAlign: "left", width: 200},
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

let dataTable2 = [
    {
        folio: "MT-2001",
        estacion: "ES Toluca 01",
        accion: "Mantenimiento preventivo de bombas",
        cumplimiento: 85,
        fecha_inicio: "2025-07-01",
        fecha_limite: "2025-07-05",
        fecha_solucion: "2025-07-04",
        dia_vencimiento: 1,
        ultima_accion: "Validado"
    },
    {
        folio: "MT-2002",
        estacion: "ES Lerma 02",
        accion: "Revisión de sistema eléctrico",
        cumplimiento: 100,
        fecha_inicio: "2025-07-02",
        fecha_limite: "2025-07-06",
        fecha_solucion: "2025-07-05",
        dia_vencimiento: 0,
        ultima_accion: "Finalizado"
    },
    {
        folio: "MT-2003",
        estacion: "ES Metepec 03",
        accion: "Cambio de luminarias",
        cumplimiento: 70,
        fecha_inicio: "2025-07-03",
        fecha_limite: "2025-07-08",
        fecha_solucion: "2025-07-06",
        dia_vencimiento: 2,
        ultima_accion: "En ejecución"
    },
    {
        folio: "MT-2004",
        estacion: "ES Zinacantepec 04",
        accion: "Revisión de líneas hidráulicas",
        cumplimiento: 90,
        fecha_inicio: "2025-07-01",
        fecha_limite: "2025-07-07",
        fecha_solucion: "2025-07-07",
        dia_vencimiento: 0,
        ultima_accion: "Documentado"
    },
    {
        folio: "MT-2005",
        estacion: "ES Temoaya 05",
        accion: "Limpieza general de área de tanques",
        cumplimiento: 60,
        fecha_inicio: "2025-07-04",
        fecha_limite: "2025-07-09",
        fecha_solucion: "2025-07-08",
        dia_vencimiento: 1,
        ultima_accion: "Revisado"
    },
    {
        folio: "MT-2006",
        estacion: "ES Almoloya 06",
        accion: "Sustitución de válvulas",
        cumplimiento: 80,
        fecha_inicio: "2025-07-02",
        fecha_limite: "2025-07-06",
        fecha_solucion: "2025-07-06",
        dia_vencimiento: 0,
        ultima_accion: "Autorizado"
    },
    {
        folio: "MT-2007",
        estacion: "ES Xonacatlán 07",
        accion: "Reparación de fugas menores",
        cumplimiento: 95,
        fecha_inicio: "2025-07-01",
        fecha_limite: "2025-07-05",
        fecha_solucion: "2025-07-04",
        dia_vencimiento: 1,
        ultima_accion: "Cerrado"
    },
    {
        folio: "MT-2008",
        estacion: "ES Otzolotepec 08",
        accion: "Pruebas de presión en tuberías",
        cumplimiento: 75,
        fecha_inicio: "2025-07-03",
        fecha_limite: "2025-07-08",
        fecha_solucion: "2025-07-07",
        dia_vencimiento: 1,
        ultima_accion: "Observaciones atendidas"
    },
    {
        folio: "MT-2009",
        estacion: "ES Capultitlán 09",
        accion: "Pintura de señalamientos",
        cumplimiento: 88,
        fecha_inicio: "2025-07-02",
        fecha_limite: "2025-07-06",
        fecha_solucion: "2025-07-05",
        dia_vencimiento: 1,
        ultima_accion: "Verificado"
    },
    {
        folio: "MT-2010",
        estacion: "ES Cacalomacán 10",
        accion: "Limpieza de filtros de ventilación",
        cumplimiento: 65,
        fecha_inicio: "2025-07-05",
        fecha_limite: "2025-07-10",
        fecha_solucion: "2025-07-09",
        dia_vencimiento: 1,
        ultima_accion: "En curso"
    }
];

let columsTable3 = [
    { 
        title: "Folio", 
        field: 'folio', 
        headerTooltip: true, 
        headerFilter:"input", 
        hozAlign: "left", 
        width: 150,
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
    { title: "Estación de Servicio", field: 'estacion', headerTooltip: true, headerFilter:"input", hozAlign: "left", width: 150},
    { title: "Acción Correctiva", field: 'accion', headerTooltip: true,  tooltip: true, hozAlign: "left", width: 450},
    { title: "Días para cumplimiento", field: 'cumplimiento', headerTooltip: true,  hozAlign: "right", width: 130},
    { title: "Fecha Inicio", field: 'fecha_inicio', headerTooltip: true,  hozAlign: "left", width: 200},
    { title: "Fecha Limite", field: 'fecha_limite', headerTooltip: true,  hozAlign: "left", width: 200},
    { title: "Fecha de Solución", field: 'fecha_solucion', headerTooltip: true,  hozAlign: "left", width: 200},
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

let dataTable3 = [
    {
        folio: "OP-3001",
        estacion: "ES Toluca 01",
        accion: "Recepción de combustible",
        cumplimiento: 100,
        fecha_inicio: "2025-07-01",
        fecha_limite: "2025-07-01",
        fecha_solucion: "2025-07-01",
        dia_vencimiento: 0,
        ultima_accion: "Completado"
    },
    {
        folio: "OP-3002",
        estacion: "ES Lerma 02",
        accion: "Verificación de inventarios",
        cumplimiento: 90,
        fecha_inicio: "2025-07-02",
        fecha_limite: "2025-07-02",
        fecha_solucion: "2025-07-02",
        dia_vencimiento: 0,
        ultima_accion: "Aprobado"
    },
    {
        folio: "OP-3003",
        estacion: "ES Metepec 03",
        accion: "Revisión de bitácoras de despacho",
        cumplimiento: 80,
        fecha_inicio: "2025-07-03",
        fecha_limite: "2025-07-03",
        fecha_solucion: "2025-07-03",
        dia_vencimiento: 0,
        ultima_accion: "Cerrado"
    },
    {
        folio: "OP-3004",
        estacion: "ES Zinacantepec 04",
        accion: "Conciliación de ventas",
        cumplimiento: 95,
        fecha_inicio: "2025-07-04",
        fecha_limite: "2025-07-04",
        fecha_solucion: "2025-07-04",
        dia_vencimiento: 0,
        ultima_accion: "Validado"
    },
    {
        folio: "OP-3005",
        estacion: "ES Temoaya 05",
        accion: "Entrega de reportes diarios",
        cumplimiento: 70,
        fecha_inicio: "2025-07-05",
        fecha_limite: "2025-07-05",
        fecha_solucion: "2025-07-05",
        dia_vencimiento: 0,
        ultima_accion: "En revisión"
    },
    {
        folio: "OP-3006",
        estacion: "ES Almoloya 06",
        accion: "Control de turnos de personal",
        cumplimiento: 85,
        fecha_inicio: "2025-07-06",
        fecha_limite: "2025-07-06",
        fecha_solucion: "2025-07-06",
        dia_vencimiento: 0,
        ultima_accion: "Cerrado"
    },
    {
        folio: "OP-3007",
        estacion: "ES Xonacatlán 07",
        accion: "Verificación de alarmas",
        cumplimiento: 88,
        fecha_inicio: "2025-07-07",
        fecha_limite: "2025-07-07",
        fecha_solucion: "2025-07-07",
        dia_vencimiento: 0,
        ultima_accion: "Confirmado"
    },
    {
        folio: "OP-3008",
        estacion: "ES Otzolotepec 08",
        accion: "Revisión de control volumétrico",
        cumplimiento: 92,
        fecha_inicio: "2025-07-08",
        fecha_limite: "2025-07-08",
        fecha_solucion: "2025-07-08",
        dia_vencimiento: 0,
        ultima_accion: "Validado"
    },
    {
        folio: "OP-3009",
        estacion: "ES Capultitlán 09",
        accion: "Corte de turno matutino",
        cumplimiento: 100,
        fecha_inicio: "2025-07-09",
        fecha_limite: "2025-07-09",
        fecha_solucion: "2025-07-09",
        dia_vencimiento: 0,
        ultima_accion: "Completado"
    },
    {
        folio: "OP-3010",
        estacion: "ES Cacalomacán 10",
        accion: "Supervisión de despacho",
        cumplimiento: 75,
        fecha_inicio: "2025-07-10",
        fecha_limite: "2025-07-10",
        fecha_solucion: "2025-07-10",
        dia_vencimiento: 0,
        ultima_accion: "Observaciones"
    }
];


let configTableCustomFooter = {
    height: "450px",
    theme: "bootstrap5",
    columnMinWidth: 100,
    pagination: false,                // Activa paginación
    paginationMode: "local",         // Paginación local
    paginationSize: 4,              // Registros por página
    paginationCounter: "rows",       // Muestra "x de y filas"
};

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


//---Chart Third
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
    labels: ['Tareas Validadas ','Tareas No Realizadas', 'Tareas en Validación'],
    datasets: [
        {
            label: 'Porcentaje',
            data: [73, 17, 10],
            backgroundColor:  ["#28A745", "#DC3545", "#FFC107"],
        },
    ]
};




//---Chart Fourth
var setOptions4A = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        datalabels: {
            color: 'white',
            font: {
                size: 16
            },
            formatter: function(value, context) {
                if (!value) return '';

                const extra = context.dataset.extraData
                    ? context.dataset.extraData[context.dataIndex]
                    : '';

                return `${value}%/${extra}`;
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
                    return `${tooltipItem.dataset.label}: ${value}`;
                }
            }
        }
    },
    responsive: true, 
    maintainAspectRatio: false,
};

var dataChart4A = {
    labels: ['Tareas Validadas ','Tareas No Realizadas', 'Tareas en Validación'],
    datasets: [
        {
            label: 'Porcentaje',
            data: [73, 17, 10],
            extraData: [73, 17, 10],
            backgroundColor:  ["#28A745", "#DC3545", "#FFC107"],
        },
    ]
};


//---Chart Fiveth
var setOptions5A = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        datalabels: {
            color: 'white',
            font: {
                size: 16
            },
            formatter: function(value, context) {
                if (!value) return '';

                const extra = context.dataset.extraData
                    ? context.dataset.extraData[context.dataIndex]
                    : '';

                return `${value}%/${extra}`;
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
                    return `${tooltipItem.dataset.label}: ${value}`;
                }
            }
        }
    },
    responsive: true, 
    maintainAspectRatio: false,
};

var dataChart5A = {
    labels: ['Tareas Validadas ','Tareas No Realizadas', 'Tareas en Validación'],
    datasets: [
        {
            label: 'Porcentaje',
            data: [73, 17, 10],
            extraData: [73, 17, 10],
            backgroundColor:  ["#28A745", "#DC3545", "#FFC107"],
        },
    ]
};
