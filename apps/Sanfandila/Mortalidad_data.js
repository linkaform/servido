//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Mortalidad Por Granja', optionExpanded:true},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '12', id:'chartFirst', title:'Mortalidad Por Día'},
        ] 
    },
     { class:'', _children : [
            { type:'chart', col: '6', id:'chartSecond', title:'Mortalidad Por Causa de Muerte'},
            { type:'chart', col: '6', id:'chartThird', title:'Mortalidad Total Por Granja'},
        ] 
    },
];

//-----Configuraciones de la tabla
let columsTable1 = [
    { title:"Folio", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
    url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
    target:"_blank",},headerFilter:"input", width:150},
    { title:"Granja", field:'farm',frozen:true,  headerFilter:"input",  width:300},
    { title:"Fecha de Producción", field:'dateProduction',frozen:true,  headerFilter:"input", width:250},
    { title:"Caseta", field:'stand',frozen:true,   headerFilter:"input", width:300},
    { title:"Causa de Muerte", field:'desc',frozen:true,  headerFilter:"input",  width:400},
    { title:"Total", field:'total',frozen:true,  width:400},
];


var dataTable1 = [
  {
    farm: 'Granja 1',
    dateProduction: '2025-11-26',
    total: 27,
    _children: [
      { stand: 'Caseta 1', desc: 'Otra', subtotal: 10 },
      { stand: 'Caseta 2', desc: 'Otra', subtotal: 17 }
    ]
  },
  {
    farm: 'Granja 2',
    dateProduction: '2025-11-25',
    total: 32,
    _children: [
      { stand: 'Caseta 1', desc: 'Normal', subtotal: 12 },
      { stand: 'Caseta 2', desc: 'Normal', subtotal: 8 },
      { stand: 'Caseta 3', desc: 'Normal', subtotal: 12 }
    ]
  },
  {
    farm: 'Granja 3',
    dateProduction: '2025-11-24',
    total: 15,
    _children: [
      { stand: 'Caseta 1', desc: 'Otra', subtotal: 15 }
    ]
  },
  {
    farm: 'Granja 4',
    dateProduction: '2025-11-23',
    total: 41,
    _children: [
      { stand: 'Caseta 1', desc: 'Especial', subtotal: 10 },
      { stand: 'Caseta 2', desc: 'Especial', subtotal: 11 },
      { stand: 'Caseta 3', desc: 'Especial', subtotal: 20 }
    ]
  },
  {
    farm: 'Granja 5',
    dateProduction: '2025-11-22',
    total: 20,
    _children: [
      { stand: 'Caseta 1', desc: 'Normal', subtotal: 9 },
      { stand: 'Caseta 2', desc: 'Normal', subtotal: 11 }
    ]
  },
  {
    farm: 'Granja 6',
    dateProduction: '2025-11-21',
    total: 33,
    _children: [
      { stand: 'Caseta 1', desc: 'Otra', subtotal: 10 },
      { stand: 'Caseta 2', desc: 'Otra', subtotal: 10 },
      { stand: 'Caseta 3', desc: 'Otra', subtotal: 13 }
    ]
  },
  {
    farm: 'Granja 7',
    dateProduction: '2025-11-20',
    total: 11,
    _children: [
      { stand: 'Caseta 1', desc: 'Normal', subtotal: 11 }
    ]
  },
  {
    farm: 'Granja 8',
    dateProduction: '2025-11-19',
    total: 26,
    _children: [
      { stand: 'Caseta 1', desc: 'Otra', subtotal: 14 },
      { stand: 'Caseta 2', desc: 'Otra', subtotal: 12 }
    ]
  },
  {
    farm: 'Granja 9',
    dateProduction: '2025-11-18',
    total: 40,
    _children: [
      { stand: 'Caseta 1', desc: 'Normal', subtotal: 10 },
      { stand: 'Caseta 2', desc: 'Normal', subtotal: 10 },
      { stand: 'Caseta 3', desc: 'Normal', subtotal: 10 },
      { stand: 'Caseta 4', desc: 'Normal', subtotal: 10 }
    ]
  },
  {
    farm: 'Granja 10',
    dateProduction: '2025-11-17',
    total: 19,
    _children: [
      { stand: 'Caseta 1', desc: 'Otra', subtotal: 9 },
      { stand: 'Caseta 2', desc: 'Otra', subtotal: 10 }
    ]
  },
  {
    farm: 'Granja 11',
    dateProduction: '2025-11-16',
    total: 23,
    _children: [
      { stand: 'Caseta 1', desc: 'Normal', subtotal: 8 },
      { stand: 'Caseta 2', desc: 'Normal', subtotal: 15 }
    ]
  },
  {
    farm: 'Granja 12',
    dateProduction: '2025-11-15',
    total: 28,
    _children: [
      { stand: 'Caseta 1', desc: 'Especial', subtotal: 14 },
      { stand: 'Caseta 2', desc: 'Especial', subtotal: 14 }
    ]
  },
  {
    farm: 'Granja 13',
    dateProduction: '2025-11-14',
    total: 36,
    _children: [
      { stand: 'Caseta 1', desc: 'Otra', subtotal: 12 },
      { stand: 'Caseta 2', desc: 'Otra', subtotal: 12 },
      { stand: 'Caseta 3', desc: 'Otra', subtotal: 12 }
    ]
  },
  {
    farm: 'Granja 14',
    dateProduction: '2025-11-13',
    total: 14,
    _children: [
      { stand: 'Caseta 1', desc: 'Normal', subtotal: 14 }
    ]
  },
  {
    farm: 'Granja 15',
    dateProduction: '2025-11-12',
    total: 31,
    _children: [
      { stand: 'Caseta 1', desc: 'Otra', subtotal: 15 },
      { stand: 'Caseta 2', desc: 'Otra', subtotal: 16 }
    ]
  },
  {
    farm: 'Granja 16',
    dateProduction: '2025-11-11',
    total: 25,
    _children: [
      { stand: 'Caseta 1', desc: 'Normal', subtotal: 8 },
      { stand: 'Caseta 2', desc: 'Normal', subtotal: 9 },
      { stand: 'Caseta 3', desc: 'Normal', subtotal: 8 }
    ]
  },
  {
    farm: 'Granja 17',
    dateProduction: '2025-11-10',
    total: 12,
    _children: [
      { stand: 'Caseta 1', desc: 'Otra', subtotal: 12 }
    ]
  },
  {
    farm: 'Granja 18',
    dateProduction: '2025-11-09',
    total: 29,
    _children: [
      { stand: 'Caseta 1', desc: 'Especial', subtotal: 10 },
      { stand: 'Caseta 2', desc: 'Especial', subtotal: 9 },
      { stand: 'Caseta 3', desc: 'Especial', subtotal: 10 }
    ]
  },
  {
    farm: 'Granja 19',
    dateProduction: '2025-11-08',
    total: 22,
    _children: [
      { stand: 'Caseta 1', desc: 'Otra', subtotal: 11 },
      { stand: 'Caseta 2', desc: 'Otra', subtotal: 11 }
    ]
  },
  {
    farm: 'Granja 20',
    dateProduction: '2025-11-07',
    total: 38,
    _children: [
      { stand: 'Caseta 1', desc: 'Normal', subtotal: 10 },
      { stand: 'Caseta 2', desc: 'Normal', subtotal: 9 },
      { stand: 'Caseta 3', desc: 'Normal', subtotal: 9 },
      { stand: 'Caseta 4', desc: 'Normal', subtotal: 10 }
    ]
  }
];

