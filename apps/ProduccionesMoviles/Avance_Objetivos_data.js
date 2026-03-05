//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
        { type:'separator', col: '12', title:'RESUMEN'},
        { type:'card', col: '3', id:'cardFirst', title:'Objetivo de ventas', hexadecimal:'#FFC133'},
        { type:'card', col: '3', id:'cardSecond', title:'Ventas realizadas', hexadecimal:'#FFE733'},
        { type:'card', col: '3', id:'cardThird', title:'% Avance', hexadecimal:'#D4FF33'},
        { type:'card', col: '3', id:'cardFourth', title:'Visitas Realizadas', hexadecimal:'#FF8D33'},
    ]},
    { class:'', _children : [
        { type:'table', col: '7', id:'tableFirst', title:'Alcance' , optionExpanded:true},
        { type:'chart', col: '5', id:'chartFirst', title:'% Alcance'},
    ]},
    { class:'', _children : [
        { type:'separator', col: '12', title:'DETALLE'},
        { type:'table', col: '7', id:'tableSecond', title:'Cumplimiento por Cadena'},
        { type:'chart', col: '5', id:'chartSecond', title:'% Alcance'},
    ]},
    { class:'', _children : [
        { type:'table', col: '7', id:'tableThird', title:'Cumplimiento por Marca'},
        { type:'chart', col: '5', id:'chartThird', title:'% Alcance'},
    ]},
    { class:'', _children : [
        { type:'table', col: '7', id:'tableFourth', title:'Cumplimiento por Supervisor/Demostrador' , optionExpanded:true},
        { type:'chart', col: '5', id:'chartFourth', title:'% Alcance por Supervisor'},
    ]},
    { class:'', _children : [
        { type:'table', col: '12', id:'tableFiveth', title:'Cumplimiento por Tienda' , optionExpanded:true},
    ]},
];


//-----Configuraciones de la tabla
const moneyFormaterDecimal = {
    decimal: ".",
    thousand: ",",
    symbol: "",
    precision: 0,
    negativeSign: true,
};
const moneyFormaterPercentage = {
    decimal: ".",
    thousand: ",",
    symbol: "%",
    symbolAfter: true
};

const sumRootOnly = function(values, data, calcParams){
    let field = calcParams.field;
    let total = 0;

    data.forEach(row => {
        if (!isNaN(row[field])) {
            total += Number(row[field]);
        }
    });

    return total;
};
const avgRootOnly = function(values, data, calcParams){
    let field = calcParams.field;
    let total = 0;
    let count = 0;

    data.forEach(row => {
        if (!isNaN(row[field])) {
            total += Number(row[field]);
            count++;
        }
    });

    return count ? total / count : 0;
};

function alcanceFormatter(cell){
    let value = cell.getValue();

    // si no existe valor no aplicar formato
    if(value === null || value === undefined || value === ""){
        return "";
    }

    let el = cell.getElement();

    if(value >= 80){
        el.style.backgroundColor = "#2ecc71"; // verde
        el.style.color = "#fff";
    }else{
        el.style.backgroundColor = "#e74c3c"; // rojo
        el.style.color = "#fff";
    }

    return value + "%";
}

let columsTable1 = [
    { title:"Proyecto", field:'proyecto', width:300 },
    { title:"Marca", field:'marca', headerFilter:"input", hozAlign:"center", width:250 },
    { 
        title:"Objetivo",
        field:'objetivo',
        headerFilter:"input",
        hozAlign:"center",
        formatter:"money",
        formatterParams: moneyFormaterDecimal,
        width:150,
        bottomCalc: sumRootOnly,
        bottomCalcParams:{field:"objetivo"},
        bottomCalcFormatter:"money",
        bottomCalcFormatterParams: moneyFormaterDecimal
    },

    { 
        title:"Sell Out",
        field:'sell_out',
        headerFilter:"input",
        hozAlign:"center",
        formatter:"money",
        formatterParams: moneyFormaterDecimal,
        width:150,
        bottomCalc: sumRootOnly,
        bottomCalcParams:{field:"sell_out"},
        bottomCalcFormatter:"money",
        bottomCalcFormatterParams: moneyFormaterDecimal
    },

    { 
        title:"Alcance",
        field:'alcance',
        headerFilter:"input",
        hozAlign:"center",
        formatter:alcanceFormatter,
        width:200,
        bottomCalc: avgRootOnly,
        bottomCalcParams:{field:"alcance"},
        bottomCalcFormatter:"money",
        bottomCalcFormatterParams: moneyFormaterPercentage
    },
];

