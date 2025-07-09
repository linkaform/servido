//------Diseño de reporte
let dicReportContext = [
    {
        class: '', _children: [
            { type: 'table', col: '12', id: 'tableFirst', title: 'Almacen Monterrey', buttonCustom: true },
            { type: 'table', col: '12', id: 'tableThird', title: 'Almacen Guadalajara', buttonCustom: true },
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
    { title: "SKU", field: "sku", headerTooltip: true, hozAlign: "center", headerFilter: "input", width: 150 },
    { title: "Descripción", field: "desc", headerTooltip: true, hozAlign: "left", width: 250 },
    { title: "Linea", field: "line", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 150 },
    { title: "Familia", field: "family", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 150 },
    { title: "Peso Unit", field: "peso", headerTooltip: true, hozAlign: "center", width: 125 },
    { title: "Stock", field: "stock", headerTooltip: true, hozAlign: "center", width: 125, formatter: 'money', formatterParams: { precision: 2 } },
    { title: "Stock Minimo", field: "stock_min", headerTooltip: true, hozAlign: "center", width: 175, formatter: 'money', formatterParams: { precision: 2 } },
    { title: "Stock Maximo", field: "stock_max", headerTooltip: true, hozAlign: "center", width: 175, formatter: 'money', formatterParams: { precision: 2 } },
    { title: "Transito", field: "transit", headerTooltip: true, hozAlign: "center", width: 125, formatter: 'money', formatterParams: { precision: 2 } },
    { title: "Compra", field: "purchase", headerTooltip: true, hozAlign: "center", width: 125, formatter: 'money', formatterParams: { precision: 2 } },
    { title: "Peso Compra", field: "peso_compra", headerTooltip: true, hozAlign: "center", width: 150, formatter: 'money', formatterParams: { precision: 2 } },
    {
        title: "Orden de Compra", field: "adjust", headerTooltip: true, hozAlign: "left", width: 200,
        editor: "number", editorParams: { min: 0 }
    },
];

const dataTable1 = [
    { sku: "A123", desc: "Producto A", line: "Línea 1", family: "Familia 1", peso: "unit", stock: 50, transit: 10, purchase: 20, peso_compra: "unit", adjust: 0 },
    { sku: "B456", desc: "Producto B", line: "Línea 2", family: "Familia 2", peso: "unit", stock: 30, transit: 5, purchase: 15, peso_compra: "unit", adjust: 0 },
    { sku: "C789", desc: "Producto C", line: "Línea 1", family: "Familia 1", peso: "unit", stock: 60, transit: 8, purchase: 18, peso_compra: "unit", adjust: 0 },
    { sku: "D321", desc: "Producto D", line: "Línea 3", family: "Familia 3", peso: "unit", stock: 40, transit: 6, purchase: 12, peso_compra: "unit", adjust: 0 },
    { sku: "E654", desc: "Producto E", line: "Línea 2", family: "Familia 2", peso: "unit", stock: 70, transit: 12, purchase: 22, peso_compra: "unit", adjust: 0 },
    { sku: "F987", desc: "Producto F", line: "Línea 1", family: "Familia 1", peso: "unit", stock: 35, transit: 7, purchase: 14, peso_compra: "unit", adjust: 0 },
    { sku: "G147", desc: "Producto G", line: "Línea 3", family: "Familia 3", peso: "unit", stock: 25, transit: 4, purchase: 10, peso_compra: "unit", adjust: 0 },
    { sku: "H258", desc: "Producto H", line: "Línea 2", family: "Familia 2", peso: "unit", stock: 45, transit: 9, purchase: 16, peso_compra: "unit", adjust: 0 },
    { sku: "I369", desc: "Producto I", line: "Línea 1", family: "Familia 1", peso: "unit", stock: 80, transit: 15, purchase: 25, peso_compra: "unit", adjust: 0 },
    { sku: "J741", desc: "Producto J", line: "Línea 3", family: "Familia 3", peso: "unit", stock: 55, transit: 11, purchase: 19, peso_compra: "unit", adjust: 0 },
    { sku: "K852", desc: "Producto K", line: "Línea 2", family: "Familia 2", peso: "unit", stock: 65, transit: 13, purchase: 21, peso_compra: "unit", adjust: 0 },
    { sku: "L963", desc: "Producto L", line: "Línea 1", family: "Familia 1", peso: "unit", stock: 38, transit: 6, purchase: 13, peso_compra: "unit", adjust: 0 },
    { sku: "M159", desc: "Producto M", line: "Línea 3", family: "Familia 3", peso: "unit", stock: 47, transit: 8, purchase: 17, peso_compra: "unit", adjust: 0 },
    { sku: "N753", desc: "Producto N", line: "Línea 2", family: "Familia 2", peso: "unit", stock: 33, transit: 5, purchase: 12, peso_compra: "unit", adjust: 0 },
    { sku: "O456", desc: "Producto O", line: "Línea 1", family: "Familia 1", peso: "unit", stock: 29, transit: 3, purchase: 9, peso_compra: "unit", adjust: 0 },
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
    { title: "SKU", field: "sku", headerTooltip: true, hozAlign: "center", headerFilter: "input", width: 150 },
    { title: "Descripción", field: "desc", headerTooltip: true, hozAlign: "left", width: 250 },
    { title: "Linea", field: "line", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 150 },
    { title: "Familia", field: "family", headerTooltip: true, hozAlign: "left", headerFilter: "input", width: 150 },
    { title: "Peso Unit", field: "peso", headerTooltip: true, hozAlign: "center", width: 125 },
    { title: "Stock", field: "stock", headerTooltip: true, hozAlign: "center", width: 125, formatter: 'money', formatterParams: { precision: 2 } },
    { title: "Stock Minimo", field: "stock_min", headerTooltip: true, hozAlign: "center", width: 175, formatter: 'money', formatterParams: { precision: 2 } },
    { title: "Stock Maximo", field: "stock_max", headerTooltip: true, hozAlign: "center", width: 175, formatter: 'money', formatterParams: { precision: 2 } },
    { title: "Transito", field: "transit", headerTooltip: true, hozAlign: "center", width: 125, formatter: 'money', formatterParams: { precision: 2 } },
    { title: "Compra", field: "purchase", headerTooltip: true, hozAlign: "center", width: 125, formatter: 'money', formatterParams: { precision: 2 } },
    { title: "Peso Compra", field: "peso_compra", headerTooltip: true, hozAlign: "center", width: 150, formatter: 'money', formatterParams: { precision: 2 } },
    {
        title: "Orden de Compra", field: "adjust", headerTooltip: true, hozAlign: "left", width: 200,
        editor: "number", editorParams: { min: 0 }
    },
];


const dataTable3 = [
    { sku: "A123", desc: "Producto A", line: "Línea 1", family: "Familia 1", peso: "unit", stock: 50, transit: 10, purchase: 20, peso_compra: "unit", adjust: 0 },
    { sku: "B456", desc: "Producto B", line: "Línea 2", family: "Familia 2", peso: "unit", stock: 30, transit: 5, purchase: 15, peso_compra: "unit", adjust: 0 },
    { sku: "C789", desc: "Producto C", line: "Línea 1", family: "Familia 1", peso: "unit", stock: 60, transit: 8, purchase: 18, peso_compra: "unit", adjust: 0 },
    { sku: "D321", desc: "Producto D", line: "Línea 3", family: "Familia 3", peso: "unit", stock: 40, transit: 6, purchase: 12, peso_compra: "unit", adjust: 0 },
    { sku: "E654", desc: "Producto E", line: "Línea 2", family: "Familia 2", peso: "unit", stock: 70, transit: 12, purchase: 22, peso_compra: "unit", adjust: 0 },
    { sku: "F987", desc: "Producto F", line: "Línea 1", family: "Familia 1", peso: "unit", stock: 35, transit: 7, purchase: 14, peso_compra: "unit", adjust: 0 },
    { sku: "G147", desc: "Producto G", line: "Línea 3", family: "Familia 3", peso: "unit", stock: 25, transit: 4, purchase: 10, peso_compra: "unit", adjust: 0 },
    { sku: "H258", desc: "Producto H", line: "Línea 2", family: "Familia 2", peso: "unit", stock: 45, transit: 9, purchase: 16, peso_compra: "unit", adjust: 0 },
    { sku: "I369", desc: "Producto I", line: "Línea 1", family: "Familia 1", peso: "unit", stock: 80, transit: 15, purchase: 25, peso_compra: "unit", adjust: 0 },
    { sku: "J741", desc: "Producto J", line: "Línea 3", family: "Familia 3", peso: "unit", stock: 55, transit: 11, purchase: 19, peso_compra: "unit", adjust: 0 },
    { sku: "K852", desc: "Producto K", line: "Línea 2", family: "Familia 2", peso: "unit", stock: 65, transit: 13, purchase: 21, peso_compra: "unit", adjust: 0 },
    { sku: "L963", desc: "Producto L", line: "Línea 1", family: "Familia 1", peso: "unit", stock: 38, transit: 6, purchase: 13, peso_compra: "unit", adjust: 0 },
    { sku: "M159", desc: "Producto M", line: "Línea 3", family: "Familia 3", peso: "unit", stock: 47, transit: 8, purchase: 17, peso_compra: "unit", adjust: 0 },
    { sku: "N753", desc: "Producto N", line: "Línea 2", family: "Familia 2", peso: "unit", stock: 33, transit: 5, purchase: 12, peso_compra: "unit", adjust: 0 },
    { sku: "O456", desc: "Producto O", line: "Línea 1", family: "Familia 1", peso: "unit", stock: 29, transit: 3, purchase: 9, peso_compra: "unit", adjust: 0 },
];