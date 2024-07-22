var array_background = getPAlleteColors(4,4);
console.log(array_background)
var array_background = getPAlleteColors(6,4);
console.log(array_background)
var array_background = getPAlleteColors(7,4);
console.log(array_background)



var array_background = getPAlleteColors(10,12);
console.log(array_background)

//--Table Montajes Por Mes


var columsTable1 = [
  { title:"Folio", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
  url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
  target:"_blank",}, width:150},
  { title:"Cordon Sanitario", field:'cordon_sanitario',hozAlign:"left",width:250},
  { title:"No. Dispositivo", field:'no_dispositivo',hozAlign:"left",width:250},
  { title:"Condición Equipo", field:'condicion_equipo',hozAlign:"left",width:250},
  { title:"Condicion del Cebo", field:'condicion_cebo',hozAlign:"left",width:250},
  { title:"Acciones Realizadas", field:'acciones',hozAlign:"left",width:250},
  { title:"Consumo", field:'consumo',hozAlign:"left",width:250},
  { title:"Consumido Por", field:'consumido',hozAlign:"left",width:250},
  { title:"Observaciones", field:'observaciones',hozAlign:"left",width:250},
];

var dataTable1 = [
  {
    "folio": 1,
    "cordon_sanitario": "cordon 1",
    "no_dispositivo": 5,
    "condicion_equipo": "instalada/funcional",
    "condicion_cebo": "cebo completo",
    "acciones": "limpieza y monitoreo",
    "consumo":'Total',
    "consumido": "roedor",
    "observaciones": "Ninguna observación"
  },
  {
    "folio": 2,
    "cordon_sanitario": "cordon 2",
    "no_dispositivo": 7,
    "condicion_equipo": "desanclada",
    "condicion_cebo": "condicion adecuada",
    "acciones": "cambio de cebo",
    "consumo":'Total',
    "consumido": "hormiga",
    "observaciones": "Revisar próximo mes"
  },
  {
    "folio": 3,
    "cordon_sanitario": "cordon 3",
    "no_dispositivo": 2,
    "condicion_equipo": "instalada/funcional",
    "condicion_cebo": "consumo total",
    "acciones": "consumo total",
    "consumo":'Total',
    "consumido": "roedor",
    "observaciones": "Alta actividad"
  },
  {
    "folio": 4,
    "cordon_sanitario": "cordon 4",
    "no_dispositivo": 9,
    "condicion_equipo": "desanclada",
    "condicion_cebo": "cebo completo",
    "acciones": "limpieza y monitoreo",
    "consumo":'Total',
    "consumido": "hormiga",
    "observaciones": "Equipo desanclado"
  },
  {
    "folio": 5,
    "cordon_sanitario": "cordon 5",
    "no_dispositivo": 4,
    "condicion_equipo": "instalada/funcional",
    "condicion_cebo": "condicion adecuada",
    "acciones": "cambio de cebo",
    "consumo":'Total',
    "consumido": "roedor",
    "observaciones": "Monitoreo continuo"
  },
  {
    "folio": 6,
    "cordon_sanitario": "cordon 6",
    "no_dispositivo": 10,
    "condicion_equipo": "desanclada",
    "condicion_cebo": "consumo total",
    "acciones": "consumo total",
    "consumo":'Total',
    "consumido": "hormiga",
    "observaciones": "Necesita reparación"
  }
];


var data1 = {
  labels: ['Medio','Total','Nulo'],
  datasets: [
    {
      label: 'Valor',
      data: [25,10,20],
      backgroundColor: ["#F6FB7A","#B4E380","#88D66C"],
      borderColor: ["#F6FB7A","#B4E380","#88D66C"],
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
        text: 'Reporte de Consumo',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
      font: {
        size: 15
      }
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


var data2 = {"labels": ["Roedor"], "datasets": [{"label": "Valor", "data": [1], "backgroundColor": ["#F6FB7A", "#B4E380"], "borderColor": ["#F6FB7A", "#B4E380"]}]}


var setOptions2 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Reporte de Consumido',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
      font: {
        size: 15
      }
    }
  },
  scales: {
    y:{
      display:false,
    }
  },
};