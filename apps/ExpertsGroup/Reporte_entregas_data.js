//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
        { type:'card', col: '4', id:'cardFirst', title:'Total Deliveries to be Made', hexadecimal:'#0099F9'},
        { type:'card', col: '4', id:'cardSecond', title:'Deliveries Made', hexadecimal:'#0099F9'},
        { type:'card', col: '4', id:'cardThird', title:'% Progress', hexadecimal:'#0099F9'},
    ]},
    { class:'', _children : [
            { type:'chart', col: '7', id:'chartFirst', title:'Percentage'},
            { type:'chart', col: '5', id:'chartSecond', title:'Delivery progress by store'},
    ]},
    { class:'', _children : [
        { type:'card-custom-image', col: '4', id:'cardStoreA', title:'OXXO', hexadecimal:'#0099F9',
            fileURL:'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/68544635d311142deb781303.png'
        },
        { type:'card-custom-image', col: '4', id:'cardStoreB', title:'Fragua', hexadecimal:'#0099F9',
            fileURL:'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/684b242d9cdc856478e1132f.png'
        },
        { type:'card-custom-image', col: '4', id:'cardStoreC', title:'Neto', hexadecimal:'#0099F9',
            fileURL:'https://f001.backblazeb2.com/file/app-linkaform/public-client-126/71202/60b81349bde5588acca320e1/684b242c9cdc856478e1132e.png'
        },
    ]},
    { class:'', _children : [
        { type:'table', col: '12', id:'tableFirst', title:'Status by Store'},
    ]},
    { class:'', _children : [
        { type:'chart', col: '12', id:'chartThird', title:'Delivery progress by state'},
    ]},
    { class:'', _children : [
        { type:'map', col: '12', id:'mapFirst', title:'Mapa'},
    ]},
    { class:'', _children : [
        { type:'chart', col: '12', id:'chartFourth', title:'Deliveries per day'},
        //{ type:'chart', col: '6', id:'chartFiveth', title:'Delivery progress by Brand'},
    ]},
    { class:'', _children : [
        { type:'modal', col: '12', id:'modalFilterFirst', title:'Data by State', optionButtonModal:false, language:'en', modalSize:'lg', formElements : [
                {type:'div', title:'Table Data', id:'tableAModal'},
            ]
        },
    ]},

];




//---Table
let columnsTable1 = [
    { title: "CHAIN", field: 'chain', headerFilter: "input", hozAlign: "left", width: 250 },
    { title: "STATE", field: 'state', headerFilter: "input", hozAlign: "left", width: 300 },
    { title: "CITY", field: 'city', headerFilter: "input", hozAlign: "left", width: 300 },
    { title: "CR", field: 'cr', headerFilter: "input", hozAlign: "left", width: 200 },
    { title: "NAME", field: 'name', headerFilter: "input", hozAlign: "left", width: 250 },
    {
        title: "ESTATUS",
        field: 'status',
        hozAlign: "left",
        headerFilter: "input",
        width: 250,
        formatter: function(cell) {
            const value = cell.getValue();
            const rowData = cell.getRow().getData(); // accede a toda la fila
            const detailUrl = rowData.record_id;   // aquí está tu dato con la URL

            let color = value === 'Visited' ? 'green' : value === 'Not visited' ? 'red' : 'black';
            if (value === 'Visited' && detailUrl) {
                return `<a href="https://app.linkaform.com/#/records/detail/${detailUrl}" target="_blank" style="color:${color}; font-weight:600; text-decoration:underline;">
                            ${value}
                        </a>`;
            } else {
                return `<span style="color:${color}; font-weight:600">${value}</span>`;
            }
        }
    },
];


