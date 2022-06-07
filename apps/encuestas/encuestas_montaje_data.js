// Datos demo para Reporte Desempeno Jornales

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Cliente", field:'cliente',hozAlign:"center",width:160},
  { title:"Cantidad",  field:'cantidad',hozAlign:"right",width:160 , formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,}},
];
//--TAble Montajes Por mes Region
var columsTable2 = [
  { title:"Region", field:'region',hozAlign:"center",width:160},
  { title:"Total",  field:'total',hozAlign:"right",width:160 , formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,}},
];


//--Table Encuestas
var columsTable3 = [
  { title:"Pregunta" , field:'pregunta', hozAlign:"left", width:250, },
  { title:"Excelente", field:'num_excelentes',hozAlign:"right",width:170, formatter: "money",
    formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 2},bottomCalc:"sum", bottomCalcParams:{
    precision:2,} },
  { title:"%", field:'porcentaje_excelentes',hozAlign:"right",width:170, formatter: "money",
    formatterParams: {symbol: "", symbolAfter: "%", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,} },
  { title:"Muy Bueno", field:'num_bueno',hozAlign:"right",width:170, formatter: "money",
    formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 2},bottomCalc:"sum", bottomCalcParams:{
    precision:2,} },
  { title:"%", field:'porcentaje_bueno',hozAlign:"right",width:170, formatter: "money",
    formatterParams: {symbol: "", symbolAfter: "%", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,} },
  { title:"Regular", field:'num_regular',hozAlign:"right",width:170, formatter: "money",
    formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 2},bottomCalc:"sum", bottomCalcParams:{
    precision:2,} },
  { title:"%", field:'porcentaje_regular',hozAlign:"right",width:170, formatter: "money",
    formatterParams: {symbol: "", symbolAfter: "%", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,} },
  { title:"Malo", field:'num_malo',hozAlign:"right",width:170, formatter: "money",
    formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 2},bottomCalc:"sum", bottomCalcParams:{
    precision:2,} },
  { title:"%", field:'porcentaje_malo',hozAlign:"right",width:170, formatter: "money",
    formatterParams: {symbol: "", symbolAfter: "%", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,} },
  { title:"Total Montajes", field:'num_totales',hozAlign:"right",width:170, formatter: "money",
    formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 2},bottomCalc:"sum", bottomCalcParams:{
    precision:2,} },
  { title:"Porcentaje", field:'porcentaje_total',hozAlign:"right",width:170, formatter: "money",
    formatterParams: {symbol: "", symbolAfter: "%", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,} },
];



var dataTable1 = [
  {
    cliente: "Gamesa",
    cantidad: 9,
  },
  {
    cliente: "Bimbo",
    cantidad: 10,
  },
  {
    cliente: "Ricolino",
    cantidad: 25,
  },
  {
    cliente: "Nestle",
    cantidad: 13,
  },
  {
    cliente: "Alpura",
    cantidad: 15,
  },
];


var dataTable2 = [
  {
    region: "Centro",
    total: 13,
  },
  {
    region: "Centro",
    total: 1,
  },
  {
    region: "Bajio",
    total: 5,
  }
];


var dataTable3 = [
  {
    pregunta: "Centro",
    num_excelentes: 1,
    porcentaje_excelentes: 100,
    num_bueno: 0,
    porcentaje_bueno: 0,
    num_regular: 0,
    porcentaje_regular: 0,
    num_malo: 0,
    porcentaje_malo: 0,
    num_totales: 1,
    porcentaje_total: 100,
  },
  {
    pregunta: "Centro",
    num_excelentes: 1,
    porcentaje_excelentes: 100,
    num_bueno: 0,
    porcentaje_bueno: 0,
    num_regular: 0,
    porcentaje_regular: 0,
    num_malo: 0,
    porcentaje_malo: 0,
    num_totales: 1,
    porcentaje_total: 100,
  },
  {
    pregunta: "Instalación",
    num_excelentes: 18,
    porcentaje_excelentes: 62.07,
    num_bueno: 8,
    porcentaje_bueno: 27.59,
    num_regular: 3,
    porcentaje_regular: 10.34,
    num_malo: 0,
    porcentaje_malo: 0,
    num_totales: 29,
    porcentaje_total: 90.34,
  },
  {
    pregunta: "Centro",
    num_excelentes: 1,
    porcentaje_excelentes: 100,
    num_bueno: 0,
    porcentaje_bueno: 0,
    num_regular: 0,
    porcentaje_regular: 0,
    num_malo: 0,
    porcentaje_malo: 0,
    num_totales: 1,
    porcentaje_total: 100,
  },
  {
    pregunta: "Centro",
    num_excelentes: 1,
    porcentaje_excelentes: 100,
    num_bueno: 0,
    porcentaje_bueno: 0,
    num_regular: 0,
    porcentaje_regular: 0,
    num_malo: 0,
    porcentaje_malo: 0,
    num_totales: 1,
    porcentaje_total: 100,
  },
];