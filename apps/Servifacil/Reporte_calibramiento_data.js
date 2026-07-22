//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'card', col: '2', id:'cardFirst', title:'Promedio General', hexadecimal:'#FF5733',cardIcon:'<i class="fa-solid fa-gauge-simple fa-2x text-grey"></i>'},
            { type:'card', col: '2', id:'cardSecond', title:'Estación con mayor puntuación', hexadecimal:'#FF5733',cardIcon:'<i class="fa-solid fa-arrow-up-short-wide fa-2x text-success"></i>'},
            { type:'card', col: '2', id:'cardThird', title:'Estación con menor puntuación', hexadecimal:'#FF5733',cardIcon:'<i class="fa-solid fa-arrow-down-short-wide fa-2x text-danger"></i>'},
            { type:'card', col: '2', id:'cardFourth', title:'Departamento con mayor puntuación', hexadecimal:'#FF5733',cardIcon:'<i class="fa-solid fa-arrow-up-short-wide fa-2x text-success"></i>'},
            { type:'card', col: '2', id:'cardFiveth', title:'Departamento con menor puntuación', hexadecimal:'#FF5733',cardIcon:'<i class="fa-solid fa-arrow-down-short-wide fa-2x text-danger"></i>'},
            { type:'card', col: '2', id:'cardSixth', title:'Auditorias', hexadecimal:'#FF5733',cardIcon:'<i class="fa-solid fa-list-check fa-2x text-grey"></i>'},
        ] 
    },
    { class:'', _children : [
        { type:'chart', col: '12', id:'chartSecond', title:'Calificación por Departamento'},
        { type:'chart', col: '12', id:'chartFirst', title:'Calificación por Estación'},
        { type:'chart', col: '12', id:'chartThird', title:'Tendencia mensual por Departamento.'},
        { type:'table', col: '12', id:'tableFirst', title:'Resultados por pregunta', optionExpanded:true},
        { type:'chart', col: '12', id:'chartFourth', title:'Preguntas con respuestas negativas'},
    ]},
];

var dataTable1 = [
    {
        pregunta: "Operaciones", positivas: 13, negativas: 2,
        _children: [
            { pregunta: "¿El personal porta uniforme completo?",        auditorias: 5, positivas: 4, negativas: 1 },
            { pregunta: "¿Se respetan los protocolos de despacho?",     auditorias: 5, positivas: 5, negativas: 0 },
            { pregunta: "¿La isla de bombas está limpia y señalizada?", auditorias: 5, positivas: 4, negativas: 1 },
        ]
    },
    {
        pregunta: "Mantenimiento", positivas: 11, negativas: 4,
        _children: [
            { pregunta: "¿Las bombas operan sin fallas reportadas?", auditorias: 5, positivas: 2, negativas: 3 },
            { pregunta: "¿La iluminación funciona al 100%?",          auditorias: 5, positivas: 4, negativas: 1 },
            { pregunta: "¿Los extintores están vigentes?",            auditorias: 5, positivas: 5, negativas: 0 },
        ]
    },
    {
        pregunta: "Sistemas", positivas: 11, negativas: 4,
        _children: [
            { pregunta: "¿El punto de venta opera sin intermitencias?",    auditorias: 5, positivas: 4, negativas: 1 },
            { pregunta: "¿Las cámaras de seguridad graban correctamente?", auditorias: 5, positivas: 3, negativas: 2 },
            { pregunta: "¿Los respaldos de información están al día?",     auditorias: 5, positivas: 4, negativas: 1 },
        ]
    },
    {
        pregunta: "Desarrollo Humano", positivas: 9, negativas: 6,
        _children: [
            { pregunta: "¿El personal recibió la capacitación del periodo?", auditorias: 5, positivas: 1, negativas: 4 },
            { pregunta: "¿Los expedientes del personal están completos?",     auditorias: 5, positivas: 4, negativas: 1 },
            { pregunta: "¿Se aplicó la evaluación de clima laboral?",        auditorias: 5, positivas: 4, negativas: 1 },
        ]
    },
    {
        pregunta: "Finanzas", positivas: 14, negativas: 1,
        _children: [
            { pregunta: "¿Los cortes de caja cuadran sin diferencias?", auditorias: 5, positivas: 5, negativas: 0 },
            { pregunta: "¿Los depósitos se realizan en tiempo?",        auditorias: 5, positivas: 5, negativas: 0 },
            { pregunta: "¿Las facturas se emiten correctamente?",       auditorias: 5, positivas: 4, negativas: 1 },
        ]
    },
    {
        pregunta: "Servicio a Clientes", positivas: 13, negativas: 2,
        _children: [
            { pregunta: "¿Se atienden las quejas en menos de 48 horas?", auditorias: 5, positivas: 5, negativas: 0 },
            { pregunta: "¿El personal saluda y despide al cliente?",     auditorias: 5, positivas: 4, negativas: 1 },
            { pregunta: "¿Los baños están limpios y abastecidos?",       auditorias: 5, positivas: 4, negativas: 1 },
        ]
    },
    {
        pregunta: "Mercadotecnia", positivas: 13, negativas: 2,
        _children: [
            { pregunta: "¿La promoción vigente está visible?",   auditorias: 5, positivas: 4, negativas: 1 },
            { pregunta: "¿El material POP está en buen estado?", auditorias: 5, positivas: 4, negativas: 1 },
            { pregunta: "¿Se aplica el programa de lealtad?",    auditorias: 5, positivas: 5, negativas: 0 },
        ]
    },
    {
        pregunta: "Cumplimiento", positivas: 13, negativas: 2,
        _children: [
            { pregunta: "¿Las licencias y permisos están vigentes?",    auditorias: 5, positivas: 4, negativas: 1 },
            { pregunta: "¿Se cumple la normativa de protección civil?", auditorias: 5, positivas: 5, negativas: 0 },
            { pregunta: "¿Las bitácoras regulatorias están firmadas?",  auditorias: 5, positivas: 4, negativas: 1 },
        ]
    },
];

