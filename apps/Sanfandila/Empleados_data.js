//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirstA', title:'Empleados', optionExpanded:true},
        ] 
    },
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirstB', title:'Empleados', optionExpanded:true},
        ] 
    },
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirstC', title:'Empleados'},
        ] 
    },
    { class:'', _children : [
            { type:'modal', col: '12', id:'modalInformation', title:'Información de movimientos', formElements : [
                    {type:'div', title:'Movimientos', id:'divModalList'},
                ]
            },
        ] 
    },
];

//-----Configuraciones de la tabla
let columsTable1A = [
    { title:"Empleado", field:'employee',  headerFilter:"input",  width:300},
    { title:"Id", field:'id',  headerFilter:"input",  width:100},
    { title:"Fecha de Ingreso", field:'date_income',  headerFilter:"input",  width:200},
    { title:"Fecha de Nacimiento", field:'date_born', width:200},
    { title:"Telefono", field:'phone', width:200},
    { title:"Estado", field:'state', width:200},
    { title:"Llegada", field:'arrival', width:200},
    { title:"Equipo", field:'team', width:200},
    { title:"Rancho", field:'rancho', width:200},
];

let columsTable1B = [
    { title:"Empleado", field:'employee',  headerFilter:"input",  width:300},
    { title:"Id", field:'id',  headerFilter:"input",  width:100},
    { title:"Fecha de Ingreso", field:'date_income',  headerFilter:"input",  width:200},
    { title:"Fecha de Nacimiento", field:'date_born', width:200},
    { title:"Telefono", field:'phone', width:200},
    { title:"Estado", field:'state', width:200},
    { title:"Llegada", field:'arrival', width:200},
    { title:"Equipo", field:'team', width:200},
    { title:"Rancho", field:'rancho', width:200},
    { title:"Fecha", field:'date',    width:400},
    { title:"Motivo de Baja", field:'desc',   width:400},
    { title:"Movimiento", field:'movement',   width:400},
    { title:"Datos Actualizados", field:'data_update',    width:400},
];

//-----Configuraciones de la tabla
let columsTable1C = [
    { title:"Empleado", field:'employee',  headerFilter:"input",  width:300},
    { title:"Id", field:'id',  headerFilter:"input",  width:100},
    { title:"Fecha de Ingreso", field:'date_income',  headerFilter:"input",  width:200},
    { title:"Fecha de Nacimiento", field:'date_born', width:200},
    { title:"Telefono", field:'phone', width:200},
    { title:"Estado", field:'state', width:200},
    { title:"Llegada", field:'arrival', width:200},
    { title:"Equipo", field:'team', width:200},
    { title:"Rancho", field:'rancho', width:200},
    {
        title: "Ver",
        field: "view",
        hozAlign: "center",
        width: 100,
        formatter: function () {
            return `<button class="btn btn-success btn-sm">
                +
            </button>`;
        },
        cellClick: function (e, cell) {
            let rowData = cell.getRow().getData();
            modalShow();
        }
    }
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


var dataTable1B = [
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
                date:'2025-11-23',
                desc:'Faltas Injustificadas'
            },
            {
                date:'2025-10-23',
                movement:'Cambio de Rancho'
            },
            {
                date:'2025-09-23',
                data_update:'Telefono, Equipo, Estado'
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
                date:'2025-10-20',
                movement:'Cambio de Equipo'
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
                date:'2025-09-15',
                data_update:'Telefono'
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
                date:'2025-11-20',
                desc:'Renuncia Voluntaria'
            },
            {
                date:'2025-11-05',
                movement:'Cambio de Rancho'
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
        _children:[
            {
                date:'2025-07-25',
                data_update:'Telefono, Estado'
            },
            {
                date:'2025-08-10',
                movement:'Cambio de Equipo'
            }
        ]
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
                date:'2025-08-01',
                movement:'Cambio de Estado'
            },
            {
                date:'2025-06-20',
                data_update:'Telefono, Rancho'
            },
            {
                date:'2025-09-10',
                desc:'Falta Justificada'
            }
        ]
    }
];


var dataTable1C = [
    {
        employee:'Juan',
        id:'00001',
        date_income:'2025-11-12',
        date_born:'2000-01-27',
        phone:'8992123255',
        state:'Mexico',
        arrival:'Camion',
        team:'ALFA',
        rancho:'Diamond Berries'
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
        rancho:'Blue Fields'
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
        rancho:'Green Valley'
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
        rancho:'Diamond Berries'
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
        rancho:'Red Hills'
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
        rancho:'Green Valley'
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
        rancho:'Diamond Berries'
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
        rancho:'Blue Fields'
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
        rancho:'Red Hills'
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
        rancho:'Blue Fields'
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
        rancho:'Green Valley'
    }
];


let dataModalInformationExample = [
    {
        movement: "Faltas Injustificadas",
        date: "2025-11-23",
        description: "El empleado presentó múltiples inasistencias sin justificación."
    },
    {
        movement: "Cambio de Rancho",
        date: "2025-10-23",
        description: "Traslado del empleado al rancho Diamond Berries."
    },
    {
        movement: "Actualización de Datos",
        date: "2025-09-23",
        description: "Se actualizó teléfono, equipo y estado."
    },
    {
        movement: "Cambio de Equipo",
        date: "2025-08-10",
        description: "El empleado fue asignado al equipo ALFA."
    },
    {
        movement: "Renuncia Voluntaria",
        date: "2025-07-14",
        description: "El trabajador decidió finalizar su relación laboral."
    },
    {
        movement: "Cambio de Estado",
        date: "2025-06-01",
        description: "El empleado notificó cambio de domicilio a Nuevo León."
    }
];
