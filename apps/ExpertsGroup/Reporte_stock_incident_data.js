//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
        { type:'table', col: '12', id:'tableFirst', title:'Display Type'},
        { type:'table', col: '12', id:'tableSecond', title:'Out of Stock by Store', optionExpanded:true},
    ]},
    { class:'', _children : [
        { type:'chart', col: '12', id:'chartFirst', title:'Out of Stock by Estate'},
        { type:'table', col: '12', id:'tableFiveth', title:'OOS Entry vs OOS Exit by brand'},
        { type:'table', col: '12', id:'tableSixth', title:'OOS Entry vs OOS Exit detail by UPC'},
    ]},
    { class:'', _children : [
        { type:'table', col: '12', id:'tableThird', title:'Inventory', optionExpanded:true},
        { type:'table', col: '12', id:'tableFourth', title:'Incidents'},
    ]},
];


//-------TABLE 1
const greenBackgroundFormatter = (cell) => {
    const value = cell.getValue();
    const element = cell.getElement();
    const isNumber = !isNaN(parseFloat(value)) && isFinite(value);

    if(value == 0){
      return '-'; 
    }

    element.style.backgroundColor = "";
    element.style.borderRadius = "";
    element.style.padding = "";

    if (isNumber) {
      element.style.backgroundColor = "#49C2F2";
      element.style.borderRadius = "4px";
      element.style.padding = "2px 5px";
    }

    return value; 
};


var columsTable1 = [
    { title: "CR", field: "cr", hozAlign: "left", headerFilter:true , formatter:"link", formatterParams:{
      url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
      target:"_blank",
    },width: 100},
    { title: "Store", field: "store", hozAlign: "left", headerFilter:true ,width: 200 },
    { title: "Chain", field: "chain", hozAlign: "left", headerFilter:true ,width: 130 },
    { title: "State", field: "state", hozAlign: "left", headerFilter:true ,width: 200 },
    { title: "Municipality", field: "municipality", hozAlign: "left", headerFilter:true ,width: 200 },
    { title: "Total fixtures", field: "total", hozAlign: "left", width: 160 },
    { title: "6X9", field: "6x9", hozAlign: "center",  headerHozAlign:"center", formatter: greenBackgroundFormatter, width: 100 },
    { title: "5X9TR", field: "5x9tr", hozAlign: "center",  headerHozAlign:"center", formatter: greenBackgroundFormatter, width: 100 },
    { title: "COUNTER", field: "counter", hozAlign: "center",  headerHozAlign:"center", formatter: greenBackgroundFormatter, width: 160 },
    { title: "6X9TR", field: "6x9tr", hozAlign: "center",  headerHozAlign:"center", formatter: greenBackgroundFormatter, width: 100 },
    { title: "2X9", field: "2x9", hozAlign: "center",  headerHozAlign:"center", formatter: greenBackgroundFormatter, width: 100 },
    { title: "5X9", field: "5x9", hozAlign: "center",  headerHozAlign:"center", formatter: greenBackgroundFormatter, width: 100 },
    { title: "3X9", field: "3x9", hozAlign: "center",  headerHozAlign:"center", formatter: greenBackgroundFormatter, width: 100 },
];

