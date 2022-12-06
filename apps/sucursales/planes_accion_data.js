
var array_background = getPAlleteColors(10,8);
console.log(array_background)

var columsTable1 = [
  { title:"Sección", field:'seccion',hozAlign:"left",headerFilter:"input",width:300},
  { title:"Progreso", field:'progreso', hozAlign:"left", formatter:"progress", editor:true,width:200},
  { title:"Valor", field:'valor',hozAlign:"left",width:150},
];

var columsTable2 = [
  { title:"Folio", field:'folio',hozAlign:"left",headerFilter:"input",responsive:0,width:150},
  { title:"Sucursal", field:'sucursal',hozAlign:"left",headerFilter:"input",responsive:0,width:450},
  { title:"Responsable", field:'responsable',hozAlign:"left",headerFilter:"input",responsive:0,width:250},
  { title:"Seccción", field:'seccion',hozAlign:"left",headerFilter:"input",responsive:0,width:250},
  { title:"Acción solicitada", field:'accion_solicitada',hozAlign:"left",headerFilter:"input",responsive:0,width:250},
  { title:"Fecha programada", field:'fecha_programada',hozAlign:"left",headerFilter:"input",responsive:0,width:150},
  
  { title:"Acción realizada", field:'accion_realizada',hozAlign:"left",headerFilter:"input",responsive:2,width:250},
  { title:"Fecha cierre", field:'fecha_cierre',hozAlign:"left",headerFilter:"input",responsive:2,width:150},
  
  { title:"Días Vencimiento", field:'dias',hozAlign:"left",headerFilter:"input",responsive:0,width:100},
  { title:"Estatus", field:'estatus',hozAlign:"left",headerFilter:"input",responsive:0,width:250},
];


var dataTable1 = [
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


var dataTable2 = [
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
    _children:[
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
    ],
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
    _children:[
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
    ],
  },
    {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
    _children:[
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
    ],
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
    _children:[
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
    ],
  },
    {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
    _children:[
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
    ],
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
    _children:[
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
    ],
  },
    {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
    _children:[
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
    ],
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
    _children:[
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
    ],
  },
    {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
    _children:[
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
    ],
  },
  {
    folio:"10-152487",
    sucursal:"Primera Sucursal",
    responsable:"Pedro",  
    seccion:"Sección 1",
    accion_solicitada:"Limpieza ",
    fecha_programada:"26-10-2022",
    dias:"1",
    estatus:"Terminada",
    _children:[
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
      { accion_realizada:"Limpieza",fecha_cierre:"26-10-2022",},
    ],
  },
];





var data1 = {
  labels: ['Sucursal 1','Sucursal 2',' Sucursal 3'],
  datasets: [
    {
      label: 'Servicio y Experiencia',
      data: [25,10,20],
      backgroundColor: array_background[0],
    },
    {
      label: 'Mi equipo APYMSA',
      data: [10,5,10],
      backgroundColor: array_background[1],
    },
    {
      label: 'Imagen Mantenimiento y Limpieza',
      data: [10,30,15],
      backgroundColor: array_background[2],
    },
    {
      label: 'Gestión de Almacén',
      data: [10,30,15],
      backgroundColor: array_background[3],
    },
    {
      label: 'Revisión Inventario',
      data: [10,30,15],
      backgroundColor: array_background[4],
    },
    {
      label: 'Logística y Ultima milla',
      data: [10,30,15],
      backgroundColor: array_background[5],
    },
    {
      label: 'Gestión Documental',
      data: [10,30,15],
      backgroundColor: array_background[6],
    },
    {
      label: 'Crédito y Cobranza',
      data: [10,30,15],
      backgroundColor: array_background[7],
    },
  ]
};

var data2 = {
  labels: ['Regional Pedro','Regional Pablo',' Regional Mateo'],
  datasets: [
    {
      label: 'Servicio y Experiencia',
      data: [25,10,20],
      backgroundColor: array_background[0],
    },
    {
      label: 'Mi equipo APYMSA',
      data: [10,5,10],
      backgroundColor: array_background[1],
    },
    {
      label: 'Imagen Mantenimiento y Limpieza',
      data: [10,30,15],
      backgroundColor: array_background[2],
    },
    {
      label: 'Gestión de Almacén',
      data: [10,30,15],
      backgroundColor: array_background[3],
    },
    {
      label: 'Revisión Inventario',
      data: [10,30,15],
      backgroundColor: array_background[4],
    },
    {
      label: 'Logística y Ultima milla',
      data: [10,30,15],
      backgroundColor: array_background[5],
    },
    {
      label: 'Gestión Documental',
      data: [10,30,15],
      backgroundColor: array_background[6],
    },
    {
      label: 'Crédito y Cobranza',
      data: [10,30,15],
      backgroundColor: array_background[7],
    },
  ]
};

