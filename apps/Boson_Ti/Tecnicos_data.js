//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'card', col: '4', id:'cardFirst', title:'Ordenes Completadas', hexadecimal:'#FFC133'},
            { type:'card', col: '4', id:'cardSecond', title:'Ordenes Pendientes', hexadecimal:'#FF8D33'},
            { type:'card', col: '4', id:'cardThird', title:'Productividad X Técnico', hexadecimal:'#D4FF33'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '12', id:'chartFirst', title:'Ordenes X Técnico'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartSecond', title:'Ordenes X Status'},
            { type:'chart', col: '6', id:'chartThird', title:'Ranking de Tecnicos'},
        ] 
    },
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Detalle de Asistencias', optionExpanded:true},
        ] 
    },
];

//----Config Table
let columsTable1Prod = [
    { title:"Folio", field:'folio',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Técnico",field:'tecnico',headerTooltip: true,hozAlign:"left", width:200},
    { title:"Zona",field:'zona',headerTooltip: true,hozAlign:"left", width:150},
    { title:"Cliente",field:'cliente',headerTooltip: true,hozAlign:"left", width:250},
    { title:"Tipo",field:'tipo',headerTooltip: true,hozAlign:"left", width:150},
    { title:"Hora Inicio",field:'hora_inicio',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Hora Fin",field:'hora_fin',headerTooltip: true,hozAlign:"center", width:200},
    { title:"Hora Efectivas",field:'horas_efectivas',headerTooltip: true,hozAlign:"center", width:200},
   
];


const dataTable1 = [
    { folio: "516-15878", tecnico: "Juan Pérez", zona: "Norte", cliente: "Empresa A", tipo: "Maquinaria", hora_inicio: "08:00", hora_fin: "12:30", horas_efectivas: 4.5 },
    { folio: "517-24987", tecnico: "Carlos Gómez", zona: "Sur", cliente: "Industria B", tipo: "Administrativa", hora_inicio: "09:15", hora_fin: "13:45", horas_efectivas: 4.5 },
    { folio: "518-36542", tecnico: "Ana López", zona: "Este", cliente: "Fábrica C", tipo: "Maquinaria", hora_inicio: "07:30", hora_fin: "11:00", horas_efectivas: 3.5 },
    { folio: "519-47896", tecnico: "María Rodríguez", zona: "Oeste", cliente: "Empresa D", tipo: "Administrativa", hora_inicio: "10:00", hora_fin: "14:30", horas_efectivas: 4.5 },
    { folio: "520-58963", tecnico: "Luis Fernández", zona: "Norte", cliente: "Taller E", tipo: "Maquinaria", hora_inicio: "08:45", hora_fin: "13:15", horas_efectivas: 4.5 },
    { folio: "521-67485", tecnico: "Elena Ramírez", zona: "Sur", cliente: "Compañía F", tipo: "Administrativa", hora_inicio: "09:00", hora_fin: "12:00", horas_efectivas: 3 },
    { folio: "522-78965", tecnico: "Pedro Sánchez", zona: "Este", cliente: "Empresa G", tipo: "Maquinaria", hora_inicio: "06:45", hora_fin: "10:45", horas_efectivas: 4 },
    { folio: "523-89654", tecnico: "Lucía Herrera", zona: "Oeste", cliente: "Industria H", tipo: "Administrativa", hora_inicio: "11:00", hora_fin: "15:30", horas_efectivas: 4.5 },
    { folio: "524-94578", tecnico: "David Castro", zona: "Norte", cliente: "Fábrica I", tipo: "Maquinaria", hora_inicio: "07:00", hora_fin: "10:30", horas_efectivas: 3.5 },
    { folio: "525-15632", tecnico: "Jorge Mendoza", zona: "Sur", cliente: "Compañía J", tipo: "Administrativa", hora_inicio: "12:00", hora_fin: "16:30", horas_efectivas: 4.5 },
    { folio: "526-26745", tecnico: "Andrea Vargas", zona: "Este", cliente: "Taller K", tipo: "Maquinaria", hora_inicio: "13:00", hora_fin: "17:00", horas_efectivas: 4 },
    { folio: "527-37896", tecnico: "Raúl García", zona: "Oeste", cliente: "Empresa L", tipo: "Administrativa", hora_inicio: "09:30", hora_fin: "13:00", horas_efectivas: 3.5 },
    { folio: "528-48965", tecnico: "Marta Torres", zona: "Norte", cliente: "Industria M", tipo: "Maquinaria", hora_inicio: "10:15", hora_fin: "14:45", horas_efectivas: 4.5 },
    { folio: "529-59874", tecnico: "Fernando Reyes", zona: "Sur", cliente: "Fábrica N", tipo: "Administrativa", hora_inicio: "08:30", hora_fin: "12:30", horas_efectivas: 4 },
    { folio: "530-68952", tecnico: "Paola Domínguez", zona: "Este", cliente: "Compañía O", tipo: "Maquinaria", hora_inicio: "07:15", hora_fin: "11:15", horas_efectivas: 4 }
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
        step: 1,
    }
  },
};

let dataChart3 = {
    labels: ['Tecnico 4','Tecnico 3 ','Tecnico 10','Tenico 80 '],
    datasets: [
        {
            label: 'Ordenes Completadas',
            data: [135, 120, 80, 50],
            fill: false,
        },
    ]
};