var dataTable1 = [
  {
    cr: '1150',
    store: 'MERCADO CENT',
    chain: 'NETO',
    state: 'MICHOACAN',
    municipality: 'MORELIA',
    total: '3',
    '6x9': '-',
    '5x9': '2',
    counter: '-',
    '6x9tr': '1',
    '2x9': '-',
    '3x9': '-',
  },
  {
    cr: '1151',
    store: 'TIENDA NORTE',
    chain: 'NETO',
    state: 'JALISCO',
    municipality: 'GUADALAJARA',
    total: '4',
    '6x9': '2',
    '5x9': '-',
    counter: '1',
    '6x9tr': '-',
    '2x9': '1',
    '3x9': '-',
  },
  {
    cr: '1152',
    store: 'CENTRO SUR',
    chain: 'NETO',
    state: 'CDMX',
    municipality: 'COYOACÁN',
    total: '2',
    '6x9': '-',
    '5x9': '1',
    counter: '-',
    '6x9tr': '-',
    '2x9': '1',
    '3x9': '-',
  },
  {
    cr: '1153',
    store: 'PLAZA ESTE',
    chain: 'NETO',
    state: 'PUEBLA',
    municipality: 'PUEBLA',
    total: '5',
    '6x9': '2',
    '5x9': '-',
    counter: '2',
    '6x9tr': '1',
    '2x9': '-',
    '3x9': '-',
  },
  {
    cr: '1154',
    store: 'TIENDA OESTE',
    chain: 'NETO',
    state: 'GUANAJUATO',
    municipality: 'LEÓN',
    total: '1',
    '6x9': '-',
    '5x9': '-',
    counter: '-',
    '6x9tr': '-',
    '2x9': '-',
    '3x9': '1',
  },
  {
    cr: '1155',
    store: 'MERCADO SUR',
    chain: 'NETO',
    state: 'YUCATÁN',
    municipality: 'MÉRIDA',
    total: '3',
    '6x9': '1',
    '5x9': '1',
    counter: '-',
    '6x9tr': '-',
    '2x9': '1',
    '3x9': '-',
  },
  {
    cr: '1156',
    store: 'TIENDA RÍO',
    chain: 'NETO',
    state: 'BAJA CALIFORNIA',
    municipality: 'TIJUANA',
    total: '2',
    '6x9': '-',
    '5x9': '-',
    counter: '2',
    '6x9tr': '-',
    '2x9': '-',
    '3x9': '-',
  },
  {
    cr: '1157',
    store: 'PLAZA MAR',
    chain: 'NETO',
    state: 'SINALOA',
    municipality: 'MAZATLÁN',
    total: '4',
    '6x9': '1',
    '5x9': '1',
    counter: '1',
    '6x9tr': '1',
    '2x9': '-',
    '3x9': '-',
  },
  {
    cr: '1158',
    store: 'TIENDA COLINAS',
    chain: 'NETO',
    state: 'NUEVO LEÓN',
    municipality: 'MONTERREY',
    total: '3',
    '6x9': '-',
    '5x9': '2',
    counter: '-',
    '6x9tr': '1',
    '2x9': '-',
    '3x9': '-',
  },
  {
    cr: '1159',
    store: 'CENTRO PLAZA',
    chain: 'NETO',
    state: 'QUINTANA ROO',
    municipality: 'CANCÚN',
    total: '2',
    '6x9': '1',
    '5x9': '-',
    counter: '-',
    '6x9tr': '-',
    '2x9': '1',
    '3x9': '-',
  }
];

//-------TABLE 2
var columsTable2 = [
    { title: "CR", field: "cr", hozAlign: "left" , formatter:"link" , formatterParams:{
      url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
      target:"_blank",
    }, headerFilter:true ,width:100},
    { title: "Store", field: "store", hozAlign: "left", headerFilter:true ,width: 200 },
    { title: "Chain", field: "chain", hozAlign: "left", headerFilter:true ,width: 200 },
    { title: "State", field: "state", hozAlign: "left", headerFilter:true ,width: 200 },
    { title: "Municipality", field: "municipality", hozAlign: "left", headerFilter:true ,width: 200 },
    { title: "UPC", field: "upc", hozAlign: "left", width: 300 },
    { title: "Total peg", field: "total", hozAlign: "left", width: 150 },
];

