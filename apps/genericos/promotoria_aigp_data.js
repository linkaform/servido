// Datos demo para Reporte ENcuestas MOntaje
//------Variable
var printIcon = function(cell, formatterParams){ //plain text value
    return "<i class='fa fa-print'></i>";
};

//--Table Total

var columsTable = [
  /*{title:"Usuario", field:"usuario", width:200, headerWordWrap:true},*/
  { title:"Usuario", field:'usuario', hozAlign:"left", formatter:"link", formatterParams:{
    url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
    target:"_blank",}, width:150, headerWordWrap:true},
  {title:"Ciudad", field:"ciudad",  width:250, headerWordWrap:true},
  {title:"Cadena", field:"cadena", hozAlign:"left", width:250, headerWordWrap:true},
  {title:"Tienda", field:"tienda",width:250, headerWordWrap:true},
  {title:"Fecha inicio", field:"fecha_inicio", width:150, headerWordWrap:true },
  {title:"Hora inicio de jornada", field:"hora_inicio", width:120, headerWordWrap:true },
  {title:"Fecha final", field:"fecha_final", width:100, headerWordWrap:true },
  {title:"Hora final de jornada", field:"hora_final", hozAlign:"right", width:100, headerWordWrap:true },
  {title:"Duración visita", field:"duracion_visita", hozAlign:"right", width:100, headerWordWrap:true },
  {title:"Total horas x día", field:"total_hrs_dia", hozAlign:"right", width:200, headerWordWrap:true},
  /*{title:"Evidencia", field:"evidencia", hozAlign:"right", width:100, headerWordWrap:true},*/
  { title:"Evidencia", field:"record_id", hozAlign:"right", width:100, headerWordWrap:true, formatter:printIcon, width:100, hozAlign:"center",
    cellClick:function(e, cell){
      getDownloadPdf(cell.getRow().getData().record_id)
    }}
  ]

var columsTableTwo = [
  {title:"Usuario", field:"usuario", width:180, headerWordWrap:true},
  {title:"Fecha", field:"fecha_registro", width:120, headerWordWrap:true},
  { title:"Folio", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
    url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
    target:"_blank",}, width:120, headerWordWrap:true},
  {title:"Ciudad", field:"ciudad",  width:250, headerWordWrap:true},
  {title:"Cadena", field:"cadena", hozAlign:"left", width:250, headerWordWrap:true},
  {title:"Tienda", field:"tienda",width:250, headerWordWrap:true},
  {title:"Fecha inicio", field:"fecha_inicio", width:150, headerWordWrap:true },
  {title:"Hora inicio de jornada", field:"hora_inicio", width:120, headerWordWrap:true },
  {title:"Fecha final", field:"fecha_final", width:100, headerWordWrap:true },
  {title:"Hora final de jornada", field:"hora_final", hozAlign:"right", width:100, headerWordWrap:true },
  {title:"Duración visita", field:"duracion_visita", hozAlign:"right", width:100, headerWordWrap:true },
  {title:"Total horas x día", field:"total_hrs_dia", hozAlign:"right", width:130, headerWordWrap:true},
  /*{title:"Evidencia", field:"evidencia", hozAlign:"right", width:100, headerWordWrap:true},*/
  { title:"Evidencia", field:"record_id", hozAlign:"right", width:90, headerWordWrap:true, formatter:printIcon, width:100, hozAlign:"center",
    cellClick:function(e, cell){
      getDownloadPdf(cell.getRow().getData().record_id)
    }}
  ]

var columsTableThree = [
   {title:"-", field:"folio",  width:200},
   {title:"-", field:"ciudad",  width:250},
   {title:"-", field:"cadena",  width:250},
   {title:"-", field:"tienda",  width:250},
   {title:"-", field:"fecha_inicio",  width:150},
   {title:"-", field:"hora_inicio",  width:120},
   {title:"-", field:"fecha_final",  width:100},
   {title:"-", field:"hora_final",  width:100},
   {title:"-", field:"duracion_visita",  width:100},
   {title:"-", field:"total_movimiento",  width:200},
   { formatter:printIcon, width:40, hozAlign:"center",
    cellClick:function(e, cell){
      getDownloadPdf(cell.getRow().getData().evidencia)
    }},
   ]

