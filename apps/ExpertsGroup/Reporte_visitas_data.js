//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '8', id:'tableFirst', title:'Table chain'},
            { type:'chart', col: '4', id:'chartFirst', title:'Progress Total'},
            { type:'map', col: '12', id:'mapFirst', title:'Map'},
    ]},
   
];


//----Table
var columsTable1 = [
    { title: "Chain", field: "cadena", hozAlign: "left", width: 300 },
    { title: "Objective", field: "objetivo", hozAlign: "left", width: 200 },
    { title: "Advance", field: "avance", hozAlign: "left", width: 200 },
    { 
        title: "% Advance", 
        field: "porcentaje", 
        hozAlign: "left", 
        width: 200,
        formatter: "progress", 
        formatterParams: {
            min: 0,
            max: 100,
            color: "8C8C8C",
            legend: true
        }
    }
];


var dataTable1 = [
    { cadena: "Sc", objetivo: 100, avance: 20, porcentaje: 20 ,},
    { cadena: "BA", objetivo: 300, avance: 201, porcentaje: 67 ,},
    { cadena: "CCFIE", objetivo: 1, avance: 0, porcentaje: 0,}, 
    { cadena: "SORIANA", objetivo: 1, avance: 1, porcentaje: 100 ,},
    { cadena: "LIVERPOOL", objetivo: 1000, avance: 714, porcentaje: 71 ,},
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


//-----Data Example Map
const dataMap1 = [
    ['mx-ve', 27], ['mx-gj', 40], ['mx-qt', 21], ['mx-mi', 31], ['mx-hg', 42],["mx-nle", 41],["mx-mex", 2]
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
}