let dataTable1 = [
    {
        proyecto: "OTC",
        marca: "",
        objetivo: 4836,
        sell_out: 4162,
        alcance: 86.06,
        _children:[
            { proyecto:"Herklin", marca:"", objetivo:2069, sell_out:1832, alcance:88.55 },
            { proyecto:"Kaomycin", marca:"", objetivo:1028, sell_out:899, alcance:87.45 },
            { proyecto:"Venastat", marca:"", objetivo:183, sell_out:206, alcance:112.57 },
            { proyecto:"Picosend", marca:"", objetivo:680, sell_out:442, alcance:65.00 },
            { proyecto:"Eye Mo", marca:"", objetivo:647, sell_out:646, alcance:99.85 },
            { proyecto:"Prindex", marca:"", objetivo:229, sell_out:137, alcance:59.83 },
        ]
    },
    {
        proyecto: "RX",
        marca: "",
        objetivo: 7320,
        sell_out: 6895,
        alcance: 94.19,
        _children: [
            { proyecto:"Cardiovex", marca:"", objetivo:2100, sell_out:1980, alcance:94.29 },
            { proyecto:"Neuroval", marca:"", objetivo:1540, sell_out:1433, alcance:93.05 },
            { proyecto:"Respimol", marca:"", objetivo:980, sell_out:1002, alcance:102.24 },
            { proyecto:"Gastrozen", marca:"", objetivo:1250, sell_out:1187, alcance:94.96 },
            { proyecto:"Dermasol", marca:"", objetivo:1450, sell_out:1293, alcance:89.17 },
        ]
    },
    {
        proyecto: "Genéricos",
        marca: "",
        objetivo: 6150,
        sell_out: 5775,
        alcance: 93.90,
        _children: [
            { proyecto:"Amoxicilina Plus", marca:"", objetivo:1800, sell_out:1725, alcance:95.83 },
            { proyecto:"Ibuprofeno Forte", marca:"", objetivo:1320, sell_out:1210, alcance:91.67 },
            { proyecto:"Loratadina Max", marca:"", objetivo:940, sell_out:905, alcance:96.28 },
            { proyecto:"Omeprazol Pro", marca:"", objetivo:1100, sell_out:990, alcance:90.00 },
            { proyecto:"Metformina XR", marca:"", objetivo:990, sell_out:945, alcance:95.45 },
        ]
    },
    {
        proyecto: "Hospitalario",
        marca: "",
        objetivo: 8450,
        sell_out: 8012,
        alcance: 94.82,
        _children: [
            { proyecto:"Anestex", marca:"", objetivo:2400, sell_out:2305, alcance:96.04 },
            { proyecto:"Antibiox IV", marca:"", objetivo:1950, sell_out:1800, alcance:92.31 },
            { proyecto:"Oncoter", marca:"", objetivo:2100, sell_out:1995, alcance:95.00 },
            { proyecto:"Hemovital", marca:"", objetivo:1200, sell_out:1102, alcance:91.83 },
            { proyecto:"Urocare", marca:"", objetivo:800, sell_out:810, alcance:101.25 },
        ]
    }
];

let columsTable2 = [
    { title:"Cadena", field:'cadena',  width:300},
    { title:"Objetivo", field:'objetivo',  headerFilter:"input",  hozAlign:"center", formatter: "money", formatterParams: moneyFormaterDecimal, width:200},
    { title:"Sell Out", field:'sell_out',  headerFilter:"input",  hozAlign:"center", formatter: "money", formatterParams: moneyFormaterDecimal, width:200},
    { title:"Alcance", field:'alcance',  headerFilter:"input",  hozAlign:"center", formatter:alcanceFormatter, width:200},
];

