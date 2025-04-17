//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Table Count',buttonCustom:true},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '6', id:'chartFirst', title:'Adjustment x Wharehouse'},
            { type:'chart', col: '6', id:'chartSecond', title:'Adjustment X Crop'},
        ] 
    },
];


//----Config Table
let columsTable1 = [
    { title:"Wharehouse", field:'wharehouse', headerTooltip: true, hozAlign:"left", width:250 },
    { title:"Location", field:'location', headerTooltip: true, hozAlign:"left", width:200 },
    { title:"Product", field:'product', headerTooltip: true, hozAlign:"left", width:150 },
    { title:"Count 1", field:'count_1', headerTooltip: true, hozAlign:"center", width:180 },
    { title:"Count 2", field:'count_2', headerTooltip: true, hozAlign:"center", width:180 },
    {
        title: "Difference", 
        field: "difference", 
        headerTooltip: true, 
        hozAlign: "center", 
        width: 180,
        formatter: function(cell, formatterParams, onRendered) {
            let value = cell.getValue();
            let cellElement = cell.getElement();

            // Restablece estilos previos para evitar acumulaciones
            cellElement.style.backgroundColor = "";
            cellElement.style.color = "";

            if (value !== 0) {
                cellElement.style.backgroundColor = "#eb3f4f"; // Rojo fuerte
                cellElement.style.color = "white"; // Texto blanco para mejor contraste
            }

            return value;
        }
    },
    { title:"Final Count", field:'final_count', headerTooltip: true, hozAlign:"center", width:180 },
    { title:"Stock", field:'stock', headerTooltip: true, hozAlign:"center", width:180 },
    { 
        title:"Adjustment", 
        field:'adjustment', 
        headerTooltip: true, 
        hozAlign:"center", 
        bottomCalc:"sum", 
        bottomCalcParams:{ precision: 0 }, 
        bottomCalcFormatter:function(cell, formatterParams, onRendered){
            let total = cell.getValue();
            return `<strong>Total: ${total}</strong>`;
        },
        width:200 
    }
];

let configTableCustom1 = {
    height: "400px",
    layout:"fitDataFill",
    theme: "bootstrap5", 
    columnMinWidth: 100,
    autoColumns: false, 
    scrollX: true, 
    dataTree:true,
    footerElement:"<div style='text-align:right; padding:5px; font-weight:bold;'>Total Abs: 42</div>" 
}

const dataTable1 = [
    {
        wharehouse: "Greenhouse 1",
        location: "Table 1",
        product: "LNAFP",
        count_1: 135,
        count_2: 137,
        difference: 2,
        final_count: 137,
        stock: 137,
        adjustment: 2
    },
    {
        wharehouse: "Greenhouse 1",
        location: "Table 2",
        product: "LNAGS",
        count_1: 250,
        count_2: 250,
        difference: 0,
        final_count: 253,
        stock: 253,
        adjustment: 0
    },
    {
        wharehouse: "Greenhouse 1",
        location: "Table 2",
        product: "LNASS",
        count_1: 215,
        count_2: 220,
        difference: 5,
        final_count: 215,
        stock: 220,
        adjustment: 5
    },
    {
        wharehouse: "Greenhouse 1",
        location: "Table 3",
        product: "LNABG",
        count_1: 180,
        count_2: 182,
        difference: 2,
        final_count: 182,
        stock: 185,
        adjustment: 2
    },
    {
        wharehouse: "Greenhouse 1",
        location: "Table 4",
        product: "LNAFP",
        count_1: 200,
        count_2: 198,
        difference: -2,
        final_count: 198,
        stock: 200,
        adjustment: 2
    },
    {
        wharehouse: "Greenhouse 2",
        location: "Table 1",
        product: "LNAGS",
        count_1: 300,
        count_2: 295,
        difference: -5,
        final_count: 295,
        stock: 298,
        adjustment: 5
    },
    {
        wharehouse: "Greenhouse 2",
        location: "Table 2",
        product: "LNASS",
        count_1: 275,
        count_2: 278,
        difference: 3,
        final_count: 278,
        stock: 278,
        adjustment: 3
    },
    {
        wharehouse: "Greenhouse 2",
        location: "Table 3",
        product: "LNABG",
        count_1: 150,
        count_2: 152,
        difference: 2,
        final_count: 152,
        stock: 155,
        adjustment: 2
    },
    {
        wharehouse: "Greenhouse 3",
        location: "Table 1",
        product: "LNAFP",
        count_1: 225,
        count_2: 230,
        difference: 5,
        final_count: 230,
        stock: 232,
        adjustment: 5
    },
    {
        wharehouse: "Greenhouse 3",
        location: "Table 2",
        product: "LNAGS",
        count_1: 260,
        count_2: 258,
        difference: -2,
        final_count: 258,
        stock: 260,
        adjustment: 2
    },
    {
        wharehouse: "Greenhouse 3",
        location: "Table 3",
        product: "LNASS",
        count_1: 310,
        count_2: 308,
        difference: -2,
        final_count: 308,
        stock: 310,
        adjustment: 2
    },
    {
        wharehouse: "Greenhouse 3",
        location: "Table 4",
        product: "LNABG",
        count_1: 195,
        count_2: 193,
        difference: -2,
        final_count: 193,
        stock: 195,
        adjustment: 2
    },
    {
        wharehouse: "Greenhouse 4",
        location: "Table 1",
        product: "LNAFP",
        count_1: 280,
        count_2: 285,
        difference: 5,
        final_count: 285,
        stock: 288,
        adjustment: 5
    },
    {
        wharehouse: "Greenhouse 4",
        location: "Table 2",
        product: "LNAGS",
        count_1: 240,
        count_2: 245,
        difference: 5,
        final_count: 245,
        stock: 247,
        adjustment: 5
    },
    {
        wharehouse: "Greenhouse 4",
        location: "Table 3",
        product: "LNASS",
        count_1: 320,
        count_2: 318,
        difference: -2,
        final_count: 318,
        stock: 320,
        adjustment: 2
    }
];

//-----Configuiraciónes de las graficas
let setOptions1 = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: false,
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
            }
        }
    },
    maintainAspectRatio: false,
    scales: {
        y: {
            step: 1
        }
    },
};

let dataChart1 = {
    labels: ['Greenhouse 1','Greenhouse 2','Greenhouse 3','Greenhouse 4'],
    datasets: [
        {
            label: 'Ordenes',
            data: [20, 45, 60, 80, 90],
            fill: false,
        },
    ]
};

let setOptions2 = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top'
        },
        title: {
            display: false
        },
        datalabels: {
            color: 'black',
            font: {
                size: 15
            }
        }
    },
    maintainAspectRatio: false,
    scales: {
        y: {
            step: 1
        }
    },
    
};


let dataChart2 = {
    labels: ['LNAFP','LNAGS','LNASS','LNABG','LNAFD'],
    datasets: [
        {
            label: 'Total',
            data: [110,200,350,360,400],
            fill: false,
        },
    ]
};





