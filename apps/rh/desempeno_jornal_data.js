// Datos demo para Reporte Desempeno Jornales

//--Table Header
var columsTable1 = [
  { title:"Fecha", field:'fecha',hozAlign:"center",width:200},
  { title:"Tipo Empleado", field:'tipo_empleado', hozAlign:"left", width:300},
  { title:"Empleado" , field:'nombre_empleado', hozAlign:"center", width:260, },
  { title:"Jornal Diario", field:'jornal_diario', hozAlign:"right",width:250,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 2}},
  { title:"Codigo Empleado", field:'codigo_empleado', hozAlign:"center",width:200},
  { title:"Sueldo", field:'sueldo_empleado',hozAlign:"right",width:200 ,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 0} },
  { title:"Total Destajo", field:'total_dia',hozAlign:"right",width:200 ,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 2} },
  { title:"Descuentos", field:'total_descuento',hozAlign:"right",width:200 ,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 2} },
];

//--Table Production
var columsTable2 = [
  { title:"Producción", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
    url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
    target:"_blank",},width:120},
  { title:"Descripción Producto", field:'descripcion_producto', hozAlign:"left",width:310},
  { title:"Producto" , field:'tipo_producto', hozAlign:"center", width:160, },
  { title:"Tarea", field:'tipo_tarea', hozAlign:"center",width:160},
  { title:"Mesa", field:'mesa', hozAlign:"center",width:160},
  { title:"Precio de Tarea", field:'precio_tarea',hozAlign:"right",width:160, formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 2}  },
  { title:"Unidades x Caja", field:'unidades_caja',hozAlign:"center",width:160},
  { title:"Cantidad en Mesa", field:'people_qty',hozAlign:"center",width:160},
  { title:"Cajas Hora", field:'cajas_hora',hozAlign:"center",width:160},
  { title:"Destajo", field:'destajo',hozAlign:"right",width:160 , formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,}},
];

//--Table Incidents
var columsTable3 = [
  { title:"Folio Incidencias", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
    url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
    target:"_blank",}, width:250},
  { title:"Tipo" , field:'tipo', hozAlign:"center", width:250, },
  { title:"Día desde ", field:'dia_desde', hozAlign:"center",width:170},
  { title:"Salida", field:'salida', hozAlign:"center",width:170},
  { title:"Día hasta ", field:'dia_hasta', hozAlign:"center",width:170},
  { title:"Regreso ", field:'regreso', hozAlign:"center",width:170},
  { title:"Horas", field:'horas',hozAlign:"center",width:170},
  { title:"Días", field:'dias',hozAlign:"center",width:170},
  { title:"Descuentos", field:'descuento',hozAlign:"right",width:170, formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,} },
];


//--Table Horas
var columsTable4 = [
  { title:"Folio Horas", field:'folio_horas', hozAlign:"left", width:250},
  { title:"Hora Inicio" , field:'hora_inicio', hozAlign:"center", width:250, },
  { title:"Hora Final", field:'hora_final', hozAlign:"center",width:170},
  { title:"Horas", field:'horas', hozAlign:"center",width:170},
  { title:"Compensación", field:'compensacion', hozAlign:"right",width:170,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,}},
  { title:"Comentario", field:'comentario', hozAlign:"center",width:170},
];

//--Table Totales Por Emp
var columsTable5 = [
  { title:"Total Hora Jornal", field:'total_jornal', hozAlign:"center", width:250, formatter: "money",
    formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,}},
  { title:"Total Hora Descuento", field:'total_descuento', hozAlign:"center", width:250,formatter: "money",
    formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,}},
  { title:"Total Horas Trabajadas" , field:'total_trabajado', hozAlign:"center", width:250, formatter: "money",
    formatterParams: {symbol: "", symbolAfter: "", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,}},
  { title:"Sueldo Por Hora", field:'total_sueldo', hozAlign:"right", width:250,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,}},
  { title:"Total Hora", field:'total_hora', hozAlign:"right",width:170,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 3},bottomCalc:"sum", bottomCalcParams:{
    precision:2,}},
];

