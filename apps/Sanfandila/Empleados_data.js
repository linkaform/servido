//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirstA', title:'Empleados', optionExpanded:true},
            { type:'table', col: '6', id:'tableSecond', title:'Rancho'},
            { type:'chart', col: '6', id:'chartFirst', title:'Tendencia Por Rancho'},
        ] 
    },
];

//-----Configuraciones de la tabla
let columsTable1A = [
    { title:"Folio", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
        url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData()._id}, 
        target:"_blank",},headerFilter:"input", width:150
    },
    { title:"Empleado", field:'employee',  headerFilter:"input",  width:300},
    { title:"Id", field:'id_emp',  headerFilter:"input",  width:200},
    { title:"Fecha de Ingreso", field:'date_income',  headerFilter:"input",  width:200},
    { title:"Fecha de Nacimiento", field:'date_born', width:350},
    { title:"Telefono", field:'phone', width:200},
    { title:"Estado", field:'state', width:200},
    { title:"Llegada", field:'arrival', width:200},
    { title:"Equipo", field:'team', width:200},
    { title:"Rancho", field:'rancho', width:300},
];

var dataTable1A = [
    {
        employee:'Juan',
        id:'00001',
        date_income:'2025-11-12',
        date_born:'2000-01-27',
        phone:'8992123255',
        state:'Mexico',
        arrival:'Camion',
        team:'ALFA',
        rancho:'Diamond Berries',
        _children:[
            {
                id:'Baja',
                date_income:'2025-11-23',
                date_born:'Faltas Injustificadas'
            },
            {
                id:'Movimiento',
                date_income:'2025-10-23',
                date_born:'Cambio de Rancho'
            },
            {
                id:'Datos Actualizados',
                date_income:'2025-09-23',
                date_born:'Telefono, Equipo, Estado'
            }
        ]
    },
    {
        employee:'Maria',
        id:'00002',
        date_income:'2025-10-05',
        date_born:'1999-03-11',
        phone:'8123345566',
        state:'Nuevo Leon',
        arrival:'Urbano',
        team:'BRAVO',
        rancho:'Blue Fields',
        _children:[
            {
                id:'Movimiento',
                date_income:'2025-11-10',
                date_born:'Cambio de Equipo'
            }
        ]
    },
    {
        employee:'Pedro',
        id:'00003',
        date_income:'2025-09-22',
        date_born:'1998-07-19',
        phone:'8332211099',
        state:'Tamaulipas',
        arrival:'Auto',
        team:'CHARLIE',
        rancho:'Green Valley',
        _children:[]
    },
    {
        employee:'Luisa',
        id:'00004',
        date_income:'2025-08-30',
        date_born:'2001-10-03',
        phone:'8991122334',
        state:'Mexico',
        arrival:'Camion',
        team:'DELTA',
        rancho:'Diamond Berries',
        _children:[
            {
                id:'Datos Actualizados',
                date_income:'2025-09-15',
                date_born:'Telefono'
            }
        ]
    },
    {
        employee:'Carlos',
        id:'00005',
        date_income:'2025-11-01',
        date_born:'1997-02-21',
        phone:'8119988877',
        state:'Coahuila',
        arrival:'Urbano',
        team:'ALFA',
        rancho:'Red Hills',
        _children:[
            {
                id:'Baja',
                date_income:'2025-11-20',
                date_born:'Renuncia Voluntaria'
            },
            {
                id:'Movimiento',
                date_income:'2025-11-05',
                date_born:'Cambio de Rancho'
            }
        ]
    },
    {
        employee:'Fernanda',
        id:'00006',
        date_income:'2025-07-18',
        date_born:'2002-08-09',
        phone:'8445566778',
        state:'Durango',
        arrival:'Auto',
        team:'BRAVO',
        rancho:'Green Valley',
        _children:[]
    },
    {
        employee:'Ricardo',
        id:'00007',
        date_income:'2025-06-11',
        date_born:'2000-12-30',
        phone:'8994455667',
        state:'Chiapas',
        arrival:'Camion',
        team:'CHARLIE',
        rancho:'Diamond Berries',
        _children:[
            {
                id:'Movimiento',
                date_income:'2025-08-01',
                date_born:'Cambio de Estado'
            },
            {
                id:'Datos Actualizados',
                date_income:'2025-06-20',
                date_born:'Telefono, Rancho'
            }
        ]
    },
    {
        employee:'Sofia',
        id:'00008',
        date_income:'2025-04-09',
        date_born:'1996-11-14',
        phone:'8189901122',
        state:'Jalisco',
        arrival:'Urbano',
        team:'DELTA',
        rancho:'Blue Fields',
        _children:[
            {
                id:'Baja',
                date_income:'2025-07-10',
                date_born:'Abandono de Trabajo'
            }
        ]
    },
    {
        employee:'Miguel',
        id:'00009',
        date_income:'2025-03-22',
        date_born:'1995-04-17',
        phone:'8996677889',
        state:'Mexico',
        arrival:'Auto',
        team:'ALFA',
        rancho:'Red Hills',
        _children:[]
    },
    {
        employee:'Valeria',
        id:'00010',
        date_income:'2025-05-13',
        date_born:'2003-09-25',
        phone:'8125554433',
        state:'Sinaloa',
        arrival:'Camion',
        team:'BRAVO',
        rancho:'Blue Fields',
        _children:[
            {
                id:'Movimiento',
                date_income:'2025-06-01',
                date_born:'Cambio de Equipo'
            },
            {
                id:'Datos Actualizados',
                date_income:'2025-05-20',
                date_born:'Telefono'
            },
            {
                id:'Baja',
                date_income:'2025-08-14',
                date_born:'Faltas Recurrentes'
            }
        ]
    },
    {
        employee:'Andres',
        id:'00011',
        date_income:'2025-01-19',
        date_born:'1994-02-05',
        phone:'8331102200',
        state:'Sonora',
        arrival:'Auto',
        team:'CHARLIE',
        rancho:'Green Valley',
        _children:[
            {
                id:'Datos Actualizados',
                date_income:'2025-02-10',
                date_born:'Estado, Telefono'
            }
        ]
    }
];