let dataTable1 = [
    {
        chain : 'OXXO',
        state: 'Michoacán',
        cr : '11',
        name : 'Extra',
        status : 'Not visited',
    },
    {
        chain : 'OXXO',
        state: 'Michoacán',
        cr : '12',
        name : '7-Eleven',
        status : 'Visited',
    },
    {
        chain : 'OXXO',
        state: 'Michoacán',
        cr : '13',
        name : 'Circle K',
        status : 'Visited',
    },
    {
        chain : 'FRAGUA',
        state: 'Michoacán',
        cr : '14',
        name : 'Oxxo',
        status : 'Not visited',
    },
    {
        chain : 'FRAGUA',
        state: 'Michoacán',
        cr : '15',
        name : 'Super Q',
        status : 'Visited',
    },
    {
        chain : 'FRAGUA',
        state: 'Veracrúz',
        cr : '16',
        name : 'Kiosko',
        status : 'Not visited',
    },
    {
        chain : 'FRAGUA',
        state: 'Veracrúz',
        cr : '17',
        name : 'Oxxo Gas',
        status : 'Visited',
    },
    {
        chain : 'NETO',
        state: 'Veracrúz',
        cr : '18',
        name : 'SuperCity',
        status : 'Visited',
    },
    {
        chain : 'NETO',
        state: 'Veracrúz',
        cr : '19',
        name : 'Bodega Exprés',
        status : 'Not visited',
    },
    {
        chain : 'NETO',
        state: 'Veracrúz',
        cr : '20',
        name : 'Tiendas 3B',
        status : 'Visited',
    },
];

//---Chart First
var setOptions1A = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        datalabels: {
            color: 'white',
            font: {
                size: 19
            },
            formatter: function(value) {
                return value + '%';
            }
        },
        tooltip: {
            titleFont: { size: 20 }, 
            bodyFont: { size: 17 }, 
            callbacks: {
                label: function (tooltipItem) {
                    return `${tooltipItem.raw}`; 
                }
            }
        }
    },
    responsive: true, 
    maintainAspectRatio: false ,
};

var dataChart1A = {
    labels: ['Deliveries Made','Deliveries to be Made'],
    datasets: [
        {
            label: 'Porcentaje',
            data: [73,27],
            fill: false,
            backgroundColor: ['#0099F9', '#8C8C8C'], 
        },
    ]
};


//----Chart Second
var setOptions2A = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: false,
            text: 'Tienda',
        },
        datalabels: {
            color: 'white',
            font: {
                size: 19
            },
            formatter: function(value) {
                return value + '%';
            }
        },
        tooltip: {
            titleFont: { size: 20 }, 
            bodyFont: { size: 17 }, 
            callbacks: {
                label: function (tooltipItem) {
                    return `${tooltipItem.raw}`; 
                }
            }
        }
    },
    responsive: true, 
    maintainAspectRatio: false ,
    scales: {
        x: {
            stacked: true,
            barPercentage: 0.8,        // Reduce el ancho de la barra (valor entre 0 y 1)
            categoryPercentage: 0.7    // Reduce el espacio que cada categoría ocupa
        },
        y: {
            stacked: true,
            beginAtZero: true
        }
    }
};

var dataChart2A = {
    labels: ['OXXO', 'Fragua', 'Neto'],
    datasets: [
        {
            label: 'Deliveries Made',
            data: [20, 50, 80],
            backgroundColor: '#0099F9',
            barPercentage: 0.7,        
            categoryPercentage: 0.6    
        },
        {
            label: 'Deliveries to be Made',
            data: [80, 50, 20],
            backgroundColor: '#8C8C8C',
            barPercentage: 0.7,
            categoryPercentage: 0.6
        }
    ]
};


//----Chart Third
var setOptions3A = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: false,
            text: 'Tienda',
        },
        datalabels: {
            color: 'white',
            font: {
                size: 19
            },
            formatter: function(value) {
                return value + '%';
            }
        },
        tooltip: {
            titleFont: { size: 20 }, 
            bodyFont: { size: 17 }, 
            callbacks: {
                label: function (tooltipItem) {
                    return `${tooltipItem.raw}`; 
                }
            }
        }
    },
    responsive: true, 
    maintainAspectRatio: false ,
    scales: {
        y: {
            step: 1,
        }
    },
    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true,
            beginAtZero: true
        }
    }
};

