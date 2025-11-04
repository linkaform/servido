//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'card', col: '6', id:'cardFirst', title:'Total de Estaciones de Servicio', hexadecimal:'#FF5733'},
            { type:'card', col: '6', id:'cardSecond', title:'Total Evaluaciones', hexadecimal:'#818C78'},
    ]},
    { class:'', _children : [
        { type:'chart', col: '12', id:'chartFirst', title:'Auditorias por estación'},
        { type:'chart', col: '12', id:'chartSecond', title:'Auditorias por Supervisor'},
        { type:'chart', col: '12', id:'chartThird', title:'Resultados por sección'},
        { type:'chart', col: '12', id:'chartFourth', title:'Histórico por estación'},
    ]},
    { class:'', _children : [
        { type:'table', col: '12', id:'tableFirst', title:'Resultados por Pregunta'},
        { type:'table', col: '12', id:'tableSecond', title:'Porcentajes en riesgo'},
    ]},
    { class:'', _children : [
        { type:'chart', col: '12', id:'chartFiveth', title:'Progreso por Pregunta 1 de 3'},
        { type:'chart', col: '12', id:'chartSixth', title:'Progreso por Pregunta 2 de 3'},
        { type:'chart', col: '12', id:'chartSeventh', title:'Progreso por Pregunta 3 de 3'},
    ]},
    { class:'', _children : [
            { type:'modal', col: '12', id:'modalInformation', title:'Información de pregunta', formElements : [
                    {type:'div', title:'Lista de Folios:', id:'divModalList'},
                ]
            },
        ] 
    },
];


//-----Table
let columsTable1 = [
    { title: "Pregunta", field: 'pregunta',  headerTooltip: true, headerFilter:"input", hozAlign: "left", width: 1050, responsive: 2},
    { title: "Evaluaciones", field: 'evaluaciones', headerTooltip: true, hozAlign: "center", width: 150, responsive: 2 },
    { title: "R. Positivas", field: 'positivos', headerTooltip: true, hozAlign: "center", width: 150, responsive: 2},
    { title: "R. Negativas", field: 'negativos', headerTooltip: true, hozAlign: "center", width: 150, responsive: 2},
    { 
        title: "% de Cumplimiento", 
        field: 'porcentaje', 
        headerTooltip: true, 
        hozAlign: "center",
        formatter: function(cell){
            let value = cell.getValue();
            return value.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0}) + "%";
        },
        width: 190, 
        responsive: 2
    }
];

let dataTable1 = [
    {
        'pregunta':'1. Muestra limpieza en pisos, registros pluviales, perimetrales, áreas verdes del área de tanques',
        'aparicion':'5',
        'positivos':'4',
        'negativos':'1',
        'porcentaje':'80',
    },
    {
        'pregunta':'2. Se encuentra limpio el interior de los registros pequeños, bocatomas, motobombas, observación y monitoreo (donde aplique).',
        'aparicion':'8',
        'positivos':'8',
        'negativos':'0',
        'porcentaje':'100',
    },
    {
        'pregunta':'3. ¿La pintura del área de tanques MAGNA, PREMIUM, DIÉSEL y pozos de observación se encuentra en buenas condiciones?',
        'aparicion':'9',
        'positivos':'4',
        'negativos':'5',
        'porcentaje':'55.6',
    },
    {
        'pregunta':'4. ¿La pintura de tierras físicas, tapas metálicas de drenaje aceitoso, nichos, guarnición, marcaje en pisos, muros, etc., está en buenas condiciones?',
        'aparicion':'2',
        'positivos':'1',
        'negativos':'1',
        'porcentaje':'50',
    },
    {
        'pregunta':'5. La estación cuenta tanto con señalamientos corporativos como oficiales vigentes y estos se encuentran en buenas condiciones.',
        'aparicion':'1',
        'positivos':'1',
        'negativos':'0',
        'porcentaje':'100',
    }
];