var columnsTable1 = [
    {
        title: "Pregunta",
        field: "pregunta",
        headerSort: false,
        width: 900,
        formatter: function(cell) {
            const row = cell.getRow();
            const isParent = row.getData()._children;
            if (isParent) {
                return `<span style="font-size:12px; color:#3D4A5C; font-weight:600;">${cell.getValue()}</span>`;
            }
            return `<span style="font-size:13px; color:#333;">${cell.getValue()}</span>`;
        },
        titleFormatter: function() {
            return `<span style="font-size:13px; font-weight:600; color:#333;">Pregunta</span>`;
        },
    },
    {
        title: "Auditorías realizadas",
        field: "auditorias",
        headerSort: false,
        hozAlign: "center",
        headerHozAlign: "center",
        width: 150,
        titleFormatter: function() {
            return `<span style="font-size:12px; font-weight:600; color:#333; white-space:normal; text-align:center; display:block;">Auditorías<br>realizadas</span>`;
        },
        formatter: function(cell) {
            const v = cell.getValue();
            if (v === undefined || v === null || v === "") return "";
            const isParent = !!cell.getRow().getData()._children;
            const color = isParent ? '#3D4A5C' : '#333';
            const weight = isParent ? '700' : '400';
            return `<span style="font-size:13px; font-weight:${weight}; color:${color};">${v}</span>`;
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
                width: 150,
                titleFormatter: function() {
                    return `<span style="font-size:12px; font-weight:600; color:#4CAF50; white-space:normal; text-align:center; display:block;">Respuestas<br>positivas</span>`;
                },
                formatter: function(cell) {
                    const v = cell.getValue();
                    if (v === undefined || v === null || v === "") return "";
                    const isParent = !!cell.getRow().getData()._children;
                    const color = isParent ? '#2E7D32' : (v === 0 ? '#bbb' : '#4CAF50');
                    const weight = isParent ? '700' : '600';
                    return `<span style="font-size:13px; font-weight:${weight}; color:${color};">${v}</span>`;
                }
            },
            {
                title: "Respuestas negativas",
                field: "negativas",
                headerSort: false,
                hozAlign: "center",
                headerHozAlign: "center",
                width: 150,
                titleFormatter: function() {
                    return `<span style="font-size:12px; font-weight:600; color:#F44336; white-space:normal; text-align:center; display:block;">Respuestas<br>negativas</span>`;
                },
                formatter: function(cell) {
                    const v = cell.getValue();
                    if (v === undefined || v === null || v === "") return "";
                    const isParent = !!cell.getRow().getData()._children;
                    const color = isParent ? '#C62828' : (v === 0 ? '#bbb' : '#F44336');
                    const weight = isParent ? '700' : '600';
                    return `<span style="font-size:13px; font-weight:${weight}; color:${color};">${v}</span>`;
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
            data: [9, 8.5, 8.4, 8.3, 7.2],
            backgroundColor: function(context) {
                const value = context.dataset.data[context.dataIndex];
                if (value >= 9.0) return '#4CAF50';      // Aprobado
                if (value >= 7.5) return '#FFA726';      // En observación
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
    interaction: { mode: 'index', intersect: false },
    plugins: {
        legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                padding: 20,
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" },
                color: '#333',
                generateLabels() {
                    return [
                        { text: 'Aprobado ≥ 9.0',          fillStyle: '#4CAF50', strokeStyle: '#4CAF50', lineWidth: 0, pointStyle: 'rect' },
                        { text: 'En observación 7.5–8.9',   fillStyle: '#FFA726', strokeStyle: '#FFA726', lineWidth: 0, pointStyle: 'rect' },
                        { text: 'Crítico < 7.5',            fillStyle: '#F44336', strokeStyle: '#F44336', lineWidth: 0, pointStyle: 'rect' },
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
                    const status = v >= 9.0 ? 'Aprobado' : v >= 7.5 ? 'En observación' : 'Crítico';
                    return ` ${v} — ${status}`;
                }
            }
        }
    },
    scales: {
        x: {
            grid: { color: '#e0e0e0', lineWidth: 0.8 },
            border: { display: false },
            ticks: { font: { size: 12, family: "'Segoe UI', Arial, sans-serif" }, color: '#555' }
        },
        y: {
            grid: { color: '#e0e0e0', lineWidth: 0.8 },
            border: { display: false },
            ticks: {
                stepSize: 1,
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" },
                color: '#555',
            },
            min: 0,
            max: 10,
        }
    },
    layout: { padding: { top: 8, right: 16, bottom: 0, left: 8 } }
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
            data: [9.1, 8.9, 8.8, 8.3, 8.3, 8.2, 8.1, 8.0],
            backgroundColor: function(context) {
                const value = context.dataset.data[context.dataIndex];
                if (value >= 9.0) return '#4CAF50';
                if (value >= 7.5) return '#FFA726';
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
    interaction: { mode: 'index', intersect: false },
    plugins: {
        legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                padding: 20,
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" },
                color: '#333',
                generateLabels() {
                    return [
                        { text: 'Aprobado ≥ 9.0',          fillStyle: '#4CAF50', strokeStyle: '#4CAF50', lineWidth: 0, pointStyle: 'rect' },
                        { text: 'En observación 7.5–8.9',   fillStyle: '#FFA726', strokeStyle: '#FFA726', lineWidth: 0, pointStyle: 'rect' },
                        { text: 'Crítico < 7.5',            fillStyle: '#F44336', strokeStyle: '#F44336', lineWidth: 0, pointStyle: 'rect' },
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
                    const status = v >= 9.0 ? 'Aprobado' : v >= 7.5 ? 'En observación' : 'Crítico';
                    return ` ${v} — ${status}`;
                }
            }
        }
    },
    scales: {
        x: {
            grid: { color: '#e0e0e0', lineWidth: 0.8 },
            border: { display: false },
            ticks: {
                stepSize: 1,
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" },
                color: '#555',
            },
            min: 0,
            max: 10,
        },
        y: {
            grid: { color: '#e0e0e0', lineWidth: 0.8 },
            border: { display: false },
            ticks: { font: { size: 12, family: "'Segoe UI', Arial, sans-serif" }, color: '#555' }
        }
    },
    layout: { padding: { top: 8, right: 16, bottom: 0, left: 8 } }
};


//---Chart Third
var dataChart3 = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
        {
            label: 'Operaciones',
            data: [8.3, 9.2, 9.2, 8.6, 8.3, 8.4],
            borderColor: '#5B4FBE',
            backgroundColor: '#5B4FBE',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            tension: 0.50,
            fill: false,
        },
        {
            label: 'Mantenimiento',
            data: [9.2, 8.5, 8.4, 8.8, 8.8, 8.5],
            borderColor: '#00A878',
            backgroundColor: '#00A878',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            tension: 0.50,
            fill: false,
        },
        {
            label: 'Sistemas',
            data: [8.6, 9.0, 8.9, 8.6, 8.7, 8.6],
            borderColor: '#FF4500',
            backgroundColor: '#FF4500',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            tension: 0.50,
            fill: false,
        },
        {
            label: 'Desarrollo Humano',
            data: [8.8, 8.8, 8.8, 9.1, 8.2, 8.7],
            borderColor: '#E91E8C',
            backgroundColor: '#E91E8C',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            tension: 0.50,
            fill: false,
        },
        {
            label: 'Finanzas',
            data: [8.7, 9.1, 8.9, 8.6, 8.0, 9.3],
            borderColor: '#2196F3',
            backgroundColor: '#2196F3',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            tension: 0.50,
            fill: false,
        },
        {
            label: 'Servicio a Clientes',
            data: [8.6, 8.5, 8.6, 8.8, 8.9, 8.4],
            borderColor: '#7CB342',
            backgroundColor: '#7CB342',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            tension: 0.50,
            fill: false,
        },
        {
            label: 'Mercadotecnia',
            data: [9.3, 8.6, 8.8, 8.4, 9.1, 8.7],
            borderColor: '#E8A000',
            backgroundColor: '#E8A000',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            tension: 0.50,
            fill: false,
        },
        {
            label: 'Cumplimiento',
            data: [8.9, 8.6, 9.4, 9.2, 8.1, 9.0],
            borderColor: '#888888',
            backgroundColor: '#888888',
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: 'circle',
            tension: 0.50,
            fill: false,
        }
    ]
};

var optionsChart3 = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
        legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
                usePointStyle: true,
                pointStyle: 'line',
                padding: 20,
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" },
                color: '#333',
            }
        },
        datalabels: { 
            display: true,
            color: 'black',
            font: {
                size: 14,
                weight: 'bold'
            },
            anchor: 'end',
            align: 'left',
            offset: 5,
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
            grid: { color: '#e0e0e0', lineWidth: 0.8 },
            border: { display: false },
            ticks: { font: { size: 12, family: "'Segoe UI', Arial, sans-serif" }, color: '#555' }
        },
        y: {
            grid: { color: '#e0e0e0', lineWidth: 0.8 },
            border: { display: false },
            ticks: {
                stepSize: 0.5,
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" },
                color: '#555',
            },
            min: 7,
            max: 10,
            title: {
                display: true,
                text: 'Calificación',
                color: '#555',
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" }
            }
        }
    },
    layout: { padding: { top: 8, right: 16, bottom: 0, left: 8 } }
};

