//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'card', col: '4', id:'cardFirst', title:'Tareas en Curso', hexadecimal:'#FFC133'},
            { type:'card', col: '4', id:'cardSecond', title:'Tareas En Pruebas', hexadecimal:'#FFE733'},
            { type:'card', col: '4', id:'cardThird', title:'Tareas Pendientes', hexadecimal:'#D4FF33'},

            { type:'card', col: '6', id:'cardFourth', title:'Horas No Facturables', hexadecimal:'#FF8D33'},
            { type:'card', col: '6', id:'cardFiveth', title:'Horas Facturables', hexadecimal:'#FF5733'},
        ] 
    },
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Reporte Ordenes de Trabajo'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '12', id:'chartFirst', title:'Horas X Día'},
        ] 
    },
];


//-----Configuraciones de la tabla
let columsTable1 = [
    { title:"Usuario", field:'usuario',frozen:true,  width:250},
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
  responsive: true, 
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
