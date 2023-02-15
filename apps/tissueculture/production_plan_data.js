var array_background = getPAlleteColors(4,8);

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Plant Code", field:'plant_code',hozAlign:"left",width:150},
  { title:"Plant Name", field:'plant_name',hozAlign:"left",width:350},
  { title:"Container Type", field:'container',hozAlign:"left",width:250},
  { title:"Stage", field:'stage',hozAlign:"right",width:250},
  { title:"Production Plan", field:'planned', formatter: "money", formatterParams: {decimal: ".", thousand: ",", precision: 0 } , hozAlign:"right",width:200},
  { title:"Production", field:'produced', formatter: "money", formatterParams: {decimal: ".", thousand: ",", precision: 0 } , hozAlign:"right",width:200},
  { title:"Progress", field:'progress', formatter: "money", formatterParams: {decimal: ".", symbol:"%",symbolAfter:true,thousand: ",", precision: 0 } ,hozAlign:"right",width:120},
  { title:"Progress %",  field:"progress", hozAlign:"left", formatter:"progress", editor:true,
      formatterParams:{
        min:0,
        max:100,
        color:["#ff5252", "#fdfc8b","#8db600"],
        legendColor:"#000000",
        legendAlign:"center",
    },width:200 
  },
];



var dataTable1 = [
  {
    plant_code: "LNAFP",
    plant_name: "Nandina domestica nana ‘Firepower’",
    container: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "850",
    produced_production: "340",
    progress: "100",
  },
    {
    plant_code: "LNAPE",
    plant_name: "Nandina domestica Cool Glow Peach",
    container: "Baby Jar",
    week: "2",
    status: "Execute",
    production_plan: "1000",
    produced_production: "600",
    progress: "66",
  },
    {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Magenta Box",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "50",
  },
  {
    plant_code: "LNAFP",
    plant_name: "Nandina domestica nana ‘Firepower’",
    container: "Magenta Box",
    week: "2",
    status: "Planning",
    production_plan: "850",
    produced_production: "340",
    progress: "40",
  },
  {
    plant_code: "LNAPE",
    plant_name: "Nandina domestica Cool Glow Peach",
    container: "Baby Jar",
    week: "2",
    status: "Execute",
    production_plan: "1000",
    produced_production: "600",
    progress: "60",
  },
  {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Magenta Box",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "50",
  },
  {
    plant_code: "LNAFP",
    plant_name: "Nandina domestica nana ‘Firepower’",
    container: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "850",
    produced_production: "340",
    progress: "40",
  },
  {
    plant_code: "LNAPE",
    plant_name: "Nandina domestica Cool Glow Peach",
    container: "Baby Jar",
    week: "2",
    status: "Execute",
    production_plan: "1000",
    produced_production: "600",
    progress: "60",
  },
  {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Magenta Box",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "50",
  },
    {
    plant_code: "LNAFP",
    plant_name: "Nandina domestica nana ‘Firepower’",
    container: "Magenta Box",
    week: "2",
    status: "Planning",
    production_plan: "850",
    produced_production: "340",
    progress: "40",
  },
    {
    plant_code: "LNAPE",
    plant_name: "Nandina domestica Cool Glow Peach",
    container: "Baby Jar",
    week: "2",
    status: "Execute",
    production_plan: "1000",
    produced_production: "600",
    progress: "60",
  },
    {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Magenta Box",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "50",
  },
    {
    plant_code: "LNAFP",
    plant_name: "Nandina domestica nana ‘Firepower’",
    container: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "850",
    produced_production: "340",
    progress: "40",
  },
    {
    plant_code: "LNAPE",
    plant_name: "Nandina domestica Cool Glow Peach",
    container: "Baby Jar",
    week: "2",
    status: "Execute",
    production_plan: "1000",
    produced_production: "600",
    progress: "60",
  },
  {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "50",
  },
  {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "30",
  },
    {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "30",
  },
    {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "30",
  },
    {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "30",
  },  
    {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "30",
  },
    {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "30",
  },
    {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "30",
  },
    {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "30",
  },
    {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "30",
  },
    {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "30",
  },

];

//-----DATA GAUGE

var dataGauge1 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 80,
    title: { text: "Total Requierd" , 'font': {'size': 22} },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [null, 150], tickwidth: 1},
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

var dataGauge2 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 40,
    title: { text: "Stage 2" , 'font': {'size': 22} },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [null, 150], tickwidth: 1},
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

var dataGauge3 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 140,
    title: { text: "Stage 3" , 'font': {'size': 22} },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [null, 150], tickwidth: 1},
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



var dataGauge4 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 120,
    title: { text: "Total Requierd" , 'font': {'size': 22} },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [null, 150], tickwidth: 1},
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

var dataGauge5 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 110,
    title: { text:  "Stage 2" , 'font': {'size': 22} },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [null, 150], tickwidth: 1},
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

var dataGauge6 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 120,
    title: { text:  "Stage 3" , 'font': {'size': 22} },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [null, 150], tickwidth: 1},
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



var dataGauge7 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 50,
    title: { text: "Total Requierd" , 'font': {'size': 22} },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [null, 150], tickwidth: 1},
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

var dataGauge8 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 30,
    title: { text:  "Stage 2" , 'font': {'size': 22} },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [null, 150], tickwidth: 1},
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

var dataGauge9 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 15,
    title: { text:  "Stage 3" , 'font': {'size': 22} },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [null, 150], tickwidth: 1},
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



var dataGauge10 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 90,
    title: { text: "Total Requierd" , 'font': {'size': 22} },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [null, 150], tickwidth: 1},
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

var dataGauge11 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 80,
    title: { text:  "Stage 2" , 'font': {'size': 22} },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [null, 150], tickwidth: 1},
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

var dataGauge12 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 100,
    title: { text:  "Stage 3" , 'font': {'size': 22} },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
    axis: { range: [null, 150], tickwidth: 1},
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
