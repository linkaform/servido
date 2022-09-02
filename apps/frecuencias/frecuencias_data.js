// Datos demo para Reporte ENcuestas MOntaje


//-- Tabla 1 

//-- Tabla 1 
var columsTable1 = [
  { title:"Localidad", field:'localidad',hozAlign:"left",width:400},
  { title:"Tipo de observación",  field:'observación',hozAlign:"left",width:400 },
  { title:"Tipo",   field:'tipo',hozAlign:"center",width:200 },
  { title:"Estado",  field:'estado',hozAlign:"center",width:150 },
  { title:"Realizados",  field:'realizados',hozAlign:"center",width:150 },
  { title:"Requeridos",  field:'requeridos',hozAlign:"center",width:150 },
];

var columsTable2 = [
  { title:"Localidad", field:'observacion',hozAlign:"left",width:350},
  { title:"Realizados",  field:'realizado',hozAlign:"right",width:150 },
  { title:"Requeridos",   field:'requeridos',hozAlign:"right",width:160 },
  { title:"Alcance",  field:'alcance',hozAlign:"center",width:130 },
];


var columsTable3 = [
  { title:"Tipo de checklist", field:'etiqueta',hozAlign:"left",width:350},
  { title:"Sum of REALIZADOS",  field:'realizado',hozAlign:"right",width:200 },
  { title:"Sum of REQUERIDOS",   field:'requeridos',hozAlign:"right",width:200 },
  { title:"Alcance",  field:'alcance',hozAlign:"center",width:130 },
];


var dataTable1 = [
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    observación:"AB-F-01 CHECK LIST BARRA Y URNAS",
    tipo:"Monthly",
    estado:"A Tiempo",
    realizados:28,
    requeridos:30,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    observación:"AB-F-01 CHECK LIST BARRA Y URNAS",
    tipo:"Monthly",
    estado:"A Tiempo",
    realizados:45,
    requeridos:30,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    observación:"AB-F-01 CHECK LIST BARRA Y URNAS",
    tipo:"Monthly",
    estado:"Sin Enviar",
    realizados:45,
    requeridos:30,
  },
  {
    localidad: "Choco ATO SJO", 
    observación:"AB-F-01 CHECK LIST BARRA Y URNAS",
    tipo:"Monthly",
    estado:"Sin Enviar",
    realizados:45,
    requeridos:30,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    observación:"AB-F-01 CHECK LIST BARRA Y URNAS",
    tipo:"Monthly",
    estado:"A Tiempo",
    realizados:28,
    requeridos:30,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    observación:"AB-F-01 CHECK LIST BARRA Y URNAS",
    tipo:"Monthly",
    estado:"A Tiempo",
    realizados:28,
    requeridos:30,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    observación:"AB-F-01 CHECK LIST BARRA Y URNAS",
    tipo:"Monthly",
    estado:"Sin Enviar",
    realizados:28,
    requeridos:30,
  },
  {
    localidad: "Patio-Bar Imperial ATO SJO", 
    observación:"AB-F-19 CHECK LIST COCINA",
    tipo:"Monthly",
    estado:"Sin Enviar",
    realizados:15,
    requeridos:30,
  }
];


var dataTable2 = [
  {
    observacion:"AB-F-01 CHECK LIST BARRA Y URNAS", 
    realizado:518,
    requeridos:518,
    alcance:100,
  },
   {
    observacion:"AB-F-01 CHECK LIST BARRA Y URNAS", 
    realizado:518,
    requeridos:518,
    alcance:100,
  },
  {
    observacion:"AB-F-10-AM CONTROL DE TEMPERATURAS Y TIEMPOS DE VIDA", 
    realizado:518,
    requeridos:518,
    alcance:100,
  },
   {
    observacion:"AB-F-10-AM CONTROL DE TEMPERATURAS Y TIEMPOS DE VIDA", 
    realizado:518,
    requeridos:518,
    alcance:100,
  },
  {
    observacion:"AB-F-16B Check List Supervisor-CIERRE", 
    realizado:518,
    requeridos:518,
    alcance:100,
  },
   {
    observacion:"AB-F-32 TRAMPAS DE GRASA (Limpieza y Mantenimiento)", 
    realizado:518,
    requeridos:518,
    alcance:100,
  },
   {
    observacion:"AB-F-32 TRAMPAS DE GRASA (Limpieza y Mantenimiento)", 
    realizado:518,
    requeridos:518,
    alcance:100,
  },
  {
    observacion:"AB-F-33B BAR IMPERIAL-CIERRE-Check List Operativo FOH ", 
    realizado:518,
    requeridos:518,
    alcance:100,
  }
];


