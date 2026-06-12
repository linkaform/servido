//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'card', col: '3', id:'cardFirst', title:'Promedio General', hexadecimal:'#FF5733'},
            { type:'card', col: '3', id:'cardSecond', title:'Mejor estación evaluada', hexadecimal:'#FF5733'},
            { type:'card', col: '3', id:'cardThird', title:'Mejor departamento evaluado', hexadecimal:'#FF5733'},
            { type:'card', col: '3', id:'cardFourth', title:'Auditorias', hexadecimal:'#FF5733'},
        ] 
    },
    { class:'', _children : [
        { type:'chart', col: '12', id:'chartFirst', title:'ODT por Solicitud'},
        { type:'chart', col: '12', id:'chartSecond', title:'ODT por Tipo de Material'},
        { type:'chart', col: '12', id:'chartThird', title:'ODT por Tipo de Trabajo'},
        { type:'table', col: '12', id:'tableFirst', title:'Datos de Promotores', optionExpanded:true},
    ]},
];


var dataTable1 = [
    // Operaciones
    { pregunta: "¿El personal porta uniforme completo?",        departamento: "Operaciones",      auditorias: 5, positivas: 4, negativas: 1 },
    { pregunta: "¿Se respetan los protocolos de despacho?",     departamento: "Operaciones",      auditorias: 5, positivas: 5, negativas: 0 },
    { pregunta: "¿La isla de bombas está limpia y señalizada?", departamento: "Operaciones",      auditorias: 5, positivas: 4, negativas: 1 },
    // Mantenimiento
    { pregunta: "¿Las bombas operan sin fallas reportadas?",    departamento: "Mantenimiento",    auditorias: 5, positivas: 2, negativas: 3 },
    { pregunta: "¿La iluminación funciona al 100%?",            departamento: "Mantenimiento",    auditorias: 5, positivas: 4, negativas: 1 },
    { pregunta: "¿Los extintores están vigentes?",              departamento: "Mantenimiento",    auditorias: 5, positivas: 5, negativas: 0 },
    // Sistemas
    { pregunta: "¿El punto de venta opera sin intermitencias?",        departamento: "Sistemas", auditorias: 5, positivas: 4, negativas: 1 },
    { pregunta: "¿Las cámaras de seguridad graban correctamente?",     departamento: "Sistemas", auditorias: 5, positivas: 3, negativas: 2 },
    { pregunta: "¿Los respaldos de información están al día?",         departamento: "Sistemas", auditorias: 5, positivas: 4, negativas: 1 },
    // Desarrollo Humano
    { pregunta: "¿El personal recibió la capacitación del periodo?",   departamento: "Desarrollo Humano", auditorias: 5, positivas: 1, negativas: 4 },
    { pregunta: "¿Los expedientes del personal están completos?",      departamento: "Desarrollo Humano", auditorias: 5, positivas: 4, negativas: 1 },
    { pregunta: "¿Se aplicó la evaluación de clima laboral?",          departamento: "Desarrollo Humano", auditorias: 5, positivas: 4, negativas: 1 },
    // Finanzas
    { pregunta: "¿Los cortes de caja cuadran sin diferencias?",        departamento: "Finanzas", auditorias: 5, positivas: 5, negativas: 0 },
    { pregunta: "¿Los depósitos se realizan en tiempo?",               departamento: "Finanzas", auditorias: 5, positivas: 5, negativas: 0 },
    { pregunta: "¿Las facturas se emiten correctamente?",              departamento: "Finanzas", auditorias: 5, positivas: 4, negativas: 1 },
    // Servicio a Clientes
    { pregunta: "¿Se atienden las quejas en menos de 48 horas?",       departamento: "Servicio a Clientes", auditorias: 5, positivas: 5, negativas: 0 },
    { pregunta: "¿El personal saluda y despide al cliente?",           departamento: "Servicio a Clientes", auditorias: 5, positivas: 4, negativas: 1 },
    { pregunta: "¿Los baños están limpios y abastecidos?",             departamento: "Servicio a Clientes", auditorias: 5, positivas: 4, negativas: 1 },
    // Mercadotecnia
    { pregunta: "¿La promoción vigente está visible?",                 departamento: "Mercadotecnia", auditorias: 5, positivas: 4, negativas: 1 },
    { pregunta: "¿El material POP está en buen estado?",               departamento: "Mercadotecnia", auditorias: 5, positivas: 4, negativas: 1 },
    { pregunta: "¿Se aplica el programa de lealtad?",                  departamento: "Mercadotecnia", auditorias: 5, positivas: 5, negativas: 0 },
    // Cumplimiento
    { pregunta: "¿Las licencias y permisos están vigentes?",           departamento: "Cumplimiento", auditorias: 5, positivas: 4, negativas: 1 },
    { pregunta: "¿Se cumple la normativa de protección civil?",        departamento: "Cumplimiento", auditorias: 5, positivas: 5, negativas: 0 },
    { pregunta: "¿Las bitácoras regulatorias están firmadas?",         departamento: "Cumplimiento", auditorias: 5, positivas: 4, negativas: 1 },
];

