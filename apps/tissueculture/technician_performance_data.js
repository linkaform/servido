array_colors = getPAlleteColors(7,10);

//---- TABLE DEFINITION
var columsTable1 = [
  { title:"Stage", field:'stage',hozAlign:"left", width:150,},
  { title:"Magnolia", field:'magnolia',hozAlign:"left", width:150,},
  { title:"Team 1", field:'team_1',hozAlign:"left", width:150,},
  { title:"Team 2", field:'team_2',hozAlign:"left", width:150,},
  { title:"Team 3", field:'team_3',hozAlign:"left", width:150,},
];

var columsTable2 = [
  { title:"Plant", field:'value_plant',hozAlign:"left", responsive:0, width:200,},
  { title:"Cut", field:'value_cut',hozAlign:"left", responsive:2, width:200,},
];

var columsTable3 = [
  { title:"Cutter", field:'value_plant',hozAlign:"left", responsive:0, width:200,},
  { title:"Cut", field:'value_cut',hozAlign:"left", responsive:2, width:200,},
];

var columsTable4 = [
  { title:"Cutter", field:'value_plant',hozAlign:"left", responsive:0, width:200,},
  { title:"Cut", field:'value_cut',hozAlign:"left", responsive:2, width:200,},
];


var columsTable5 = [
  { title:"Cutter", field:'cutter',hozAlign:"left", width:150,},
  { title:"Work Hours", field:'work_hours',hozAlign:"left", width:150,},
];



var dataTable1 = [
  {
    stage:"All",
    magnolia:"150 pl/hr",
    team_1:"150 pl/hr",
    team_2:"150 pl/hr",
    team_3:"150 pl/hr",
  },
  {
    stage:"Stage 2",
    magnolia:"170 pl/hr",
    team_1:"170 pl/hr",
    team_2:"170 pl/hr",
    team_3:"170 pl/hr",
  },
  {
    stage:"Stage 3",
    magnolia:"140 pl/hr",
    team_1:"140 pl/hr",
    team_2:"140 pl/hr",
    team_3:"140 pl/hr",
  },
]

var dataTable2 = [
  {
    value_plant:"LNAFP",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"Team 1",value_cut:"175 pl/hr",},
      { value_plant:"Team 2",value_cut:"160 pl/hr",},
      { value_plant:"Team 3",value_cut:"145 pl/hr",},
    ],
  },
  {
    value_plant:"LNAOB",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"Team 1",value_cut:"175 pl/hr",},
      { value_plant:"Team 2",value_cut:"160 pl/hr",},
      { value_plant:"Team 3",value_cut:"145 pl/hr",},
    ],
  },
  {
    value_plant:"LNAGS",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"Team 1",value_cut:"175 pl/hr",},
      { value_plant:"Team 2",value_cut:"160 pl/hr",},
      { value_plant:"Team 3",value_cut:"145 pl/hr",},
    ],
  },
  {
    value_plant:"LNAFL",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"Team 1",value_cut:"175 pl/hr",},
      { value_plant:"Team 2",value_cut:"160 pl/hr",},
      { value_plant:"Team 3",value_cut:"145 pl/hr",},
    ],
  },
  {
    value_plant:"LANMB",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"Team 1",value_cut:"175 pl/hr",},
      { value_plant:"Team 2",value_cut:"160 pl/hr",},
      { value_plant:"Team 3",value_cut:"145 pl/hr",},
    ],
  },
  {
    value_plant:"LANPE",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"Team 1",value_cut:"175 pl/hr",},
      { value_plant:"Team 2",value_cut:"160 pl/hr",},
      { value_plant:"Team 3",value_cut:"145 pl/hr",},
    ],
  },
]

var dataTable3 = [
  {
    value_plant:"LNAFP",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"Joe Down",value_cut:"175 pl/hr",},
      { value_plant:"Pedro Palos",value_cut:"160 pl/hr",},
      { value_plant:"Casi Miro",value_cut:"145 pl/hr",},
    ],
  },
  {
    value_plant:"LNAOB",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"Joe Down",value_cut:"175 pl/hr",},
      { value_plant:"Pedro Palos",value_cut:"160 pl/hr",},
      { value_plant:"Casi Miro",value_cut:"145 pl/hr",},
    ],
  },
  {
    value_plant:"LNAGS",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"Joe Down",value_cut:"175 pl/hr",},
      { value_plant:"Pedro Palos",value_cut:"160 pl/hr",},
      { value_plant:"Casi Miro",value_cut:"145 pl/hr",},
    ],
  },
  {
    value_plant:"LNAFL",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"Joe Down",value_cut:"175 pl/hr",},
      { value_plant:"Pedro Palos",value_cut:"160 pl/hr",},
      { value_plant:"Casi Miro",value_cut:"145 pl/hr",},
    ],
  },
  {
    value_plant:"LANMB",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"Joe Down",value_cut:"175 pl/hr",},
      { value_plant:"Pedro Palos",value_cut:"160 pl/hr",},
      { value_plant:"Casi Miro",value_cut:"145 pl/hr",},
    ],
  },
  {
    value_plant:"LANPE",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"Joe Down",value_cut:"175 pl/hr",},
      { value_plant:"Pedro Palos",value_cut:"160 pl/hr",},
      { value_plant:"Casi Miro",value_cut:"145 pl/hr",},
    ],
  },
]

