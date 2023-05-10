// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Usuario", field:'usuario',frozen:true, hozAlign:"left",  width:250},
  {title:"Horas", hozAlign:"center", 
    columns:[
      {title:"Ayer", field:'horas_ayer',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",frozen:false, width:150},
      {title:"Semana", field:'horas_semana',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",frozen:false, width:150},
      {title:"Mes", field:'horas_mes',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",frozen:false, width:150},
      {title:"Estimadas", field:'horas_estimadas',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",frozen:false, width:150},
    ]
  },
  {title:"Horas Facturación", hozAlign:"center", 
    columns:[
      {title:"Facturables Ayer", field:'facurables_horas_ayer',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",frozen:false, width:150},
      {title:"No Facturables Ayer", field:'no_facturables_horas_ayer',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",frozen:false, width:150},
      {title:"Facturables semana", field:'facurables_horas_semana',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",frozen:false, width:150},
      {title:"No Facturables semana", field:'no_facturables_horas_semana',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",frozen:false, width:150},
      {title:"Facturables mes", field:'facurables_horas_mes',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",frozen:false, width:150},
      {title:"No Facturables mes", field:'no_facturables_horas_mes',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",frozen:false, width:150},
    ]
  },
  {title:"Tareas", hozAlign:"center", 
    columns:[
      {title:"Pendientes", field:'tareas_pendientes',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",frozen:false, width:150},
      {title:"En Curso", field:'tareas_encurso',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",frozen:false, width:150},
      {title:"En pruebas y revisión", field:'tareas_pruebas',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",frozen:false, width:150},
      {title:"Pausadas", field:'tareas_pausadas',hozAlign:"right",headerTooltip:true, bottomCalc:"sum",frozen:false, width:150},
    ]
  },
];

//--- PENDIENTES = BORRADOR
//--- EN CURSO = EN PROGRESO O EN PRUEBAS
//--- PAUSADAS = PENDIENTES


//-----FILTRAR TODO AQUELLO QUE NO ESTE TERMINADO, DETENIDO O CANCELADO
//-----ESTIMADAS = A LA SUMA DE LAS HORAS PENDIENTES DE LAS ORDENES DE TRABAJO


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
