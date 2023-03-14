
var data1 = {
  labels: ['Dispositivo 1','Dispositivo 2','dispositivo 3','Dispositivo 4','Dispositivo 5'],
  datasets: [
    {
      label: 'Plaga 1',
      data: [25,10,20,25,20],
      borderColor: "#264653",
      fill: false
    },
        {
      label: 'PLaga 2',
      data: [5,52,11,85,65],
      borderColor: "#1b747c",
      fill: false
    },
        {
      label: 'Plaga 3',
      data: [12,4,20,54,30],
      borderColor: "#26988e",
      fill: false
    },
        {
      label: 'Plaga 4',
      data: [15,20,30,45,50],
      borderColor: "#1c7c81",
      fill: false
    },
  ]
};

var textTitle = 'Tendencias por Area voladores por plaga';
var setOptions1 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: textTitle,
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'white',
    }
  },
  scales: {
    y:{
      ticks: {
        stepSize: 1
      }, 
    }
  },
};