//---Chart Fourth
//---Chart Fourth (agrupado por departamento)

//---Chart Fourth (agrupado por departamento + toggle en leyenda)

// 1) Datos con su departamento asignado
const preguntasData = [
    { label: "¿El personal recibió la capacitación del periodo?", value: 18, departamento: "Desarrollo Humano" },
    { label: "¿Las bombas operan sin fallas reportadas?", value: 14, departamento: "Mantenimiento" },
    { label: "¿Las cámaras de seguridad graban correctamente?", value: 11, departamento: "Sistemas" },
    { label: "¿El personal porta uniforme completo?", value: 9, departamento: "Desarrollo Humano" },
    { label: "¿La isla de bombas está limpia y señalizada?", value: 8, departamento: "Operaciones" },
    { label: "¿La iluminación funciona al 100%?", value: 8, departamento: "Mantenimiento" },
    { label: "¿El punto de venta opera sin intermitencias?", value: 7, departamento: "Sistemas" },
    { label: "¿Los respaldos de información están al día?", value: 7, departamento: "Sistemas" },
    { label: "¿Los expedientes del personal están completos?", value: 6, departamento: "Desarrollo Humano" },
    { label: "¿Se aplicó la evaluación de clima laboral?", value: 6, departamento: "Desarrollo Humano" },
    { label: "¿Las facturas se emiten correctamente?", value: 5, departamento: "Finanzas" },
    { label: "¿La promoción vigente está visible?", value: 5, departamento: "Servicio a Cliente" },
    { label: "¿El material POP está en buen estado?", value: 5, departamento: "Servicio a Cliente" },
    { label: "¿Las licencias y permisos están vigentes?", value: 4, departamento: "Operaciones" },
    { label: "¿Las bitácoras regulatorias están firmadas?", value: 4, departamento: "Operaciones" },
    { label: "¿El personal saluda y despide al cliente?", value: 4, departamento: "Servicio a Cliente" },
    { label: "¿Los baños están limpios y abastecidos?", value: 3, departamento: "Operaciones" },
    { label: "¿Se aplica el programa de lealtad?", value: 3, departamento: "Servicio a Cliente" },
    { label: "¿Se respetan los protocolos de despacho?", value: 2, departamento: "Operaciones" },
    { label: "¿Los extintores están vigentes?", value: 2, departamento: "Mantenimiento" },
    { label: "¿Los cortes de caja cuadran sin diferencias?", value: 1, departamento: "Finanzas" },
    { label: "¿Los depósitos se realizan en tiempo?", value: 1, departamento: "Finanzas" },
    { label: "¿Se atienden las quejas en menos de 48 horas?", value: 1, departamento: "Servicio a Cliente" },
    { label: "¿Se cumple la normativa de protección civil?", value: 1, departamento: "Mantenimiento" },
];

