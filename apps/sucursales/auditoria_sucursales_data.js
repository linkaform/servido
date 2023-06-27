//Datos Demo del Reporte Autitoria Sucursales
var array_background = getPAlleteColors(11,8);

var dataFirstElement = [
  {
    "total": 7,
    "score": 120.63,
    "sucursal": "Sucursal División Norte"
  },
  {
    "total": 1,
    "score": 91.12,
    "sucursal": "Sucursal División Nor-Oriente"
  },
  {
    "total": 1,
    "score": 65.91,
    "sucursal": "Sucursal División Sur"
  },
  {
    "total": 1,
    "score": 63.64,
    "sucursal": "Sucursal División Este"
  },
  {
    "total": 1,
    "score": 40.34,
    "sucursal": "Sucursal División Oeste"
  }
]

var dataSecondElement = [
  {
    "total": 8,
    "regional": "Fernanda Luis",
    "score": 113.5
  },
  {
    "total": 1,
    "regional": "Jose Alfonso",
    "score": 91.12
  },
  {
    "total": 1,
    "regional": "Josue Gonzalez",
    "score": 65.91
  },
  {
    "total": 1,
    "regional": "Misael Bañuelos ",
    "score": 40.34
  }
]

var dataThirdElement = [
  {
    "section_grade": 300,
    "total": 17,
    "pagina": "8. Crédito y Cobranza"
  },
  {
    "section_grade": 95,
    "total": 17,
    "pagina": "4. Gestión de Almacén"
  },
  {
    "section_grade": 94,
    "total": 17,
    "pagina": "3. Imagen Mantenimiento y Limpieza"
  },
  {
    "section_grade": 85,
    "total": 17,
    "pagina": "6. Logística y Ultima milla"
  },
  {
    "section_grade": 85,
    "total": 17,
    "pagina": "7. Gestión Documental"
  },
  {
    "section_grade": 84,
    "total": 17,
    "pagina": "1. Servicio y Experiencia"
  },
]

var dataFourthElement = [
    {
      "total": 1,
      "perfil": "Gerente",
      "score": 70.12
    },
    {
      "total": 1,
      "perfil": "Auditor",
      "score": 65.91
    },
    {
      "total": 1,
      "perfil": "Ceo",
      "score": 10.34
    }
]

var data5 = {
  labels: ['CEO 1','CEO 2','CEO 3','CEO 4','CEO 5'],
  datasets: [
    {
      label: 'Evaluaciones',
      data: [25,10,20,25,20],
      backgroundColor: array_background,
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
      color: 'white',
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



var columsTable1 = [
  { title:"Pregunta", field:'pregunta', hozAlign:"left",dir:"asc", headerFilter:"input",width:650},
  { title:"Item OK" , field:'items_ok', hozAlign:"center", width:250, },
  { title:"Items Bad", field:'items_bad', hozAlign:"center",width:200},
  { title:"Total", field:'total', hozAlign:"center",width:200},
  { title:"% Bad", field:'percentage_bad',hozAlign:"center",width:200}
];

var dataTable1 = [
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
]




var columsTable2 = [
  { title:"Unidad de Negocio", field:'sucursal', hozAlign:"left",width:650},
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


var dataTable2 = [
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