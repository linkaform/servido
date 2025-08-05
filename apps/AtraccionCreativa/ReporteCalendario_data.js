//------Diseño de reporte
let dicReportContext = [
    // {
    //     class: '', _children: [
    //         // { type: 'table', col: '12', id: 'tableFirst', title: 'Almacen Monterrey', buttonCustom: true },
    //         { type: 'table', col: '4', id: 'tableFirst', title: 'Ordenes de Servicio', buttonCustom: false },
    //         { type: 'table', col: '4', id: 'tableSecond', title: 'UDS Iguala', buttonCustom: false },
    //         { type: 'table', col: '4', id: 'tableThird', title: 'Status OS', buttonCustom: false },
    //         { type: 'table', col: '4', id: 'tableFourth', title: 'UDS por tipo de Mantto', buttonCustom: false },
    //         { type: 'table', col: '4', id: 'tableFifth', title: 'UDS por Estado', buttonCustom: false },
    //         { type: 'table', col: '4', id: 'tableSixth', title: 'UDS por tipo de Mueble', buttonCustom: false },
    //         { type: 'table', col: '4', id: 'tableSeventh', title: 'UDS por canal', buttonCustom: false },
    //     ]
    // },
];

let columsTable1 = [
    { title: "Tipo", field: "type", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 250 },
    { title: "Cantidad", field: "qty", headerTooltip: true, hozAlign: "center", width: 100 },
];

const dataTable1 = [
    { type: "OS Totales del mes en curso", qty: 20 },
    { type: "OS Activas / En Curso", qty: 30 },
    { type: "OS PDV", qty: 40 },
    { type: "OS Taller", qty: 50 },
    { type: "OS POP", qty: 60 },
    { type: "OS Terminadas", qty: 70 },
    { type: "OS Pendientes", qty: 80 },
    { type: "OS Canceladas", qty: 90 },
];

let columsTable2 = [
    { title: "Tipo", field: "type", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 250 },
    { title: "Cantidad", field: "qty", headerTooltip: true, hozAlign: "center", width: 100 },
];

const dataTable2 = [
    { type: "Iguala", qty: 20 },
    { type: "Asignadas", qty: 30 },
    { type: "Pendientes", qty: 40 },
    { type: "Adelantadas", qty: 50 },
];

let columsTable3 = [
    { title: "Tipo", field: "type", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 250 },
    { title: "Cantidad", field: "qty", headerTooltip: true, hozAlign: "center", width: 100 },
];

const dataTable3 = [
    { type: "Generadas", qty: 20 },
    { type: "Viabilidad", qty: 30 },
    { type: "Levantamiento", qty: 40 },
    { type: "Autorizacion SEM", qty: 50 },
    { type: "Ejecucion", qty: 60 },
    { type: "Terminadas", qty: 70 },
];

let columsTable4 = [
    { title: "Tipo", field: "type", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 250 },
    { title: "Cantidad", field: "qty", headerTooltip: true, hozAlign: "center", width: 100 },
];

const dataTable4 = [
    { type: "Mini", qty: 20 },
    { type: "Bajo", qty: 30 },
    { type: "Medio", qty: 40 },
    { type: "Alto", qty: 50 },
];

let columsTable5 = [
    { title: "Tipo", field: "type", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 250 },
    { title: "Cantidad", field: "qty", headerTooltip: true, hozAlign: "center", width: 100 },
];

const dataTable5 = [
    { type: "CDMX", qty: 20 },
    { type: "Edo. Mex.", qty: 30 },
    { type: "Queretaro", qty: 40 },
    { type: "Puebla", qty: 50 },
    { type: "Monterrey", qty: 60 },
    { type: "Guadalajara", qty: 70 },
    { type: "Merida", qty: 80 },
];

let columsTable6 = [
    { title: "Tipo", field: "type", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 250 },
    { title: "Cantidad", field: "qty", headerTooltip: true, hozAlign: "center", width: 100 },
];

const dataTable6 = [
    { type: "Counter", qty: 20 },
    { type: "Mesa", qty: 30 },
    { type: "Muros", qty: 40 },
    { type: "Iluminacion", qty: 50 },
];

let columsTable7 = [
    { title: "Tipo", field: "type", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 250 },
    { title: "Cantidad", field: "qty", headerTooltip: true, hozAlign: "center", width: 100 },
];

const dataTable7 = [
    { type: "SES", qty: 20 },
    { type: "Telcel", qty: 30 },
    { type: "Liverpool", qty: 40 },
    { type: "Sears", qty: 50 },
];

// let configTableCustom3 = {
//     height: "900px",
//     layout: "fitData",
//     theme: "bootstrap5",
//     columnMinWidth: 100,
//     scrollX: true,
// };