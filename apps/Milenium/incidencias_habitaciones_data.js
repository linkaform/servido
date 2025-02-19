//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'card', col: '3', id:'cardFirst', title:'Total de Inspecciones', hexadecimal:'#FF5733'},
            { type:'card', col: '3', id:'cardSecond', title:'Calificacion Promedio', hexadecimal:'#FF8D33'},
            { type:'card', col: '3', id:'cardThird', title:'Porcentaje de Inspeccion', hexadecimal:'#FFC133'},
            { type:'card', col: '3', id:'cardFourth', title:"Total de No's", hexadecimal:'#FFE733'},
        ] 
    },
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Incidencias habitaciones'},
            { type:'table', col: '12', id:'tableSecond', title:'Top 10 incidencias'},
        ] 
    },
    { class:'', _children : [
            { type:'chart', col: '12', id:'chartFirst', title:'Desempeño mensual'},
        ] 
    },
];

//-----Configuraciones de la tabla
let columsTable1 = [
    { title:"Habitaciones Inspeccionadas", field:'habitacionesinspeccionadas', width:1000, cssClass: "center-title", columns: [
        { 
            title: "", 
            field: "hab1", 
            width: 100,
            hozAlign:"center",
            formatter: function(cell) {
                var value = cell.getValue();
                if (value.status === "revisada") {
                    cell.getElement().style.backgroundColor = "lightgreen";
                }
                return value.numero;
            },
            cellClick: function (e, cell) {
                let cellData = cell.getValue();
                var inspecciones = cellData.inspecciones;
                if(!cellData.id){
                    Swal.fire({
                        title: 'Detalle',
                        html: 'Esta habitacion aun no tiene inspecciones realizadas.'
                    });
                }else if(inspecciones.length > 1){
                    var content = "<ul>";
                    inspecciones.forEach(function (inspeccion, index) {
                        content += "<li>" + `<a href="https://app.linkaform.com/#/records/detail/${inspeccion}" target="_blank">`+ index + "</a>"  + "</li>";
                    });
                    content += "</ul>";
            
                    tippy(cell.getElement(), {
                        content: content,
                        theme: "light",  
                        trigger: "click",
                        arrow: true,     
                        placement: "top",
                        interactive: true,
                    });
                }else{
                    window.open(`https://app.linkaform.com/#/records/detail/${cellData.id}`, "_blank");
                }
            }
        },
        { 
            title: "", 
            field: "hab2", 
            width: 100,
            hozAlign:"center",
            formatter: function(cell) {
                var value = cell.getValue();
                if (value.status === "revisada") {
                    cell.getElement().style.backgroundColor = "lightgreen";
                }
                return value.numero;
            },
            cellClick: function (e, cell) {
                let cellData = cell.getValue();
                console.log("Número de la habitación:", cellData.numero);
                console.log("ID de la habitación:", cellData.id);
                if(!cellData.id){
                    Swal.fire({
                        title: 'Detalle',
                        html: 'Esta habitacion aun no tiene inspecciones realizadas.'
                    });
                }else{
                    window.open(`https://app.linkaform.com/#/records/detail/${cellData.id}`, "_blank");
                }
            }
        },
        { 
            title: "", 
            field: "hab3", 
            width: 100,
            hozAlign:"center",
            formatter: function(cell) {
                var value = cell.getValue();
                if (value.status === "revisada") {
                    cell.getElement().style.backgroundColor = "lightgreen";
                }
                return value.numero;
            },
            cellClick: function (e, cell) {
                let cellData = cell.getValue();
                console.log("Número de la habitación:", cellData.numero);
                console.log("ID de la habitación:", cellData.id);
                if(!cellData.id){
                    Swal.fire({
                        title: 'Detalle',
                        html: 'Esta habitacion aun no tiene inspecciones realizadas.'
                    });
                }else{
                    window.open(`https://app.linkaform.com/#/records/detail/${cellData.id}`, "_blank");
                }
            }
        },
        { 
            title: "", 
            field: "hab4", 
            width: 100,
            hozAlign:"center",
            formatter: function(cell) {
                var value = cell.getValue();
                if (value.status === "revisada") {
                    cell.getElement().style.backgroundColor = "lightgreen";
                }
                return value.numero;
            },
            cellClick: function (e, cell) {
                let cellData = cell.getValue();
                console.log("Número de la habitación:", cellData.numero);
                console.log("ID de la habitación:", cellData.id);
                if(!cellData.id){
                    Swal.fire({
                        title: 'Detalle',
                        html: 'Esta habitacion aun no tiene inspecciones realizadas.'
                    });
                }else{
                    window.open(`https://app.linkaform.com/#/records/detail/${cellData.id}`, "_blank");
                }
            }
        },
        { 
            title: "", 
            field: "hab5", 
            width: 100,
            hozAlign:"center",
            formatter: function(cell) {
                var value = cell.getValue();
                if (value.status === "revisada") {
                    cell.getElement().style.backgroundColor = "lightgreen";
                }
                return value.numero;
            },
            cellClick: function (e, cell) {
                let cellData = cell.getValue();
                console.log("Número de la habitación:", cellData.numero);
                console.log("ID de la habitación:", cellData.id);
                if(!cellData.id){
                    Swal.fire({
                        title: 'Detalle',
                        html: 'Esta habitacion aun no tiene inspecciones realizadas.'
                    });
                }else{
                    window.open(`https://app.linkaform.com/#/records/detail/${cellData.id}`, "_blank");
                }
            }
        },
        { 
            title: "", 
            field: "hab6", 
            width: 100,
            hozAlign:"center",
            formatter: function(cell) {
                var value = cell.getValue();
                if (value.status === "revisada") {
                    cell.getElement().style.backgroundColor = "lightgreen";
                }
                return value.numero;
            },
            cellClick: function (e, cell) {
                let cellData = cell.getValue();
                console.log("Número de la habitación:", cellData.numero);
                console.log("ID de la habitación:", cellData.id);
                if(!cellData.id){
                    Swal.fire({
                        title: 'Detalle',
                        html: 'Esta habitacion aun no tiene inspecciones realizadas.'
                    });
                }else{
                    window.open(`https://app.linkaform.com/#/records/detail/${cellData.id}`, "_blank");
                }
            }
        },
        { 
            title: "", 
            field: "hab7", 
            width: 100,
            hozAlign:"center",
            formatter: function(cell) {
                var value = cell.getValue();
                if (value.status === "revisada") {
                    cell.getElement().style.backgroundColor = "lightgreen";
                }
                return value.numero;
            },
            cellClick: function (e, cell) {
                let cellData = cell.getValue();
                console.log("Número de la habitación:", cellData.numero);
                console.log("ID de la habitación:", cellData.id);
                if(!cellData.id){
                    Swal.fire({
                        title: 'Detalle',
                        html: 'Esta habitacion aun no tiene inspecciones realizadas.'
                    });
                }else{
                    window.open(`https://app.linkaform.com/#/records/detail/${cellData.id}`, "_blank");
                }
            }
        },
        { 
            title: "", 
            field: "hab8", 
            width: 100,
            hozAlign:"center",
            formatter: function(cell) {
                var value = cell.getValue();
                if (value.status === "revisada") {
                    cell.getElement().style.backgroundColor = "lightgreen";
                }
                return value.numero;
            },
            cellClick: function (e, cell) {
                let cellData = cell.getValue();
                console.log("Número de la habitación:", cellData.numero);
                console.log("ID de la habitación:", cellData.id);
                if(!cellData.id){
                    Swal.fire({
                        title: 'Detalle',
                        html: 'Esta habitacion aun no tiene inspecciones realizadas.'
                    });
                }else{
                    window.open(`https://app.linkaform.com/#/records/detail/${cellData.id}`, "_blank");
                }
            }
        },
        { 
            title: "", 
            field: "hab9", 
            width: 100,
            hozAlign:"center",
            formatter: function(cell) {
                var value = cell.getValue();
                if (value.status === "revisada") {
                    cell.getElement().style.backgroundColor = "lightgreen";
                }
                return value.numero;
            },
            cellClick: function (e, cell) {
                let cellData = cell.getValue();
                console.log("Número de la habitación:", cellData.numero);
                console.log("ID de la habitación:", cellData.id);
                if(!cellData.id){
                    Swal.fire({
                        title: 'Detalle',
                        html: 'Esta habitacion aun no tiene inspecciones realizadas.'
                    });
                }else{
                    window.open(`https://app.linkaform.com/#/records/detail/${cellData.id}`, "_blank");
                }
            }
        },
    ]},
];

