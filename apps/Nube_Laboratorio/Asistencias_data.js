//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Detalle de Asistencias', optionExpanded:true},
        ] 
    },
];

//----Config Table
let columsTable1 = [
    { title:"No.", field:'num',headerTooltip: true,hozAlign:"center", width:80},
    { title:"Institución Educativa",field:'institution',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Grupo",field:'group',headerTooltip: true,hozAlign:"center", width:100},
    { title:"Mentor",field:'mentor',headerTooltip: true,hozAlign:"center", headerFilter:"input", width:200},
    { title:"Tipo Documento",field:'type_doc',headerTooltip: true,hozAlign:"center", width:170},
    { title:"Número identificación", field:'num_id',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Nombres y Apellidos del estudiante",field:'name',headerTooltip: true,hozAlign:"left",headerFilter:"input", width:300},
    { title:"Taller Perfume",headerTooltip: true,hozAlign:"left",
        columns:[
            {title:"Sí", field:"yesT1", headerTooltip: true,hozAlign:"center", width:150},
            {title:"No", field:"noT1", headerTooltip: true,hozAlign:"center", width:90},
        ],
    width:300},
    { title:"Taller Memoria Olfativa",headerTooltip: true,hozAlign:"left", 
        columns:[
            {title:"Sí", field:"yesT2", headerTooltip: true,hozAlign:"center", width:150},
            {title:"No", field:"noT2", headerTooltip: true,hozAlign:"center", width:90},
        ],
    width:300},
    { title:"Taller Caja misteriosa",headerTooltip: true,hozAlign:"left", 
        columns:[
            {title:"Sí", field:"yesT3", headerTooltip: true,hozAlign:"center", width:150},
            {title:"No", field:"noT3", headerTooltip: true,hozAlign:"center", width:90},
        ],
    width:300},
    { title:"Taller Sellos de mi mundo",headerTooltip: true,hozAlign:"left", 
        columns:[
            {title:"Sí", field:"yesT4", headerTooltip: true,hozAlign:"center", width:150},
            {title:"No", field:"noT4", headerTooltip: true,hozAlign:"center", width:90},
        ],
    width:300},
    { title:"Total Asistencias",field:'total',headerTooltip: true,hozAlign:"right", headerFilter:"input", width:200},
    { title:"% de Cumplimiento",field:'compliance',headerTooltip: true,hozAlign:"right",headerFilter:"input",  width:200},
];



//----Config Table
let columsTable1Prod = [
    { title:"No.", field:'num',headerTooltip: true,hozAlign:"center", width:80},
    { title:"Institución Educativa",field:'institution',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Grupo",field:'group',headerTooltip: true,hozAlign:"center", width:100},
    { title:"Mentor",field:'mentor',headerTooltip: true,hozAlign:"center", headerFilter:"input", width:200},
    { title:"Tipo Documento",field:'type_doc',headerTooltip: true,hozAlign:"center", width:170},
    { title:"Número identificación", field:'num_id',headerTooltip: true,hozAlign:"center", width:150},
    { title:"Nombres y Apellidos del estudiante",field:'name',headerTooltip: true,hozAlign:"left",headerFilter:"input", width:300},
    { title:"Total Asistencias",field:'total',headerTooltip: true,hozAlign:"right", headerFilter:"input", width:200},
    { title:"% de Cumplimiento",field:'compliance',headerTooltip: true,hozAlign:"right",headerFilter:"input",  width:200},
];



let configTableCustom1 = {
    height: "400px",
    layout:"fitDataFill",
    theme: "bootstrap5", 
    columnMinWidth: 100,
    autoColumns: false, 
    scrollX: true, 
    dataTree:true,
}

let dataTable1 = [
    {
        'num': 1,
        'institution': 'Institución A',
        'group': 'Grupo 1',
        'mentor': 'Mentor 1',
        'type_doc': 'C.C.',
        'num_id': '1011516711',
        'name': 'Alberto Martinez',
        'yesT1': 1,
        'noT1': 0,
        'yesT2': 0,
        'noT2': 1,
        'yesT3': 1,
        'noT3': 0,
        'yesT4': 0,
        'noT4': 1,
        'total': 2,
        'compliance': '50.00%',
        '_children': [
            {  'yesT1': '2025/02/01', 'yesT2': '2025/02/01', 'yesT3': '2025/02/01', 'yesT4': '2025/02/01' }
        ]

    },
    {
        'num': 2,
        'institution': 'Institución B',
        'group': 'Grupo 2',
        'mentor': 'Mentor 2',
        'type_doc': 'T.I.',
        'num_id': '1023456789',
        'name': 'Beatriz Gómez',
        'date': '2025/02/02',
        'yesT1': 0,
        'noT1': 1,
        'yesT2': 1,
        'noT2': 0,
        'yesT3': 1,
        'noT3': 0,
        'yesT4': 0,
        'noT4': 1,
        'total': 2,
        'compliance': '50.00%',
        '_children': [
            { 'num': '', 'yesT1': '2025/02/01', 'yesT2': '2025/02/01', 'yesT3': '2025/02/01', 'yesT4': '2025/02/01' }
        ]
    },
    {
        'num': 3,
        'institution': 'Institución C',
        'group': 'Grupo 3',
        'mentor': 'Mentor 3',
        'type_doc': 'R.C.',
        'num_id': '1034567890',
        'name': 'Carlos Rodríguez',
        'date': '2025/02/03',
        'yesT1': 1,
        'noT1': 0,
        'yesT2': 1,
        'noT2': 0,
        'yesT3': 0,
        'noT3': 1,
        'yesT4': 1,
        'noT4': 0,
        'total': 3,
        'compliance': '75.00%',
        '_children': [
            { 'num': '', 'yesT1': '2025/02/01', 'yesT2': '2025/02/01', 'yesT3': '2025/02/01', 'yesT4': '2025/02/01' }
        ]
    },
    {
        'num': 4,
        'institution': 'Institución D',
        'group': 'Grupo 1',
        'mentor': 'Mentor 4',
        'type_doc': 'C.C.',
        'num_id': '1045678901',
        'name': 'Diana Fernández',
        'date': '2025/02/04',
        'yesT1': 0,
        'noT1': 1,
        'yesT2': 1,
        'noT2': 0,
        'yesT3': 0,
        'noT3': 1,
        'yesT4': 1,
        'noT4': 0,
        'total': 2,
        'compliance': '50.00%',
        '_children': [
            { 'num': '', 'yesT1': '2025/02/01', 'yesT2': '2025/02/01', 'yesT3': '2025/02/01', 'yesT4': '2025/02/01' }
        ]
    },
    {
        'num': 5,
        'institution': 'Institución E',
        'group': 'Grupo 2',
        'mentor': 'Mentor 1',
        'type_doc': 'T.I.',
        'num_id': '1056789012',
        'name': 'Eduardo López',
        'date': '2025/02/05',
        'yesT1': 1,
        'noT1': 0,
        'yesT2': 0,
        'noT2': 1,
        'yesT3': 1,
        'noT3': 0,
        'yesT4': 0,
        'noT4': 1,
        'total': 2,
        'compliance': '50.00%',
        '_children': [
            { 'num': '', 'yesT1': '2025/02/01', 'yesT2': '2025/02/01', 'yesT3': '2025/02/01', 'yesT4': '2025/02/01' }
        ]
    },
    {
        'num': 6,
        'institution': 'Institución F',
        'group': 'Grupo 3',
        'mentor': 'Mentor 3',
        'type_doc': 'R.C.',
        'num_id': '1067890123',
        'name': 'Fernanda Castillo',
        'date': '2025/02/06',
        'yesT1': 0,
        'noT1': 1,
        'yesT2': 1,
        'noT2': 0,
        'yesT3': 0,
        'noT3': 1,
        'yesT4': 1,
        'noT4': 0,
        'total': 2,
        'compliance': '50.00%',
        '_children': [
            { 'num': '', 'yesT1': '2025/02/01', 'yesT2': '2025/02/01', 'yesT3': '2025/02/01', 'yesT4': '2025/02/01' }
        ]
    },
    {
        'num': 7,
        'institution': 'Institución G',
        'group': 'Grupo 1',
        'mentor': 'Mentor 5',
        'type_doc': 'C.C.',
        'num_id': '1078901234',
        'name': 'Gabriel Ruiz',
        'date': '2025/02/07',
        'yesT1': 1,
        'noT1': 0,
        'yesT2': 1,
        'noT2': 0,
        'yesT3': 1,
        'noT3': 0,
        'yesT4': 0,
        'noT4': 1,
        'total': 3,
        'compliance': '75.00%',
        '_children': [
            { 'num': '', 'yesT1': '2025/02/01', 'yesT2': '2025/02/01', 'yesT3': '2025/02/01', 'yesT4': '2025/02/01' }
        ]
    }
];