var columnsTable1 = [
    {
        title: "Pregunta",
        field: "pregunta",
        headerSort: false,
        widthGrow: 3,
        formatter: function(cell) {
            return `<span style="font-size:13px; color:#333;">${cell.getValue()}</span>`;
        },
        titleFormatter: function() {
            return `<span style="font-size:13px; font-weight:600; color:#333;">Pregunta</span>`;
        },
        groupBy: "departamento",
        width:300,
    },
    {
        title: "Auditorías realizadas",
        field: "auditorias",
        headerSort: false,
        hozAlign: "center",
        headerHozAlign: "center",
        widthGrow: 1,
        titleFormatter: function() {
            return `<span style="font-size:12px; font-weight:600; color:#333; white-space:normal; text-align:center; display:block;">Auditorías<br>realizadas</span>`;
        },
        formatter: function(cell) {
            return `<span style="font-size:13px; color:#333;">${cell.getValue()}</span>`;
        }
    },
    {
        title: "Departamento",
        headerHozAlign: "center",
        columns: [
            {
                title: "Respuestas positivas",
                field: "positivas",
                headerSort: false,
                hozAlign: "center",
                headerHozAlign: "center",
                widthGrow: 1,
                titleFormatter: function() {
                    return `<span style="font-size:12px; font-weight:600; color:#4CAF50; white-space:normal; text-align:center; display:block;">Respuestas<br>positivas</span>`;
                },
                formatter: function(cell) {
                    const v = cell.getValue();
                    const color = v === 0 ? '#bbb' : '#4CAF50';
                    return `<span style="font-size:13px; font-weight:600; color:${color};">${v}</span>`;
                }
            },
            {
                title: "Respuestas negativas",
                field: "negativas",
                headerSort: false,
                hozAlign: "center",
                headerHozAlign: "center",
                widthGrow: 1,
                titleFormatter: function() {
                    return `<span style="font-size:12px; font-weight:600; color:#F44336; white-space:normal; text-align:center; display:block;">Respuestas<br>negativas</span>`;
                },
                formatter: function(cell) {
                    const v = cell.getValue();
                    const color = v === 0 ? '#bbb' : '#F44336';
                    return `<span style="font-size:13px; font-weight:600; color:${color};">${v}</span>`;
                }
            }
        ]
    }
];



//---Chart First
var dataChart1 = {
    labels: ["Paso del Toro", "Calzadas 7", "Allende", "Oteapan 3", "El Bellote"],
    datasets: [
        {
            label: 'Resultado',
            data: [86, 85, 84, 83, 82],
            backgroundColor: function(context) {
                const value = context.dataset.data[context.dataIndex];
                if (value >= 90) return '#4CAF50';      // Aprobado
                if (value >= 75) return '#FFA726';      // En observación
                return '#F44336';                        // Crítico
            },
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 2,
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
        legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                padding: 20,
                font: {
                    size: 12,
                    family: "'Segoe UI', Arial, sans-serif",
                },
                color: '#333',
                generateLabels() {
                    return [
                        { text: 'Aprobado ≥ 90',       fillStyle: '#4CAF50', strokeStyle: '#4CAF50', lineWidth: 0, pointStyle: 'rect' },
                        { text: 'En observación 75–89', fillStyle: '#FFA726', strokeStyle: '#FFA726', lineWidth: 0, pointStyle: 'rect' },
                        { text: 'Crítico < 75',         fillStyle: '#F44336', strokeStyle: '#F44336', lineWidth: 0, pointStyle: 'rect' },
                    ];
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
                    const v = ctx.parsed.y;
                    const status = v >= 90 ? 'Aprobado' : v >= 75 ? 'En observación' : 'Crítico';
                    return ` ${v} — ${status}`;
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: '#e0e0e0',
                lineWidth: 0.8,
            },
            border: { display: false },
            ticks: {
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" },
                color: '#555',
            }
        },
        y: {
            grid: {
                color: '#e0e0e0',
                lineWidth: 0.8,
            },
            border: { display: false },
            ticks: {
                stepSize: 10,
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" },
                color: '#555',
            },
            min: 0,
            max: 100,
        }
    },
    layout: {
        padding: { top: 8, right: 16, bottom: 0, left: 8 }
    }
};

//---Chart Second
var dataChart2 = {
    labels: [
        "Mercadotecnia",
        "Servicio a Clientes",
        "Sistemas",
        "Operaciones",
        "Mantenimiento",
        "Desarrollo Humano",
        "Finanzas",
        "Cumplimiento"
    ],
    datasets: [
        {
            label: 'Resultado',
            data: [91, 89, 88, 83, 83, 82, 81, 80],
            backgroundColor: function(context) {
                const value = context.dataset.data[context.dataIndex];
                if (value >= 90) return '#4CAF50';
                if (value >= 75) return '#FFA726';
                return '#F44336';
            },
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 2,
        }
    ]
};

