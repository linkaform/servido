// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var columsTable1B = [
  { title:"Plant Code", field:'plant_code',hozAlign:"left",headerFilter:"input", width:150},
  { title:"Ready Week",field:'ready_week',hozAlign:"left",headerFilter:"input", width:200 },
  { title:"Warehouse Out", field:'out',hozAlign:"left",headerFilter:"input", width:200 },
  { title:"Warehouse In",field:'in',hozAlign:"left",headerFilter:"input", width:200 },
  { title:"Created Date",  field:'created_date',hozAlign:"left",width:160 },
  { title:"Move Date",  field:'move_date',hozAlign:"left",width:160 },
  { title:"Qty",  field:'qty',hozAlign:"right",width:200 },
];

var dataTable1B = [
  {
    "plant_code":'LNAFP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "date":'2023-08-15',
    "qty":500,
  },
  {
    "plant_code":'LNAFP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "date":'2023-08-15',
    "qty":500,
  },
  {
    "plant_code":'LNAFP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "date":'2023-08-15',
    "qty":500,
  },
  {
    "plant_code":'LNAFP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "date":'2023-08-15',
    "qty":500,
  },
  {
    "plant_code":'LNAFP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "date":'2023-08-15',
    "qty":500,
  },
  {
    "plant_code":'LNAFP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "date":'2023-08-15',
    "qty":500,
  },
  {
    "plant_code":'LNAFP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "date":'2023-08-15',
    "qty":500,
  },
  {
    "plant_code":'LNAFP',
    "ready_week":'18220021',
    "out":'Green House 3',
    "in":'Green House 4',
    "date":'2023-08-15',
    "qty":500,
  },
];

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"No.", field:'numero',hozAlign:"center", width:50, headerWordWrap:true},
  { title:"Tipo Documento",field:'tipo_documento',hozAlign:"center", width:170, headerWordWrap:true },
  { title:"Número identificación", field:'numero_identificacion',hozAlign:"center", width:170, headerWordWrap:true },
  { title:"Nombres y Apellidos del estudiante",field:'nombre',hozAlign:"center", width:200, headerWordWrap:true },
  
  { title:"02/28/2024",  field:'fecha',hozAlign:"center",width:140, headerWordWrap:true,
    columns:[
        {title:"Sí", field:"si", hozAlign:"center", width:55},
        {title:"No", field:"no", hozAlign:"center", width:55},
      ]
  },

  { title:"02/29/2024",  field:'fecha',hozAlign:"center",width:130, headerWordWrap:true,
    columns:[
        {title:"Sí", field:"si", hozAlign:"center", width:55},
        {title:"No", field:"no", hozAlign:"center", width:55},
      ]
  },
  { title:"03/01/2024",  field:'fecha',hozAlign:"center",width:130, headerWordWrap:true,
    columns:[
        {title:"Sí", field:"si", hozAlign:"center", width:55},
        {title:"No", field:"no", hozAlign:"center", width:55},
      ]
  },
  { title:"03/02/2024",  field:'fecha',hozAlign:"center",width:130, headerWordWrap:true,
    columns:[
        {title:"Sí", field:"si", hozAlign:"center", width:55},
        {title:"No", field:"no", hozAlign:"center", width:55},
      ]
  },
  
  { title:"Total Asistencias",  field:'asistencias',hozAlign:"center", width:130, headerWordWrap:true },
  { title:"Cumplimiento",  field:'cumplimiento',hozAlign:"center", width:130, headerWordWrap:true },
];

function customFormatter(cell){
  var row = cell.getRow().getData();
  var suma = 0;

  suma = parseFloat(row.llamada_tel) + parseFloat(row.visita) + parseFloat(row.cotizaciones) + parseFloat(row.asistencia_ad) + parseFloat(row.reunion_virt) + parseFloat(row.traslados) + parseFloat(row.otra);
  return suma;
}

var dataTable1 = [

  {
    "numero":'1',
    "tipo_documento":'N562206740672',
    "numero_identificacion":'1',
    "nombre":'LOPEZ RAMÍREZ EMILIANO',
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",
    "asistencias":'4',

    "cumplimiento":'MINIMO 70%',
  },
  {
    "numero":'2',
    "tipo_documento":'1245667745',
    "numero_identificacion":'4',
    "nombre":'PEMBERTHY CEBALLOS SAMANTHA',
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",
    "asistencias":'4',

    "cumplimiento":'MINIMO 70%',
  },
  {
    "numero":'3',
    "tipo_documento":'1245667746',
    "numero_identificacion":'4',
    "nombre":'SALAZAR LLANOS MARIANGEL',
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",
    "asistencias":'4',

    "cumplimiento":'MINIMO 70%',
  },
  {
    "numero":'4',
    "tipo_documento":'1245667746',
    "numero_identificacion":'4',
    "nombre":'VALEZ GUTIERREZ SIMON',
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",

    "asistencias":'4',

    "cumplimiento":'MINIMO 70%',
  },
  {
    "numero":'5',
    "tipo_documento":'1245667567',
    "numero_identificacion":'4',
    "nombre":'ZAPATA DUQUE MARIA ANTONIA',
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",
    "no":'0',
    "si":"1",

    "asistencias":'4',

    "cumplimiento":'MINIMO 70%',
  },
  {
    "numero":'Total refrigerios entregados:',
    
    "no":'0',
    "si":"5",
    "no":'0',
    "si":"5",
    "no":'0',
    "si":"5",
    "no":'0',
    "si":"5",


  },
  {
    "numero":'Firma representante Institución Educativa:',

  },
  
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

// GRÁFICOS

var data1 = {
  labels: ['Gerardo Robles Gutierres','Eduardo Lopez','Evelyn Calzada','Roman Ruíz','Verónica Dominguez'],
  datasets: [
    {
      label: 'Agendar Cita con Cliente',
      data: [11,26,13,10,10],
      backgroundColor: '#F39C12',
    },
    {
      label: 'Realizar Visita',
      data: [18,26,16,22,12],
      backgroundColor: '#229954',
    },
    {
      label: 'Seguimiento de Cotizaciones',
      data: [11,10,42,60,62],
      //dataTotal: [13,13,58,66,76],
      backgroundColor: '#5499C7',
    },
  ]
};

var options1 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Gestores por actividad',
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


var data2 = {
  labels: ['Gerardo Robles Gutierres','Eduardo Lopez','Evelyn Calzada','Roman Ruíz','Verónica Dominguez'],
  datasets: [
    {
      label: 'Tiempo extra',
      data: [11,26,13,10,10],
      backgroundColor: '#F39C12',
    },
    {
      label: 'Horas sin actividad',
      data: [18,26,16,22,12],
      backgroundColor: '#229954',
    },
    {
      label: 'Horas efectivas',
      data: [11,10,42,60,62],
      //dataTotal: [13,13,58,66,76],
      backgroundColor: '#5499C7',
    },
  ]
};

var options2 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Gestores por actividad',
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