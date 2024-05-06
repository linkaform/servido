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
      data: [80,40,90,30,80,95,70],
      backgroundColor: "#36AE7C",
      borderColor: "#36AE7C",
    },
    {
      label: 'No Cumple',
      data: [20,60,10,70,20,5,30],
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
      data: [90,60,80,60,90,85,90],
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
    historico: {
      labels: ['Ene-23','Feb-23','Mar-23','Abr-23','May-23','Jun-23'],
      datasets: [
        {
          label: 'Procentaje %',
          data: [30,26,43,62,80,90],
          backgroundColor: "#f1c40f",
          borderColor: "#f1c40f",
        },
      ]
    },
    tendencia:{
      labels: ['Estandares del Colab','Gestión del Contacto','Exploración de Neces','Demostracón y Prese','Cierre de Ventas','Proceso de Caja','Disposición del Loca'],
      datasets: [
        {
          label: 'Cumple',
          data: [90,60,80,60,90,85,90],
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
    },
    name_form:'Reporte 1',
    id_formulario:1,
  },
  {
    historico: {
      labels: ['Dic-21','Enero-22','Feb-22','Mar-22','Abr-22','May-22','Jun-22','Jul-22','Ago-22','Sept-22','Oct-22','Nov-22','Dic-22','Ene-23'],
      datasets: [
        {
          label: 'Procentaje %',
          data: [17,26,33,40,25,35,50,55,60,70,66,80,82,90],
          backgroundColor: "#f1c40f",
          borderColor: "#f1c40f",
        },
      ]
    },
    tendencia:{
      labels: ['Estandares del Colab','Gestión del Contacto','Exploración de Neces','Demostracón y Prese','Cierre de Ventas','Proceso de Caja','Disposición del Loca'],
      datasets: [
        {
          label: 'Cumple',
          data: [80,40,90,30,80,95,70],
          backgroundColor: "#36AE7C",
          borderColor: "#36AE7C",
        },
        {
          label: 'No Cumple',
          data: [20,60,10,70,20,5,30],
          backgroundColor: "#EB5353",
          borderColor: "#EB5353",
        },
      ] 
    },
    name_form:'Reporte 2',
    id_formulario:2,
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
  indexAxis: 'y',
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

var setOptions3 = {
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