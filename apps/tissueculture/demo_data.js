//Datos Demo del Reporte Autitoria Sucursales
var array_background = getPAlleteColors(11,8);

//------DATA GRAPHICS
var setOptions6 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Reporte Historico Auditoria',
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

//Data pora el gráfico de barras
var dataFirstElement = {
  labels: ["Mauricio Hernández","Armando Contreras"],
  datasets: [
    {
      label: "Servicios",
      backgroundColor: ["#7BD3EA"],
      data: [6,9],
    },
    {
      label: "Adjust out",
      backgroundColor: [ "#ECA869",],
      data: [10,8],
    }
  ]
}; 

//-----DATA GAUGE

var dataGauge1 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 80,
    title: { text: "Balance total" , 'font': {'size': 22} },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [null, 100], tickwidth: 1},
    bar: { color: "#018088" },
    bgcolor: "white",
    borderwidth: 2,
    bordercolor: "gray",
    steps: [

    { range: [0, 100], color: "#fff" }
    ],
    },
  }
];

//Configuración de la tabla anidada

var columsTable1 = [
  {title:"Greenhouse", field:"warehouse", hozAlign:"left", headerFilter:"input",headerTooltip:true, width:170},
  {title:"Product code", field:"productCode", hozAlign:"left", headerFilter:"input",headerTooltip:true, width:150},
  {title:"AdjustIn total", field:"adjustIn", hozAlign:"right", width:150},
  {title:"AdjustOut total", field:"adjustOut", hozAlign:"right", width:150},
  {title:"Balance", field:"balance", hozAlign:"right", width:100}
]

var dataTable1 = [
  {"warehouse": "Warehouse1", 
    "_children":[
      {"productCode":"LNAFP",
        "adjustIn":123,
        "adjustOut":234,
        "balance":122
      },
      {"productCode":"LNAFP",
        "adjustIn":123,
        "adjustOut":234,
        "balance":122
      },
      {"productCode":"LNAFP",
        "adjustIn":123,
        "adjustOut":234,
        "balance":122
      }
      ]
  }
]