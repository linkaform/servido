// Datos demo para Reporte ENcuestas MOntaje
//------Variable
var printIcon = function(cell, formatterParams){ //plain text value
    return "<i class='fa fa-print'></i>";
};

//--Table Total

var columsTable = [
  //{title:"Usuario", field:"usuario", width:180, headerWordWrap:true},
  //{title:"Fecha", field:"fecha_registro", width:120, headerWordWrap:true},
  { title:"Usuario", field:'usuario', width:180, headerWordWrap:true},
  { title:"Fecha", field:'fecha', hozAlign:"left", formatter:"link", formatterParams:{
    url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
    target:"_blank",}, width:180, headerWordWrap:true},
  {title:"Ciudad", field:"ciudad",  width:250, headerWordWrap:true},
  {title:"Cadena", field:"cadena", hozAlign:"left", width:250, headerWordWrap:true},
  {title:"Tienda", field:"tienda",width:250, headerWordWrap:true},
  {title:"Fecha inicio", field:"fecha_inicio", hozAlign:"right", width:150, headerWordWrap:true },
  {title:"Hora inicio de jornada", field:"hora_inicio", width:120, headerWordWrap:true },
  {title:"Fecha final", field:"fecha_final", hozAlign:"right", width:100, headerWordWrap:true },
  {title:"Hora final de jornada", field:"hora_final", hozAlign:"right", width:100, headerWordWrap:true },
  {title:"Duración visita", field:"duracion_visita", hozAlign:"right", width:100, headerWordWrap:true },
  {title:"Total horas x día en traslados", field:"total_hrs_dia", hozAlign:"right", width:180, headerWordWrap:true},
  /*{title:"Evidencia", field:"evidencia", hozAlign:"right", width:100, headerWordWrap:true},*/
  { title:"Evidencia", field:"record_id", hozAlign:"right", width:90, headerWordWrap:true, formatter:function(cell){
    return "<i class='fa fa-print'></i>"; 
  }, width:100, hozAlign:"center",
    cellClick:function(e, cell){
      getDownloadPdf(cell.getRow().getData().record_id)
    }}
  ]