let dataTable1 = [
    {
        piso: "9",
        hab1: { numero: "901", id: "abc123", status: "revisada", inspecciones: ['insp1', 'insp2'] },
        hab2: { numero: "902", id: "" },
        hab3: { numero: "903", id: "" },
        hab4: { numero: "904", id: "" },
        hab5: { numero: "905", id: "mno345", status: "revisada" },
        hab6: { numero: "906", id: "" },
        hab7: { numero: "907", id: "" },
        hab8: { numero: "908", id: "" },
        hab9: { numero: "909", id: "" }
    },
    {
        piso: "8",
        hab1: { numero: "801", id: "abc123", status: "revisada", inspecciones: ['insp1'] },
        hab2: { numero: "802", id: "" },
        hab3: { numero: "803", id: "" },
        hab4: { numero: "804", id: "" },
        hab5: { numero: "805", id: "" },
        hab6: { numero: "806", id: "" },
        hab7: { numero: "807", id: "stu012", status: "revisada" },
        hab8: { numero: "808", id: "" },
        hab9: { numero: "809", id: "" }
    },
    {
        piso: "7",
        hab1: { numero: "701", id: "" },
        hab2: { numero: "702", id: "" },
        hab3: { numero: "703", id: "ghi901", status: "revisada" },
        hab4: { numero: "704", id: "jkl234", status: "revisada" },
        hab5: { numero: "705", id: "" },
        hab6: { numero: "706", id: "" },
        hab7: { numero: "707", id: "" },
        hab8: { numero: "708", id: "" },
        hab9: { numero: "709", id: "" }
    },
    {
        piso: "6",
        hab1: { numero: "601", id: "" },
        hab2: { numero: "602", id: "" },
        hab3: { numero: "603", id: "" },
        hab4: { numero: "604", id: "jkl345", status: "revisada" },
        hab5: { numero: "605", id: "" },
        hab6: { numero: "606", id: "" },
        hab7: { numero: "607", id: "" },
        hab8: { numero: "608", id: "" },
        hab9: { numero: "609", id: "" }
    },
    {
        piso: "5",
        hab1: { numero: "501", id: "" },
        hab2: { numero: "502", id: "def890", status: "revisada" },
        hab3: { numero: "503", id: "" },
        hab4: { numero: "504", id: "" },
        hab5: { numero: "505", id: "" },
        hab6: { numero: "506", id: "" },
        hab7: { numero: "507", id: "" },
        hab8: { numero: "508", id: "" },
        hab9: { numero: "509", id: "" }
    },
    {
        piso: "4",
        hab1: { numero: "401", id: "" },
        hab2: { numero: "402", id: "" },
        hab3: { numero: "403", id: "" },
        hab4: { numero: "404", id: "" },
        hab5: { numero: "405", id: "" },
        hab6: { numero: "406", id: "" },
        hab7: { numero: "407", id: "" },
        hab8: { numero: "408", id: "" },
        hab9: { numero: "409", id: "yz0123", status: "revisada" }
    },
    {
        piso: "3",
        hab1: { numero: "301", id: "" },
        hab2: { numero: "302", id: "" },
        hab3: { numero: "303", id: "" },
        hab4: { numero: "304", id: "jkl678", status: "revisada" },
        hab5: { numero: "305", id: "" },
        hab6: { numero: "306", id: "" },
        hab7: { numero: "307", id: "" },
        hab8: { numero: "308", id: "" },
        hab9: { numero: "309", id: "" }
    },
    {
        piso: "2",
        hab1: { numero: "201", id: "" },
        hab2: { numero: "202", id: "def123", status: "revisada" },
        hab3: { numero: "203", id: "" },
        hab4: { numero: "204", id: "" },
        hab5: { numero: "205", id: "" },
        hab6: { numero: "206", id: "" },
        hab7: { numero: "207", id: "" },
        hab8: { numero: "208", id: "" },
        hab9: { numero: "209", id: "" }
    },
    {
        piso: "1",
        hab1: { numero: "101", id: "" },
        hab2: { numero: "102", id: "" },
        hab3: { numero: "103", id: "" },
        hab4: { numero: "104", id: "" },
        hab5: { numero: "105", id: "" },
        hab6: { numero: "106", id: "" },
        hab7: { numero: "107", id: "" },
        hab8: { numero: "108", id: "vwx012", status: "revisada" },
        hab9: { numero: "109", id: "yz3456", status: "revisada" }
    }
];

