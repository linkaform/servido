var columsTable1 = [
  { title:"Plant Code", field:'product_code',hozAlign:"left",width:150, headerFilter:"input"},
  { title:"Scrap Flats", field:'scrap_flats',hozAlign:"right",width:150 ,formatter:"money", formatterParams:{decimal:",",symbol:"",precision:0},},
  { title:"Total Flats",  field:'total_flats',hozAlign:"right",width:120, formatter:"money", formatterParams:{decimal:",",symbol:"",precision:0},},
  { title:"Scrap %", field:'scrap_pct',hozAlign:"right",width:150, formatter:function(cell, formatterParams, onRendered){
    //cell - the cell component
    //formatterParams - parameters set for the column
    //onRendered - function to call when the formatter has been rendered
    
    return cell.getValue() + "%"; //return the contents of the cell;
  },
  },
];

dataTable1 = [
  {
    plant_code: 'LNAFP',
    scrap_flats: 58,
    total_flats: 500,
    scrap_pct: 11.6
  },
  {
    plant_code: 'LNAFP',
    scrap_flats: 58,
    total_flats: 500,
    scrap_pct: 11.6
  },
]

var columsTable2 = [
  { title:"Plant Code", field:'plant_code',hozAlign:"left",width:150},
  { title:"Warehouse", field:'warehouse',hozAlign:"left",width:150 },
  { title:"Scrap Flats", field:'scrap_flats',hozAlign:"right",width:150 },
  { title:"Total Flats",  field:'total_flats',hozAlign:"right",width:120 },
  { title:"Scrap %", field:'scrap_pct',hozAlign:"right",width:150, formatter:function(cell, formatterParams, onRendered){
    //cell - the cell component
    //formatterParams - parameters set for the column
    //onRendered - function to call when the formatter has been rendered
    
    return cell.getValue() + "%"; //return the contents of the cell;
  },
  },
];

var dataTable2 = [
  {
    plant_code: 'LNAFP',
    warehouse: 'Wrenhouse 4',
    scrap_flats: 58,
    total_flats: 500,
    scrap_pct: 5.0
  },
  {
    plant_code: 'LNAFP',
    warehouse: 'Wrenhouse 4',
    scrap_flats: 58,
    total_flats: 500,
    scrap_pct: 5.0
  },
]

//T E R C E R  T A B L A
var columsTable3 = [
  { title:"Plant Code", field:'plant_code',hozAlign:"left",width:150},
  { title:"ReadyWeek", field:'ready_week',hozAlign:"right",width:150},
  { title:"Warehouse", field:'warehouse',hozAlign:"left",width:150 },
  { title:"Scrap Flats", field:'scrap_flats',hozAlign:"right",width:150 },
  { title:"Total Flats",  field:'total_flats',hozAlign:"right",width:120 },
  { title:"Scrap %", field:'scrap_pct',hozAlign:"right",width:150, formatter:function(cell, formatterParams, onRendered){
    //cell - the cell component
    //formatterParams - parameters set for the column
    //onRendered - function to call when the formatter has been rendered
    
    return cell.getValue() + "%"; //return the contents of the cell;
  },
  },
];

var dataTable3 = [
  {
    plant_code: 'LNAFP',
    ready_week: '202401',
    warehouse: 'Wrenhouse 4',
    scrap_flats: 2,
    total_flats: 500,
    scrap_pct: 0.4
  },
  {
    plant_code: 'LNAFP',
    ready_week: '202401',
    warehouse: 'Wrenhouse 4',
    scrap_flats: 2,
    total_flats: 500,
    scrap_pct: 0.4
  },
]

//C U A R T A  T A B L A
var columsTable4 = [
  { title:"Warehouse", field:'warehouse',hozAlign:"left",width:150 },
  { title:"ScrapFlats", field:'scrap_flats',hozAlign:"right",width:150, formatter:function(cell, formatterParams, onRendered){
    //cell - the cell component
    //formatterParams - parameters set for the column
    //onRendered - function to call when the formatter has been rendered
    
    return cell.getValue() + "%"; //return the contents of the cell;
  },
  },
];

var dataTable4 = [
  {
    warehouse: 'Wrenhouse 3',
    scrap_flats: 120,
  },
  {
    warehouse: 'Wrenhouse 4',
    scrap_flats: 125,
  },
]

//Q U I N T A  T A B L A
var columsTable5 = [
  { title:"Plant Code", field:'plant_code',hozAlign:"left",width:150},
  { title:"Reason", field:'reason',hozAlign:"left",width:150},
  { title:"Warehouse", field:'warehouse',hozAlign:"left",width:150 },
  { title:"Scrap Flats", field:'scrap_flats',hozAlign:"right",width:150 },
  { title:"Total Flats",  field:'total_flats',hozAlign:"right",width:120 },
  { title:"Scrap %", field:'scrap_pct',hozAlign:"right",width:150, formatter:function(cell, formatterParams, onRendered){
    //cell - the cell component
    //formatterParams - parameters set for the column
    //onRendered - function to call when the formatter has been rendered
    
    return cell.getValue() + "%"; //return the contents of the cell;
  },
  },
];

var dataTable5 = [
  {
    plant_code: 'LNAFP',
    reason: 'grading',
    warehouse: 'Wrenhouse 4',
    scrap_flats: 2,
    total_flats: 500,
    scrap_pct: 0.4
  },
 {
    plant_code: 'LNAFP',
    reason: 'grading',
    warehouse: 'Wrenhouse 4',
    scrap_flats: 2,
    total_flats: 500,
    scrap_pct: 0.4
  },
]

//S E X T A  T A B L A
var columsTable6 = [
  { title:"Reason", field:'reason',hozAlign:"left",width:150},
  { title:"Scrap Flats", field:'scrap_flats',hozAlign:"right",width:150 },
  { title:"Total Flats",  field:'total_flats',hozAlign:"right",width:120 },
  { title:"Scrap %", field:'scrap_pct',hozAlign:"right",width:150, formatter:function(cell, formatterParams, onRendered){
    //cell - the cell component
    //formatterParams - parameters set for the column
    //onRendered - function to call when the formatter has been rendered
    
    return cell.getValue() + "%"; //return the contents of the cell;
  },
  },
];

dataTable6 = [
  {
    reason: 'Grading',
    scrap_flats: 58,
    total_flats: 500,
    scrap_pct: 11.6
  },
  {
    reason: 'Grading',
    scrap_flats: 58,
    total_flats: 500,
    scrap_pct: 11.6
  },
]