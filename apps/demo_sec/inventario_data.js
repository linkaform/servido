// Datos demo para Reporte ENcuestas MOntaje

//-- Tabla 1 
var columsTable1 = [
  { title:"ALMACEN", field:'almacen',hozAlign:"left", responsive:0, width:300},
  { title:"NOMRE DEL EQUIPO",  field:'nombre',hozAlign:"center", responsive:2, width:500 },
  { title:"SKU",  field:'sku',hozAlign:"center", responsive:2, width:250 },
  { title:"MODELO",  field:'modelo',hozAlign:"center", responsive:2, width:300 },
  { title:"MARCA", field:"marca", hozAlign:"center", responsive:2, width:400},
  { title:"TOTAL SALIDAS", field:"out", hozAlign:"center", responsive:2, width:200},
  { title:"TOTAL ENTRADAS", field:"int", hozAlign:"center", responsive:2, width:200},
  { title:"EXISTENCIAS", field:"qty", hozAlign:"center", responsive:2, width:200},
];


var dataTable1 = [
  {
    almacen:"Almacen 1",
    _children:[
      {
        nombre:"Nombre Example",
        sku: "000001",
        modelo:"Modelo",
        marca:"Marca Example",
        out:"1000",
        int:"1000",
        qty:"100",
      },
      {
        nombre:"Nombre Example",
        sku: "000001",
        modelo:"Modelo",
        marca:"Marca Example",
        out:"1000",
        int:"1000",
        qty:"100",
      },
    ]
  },
  {
    almacen:"Almacen 2",
    _children:[
      {
        nombre:"Nombre Example",
        sku: "000001",
        modelo:"Modelo",
        marca:"Marca Example",
        out:"1000",
        int:"1000",
        qty:"100",
      },
      {
        nombre:"Nombre Example",
        sku: "000001",
        modelo:"Modelo",
        marca:"Marca Example",
        out:"1000",
        int:"1000",
        qty:"100",
      },
    ]
  }, 
];