var dataTable2 = [
  {
    cr: '1150',
    store: 'MERCADO CENT',
    chain: 'NETO',
    state: 'MICHOACAN',
    municipality: 'MORELIA',
    total: '7',
    _children: [
      { upc: 'AIRBNB 500-5000 MXN', total: '3' },
      { upc: 'GOOGLE PLAY 200MX', total: '2' },
      { upc: 'YOUTUBE RED 300MXN', total: '2' },
    ]
  },
  {
    cr: '1151',
    store: 'TIENDA NORTE',
    chain: 'NETO',
    state: 'JALISCO',
    municipality: 'GUADALAJARA',
    total: '5',
    _children: [
      { upc: 'SPOTIFY 100MX', total: '2' },
      { upc: 'NETFLIX 300MXN', total: '3' },
    ]
  },
  {
    cr: '1152',
    store: 'CENTRO SUR',
    chain: 'NETO',
    state: 'CDMX',
    municipality: 'COYOACÁN',
    total: '4',
    _children: [
      { upc: 'PLAYSTATION CARD 400MXN', total: '2' },
      { upc: 'GOOGLE PLAY 100MX', total: '2' },
    ]
  },
  {
    cr: '1153',
    store: 'PLAZA ESTE',
    chain: 'NETO',
    state: 'PUEBLA',
    municipality: 'PUEBLA',
    total: '6',
    _children: [
      { upc: 'XBOX LIVE 3M', total: '3' },
      { upc: 'APPLE GIFT 200MX', total: '3' },
    ]
  },
  {
    cr: '1154',
    store: 'TIENDA OESTE',
    chain: 'NETO',
    state: 'GUANAJUATO',
    municipality: 'LEÓN',
    total: '3',
    _children: [
      { upc: 'AMAZON MX 100MXN', total: '1' },
      { upc: 'DISNEY+ 1M', total: '2' },
    ]
  },
  {
    cr: '1155',
    store: 'MERCADO SUR',
    chain: 'NETO',
    state: 'YUCATÁN',
    municipality: 'MÉRIDA',
    total: '4',
    _children: [
      { upc: 'CLARO VIDEO 200MXN', total: '2' },
      { upc: 'HBO MAX 300MX', total: '2' },
    ]
  },
  {
    cr: '1156',
    store: 'TIENDA RÍO',
    chain: 'NETO',
    state: 'BAJA CALIFORNIA',
    municipality: 'TIJUANA',
    total: '5',
    _children: [
      { upc: 'XBOX GAMEPASS 1M', total: '3' },
      { upc: 'SKYPE CREDIT 100MX', total: '2' },
    ]
  },
  {
    cr: '1157',
    store: 'PLAZA MAR',
    chain: 'NETO',
    state: 'SINALOA',
    municipality: 'MAZATLÁN',
    total: '4',
    _children: [
      { upc: 'NINTENDO ESHOP 300MXN', total: '2' },
      { upc: 'CRUNCHYROLL 1M', total: '2' },
    ]
  },
  {
    cr: '1158',
    store: 'TIENDA COLINAS',
    chain: 'NETO',
    state: 'NUEVO LEÓN',
    municipality: 'MONTERREY',
    total: '5',
    _children: [
      { upc: 'GOOGLE PLAY 500MXN', total: '3' },
      { upc: 'AMAZON PRIME 1M', total: '2' },
    ]
  },
  {
    cr: '1159',
    store: 'CENTRO PLAZA',
    chain: 'NETO',
    state: 'QUINTANA ROO',
    municipality: 'CANCÚN',
    total: '6',
    _children: [
      { upc: 'APPLE MUSIC 100MXN', total: '3' },
      { upc: 'NETFLIX 200MXN', total: '3' },
    ]
  },
];

//-------TABLE 3
var columsTable3 = [
    { title: "CR", field: "cr", hozAlign: "left" , formatter:"link" , formatterParams:{
      url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
      target:"_blank",
    }, headerFilter:true ,width:100},
    { title: "Store", field: "store", hozAlign: "left", headerFilter:true ,width: 200 },
    { title: "Chain", field: "chain", hozAlign: "left", headerFilter:true ,width: 200 },
    { title: "State", field: "state", hozAlign: "left", headerFilter:true ,width: 200 },
    { title: "Municipality", field: "municipality", hozAlign: "left", headerFilter:true ,width: 200 },
    { title: "UPC", field: "upc", hozAlign: "left", width: 300 },
    { title: "Total peg", field: "total", hozAlign: "left", width: 150 },
];

