//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'separator', col: '12', title:'Hurtos'},
            { type:'chart', col: '6', id:'chartFirst', title:'Tipo de Incidencia', filterCustom : true},
            { type:'chart', col: '6', id:'chartSecond', title:'Tipo de novedad', filterCustom : true},
            { type:'chart', col: '6', id:'chartThird', title:'Incidencias Totales',chartChange : true},
            { type:'chart', col: '6', id:'chartFourth', title:'Novedades Totales',chartChange : true},
            { type:'chart', col: '12', id:'chartFiveth', title:'Retenciones y Recuperaciones',chartChange : true},
        ] 
    },
    { class:'', _children : [
            { type:'separator', col: '12', title:'Objetos Extraviados'},
            { type:'chart', col: '12', id:'chartSixth', title:'Elementos Encontrados',filterCustom : true},
        ] 
    },
    { class:'', _children : [
            /*Filtrado de graficas */
            { type:'modal', col: '12', id:'modalFilterFirst', title:'Filtrado de Tipo de Incidencia', optionButtonModal:true, formElements : [
                    {type:'switch', title:'Grafíca por Día', id:'switch1A', name:'switchChartFirst', checked:'checked' },
                    {type:'switch', title:'Grafíca por Cuadrante', id:'switch1B', name:'switchChartFirst'},
                ]
            },
            { type:'modal', col: '12', id:'modalFilterSecond', title:'Filtrado de Tipo de Novedad', optionButtonModal:true, formElements : [
                    {type:'switch', title:'Grafíca por Día', id:'switch2A', name:'switchChartSecond', checked:'checked' },
                    {type:'switch', title:'Grafíca por Cuadrante', id:'switch2B', name:'switchChartSecond'},
                ]
            },
            { type:'modal', col: '12', id:'modalFilterSixth', title:'Filtrado de Retenciones y Recuperaciones', optionButtonModal:true, formElements : [
                    {type:'switch', title:'Grafíca por Cuadrante', id:'switch6A', name:'switchChartSixth', checked:'checked' },
                    {type:'switch', title:'Grafíca por Día', id:'switch6B', name:'switchChartSixth'},
                    {type:'switch', title:'Grafíca por Hora', id:'switch6C', name:'switchChartSixth'},
                    {type:'switch', title:'Grafíca por Piso', id:'switch6D', name:'switchChartSixth'},
                ]
            },

            /*Cambio de graficas */
            { type:'modal', col: '12', id:'modalFilterThird', title:'Tipo de Grafíca por Incidencias Totales', optionButtonModal:true, formElements : [
                    {type:'switch', title:'Grafíca de tipo Barra Horizontal', id:'switch3BarHorizontal', name:'switchChartThird', checked:'checked' },
                    {type:'switch', title:'Grafíca de tipo Barra Vertical', id:'switch3Bar', name:'switchChartThird'},
                    {type:'switch', title:'Grafíca de tipo Tendencia', id:'switch3Line', name:'switchChartThird'},
                    {type:'switch', title:'Grafíca de tipo Pie', id:'switch3Pie', name:'switchChartThird'},
                ]
            },
            { type:'modal', col: '12', id:'modalFilterFourth', title:'Tipo de Grafíca por Novedades Totales', optionButtonModal:true, formElements : [
                    {type:'switch', title:'Grafíca de tipo Barra Vertical', id:'switch4Bar', name:'switchChartFourth', checked:'checked' },
                    {type:'switch', title:'Grafíca de tipo Barra Horizontal', id:'switch4BarHorizontal', name:'switchChartFourth'},
                    {type:'switch', title:'Grafíca de tipo Tendencia', id:'switch4Line', name:'switchChartFourth'},
                    {type:'switch', title:'Grafíca de tipo Pie', id:'switch4Pie', name:'switchChartFourth'},
                ]
            },
            { type:'modal', col: '12', id:'modalFilterFiveth', title:'Tipo de Grafíca por Retenciones y Recuperaciones', optionButtonModal:true, formElements : [
                    {type:'switch', title:'Grafíca de tipo Barra Horizontal', id:'switch5BarHorizontal', name:'switchChartFiveth', checked:'checked' },
                    {type:'switch', title:'Grafíca de tipo Barra Vertical', id:'switch5Bar', name:'switchChartFiveth'},
                    {type:'switch', title:'Grafíca de tipo Tendencia', id:'switch5Line', name:'switchChartFiveth'},
                    {type:'switch', title:'Grafíca de tipo Pie', id:'switch5Pie', name:'switchChartFiveth'},
                ]
            },
        ] 
    },
];



//---Chart First
var setOptions1A = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: true,
            text: 'Tipo de Incidencia / Día',
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
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
};

var setOptions1B = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: true,
            text: 'Tipo de Incidencia / Cuadrante',
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
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
};

