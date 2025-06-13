//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
        { type:'card', col: '4', id:'cardFirst', title:'Total Deliveries to be Made', hexadecimal:'#0099F9'},
        { type:'card', col: '4', id:'cardSecond', title:'Deliveries Made', hexadecimal:'#0099F9'},
        { type:'card', col: '4', id:'cardThird', title:'% Progress', hexadecimal:'#0099F9'},
    ]},
    { class:'', _children : [
            { type:'chart', col: '8', id:'chartFirst', title:'Percentage'},
            { type:'chart', col: '4', id:'chartSecond', title:'Delivery progress by store'},
    ]},
    { class:'', _children : [
        { type:'card-custom-image', col: '4', id:'cardStoreA', title:'OXXO', hexadecimal:'#0099F9',
            fileURL:'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/684b242e9cdc856478e11330.png'
        },
        { type:'card-custom-image', col: '4', id:'cardStoreB', title:'Fragua', hexadecimal:'#0099F9',
            fileURL:'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/684b242d9cdc856478e1132f.png'
        },
        { type:'card-custom-image', col: '4', id:'cardStoreC', title:'Neto', hexadecimal:'#0099F9',
            fileURL:'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/684b242c9cdc856478e1132e.png'
        },
    ]},
    { class:'', _children : [
        { type:'chart', col: '12', id:'chartThird', title:'Delivery progress by status'},
    ]},
    { class:'', _children : [
        { type:'map', col: '12', id:'mapFirst', title:'Mapa'},
    ]},
    { class:'', _children : [
        { type:'chart', col: '6', id:'chartFourth', title:'Accumulated deliveries per day'},
        { type:'chart', col: '6', id:'chartFiveth', title:'Delivery progress by Brand'},
    ]},
    { class:'', _children : [
        { type:'modal', col: '12', id:'modalFilterFirst', title:'Datos de Estado', optionButtonModal:true, formElements : [
                {type:'p', title:'Deliveries made : 90', id:'textA'},
                {type:'p', title:'Pending deliveries: 50', id:'textA'},
                {type:'p', title:'Percentage : 50', id:'textA'},
            ]
        },
            
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
    labels: ['Deliveries Made','Deliveries to be Made'],
    datasets: [
        {
            label: 'Porcentaje',
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
    scales: {
        x: {
            barPercentage: 0.8,        // Reduce el ancho de la barra (valor entre 0 y 1)
            categoryPercentage: 0.5    // Reduce el espacio que cada categoría ocupa
        },
        y: {
            beginAtZero: true
        }
    }
};

var dataChart2A = {
    labels: ['OXXO', 'Fragua', 'Neto'],
    datasets: [
        {
            label: 'Deliveries Made',
            data: [20, 50, 80],
            backgroundColor: '#0099F9',
            barPercentage: 0.7,        
            categoryPercentage: 0.6    
        },
    ]
};


//----Chart Third
var setOptions3A = {
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
    scales: {
        y: {
            step: 1,
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

var dataChart3A = {
    labels: ['Guanajuato','Queretaro','Michoacán de Ocampo', 'Veracruz de Ignacio de la Llave','Hidalgo'],
    datasets: [
        {
            label: 'Deliveries Made',
            data: [30, 40, 55,  60,  70, ],
            fill: false,
            barPercentage: 0.5,        
            categoryPercentage: 0.5,
            backgroundColor: '#0099F9',
        },
    ]
};

//----Chart Fourth
var setOptions4A = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: false,
        },
        datalabels: {
            color: 'black',
            font: {
                size: 19
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
    indexAxis: 'x',
    scales: {
        y: {
            title: {
                display: true,
                text: 'Cantidad'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Fecha'
            }
        }
    }
};

var dataChart4A = {
    labels: [
        '03/05/2023', '05/05/2023', '08/05/2023', '10/05/2023', '12/05/2023',
        '15/05/2023', '17/05/2023', '19/05/2023', '22/05/2023', '24/05/2023',
        '26/05/2023', '29/05/2023', '31/05/2023'
      ],
    datasets: [
        {
            label: 'Oxxo',
            data: [10, 20, 35, 40, 60, 70, 85, 95, 105, 110, 120, 130, 135],
            borderColor: '#999999',
            backgroundColor: '#999999',
            fill: false,
            pointStyle: 'circle',
            pointRadius: 6,
            tension: 0.4
        },
        {
            label: 'Fragua',
            data: [5, 10, 20, 30, 35, 50, 60, 70, 75, 80, 90, 100, 105],
            borderColor: '#5B9BD5',
            backgroundColor: '#5B9BD5',
            fill: false,
            pointStyle: 'rectRot',
            pointRadius: 6,
            tension: 0.4
        },
        {
            label: 'Neto',
            data: [15, 30, 55, 70, 95, 120, 145, 165, 180, 190, 210, 230, 240],
            borderColor: '#8C8C8C',
            backgroundColor: '#8C8C8C',
            fill: true,
            pointStyle: 'circle',
            pointRadius: 4,
            tension: 0.4
        }
      ]
};

//----Chart Fiveth
var setOptions5A = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: false,
        },
        datalabels: {
            color: 'white',
            font: {
                size: 19
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
        y: {
            display: false,
        },
        x: {
            display: false,
        }
    },
};

var dataChart5A = {
    labels: ['Deliveries Made','Deliveries to be Made'],
    datasets: [
        {
            label: 'Total',
            data: [20, 80],
            fill: false,
            backgroundColor: ['#0099F9', '#8C8C8C'], 
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