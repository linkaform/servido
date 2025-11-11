//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'calendar', col: '12', id:'calendarFirst', title:'Calendario'},
        ] 
    },
    { class:'', _children : [
        { type:'modal', col: '12', id:'modalFilter', modalSize:'xl', title:'Filtrado de Tareas', formElements : [
                {type:'input-text', title:'Busqueda de Empleados:', id:'textSearch'},
                {type:'div', title:'Empleados:', id:'divEmpleados', classInput:'row'},
            ]
        },] 
    },
];

let events = [
    {
        "extendedProps": {
            "folio":"2025-01",
            "contacto": "Juan Pérez",
            "celular": "555-123-4567",
            "check_equipo": "Sí",
            "catalog_equipo": "Identificador Biomédico",
            "catalog_marca": "BioTech",
            "catalog_modelo": "BTX-1000",
            "input_equipo": "Ejemplo Equipo  ",
            "input_marca": "Ejemplo Marca ",
            "input_modelo": "Ejemplo Modelo ",
            "trabajo_area": "Laboratorio Clínico",
            "check_list": "Revisión completa",
            "status": "Pendiente",
            "numero_orden": "ORD-001"
        },
        "allDay": true,
        "description": "EQUIPO DE IDENTIFICACION MICROBIANA",
        "title": "SALUDESA",
        "color": "#e74c3c",
        "start": "2025-09-05",
        "eventBackgroundColor": "#e74c3c"
    },
    {
        "extendedProps": {
            "folio":"2025-02",
            "contacto": "María López",
            "celular": "555-987-6543",
            "check_equipo": "No",
            "catalog_equipo": "Ejemplo Equipo",
            "catalog_marca": "Ejemplo Marca",
            "catalog_modelo": "Ejemplo Modelo",
            "input_equipo": "Microscopio",
            "input_marca": "Nikon",
            "input_modelo": "CX-200",
            "trabajo_area": "Microbiología",
            "check_list": "Checklist inicial",
            "status": "Completado",
            "numero_orden": "ORD-002"
        },
        "allDay": true,
        "description": "EQUIPO DE IDENTIFICACION MICROBIANA",
        "title": "SALUDESA",
        "color": "#e74c3c",
        "start": "2025-09-20",
        "eventBackgroundColor": "#58d68d"
    },
    {
        "extendedProps": {
            "folio":"2025-03",
            "contacto": "Luis Martínez",
            "celular": "555-222-3344",
            "check_equipo": "Sí",
            "catalog_equipo": "Centrífuga",
            "catalog_marca": "ThermoFisher",
            "catalog_modelo": "T-Spin 300",
            "input_equipo": "Ejemplo Equipo",
            "input_marca": "Ejemplo Marca",
            "input_modelo": "Ejemplo Modelo",
            "trabajo_area": "Biología Molecular",
            "check_list": "Checklist final",
            "status": "En proceso",
            "numero_orden": "ORD-003"
        },
        "allDay": true,
        "description": "EQUIPO DE IDENTIFICACION MICROBIANA",
        "title": "SALUDESA",
        "color": "#e74c3c",
        "start": "2025-09-07",
        "eventBackgroundColor": "#58d68d"
    },
    {
        "extendedProps": {
            "folio":"2025-04",
            "contacto": "Ana Gómez",
            "celular": "555-444-8899",
            "check_equipo": "No",
            "catalog_equipo": "Ejemplo Equipo",
            "catalog_marca": "Ejemplo Marca",
            "catalog_modelo": "Ejemplo Modelo",
            "input_equipo": "Espectrofotómetro",
            "input_marca": "Agilent",
            "input_modelo": "Spec-200",
            "trabajo_area": "Química Clínica",
            "check_list": "Checklist preventivo",
            "status": "Pendiente",
            "numero_orden": "ORD-004"
        },
        "allDay": true,
        "description": "EQUIPO DE IDENTIFICACION MICROBIANA",
        "title": "SALUDESA",
        "color": "#e74c3c",
        "start": "2025-09-04",
        "eventBackgroundColor": "#58d68d"
    }
];

//---- Config Calendar
let configCustom = {
    locale: 'es',
    selectable: false,
    aspectRatio: 2,
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    initialView: window.innerWidth < 768 ? 'timeGridDay' : 'dayGridMonth',
    height: window.innerWidth < 768 ? 800 : 1200,
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        list: 'Lista'
    }
};


const lisDataEmployee = [
    { nombre: 'Luis Martínez', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '01' },
    { nombre: 'María López', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '02' },
    { nombre: 'Carlos Ramírez', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '03' },
    { nombre: 'Ana Torres', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '04' },
    { nombre: 'José Hernández', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '05' },
    { nombre: 'Fernanda Salinas', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '06' },
    { nombre: 'Ricardo Ponce', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '07' },
    { nombre: 'Laura Chávez', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '08' },
    { nombre: 'Miguel Rivas', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '09' },
    { nombre: 'Paola Méndez', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '10' },
    { nombre: 'Arturo Gómez', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '11' },
    { nombre: 'Sofía Aguilar', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '12' },
    { nombre: 'Andrés Navarro', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '13' },
    { nombre: 'Valeria Ortiz', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '14' },
    { nombre: 'Emilio Vargas', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '15' },
    { nombre: 'Claudia Rivera', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '16' },
    { nombre: 'Jorge Castillo', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '17' },
    { nombre: 'Patricia Vega', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '18' },
    { nombre: 'Oscar Barrera', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '19' },
    { nombre: 'Elena Ruiz', img: 'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/6912726edca16c0be6bd7cab.png', idUser: '20' }
];
