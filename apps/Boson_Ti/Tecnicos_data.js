//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'card', col: '6', id:'cardFirst', title:'Ordenes Completadas', hexadecimal:'#FFC133'},
            { type:'card', col: '6', id:'cardSecond', title:'Ordenes Pendientes', hexadecimal:'#FF8D33'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '12', id:'chartFirst', title:'Ordenes X Técnico'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartSecond', title:'Ordenes X Status'},
            { type:'chart', col: '6', id:'chartThird', title:'Ordenes X Tipo'},
            { type:'chart', col: '4', id:'chartFourth', title:'Ranking de Técnicos'},
            { type:'chart', col: '8', id:'chartFiveth', title:'Ordenes X Cliente'},
        ] 
    },
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Detalle de Técnicos', optionExpanded:true},
        ] 
    },
];

//----Config Table
let columsTable1Prod = [
    { title:"Folio", field:'folio',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Técnico",field:'tecnico',headerTooltip: true,hozAlign:"left",headerFilter:true, width:200},
    { title:"Zona",field:'zona',headerTooltip: true,hozAlign:"left", headerFilter:true, width:150},
    { title:"Cliente",field:'cliente',headerTooltip: true,hozAlign:"left", headerFilter:true, width:250},
    { title:"Tipo",field:'tipo',headerTooltip: true,hozAlign:"left", headerFilter:true, width:150},
    { title:"Hora Inicio",field:'hora_inicio',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Hora Fin",field:'hora_fin',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Hora Efectivas",field:'horas_efectivas',headerTooltip: true,hozAlign:"center", width:180},
    { title:"Total Pendientes",field:'total_pendientes',headerTooltip: true,hozAlign:"center", width:180},
    { title:"Total Cerradas",field:'total_cerradas',headerTooltip: true,hozAlign:"center", width:180},
    { title:"% de Productividad",field:'percentage',headerTooltip: true,hozAlign:"center", width:230},
];


const dataTable1 =  [
    { 
        "tecnico": "Juan Pérez", "zona": "Norte", "cliente": "Empresa A", 
        "tipo": "Maquinaria", "horas_efectivas": 5, "total_pendientes": 1, "total_cerradas": 2, "percentage": 66,
        "_children": [
            {"folio":"15-3511","hora_inicio": "08:00", "hora_fin": "12:30", "horas_efectivas": 4.5},
            {"folio":"15-3511","hora_inicio": "09:00", "hora_fin": "10:00", "horas_efectivas": 1}
        ]
    },
    { 
        "tecnico": "María López", "zona": "Sur", "cliente": "Empresa B", 
        "tipo": "Construcción", "horas_efectivas": 7, "total_pendientes": 0, "total_cerradas": 3, "percentage": 100,
        "_children": [
            {"folio":"15-1324","hora_inicio": "07:30", "hora_fin": "11:30", "horas_efectivas": 4},
            {"folio":"15-1324","hora_inicio": "12:00", "hora_fin": "14:00", "horas_efectivas": 2},
            {"folio":"15-1324","hora_inicio": "15:00", "hora_fin": "16:00", "horas_efectivas": 1}
        ]
    },
    { 
        "tecnico": "Carlos Ramírez", "zona": "Este", "cliente": "Empresa C", 
        "tipo": "Electrónica", "horas_efectivas": 6, "total_pendientes": 2, "total_cerradas": 1, "percentage": 33,
        "_children": [
            {"folio":"15-12489","hora_inicio": "08:15", "hora_fin": "12:00", "horas_efectivas": 3.75},
            {"folio":"15-12489","hora_inicio": "13:00", "hora_fin": "15:30", "horas_efectivas": 2.5}
        ]
    },
    { 
        "tecnico": "Ana Torres", "zona": "Oeste", "cliente": "Empresa D", 
        "tipo": "Automotriz", "horas_efectivas": 8, "total_pendientes": 1, "total_cerradas": 4, "percentage": 80,
        "_children": [
            {"folio":"15-7895","hora_inicio": "06:00", "hora_fin": "10:00", "horas_efectivas": 4},
            {"folio":"15-7895","hora_inicio": "11:00", "hora_fin": "15:00", "horas_efectivas": 4}
        ]
    },
    { 
        "tecnico": "Luis Gómez", "zona": "Centro", "cliente": "Empresa E", 
        "tipo": "Agrícola", "horas_efectivas": 4, "total_pendientes": 1, "total_cerradas": 2, "percentage": 50,
        "_children": [
            {"folio":"15-235457","hora_inicio": "09:00", "hora_fin": "11:30", "horas_efectivas": 2.5},
            {"folio":"15-235457","hora_inicio": "13:30", "hora_fin": "15:00", "horas_efectivas": 1.5}
        ]
    },
    { 
        "tecnico": "Javier Medina", "zona": "Norte", "cliente": "Empresa F", 
        "tipo": "Médica", "horas_efectivas": 5.5, "total_pendientes": 2, "total_cerradas": 1, "percentage": 33,
        "_children": [
            {"folio":"15-235457","hora_inicio": "07:00", "hora_fin": "09:30", "horas_efectivas": 2.5},
            {"folio":"15-235457","hora_inicio": "10:30", "hora_fin": "13:30", "horas_efectivas": 3}
        ]
    },
    { 
        "tecnico": "Beatriz Salgado", "zona": "Sur", "cliente": "Empresa G", 
        "tipo": "Industrial", "horas_efectivas": 6.5, "total_pendientes": 1, "total_cerradas": 3, "percentage": 75,
        "_children": [
            {"folio":"15-12343","hora_inicio": "06:30", "hora_fin": "10:00", "horas_efectivas": 3.5},
            {"folio":"15-12343","hora_inicio": "11:30", "hora_fin": "15:00", "horas_efectivas": 3}
        ]
    },
    { 
        "tecnico": "Raúl Ortega", "zona": "Este", "cliente": "Empresa H", 
        "tipo": "Alimenticia", "horas_efectivas": 7, "total_pendientes": 0, "total_cerradas": 3, "percentage": 100,
        "_children": [
            {"folio":"15-12343","hora_inicio": "07:00", "hora_fin": "11:00", "horas_efectivas": 4},
            {"folio":"15-12343","hora_inicio": "12:30", "hora_fin": "15:30", "horas_efectivas": 3}
        ]
    },
    { 
        "tecnico": "Gabriela Ríos", "zona": "Oeste", "cliente": "Empresa I", 
        "tipo": "Farmacéutica", "horas_efectivas": 5, "total_pendientes": 1, "total_cerradas": 2, "percentage": 66,
        "_children": [
            {"folio":"15-15476","hora_inicio": "08:00", "hora_fin": "12:00", "horas_efectivas": 4},
            {"folio":"15-15476","hora_inicio": "14:00", "hora_fin": "15:00", "horas_efectivas": 1}
        ]
    },
    { 
        "tecnico": "Fernando Castillo", "zona": "Centro", "cliente": "Empresa J", 
        "tipo": "Telecomunicaciones", "horas_efectivas": 6, "total_pendientes": 2, "total_cerradas": 1, "percentage": 33,
        "_children": [
            {"folio":"15-15476","hora_inicio": "07:30", "hora_fin": "10:30", "horas_efectivas": 3},
            {"folio":"15-15476","hora_inicio": "12:00", "hora_fin": "15:00", "horas_efectivas": 3}
        ]
    }
];


//-----Configuiraciónes de las graficas
var setOptions1 = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
          display: false,
      },
      datalabels: {
        color: 'black',
        font: {
            size: 15
        }
      }
    },
    maintainAspectRatio: false ,
    scales: {
    y: {
        step: 1,
    }
  },
};

