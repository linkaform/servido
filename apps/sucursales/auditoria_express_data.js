//-----TABLAS
var columsTable1 = [
  { title:"Unidad de Negocio", field:'sucursal', hozAlign:"left",width:650},
  { title:"Folio", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
    url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
    target:"_blank",}, width:150},
  { title:"Fecha", field:'fecha', hozAlign:"left",width:150},
  { title:"Score" , field:'score',formatter:function(cell){
      var value = cell.getValue();
      if (value >= 80){
        cell.getElement().style.backgroundColor = "#27ae60";
      }
      else if(value >= 60 && value <=79.999 ){
        cell.getElement().style.backgroundColor = "#f1c40f";
      }
      else if(value <=59.9999 ){
        cell.getElement().style.backgroundColor = "#e74c3c";
      }
      return value + '%';
    },
    hozAlign:"right", dir:"asc", width:150 
  },
];

var dataTable1 = [
  {
    "sucursal": "Ciudad Juarez Torres",
    "score": 89.8,
  },
  {
    "sucursal": "Ciudad Juarez Torres",
    "score": 89.8,
  },
  {
    "sucursal": "Ciudad Juarez Torres",
    "score": 89.8,
  },
  {
    "sucursal": "Ciudad Juarez Torres",
    "score": 89.8,
  },
  {
    "sucursal": "Ciudad Juarez Torres",
    "score": 89.8,
  },
  {
    "sucursal": "Ciudad Juarez Torres",
    "score": 89.8,
  },
  {
    "sucursal": "Ciudad Juarez Torres",
    "score": 89.8,
  },
  {
    "sucursal": "Ciudad Juarez Torres",
    "score": 89.8,
  },
]


var columsTable2 = [
  { title:"Pregunta", field:'pregunta', hozAlign:"left",dir:"asc", headerFilter:"input",width:650},
  { title:"Item OK" , field:'items_ok', hozAlign:"center", width:250, },
  { title:"Items Bad", field:'items_bad', hozAlign:"center",width:200},
  { title:"Total", field:'total', hozAlign:"center",width:200},
  { title:"% Bad", field:'percentage_bad',hozAlign:"center",width:200}
];

var dataTable2 = [
  {
    "percentage_bad": "100%",
    "items_ok": 0,
    "pregunta": "2-9. Encuestas de clima laboral al personal",
    "total": 17,
    "items_bad": 17
  },
  {
    "percentage_bad": "53%",
    "items_ok": 8,
    "pregunta": "2-3. Se cumple el plan de capacitación en Campus",
    "total": 17,
    "items_bad": 9
  },
  {
    "percentage_bad": "53%",
    "items_ok": 8,
    "pregunta": "7-1. Cuestionario Colaborador 1",
    "total": 17,
    "items_bad": 9
  },
  {
    "percentage_bad": "47%",
    "items_ok": 9,
    "pregunta": "2-6. Se ejecuta el programa de onboarding para colaboradores de nuevo ingreso",
    "total": 17,
    "items_bad": 8
  },
  {
    "percentage_bad": "54%",
    "items_ok": 6,
    "pregunta": "8-5. Validación de caja chica y fondo fijo",
    "total": 13,
    "items_bad": 7
  },
  {
    "percentage_bad": "41%",
    "items_ok": 10,
    "pregunta": "3-6. Área de Lógistica",
    "total": 17,
    "items_bad": 7
  },
  {
    "percentage_bad": "41%",
    "items_ok": 10,
    "pregunta": "6-2. Muestreo de 2 pedidos",
    "total": 17,
    "items_bad": 7
  },
  {
    "percentage_bad": "18%",
    "items_ok": 14,
    "pregunta": "5-1. Revisión Inventario",
    "total": 17,
    "items_bad": 3
  },
  {
    "percentage_bad": "12%",
    "items_ok": 15,
    "pregunta": "2-5. Se cumplen con las evaluaciones de desempeño anual del personal",
    "total": 17,
    "items_bad": 2
  },
  {
    "percentage_bad": "12%",
    "items_ok": 15,
    "pregunta": "2-2. La sucursal cuenta con cobertura completa",
    "total": 17,
    "items_bad": 2
  },
];

//-----GRAFICAS
var data1 = {
  labels: ['Ciudad Juarez Oscar Flores','Ciudad Victoria','Merida Canek','Forum Tlaquepaque','Cordoba','Pachuca'],
  datasets: [
    {
      label: 'Evaluaciones',
      data: [90,80,70,60,40,30],
      numData: [9,8,7,6,4,3],
      backgroundColor: ['#27ae60','#27ae60','#f1c40f','#f1c40f','#e74c3c','#e74c3c'],
    },
  ]
};

var setOptions1 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Evaluaciones por Unidad de Negocio',
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
        numRegistros = context.dataset.numData[context.dataIndex]
        return value + '% / ' + numRegistros;
      }
    }
  },
};


var data2 = {
  labels: ['Monica Contreras Carranza','Pedro Manuel Miron Domingue','Roberto Torres','Luis Arnulfo Gonzalez',
  'Yessica Evelin Serrano Torres','Nichiren Iglesias','Fernanda Chavez Cardenas','Igor Ivan Vega Molina','Gloria Rodriguez Villaseca'],
  datasets: [
    {
      label: 'Evaluaciones',
      data: [80,79,78,74,71,67,52,51,47],
      numData: [5,67,67,67,67,67,67,67,67],
      backgroundColor: ['#27ae60','#f1c40f','#f1c40f','#f1c40f','#f1c40f','#f1c40f','#e74c3c','#e74c3c','#e74c3c'],
    },
  ]
};

var setOptions2 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Evaluaciones por regional',
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
        numRegistros = context.dataset.numData[context.dataIndex]
        return value + '% / ' + numRegistros;
      }
    }
  },
};


var data3 = {
  labels: ['5. Revisión Inventario','8. Crédito y Cobranza','4. Gestión de Almacén','1. Servicio y Experiencia',
  '3. Imagen Mantenimiento y Limpieza','2. Mi equipo APYMSA','9.- División Talleres','6. Logística y Ultima milla','7. Gestión Documental'],
  datasets: [
    {
      label: 'Evaluaciones',
      data: [80,79,78,74,71,67,52,51,47],
      numData: [5,67,67,67,67,67,67,67,67],
      backgroundColor: ['#27ae60','#f1c40f','#f1c40f','#f1c40f','#f1c40f','#f1c40f','#e74c3c','#e74c3c','#e74c3c'],
    },
  ]
};

var setOptions3 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Evaluaciones por sección',
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
        numRegistros = context.dataset.numData[context.dataIndex]
        return value + '% / ' + numRegistros;
      }
    }
  },
};


var data4 = {
  labels: ['Auditor','Gerente de Unidad de Negocio','Regional Operativo'],
  datasets: [
    {
      label: 'Evaluaciones',
      data: [74,70,56],
      numData: [5,40,22],
      backgroundColor: ['#e74c3c','#e74c3c','#e74c3c'],
    },
  ]
};

var setOptions4 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Evaluaciones por perfil',
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
        numRegistros = context.dataset.numData[context.dataIndex]
        return value + '% / ' + numRegistros;
      }
    }
  },
};


var data5 = {
  labels: ['CEO 1','CEO 2','CEO 3','CEO 4','CEO 5'],
  datasets: [
    {
      label: 'Evaluaciones',
      data: [25,10,20,25,20],
      backgroundColor: ['#27ae60','#27ae60','#27ae60','#27ae60','#27ae60'],
    },
  ]
};

var setOptions5 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Reporte de Evaluaciones CEO',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'black',
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