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
var columsTable1C = [
  { title:"Gestor", field:'gestor',hozAlign:"left",headerFilter:"input", width:150},
  { title:"Agendar Cita con Cliente",field:'agendar_cita',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },
  { title:"Realizar Visita", field:'visita',hozAlign:"right", width:130 },
  { title:"Seguimiento de Cotizaciones",field:'cotizaciones',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },
  { title:"Concretar Venta",  field:'venta',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0},width:130 },
  { title:"Seguimiento de Factura/Cobranza",  field:'factura',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },
  { title:"Elaboración de Reportes",  field:'reporte',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },

  { title:"Actualización de Base de Datos y Prospectos", field:'actualizacion_bd',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130},
  { title:"Weekends",field:'weekends',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },
  { title:"Garantia", field:'garantia',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },
  { title:"Traslado",field:'traslado',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },
  { title:"Capacitación",  field:'capacitacion',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },
  { title:"Servicio",  field:'servicio',hozAlign:"right",sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },
  { title:"Taller",  field:'taller',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },

  { title:"Comida", field:'comida',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },
  { title:"Asistencia Telefónica",field:'asistencia_telefonica',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },
  { title:"Entrega Material",  field:'entrega_material',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },
  { title:"Otra",  field:'otra',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },

  { title:"Total de actividades", field:'total_actividades',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130, formatter: customFormatter },
  { title:"Horas Efectivas",field:'horas_efectivas',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },
  { title:"Horas sin actividad ",  field:'horas_sin_actividad',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },
  { title:"Tiempo extra",  field:'tiempo_extra',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },

  { title:"% Efectividad",  field:'porcentaje_efectividad',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130},
  
];


var columsTable1 = [
  { title:"Gestor", field:'gestor',hozAlign:"left",headerFilter:"input", width:150},
  { title:"Llamadas y asistencias telefonicas",field:'llamada_tel',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130,headerPopup:"Llamadas y asistencias telefonicas"},
  { title:"Visita presencial", field:'visita',hozAlign:"right", width:130, headerPopup:"Visita presencial" },
  { title:"Cotizaciones",field:'cotizaciones',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },
  { title:"Asistencia administrativa",  field:'asistencia_ad',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0},width:130, headerPopup:"Asistencia administrativa" },
  { title:"Reuniones virtuales",  field:'reunion_virt',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130, headerPopup:"Reuniones virtuales" },
  { title:"Traslados",  field:'traslados',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },


  { title:"Otra",  field:'otra',hozAlign:"right", sorter:"number", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },

  { title:"Total de actividades", field:'total_actividades',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130, formatter: customFormatter, headerPopup:"Total de actividades" },
  { title:"Horas Efectivas",field:'horas_efectivas',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130,  headerPopup:"Horas Efectivas" },
  { title:"Horas sin actividad ",  field:'horas_sin_actividad',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130, headerPopup:"Horas sin actividad" },
  { title:"Tiempo extra",  field:'tiempo_extra',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130 },

  { title:"% Efectividad",  field:'porcentaje_efectividad',hozAlign:"right", bottomCalc:"sum", bottomCalcParams:{precision:0}, width:130},
  
];

function customFormatter(cell){
  var row = cell.getRow().getData();
  var suma = 0;

  suma = parseFloat(row.llamada_tel) + parseFloat(row.visita) + parseFloat(row.cotizaciones) + parseFloat(row.asistencia_ad) + parseFloat(row.reunion_virt) + parseFloat(row.traslados) + parseFloat(row.otra);
  return suma;
}

var dataTable1 = [

  {
    "gestor":'Ana de Reyes',
    "llamada_tel":'1',
    "visita":'4',
    "cotizaciones":'7',
    "asistencia_ad":'8',
    "reunion_virt":'8',

    "traslados":'7',
    "otra":'1',

    "total_actividades":'0',
    "horas_efectivas":'12',
    "horas_sin_actividad":'6',
    "tiempo_extra":'4',
  },
  {
    "gestor":'Pedro Altamirano',
    "llamada_tel":'2',
    "visita":'4',
    "cotizaciones":'6',
    "asistencia_ad":'5',
    "reunion_virt":'4',

    "traslados":'2',
    "otra":'2',

    "total_actividades":'0',
    "horas_efectivas":'12',
    "horas_sin_actividad":'6',
    "tiempo_extra":'4',
  },
  {
    "gestor":'Roman Ruíz',
    "llamada_tel":'2',
    "visita":'4',
    "cotizaciones":'7',
    "asistencia_ad":'7',
    "reunion_virt":'2',

    "traslados":'1',
    "otra":'7',
    "total_actividades":'0',
    "horas_efectivas":'12',
    "horas_sin_actividad":'6',
    "tiempo_extra":'4',
  },
  {
    "gestor":'Verónica Dominguez',
    "llamada_tel":'2',
    "visita":'3',
    "cotizaciones":'4',
    "asistencia_ad":'5',
    "reunion_virt":'5',

    "traslados":'3',
    "otra":'5',
    "total_actividades":'0',
    "horas_efectivas":'12',
    "horas_sin_actividad":'6',
    "tiempo_extra":'4',
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