//-----Table
let columsTable2 = [
    { title: "Pregunta", field: 'pregunta',  headerTooltip: true, headerFilter:"input", hozAlign: "left", width: 1050, responsive: 2},
    { 
        title: "% de Cumplimiento", 
        field: 'porcentaje', 
        headerTooltip: true,  
        hozAlign: "center", 
        width: 150,
        formatter: function(cell, formatterParams, onRendered) {
            const value = cell.getValue();
            console.log('value',value)
            if (value === null || value === undefined) {
                return '<span style="color: #999; font-style: italic;">Sin Cumplimiento</span>';
            }
            
            let backgroundColor = '';
            let textColor = 'white';
            let icon = '';
            let text = value;

            if (value <= 50) {
                backgroundColor = '#dc3545';
                icon = '🔴';
                text = `${Math.abs(value)} %`;
            } else if (value  >= 51 &&  value <= 80) {
                backgroundColor = '#fd7e14';
                icon = '🟡';
                text = `${value}%`;
            }  else if (value  >= 81 &&  value <= 99) {
                backgroundColor = '#28a745';
                icon = '🟢';
                text = `${value}%`;
            }
            return `
                <div style="
                    background-color: ${backgroundColor}; 
                    color: ${textColor}; 
                    font-weight: bold; 
                    padding: 6px 10px; 
                    border-radius: 6px; 
                    text-align: center;
                    font-size: 12px;
                    line-height: 1.2;
                ">
                    <div>${icon}</div>
                    <div>${text}</div>
                </div>
            `;
        },
        cellClick: function(e, cell) {
            const rowData = cell.getRow().getData();
            const label = rowData.pregunta; // obtiene la columna 'pregunta'
            if (label) {
                getInformationQuest(label);
                new bootstrap.Modal(document.getElementById('modalInformation')).show();
            }
        }
    },
    { 
        title: "Progress", 
        field: "porcentaje", 
        sorter: "number", 
        hozAlign: "left", 
        formatter: "progress", 
        editable: true, 
        headerSort: false,
        formatterParams: {
            min: 0,
            max: 100,
            color: function(value){
                if(value <= 50){
                    return "#e74c3c"; // rojo
                } else if(value <= 80){
                    return "#f1c40f"; // amarillo
                } else {
                    return "#2ecc71"; // verde
                }
            },
            legendColor: false, // desactiva gradiente si lo tuviera
            legendAlign: "center"
        }
    }
];


let dataTable2 = [
    {
        'pregunta':'33. Calcomanías "Servifácil", acrílico 3D de banderas y números de posición en buenas condiciones',
        'porcentaje':'33',
    },
    {
        'pregunta':'28. La pintura del área de despacho se encuentra en buenas condiciones: FLECHAS Y CEBRA PEATONAL',
        'porcentaje':'50',
    },
    {
        'pregunta':'23. Se encuentra limpia la parte interna de los dispensarios',
        'porcentaje':'55.6',
    },
    {
        'pregunta':'20. Se encuentran en buenas condiciones cada uno de los elementos del área de tanques',
        'porcentaje':'67',
    },
    {
        'pregunta':'15. Casco de seguridad',
        'porcentaje':'93',
    },
];


//---Chart First
const dataValues = [9, 7, 2];
const totalValues = [10, 10, 10];

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
            formatter: function (value, context) {
                const index = context.dataIndex;
                const total = totalValues[index] || 1;  // evitar división por cero
                const percentage = ((value / total) * 100).toFixed(1);
                return `${value} / ${percentage}%`;
            }
        },
        
    },
    maintainAspectRatio: false,
};

var dataChart1A = {
    labels: ['Estación de Servicio 1', 'Estación de Servicio 2', 'Estación de Servicio 3'],
    datasets: [
        {
            label: 'Total',
            data: dataValues,
            fill: false,
            backgroundColor: ['#04BF45', '#F24405', '#F20505'],
        },
    ]
};
//---Chart Second
const dataValues2 = [10, 8, 7];
const totalValues2 = [10, 10, 10];

