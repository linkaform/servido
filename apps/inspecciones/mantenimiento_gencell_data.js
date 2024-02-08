// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Mantenimiento", field:'mantenimiento',hozAlign:"left",width:200},
  { title:"Estatus ", field:'estatus',hozAlign:"left",width:230},
  { title:"Cantidad ", field:'cantidad',hozAlign:"left",width:100},
  { title:"% Efectividad ", field:'efectividad',hozAlign:"left",width:100, formatter: function(cell, formatterParams, onRendered) {
      var value = cell.getValue();
      var bgColor = ''; // Color de fondo por defecto o basado en condiciones
      
      // Definir condiciones para cambiar el color de fondo
      if (value >= 80) {
        bgColor = 'green'; // Color verde claro para valores >= 80
      } else if (value >= 60 && value < 80) {
        bgColor = 'yellow'; // Color amarillo claro para valores entre 60 y 79
      } else {
        bgColor = 'red'; // Color coral claro para valores < 60
      }
      
      // Devolver el valor de la celda con el color de fondo aplicado
      if(value){
        return '<div style="background-color: ' + bgColor + '">' + value + '</div>';
      }
    }},
];


var columsTable2 = [
  { title:"Cliente", field:'cliente',hozAlign:"left",width:250},
  { title:"Equipo", field:'equipo',hozAlign:"left",width:250},
  { title:"Marca ", field:'marca',hozAlign:"left",width:200},
  { title:"Modelo", field:'modelo',hozAlign:"left",width:250},
  { title:"Serie", field:'serie',hozAlign:"left",width:250},
  { title:"Proximo mantenimiento", field:'prox_mantenimiento',hozAlign:"right",width:180},
  { title:"Orden de trabajo programada", field:'ord_trabajo',hozAlign:"right",width:100},

];


var dataTable1 = [
  {
    mantenimiento: 'Preventivos',
    cantidad: 80,
    efectividad: 68.75,
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
    cliente: 'GENCELL PHARMA - LABORATORIO',
    equipo: 'TRANSFERENCIA AUTOMATIZADA DE MUESTRAS DE ALTO RENDIMIENTO',
    marca: 'MGI',
    modelo: 'MGISTP-7000',
    serie: 'C2300710220038',
    prox_mantenimiento: '2024-08-08',
    ord_trabajo: 'Sí',
  },
    {
    cliente: 'BIOMEDICA',
    equipo: 'MICROPIPETA',
    marca: 'Eppendorf',
    modelo: 'Research plus (120-1200µL)',
    serie: 'G26605K',
    prox_mantenimiento: '2024-08-09',
    ord_trabajo: 'No',
  },
    {
    cliente: 'LABORATORIO DE SALUD PUBLICA',
    equipo: 'MICROCENTRIFUGA',
    marca: 'Bioneer',
    modelo: 'EXISPIN',
    serie: '1021520100245',
    prox_mantenimiento: '2024-08-10',
    ord_trabajo: 'Si',
  },
    {
    cliente: 'CLINICA IBEROAMERICA',
    equipo: 'TERMOCICLADOR EN TIEMPO REAL',
    marca: 'Bioneer',
    modelo: 'EXICYCLER 96',
    serie: 'EXI96V4-05N-BXE020',
    prox_mantenimiento: '2024-08-11',
    ord_trabajo: 'Sí',
  },
];

//Data pora el gráfico de barras
var dataFirstElement = {
  labels: ["Preventivos","Diagnóstico"],
  datasets: [
    {
      
      backgroundColor: ['#1DD3E1', '#FF8F8F'],
      data: [80,45],
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