//-----Configuiraciónes de las graficas
var setOptions1 = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
          display: false,
      },
      datalabels: {
        color: 'white',
        font: {
            size: 13
        }
      }
  },
  responsive: true, 
    maintainAspectRatio: false ,
    scales: {
        y: {
            step: 1,
            stacked:true
        },
        x:{
            stacked:true,
        }
  },
};

var dataChart1 = {
    labels: ['24/11/25','25/11/25','26/11/25','27/11/25','28/11/25','29/11/25'],
    datasets: [
        {
            label: 'Granja 1',
            data: [7, 12, 4, 9, 3, 11],
            fill: false,
            backgroundColor:['#8DB3C7']   // azul verdoso suave
        },
        {
            label: 'Granja 2',
            data: [5, 9, 14, 6, 7, 2],
            fill: false,
            backgroundColor:['#7FA7BD']   // azul grisáceo
        },
        {
            label: 'Granja 3',
            data: [10, 3, 8, 12, 4, 9],
            fill: false,
            backgroundColor:['#6F9BB3']   // tono más oscuro
        },
        {
            label: 'Granja 4',
            data: [11, 6, 13, 5, 10, 7],
            fill: false,
            backgroundColor:['#5F8FA8']   // azul profundo
        },
        {
            label: 'Granja 5',
            data: [4, 15, 6, 8, 9, 3],
            fill: false,
            backgroundColor:['#4F839E']   // azul gris elegante
        },
    ]
};

var setOptions2 = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: false,
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
            },
                formatter: function (value, context){
                return value + '%';
            }
        }
    },
    maintainAspectRatio: false ,
    scales: {
        y: {
            display: false,
        },
        x: {
            display: false,
        }
    },
};

var dataChart2 = {
    labels: ['Otra','Respiratorio','Digestivo','Postura interna','Prolapso'],
    datasets: [
        {
            label: 'Total',
            data: [50, 30, 10, 5, 5],
            fill: false,
           backgroundColor: ['#8DB3C7', '#F2B5D4', '#F7DFA6', '#B6E3B5', '#C7B8EA']

        },
    ]
};


var setOptions3 = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: false,
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
            },
        }
    },
    maintainAspectRatio: false ,
    scales: {
        y: {
            display: false,
        },
        x: {
            display: false,
        }
    },
};

var dataChart3 = {
    labels: ['Granja 1','Granja 2','Granja 3','Granja 4','Granja 5'],
    datasets: [
        {
            label: 'Total',
            data: [200, 250, 300, 310, 310],
            fill: false,
           backgroundColor: ['#8DB3C7', '#F2B5D4', '#F7DFA6', '#B6E3B5', '#C7B8EA']

        },
    ]
};