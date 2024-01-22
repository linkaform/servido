// Datos demo para Reporte ENcuestas MOntaje
//------Variable
var printIcon = function(cell, formatterParams){ //plain text value
    return "<i class='fa fa-print'></i>";
};

//--Table Total

var columsTable = [
  {title:"USUARIO", field:"usuario", width:200, headerWordWrap:true},
  {title:"CIUDAD", field:"ciudad",  width:250, headerWordWrap:true},
  {title:"CADENA", field:"cadena", hozAlign:"right", width:250, headerWordWrap:true},
  {title:"TIENDA", field:"tienda",width:250, headerWordWrap:true},
  {title:"FECHA INICIO", field:"fecha_inicio", width:150, headerWordWrap:true },
  {title:"HORA INICIO", field:"hora_inicio", width:120, headerWordWrap:true },
  {title:"FECHA FINAL", field:"fecha_final", width:100, headerWordWrap:true },
  {title:"HORA FINAL", field:"hora_final", hozAlign:"right", width:100, headerWordWrap:true },
  {title:"DURACIÓN VISITA", field:"duracion_visita", hozAlign:"right", width:100, headerWordWrap:true },
  {title:"Total horas x día", field:"total_hrs_dia", hozAlign:"right", width:200, headerWordWrap:true},
  {title:"evidencia", field:"evidencia", hozAlign:"right", width:100, headerWordWrap:true},
  ]

var columsTableTwo = [
   {title:"-", field:"fecha",  width:200},
   {title:"-", field:"ciudad",  width:250},
   {title:"-", field:"cadena",  width:250},
   {title:"-", field:"tienda",  width:250},
   {title:"-", field:"fecha_inicio",  width:150},
   {title:"-", field:"actividad_inicial",  width:120},
   {title:"-", field:"hora_final",  width:100},
   {title:"-", field:"actividad_final",  width:100},
   {title:"-", field:"duracion_visita",  width:100},
   {title:"-", field:"total_movimiento",  width:200},
   {title:"-", field:"evidencia",  width:100},
   ]

var columsTableThree = [
   {title:"-", field:"folio",  width:200},
   {title:"-", field:"ciudad",  width:250},
   {title:"-", field:"cadena",  width:250},
   {title:"-", field:"tienda",  width:250},
   {title:"-", field:"fecha_inicio",  width:150},
   {title:"-", field:"hora_inicio",  width:120},
   {title:"-", field:"hora_final",  width:100},
   {title:"-", field:"hora_final",  width:100},
   {title:"-", field:"duracion_visita",  width:100},
   {title:"-", field:"total_movimiento",  width:200},
   { formatter:printIcon, width:40, hozAlign:"center",
    cellClick:function(e, cell){
      getDownloadPdf(cell.getRow().getData().evidencia)
    }},
   ]

var dataTable = [
  {
    "usuario": "Mauricio Hernández",
    "ciudad": "Días laborados",
    "cadena": "2",
    "serviceHistory": [
      {
          "fecha": "2024/01/03",
          "ciudad": "CIUDAD DE MÉXICO",
          "cadena": "FARMACIA GUADALAJARA",
          "tienda": "RIO DE LA LOZA",
          "fecha_inicio": "Dia 2024-01-03",
          "actividad_inicial": "Trabajdo",
          "hora_final": "8:00:11",
          "actividad_final": "Total Vistias",
          "duracion_visita": "6:25:28",
          "total_movimiento": "Total Traslados",
          "evidencia": "Evidencia",
          "serviceHistoryTwo": [
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
          "ciudad": "CIUDAD DE MÉXICO",
          "cadena": "FARMACIA GUADALAJARA",
          "tienda": "RIO DE LA LOZA",
          "fecha_inicio": "Dia 2024-01-04",
          "actividad_inicial": "Trabajdo",
          "hora_final": "8:00:11",
          "actividad_final": "Total Vistias",
          "duracion_visita": "6:25:28",
          "total_movimiento": "Total Traslados",
          "evidencia": "Evidencia",
          "serviceHistoryTwo": [
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
          "ciudad": "CIUDAD DE MÉXICO",
          "cadena": "FARMACIA GUADALAJARA",
          "tienda": "RIO DE LA LOZA",
          "fecha_inicio": "Dia 2024-01-05",
          "actividad_inicial": "Trabajdo",
          "hora_final": "8:00:11",
          "actividad_final": "Total Vistias",
          "duracion_visita": "6:25:28",
          "total_movimiento": "Total Traslados",
          "evidencia": "Evidencia",
          "serviceHistoryTwo": [
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
          "ciudad": "CIUDAD DE MÉXICO",
          "cadena": "FARMACIA GUADALAJARA",
          "tienda": "RIO DE LA LOZA",
          "fecha_inicio": "Dia 2024-01-06",
          "actividad_inicial": "Trabajdo",
          "hora_final": "8:00:11",
          "actividad_final": "Total Vistias",
          "duracion_visita": "6:25:28",
          "total_movimiento": "Total Traslados",
          "evidencia": "Evidencia",
          "serviceHistoryTwo": [
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
          "ciudad": "CIUDAD DE MÉXICO",
          "cadena": "FARMACIA GUADALAJARA",
          "tienda": "RIO DE LA LOZA",
          "fecha_inicio": "Dia 2024-01-07",
          "actividad_inicial": "Trabajdo",
          "hora_final": "8:00:11",
          "actividad_final": "Total Vistias",
          "duracion_visita": "6:25:28",
          "total_movimiento": "Total Traslados",
          "evidencia": "Evidencia",
          "serviceHistoryTwo": [
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


var dataFirstElement = {
  labels: ["Mauricio Hernández","Armando Contreras"],
  datasets: [
    {
      label: "Servicios",
      backgroundColor: ["#7BD3EA", "#ECA869",],
      data: [200,150],
    }
  ]
}; 