let dataChart1 = {
    labels: ['Técnico 1','Técnico 2','Técnico 3','Técnico 4','Técnico 5'],
    datasets: [
        {
            label: 'Ordenes Pendientes',
            data: [135, 120, 140, 110, 125],
            fill: false,
        },
        {
            label: 'Ordenes Completadas',
            data: [90, 100, 95, 105, 110],
            fill: false,
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
            display: false,
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
            }
        }
    },
    maintainAspectRatio: false ,
    scales: {
        y: {
            display: false,
        },
        x: {
            display: false,
        }
    },
};

let dataChart2 = {
    labels: ['Completadas','En Progreso','Pendientes'],
    datasets: [
        {
            label: 'Ordenes',
            data: [135, 120, 140],
            fill: false,
            backgroundColor: ['#3498db', '#2773a5', '#1b4f72']
        },
    ]
};

var setOptions3 = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: false,
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
            }
        }
    },
    maintainAspectRatio: false ,
    scales: {
        y: {
            display: false,
        },
        x: {
            display: false,
        }
    },
};

let dataChart3 = {
    labels: ['Instalación','Mantenimiento Correctivo','Maquínaria','Electroníca','Automotríz'],
    datasets: [
        {
            label: 'Total',
            data: [75, 41, 23, 56, 78,],
            fill: false,
            backgroundColor: ['#3498db', '#2773a5', '#1b4f72']
        },
    ]
};

var setOptions4 = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
          display: false,
      },
      datalabels: {
        color: 'black',
        font: {
            size: 15
        }
      }
    },
    maintainAspectRatio: false ,
    scales: {
    y: {
        step: 1,
    }
  },
};

let dataChart4 = {
    labels: ['Tecnico 4','Tecnico 3 ','Tecnico 10','Tenico 80 '],
    datasets: [
        {
            label: 'Ordenes Completadas',
            data: [135, 120, 80, 50],
            fill: false,
        },
    ]
};

var setOptions5 = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
          display: false,
      },
      datalabels: {
        color: 'black',
        font: {
            size: 15
        }
      }
    },
    maintainAspectRatio: false ,
    scales: {
    y: {
        step: 1,
    }
  },
};

let dataChart5 = {
    labels: ['Empresa A','Empresa B','Empresa C','Empresa D','Empresa E'],
    datasets: [
        {
            label: 'Ordenes',
            data: [205, 320, 90, 150, 102],
            fill: false,
        },
    ]
};