// 2) Color fijo por departamento
const departamentoColors = {
    "Operaciones": "#F44336",
    "Mantenimiento": "#FF9800",
    "Sistemas": "#2196F3",
    "Desarrollo Humano": "#9C27B0",
    "Finanzas": "#4CAF50",
    "Servicio a Cliente": "#00BCD4",
};

// 3) Orden de los grupos en el eje Y
const departamentosOrden = [
    "Operaciones", "Mantenimiento", "Sistemas",
    "Desarrollo Humano", "Finanzas", "Servicio a Cliente"
];

// 4) Ordenar por departamento y, dentro de cada uno, por valor descendente
const preguntasOrdenadas = [...preguntasData].sort((a, b) => {
    const depDiff = departamentosOrden.indexOf(a.departamento) - departamentosOrden.indexOf(b.departamento);
    if (depDiff !== 0) return depDiff;
    return b.value - a.value;
});

// 5) Estado: qué departamentos están visibles (todos activos al inicio)
const departamentoVisible = {};
departamentosOrden.forEach(dep => { departamentoVisible[dep] = true; });

// 6) Reconstruye labels + datasets según el estado de visibilidad
function buildChartData() {
    const preguntasVisibles = preguntasOrdenadas.filter(q => departamentoVisible[q.departamento]);

    return {
        labels: preguntasVisibles.map(q => q.label),
        datasets: departamentosOrden.map(dep => ({
            label: dep,
            data: preguntasVisibles.map(q => (q.departamento === dep ? q.value : null)),
            backgroundColor: departamentoColors[dep],
            borderColor: departamentoColors[dep],
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.85,
            categoryPercentage: 0.8,
        }))
    };
}

