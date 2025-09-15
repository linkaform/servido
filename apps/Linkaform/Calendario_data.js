//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'calendar', col: '12', id:'calendarFirst', title:'Calendario'},
        ] 
    },
    { class:'', _children : [
            { type:'modal', col: '12', id:'modalInformation', title:'Datos de Tarea', formElements : [
                    {type:'p', title:'Folio:', id:'textFolio'},
                    {type:'p', title:'Cliente:', id:'textClient'},
                    {type:'p', title:'Nombre del contacto:', id:'textContacto'},
                    {type:'p', title:'Equipo:', id:'textEquipo'},
                    {type:'p', title:'Marca:', id:'textMarca'},
                    {type:'p', title:'Modelo:', id:'textModelo'},
                    {type:'p', title:'Trabajo a realizar:', id:'textTrabajo'},
                    {type:'p', title:'Estatus:', id:'textStatus'},
                ]
            },
        ] 
    },
    { class:'', _children : [
            { type:'modal', col: '12', id:'modalForm', title:'Creación de Tarea', optionButtonModal:true, formElements : [
                {type:'input-select', title:'Cliente**:', id:'inputSelectCliente', classInput:'classFormInputs'},
                {type:'input-text', title:'Nombre del contacto**:', id:'inputTextContacto', classInput:'classFormInputs'},
                {type:'input-number', title:'Celular:', id:'inputNumberCelular', classInput:'classFormInputs'},
                {type:'input-switch', title:'¿El equipo está registrado en la base de datos?**:', id:'inputSwitchCatalogI',name:'inputSwitchCatalogI', classInput:'classFormInputs',switchs:["Sí", "No"]},
                {type:'input-select', title:'Equipo**:', id:'inputSelectEquipo', classInput:'classFormInputs', hideComponent:true},
                {type:'input-text', title:'Especifique Equipo**:', id:'inputTextCatalogEquipo', classInput:'classFormInputs', hideComponent:true},
                {type:'input-text', title:'Especifique Marca:', id:'inputTextCatalogMarca', classInput:'classFormInputs', hideComponent:true},
                {type:'input-text', title:'Especifique Modelo:', id:'inputTextCatalogModelo', classInput:'classFormInputs', hideComponent:true},
                {type:'input-textArea', title:'Trabajo a realizar', id:'inputTextAreaTrabajo', classInput:'classFormInputs'},
                {type:'input-select', title:'Forma**:', id:'inputSelectForma', classInput:'classFormInputs'},
                {type:'input-text', title:'Especifique Orden:', id:'inputTextOrden', classInput:'classFormInputs'},
            ]},
        ] 
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

//----Config Calendar
let configCustom = {
    locale : 'es',
    selectable : false,
    aspectRatio: 2,
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    initialView: window.innerWidth < 768 ? 'dayGridMonth' : 'dayGridMonth', 
    height: window.innerWidth < 768 ? 800 : 1200,
    headerToolbar: {
        left: 'prev,next', 
        center: 'title',
        right: 'today',
    },
    dateClick: function (info) {
        dateClick = info.dateStr;
        new bootstrap.Modal(document.getElementById('modalForm')).show();
    },
    eventClick: function (info) {
        const event = info.event;
        const props = event.extendedProps || {};
        console.log('props',props)
        // Función helper para asignar valor por defecto
        const getValue = (key, defaultVal = 'N/A') => props[key] ?? defaultVal;
        const data = {
            modalCliente: event.title || 'N/A',
            textFolio: event.id  || 'N/A',
            textClient: getValue('cliente'),
            textContacto: getValue('contacto'),
            textTrabajo: getValue('trabajo_area'),
            textEquipo: (() => {
                const check = getValue('check_equipo', 'No').toLowerCase();
                if (check == 'sí') return props.catalog_equipo || 'N/A';
                if (check == 'no') return props.input_equipo || 'N/A';
                return 'N/A';
            })(),

            textMarca:(() => {
                const check = getValue('check_equipo', 'No').toLowerCase();
                if (check == 'sí') return props.catalog_marca || 'N/A';
                if (check == 'no') return props.input_marca || 'N/A';
                return 'N/A';
            })(),

            textModelo:(() => {
                const check = getValue('check_equipo', 'No').toLowerCase();
                if (check == 'sí') return props.catalog_modelo || 'N/A';
                if (check == 'no') return props.input_modelo || 'N/A';
                return 'N/A';
            })(),
            textStatus: getValue('status'),
        };
        Object.entries(data).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        });
        new bootstrap.Modal(document.getElementById('modalInformation')).show();
    },
}