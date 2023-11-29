var array_background = getPAlleteColors(3,8);
console.log(array_background)
//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Tipo de Servicio", field:'tipo_servicio',hozAlign:"left",width:250},
  { title:"Cliente",field:'cliente',hozAlign:"left",width:150 },
  { title:"Fecha Inicio", field:'fecha_inicio',hozAlign:"left",width:160 },
  { title:"Fecha Fin",field:'fecha_fin',hozAlign:"left",width:400 },
  { title:"Status",  field:'status',hozAlign:"left",width:160 },
  { title:"Equipo al que se le hizo servicio", field:'tecnico',hozAlign:"left",width:250 },
  { title:"Equipo",  field:'equipo',hozAlign:"left",width:160 },
  { title:"Contacto que lo usa ",field:'contacto_uso',hozAlign:"left",width:160 },
  { title:"Estatus", field:'status',hozAlign:"left",width:160 },
];

var dataTable1 = [
  {
    folio:"251-10626", 
    creado:"Moises Carrera",
    creacion:"20/7/2022",
    servicio:"Conexión remota",
    cliente:"Linkaform",
    contacto:"Misael",
    tecnico:"Moises Carrera",
    equipo:"Impresora",
    contacto_uso:"Jose",
    status:"Pendiente",
  },
];

var data1 = {
  labels: ['Gasto1','Gasto2','Gasto3','Gasto4'],
  datasets: [
    {
      label: 'Valor',
      data: [25,10,30,50],
      backgroundColor: array_background,
    },
  ]
};

var data2 = {
  labels: ['Gasto1','Gasto2','Gasto3','Gasto4'],
  datasets: [
    {
      label: 'Valor',
      data: [50,70,100,40],
      backgroundColor: array_background,
    },
  ]
};

var data3 = {
  labels: ['Deducible','No Deducible'],
  datasets: [
    {
      label: 'Valor',
      data: [70,30],
      backgroundColor: array_background,
    },
  ]
};

var data4 = {
  labels: ['Tipo1','Tipo2','Tipo3','Tipo4'],
  datasets: [
    {
      label: 'Valor',
      data: [70,30,70,30],
      backgroundColor: array_background,
    },
  ]
};

var data5 = {
  labels: ['Comida1','Comida2','Comida3'],
  datasets: [
    {
      label: 'Valor',
      data: [40,30,40],
      backgroundColor: array_background,
    },
  ]
};

var data6 = {
  labels: ['Metodo1','Metodo2','Metodo3','Metodo4','Metodo5'],
  datasets: [
    {
      label: 'Valor',
      data: [10,70,50,40,50],
      backgroundColor: array_background,
    },
  ]
};


var data7 = {
  labels: ['Gastos-Usuario1','Gastos-Usuario2','Gastos-Usuario3','Gastos-Usuario4','Gastos-Usuario5','Gastos-Usuario6','Gastos-Usuario7'],
  datasets: [
    {
      label: 'Valor',
      data: [10,70,50,40,50,20,80],
      backgroundColor: array_background,
    },
  ]
};

var data8 = {
  labels: ['Enero-2022','Febrero-2022','Marzo-2022','Abril-2022','Mayo-2022','Junio-2022','Julio-2022'],
  datasets: [
    {
      label: 'Ganancias',
      type: "line",
      borderColor: "#90afc5",
      data: [10,70,50,40,50,20,80],
      fill: false,
    },
    {
      label: 'Gastos',
      type: "line",
      borderColor: "#427490",
      data: [20,15,14,20,35,85,69],
      fill: false,
    },
  ]
};




var setOptions1 = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Gastos por Motivo',
      font: {
        size: 25
      }
    },
    legend: {
      display: true,
      position: 'top',
    },
    datalabels: {
      color: 'white',
    }
  },
};

var setOptions2 = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Gastos por Destino',
      font: {
        size: 25
      }
    },
    legend: {
      display: true,
      position: 'top',
    },
    datalabels: {
      color: 'white',
    }
  },
};

var setOptions3 = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Deducible vs No Deducible',
      font: {
        size: 25
      }
    },
    legend: {
      display: true,
      position: 'top',
    },
    datalabels: {
      color: 'white',
    }
  },
};

var setOptions4 = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Tipo de Gasto',
      font: {
        size: 25
      }
    },
    legend: {
      display: true,
      position: 'top',
    },
    datalabels: {
      color: 'white',
    }
  },
};

var setOptions5 = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Tipo de Comida',
      font: {
        size: 25
      }
    },
    legend: {
      display: true,
      position: 'top',
    },
    datalabels: {
      color: 'white',
    }
  },
};


var setOptions6 = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Metodo de Pago',
      font: {
        size: 25
      }
    },
    legend: {
      display: true,
      position: 'top',
    },
    datalabels: {
      color: 'white',
    }
  },
};

var setOptions7 = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Gastos Por Usuario',
      font: {
        size: 25
      }
    },
    legend: {
      display: true,
      position: 'top',
    },
    datalabels: {
      color: 'white',
    }
  },
};


var setOptions8 = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Gastos Por Mes',
      font: {
        size: 25
      }
    },
    legend: {
      display: true,
      position: 'top',
    },
    datalabels: {
      color: 'white',
    }
  },
};