let dataTable2 = [
    {
        cadena: "Bodega Aurrera",
        objetivo: 2069,
        sell_out: 1832,
        alcance: 88.55,
    },
    {
        cadena: "Calimax",
        objetivo: 1028,
        sell_out: 899,
        alcance: 87.45,
    },
    {
        cadena: "Chedraui",
        objetivo: 183,
        sell_out: 206,
        alcance: 112.57,
    },
];

let columsTable3 = [
    { title:"Cadena", field:'cadena',  width:300},
    { title:"Objetivo", field:'objetivo',  headerFilter:"input",  hozAlign:"center", formatter: "money", formatterParams: moneyFormaterDecimal, width:200},
    { title:"Sell Out", field:'sell_out',  headerFilter:"input",  hozAlign:"center", formatter: "money", formatterParams: moneyFormaterDecimal, width:200},
    { title:"Alcance", field:'alcance',  headerFilter:"input",  hozAlign:"center", formatter:alcanceFormatter, width:200},
];


let dataTable3 = [
    {
        cadena: "Herklin",
        objetivo: 2069,
        sell_out: 1832,
        alcance: 88.55,
    },
    {
        cadena: "Kaomycin",
        objetivo: 1028,
        sell_out: 899,
        alcance: 87.45,
    },
    {
        cadena: "Venastat",
        objetivo: 183,
        sell_out: 206,
        alcance: 112.57,
    },
    {
        cadena: "Picosend",
        objetivo: 680,
        sell_out: 442,
        alcance: 65.00,
    },
    {
        cadena: "Eye Mo",
        objetivo: 647,
        sell_out: 646,
        alcance: 99.85,
    },
    {
        cadena: "Prindex",
        objetivo: 229,
        sell_out: 137,
        alcance: 59.83,
    },
    {
        cadena: "Pilexil",
        objetivo: 270,
        sell_out: 136,
        alcance: 50.37,
    },
    {
        cadena: "Leti At4",
        objetivo: 245,
        sell_out: 126,
        alcance: 51.43,
    },
    {
        cadena: "Leti SR",
        objetivo: 84,
        sell_out: 19,
        alcance: 22.62,
    }
    
];

let columsTable4 = [
    { title:"Supervisor", field:'supervisor',  width:200},
    { title:"Demostrador", field:'demostrador',  width:200},
    { title:"Objetivo", field:'objetivo',  headerFilter:"input",  hozAlign:"center", formatter: "money", formatterParams: moneyFormaterDecimal, width:200},
    { title:"Sell Out", field:'sell_out',  headerFilter:"input",  hozAlign:"center", formatter: "money", formatterParams: moneyFormaterDecimal, width:200},
    { title:"Alcance", field:'alcance',  headerFilter:"input",  hozAlign:"center", formatter:alcanceFormatter, width:200},
];


let dataTable4 = [
    {
        supervisor: "Victor Rodriguez",
        demostrador: "",
        objetivo: 285,
        sell_out: 190,
        alcance: 71.34,
        _children:[
            { demostrador:'Maria Rodriguez', objetivo:150, sell_out:90, alcance:60 },
            { demostrador:'Mariano Escobedo', objetivo:80, sell_out:50, alcance:62.50 },
            { demostrador:'Rocio Cortés', objetivo:55, sell_out:50, alcance:90.91 }
        ]
    },
    {
        supervisor: "Laura Martínez",
        demostrador: "",
        objetivo: 310,
        sell_out: 250,
        alcance: 80.65,
        _children:[
            { demostrador:'Ana López', objetivo:120, sell_out:100, alcance:83.33 },
            { demostrador:'Carlos Méndez', objetivo:100, sell_out:75, alcance:75.00 },
            { demostrador:'Patricia Salinas', objetivo:90, sell_out:75, alcance:83.33 }
        ]
    },
    {
        supervisor: "Jorge Hernández",
        demostrador: "",
        objetivo: 260,
        sell_out: 210,
        alcance: 80.77,
        _children:[
            { demostrador:'Luis Gómez', objetivo:110, sell_out:95, alcance:86.36 },
            { demostrador:'Fernanda Ruiz', objetivo:90, sell_out:70, alcance:77.78 },
            { demostrador:'Pedro Castillo', objetivo:60, sell_out:45, alcance:75.00 }
        ]
    },
    {
        supervisor: "Sandra Castillo",
        demostrador: "",
        objetivo: 295,
        sell_out: 215,
        alcance: 72.88,
        _children:[
            { demostrador:'Daniela Ortega', objetivo:130, sell_out:95, alcance:73.08 },
            { demostrador:'Raúl Navarro', objetivo:95, sell_out:70, alcance:73.68 },
            { demostrador:'Gloria Vega', objetivo:70, sell_out:50, alcance:71.43 }
        ]
    },
    {
        supervisor: "Miguel Torres",
        demostrador: "",
        objetivo: 275,
        sell_out: 205,
        alcance: 74.55,
        _children:[
            { demostrador:'Alejandra Pineda', objetivo:115, sell_out:90, alcance:78.26 },
            { demostrador:'Ricardo Luna', objetivo:95, sell_out:65, alcance:68.42 },
            { demostrador:'Sofia Herrera', objetivo:65, sell_out:50, alcance:76.92 }
        ]
    }
];


