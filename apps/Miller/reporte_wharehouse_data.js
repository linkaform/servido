
let columsTable1 = [
  { title:"Sku", field:'sku',hozAlign:"left",width:150},
  { title:'Descripción del Producto', field:'desc_producto', hozAlign:"left", width:150},
  { title:'Línea', field:'linea', hozAlign:"left", width:150},
  { title:"Familia", field:'familia',hozAlign:"left",width:150},
  { title:"Stock CEDIS", field:'stock_cedis',hozAlign:"left",width:150},
  {
    title:'Traspaso',
    columns:[
      { title:"Mty", field:'stock_mty', hozAlign:"left", formatter:"money", formatterParams:{thousand:","},width:150},
      { title:"% de stock minimo", field:'p_stock_min_mty', hozAlign:"left", formatter:"money", formatterParams:{thousand:","}, width:150},
      { title:"Gdl", field:'stock_gdl',hozAlign:"left",formatter:"money", formatterParams:{thousand:","},width:150},
      { title:"% de stock minimo", field:'p_stock_min_gdl', hozAlign:"left", formatter:"money", formatterParams:{thousand:","}, width:150},
      { title:"Merida", field:'stock_merida',hozAlign:"left",formatter:"money", formatterParams:{thousand:","},width:150},
      { title:"% de stock minimo", field:'p_stock_min_merida', hozAlign:"left", formatter:"money", formatterParams:{thousand:","}, width:150},
    ]
  },
  { title:"Stock Final", field:'stock_final',hozAlign:"left",formatter:"money", formatterParams:{thousand:","},width:150},
];



let dataTable1 = [
  {
    "sku": "L00L0OCT",
    "desc_producto": "",
    "linea": "",
    "familia": "Juguetes",
    "stock_cedis": 340.0,
    "stock_mty": 170,
    "p_stock_min_mty": "",
    "stock_gdl": 80,
    "p_stock_min_gdl": "",
    "stock_merida": 40,
    "p_stock_min_merida": "",
    "stock_final": -50.0
  },
  {
    "sku": "WZ1718WQ",
    "desc_producto": "",
    "linea": "",
    "familia": "Ropa",
    "stock_cedis": 41.0,
    "stock_mty": 3,
    "p_stock_min_mty": "",
    "stock_gdl": 35,
    "p_stock_min_gdl": "",
    "stock_merida": 5,
    "p_stock_min_merida": "",
    "stock_final": -3.0
  },
  {
    "sku": "M6QJ2L1Z",
    "desc_producto": "",
    "linea": "",
    "familia": "Hogar",
    "stock_cedis": 500.0,
    "stock_mty": 40,
    "p_stock_min_mty": "",
    "stock_gdl": 22,
    "p_stock_min_gdl": "",
    "stock_merida": 14,
    "p_stock_min_merida": "",
    "stock_final": 424.0
  },
  {
    "sku": "UFY7HNU2",
    "desc_producto": "",
    "linea": "",
    "familia": "Juguetes",
    "stock_cedis": 66.0,
    "stock_mty": 20,
    "p_stock_min_mty": "",
    "stock_gdl": 32,
    "p_stock_min_gdl": "",
    "stock_merida": 28,
    "p_stock_min_merida": "",
    "stock_final": -14.0
  },
  {
    "sku": "ZGJB3Z5I",
    "desc_producto": "",
    "linea": "",
    "familia": "Deportes",
    "stock_cedis": 84.0,
    "stock_mty": 2,
    "p_stock_min_mty": "",
    "stock_gdl": 17,
    "p_stock_min_gdl": "",
    "stock_merida": 44,
    "p_stock_min_merida": "",
    "stock_final": 21.0
  }
];
