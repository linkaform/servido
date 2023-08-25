// Datos demo para Reporte ENcuestas MOntaje

//-- Tabla 1 
var columsTable1 = [
  { title:"Localidad", field:'localidad',hozAlign:"left",width:400},
  { title:"Tipo de checklist",  field:'nombre',hozAlign:"left",width:600 },
  { title:"Realizados",  field:'realizados',hozAlign:"right",
    formatter:function(cell){
      var realizado = cell.getValue();
      var requeridos = parseFloat(cell.getRow().getData().requeridos)
      if(realizado < requeridos){
        cell.getElement().style.backgroundColor = "#F1948A";
      }else{
        cell.getElement().style.backgroundColor = "#82E0AA";
      }
      return realizado;
    }
  ,width:150 },
  { title:"Requeridos",  field:'requeridos',hozAlign:"right",width:150 },
  { title:"Alcance %", field:"alcance",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true,precision: 0},hozAlign:"right",width:100},
  { title:"Progreso", field:"alcance", formatter:"progress", editor:"progress", editorParams:{min:0, max:100,},download:function(column){return false;},width:250}
];

var columsTable2 = [
  { title:"Localidad", field:'localidad',hozAlign:"left",width:500},
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
      {title:"Cantidad", field:'cantidad_abf_01',hozAlign:"right",width:150},
      {title:"Porcentajes", field:'porcentaje_abf_01',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:150},
      {title:"Status", field:'color_abf_01',formatter:"color",width:85},
    ]
  },
  {title:"AB-F-02 EXAMPLE", hozAlign:"center",
    columns:[
      {title:"Cantidad", field:'cantidad_abf_02',hozAlign:"right",width:150},
      {title:"Porcentajes", field:'porcentaje_abf_02',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:150},
      {title:"Status", field:'color_abf_02',formatter:"color",width:85},
    ]
  },
  {title:"AB-F-03 EXAMPLE", hozAlign:"center",
    columns:[
      {title:"Cantidad", field:'cantidad_abf_03',hozAlign:"right",width:150},
      {title:"Porcentajes", field:'porcentaje_abf_03',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:150},
      {title:"Status", field:'color_abf_03',formatter:"color",width:85},
    ]
  },
  {title:"AB-F-04 EXAMPLE", hozAlign:"center",
    columns:[
      {title:"Cantidad", field:'cantidad_abf_04',hozAlign:"right",width:150},
      {title:"Porcentajes", field:'porcentaje_abf_04',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:150},
      {title:"Status", field:'color_abf_04',formatter:"color",width:85},
    ]
  },
  {title:"AB-F-05 EXAMPLE", hozAlign:"center",
    columns:[
      {title:"Cantidad", field:'cantidad_abf_04',hozAlign:"right",width:150},
      {title:"Porcentajes", field:'porcentaje_abf_04',hozAlign:"right",formatter: "money",formatterParams: {symbol: "%", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:150},
      {title:"Status", field:'color_abf_04',formatter:"color",width:85},
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
    alcance:30,
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

img_morpho = "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"