var dataTable3 = [
  {
    cr: '1150',
    store: 'MERCADO CENT',
    chain: 'NETO',
    state: 'MICHOACAN',
    municipality: 'MORELIA',
    total: '7',
    _children: [
      { upc: 'AIRBNB 500-5000 MXN', total: '3' },
      { upc: 'GOOGLE PLAY 200MX', total: '2' },
      { upc: 'YOUTUBE RED 300MXN', total: '2' },
    ]
  },
  {
    cr: '1151',
    store: 'TIENDA NORTE',
    chain: 'NETO',
    state: 'JALISCO',
    municipality: 'GUADALAJARA',
    total: '5',
    _children: [
      { upc: 'SPOTIFY 100MX', total: '2' },
      { upc: 'NETFLIX 300MXN', total: '3' },
    ]
  },
  {
    cr: '1152',
    store: 'CENTRO SUR',
    chain: 'NETO',
    state: 'CDMX',
    municipality: 'COYOACÁN',
    total: '4',
    _children: [
      { upc: 'PLAYSTATION CARD 400MXN', total: '2' },
      { upc: 'GOOGLE PLAY 100MX', total: '2' },
    ]
  },
  {
    cr: '1153',
    store: 'PLAZA ESTE',
    chain: 'NETO',
    state: 'PUEBLA',
    municipality: 'PUEBLA',
    total: '6',
    _children: [
      { upc: 'XBOX LIVE 3M', total: '3' },
      { upc: 'APPLE GIFT 200MX', total: '3' },
    ]
  },
  {
    cr: '1154',
    store: 'TIENDA OESTE',
    chain: 'NETO',
    state: 'GUANAJUATO',
    municipality: 'LEÓN',
    total: '3',
    _children: [
      { upc: 'AMAZON MX 100MXN', total: '1' },
      { upc: 'DISNEY+ 1M', total: '2' },
    ]
  },
  {
    cr: '1155',
    store: 'MERCADO SUR',
    chain: 'NETO',
    state: 'YUCATÁN',
    municipality: 'MÉRIDA',
    total: '4',
    _children: [
      { upc: 'CLARO VIDEO 200MXN', total: '2' },
      { upc: 'HBO MAX 300MX', total: '2' },
    ]
  },
  {
    cr: '1156',
    store: 'TIENDA RÍO',
    chain: 'NETO',
    state: 'BAJA CALIFORNIA',
    municipality: 'TIJUANA',
    total: '5',
    _children: [
      { upc: 'XBOX GAMEPASS 1M', total: '3' },
      { upc: 'SKYPE CREDIT 100MX', total: '2' },
    ]
  },
  {
    cr: '1157',
    store: 'PLAZA MAR',
    chain: 'NETO',
    state: 'SINALOA',
    municipality: 'MAZATLÁN',
    total: '4',
    _children: [
      { upc: 'NINTENDO ESHOP 300MXN', total: '2' },
      { upc: 'CRUNCHYROLL 1M', total: '2' },
    ]
  },
  {
    cr: '1158',
    store: 'TIENDA COLINAS',
    chain: 'NETO',
    state: 'NUEVO LEÓN',
    municipality: 'MONTERREY',
    total: '5',
    _children: [
      { upc: 'GOOGLE PLAY 500MXN', total: '3' },
      { upc: 'AMAZON PRIME 1M', total: '2' },
    ]
  },
  {
    cr: '1159',
    store: 'CENTRO PLAZA',
    chain: 'NETO',
    state: 'QUINTANA ROO',
    municipality: 'CANCÚN',
    total: '6',
    _children: [
      { upc: 'APPLE MUSIC 100MXN', total: '3' },
      { upc: 'NETFLIX 200MXN', total: '3' },
    ]
  },
];

//-------TABLE 4
var columsTable4 = [
  { title: "CR", field: "cr", hozAlign: "left" , formatter:"link" , formatterParams:{
      url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
      target:"_blank",
  }, headerFilter:true, width: 100 },
  { title: "Store", field: "store", hozAlign: "left", headerFilter:true, width: 200 },
  { title: "Chain", field: "chain", hozAlign: "left", headerFilter:true, width: 200 },
  { title: "State", field: "state", hozAlign: "left", headerFilter:true, width: 200 },
  { title: "Municipality", field: "municipality", hozAlign: "left", headerFilter:true, width: 200 },
  { title: "Type of Incident", field: "incident", hozAlign: "left", width: 200 },
  {
    title: "Comments",
    field: "comments",
    hozAlign: "left",
    width: 200,
    formatter: function(cell) {
      const value = cell.getValue();
      return `<div style="white-space: normal; word-wrap: break-word;">${value}</div>`;
    },
    cellVerticalAlignment: "top",
  },
  { title: "Imagen", field: "url_image", width: 150,
    formatter: function(cell, formatterParams, onRendered) {
      const url = cell.getValue();
      return `<a href="${url}" target="_blank">
        <img src="${url}" style="height: 150px; width: 150px; object-fit: cover;" />
      </a>`;
    }
  }
];

