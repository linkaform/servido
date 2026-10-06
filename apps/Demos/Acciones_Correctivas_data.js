//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartFirst', title:'Acciones correctivas x Status'},
            { type:'chart', col: '6', id:'chartSecond', title:'Acciones X Departamentos', buttonLeftArrow:true},
            { type:'chart', col: '6', id:'chartThird', title:'Acciones X Mes'},
            { type:'chart', col: '6', id:'chartFourth', title:'Acciones X Tiempo'},
            { type:'chart', col: '12', id:'chartFiveth', title:'Ordenes X Técnico'},
        ] 
    },
];




//-----Configuiraciónes de las graficas
let setOptions1 = {
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

let dataChart1 = {
    labels: ['Resultado','En Proceso','Pendientes/Abiertas'],
    datasets: [
        {
            label: 'Ordenes',
            data: [20, 20, 60],
            fill: false,
        },
    ]
};

let setOptions2 = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top'
        },
        title: {
            display: false
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
            }
        }
    },
    maintainAspectRatio: false,
    scales: {
        y: {
            step: 1
        }
    },
    onClick: (event, elements) => {
        if (elements.length > 0) {
            let index = elements[0].index;
            let category = dataChart2.labels[index];
            let drillData = {
                labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                datasets: [
                    {
                        label: `Detalles de ${category} - Ordenes Pendientes`,
                        data: [
                            (Math.random() * 50).toFixed(2),
                            (Math.random() * 60).toFixed(2),
                            (Math.random() * 55).toFixed(2),
                            (Math.random() * 65).toFixed(2)
                        ],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 2,
                        fill: true
                    },
                    {
                        label: `Detalles de ${category} - Ordenes Completadas`,
                        data: [
                            (Math.random() * 40).toFixed(2),
                            (Math.random() * 50).toFixed(2),
                            (Math.random() * 45).toFixed(2),
                            (Math.random() * 55).toFixed(2)
                        ],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderWidth: 2,
                        fill: true
                    }
                ]
            };
            console.log('drillData',drillData)
            drawChartElement('chartSecond','line',drillData,setOptions2B);
            //myChart.data = drillData;
            //myChart.update();
        }
    }
};

let setOptions2B = {
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
        },
    },
    maintainAspectRatio: false,
    scales: {
        y: {
            step: 1
        }
    },
};

let dataChart2 = {
    labels: ['Mtto','Ama de Laves','Front Desk','Operaciones'],
    datasets: [
        {
            label: 'Ordenes Pendientes',
            data: [135, 120, 140, 110, 125],
            fill: false,
        },
        {
            label: 'Ordenes Completadas',
            data: [90, 100, 95, 105, 110],
            fill: false,
        },
    ]
};

let setOptions3 = {
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
        },
    },
    maintainAspectRatio: false ,
    scales: {
    y: {
        step: 1,
    }
  },
};

let dataChart3 = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
        {
            type: 'line',
            label: 'Acciones Abiertas ',
            data: [10, 15, 12, 18, 25, 20],
            borderWidth: 2,
            fill: false
        },
        {
            type: 'line',
            label: 'Acciones Cerradas ',
            data: [30, 25, 54, 15, 64, 32],
            borderWidth: 2,
            fill: false
        },
        {
            type: 'bar',
            label: 'Totales',
            data: [40, 40, 66, 32, 89, 52],
            borderWidth: 1
        },
    ]
};

let setOptions4 = {
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
    maintainAspectRatio: false ,
    scales: {
    y: {
        step: 1,
    }
  },
};

let dataChart4 = {
    labels: ['Mtto', 'Ama de Llaves', 'Front Desk', 'Operaciones'],
    datasets: [
        {
            label: 'Días',
            data: [12, 18, 25, 20],
            borderWidth: 2,
            fill: false
        },
    ]
};

let setOptions5 = {
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
    maintainAspectRatio: false ,
    scales: {
        y: {
            stacked: true,
            beginAtZero: true
        }
    }
};

let dataChart5 = {
    labels: ['Responsable 1', 'Responsable 2', 'Responsable 3', 'Responsable 4', 'Responsable 5', 'Responsable 6'],
    datasets: [
        {
            label: 'Departamento A',
            data: [10, 20, 30, 40, 50, 60],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 2,
            fill: true
        },
        {
            label: 'Departamento B',
            data: [20, 32, 45, 55, 75, 25],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 2,
            fill: true
        }
    ]
};