var dataTable = [
    {
    "usuario": "Mauricio Hernández",
    "ciudad": "Días laborados",
    "cadena": "2",
    "hora_inicio": "Hrs de jornada:",
    "fecha_final": "19:30:00",
    "hora_final": "Hrs de visitas:",
    "duracion_visita": "16:30:00",
    "total_hrs_dia": "Hrs de traslados: 02:00:00",
    "record_id": "",
    "_children": [
      {

          "usuario": "Día: 2024/01/03",
          "ciudad": "Inicio:",
          "cadena": "07:00:00 am",
          "tienda": "Fin:",
          "fecha_inicio": "08:00:00 pm",
          "hora_inicio": "Hrs de jornada:",
          "fecha_final": "13:00:00",
          "hora_final": "Hrs de visitas:",
          "duracion_visita": "10:30:00",
          "total_hrs_dia": "Hrs traslados: 01:30:00",
          "record_id": "",
          "_children": [
            {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "7:00:00 am",
                  "fecha_final": "2024-01-03",
                  "hora_final": "10:00:00 am",
                  "duracion_visita": "03:00:00",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "10:30:00 am",
                  "fecha_final": "2024-01-03",
                  "hora_final": "01:30:00 pm",
                  "duracion_visita": "03:00:00",
                  "total_hrs_dia": "00:30:00",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "02:00:00 pm",
                  "fecha_final": "2024-01-03",
                  "hora_final": "05:00:00 pm",
                  "duracion_visita": "03:00:00",
                  "total_hrs_dia": "00:30:00",
                  "record_id": "6540549cbf322f36d29e67eb",
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-03",
                  "hora_inicio": "05:30:00 pm",
                  "fecha_final": "2024-01-03",
                  "hora_final": "08:00:00 pm",
                  "duracion_visita": "02:30:00",
                  "total_hrs_dia": "00:30:00",
                  "record_id": "6540549cbf322f36d29e67eb",
              }
            ]
      },
      {
          "usuario": "Día: 2024/01/04",
          "ciudad": "Inicio:",
          "cadena": "07:00:00 am",
          "tienda": "Fin:",
          "fecha_inicio": "01:30:00 pm",
          "hora_inicio": "Hrs de jornada:",
          "fecha_final": "06:30:00",
          "hora_final": "Hrs de visitas:",
          "duracion_visita": "06:00:00",
          "total_hrs_dia": "Hrs traslados: 00:30:00",
          "record_id": "",
          "_children": [
            {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-04",
                  "hora_inicio": "7:00:00 am",
                  "fecha_final": "2024-01-04",
                  "hora_final": "10:00:00 am",
                  "duracion_visita": "03:00:00",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-04",
                  "hora_inicio": "10:30:00 am",
                  "fecha_final": "2024-01-04",
                  "hora_final": "01:30:00 pm",
                  "duracion_visita": "03:00:00",
                  "total_hrs_dia": "00:30:00",
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
    "hora_inicio": "Hrs de jornada:",
    "fecha_final": "19:30:11",
    "hora_final": "Hrs de visitas:",
    "duracion_visita": "26:30:00",
    "total_hrs_dia": "Hrs de traslados: 03:00:00",
    "record_id": "",
    "_children": [
      {
          "usuario": "Día: 2024/01/05",
          "ciudad": "Inicio:",
          "cadena": "07:00:00 am",
          "tienda": "Fin:",
          "fecha_inicio": "05:00:00 pm",
          "hora_inicio": "Hrs de jornada:",
          "fecha_final": "10:00:00",
          "hora_final": "Hrs de visitas:",
          "duracion_visita": "09:00:00",
          "total_hrs_dia": "Hrs traslados: 01:00:00",
          "record_id": "",
          "_children": [
            {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-05",
                  "hora_inicio": "7:00:00 am",
                  "fecha_final": "2024-01-05",
                  "hora_final": "10:00:00 am",
                  "duracion_visita": "03:00:00",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-05",
                  "hora_inicio": "10:30:00 am",
                  "fecha_final": "2024-01-05",
                  "hora_final": "01:30:00 pm",
                  "duracion_visita": "02:00:00",
                  "total_hrs_dia": "00:30:00",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-05",
                  "hora_inicio": "01:00:00 pm",
                  "fecha_final": "2024-01-05",
                  "hora_final": "05:00:00 pm",
                  "duracion_visita": "04:00:00",
                  "total_hrs_dia": "00:30:00",
                  "record_id": "6540549cbf322f36d29e67eb",
              },
            ]
      },
      {
          "usuario": "Día: 2024/01/06",
          "ciudad": "Inicio:",
          "cadena": "07:00:00 am",
          "tienda": "Fin:",
          "fecha_inicio": "01:30:00 pm",
          "hora_inicio": "Hrs de jornada:",
          "fecha_final": "06:30:00",
          "hora_final": "Hrs de visitas:",
          "duracion_visita": "06:00:00",
          "total_hrs_dia": "Hrs traslados: 00:30:00",
          "record_id": "",
          "_children": [
            {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-06",
                  "hora_inicio": "07:00:00 am",
                  "fecha_final": "2024-01-06",
                  "hora_final": "10:00:00 am",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-06",
                  "hora_inicio": "10:30:00 am",
                  "fecha_final": "2024-01-06",
                  "hora_final": "01:30:00 pm",
                  "duracion_visita": "1:13:48",
                  "total_hrs_dia": "00:30:00",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              
            ]
      },
      {
          "usuario": "Día: 2024/01/07",
          "ciudad": "Inicio:",
          "cadena": "07:00:00 am",
          "tienda": "Fin:",
          "fecha_inicio": "08:00:00 pm",
          "hora_inicio": "Hrs de jornada:",
          "fecha_final": "13:00:00",
          "hora_final": "Hrs de visitas:",
          "duracion_visita": "10:30:00",
          "total_hrs_dia": "Hrs traslados: 01:30:00",
          "record_id": "",
          "_children": [
            {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "RIO DE LA LOZA",
                  "fecha_inicio": "2024-01-07",
                  "hora_inicio": "07:00:00 am",
                  "fecha_final": "2024-01-07",
                  "hora_final": "10:00:00 am",
                  "duracion_visita": "03:00:00",
                  "total_hrs_dia": "0",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "SORIANA",
                  "tienda": "CHIMALPOPOCA",
                  "fecha_inicio": "2024-01-07",
                  "hora_inicio": "10:30:00 am",
                  "fecha_final": "2024-01-07",
                  "hora_final": "01:30:00 pm",
                  "duracion_visita": "03:00:00",
                  "total_hrs_dia": "00:30:00",
                  "record_id": "6540549cbf322f36d29e67eb",
                  
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-07",
                  "hora_inicio": "02:00:00 pm",
                  "fecha_final": "2024-01-07",
                  "hora_final": "05:00:00 pm",
                  "duracion_visita": "03:00:00",
                  "total_hrs_dia": "00:30:00",
                  "record_id": "6540549cbf322f36d29e67eb",
              },
              {
                  "usuario": "204-2356",
                  "ciudad": "CIUDAD DE MÉXICO",
                  "cadena": "FARMACIA GUADALAJARA",
                  "tienda": "IZAZAGA",
                  "fecha_inicio": "2024-01-07",
                  "hora_inicio": "05:30:00 pm",
                  "fecha_final": "2024-01-07",
                  "hora_final": "08:00:00 pm",
                  "duracion_visita": "03:00:00",
                  "total_hrs_dia": "00:30:00",
                  "record_id": "6540549cbf322f36d29e67eb",
              },
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