var dataTable4 = [
  {
    cr: '1150',
    store: 'MERCADO CENT',
    chain: 'NETO',
    state: 'MICHOACAN',
    municipality: 'MORELIA',
    incident: 'Tiendas Cerradas',
    comments: 'Lorem ipsum',
    url_image: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/683dcbb99122a4bc15f217b6.jpg',
  },
  {
    cr: '1151',
    store: 'TIENDA NORTE',
    chain: 'NETO',
    state: 'JALISCO',
    municipality: 'GUADALAJARA',
    incident: 'Falla de Energía',
    comments: 'Sin servicio eléctrico desde temprano',
    url_image: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/683dcbb99122a4bc15f217b6.jpg',
  },
  {
    cr: '1152',
    store: 'CENTRO SUR',
    chain: 'NETO',
    state: 'CDMX',
    municipality: 'COYOACÁN',
    incident: 'Sin Conexión',
    comments: 'Pérdida de internet reportada',
    url_image: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/683dcbb99122a4bc15f217b6.jpg',
  },
  {
    cr: '1153',
    store: 'PLAZA ESTE',
    chain: 'NETO',
    state: 'PUEBLA',
    municipality: 'PUEBLA',
    incident: 'Inventario Incompleto',
    comments: 'Faltan productos en anaquel',
    url_image: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/683dcbb99122a4bc15f217b6.jpg',
  },
  {
    cr: '1154',
    store: 'TIENDA OESTE',
    chain: 'NETO',
    state: 'GUANAJUATO',
    municipality: 'LEÓN',
    incident: 'Personal Incompleto',
    comments: 'Solo 1 cajero presente',
    url_image: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/683dcbb99122a4bc15f217b6.jpg',
  },
  {
    cr: '1155',
    store: 'MERCADO SUR',
    chain: 'NETO',
    state: 'YUCATÁN',
    municipality: 'MÉRIDA',
    incident: 'Cierre Anticipado',
    comments: 'Se cerró por mantenimiento',
    url_image: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/683dcbb99122a4bc15f217b6.jpg',
  },
  {
    cr: '1156',
    store: 'TIENDA RÍO',
    chain: 'NETO',
    state: 'BAJA CALIFORNIA',
    municipality: 'TIJUANA',
    incident: 'Fuga de Agua',
    comments: 'Reportada en bodega',
    url_image: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/683dcbb99122a4bc15f217b6.jpg',
  },
  {
    cr: '1157',
    store: 'PLAZA MAR',
    chain: 'NETO',
    state: 'SINALOA',
    municipality: 'MAZATLÁN',
    incident: 'Falta de Personal',
    comments: 'Sin supervisor en turno',
    url_image: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/683dcbb99122a4bc15f217b6.jpg',
  },
  {
    cr: '1158',
    store: 'TIENDA COLINAS',
    chain: 'NETO',
    state: 'NUEVO LEÓN',
    municipality: 'MONTERREY',
    incident: 'Sistema Caído',
    comments: 'No se puede facturar',
    url_image: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/683dcbb99122a4bc15f217b6.jpg',
  },
  {
    cr: '1159',
    store: 'CENTRO PLAZA',
    chain: 'NETO',
    state: 'QUINTANA ROO',
    municipality: 'CANCÚN',
    incident: 'Alarma Activada',
    comments: 'Se activó por error',
    url_image: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/683dcbb99122a4bc15f217b6.jpg',
  },
];

