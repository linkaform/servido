//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'card', col: '2', id:'cardFirst', title:'Tareas en Curso', hexadecimal:'#FFC133'},
            { type:'card', col: '2', id:'cardSecond', title:'Tareas En Pruebas', hexadecimal:'#FFE733'},
            { type:'card', col: '2', id:'cardThird', title:'Tareas Pendientes', hexadecimal:'#D4FF33'},
            { type:'card', col: '2', id:'cardFourth', title:'Horas No Facturables', hexadecimal:'#FF8D33'},
            { type:'card', col: '2', id:'cardFiveth', title:'Horas Facturables', hexadecimal:'#FF5733'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '12', id:'chartFirst', title:'Horas X Día'},
        ] 
    },
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Reporte Ordenes de Trabajo'},
        ] 
    },
];


//-----Configuraciones de la tabla
let columsTable1 = [
    { title:"Usuario", field:'usuario',frozen:true,  width:200},
    {title:"Horas", hozAlign:"center" ,
        columns:[
            {title:"Ayer", field:'horas_ayer',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",bottomCalcParams:{precision:0}, width:150},
            {title:"Semana", field:'horas_semana',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",bottomCalcParams:{precision:0}, width:150},
            {title:"Mes", field:'horas_mes',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",bottomCalcParams:{precision:0}, width:150},
            {title:"Estimadas", field:'horas_estimadas',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",bottomCalcParams:{precision:0}, width:150},
        ]
    },
    {title:"Horas Facturación", hozAlign:"center",
        columns:[
            {title:"Facturables Ayer", field:'facurables_horas_ayer',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",bottomCalcParams:{precision:0}, width:150},
            {title:"No Facturables Ayer", field:'no_facturables_horas_ayer',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",bottomCalcParams:{precision:0}, width:150},
            {title:"Facturables semana", field:'facurables_horas_semana',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",bottomCalcParams:{precision:0}, width:150},
            {title:"No Facturables semana", field:'no_facturables_horas_semana',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",bottomCalcParams:{precision:0}, width:150},
            {title:"Facturables mes", field:'facurables_horas_mes',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",bottomCalcParams:{precision:0}, width:150},
            {title:"No Facturables mes", field:'no_facturables_horas_mes',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",bottomCalcParams:{precision:0}, width:150},
        ]
    },
    {title:"Tareas", hozAlign:"center",
        columns:[
            {title:"Pendientes", field:'tareas_pendientes',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",bottomCalcParams:{precision:0}, width:150},
            {title:"En Curso", field:'tareas_encurso',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",bottomCalcParams:{precision:0}, width:150},
            {title:"En pruebas y revisión", field:'tareas_pruebas',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",bottomCalcParams:{precision:0}, width:150},
            {title:"Pausadas", field:'tareas_pausadas',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",bottomCalcParams:{precision:0}, width:150},
        ]
    },
];

var dataTable1 = [
  {
    "usuario": 'Roman',
    "horas_ayer": '10',
    "horas_semana": '35',
    "horas_mes": '90',
    "horas_pendientes": '10',
    "horas_pendientes_aut": '5',
    "horas_sin_estimacion": '10',
    "tareas_pendientes": '10',
    "tareas_pruebas": '5',
    "tareas_encurso": '10',
    "tareas_pausadas": '10',
    "facurables_horas_ayer": '5',
    "no_facturables_horas_ayer": '5',
    "facurables_horas_semana": '20',
    "no_facturables_horas_semana": '15',
    "facurables_horas_mes": '50',
    "no_facturables_horas_mes": '90',

  },
  {
    "usuario": 'Josue',
    "horas_ayer": '10',
    "horas_semana": '35',
    "horas_mes": '90',
    "horas_pendientes": '10',
    "horas_pendientes_aut": '5',
    "horas_sin_estimacion": '10',
    "tareas_pendientes": '10',
    "tareas_pruebas": '5',
    "tareas_encurso": '10',
    "tareas_pausadas": '10',
        "facurables_horas_ayer": '5',
    "no_facturables_horas_ayer": '5',
    "facurables_horas_semana": '20',
    "no_facturables_horas_semana": '15',
    "facurables_horas_mes": '50',
    "no_facturables_horas_mes": '90',

  },
    {
    "usuario": 'Misael',
    "horas_ayer": '10',
    "horas_semana": '35',
    "horas_mes": '90',
    "horas_pendientes": '10',
    "horas_pendientes_aut": '5',
    "horas_sin_estimacion": '10',
    "tareas_pendientes": '10',
    "tareas_pruebas": '5',
    "tareas_encurso": '10',
    "tareas_pausadas": '10',
        "facurables_horas_ayer": '5',
    "no_facturables_horas_ayer": '5',
    "facurables_horas_semana": '20',
    "no_facturables_horas_semana": '15',
    "facurables_horas_mes": '50',
    "no_facturables_horas_mes": '90',

  },
  {
    "usuario": 'Jose Pato',
    "horas_ayer": '10',
    "horas_semana": '35',
    "horas_mes": '90',
    "horas_pendientes": '10',
    "horas_pendientes_aut": '5',
    "horas_sin_estimacion": '10',
    "tareas_pendientes": '10',
    "tareas_pruebas": '5',
    "tareas_encurso": '10',
    "tareas_pausadas": '10',
    "facurables_horas_ayer": '5',
    "no_facturables_horas_ayer": '5',
    "facurables_horas_semana": '20',
    "no_facturables_horas_semana": '15',
    "facurables_horas_mes": '50',
    "no_facturables_horas_mes": '90',

  },
  {
    "usuario": 'Jose Pato',
    "horas_ayer": '10',
    "horas_semana": '35',
    "horas_mes": '90',
    "horas_pendientes": '10',
    "horas_pendientes_aut": '5',
    "horas_sin_estimacion": '10',
    "tareas_pendientes": '10',
    "tareas_pruebas": '5',
    "tareas_encurso": '10',
    "tareas_pausadas": '10',
    "facurables_horas_ayer": '5',
    "no_facturables_horas_ayer": '5',
    "facurables_horas_semana": '20',
    "no_facturables_horas_semana": '15',
    "facurables_horas_mes": '50',
    "no_facturables_horas_mes": '90',

  },
  {
    "usuario": 'Jose Pato',
    "horas_ayer": '10',
    "horas_semana": '35',
    "horas_mes": '90',
    "horas_pendientes": '10',
    "horas_pendientes_aut": '5',
    "horas_sin_estimacion": '10',
    "tareas_pendientes": '10',
    "tareas_pruebas": '5',
    "tareas_encurso": '10',
    "tareas_pausadas": '10',
    "facurables_horas_ayer": '5',
    "no_facturables_horas_ayer": '5',
    "facurables_horas_semana": '20',
    "no_facturables_horas_semana": '15',
    "facurables_horas_mes": '50',
    "no_facturables_horas_mes": '90',

  },
  {
    "usuario": 'Jose Pato',
    "horas_ayer": '10',
    "horas_semana": '35',
    "horas_mes": '90',
    "horas_pendientes": '10',
    "horas_pendientes_aut": '5',
    "horas_sin_estimacion": '10',
    "tareas_pendientes": '10',
    "tareas_pruebas": '5',
    "tareas_encurso": '10',
    "tareas_pausadas": '10',
    "facurables_horas_ayer": '5',
    "no_facturables_horas_ayer": '5',
    "facurables_horas_semana": '20',
    "no_facturables_horas_semana": '15',
    "facurables_horas_mes": '50',
    "no_facturables_horas_mes": '90',

  },{
    "usuario": 'Jose Pato',
    "horas_ayer": '10',
    "horas_semana": '35',
    "horas_mes": '90',
    "horas_pendientes": '10',
    "horas_pendientes_aut": '5',
    "horas_sin_estimacion": '10',
    "tareas_pendientes": '10',
    "tareas_pruebas": '5',
    "tareas_encurso": '10',
    "tareas_pausadas": '10',
    "facurables_horas_ayer": '5',
    "no_facturables_horas_ayer": '5',
    "facurables_horas_semana": '20',
    "no_facturables_horas_semana": '15',
    "facurables_horas_mes": '50',
    "no_facturables_horas_mes": '90',

  },
  
];

//-----Configuiraciónes de las graficas
var setOptions1 = {
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
      }
    },
    maintainAspectRatio: false ,
    scales: {
    y: {
        step: 1,
    }
  },
};



var dataChart1 = {
    labels: ['01-Oct','02-Oct','03-Oct','04-Oct','05-Oct'],
    datasets: [
        {
            label: 'Horas Facturables',
            data: [135, 120, 140, 110, 125],
            fill: false,
        },
        {
            label: 'Horas No facturables',
            data: [90, 100, 95, 105, 110],
            fill: false,
        },
    ]
};


//----Test
let colTest =  [
    {
      "headerFilter": "input",
      "title": "Plant Code",
      "frozen": false,
      "hozAlign": "left",
      "field": "plant_code",
      "with": 150
    },
    {
      "headerFilter": "input",
      "title": "Botanical Name",
      "frozen": false,
      "hozAlign": "left",
      "field": "plant_name",
      "with": 150
    },
    {
      "headerFilter": "input",
      "title": "Row Type",
      "frozen": false,
      "hozAlign": "left",
      "field": "row_type",
      "with": 150
    },
    {
      "formatterParams": {
        "symbol": "",
        "symbolAfter": "",
        "decimal": ".",
        "thousand": ",",
        "precision": 0
      },
      "title": "Total",
      "frozen": false,
      "hozAlign": "right",
      "field": "total",
      "formatter": "money",
      "with": 150
    },
    {
      "formatterParams": {
        "symbol": "",
        "symbolAfter": "",
        "decimal": ".",
        "thousand": ",",
        "precision": 0
      },
      "title": "202505",
      "frozen": false,
      "hozAlign": "right",
      "field": "202505",
      "formatter": "money",
      "with": 150
    },
    {
      "formatterParams": {
        "symbol": "",
        "symbolAfter": "",
        "decimal": ".",
        "thousand": ",",
        "precision": 0
      },
      "title": "202506",
      "frozen": false,
      "hozAlign": "right",
      "field": "202506",
      "formatter": "money",
      "with": 150
    },
    {
      "formatterParams": {
        "symbol": "",
        "symbolAfter": "",
        "decimal": ".",
        "thousand": ",",
        "precision": 0
      },
      "title": "202507",
      "frozen": false,
      "hozAlign": "right",
      "field": "202507",
      "formatter": "money",
      "with": 150
    },
    {
      "formatterParams": {
        "symbol": "",
        "symbolAfter": "",
        "decimal": ".",
        "thousand": ",",
        "precision": 0
      },
      "title": "202508",
      "frozen": false,
      "hozAlign": "right",
      "field": "202508",
      "formatter": "money",
      "with": 150
    },
    {
      "formatterParams": {
        "symbol": "",
        "symbolAfter": "",
        "decimal": ".",
        "thousand": ",",
        "precision": 0
      },
      "title": "202509",
      "frozen": false,
      "hozAlign": "right",
      "field": "202509",
      "formatter": "money",
      "with": 150
    },
    {
      "formatterParams": {
        "symbol": "",
        "symbolAfter": "",
        "decimal": ".",
        "thousand": ",",
        "precision": 0
      },
      "title": "202510",
      "frozen": false,
      "hozAlign": "right",
      "field": "202510",
      "formatter": "money",
      "with": 150
    },
    {
      "formatterParams": {
        "symbol": "",
        "symbolAfter": "",
        "decimal": ".",
        "thousand": ",",
        "precision": 0
      },
      "title": "202511",
      "frozen": false,
      "hozAlign": "right",
      "field": "202511",
      "formatter": "money",
      "with": 150
    },
    {
      "formatterParams": {
        "symbol": "",
        "symbolAfter": "",
        "decimal": ".",
        "thousand": ",",
        "precision": 0
      },
      "title": "202512",
      "frozen": false,
      "hozAlign": "right",
      "field": "202512",
      "formatter": "money",
      "with": 150
    }
];

let dataTest = [
    {
      "202505": "27",
      "202506": "28",
      "202507": "29",
      "202508": "30",
      "202509": "31",
      "202510": "32",
      "202511": "33",
      "202512": "34",
      "row_type": "Stage 4 Harvest Week",
      "plant_code": "LACSE",
      "plant_name": "A"
    },
    {
      "202505": 1003,
      "202506": 1002,
      "202507": 1002,
      "202508": 1002,
      "202509": 1004,
      "202510": 1004,
      "202511": 1003,
      "202512": 1003,
      "row_type": "Stage 4 Required",
      "plant_code": "LACSE",
      "plant_name": "A",
      "total": 8023
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LACSE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -1003,
      "202506": -1002,
      "202507": -1002,
      "202508": -1002,
      "202509": -1004,
      "202510": -1004,
      "202511": -1003,
      "202512": -1003,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LACSE",
      "plant_name": "A",
      "total": -8023
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LACSE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": "13",
      "202506": "14",
      "202507": "15",
      "202508": "16",
      "202509": "17",
      "202510": "18",
      "202511": "19",
      "202512": "20",
      "row_type": "Stage 4 Planting Week",
      "plant_code": "LACSE",
      "plant_name": "A"
    },
    {
      "202505": 1066,
      "202506": 1065,
      "202507": 1065,
      "202508": 1065,
      "202509": 1067,
      "202510": 1067,
      "202511": 1066,
      "202512": 1066,
      "row_type": "Stage3 Required",
      "plant_code": "LACSE",
      "plant_name": "A",
      "total": 8527
    },
    {
      "total": 0,
      "plant_code": "LACSE",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LACSE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LACSE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LACSE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -1066,
      "202506": -1065,
      "202507": -1065,
      "202508": -1065,
      "202509": -1067,
      "202510": -1067,
      "202511": -1066,
      "202512": -1066,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LACSE",
      "plant_name": "A",
      "total": -8527
    },
    {
      "202505": 2612,
      "202506": 2375,
      "202507": 1911,
      "202508": 2244,
      "202509": 2437,
      "202510": 3179,
      "202511": 3091,
      "202512": 2800,
      "row_type": "Stage2 Required",
      "plant_code": "LACSE",
      "plant_name": "A",
      "total": 20649
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LACSE",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LACSE",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LACSE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LACSE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -2612,
      "202506": -2375,
      "202507": -1911,
      "202508": -2244,
      "202509": -2437,
      "202510": -3179,
      "202511": -3091,
      "202512": -2800,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LACSE",
      "plant_name": "A",
      "total": -20649
    },
    {
      "total": 0,
      "plant_code": "LACSE",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "202510": "40",
      "202511": "41",
      "202512": "42",
      "row_type": "Stage 4 Harvest Week",
      "plant_code": "LAGAM",
      "plant_name": "A"
    },
    {
      "202510": 1428,
      "202511": 1428,
      "202512": 1428,
      "row_type": "Stage 4 Required",
      "plant_code": "LAGAM",
      "plant_name": "A",
      "total": 4284
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LAGAM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": -1428,
      "202511": -1428,
      "202512": -1428,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LAGAM",
      "plant_name": "A",
      "total": -4284
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LAGAM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": "18",
      "202511": "19",
      "202512": "20",
      "row_type": "Stage 4 Planting Week",
      "plant_code": "LAGAM",
      "plant_name": "A"
    },
    {
      "202510": 2146,
      "202511": 2146,
      "202512": 2146,
      "row_type": "Stage3 Required",
      "plant_code": "LAGAM",
      "plant_name": "A",
      "total": 6438
    },
    {
      "total": 0,
      "plant_code": "LAGAM",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LAGAM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LAGAM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LAGAM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": -2146,
      "202511": -2146,
      "202512": -2146,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LAGAM",
      "plant_name": "A",
      "total": -6438
    },
    {
      "202505": 3290,
      "202506": 2390,
      "202507": 2340,
      "202508": 1921,
      "202509": 1921,
      "202510": 232,
      "202511": 850,
      "202512": 805,
      "row_type": "Stage2 Required",
      "plant_code": "LAGAM",
      "plant_name": "A",
      "total": 13749
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGAM",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGAM",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGAM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGAM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -3290,
      "202506": -2390,
      "202507": -2340,
      "202508": -1921,
      "202509": -1921,
      "202510": -232,
      "202511": -850,
      "202512": -805,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGAM",
      "plant_name": "A",
      "total": -13749
    },
    {
      "total": 0,
      "plant_code": "LAGAM",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "202511": "37",
      "202512": "38",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "202511": 1517,
      "202512": 1517,
      "row_type": "Stage 4 Required",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": 3034
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": 0
    },
    {
      "202511": -1517,
      "202512": -1517,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": -3034
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": 0
    },
    {
      "202511": "19",
      "202512": "20",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "202511": 1995,
      "202512": 1995,
      "row_type": "Stage3 Required",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": 3990
    },
    {
      "total": 0,
      "plant_code": "LAGBF",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": 0
    },
    {
      "202511": -1995,
      "202512": -1995,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": -3990
    },
    {
      "202505": 1090,
      "202506": 1029,
      "202507": 1029,
      "202508": 106,
      "202509": 106,
      "202510": 106,
      "202511": 45,
      "202512": 999,
      "row_type": "Stage2 Required",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": 4510
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGBF",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -1090,
      "202506": -1029,
      "202507": -1029,
      "202508": -106,
      "202509": -106,
      "202510": -106,
      "202511": -45,
      "202512": -999,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": -4510
    },
    {
      "202508": 7,
      "202509": 7,
      "202510": 7,
      "202511": 7,
      "202512": 7,
      "row_type": "Stage1 Required",
      "plant_code": "LAGBF",
      "plant_name": "A",
      "total": 35
    },
    {
      "202505": "33",
      "202506": "34",
      "202507": "35",
      "202508": "36",
      "202509": "37",
      "202510": "38",
      "202511": "39",
      "202512": "40",
      "row_type": "Stage 4 Harvest Week",
      "plant_code": "LAGBG",
      "plant_name": "A"
    },
    {
      "202505": 8527,
      "202506": 8527,
      "202507": 6822,
      "202508": 6822,
      "202509": 6822,
      "202510": 6822,
      "202511": 6822,
      "202512": 8527,
      "row_type": "Stage 4 Required",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": 59691
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -8527,
      "202506": -8527,
      "202507": -6822,
      "202508": -6822,
      "202509": -6822,
      "202510": -6822,
      "202511": -6822,
      "202512": -8527,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": -59691
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": "13",
      "202506": "14",
      "202507": "15",
      "202508": "16",
      "202509": "17",
      "202510": "18",
      "202511": "19",
      "202512": "20",
      "row_type": "Stage 4 Planting Week",
      "plant_code": "LAGBG",
      "plant_name": "A"
    },
    {
      "202505": 11219,
      "202506": 11219,
      "202507": 8976,
      "202508": 8976,
      "202509": 8976,
      "202510": 8976,
      "202511": 8976,
      "202512": 11219,
      "row_type": "Stage3 Required",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": 78537
    },
    {
      "total": 0,
      "plant_code": "LAGBG",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -11219,
      "202506": -11219,
      "202507": -8976,
      "202508": -8976,
      "202509": -8976,
      "202510": -8976,
      "202511": -8976,
      "202512": -11219,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": -78537
    },
    {
      "202505": 8472,
      "202506": 8435,
      "202507": 8288,
      "202508": 8325,
      "202509": 6625,
      "202510": 6625,
      "202511": 7728,
      "202512": 7152,
      "row_type": "Stage2 Required",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": 61650
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGBG",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -8472,
      "202506": -8435,
      "202507": -8288,
      "202508": -8325,
      "202509": -6625,
      "202510": -6625,
      "202511": -7728,
      "202512": -7152,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": -61650
    },
    {
      "202505": 6,
      "202506": 6,
      "202507": 6,
      "202508": 6,
      "202509": 7,
      "202510": 7,
      "202511": 7,
      "202512": 7,
      "row_type": "Stage1 Required",
      "plant_code": "LAGBG",
      "plant_name": "A",
      "total": 52
    },
    {
      "plant_code": "LAGBI",
      "plant_name": "A",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LAGBI",
      "plant_name": "A",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGBI",
      "plant_name": "A",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LAGBI",
      "plant_name": "A",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LAGBI",
      "plant_name": "A",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LAGBI",
      "plant_name": "A",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LAGBI",
      "plant_name": "A",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGBI",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LAGBI",
      "plant_name": "A",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LAGBI",
      "plant_name": "A",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LAGBI",
      "plant_name": "A",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LAGBI",
      "plant_name": "A",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202508": 450,
      "202509": 450,
      "202510": 450,
      "202511": 450,
      "row_type": "Stage2 Required",
      "plant_code": "LAGBI",
      "plant_name": "A",
      "total": 1800
    },
    {
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGBI",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGBI",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGBI",
      "plant_name": "A",
      "total": 0
    },
    {
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGBI",
      "plant_name": "A",
      "total": 0
    },
    {
      "202508": -450,
      "202509": -450,
      "202510": -450,
      "202511": -450,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGBI",
      "plant_name": "A",
      "total": -1800
    },
    {
      "total": 0,
      "plant_code": "LAGBI",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "plant_code": "LAGBW",
      "plant_name": "A",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LAGBW",
      "plant_name": "A",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGBW",
      "plant_name": "A",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LAGBW",
      "plant_name": "A",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LAGBW",
      "plant_name": "A",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LAGBW",
      "plant_name": "A",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LAGBW",
      "plant_name": "A",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGBW",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LAGBW",
      "plant_name": "A",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LAGBW",
      "plant_name": "A",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LAGBW",
      "plant_name": "A",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LAGBW",
      "plant_name": "A",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202508": 674,
      "202509": 674,
      "202510": 674,
      "202511": 674,
      "row_type": "Stage2 Required",
      "plant_code": "LAGBW",
      "plant_name": "A",
      "total": 2696
    },
    {
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGBW",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGBW",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGBW",
      "plant_name": "A",
      "total": 0
    },
    {
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGBW",
      "plant_name": "A",
      "total": 0
    },
    {
      "202508": -674,
      "202509": -674,
      "202510": -674,
      "202511": -674,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGBW",
      "plant_name": "A",
      "total": -2696
    },
    {
      "total": 0,
      "plant_code": "LAGBW",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "plant_code": "LAGEA",
      "plant_name": "A",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LAGEA",
      "plant_name": "A",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGEA",
      "plant_name": "A",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LAGEA",
      "plant_name": "A",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LAGEA",
      "plant_name": "A",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LAGEA",
      "plant_name": "A",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LAGEA",
      "plant_name": "A",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGEA",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LAGEA",
      "plant_name": "A",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LAGEA",
      "plant_name": "A",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LAGEA",
      "plant_name": "A",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LAGEA",
      "plant_name": "A",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202508": 1057,
      "202509": 1057,
      "202510": 1057,
      "202511": 1057,
      "202512": 15,
      "row_type": "Stage2 Required",
      "plant_code": "LAGEA",
      "plant_name": "A",
      "total": 4243
    },
    {
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGEA",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGEA",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGEA",
      "plant_name": "A",
      "total": 0
    },
    {
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGEA",
      "plant_name": "A",
      "total": 0
    },
    {
      "202508": -1057,
      "202509": -1057,
      "202510": -1057,
      "202511": -1057,
      "202512": -15,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGEA",
      "plant_name": "A",
      "total": -4243
    },
    {
      "202505": 8,
      "202506": 8,
      "202507": 8,
      "row_type": "Stage1 Required",
      "plant_code": "LAGEA",
      "plant_name": "A",
      "total": 24
    },
    {
      "plant_code": "LAGEM",
      "plant_name": "A",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LAGEM",
      "plant_name": "A",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGEM",
      "plant_name": "A",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LAGEM",
      "plant_name": "A",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LAGEM",
      "plant_name": "A",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LAGEM",
      "plant_name": "A",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LAGEM",
      "plant_name": "A",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGEM",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LAGEM",
      "plant_name": "A",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LAGEM",
      "plant_name": "A",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LAGEM",
      "plant_name": "A",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LAGEM",
      "plant_name": "A",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202508": 1208,
      "202509": 1208,
      "202510": 1208,
      "202511": 1208,
      "row_type": "Stage2 Required",
      "plant_code": "LAGEM",
      "plant_name": "A",
      "total": 4832
    },
    {
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGEM",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGEM",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGEM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGEM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202508": -1208,
      "202509": -1208,
      "202510": -1208,
      "202511": -1208,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGEM",
      "plant_name": "A",
      "total": -4832
    },
    {
      "total": 0,
      "plant_code": "LAGEM",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "202512": "42",
      "plant_code": "LAGET",
      "plant_name": "A",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "202512": 798,
      "total": 798,
      "plant_code": "LAGET",
      "plant_name": "A",
      "row_type": "Stage 4 Required"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGET",
      "plant_name": "A",
      "row_type": "Stage 4 Forcast"
    },
    {
      "202512": -798,
      "total": -798,
      "plant_code": "LAGET",
      "plant_name": "A",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGET",
      "plant_name": "A",
      "row_type": "Stage4 Work Hours"
    },
    {
      "202512": "20",
      "plant_code": "LAGET",
      "plant_name": "A",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "202512": 987,
      "total": 987,
      "plant_code": "LAGET",
      "plant_name": "A",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGET",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGET",
      "plant_name": "A",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGET",
      "plant_name": "A",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGET",
      "plant_name": "A",
      "row_type": "Stage3 Work Hours"
    },
    {
      "202512": -987,
      "total": -987,
      "plant_code": "LAGET",
      "plant_name": "A",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 656,
      "202506": 656,
      "202507": 656,
      "202512": 323,
      "row_type": "Stage2 Required",
      "plant_code": "LAGET",
      "plant_name": "A",
      "total": 2291
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGET",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGET",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGET",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGET",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -656,
      "202506": -656,
      "202507": -656,
      "202512": -323,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGET",
      "plant_name": "A",
      "total": -2291
    },
    {
      "202508": 9,
      "202509": 9,
      "202510": 9,
      "202511": 9,
      "row_type": "Stage1 Required",
      "plant_code": "LAGET",
      "plant_name": "A",
      "total": 36
    },
    {
      "202512": "40",
      "plant_code": "LAGGE",
      "plant_name": "A",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "202512": 1063,
      "total": 1063,
      "plant_code": "LAGGE",
      "plant_name": "A",
      "row_type": "Stage 4 Required"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGGE",
      "plant_name": "A",
      "row_type": "Stage 4 Forcast"
    },
    {
      "202512": -1063,
      "total": -1063,
      "plant_code": "LAGGE",
      "plant_name": "A",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGGE",
      "plant_name": "A",
      "row_type": "Stage4 Work Hours"
    },
    {
      "202512": "20",
      "plant_code": "LAGGE",
      "plant_name": "A",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "202512": 1598,
      "total": 1598,
      "plant_code": "LAGGE",
      "plant_name": "A",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGGE",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGGE",
      "plant_name": "A",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGGE",
      "plant_name": "A",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGGE",
      "plant_name": "A",
      "row_type": "Stage3 Work Hours"
    },
    {
      "202512": -1598,
      "total": -1598,
      "plant_code": "LAGGE",
      "plant_name": "A",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 628,
      "202506": 628,
      "202507": 724,
      "202508": 113,
      "202509": 96,
      "202510": 96,
      "202511": 95,
      "202512": 41,
      "row_type": "Stage2 Required",
      "plant_code": "LAGGE",
      "plant_name": "A",
      "total": 2421
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGGE",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGGE",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGGE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGGE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -628,
      "202506": -628,
      "202507": -724,
      "202508": -113,
      "202509": -96,
      "202510": -96,
      "202511": -95,
      "202512": -41,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGGE",
      "plant_name": "A",
      "total": -2421
    },
    {
      "total": 0,
      "plant_code": "LAGGE",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "202512": "40",
      "plant_code": "LAGGV",
      "plant_name": "A",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "202512": 1328,
      "total": 1328,
      "plant_code": "LAGGV",
      "plant_name": "A",
      "row_type": "Stage 4 Required"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGGV",
      "plant_name": "A",
      "row_type": "Stage 4 Forcast"
    },
    {
      "202512": -1328,
      "total": -1328,
      "plant_code": "LAGGV",
      "plant_name": "A",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGGV",
      "plant_name": "A",
      "row_type": "Stage4 Work Hours"
    },
    {
      "202512": "20",
      "plant_code": "LAGGV",
      "plant_name": "A",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "202512": 1644,
      "total": 1644,
      "plant_code": "LAGGV",
      "plant_name": "A",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGGV",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGGV",
      "plant_name": "A",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGGV",
      "plant_name": "A",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "202512": 0,
      "total": 0,
      "plant_code": "LAGGV",
      "plant_name": "A",
      "row_type": "Stage3 Work Hours"
    },
    {
      "202512": -1644,
      "total": -1644,
      "plant_code": "LAGGV",
      "plant_name": "A",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 822,
      "202506": 849,
      "202507": 849,
      "202508": 27,
      "202509": 27,
      "row_type": "Stage2 Required",
      "plant_code": "LAGGV",
      "plant_name": "A",
      "total": 2574
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGGV",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGGV",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGGV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGGV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -822,
      "202506": -849,
      "202507": -849,
      "202508": -27,
      "202509": -27,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGGV",
      "plant_name": "A",
      "total": -2574
    },
    {
      "total": 0,
      "plant_code": "LAGGV",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "plant_code": "LAGME",
      "plant_name": "A",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LAGME",
      "plant_name": "A",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGME",
      "plant_name": "A",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LAGME",
      "plant_name": "A",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LAGME",
      "plant_name": "A",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LAGME",
      "plant_name": "A",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LAGME",
      "plant_name": "A",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGME",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LAGME",
      "plant_name": "A",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LAGME",
      "plant_name": "A",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LAGME",
      "plant_name": "A",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LAGME",
      "plant_name": "A",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 80,
      "202506": 79,
      "202507": 79,
      "202508": 79,
      "202509": 79,
      "row_type": "Stage2 Required",
      "plant_code": "LAGME",
      "plant_name": "A",
      "total": 396
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGME",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGME",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGME",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGME",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -80,
      "202506": -79,
      "202507": -79,
      "202508": -79,
      "202509": -79,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGME",
      "plant_name": "A",
      "total": -396
    },
    {
      "total": 0,
      "plant_code": "LAGME",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "plant_code": "LAGNO",
      "plant_name": "A",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LAGNO",
      "plant_name": "A",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGNO",
      "plant_name": "A",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LAGNO",
      "plant_name": "A",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LAGNO",
      "plant_name": "A",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LAGNO",
      "plant_name": "A",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LAGNO",
      "plant_name": "A",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGNO",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LAGNO",
      "plant_name": "A",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LAGNO",
      "plant_name": "A",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LAGNO",
      "plant_name": "A",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LAGNO",
      "plant_name": "A",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 660,
      "202506": 710,
      "202507": 520,
      "202508": 506,
      "202509": 506,
      "202510": 984,
      "202511": 811,
      "202512": 811,
      "row_type": "Stage2 Required",
      "plant_code": "LAGNO",
      "plant_name": "A",
      "total": 5508
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGNO",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGNO",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGNO",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGNO",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -660,
      "202506": -710,
      "202507": -520,
      "202508": -506,
      "202509": -506,
      "202510": -984,
      "202511": -811,
      "202512": -811,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGNO",
      "plant_name": "A",
      "total": -5508
    },
    {
      "202507": 9,
      "202508": 9,
      "202509": 9,
      "202510": 9,
      "row_type": "Stage1 Required",
      "plant_code": "LAGNO",
      "plant_name": "A",
      "total": 36
    },
    {
      "202510": "40",
      "202511": "41",
      "202512": "42",
      "row_type": "Stage 4 Harvest Week",
      "plant_code": "LAGNS",
      "plant_name": "A"
    },
    {
      "202510": 798,
      "202511": 798,
      "202512": 798,
      "row_type": "Stage 4 Required",
      "plant_code": "LAGNS",
      "plant_name": "A",
      "total": 2394
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LAGNS",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": -798,
      "202511": -798,
      "202512": -798,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LAGNS",
      "plant_name": "A",
      "total": -2394
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LAGNS",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": "18",
      "202511": "19",
      "202512": "20",
      "row_type": "Stage 4 Planting Week",
      "plant_code": "LAGNS",
      "plant_name": "A"
    },
    {
      "202510": 987,
      "202511": 987,
      "202512": 987,
      "row_type": "Stage3 Required",
      "plant_code": "LAGNS",
      "plant_name": "A",
      "total": 2961
    },
    {
      "total": 0,
      "plant_code": "LAGNS",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LAGNS",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LAGNS",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LAGNS",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": -987,
      "202511": -987,
      "202512": -987,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LAGNS",
      "plant_name": "A",
      "total": -2961
    },
    {
      "202505": 238,
      "202510": 27,
      "202511": 27,
      "202512": 27,
      "row_type": "Stage2 Required",
      "plant_code": "LAGNS",
      "plant_name": "A",
      "total": 319
    },
    {
      "202505": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGNS",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGNS",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGNS",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGNS",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -238,
      "202510": -27,
      "202511": -27,
      "202512": -27,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGNS",
      "plant_name": "A",
      "total": -319
    },
    {
      "202505": 8,
      "total": 8,
      "plant_code": "LAGNS",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "202510": "40",
      "202511": "41",
      "202512": "42",
      "row_type": "Stage 4 Harvest Week",
      "plant_code": "LAGOC",
      "plant_name": "A"
    },
    {
      "202510": 548,
      "202511": 548,
      "202512": 548,
      "row_type": "Stage 4 Required",
      "plant_code": "LAGOC",
      "plant_name": "A",
      "total": 1644
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LAGOC",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": -548,
      "202511": -548,
      "202512": -548,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LAGOC",
      "plant_name": "A",
      "total": -1644
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LAGOC",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": "18",
      "202511": "19",
      "202512": "20",
      "row_type": "Stage 4 Planting Week",
      "plant_code": "LAGOC",
      "plant_name": "A"
    },
    {
      "202510": 824,
      "202511": 824,
      "202512": 824,
      "row_type": "Stage3 Required",
      "plant_code": "LAGOC",
      "plant_name": "A",
      "total": 2472
    },
    {
      "total": 0,
      "plant_code": "LAGOC",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LAGOC",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LAGOC",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LAGOC",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": -824,
      "202511": -824,
      "202512": -824,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LAGOC",
      "plant_name": "A",
      "total": -2472
    },
    {
      "202505": 1086,
      "202506": 90,
      "202507": 33,
      "202508": 33,
      "202509": 33,
      "202510": 113,
      "202511": 113,
      "202512": 113,
      "row_type": "Stage2 Required",
      "plant_code": "LAGOC",
      "plant_name": "A",
      "total": 1614
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGOC",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGOC",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGOC",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGOC",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -1086,
      "202506": -90,
      "202507": -33,
      "202508": -33,
      "202509": -33,
      "202510": -113,
      "202511": -113,
      "202512": -113,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGOC",
      "plant_name": "A",
      "total": -1614
    },
    {
      "total": 0,
      "plant_code": "LAGOC",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "202507": "35",
      "202508": "36",
      "202509": "37",
      "202510": "38",
      "202511": "39",
      "row_type": "Stage 4 Harvest Week",
      "plant_code": "LAGOV",
      "plant_name": "A"
    },
    {
      "202507": 1398,
      "202508": 1398,
      "202509": 1398,
      "202510": 1398,
      "202511": 1398,
      "row_type": "Stage 4 Required",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": 6990
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202507": -1398,
      "202508": -1398,
      "202509": -1398,
      "202510": -1398,
      "202511": -1398,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": -6990
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202507": "15",
      "202508": "16",
      "202509": "17",
      "202510": "18",
      "202511": "19",
      "row_type": "Stage 4 Planting Week",
      "plant_code": "LAGOV",
      "plant_name": "A"
    },
    {
      "202507": 2102,
      "202508": 2102,
      "202509": 2102,
      "202510": 2102,
      "202511": 2102,
      "row_type": "Stage3 Required",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": 10510
    },
    {
      "total": 0,
      "plant_code": "LAGOV",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202507": -2102,
      "202508": -2102,
      "202509": -2102,
      "202510": -2102,
      "202511": -2102,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": -10510
    },
    {
      "202505": 837,
      "202506": 837,
      "202507": 382,
      "202508": 1386,
      "202509": 1827,
      "202510": 1826,
      "202511": 2561,
      "202512": 1814,
      "row_type": "Stage2 Required",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": 11470
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGOV",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -837,
      "202506": -837,
      "202507": -382,
      "202508": -1386,
      "202509": -1827,
      "202510": -1826,
      "202511": -2561,
      "202512": -1814,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": -11470
    },
    {
      "202508": 6,
      "202509": 6,
      "202510": 6,
      "202511": 6,
      "202512": 6,
      "row_type": "Stage1 Required",
      "plant_code": "LAGOV",
      "plant_name": "A",
      "total": 30
    },
    {
      "plant_code": "LAGPA",
      "plant_name": "A",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LAGPA",
      "plant_name": "A",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGPA",
      "plant_name": "A",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LAGPA",
      "plant_name": "A",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LAGPA",
      "plant_name": "A",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LAGPA",
      "plant_name": "A",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LAGPA",
      "plant_name": "A",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LAGPA",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LAGPA",
      "plant_name": "A",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LAGPA",
      "plant_name": "A",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LAGPA",
      "plant_name": "A",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LAGPA",
      "plant_name": "A",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 598,
      "202506": 152,
      "202507": 152,
      "202508": 151,
      "202509": 151,
      "202510": 835,
      "202511": 835,
      "202512": 835,
      "row_type": "Stage2 Required",
      "plant_code": "LAGPA",
      "plant_name": "A",
      "total": 3709
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGPA",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGPA",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGPA",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGPA",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -598,
      "202506": -152,
      "202507": -152,
      "202508": -151,
      "202509": -151,
      "202510": -835,
      "202511": -835,
      "202512": -835,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGPA",
      "plant_name": "A",
      "total": -3709
    },
    {
      "total": 0,
      "plant_code": "LAGPA",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "202506": "36",
      "202507": "37",
      "202508": "38",
      "202509": "39",
      "row_type": "Stage 4 Harvest Week",
      "plant_code": "LAGQM",
      "plant_name": "A"
    },
    {
      "202506": 638,
      "202507": 638,
      "202508": 638,
      "202509": 637,
      "row_type": "Stage 4 Required",
      "plant_code": "LAGQM",
      "plant_name": "A",
      "total": 2551
    },
    {
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LAGQM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": -638,
      "202507": -638,
      "202508": -638,
      "202509": -637,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LAGQM",
      "plant_name": "A",
      "total": -2551
    },
    {
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LAGQM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": "14",
      "202507": "15",
      "202508": "16",
      "202509": "17",
      "row_type": "Stage 4 Planting Week",
      "plant_code": "LAGQM",
      "plant_name": "A"
    },
    {
      "202506": 790,
      "202507": 790,
      "202508": 790,
      "202509": 788,
      "row_type": "Stage3 Required",
      "plant_code": "LAGQM",
      "plant_name": "A",
      "total": 3158
    },
    {
      "total": 0,
      "plant_code": "LAGQM",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LAGQM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LAGQM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LAGQM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": -790,
      "202507": -790,
      "202508": -790,
      "202509": -788,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LAGQM",
      "plant_name": "A",
      "total": -3158
    },
    {
      "202505": 120,
      "202506": 120,
      "202507": 120,
      "202508": 120,
      "202509": 120,
      "202510": 13,
      "202511": 13,
      "202512": 13,
      "row_type": "Stage2 Required",
      "plant_code": "LAGQM",
      "plant_name": "A",
      "total": 639
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGQM",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGQM",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGQM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGQM",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -120,
      "202506": -120,
      "202507": -120,
      "202508": -120,
      "202509": -120,
      "202510": -13,
      "202511": -13,
      "202512": -13,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGQM",
      "plant_name": "A",
      "total": -639
    },
    {
      "202505": 7,
      "total": 7,
      "plant_code": "LAGQM",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "202510": "40",
      "202511": "41",
      "202512": "42",
      "row_type": "Stage 4 Harvest Week",
      "plant_code": "LAGQV",
      "plant_name": "A"
    },
    {
      "202510": 797,
      "202511": 797,
      "202512": 797,
      "row_type": "Stage 4 Required",
      "plant_code": "LAGQV",
      "plant_name": "A",
      "total": 2391
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LAGQV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": -797,
      "202511": -797,
      "202512": -797,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LAGQV",
      "plant_name": "A",
      "total": -2391
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LAGQV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": "18",
      "202511": "19",
      "202512": "20",
      "row_type": "Stage 4 Planting Week",
      "plant_code": "LAGQV",
      "plant_name": "A"
    },
    {
      "202510": 1197,
      "202511": 1197,
      "202512": 1197,
      "row_type": "Stage3 Required",
      "plant_code": "LAGQV",
      "plant_name": "A",
      "total": 3591
    },
    {
      "total": 0,
      "plant_code": "LAGQV",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LAGQV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LAGQV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LAGQV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": -1197,
      "202511": -1197,
      "202512": -1197,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LAGQV",
      "plant_name": "A",
      "total": -3591
    },
    {
      "202505": 900,
      "202506": 168,
      "202510": 858,
      "202511": 1068,
      "202512": 858,
      "row_type": "Stage2 Required",
      "plant_code": "LAGQV",
      "plant_name": "A",
      "total": 3852
    },
    {
      "202505": 0,
      "202506": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGQV",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGQV",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGQV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGQV",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -900,
      "202506": -168,
      "202510": -858,
      "202511": -1068,
      "202512": -858,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGQV",
      "plant_name": "A",
      "total": -3852
    },
    {
      "total": 0,
      "plant_code": "LAGQV",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "202506": "36",
      "202507": "37",
      "202508": "38",
      "202509": "39",
      "row_type": "Stage 4 Harvest Week",
      "plant_code": "LAGTW",
      "plant_name": "A"
    },
    {
      "202506": 638,
      "202507": 638,
      "202508": 638,
      "202509": 637,
      "row_type": "Stage 4 Required",
      "plant_code": "LAGTW",
      "plant_name": "A",
      "total": 2551
    },
    {
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LAGTW",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": -638,
      "202507": -638,
      "202508": -638,
      "202509": -637,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LAGTW",
      "plant_name": "A",
      "total": -2551
    },
    {
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LAGTW",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": "14",
      "202507": "15",
      "202508": "16",
      "202509": "17",
      "row_type": "Stage 4 Planting Week",
      "plant_code": "LAGTW",
      "plant_name": "A"
    },
    {
      "202506": 790,
      "202507": 790,
      "202508": 790,
      "202509": 788,
      "row_type": "Stage3 Required",
      "plant_code": "LAGTW",
      "plant_name": "A",
      "total": 3158
    },
    {
      "total": 0,
      "plant_code": "LAGTW",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LAGTW",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LAGTW",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LAGTW",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": -790,
      "202507": -790,
      "202508": -790,
      "202509": -788,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LAGTW",
      "plant_name": "A",
      "total": -3158
    },
    {
      "202510": 32,
      "202511": 32,
      "202512": 32,
      "row_type": "Stage2 Required",
      "plant_code": "LAGTW",
      "plant_name": "A",
      "total": 96
    },
    {
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LAGTW",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LAGTW",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LAGTW",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LAGTW",
      "plant_name": "A",
      "total": 0
    },
    {
      "202510": -32,
      "202511": -32,
      "202512": -32,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LAGTW",
      "plant_name": "A",
      "total": -96
    },
    {
      "202505": 10,
      "total": 10,
      "plant_code": "LAGTW",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "202505": "31",
      "202508": "32",
      "202509": "33",
      "202510": "34",
      "row_type": "Stage 4 Harvest Week",
      "plant_code": "LALBE",
      "plant_name": "A"
    },
    {
      "202505": 1328,
      "202508": 1328,
      "202509": 1328,
      "202510": 1328,
      "row_type": "Stage 4 Required",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": 5312
    },
    {
      "202505": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -1328,
      "202508": -1328,
      "202509": -1328,
      "202510": -1328,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": -5312
    },
    {
      "202505": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": "11",
      "202508": "14",
      "202509": "15",
      "202510": "16",
      "row_type": "Stage 4 Planting Week",
      "plant_code": "LALBE",
      "plant_name": "A"
    },
    {
      "202505": 1644,
      "202508": 1644,
      "202509": 1644,
      "202510": 1644,
      "row_type": "Stage3 Required",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": 6576
    },
    {
      "total": 0,
      "plant_code": "LALBE",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202505": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -1644,
      "202508": -1644,
      "202509": -1644,
      "202510": -1644,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": -6576
    },
    {
      "202505": 102,
      "202510": 366,
      "202511": 366,
      "202512": 366,
      "row_type": "Stage2 Required",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": 1200
    },
    {
      "202505": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LALBE",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -102,
      "202510": -366,
      "202511": -366,
      "202512": -366,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": -1200
    },
    {
      "202510": 9,
      "202511": 9,
      "202512": 9,
      "row_type": "Stage1 Required",
      "plant_code": "LALBE",
      "plant_name": "A",
      "total": 27
    },
    {
      "202506": "30",
      "202511": "35",
      "202512": "36",
      "row_type": "Stage 4 Harvest Week",
      "plant_code": "LALHE",
      "plant_name": "A"
    },
    {
      "202506": 1327,
      "202511": 1062,
      "202512": 1062,
      "row_type": "Stage 4 Required",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": 3451
    },
    {
      "202506": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": -1327,
      "202511": -1062,
      "202512": -1062,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": -3451
    },
    {
      "202506": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": "12",
      "202511": "17",
      "202512": "18",
      "row_type": "Stage 4 Planting Week",
      "plant_code": "LALHE",
      "plant_name": "A"
    },
    {
      "202506": 1995,
      "202511": 1596,
      "202512": 1596,
      "row_type": "Stage3 Required",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": 5187
    },
    {
      "total": 0,
      "plant_code": "LALHE",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202506": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202506": -1995,
      "202511": -1596,
      "202512": -1596,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": -5187
    },
    {
      "202505": 1050,
      "202506": 1675,
      "202507": 1713,
      "202508": 1713,
      "202509": 1713,
      "202510": 19,
      "202511": 19,
      "202512": 57,
      "row_type": "Stage2 Required",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": 7959
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LALHE",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -1050,
      "202506": -1675,
      "202507": -1713,
      "202508": -1713,
      "202509": -1713,
      "202510": -19,
      "202511": -19,
      "202512": -57,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": -7959
    },
    {
      "202505": 10,
      "202510": 8,
      "202511": 8,
      "202512": 8,
      "row_type": "Stage1 Required",
      "plant_code": "LALHE",
      "plant_name": "A",
      "total": 34
    },
    {
      "202511": "35",
      "202512": "36",
      "plant_code": "LALSA",
      "plant_name": "A",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "202511": 851,
      "202512": 851,
      "row_type": "Stage 4 Required",
      "plant_code": "LALSA",
      "plant_name": "A",
      "total": 1702
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LALSA",
      "plant_name": "A",
      "total": 0
    },
    {
      "202511": -851,
      "202512": -851,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LALSA",
      "plant_name": "A",
      "total": -1702
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LALSA",
      "plant_name": "A",
      "total": 0
    },
    {
      "202511": "17",
      "202512": "18",
      "plant_code": "LALSA",
      "plant_name": "A",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "202511": 1053,
      "202512": 1053,
      "row_type": "Stage3 Required",
      "plant_code": "LALSA",
      "plant_name": "A",
      "total": 2106
    },
    {
      "total": 0,
      "plant_code": "LALSA",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LALSA",
      "plant_name": "A",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LALSA",
      "plant_name": "A",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LALSA",
      "plant_name": "A",
      "total": 0
    },
    {
      "202511": -1053,
      "202512": -1053,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LALSA",
      "plant_name": "A",
      "total": -2106
    },
    {
      "202505": 294,
      "202506": 294,
      "202507": 293,
      "202508": 293,
      "202509": 293,
      "row_type": "Stage2 Required",
      "plant_code": "LALSA",
      "plant_name": "A",
      "total": 1467
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LALSA",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LALSA",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LALSA",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LALSA",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -294,
      "202506": -294,
      "202507": -293,
      "202508": -293,
      "202509": -293,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LALSA",
      "plant_name": "A",
      "total": -1467
    },
    {
      "total": 0,
      "plant_code": "LALSA",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "plant_code": "LALSR",
      "plant_name": "A",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LALSR",
      "plant_name": "A",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LALSR",
      "plant_name": "A",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LALSR",
      "plant_name": "A",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LALSR",
      "plant_name": "A",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LALSR",
      "plant_name": "A",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LALSR",
      "plant_name": "A",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LALSR",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LALSR",
      "plant_name": "A",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LALSR",
      "plant_name": "A",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LALSR",
      "plant_name": "A",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LALSR",
      "plant_name": "A",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 161,
      "202510": 429,
      "202511": 429,
      "202512": 429,
      "row_type": "Stage2 Required",
      "plant_code": "LALSR",
      "plant_name": "A",
      "total": 1448
    },
    {
      "202505": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LALSR",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LALSR",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LALSR",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LALSR",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -161,
      "202510": -429,
      "202511": -429,
      "202512": -429,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LALSR",
      "plant_name": "A",
      "total": -1448
    },
    {
      "total": 0,
      "plant_code": "LALSR",
      "plant_name": "A",
      "row_type": "Stage1 Required"
    },
    {
      "plant_code": "LCADB",
      "plant_name": "C",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LCADB",
      "plant_name": "C",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LCADB",
      "plant_name": "C",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LCADB",
      "plant_name": "C",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LCADB",
      "plant_name": "C",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LCADB",
      "plant_name": "C",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LCADB",
      "plant_name": "C",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LCADB",
      "plant_name": "C",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LCADB",
      "plant_name": "C",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LCADB",
      "plant_name": "C",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LCADB",
      "plant_name": "C",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LCADB",
      "plant_name": "C",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202507": 11,
      "202508": 11,
      "202509": 11,
      "202510": 11,
      "202511": 11,
      "row_type": "Stage2 Required",
      "plant_code": "LCADB",
      "plant_name": "C",
      "total": 55
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LCADB",
      "plant_name": "C",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LCADB",
      "plant_name": "C",
      "row_type": "Stage2 Forcast"
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LCADB",
      "plant_name": "C",
      "total": 0
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LCADB",
      "plant_name": "C",
      "total": 0
    },
    {
      "202507": -11,
      "202508": -11,
      "202509": -11,
      "202510": -11,
      "202511": -11,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LCADB",
      "plant_name": "C",
      "total": -55
    },
    {
      "total": 0,
      "plant_code": "LCADB",
      "plant_name": "C",
      "row_type": "Stage1 Required"
    },
    {
      "plant_code": "LDIVA",
      "plant_name": "D",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LDIVA",
      "plant_name": "D",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LDIVA",
      "plant_name": "D",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LDIVA",
      "plant_name": "D",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LDIVA",
      "plant_name": "D",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LDIVA",
      "plant_name": "D",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LDIVA",
      "plant_name": "D",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LDIVA",
      "plant_name": "D",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LDIVA",
      "plant_name": "D",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LDIVA",
      "plant_name": "D",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LDIVA",
      "plant_name": "D",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LDIVA",
      "plant_name": "D",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 1310,
      "202506": 1035,
      "202507": 1035,
      "202508": 1035,
      "202509": 1035,
      "202510": 458,
      "202511": 458,
      "202512": 458,
      "row_type": "Stage2 Required",
      "plant_code": "LDIVA",
      "plant_name": "D",
      "total": 6824
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LDIVA",
      "plant_name": "D",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LDIVA",
      "plant_name": "D",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LDIVA",
      "plant_name": "D",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LDIVA",
      "plant_name": "D",
      "total": 0
    },
    {
      "202505": -1310,
      "202506": -1035,
      "202507": -1035,
      "202508": -1035,
      "202509": -1035,
      "202510": -458,
      "202511": -458,
      "202512": -458,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LDIVA",
      "plant_name": "D",
      "total": -6824
    },
    {
      "202506": 6,
      "202507": 6,
      "202508": 6,
      "202509": 6,
      "row_type": "Stage1 Required",
      "plant_code": "LDIVA",
      "plant_name": "D",
      "total": 24
    },
    {
      "plant_code": "LGIVA",
      "plant_name": "A",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LGIVA",
      "plant_name": "A",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LGIVA",
      "plant_name": "A",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LGIVA",
      "plant_name": "A",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LGIVA",
      "plant_name": "A",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LGIVA",
      "plant_name": "A",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LGIVA",
      "plant_name": "A",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LGIVA",
      "plant_name": "A",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LGIVA",
      "plant_name": "A",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LGIVA",
      "plant_name": "A",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LGIVA",
      "plant_name": "A",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LGIVA",
      "plant_name": "A",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 297,
      "202506": 297,
      "202507": 1116,
      "202508": 882,
      "202509": 882,
      "202510": 882,
      "202511": 881,
      "202512": 662,
      "row_type": "Stage2 Required",
      "plant_code": "LGIVA",
      "plant_name": "A",
      "total": 5899
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LGIVA",
      "plant_name": "A",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LGIVA",
      "plant_name": "A",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LGIVA",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LGIVA",
      "plant_name": "A",
      "total": 0
    },
    {
      "202505": -297,
      "202506": -297,
      "202507": -1116,
      "202508": -882,
      "202509": -882,
      "202510": -882,
      "202511": -881,
      "202512": -662,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LGIVA",
      "plant_name": "A",
      "total": -5899
    },
    {
      "202505": 10,
      "202506": 10,
      "202507": 10,
      "202508": 7,
      "202509": 7,
      "202510": 7,
      "202511": 7,
      "row_type": "Stage1 Required",
      "plant_code": "LGIVA",
      "plant_name": "A",
      "total": 58
    },
    {
      "202507": "31",
      "202508": "32",
      "202509": "33",
      "202510": "34",
      "202511": "35",
      "202512": "36",
      "row_type": "Stage 4 Harvest Week",
      "plant_code": "LLOPD",
      "plant_name": "L"
    },
    {
      "202507": 1162,
      "202508": 1162,
      "202509": 1160,
      "202510": 1160,
      "202511": 855,
      "202512": 855,
      "row_type": "Stage 4 Required",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": 6354
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": 0
    },
    {
      "202507": -1162,
      "202508": -1162,
      "202509": -1160,
      "202510": -1160,
      "202511": -855,
      "202512": -855,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": -6354
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": 0
    },
    {
      "202507": "15",
      "202508": "16",
      "202509": "17",
      "202510": "18",
      "202511": "19",
      "202512": "20",
      "row_type": "Stage 4 Planting Week",
      "plant_code": "LLOPD",
      "plant_name": "L"
    },
    {
      "202507": 1746,
      "202508": 1746,
      "202509": 1744,
      "202510": 1744,
      "202511": 1285,
      "202512": 1285,
      "row_type": "Stage3 Required",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": 9550
    },
    {
      "total": 0,
      "plant_code": "LLOPD",
      "plant_name": "L",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": 0
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": 0
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": 0
    },
    {
      "202507": -1746,
      "202508": -1746,
      "202509": -1744,
      "202510": -1744,
      "202511": -1285,
      "202512": -1285,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": -9550
    },
    {
      "202505": 1529,
      "202506": 1529,
      "202507": 1323,
      "202508": 926,
      "202509": 926,
      "202510": 1122,
      "202511": 1369,
      "202512": 1430,
      "row_type": "Stage2 Required",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": 10154
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LLOPD",
      "plant_name": "L",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": 0
    },
    {
      "202505": -1529,
      "202506": -1529,
      "202507": -1323,
      "202508": -926,
      "202509": -926,
      "202510": -1122,
      "202511": -1369,
      "202512": -1430,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": -10154
    },
    {
      "202508": 8,
      "202509": 8,
      "202510": 8,
      "202511": 8,
      "202512": 18,
      "row_type": "Stage1 Required",
      "plant_code": "LLOPD",
      "plant_name": "L",
      "total": 50
    },
    {
      "plant_code": "LNACL",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LNACL",
      "plant_name": "N",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LNACL",
      "plant_name": "N",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LNACL",
      "plant_name": "N",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LNACL",
      "plant_name": "N",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LNACL",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LNACL",
      "plant_name": "N",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LNACL",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LNACL",
      "plant_name": "N",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LNACL",
      "plant_name": "N",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LNACL",
      "plant_name": "N",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LNACL",
      "plant_name": "N",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 79,
      "202506": 79,
      "202507": 741,
      "202508": 662,
      "202509": 662,
      "202510": 662,
      "202511": 662,
      "202512": 143,
      "row_type": "Stage2 Required",
      "plant_code": "LNACL",
      "plant_name": "N",
      "total": 3690
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNACL",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNACL",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNACL",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNACL",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -79,
      "202506": -79,
      "202507": -741,
      "202508": -662,
      "202509": -662,
      "202510": -662,
      "202511": -662,
      "202512": -143,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNACL",
      "plant_name": "N",
      "total": -3690
    },
    {
      "total": 0,
      "plant_code": "LNACL",
      "plant_name": "N",
      "row_type": "Stage1 Required"
    },
    {
      "202511": "31",
      "202512": "32",
      "plant_code": "LNACO",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "202511": 2635,
      "202512": 2635,
      "row_type": "Stage 4 Required",
      "plant_code": "LNACO",
      "plant_name": "N",
      "total": 5270
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LNACO",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": -2635,
      "202512": -2635,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LNACO",
      "plant_name": "N",
      "total": -5270
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LNACO",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": "19",
      "202512": "20",
      "plant_code": "LNACO",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "202511": 3467,
      "202512": 3467,
      "row_type": "Stage3 Required",
      "plant_code": "LNACO",
      "plant_name": "N",
      "total": 6934
    },
    {
      "total": 0,
      "plant_code": "LNACO",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LNACO",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LNACO",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LNACO",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": -3467,
      "202512": -3467,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LNACO",
      "plant_name": "N",
      "total": -6934
    },
    {
      "202505": 3806,
      "202506": 3806,
      "202507": 5282,
      "202508": 3486,
      "202509": 3486,
      "202510": 3486,
      "202511": 3486,
      "202512": 4337,
      "row_type": "Stage2 Required",
      "plant_code": "LNACO",
      "plant_name": "N",
      "total": 31175
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNACO",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNACO",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNACO",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNACO",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -3806,
      "202506": -3806,
      "202507": -5282,
      "202508": -3486,
      "202509": -3486,
      "202510": -3486,
      "202511": -3486,
      "202512": -4337,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNACO",
      "plant_name": "N",
      "total": -31175
    },
    {
      "total": 0,
      "plant_code": "LNACO",
      "plant_name": "N",
      "row_type": "Stage1 Required"
    },
    {
      "plant_code": "LNADW",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LNADW",
      "plant_name": "N",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LNADW",
      "plant_name": "N",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LNADW",
      "plant_name": "N",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LNADW",
      "plant_name": "N",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LNADW",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LNADW",
      "plant_name": "N",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LNADW",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LNADW",
      "plant_name": "N",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LNADW",
      "plant_name": "N",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LNADW",
      "plant_name": "N",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LNADW",
      "plant_name": "N",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 70,
      "202506": 70,
      "202507": 883,
      "202508": 883,
      "202509": 883,
      "202510": 883,
      "202511": 1028,
      "202512": 158,
      "row_type": "Stage2 Required",
      "plant_code": "LNADW",
      "plant_name": "N",
      "total": 4858
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNADW",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNADW",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNADW",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNADW",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -70,
      "202506": -70,
      "202507": -883,
      "202508": -883,
      "202509": -883,
      "202510": -883,
      "202511": -1028,
      "202512": -158,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNADW",
      "plant_name": "N",
      "total": -4858
    },
    {
      "202505": 7,
      "202506": 7,
      "202507": 7,
      "row_type": "Stage1 Required",
      "plant_code": "LNADW",
      "plant_name": "N",
      "total": 21
    },
    {
      "plant_code": "LNAFL",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LNAFL",
      "plant_name": "N",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LNAFL",
      "plant_name": "N",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LNAFL",
      "plant_name": "N",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LNAFL",
      "plant_name": "N",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LNAFL",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LNAFL",
      "plant_name": "N",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LNAFL",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LNAFL",
      "plant_name": "N",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LNAFL",
      "plant_name": "N",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LNAFL",
      "plant_name": "N",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LNAFL",
      "plant_name": "N",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 1582,
      "202506": 1582,
      "202507": 5390,
      "202508": 3847,
      "202509": 3847,
      "202510": 3847,
      "202511": 3847,
      "202512": 4759,
      "row_type": "Stage2 Required",
      "plant_code": "LNAFL",
      "plant_name": "N",
      "total": 28701
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNAFL",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNAFL",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNAFL",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNAFL",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -1582,
      "202506": -1582,
      "202507": -5390,
      "202508": -3847,
      "202509": -3847,
      "202510": -3847,
      "202511": -3847,
      "202512": -4759,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNAFL",
      "plant_name": "N",
      "total": -28701
    },
    {
      "202512": 7,
      "total": 7,
      "plant_code": "LNAFL",
      "plant_name": "N",
      "row_type": "Stage1 Required"
    },
    {
      "202511": "31",
      "202512": "32",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "202511": 2635,
      "202512": 2635,
      "row_type": "Stage 4 Required",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": 5270
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": -2635,
      "202512": -2635,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": -5270
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": "19",
      "202512": "20",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "202511": 3962,
      "202512": 3962,
      "row_type": "Stage3 Required",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": 7924
    },
    {
      "total": 0,
      "plant_code": "LNAFP",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": -3962,
      "202512": -3962,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": -7924
    },
    {
      "202505": 6330,
      "202506": 6330,
      "202507": 16526,
      "202508": 12885,
      "202509": 12884,
      "202510": 12884,
      "202511": 13718,
      "202512": 11382,
      "row_type": "Stage2 Required",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": 92939
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNAFP",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -6330,
      "202506": -6330,
      "202507": -16526,
      "202508": -12885,
      "202509": -12884,
      "202510": -12884,
      "202511": -13718,
      "202512": -11382,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": -92939
    },
    {
      "202508": 10,
      "202509": 10,
      "202510": 10,
      "202511": 10,
      "row_type": "Stage1 Required",
      "plant_code": "LNAFP",
      "plant_name": "N",
      "total": 40
    },
    {
      "plant_code": "LNAGS",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LNAGS",
      "plant_name": "N",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LNAGS",
      "plant_name": "N",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LNAGS",
      "plant_name": "N",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LNAGS",
      "plant_name": "N",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LNAGS",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LNAGS",
      "plant_name": "N",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LNAGS",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LNAGS",
      "plant_name": "N",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LNAGS",
      "plant_name": "N",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LNAGS",
      "plant_name": "N",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LNAGS",
      "plant_name": "N",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 2109,
      "202506": 2109,
      "202507": 5824,
      "202508": 3952,
      "202509": 3952,
      "202510": 3952,
      "202511": 4284,
      "202512": 5454,
      "row_type": "Stage2 Required",
      "plant_code": "LNAGS",
      "plant_name": "N",
      "total": 31636
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNAGS",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNAGS",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNAGS",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNAGS",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -2109,
      "202506": -2109,
      "202507": -5824,
      "202508": -3952,
      "202509": -3952,
      "202510": -3952,
      "202511": -4284,
      "202512": -5454,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNAGS",
      "plant_name": "N",
      "total": -31636
    },
    {
      "202505": 7,
      "202506": 7,
      "202507": 7,
      "202508": 7,
      "202509": 7,
      "202510": 7,
      "202511": 7,
      "row_type": "Stage1 Required",
      "plant_code": "LNAGS",
      "plant_name": "N",
      "total": 49
    },
    {
      "plant_code": "LNAHB",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LNAHB",
      "plant_name": "N",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LNAHB",
      "plant_name": "N",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LNAHB",
      "plant_name": "N",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LNAHB",
      "plant_name": "N",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LNAHB",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LNAHB",
      "plant_name": "N",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LNAHB",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LNAHB",
      "plant_name": "N",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LNAHB",
      "plant_name": "N",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LNAHB",
      "plant_name": "N",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LNAHB",
      "plant_name": "N",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 424,
      "202506": 424,
      "202507": 1959,
      "202508": 1535,
      "202509": 1535,
      "202510": 1534,
      "202511": 1534,
      "202512": 1060,
      "row_type": "Stage2 Required",
      "plant_code": "LNAHB",
      "plant_name": "N",
      "total": 10005
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNAHB",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNAHB",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNAHB",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNAHB",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -424,
      "202506": -424,
      "202507": -1959,
      "202508": -1535,
      "202509": -1535,
      "202510": -1534,
      "202511": -1534,
      "202512": -1060,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNAHB",
      "plant_name": "N",
      "total": -10005
    },
    {
      "202512": 8,
      "total": 8,
      "plant_code": "LNAHB",
      "plant_name": "N",
      "row_type": "Stage1 Required"
    },
    {
      "202511": "31",
      "202512": "32",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "202511": 2635,
      "202512": 2635,
      "row_type": "Stage 4 Required",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "total": 5270
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": -2635,
      "202512": -2635,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "total": -5270
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": "19",
      "202512": "20",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "202511": 3467,
      "202512": 3467,
      "row_type": "Stage3 Required",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "total": 6934
    },
    {
      "total": 0,
      "plant_code": "LNAHD",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": -3467,
      "202512": -3467,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "total": -6934
    },
    {
      "202505": 2665,
      "202506": 2665,
      "202507": 2321,
      "202508": 1783,
      "202509": 1783,
      "202510": 1781,
      "202511": 1781,
      "202512": 1607,
      "row_type": "Stage2 Required",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "total": 16386
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNAHD",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -2665,
      "202506": -2665,
      "202507": -2321,
      "202508": -1783,
      "202509": -1783,
      "202510": -1781,
      "202511": -1781,
      "202512": -1607,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNAHD",
      "plant_name": "N",
      "total": -16386
    },
    {
      "total": 0,
      "plant_code": "LNAHD",
      "plant_name": "N",
      "row_type": "Stage1 Required"
    },
    {
      "202511": "31",
      "202512": "32",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "202511": 2635,
      "202512": 2635,
      "row_type": "Stage 4 Required",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "total": 5270
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": -2635,
      "202512": -2635,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "total": -5270
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": "19",
      "202512": "20",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "202511": 3467,
      "202512": 3467,
      "row_type": "Stage3 Required",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "total": 6934
    },
    {
      "total": 0,
      "plant_code": "LNAKA",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": -3467,
      "202512": -3467,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "total": -6934
    },
    {
      "202505": 6540,
      "202506": 6540,
      "202507": 10239,
      "202508": 7470,
      "202509": 7470,
      "202510": 7470,
      "202511": 8028,
      "202512": 8736,
      "row_type": "Stage2 Required",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "total": 62493
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNAKA",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -6540,
      "202506": -6540,
      "202507": -10239,
      "202508": -7470,
      "202509": -7470,
      "202510": -7470,
      "202511": -8028,
      "202512": -8736,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNAKA",
      "plant_name": "N",
      "total": -62493
    },
    {
      "202512": 8,
      "total": 8,
      "plant_code": "LNAKA",
      "plant_name": "N",
      "row_type": "Stage1 Required"
    },
    {
      "202511": "31",
      "202512": "32",
      "plant_code": "LNALL",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "202511": 3981,
      "202512": 3981,
      "row_type": "Stage 4 Required",
      "plant_code": "LNALL",
      "plant_name": "N",
      "total": 7962
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LNALL",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": -3981,
      "202512": -3981,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LNALL",
      "plant_name": "N",
      "total": -7962
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LNALL",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": "19",
      "202512": "20",
      "plant_code": "LNALL",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "202511": 4929,
      "202512": 4929,
      "row_type": "Stage3 Required",
      "plant_code": "LNALL",
      "plant_name": "N",
      "total": 9858
    },
    {
      "total": 0,
      "plant_code": "LNALL",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LNALL",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LNALL",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LNALL",
      "plant_name": "N",
      "total": 0
    },
    {
      "202511": -4929,
      "202512": -4929,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LNALL",
      "plant_name": "N",
      "total": -9858
    },
    {
      "202505": 6402,
      "202506": 6402,
      "202507": 9040,
      "202508": 5863,
      "202509": 5863,
      "202510": 5863,
      "202511": 6466,
      "202512": 7955,
      "row_type": "Stage2 Required",
      "plant_code": "LNALL",
      "plant_name": "N",
      "total": 53854
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNALL",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNALL",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNALL",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNALL",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -6402,
      "202506": -6402,
      "202507": -9040,
      "202508": -5863,
      "202509": -5863,
      "202510": -5863,
      "202511": -6466,
      "202512": -7955,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNALL",
      "plant_name": "N",
      "total": -53854
    },
    {
      "total": 0,
      "plant_code": "LNALL",
      "plant_name": "N",
      "row_type": "Stage1 Required"
    },
    {
      "plant_code": "LNAMB",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LNAMB",
      "plant_name": "N",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LNAMB",
      "plant_name": "N",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LNAMB",
      "plant_name": "N",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LNAMB",
      "plant_name": "N",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LNAMB",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LNAMB",
      "plant_name": "N",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LNAMB",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LNAMB",
      "plant_name": "N",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LNAMB",
      "plant_name": "N",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LNAMB",
      "plant_name": "N",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LNAMB",
      "plant_name": "N",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 327,
      "202506": 327,
      "202507": 1441,
      "202508": 1114,
      "202509": 1114,
      "202510": 1113,
      "202511": 1113,
      "202512": 779,
      "row_type": "Stage2 Required",
      "plant_code": "LNAMB",
      "plant_name": "N",
      "total": 7328
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNAMB",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNAMB",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNAMB",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNAMB",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -327,
      "202506": -327,
      "202507": -1441,
      "202508": -1114,
      "202509": -1114,
      "202510": -1113,
      "202511": -1113,
      "202512": -779,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNAMB",
      "plant_name": "N",
      "total": -7328
    },
    {
      "202512": 8,
      "total": 8,
      "plant_code": "LNAMB",
      "plant_name": "N",
      "row_type": "Stage1 Required"
    },
    {
      "plant_code": "LNAOB",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LNAOB",
      "plant_name": "N",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LNAOB",
      "plant_name": "N",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LNAOB",
      "plant_name": "N",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LNAOB",
      "plant_name": "N",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LNAOB",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LNAOB",
      "plant_name": "N",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LNAOB",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LNAOB",
      "plant_name": "N",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LNAOB",
      "plant_name": "N",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LNAOB",
      "plant_name": "N",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LNAOB",
      "plant_name": "N",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 2179,
      "202506": 2179,
      "202507": 14941,
      "202508": 13548,
      "202509": 13548,
      "202510": 13548,
      "202511": 14154,
      "202512": 5096,
      "row_type": "Stage2 Required",
      "plant_code": "LNAOB",
      "plant_name": "N",
      "total": 79193
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNAOB",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNAOB",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNAOB",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNAOB",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -2179,
      "202506": -2179,
      "202507": -14941,
      "202508": -13548,
      "202509": -13548,
      "202510": -13548,
      "202511": -14154,
      "202512": -5096,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNAOB",
      "plant_name": "N",
      "total": -79193
    },
    {
      "202508": 9,
      "202509": 9,
      "202510": 9,
      "202511": 16,
      "202512": 7,
      "row_type": "Stage1 Required",
      "plant_code": "LNAOB",
      "plant_name": "N",
      "total": 50
    },
    {
      "plant_code": "LNAPE",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LNAPE",
      "plant_name": "N",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LNAPE",
      "plant_name": "N",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LNAPE",
      "plant_name": "N",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LNAPE",
      "plant_name": "N",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LNAPE",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LNAPE",
      "plant_name": "N",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LNAPE",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LNAPE",
      "plant_name": "N",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LNAPE",
      "plant_name": "N",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LNAPE",
      "plant_name": "N",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LNAPE",
      "plant_name": "N",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 66,
      "202506": 66,
      "202507": 971,
      "202508": 905,
      "202509": 905,
      "202510": 905,
      "202511": 905,
      "202512": 146,
      "row_type": "Stage2 Required",
      "plant_code": "LNAPE",
      "plant_name": "N",
      "total": 4869
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNAPE",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNAPE",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNAPE",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNAPE",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -66,
      "202506": -66,
      "202507": -971,
      "202508": -905,
      "202509": -905,
      "202510": -905,
      "202511": -905,
      "202512": -146,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNAPE",
      "plant_name": "N",
      "total": -4869
    },
    {
      "202505": 10,
      "202506": 10,
      "202507": 10,
      "row_type": "Stage1 Required",
      "plant_code": "LNAPE",
      "plant_name": "N",
      "total": 30
    },
    {
      "plant_code": "LNAPO",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LNAPO",
      "plant_name": "N",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LNAPO",
      "plant_name": "N",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LNAPO",
      "plant_name": "N",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LNAPO",
      "plant_name": "N",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LNAPO",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LNAPO",
      "plant_name": "N",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LNAPO",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LNAPO",
      "plant_name": "N",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LNAPO",
      "plant_name": "N",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LNAPO",
      "plant_name": "N",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LNAPO",
      "plant_name": "N",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 69,
      "202506": 69,
      "202507": 1214,
      "202508": 1145,
      "202509": 1145,
      "202510": 1145,
      "202511": 1145,
      "202512": 155,
      "row_type": "Stage2 Required",
      "plant_code": "LNAPO",
      "plant_name": "N",
      "total": 6087
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNAPO",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNAPO",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNAPO",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNAPO",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -69,
      "202506": -69,
      "202507": -1214,
      "202508": -1145,
      "202509": -1145,
      "202510": -1145,
      "202511": -1145,
      "202512": -155,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNAPO",
      "plant_name": "N",
      "total": -6087
    },
    {
      "202505": 9,
      "202506": 9,
      "202507": 9,
      "202511": 6,
      "202512": 6,
      "row_type": "Stage1 Required",
      "plant_code": "LNAPO",
      "plant_name": "N",
      "total": 39
    },
    {
      "plant_code": "LNATW",
      "plant_name": "N",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LNATW",
      "plant_name": "N",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LNATW",
      "plant_name": "N",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LNATW",
      "plant_name": "N",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LNATW",
      "plant_name": "N",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LNATW",
      "plant_name": "N",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LNATW",
      "plant_name": "N",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LNATW",
      "plant_name": "N",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LNATW",
      "plant_name": "N",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LNATW",
      "plant_name": "N",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LNATW",
      "plant_name": "N",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LNATW",
      "plant_name": "N",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202505": 290,
      "202506": 290,
      "202507": 250,
      "202508": 47,
      "202509": 47,
      "202510": 47,
      "202511": 213,
      "202512": 557,
      "row_type": "Stage2 Required",
      "plant_code": "LNATW",
      "plant_name": "N",
      "total": 1741
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LNATW",
      "plant_name": "N",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LNATW",
      "plant_name": "N",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LNATW",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LNATW",
      "plant_name": "N",
      "total": 0
    },
    {
      "202505": -290,
      "202506": -290,
      "202507": -250,
      "202508": -47,
      "202509": -47,
      "202510": -47,
      "202511": -213,
      "202512": -557,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LNATW",
      "plant_name": "N",
      "total": -1741
    },
    {
      "total": 0,
      "plant_code": "LNATW",
      "plant_name": "N",
      "row_type": "Stage1 Required"
    },
    {
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "total": 0,
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "row_type": "Stage 4 Required"
    },
    {
      "total": 0,
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "row_type": "Stage 4 Forcast"
    },
    {
      "total": 0,
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "row_type": "Stage 4 Fulfillment"
    },
    {
      "total": 0,
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "row_type": "Stage4 Work Hours"
    },
    {
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "total": 0,
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "row_type": "Stage3 Required"
    },
    {
      "total": 0,
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "total": 0,
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "row_type": "Stage3 Forcast Avalable"
    },
    {
      "total": 0,
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "row_type": "Stage3 Can Asigne"
    },
    {
      "total": 0,
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "row_type": "Stage3 Work Hours"
    },
    {
      "total": 0,
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "row_type": "Stage3 Fulfillment"
    },
    {
      "202507": 105,
      "202508": 105,
      "202509": 105,
      "202510": 105,
      "202511": 25,
      "row_type": "Stage2 Required",
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "total": 445
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "row_type": "Stage2 Forcast"
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "total": 0
    },
    {
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "total": 0
    },
    {
      "202507": -105,
      "202508": -105,
      "202509": -105,
      "202510": -105,
      "202511": -25,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "total": -445
    },
    {
      "total": 0,
      "plant_code": "LYUBS",
      "plant_name": "Y",
      "row_type": "Stage1 Required"
    },
    {
      "202511": "31",
      "202512": "32",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "row_type": "Stage 4 Harvest Week"
    },
    {
      "202511": 2846,
      "202512": 2846,
      "row_type": "Stage 4 Required",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": 5692
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": 0
    },
    {
      "202511": -2846,
      "202512": -2846,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": -5692
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": 0
    },
    {
      "202511": "19",
      "202512": "20",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "row_type": "Stage 4 Planting Week"
    },
    {
      "202511": 3744,
      "202512": 3744,
      "row_type": "Stage3 Required",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": 7488
    },
    {
      "total": 0,
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": 0
    },
    {
      "202511": 0,
      "202512": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": 0
    },
    {
      "202511": -3744,
      "202512": -3744,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": -7488
    },
    {
      "202505": 1370,
      "202506": 1369,
      "202507": 1162,
      "202508": 833,
      "202509": 833,
      "202510": 832,
      "202511": 996,
      "202512": 1178,
      "row_type": "Stage2 Required",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": 8573
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "202509": 0,
      "202510": 0,
      "202511": 0,
      "202512": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": 0
    },
    {
      "202505": -1370,
      "202506": -1369,
      "202507": -1162,
      "202508": -833,
      "202509": -833,
      "202510": -832,
      "202511": -996,
      "202512": -1178,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": -8573
    },
    {
      "202505": 10,
      "202506": 10,
      "202507": 10,
      "row_type": "Stage1 Required",
      "plant_code": "LYUCG",
      "plant_name": "Yucca filamentosa Color Guard-SL",
      "total": 30
    },
    {
      "202505": "23",
      "202506": "24",
      "202507": "25",
      "row_type": "Stage 4 Harvest Week",
      "plant_code": "LYURC",
      "plant_name": "Y"
    },
    {
      "202505": 1896,
      "202506": 1896,
      "202507": 1896,
      "row_type": "Stage 4 Required",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": 5688
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "row_type": "Stage 4 Forcast",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": 0
    },
    {
      "202505": -1896,
      "202506": -1896,
      "202507": -1896,
      "row_type": "Stage 4 Fulfillment",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": -5688
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "row_type": "Stage4 Work Hours",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": 0
    },
    {
      "202505": "09",
      "202506": "10",
      "202507": "11",
      "row_type": "Stage 4 Planting Week",
      "plant_code": "LYURC",
      "plant_name": "Y"
    },
    {
      "202505": 2494,
      "202506": 2494,
      "202507": 2494,
      "row_type": "Stage3 Required",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": 7482
    },
    {
      "total": 0,
      "plant_code": "LYURC",
      "plant_name": "Y",
      "row_type": "Stage3 Forcast All Actuals"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "row_type": "Stage3 Forcast Avalable",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "row_type": "Stage3 Can Asigne",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "row_type": "Stage3 Work Hours",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": 0
    },
    {
      "202505": -2494,
      "202506": -2494,
      "202507": -2494,
      "row_type": "Stage3 Fulfillment",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": -7482
    },
    {
      "202505": 4231,
      "202506": 6325,
      "202507": 6194,
      "202508": 5926,
      "row_type": "Stage2 Required",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": 22676
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "row_type": "Stage2 Actuals",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": 0
    },
    {
      "total": 0,
      "plant_code": "LYURC",
      "plant_name": "Y",
      "row_type": "Stage2 Forcast"
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "row_type": "Stage2 Can Asigne",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": 0
    },
    {
      "202505": 0,
      "202506": 0,
      "202507": 0,
      "202508": 0,
      "row_type": "Stage2 Work Hours",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": 0
    },
    {
      "202505": -4231,
      "202506": -6325,
      "202507": -6194,
      "202508": -5926,
      "row_type": "Stage2 Fulfillment",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": -22676
    },
    {
      "202505": 18,
      "202506": 18,
      "202507": 20,
      "202508": 16,
      "row_type": "Stage1 Required",
      "plant_code": "LYURC",
      "plant_name": "Y",
      "total": 72
    }
]