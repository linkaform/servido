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
      backgroundColor: ["#7BD3EA", "#ECA869",],
      data: [6,9],
    }
  ]
}; 

//-----DATA GAUGE

var dataGauge1 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 80,
    title: { text: "Resultado promedio" , 'font': {'size': 22} },
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
