// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes

var columsTable1 = [
  { title:"Plant Code", field:'plant_code',hozAlign:"left",width:250},
  { title:"Cut Week", field:'cut_week',hozAlign:"left",width:250},
  {title:"Stage 2", hozAlign:"center",
    columns:[
      {title:"Actuals", field:'stage_2_actuals',hozAlign:"right",formatter: "money",formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 0},width:250},
      {title:"Forecast", field:'stage_2_forcast',hozAlign:"right",formatter: "money",formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 0},width:250},
    ]
  },
  {title:"Stage 3", hozAlign:"center",
    columns:[
      {title:"Actuals", field:'stage_3_actuals',hozAlign:"right",formatter: "money",formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 0},width:250},
      {title:"Forecast", field:'stage_3_forcast',hozAlign:"right",formatter: "money",formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 0},width:250},
    ]
  },
];




var dataTable1 = [
  {
    plant_code: 'AAAA',
    stage_3_required: 26044,
    stage_2_required: 26044,
    stage_3_actuals_diff: 26044,
    stage_2_actuals: 6047,
    stage_3_actuals: 6047,
    stage_2_actuals_diff: 50000,
    _children: [
      {
          stage_2_diference: -911,
          stage_3_required: 911,
          cut_week: 202238,
          stage_3_diference: -911,
          stage_2_required: 911
      },
      {
          stage_3_actuals: 2700,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -2949,
          stage_3_diference: -549,
          stage_2_actuals: 300,
          cut_week: 202237
      },
      {
          stage_2_diference: -3249,
          stage_3_required: 3249,
          cut_week: 202236,
          stage_3_diference: -3249,
          stage_2_required: 3249
      },
      {
          stage_3_actuals: 108,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -3249,
          stage_3_diference: -3141,
          cut_week: 202235
      },
    ],
  },
  {
    plant_code: 'AAAA',
    stage_3_required: 26044,
    stage_2_required: 26044,
    stage_3_actuals_diff: 26044,
    stage_2_actuals: 6047,
    stage_3_actuals: 6047,
    stage_2_actuals_diff: 50000,
    _children: [
      {
          stage_2_diference: -911,
          stage_3_required: 911,
          cut_week: 202238,
          stage_3_diference: -911,
          stage_2_required: 911
      },
      {
          stage_3_actuals: 2700,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -2949,
          stage_3_diference: -549,
          stage_2_actuals: 300,
          cut_week: 202237
      },
      {
          stage_2_diference: -3249,
          stage_3_required: 3249,
          cut_week: 202236,
          stage_3_diference: -3249,
          stage_2_required: 3249
      },
      {
          stage_3_actuals: 108,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -3249,
          stage_3_diference: -3141,
          cut_week: 202235
      },
    ],
  },
  {
    plant_code: 'AAAA',
    stage_3_required: 26044,
    stage_2_required: 26044,
    stage_3_actuals_diff: 26044,
    stage_2_actuals: 6047,
    stage_3_actuals: 6047,
    stage_2_actuals_diff: 50000,
    _children: [
      {
          stage_2_diference: -911,
          stage_3_required: 911,
          cut_week: 202238,
          stage_3_diference: -911,
          stage_2_required: 911
      },
      {
          stage_3_actuals: 2700,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -2949,
          stage_3_diference: -549,
          stage_2_actuals: 300,
          cut_week: 202237
      },
      {
          stage_2_diference: -3249,
          stage_3_required: 3249,
          cut_week: 202236,
          stage_3_diference: -3249,
          stage_2_required: 3249
      },
      {
          stage_3_actuals: 108,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -3249,
          stage_3_diference: -3141,
          cut_week: 202235
      },
    ],
  },
  {
    plant_code: 'AAAA',
    stage_3_required: 26044,
    stage_2_required: 26044,
    stage_3_actuals_diff: 26044,
    stage_2_actuals: 6047,
    stage_3_actuals: 6047,
    stage_2_actuals_diff: 50000,
    _children: [
      {
          stage_2_diference: -911,
          stage_3_required: 911,
          cut_week: 202238,
          stage_3_diference: -911,
          stage_2_required: 911
      },
      {
          stage_3_actuals: 2700,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -2949,
          stage_3_diference: -549,
          stage_2_actuals: 300,
          cut_week: 202237
      },
      {
          stage_2_diference: -3249,
          stage_3_required: 3249,
          cut_week: 202236,
          stage_3_diference: -3249,
          stage_2_required: 3249
      },
      {
          stage_3_actuals: 108,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -3249,
          stage_3_diference: -3141,
          cut_week: 202235
      },
    ],
  },
  {
    plant_code: 'AAAA',
    stage_3_required: 26044,
    stage_2_required: 26044,
    stage_3_actuals_diff: 26044,
    stage_2_actuals: 6047,
    stage_3_actuals: 6047,
    stage_2_actuals_diff: 50000,
    _children: [
      {
          stage_2_diference: -911,
          stage_3_required: 911,
          cut_week: 202238,
          stage_3_diference: -911,
          stage_2_required: 911
      },
      {
          stage_3_actuals: 2700,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -2949,
          stage_3_diference: -549,
          stage_2_actuals: 300,
          cut_week: 202237
      },
      {
          stage_2_diference: -3249,
          stage_3_required: 3249,
          cut_week: 202236,
          stage_3_diference: -3249,
          stage_2_required: 3249
      },
      {
          stage_3_actuals: 108,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -3249,
          stage_3_diference: -3141,
          cut_week: 202235
      },
    ],
  },
  {
    plant_code: 'AAAA',
    stage_3_required: 26044,
    stage_2_required: 26044,
    stage_3_actuals_diff: 26044,
    stage_2_actuals: 6047,
    stage_3_actuals: 6047,
    stage_2_actuals_diff: 50000,
    _children: [
      {
          stage_2_diference: -911,
          stage_3_required: 911,
          cut_week: 202238,
          stage_3_diference: -911,
          stage_2_required: 911
      },
      {
          stage_3_actuals: 2700,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -2949,
          stage_3_diference: -549,
          stage_2_actuals: 300,
          cut_week: 202237
      },
      {
          stage_2_diference: -3249,
          stage_3_required: 3249,
          cut_week: 202236,
          stage_3_diference: -3249,
          stage_2_required: 3249
      },
      {
          stage_3_actuals: 108,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -3249,
          stage_3_diference: -3141,
          cut_week: 202235
      },
    ],
  },
  {
    plant_code: 'AAAA',
    stage_3_required: 26044,
    stage_2_required: 26044,
    stage_3_actuals_diff: 26044,
    stage_2_actuals: 6047,
    stage_3_actuals: 6047,
    stage_2_actuals_diff: 50000,
    _children: [
      {
          stage_2_diference: -911,
          stage_3_required: 911,
          cut_week: 202238,
          stage_3_diference: -911,
          stage_2_required: 911
      },
      {
          stage_3_actuals: 2700,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -2949,
          stage_3_diference: -549,
          stage_2_actuals: 300,
          cut_week: 202237
      },
      {
          stage_2_diference: -3249,
          stage_3_required: 3249,
          cut_week: 202236,
          stage_3_diference: -3249,
          stage_2_required: 3249
      },
      {
          stage_3_actuals: 108,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -3249,
          stage_3_diference: -3141,
          cut_week: 202235
      },
    ],
  },
  {
    plant_code: 'AAAA',
    stage_3_required: 26044,
    stage_2_required: 26044,
    stage_3_actuals_diff: 26044,
    stage_2_actuals: 6047,
    stage_3_actuals: 6047,
    stage_2_actuals_diff: 50000,
    _children: [
      {
          stage_2_diference: -911,
          stage_3_required: 911,
          cut_week: 202238,
          stage_3_diference: -911,
          stage_2_required: 911
      },
      {
          stage_3_actuals: 2700,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -2949,
          stage_3_diference: -549,
          stage_2_actuals: 300,
          cut_week: 202237
      },
      {
          stage_2_diference: -3249,
          stage_3_required: 3249,
          cut_week: 202236,
          stage_3_diference: -3249,
          stage_2_required: 3249
      },
      {
          stage_3_actuals: 108,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -3249,
          stage_3_diference: -3141,
          cut_week: 202235
      },
    ],
  },
  {
    plant_code: 'AAAA',
    stage_3_required: 26044,
    stage_2_required: 26044,
    stage_3_actuals_diff: 26044,
    stage_2_actuals: 6047,
    stage_3_actuals: 6047,
    stage_2_actuals_diff: 50000,
    _children: [
      {
          stage_2_diference: -911,
          stage_3_required: 911,
          cut_week: 202238,
          stage_3_diference: -911,
          stage_2_required: 911
      },
      {
          stage_3_actuals: 2700,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -2949,
          stage_3_diference: -549,
          stage_2_actuals: 300,
          cut_week: 202237
      },
      {
          stage_2_diference: -3249,
          stage_3_required: 3249,
          cut_week: 202236,
          stage_3_diference: -3249,
          stage_2_required: 3249
      },
      {
          stage_3_actuals: 108,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -3249,
          stage_3_diference: -3141,
          cut_week: 202235
      },
    ],
  },
  {
    plant_code: 'AAAA',
    stage_3_required: 26044,
    stage_2_required: 26044,
    stage_3_actuals_diff: 26044,
    stage_2_actuals: 6047,
    stage_3_actuals: 6047,
    stage_2_actuals_diff: 50000,
    _children: [
      {
          stage_2_diference: -911,
          stage_3_required: 911,
          cut_week: 202238,
          stage_3_diference: -911,
          stage_2_required: 911
      },
      {
          stage_3_actuals: 2700,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -2949,
          stage_3_diference: -549,
          stage_2_actuals: 300,
          cut_week: 202237
      },
      {
          stage_2_diference: -3249,
          stage_3_required: 3249,
          cut_week: 202236,
          stage_3_diference: -3249,
          stage_2_required: 3249
      },
      {
          stage_3_actuals: 108,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -3249,
          stage_3_diference: -3141,
          cut_week: 202235
      },
    ],
  },
  {
    plant_code: 'AAAA',
    stage_3_required: 26044,
    stage_2_required: 26044,
    stage_3_actuals_diff: 26044,
    stage_2_actuals: 6047,
    stage_3_actuals: 6047,
    stage_2_actuals_diff: 50000,
    _children: [
      {
          stage_2_diference: -911,
          stage_3_required: 911,
          cut_week: 202238,
          stage_3_diference: -911,
          stage_2_required: 911
      },
      {
          stage_3_actuals: 2700,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -2949,
          stage_3_diference: -549,
          stage_2_actuals: 300,
          cut_week: 202237
      },
      {
          stage_2_diference: -3249,
          stage_3_required: 3249,
          cut_week: 202236,
          stage_3_diference: -3249,
          stage_2_required: 3249
      },
      {
          stage_3_actuals: 108,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -3249,
          stage_3_diference: -3141,
          cut_week: 202235
      },
    ],
  },
  {
    plant_code: 'AAAA',
    stage_3_required: 26044,
    stage_2_required: 26044,
    stage_3_actuals_diff: 26044,
    stage_2_actuals: 6047,
    stage_3_actuals: 6047,
    stage_2_actuals_diff: 50000,
    _children: [
      {
          stage_2_diference: -911,
          stage_3_required: 911,
          cut_week: 202238,
          stage_3_diference: -911,
          stage_2_required: 911
      },
      {
          stage_3_actuals: 2700,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -2949,
          stage_3_diference: -549,
          stage_2_actuals: 300,
          cut_week: 202237
      },
      {
          stage_2_diference: -3249,
          stage_3_required: 3249,
          cut_week: 202236,
          stage_3_diference: -3249,
          stage_2_required: 3249
      },
      {
          stage_3_actuals: 108,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -3249,
          stage_3_diference: -3141,
          cut_week: 202235
      },
    ],
  },
  {
    plant_code: 'AAAA',
    stage_3_required: 26044,
    stage_2_required: 26044,
    stage_3_actuals_diff: 26044,
    stage_2_actuals: 6047,
    stage_3_actuals: 6047,
    stage_2_actuals_diff: 50000,
    _children: [
      {
          stage_2_diference: -911,
          stage_3_required: 911,
          cut_week: 202238,
          stage_3_diference: -911,
          stage_2_required: 911
      },
      {
          stage_3_actuals: 2700,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -2949,
          stage_3_diference: -549,
          stage_2_actuals: 300,
          cut_week: 202237
      },
      {
          stage_2_diference: -3249,
          stage_3_required: 3249,
          cut_week: 202236,
          stage_3_diference: -3249,
          stage_2_required: 3249
      },
      {
          stage_3_actuals: 108,
          stage_3_required: 3249,
          stage_2_required: 3249,
          stage_2_diference: -3249,
          stage_3_diference: -3141,
          cut_week: 202235
      },
    ],
  },
];
