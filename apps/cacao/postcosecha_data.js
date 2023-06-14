// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Folio", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
    url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
    target:"_blank",},headerFilter:"input", width:150},
  { title:"Fecha", field:'fecha',hozAlign:"left",width:250},
  { title:"Operario", field:'operario',hozAlign:"left",width:250},
  { title:"Lote", field:'lote',hozAlign:"left",width:250},
  { title:"Canecas", field:'caneas',hozAlign:"left",
    formatter:function(cell){
      var value = cell.getValue();
      var reportadas = parseFloat(cell.getRow().getData().caneas_reportadas);
      var totales = parseFloat(cell.getRow().getData().caneas_totales);
      var flag_operario = cell.getRow().getData().operario;
      if (flag_operario =='') {
        if(totales != reportadas){
          cell.getElement().style.backgroundColor = "#F9E79F";
        }
      }
      return value;
    },width:250},
  { title:"Kg Promedio",field:'kg',hozAlign:"left",width:150 },
  { title:"Total Kg", field:'total',hozAlign:"left",width:160 },
];

var dataTable1 = [
  {
    "folio": "91-12068",
    "kg": "",
    "operario": "",
    "_children": [
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 1",
          "caneas": 3,
          "fecha": "",
          "total": 90
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 2",
          "caneas": 5,
          "fecha": "",
          "total": 150
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 3",
          "caneas": 1,
          "fecha": "",
          "total": 30
      }
    ],
    "caneas": 9,
    "caneas_reportadas": 5,
    "caneas_totales": 10,
    "fecha": "2023-06-01",
    "total": 270
  },
  {
    "folio": "91-12068",
    "kg": "",
    "operario": "",
    "_children": [
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 1",
          "caneas": 3,
          "fecha": "",
          "total": 90
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 2",
          "caneas": 5,
          "fecha": "",
          "total": 150
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 3",
          "caneas": 1,
          "fecha": "",
          "total": 30
      }
    ],
    "caneas": 9,
    "fecha": "2023-06-01",
    "total": 270
  },
  {
    "folio": "91-12068",
    "kg": "",
    "operario": "",
    "_children": [
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 1",
          "caneas": 3,
          "fecha": "",
          "total": 90
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 2",
          "caneas": 5,
          "fecha": "",
          "total": 150
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 3",
          "caneas": 1,
          "fecha": "",
          "total": 30
      }
    ],
    "caneas": 9,
    "fecha": "2023-06-01",
    "total": 270
  },
  {
    "folio": "91-12068",
    "kg": "",
    "operario": "",
    "_children": [
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 1",
          "caneas": 3,
          "fecha": "",
          "total": 90
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 2",
          "caneas": 5,
          "fecha": "",
          "total": 150
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 3",
          "caneas": 1,
          "fecha": "",
          "total": 30
      }
    ],
    "caneas": 9,
    "fecha": "2023-06-01",
    "total": 270
  },
  {
    "folio": "91-12068",
    "kg": "",
    "operario": "",
    "_children": [
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 1",
          "caneas": 3,
          "fecha": "",
          "total": 90
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 2",
          "caneas": 5,
          "fecha": "",
          "total": 150
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 3",
          "caneas": 1,
          "fecha": "",
          "total": 30
      }
    ],
    "caneas": 9,
    "fecha": "2023-06-01",
    "total": 270
  }
  ,{
    "folio": "91-12068",
    "kg": "",
    "operario": "",
    "_children": [
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 1",
          "caneas": 3,
          "fecha": "",
          "total": 90
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 2",
          "caneas": 5,
          "fecha": "",
          "total": 150
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 3",
          "caneas": 1,
          "fecha": "",
          "total": 30
      }
    ],
    "caneas": 9,
    "fecha": "2023-06-01",
    "total": 270
  },
  {
    "folio": "91-12068",
    "kg": "",
    "operario": "",
    "_children": [
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 1",
          "caneas": 3,
          "fecha": "",
          "total": 90
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 2",
          "caneas": 5,
          "fecha": "",
          "total": 150
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 3",
          "caneas": 1,
          "fecha": "",
          "total": 30
      }
    ],
    "caneas": 9,
    "fecha": "2023-06-01",
    "total": 270
  },
  {
    "folio": "91-12068",
    "kg": "",
    "operario": "",
    "_children": [
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 1",
          "caneas": 3,
          "fecha": "",
          "total": 90
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 2",
          "caneas": 5,
          "fecha": "",
          "total": 150
      },
      {
          "folio": "",
          "kg": 30,
          "operario": "Operario 3",
          "caneas": 1,
          "fecha": "",
          "total": 30
      }
    ],
    "caneas": 9,
    "fecha": "2023-06-01",
    "total": 270
  }
];