//--Table TOtal
var columsTable7 = [
  { title:"Total Jornales", field:'total_jornales', hozAlign:"left", width:170,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 2}},
  { title:"Total Destajo", field:'total_destajo', hozAlign:"center",width:170,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 2}},
  { title:"Total Complemento" , field:'total_complemento', hozAlign:"center", width:190,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 2} },
  { title:"Total Compensaciones", field:'total_compensaciones', hozAlign:"center",width:190,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 2}},
  { title:"Total Salario", field:'total_salario', hozAlign:"center",width:170,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 2}},
];

var columsTable6 = [
  { title:"Licencia Sindical", field:'sindical', hozAlign:"left", width:200,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 0}},
  { title:"Día Hijo", field:'hijo', hozAlign:"center",width:180,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 0}},
  { title:"Día Pap" , field:'pap', hozAlign:"center", width:182,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 0} },
  { title:"Día Donación Sangre", field:'donacion', hozAlign:"center",width:210,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 0}},
  { title:"Licencia Estudio", field:'estudio', hozAlign:"center",width:200,formatter: "money",
    formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 0}},
  { title:"Día Judicial", field:'judicial', hozAlign:"center",width:190,formatter: "money",
  formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 0}},
  { title:"Feriado", field:'feriado', hozAlign:"center",width:190,formatter: "money",
  formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 0}},
  { title:"Día por Fallecimiento", field:'fallecimiento', hozAlign:"center",width:230,formatter: "money",
  formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 0}},
  { title:"Horas Vacuna Covid", field:'covid', hozAlign:"center",width:200,formatter: "money",
  formatterParams: {symbol: "$", symbolAfter: "", decimal: ".", thousand: ",", precision: 0}},
];

