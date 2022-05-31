
//----COLUMS TABLE
var columsTable1 = [
  { title:"Tecnico", field:'responsable'  ,headerHozAlign:"center",width:250},
  { title:"Reportes", field:'reportes'  ,headerHozAlign:"center",width:200},
  { title:"% De Reportes", field:'percentage_total'  ,headerHozAlign:"center",width:200},
  { title:"Mtto", field:'mantenimiento'  ,headerHozAlign:"center",width:200},
  { title:"% Mtto", field:'percentage_mtto'  ,headerHozAlign:"center",width:200},
  { title:"Servicio", field:'servicio'  ,headerHozAlign:"center",width:200},
  { title:"% Servicio", field:'percentage_servicio'  ,headerHozAlign:"center",width:200},
  { title:"Visitas", field:'visita'  ,headerHozAlign:"center",width:200},
  { title:"% Visitas", field:'percentage_visita'  ,headerHozAlign:"center",width:200},
];

var dataTable1 = [
  {"id":1, "responsable": "Francisco Don", "reportes": 35, "percentage_total":"38%" ,
    "mantenimiento":15, "percentage_mtto":"42%",
    "servicio":20,     "percentage_servicio":"51%",
    "visitas":2,       "percentage_visita":"5%"},
  {"id":2, "responsable": "Ernesto Vela", "reportes": 25, "percentage_total":"27%" ,
    "mantenimiento":10, "percentage_mtto":"40%",
    "servicio":10,     "percentage_servicio":"40%",
    "visitas":5,       "percentage_visita":"20%"},
  {"id":3, "responsable": "Martin Atinado", "reportes": 30, "percentage_total":"33%" ,
    "mantenimiento":10, "percentage_mtto":"33%",
    "servicio":10,     "percentage_servicio":"33%",
    "visitas":10,       "percentage_visita":"33%"},
]


//---ESTATUS DE MTTO
var columsTable2 = [
  { title:"Tecnico", field:'responsable'  , formatter:"money",hozAlign:"center",width:250},
  { title:"Abiertas", field:'abiertos'  ,formatter:"money",hozAlign:"center", width:250, },
  { title:"% Abiertas", field:'percentage_abiertos'  ,formatter:"money",hozAlign:"center",width:200},
  { title:"Progreso", field:'progreso'  ,formatter:"money",hozAlign:"center",width:200},
  { title:"% Progreso", field:'percentage_progreso'  ,formatter:"money",hozAlign:"center",width:200},
  { title:"Cerradas", field:'cerrado'  ,formatter:"money" , hozAlign:"center",width:200},
  { title:"% Cerradas", field:'percentage_cerrado'  ,formatter:"money" , hozAlign:"center",width:200},
  { title:"Total", field:'reportes'  ,formatter:"money" , hozAlign:"center",width:200},
];

var dataTable2 = [
  { 
    "abiertos": 0,"cerrado": 0,
    "percentage_abiertos": 0,
    "percentage_cerrado": 0,
    "percentage_pendientes": 0,
    "percentage_progreso": 0,
    "progreso": 0,
    "reportes": 0,
    "responsable": "Francisco Don"
  },
]

//---ESTATUS DE SERVICIO
var columsTable3 = [
  { title:"Tecnico", field:'responsable'  ,hozAlign:"center",width:250},
  { title:"Abiertas", field:'abiertos'  ,hozAlign:"center",width:250},
  { title:"% Abiertas", field:'percentage_abiertos'  ,hozAlign:"center",width:200},
  { title:"Pendientes", field:'pendientes'  ,hozAlign:"center",width:200},
  { title:"% Pendientes", field:'percentage_pendientes'  ,hozAlign:"center",width:200},
  { title:"Cerradas", field:'cerrado'  ,hozAlign:"center",width:200},
  { title:"% Cerradas", field:'percentage_cerrado'  ,hozAlign:"center",width:200},
  { title:"Total", field:'reportes'  ,hozAlign:"center",width:200},
];

