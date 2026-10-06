//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Almacen Monterrey', buttonCustom:true},
            { type:'table', col: '8', id:'tableSecond', title:'Almacen Monterrey (Sin disponibilidad para surtir)'},
            { type:'table', col: '12', id:'tableThird', title:'Almacen Guadalajara', buttonCustom:true},
            { type:'table', col: '8', id:'tableFourth', title:'Almacen Guadalajara (Sin disponibilidad para surtir)'},
        ] 
    },
];


//----TABLE Monterrey
let columsTable1 = [
    {
        title: "...", field: "select", hozAlign: "left", width: 60, headerTooltip: true,
        formatter: "rowSelection", titleFormatter: "rowSelection",
        headerSort: false, cellClick: function (e, cell) {
            cell.getRow().toggleSelect();
        }
    },
    { title: "SKU", field: "sku", headerTooltip: true, hozAlign: "center", headerFilter:"input", width: 150 },
    { title: "Descripción", field: "desc", headerTooltip: true, hozAlign: "left", width: 250 },
    { title: "Familia", field: "product_family", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 150 },
    { title: "Linea", field: "line", headerTooltip: true, hozAlign: "left",  headerFilter:"input", width: 125 },
    { title: "UoM", field: "uom", headerTooltip: true, hozAlign: "center", width: 100 ,  },
    { title: "Standar Pack", field: "standar_pack", headerTooltip: true, hozAlign: "center", width: 150 ,  formatter:'money', formatterParams: { precision: 2}},
    { title: "% Inicial", field: "percentage_start", headerTooltip: true, hozAlign: "left", width: 125, formatter:'money', formatterParams: { precision: 2,symbolAfter:"%"} },
    { title: "Stock", field: "stock", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2} },
    { title: "Requiere", field: "procurment_qty", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2} },
    { title: "Traspaso", field: "handover", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2} },
    { title: "Stock Final", field: "stock_final", headerTooltip: true, hozAlign: "center", width: 150, formatter:'money', formatterParams: { precision: 2} },
    { title: "% Final", field: "percentage_finish", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2,symbolAfter:"%"} },
    { title: "Peso Unit", field: "peso", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2,symbolAfter:"%"} },
    { title: "Peso Subtotal", field: "peso_subtotal", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2,symbolAfter:"%"} },
    { title: "Origen", field: "from", headerTooltip: true, hozAlign: "left", headerFilter:"input", width: 200 },
    { title: "Max Stock", field: "from_max_stock", headerTooltip: true, hozAlign: "center", width: 150 ,  formatter:'money', formatterParams: { precision: 2}},
    { title: "Origen Stock", field: "from_initial_stock", headerTooltip: true, hozAlign: "center", width: 150 ,  formatter:'money', formatterParams: { precision: 2}},
    { title: "Origen Final Stock", field: "from_final_stock", headerTooltip: true, hozAlign: "center", width: 150 ,  formatter:'money', formatterParams: { precision: 2}},
    {
        title: "Ajuste Traspaso", field: "adjust", headerTooltip: true, hozAlign: "left", width: 200,
        editor: "number", editorParams: { min: 0 }
    },
];


const dataTable1 = [
    { sku: "A123", desc: "Producto A", line: "Línea 1", percentage_start: 10, stock: 50, handover: 5, percentage_finish: 12, from: "Almacén 1", adjust: 0 },
    { sku: "B456", desc: "Producto B", line: "Línea 2", percentage_start: 15, stock: 30, handover: 3, percentage_finish: 18, from: "Almacén 2", adjust: 0 },
    { sku: "C789", desc: "Producto C", line: "Línea 1", percentage_start: 8, stock: 60, handover: 7, percentage_finish: 10, from: "Almacén 3", adjust: 0 },
    { sku: "D321", desc: "Producto D", line: "Línea 3", percentage_start: 12, stock: 40, handover: 4, percentage_finish: 14, from: "Almacén 1", adjust: 0 },
    { sku: "E654", desc: "Producto E", line: "Línea 2", percentage_start: 9, stock: 70, handover: 6, percentage_finish: 11, from: "Almacén 4", adjust: 0 },
    { sku: "F987", desc: "Producto F", line: "Línea 1", percentage_start: 11, stock: 35, handover: 3, percentage_finish: 13, from: "Almacén 2", adjust: 0 },
    { sku: "G147", desc: "Producto G", line: "Línea 3", percentage_start: 7, stock: 25, handover: 2, percentage_finish: 8, from: "Almacén 5", adjust: 0 },
    { sku: "H258", desc: "Producto H", line: "Línea 2", percentage_start: 16, stock: 45, handover: 5, percentage_finish: 17, from: "Almacén 1", adjust: 0 },
    { sku: "I369", desc: "Producto I", line: "Línea 1", percentage_start: 13, stock: 80, handover: 9, percentage_finish: 15, from: "Almacén 4", adjust: 0 },
    { sku: "J741", desc: "Producto J", line: "Línea 3", percentage_start: 14, stock: 55, handover: 6, percentage_finish: 16, from: "Almacén 2", adjust: 0 },
    { sku: "K852", desc: "Producto K", line: "Línea 2", percentage_start: 10, stock: 65, handover: 7, percentage_finish: 12, from: "Almacén 3", adjust: 0 },
    { sku: "L963", desc: "Producto L", line: "Línea 1", percentage_start: 11, stock: 38, handover: 4, percentage_finish: 13, from: "Almacén 5", adjust: 0 },
    { sku: "M159", desc: "Producto M", line: "Línea 3", percentage_start: 9, stock: 47, handover: 5, percentage_finish: 11, from: "Almacén 2", adjust: 0 },
    { sku: "N753", desc: "Producto N", line: "Línea 2", percentage_start: 12, stock: 33, handover: 3, percentage_finish: 14, from: "Almacén 1", adjust: 0 },
    { sku: "O456", desc: "Producto O", line: "Línea 1", percentage_start: 8, stock: 29, handover: 2, percentage_finish: 9, from: "Almacén 4", adjust: 0 },
];




