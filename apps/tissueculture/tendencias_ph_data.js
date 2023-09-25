// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Plant Code", field:'plant_code',hozAlign:"left",headerFilter:"input", width:150},
  { title:"Lote", field:'lot',hozAlign:"left",headerFilter:"input", width:150},
  { title:"Ready Year",field:'ready_year',hozAlign:"left",headerFilter:"input", width:200 },
  { title:"Ready Week",field:'ready_week',hozAlign:"left",headerFilter:"input", width:200 },
  { title:"Green House", field:'green_house',hozAlign:"left",width:200 },
  { title:"Table/Mesa", field:'table_mesa',hozAlign:"left",width:200 },
  { title:"PH", field:'ph_data',hozAlign:"left",width:200 },
  { title:"EC", field:'ec_data',hozAlign:"left",width:200 },
];


var dataTable1 = [
  {
    "plant_code":'LNACO',
    "_children":[
      {

        "lot":123,
        "_children":[
          {
            "ready_year":'2023',
            "ready_week":'44',
            "green_house":'1',
            "table_mesa":'7',
            "ph_data":'6.93',
            "ec_data":'31',
          },
          {
            "ready_year":'2023',
            "ready_week":'44',
            "green_house":'1',
            "table_mesa":'7',
            "ph_data":'6.93',
            "ec_data":'31',
          },
        ],
      },
    ],
  },
  {
    "plant_code":'LNAFP',
    "ready_year":'',
    "ready_week":'',
    "green_house":'',
    "table_mesa":'',
    "ph_data":'',
    "ec_data":'',
    "_children":[
      {
        "plant_code":'',
        "ready_year":'2023',
        "ready_week":'44',
        "green_house":'1',
        "table_mesa":'7',
        "ph_data":'5.54',
        "ec_data":'31',
      },
    ],
  },
  {
    "plant_code":'LNABP',
    "ready_year":'',
    "ready_week":'',
    "green_house":'',
    "table_mesa":'',
    "ph_data":'',
    "ec_data":'',
    "_children":[
      {
        "plant_code":'',
        "ready_year":'2023',
        "ready_week":'44',
        "green_house":'1',
        "table_mesa":'7',
        "ph_data":'6.93',
        "ec_data":'31',
      },
    ],
  },

];


//----GRAPHICS
var data1 = {
  labels: ['2023-44','2023-45','2023-46'],
  datasets: [
    {
      label: 'LNACO',
      data: [17,26,33,30],
      backgroundColor: "#EF6262",
      borderColor: "#EF6262",
    },
    {
      label: 'LNAFP',
      data: [90,36,93,10],
      backgroundColor: "#EF6262",
      borderColor: "#EF6262",
    },
    {
      label: 'LNABP',
      data: [47,56,13,70],
      backgroundColor: "#EF6262",
      borderColor: "#EF6262",
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
    title: {
      display: true,
      text: 'Tendencia PH',
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
