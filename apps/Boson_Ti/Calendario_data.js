//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'calendar', col: '12', id:'calendarFirst', title:'Calendario'},
        ] 
    },
    { class:'', _children : [
            { type:'modal', col: '12', id:'modalInformation', title:'Datos de Tarea', formElements : [
                    {type:'p', title:'Compañia:', id:'textCompany'},
                    {type:'p', title:'Fecha/hora Programación de Servicio:', id:'textFecha'},
                    {type:'p', title:'Cliente:', id:'textCliente'},
                    {type:'p', title:'Razón Social:', id:'textSocial'},
                    {type:'p', title:'Email Cliente:', id:'textEmailCliente'},
                    {type:'p', title:'Técnico:', id:'textTecnico'},
                    {type:'p', title:'Dirección de Servicios:', id:'textDireccion'},
                    {type:'p', title:'Nick/Eco:', id:'textNick'},
                    {type:'p', title:'Forma:', id:'textForm'},
                    {type:'p', title:'Status:', id:'textStatus'},
                    {type:'input-link-text', title:'Folio:', id:'folio-record'},
                ]
            },
        ] 
    },
    { class:'', _children : [
            { type:'modal', col: '12', id:'modalForm', title:'Creación de Tarea', optionButtonModal:true, formElements : [
                {type:'input-select', title:'Compañia**:', id:'inputSelectCompany', classInput:'classFormInputs'},
                {type:'input-datetime', title:'Fecha/hora Programación de Servicio', id:'inputDatetimeServicio', classInput:'classFormInputs'},
                {type:'input-select', title:'Cliente**:', id:'inputSelectCliente', classInput:'classFormInputs'},
                {type:'p', title:'Razón Social:', id:'inputDescSocial', classInput:'classFormInputs'},
                {type:'p', title:'Email Cliente:', id:'inputDescCliente', classInput:'classFormInputs'},
                {type:'input-text', title:'Dirección de Servicios**:', id:'inputTextDireccion', classInput:'classFormInputs'},
                {type:'input-text', title:'Nick/Eco**:', id:'inputTextNick', classInput:'classFormInputs'},
                {type:'input-select', title:'Nombre de la forma**:', id:'inputSelectForma', classInput:'classFormInputs'},
                {type:'input-select', title:'Técnico Seleccionado**:', id:'inputSelectTecnico', classInput:'classFormInputs'},
            ]},
        ] 
    },
];

let events = [
    {
        extendedProps: {
            textFecha: "2025-12-03 09:00",
            textCliente: "Clínica Santa María",
            textSocial: "SALUDESA S.A. de C.V.",
            textEmailCliente: "contacto@santamaria.com",
            textEmail: "soporte@saludesa.com",
            textDireccion: "Av. Reforma 123, CDMX",
            textNick: "santamaria_lab",
            textForm: "Mantenimiento preventivo de equipo biomédico"
        },
        title: "SALUDESA",
        description: "Servicio programado",
        start: "2025-12-03T09:00:00",
        end: "2025-12-03T11:00:00",
        allDay: false,
        eventBackgroundColor: "#e74c3c"
    },
    {
        extendedProps: {
            textFecha: "2025-12-08 14:30",
            textCliente: "Laboratorio BioPlus",
            textSocial: "BIOPLUS MX",
            textEmailCliente: "info@bioplus.mx",
            textEmail: "agenda@saludesa.com",
            textDireccion: "Calle Insurgentes 456, Guadalajara",
            textNick: "bioplus_gdl",
            textForm: "Instalación y calibración de equipo"
        },
        title: "SALUDESA",
        description: "Servicio técnico",
        start: "2025-12-08T14:30:00",
        end: "2025-12-08T16:00:00",
        allDay: false,
        eventBackgroundColor: "#58d68d"
    },
    {
        extendedProps: {
            textFecha: "2025-12-15 10:00",
            textCliente: "Hospital Central",
            textSocial: "Hospital Central del Norte",
            textEmailCliente: "mantenimiento@hospitalcentral.com",
            textEmail: "servicios@saludesa.com",
            textDireccion: "Blvd. Salud 789, Monterrey",
            textNick: "hospital_central",
            textForm: "Revisión correctiva de equipo especializado"
        },
        title: "SALUDESA",
        description: "Revisión técnica",
        start: "2025-12-15T10:00:00",
        end: "2025-12-15T13:00:00",
        allDay: false,
        eventBackgroundColor: "#f4d03f"
    },
    {
        extendedProps: {
            textFecha: "2025-12-21 08:30",
            textCliente: "Diagnósticos del Sur",
            textSocial: "Diagnósticos del Sur S.C.",
            textEmailCliente: "admin@diagnosticossur.com",
            textEmail: "agenda@saludesa.com",
            textDireccion: "Av. Universidad 321, Puebla",
            textNick: "diag_sur",
            textForm: "Capacitación de uso de equipo"
        },
        title: "SALUDESA",
        description: "Capacitación",
        start: "2025-12-21T08:30:00",
        end: "2025-12-21T10:30:00",
        allDay: false,
        eventBackgroundColor: "#5dade2"
    }
];


//----Config Calendar
let configCustom = {
    locale: 'es',
    selectable: false,
    aspectRatio: 2,
    eventDisplay: 'block',
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    initialView: window.innerWidth < 768 ? 'timeGridDay' : 'timeGridDay',
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
        day: 'Día'
    },
    dateClick: function (info) {
        const dateStr = info.dateStr;
        const input = document.getElementById('inputDatetimeServicio');
        const dateFormat = dateStr.includes('T');
        if (dateFormat) {
            const valueDatetime = dateStr.slice(0, 16);
            input.value = valueDatetime;
            input.disabled = true;
        } else {
            input.value = '';
            input.disabled = false;
        }
        new bootstrap.Modal(document.getElementById('modalForm')).show();
    },
    eventClick: function (info) {
        const event = info.event;
        const props = event.extendedProps || {};
        console.log('props',props);
        // Función helper para asignar valor por defecto
        const getValue = (key, defaultVal = 'N/A') => {
            const value = props[key];
            return value === null || value === undefined || value === '' 
                ? defaultVal 
                : value;
        };


        const data = {
            modalCliente: event.title || 'N/A',
            textFecha: getValue('textFecha'),
            textCliente: getValue('textCliente'),
            textSocial: getValue('textSocial'),
            textEmailCliente: getValue('textEmailCliente'),
            textTecnico: getValue('textTecnico'),
            textDireccion: getValue('textDireccion'),
            textNick: getValue('textNick'),
            textForm: getValue('textForm'),
            textStatus: getValue('textStatus'),
            textCompany: getValue('textCompany'),
        };
        Object.entries(data).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        });

        const idRecord = props.id_record ? props.id_record : '0000';
        const folioRecord = props.folio ? props.folio : '0000';

        const link = document.getElementById('folio-record');
        link.href = `https://app.linkaform.com/#/records/detail/${idRecord}`;
        link.innerText = folioRecord;

        new bootstrap.Modal(document.getElementById('modalInformation')).show();
    },
}