let columsTable2 = [
    { title:"Rancho", field:'rancho', headerFilter:"input", width:300 },
    { title:"Requeridos", field:'required', headerFilter:"input", hozAlign:"right", width:150 },
    { title:"Actual", field:'num_total', headerFilter:"input", hozAlign:"right", width:150 },
    { 
        title:"% De Ocupación", 
        field:'percentage_total', 
        width:180,
        hozAlign:"right",
        formatter:function(cell){
            let value = cell.getValue();
            return value + "%";
        }
    },
];


var dataTable2 = [
    {
        rancho:'Diamond Berries',
        required:450,
        num_total:354,
        percentage_total:78.9,
    },
    {
        rancho:'San Agustin',
        required:100,
        num_total:78,
        percentage_total:78,
    },
    {
        rancho:'San Isidro Mezatepec',
        required:300,
        num_total:150,
        percentage_total:50,
    },
    {
        rancho:'Unión de San Antonio',
        required:268,
        num_total:268,
        percentage_total:100,
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
            size: 16
        }
      }
  },
  responsive: true, 
    maintainAspectRatio: false ,
    scales: {
        y: {
            step: 1,
            stacked:true
        },
        x:{
            stacked:true,
        }
  },
};

var dataChart1 = {
    labels: ['24/11/25','25/11/25','26/11/25','27/11/25','28/11/25','29/11/25'],
    datasets: [
        {
            label: 'Diamond Berries',
            data: [7, 12, 4, 9, 3, 11],
            fill: false,
            backgroundColor:['#2ABF5E'],  
            borderColor:['#2ABF5E']   
        },
        {
            label: 'San Agustin',
            data: [5, 9, 14, 6, 7, 2],
            fill: false,
            backgroundColor:['#8CA285'],
            borderColor:['#8CA285']   
        },
        {
            label: 'San Isidro Mezatepec',
            data: [10, 3, 8, 12, 4, 9],
            fill: false,
            backgroundColor:['#FE8703'], 
            borderColor:['#FE8703']  
        },
        {
            label: 'Unión de San Antonio',
            data: [11, 6, 13, 5, 10, 7],
            fill: false,
            backgroundColor:['#EDCD81'], 
            borderColor:['#EDCD81']  
        },
    ]
};