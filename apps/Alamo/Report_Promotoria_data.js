//------Diseño de reporte
let dicReportContext = [

    { class:'', _children : [
            { type:'card', col: '6', id:'cardFirst', title:'Total de Visitas', hexadecimal:'#FF5733'},
            { type:'card', col: '6', id:'cardSecond', title:'Total Promotores', hexadecimal:'#818C78'},
        ] 
    },
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Detalle de Asistencias', optionExpanded:true},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '12', id:'chartFirst', title:'Tipos por mes'},
        ] 
    },
];

//----Config Table
let columsTable1 = [
  { title:"Usuario", field:'user',headerTooltip: true,hozAlign:"left",headerWordWrap:true, width:200},
  { title:"Fecha", field:'date',headerTooltip: true,hozAlign:"left",headerWordWrap:true, width:100},
  { title:"Ciudad", field:'city',headerTooltip: true,hozAlign:"left",headerWordWrap:true, width:250},
  { title:"Cadena", field:'market',headerTooltip: true,hozAlign:"left",headerWordWrap:true, width:250},
  { title:"Tienda", field:'store',headerTooltip: true,hozAlign:"left",headerWordWrap:true, width:250},
  { title:"Kilometraje", field:'km',headerTooltip: true,hozAlign:"left",headerWordWrap:true, width:150},
  { title:"Fecha Inicio", field:'dateStart',headerTooltip: true,hozAlign:"left",headerWordWrap:true, width:150},
  { title:"Hrs Jornada", field:'hourStart',headerTooltip: true,hozAlign:"left",headerWordWrap:true, width:150},
  { title:"Fecha Final", field:'dateEnd',headerTooltip: true,hozAlign:"left",headerWordWrap:true, width:150},
  { title:"Hrs Final Jornada", field:'hourEnd',headerTooltip: true,hozAlign:"left",headerWordWrap:true, width:150},
  { title:"Duración de la visita", field:'time',headerTooltip: true,hozAlign:"left", width:150},
  { title:"Total horas x día en traslados", field:'hoursday',headerTooltip: true,hozAlign:"left", width:100},
  { title:"Evidencia", field:'evidence',headerTooltip: true,hozAlign:"left",headerWordWrap:true, width:100},
];


let  dataTable1 = [
  {
    "user": "Carlos Gómez",
    "date": "Días laborados",
    "city": "2",
    "market": "Hrs de jornada:",
    "store": "20:00:00",
    "dateStart": "2025/04/13",
    "hourStart": "17:00:00",
    "time": "Hrs de traslados: 01:00:00",
    "hoursday": "",
    "evidence": "",
    "_children": [
      {
        "user": "Día: 2024/01/06",
        "ciudad": "Inicio:",
        "market": "09:00:00 am",
        "store": "Fin:",
        "dateStart": "08:00:00 pm",
        "hourStart": "Hrs de jornada:",
        "dateEnd": "10:00:00",
        "hourEnd": "2025/04/13",
        "time": "09:00:00",
        "hoursday": "Hrs traslados: 01:00:00",
        "km":5,
        "_children": [
          {
            "user": "402-1987",
            "ciudad": "PUEBLA",
            "market": "BODEGA AURRERA",
            "store": "COLONIA CENTRO",
            "dateStart": "2024-01-06",
            "hourStart": "9:00:00 am",
            "dateEnd": "2024-01-06",
            "hourEnd": "11:30:00 am",
            "time": "02:30:00",
            "hoursday": "0"
          }
        ]
      }
    ]
  },
  {
    "user": "Paula Díaz",
    "date": "Días laborados",
    "city": "2",
    "market": "Hrs de jornada:",
    "store": "19:00:00",
    "dateStart": "2025/04/13",
    "hourStart": "16:00:00",
    "time": "Hrs de traslados: 01:30:00",
    "hoursday": "",
    "evidence": "",
    "_children": [
      {
        "user": "Día: 2024/01/07",
        "ciudad": "Inicio:",
        "market": "10:00:00 am",
        "store": "Fin:",
        "dateStart": "07:00:00 pm",
        "hourStart": "Hrs de jornada:",
        "dateEnd": "11:00:00",
        "hourEnd": "2025/04/13",
        "time": "08:00:00",
        "hoursday": "Hrs traslados: 01:00:00",
        "km":7,
        "_children": [
          {
            "user": "512-8844",
            "ciudad": "QUERÉTARO",
            "market": "WALMART",
            "store": "EL REFUGIO",
            "dateStart": "2024-01-07",
            "hourStart": "10:00:00 am",
            "dateEnd": "2024-01-07",
            "hourEnd": "1:00:00 pm",
            "time": "03:00:00",
            "hoursday": "0"
          }
        ]
      }
    ]
  },
  {
    "user": "Sofía Méndez",
    "date": "Días laborados",
    "city": "1",
    "market": "Hrs de jornada:",
    "store": "17:00:00",
    "dateStart": "2025/04/13",
    "hourStart": "14:00:00",
    "time": "Hrs de traslados: 00:45:00",
    "hoursday": "",
    "evidence": "",
    "_children": [
      {
        "user": "Día: 2024/01/08",
        "ciudad": "Inicio:",
        "market": "07:30:00 am",
        "store": "Fin:",
        "dateStart": "04:30:00 pm",
        "hourStart": "Hrs de jornada:",
        "dateEnd": "09:00:00",
        "hourEnd": "2025/04/13",
        "time": "07:30:00",
        "hoursday": "Hrs traslados: 00:45:00",
        "km":9,
        "_children": [
          {
            "user": "781-1133",
            "ciudad": "TOLUCA",
            "market": "COPPEL",
            "store": "CENTRO",
            "dateStart": "2024-01-08",
            "hourStart": "7:30:00 am",
            "dateEnd": "2024-01-08",
            "hourEnd": "10:00:00 am",
            "time": "02:30:00",
            "hoursday": "0"
          }
        ]
      }
    ]
  },
  {
    "user": "Jorge Ríos",
    "date": "Días laborados",
    "city": "2",
    "market": "Hrs de jornada:",
    "store": "18:00:00",
    "dateStart": "2025/04/13",
    "hourStart": "14:30:00",
    "time": "Hrs de traslados: 00:30:00",
    "hoursday": "",
    "evidence": "",
    "_children": [
      {
        "user": "Día: 2024/01/09",
        "ciudad": "Inicio:",
        "market": "09:00:00 am",
        "store": "Fin:",
        "dateStart": "05:30:00 pm",
        "hourStart": "Hrs de jornada:",
        "dateEnd": "08:00:00",
        "hourEnd": "2025/04/13",
        "time": "07:00:00",
        "hoursday": "Hrs traslados: 01:00:00",
        "km":8,
        "_children": [
          {
            "user": "621-7720",
            "ciudad": "VERACRUZ",
            "market": "BIMBO",
            "store": "ZONA CENTRO",
            "dateStart": "2024-01-09",
            "hourStart": "9:00:00 am",
            "dateEnd": "2024-01-09",
            "hourEnd": "11:30:00 am",
            "time": "02:30:00",
            "hoursday": "0"
          }
        ]
      }
    ]
  },
]



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
        color: 'black',
        font: {
            size: 15
        }
      }
  },
  responsive: true, 
    maintainAspectRatio: false ,
  scales: {
      y: {
          step: 1,
      }
  },
};

var dataChart1 = {
    labels: ['Promotor 1','Promotor 2','Promotor 3','Promotor 4','Promotor 5'],
    datasets: [
        {
            label: 'Visitas',
            data: [13, 12, 14, 11, 15],
            fill: false,
        },
    ]
};
