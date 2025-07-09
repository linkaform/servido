//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'chart', col: '12', id:'chartFirst', title:'ODT por Solicitud'},
            { type:'chart', col: '6', id:'chartSecond', title:'ODT por Tipo de Material'},
            { type:'chart', col: '6', id:'chartThird', title:'ODT por Tipo de Trabajo'},
            { type:'chart', col: '4', id:'chartFourth', title:'ODT por Tipo de Sistemas'},
            { type:'chart', col: '8', id:'chartFiveth', title:'ODT por Status'},
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
    labels: ['Señalética','Refacciones','Dispensarios','Electrico','Civil'],
    datasets: [
        {
            label: 'Total',
            data: [300, 200, 300, 200, 150],
            backgroundColor: [],
        },
    ]
};

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

var dataChart3A = {
    labels: ['Imagen','Hidrosanitario','Dispensario','Civil','Material','Trabajo'],
    datasets: [
        {
            label: 'Total',
            data: [400, 100, 500, 100, 250, 100],
            backgroundColor: [],
        },
    ]
};

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
var dataChart4A = {
    labels: ['Trabajo','Material'],
    datasets: [
        {
            label: 'Total',
            data: [300, 250],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
        },
    ]
};


//---Chart 5A
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

var dataChart5A = {
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