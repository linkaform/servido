//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartFirst', title:'Punto X Mes'},
            { type:'chart', col: '6', id:'chartSecond', title:'Sede X Mes'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartThird', title:'Tendencia X Punto'},
            { type:'chart', col: '6', id:'chartFourth', title:'Tendencia X Sede'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '12', id:'chartFiveth', title:'Tedencia X Institución'},
        ] 
    },
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

