//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'kanva', col:'12', id:'kanvaFirst', title:'Horas X Día', columsKanva: [
                {title:'Pendientes',id:'divPendientes', grid:'col-lg-3 col-md-4 col-sm-6'},
                {title:'En Progreso',id:'divProgreso', grid:'col-lg-3 col-md-4 col-sm-6'},
                {title:'En Pruebas',id:'divPruebas', grid:'col-lg-3 col-md-4 col-sm-6'},
                {title:'Terminadas',id:'divTerminadas', grid:'col-lg-3 col-md-4 col-sm-6'},
            ]},
        ] 
    },
];



//-----Configuraciones de la tabla
let kanvaData = [
    {
        key:'divPendientes',
        title:'Trabajo de Opemtar',
        type: 'PDF',
        color: '#ff5733',
        name:'Josue De Jesus',
        date:'2025-01-15',
    },
    {
        key: 'divPendientes',
        title: 'Trabajo de Operar',
        type: 'PDF',
        color: '#ff5733',
        name: 'Josue De Jesus',
        date: '2025-01-15',
    },
    {
        key: 'divProgreso',
        title: 'Informe de Ventas',
        type: 'Reporte',
        color: '#007bff',
        name: 'Maria Gonzalez',
        date: '2025-01-14',
    },
    {
        key: 'divProgreso',
        title: 'Proyecto Diseño',
        type: 'PDF',
        color: '#ff5733',
        name: 'Carlos Ramirez',
        date: '2025-01-13',
    },
    {
        key: 'divProgreso',
        title: 'Plan de Marketing',
        type: 'Ticket',
        color: '#dc3545',
        name: 'Laura Pérez',
        date: '2025-01-12',
    },
    {
        key: 'divProgreso',
        title: 'Reporte Financiero',
        type: 'PDF',
        color: '#ff5733',
        name: 'Andrés Torres',
        date: '2025-01-11',
    },
    {
        key: 'divPruebas',
        title: 'Estrategia de Negocios',
        type: 'PPT',
        name: 'Valeria López',
        date: '2025-01-10',
    },
    {
        key: 'divPruebas',
        title: 'Planificación Anual',
        type: 'Ticket',
        color: '#dc3545',
        name: 'Daniela Ruiz',
        date: '2025-01-09',
    },
    {
        key: 'divPruebas',
        title: 'Manual de Usuario',
        type: 'PDF',
        color: '#ff5733',
        name: 'Javier Hernández',
        date: '2025-01-08',
    },
    {
        key: 'divPruebas',
        title: 'Calendario de Eventos',
        type: 'Reporte',
        color: '#007bff',
        name: 'Sofia Castillo',
        date: '2025-01-07',
    },
    {
        key: 'divPruebas',
        title: 'Presupuesto 2025',
        type: 'PDF',
        color: '#ff5733',
        name: 'Roberto Méndez',
        date: '2025-01-06',
    },
    {
        key: 'divPruebas',
        title: 'Análisis de Datos',
        type: 'Reporte',
        color: '#007bff',
        name: 'Fernanda Morales',
        date: '2025-01-05',
    },
    {
        key: 'divTerminadas',
        title: 'Presentación del Proyecto',
        type: 'PPT',
        name: 'Diego García',
        date: '2025-01-04',
    },
    {
        key: 'divTerminadas',
        title: 'Propuesta Comercial',
        type: 'Ticket',
        color: '#dc3545',
        name: 'Camila Sánchez',
        date: '2025-01-03',
    },
    {
        key: 'divTerminadas',
        title: 'Contrato de Servicio',
        type: 'PDF',
        color: '#ff5733',
        name: 'Jorge Domínguez',
        date: '2025-01-02',
    },
    {
        key: 'divTerminadas',
        title: 'Guía Técnica',
        type: 'PDF',
        color: '#ff5733',
        name: 'Paola Vargas',
        date: '2025-01-01',
    }
];
