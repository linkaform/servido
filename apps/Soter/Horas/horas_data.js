//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'card', d: '3', id:'cardFirst', title:'Porcentaje De Avance X Proyecto %'},
            { type:'card', col: '3', id:'cardSecond', title:'Departamentos Activos'},
            { type:'card', col: '3', id:'cardThird', title:'Numero De Empleados'},
            { type:'card', col: '3', id:'cardFourth', title:'Horas Totales de Trabajo'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '8', id:'chartFirst', title:'Horas Totales X Día'},
            { type:'chart', col: '4', id:'chartSecond', title:'Horas X Proyecto'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartThird', title:'Horas X Empleado'},
            { type:'chart', col: '6', id:'chartFourth', title:'Horas por Departamento'},
        ] 
    },
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Detalle de empleados'},
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
    labels: ['01-Oct','02-Oct','03-Oct','04-Oct','05-Oct'],
    datasets: [
      {
          label: 'Horas',
          data: [135,100,150,120,120],
          fill: false,
        backgroundColor: '#007CB3',
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
    labels: ['Producción','Almacenamiento','Logistica','Calidad','Administración'],
    datasets: [
      {
          label: 'Cantidad',
          data: [200,100,150,50,120],
          backgroundColor: ['#007CB3','#EFB03B'],
          borderColor: ['#007CB3','#EFB03B'],
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

var dataChart3 = {
    labels: ['Juan Carlos','Rodrigo Perez','Jose Patricio','Juan Paramo','Pedro Morales'],
    datasets: [
        {
          label: 'Cantidad',
          data: [40,50,70,20,70],
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

var dataChart4 = {
    labels: ['Juan Carlos','Rodrigo Perez','Jose Patricio','Juan Paramo','Pedro Morales'],
    datasets: [
        {
          label: 'Cantidad',
          data: [40,50,70,20,70],
          backgroundColor: [],
          borderColor: [],
        },
    ]
};

//------Configuraciones de las tablas
var columsTable1 = [
    { title:"Empleado",field:'empleado',hozAlign:"left", headerFilter:"input",width:250 },
    { title:"23-09-2024",field:'fecha_23_09',hozAlign:"left",width:150 },
    { title:"24-09-2024",field:'fecha_24_09',hozAlign:"left",width:150 },
    { title:"25-09-2024",field:'fecha_25_09',hozAlign:"left",width:150 },
    { title:"26-09-2024",field:'fecha_26_09',hozAlign:"left",width:150 },
    { title:"27-09-2024",field:'fecha_27_09',hozAlign:"left",width:150 },
    { title:"28-09-2024",field:'fecha_28_09',hozAlign:"left",width:150 },
    { title:"29-09-2024",field:'fecha_29_09',hozAlign:"left",width:150 },
    { title:"Tiempo",  field:'tiempo',hozAlign:"right",width:150 },
];

let dataTable1 = [
    {
        "empleado": "Carlos Pérez", 
        "fecha_23_09":'2:45',
        "fecha_24_09":'1:00',
        "fecha_25_09":'0:30',
        "fecha_26_09":'0:40',
        "fecha_27_09":'0:30',
        "fecha_28_09":'0:20',
        "fecha_29_09":'1:00',
        "fecha_30_09":'1:00',
        "fecha_01_10":'2:50',
        "fecha_02_10":'3:00',
        "fecha_03_10":'0:00',
        "fecha_04_10":'1:00',
        "tiempo": "14:35",
        "_children":[
            {
                "empleado":'Proyecto Logistica',
                "fecha_23_09":'0:45',
                "fecha_24_09":'0:00',
                "fecha_25_09":'0:00',
                "fecha_26_09":'0:00',
                "fecha_27_09":'0:30',
                "fecha_28_09":'0:20',
                "fecha_29_09":'0:30',
                "tiempo": "02:150",
            },
            {
                "empleado":'Proyecto Administración',
                "fecha_23_09":'2:00',
                "fecha_24_09":'1:00',
                "fecha_25_09":'0:30',
                "fecha_26_09":'0:40',
                "fecha_27_09":'0:00',
                "fecha_28_09":'0:00',
                "fecha_29_09":'0:30',
                "tiempo": "03:10",
            }
        ]
    },
        {
        "empleado": "Ana Rodríguez", 
        "fecha_23_09":'3:30',
        "fecha_24_09":'1:15',
        "fecha_25_09":'0:50',
        "fecha_26_09":'2:00',
        "fecha_27_09":'0:45',
        "fecha_28_09":'1:10',
        "fecha_29_09":'1:30',
        "tiempo": "10:00",
        "_children":[
            {
                "empleado":'Proyecto Calidad',
                "fecha_23_09":'1:30',
                "fecha_24_09":'0:45',
                "fecha_25_09":'0:30',
                "fecha_26_09":'1:00',
                "fecha_27_09":'0:15',
                "fecha_28_09":'0:40',
                "fecha_29_09":'0:50',
                "tiempo": "5:30",
            },
            {
                "empleado":'Proyecto Administracion',
                "fecha_23_09":'2:00',
                "fecha_24_09":'0:30',
                "fecha_25_09":'0:20',
                "fecha_26_09":'1:00',
                "fecha_27_09":'0:30',
                "fecha_28_09":'0:30',
                "fecha_29_09":'0:40',
                "tiempo": "5:30",
            }
        ]
    },
    {
        "empleado": "Javier Martínez", 
        "fecha_23_09":'1:20',
        "fecha_24_09":'2:10',
        "fecha_25_09":'0:40',
        "fecha_26_09":'1:15',
        "fecha_27_09":'0:50',
        "fecha_28_09":'0:30',
        "fecha_29_09":'2:00',
        "tiempo": "8:45",
        "_children":[
            {
                "empleado":'Proyecto Logistica',
                "fecha_23_09":'0:50',
                "fecha_24_09":'1:10',
                "fecha_25_09":'0:20',
                "fecha_26_09":'0:45',
                "fecha_27_09":'0:25',
                "fecha_28_09":'0:10',
                "fecha_29_09":'0:40',
                "tiempo": "4:20",
            },
            {
                "empleado":'Proyecto Producción',
                "fecha_23_09":'0:30',
                "fecha_24_09":'1:00',
                "fecha_25_09":'0:20',
                "fecha_26_09":'0:30',
                "fecha_27_09":'0:25',
                "fecha_28_09":'0:20',
                "fecha_29_09":'1:20',
                "tiempo": "4:25",
            }
        ]
    },
    {
        "empleado": "Lucía Fernández", 
        "fecha_23_09":'2:50',
        "fecha_24_09":'1:40',
        "fecha_25_09":'0:35',
        "fecha_26_09":'1:10',
        "fecha_27_09":'0:55',
        "fecha_28_09":'0:25',
        "fecha_29_09":'1:15',
        "tiempo": "8:50",
        "_children":[
            {
                "empleado":'Proyecto Calidad',
                "fecha_23_09":'1:00',
                "fecha_24_09":'0:40',
                "fecha_25_09":'0:15',
                "fecha_26_09":'0:50',
                "fecha_27_09":'0:25',
                "fecha_28_09":'0:10',
                "fecha_29_09":'0:30',
                "tiempo": "3:50",
            },
            {
                "empleado":'Proyecto Almacenamientos',
                "fecha_23_09":'1:50',
                "fecha_24_09":'1:00',
                "fecha_25_09":'0:20',
                "fecha_26_09":'0:20',
                "fecha_27_09":'0:30',
                "fecha_28_09":'0:15',
                "fecha_29_09":'0:45',
                "tiempo": "4:55",
            }
        ]
    },
    {
        "empleado": "Pedro García", 
        "fecha_23_09":'3:00',
        "fecha_24_09":'0:55',
        "fecha_25_09":'0:45',
        "fecha_26_09":'2:20',
        "fecha_27_09":'1:00',
        "fecha_28_09":'0:35',
        "fecha_29_09":'1:10',
        "tiempo": "9:45",
        "_children":[
            {
                "empleado":'Proyecto Producción',
                "fecha_23_09":'1:40',
                "fecha_24_09":'0:20',
                "fecha_25_09":'0:15',
                "fecha_26_09":'1:00',
                "fecha_27_09":'0:45',
                "fecha_28_09":'0:20',
                "fecha_29_09":'0:50',
                "tiempo": "4:30",
            },
            {
                "empleado":'Proyecto Logistica',
                "fecha_23_09":'1:20',
                "fecha_24_09":'0:35',
                "fecha_25_09":'0:30',
                "fecha_26_09":'1:20',
                "fecha_27_09":'0:15',
                "fecha_28_09":'0:15',
                "fecha_29_09":'0:20',
                "tiempo": "4:35",
            }
        ]
    },
    {
        "empleado": "Sofía Torres", 
        "fecha_23_09":'2:30',
        "fecha_24_09":'1:20',
        "fecha_25_09":'0:55',
        "fecha_26_09":'1:50',
        "fecha_27_09":'0:50',
        "fecha_28_09":'0:40',
        "fecha_29_09":'1:30',
        "tiempo": "9:35",
        "_children":[
            {
                "empleado":'Proyecto Calidad',
                "fecha_23_09":'1:00',
                "fecha_24_09":'0:50',
                "fecha_25_09":'0:25',
                "fecha_26_09":'1:00',
                "fecha_27_09":'0:20',
                "fecha_28_09":'0:15',
                "fecha_29_09":'0:45',
                "tiempo": "3:45",
            },
            {
                "empleado":'Proyecto Administración',
                "fecha_23_09":'1:30',
                "fecha_24_09":'0:30',
                "fecha_25_09":'0:30',
                "fecha_26_09":'0:50',
                "fecha_27_09":'0:30',
                "fecha_28_09":'0:25',
                "fecha_29_09":'0:45',
                "tiempo": "4:50",
            }
        ]
    }
]
