// Datos demo para Reporte ENcuestas MOntaje

//-- Tabla 1 
var columsTable1 = [
  { title:"Localidad", field:'localidad',hozAlign:"left",width:400},
  { title:"Tienda", field:'tienda',hozAlign:"left",width:400},
  { title:"Estado",  field:'estado',hozAlign:"center",formatter:"tickCross", sorter:"boolean", editor:true, width:150 },
  { title:"Realizados",  field:'realizados',hozAlign:"center",width:150 },
  { title:"Requeridos",  field:'requeridos',hozAlign:"center",width:150 },
  { title:"Progreso", field:"alcance", formatter:"progress", editor:"progress", editorParams:{min:0, max:100,},width:250}
];


var columsTable2 = [
  { title:"Localidad", field:'localidad',hozAlign:"left",width:500},
  { title:"Tienda", field:'tienda',hozAlign:"left",width:500},
  { title:"Realizados",field:'realizados',hozAlign:"right",width:150 },
  { title:"Requeridos",field:'requeridos',hozAlign:"right",width:160 },
  { title:"Alcance",  field:'alcance',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:130 },
  { title:"Progreso", field:"alcance_progress", formatter:"progress", editor:"progress", editorParams:{min:0, max:100,},width:250}
];

var columsTable3 = [
  { title:"Tipo de checklist", field:'nombre',hozAlign:"left",width:500},
  { title:"Realizados",field:'realizados',hozAlign:"right",width:150 },
  { title:"Requeridos",field:'requeridos',hozAlign:"right",width:160 },
  { title:"Alcance",  field:'alcance',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:130 },
  { title:"Progreso", field:"alcance_progress", formatter:"progress", editor:"progress", editorParams:{min:0, max:100,},width:250}
];


var columsTable4 = [
  { title:"Localidad", field:'localidad',hozAlign:"left",width:500},
  {title:"AB-F-01 EXAMPLE", hozAlign:"center",
    columns:[
      {title:"Cantidad", field:'cantidad_abf_01',hozAlign:"right",width:100},
      {title:"Porcentajes", field:'porcentaje_abf_01',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:120},
    ]
  },
  {title:"AB-F-02 EXAMPLE", hozAlign:"center",
    columns:[
      {title:"Cantidad", field:'cantidad_abf_02',hozAlign:"right",width:100},
      {title:"Porcentajes", field:'porcentaje_abf_02',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:120},
    ]
  },
  {title:"AB-F-03 EXAMPLE", hozAlign:"center",
    columns:[
      {title:"Cantidad", field:'cantidad_abf_03',hozAlign:"right",width:100},
      {title:"Porcentajes", field:'porcentaje_abf_03',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:120},
    ]
  },
  {title:"AB-F-04 EXAMPLE", hozAlign:"center",
    columns:[
      {title:"Cantidad", field:'cantidad_abf_04',hozAlign:"right",width:100},
      {title:"Porcentajes", field:'porcentaje_abf_04',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:120},
    ]
  },
  {title:"AB-F-05 EXAMPLE", hozAlign:"center",
    columns:[
      {title:"Cantidad", field:'cantidad_abf_04',hozAlign:"right",width:100},
      {title:"Porcentajes", field:'porcentaje_abf_04',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:120},
    ]
  },
];




var dataTable1 = [
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    nombre:"AB-F-01 CHECK LIST BARRA Y URNAS",
    estado:1,
    realizados:28,
    requeridos:30,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    nombre:"AB-F-01 CHECK LIST BARRA Y URNAS",
    estado:1,
    realizados:45,
    requeridos:30,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    nombre:"AB-F-01 CHECK LIST BARRA Y URNAS",
    estado:0,
    realizados:45,
    requeridos:30,
  },
  {
    localidad: "Choco ATO SJO", 
    nombre:"AB-F-01 CHECK LIST BARRA Y URNAS",
    estado:0,
    realizados:45,
    requeridos:30,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    nombre:"AB-F-01 CHECK LIST BARRA Y URNAS",
    estado:1,
    realizados:28,
    requeridos:30,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    nombre:"AB-F-01 CHECK LIST BARRA Y URNAS",
    estado:1,
    realizados:28,
    requeridos:30,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    nombre:"AB-F-01 CHECK LIST BARRA Y URNAS",
    estado:0,
    realizados:28,
    requeridos:30,
  },
  {
    localidad: "Patio-Bar Imperial ATO SJO", 
    nombre:"AB-F-19 CHECK LIST COCINA",
    estado:0,
    realizados:15,
    requeridos:30,
  }
];

