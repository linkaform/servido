//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'card', col: '1', id:'cardFirst', title:'Android'},
            { type:'card', col: '1', id:'cardSecond', title:'Backend'},
            { type:'card', col: '1', id:'cardThird', title:'BI'},
            { type:'card', col: '1', id:'cardFourth', title:'Front'},
            { type:'card', col: '1', id:'cardFiveth', title:'IOS'},
            { type:'card', col: '1', id:'cardSixth', title:'Licencias'},
            { type:'card', col: '1', id:'cardSeventh', title:'Mandrill'},
            { type:'card', col: '1', id:'cardEigth', title:'PDF'},
            { type:'card', col: '1', id:'cardNineth', title:'Reportes'},
            { type:'card', col: '1', id:'cardTenth', title:'Scripts'},
            { type:'card', col: '1', id:'cardEleventh', title:'University'},
        ] 
    },
  
    { class:'', _children : [
            { type:'chart', col: '12', id:'chartFirst', title:'Tipos por mes'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartSecond', title:'Tendencia por Origen'},
            { type:'chart', col: '6', id:'chartThird', title:'Status de Tickets'},
        ] 
    },
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Detalle de empleados'},
        ] 
    },
];
//-----Configuraciones de la tabla
let columsTable1 = [
    { title:"Folio", field:'folio', width:250},
    { title:"Fecha", field:'fecha', width:250},
    { title:"Cliente", field:'cliente', width:250},
    { title:"Correo del cliente", field:'email', width:250},
    { title:"Descripción", field:'desc', width:250},
    { title:"Status", field:'status', width:250},
];


let dataTable1 = [
  {
    folio: "A9T3P1Z8",
    fecha: "2023-06-15",
    cliente: "Carlos Pérez",
    email: "carlos.perez@ejemplo.com",
    desc: "El sistema no permite iniciar sesión en la plataforma.",
    status: "en proceso"
  },
  {
    folio: "X1B7L0C2",
    fecha: "2024-03-22",
    cliente: "María López",
    email: "maria.lopez@ejemplo.com",
    desc: "Error 500 al intentar guardar un formulario.",
    status: "terminado"
  },
  {
    folio: "L2P9T4Z5",
    fecha: "2024-11-10",
    cliente: "Juan Martínez",
    email: "juan.martinez@ejemplo.com",
    desc: "La página tarda demasiado en cargar.",
    status: "en proceso"
  },
  {
    folio: "R8C2X7B3",
    fecha: "2023-12-05",
    cliente: "Ana Rodríguez",
    email: "ana.rodriguez@ejemplo.com",
    desc: "Problemas al generar reportes en PDF.",
    status: "terminado"
  },
  {
    folio: "T3Z1L8P4",
    fecha: "2024-07-18",
    cliente: "Pedro Sánchez",
    email: "pedro.sanchez@ejemplo.com",
    desc: "Los datos ingresados en el formulario no se guardan correctamente.",
    status: "en proceso"
  },
  {
    folio: "X5L9T8C7",
    fecha: "2023-09-25",
    cliente: "Laura Gómez",
    email: "laura.gomez@ejemplo.com",
    desc: "El sistema no envía notificaciones por correo electrónico.",
    status: "terminado"
  },
  {
    folio: "P7T3C1X9",
    fecha: "2024-02-14",
    cliente: "Luis Ramírez",
    email: "luis.ramirez@ejemplo.com",
    desc: "Problemas de autenticación con usuarios externos (OAuth).",
    status: "en proceso"
  },
  {
    folio: "L4C8T9Z6",
    fecha: "2023-10-12",
    cliente: "Sofía Torres",
    email: "sofia.torres@ejemplo.com",
    desc: "El diseño del sitio no es responsivo en dispositivos móviles.",
    status: "terminado"
  },
  {
    folio: "Z8P1T6L4",
    fecha: "2024-08-30",
    cliente: "Andrés Morales",
    email: "andres.morales@ejemplo.com",
    desc: "Problema con el inicio de sesión después de un mantenimiento.",
    status: "en proceso"
  },
  {
    folio: "T2X9C4L7",
    fecha: "2023-11-08",
    cliente: "Elena Cruz",
    email: "elena.cruz@ejemplo.com",
    desc: "No se pueden cargar archivos en el módulo de documentos.",
    status: "terminado"
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
    labels: ['2024-Oct','2024-Nov','2024-Dic','2025-Ene','2025-Feb'],
    datasets: [
        {
            label: 'Android',
            data: [135, 120, 140, 110, 125],
            fill: false,
        },
        {
            label: 'Backend',
            data: [90, 100, 95, 105, 110],
            fill: false,
        },
        {
            label: 'BI',
            data: [200, 190, 210, 220, 205],
            fill: false,
        },
        {
            label: 'Front',
            data: [85, 95, 90, 80, 100],
            fill: false,
        },
        {
            label: 'iOS',
            data: [130, 140, 135, 120, 125],
            fill: false,
        },
        {
            label: 'Licencias',
            data: [70, 80, 65, 75, 85],
            fill: false,
        },
        {
            label: 'Mandrill',
            data: [60, 55, 50, 65, 70],
            fill: false,
        },
        {
            label: 'PDF',
            data: [150, 145, 160, 155, 165],
            fill: false,
        },
        {
            label: 'Reportes',
            data: [220, 210, 225, 230, 215],
            fill: false,
        },
        {
            label: 'Scripts',
            data: [100, 105, 95, 90, 110],
            fill: false,
        },
        {
            label: 'University',
            data: [80, 85, 90, 75, 95],
            fill: false,
        }
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
          color: 'black',
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
            label: 'Whatsapp',
            data: [120, 130, 110, 140, 125],
            fill: false,
        },
        {
            label: 'Revisión interna',
            data: [95, 100, 90, 85, 105],
            fill: false,
        },
        {
            label: 'Correo electrónico',
            data: [150, 145, 160, 155, 165],
            fill: false,
        },
        {
            label: 'Llamada celular',
            data: [80, 75, 85, 90, 95],
            fill: false,
        },
        {
            label: 'Implementación',
            data: [200, 190, 210, 220, 205],
            fill: false,
        },
        {
            label: 'Customer service',
            data: [70, 80, 65, 75, 85],
            fill: false,
        },
        {
            label: 'Slack',
            data: [60, 55, 50, 65, 70],
            fill: false,
        },
        {
            label: 'Llamada fijo',
            data: [100, 105, 95, 90, 110],
            fill: false,
        }
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
        color: 'white',
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
