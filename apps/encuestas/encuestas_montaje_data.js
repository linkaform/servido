// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Mes", field:"month", width:200, responsive:0},
  { title:"Cliente", field:'cliente',hozAlign:"left",width:160,responsive:2},
  { title:"Cantidad",  field:'total',hozAlign:"right",width:160 ,responsive:2},
];

//--TAble Montajes Por mes Region
var columsTable2 = [
  { title:"Region", field:'region',hozAlign:"left",width:160,responsive:0},
  { title:"Mes", field:"month", hozAlign:"left",width:200, responsive:2},
  { title:"Total",  field:'total',hozAlign:"right",width:160, responsive:2,},
];



var dataTable1 = [
  {month:"Febrero", "total":45, _children:[
    { cliente:"Bimbo", total:15},
    { cliente:"Bimbo", total:15},
    { cliente:"Bimbo", total:15},
  ]},
  {month:"Marzo","total":15, _children:[
    { cliente:"Bimbo", total:15},
  ]},
  {month:"Abril","total":10, _children:[
    { cliente:"Bimbo", total:10},
  ]},
  {month:"MAyo","total":15, _children:[
    { cliente:"Bimbo", total:15},
  ]},
];


var dataTable2 = [
  {region: "Centro","total":48, _children:[
    {month:"Enero" , total:20},
    {month:"Febrero" , total:10},
    {month:"Marzo" , total:9},
    {month:"Abril" , total:9},
  ]},
  {region: "Bajio","total":25, _children:[
    {month:"Enero" , total:5},
    {month:"Febrero",total:7},
    {month:"Marzo" , total:10},
    {month:"Abril" , total:3},
  ]},
];


var dataSecondElement = [
  {month:"Febrero", "total":45},
  {month:"Marzo", "total":15},
  {month:"Abril", "total":10},
  {month:"Mayo", "total":15},
];


var dataFourthElement = {
  labels: ["Enero","Febrero","Marzo","Noviembre","Diciembre"],
  datasets: [
    {
      label: "Centro",
      data: [14,7,2, 24,27],
    },
    {
      label: "Bajio",
      data: [9,1,0,6,4],
    }

  ]
}; 

var dataFourthElement = {
  labels: ["Enero","Febrero","Marzo","Noviembre","Diciembre"],
  datasets: [
    {
      label: "Centro",
      data: [14,7,2, 24,27],
    },
    {
      label: "Bajio",
      data: [9,1,0,6,4],
    }
    
  ]
}; 


var dataFivethElement = [
  {region: "Centro","total":18},
  {region: "Bajio","total":20},
  {region: "Norte","total":10},
];