//-------TABLE 5
var columsTable5 = [
    { title: "Brand", field: "brand", hozAlign: "left", headerFilter:true, width: 250 },
    { title: "Visited", field: "visited", hozAlign: "center", headerFilter:true, 
        formatterParams: {
            "symbol": "",
            "symbolAfter": "",
            "decimal": ".",
            "thousand": ",",
            "precision": 0
          },
        formatter: "money",
        width: 200
    },
    { 
        title: "%OOS Entry",
        field: "oss_entry",
        hozAlign: "center",
        headerFilter: true,
        width: 200,
        formatter: function(cell){
            let value = cell.getValue();
            if(value === null || value === undefined) return "";
            return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " %";
        }
    },
    { 
        title: "%OOS Exit",
        field: "oss_exit",
        hozAlign: "center",
        headerFilter: true,
        width: 200,
        formatter: function(cell){
            let value = cell.getValue();
            if(value === null || value === undefined) return "";
            return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " %";
        }
    },
    {title: "Negative", field: "negative", hozAlign: "center",  formatter:"tickCross", width: 150},
    { 
        title: "OOS Variance", 
        field: "progress", 
        hozAlign: "left", 
        width: 250,
        formatter: function(cell) {
            let value = cell.getValue() || 0;
            return `
                <div style="position:relative; width:100%; background:#eee; border-radius:3px;">
                    <div style="width:${value}%; background:#3b82f6; height:18px; border-radius:3px;"></div>
                    <div style="position:absolute; top:0; left:0; width:100%; height:18px; line-height:18px; text-align:center; font-size:12px; color:black;">
                        ${value}%
                    </div>
                </div>
            `;
        }
    }

];

var dataTable5 = [
    {
        'brand':'iTUNES',
        'visited':'2272',
        'oss_entry':'24.3',
        'oss_exit':'5.9',
        'negative':'true',
        'progress':30,
    },
    {
        'brand':'NETFLIX',
        'visited':'1954',
        'oss_entry':'14.1',
        'oss_exit':'5.9',
        'negative':'false',
        'progress':90,
    },
    {
        'brand':'ROBLOX',
        'visited':'2042',
        'oss_entry':'22.1',
        'oss_exit':'5.9',
        'negative':'false',
        'progress':40,
    },
    {
        'brand':'SONY',
        'visited':'1744',
        'oss_entry':'15.4',
        'oss_exit':'5.9',
        'negative':'false',
        'progress':70,
    },
    {
        'brand':'SPOTIFY',
        'visited':'1963',
        'oss_entry':'17.3',
        'oss_exit':'5.9',
        'negative':'true',
        'progress':80,
    },
    {
        'brand':'XBOX',
        'visited':'1789',
        'oss_entry':'24.7',
        'oss_exit':'5.9',
        'negative':'true',
        'progress':90,
    },
];

//-------TABLE 6
var columsTable6 = [
    { title: "Brand", field: "brand", hozAlign: "left", headerFilter:true, width: 250 },
    { title: "UPC", field: "upc", hozAlign: "left", headerFilter:true, width: 350 },
    { title: "Total Visited",  field: "visited", hozAlign: "left", headerFilter:true, 
        formatterParams: {
            "symbol": "",
            "symbolAfter": "",
            "decimal": ".",
            "thousand": ",",
            "precision": 0
          },
        formatter: "money",
        width: 200 
    },
    { 
        title: "%OOS Entry",
        field: "oss_entry",
        hozAlign: "center",
        headerFilter: true,
        width: 200,
        formatter: function(cell){
            let value = cell.getValue();
            if(value === null || value === undefined) return "";
            return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " %";
        }
    },
    { 
        title: "%OOS Exit",
        field: "oss_exit",
        hozAlign: "center",
        headerFilter: true,
        width: 200,
        formatter: function(cell){
            let value = cell.getValue();
            if(value === null || value === undefined) return "";
            return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " %";
        }
    },
    {title: "Negative", field: "negative", hozAlign: "center",  formatter:"tickCross", width: 150},
    { 
        title: "OOS Variance", 
        field: "progress", 
        hozAlign: "left", 
        width: 250,
        formatter: function(cell) {
            let value = cell.getValue() || 0;
            return `
                <div style="position:relative; width:100%; background:#eee; border-radius:3px;">
                    <div style="width:${value}%; background:#3b82f6; height:18px; border-radius:3px;"></div>
                    <div style="position:absolute; top:0; left:0; width:100%; height:18px; line-height:18px; text-align:center; font-size:12px; color:black;">
                        ${value}%
                    </div>
                </div>
            `;
        }
    }
];

