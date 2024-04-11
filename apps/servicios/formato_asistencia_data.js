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


// Define lookup function
function paramLookup(cell) {
    // Haz algún procesamiento para obtener las opciones del filtro
    var options = [
        { label: "Green", value: "green" },
        { label: "Red", value: "red" },
        { label: "Blue", value: "blue" }
    ];

    // Devuelve un objeto que incluye las opciones del filtro
    return {
        // Utiliza el nombre de la columna como clave del objeto
        [cell.getColumn().getField()]: options
    };
}

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"No.", field:'numero',hozAlign:"center", width:100, headerWordWrap:true, formatter: "textarea", // Esto asegura que el contenido sea tratado como un área de texto
    cellClick:function(e, cell){
        // Hacer algo al hacer clic en la celda, si es necesario
    },
    whiteSpace: "pre-wrap" // Esto permite saltos de línea dentro de la celda
  },
  { title:"Institución Educativa",field:'institucion',hozAlign:"center", width:150, headerWordWrap:true },
  { title:"Grupo",field:'grupo',hozAlign:"center", width:100, headerWordWrap:true },
  { title:"Tipo Documento",field:'tipo_documento',hozAlign:"center", width:170, headerWordWrap:true },
  { title:"Número identificación", field:'numero_identificacion',hozAlign:"center", width:150, headerWordWrap:true },
  { title:"Nombres y Apellidos del estudiante",field:'nombre',hozAlign:"left", width:300, headerWordWrap:true },
  
  { title:"02/28/2024",  field:'fecha',hozAlign:"center",width:140, headerWordWrap:true,
    columns:[
        {title:"Sí", field:"si1", hozAlign:"center", width:55},
        {title:"No", field:"no1", hozAlign:"center", width:55},
      ]
  },

  { title:"02/29/2024",  field:'fecha',hozAlign:"center",width:130, headerWordWrap:true,
    columns:[
        {title:"Sí", field:"si2", hozAlign:"center", width:55},
        {title:"No", field:"no2", hozAlign:"center", width:55},
      ]
  },
  { title:"03/01/2024",  field:'fecha',hozAlign:"center",width:130, headerWordWrap:true,
    columns:[
        {title:"Sí", field:"si3", hozAlign:"center", width:55},
        {title:"No", field:"no3", hozAlign:"center", width:55},
      ]
  },
  { title:"03/02/2024",  field:'fecha',hozAlign:"center",width:130, headerWordWrap:true,
    columns:[
        {title:"Sí", field:"si4", hozAlign:"center", width:55},
        {title:"No", field:"no4", hozAlign:"center", width:55},
      ]
  },
  
  { title:"Total Asistencias",  field:'asistencias',hozAlign:"center", width:130, headerFilter: "input", headerWordWrap:true },
  { title:"% de Cumplimiento",  field:'cumplimiento',hozAlign:"center", width:130, headerWordWrap:true, headerFilter: "input", formatter:function(cell){
    var value = cell.getValue();

    if (value <= 69) {
          cell.getElement().style.backgroundColor = "#C0392B ";
      } else if (value >= 70 && value <= 85) {
          cell.getElement().style.backgroundColor = "#D4AC0D ";
      } else if (value >= 86 && value <= 100) {
          cell.getElement().style.backgroundColor = "#45B39D";
      }
    
    return value + "%"
  }},
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
    "institucion":'I.E. Pedro',
    "grupo":'Grupo 1',
    "tipo_documento":'N562206740672',
    "numero_identificacion":'1',
    "nombre":'LOPEZ RAMÍREZ EMILIANO',
    "no1":'0',
    "si1":"",
    "no2":'',
    "si2":"1",
    "no3":'',
    "si3":"1",
    "no4":'',
    "si4":"1",
    "asistencias":'4',

    "cumplimiento":70,
  },
  {
    "numero":'2',
    "institucion":'I.E. Pedro',
    "grupo":'Grupo 1',
    "tipo_documento":'1245667745',
    "numero_identificacion":'4',
    "nombre":'PEMBERTHY CEBALLOS SAMANTHA',
    "no1":'0',
    "si1":"1",
    "no2":'0',
    "si2":"1",
    "no3":'0',
    "si3":"1",
    "no4":'0',
    "si4":"1",
    "asistencias":'4',

    "cumplimiento":80,
  },
  {
    "numero":'3',
    "institucion":'I.E. Pedro',
    "grupo":'Grupo 1',
    "tipo_documento":'1245667746',
    "numero_identificacion":'4',
    "nombre":'SALAZAR LLANOS MARIANGEL',
    "no1":'0',
    "si1":"1",
    "no2":'0',
    "si2":"1",
    "no3":'0',
    "si3":"1",
    "no4":'0',
    "si4":"1",
    "asistencias":'4',

    "cumplimiento":90,
  },
  {
    "numero":'4',
    "institucion":'I.E. Pedro',
    "grupo":'Grupo 1',
    "tipo_documento":'1245667746',
    "numero_identificacion":'4',
    "nombre":'VALEZ GUTIERREZ SIMON',
    "no1":'0',
    "si1":"1",
    "no2":'0',
    "si2":"1",
    "no3":'0',
    "si3":"1",
    "no4":'0',
    "si4":"1",

    "asistencias":'4',

    "cumplimiento":70,
  },
  {
    "numero":'5',
    "institucion":'I.E. Pedro',
    "grupo":'Grupo 1',
    "tipo_documento":'1245667567',
    "numero_identificacion":'4',
    "nombre":'ZAPATA DUQUE MARIA ANTONIA',
    "no1":'0',
    "si1":"1",
    "no2":'0',
    "si2":"1",
    "no3":'0',
    "si3":"1",
    "no4":'0',
    "si4":"1",

    "asistencias":'4',

    "cumplimiento":70,
  },
  {
    "numero":'Total:',
    
    "no":'0',
    "si":"5",
    "no":'0',
    "si":"5",
    "no":'0',
    "si":"5",
    "no":'0',
    "si":"5",


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