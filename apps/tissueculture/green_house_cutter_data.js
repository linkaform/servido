// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes

var columsTable1 = [
  { title:"Plant", field:'plant_code',hozAlign:"left",headerFilter:"input",headerTooltip:true,width:100},
  { title:"Ready Date", field:'ready_date',hozAlign:"right",headerFilter:"input",headerTooltip:true,width:120},
  { title:"Green House", field:'green_house',hozAlign:"left",headerFilter:"input",headerTooltip:true,width:230},
  { title:"Date", field:'date',hozAlign:"left",headerFilter:"input",headerTooltip:true,width:120},
  { title:"Required Flats", field:'required',hozAlign:"right",headerFilter:"input",headerTooltip:true,
  formatter:"money", formatterParams:{decimal:",",symbol:"",precision:0},width:150},
  { title:"Produce Flats", field:'total_flats',hozAlign:"right",headerFilter:"input",headerTooltip:true,
  formatter:"money", formatterParams:{decimal:",",symbol:"",precision:0},width:150},
  { title:"Variance", field:'variance',hozAlign:"right",headerFilter:"input",headerTooltip:true,
  formatter:"money", formatterParams:{decimal:",",symbol:"",precision:0},width:150},
  { title:"Required Eaches", field:'required_eaches',hozAlign:"right",headerFilter:"input",headerTooltip:true,
  formatter:"money", formatterParams:{decimal:",",symbol:"",precision:0},width:150},
  { title:"Eaches", field:'eaches',hozAlign:"right",headerFilter:"input",headerTooltip:true,
  formatter:"money", formatterParams:{decimal:",",symbol:"",precision:0},width:150},
  { title:"Containers", field:'containers',hozAlign:"right",headerFilter:"input",headerTooltip:true,
  formatter:"money", formatterParams:{decimal:",",symbol:"",precision:0},width:150},
  { title:"Scrap Plant", field:'scrap',hozAlign:"right",headerFilter:"input",headerTooltip:true,
  formatter:"money", formatterParams:{decimal:",",symbol:"",precision:0},width:150},
  { title:"Scrap Percentage", field:'scrap_percentage',hozAlign:"right",headerFilter:"input",headerTooltip:true,
  formatter:"money", formatterParams:{decimal:",",symbol:"",precision:2},width:150},
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


var dataTableExample1 = [
  {
    plant_code: "ABCO",
    
    green_house: "Example",
    date: "26-04-2023",
    flats: "500",
  },
];

var columsTable2 = [
  { title:"Date", field:'date',hozAlign:"left",headerFilter:"input",width:100},
  { title:"Planter", field:'cutter',hozAlign:"left",headerFilter:"input",width:200},
  { title:"Flats", field:'flats',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:0}, headerFilter:"input",width:150},
  { title:"Hours", field:'hours',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:0}, headerFilter:"input",width:150},
  { title:"Flats X Hour", field:'flats_half_hour',hozAlign:"right", bottomCalc:"avg", bottomCalcParams:{precision:0}, headerFilter:"input",width:150},
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



var columsTable3 = [
  { title:"Plant", field:'plant',hozAlign:"left",headerFilter:"input",headerTooltip:true,width:100},
  { title:"Green House", field:'green_house',hozAlign:"left",headerFilter:"input",headerTooltip:true,width:230},
  { title:"Date", field:'date',hozAlign:"left",headerFilter:"input",headerTooltip:true,width:120},
  { title:"Produce Flats", field:'flats_cant',hozAlign:"right",headerFilter:"input",headerTooltip:true,
  formatter:"money", formatterParams:{decimal:",",symbol:"",precision:0},width:100},
  { title:"Required Flats", field:'required',hozAlign:"right",headerFilter:"input",headerTooltip:true,
  formatter:"money", formatterParams:{decimal:",",symbol:"",precision:0},width:100},
];


var dataTable3 = [
  {
    plant_code: "ABCO",
    green_house: "Example",
    date: "26-04-2023",
    total_flats: "500",
  },
    {
    plant_code: "ABCO",
    green_house: "Example",
    date: "26-04-2023",
    total_flats: "500",
  },
    {
    plant_code: "ABCO",
    green_house: "Example",
    date: "26-04-2023",
    total_flats: "500",
  },
    {
    plant_code: "ABCO",
    green_house: "Example",
    date: "26-04-2023",
    total_flats: "500",
  },
    {
    plant_code: "ABCO",
    green_house: "Example",
    date: "26-04-2023",
    total_flats: "500",
  },
];


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

var setOptions3 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Report Required vs Total',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
    }
  },
};