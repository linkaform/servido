var array_background = getPAlleteColors(4,4);
var array_background = getPAlleteColors(6,4);
var array_background = getPAlleteColors(7,4);
var array_background = getPAlleteColors(10,12);

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Folio", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
  url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
  target:"_blank",}, width:150},
  { title:"Num Dispositivo", field:'num_dispositivo',hozAlign:"left",width:250},
  { title:"Status", field:'status',hozAlign:"left",width:250},
  { title:"Status Bulbo", field:'status_bulbo',hozAlign:"left",width:250},
  { title:"Condicion Dispositivo", field:'condicion_dispositivo',hozAlign:"left",width:250},
  { title:"Cambio Trampa", field:'cambio_trampa',hozAlign:"left",width:250},
  { title:"Cambio Bulbo", field:'cambio_bulbo',hozAlign:"left",width:250},
  { title:"Mosca Domestica", field:'mosca_domestica',hozAlign:"left",width:250},
  { title:"Mosca Drenaje", field:'mosca_drenaje',hozAlign:"left",width:250},
  { title:"Palomilla", field:'palomilla_almacen',hozAlign:"left",width:250},
  { title:"Escarabajo", field:'otros_escarabajos',hozAlign:"left",width:250},
  { title:"Tijerilla", field:'tijerillas',hozAlign:"left",width:250},
  { title:"Mosquito", field:'mosquitos',hozAlign:"left",width:250},
];

var dataTable1 = [
  {
    folio:'100001',
    num_dispositivo:'1',
    status:'Status Example',
    status_bulbo:'Status Example',
    condicion_dispositivo:'Condición Dispositivo',
    cambio_trampa:'Cambio',
    cambio_bulbo:'Cambio',
    mosca_domestica:'10',
    mosca_drenaje:'10',

    
    mosca_fruta:'10',
    mosca_metalica:'10',
    mariposa:'10',
    gorgojos:'10',
    chicharrita:'10',
    abejas:'10',
    avispas:'10',
    mosquito:'10',
    mariquita:'10',
    otras_plagas:'10',
    descripcion:'Ninguna',
    realizada:'10',
  },
  {
    folio:'100001',
    num_dispositivo:'1',
    status:'Status Example',
    status_bulbo:'Status Example',
    condicion_dispositivo:'Condición Dispositivo',
    cambio_trampa:'Cambio',
    cambio_bulbo:'Cambio',
    mosca_domestica:'10',
    mosca_fruta:'10',
    mosca_drenaje:'10',
    mosca_metalica:'10',
    mariposa:'10',
    gorgojos:'10',
    chicharrita:'10',
    abejas:'10',
    avispas:'10',
    mosquito:'10',
    mariquita:'10',
    otras_plagas:'10',
    descripcion:'Ninguna',
    realizada:'10',
  },
  {
    folio:'100001',
    num_dispositivo:'1',
    status:'Status Example',
    status_bulbo:'Status Example',
    condicion_dispositivo:'Condición Dispositivo',
    cambio_trampa:'Cambio',
    cambio_bulbo:'Cambio',
    mosca_domestica:'10',
    mosca_fruta:'10',
    mosca_drenaje:'10',
    mosca_metalica:'10',
    mariposa:'10',
    gorgojos:'10',
    chicharrita:'10',
    abejas:'10',
    avispas:'10',
    mosquito:'10',
    mariquita:'10',
    otras_plagas:'10',
    descripcion:'Ninguna',
    realizada:'10',
  },
  {
    folio:'100001',
    num_dispositivo:'1',
    status:'Status Example',
    status_bulbo:'Status Example',
    condicion_dispositivo:'Condición Dispositivo',
    cambio_trampa:'Cambio',
    cambio_bulbo:'Cambio',
    mosca_domestica:'10',
    mosca_fruta:'10',
    mosca_drenaje:'10',
    mosca_metalica:'10',
    mariposa:'10',
    gorgojos:'10',
    chicharrita:'10',
    abejas:'10',
    avispas:'10',
    mosquito:'10',
    mariquita:'10',
    otras_plagas:'10',
    descripcion:'Ninguna',
    realizada:'10',
  },
  {
    folio:'100001',
    num_dispositivo:'1',
    status:'Status Example',
    status_bulbo:'Status Example',
    condicion_dispositivo:'Condición Dispositivo',
    cambio_trampa:'Cambio',
    cambio_bulbo:'Cambio',
    mosca_domestica:'10',
    mosca_fruta:'10',
    mosca_drenaje:'10',
    mosca_metalica:'10',
    mariposa:'10',
    gorgojos:'10',
    chicharrita:'10',
    abejas:'10',
    avispas:'10',
    mosquito:'10',
    mariquita:'10',
    otras_plagas:'10',
    descripcion:'Ninguna',
    realizada:'10',
  },
  {
    folio:'100001',
    num_dispositivo:'1',
    status:'Status Example',
    status_bulbo:'Status Example',
    condicion_dispositivo:'Condición Dispositivo',
    cambio_trampa:'Cambio',
    cambio_bulbo:'Cambio',
    mosca_domestica:'10',
    mosca_fruta:'10',
    mosca_drenaje:'10',
    mosca_metalica:'10',
    mariposa:'10',
    gorgojos:'10',
    chicharrita:'10',
    abejas:'10',
    avispas:'10',
    mosquito:'10',
    mariquita:'10',
    otras_plagas:'10',
    descripcion:'Ninguna',
    realizada:'10',
  },
  {
    folio:'100001',
    num_dispositivo:'1',
    status:'Status Example',
    status_bulbo:'Status Example',
    condicion_dispositivo:'Condición Dispositivo',
    cambio_trampa:'Cambio',
    cambio_bulbo:'Cambio',
    mosca_domestica:'10',
    mosca_fruta:'10',
    mosca_drenaje:'10',
    mosca_metalica:'10',
    mariposa:'10',
    gorgojos:'10',
    chicharrita:'10',
    abejas:'10',
    avispas:'10',
    mosquito:'10',
    mariquita:'10',
    otras_plagas:'10',
    descripcion:'Ninguna',
    realizada:'10',
  },
  {
    folio:'100001',
    num_dispositivo:'1',
    status:'Status Example',
    status_bulbo:'Status Example',
    condicion_dispositivo:'Condición Dispositivo',
    cambio_trampa:'Cambio',
    cambio_bulbo:'Cambio',
    mosca_domestica:'10',
    mosca_fruta:'10',
    mosca_drenaje:'10',
    mosca_metalica:'10',
    mariposa:'10',
    gorgojos:'10',
    chicharrita:'10',
    abejas:'10',
    avispas:'10',
    mosquito:'10',
    mariquita:'10',
    otras_plagas:'10',
    descripcion:'Ninguna',
    realizada:'10',
  },
  {
    folio:'100001',
    num_dispositivo:'1',
    status:'Status Example',
    status_bulbo:'Status Example',
    condicion_dispositivo:'Condición Dispositivo',
    cambio_trampa:'Cambio',
    cambio_bulbo:'Cambio',
    mosca_domestica:'10',
    mosca_fruta:'10',
    mosca_drenaje:'10',
    mosca_metalica:'10',
    mariposa:'10',
    gorgojos:'10',
    chicharrita:'10',
    abejas:'10',
    avispas:'10',
    mosquito:'10',
    mariquita:'10',
    otras_plagas:'10',
    descripcion:'Ninguna',
    realizada:'10',
  },
  {
    folio:'100001',
    num_dispositivo:'1',
    status:'Status Example',
    status_bulbo:'Status Example',
    condicion_dispositivo:'Condición Dispositivo',
    cambio_trampa:'Cambio',
    cambio_bulbo:'Cambio',
    mosca_domestica:'10',
    mosca_fruta:'10',
    mosca_drenaje:'10',
    mosca_metalica:'10',
    mariposa:'10',
    gorgojos:'10',
    chicharrita:'10',
    abejas:'10',
    avispas:'10',
    mosquito:'10',
    mariquita:'10',
    otras_plagas:'10',
    descripcion:'Ninguna',
    realizada:'10',
  },
];