let columsTable5 = [
    { title:"Cadena", field:"cadena", tooltipsHeader:true, width:150 },
    { title:"ID", field:"id", hozAlign:"center", tooltipsHeader:true, width:90 },
    { title:"Nombre tienda", field:"nombre_tienda", tooltipsHeader:true, width:220 },
    { title:"Demostrador(a)", field:"demostrador", tooltipsHeader:true, width:220 },
    { title:"Supervisor", field:"supervisor", tooltipsHeader:true, width:200 },
    { title:"Estado", field:"estado", hozAlign:"center", tooltipsHeader:true, width:120 },
    { title:"Objetivo Total", field:"objetivo_total", hozAlign:"center", tooltipsHeader:true, width:150 },
    { title:"Cumplimiento Total", field:"cumplimiento_total", hozAlign:"center", tooltipsHeader:true, width:170 },
    { title:"Alcance Total", field:"alcance_total", hozAlign:"center", formatter:alcanceFormatter, tooltipsHeader:true, width:150 },
];
    
let dataTable5 = [
    {
        cadena:"Soriana",
        id:916,
        nombre_tienda:"Renacimiento",
        demostrador:"Medina Jovita - Vaczate Romero Vic",
        supervisor:"Guerrero",
        estado:"Guerrero",

        objetivo_total:44,
        cumplimiento_total:3,
        alcance_total:7.00,

        _children:[
            { nombre_tienda:'KAOMYCIN', demostrador:'Objetivo: 5', supervisor:'SO: 1' },
            { nombre_tienda:'VENASTAT', demostrador:'Objetivo: 4', supervisor:'SO: 0' },
            { nombre_tienda:'PICOSEND', demostrador:'Objetivo: 3', supervisor:'SO: 2' },
            { nombre_tienda:'EYE-MO', demostrador:'Objetivo: 5', supervisor:'SO: 0' },
            { nombre_tienda:'PRINDEX', demostrador:'Objetivo: 7', supervisor:'SO: 0' }
        ]
    },
    {
        cadena:"Chedraui",
        id:138,
        nombre_tienda:"21500 CHEDRAUI SE",
        demostrador:"Medina Jovita - Vaczate Romero Vic",
        supervisor:"Guerrero",
        estado:"Guerrero",

        objetivo_total:115,
        cumplimiento_total:17,
        alcance_total:15.00,

        _children:[
            { nombre_tienda:'KAOMYCIN', demostrador:'Objetivo: 11', supervisor:'SO: 3' },
            { nombre_tienda:'VENASTAT', demostrador:'Objetivo: 2', supervisor:'SO: 0' },
            { nombre_tienda:'PICOSEND', demostrador:'Objetivo: 80', supervisor:'SO: 9' },
            { nombre_tienda:'EYE-MO', demostrador:'Objetivo: 10', supervisor:'SO: 1' },
            { nombre_tienda:'PRINDEX', demostrador:'Objetivo: 3', supervisor:'SO: 1' }
        ]
    },
    {
        cadena:"Walmart",
        id:3851,
        nombre_tienda:"SC AEROPUERTO",
        demostrador:"Ancas Montes Nanzate Romero Vic",
        supervisor:"CDMX",
        estado:"CDMX",

        objetivo_total:59,
        cumplimiento_total:45,
        alcance_total:76.00,

        _children:[
            { nombre_tienda:'KAOMYCIN', demostrador:'Objetivo: 14', supervisor:'SO: 11' },
            { nombre_tienda:'VENASTAT', demostrador:'Objetivo: 0', supervisor:'SO: 0' },
            { nombre_tienda:'PICOSEND', demostrador:'Objetivo: 5', supervisor:'SO: 4' },
            { nombre_tienda:'EYE-MO', demostrador:'Objetivo: 16', supervisor:'SO: 12' },
            { nombre_tienda:'PRINDEX', demostrador:'Objetivo: 2', supervisor:'SO: 0' }
        ]
    },
    {
        cadena:"Walmart",
        id:2033,
        nombre_tienda:"SC PLAZA ORIENTE",
        demostrador:"Ancas Montes Nanzate Romero Vic",
        supervisor:"CDMX",
        estado:"CDMX",

        objetivo_total:98,
        cumplimiento_total:73,
        alcance_total:80.00,

        _children:[
            { nombre_tienda:'KAOMYCIN', demostrador:'Objetivo: 19', supervisor:'SO: 13' },
            { nombre_tienda:'VENASTAT', demostrador:'Objetivo: 0', supervisor:'SO: 0' },
            { nombre_tienda:'PICOSEND', demostrador:'Objetivo: 15', supervisor:'SO: 9' },
            { nombre_tienda:'EYE-MO', demostrador:'Objetivo: 15', supervisor:'SO: 11' },
            { nombre_tienda:'PRINDEX', demostrador:'Objetivo: 5', supervisor:'SO: 1' }
        ]
    }
];

