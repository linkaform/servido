
var columsTable1 = [
  { title:"Bache", field:'bache',hozAlign:"left",width:250},
  { title:"Lote",field:'lote',hozAlign:"right",width:150 },
  { title:"Fecha Ingreso", field:'fecha_ingreso',hozAlign:"right",width:160 },
  { title:"Modalidad",field:'modalidad',hozAlign:"center",width:150 },
  { title:"Kg Fresco",  field:'kg_fresco',hozAlign:"right",width:160 },
  { title:"Kg Seco",  field:'kg_seco',hozAlign:"right",width:160 },
  { title:"Operario",  field:'operario',hozAlign:"right",width:160 },
  { title:"Grados Brix",  field:'grados_brix',hozAlign:"left",width:160 },
  { title:"Genetica",  field:'genetica',hozAlign:"right",width:160 },
];

var dataTable1 = [
  {
    bache:'20-102',
    lote:'201',
    fecha_ingreso:'2020-09-28',
    modalidad:'1',
    kg_fresco:'714',
    operario:'Operario 1',
    grados_brix:'',
    genetica:'1',
  },
  {
    bache:'20-103',
    lote:'201',
    fecha_ingreso:'2020-09-29',
    modalidad:'1',
    kg_fresco:'796.9',
    operario:'Operario 1',
    grados_brix:'',
    genetica:'1',
  },
  {
    bache:'20-103',
    lote:'208',
    fecha_ingreso:'2020-09-30',
    modalidad:'1',
    kg_fresco:'340',
    operario:'Operario 1',
    grados_brix:'',
    genetica:'4',
  },
  {
    bache:'20-104',
    lote:'207',
    fecha_ingreso:'2020-09-30',
    modalidad:'1',
    kg_fresco:'47',
    operario:'Operario 1',
    grados_brix:'',
    genetica:'5',
  },
  {
    bache:'20-105',
    lote:'202',
    fecha_ingreso:'2020-09-30',
    modalidad:'1',
    kg_fresco:'174.4',
    operario:'Operario 1',
    grados_brix:'',
    genetica:'1',
  },
  {
    bache:'20-105',
    lote:'202',
    fecha_ingreso:'2020-09-30',
    modalidad:'1',
    kg_fresco:'1040.3',
    operario:'Operario 1',
    grados_brix:'',
    genetica:'1',
  },
  {
    bache:'20-106',
    lote:'130',
    fecha_ingreso:'2020-09-30',
    modalidad:'1',
    kg_fresco:'520.1',
    operario:'Operario 1',
    grados_brix:'',
    genetica:'1',
  },
  {
    bache:'20-107',
    lote:'131',
    fecha_ingreso:'2020-10-06',
    modalidad:'1',
    kg_fresco:'354.8',
    operario:'Operario 1',
    grados_brix:'',
    genetica:'1',
  },
  {
    bache:'20-108',
    lote:'125',
    fecha_ingreso:'2020-10-06',
    modalidad:'1',
    kg_fresco:'211.1',
    operario:'Operario 1',
    grados_brix:'',
    genetica:'1',
  },
  {
    bache:'20-109',
    lote:'130',
    fecha_ingreso:'2020-10-07',
    modalidad:'1',
    kg_fresco:'426.2',
    operario:'Operario 1',
    grados_brix:'',
    genetica:'4',
  },
  {
    bache:'20-109',
    lote:'130',
    fecha_ingreso:'2020-10-07',
    modalidad:'1',
    kg_fresco:'108.1',
    operario:'Operario 1',
    grados_brix:'',
    genetica:'1',
  },
];


var columsTable2 = [
  { title:"Bache", field:'bache',hozAlign:"left",width:250},
  { title:"Fecha Secado", field:'fecha_secado',hozAlign:"right",width:160 },
  { title:"Kg REcogidos",  field:'kg_recogidos',hozAlign:"right",width:160 },
];


var dataTable2 = [
  {
    bache: '20-102',
    fecha_secado: '2020-10-13',
    kg_recogidos: '224.9',
  },
  {
    bache: '20-103',
    fecha_secado: '2020-10-15',
    kg_recogidos: '249',
  },
  {
    bache: '20-104',
    fecha_secado: '2020-10-15',
    kg_recogidos: '126.7',
  },
  {
    bache: '20-105',
    fecha_secado: '2020-10-15',
    kg_recogidos: '388',
  },
  {
    bache: '20-106',
    fecha_secado: '2020-10-15',
    kg_recogidos: '188',
  },
  {
    bache: '20-107',
    fecha_secado: '2020-10-22',
    kg_recogidos: '118',
  },
  {
    bache: '20-108',
    fecha_secado: '2020-10-22',
    kg_recogidos: '57.8',
  },
  {
    bache: '20-109',
    fecha_secado: '2020-10-22',
    kg_recogidos: '221.8',
  },
  {
    bache: '20-110',
    fecha_secado: '2020-10-22',
    kg_recogidos: '230.7',
  },
  {
    bache: '20-111',
    fecha_secado: '2020-11-07',
    kg_recogidos: '246.8',
  },
  {
    bache: '20-113',
    fecha_secado: '2020-11-03',
    kg_recogidos: '181.7',
  },
  {
    bache: '20-114',
    fecha_secado: '2020-11-03',
    kg_recogidos: '110.1',
  },
];


//----- CONFIG GRAPHIC
var data1 = {
  labels: ['Dic-21','Enero-22','Feb-22','Mar-22','Abr-22','May-22','Jun-22','Jul-22','Ago-22','Sept-22','Oct-22','Nov-22','Dic-22','Ene-23'],
  datasets: [
    {
      label: 'Cacao Variedad',
      data: [117,268,13,100,100,100,100,100,100,100,100,100,100,100],
      backgroundColor: '#f1c40f',
    },
    {
      label: 'Cacao Genetico',
      data: [1887,2674,1614,2256,1234,1278,600,500,845,2194,400,1923,500,881],
      backgroundColor: '#e886c2',
    },
    {
      label: 'Cacao Seco',
      data: [11113,10408,4266,6045,6274,10938,5638,5926,5864,10769,2175,2602,1946,1023],
      dataTotal: [13117,13350,5893,6622,7608,12272,6338,6526,6809,13063,2675,4625,2546,2004],
      backgroundColor: ' #5dade2',
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
        text: 'Reporte Recolección',
        font: {
          size: 25
        }
    },
    labels:{
      render: (context)=>{
        value = 0;
        if (context.dataset.label == 'Cacao Seco'){
          value = context.dataset.dataTotal[context.index];
          value = value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          return value;      
        }
      }, 
      fontSize: 15,
      fontWeight: 'bold',
      position:'outside',
      textMargin: 5
    },
    datalabels: {
      color: 'white',
      formatter: function (value, context){
        var formato = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formato;
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