var dataChart1A = {
    labels: ['Lunes','Martes','Miércoles','Jueves','Viernes','Sabado','Domingo'],
    datasets: [
        {
            label: 'Hurto',
            data: [0,2,1,1,2,3,1],
            fill: false,
            backgroundColor: '#FF5733', 
        },
        {
            label: 'Olvido',
            data: [2,1,1,2,1,1,3],
            fill: false,
            backgroundColor: '#33FF57',
        },
        {
            label: 'Recuperación',
            data: [0,5,2,5,3,5,3],
            fill: false,
            backgroundColor: '#3357FF', 
        },
    ]
};

var dataChart1B = {
    labels: ['C1','C2','C3','C4','C5'],
    datasets: [
        {
            label: 'Hurto',
            data: [2,1,0,0,3],
            fill: false,
            backgroundColor: '#FF5733', 
        },
        {
            label: 'Olvido',
            data: [1,0,0,0,2],
            fill: false,
            backgroundColor: '#33FF57',
        },
        {
            label: 'Recuperación',
            data: [1,0,0,0,0],
            fill: false,
            backgroundColor: '#3357FF', 
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
            display: true,
            text: 'Tipo de Novedad / Día',
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
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
};

var setOptions2B = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: true,
            text: 'Tipo de Novedad / Cuadrante',
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
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
};

var dataChart2A = {
    labels: ['Lunes','Martes','Miércoles','Jueves','Viernes','Sabado','Domingo'],
    datasets: [
        {
            label: 'Hurto a cliente en local',
            data: [0,2,1,1,2,3,1],
            fill: false,
            backgroundColor: '#FF5733', 
        },
        {
            label: 'Hurto interno en local',
            data: [2,1,1,2,1,1,3],
            fill: false,
            backgroundColor: '#33FF57',
        },
        {
            label: 'Hurto interno en Stand',
            data: [0,5,2,5,3,5,3],
            fill: false,
            backgroundColor: '#3357FF', 
        },
        {
            label: 'Hurto  Externo',
            data: [0,5,2,1,3,5,3],
            fill: false,
            backgroundColor: '#3357FF', 
        },
        {
            label: 'Hurto  moto/descuido',
            data: [0,3,5,5,1,3,3],
            fill: false,
            backgroundColor: '#3357FF', 
        },
    ]
};

var dataChart2B = {
    labels: ['C1','C2','C3','C4','C5'],
    datasets: [
        {
            label: 'Hurto a cliente en local',
            data: [0,2,1,1,2],
            fill: false,
            backgroundColor: '#FF5733', 
        },
        {
            label: 'Hurto interno en local',
            data: [2,1,1,2,1],
            fill: false,
            backgroundColor: '#33FF57',
        },
        {
            label: 'Hurto interno en Stand',
            data: [0,5,2,5,3],
            fill: false,
            backgroundColor: '#3357FF', 
        },
        {
            label: 'Hurto  Externo',
            data: [0,5,2,1,3],
            fill: false,
            backgroundColor: '#3357FF', 
        },
        {
            label: 'Hurto  moto/descuido',
            data: [0,3,5,5,1],
            fill: false,
            backgroundColor: '#3357FF', 
        },
    ]
};


//----Chart Third
var setOptions3BarHorizontal = {
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
                size: 15
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
    indexAxis: 'y',
    scales: {
        y: {
            step: 1,
        },
        x: {
            beginAtZero: true
        }
    },
};

var setOptions3Bar = {
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
                size: 15
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
        },
    },
};

var setOptions3Pie = {
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
                size: 15
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

var dataChart3 = {
    labels: ['Hurto','Olvido','Recuperación'],
    datasets: [
        {
            label: 'Total',
            data: [5,3,2,],
            fill: false,
            backgroundColor: '#FF5733', 
        },
    ]
};

//----Chart Fourth
var setOptions4BarHorizontal = {
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
                size: 15
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
    indexAxis: 'y',
    scales: {
        y: {
            step: 1,
        },
        x: {
            beginAtZero: true
        }
    },
};

var setOptions4Bar = {
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
                size: 15
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
        },
    },
};

var setOptions4Pie = {
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
                size: 15
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


var dataChart4 = {
    labels: ['Hurto a cliente en local','Hurto interno en local','Hurto interno en Stand','Hurto  Externo','Hurto  moto/descuido'],
    datasets: [
        {
            label: 'Total',
            data: [5,3,2,8,9,3,4,0,2],
            fill: false,
            backgroundColor: '#FF5733', 
        },
    ]
};


//----Chart Fiveth
var setOptions5BarHorizontal = {
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
                size: 15
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
    indexAxis: 'y',
    scales: {
        y: {
            step: 1,
        },
        x: {
            beginAtZero: true
        }
    },
};

var setOptions5Bar = {
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
                size: 15
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
        },
    },
};

var setOptions5Pie = {
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
                size: 15
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



var dataChart5 = {
    labels: ['Personas Retenidas','Denuncias','Recuperaciones'],
    datasets: [
        {
            label: 'Total',
            data: [27,17,23],
            fill: false,
            backgroundColor: '#FF5733', 
        },
    ]
};

//----Chart Sixth 
var setOptions6A = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: true,
            title:'Elementos Encontrados / Cuadrante'
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
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
        },
    },
};

