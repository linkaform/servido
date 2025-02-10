//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartFirst', title:'Sede por mes'},
            { type:'chart', col: '6', id:'chartSecond', title:'Campus por mes'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartThird', title:'Punto por mes'},
            { type:'chart', col: '6', id:'chartFourth', title:'Auditorias'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartFiveth', title:'Tendencia por Institución'},
            { type:'chart', col: '6', id:'chartSixth', title:'Tendencia por Sede'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartSeventh', title:'Tedencia por Campus'},
            { type:'chart', col: '6', id:'chartEigth', title:'Tedencia por Punto'},
        ] 
    },
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Tabla de Auditorías'},
        ] 
    },
];
//-----Tabla
let printIcon = function(cell, formatterParams){ //plain text value
    return "<i class='fa fa-print'></i>";
};

let columsTable1 = [
    {formatter:printIcon, width:40, hozAlign:"center", cellClick:function(e, cell){
        getDownloadPdf(cell.getRow().getData().id_record);
    }},
    { title:"Folio", field:'folio', hozAlign:"left",headerFilter:"input", width:150},
    { title:"Nombre", field:'nombre', hozAlign:"left",  width:300},
    { title:"Sede", field:'sede', hozAlign:"left",  width:250},
    { title:"Campus", field:'campus', hozAlign:"left",  width:250},
    { title:"Local", field:'local', hozAlign:"left",  width:250},
    { title:"Punto", field:'sucursal', hozAlign:"left",  width:250},
    { title:"Titulo", field:'titulo', hozAlign:"left",  width:300},
    { title:"Calificación", field:'points', hozAlign:"right", bottomCalc:"avg",bottomCalcParams:{precision:2}, width:150},
];




let dataTable1 = [
    {
        folio: 1,
        nombre: "Juan Pérez",
        sede: "Ciudad de México",
        campus: "Polanco",
        local: "A101",
        sucursal: "Sucursal Norte",
        titulo: "Ingeniero",
        points: 85,
        record_id:'671bf9dc55ca6c676f13479f'
    },
    {
        folio: 2,
        nombre: "María López",
        sede: "Guadalajara",
        campus: "Zapopan",
        local: "B202",
        sucursal: "Sucursal Centro",
        titulo: "Doctora",
        points: 90,
        record_id:'671bf9dc55ca6c676f13479f'
    },
    {
        folio: 3,
        nombre: "Carlos Sánchez",
        sede: "Monterrey",
        campus: "San Pedro",
        local: "C303",
        sucursal: "Sucursal Sur",
        titulo: "Arquitecto",
        points: 78,
        record_id:'671bf9dc55ca6c676f13479f'
    },
    {
        folio: 4,
        nombre: "Ana Gómez",
        sede: "Puebla",
        campus: "Angelópolis",
        local: "D404",
        sucursal: "Sucursal Oriente",
        titulo: "Abogada",
        points: 88,
        record_id:'671bf9dc55ca6c676f13479f'
    },
    {
        folio: 5,
        nombre: "Luis Hernández",
        sede: "Tijuana",
        campus: "Otay",
        local: "E505",
        sucursal: "Sucursal Frontera",
        titulo: "Contador",
        points: 92,
        record_id:'671bf9dc55ca6c676f13479f'
    },
    {
        folio: 6,
        nombre: "Sofía Martínez",
        sede: "Cancún",
        campus: "Zona Hotelera",
        local: "F606",
        sucursal: "Sucursal Caribe",
        titulo: "Administradora",
        points: 84,
        record_id:'671bf9dc55ca6c676f13479f'
    },
    {
        folio: 7,
        nombre: "Miguel Torres",
        sede: "León",
        campus: "Centro",
        local: "G707",
        sucursal: "Sucursal Bajío",
        titulo: "Químico",
        points: 80,
        record_id:'671bf9dc55ca6c676f13479f'
    },
    {
        folio: 8,
        nombre: "Laura Rivera",
        sede: "Mérida",
        campus: "Norte",
        local: "H808",
        sucursal: "Sucursal Península",
        titulo: "Bióloga",
        points: 89,
        record_id:'671bf9dc55ca6c676f13479f'
    },
    {
        folio: 9,
        nombre: "Fernando Ramírez",
        sede: "Querétaro",
        campus: "El Pueblito",
        local: "I909",
        sucursal: "Sucursal Altiplano",
        titulo: "Economista",
        points: 87,
        record_id:'671bf9dc55ca6c676f13479f'
    },
    {
        folio: 10,
        nombre: "Gabriela Vargas",
        sede: "Chihuahua",
        campus: "Universidad",
        local: "J1010",
        sucursal: "Sucursal Norte",
        titulo: "Psicóloga",
        points: 91,
        record_id:'671bf9dc55ca6c676f13479f'
    }
]



