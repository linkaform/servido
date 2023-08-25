//-----TABLAS
var columsTable1 = [
  { title:"Promotor", field:'promotor', hozAlign:"left", headerTooltip:true,headerFilter:true,width:280},
  { title:"Visitas Realizadas", field:'visitas_realizadas', hozAlign:"right", headerTooltip:true,headerFilter:true,width:140},
  { title:"Tiempo Trabajado", field:'text_time', hozAlign:"right", headerTooltip:true,headerFilter:true,width:140},
  { title:"Promedio Visitas por día", field:'promedio_visitas', hozAlign:"right", headerTooltip:true,headerFilter:true,width:140},
  { title:"Productos Inspeccionados", field:'productos_inspeccionados', hozAlign:"right", headerTooltip:true,headerFilter:true,width:140},
];


var columsTable2 = [
  { title:"Tienda", field:'tienda', hozAlign:"left", headerTooltip:true,headerFilter:true,width:300},
  { title:"Determinante", field:'determinante', hozAlign:"left", headerTooltip:true,headerFilter:true,width:140},
  { title:"Visitas Realizadas", field:'visitas_realizadas', hozAlign:"right", headerTooltip:true,headerFilter:true,width:100},
  { title:"Tiempo Trabajado", field:'text_time', hozAlign:"right", headerTooltip:true,headerFilter:true,width:140},
  { title:"Productos Inspeccionados", field:'productos_inspeccionados', hozAlign:"right", headerTooltip:true,headerFilter:true,width:140},
];

var dataTable1 = [
  {
    "promotor":'Israel',
    "visitas_realizadas":10,
    "horas_trabajadas":8,
    "promedio_visitas":3,
    "productos_inspeccionados":50,
  },
  {
    "promotor":'Israel',
    "visitas_realizadas":10,
    "horas_trabajadas":8,
    "promedio_visitas":3,
    "productos_inspeccionados":50,
  },
  {
    "promotor":'Israel',
    "visitas_realizadas":10,
    "horas_trabajadas":8,
    "promedio_visitas":3,
    "productos_inspeccionados":50,
  },
  {
    "promotor":'Israel',
    "visitas_realizadas":10,
    "horas_trabajadas":8,
    "promedio_visitas":3,
    "productos_inspeccionados":50,
  },
  {
    "promotor":'Israel',
    "visitas_realizadas":10,
    "horas_trabajadas":8,
    "promedio_visitas":3,
    "productos_inspeccionados":50,
  },
  {
    "promotor":'Israel',
    "visitas_realizadas":10,
    "horas_trabajadas":8,
    "promedio_visitas":3,
    "productos_inspeccionados":50,
  },
  {
    "promotor":'Israel',
    "visitas_realizadas":10,
    "horas_trabajadas":8,
    "promedio_visitas":3,
    "productos_inspeccionados":50,
  },
  {
    "promotor":'Israel',
    "visitas_realizadas":10,
    "horas_trabajadas":8,
    "promedio_visitas":3,
    "productos_inspeccionados":50,
  },
  {
    "promotor":'Israel',
    "visitas_realizadas":10,
    "horas_trabajadas":8,
    "promedio_visitas":3,
    "productos_inspeccionados":50,
  },
  {
    "promotor":'Israel',
    "visitas_realizadas":10,
    "horas_trabajadas":8,
    "promedio_visitas":3,
    "productos_inspeccionados":50,
  },
  
]

var dataTable2 = [
  {
    "promotor":'Karina',
    "determinante":'Determinante 1',
    "visitas_realizadas":50,
    "horas_trabajadas":200,
    "productos_inspeccionados":500,
  },
  {
    "promotor":'Karina',
    "determinante":'Determinante 1',
    "visitas_realizadas":50,
    "horas_trabajadas":200,
    "productos_inspeccionados":500,
  },
  {
    "promotor":'Karina',
    "determinante":'Determinante 1',
    "visitas_realizadas":50,
    "horas_trabajadas":200,
    "productos_inspeccionados":500,
  },
  {
    "promotor":'Karina',
    "determinante":'Determinante 1',
    "visitas_realizadas":50,
    "horas_trabajadas":200,
    "productos_inspeccionados":500,
  },
  {
    "promotor":'Karina',
    "determinante":'Determinante 1',
    "visitas_realizadas":50,
    "horas_trabajadas":200,
    "productos_inspeccionados":500,
  },
  {
    "promotor":'Karina',
    "determinante":'Determinante 1',
    "visitas_realizadas":50,
    "horas_trabajadas":200,
    "productos_inspeccionados":500,
  },
  {
    "promotor":'Karina',
    "determinante":'Determinante 1',
    "visitas_realizadas":50,
    "horas_trabajadas":200,
    "productos_inspeccionados":500,
  },
  {
    "promotor":'Karina',
    "determinante":'Determinante 1',
    "visitas_realizadas":50,
    "horas_trabajadas":200,
    "productos_inspeccionados":500,
  },
  {
    "promotor":'Karina',
    "determinante":'Determinante 1',
    "visitas_realizadas":50,
    "horas_trabajadas":200,
    "productos_inspeccionados":500,
  },
  {
    "promotor":'Karina',
    "determinante":'Determinante 1',
    "visitas_realizadas":50,
    "horas_trabajadas":200,
    "productos_inspeccionados":500,
  },
] 
//----GAUGE
var dataGauge1 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 80,
    title: { text: "Visitas por Promotor" , 'font': {'size': 22} },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      axis: { range: [0, 150], tickwidth: 1},
      bar: { color: "#f7bd53" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [0, 70], color: "#ff5252" },
        { range: [71, 100], color: "#fdfc8b" },
        { range: [101, 150], color: "#8db600" }
      ],
    },
  }
];


//----GRAPHICS
var data1 = {
  labels: ['Dic-21','Enero-22','Feb-22'],
  datasets: [
    {
      label: 'Registros',
      data: [17,26,33,40,25,35,50,55,60,70,66,80,82,90],
      backgroundColor: "#EF6262",
      borderColor: "#EF6262",
    },
  ]
};

var data2 = {
  labels: ['Jul-22','Ago-22','Sept-22','Oct-22','Nov-22','Dic-22','Ene-23'],
  datasets: [
    {
      label: 'Promotor 1',
      data: [55,60,70,66,80,82,90],
      backgroundColor: "#FF6D60",
      borderColor: "#FF6D60",
    },
    {
      label: 'Promotor 2',
      data: [40,50,45,90,100,40,40],
      backgroundColor: "#F7D060",
      borderColor: "#F7D060",
    },
  ]
};

var data3 = {
  labels: ['Jul-22','Ago-22','Sept-22','Oct-22','Nov-22','Dic-22','Ene-23'],
  datasets: [
    {
      label: 'Tienda 1 ',
      data: [55,60,70,66,80,82,90],
      backgroundColor: "#F3E99F",
      borderColor: "#F3E99F",
    },
    {
      label: 'TIenda 2',
      data: [40,50,45,90,100,40,40],
      backgroundColor: "#98D8AA",
      borderColor: "#98D8AA",
    },
  ]
};

var setOptions1 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Reporte Por Promotor',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
      font:{
        size: 15,
      }
    }
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1
      },
    }
  }
};


var setOptions2 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Reporte Tendencia',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
      font:{
        size: 15,
      },
      formatter: function (value, context){
        return value + '%';
      }
    }
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1
      },
    }
  }
};


var setOptions3 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Reporte Por Tienda',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
      font:{
        size: 15,
      },
      formatter: function (value, context){
        return value + '%';
      }
    }
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1
      },
    }
  }
};
