// Datos demo para Reporte ENcuestas MOntaje

//--TABLE
var columsTable1 = [
  { title:"Fecha", field:'fecha',hozAlign:"left", headerFilter:"input",width:150},
  { title:"Producto",field:'producto',hozAlign:"left", headerFilter:"input",width:350 },
  { title:"Lote", field:'lote',hozAlign:"left", headerFilter:"input",width:200},
  { title:"Vacio",field:'vacio',hozAlign:"left", headerFilter:"input",formatter:function(cell){
    var value = cell.getValue();
    console.log('VALOR',value)
    if (value <30  || value > 32){
      cell.getElement().style.backgroundColor = "#f1c40f";
    }
    return value;
  },width:150},
  { title:"Turno",  field:'turno',hozAlign:"left", headerFilter:"input",width:200 },
];

var dataTable1 = [
  {
    fecha:'2023-08-09',
    producto:'JAMON DE PIERNA VIRGINIA 3.95KG',
    lote:'404',
    vacio:'30',
    turno:'Segundo Turno',
  },
  {
    fecha:'2023-08-09',
    producto:'JAMON DE PIERNA VIRGINIA 3.95KG',
    lote:'407',
    vacio:'33',
    turno:'Primer Turno',
  },
  {
    fecha:'2023-08-10',
    producto:'JAMON DE PIERNA VIRGINIA 3.95KG',
    lote:'408',
    vacio:'31',
    turno:'Primer Turno',
  },
  {
    fecha:'2023-08-10',
    producto:'CHORIZO DE CERDO DE TRADICION 400G',
    lote:'401',
    vacio:'34.2',
    turno:'Primer Turno',
  },
    {
    fecha:'2023-08-09',
    producto:'JAMON DE PIERNA VIRGINIA 3.95KG',
    lote:'404',
    vacio:'30',
    turno:'Segundo Turno',
  },
  {
    fecha:'2023-08-09',
    producto:'JAMON DE PIERNA VIRGINIA 3.95KG',
    lote:'407',
    vacio:'33',
    turno:'Primer Turno',
  },
  {
    fecha:'2023-08-10',
    producto:'JAMON DE PIERNA VIRGINIA 3.95KG',
    lote:'408',
    vacio:'31',
    turno:'Primer Turno',
  },
  {
    fecha:'2023-08-10',
    producto:'CHORIZO DE CERDO DE TRADICION 400G',
    lote:'401',
    vacio:'34.2',
    turno:'Primer Turno',
  },
    {
    fecha:'2023-08-09',
    producto:'JAMON DE PIERNA VIRGINIA 3.95KG',
    lote:'404',
    vacio:'30',
    turno:'Segundo Turno',
  },
  {
    fecha:'2023-08-09',
    producto:'JAMON DE PIERNA VIRGINIA 3.95KG',
    lote:'407',
    vacio:'33',
    turno:'Primer Turno',
  },
  {
    fecha:'2023-08-10',
    producto:'JAMON DE PIERNA VIRGINIA 3.95KG',
    lote:'408',
    vacio:'31',
    turno:'Primer Turno',
  },
  {
    fecha:'2023-08-10',
    producto:'CHORIZO DE CERDO DE TRADICION 400G',
    lote:'401',
    vacio:'34.2',
    turno:'Primer Turno',
  },
    {
    fecha:'2023-08-09',
    producto:'JAMON DE PIERNA VIRGINIA 3.95KG',
    lote:'404',
    vacio:'30',
    turno:'Segundo Turno',
  },
  {
    fecha:'2023-08-09',
    producto:'JAMON DE PIERNA VIRGINIA 3.95KG',
    lote:'407',
    vacio:'33',
    turno:'Primer Turno',
  },
  {
    fecha:'2023-08-10',
    producto:'JAMON DE PIERNA VIRGINIA 3.95KG',
    lote:'408',
    vacio:'31',
    turno:'Primer Turno',
  },
  {
    fecha:'2023-08-10',
    producto:'CHORIZO DE CERDO DE TRADICION 400G',
    lote:'401',
    vacio:'34.2',
    turno:'Primer Turno',
  },
];




//--CHARTS

var data1 = {
  labels: ['JAMON DE PIERNA VIRGINIA 3.95KG','CHORIZO DE CERDO DE TRADICION 400G'],
  datasets: [
    {
      label: 'Registros',
      data: [9,3],
      backgroundColor: [],
      borderColor: [],
    },
  ]
};


var data2 = {
  labels: ['Segundo Turno','Tercer Turno'],
  datasets: [
    {
      label: 'Registros',
      data: [18,9],
      backgroundColor: [],
      borderColor: [],
    },
  ]
};


var data3 = {
  labels: ['001','002','003'],
  datasets: [
    {
      label: 'Turno 1',
      data: [0,31,0,30],
      borderColor: "#3498db",
    },
    {
      label: 'Turno 2',
      data: [0,0,31,29],
      borderColor: "#236694",
    },
    {
      label: 'Turno 3',
      data: [28,0,0,40],
      borderColor: "#00718d",
    },
  ]
};

var setOptions1 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Desviacion por producto',
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
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Desviación por turno',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
      font:{
        size: 15,
      },
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


var setOptions3 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Tendencia de vacío',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
      font:{
        size: 15,
      },
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
