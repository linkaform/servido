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

function customFormatter(cell){
  var row = cell.getRow().getData();
  var suma = 0;

  suma = parseFloat(row.agendar_cita) + parseFloat(row.visita) + parseFloat(row.cotizaciones) + parseFloat(row.venta) + parseFloat(row.factura) + parseFloat(row.reporte) + parseFloat(row.actualizacion_bd) + parseFloat(row.weekends) + parseFloat(row.garantia) + parseFloat(row.traslado) + parseFloat(row.capacitacion) + parseFloat(row.servicio) + parseFloat(row.taller) + parseFloat(row.comida) + parseFloat(row.asistencia_telefonica) + parseFloat(row.entrega_material) + parseFloat(row.otra);
  return suma;
}

var dataTable1 = [

  {
    "gestor":'Ana de Reyes',
    "agendar_cita":'1',
    "visita":'4',
    "cotizaciones":'7',
    "venta":'8',
    "factura":'8',

    "reporte":'7',
    "actualizacion_bd":'2',
    "weekends":'1',
    "garantia":'5',
    "traslado":'7',
    "capacitacion":'4',

    "servicio":'2',
    "taller":'5',
    "comida":'3',
    "asistencia_telefonica":'5',
    "entrega_material":'6',
    "otra":'1',

    "horas_efectivas":'12',
    "horas_sin_actividad":'6',
    "tiempo_extra":'4',
  },
  {
    "gestor":'Pedro Altamirano',
    "agendar_cita":'2',
    "visita":'4',
    "cotizaciones":'6',
    "venta":'5',
    "factura":'4',

    "reporte":'2',
    "actualizacion_bd":'2',
    "weekends":'3',
    "garantia":'4',
    "traslado":'6',
    "capacitacion":'7',

    "servicio":'7',
    "taller":'2',
    "comida":'8',
    "asistencia_telefonica":'5',
    "entrega_material":'5',
    "otra":'2',

    "horas_efectivas":'12',
    "horas_sin_actividad":'6',
    "tiempo_extra":'4',
  },
  {
    "gestor":'Roman Ruíz',
    "agendar_cita":'2',
    "visita":'4',
    "cotizaciones":'7',
    "venta":'7',
    "factura":'2',

    "reporte":'1',
    "actualizacion_bd":'2',
    "weekends":'3',
    "garantia":'2',
    "traslado":'3',
    "capacitacion":'2',

    "servicio":'7',
    "taller":'7',
    "comida":'1',
    "asistencia_telefonica":'7',
    "entrega_material":'2',
    "otra":'7',

    "horas_efectivas":'12',
    "horas_sin_actividad":'6',
    "tiempo_extra":'4',
  },
  {
    "gestor":'Verónica Dominguez',
    "agendar_cita":'2',
    "visita":'3',
    "cotizaciones":'4',
    "venta":'5',
    "factura":'5',

    "reporte":'3',
    "actualizacion_bd":'2',
    "weekends":'3',
    "garantia":'4',
    "traslado":'5',
    "capacitacion":'5',

    "servicio":'4',
    "taller":'2',
    "comida":'3',
    "asistencia_telefonica":'4',
    "entrega_material":'5',
    "otra":'5',

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