var data3 = {
  labels: ['Sucursal 1','Sucursal 1',' Sucursal 1'],
  datasets: [
    {
      label: 'Servicio y Experiencia',
      data: [25,10,20],
      backgroundColor: array_background[0],
    },
    {
      label: 'Mi equipo APYMSA',
      data: [10,5,10],
      backgroundColor: array_background[1],
    },
    {
      label: 'Imagen Mantenimiento y Limpieza',
      data: [10,30,15],
      backgroundColor: array_background[2],
    },
    {
      label: 'Gestión de Almacén',
      data: [10,30,15],
      backgroundColor: array_background[3],
    },
    {
      label: 'Revisión Inventario',
      data: [10,30,15],
      backgroundColor: array_background[4],
    },
    {
      label: 'Logística y Ultima milla',
      data: [10,30,15],
      backgroundColor: array_background[5],
    },
    {
      label: 'Gestión Documental',
      data: [10,30,15],
      backgroundColor: array_background[6],
    },
    {
      label: 'Crédito y Cobranza',
      data: [10,30,15],
      backgroundColor: array_background[7],
    },
  ]
};

var data4 = {
  labels: ['Servicio y Experiencia','Mi equipo APYMSA','Imagen Mantenimiento y Limpieza','Gestión de Almacén','Revisión Inventario','Logística y Ultima milla','Gestión Documental','Crédito y Cobranza'],
  datasets: [
    {
      label: 'Terminadas',
      data: [25,10,20,25,10,20,25,10,20,25,10,20],
      backgroundColor: array_background,
    },
  ]
};

var data5 = {
  labels: ['Sucursal 1','Sucursal 2',' Sucursal 3'],
  datasets: [
    {
      label: 'Servicio y Experiencia',
      data: [25,10,20],
      backgroundColor: array_background[0],
    },
    {
      label: 'Mi equipo APYMSA',
      data: [10,5,10],
      backgroundColor: array_background[1],
    },
    {
      label: 'Imagen Mantenimiento y Limpieza',
      data: [10,30,15],
      backgroundColor: array_background[2],
    },
    {
      label: 'Gestión de Almacén',
      data: [10,30,15],
      backgroundColor: array_background[3],
    },
    {
      label: 'Revisión Inventario',
      data: [10,30,15],
      backgroundColor: array_background[4],
    },
    {
      label: 'Logística y Ultima milla',
      data: [10,30,15],
      backgroundColor: array_background[5],
    },
    {
      label: 'Gestión Documental',
      data: [10,30,15],
      backgroundColor: array_background[6],
    },
    {
      label: 'Crédito y Cobranza',
      data: [10,30,15],
      backgroundColor: array_background[7],
    },
  ]
};


var data5 = {
  labels: ['Sucursal 1','Sucursal 2',' Sucursal 3'],
  datasets: [
    {
      label: 'Servicio y Experiencia',
      data: [25,10,20],
      backgroundColor: array_background[0],
    },
    {
      label: 'Mi equipo APYMSA',
      data: [10,5,10],
      backgroundColor: array_background[1],
    },
    {
      label: 'Imagen Mantenimiento y Limpieza',
      data: [10,30,15],
      backgroundColor: array_background[2],
    },
    {
      label: 'Gestión de Almacén',
      data: [10,30,15],
      backgroundColor: array_background[3],
    },
    {
      label: 'Revisión Inventario',
      data: [10,30,15],
      backgroundColor: array_background[4],
    },
    {
      label: 'Logística y Ultima milla',
      data: [10,30,15],
      backgroundColor: array_background[5],
    },
    {
      label: 'Gestión Documental',
      data: [10,30,15],
      backgroundColor: array_background[6],
    },
    {
      label: 'Crédito y Cobranza',
      data: [10,30,15],
      backgroundColor: array_background[7],
    },
  ]
};

var setOptions1 = {
  plugins: {

    datalabels: {
      display: false,
      color: 'white',
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        stepSize: 1
      },
    }
  }
};

var setOptions2 = {
  plugins: {
    datalabels: {
      display: false,
      color: 'white',
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        stepSize: 1
      },
    }
  }
};

var setOptions3 = {
  responsive: true,
  plugins: {
    datalabels: {
      display: false,
      color: 'white',
    },
    legend: {
      position: 'top',
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
      stacked: true,
      ticks: {
        stepSize: 1
      },
    }
  }
};

var setOptions4 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    datalabels: {
      color: 'white',
    }
  },
  scales: {
    y:{
      ticks: {
        stepSize: 1
      }, 
    }
  },
};



var setOptions5 = {
  plugins: {
    datalabels: {
      display: false,
      color: 'white',
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        stepSize: 1
      }, 
    }
  }
};
