
var columsTable1 = [
  { title:"Plant Code", field:'plant_code',hozAlign:"left",width:150},
  { title:"ReadyDate", field:'ready_date',hozAlign:"right",width:150 },
  { title:"Greenhouse",  field:'green_house',hozAlign:"left",width:120 },
  { title:"Date", field:'date',hozAlign:"right",width:150},
  { title:"ReadyDate", field:'ready_dateTwo',hozAlign:"right",width:120 },
  { title:"Flats",  field:'flats',hozAlign:"right",width:80 },
  { title:"Total Hrs",  field:'total_hrs',hozAlign:"right",width:100 },
];

dataTable1 = [
  {
    plant_code: 'LNAFP',
    ready_date: '202401',
    green_house: 'Greenhouse 4',
    date: "2023-10-31",
    ready_dateTwo: "202402",
    flats: 15,
    total_hrs: '1.5'
  },
  {
    plant_code: '',
    ready_date: '',
    green_house: '',
    date: "",
    ready_dateTwo: "202402",
    flats: 15,
    total_hrs: ''
  },
  {
     plant_code: '',
    ready_date: '',
    green_house: '',
    date: "",
    ready_dateTwo: "202402",
    flats: 15,
    total_hrs: ''
  },
  {
     plant_code: '',
    ready_date: '',
    green_house: '',
    date: "",
    ready_dateTwo: "202402",
    flats: 15,
    total_hrs: ''
  },
  {
    plant_code: 'LNTQP',
    ready_date: '202405',
    green_house: 'Greenhouse 4',
    date: "2023-10-31",
    ready_dateTwo: "202402",
    flats: 15,
    total_hrs: '1.5'
  },
  {
    plant_code: '',
    ready_date: '',
    green_house: '',
    date: "",
    ready_dateTwo: "202402",
    flats: 15,
    total_hrs: ''
  },
  {
     plant_code: '',
    ready_date: '',
    green_house: '',
    date: "",
    ready_dateTwo: "202402",
    flats: 15,
    total_hrs: ''
  },
  {
     plant_code: '',
    ready_date: '',
    green_house: '',
    date: "",
    ready_dateTwo: "202402",
    flats: 15,
    total_hrs: '' 
  }

]

var columsTable2 = [
  { title:"Date", field:'date',hozAlign:"left",width:200},
  { title:"Cutter", field:'cutter',hozAlign:"left",width:200},
  { title:"Flats Graded", field:'flats_graded',hozAlign:"right",width:160},
  { title:"Total Hrs",  field:'total_hrs',hozAlign:"right",width:150},
  { title:"Flats per Hrs",  field:'flats_hrs',hozAlign:"right",width:150},
];


var dataTable2B = [
  {
    mes: '2023-Junio',
    region: '',
    user: '', 
    total: '174',_children:[
        {
          mes: '',
          region: 'Centro',
          user: '',
          total: '137',_children:[
        {
          mes: '',
          region: '',
          user: 'Martín Layseca',
          total: '57',
        },
        {
          mes: '',
          region: '',
          user: 'Daniel López',
          total: '15',
        },
        {
          mes: '',
          region: '',
          user: 'Erick Robledo',
          total: '20',
        },
        {
          mes: ' ',
          region: ' ',
          user: 'Enrique Mata',
          total: '45',
        },
      ],
      },
      {
        mes: '',
        region: 'Bajío',
        user: '',
        total: '37',_children:[
        {
          mes: '',
          region: '',
          user: 'Pedro Layseca',
          total: '25',
        },
        {
          mes: '',
          region: '',
          user: 'Pablo López',
          total: '12',
        },
      ],
      },
      {
        mes: '',
        region: 'Toluca',
        user: '',
        total: '',
      },

      ],
  },
  {
    mes: '2023-Julio',
    region: 'Centro',
    user: 'Martín Layseca',
    total: '2',
  },
  {
    mes: '2023-Agosto',
    region: 'Monterrey',
    user: 'Martín Layseca',
    total: '10',
  }
  ,
  {
    mes: '2023-Septiembre',
    region: 'Norte',
    user: 'Martín Layseca',
    total: '24',
  },
  {
    mes: '2023-Octubre',
    region: 'Sur',
    user: 'Martín Layseca',
    total: '30',
  },
  {
    mes: '2023-Noviembre',
    region: 'Centro',
    user: 'Martín Layseca',
    total: '40',
  }

];

