// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Cliente", field:'nombre_cliente',hozAlign:"left",headerTooltip:true,width:250},
  { title:"Tarifa Profesional", field:'tarifa_profesional',hozAlign:"right",headerTooltip:true,formatter:"money", formatterParams:{decimal:",",symbol:"$"},bottomCalc:"sum", bottomCalcParams:{precision:2},width:150},
  { title:"Total Horas", field:'total_horas',hozAlign:"right",headerTooltip:true,bottomCalc:"sum", bottomCalcParams:{precision:2},width:150},
  { title:"$ Costo Total", field:'total_costo',hozAlign:"right",headerTooltip:true,formatter:"money", formatterParams:{decimal:",",symbol:"$"},bottomCalc:"sum", bottomCalcParams:{precision:2},width:150},
];



var dataTable1 = [
  {
    "cliente":'Cliente 1',
    "tarifa_profesional":'16.3',
    "total_costo":'815',
  },
    {
    "cliente":'Cliente 1',
    "tarifa_profesional":'16.3',
    "total_costo":'815',
  },
    {
    "cliente":'Cliente 1',
    "tarifa_profesional":'16.3',
    "total_costo":'815',
  },
    {
    "cliente":'Cliente 1',
    "tarifa_profesional":'16.3',
    "total_costo":'815',
  },
    {
    "cliente":'Cliente 1',
    "tarifa_profesional":'16.3',
    "total_costo":'815',
  },
    {
    "cliente":'Cliente 1',
    "tarifa_profesional":'16.3',
    "total_costo":'815',
  },
    {
    "cliente":'Cliente 1',
    "tarifa_profesional":'16.3',
    "total_costo":'815',
  },
    {
    "cliente":'Cliente 1',
    "tarifa_profesional":'16.3',
    "total_costo":'815',
  },
]


var columsTable2 = [
  { title:"Fecha de Creación", field:'fecha_creacion',hozAlign:"left",headerTooltip:true,headerFilter:"input",width:150},
  { title:"Responsable", field:'responsable',hozAlign:"left",headerTooltip:true,headerFilter:"input",width:150},
  { title:"Nombre del proyecto", field:'nombre_proyecto',hozAlign:"left",headerTooltip:true,width:500},
  { title:"Nombre del cliente", field:'nombre_cliente',hozAlign:"left",headerTooltip:true,headerFilter:"input",width:200},
  { title:"Tarifa Profesional", field:'tarifa_profesional',hozAlign:"left",headerTooltip:true,width:150},
  { title:"Tipo de trabajo", field:'tipo_trabajo',hozAlign:"left",headerTooltip:true,width:150},
  { title:"Status", field:'status',hozAlign:"left",headerTooltip:true,width:100},
  { title:"Estimación de Horas", field:'estimacion_horas',hozAlign:"left",headerTooltip:true,width:100},
  { title:"Total Horas", field:'total_horas',hozAlign:"left",headerTooltip:true,width:100},
  { title:"Fecha compromiso de entrega", field:'fecha_estimacion',hozAlign:"left",headerTooltip:true,width:100},
  { title:"Fecha de entrega", field:'fecha_entrega',hozAlign:"left",headerTooltip:true,width:100},
];



var dataTable2 = [
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
  {
    "fecha_creacion":'2023-05-01',
    "responsable":'Josue',
    "nombre_proyecto":'Proyecto 1',
    "nombre_cliente":'Cliente 1',
    "tarifa_profesional":'50',
    "tipo_trabajo": 'Tarea Cliente',
    "tipo_facturacion": 'No Facturable',
    "tipo_trabajo": 'Script',
    "tarea":'Corrección de Bug en Tarea',
    "descripcion": 'Corrección de Bugs',
    "status": 'Terminada',
    "estimacion_horas": '1.6',
    "total_horas": '0.6',
    "fecha_estimacion": '2023-06-05',
    "fecha_entrega": '2023-06-01',
    "trabajo_realizado": ['Trabajo 1', 'Trabajo 2', 'Trabajo 3'],
  },
];

//----- CONFIG GRAPHIC
var data1 = {
  labels: ['Cliente 1','Cliente 2','Cliente 3','Cliente 4'],
  datasets: [
    {
      label: 'Porcentaje',
      data: [10,15,15,20,40],
      backgroundColor: ['#22A699','#F2BE22','#F29727','#F24C3D'],
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
        text: 'Reporte Porcentual',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
      font: {
        size: 12
      },
      formatter: function (value, context){
        return value + '%';
      }
    }
  },

};



var data2 = {
  labels: ['Ene-23','Feb-23','Mar-23','Abr-23','May-23','Jun-23'],
  datasets: [
    {
      label: 'Apymsa',
      data: [50,10,30,50,60,10],
      backgroundColor: '#22A699',
    },
    {
      label: 'Ceint Peru',
      data: [10,20,30,50,60,10],
      backgroundColor: '#F2BE22',
    },
    {
      label: 'Tecavan',
      data: [70,30,30,50,60,10],
      backgroundColor: '#F29727',
    },

    {
      label: 'AIGP',
      data: [90,40,30,50,60,10],
      backgroundColor: '#F24C3D',
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
        text: 'Reporte Mensual',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
      font: {
        size: 12
      },
    }
  },
};