var data1 = {
  labels: ['2022-12-01','2022-12-08','2022-12-15','2022-12-25','2023-01-03'],
  datasets: [
    {
      label: 'Volador 1',
      data: [25,10,20,25,20],
      borderColor: "#264653",
      fill: false
    },
        {
      label: 'Volador 1',
      data: [5,52,11,85,65],
      borderColor: "#1b747c",
      fill: false
    },
        {
      label: 'Volador 1',
      data: [12,4,20,54,30],
      borderColor: "#26988e",
      fill: false
    },
        {
      label: 'Volador 1',
      data: [15,20,30,45,50],
      borderColor: "#1c7c81",
      fill: false
    },
  ]
};

var setOptions1 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Reporte de Tendencia Por Voladores',
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



var data2 = {
  labels: ['2022-12-01','2022-12-08','2022-12-15','2022-12-25','2023-01-03'],
  datasets: [
    {
      label: 'Volador 1',
      data: [25,10,20,25,20],
      borderColor: "#264653",
      backgroundColor: "#264653",
      fill: true
    },
        {
      label: 'Volador 1',
      data: [5,52,11,85,65],
      borderColor: "#1b747c",
      backgroundColor: "#1b747c",
      fill: true
    },
        {
      label: 'Volador 1',
      data: [12,4,20,54,30],
      borderColor: "#26988e",
      backgroundColor: "#26988e",
      fill: true
    },
        {
      label: 'Volador 1',
      data: [15,20,30,45,50],
      borderColor: "#1c7c81",
      backgroundColor: "#1c7c81",
      fill: true
    },
  ]
};


var setOptions2 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Reporte de Tendencia Por Voladores Barras',
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


var data3 = {
  labels: ['Voladores','Mosca Domestica','Palomilla','Escarabajo','Mosca'],
  datasets: [
    {
      label: 'Cantidad',
      data: [25,10,20,25,20],
      backgroundColor: ["#264653","#9CCC65","#CDDC39","#FFEB3B","#FFB300"],
      fill: true
    },
  ]
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
        text: 'Reporte de Tendencia Por Voladores Suma',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'white',
    }
  },
  scales: {
    x: {
      display: false,
      stacked: true,
      gridLines: {
        display: false,
      },
    },
    y:{
      display: false,
      stacked: true,
      gridLines: {
        display: false,
      },
    }
  },
};
