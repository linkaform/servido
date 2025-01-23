//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartFirst', title:'Locales por mes'},
            { type:'chart', col: '6', id:'chartSecond', title:'Sede por mes'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartThird', title:'Tendencia por local'},
            { type:'chart', col: '6', id:'chartFourth', title:'Tendencia por Sede'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '12', id:'chartFiveth', title:'Tedencia por Institución'},
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
    { title:"Sucursal", field:'sucursal', hozAlign:"left",  width:250},
    { title:"Titulo", field:'titulo', hozAlign:"left",  width:300},
    { title:"Points", field:'points', hozAlign:"right",  width:50},
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

var setOptions2 = {
    responsive: true,
    maintainAspectRatio: false,
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

var setOptions3 = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
          display: false,
      },
      datalabels: {
        color: 'grey',
        font: {
            size: 20
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

var dataChart3 = {
    labels: ['Punto 1','Punto 2','Punto 3','Punto 4','Punto 5'],
    datasets: [
        {
          label: 'Tedencia',
          data: [40,50,30,90,100],
          backgroundColor: [],
          borderColor: [],
        },
    ]
};

var setOptions4 = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
          display: false,
      },
      datalabels: {
        color: 'grey',
        font: {
            size: 20
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

var dataChart4 = {
    labels: ['Sede 1','Sede 2','Sede 3','Sede 4','Sede 5'],
    datasets: [
        {
          label: 'Tedencia',
          data: [30,80,70,350,100],
          backgroundColor: [],
          borderColor: [],
        },
    ]
};

var setOptions5 = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
          display: false,
      },
      datalabels: {
        color: 'grey',
        font: {
            size: 20
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
    labels: ['Institución 1','Institución 2','Institución 3','Institución 4','Institución 5'],
    datasets: [
        {
          label: 'Tedencia',
          data: [150,100,128,150,100],
          backgroundColor: [],
          borderColor: [],
        },
    ]
};