var dataTable2 = [
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    etiqueta:"AE-F-34 Control de Temperaturas Equipos Comedor", 
    realizados:518,
    requeridos:518,
    alcance:100,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    etiqueta:"AE-F-34 Control de Temperaturas Equipos Comedor", 
    realizados:518,
    requeridos:518,
    alcance:100,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    etiqueta:"AE-F-08-AM CONTROL DE TEMPERATURAS Y TIEMPOS DE VIDA", 
    realizados:518,
    requeridos:518,
    alcance:100,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    etiqueta:"AE-F-08-AM CONTROL DE TEMPERATURAS Y TIEMPOS DE VIDA", 
    realizados:518,
    requeridos:518,
    alcance:100,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    etiqueta:"AE-F-35 Control de Temperaturas Alimentos Comedor", 
    realizados:518,
    requeridos:518,
    alcance:100,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    etiqueta:"AE-F-37 Check list Operativo Cierre Comedor", 
    realizados:518,
    requeridos:518,
    alcance:100,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    etiqueta:"AE-F-37 Check list Operativo Cierre Comedor", 
    realizados:518,
    requeridos:518,
    alcance:100,
  },
  {
    localidad: "Bakery-Bar Imperial ATO LIR", 
    etiqueta:"AE-F-37 Check list Operativo Cierre Comedor", 
    realizados:518,
    requeridos:518,
    alcance:100,
  }
];

var dataTable3 = [
  {
    nombre:"AB-F-01 CHECK LIST BARRA Y URNAS", 
    realizados:518,
    requeridos:518,
    alcance:100,
  },
   {
    nombre:"AB-F-01 CHECK LIST BARRA Y URNAS", 
    realizados:518,
    requeridos:518,
    alcance:100,
  },
  {
    nombre:"AB-F-10-AM CONTROL DE TEMPERATURAS Y TIEMPOS DE VIDA", 
    realizados:518,
    requeridos:518,
    alcance:100,
  },
   {
    nombre:"AB-F-10-AM CONTROL DE TEMPERATURAS Y TIEMPOS DE VIDA", 
    realizados:518,
    requeridos:518,
    alcance:100,
  },
  {
    nombre:"AB-F-16B Check List Supervisor-CIERRE", 
    realizados:518,
    requeridos:518,
    alcance:100,
  },
   {
    nombre:"AB-F-32 TRAMPAS DE GRASA (Limpieza y Mantenimiento)", 
    realizados:518,
    requeridos:518,
    alcance:100,
  },
   {
    nombre:"AB-F-32 TRAMPAS DE GRASA (Limpieza y Mantenimiento)", 
    realizados:518,
    requeridos:518,
    alcance:100,
  },
  {
    nombre:"AB-F-33B BAR IMPERIAL-CIERRE-Check List Operativo FOH ", 
    realizados:518,
    requeridos:518,
    alcance:100,
  }
];