var dataTable4 = [
  {
    value_cutter:"Joe Down",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"LNAFP",value_cut:"175 pl/hr",},
      { value_plant:"LNAOB",value_cut:"160 pl/hr",},
      { value_plant:"LNAGS",value_cut:"145 pl/hr",},
    ],
  },
  {
    value_cutter:"Pedro Palos",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"LNAFP",value_cut:"175 pl/hr",},
      { value_plant:"LNAOB",value_cut:"160 pl/hr",},
      { value_plant:"LNAGS",value_cut:"145 pl/hr",},
    ],
  },
  {
    value_cutter:"Casi Miro",
    value_cut : "144 pl/hr",
    _children:[
      { value_plant:"LNAFP",value_cut:"175 pl/hr",},
      { value_plant:"LNAOB",value_cut:"160 pl/hr",},
      { value_plant:"LNAGS",value_cut:"145 pl/hr",},
    ],
  },
]

var dataTable5 = [
  {
    cutter:"Joe Down",
    work_hours : "144 ",
  },
  {
    cutter:"Pedro Palos",
    work_hours : "175 ",
  },
  {
    cutter:"Casi Miro",
    work_hours : "184 ",
  },
]

var dataTable6 = [
  {
    stage:"All",
    magnolia:"150 pl/hr",
    team_1:"150 pl/hr",
    team_2:"150 pl/hr",
    team_3:"150 pl/hr",
  },
  {
    stage:"Stage 2",
    magnolia:"170 pl/hr",
    team_1:"170 pl/hr",
    team_2:"170 pl/hr",
    team_3:"170 pl/hr",
  },
  {
    stage:"Stage 3",
    magnolia:"140 pl/hr",
    team_1:"140 pl/hr",
    team_2:"140 pl/hr",
    team_3:"140 pl/hr",
  },
]
//---- GRAPHIC DEFINITION

var dataElement1 = {
  labels: ["Team 1","Team 2","Team 3"],
  datasets: [
    {
      label: "Stage 2",
        data: [500,760,650],
        backgroundColor: "#1f618d",
    },
    {
      label: "Stage 3",
        data: [300,380,400],
        backgroundColor: "#e67e22",
    },
  ]
};

var dataElement2 = {
  labels: ["LAGBC","LNAOB","LNAGS","LNAFL","LALME","LANMB","LANPE","PANPE"],
  datasets: [
    {
      label: "Produced",
        data: [852,789,760,650,500,369,245,100],
        backgroundColor: array_colors,
    },
  ]
};

var dataElement3 = {
  labels: ["LAGBC","LNAOB","LNAGS","LNAFL","LALME","LANMB","LANPE","PANPE"],
  datasets: [
    {
      label: "Produced",
        data: [852,789,760,650,500,369,245,100],
        backgroundColor: array_colors,
    },
  ]
};

var dataElement4 = {
  labels: ["Team 1","Team 2","Team 3"],
  datasets: [
    {
      data: [40,35,25],
      backgroundColor: array_colors,
    },
  ]
};

var dataElement5 = {
  labels: ["LAGBC","LNAOB","LNAGS","LNAFL","LALME","LANMB","LANPE","PANPE"],
  datasets: [
    {
      label: "Produced",
        data: [852,789,760,650,500,369,245,100],
        backgroundColor: array_colors,
    },
  ]
};


var dataElement6 = {
  labels: ["Joe Down","Pedro Palos","Casi Miro"],
  datasets: [
    {
      data: [852,789,760],
      backgroundColor: array_colors,
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
        text: 'Grapich Productivity',
        font: {
          size: 25
        }
    },
    datalabels: {
      display: true,
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

var setOptions2 = {
  plugins: {
    legend: {
      display: true,
    },
    title: {
        display: true,
        text: 'Productivity by Plant',
        font: {
          size: 25
        }
    },
    datalabels: {
      display: true,
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
      display: true,
    },
    title: {
        display: false,
        text: 'Productivity by Cutter',
        font: {
          size: 35
        }
    },
    datalabels: {
      display: true,
      color: 'white',
      font: {
        weight: 'bold',
        size: 10,
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
        text: 'Work Hours by Team',
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
        text: 'Work Hours By Plant',
        font: {
          size: 25
        }
    },
    datalabels: {
      display: true,
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



var setOptions6 = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
        display: true,
        text: 'Works Hour by Cutter',
        font: {
          size: 25
        }
    },
    datalabels: {
      display: true,
      color: 'white',
      font: {
        weight: 'bold',
        size: 15,
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