var dataTable2 = [
  {
    "date": "2023-10-23",
    "flats_graded": 35,
    "flats_hrs": 17.5,
    "total_hrs": 2,
    "cutter": "Daniela Hernandez"
  },
  {
    "date": "2023-10-23",
    "flats_graded": 17,
    "flats_hrs": 11.2,
    "total_hrs": 1.52,
    "cutter": "Ofelia Hernndez"
  },
  {
    "date": "2023-10-23",
    "flats_graded": 3,
    "flats_hrs": 12,
    "total_hrs": 0.25,
    "cutter": "Lizeth Castillo"
  },
  {
    "date": "2023-10-24",
    "flats_graded": 22,
    "flats_hrs": 8.8,
    "total_hrs": 2.5,
    "cutter": "Josefa"
  },
  {
    "date": "2023-10-24",
    "flats_graded": 21,
    "flats_hrs": 9.3,
    "total_hrs": 2.25,
    "cutter": "Doris"
  },
  {
    "date": "2023-10-24",
    "flats_graded": 75,
    "flats_hrs": 9.4,
    "total_hrs": 8,
    "cutter": "Ofelia Hernndez"
  },
  {
    "date": "2023-10-24",
    "flats_graded": 83,
    "flats_hrs": 10.7,
    "total_hrs": 7.75,
    "cutter": "Lizeth Castillo"
  },
  {
    "date": "2023-10-25",
    "flats_graded": 223,
    "flats_hrs": 12.3,
    "total_hrs": 18.09,
    "cutter": "Daniela Hernandez"
  },
  {
    "date": "2023-10-25",
    "flats_graded": 56,
    "flats_hrs": 11.2,
    "total_hrs": 5,
    "cutter": "Ofelia Hernndez"
  },
  {
    "date": "2023-10-25",
    "flats_graded": 74,
    "flats_hrs": 9.9,
    "total_hrs": 7.5,
    "cutter": "Lizeth Castillo"
  },
  {
    "date": "2023-10-25",
    "flats_graded": 67,
    "flats_hrs": 13.5,
    "total_hrs": 4.98,
    "cutter": "Doris"
  },
  {
    "date": "2023-10-30",
    "flats_graded": 63,
    "flats_hrs": 12.6,
    "total_hrs": 5,
    "cutter": "Josefa"
  },
  {
    "date": "2023-10-30",
    "flats_graded": 71,
    "flats_hrs": 10.9,
    "total_hrs": 6.5,
    "cutter": "Lizeth Castillo"
  },
  {
    "date": "2023-10-30",
    "flats_graded": 35,
    "flats_hrs": 10,
    "total_hrs": 3.5,
    "cutter": "Doris"
  },
  {
    "date": "2023-10-31",
    "flats_graded": 99,
    "flats_hrs": 19,
    "total_hrs": 5.2,
    "cutter": "Josefa"
  },
  {
    "date": "2023-10-31",
    "flats_graded": 90,
    "flats_hrs": 13.4,
    "total_hrs": 6.74,
    "cutter": "Lizeth Castillo"
  },
  {
    "date": "2023-10-31",
    "flats_graded": 47,
    "flats_hrs": 9.4,
    "total_hrs": 5,
    "cutter": "Doris"
  },
  {
    "date": "2023-10-31",
    "flats_graded": 75,
    "flats_hrs": 10.4,
    "total_hrs": 7.23,
    "cutter": "Daniela Hernandez"
  },
  {
    "date": "2023-11-01",
    "flats_graded": 90,
    "flats_hrs": 11.8,
    "total_hrs": 7.6,
    "cutter": "Lizeth Castillo"
  },
  {
    "date": "2023-11-01",
    "flats_graded": 65,
    "flats_hrs": 11.3,
    "total_hrs": 5.75,
    "cutter": "Doris"
  },
  {
    "date": "2023-11-01",
    "flats_graded": 87,
    "flats_hrs": 10.9,
    "total_hrs": 7.98,
    "cutter": "Daniela Hernandez"
  },
  {
    "date": "2023-11-02",
    "flats_graded": 81,
    "flats_hrs": 10.8,
    "total_hrs": 7.5,
    "cutter": "Lizeth Castillo"
  },
  {
    "date": "2023-11-02",
    "flats_graded": 70,
    "flats_hrs": 11.7,
    "total_hrs": 6,
    "cutter": "Doris"
  },
  {
    "date": "2023-11-02",
    "flats_graded": 66,
    "flats_hrs": 13.2,
    "total_hrs": 5,
    "cutter": "Josefa"
  },
  {
    "date": "2023-11-02",
    "flats_graded": 60,
    "flats_hrs": 9.2,
    "total_hrs": 6.5,
    "cutter": "Ofelia Hernndez"
  },
  {
    "date": "2023-11-02",
    "flats_graded": 80,
    "flats_hrs": 10,
    "total_hrs": 8,
    "cutter": "Daniela Hernandez"
  },
  {
    "date": "2023-11-03",
    "flats_graded": 60,
    "flats_hrs": 10.3,
    "total_hrs": 5.83,
    "cutter": "Daniela Hernandez"
  },
  {
    "date": "2023-11-03",
    "flats_graded": 40,
    "flats_hrs": 5,
    "total_hrs": 8,
    "cutter": "Ofelia Hernndez"
  },
  {
    "date": "2023-11-03",
    "flats_graded": 24,
    "flats_hrs": 10.3,
    "total_hrs": 2.33,
    "cutter": "Doris"
  },
  {
    "date": "2023-11-03",
    "flats_graded": 56,
    "flats_hrs": 7,
    "total_hrs": 8,
    "cutter": "Lizeth Castillo"
  },
  {
    "date": "2023-11-06",
    "flats_graded": 22,
    "flats_hrs": 10.1,
    "total_hrs": 2.17,
    "cutter": "Doris"
  },
  {
    "date": "2023-11-06",
    "flats_graded": 27,
    "flats_hrs": 10.8,
    "total_hrs": 2.5,
    "cutter": "Daniela Hernandez"
  },
  {
    "date": "2023-11-06",
    "flats_graded": 25,
    "flats_hrs": 12.5,
    "total_hrs": 2,
    "cutter": "Josefa"
  },
  {
    "date": "2023-11-06",
    "flats_graded": 33,
    "flats_hrs": 12,
    "total_hrs": 2.75,
    "cutter": "Ofelia Hernndez"
  },
  {
    "date": "2023-11-07",
    "flats_graded": 64,
    "flats_hrs": 10.7,
    "total_hrs": 6,
    "cutter": "Ofelia Hernndez"
  },
  {
    "date": "2023-11-07",
    "flats_graded": 42,
    "flats_hrs": 9.9,
    "total_hrs": 4.25,
    "cutter": "Daniela Hernandez"
  },
  {
    "date": "2023-11-07",
    "flats_graded": 45,
    "flats_hrs": 9.5,
    "total_hrs": 4.75,
    "cutter": "Doris"
  },
  {
    "date": "2023-11-08",
    "flats_graded": 95,
    "flats_hrs": 6.3,
    "total_hrs": 15.08,
    "cutter": "Doris"
  },
  {
    "date": "2023-11-08",
    "flats_graded": 66,
    "flats_hrs": 5.3,
    "total_hrs": 12.5,
    "cutter": "Daniela Hernandez"
  },
  {
    "date": "2023-11-08",
    "flats_graded": 66,
    "flats_hrs": 6.1,
    "total_hrs": 10.75,
    "cutter": "Josefa"
  },
  {
    "date": "2023-11-08",
    "flats_graded": 71,
    "flats_hrs": 7.8,
    "total_hrs": 9.15,
    "cutter": "Ofelia Hernndez"
  },
  {
    "date": "2023-11-09",
    "flats_graded": 61,
    "flats_hrs": 12.2,
    "total_hrs": 5,
    "cutter": "Doris"
  },
  {
    "date": "2023-11-09",
    "flats_graded": 33,
    "flats_hrs": 13.2,
    "total_hrs": 2.5,
    "cutter": "Josefa"
  },
  {
    "date": "2023-11-09",
    "flats_graded": 79,
    "flats_hrs": 9.9,
    "total_hrs": 8,
    "cutter": "Ofelia Hernndez"
  },
  {
    "date": "2023-11-09",
    "flats_graded": 80,
    "flats_hrs": 8.2,
    "total_hrs": 9.75,
    "cutter": "Daniela Hernandez"
  },
  {
    "date": "2023-11-10",
    "flats_graded": 30,
    "flats_hrs": 7.1,
    "total_hrs": 4.22,
    "cutter": "Ofelia Hernndez"
  },
  {
    "date": "2023-11-10",
    "flats_graded": 25,
    "flats_hrs": 10,
    "total_hrs": 2.5,
    "cutter": "Doris"
  },
  {
    "date": "2023-11-10",
    "flats_graded": 43,
    "flats_hrs": 9.6,
    "total_hrs": 4.5,
    "cutter": "Daniela Hernandez"
  },
  {
    "date": "2023-11-10",
    "flats_graded": 45,
    "flats_hrs": 2.7,
    "total_hrs": 16.5,
    "cutter": "Josefa"
  },
  {
    "date": "2023-11-13",
    "flats_graded": 15,
    "flats_hrs": 10,
    "total_hrs": 1.5,
    "cutter": "Doris Hernandez"
  },
  {
    "date": "2023-11-13",
    "flats_graded": 23,
    "flats_hrs": 5.8,
    "total_hrs": 4,
    "cutter": "Ofelia Hernndez"
  }
];