var dataTable4 = [
  {
    localidad:"Bartolome", 
    cantidad_abf_01:50/100,
    porcentaje_abf_01:50,
    color_abf_01:"#CB4335",
    cantidad_abf_02:50/100,
    porcentaje_abf_02:50,
    color_abf_02:"#F4D03F ",
    cantidad_abf_03:50/100,
    porcentaje_abf_03:50,
    color_abf_03:"#27AE60",
    cantidad_abf_04:50/100,
    porcentaje_abf_04:50,
    color_abf_04:"#707B7C",
    cantidad_abf_05:50/100,
    porcentaje_abf_05:50,
    color_abf_05:"#F4D03F",
  },
  {
    localidad:"Bartolome", 
    cantidad_abf_01:50/100,
    porcentaje_abf_01:50,
    color_abf_01:"#CB4335",
    cantidad_abf_02:50/100,
    porcentaje_abf_02:50,
    color_abf_02:"#F4D03F ",
    cantidad_abf_03:50/100,
    porcentaje_abf_03:50,
    color_abf_03:"#27AE60",
    cantidad_abf_04:50/100,
    porcentaje_abf_04:50,
    color_abf_04:"#707B7C",
    cantidad_abf_05:50/100,
    porcentaje_abf_05:50,
    color_abf_05:"#F4D03F",
  },
  {
    localidad:"Bartolome", 
    cantidad_abf_01:50/100,
    porcentaje_abf_01:50,
    color_abf_01:"#CB4335",
    cantidad_abf_02:50/100,
    porcentaje_abf_02:50,
    color_abf_02:"#F4D03F ",
    cantidad_abf_03:50/100,
    porcentaje_abf_03:50,
    color_abf_03:"#27AE60",
    cantidad_abf_04:50/100,
    porcentaje_abf_04:50,
    color_abf_04:"#707B7C",
    cantidad_abf_05:50/100,
    porcentaje_abf_05:50,
    color_abf_05:"#F4D03F",
  },
    {
    localidad:"Bartolome", 
    cantidad_abf_01:50/100,
    porcentaje_abf_01:50,
    color_abf_01:"#CB4335",
    cantidad_abf_02:50/100,
    porcentaje_abf_02:50,
    color_abf_02:"#F4D03F ",
    cantidad_abf_03:50/100,
    porcentaje_abf_03:50,
    color_abf_03:"#27AE60",
    cantidad_abf_04:50/100,
    porcentaje_abf_04:50,
    color_abf_04:"#707B7C",
    cantidad_abf_05:50/100,
    porcentaje_abf_05:50,
    color_abf_05:"#F4D03F",
  },
  
    {
    localidad:"Bartolome", 
    cantidad_abf_01:50/100,
    porcentaje_abf_01:50,
    color_abf_01:"#CB4335",
    cantidad_abf_02:50/100,
    porcentaje_abf_02:50,
    color_abf_02:"#F4D03F ",
    cantidad_abf_03:50/100,
    porcentaje_abf_03:50,
    color_abf_03:"#27AE60",
    cantidad_abf_04:50/100,
    porcentaje_abf_04:50,
    color_abf_04:"#707B7C",
    cantidad_abf_05:50/100,
    porcentaje_abf_05:50,
    color_abf_05:"#F4D03F",
  },
  
    {
    localidad:"Bartolome", 
    cantidad_abf_01:50/100,
    porcentaje_abf_01:50,
    color_abf_01:"#CB4335",
    cantidad_abf_02:50/100,
    porcentaje_abf_02:50,
    color_abf_02:"#F4D03F ",
    cantidad_abf_03:50/100,
    porcentaje_abf_03:50,
    color_abf_03:"#27AE60",
    cantidad_abf_04:50/100,
    porcentaje_abf_04:50,
    color_abf_04:"#707B7C",
    cantidad_abf_05:50/100,
    porcentaje_abf_05:50,
    color_abf_05:"#F4D03F",
  },
  
    {
    localidad:"Bartolome", 
    cantidad_abf_01:50/100,
    porcentaje_abf_01:50,
    color_abf_01:"#CB4335",
    cantidad_abf_02:50/100,
    porcentaje_abf_02:50,
    color_abf_02:"#F4D03F ",
    cantidad_abf_03:50/100,
    porcentaje_abf_03:50,
    color_abf_03:"#27AE60",
    cantidad_abf_04:50/100,
    porcentaje_abf_04:50,
    color_abf_04:"#707B7C",
    cantidad_abf_05:50/100,
    porcentaje_abf_05:50,
    color_abf_05:"#F4D03F",
  },
  
    {
    localidad:"Bartolome", 
    cantidad_abf_01:50/100,
    porcentaje_abf_01:50,
    color_abf_01:"#CB4335",
    cantidad_abf_02:50/100,
    porcentaje_abf_02:50,
    color_abf_02:"#F4D03F ",
    cantidad_abf_03:50/100,
    porcentaje_abf_03:50,
    color_abf_03:"#27AE60",
    cantidad_abf_04:50/100,
    porcentaje_abf_04:50,
    color_abf_04:"#707B7C",
    cantidad_abf_05:50/100,
    porcentaje_abf_05:50,
    color_abf_05:"#F4D03F",
  },
  
    {
    localidad:"Bartolome", 
    cantidad_abf_01:50/100,
    porcentaje_abf_01:50,
    color_abf_01:"#CB4335",
    cantidad_abf_02:50/100,
    porcentaje_abf_02:50,
    color_abf_02:"#F4D03F ",
    cantidad_abf_03:50/100,
    porcentaje_abf_03:50,
    color_abf_03:"#27AE60",
    cantidad_abf_04:50/100,
    porcentaje_abf_04:50,
    color_abf_04:"#707B7C",
    cantidad_abf_05:50/100,
    porcentaje_abf_05:50,
    color_abf_05:"#F4D03F",
  },
  
    {
    localidad:"Bartolome", 
    cantidad_abf_01:50/100,
    porcentaje_abf_01:50,
    color_abf_01:"#CB4335",
    cantidad_abf_02:50/100,
    porcentaje_abf_02:50,
    color_abf_02:"#F4D03F ",
    cantidad_abf_03:50/100,
    porcentaje_abf_03:50,
    color_abf_03:"#27AE60",
    cantidad_abf_04:50/100,
    porcentaje_abf_04:50,
    color_abf_04:"#707B7C",
    cantidad_abf_05:50/100,
    porcentaje_abf_05:50,
    color_abf_05:"#F4D03F",
  },
  
    {
    localidad:"Bartolome", 
    cantidad_abf_01:50/100,
    porcentaje_abf_01:50,
    color_abf_01:"#CB4335",
    cantidad_abf_02:50/100,
    porcentaje_abf_02:50,
    color_abf_02:"#F4D03F ",
    cantidad_abf_03:50/100,
    porcentaje_abf_03:50,
    color_abf_03:"#27AE60",
    cantidad_abf_04:50/100,
    porcentaje_abf_04:50,
    color_abf_04:"#707B7C",
    cantidad_abf_05:50/100,
    porcentaje_abf_05:50,
    color_abf_05:"#F4D03F",
  },
  
    {
    localidad:"Bartolome", 
    cantidad_abf_01:50/100,
    porcentaje_abf_01:50,
    color_abf_01:"#CB4335",
    cantidad_abf_02:50/100,
    porcentaje_abf_02:50,
    color_abf_02:"#F4D03F ",
    cantidad_abf_03:50/100,
    porcentaje_abf_03:50,
    color_abf_03:"#27AE60",
    cantidad_abf_04:50/100,
    porcentaje_abf_04:50,
    color_abf_04:"#707B7C",
    cantidad_abf_05:50/100,
    porcentaje_abf_05:50,
    color_abf_05:"#F4D03F",
  },
  
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

