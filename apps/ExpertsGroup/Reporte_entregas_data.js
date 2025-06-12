//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
        { type:'card', col: '4', id:'cardFirst', title:'Total de Entregas ', hexadecimal:'#416CA6'},
        { type:'card', col: '4', id:'cardSecond', title:'Entregas Realizadas', hexadecimal:'#416CA6'},
        { type:'card', col: '4', id:'cardThird', title:'% de Avance', hexadecimal:'#416CA6'},
    ]},
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartFirst', title:'Porcentaje'},
            { type:'chart', col: '6', id:'chartSecond', title:'Progreso de entrega por tienda'},
    ]},
    { class:'', _children : [
        { type:'card-custom-image', col: '4', id:'cardStoreA', title:'Tienda 1', hexadecimal:'#416CA6'},
        { type:'card-custom-image', col: '4', id:'cardStoreB', title:'TIenda 2', hexadecimal:'#416CA6'},
        { type:'card-custom-image', col: '4', id:'cardStoreC', title:'Tienda 3', hexadecimal:'#416CA6'},
    ]},
    { class:'', _children : [
        { type:'chart', col: '12', id:'chartThird', title:'Progreso de entrega por estado'},
    ]},
    { class:'', _children : [
        { type:'map', col: '12', id:'mapFirst', title:'Mapa'},
    ]},
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartFourth', title:'Acumulado de entregas por día'},
            { type:'chart', col: '6', id:'chartFiveth', title:'Progreso de entrega por sucursal'},
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
    labels: ['Realizado','Faltantes'],
    datasets: [
        {
            label: 'Porcentaje',
            data: [73,27],
            fill: false,
            backgroundColor: ['#416CA6', '#CFCAC7'], 
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
        y: {
            step: 1,
        }
    },
    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true,
            beginAtZero: true
        }
    }
};

var dataChart2A = {
    labels: ['Tienda 1','Tienda 2','Tienda 3','Tienda 4'],
    datasets: [
        {
            label: 'Realizado',
            data: [20, 50, 80, 70],
            fill: false,
            backgroundColor: '#416CA6', 
        },
        {
            label: 'Pendientes',
            data: [80,50,20,30],
            fill: false,
            backgroundColor: '#CFCAC7',
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
        x: {
            stacked: true
        },
        y: {
            stacked: true,
            beginAtZero: true
        }
    }
};

var dataChart3A = {
    labels: ['Guanajuato','Queretaro','Michoacán de Ocampo', 'Veracruz de Ignacio de la Llave','Hidalgo'],
    datasets: [
        {
            label: 'Realizado',
            data: [40, 70, 60, 55, 30],
            fill: false,
            backgroundColor: '#416CA6',
        },
        {
            label: 'Pendientes',
            data: [60, 30, 40, 45, 70],
            fill: false,
            backgroundColor: '#CFCAC7',
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
            label: 'Tienda 1',
            data: [10, 20, 35, 40, 60, 70, 85, 95, 105, 110, 120, 130, 135],
            borderColor: '#999999',
            backgroundColor: '#999999',
            fill: false,
            pointStyle: 'circle',
            pointRadius: 6,
            tension: 0.4
        },
        {
            label: 'Tienda 2',
            data: [5, 10, 20, 30, 35, 50, 60, 70, 75, 80, 90, 100, 105],
            borderColor: '#5B9BD5',
            backgroundColor: '#5B9BD5',
            fill: false,
            pointStyle: 'rectRot',
            pointRadius: 6,
            tension: 0.4
        },
        {
            label: 'Tienda 3',
            data: [15, 30, 55, 70, 95, 120, 145, 165, 180, 190, 210, 230, 240],
            borderColor: '#CFCAC7',
            backgroundColor: '#CFCAC7',
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
    labels: ['Entrega','Pendiente'],
    datasets: [
        {
            label: 'Total',
            data: [20, 80],
            fill: false,
            backgroundColor: ['#416CA6', '#CFCAC7'], 
        },
    ]
};

