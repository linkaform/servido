
var columsTable1 = [
  {title:"Folio", field:'folio', hozAlign:"right", formatter:"link", formatterParams:{
  url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
  target:"_blank",}, headerFilter:"input",width:100},
  { title:"Cadena", field:'cadena',hozAlign:"right",width:200},
  { title:"Tienda", field:'tienda',hozAlign:"left",width:300},
   { title:"Determinante", field:'determinante',hozAlign:"left",width:200},
  { title:"Estado", field:'estado',hozAlign:"left",width:250},
  { title:"Municipio", field:'municipio',hozAlign:"left",width:250},
  { title:"Fecha de Captura", field:'fecha_captura',hozAlign:"right",width:110},
  { title:"Coordenas Latitud", field:'cordenada_latitud',hozAlign:"right",formatter: "money",
   "formatterParams": {"symbol": "", "symbolAfter": "", "thousand": "",  precision:false},width:150},
  { title:"Cordenas Longitud", field:'cordenada_longitud',hozAlign:"right",formatter: "money",
   "formatterParams": {"symbol": "", "symbolAfter": "", "thousand": "",  precision:false},width:150},
  { title:"Check In", field:'checkin',hozAlign:"right",width:150},
  { title:"Check Out", field:'checkout',hozAlign:"right",width:150},
  { title:"Tiempo Visita en hrs", field:'tiempo_visita',hozAlign:"right",width:100},
];

var dataTable1B = [
  {
    "folio": "850-11702", 
    "record_id": "63eaed385a3ef7414d4899da", 
    "cadena": "Liverpool", 
    "tienda": "Ck Parque Lindavista", 
    "determinante": "VLT-20463", 
    "municipio": "Gustavo A. Madero", 
    "fecha_captura": "2023-02-14 08:08:56", 
    "checkin": "2023-02-14 08:03:49", 
    "checkout": "2023-02-14 08:08:45", 
    "tz_offset": -360.0, 
    "tiempo_visita": 296.0
  }, 
  {
    "folio": "850-11702", 
    "record_id": "63eaed385a3ef7414d4899da", 
    "cadena": "Liverpool", 
    "tienda": "Ck Parque Lindavista", 
    "determinante": "VLT-20463", 
    "municipio": "Gustavo A. Madero", 
    "fecha_captura": "2023-02-14 08:08:56", 
    "checkin": "2023-02-14 08:03:49", 
    "checkout": "2023-02-14 08:08:45", 
    "tz_offset": -360.0, 
    "tiempo_visita": 296.0
  }, 
    {
    "folio": "850-11702", 
    "record_id": "63eaed385a3ef7414d4899da", 
    "cadena": "Liverpool", 
    "tienda": "Ck Parque Lindavista", 
    "determinante": "VLT-20463", 
    "municipio": "Gustavo A. Madero", 
    "fecha_captura": "2023-02-14 08:08:56", 
    "checkin": "2023-02-14 08:03:49", 
    "checkout": "2023-02-14 08:08:45", 
    "tz_offset": -360.0, 
    "tiempo_visita": 296.0
  }, 
    {
    "folio": "850-11702", 
    "record_id": "63eaed385a3ef7414d4899da", 
    "cadena": "Liverpool", 
    "tienda": "Ck Parque Lindavista", 
    "determinante": "VLT-20463", 
    "municipio": "Gustavo A. Madero", 
    "fecha_captura": "2023-02-14 08:08:56", 
    "checkin": "2023-02-14 08:03:49", 
    "checkout": "2023-02-14 08:08:45", 
    "tz_offset": -360.0, 
    "tiempo_visita": 296.0
  }, 
    {
    "folio": "850-11702", 
    "record_id": "63eaed385a3ef7414d4899da", 
    "cadena": "Liverpool", 
    "tienda": "Ck Parque Lindavista", 
    "determinante": "VLT-20463", 
    "municipio": "Gustavo A. Madero", 
    "fecha_captura": "2023-02-14 08:08:56", 
    "checkin": "2023-02-14 08:03:49", 
    "checkout": "2023-02-14 08:08:45", 
    "tz_offset": -360.0, 
    "tiempo_visita": 296.0
  }, 
    {
    "folio": "850-11702", 
    "record_id": "63eaed385a3ef7414d4899da", 
    "cadena": "Liverpool", 
    "tienda": "Ck Parque Lindavista", 
    "determinante": "VLT-20463", 
    "municipio": "Gustavo A. Madero", 
    "fecha_captura": "2023-02-14 08:08:56", 
    "checkin": "2023-02-14 08:03:49", 
    "checkout": "2023-02-14 08:08:45", 
    "tz_offset": -360.0, 
    "tiempo_visita": 296.0
  }, 
    {
    "folio": "850-11702", 
    "record_id": "63eaed385a3ef7414d4899da", 
    "cadena": "Liverpool", 
    "tienda": "Ck Parque Lindavista", 
    "determinante": "VLT-20463", 
    "municipio": "Gustavo A. Madero", 
    "fecha_captura": "2023-02-14 08:08:56", 
    "checkin": "2023-02-14 08:03:49", 
    "checkout": "2023-02-14 08:08:45", 
    "tz_offset": -360.0, 
    "tiempo_visita": 296.0
  }, 
];


