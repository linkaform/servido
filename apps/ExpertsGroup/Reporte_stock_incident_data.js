//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
        { type:'table', col: '12', id:'tableFirst', title:'Out of Stock by Display Type'},
        { type:'table', col: '12', id:'tableSecond', title:'Out of Stock by Store', optionExpanded:true},
        { type:'table', col: '12', id:'tableThird', title:'Incidents'},
    ]},
   
];


//-------TABLE 1
const greenBackgroundFormatter = (cell) => {
    const value = cell.getValue();
    const element = cell.getElement();
    const isNumber = !isNaN(parseFloat(value)) && isFinite(value);

    element.style.backgroundColor = "";
    element.style.borderRadius = "";
    element.style.padding = "";

    if (isNumber) {
    element.style.backgroundColor = "#d4edda";
    element.style.borderRadius = "4px";
    element.style.padding = "2px 5px";
    }

    return value; 
};


var columsTable1 = [
    { title: "CR", field: "cr", hozAlign: "left", width: 100},
    { title: "Store", field: "store", hozAlign: "left", width: 200 },
    { title: "Chain", field: "chain", hozAlign: "left", width: 200 },
    { title: "State", field: "state", hozAlign: "left", width: 200 },
    { title: "Municipality", field: "municipality", hozAlign: "left", width: 200 },
    { title: "Total", field: "total", hozAlign: "left", width: 200 },
    { title: "6X9", field: "6x9", hozAlign: "center",  headerHozAlign:"center", formatter: greenBackgroundFormatter, width: 100 },
    { title: "5X9TR", field: "5x9", hozAlign: "center",  headerHozAlign:"center", formatter: greenBackgroundFormatter, width: 100 },
    { title: "COUNTER", field: "counter", hozAlign: "center",  headerHozAlign:"center", formatter: greenBackgroundFormatter, width: 180 },
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
    { title: "CR", field: "cr", hozAlign: "left", width:100},
    { title: "Store", field: "store", hozAlign: "left", width: 200 },
    { title: "Chain", field: "chain", hozAlign: "left", width: 200 },
    { title: "State", field: "state", hozAlign: "left", width: 200 },
    { title: "Municipality", field: "municipality", hozAlign: "left", width: 200 },
    { title: "UPC", field: "upc", hozAlign: "left", width: 200 },
    { title: "Total", field: "total", hozAlign: "left", width: 200 },
    
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
    { title: "CR", field: "cr", hozAlign: "left", width: 100 },
    { title: "Store", field: "store", hozAlign: "left", width: 200 },
    { title: "Chain", field: "chain", hozAlign: "left", width: 200 },
    { title: "State", field: "state", hozAlign: "left", width: 200 },
    { title: "Municipality", field: "municipality", hozAlign: "left", width: 200 },
    { title: "Type of Incident", field: "incident", hozAlign: "left", width: 200 },
    { title: "Comments", field: "comments", hozAlign: "left", width: 200 },
];

var dataTable3 = [
  {
    cr: '1150',
    store: 'MERCADO CENT',
    chain: 'NETO',
    state: 'MICHOACAN',
    municipality: 'MORELIA',
    incident: 'Tiendas Cerradas',
    comments: 'Lorem ipsum',
  },
  {
    cr: '1151',
    store: 'TIENDA NORTE',
    chain: 'NETO',
    state: 'JALISCO',
    municipality: 'GUADALAJARA',
    incident: 'Falla de Energía',
    comments: 'Sin servicio eléctrico desde temprano',
  },
  {
    cr: '1152',
    store: 'CENTRO SUR',
    chain: 'NETO',
    state: 'CDMX',
    municipality: 'COYOACÁN',
    incident: 'Sin Conexión',
    comments: 'Pérdida de internet reportada',
  },
  {
    cr: '1153',
    store: 'PLAZA ESTE',
    chain: 'NETO',
    state: 'PUEBLA',
    municipality: 'PUEBLA',
    incident: 'Inventario Incompleto',
    comments: 'Faltan productos en anaquel',
  },
  {
    cr: '1154',
    store: 'TIENDA OESTE',
    chain: 'NETO',
    state: 'GUANAJUATO',
    municipality: 'LEÓN',
    incident: 'Personal Incompleto',
    comments: 'Solo 1 cajero presente',
  },
  {
    cr: '1155',
    store: 'MERCADO SUR',
    chain: 'NETO',
    state: 'YUCATÁN',
    municipality: 'MÉRIDA',
    incident: 'Cierre Anticipado',
    comments: 'Se cerró por mantenimiento',
  },
  {
    cr: '1156',
    store: 'TIENDA RÍO',
    chain: 'NETO',
    state: 'BAJA CALIFORNIA',
    municipality: 'TIJUANA',
    incident: 'Fuga de Agua',
    comments: 'Reportada en bodega',
  },
  {
    cr: '1157',
    store: 'PLAZA MAR',
    chain: 'NETO',
    state: 'SINALOA',
    municipality: 'MAZATLÁN',
    incident: 'Falta de Personal',
    comments: 'Sin supervisor en turno',
  },
  {
    cr: '1158',
    store: 'TIENDA COLINAS',
    chain: 'NETO',
    state: 'NUEVO LEÓN',
    municipality: 'MONTERREY',
    incident: 'Sistema Caído',
    comments: 'No se puede facturar',
  },
  {
    cr: '1159',
    store: 'CENTRO PLAZA',
    chain: 'NETO',
    state: 'QUINTANA ROO',
    municipality: 'CANCÚN',
    incident: 'Alarma Activada',
    comments: 'Se activó por error',
  },
];