let columsTable2 = [
    { title:"Pregunta", field:'pregunta', width:700},
    { title:"Area", field:'area', width:400},
    { title:"No's", field:'nos', width:100},
];

let dataTable2 = [
    {
        pregunta: "Puerta Principal",
        area: "General",
        nos: "20",
    },
    {
        pregunta: "Pasador",
        area: "General",
        nos: "15",
    },
    {
        pregunta: "Hielera",
        area: "Habitacion",
        nos: "14",
    },
    {
        pregunta: "Olor",
        area: "Habitacion",
        nos: "10",
    },
    {
        pregunta: "Silla limpia",
        area: "Escritorio",
        nos: "5",
    },
];

//-----Configuiraciónes de las graficas
var setOptions1 = {
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
  responsive: true, 
    maintainAspectRatio: false ,
  scales: {
      y: {
        beginAtZero: true
      }
  },
};

var dataChart1 = {
    labels: ['2024-Oct','2024-Nov','2024-Dic','2025-Ene','2025-Feb'],
    datasets: [
        {
            label: 'Inspecciones',
            data: [13, 12, 14, 11, 9],
            order: 2,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
        },
        {
            type: 'line',
            label: "No's",
            data: [10, 15, 10, 12, 10],
            fill: false,
            borderWidth: 3,
            tension: 0,
            order: 1,
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgba(255, 0, 0, 1)',
        }
    ]
};