//----TABLE Monterrey
let columsTable2 = [
    { title: "SKU", field: "sku", headerTooltip: true, hozAlign: "center", headerFilter:"input", width: 150 },
    { title: "Descripción", field: "desc", headerTooltip: true, hozAlign: "left", width: 250 },
    { title: "Familia", field: "product_family", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 150 },
    { title: "Linea", field: "line", headerTooltip: true, hozAlign: "left",  headerFilter:"input", width: 200 },
    { title: "% Inicial", field: "percentage_start", headerTooltip: true, hozAlign: "left", width: 125, formatter:'money', formatterParams: { precision: 2,symbolAfter:"%"} },
    { title: "Stock", field: "stock", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2} },
    { title: "Requiere", field: "procurment_qty", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2} },

];

const dataTable2 = [
    { sku: "P111", desc: "Producto P", line: "Línea 4", percentage_start: 14, stock: 90, },
    { sku: "Q222", desc: "Producto Q", line: "Línea 5", percentage_start: 11, stock: 20, },
    { sku: "R333", desc: "Producto R", line: "Línea 4", percentage_start: 9, stock: 75, },
    { sku: "S444", desc: "Producto S", line: "Línea 5", percentage_start: 13, stock: 60, },
    { sku: "T555", desc: "Producto T", line: "Línea 4", percentage_start: 12, stock: 85, },
    { sku: "U666", desc: "Producto U", line: "Línea 5", percentage_start: 10, stock: 95,  },
    { sku: "V777", desc: "Producto V", line: "Línea 4", percentage_start: 8, stock: 40,  },
    { sku: "W888", desc: "Producto W", line: "Línea 5", percentage_start: 15, stock: 100,},
    { sku: "X999", desc: "Producto X", line: "Línea 4", percentage_start: 7, stock: 30,  },
    { sku: "Y000", desc: "Producto Y", line: "Línea 5", percentage_start: 16, stock: 65, },
];


//----TABLE Gudalajara
let columsTable3 = [
    {
        title: "...", field: "select", hozAlign: "left", width: 60, headerTooltip: true,
        formatter: "rowSelection", titleFormatter: "rowSelection",
        headerSort: false, cellClick: function (e, cell) {
            cell.getRow().toggleSelect();
        }
    },
    { title: "SKU", field: "sku", headerTooltip: true, hozAlign: "center", headerFilter:"input", width: 150 },
    { title: "Descripción", field: "desc", headerTooltip: true, hozAlign: "left", width: 250 },
    { title: "Familia", field: "product_family", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 150 },
    { title: "Linea", field: "line", headerTooltip: true, hozAlign: "left",  headerFilter:"input", width: 125 },
    { title: "UoM", field: "uom", headerTooltip: true, hozAlign: "center", width: 100 ,  },
    { title: "Standar Pack", field: "standar_pack", headerTooltip: true, hozAlign: "center", width: 150 ,  formatter:'money', formatterParams: { precision: 2}},
    { title: "% Inicial", field: "percentage_start", headerTooltip: true, hozAlign: "left", width: 125, formatter:'money', formatterParams: { precision: 2,symbolAfter:"%"} },
    { title: "Stock", field: "stock", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2} },
    { title: "Requiere", field: "procurment_qty", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2} },
    { title: "Traspaso", field: "handover", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2} },
    { title: "Stock Final", field: "stock_final", headerTooltip: true, hozAlign: "center", width: 150, formatter:'money', formatterParams: { precision: 2} },
    { title: "% Final", field: "percentage_finish", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2,symbolAfter:"%"} },
    { title: "Peso Unit", field: "peso", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2,symbolAfter:"%"} },
    { title: "Peso Subtotal", field: "peso_subtotal", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2,symbolAfter:"%"} },
    { title: "Origen", field: "from", headerTooltip: true, hozAlign: "left", headerFilter:"input", width: 200 },
    { title: "Max Stock", field: "from_max_stock", headerTooltip: true, hozAlign: "center", width: 150 ,  formatter:'money', formatterParams: { precision: 2}},
    { title: "Origen Stock", field: "from_initial_stock", headerTooltip: true, hozAlign: "center", width: 150 ,  formatter:'money', formatterParams: { precision: 2}},
    { title: "Origen Final Stock", field: "from_final_stock", headerTooltip: true, hozAlign: "center", width: 150 ,  formatter:'money', formatterParams: { precision: 2}},
    {
        title: "Ajuste Traspaso", field: "adjust", headerTooltip: true, hozAlign: "left", width: 200,
        editor: "number", editorParams: { min: 0 }
    },
];