var optionsChart2 = {
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
                pointStyle: 'rect',
                padding: 20,
                font: {
                    size: 12,
                    family: "'Segoe UI', Arial, sans-serif",
                },
                color: '#333',
                generateLabels() {
                    return [
                        { text: 'Aprobado ≥ 90',       fillStyle: '#4CAF50', strokeStyle: '#4CAF50', lineWidth: 0, pointStyle: 'rect' },
                        { text: 'En observación 75–89', fillStyle: '#FFA726', strokeStyle: '#FFA726', lineWidth: 0, pointStyle: 'rect' },
                        { text: 'Crítico < 75',         fillStyle: '#F44336', strokeStyle: '#F44336', lineWidth: 0, pointStyle: 'rect' },
                    ];
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
                    const v = ctx.parsed.x;
                    const status = v >= 90 ? 'Aprobado' : v >= 75 ? 'En observación' : 'Crítico';
                    return ` ${v} — ${status}`;
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: '#e0e0e0',
                lineWidth: 0.8,
            },
            border: { display: false },
            ticks: {
                stepSize: 10,
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" },
                color: '#555',
            },
            min: 0,
            max: 100,
        },
        y: {
            grid: {
                color: '#e0e0e0',
                lineWidth: 0.8,
            },
            border: { display: false },
            ticks: {
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" },
                color: '#555',
            }
        }
    },
    layout: {
        padding: { top: 8, right: 16, bottom: 0, left: 8 }
    }
};


//---Chart Third
var dataChart3 = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
        {
            label: 'Operaciones',
            data: [83, 92, 92, 86, 83, 84],
            borderColor: '#5B4FBE',
            backgroundColor: '#5B4FBE',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            tension: 0.4,
            fill: false,
            borderDash: [],
        },
        {
            label: 'Mantenimiento',
            data: [92, 85, 84, 88, 88, 85],
            borderColor: '#00A878',
            backgroundColor: '#00A878',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'rectRot',
            tension: 0.4,
            fill: false,
            borderDash: [6, 3],
        },
        {
            label: 'Sistemas',
            data: [86, 90, 89, 86, 87, 86],
            borderColor: '#FF4500',
            backgroundColor: '#FF4500',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            tension: 0.4,
            fill: false,
            borderDash: [2, 2],
        },
        {
            label: 'Desarrollo Humano',
            data: [88, 88, 88, 91, 82, 87],
            borderColor: '#E91E8C',
            backgroundColor: '#E91E8C',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            tension: 0.4,
            fill: false,
            borderDash: [],
        },
        {
            label: 'Finanzas',
            data: [87, 91, 89, 86, 80, 93],
            borderColor: '#2196F3',
            backgroundColor: '#2196F3',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            tension: 0.4,
            fill: false,
            borderDash: [6, 3],
        },
        {
            label: 'Servicio a Clientes',
            data: [86, 85, 86, 88, 89, 84],
            borderColor: '#7CB342',
            backgroundColor: '#7CB342',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'rectRot',
            tension: 0.4,
            fill: false,
            borderDash: [2, 2],
        },
        {
            label: 'Mercadotecnia',
            data: [93, 86, 88, 84, 91, 87],
            borderColor: '#E8A000',
            backgroundColor: '#E8A000',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            tension: 0.4,
            fill: false,
            borderDash: [],
        },
        {
            label: 'Cumplimiento',
            data: [89, 86, 94, 92, 81, 90],
            borderColor: '#888888',
            backgroundColor: '#888888',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            tension: 0.4,
            fill: false,
            borderDash: [6, 3],
        }
    ]
};

var optionsChart3 = {
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
                pointStyle: 'line',
                padding: 20,
                font: {
                    size: 12,
                    family: "'Segoe UI', Arial, sans-serif",
                },
                color: '#333',
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
                    return ` ${ctx.dataset.label}: ${ctx.parsed.y}`;
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: '#e0e0e0',
                lineWidth: 0.8,
            },
            border: { display: false },
            ticks: {
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" },
                color: '#555',
            }
        },
        y: {
            grid: {
                color: '#e0e0e0',
                lineWidth: 0.8,
            },
            border: { display: false },
            ticks: {
                stepSize: 5,
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" },
                color: '#555',
            },
            min: 60,
            max: 100,
            title: {
                display: true,
                text: 'Calificación',
                color: '#555',
                font: {
                    size: 12,
                    family: "'Segoe UI', Arial, sans-serif",
                }
            }
        }
    },
    layout: {
        padding: { top: 8, right: 16, bottom: 0, left: 8 }
    }
};