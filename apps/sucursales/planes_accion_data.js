
var array_background = getPAlleteColors(10,8);


var columsTable1 = [
  { title:"Folio", field:'folio',hozAlign:"left",width:150},
  { title:"Sucursal", field:'sucursal',hozAlign:"left",width:450},
  { title:"Responsable", field:'responsable',hozAlign:"left",width:250},
  { title:"Seccción", field:'seccion',hozAlign:"left",width:250},
  { title:"Acción solicitada", field:'accion_solicitada',hozAlign:"left",width:250},
  { title:"Fecha programada", field:'fecha_programada',hozAlign:"left",width:150},
  { title:"Acción realizada", field:'accion_realizada',hozAlign:"left",width:250},
  { title:"Fecha cierre", field:'fecha_cierre',hozAlign:"left",width:150},
  { title:"Días Vencimiento", field:'dias',hozAlign:"left",width:100},
  { title:"Estatus", field:'estatus',hozAlign:"left",width:250},
];

var columsTable2 = [
  { title:"Sección", field:'seccion',hozAlign:"left",width:300},
  { title:"Progreso", field:'progreso', hozAlign:"left", formatter:"progress", editor:true,width:200},
  { title:"Valor", field:'valor',hozAlign:"left",width:150},
];


var dataTable1 = [
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    accion_realizada:"Limpieza",
    fecha_cierre:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    accion_realizada:"Limpieza",
    fecha_cierre:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    accion_realizada:"Limpieza",
    fecha_cierre:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    accion_realizada:"Limpieza",
    fecha_cierre:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    accion_realizada:"Limpieza",
    fecha_cierre:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    accion_realizada:"Limpieza",
    fecha_cierre:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    accion_realizada:"Limpieza",
    fecha_cierre:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    accion_realizada:"Limpieza",
    fecha_cierre:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    accion_realizada:"Limpieza",
    fecha_cierre:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    accion_realizada:"Limpieza",
    fecha_cierre:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    accion_realizada:"Limpieza",
    fecha_cierre:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
  },
];


var dataTable2 = [
  {
    seccion:" Servicio y Experiencia",
    progreso:50,
    valor:"50",
  },
  {
    seccion:" Mi equipo APYMSA",
    progreso:50,
    valor:"50",
  },
  {
    seccion:"Imagen Mantenimiento y Limpieza",
    progreso:50,
    valor:"50",
  },
  {
    seccion:"Gestión de Almacén",
    progreso:50,
    valor:"50",
  },
  {
    seccion:" Revisión Inventario",
    progreso:50,
    valor:"50",
  },
  {
    seccion:"Logística y Ultima milla",
    progreso:50,
    valor:"50",
  },
  {
    seccion:"Gestión Documental",
    progreso:50,
    valor:"50",
  },
  {
    seccion:"Crédito y Cobranza",
    progreso:50,
    valor:"50",
  },
];



var data1 = {
  labels: ['Sucursal 1','Sucursal 2',' Sucursal 3'],
  datasets: [
    {
      label: 'Seccción 1',
      data: [25,10,20],
      backgroundColor: array_background[0],
    },
    {
      label: 'Seccción 2',
      data: [10,5,10],
      backgroundColor: array_background[1],
    },
    {
      label: 'Seccción 3',
      data: [10,30,15],
      backgroundColor: array_background[2],
    },
    {
      label: 'Seccción 4',
      data: [10,30,15],
      backgroundColor: array_background[3],
    },
    {
      label: 'Seccción 5',
      data: [10,30,15],
      backgroundColor: array_background[4],
    },
    {
      label: 'Seccción 6',
      data: [10,30,15],
      backgroundColor: array_background[5],
    },
    {
      label: 'Seccción 7',
      data: [10,30,15],
      backgroundColor: array_background[6],
    },
    {
      label: 'Seccción 8',
      data: [10,30,15],
      backgroundColor: array_background[7],
    },
  ]
};

var data2 = {
  labels: ['Regional Pedro','Regional Pablo',' Regional Mateo'],
  datasets: [
    {
      label: 'Seccción 1',
      data: [25,10,20],
      backgroundColor: array_background[0],
    },
    {
      label: 'Seccción 2',
      data: [10,5,10],
      backgroundColor: array_background[1],
    },
    {
      label: 'Seccción 3',
      data: [10,30,15],
      backgroundColor: array_background[2],
    },
    {
      label: 'Seccción 4',
      data: [10,30,15],
      backgroundColor: array_background[3],
    },
    {
      label: 'Seccción 5',
      data: [10,30,15],
      backgroundColor: array_background[4],
    },
    {
      label: 'Seccción 6',
      data: [10,30,15],
      backgroundColor: array_background[5],
    },
    {
      label: 'Seccción 7',
      data: [10,30,15],
      backgroundColor: array_background[6],
    },
    {
      label: 'Seccción 8',
      data: [10,30,15],
      backgroundColor: array_background[7],
    },
  ]
};

var data3 = {
  labels: ['Sucursal 1','Sucursal 2','Sucursal 3','Sucursal 4','Sucursal 5','Sucursal 6','Sucursal 7','Sucursal 8'],
  datasets: [
    {
      label: 'Realizadas',
      data: [25,10,20,25,10,20,25,10],
      backgroundColor: '#1D566E',
    },
    {
      label: 'Incompletas',
      data: [10,25,20,10,25,20,10,-25],
      backgroundColor: '#163A5F',
    },
  ]
};

var data4 = {
  labels: ['Sucursal 1','Sucursal 2',' Sucursal 3'],
  datasets: [
    {
      label: 'Seccción 1',
      data: [25,10,20],
      backgroundColor: array_background[1],
    },
    {
      label: 'Seccción 2',
      data: [10,5,10],
      backgroundColor: array_background[2],
    },
    {
      label: 'Seccción 3',
      data: [10,30,15],
      backgroundColor: array_background[3],
    },
    {
      label: 'Seccción 4',
      data: [10,30,15],
      backgroundColor: array_background[4],
    },
    {
      label: 'Seccción 5',
      data: [10,30,15],
      backgroundColor: array_background[5],
    },
    {
      label: 'Seccción 6',
      data: [10,30,15],
      backgroundColor: array_background[6],
    },
    {
      label: 'Seccción 7',
      data: [10,30,15],
      backgroundColor: array_background[7],
    },
    {
      label: 'Seccción 8',
      data: [10,30,15],
      backgroundColor: array_background[8],
    },
  ]
};

var setOptions1 = {
  plugins: {
    title: {
      display: true,
      text: 'Acciones correctivas activas por sucursal',
      font: {
        size: 25
      }
    },
    datalabels: {
      color: 'white',
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
};

var setOptions2 = {
  plugins: {
    title: {
      display: true,
      text: 'Acciones correctivas activas por Regional',
      font: {
        size: 25
      }
    },
    datalabels: {
      color: 'white',
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
};

var setOptions3 = {
  responsive: true,
  plugins: {
    datalabels: {
      color: 'white',
    },
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Tareas vencidas'
    }
  }
};

var setOptions4 = {
  plugins: {
    title: {
      display: true,
      text: 'Actividades terminadas por sucursal',
      font: {
        size: 25
      }
    },
    datalabels: {
      color: 'white',
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
};
