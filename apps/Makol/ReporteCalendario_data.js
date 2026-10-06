//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'calendar', col: '12', id:'calendarFirst', title:'Calendarios'},
        ] 
    },
    { class:'', _children : [
            { type:'modal', col: '12', id:'modalData', title:'Datos del mantenimiento', formElements : [
                    {type:'p', title:'Cliente:', id:'textClient'},
                    {type:'p', title:'Instrumento:', id:'textInstrument'},
                    {type:'p', title:'Marca:', id:'textBrand'},
                    {type:'p', title:'Model:', id:'textModel'},
                    {type:'p', title:'Serie:', id:'textSerie'},
                    {type:'p', title:'Folio:', id:'textFolio'},
                    {type:'p', title:'Tipo de Asistencia:', id:'textTypeAsistance'},
                    {type:'p', title:'Estatus:', id:'textStatus'},
                ]
            },
        ] 
    },
];





let events =  [
    {
        "extendedProps": {
            "instrument": "EQUIPO DE IDENTIFICACION MICROBIANA",
            "folio": "595-16314",
            "client": "SALUDESA",
            "brand": "PHOENIX M50",
            "model": "BECTON DICKINSON"
        },
        "allDay": "true",
        "description": "EQUIPO DE IDENTIFICACION MICROBIANA",
        "title": "SALUDESA",
        "color": "#e74c3c",
        "start": "2025-02-05",
        "eventBackgroundColor": "#e74c3c"
    },
    {
        "extendedProps": {
            "instrument": "EQUIPO DE IDENTIFICACION MICROBIANA",
            "folio": "595-16314",
            "client": "SALUDESA",
            "brand": "PHOENIX M50",
            "model": "BECTON DICKINSON"
        },
        "allDay": "true",
        "description": "EQUIPO DE IDENTIFICACION MICROBIANA",
        "title": "SALUDESA",
        "color": "#e74c3c",
        "start": "2025-02-20",
        "eventBackgroundColor": "#58d68d"
    }
]


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
    windowResize: function (view) {
        const newView = window.innerWidth < 768 ? 'dayGridMonth' : 'dayGridMonth';
        calendar.changeView(newView);
    },
    eventClick: function (info) {
        showInformation(info);
    },
}