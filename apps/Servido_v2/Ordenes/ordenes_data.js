//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'card', col: '6', id:'cardFirst', title:'Horas No Facturables'},
            { type:'card', col: '6', id:'cardSecond', title:'Horas Totales No Facturables'},
        ] 
    },
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Detalle de empleados'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartFirst', title:'Horas Facturables X Día'},
            { type:'chart', col: '6', id:'chartSecond', title:'Horas Factuables X Empleado'},
        ] 
    },
];

//------Configuraciones de las tablas
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

let dataTable1 = [
  {
    "usuario": "Juan Pérez",
    "horas_ayer": 8,
    "horas_semana": 40,
    "horas_mes": 160,
    "horas_estimadas": 180,
    "facurables_horas_ayer": 6,
    "no_facturables_horas_ayer": 2,
    "facurables_horas_semana": 30,
    "no_facturables_horas_semana": 10,
    "facurables_horas_mes": 120,
    "no_facturables_horas_mes": 40,
    "tareas_pendientes": 5,
    "tareas_encurso": 3,
    "tareas_pruebas": 2,
    "tareas_pausadas": 1
  },
  {
    "usuario": "María López",
    "horas_ayer": 7,
    "horas_semana": 35,
    "horas_mes": 140,
    "horas_estimadas": 150,
    "facurables_horas_ayer": 5,
    "no_facturables_horas_ayer": 2,
    "facurables_horas_semana": 25,
    "no_facturables_horas_semana": 10,
    "facurables_horas_mes": 100,
    "no_facturables_horas_mes": 40,
    "tareas_pendientes": 4,
    "tareas_encurso": 3,
    "tareas_pruebas": 1,
    "tareas_pausadas": 0
  },
  {
    "usuario": "Carlos Sánchez",
    "horas_ayer": 6,
    "horas_semana": 30,
    "horas_mes": 120,
    "horas_estimadas": 140,
    "facurables_horas_ayer": 4,
    "no_facturables_horas_ayer": 2,
    "facurables_horas_semana": 20,
    "no_facturables_horas_semana": 10,
    "facurables_horas_mes": 80,
    "no_facturables_horas_mes": 40,
    "tareas_pendientes": 3,
    "tareas_encurso": 4,
    "tareas_pruebas": 2,
    "tareas_pausadas": 1
  },
  {
    "usuario": "Ana García",
    "horas_ayer": 9,
    "horas_semana": 45,
    "horas_mes": 180,
    "horas_estimadas": 190,
    "facurables_horas_ayer": 7,
    "no_facturables_horas_ayer": 2,
    "facurables_horas_semana": 35,
    "no_facturables_horas_semana": 10,
    "facurables_horas_mes": 140,
    "no_facturables_horas_mes": 40,
    "tareas_pendientes": 6,
    "tareas_encurso": 2,
    "tareas_pruebas": 3,
    "tareas_pausadas": 1
  },
  {
    "usuario": "Luis Martínez",
    "horas_ayer": 8,
    "horas_semana": 40,
    "horas_mes": 160,
    "horas_estimadas": 180,
    "facurables_horas_ayer": 6,
    "no_facturables_horas_ayer": 2,
    "facurables_horas_semana": 28,
    "no_facturables_horas_semana": 12,
    "facurables_horas_mes": 120,
    "no_facturables_horas_mes": 40,
    "tareas_pendientes": 4,
    "tareas_encurso": 5,
    "tareas_pruebas": 1,
    "tareas_pausadas": 2
  },
  {
    "usuario": "Sofía Torres",
    "horas_ayer": 7,
    "horas_semana": 35,
    "horas_mes": 140,
    "horas_estimadas": 150,
    "facurables_horas_ayer": 5,
    "no_facturables_horas_ayer": 2,
    "facurables_horas_semana": 24,
    "no_facturables_horas_semana": 11,
    "facurables_horas_mes": 96,
    "no_facturables_horas_mes": 44,
    "tareas_pendientes": 3,
    "tareas_encurso": 3,
    "tareas_pruebas": 1,
    "tareas_pausadas": 1
  },
  {
    "usuario": "Jorge Ramírez",
    "horas_ayer": 9,
    "horas_semana": 45,
    "horas_mes": 180,
    "horas_estimadas": 200,
    "facurables_horas_ayer": 7,
    "no_facturables_horas_ayer": 2,
    "facurables_horas_semana": 33,
    "no_facturables_horas_semana": 12,
    "facurables_horas_mes": 132,
    "no_facturables_horas_mes": 48,
    "tareas_pendientes": 7,
    "tareas_encurso": 2,
    "tareas_pruebas": 2,
    "tareas_pausadas": 1
  },
  {
    "usuario": "Clara Gómez",
    "horas_ayer": 8,
    "horas_semana": 40,
    "horas_mes": 160,
    "horas_estimadas": 175,
    "facurables_horas_ayer": 6,
    "no_facturables_horas_ayer": 2,
    "facurables_horas_semana": 28,
    "no_facturables_horas_semana": 12,
    "facurables_horas_mes": 112,
    "no_facturables_horas_mes": 48,
    "tareas_pendientes": 6,
    "tareas_encurso": 3,
    "tareas_pruebas": 2,
    "tareas_pausadas": 1
  },
  {
    "usuario": "Ricardo Hernández",
    "horas_ayer": 6,
    "horas_semana": 30,
    "horas_mes": 120,
    "horas_estimadas": 135,
    "facurables_horas_ayer": 4,
    "no_facturables_horas_ayer": 2,
    "facurables_horas_semana": 20,
    "no_facturables_horas_semana": 10,
    "facurables_horas_mes": 80,
    "no_facturables_horas_mes": 40,
    "tareas_pendientes": 2,
    "tareas_encurso": 4,
    "tareas_pruebas": 2,
    "tareas_pausadas": 0
  },
  {
    "usuario": "Laura Moreno",
    "horas_ayer": 8,
    "horas_semana": 40,
    "horas_mes": 160,
    "horas_estimadas": 180,
    "facurables_horas_ayer": 7,
    "no_facturables_horas_ayer": 1,
    "facurables_horas_semana": 35,
    "no_facturables_horas_semana": 5,
    "facurables_horas_mes": 140,
    "no_facturables_horas_mes": 20,
    "tareas_pendientes": 5,
    "tareas_encurso": 4,
    "tareas_pruebas": 3,
    "tareas_pausadas": 1
  },
  {
    "usuario": "Marta Vázquez",
    "horas_ayer": 7,
    "horas_semana": 35,
    "horas_mes": 140,
    "horas_estimadas": 150,
    "facurables_horas_ayer": 5,
    "no_facturables_horas_ayer": 2,
    "facurables_horas_semana": 25,
    "no_facturables_horas_semana": 10,
    "facurables_horas_mes": 100,
    "no_facturables_horas_mes": 40,
    "tareas_pendientes": 4,
    "tareas_encurso": 3,
    }
]

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
        color: 'white',
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
        label: 'Horas',
        data: [135,100,150,120,120],
        fill: false,
        backgroundColor: [],
      },
    ]
};

var setOptions2 = {
    responsive: true,
    maintainAspectRatio: false,
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
           }
        }
  },
};

var dataChart2 = {
    labels: ["21-10-2024", "22-10-2024", "23-10-2024", "24-10-2024"],
    datasets: [
      {
          label: 'Juan Pérez',
          data: [200,100,150,50,120],
          backgroundColor: [],
          borderColor: [],
      },
      {
          label: 'María López',
          data: [200,100,150,50,120],
          backgroundColor: [],
          borderColor: [],
      },
      {
          label: 'Carlos Sánchez',
          data: [200,100,150,50,120],
          backgroundColor: [],
          borderColor: [],
      },

    ]
};



