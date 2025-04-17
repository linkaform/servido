//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '7', id:'tableFirst', title:'Ordenes de Trabajo', optionExpanded:true},
        ] 
    },
];

let columsTable1 = [
    { 
        title: "Supervisor", 
        field: 'supervisor', 
        headerTooltip: true, 
        hozAlign: "left", 
        width: 230, 
        responsive: 1,
        formatter: function(cell) {
            let data = cell.getData();
            let value = cell.getValue();
            if (window.innerWidth < 600) {
                return data.supervisor; 
            }else{
                console.log('Entra Almacenes')
                if(data.cliente == undefined){
                    console.log('Value',value)
                    return value; 
                }else{
                    return ''
                }
            }
            return value || ""; 
        }
    },
    { title: "Folio", field: 'folio', hozAlign: "left", formatter: "link", 
        formatterParams: {
            url: function(cell) {
                let data = cell.getData();
                return data.record_id ? "https://app.linkaform.com/#/records/detail/" + data.record_id : "#"; 
            }, 
            target: "_blank"
        },
        headerFilter: "input", width: 150, responsive: 2 
    },
    { title: "Cliente", field: 'cliente', headerTooltip: true, hozAlign: "left", width: 310, responsive: 2 },
    { title: "Localidad", field: 'localidad', headerTooltip: true, hozAlign: "left", width: 140, responsive: 2},
    { title: "Tipo", field: 'tipo', headerTooltip: true, hozAlign: "center", width: 140, responsive: 2 },
    { title: "Fecha", field: 'created_at', headerTooltip: true, hozAlign: "center", width: 150, responsive: 2},
];

let configTableCustom1 = {
    height: "400px",
    layout: "fitDataFill",
    theme: "bootstrap5", 
    columnMinWidth: 100,
    autoColumns: false, 
    scrollX: true, 
    dataTree: true,
    dataTreeStartExpanded: true,
    responsiveLayout: "collapse", 
    responsiveLayoutCollapse: {
        startOpen: false, // Evita que las filas colapsadas se expandan por defecto
    },
    rowFormatter: function(row) {

        if (window.innerWidth < 600 ) {
            let data = row.getData();
            let emptyFields = ["folio", "cliente", "localidad", "tipo", "created_at"].every(
                key => !data[key]
            );

            if (emptyFields) {
                row.getElement().classList.add("d-none"); // Oculta la fila
            }
        }
    }
};


let dataTable1 = [
    {
        'supervisor': 'Jose Luis Benítez Benítez',
        '_children': [
            {  'supervisor': 'Jose Luis Benítez Benítez','folio': '2001-8369', 'cliente': 'CCN', 'localidad': 'Localidad 1', 'tipo': 'Servicio' ,'created_at':'2025/03/01'},
            {  'supervisor': 'Jose Luis Benítez Benítez','folio': '2002-8369', 'cliente': 'Concesionario', 'localidad': 'Localidad 2', 'tipo': 'Servicio' ,'created_at':'2025/03/01'}
        ]
    },
    {
        'supervisor': 'María Fernández López',
        '_children': [
            { 'folio': '2003-4578', 'cliente': 'ABC Corp', 'localidad': 'Localidad 3', 'tipo': 'Instalación' ,'created_at':'2025/03/01'}
        ]
    },
    {
        'supervisor': 'Carlos Ramírez Ortega',
        '_children': [
            { 'folio': '2004-1123', 'cliente': 'XYZ Ltd.', 'localidad': 'Localidad 4', 'tipo': 'Mantenimiento' ,'created_at':'2025/03/01'},
            { 'folio': '2005-3345', 'cliente': 'Empresa 123', 'localidad': 'Localidad 5', 'tipo': 'Reparación' ,'created_at':'2025/03/01'},
            { 'folio': '2006-9987', 'cliente': 'Servicio Rápido', 'localidad': 'Localidad 6', 'tipo': 'Diagnóstico' ,'created_at':'2025/03/01'}
        ]
    },
    {
        'supervisor': 'Ana Torres Martínez',
        '_children': []
    },
    {
        'supervisor': 'Luis García Herrera',
        '_children': [
            { 'folio': '2007-7777', 'cliente': 'Global Tech', 'localidad': 'Localidad 7', 'tipo': 'Servicio' ,'created_at':'2025/03/01'},
            { 'folio': '2008-8888', 'cliente': 'Fast Solutions', 'localidad': 'Localidad 8', 'tipo': 'Instalación' ,'created_at':'2025/03/01'}
        ]
    },
    {
        'supervisor': 'Sofía Méndez Pérez',
        '_children': [
            { 'folio': '2009-3333', 'cliente': 'Tienda Online', 'localidad': 'Localidad 9', 'tipo': 'Revisión' ,'created_at':'2025/03/01'}
        ]
    },
    {
        'supervisor': 'Ricardo Gómez Ruiz',
        '_children': [
            { 'folio': '2010-5555', 'cliente': 'ElectroHogar', 'localidad': 'Localidad 10', 'tipo': 'Mantenimiento' ,'created_at':'2025/03/01'},
            { 'folio': '2011-6666', 'cliente': 'Automotriz X', 'localidad': 'Localidad 11', 'tipo': 'Reparación' ,'created_at':'2025/03/01'}
        ]
    },
    {
        'supervisor': 'Gabriela Castro León',
        '_children': [
            { 'folio': '2012-1111', 'cliente': 'Farmacia Nacional', 'localidad': 'Localidad 12', 'tipo': 'Diagnóstico' ,'created_at':'2025/03/01'}
        ]
    },
    {
        'supervisor': 'Fernando Vargas Salas',
        '_children': []
    },
    {
        'supervisor': 'Patricia Herrera Silva',
        '_children': [
            { 'folio': '2013-9999', 'cliente': 'Supermercado Express', 'localidad': 'Localidad 13', 'tipo': 'Revisión' ,'created_at':'2025/03/01'}
        ]
    },
    {
        'supervisor': 'Daniel Soto Pineda',
        '_children': [
            { 'folio': '2014-2222', 'cliente': 'Distribuidora YZ', 'localidad': 'Localidad 14', 'tipo': 'Servicio' ,'created_at':'2025/03/01'},
            { 'folio': '2015-4444', 'cliente': 'Almacenes Pérez', 'localidad': 'Localidad 15', 'tipo': 'Instalación' ,'created_at':'2025/03/01'}
        ]
    },
    {
        'supervisor': 'Carolina Ríos López',
        '_children': [
            { 'folio': '2016-7777', 'cliente': 'Ferretería Martínez', 'localidad': 'Localidad 16', 'tipo': 'Mantenimiento' ,'created_at':'2025/03/01'}
        ]
    },
    {
        'supervisor': 'Roberto Peña Díaz',
        '_children': []
    },
    {
        'supervisor': 'Isabel Romero Guzmán',
        '_children': [
            { 'folio': '2017-5555', 'cliente': 'Constructora Omega', 'localidad': 'Localidad 17', 'tipo': 'Revisión' ,'created_at':'2025/03/01'},
            { 'folio': '2018-6666', 'cliente': 'Refaccionaria Beta', 'localidad': 'Localidad 18', 'tipo': 'Reparación' ,'created_at':'2025/03/01'}
        ]
    },
    {
        'supervisor': 'Esteban Salinas Muñoz',
        '_children': [
            { 'folio': '2019-8888', 'cliente': 'Panadería La Estrella', 'localidad': 'Localidad 19', 'tipo': 'Servicio' ,'created_at':'2025/03/01'}
        ]
    }
];
