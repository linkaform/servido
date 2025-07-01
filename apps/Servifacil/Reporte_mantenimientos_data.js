//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'chart', col: '12', id:'chartFirst', title:'ODT por Solicitud'},
            { type:'chart', col: '6', id:'chartSecond', title:'ODT por Subtipo'},
            { type:'chart', col: '6', id:'chartThird', title:'ODT por Status'},
    ]},
];



//---Chart First
var setOptions1A = {
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

var dataChart1A = {
    labels: ['Solicitud Material','Solicitud Trabajo','Solicitud Sistemas'],
    datasets: [
        {
            label: 'Total',
            data: [73,27,45],
            fill: false,
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
                    // Esto devuelve el label del dataset + valor
                    const label = tooltipItem.dataset.label || '';
                    const value = tooltipItem.raw;
                    return `${label}: ${value}`;
                }
            }
        }
    },
    responsive: true, 
    maintainAspectRatio: false ,
};

var dataChart2A = {
    labels: ['Tipo de material','Tipo de trabajo','Despacho','Tipo de sistemas'],
    datasets: [
        {
            label: 'Señalética',
            data: [300, null, null, null],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            stack: 'Material 1'
        },
        {
            label: 'Refacciones',
            data: [200, null, null, null],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            stack: 'Material 1'
        },
        {
            label: 'Dispensarios',
            data: [300, null, null, null],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            stack: 'Material 1'
        },
        {
            label: 'Electrico',
            data: [200, null, null, null],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            stack: 'Material 1'
        },
        {
            label: 'Civil',
            data: [200, null, null, null],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            stack: 'Material 1'
        },

        {
            label: 'Imagen',
            data: [null, 400, null, null],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            stack: 'Material 2'
        },
        {
            label: 'Hidrosanitario',
            data: [null, 100, null, null],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            stack: 'Material 2'
        },
        {
            label: 'Dispensario',
            data: [null, 500, null, null],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            stack: 'Material 2'
        },
        {
            label: 'Civil',
            data: [null, 100, null, null],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            stack: 'Material 2'
        },

        {
            label: 'Nulo',
            data: [null, null, 200, null],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            stack: 'Material 3'
        },
        {
            label: 'Intermitente',
            data: [null, null, 100, null],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            stack: 'Material 3'
        },
        {
            label: 'Accesorios',
            data: [null, null, 50, null],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            stack: 'Material 3'
        },

        {
            label: 'Material',
            data: [null, null, null, 250],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            stack: 'Material 4'
        },
        {
            label: 'Trabajo',
            data: [null, null, null, 100],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            stack: 'Material 4'
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
    labels: ['Pendiente','Revisado por Supervisor','Autorizado por Gerente','No autorizado por Gerente','En espera de material','Entrega de material a Supervisor de Operaciones','Recepción de material a Líder de estación','Resuelta'],
    datasets: [
        {
            label: 'Total',
            data: [73,27,89,85,41,23,14,78],
            fill: false,
            backgroundColor: ['#0099F9', '#8C8C8C'], 
        },
    ]
};