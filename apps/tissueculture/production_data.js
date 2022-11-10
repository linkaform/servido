// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes

var columsTable1 = [
  { title:"Week", field:'year_week',hozAlign:"left",width:150, headerFilter:"input"},
  { title:"Plant Code", field:'plant_code',hozAlign:"left",width:150, headerFilter:"input"},
  { title:"Stage", field:'stage',hozAlign:"left",width:150, headerFilter:"input"},

  { title:"Prod. Eaches", field:'eaches',hozAlign:"right",formatter: "money",formatterParams: {symbol: "", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:150},
  { title:"Prod. Containers", field:'produced',hozAlign:"right",formatter: "money",formatterParams: {symbol: "", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:150},
  { title:"Req. Eaches", field:'required',hozAlign:"right",formatter: "money",formatterParams: {symbol: "", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:150},
  { title:"V. Vs Required", field:'req_variance',hozAlign:"right",formatter: "money",formatterParams: {symbol: "", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:150},
  { title:"Work Order", field:'work_order',hozAlign:"right",formatter: "money",formatterParams: {symbol: "", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:150},
  { title:"v. vs Work Order", field:'variance',hozAlign:"right",formatter: "money",formatterParams: {symbol: "", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:150},
];


var columsTable2 = [
  { title:"Produce Folio", field:'prod_folio',hozAlign:"left",width:150,  headerFilter:"input", formatter:"link", formatterParams:{
      url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id},
      target:"_blank",}
    },
  { title:"Plant Code", field:'plant_code',hozAlign:"left",width:150, headerFilter:"input"},
  { title:"Stage", field:'stage',hozAlign:"left",width:150, headerFilter:"input"},
  { title:"Team Assigned", field:'team',hozAlign:"left",width:150, headerFilter:"input"},

  { title:"Work Order", field:'work_order',hozAlign:"right",formatter: "money",formatterParams: {symbol: "", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:150},
  { title:"Produced", field:'produced',hozAlign:"right",formatter: "money",formatterParams: {symbol: "", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:150},
  { title:"Variance vs Work Order", field:'variance',hozAlign:"right",formatter: "money",formatterParams: {symbol: "", symbolAfter: true, decimal: ".", thousand: ",", precision: 2},width:150},
  { title:"Order Status", field:'order_status',hozAlign:"left",width:250},
];



var dataTable1 = [
  {
    plant_code: "LAGBG",
    plant_name: "Blue Glow Agave",
    stage: "2",
    required: "500",
    produced: "300",
    variance: "100",
  },
  {
    plant_code: "LAGBG",
    plant_name: "Blue Glow Agave",
    stage: "2",
    required: "500",
    produced: "300",
    variance: "100",
  },
  {
    plant_code: "LNAFP",
    plant_name: "Firepower' Nandina",
    stage: "2",
    required: "500",
    produced: "300",
    variance: "100",
  },
  {
    plant_code: "LNAFP",
    plant_name: "Firepower' Nandina",
    stage: "2",
    required: "500",
    produced: "600",
    variance: "100",
  },
  {
    plant_code: "LNAFP",
    plant_name: "Firepower' Nandina",
    stage: "2",
    required: "500",
    produced: "600",
    variance: "100",
  },
  {
    plant_code: "LAGBG",
    plant_name: "Blue Glow Agave",
    stage: "2",
    required: "500",
    produced: "600",
    variance: "100",
  },
  {
    plant_code: "LAGBG",
    plant_name: "Blue Glow Agave",
    stage: "2",
    required: "500",
    produced: "600",
    variance: "100",
  },
  {
    plant_code: "LAGBG",
    plant_name: "Blue Glow Agave",
    stage: "2",
    required: "500",
    produced: "600",
    variance: "100",
  },
  {
    plant_code: "LAGBG",
    plant_name: "Blue Glow Agave",
    stage: "2",
    required: "500",
    produced: "600",
    variance: "100",
  },
];


var dataTable2 = [
  {
    plant_code: "LAGBG",
    plant_name: "Blue Glow Agave",
    stage: "2",
    required: "500",
    produced: "300",
    variance: "100",
  },
  {
    plant_code: "LAGBG",
    plant_name: "Blue Glow Agave",
    stage: "2",
    required: "500",
    produced: "300",
    variance: "100",
  },
  {
    plant_code: "LNAFP",
    plant_name: "Firepower' Nandina",
    stage: "2",
    required: "500",
    produced: "300",
    variance: "100",
  },
  {
    plant_code: "LNAFP",
    plant_name: "Firepower' Nandina",
    stage: "2",
    required: "500",
    produced: "600",
    variance: "100",
  },
  {
    plant_code: "LNAFP",
    plant_name: "Firepower' Nandina",
    stage: "2",
    required: "500",
    produced: "600",
    variance: "100",
  },
  {
    plant_code: "LAGBG",
    plant_name: "Blue Glow Agave",
    stage: "2",
    required: "500",
    produced: "600",
    variance: "100",
  },
  {
    plant_code: "LAGBG",
    plant_name: "Blue Glow Agave",
    stage: "2",
    required: "500",
    produced: "600",
    variance: "100",
  },
  {
    plant_code: "LAGBG",
    plant_name: "Blue Glow Agave",
    stage: "2",
    required: "500",
    produced: "600",
    variance: "100",
  },
  {
    plant_code: "LAGBG",
    plant_name: "Blue Glow Agave",
    stage: "2",
    required: "500",
    produced: "600",
    variance: "100",
  },
];


var dataElement = {
  labels: ['Valor1','valor2'],
  datasets: [
    {
      label: 'Valores:',
      data: [25,35],
      backgroundColor: ['#17202a', '#839192'],
    },
  ]
};

var dataElement2 = {
  labels: ["LNAFP","LAGBG"],
  datasets: [
    {
      label: "Required",
        data: [500,760,],
        backgroundColor: "#5fa55a",
    },
    {
      label: "Produced",
        data: [300,380,],
        backgroundColor: "#01b4bc",
    },
  ]
};


var setOptions1 = {
  plugins: {
    legend: {
      display: true,
    },
    title: {
        display: true,
        text: 'By Team',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'white',
      font: {
        weight: 'bold',
        size: 35,
      },
      align:'bot',
      formatter: function (value, context){
        return value + '%';
      }
    }
  },
  scales: {
    x: {
      display: false,
      gridLines: {
        display: false,
      },
    },
    y:{
      display: false,
      gridLines: {
        display: false,
      },
    }
  },
};

var setOptions2 = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
        display: true,
        text: 'Containers S2 by Crop',
        font: {
          size: 25
        }
    },
    datalabels: {
        display: false,
        color: 'white',
        font: {
          weight: 'bold',
          size: 35,
        },
        align:'bot',
      }
  },
  scales: {
    x: {
      display: true,
      gridLines: {
        display: true,
      },
    },
    y:{
      display: true,
      gridLines: {
        display: true,
      },
    }
  },
};

var setOptions3 = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
        display: true,
        text: 'Containers S3 by Crop',
        font: {
          size: 25
        }
    },
    datalabels: {
      display: false,
      color: 'white',
      font: {
        weight: 'bold',
        size: 35,
      },
      align:'bot',
    }
  },
  scales: {
    x: {
      display: true,
      gridLines: {
        display: true,
      },
    },
    y:{
      display: true,
      gridLines: {
        display: true,
      },
    }
  },
};

var setOptions4 = {
  plugins: {
    legend: {
      display: true,
    },
    title: {
        display: true,
        text: 'By stage',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'white',
        font: {
          weight: 'bold',
          size: 25,
        },
        align:'bot',
        formatter: function (value, context){
          return value + '%';
        }
      },

  },
  scales: {
    x: {
      display: false,
      gridLines: {
        display: false,
      },
    },
    y:{
      display: false,
      gridLines: {
        display: false,
      },
    }
  },
};

var setOptions5 = {
  plugins: {
    legend: {
      display: true,
    },
    title: {
        display: true,
        text: 'Variance By Crop',
        font: {
          size: 25
        }
    },
    datalabels: {
        color: 'white',
        font: {
          weight: 'bold',
          size: 35,
        },
        align:'bot',
      }
  },
  scales: {
    x: {
      display: true,
      gridLines: {
        display: true,
      },
    },
    y:{
      display: true,
      gridLines: {
        display: true,
      },
    }
  },
};