var dataTable3 = [
  { 
    "abiertos": 0,
    "cerrado": 4,
    "pendientes": 0,
    "percentage_abiertos": 0,
    "percentage_cerrado": 28.57,
    "percentage_pendientes": 0,
    "percentage_progreso": 0,
    "reportes": 4,
    "responsable": "Francisco Don"
  },
]

//---ESTATUS DE VISITA
var columsTable4 = [
  { title:"Tecnico", field:'responsable'  ,hozAlign:"center",width:250},
  { title:"Abiertas", field:'abiertos'  ,hozAlign:"center",width:250},
  { title:"% Abiertas", field:'percentage_abiertos'  ,hozAlign:"center",width:200},
  { title:"Cerradas", field:'cerrado'  ,hozAlign:"center",width:200},
  { title:"% Cerradas", field:'percentage_cerrado'  ,hozAlign:"center",width:200},
  { title:"Total", field:'reportes'  ,hozAlign:"center",width:200},
];

var dataTable4 = [
  { 
    "abiertos": 0,
    "cerrado": 0,
    "percentage_abiertos": 0,
    "percentage_cerrado": 0,
    "percentage_pendientes": 0,
    "percentage_progreso": 0,
    "reportes": 0,
    "responsable": "Francisco Don"
  },
];


//----EVIDENCIAS DE MTTTO
var columsTable6 = [
  { title:"Tecnico", field:'responsable'  ,hozAlign:"center",width:250},
  { title:"# de Reporte de Mtto", field:'reportes'  ,hozAlign:"center",width:250},
  { title:"2 o mas evidencias", field:'evidencias'  ,hozAlign:"center",width:200},
  { title:"Prom Campos llenos x reporte", field:'percentage_campos'  ,hozAlign:"center",width:200},
];

var dataTable6 = [
  { 
    "campos": 377,
    "evidencias": 1,
    "percentage_campos": 45.89,
    "percentage_reabiertos": 0,
    "reportes": 13,
    "responsable": "Francisco Don",
    "total": 173
  },
];


//----EVIDENCIAS SERVICIO
var columsTable7 = [
  { title:"Tecnico", field:'responsable'  ,hozAlign:"center",width:250},
  { title:"# de Reporte de Servicio", field:'reportes'  ,hozAlign:"center",width:250},
  { title:"2 o mas evidencias", field:'evidencias'  ,hozAlign:"center",width:200},
  { title:"Prom Campos llenos x reporte", field:'percentage_campos'  ,hozAlign:"center",width:200},
  { title:"Reportes ReAbiertos", field:'reabiertos'  ,hozAlign:"center",width:200},
  { title:"% de Reporte ReAbiertos", field:'percentage_reabiertos'  ,hozAlign:"center",width:200},
];

var dataTable7 = [
  { 
    "campos": 158,
    "evidencias": 6,
    "percentage_campos": 53.16,
    "percentage_reabiertos": 0,
    "reabiertos": 0,
    "reportes": 7,
    "responsable": "Francisco Don",
    "total": 84
  },
];

//---FACTURACIÓN
var columsTable8 = [
  { title:"Tecnico", field:'tecnico'  ,hozAlign:"center"},
  { title:"Valor Facturado", field:'total'  ,hozAlign:"center"},
  { title:"Calificacion de Servicio", field:'calificacion'  ,hozAlign:"center"},
];

var dataTable8 = [
  { 
    "calificacion": 4,
    "tecnico": "Francisco Don",
    "total": 0
  }
];


var dataGraphic1 = [
  { 
    percentage_total: 24,
    responsable: "Facundo Fermin"
  },
  { 
    percentage_total: 25,
    responsable: "Pedro Orlando"
  },
  { 
    percentage_total: 51,
    responsable: "Tomas Carlos"
  }
];

var dataGraphic2 = [
  { 
    Porcentaje: 74.0,
    Title: "Servicio"
  },
  { 
    Porcentaje: 26.0,
    Title: "MAntenimiento"
  },
];