var dataTable1 = [
    {
        "geolocation": [
            19.441683,
            -99.19916
        ],
        "folio": "7-14026",
        "determinante": "",
        "estado": "",
        "checkin": "14:39:44",
        "tienda": "",
        "tz_offset": -300,
        "cadena": "",
        "cordenada_latitud": 19.441683,
        "cordenada_longitud": -99.19916,
        "tiempo_visita": 1,
        "fecha_captura": "2023-10-11",
        "record_id": "6526f9d9845e0f29d3bf7b16",
        "checkout": "14:39:48",
        "municipio": ""
    },
    {
        "geolocation": [
            19.441591,
            -99.19915
        ],
        "folio": "6-14026",
        "checkout": "14:35:01",
        "checkin": "14:33:44",
        "tienda": "Liverpool Centro",
        "tz_offset": -300,
        "cordenada_longitud": -99.19915,
        "cadena": "Liverpool",
        "cordenada_latitud": 19.441591,
        "determinante": "Liv-700020",
        "tiempo_visita": 2,
        "fecha_captura": "2023-10-11",
        "record_id": "6526f8bd3f54aa67d13d9833",
        "estado": "Ciudad De Mexico",
        "municipio": "Cuauhtemoc"
    },
    {
        "geolocation": [
            25.6498,
            -100.186
        ],
        "folio": "4-14026",
        "checkout": "12:58:57",
        "checkin": "12:58:16",
        "tienda": "Super Che Reforma Peralvillo Mex",
        "tz_offset": -300,
        "cordenada_longitud": -100.186,
        "cadena": "Chedraui",
        "cordenada_latitud": 25.6498,
        "determinante": "Che-700",
        "tiempo_visita": 1,
        "fecha_captura": "2023-10-11",
        "record_id": "6526e26206279b18dcbf7b33",
        "estado": "Ciudad De Mexico",
        "municipio": "Cuauhtemoc"
    },
    {
        "geolocation": [
            25.6498616,
            -100.1856384
        ],
        "folio": "3-14026",
        "checkout": "12:26:51",
        "checkin": "12:26:39",
        "tienda": "Super Chedraui Huixtla",
        "tz_offset": -300,
        "cordenada_longitud": -100.1856384,
        "cadena": "Chedraui",
        "cordenada_latitud": 25.6498616,
        "determinante": "Che-722",
        "tiempo_visita": 1,
        "fecha_captura": "2023-10-11",
        "record_id": "6526dadffed842a11d4e8394",
        "estado": "Chiapas",
        "municipio": "Huixtla"
    },
    {
        "geolocation": [
            25.6498,
            -100.186
        ],
        "folio": "1-14026",
        "checkout": "12:22:18",
        "checkin": "12:21:46",
        "tienda": "Bodega Aurrera Camino Real",
        "tz_offset": -300,
        "cordenada_longitud": -100.186,
        "cadena": "Bodega Aurrera",
        "cordenada_latitud": 25.6498,
        "determinante": "Bga-3119",
        "tiempo_visita": 1,
        "fecha_captura": "2023-10-11",
        "record_id": "6526d9cb724a8017edbf7af7",
        "estado": "Baja California Sur",
        "municipio": "La Paz"
    }
]