var dataChart3A = {
    labels: ['Guanajuato','Queretaro','Michoacán de Ocampo', 'Veracruz de Ignacio de la Llave','Hidalgo'],
    datasets: [
        {
            label: 'Deliveries Made',
            data: [40, 70, 60, 55, 30],
            fill: false,
            barPercentage: 0.5,        
            categoryPercentage: 0.5,
            backgroundColor: '#0099F9',
        },
        {
            label: 'Deliveries to be Made',
            data: [60, 30, 40, 45, 70],
            fill: false,
            barPercentage: 0.5,        
            categoryPercentage: 0.5,
            backgroundColor: '#8C8C8C',
        },
    ]
};

//----Chart Fourth
var setOptions4A = {
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
                size: 19
            }
        },
        tooltip: {
            titleFont: { size: 20 }, 
            bodyFont: { size: 17 }, 
            callbacks: {
                label: function (tooltipItem) {
                    return `${tooltipItem.raw}`; 
                }
            }
        }
    },
    responsive: true, 
    maintainAspectRatio: false ,
    indexAxis: 'x',
    scales: {
        y: {
            title: {
                display: true,
                text: 'Cantidad'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Fecha'
            }
        }
    }
};

var dataChart4A = {
    labels: [
        '03/05/2023', '05/05/2023', '08/05/2023', '10/05/2023', '12/05/2023',
        '15/05/2023', '17/05/2023', '19/05/2023', '22/05/2023', '24/05/2023',
        '26/05/2023', '29/05/2023', '31/05/2023'
      ],
    datasets: [
        {
            label: 'Oxxo',
            data: [10, 20, 35, 40, 60, 70, 85, 95, 105, 110, 120, 130, 135],
            borderColor: '#00C49A',
            backgroundColor: '#00C49A',
            fill: false,
            pointStyle: 'circle',
            pointRadius: 6,
            tension: 0.4
        },
        {
            label: 'Fragua',
            data: [5, 10, 20, 30, 35, 50, 60, 70, 75, 80, 90, 100, 105],
            borderColor: '#5B9BD5',
            backgroundColor: '#5B9BD5',
            fill: false,
            pointStyle: 'rectRot',
            pointRadius: 6,
            tension: 0.4
        },
        {
            label: 'Neto',
            data: [15, 30, 55, 70, 95, 120, 145, 165, 180, 190, 210, 230, 240],
            borderColor: '#8C8C8C',
            backgroundColor: '#8C8C8C',
            fill: true,
            pointStyle: 'circle',
            pointRadius: 4,
            tension: 0.4
        }
      ]
};

//----Chart Fiveth
var setOptions5A = {
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
            color: 'white',
            font: {
                size: 19
            }
        },
        tooltip: {
            titleFont: { size: 20 }, 
            bodyFont: { size: 17 }, 
            callbacks: {
                label: function (tooltipItem) {
                    return `${tooltipItem.raw}`; 
                }
            }
        }
    },
    responsive: true, 
    maintainAspectRatio: false ,
    scales: {
        y: {
            display: false,
        },
        x: {
            display: false,
        }
    },
};

var dataChart5A = {
    labels: ['Deliveries Made','Deliveries to be Made'],
    datasets: [
        {
            label: 'Total',
            data: [20, 80],
            fill: false,
            backgroundColor: ['#0099F9', '#8C8C8C'], 
        },
    ]
};

