// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Usuario", field:'usuario',hozAlign:"left",width:250},
  {title:"Horas", hozAlign:"center", 
    columns:[
      {title:"Ayer", field:'horas_ayer',hozAlign:"right",width:150},
      {title:"Semana", field:'horas_semana',hozAlign:"right",width:150},
      {title:"Mes", field:'horas_mes',hozAlign:"right",width:150},
      {title:"Estimadas", field:'horas_estimadas',hozAlign:"right",width:150},
    ]
  },
  {title:"Tareas", hozAlign:"center", 
    columns:[
      {title:"Pendientes", field:'tareas_pendientes',hozAlign:"right",width:150},
      {title:"En Curso", field:'tareas_encurso',hozAlign:"right",width:150},
      {title:"En pruebas y revisión", field:'tareas_pruebas',hozAlign:"right",width:150},
      {title:"Pausadas", field:'tareas_pausadas',hozAlign:"right",width:150},
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
  },
];
