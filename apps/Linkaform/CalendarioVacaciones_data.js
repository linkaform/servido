//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'calendar', col: '12', id:'calendarFirst', title:'Calendario'},
        ] 
    },
    { class:'', _children : [
            { type:'modal', col: '12', id:'modalInformation', title:'Detalles', formElements : [
                    {type:'p', title:'Folio:', id:'textFolio'},
                    {type:'p', title:'Usuario:', id:'textUserName'},
                    {type:'p', title:'Email del Usuario:', id:'textUserEmail'},
                    {type:'p', title:'Movimiento:', id:'textTypeMovement'},
                    {type:'p', title:'Total de días:', id:'textTotalDays'},

                    {type:'p', title:'Fecha de Inicio:', id:'textDateStart'},
                    {type:'p', title:'Fecha de Fin:', id:'textDateEnd'},

                    {type:'p', title:'Status:', id:'textStatus'},
                    {type:'p', title:'Numero de Emergencia:', id:'textPhoneEmergency'},
                    {type:'p', title:'Comentarios:', id:'textComments'},
                ]
            },
        ] 
    },
];

let events = [
    {
        extendedProps: {
            textFolio: '001',
            textUserName: 'Josue De Jesus',
            textUserEmail: 'josue1@mail.com',
            textTypeMovement: 'Vacaciones',
            textTotalDays: '4',
            textStatus: 'Aprobado',
            textPhoneEmergency: '5550001111',
            textComments: 'Viaje familiar',
        },
        allDay: true,
        description: "Vacaciones",
        title: "Josue De Jesus",
        start: "2026-03-01",
        end: "2026-03-05",
        color: "#073b4c",
        eventBackgroundColor: "#073b4c"
    },
    {
        extendedProps: {
            textFolio: '002',
            textUserName: 'Ana Lopez',
            textUserEmail: 'ana@mail.com',
            textTypeMovement: 'Permiso',
            textTotalDays: '1',
            textStatus: 'Pendiente',
            textPhoneEmergency: '5550002222',
            textComments: 'Asunto personal',
        },
        allDay: true,
        description: "Permiso",
        title: "Ana Lopez",
        start: "2026-03-06",
        end: "2026-03-07",
        color: "#ef476f",
        eventBackgroundColor: "#ef476f"
    },
    {
        extendedProps: {
            textFolio: '003',
            textUserName: 'Carlos Perez',
            textUserEmail: 'carlos@mail.com',
            textTypeMovement: 'Incapacidad',
            textTotalDays: '3',
            textStatus: 'Aprobado',
            textPhoneEmergency: '5550003333',
            textComments: 'Enfermedad',
        },
        allDay: true,
        description: "Incapacidad",
        title: "Carlos Perez",
        start: "2026-03-08",
        end: "2026-03-11",
        color: "#ffd166",
        eventBackgroundColor: "#ffd166"
    },
    {
        extendedProps: {
            textFolio: '004',
            textUserName: 'Maria Ruiz',
            textUserEmail: 'maria@mail.com',
            textTypeMovement: 'Vacaciones',
            textTotalDays: '2',
            textStatus: 'Aprobado',
            textPhoneEmergency: '5550004444',
            textComments: 'Descanso',
        },
        allDay: true,
        description: "Vacaciones",
        title: "Maria Ruiz",
        start: "2026-03-10",
        end: "2026-03-12",
        color: "#06d6a0",
        eventBackgroundColor: "#06d6a0"
    },
    {
        extendedProps: {
            textFolio: '005',
            textUserName: 'Luis Gomez',
            textUserEmail: 'luis@mail.com',
            textTypeMovement: 'Permiso',
            textTotalDays: '1',
            textStatus: 'Rechazado',
            textPhoneEmergency: '5550005555',
            textComments: 'No autorizado',
        },
        allDay: true,
        description: "Permiso",
        title: "Luis Gomez",
        start: "2026-03-12",
        end: "2026-03-13",
        color: "#118ab2",
        eventBackgroundColor: "#118ab2"
    },
    {
        extendedProps: {
            textFolio: '006',
            textUserName: 'Sofia Martinez',
            textUserEmail: 'sofia@mail.com',
            textTypeMovement: 'Vacaciones',
            textTotalDays: '5',
            textStatus: 'Aprobado',
            textPhoneEmergency: '5550006666',
            textComments: 'Viaje playa',
        },
        allDay: true,
        description: "Vacaciones",
        title: "Sofia Martinez",
        start: "2026-03-14",
        end: "2026-03-19",
        color: "#8338ec",
        eventBackgroundColor: "#8338ec"
    },
    {
        extendedProps: {
            textFolio: '007',
            textUserName: 'Pedro Sanchez',
            textUserEmail: 'pedro@mail.com',
            textTypeMovement: 'Incapacidad',
            textTotalDays: '2',
            textStatus: 'Pendiente',
            textPhoneEmergency: '5550007777',
            textComments: 'Revisión médica',
        },
        allDay: true,
        description: "Incapacidad",
        title: "Pedro Sanchez",
        start: "2026-03-18",
        end: "2026-03-20",
        color: "#ff9f1c",
        eventBackgroundColor: "#ff9f1c"
    },
    {
        extendedProps: {
            textFolio: '008',
            textUserName: 'Laura Torres',
            textUserEmail: 'laura@mail.com',
            textTypeMovement: 'Permiso',
            textTotalDays: '1',
            textStatus: 'Aprobado',
            textPhoneEmergency: '5550008888',
            textComments: 'Trámite',
        },
        allDay: true,
        description: "Permiso",
        title: "Laura Torres",
        start: "2026-03-20",
        end: "2026-03-21",
        color: "#2ec4b6",
        eventBackgroundColor: "#2ec4b6"
    },
    {
        extendedProps: {
            textFolio: '009',
            textUserName: 'Miguel Herrera',
            textUserEmail: 'miguel@mail.com',
            textTypeMovement: 'Vacaciones',
            textTotalDays: '3',
            textStatus: 'Aprobado',
            textPhoneEmergency: '5550009999',
            textComments: 'Descanso',
        },
        allDay: true,
        description: "Vacaciones",
        title: "Miguel Herrera",
        start: "2026-03-22",
        end: "2026-03-25",
        color: "#ff006e",
        eventBackgroundColor: "#ff006e"
    },
    {
        extendedProps: {
            textFolio: '010',
            textUserName: 'Elena Castro',
            textUserEmail: 'elena@mail.com',
            textTypeMovement: 'Permiso',
            textTotalDays: '2',
            textStatus: 'Pendiente',
            textPhoneEmergency: '5550010000',
            textComments: 'Evento personal',
        },
        allDay: true,
        description: "Permiso",
        title: "Elena Castro",
        start: "2026-03-25",
        end: "2026-03-27",
        color: "#3a86ff",
        eventBackgroundColor: "#3a86ff"
    }
];

//----Config Calendar
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
        day: 'Día'
    },
    dateClick: function (info) {
        dateClick = info.dateStr;
        new bootstrap.Modal(document.getElementById('modalForm')).show();
    },
    eventClick: function (info) {
        const event = info.event;
        const props = event.extendedProps || {};

        const data = {
            modalCliente: event.title || 'N/A',
            textFolio: props.textFolio || 'N/A',
            textUserName: props.textUserName || 'N/A',
            textUserEmail: props.textUserEmail || 'N/A',
            textTypeMovement: props.textTypeMovement || 'N/A',
            textTotalDays: props.textTotalDays || 'N/A',
            textDateStart: props.date_start || 'N/A',
            textDateEnd: props.date_end || 'N/A',
            textStatus: props.textStatus || 'N/A',
            textPhoneEmergency: props.textPhoneEmergency || 'N/A',
            textComments: props.textComments || 'N/A',
        };

        Object.entries(data).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        });

        new bootstrap.Modal(document.getElementById('modalInformation')).show();
    },
};