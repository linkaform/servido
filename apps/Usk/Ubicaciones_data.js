//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Detalle de Ubicaciones'},
        ] 
    },
];

//----Config Table
let columsTable1Prod = [
    { title:"Orden", field:'Orden',headerTooltip: true,hozAlign:"center", responsive: 1, width:100},
    { title:"Estatus",field:'Estatus',headerTooltip: true,hozAlign:"left",headerFilter:true, responsive: 2, width:150},
    { title:"Ubicacion",field:'Ubicacion',headerTooltip: true,hozAlign:"left",headerFilter:true, responsive: 2, width:250},
    { title:"Proceso",field:'Proceso',hozAlign:"left",headerTooltip: true,responsive: 2, width:150},
    { title:"Nombre Proceso",field:'NombreProceso',headerTooltip: true,hozAlign:"left",headerFilter:true, responsive: 2, width:350},
    { title:"Fecha",field:'Fecha',headerTooltip: true,hozAlign:"left",headerFilter:true, responsive: 2, width:200},
    { title:"Articulo",field:'Articulo',headerTooltip: true,hozAlign:"left",headerFilter:true, responsive: 2, width:200},
    { title:"Cantidad",field:'Cantidad',headerTooltip: true,hozAlign:"left", responsive: 2, width:200},
];

const dataTable1 =  [
  { Estatus: "Ocupado", Ubicacion: "NAV-A-01-1000-01", Orden: "83728", Proceso: "8", NombreProceso: "Barrenado", Fecha: "2025-05-05T00:00:00", Articulo: "ES6A_4140H", Cantidad: 900.0 },
  { Estatus: "Ocupado", Ubicacion: "NAV-A-01-1000-02", Orden: "83729", Proceso: "9", NombreProceso: "Roscado", Fecha: "2025-05-06T00:00:00", Articulo: "ES6A_4140H", Cantidad: 850.0 },
  { Estatus: "Libre", Ubicacion: "NAV-A-01-1000-03", Orden: "83730", Proceso: "10", NombreProceso: "Corte", Fecha: "2025-05-07T00:00:00", Articulo: "ES6A_1020", Cantidad: 700.0 },
  { Estatus: "Ocupado", Ubicacion: "NAV-A-01-1000-04", Orden: "83731", Proceso: "11", NombreProceso: "Soldadura", Fecha: "2025-05-08T00:00:00", Articulo: "ES6A_1020", Cantidad: 920.0 },
  { Estatus: "Mantenimiento", Ubicacion: "NAV-A-01-1000-05", Orden: "83732", Proceso: "12", NombreProceso: "Pulido", Fecha: "2025-05-09T00:00:00", Articulo: "ES6A_4140H", Cantidad: 600.0 },
  { Estatus: "Ocupado", Ubicacion: "NAV-A-01-1000-06", Orden: "83733", Proceso: "13", NombreProceso: "Inspección", Fecha: "2025-05-10T00:00:00", Articulo: "ES6A_1020", Cantidad: 750.0 },
  { Estatus: "Libre", Ubicacion: "NAV-A-01-1000-07", Orden: "83734", Proceso: "14", NombreProceso: "Pintura", Fecha: "2025-05-11T00:00:00", Articulo: "ES6A_4140H", Cantidad: 800.0 },
  { Estatus: "Ocupado", Ubicacion: "NAV-A-01-1000-08", Orden: "83735", Proceso: "15", NombreProceso: "Ensamble", Fecha: "2025-05-12T00:00:00", Articulo: "ES6A_1020", Cantidad: 980.0 },
  { Estatus: "Mantenimiento", Ubicacion: "NAV-A-01-1000-09", Orden: "83736", Proceso: "16", NombreProceso: "Empaque", Fecha: "2025-05-13T00:00:00", Articulo: "ES6A_4140H", Cantidad: 620.0 },
  { Estatus: "Ocupado", Ubicacion: "NAV-A-01-1000-10", Orden: "83737", Proceso: "17", NombreProceso: "Etiquetado", Fecha: "2025-05-14T00:00:00", Articulo: "ES6A_1020", Cantidad: 670.0 }
];


let configTableCustom1 = {
    height: "400px",
    layout: "fitDataFill",
    theme: "bootstrap5", 
    columnMinWidth: 100,
    autoColumns: false, 
    responsiveLayout: "collapse", 
    scrollX: true,
};