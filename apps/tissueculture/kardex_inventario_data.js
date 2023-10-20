// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var columsTable1 = [
  //{ title:"Date from", field:'date_from',hozAlign:"left",headerFilter:"input", width:150},
  { title:"Date from", field:'date_from',hozAlign:"left", width:150},
  { title:"Date to",field:'date_to',hozAlign:"left", width:200 },
  { title:"Lot Number", field:'number',hozAlign:"left", width:200 },
  { title:"Product Code", field:'code',hozAlign:"left", width:200 },
  { title:"Total In",field:'tIn',hozAlign:"right", width:200 },
  { title:"Total Out",  field:'tOut',hozAlign:"right",width:160 },
  { title:"Actual Stock",  field:'stock',hozAlign:"left", formatter:"link", width:160 },
];

var dataTable1 = [
  {
    "date_from":'2023-01-01',
    "date_to":'2023-01-10',
    "number":'350',
    "code":'LNAFP',
    "tIn":'334',
    "tOut":'443',
    "stock":'500',
  },
];

//--Table Total
var columsTable2B = [
  { title:"Date", field:'date',hozAlign:"right", width:150},
  { title:"Production Code", field:'plant_code',hozAlign:"left", width:150},
  { title:"Lot Number",field:'lot_number',hozAlign:"right", width:200 },
  { title:"Warehouse from", field:'out',hozAlign:"left",width:200 },
  { title:"Warehouse to",field:'in',hozAlign:"left",width:200 },
  { title:"Move Type",field:'type',hozAlign:"left",width:200 },
  { title:"Unit",field:'unit',hozAlign:"left",width:100 },
  { title:"Qty In", field:'qtyIn',hozAlign:"right",width:100 },
  { title:"Qty Out", field:'qtyOut',hozAlign:"right",width:100 },
  { title:"Balance", field:'balance',hozAlign:"right",width:100 }
];

var dataTable2B = [
  {
    "date":'2023-01-01',
    "plant_code":'LNAFP',
    "lot_number":'18220021',
    "out":'Green House 1',
    "in":'Green House 2',
    "type":'In',
    "unit":'pza',
    "qtyIn":400,
    "qtyOut":350,
    "balance":350,
  },
  {
    "date":'2023-01-02',
    "plant_code":'LNAFP',
    "lot_number":'18220023',
    "out":'Green House 1',
    "in":'Green House 3',
    "type":'In',
    "unit":'pza',
    "qtyIn":400,
    "qtyOut":430,
    "balance":550,
  },
  {
    "date":'2023-01-03',
    "plant_code":'LNAFP',
    "lot_number":'18220024',
    "out":'Green House 2',
    "in":'Green House 3',
    "type":'Out',
    "unit":'pza',
    "qtyIn":400,
    "qtyOut":400,
    "balance":490,
  },
  {
    "date":'2023-01-04',
    "plant_code":'LNAFP',
    "lot_number":'18220026',
    "out":'Green House 2',
    "in":'Green House 4',
    "type":'Out',
    "unit":'pza',
    "qtyIn":400,
    "qtyOut":290,
    "balance":350,
  },
  {
    "date":'2023-01-05',
    "plant_code":'LNBFP',
    "lot_number":'18220021',
    "out":'Green House 2',
    "in":'Green House 3',
    "type":'In',
    "unit":'pza',
    "qtyIn":400,
    "qtyOut":370,
    "balance":390,
  },
  {
    "date":'2023-01-06',
    "plant_code":'LNAFA',
    "lot_number":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "type":'Out',
    "unit":'pza',
    "qtyIn":400,
    "qtyOut":350,
    "balance":350,
  },
  {
    "date":'2023-01-07',
    "plant_code":'LNATP',
    "lot_number":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "type":'In',
    "unit":'pza',
    "qtyIn":400,
    "qtyOut":350,
    "balance":350,
  },
  {
    "date":'2023-01-08',
    "plant_code":'LNATP',
    "lot_number":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "type":'Out',
    "unit":'pza',
    "qtyIn":400,
    "qtyOut":350,
    "balance":380,
  },
];

//--Table Total
var columsTable2 = [
  {title:"Date", field:"date_title"},
  {title:"Product Code", field:"product_code_title"},
  {title:"Lot Number", field:"lot_number_title"},
  {
    title: "Warehouse from",
    columns:[
        {title:"WAREHOUSE", field:"warehouse", cssClass: "hidden-header"},
      ]
  },
  {title:"Warehouse to", field:"warehouse_to_table"},
  {title:"Move Type", field:"move_type_table"},
  {title:"Unit", field:"unit_table"},
  {title:"Qty In", field:"qty_in_table"},
  {title:"Qty Out", field:"qty_out_table"},
  {title:"Balance", field:"balance_table"},
];

var dataTable2 = [
  {id:1, warehouse:"Warehouse 1", qty_out_table:"Initial Balance", balance_table: 0, serviceHistory:[
      {date:"01/02/2016", product_code:"LNAFP", lot_number:12, warehouse_from: "Warehouse 1", warehouse_to: "Warehouse4", move_type:"In", unit: "pza", qty_ins: 200, qty_outs: 30, balance: 400},
      {date:"07/02/2017", product_code:"LNAFP", lot_number:13, warehouse_from: "Warehouse 1", warehouse_to: "Warehouse4", move_type:"In", unit: "pza", qty_ins: 200, qty_outs: 30, balance: 400},
  ]},
  {id:2, warehouse:"Warehouse 2", qty_out_table:"Initial Balance", balance_table: 0, serviceHistory:[
     {date:"22/05/2017", product_code:"LNAFP", lot_number:20, warehouse_from: "Warehouse 2", warehouse_to: "Warehouse4", move_type:"In", unit: "pza", qty_ins: 200, qty_outs: 30, balance: 400},
     {date:"11/02/2018", product_code:"LNAFP", lot_number:25, warehouse_from: "Warehouse 2", warehouse_to: "Warehouse4", move_type:"In", unit: "pza", qty_ins: 200, qty_outs: 30, balance: 400},
     {date:"04/04/2018", product_code:"LNAFP", lot_number:30, warehouse_from: "Warehouse 2", warehouse_to: "Warehouse4", move_type:"In", unit: "pza", qty_ins: 200, qty_outs: 30, balance: 400},
  ]},
];
