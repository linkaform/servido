var array_background = getPAlleteColors(4,8);

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"From", field:'from',hozAlign:"left",width:280, headerFilter:"input"},
  { title:"Harvest Year", field:'havest_year',hozAlign:"left",width:190, headerFilter:"input"},
  { title:"Harvest Month", field:'havest_month',hozAlign:"left",width:190, headerFilter:"input"},
  { title:"Harvest Week", field:'havest_week',hozAlign:"left",width:190, headerFilter:"input"},
  { title:"Plant Code", field:'plant_code',hozAlign:"left",width:190, headerFilter:"input"},
  { title:"Plant Name", field:'plant_name',hozAlign:"left",width:250, headerFilter:"input"},
  { title:"Total Harvest", field:'total_harvest',hozAlign:"right", formatter:"money", formatterParams: {decimal: ".", thousand: ",", precision: 2 }, width:190, headerFilter:"input"},
];


var dataTable1 = [
  {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 
    "havest_week": 24, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60,
    "total_harvest": ""
  }, 
    {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 

    "havest_week": 27, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60
  },
    {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 

    "havest_week": 22, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60
  },
    {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 

    "havest_week": 22, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60
  },
    {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 

    "havest_week": 22, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60
  },
    {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 

    "havest_week": 22, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60
  },
    {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 

    "havest_week": 22, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60
  },
    {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 

    "havest_week": 22, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60
  },
    {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 

    "havest_week": 22, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60
  },
    {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 

    "havest_week": 22, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60
  },
    {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 

    "havest_week": 22, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60
  },
    {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 

    "havest_week": 22, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60
  },
    {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 

    "havest_week": 22, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60
  },
    {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 

    "havest_week": 22, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60
  },
    {
    "plant_code": "LNAGS", 
    "cut_year": 2023, 
    "cut_week": 2, 
    "total": 2400, 
    "plant_name": null, 
    "total_planting": 2280.0, 

    "havest_week": 22, 
    "havest_month": 6, 
    "havest_year": 2023, 
    "total_harvest": 1869.60
  },
];