var setOptions2A = {
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
            formatter: function (value, context) {
                const index = context.dataIndex;
                const total = totalValues2[index] || 1;  // evitar división por cero
                const percentage = ((value / total) * 100).toFixed(1);
                return `${value} / ${percentage}%`;
            }
        },
        tooltip: {
            titleFont: { size: 20 },
            bodyFont: { size: 17 },
            callbacks: {
                label: function (context) {
                    const index = context.dataIndex;
                    const value = context.raw;
                    const total = totalValues2[index] || 1;
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${value} / ${percentage}%`;
                }
            }
        }
    },
    maintainAspectRatio: false,
};

var dataChart2A = {
    labels: ['Supervisor 1', 'Supervisor 2', 'Supervisor 3'],
    datasets: [
        {
            label: 'Total',
            data: dataValues2,
            fill: false,
            backgroundColor: ['#04BF45', '#F1C40F', '#F24405'],
        },
    ]
};
//---Chart Third
const dataValues3 = [8.5, 8.3, 7.8, 6.5 , 3.5];
const totalValues3 = [10, 10, 10, 10, 10];

var setOptions3A = {
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
            formatter: function (value, context) {
                const index = context.dataIndex;
                const total = totalValues3[index] || 1;  // evitar división por cero
                const percentage = ((value / total) * 100).toFixed(1);
                return `${value} / ${percentage}%`;
            }
        },
        tooltip: {
            titleFont: { size: 20 },
            bodyFont: { size: 17 },
            callbacks: {
                label: function (context) {
                    const index = context.dataIndex;
                    const value = context.raw;
                    const total = totalValues3[index] || 1;
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${value} / ${percentage}%`;
                }
            }
        }
    },
    maintainAspectRatio: false,
};

var dataChart3A = {
    labels: ['Secciones 1', 'Secciones 2', 'Secciones 3', 'Secciones 4', 'Secciones 5'],
    datasets: [
        {
            label: 'Total',
            data: dataValues3,
            fill: false,
            backgroundColor: ['#F1C40F', '#F1C40F', '#F24405','#F24405','#F20505'],
        },
    ]
};

//---Chart Fourth
var setOptions4A = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
    },
    responsive: true, 
    maintainAspectRatio: false ,
};

var dataChart4A = {
    labels: ['Enero','Febrero','Marzo','Abril'],
    datasets: [
        {
            label: 'Sucursal 1 ',
            data: [45, 60, 78, 32],
            fill: false,
            backgroundColor: ['#0099F9', '#8C8C8C'],
        },
        {
            label: 'Sucursal 2 ',
            data: [52, 40, 91, 28],
            fill: false,
            backgroundColor: ['#0099F9', '#8C8C8C'],
        },
        {
            label: 'Sucursal 3',
            data: [68, 55, 74, 36],
            fill: false,
            backgroundColor: ['#0099F9', '#8C8C8C'],
        },
        {
            label: 'Sucursal 4',
            data: [81, 33, 59, 47],
            fill: false,
            backgroundColor: ['#0099F9', '#8C8C8C'],
        },
    ]
};

//---Chart Fiveth
var setOptions5A = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        datalabels: { 
            color: 'black', 
            font: {
                weight: 'bold',
                size: 10
            },
        }
    },
    scales: {
        x: {
            display: false, 
        }
    },
};

var dataChart5A = {
    labels: ['Pregunta 1','Pregunta 2','Pregunta 3','Pregunta 4'],
    datasets: [
        {
            label: 'Total',
            data: [80, 60, 78, 32],
            fill: false,
            backgroundColor: [],
        },
    ]
};

//---Chart Sixth
var setOptions6A = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        datalabels: { 
            color: 'black', 
            font: {
                weight: 'bold',
                size: 10
            },
        }
    },
    scales: {
        x: {
            display: false, 
        }
    },
};

var dataChart6A = {
    labels: ['Pregunta 5','Pregunta 6','Pregunta 7','Pregunta 8'],
    datasets: [
        {
            label: 'Total',
            data: [0, 60, 78, 32],
            fill: false,
            backgroundColor: [],
        },
    ]
};

//---Chart Seventh
var setOptions7A = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'nearest',
        intersect: true
    },
    plugins: {
        tooltip: {
            enabled: true
        },
        legend: {
            display: true,
            position: 'top',
        },
        datalabels: { 
            color: 'black', 
            font: {
                weight: 'bold',
                size: 10
            },
        }
    },
    scales: {
        x: {
            display: true, 
        }
    },
};

var dataChart7A = {
    labels: ['Pregunta 9','Pregunta 10','Pregunta 11','Pregunta 12'],
    datasets: [
        {
            label: 'Total',
            data: [0, 60, 78, 32],
            fill: false,
            backgroundColor: [],
        },
    ]
};