var dataChart4 = buildChartData();

var optionsChart4 = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
        legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
                boxWidth: 12,
                boxHeight: 12,
                padding: 14,
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" },
                color: '#444',
                generateLabels: () => {
                    return departamentosOrden.map((dep) => ({
                        text: dep,
                        fillStyle: departamentoColors[dep],
                        strokeStyle: departamentoColors[dep],
                        fontColor: departamentoVisible[dep] ? '#444' : '#aaa',
                        hidden: !departamentoVisible[dep],
                    }));
                }
            },
            onClick: (evt, legendItem, legend) => {
                const dep = legendItem.text;
                departamentoVisible[dep] = !departamentoVisible[dep];

                const chart = legend.chart;
                const nuevoData = buildChartData();
                chart.data.labels = nuevoData.labels;
                chart.data.datasets = nuevoData.datasets;
                chart.update();
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
            filter: (item) => item.parsed.x !== null,
            callbacks: {
                label(ctx) {
                    const v = ctx.parsed.x;
                    return ` ${ctx.dataset.label}: ${v} negativa${v !== 1 ? 's' : ''}`;
                }
            }
        }
    },
    scales: {
        x: {
            stacked: true,
            grid: { color: '#e0e0e0', lineWidth: 0.8 },
            border: { display: false },
            ticks: {
                stepSize: 1,
                precision: 0,
                font: { size: 12, family: "'Segoe UI', Arial, sans-serif" },
                color: '#555',
            },
            min: 0,
        },
        y: {
            stacked: true,
            grid: { color: '#e0e0e0', lineWidth: 0.8 },
            border: { display: false },
            ticks: { font: { size: 12, family: "'Segoe UI', Arial, sans-serif" }, color: '#555' }
        }
    },
    layout: { padding: { top: 8, right: 16, bottom: 0, left: 8 } }
};