//-----Configuiraciónes de las graficas
//---Bar
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
    labels: ['2024-Oct','2024-Nov','2024-Dic','2025-Ene','2025-Feb'],
    datasets: [
        {
            label: 'Punto 1',
            data: [135, 120, 140, 110, 125],
            fill: false,
            backgroundColor: '#FF5733', 
        },
        {
            label: 'Punto 2',
            data: [145, 100, 130, 140, 115],
            fill: false,
            backgroundColor: '#33FF57',
        },
        {
            label: 'Punto 3',
            data: [125, 110, 120, 135, 150],
            fill: false,
            backgroundColor: '#3357FF', 
        },
    ]
};

var dataChart2 = {
    labels: ['2024-Oct','2024-Nov','2024-Dic','2025-Ene','2025-Feb'],
    datasets: [
        {
            label: 'Sede 1',
            data: [200, 150, 180, 60, 130],
            backgroundColor: '#FF5733', // Naranja
            borderColor: '#FF5733',
        },
        {
            label: 'Sede 2',
            data: [170, 120, 140, 70, 110],
            backgroundColor: '#33FF57', // Verde
            borderColor: '#33FF57',
        },
        {
            label: 'Sede 3',
            data: [190, 160, 170, 80, 140],
            backgroundColor: '#3357FF', // Azul
            borderColor: '#3357FF',
        },
    ]
};

var dataChart3 = {
    labels: ['2024-Oct','2024-Nov','2024-Dic','2025-Ene','2025-Feb'],
    datasets: [
        {
            label: 'Punto 1',
            data: [200, 150, 180, 60, 130],
            backgroundColor: '#FF5733', // Naranja
            borderColor: '#FF5733',
        },
        {
            label: 'Punto 2',
            data: [170, 120, 140, 70, 110],
            backgroundColor: '#33FF57', // Verde
            borderColor: '#33FF57',
        },
        {
            label: 'Punto 3',
            data: [190, 160, 170, 80, 140],
            backgroundColor: '#3357FF', // Azul
            borderColor: '#3357FF',
        },
    ]
};

//---Radar
var dataChart4 = {
    labels: [
        "Limpieza y Sanitizacion",
        "Instalaciones",
        "Materias Primas",
    ],
    datasets: [
        {
            "borderColor": [],
            "data": [
                20.416333333333338,
                4.456666666666666,
                9.328333333333333,
            ],
            "backgroundColor": ['#FF5733','#33FF57','#3357FF'],
            "label": "Puntaje"
        }
    ]
}

var setOptions4 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
            display: false,
            position: 'top',
      },
      title: {
        display: false,
      },
      datalabels: {
            color: 'white',
            font: {
                size: 15
            }
        },
    },
    scales: {
        r: { 
            beginAtZero: true,
        }
    }
};

//--Line
var setOptions5 = {
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

var dataChart5 = {
    labels: ['2024-Oct','2024-Nov','2024-Dic','2025-Ene','2025-Feb'],
    datasets: [
        {
            label: 'Institución 1',
            data: [135, 120, 140, 110, 125],
            fill: false,
            backgroundColor: '#FF5733', 
        },
        {
            label: 'Institución 2',
            data: [145, 100, 130, 140, 115],
            fill: false,
            backgroundColor: '#33FF57',
        },
        {
            label: 'Institución 3',
            data: [125, 110, 120, 135, 150],
            fill: false,
            backgroundColor: '#3357FF', 
        },
    ]
};

var dataChart6 = {
    labels: ['2024-Oct','2024-Nov','2024-Dic','2025-Ene','2025-Feb'],
    datasets: [
        {
            label: 'Sede 1',
            data: [115, 120, 140, 190, 125],
            fill: false,
            backgroundColor: '#FF5733', 
        },
        {
            label: 'Sede 2',
            data: [195, 100, 30, 145, 115],
            fill: false,
            backgroundColor: '#33FF57',
        },
        {
            label: 'Sede 3',
            data: [95, 110, 130, 135, 190],
            fill: false,
            backgroundColor: '#3357FF', 
        },
    ]
};

var dataChart7 = {
    labels: ['2024-Oct','2024-Nov','2024-Dic','2025-Ene','2025-Feb'],
    datasets: [
        {
            label: 'Campus 1',
            data: [15, 20, 40, 10, 25],
            fill: false,
            backgroundColor: '#FF5733', 
        },
        {
            label: 'Campus 2',
            data: [95, 60, 30, 45, 15],
            fill: false,
            backgroundColor: '#33FF57',
        },
        {
            label: 'Campus 3',
            data: [65, 90, 30, 35, 90],
            fill: false,
            backgroundColor: '#3357FF', 
        },
    ]
};

var dataChart8 = {
    labels: ['2024-Oct','2024-Nov','2024-Dic','2025-Ene','2025-Feb'],
    datasets: [
        {
            label: 'Punto 1',
            data: [125, 230, 140, 210, 125],
            fill: false,
            backgroundColor: '#FF5733', 
        },
        {
            label: 'Punto 2',
            data: [195, 260, 130, 245, 315],
            fill: false,
            backgroundColor: '#33FF57',
        },
        {
            label: 'Punto 3',
            data: [465, 390, 320, 315, 190],
            fill: false,
            backgroundColor: '#3357FF', 
        },
    ]
};
