
let columsTable1 = [
  { title:"Sku", field:'sku',hozAlign:"left",width:150},
  { title:"Familia", field:'familia',hozAlign:"left",width:150},
  { title:"Stock CEDIS", field:'stock_cedis',hozAlign:"left",width:150},
  {
    title:'Traspaso',
    columns:[
      { title:"Mty", field:'stock_mty',hozAlign:"left",formatter:"money", formatterParams:{thousand:","},width:150},
      { title:"Gdl", field:'stock_gdl',hozAlign:"left",formatter:"money", formatterParams:{thousand:","},width:150},
      { title:"Merida", field:'stock_merida',hozAlign:"left",formatter:"money", formatterParams:{thousand:","},width:150},
    ]
  },
  { title:"Stock Final", field:'stock_final',hozAlign:"left",formatter:"money", formatterParams:{thousand:","},width:150},
];



const dataTable1 = [
  {
    sku: "L00L0OCT",
    familia: "Juguetes",
    stock_cedis: 340,
    stock_mty: 170,
    stock_gdl: 80,
    stock_merida: 40,
    stock_final: -50
  },
  {
    sku: "WZ1718WQ",
    familia: "Ropa",
    stock_cedis: 41,
    stock_mty: 3,
    stock_gdl: 35,
    stock_merida: 5,
    stock_final: -3
  },
  {
    sku: "M6QJ2L1Z",
    familia: "Hogar",
    stock_cedis: 500,
    stock_mty: 40,
    stock_gdl: 22,
    stock_merida: 14,
    stock_final: 424
  },
  {
    sku: "UFY7HNU2",
    familia: "Juguetes",
    stock_cedis: 66,
    stock_mty: 20,
    stock_gdl: 32,
    stock_merida: 28,
    stock_final: -14
  },
  {
    sku: "ZGJB3Z5I",
    familia: "Deportes",
    stock_cedis: 84,
    stock_mty: 2,
    stock_gdl: 17,
    stock_merida: 44,
    stock_final: 21,
  }
];
