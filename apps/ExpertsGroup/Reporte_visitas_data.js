//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '8', id:'tableFirst', title:'Table chain'},
            { type:'chart', col: '4', id:'chartFirst', title:'Progress Total'},
            { type:'chart', col: '12', id:'chartSecond', title:'Progress by Store'},
            { type:'map', col: '12', id:'mapFirst', title:'Map'},
    ]},
   
];


//----Table
var columsTable1 = [
    { title: "Chain", field: "cadena", hozAlign: "left", width: 300 },
    { title: "Objective", field: "objetivo", hozAlign: "right", width: 200 },
    { title: "Advance", field: "avance", hozAlign: "right", width: 100 },
    { 
        title: "% Advance", 
        field: "porcentaje", 
        hozAlign: "left", 
        width: 200,
        formatter: "progress", 
        formatterParams: {
            min: 0,
            max: 100,
            color: "#8C8C8C",
        legend: true
        }
    }
];


var dataTable1 = [
    { cadena: "Sc", objetivo: 100, avance: 20, porcentaje: 20 },
    { cadena: "BA", objetivo: 300, avance: 201, porcentaje: 67 },
    { cadena: "CCFIE", objetivo: 1, avance: 0, porcentaje: 0 }, 
    { cadena: "SORIANA", objetivo: 1, avance: 1, porcentaje: 100 },
    { cadena: "LIVERPOOL", objetivo: 1000, avance: 714, porcentaje: 71 },
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
            formatter: function(value) {
                return value + '%';
            }
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
    labels: ['Advance','Pending'],
    datasets: [
        {
            label: 'Percentage',
            data: [73,27],
            fill: false,
            backgroundColor: ['#0099F9', '#8C8C8C'], 
        },
    ]
};



//----Chart Second
var setOptions2A = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: false,
            text: 'Tienda',
        },
        datalabels: {
            color: 'white',
            font: {
                size: 19
            },
            formatter: function(value) {
                return value ;
            }
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
    scales: {
        x: {
            barPercentage: 0.7,        // Reduce el ancho de la barra (valor entre 0 y 1)
            categoryPercentage: 0.3    // Reduce el espacio que cada categoría ocupa
        },
        y: {
            beginAtZero: true
        }
    }
};

var dataChart2A = {
    labels: ['CCFIE ','Sc', ' BA', 'LIVERPOOL', 'SORIANA'],
    datasets: [
        {
            label: 'Advance',
            data: [0,20,67,71,100],
            fill: false,
            backgroundColor: '#0099F9', 
        },
    ]
};


//-----Data Example Map
const dataMap1 = [
    ['mx-ve', 27], ['mx-gj', 40], ['mx-qt', 21], ['mx-mi', 31], ['mx-hg', 42]
];

const configMap1 = {
    name: 'Numeros',
    states: {
        hover: {
            color: '#0099F9'
        }
    },
    dataLabels: {
        enabled: true,
        format: '{point.name}'
    },
    // 👇 Evento de clic en un estado
    point: {
        events: {
            click: function () {
                const modalElement = document.getElementById('modalFilterFirst');
                if (modalElement) {
                    const eventModal = new bootstrap.Modal(modalElement);
                    eventModal.show();
                } else {
                    console.error('No se encontró el modal con ID: modalFilterFirst');
                }
            }
        }
    }
}