var setOptions6B = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: true,
            title:'Elementos Encontrados / Día'
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
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
        },
    },
};

var setOptions6C = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: true,
            title:'Elementos Encontrados / Hora'
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
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
        },
    },
};

var setOptions6D = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: true,
            title:'Elementos Encontrados / Piso'
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
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
        },
    },
};

var dataChart6A = {
    labels: ['C1','C2','C3','C4','C5'],
    datasets: [
        {
            label: 'Octubre',
            data: [39,45,7,10,0,9],
            fill: false,
            backgroundColor: '#FF5733', 
        },
        {
            label: 'Noviembre',
            data: [23,26,16,10,0,9],
            fill: false,
            backgroundColor: '#3357FF', 
        },
    ]
};

var dataChart6B = {
    labels: ['Lunes','Martes','Miércoles','Jueves','Viernes','Sabado','Domingo'],
    datasets: [
        {
            label: 'Octubre',
            data: [30,35,7,10,0,9,40],
            fill: false,
            backgroundColor: '#FF5733', 
        },
        {
            label: 'Noviembre',
            data: [20,36,16,10,10,9,15],
            fill: false,
            backgroundColor: '#3357FF', 
        },
    ]
};

var dataChart6C = {
    labels: ['06:00 a 10:59','11:00 a 15:59','16:00 a 20:59','21:00 a 01:59','02:00 a 5:59'],
    datasets: [
        {
            label: 'Octubre',
            data: [36,0,228,51,5],
            fill: false,
            backgroundColor: '#FF5733', 
        },
        {
            label: 'Noviembre',
            data: [42,0,182,28,0],
            fill: false,
            backgroundColor: '#3357FF', 
        },
    ]
};

var dataChart6D = {
    labels: ['Piso 1','Piso 2','Piso 3', 'Sotano 1', 'Sotano 2'],
    datasets: [
        {
            label: 'Octubre',
            data: [163,81,130,140,6],
            fill: false,
            backgroundColor: '#FF5733', 
        },
        {
            label: 'Noviembre',
            data: [107,34,130,110,2],
            fill: false,
            backgroundColor: '#3357FF', 
        },
    ]
};


//-----Configuiraciónes de las graficas
let dicOptionsChart = [
    {'key':'switch1ALine','id':'chartFirst','data': dataChart1A, 'configs': setOptions1A},
    {'key':'switch1B','id':'chartFirst','data': dataChart1B, 'configs': setOptions1B},
    {'key':'switch2A','id':'chartSecond','data': dataChart2A, 'configs': setOptions2A},
    {'key':'switch2B','id':'chartSecond','data': dataChart2B, 'configs': setOptions2B},
    {'key':'switch6A','id':'chartSixth','data': dataChart6A, 'configs': setOptions6A},
    {'key':'switch6B','id':'chartSixth','data': dataChart6B, 'configs': setOptions6B},
    {'key':'switch6C','id':'chartSixth','data': dataChart6C, 'configs': setOptions6C},
    {'key':'switch6D','id':'chartSixth','data': dataChart6D, 'configs': setOptions6D},
]


let dicOptionsChartTotals = [
    {'key':'switch3BarHorizontal', 'id':'chartThird','data': dataChart3, 'configs': setOptions3BarHorizontal, 'type':'bar'},
    {'key':'switch3Bar', 'id':'chartThird','data': dataChart3, 'configs': setOptions3Bar, 'type':'bar'},
    {'key':'switch3Line', 'id':'chartThird','data': dataChart3, 'configs': setOptions3Bar, 'type':'line'},
    {'key':'switch3Pie', 'id':'chartThird','data': dataChart3, 'configs': setOptions3Pie, 'type':'pie'},

    {'key':'switch4BarHorizontal', 'id':'chartFourth','data': dataChart4, 'configs': setOptions4BarHorizontal, 'type':'bar'},
    {'key':'switch4Bar', 'id':'chartFourth','data': dataChart4, 'configs': setOptions4Bar, 'type':'bar'},
    {'key':'switch4Line', 'id':'chartFourth','data': dataChart4, 'configs': setOptions4Bar, 'type':'line'},
    {'key':'switch4Pie', 'id':'chartFourth','data': dataChart4, 'configs': setOptions4Pie, 'type':'pie'},

    {'key':'switch5Bar', 'id':'chartFiveth','data': dataChart5, 'configs': setOptions5Bar, 'type':'bar'},
    {'key':'switch5BarHorizontal', 'id':'chartFiveth','data': dataChart5, 'configs': setOptions5BarHorizontal, 'type':'bar'},
    {'key':'switch5Line', 'id':'chartFiveth','data': dataChart5, 'configs': setOptions5Bar, 'type':'line'},
    {'key':'switch5Pie', 'id':'chartFiveth','data': dataChart5, 'configs': setOptions5Pie, 'type':'pie'},
]