//-----Configuiraciónes de las graficas
let setOptions1 = {
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
                size: 18
            },
            formatter: function (value, context){
                return value + '%' ;
            }
        }
    },
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

let dataChart1 = {
    labels: ['Cumplido','Faltante'],
    datasets: [
        {
            label: 'Procentaje %',
            data: [40, 60],
            fill: false,
        },
    ]
};

let setOptions2 = {
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
                size: 18
            },
            formatter: function (value, context){
                return value + '%' ;
            }
        }
    },
    maintainAspectRatio: false ,
};

let dataChart2 = {
    labels: ["Bodega Aurrera", "Calimax", "Chedraui"],
    datasets: [
        {
            label: 'Procentaje %',
            data: [88.55, 87.45, 112.57],
            fill: false,
        },
    ]
};

let setOptions3 = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        datalabels: {
            color: 'white',
            font: { size: 15 },
            formatter: function(value){
                return value + '%';
            }
        },

        annotation: {
            annotations: {
                meta100: {
                    type: 'line',
                    yMin: 100,
                    yMax: 100,
                    borderColor: 'red',
                    borderWidth: 2,
                    borderDash: [6,6],
                    label: {
                        display: true,
                        content: 'Meta 100%',
                        position: 'end'
                    }
                }
            }
        }
    },

    scales:{
        y:{
            beginAtZero:true
        }
    },

    maintainAspectRatio:false
};

let dataChart3 = {
    labels: ["Herklin","Kaomycin","Venastat","Picosend","Eye Mo","Prindex","Pilexil","Leti At4", "Leti SR"],
        datasets: [
        {
            label: "Porcentaje %",
            data: [88.55, 87.45, 112.57, 65.00, 99.85, 59.83, 50.37, 51.43, 22.62],
            fill: false,
        },
    ]
};


let setOptions4 = {
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
                size: 15
            },
            formatter: function (value, context){
                return value + '%' ;
            }
        }
    },
    maintainAspectRatio: false ,
};

let dataChart4 = {
    labels: ["Laura Martínez","Jorge Hernández","Miguel Torres","Sandra Castillo","Victor Rodriguez"],
    datasets: [
        {
            label: "Porcentaje %",
            data: [80.65,80.77,74.55,72.88,71.34],
            fill: false,
        },
    ]
};
