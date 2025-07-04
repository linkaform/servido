//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'card', col: '6', id:'cardFirst', title:'Total de Estaciones de Servicio', hexadecimal:'#FF5733'},
            { type:'card', col: '6', id:'cardSecond', title:'Total Evaluaciones', hexadecimal:'#818C78'},
    ]},
    { class:'', _children : [
        { type:'chart', col: '6', id:'chartFirst', title:'Auditorias por estación'},
        { type:'chart', col: '6', id:'chartSecond', title:'Auditorias por Supervisor'},
        { type:'chart', col: '6', id:'chartThird', title:'Resultados por sección'},
        { type:'chart', col: '6', id:'chartFourth', title:'Histórico por estación'},
    ]},
];

//---Chart First

const dataValues = [73, 27, 55];
const totalValues = [100, 50, 60];

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
            formatter: function (value, context) {
                const index = context.dataIndex;
                const total = totalValues[index] || 1;  // evitar división por cero
                const percentage = ((value / total) * 100).toFixed(1);
                return `${value} / ${percentage}%`;
            }
        },
        tooltip: {
            titleFont: { size: 20 },
            bodyFont: { size: 17 },
            callbacks: {
                label: function (context) {
                    const index = context.dataIndex;
                    const value = context.raw;
                    const total = totalValues[index] || 1;
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${value} / ${percentage}%`;
                }
            }
        }
    },
    maintainAspectRatio: false,
};

var dataChart1A = {
    labels: ['Estación de Servicio 1', 'Estación de Servicio 2', 'Estación de Servicio 3'],
    datasets: [
        {
            label: 'Total',
            data: dataValues,
            fill: false,
            backgroundColor: ['#DC7633', '#EC7063', '#58D68D'],
        },
    ]
};



//---Chart Second
const dataValues2 = [103, 37, 78];
const totalValues2 = [110, 60, 80];

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
            formatter: function (value, context) {
                const index = context.dataIndex;
                const total = totalValues2[index] || 1;  // evitar división por cero
                const percentage = ((value / total) * 100).toFixed(1);
                return `${value} / ${percentage}%`;
            }
        },
        tooltip: {
            titleFont: { size: 20 },
            bodyFont: { size: 17 },
            callbacks: {
                label: function (context) {
                    const index = context.dataIndex;
                    const value = context.raw;
                    const total = totalValues2[index] || 1;
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${value} / ${percentage}%`;
                }
            }
        }
    },
    maintainAspectRatio: false,
};

var dataChart2A = {
    labels: ['Supervisor 1', 'Supervisor 2', 'Supervisor 3'],
    datasets: [
        {
            label: 'Total',
            data: dataValues2,
            fill: false,
            backgroundColor: ['#58D68D', '#DC7633', '#58D68D'],
        },
    ]
};


//---Chart Third
const dataValues3 = [37, 83, 78, 65 , 85];
const totalValues3 = [60, 110, 80, 70, 80];

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
            formatter: function (value, context) {
                const index = context.dataIndex;
                const total = totalValues3[index] || 1;  // evitar división por cero
                const percentage = ((value / total) * 100).toFixed(1);
                return `${value} / ${percentage}%`;
            }
        },
        tooltip: {
            titleFont: { size: 20 },
            bodyFont: { size: 17 },
            callbacks: {
                label: function (context) {
                    const index = context.dataIndex;
                    const value = context.raw;
                    const total = totalValues3[index] || 1;
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${value} / ${percentage}%`;
                }
            }
        }
    },
    maintainAspectRatio: false,
};

var dataChart3A = {
    labels: ['Secciones 1', 'Secciones 2', 'Secciones 3', 'Secciones 4', 'Secciones 5'],
    datasets: [
        {
            label: 'Total',
            data: dataValues3,
            fill: false,
            backgroundColor: ['#DC7633', '#EC7063', '#58D68D','#58D68D','#58D68D'],
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
            color: 'black',
            anchor: 'center',
            align: 'center',
            font: {
                size: 19,
                weight: 'bold'
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

var dataChart4A = {
    labels: ['Enero','Febrero','Marzo','Abril'],
    datasets: [
        {
            label: 'Sucursal 1 ',
            data: [45, 60, 78, 32],
            fill: false,
            backgroundColor: ['#0099F9', '#8C8C8C'],
        },
        {
            label: 'Sucursal 2 ',
            data: [52, 40, 91, 28],
            fill: false,
            backgroundColor: ['#0099F9', '#8C8C8C'],
        },
        {
            label: 'Sucursal 3',
            data: [68, 55, 74, 36],
            fill: false,
            backgroundColor: ['#0099F9', '#8C8C8C'],
        },
        {
            label: 'Sucursal 4',
            data: [81, 33, 59, 47],
            fill: false,
            backgroundColor: ['#0099F9', '#8C8C8C'],
        },
    ]
};
