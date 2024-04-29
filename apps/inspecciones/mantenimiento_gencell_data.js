// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Mantenimiento", field:'mantenimiento',hozAlign:"left",width:235},
  { title:"Estatus ", field:'estatus',hozAlign:"left",width:230},
  { title:"Cantidad ", field:'cantidad',hozAlign:"left",width:100,  formatter: function(cell, formatterParams, onRendered) {
      var value = cell.getValue();
      var statusValue = cell.getData().estatus; // Obtener el valor de "Estatus" de la fila
      var bgColor = ''; // Color de fondo por defecto o basado en condiciones
      
      // Definir condiciones para cambiar el color de fondo
      if (statusValue === undefined || statusValue === null || statusValue === '') {
        // Aplicar negrita si "Estatus" está vacío
        return '<strong>' + value + '</strong>';
      } else {
        return value;
      }
    }},
  { title:"% Efectividad ", field:'efectividad',hozAlign:"left",width:130, formatter: function(cell, formatterParams, onRendered) {
      var value = cell.getValue();
      var bgColor = ''; // Color de fondo por defecto o basado en condiciones
      
      // Definir condiciones para cambiar el color de fondo
      if (value >= 75) {
        bgColor = 'green'; // Color verde claro para valores >= 80
      } else if (value >= 50 && value < 75) {
        bgColor = 'yellow'; // Color amarillo claro para valores entre 60 y 79
      } else if (value >= 0 && value < 50) {
        bgColor = 'red'; // Color coral claro para valores < 60
      }
      
      // Devolver el valor de la celda con el color de fondo aplicado
      if(value >= 0){
        return '<div style="background-color: ' + bgColor + '"><strong>' + value + '</strong></div>';
      }
    }},
];


var columsTable2 = [
  { title:"Cliente", field:'cliente',hozAlign:"left",width:300, headerWordWrap:true},
  { title:"Equipo", field:'equipo',hozAlign:"left",width:350, headerWordWrap:true},
  { title:"Marca ", field:'marca',hozAlign:"left",width:200, headerWordWrap:true},
  { title:"Modelo", field:'modelo',hozAlign:"left",width:250, headerWordWrap:true},
  { title:"Serie", field:'serie',hozAlign:"left",width:250, headerWordWrap:true},
  { title:"Proximo mantenimiento", field:'prox_mantenimiento',hozAlign:"left",width:150, headerWordWrap:true},
  { title:"Orden de trabajo Mantenimiento", field:'ord_trabajo',hozAlign:"left",width:150, headerWordWrap:true},
  { title:"Proxima calibración", field:'prox_calibracion',hozAlign:"left",width:150, headerWordWrap:true},
  { title:"Orden de trabajo Calibración", field:'ord_calibracion',hozAlign:"left",width:150, headerWordWrap:true},
];


var dataTable1 = [
  {
    mantenimiento: 'Preventivos',
    cantidad: 80,
    efectividad: 0,
    _children:[
    {estatus: 'Pendientes de Asignar',
    cantidad: 1,
    },
    {estatus: 'Asignados',
    cantidad: 5,
    },
    {estatus: 'Proceso',
    cantidad: 12,
    },
    {estatus: 'Atendido',
    cantidad: 5,
    },
    {estatus: 'Revisado',
    cantidad: 2,
    },
    {estatus: 'Finalizado',
    cantidad: 55,
    }
    ]
    
  },
  {
    mantenimiento: 'Diagnóstico ',
    cantidad: 45,
    efectividad: 44.44,
    _children:[
    {estatus: 'Pendientes de Asignar',
    cantidad: 1,
    },
    {estatus: 'Asignados',
    cantidad: 5,
    },
    {estatus: 'Proceso',
    cantidad: 11,
    },
    {estatus: 'Atendido',
    cantidad: 3,
    },
    {estatus: 'Revisado',
    cantidad: 5,
    },
    {estatus: 'Finalizado',
    cantidad: 20,
    }
    ]
    
  },

];

var dataTable2 = [
  {
    cliente: 'GEMMA BIO - LABORATORIO',
    equipo: 'FONOENDOSCOPIOS PDE-VT 250',
    marca: 'Littman',
    modelo: 'FCWSES2354',
    serie: 'SDQFG34433',
    prox_mantenimiento: '2024-08-09',
    ord_trabajo: 'Sí',
    prox_calibracion: '2024-08-09',
    ord_calibracion: 'Sí',
  },
    {
    cliente: 'FROZEN BELAB',
    equipo: 'MORTERO',
    marca: 'Enlermayer',
    modelo: 'Emend 4007',
    serie: 'G26605K',
    prox_mantenimiento: '2024-08-09',
    ord_trabajo: 'No',
    prox_calibracion: '2024-08-09',
    ord_calibracion: 'No',
  },
    {
    cliente: 'LABORATORIO UBIDE',
    equipo: 'TACOMETRO',
    marca: 'Renart',
    modelo: 'EOI457',
    serie: 'KDJHR8540934',
    prox_mantenimiento: '2024-08-11',
    ord_trabajo: 'Si',
    prox_calibracion: '2024-08-11',
    ord_calibracion: 'Sí',
  },
    {
    cliente: 'CENTRO MEDICO DEIVGLER',
    equipo: 'ELECTROCARDIOGRAFO',
    marca: 'Yenda',
    modelo:'OLFIVAC 34598',
    serie: 'KF8469G-E456',
    prox_mantenimiento: '2024-08-12',
    ord_trabajo: 'Sí',
    prox_calibracion: '2024-08-12',
    ord_calibracion: 'Sí',
  },
];

//Data pora el gráfico de barras
//var labels = ["Preventivos","Diagnóstico"]
var dataFirstElement = {
  labels: ['Prenventivos finalizados', 'Prenventivos en progreso', 'Diagnóstico finalizados', 'Diagnóstico en progreso'],
  datasets: [
    {
      backgroundColor: ['#6DF7D5', '#6DC0F7'],
      data: [55, 25],
    },
    {
      
      backgroundColor: ['#787FFA', '#C678FA'],
      data: [20],
    },
    
  ]
}; 

var dataSecondElement = {
  labels: ["Pedro Hernández","Pablo Gutierrez", "María Martínez"],
  datasets: [
    {
      label: "Visitas",
      backgroundColor: ["#7BD3EA", "#89B9AD", "#FFDBAA"],
      data: [50, 35, 48],
    },
    
  ]
}; 