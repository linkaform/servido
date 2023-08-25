//-----TABLAS
var columsTable1 = [
  { title:"FOLIO", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
  target:"_blank",},headerFilter:"input", width:150},
  { title:"PROMOTOR/A", field:'promotor', hozAlign:"left", headerTooltip:true,headerFilter:true,width:350},
  { title:"DETERMINANTE", field:'determinante', hozAlign:"right", headerTooltip:true,headerFilter:true,width:160},
  { title:"DIRECCIÓN", field:'dir', hozAlign:"right", headerTooltip:true,headerFilter:true,width:190},
  { title:"TIENDA", field:'tienda', hozAlign:"left", headerTooltip:true,headerFilter:true,width:350},
  { title:"FECHA ENTRADA", field:'fecha_entrada', hozAlign:"left", headerTooltip:true,width:160},
  { title:"HORA ENTRADA", field:'hora_entrada', hozAlign:"left", headerTooltip:true,width:160},
  { title:"FECHA SALIDA", field:'fecha_salida', hozAlign:"left", headerTooltip:true,width:160},
  { title:"HORA SALIDA", field:'hora_salida', hozAlign:"left", headerTooltip:true,width:160},
  { title:"TIEMPO EN TIENDA", field:'tiempo', hozAlign:"left", headerTooltip:true,width:160},
  { title:"HORAS TRABAJADAS", field:'horas_totales', hozAlign:"right", headerTooltip:true, bottomCalc:"sum", bottomCalcParams:{precision:2},width:160},
];

var dataTable1 = [
  {
    "promotor":"Alfredo López",
    "determinante":"23",
    "tienda":"SC - WALMART 2468 SC VILLAHERMOSA II",
    "fecha_entrada":"6/1/2023",
    "hora_entrada":"8:14:06",
    "fecha_salida":"6/1/2023",
    "hora_salida":"11:02:25",
    "tiempo":"2:48:19",
    "horas_totales":"11:11:38",
  },
  {
    "promotor":"Alfredo López",
    "determinante":"23",
    "tienda":"SC - WALMART 2468 SC VILLAHERMOSA II",
    "fecha_entrada":"6/1/2023",
    "hora_entrada":"8:14:06",
    "fecha_salida":"6/1/2023",
    "hora_salida":"11:02:25",
    "tiempo":"2:48:19",
    "horas_totales":"11:11:38",
  },
  {
    "promotor":"Alfredo López",
    "determinante":"23",
    "tienda":"SC - WALMART 2468 SC VILLAHERMOSA II",
    "fecha_entrada":"6/1/2023",
    "hora_entrada":"8:14:06",
    "fecha_salida":"6/1/2023",
    "hora_salida":"11:02:25",
    "tiempo":"2:48:19",
    "horas_totales":"11:11:38",
  },
  {
    "promotor":"Alfredo López",
    "determinante":"23",
    "tienda":"SC - WALMART 2468 SC VILLAHERMOSA II",
    "fecha_entrada":"6/1/2023",
    "hora_entrada":"8:14:06",
    "fecha_salida":"6/1/2023",
    "hora_salida":"11:02:25",
    "tiempo":"2:48:19",
    "horas_totales":"11:11:38",
  },
  {
    "promotor":"Alfredo López",
    "determinante":"23",
    "tienda":"SC - WALMART 2468 SC VILLAHERMOSA II",
    "fecha_entrada":"6/1/2023",
    "hora_entrada":"8:14:06",
    "fecha_salida":"6/1/2023",
    "hora_salida":"11:02:25",
    "tiempo":"2:48:19",
    "horas_totales":"11:11:38",
  },
  {
    "promotor":"Alfredo López",
    "determinante":"23",
    "tienda":"SC - WALMART 2468 SC VILLAHERMOSA II",
    "fecha_entrada":"6/1/2023",
    "hora_entrada":"8:14:06",
    "fecha_salida":"6/1/2023",
    "hora_salida":"11:02:25",
    "tiempo":"2:48:19",
    "horas_totales":"11:11:38",
  },
  {
    "promotor":"Alfredo López",
    "determinante":"23",
    "tienda":"SC - WALMART 2468 SC VILLAHERMOSA II",
    "fecha_entrada":"6/1/2023",
    "hora_entrada":"8:14:06",
    "fecha_salida":"6/1/2023",
    "hora_salida":"11:02:25",
    "tiempo":"2:48:19",
    "horas_totales":"11:11:38",
  },
  {
    "tiempo":"TOTALES:",
    "horas_totales":"50:02:10",
  },


]



var columsTable2 = [
  { title:"PROMOTOR/A", field:'promotor', hozAlign:"left", headerTooltip:true,headerFilter:true,width:350},
  { title:"FECHA ENTRADA", field:'fecha_entrada', hozAlign:"left", headerTooltip:true,width:160},
  { title:"HORA ENTRADA", field:'hora_entrada', hozAlign:"left", headerTooltip:true,width:160},
  { title:"FECHA SALIDA", field:'fecha_salida', hozAlign:"left", headerTooltip:true,width:160},
  { title:"HORA SALIDA", field:'hora_salida', hozAlign:"left", headerTooltip:true,width:160},
  { title:"TIEMPO DE TRABAJO", field:'tiempo_trabajo', hozAlign:"center", headerTooltip:true,width:200},
  { title:"HORAS TRABAJADAS", field:'horas_totales', hozAlign:"right", headerTooltip:true, bottomCalc:"sum", bottomCalcParams:{precision:2},width:160},
];

var dataTable2 = [
  {
    "promotor":"Alfredo López",
    "fecha_entrada":"6/1/2023",
    "hora_entrada":"8:14:06",
    "fecha_salida":"6/1/2023",
    "hora_salida":"11:02:25",
    "horas_totales":"11:11:38",
  }, 
]