//----Config Table Modal
let columsTableModal1 = [
    { title: "STORE", field: 'store', hozAlign: "left", width: 200 },
    { title: "CR", field: 'cr', hozAlign: "left", width: 200 },
    { title: "NAME", field: 'name', hozAlign: "left", width: 200 },
    {
        title: "ESTATUS",
        field: 'status',
        hozAlign: "left",
        width: 250,
        formatter: function(cell) {
            const value = cell.getValue();
            let color = value === 'Visited' ? 'green' : value === 'Not visited' ? 'red' : 'black';
            return `<span style="color:${color}; font-weight:600">${value}</span>`;
        }
    },
];

let dataTableModal1 = [
    {
        store : 'Example',
        cr : '10',
        name : 'Oxxo',
        status : 'Visited',
    },
    {
        store : 'Super Uno',
        cr : '11',
        name : 'Extra',
        status : 'Not visited',
    },
    {
        store : 'MiniMarket',
        cr : '12',
        name : '7-Eleven',
        status : 'Visited',
    },
    {
        store : 'Corner Shop',
        cr : '13',
        name : 'Circle K',
        status : 'Visited',
    },
    {
        store : 'La Esquina',
        cr : '14',
        name : 'Oxxo',
        status : 'Not visited',
    },
    {
        store : 'Tienda Central',
        cr : '15',
        name : 'Super Q',
        status : 'Visited',
    },
    {
        store : 'Express',
        cr : '16',
        name : 'Kiosko',
        status : 'Not visited',
    },
    {
        store : 'Gasolinera Norte',
        cr : '17',
        name : 'Oxxo Gas',
        status : 'Visited',
    },
    {
        store : 'Abastos MX',
        cr : '18',
        name : 'SuperCity',
        status : 'Visited',
    },
    {
        store : 'Bodega A',
        cr : '19',
        name : 'Bodega Exprés',
        status : 'Not visited',
    },
    {
        store : 'Sucursal 21',
        cr : '20',
        name : 'Tiendas 3B',
        status : 'Visited',
    },
];

//-----Data Example Map
const dataMap1 = [
    ['mx-ve', 27], ['mx-gj', 40], ['mx-qt', 21], ['mx-mi', 31], ['mx-hg', 42]
];

const configMap1 = {
    name: 'Numeros',
    states: {
        hover: {
            color: '#0099F9'
        }
    },
    dataLabels: {
        enabled: true,
        format: '{point.name}'
    },
    // 👇 Evento de clic en un estado
    point: {
        events: {
            click: function () {
                const stateKey = this['hc-key'];
                getDataTableDetail(stateKey)
            }
        }
    }
}

const dicObjetiveState = {
    6:{
        'mx-ve':1318,
        'mx-mi':597,
    },
    7:{
        'mx-ve':266,
        'mx-mi':150,
    },
    8:{
        'mx-ag': 15,
        'mx-bc': 880,
        'mx-bs': 270,
        'mx-cm': 13,
        'mx-cs': 194,
        'mx-ch': 660,
        'mx-co': 794,
        'mx-cl': 5,
        'mx-dg': 298,
        'mx-mx': 3,
        'mx-gj': 21,
        'mx-gr': 189,
        'mx-ja': 47,
        'mx-mi': 372,
        'mx-na': 26,
        'mx-nl': 21,
        'mx-oa': 189,
        'mx-pu': 7,
        'mx-qr': 7,
        'mx-sl': 76,
        'mx-si': 678,
        'mx-so': 927,
        'mx-tb': 218,
        'mx-tm': 834,
        'mx-tl': 7,
        'mx-ve': 1075,
        'mx-yu': 10,
        'mx-za': 194,
    }
}

const configTooltipMap = {
    formatter: function () {
        const value = this.point.value;
        const stateKey =this.point['hc-key'];
        const stateName = this.point.name || this.key;
        const monthSelect = document.getElementById("month").value  || 7;
        const totalRecord = dicObjetiveState[monthSelect]?.[stateKey] || 0;
        const text = `Total Visitas: ${value} de ${totalRecord}`;
        return `<b>${stateName}</b><br>${text}`;
    }
}
