//------DATA GRAPHICS

var data1 = {
  labels: ['Dic-21','Enero-22','Feb-22','Mar-22','Abr-22','May-22','Jun-22','Jul-22','Ago-22','Sept-22','Oct-22','Nov-22','Dic-22','Ene-23'],
  datasets: [
    {
      label: 'Procentaje %',
      data: [17,26,33,40,25,35,50,55,60,70,66,80,82,90],
      backgroundColor: "#f1c40f",
      borderColor: "#f1c40f",
    },
  ]
};

var data2 = {
  labels: ['Estandares del Colab','Gestión del Contacto','Exploración de Neces','Demostracón y Prese','Cierre de Ventas','Proceso de Caja','Disposición del Loca'],
  datasets: [
    {
      label: 'Cumple',
      data: [60,50,90,30,80,95,70],
      backgroundColor: "#36AE7C",
      borderColor: "#36AE7C",
    },
    {
      label: 'No Cumple',
      data: [10,60,10,70,20,5,30],
      backgroundColor: "#EB5353",
      borderColor: "#EB5353",
    },
  ]
};


var data3 = {
  labels: ['Ene-23','Feb-23','Mar-23','Abr-23','May-23','Jun-23'],
  datasets: [
    {
      label: 'Procentaje %',
      data: [30,26,43,62,80,90],
      backgroundColor: "#f1c40f",
      borderColor: "#f1c40f",
    },
  ]
};

var data4 = {
  labels: ['Estandares del Colab','Gestión del Contacto','Exploración de Neces','Demostracón y Prese','Cierre de Ventas','Proceso de Caja','Disposición del Loca'],
  datasets: [
    {
      label: 'Cumple',
      data: [60,60,80,60,90,85,90],
      backgroundColor: "#36AE7C",
      borderColor: "#36AE7C",
    },
    {
      label: 'No Cumple',
      data: [10,40,20,40,10,15,10],
      backgroundColor: "#EB5353",
      borderColor: "#EB5353",
    },
  ]
};


var dataExample = [
    {
        "tendencia": [
            {
                "labels": [
                    "Segundos en saludar al cliente",
                    "Segundos en entregar bebidas",
                    "Segundos en entregar la orden de comida"
                ],
                "datasets": [
                    {
                        "borderColor": "#36AE7C",
                        "data": [
                            40,
                            300,
                            800
                        ],
                        "backgroundColor": "#36AE7C",
                        "label": "Segundos promedio",
                    },
                    {
                        "borderColor": "#FF5733",
                        "data": [
                            50,
                            317,
                            807
                        ],
                        "backgroundColor": "#FF5733",
                        "label": "Segundos promedio"
                    }
                ]
            }
        ],
        "name_form": "Check List de Tiempos de Servicio de A&B Restaurantes",
        "historico": [
            {
                "labels": [
                    "Julio-2023",
                    "Agosto-2023",
                    "Septiembre-2023",
                    "Octubre-2023",
                    "Noviembre-2023",
                    "Diciembre-2023",
                    "Enero-2024"
                ],
                "datasets": [
                    {
                        "borderColor": "#FF5733",
                        "data": [
                            382,
                            382,
                            382,
                            382,
                            382,
                            382,
                            382
                        ],
                        "backgroundColor": "#FF5733",
                        "label": "Segundos promedio en realizar actividades",
                    },
                    {
                        "borderColor": "#46C2CB",
                        "data": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            388
                        ],
                        "backgroundColor": "#46C2CB",
                        "label": "Segundos en saludar al cliente"
                    },
                    
                ]
            }
        ],
        "id_formulario": 113287
    }
]





//------DATA GRAPHICS
var setOptions1 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Reporte Historico Auditoria I',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
      font:{
        size: 15,
      }
    }
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1
      },
    }
  }
};

var setOptions2 = {
    indexAxis: 'y', // Utilizar el eje y para las etiquetas
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Reporte Tendencia Auditoria I',
        font: {
          size: 25
        }
      },
      datalabels: {
        color: 'white',
        formatter: function (value, context) {
          return value;
        }
      }
    },
    scales: {
      x: {
        stacked: false, // No apilar barras en el eje x
      },
      y: {
        stacked: false, // No apilar barras en el eje y
        ticks: {
          stepSize: 1
        },
      }
    }
  };



var setOptions3 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Reporte Historico Auditoria II',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
      font:{
        size: 15,
      }
    }
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1
      },
    }
  }
};

var setOptions4 = {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Reporte Tendencia Auditoria II',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'white',
      formatter: function (value, context){
        return value + '%';
      }
    }
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        stepSize: 1
      },
    }
  }
};