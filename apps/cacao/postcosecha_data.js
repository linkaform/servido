// Datos demo para Reporte ENcuestas MOntaje

var columsTable1 = [
  { title:"Lote", field:'lote',hozAlign:"left",width:150},
  { title:"Fecha",field:'fecha',hozAlign:"left",width:150},
  { title:"Tipo", field:'tipo',hozAlign:"left",width:150},
  { title:"Folio", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
    url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
    target:"_blank",},headerFilter:"input", width:150},
  { title:"Operario", field:'operario',hozAlign:"left",width:250},
  { title:"Canecas", field:'canecas',hozAlign:"right",
    formatter:function(cell){
      var value = cell.getValue();
      var reportadas = parseFloat(cell.getRow().getData().canecas_reportadas);
      var totales = parseFloat(cell.getRow().getData().canecas_totales);
      var flag_operario = cell.getRow().getData().operario;
      if (flag_operario =='') {
        if(totales != reportadas){
          cell.getElement().style.backgroundColor = "#F9E79F";
        }
      }
      return value;
    },width:150},
  { title:"Kg Promedio",field:'kg',hozAlign:"right",width:150 },
  { title:"Total Kg", field:'total',hozAlign:"right",width:160 },
  /*
  
  */
];

var dataTable1 = [
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
  {
    "lote": "150",
    "fecha": "2023-06-01",
    "tipo": "Local",
    "operario": "",
    "canecas": 9,
    "canecas_reportadas": 5,
    "canecas_totales": 10,
    "kg": 150,
    "total": 270,
    "_children": [
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
      {
          "folio": "",
          "operario": "Operario 1",
          "canecas": 3,
          "kg": 30,
          "total": 90
      },
    ],
  },
];
