var array_background = getPAlleteColors(4,8);

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Plant Code", field:'plant_code',hozAlign:"left",width:150},
  { title:"Plant Name", field:'plant_name',hozAlign:"left",width:350},
  { title:"Container Type", field:'container_type',hozAlign:"left",width:250},
  { title:"Week", field:'week',hozAlign:"left",width:100},
  { title:"Status", field:'status',hozAlign:"left",width:250},
  { title:"Production Plan", field:'production_plan',hozAlign:"left",width:200},
  { title:"Produced Production", field:'produced_production',hozAlign:"left",width:200},
  { title:"Progress %",  field:"progress", hozAlign:"left", formatter:"progress", editor:true, width:200 },

];



var dataTable1 = [
  {
    plant_code: "LNAFP",
    plant_name: "Nandina domestica nana ‘Firepower’",
    container_type: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "850",
    produced_production: "340",
    progress: "40",
  },
    {
    plant_code: "LNAPE",
    plant_name: "Nandina domestica Cool Glow Peach",
    container_type: "Baby Jar",
    week: "2",
    status: "Execute",
    production_plan: "1000",
    produced_production: "600",
    progress: "60",
  },
    {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container_type: "Magenta Box",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "50",
  },
  {
    plant_code: "LNAFP",
    plant_name: "Nandina domestica nana ‘Firepower’",
    container_type: "Magenta Box",
    week: "2",
    status: "Planning",
    production_plan: "850",
    produced_production: "340",
    progress: "40",
  },
  {
    plant_code: "LNAPE",
    plant_name: "Nandina domestica Cool Glow Peach",
    container_type: "Baby Jar",
    week: "2",
    status: "Execute",
    production_plan: "1000",
    produced_production: "600",
    progress: "60",
  },
  {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container_type: "Magenta Box",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "50",
  },
  {
    plant_code: "LNAFP",
    plant_name: "Nandina domestica nana ‘Firepower’",
    container_type: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "850",
    produced_production: "340",
    progress: "40",
  },
  {
    plant_code: "LNAPE",
    plant_name: "Nandina domestica Cool Glow Peach",
    container_type: "Baby Jar",
    week: "2",
    status: "Execute",
    production_plan: "1000",
    produced_production: "600",
    progress: "60",
  },
  {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container_type: "Magenta Box",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "50",
  },
    {
    plant_code: "LNAFP",
    plant_name: "Nandina domestica nana ‘Firepower’",
    container_type: "Magenta Box",
    week: "2",
    status: "Planning",
    production_plan: "850",
    produced_production: "340",
    progress: "40",
  },
    {
    plant_code: "LNAPE",
    plant_name: "Nandina domestica Cool Glow Peach",
    container_type: "Baby Jar",
    week: "2",
    status: "Execute",
    production_plan: "1000",
    produced_production: "600",
    progress: "60",
  },
    {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container_type: "Magenta Box",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "50",
  },
    {
    plant_code: "LNAFP",
    plant_name: "Nandina domestica nana ‘Firepower’",
    container_type: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "850",
    produced_production: "340",
    progress: "40",
  },
    {
    plant_code: "LNAPE",
    plant_name: "Nandina domestica Cool Glow Peach",
    container_type: "Baby Jar",
    week: "2",
    status: "Execute",
    production_plan: "1000",
    produced_production: "600",
    progress: "60",
  },
    {
    plant_code: "LNAPO",
    plant_name: "Nandina domestica Cool Glow Pomegranate",
    container_type: "Baby Jar",
    week: "2",
    status: "Planning",
    production_plan: "900",
    produced_production: "450",
    progress: "50",
  }, 
];

//-----DATA GRAPHIC
var data1 = {
  labels: ['LNAFP','LNAPE','LNAFP','LNAPE','LNAPO',],
  datasets: [
    {
      label: 'Production Plan',
      data: [25,10,20,15,10],
      backgroundColor: array_background[3],
    },
    {
      label: 'Produced Production ',
      data: [10,5,10,15,10],
      backgroundColor: array_background[0],
    },
  ]
};

var data2 = {
  labels: ['Produced Production','Production Plan',],
  datasets: [
    {
      label: 'Value',
      data: [40,50],
      backgroundColor: [array_background[3],array_background[0]],
    },
  ]
};

var data3 = {
  labels: ['Team 1','Team 2','Team 3','Team 4','Team 5',],
  datasets: [
    {
      label: 'Production Plan',
      data: [90,300,150,60,200],
      backgroundColor: array_background[3],
    },
    {
      label: 'Produced Production ',
      data: [45,170,90,30,140],
      backgroundColor: array_background[0],
    },
  ]
};


//-----CONFIG GRAPHIC
var setOptions1 = {
  plugins: {

    datalabels: {
      display: true,
      color: 'white',
    },
    title: {
      display: true,
      text: 'Production Plant',
      font: {
        size: 25
      }
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
      ticks: {
        stepSize: 1
      },
    }
  }
};

var setOptions2 = {
  plugins: {
    datalabels: {
      display: true,
      color: 'white',
    },
    title: {
      display: true,
      text: 'Production Plan Vs Produced',
      font: {
        size: 25
      }
    },
  },
  responsive: true,
  scales: {

    x: {
      stacked: false,
      display: false,
    },
    y: {
      stacked: false,
      display: false,
      ticks: {
        stepSize: 1
      },
    }
  }
};

var setOptions3 = {
  plugins: {

    datalabels: {
      display: true,
      color: 'white',
    },
    title: {
      display: true,
      text: 'Team vs Team',
      font: {
        size: 25
      }
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
      ticks: {
        stepSize: 1
      },
    }
  }
};