var dataTableTest = [
  {
    tipo_empleado: "Destajista/Jornaelera",
    nombre_empleado: "TALIA VANESA LEMOS ROSSANO",
    jornal_diario: "1502",
    codigo_empleado: "582",
    sueldo_empleado: 819,
    complemento: 3668.61,
    total_dia: 683,
    fecha: "2022-01-04",
    arrayProduction:[
      {
        folio : '14-9814',
        descripcion_producto: "DOVE JAB REGULAR 24X2X135GR PRM 10% DESC",
        tipo_producto: "Promo",
        tipo_tarea: "T1",
        mesa: "H2",
        cantidad_mesa: 4,
        precio_tarea: 0.516,
        unidades_caja: 30,
        people_qty :0,
        cajas_hora: 255,
        destajo: 986.85,
        folio_url : '61e1ff52230e6cdfd0d9ae96',
      },
      {
        folio : '14-9814',
        descripcion_producto: "DOVE JAB REGULAR 24X2X135GR PRM 10% DESC",
        tipo_producto: "Promo",
        tipo_tarea: "T1",
        mesa: "H2",
        cantidad_mesa:4,
        precio_tarea: 1,
        unidades_caja: 30,
        people_qty :0,
        cajas_hora: 256,
        destajo: 1920,
        folio_url : '61e1ff52230e6cdfd0d9ae96',
      },
      {
        folio : '14-9814',
        descripcion_producto: "DOVE JAB REGULAR 24X2X135GR PRM 10% DESC",
        tipo_producto: "Promo",
        tipo_tarea: "T1",
        mesa: "H2",
        cantidad_mesa: 4,
        precio_tarea: 2.645,
        unidades_caja: 12,
        people_qty :0,
        cajas_hora: 96,
        destajo: 761.76,
        folio_url : '61e1ff52230e6cdfd0d9ae96',
      },
    ],
    arrayIncidencias:[
      {
        folio: "188-9814",
        tipo: "Licencia Sindical",
        dia_desde: 0,
        salida: "11:00:00",
        dia_hasta: 0,
        regreso: "15:00:00",
        horas: 4,
        descuento: 682.7272727272726,
        dias:0
      },
    ],
    arrayHoras:[
      {
        folio_horas: "200-9814",
        hora_inicio: "09:00:00",
        hora_final: "10:00:00",
        horas: 1,
        compensacion: 170.68,
        comentario: "N/A"
      },
    ],
    arrayHorasTotales:[
      {
        total_jornal: 8.8,
        total_descuento: 4,
        total_trabajado: 4.8,
        total_sueldo: 170.6818,
        total_hora: 819.27,
      },
    ]
  },
  {
    tipo_empleado: "Destajista/Jornaelera",
    nombre_empleado: "TALIA VANESA LEMOS ROSSANO",
    jornal_diario: "1502",
    codigo_empleado: "582",
    sueldo_empleado: 1502,
    complemento: 2166.61,
    total_dia: 3668.61,
    fecha: "2022-01-05",
    arrayProduction:[
      {
        folio : '14-9814',
        descripcion_producto: "DOVE JAB REGULAR 24X2X135GR PRM 10% DESC",
        tipo_producto: "Promo",
        tipo_tarea: "T1",
        mesa: "H2",
        cantidad_mesa: 4,
        precio_tarea: 0.516,
        unidades_caja: 30,
        people_qty :0,
        cajas_hora: 255,
        destajo: 986.85,
        folio_url : '61e1ff52230e6cdfd0d9ae96',
      },
      {
        folio : '14-9814',
        descripcion_producto: "DOVE JAB REGULAR 24X2X135GR PRM 10% DESC",
        tipo_producto: "Promo",
        tipo_tarea: "T1",
        mesa: "H2",
        cantidad_mesa:4,
        precio_tarea: 1,
        unidades_caja: 30,
        people_qty :0,
        cajas_hora: 256,
        destajo: 1920,
        folio_url : '61e1ff52230e6cdfd0d9ae96',
      },
      {
        folio : '14-9814',
        descripcion_producto: "DOVE JAB REGULAR 24X2X135GR PRM 10% DESC",
        tipo_producto: "Promo",
        tipo_tarea: "T1",
        mesa: "H2",
        cantidad_mesa: 4,
        precio_tarea: 2.645,
        unidades_caja: 12,
        people_qty :0,
        cajas_hora: 96,
        destajo: 761.76,
        folio_url : '61e1ff52230e6cdfd0d9ae96',
      },
    ],
    arrayIncidencias:[

    ],
    arrayHoras:[
    ]
  },
  {
    tipo_empleado: "Destajista/Jornaelera",
    nombre_empleado: "TALIA VANESA LEMOS ROSSANO",
    jornal_diario: "1502",
    codigo_empleado: "582",
    sueldo_empleado: 1502,
    complemento: 2166.61,
    total_dia: 3668.61,
    fecha: "2022-01-05",
    arrayProduction:[
      {
        folio : '14-9814',
        descripcion_producto: "DOVE JAB REGULAR 24X2X135GR PRM 10% DESC",
        tipo_producto: "Promo",
        tipo_tarea: "T1",
        mesa: "H2",
        cantidad_mesa: 4,
        precio_tarea: 0.516,
        unidades_caja: 30,
        people_qty :0,
        cajas_hora: 255,
        destajo: 986.85,
        folio_url : '61e1ff52230e6cdfd0d9ae96',
      },
      {
        folio : '14-9814',
        descripcion_producto: "DOVE JAB REGULAR 24X2X135GR PRM 10% DESC",
        tipo_producto: "Promo",
        tipo_tarea: "T1",
        mesa: "H2",
        cantidad_mesa:4,
        precio_tarea: 1,
        unidades_caja: 30,
        people_qty :0,
        cajas_hora: 256,
        destajo: 1920,
        folio_url : '61e1ff52230e6cdfd0d9ae96',
      },
      {
        folio : '14-9814',
        descripcion_producto: "DOVE JAB REGULAR 24X2X135GR PRM 10% DESC",
        tipo_producto: "Promo",
        tipo_tarea: "T1",
        mesa: "H2",
        cantidad_mesa: 4,
        precio_tarea: 2.645,
        unidades_caja: 12,
        people_qty :0,
        cajas_hora: 96,
        destajo: 761.76,
        folio_url : '61e1ff52230e6cdfd0d9ae96',
      },
    ],
    arrayIncidencias:[
    ],
    arrayHoras:[
    ],
  },
]

var dataTableTotal = [
  {
    total_jornales: 3823,
    total_destajo: 11005.83,
    total_complemento: 7183,
    total_compensaciones: 171,
    total_salario: 11859,
  },
]

var dataTableLicencias = [
  {
    sindical: 682,
    hijo: 0,
    pap:  0,
    donacion: 0,
    estudio:  0,
    judicial: 0,
    feriado:  0,
    fallecimiento: 0,
    covid: 0,
  },
]