const dataTable3 = [
    { sku: "A123", desc: "Producto A", line: "Línea 1", percentage_start: 10, stock: 50 },
    { sku: "B456", desc: "Producto B", line: "Línea 2", percentage_start: 15, stock: 30},
    { sku: "C789", desc: "Producto C", line: "Línea 1", percentage_start: 8, stock: 60},
    { sku: "D321", desc: "Producto D", line: "Línea 3", percentage_start: 12, stock: 40},
    { sku: "E654", desc: "Producto E", line: "Línea 2", percentage_start: 9, stock: 70},
    { sku: "F987", desc: "Producto F", line: "Línea 1", percentage_start: 11, stock: 35},
    { sku: "G147", desc: "Producto G", line: "Línea 3", percentage_start: 7, stock: 25 },
    { sku: "H258", desc: "Producto H", line: "Línea 2", percentage_start: 16, stock: 45},
    { sku: "I369", desc: "Producto I", line: "Línea 1", percentage_start: 13, stock: 80},
    { sku: "J741", desc: "Producto J", line: "Línea 3", percentage_start: 14, stock: 55 },
    { sku: "K852", desc: "Producto K", line: "Línea 2", percentage_start: 10, stock: 65},
    { sku: "L963", desc: "Producto L", line: "Línea 1", percentage_start: 11, stock: 38},
    { sku: "M159", desc: "Producto M", line: "Línea 3", percentage_start: 9, stock: 47},
    { sku: "N753", desc: "Producto N", line: "Línea 2", percentage_start: 12, stock: 33 },
    { sku: "O456", desc: "Producto O", line: "Línea 1", percentage_start: 8, stock: 29},
];


let columsTable4     = [
    { title: "SKU", field: "sku", headerTooltip: true, hozAlign: "center", headerFilter:"input", width: 150 },
    { title: "Descripción", field: "desc", headerTooltip: true, hozAlign: "left", width: 250 },
    { title: "Familia", field: "product_family", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 150 },
    { title: "Linea", field: "line", headerTooltip: true, hozAlign: "left",  headerFilter:"input", width: 200 },
    { title: "% Inicial", field: "percentage_start", headerTooltip: true, hozAlign: "left", width: 125, formatter:'money', formatterParams: { precision: 2,symbolAfter:"%"} },
    { title: "Stock", field: "stock", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2} },
    { title: "Requiere", field: "procurment_qty", headerTooltip: true, hozAlign: "center", width: 125, formatter:'money', formatterParams: { precision: 2} },

];

const dataTable4 = [
    { sku: "Z101", desc: "Producto Z", line: "Línea 6", percentage_start: 5, stock: 110, handover: 12, percentage_finish: 6, from: "Almacén 10", adjust: 0 },
    { sku: "AA202", desc: "Producto AA", line: "Línea 7", percentage_start: 6, stock: 95, handover: 8, percentage_finish: 7, from: "Almacén 11", adjust: 0 },
    { sku: "BB303", desc: "Producto BB", line: "Línea 6", percentage_start: 4, stock: 120, handover: 15, percentage_finish: 5, from: "Almacén 12", adjust: 0 },
    { sku: "CC404", desc: "Producto CC", line: "Línea 7", percentage_start: 7, stock: 105, handover: 9, percentage_finish: 9, from: "Almacén 10", adjust: 0 },
    { sku: "DD505", desc: "Producto DD", line: "Línea 6", percentage_start: 3, stock: 130, handover: 10, percentage_finish: 4, from: "Almacén 13", adjust: 0 },
    { sku: "EE606", desc: "Producto EE", line: "Línea 7", percentage_start: 6, stock: 115, handover: 7, percentage_finish: 8, from: "Almacén 11", adjust: 0 },
    { sku: "FF707", desc: "Producto FF", line: "Línea 6", percentage_start: 5, stock: 100, handover: 6, percentage_finish: 6, from: "Almacén 14", adjust: 0 },
    { sku: "GG808", desc: "Producto GG", line: "Línea 7", percentage_start: 4, stock: 85, handover: 5, percentage_finish: 5, from: "Almacén 12", adjust: 0 },
    { sku: "HH909", desc: "Producto HH", line: "Línea 6", percentage_start: 8, stock: 140, handover: 14, percentage_finish: 9, from: "Almacén 13", adjust: 0 },
    { sku: "II010", desc: "Producto II", line: "Línea 7", percentage_start: 9, stock: 125, handover: 11, percentage_finish: 10, from: "Almacén 14", adjust: 0 },
];
