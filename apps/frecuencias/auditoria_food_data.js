//------DATA GRAPHICS



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
                        "borderColor": "#2E86C1",
                        "data": [
                            40,
                            317,
                            900
                        ],
                        "backgroundColor": "#2E86C1",
                        "label": "Segundos promedio",
                    },
                    {
                        "borderColor": "#239B56",
                        "data": [
                            50,
                            300,
                            800
                        ],
                        "backgroundColor": "#239B56",
                        "label": "Estandar"
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
                        "borderColor": "#239B56",
                        "data": [
                            382,
                            382,
                            382,
                            382,
                            382,
                            382,
                            382
                        ],
                        "backgroundColor": "#239B56",
                        "label": "Estandar",
                    },
                    {
                        "borderColor": "#2E86C1",
                        "data": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            388
                        ],
                        "backgroundColor": "#2E86C1",
                        "label": "Segundos promedio en realizar actividades"
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

