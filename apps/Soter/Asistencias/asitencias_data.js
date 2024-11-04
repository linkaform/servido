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
                "empleado":'Entrada Principal',
                "fecha_23_09":'0:45',
                "fecha_24_09":'0:00',
                "fecha_25_09":'0:00',
                "fecha_26_09":'0:00',
                "fecha_27_09":'0:30',
                "fecha_28_09":'0:20',
                "fecha_29_09":'0:30',
                "tiempo": "02:15",
            },
            {
                "empleado":'Entrada Secundaria',
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
                "empleado":'Entrada de Carga',
                "fecha_23_09":'1:30',
                "fecha_24_09":'0:45',
                "fecha_25_09":'0:30',
                "fecha_26_09":'1:00',
                "fecha_27_09":'0:15',
                "fecha_28_09":'0:40',
                "fecha_29_09":'0:50',
                "tiempo": "05:30",
            },
            {
                "empleado":'Entrada de Personal',
                "fecha_23_09":'2:00',
                "fecha_24_09":'0:30',
                "fecha_25_09":'0:20',
                "fecha_26_09":'1:00',
                "fecha_27_09":'0:30',
                "fecha_28_09":'0:30',
                "fecha_29_09":'0:40',
                "tiempo": "05:30",
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
        "tiempo": "08:45",
        "_children":[
            {
                "empleado":'Entrada de Emergencia',
                "fecha_23_09":'0:50',
                "fecha_24_09":'1:10',
                "fecha_25_09":'0:20',
                "fecha_26_09":'0:45',
                "fecha_27_09":'0:25',
                "fecha_28_09":'0:10',
                "fecha_29_09":'0:40',
                "tiempo": "04:20",
            },
            {
                "empleado":'Entrada Norte',
                "fecha_23_09":'0:30',
                "fecha_24_09":'1:00',
                "fecha_25_09":'0:20',
                "fecha_26_09":'0:30',
                "fecha_27_09":'0:25',
                "fecha_28_09":'0:20',
                "fecha_29_09":'1:20',
                "tiempo": "04:25",
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
        "tiempo": "08:50",
        "_children":[
            {
                "empleado":'Entrada Sur',
                "fecha_23_09":'1:00',
                "fecha_24_09":'0:40',
                "fecha_25_09":'0:15',
                "fecha_26_09":'0:50',
                "fecha_27_09":'0:25',
                "fecha_28_09":'0:10',
                "fecha_29_09":'0:30',
                "tiempo": "03:50",
            },
            {
                "empleado":'Entrada Principal',
                "fecha_23_09":'1:50',
                "fecha_24_09":'1:00',
                "fecha_25_09":'0:20',
                "fecha_26_09":'0:20',
                "fecha_27_09":'0:30',
                "fecha_28_09":'0:15',
                "fecha_29_09":'0:45',
                "tiempo": "04:55",
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
        "tiempo": "09:45",
        "_children":[
            {
                "empleado":'Entrada Secundaria',
                "fecha_23_09":'1:40',
                "fecha_24_09":'0:20',
                "fecha_25_09":'0:15',
                "fecha_26_09":'1:00',
                "fecha_27_09":'0:45',
                "fecha_28_09":'0:20',
                "fecha_29_09":'0:50',
                "tiempo": "04:30",
            },
            {
                "empleado":'Entrada de Carga',
                "fecha_23_09":'1:20',
                "fecha_24_09":'0:35',
                "fecha_25_09":'0:30',
                "fecha_26_09":'1:20',
                "fecha_27_09":'0:15',
                "fecha_28_09":'0:15',
                "fecha_29_09":'0:20',
                "tiempo": "04:35",
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
        "tiempo": "09:35",
        "_children":[
            {
                "empleado":'Entrada de Personal',
                "fecha_23_09":'1:00',
                "fecha_24_09":'0:50',
                "fecha_25_09":'0:25',
                "fecha_26_09":'1:00',
                "fecha_27_09":'0:20',
                "fecha_28_09":'0:15',
                "fecha_29_09":'0:45',
                "tiempo": "03:45",
            },
            {
                "empleado":'Entrada de Emergencia',
                "fecha_23_09":'1:30',
                "fecha_24_09":'0:30',
                "fecha_25_09":'0:30',
                "fecha_26_09":'0:50',
                "fecha_27_09":'0:30',
                "fecha_28_09":'0:25',
                "fecha_29_09":'0:45',
                "tiempo": "04:50",
            }
        ]
    },
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
        "_children": [
            {
                "empleado": 'Entrada Principal',
                "fecha_23_09": '0:45',
                "fecha_24_09": '0:00',
                "fecha_25_09": '0:00',
                "fecha_26_09": '0:00',
                "fecha_27_09": '0:30',
                "fecha_28_09": '0:20',
                "fecha_29_09": '0:30',
                "tiempo": "02:15"
            },
            {
                "empleado": 'Entrada Secundaria',
                "fecha_23_09": '2:00',
                "fecha_24_09": '1:00',
                "fecha_25_09": '0:30',
                "fecha_26_09": '0:40',
                "fecha_27_09": '0:00',
                "fecha_28_09": '0:00',
                "fecha_29_09": '0:30',
                "tiempo": "03:10"
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
        "_children": [
            {
                "empleado": 'Entrada de Carga',
                "fecha_23_09": '1:30',
                "fecha_24_09": '0:45',
                "fecha_25_09": '0:30',
                "fecha_26_09": '1:00',
                "fecha_27_09": '0:15',
                "fecha_28_09": '0:40',
                "fecha_29_09": '0:50',
                "tiempo": "05:30"
            },
            {
                "empleado": 'Entrada de Personal',
                "fecha_23_09": '2:00',
                "fecha_24_09": '0:30',
                "fecha_25_09": '0:20',
                "fecha_26_09": '1:00',
                "fecha_27_09": '0:30',
                "fecha_28_09": '0:30',
                "fecha_29_09": '0:40',
                "tiempo": "05:30"
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
        "tiempo": "08:45",
        "_children": [
            {
                "empleado": 'Entrada de Emergencia',
                "fecha_23_09": '0:50',
                "fecha_24_09": '1:10',
                "fecha_25_09": '0:20',
                "fecha_26_09": '0:45',
                "fecha_27_09": '0:25',
                "fecha_28_09": '0:10',
                "fecha_29_09": '0:40',
                "tiempo": "04:20"
            },
            {
                "empleado": 'Entrada Norte',
                "fecha_23_09": '0:30',
                "fecha_24_09": '1:00',
                "fecha_25_09": '0:20',
                "fecha_26_09": '0:30',
                "fecha_27_09": '0:25',
                "fecha_28_09": '0:20',
                "fecha_29_09": '1:20',
                "tiempo": "04:25"
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
        "tiempo": "08:50",
        "_children": [
            {
                "empleado": 'Entrada Sur',
                "fecha_23_09": '1:00',
                "fecha_24_09": '0:40',
                "fecha_25_09": '0:15',
                "fecha_26_09": '0:50',
                "fecha_27_09": '0:25',
                "fecha_28_09": '0:10',
                "fecha_29_09": '0:30',
                "tiempo": "03:50"
            },
            {
                "empleado": 'Entrada Principal',
                "fecha_23_09": '1:50',
                "fecha_24_09": '1:00',
                "fecha_25_09": '0:20',
                "fecha_26_09": '0:20',
                "fecha_27_09": '0:30',
                "fecha_28_09": '0:15',
                "fecha_29_09": '0:45',
                "tiempo": "04:55"
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
        "tiempo": "09:45",
        "_children": [
            {
                "empleado": 'Entrada Secundaria',
                "fecha_23_09": '1:40',
                "fecha_24_09": '0:20',
                "fecha_25_09": '0:15',
                "fecha_26_09": '1:00',
                "fecha_27_09": '0:45',
                "fecha_28_09": '0:20',
                "fecha_29_09": '0:50',
                "tiempo": "04:30"
            },
            {
                "empleado": 'Entrada de Carga',
                "fecha_23_09": '1:20',
                "fecha_24_09": '0:35',
                "fecha_25_09": '0:30',
                "fecha_26_09": '1:20',
                "fecha_27_09": '0:15',
                "fecha_28_09": '0:15',
                "fecha_29_09": '0:20',
                "tiempo": "04:35"
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
        "tiempo": "09:35",
        "_children": [
            {
                "empleado": 'Entrada de Personal',
                "fecha_23_09": '1:00',
                "fecha_24_09": '0:50',
                "fecha_25_09": '0:25',
                "fecha_26_09": '1:00',
                "fecha_27_09": '0:20',
                "fecha_28_09": '0:15',
                "fecha_29_09": '0:45',
                "tiempo": "03:45"
            },
            {
                "empleado": 'Entrada de Emergencia',
                "fecha_23_09": '1:30',
                "fecha_24_09": '0:30',
                "fecha_25_09": '0:30',
                "fecha_26_09": '0:50',
                "fecha_27_09": '0:30',
                "fecha_28_09": '0:25',
                "fecha_29_09": '0:45',
                "tiempo": "04:50"
            }
        ]
    }
];





//-----Configuiración de la grafica
var setOptions1 = {
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

var dataChart1 = {
    labels: [
        'Juan Carlos', 'Rodrigo Perez', 'Jose Patricio', 'Juan Paramo', 'Pedro Morales',
        'Luis Hernandez', 'Carlos Gutierrez', 'Andres Flores', 'Santiago Rivas', 'Jorge Lopez',
        'Fernando Diaz', 'Pablo Ortega', 'Manuel Ruiz', 'Oscar Nuñez', 'Adrian Ramos',
        'Ricardo Silva', 'David Romero', 'Daniel Herrera', 'Gabriel Torres', 'Mario Salinas'
    ],
    datasets: [
        {
          label: 'Cantidad',
          data: [40, 50, 70, 20, 70, 35, 60, 45, 55, 65, 30, 50, 75, 25, 80, 90, 85, 60, 40, 55],
          backgroundColor: [],
          borderColor: [],
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
    labels: [
        'Entrada Principal', 'Entrada Secundaria', 'Entrada de Carga', 
        'Entrada de Personal', 'Entrada de Emergencia', 
        'Entrada Norte', 'Entrada Sur'
    ],
    datasets: [
      {
          label: 'Horas Abiertas',
          data: [12, 10, 8, 15, 6, 11, 14], 
          backgroundColor: [],
          borderColor: [],
      },

    ]
};