var dataTable3 = [
  {
    etiqueta:"AE-F-34 Control de Temperaturas Equipos Comedor", 
    realizado:518,
    requeridos:518,
    alcance:100,
  },
  {
    etiqueta:"AE-F-34 Control de Temperaturas Equipos Comedor", 
    realizado:518,
    requeridos:518,
    alcance:100,
  },
  {
    etiqueta:"AE-F-08-AM CONTROL DE TEMPERATURAS Y TIEMPOS DE VIDA", 
    realizado:518,
    requeridos:518,
    alcance:100,
  },
  {
    etiqueta:"AE-F-08-AM CONTROL DE TEMPERATURAS Y TIEMPOS DE VIDA", 
    realizado:518,
    requeridos:518,
    alcance:100,
  },
  {
    etiqueta:"AE-F-35 Control de Temperaturas Alimentos Comedor", 
    realizado:518,
    requeridos:518,
    alcance:100,
  },
  {
    etiqueta:"AE-F-37 Check list Operativo Cierre Comedor", 
    realizado:518,
    requeridos:518,
    alcance:100,
  },
  {
    etiqueta:"AE-F-37 Check list Operativo Cierre Comedor", 
    realizado:518,
    requeridos:518,
    alcance:100,
  },
  {
    etiqueta:"AE-F-37 Check list Operativo Cierre Comedor", 
    realizado:518,
    requeridos:518,
    alcance:100,
  }
];




var dataFourthElement = {
  labels: ["COMEDOR CORTEZA","Clinica Biblica", "Bakery Multiplaza Escazú", "Bakery Multiplaza del Este", "Bakery Jacó", "Bakery Heredia"],
  datasets: [
    {
      label: "Realizado",
      backgroundColor: ["#3498db"],
      data: [288, 753, 799, 818, 617, 4000],
    },
    {
      label: "Requeridos",
      backgroundColor: ["#d35400"],
      data: [456, 819, 819, 819, 4500],
    }
  ]
}; 


var dataFivethElement = {
  labels: ["AE-F-02 CHECK LIST COCINA ","AE-F-03 CHECK LIST SALÓN", "AE-F-34 Control de Temperaturas Equipos Comedor" , "AE-F-37 Check list Operativo Cierre Comedor", "AE-F-38 Chequeo Sabor y Apariencia de la comida","AE-F-02 CHECK LIST COCINA "],
  datasets: [
    {
      label: "Realizado",
      backgroundColor: ["#3498db"],
      data: [388, 853, 699, 718, 717, 3000],
    },
    {
      label: "Requeridos",
      backgroundColor: ["#d35400"],
      data: [456, 919, 919, 319, 1500],
    }
  ]
}; 


var dataConfigFourth = {
  plugins: {
    legend: {
      display: true
    },
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    },
    title: {
      display: true,
      text: 'Grafica X Localidad',
      font: {
        size: 25
      }
    },
    datalabels: {
      color: 'black',
      labels: {
        title: {
          font: {
            weight: 'bold'
          }
        },
      },
      align:'top',
    }
  },
}


var dataConfigFiveth = {
  plugins: {
    legend: {
      display: true
    },
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    },
    title: {
      display: true,
      text: 'Grafica x Check',
      font: {
        size: 25
      }
    },
    datalabels: {
      color: 'black',
      labels: {
        title: {
          font: {
            weight: 'bold'
          }
        },
      },
      align:'top',
    }
  },
}