var dataTable6 = [
    {
        'brand':'AMAZON',
        'upc':'AMAZON PRIME 300-500MXN',
        'visited':'33',
        'oss_entry':'3',
        'oss_exit':'0',
        'negative':'true',
        'progress':90,
    },
    {
        'brand':'iTUNES',
        'upc':'iTUNES CARD 200-400MXN',
        'visited':'2272',
        'oss_entry':'24.3',
        'oss_exit':'5.9',
        'negative':'true',
        'progress':70,
    },
    {
        'brand':'NETFLIX',
        'upc':'NETFLIX GIFT 300-600MXN',
        'visited':'1954',
        'oss_entry':'14.1',
        'oss_exit':'5.9',
        'negative':'true',
        'progress':60,
    },
    {
        'brand':'ROBLOX',
        'upc':'ROBLOX CREDITS 100-500MXN',
        'visited':'2042',
        'oss_entry':'22.1',
        'oss_exit':'5.9',
        'negative':'false',
        'progress':50,
    },
    {
        'brand':'SONY',
        'upc':'PLAYSTATION PLUS 400-800MXN',
        'visited':'1744',
        'oss_entry':'15.4',
        'oss_exit':'5.9',
        'negative':'false',
        'progress':40,
    },
    {
        'brand':'SPOTIFY',
        'upc':'SPOTIFY PREMIUM 100-300MXN',
        'visited':'1963',
        'oss_entry':'17.3',
        'oss_exit':'5.9',
        'negative':'false',
        'progress':32,
    },
    {
        'brand':'XBOX',
        'upc':'XBOX LIVE 200-500MXN',
        'visited':'1789',
        'oss_entry':'24.7',
        'oss_exit':'5.9',
        'negative':'true',
        'progress':78,
    },
    {
        'brand':'AMAZON',
        'upc':'AMAZON PRIME 500-1000MXN',
        'visited':'1420',
        'oss_entry':'10.2',
        'oss_exit':'4.8',
        'negative':'true',
        'progress':72,
    },
    {
        'brand':'iTUNES',
        'upc':'iTUNES CARD 100-200MXN',
        'visited':'980',
        'oss_entry':'11.5',
        'oss_exit':'3.2',
        'negative':'true',
        'progress':90,
    },
    {
        'brand':'NETFLIX',
        'upc':'NETFLIX GIFT 500-800MXN',
        'visited':'1340',
        'oss_entry':'12.0',
        'oss_exit':'3.9',
        'negative':'false',
        'progress':94,
    },
    {
        'brand':'ROBLOX',
        'upc':'ROBLOX CREDITS 200-400MXN',
        'visited':'1150',
        'oss_entry':'19.4',
        'oss_exit':'4.1',
        'negative':'true',
        'progress':93,
    },
    {
        'brand':'SONY',
        'upc':'PLAYSTATION PLUS 600-900MXN',
        'visited':'870',
        'oss_entry':'13.8',
        'oss_exit':'4.5',
        'negative':'false',
        'progress':70,
    },
    {
        'brand':'SPOTIFY',
        'upc':'SPOTIFY PREMIUM 200-500MXN',
        'visited':'1530',
        'oss_entry':'16.2',
        'oss_exit':'3.8',
        'negative':'true',
        'progress':45,
    },
    {
        'brand':'XBOX',
        'upc':'XBOX GAME PASS 300-600MXN',
        'visited':'1210',
        'oss_entry':'20.1',
        'oss_exit':'5.0',
        'negative':'false',
        'progress':46,
    },
    {
        'brand':'AMAZON',
        'upc':'AMAZON PRIME 200-400MXN',
        'visited':'1320',
        'oss_entry':'9.8',
        'oss_exit':'4.0',
        'negative':'true',
        'progress':47,
    }
];


//---Chart First
var setOptions1A = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        datalabels: {
            color: 'white',
            font: {
                size: 19
            },
            formatter: function(value) {
                return value;
            }
        },
    },
    responsive: true, 
    maintainAspectRatio: false ,
};


var dataChart1A = {
    labels: ['MICHOACAN','PUEBLA','JALISCO','CDMX','CDMX','GUANAJUATO'],
    datasets: [
        {
            label: 'Total',
            data: [7,6,5,4,3,1],
            fill: false,
            backgroundColor: [], 
        },
    ]
};






