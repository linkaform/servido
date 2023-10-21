// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Tienda", field:'tienda',hozAlign:"left",headerFilter:"input", width:150},
  { title:"Determiante",field:'determinante',hozAlign:"left", width:200 },
  { title:"Estado", field:'estado',hozAlign:"left",headerFilter:"input", width:200 },
  { title:"Municipio",field:'municipio',hozAlign:"left",headerFilter:"input", width:200 },
  { title:"Marca",  field:'marca',hozAlign:"left",width:160 },
  { title:"Modelo",  field:'modelo',hozAlign:"left",width:160 },
  { title:"Unidades vendidas",  field:'unidad_vendida',hozAlign:"right",width:200 },
  { title:"Monto vendido",  field:'monto_vendido',hozAlign:"right",width:200, formatter:"money", formatterParams:{
    decimal:".",
    thousand:",",
    symbol:"$",
    symbolAfter:false,
    negativeSign:true,
    precision:false,
  }},
];

var dataTable1 = [
  {
    "tienda":'Chedraui Xalapa Centro', "_children":[
      {

        "marca":'Apple',
        "modelo":'Apple Pro Max',
        "unidad_vendida": '1',
        'monto_vendido':200,
      },
      {

        "marca":'Sansumg',
        "modelo":'Samsung',
        "unidad_vendida": '2',
        'monto_vendido':100,
      },
      {

        "marca":'Motorola',
        "modelo":'Motorola Black',
        "unidad_vendida": '5',
        'monto_vendido':150,
      }
    ],
    "determinante":'CHE-2',
    "estado":'Green House 3',
    "municipio":'Green House 4',
    "unidad_vendida": 'Total:',
    'monto_vendido':450,
  },
  
  {
    "tienda":'Chedraui CDMX', '_children':[
      {
        "marca":'2023-08-15',
        "modelo":'Motorola',
        "unidad_vendida": '4',
        'monto_vendido':20,
      },
      {
        "marca":'2023-08-15',
        "modelo":'Samsung',
        "unidad_vendida": '4',
        'monto_vendido':15,
      },
    ],
    "determinante":'CHE-3',
    "estado":'Green House 3',
    "municipio":'Green House 4',
    'monto_vendido':35,
  }
];

//--Table Total
var columsTable2 = [
  { title:"Plant Code", field:'plant_code',hozAlign:"left",headerFilter:"input", width:150},
  { title:"Ready Week",field:'ready_week',hozAlign:"left",headerFilter:"input", width:200 },
  { title:"Warehouse Out", field:'out',hozAlign:"left",width:200 },
  { title:"Warehouse In",field:'in',hozAlign:"left",width:200 },
  { title:"Qty Total",  field:'qtyTotal',hozAlign:"right",width:200 },
];

var dataTable2 = [
  {
    "plant_code":'LNAFP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
  {
    "plant_code":'LNAFP',
    "ready_week":'18220023',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
  {
    "plant_code":'LNAFP',
    "ready_week":'18220024',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
  {
    "plant_code":'LNAFP',
    "ready_week":'18220026',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
  {
    "plant_code":'LNBFP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
  {
    "plant_code":'LNAFA',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
  {
    "plant_code":'LNATP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
  {
    "plant_code":'LNATP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "qtyTotal":500,
  },
];

var data1 = {
  labels: ['2022-12-01','2022-12-08','2022-12-15','2022-12-25','2023-01-03'],
  datasets: [
    {
      label:'Valores',
      type: 'bar',
      data: [25,10,20,25,20],
      background: "#6096B4",
      'yAxisID': 'y',
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
    datalabels:{
      color: '#6096B4',
      fontSize: 15,
      fontWeight: 'bold',
    },
    title: {
        display: true,
        text: 'Ventas totales',
        font: {
          size: 25
        }
    },
  },
  scales: {
    y:{
      type: 'linear',
      display: true,
      title:{
        display: true,
        text: '',
        size: 20,
      },
      ticks: {
        stepSize: 1
      }, 
      position: 'left',

    }

  },
};