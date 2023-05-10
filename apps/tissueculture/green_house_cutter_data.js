// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes

var columsTable1 = [
  { title:"Plant", field:'plant',hozAlign:"left",width:100},
  { title:"Green House", field:'green_house',hozAlign:"left",width:230},
  { title:"Ready Date", field:'ready_date',hozAlign:"right",width:120},
  { title:"Date", field:'date',hozAlign:"left",width:120},
  { title:"Flats", field:'flats_cant',hozAlign:"right",width:100},
];

var dataTable1 = [
  {
    plant_code: "ABCO",
    green_house: "Example",
    date: "26-04-2023",
    flats: "500",
  },
    {
    plant_code: "ABCO",
    green_house: "Example",
    date: "26-04-2023",
    flats: "500",
  },
    {
    plant_code: "ABCO",
    green_house: "Example",
    date: "26-04-2023",
    flats: "500",
  },
    {
    plant_code: "ABCO",
    green_house: "Example",
    date: "26-04-2023",
    flats: "500",
  },
    {
    plant_code: "ABCO",
    green_house: "Example",
    date: "26-04-2023",
    flats: "500",
  },
];



var columsTable2 = [
  { title:"Date", field:'date',hozAlign:"left",width:100},
  { title:"Planter", field:'cutter',hozAlign:"left",width:200},
  { title:"Flats", field:'flats',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:2}, width:150},
  { title:"Hours", field:'hours',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:2}, width:150},
  { title:"Flats X Hour", field:'flats_x_hour',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:2}, width:150},
];

var dataTable2 = [
  {
    date:"26-04-2023",
    cutter:"Julia",
    flats:"150",
    hours:"4.5",
    flats_x_hour:"33.33",
  },
  {
    date:"26-04-2023",
    cutter:"Julia",
    flats:"150",
    hours:"4.5",
    flats_x_hour:"33.33",
  },
  {
    date:"26-04-2023",
    cutter:"Julia",
    flats:"150",
    hours:"4.5",
    flats_x_hour:"33.33",
  },
]



var data1 = {
  labels: ['2022-12-01','2022-12-08','2022-12-15','2022-12-25','2023-01-03'],
  datasets: [
    {
      label:'Valores',
      type: 'bar',
      data: [25,10,20,25,20],
      background: "#264653",
      'yAxisID': 'y',
    },
    {
      label:'Hours',
      type: 'line',
      borderColor: "#515a5a",
      'yAxisID': 'y1',
      data: [ 27, 36, 45, 95, 34],
      fill: false,
    },

  ]
};



var setOptions1 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    datalabels:{
      color: '#17202a',
      fontSize: 15,
      fontWeight: 'bold',
    },
    title: {
        display: true,
        text: 'Report Week',
        font: {
          size: 25
        }
    },
  },
  scales: {
    y:{
      type: 'linear',
      display: true,
      title:{
        display: true,
        text: 'Floats',
        size: 20,
      },
      ticks: {
        stepSize: 1
      }, 
      position: 'left',

    },
    y1:{
      type: 'linear',
      display: true,
      title:{
        display: true,
        text: 'Hours',
        size: 20,
      },
      ticks: {
        stepSize: 1
      }, 
      position: 'right', 
    }

  },
};

var data2 = {
  labels: ['Mariana','Julia','Tere'],
  datasets: [
    {
      label: 'Flats',
      data: [25,10,20],
      background: ["#d94052","#ee7e4c","#ead56c"],
    },
  ]
};

var setOptions2 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Report Flats X Cutter',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'white',
    }
  },
};