var dataTableC = [
    {
    "usuario": "Mauricio Hernández",
    "ciudad": "Días laborados",
    "cadena": "2",
    "_children": [
      {

          "fecha_registro": "2024/01/03",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-03",
          "hora_inicio": "Trabajado 4:56:12",
          "fecha_final": "8:00:11",
          "hora_final": "Total Vistias",
          "duracion_visita": "4:56:12",
          "total_hrs_dia": "2 en traslados",
          "record_id": "",
          "_children": [
            {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "10:00:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "10:30:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "13:30:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "14:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "17:00:'00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "17:30:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "20:00:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
              }
            ]
      },
      {
          "fecha_registro": "2024/01/04",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-04",
          "hora_inicio": "Trabajado 2:27:36",
          "fecha_final": "8:00:11 ",
          "hora_final": "Total Vistias",
          "duracion_visita": "2:27:36",
          "total_hrs_dia": ".5 en traslados",
          "record_id": "",
          "_children": [
            {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "10:00:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "10:30:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "13:30:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
            ]
      }
    ]

    },
    {
    "usuario": "Armando Contreras",
    "ciudad": "Días laborados",
    "cadena": "2",
    "_children": [
      {
          "fecha_registro": "2024/01/05",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-05",
          "hora_inicio": "Trabajado 3:41:24",
          "fecha_final": "8:00:11",
          "hora_final": "Total Vistias",
          "duracion_visita": "3:41:24",
          "total_hrs_dia": "1 en traslados",
          "record_id": "",
          "_children": [
            {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "10:00:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "10:30:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "13:30:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "14:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "17:00:'00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
              },
            ]
      },
      {
          "fecha_registro": "2024/01/06",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-06",
          "hora_inicio": "Trabajado 2:27:36",
          "fecha_final": "8:00:11",
          "hora_final": "Total Vistias",
          "duracion_visita": "2:27:36",
          "total_hrs_dia": ".5 en traslados",
          "record_id": "",
          "_children": [
            {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "10:00:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "10:30:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "13:30:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              
            ]
      },
      {
          "fecha_registro": "2024/01/07",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-07",
          "hora_inicio": "Trabajado 4:56:12",
          "fecha_final": "8:00:11",
          "hora_inicio": "Total Vistias",
          "duracion_visita": "4:56:12",
          "total_hrs_dia": "1.5 en traslados",
          "record_id": "",
          "_children": [
            {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "10:00:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "10:30:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "13:30:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "14:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "17:00:'00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "17:30:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "20:00:'00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
              },
            ]

      }
    ]
  }
  ]


var dataTableB = [
    {
    "usuario": "Mauricio Hernández",
    "ciudad": "Días laborados",
    "cadena": "2",
    "_children": [
      {
          "usuario": "2024/01/03",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-03",
          "hora_inicio": "Trabajado 4:56:12",
          "fecha_final": "8:00:11",
          "hora_final": "Total Vistias",
          "duracion_visita": "4:56:12",
          "total_hrs_dia": "2 en traslados",
          "record_id": "",
          "_children": [
            {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "10:00:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "10:30:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "13:30:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "14:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "17:00:'00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "17:30:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "20:00:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
              }
            ]
      },
      {
          "usuario": "2024/01/04",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-04",
          "hora_inicio": "Trabajado 2:27:36",
          "fecha_final": "8:00:11 ",
          "hora_final": "Total Vistias",
          "duracion_visita": "2:27:36",
          "total_hrs_dia": ".5 en traslados",
          "record_id": "",
          "_children": [
            {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "10:00:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "10:30:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "13:30:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
            ]
      }
    ]

    },
    {
    "usuario": "Armando Contreras",
    "ciudad": "Días laborados",
    "cadena": "2",
    "_children": [
      {
          "usuario": "2024/01/05",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-05",
          "hora_inicio": "Trabajado 3:41:24",
          "fecha_final": "8:00:11",
          "hora_final": "Total Vistias",
          "duracion_visita": "3:41:24",
          "total_hrs_dia": "1 en traslados",
          "record_id": "",
          "_children": [
            {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "10:00:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "10:30:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "13:30:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "14:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "17:00:'00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
              },
            ]
      },
      {
          "usuario": "2024/01/06",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-06",
          "hora_inicio": "Trabajado 2:27:36",
          "fecha_final": "8:00:11",
          "hora_final": "Total Vistias",
          "duracion_visita": "2:27:36",
          "total_hrs_dia": ".5 en traslados",
          "record_id": "",
          "_children": [
            {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "10:00:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "10:30:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "13:30:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              
            ]
      },
      {
          "usuario": "2024/01/07",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-07",
          "hora_inicio": "Trabajado 4:56:12",
          "fecha_final": "8:00:11",
          "hora_inicio": "Total Vistias",
          "duracion_visita": "4:56:12",
          "total_hrs_dia": "1.5 en traslados",
          "record_id": "",
          "_children": [
            {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "10:00:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "10:30:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "13:30:00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "14:00:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "17:00:'00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "17:30:00",
                  "fecha_final": "2024-01-03",
                  "hora_final": "20:00:'00",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
              },
            ]

      }
    ]
  }
  ]

var dataTable = [
  {
    "usuario": "Mauricio Hernández",
    "ciudad": "Días laborados",
    "cadena": "2",
    "serviceHistory": [
      {
          "fecha": "2024/01/03",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-03",
          "actividad_inicial": "Trabajado ",
          "hora_final": "8:00:11",
          "actividad_final": "Total Vistias",
          "duracion_visita": "4:56:12",
          "total_movimiento": "Total Traslados",
          "evidencia": "Evidencia",
          "serviceHistoryTwo": [
            {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
              }
            ]
      },
      {
          "fecha": "2024/01/04",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-04",
          "actividad_inicial": "Trabajado ",
          "hora_final": "8:00:11",
          "actividad_final": "Total Vistias",
          "duracion_visita": "2:27:36",
          "total_movimiento": "Total Traslados",
          "evidencia": "Evidencia",
          "serviceHistoryTwo": [
            {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
                  
              }
            ]
      }
    ]
  },
  {
    "usuario": "Armando Contreras",
    "ciudad": "Días bien laborados",
    "cadena": "2",
    "serviceHistory": [
      {
          "fecha": "2024/01/05",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-05",
          "actividad_inicial": "Trabajado",
          "hora_final": "8:00:11",
          "actividad_final": "Total Vistias",
          "duracion_visita": "3:41:24",
          "total_movimiento": "Total Traslados",
          "evidencia": "Evidencia",
          "serviceHistoryTwo": [
            {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
              }
            ]
      },
      {
          "fecha": "2024/01/06",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-06",
          "actividad_inicial": "Trabajado",
          "hora_final": "8:00:11",
          "actividad_final": "Total Vistias",
          "duracion_visita": "2:27:36",
          "total_movimiento": "Total Traslados",
          "evidencia": "Evidencia",
          "serviceHistoryTwo": [
            {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
                  
              }
            ]
      },
      {
          "fecha": "2024/01/07",
          "ciudad": "",
          "cadena": "",
          "tienda": "",
          "fecha_inicio": "Dia 2024-01-07",
          "actividad_inicial": "Trabajado",
          "hora_final": "8:00:11",
          "actividad_final": "Total Vistias",
          "duracion_visita": "4:56:12",
          "total_movimiento": "Total Traslados",
          "evidencia": "Evidencia",
          "serviceHistoryTwo": [
            {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
              },
              {
                  "folio": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:37:32",
                  "fecha_final": "2024-01-03",
                  "hora_final": "8:51:20",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "evidencia": "6540549cbf322f36d29e67eb",
              }
            ]

      }
    ]
  }
]

//Data pora el gráfico de barras
var dataFirstElement = {
  labels: ["Mauricio Hernández","Armando Contreras"],
  datasets: [
    {
      label: "Servicios",
      backgroundColor: ["#7BD3EA", "#ECA869",],
      data: [6,9],
    }
  ]
}; 


//Estructura de las columnas del archivo xlsx y csv
let structureColumns = [
      {header:'Usuario', key:"usuario"},
      {header:'Ciudad', key:'ciudad'},
      {header:'Cadena', key:'cadena'},
      {header:'Tienda', key:'tienda'},
      {header:'Fecha inicio', key:'fecha_inicio'},
      {header:'Hora Inicio', key:'hora_inicio'},
      {header:'Fecha final', key:'fecha_final'},
      {header:'Hora final', key:'hora_final'},
      {header:'Duración visita', key:'duracion_visita'},
      {header:'Total horas x día', key:'total_hrs_dia'},
      {header:'Evidencia', key:'evidencia'},
    ]