var columsTable3 = [
  { title:"Date", field:'date',hozAlign:"left",headerFilter:"input",width:100},
  { title:"Planter", field:'cutter',hozAlign:"left",headerFilter:"input",width:200},
  { title:"Flats", field:'flats',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:0}, headerFilter:"input",width:150},
  { title:"Hours", field:'hours',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:0}, headerFilter:"input",width:150},
  { title:"Flats X Hour", field:'flats_half_hour',hozAlign:"right", bottomCalc:"avg", bottomCalcParams:{precision:0}, headerFilter:"input",width:150},
];

var dataTable3 = [
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

//----- CONFIG GRAPHIC
var data1 = {
  "labels": [
    "2023-10-23",
    "2023-10-23",
    "2023-10-23",
    "2023-10-24",
    "2023-10-24",
    "2023-10-24",
    "2023-10-24",
    "2023-10-25",
    "2023-10-25",
    "2023-10-25",
    "2023-10-25",
    "2023-10-30",
    "2023-10-30",
    "2023-10-30",
    "2023-10-31",
    "2023-10-31",
    "2023-10-31",
    "2023-10-31",
    "2023-11-01",
    "2023-11-01",
    "2023-11-01",
    "2023-11-02",
    "2023-11-02",
    "2023-11-02",
    "2023-11-02",
    "2023-11-02",
    "2023-11-03",
    "2023-11-03",
    "2023-11-03",
    "2023-11-03",
    "2023-11-06",
    "2023-11-06",
    "2023-11-06",
    "2023-11-06",
    "2023-11-07",
    "2023-11-07",
    "2023-11-07",
    "2023-11-08",
    "2023-11-08",
    "2023-11-08",
    "2023-11-08",
    "2023-11-09",
    "2023-11-09",
    "2023-11-09",
    "2023-11-09",
    "2023-11-10",
    "2023-11-10",
    "2023-11-10",
    "2023-11-10"
  ],
  "datasets": [
    {
      "borderColor": "#21618c",
      "data": [
        35,
        17,
        3,
        22,
        21,
        75,
        83,
        223,
        56,
        74,
        67,
        63,
        71,
        35,
        99,
        90,
        47,
        75,
        90,
        65,
        87,
        81,
        70,
        66,
        60,
        80,
        60,
        40,
        24,
        56,
        22,
        27,
        25,
        33,
        64,
        42,
        45,
        95,
        66,
        66,
        71,
        61,
        33,
        79,
        80,
        30,
        25,
        43,
        45
      ],
      "type": "bar",
      "backgroundColor": "rgba(52, 152, 219, 0.5)",
      "label": "Flats",
      "fill": false,
      "yAxisID": 'y',
    },
    {
      "borderColor": "#EF6262",
      "data": [
        2,
        1.52,
        0.25,
        2.5,
        2.25,
        8,
        7.75,
        18.09,
        5,
        7.5,
        4.98,
        5,
        6.5,
        3.5,
        5.2,
        6.74,
        5,
        7.23,
        7.6,
        5.75,
        7.98,
        7.5,
        6,
        5,
        6.5,
        8,
        5.83,
        8,
        2.33,
        8,
        2.17,
        2.5,
        2,
        2.75,
        6,
        4.25,
        4.75,
        15.08,
        12.5,
        10.75,
        9.15,
        5,
        2.5,
        8,
        9.75,
        4.22,
        2.5,
        4.5,
        16.5
      ],
      "type": "line",
      "backgroundColor": "#EF6262",
      "label": "Hours",
      "fill": false,
      "yAxisID": 'y1',
    }
  ]
};

var setOptions1 = {
  responsive: true,
  interaction: {
      mode: 'index',
      intersect: false,
    },
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Productivity',
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
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    }
};

/*scales: {
    y: {
      ticks: {
        stepSize: 1
      },
    }
  }*/
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
  }
};
