//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '9', id:'tableFirst', title:'Técnicos'},
        ] 
    },
];

let columsTable1 = [
    { title: "Técnico", field: 'tecnician', headerTooltip: true, headerFilter:"input", hozAlign: "left", width: 250, responsive: 1,},
    { title: "Disponibilidad", field: 'disponibility', 
        formatter: function(cell) {
            let value = cell.getValue();
            if (value == 'Check_out') {
                cell.getElement().style.backgroundColor = "#82e0aa";
                return "Disponible"; 
            }else if(value == 'Check_in'){
                cell.getElement().style.backgroundColor = "#f5b7b1";
                return "Ocupado"; 
            }
            return value || ""; 
        },
        headerTooltip: true, hozAlign: "left", width: 150, responsive: 1 
    },
    { title: "Cliente", field: 'client', headerTooltip: true, hozAlign: "left", width: 250, responsive: 2},
    { title: "Localidad", field: 'locality', headerTooltip: true, hozAlign: "left", width: 250, responsive: 2 },
    { title: "Hora llegada", field: 'hour_arrive', headerTooltip: true, hozAlign: "center", width: 250, responsive: 2},
];

let configTableCustom1 = {
    height: "400px",
    layout: "fitDataFill",
    theme: "bootstrap5", 
    columnMinWidth: 100,
    autoColumns: false, 
    responsiveLayout: "collapse", // Habilita diseño responsive colapsable
    scrollX: true,
};

let dataTable1 = [
    { "tecnician": "Técnico 1", "disponibility": "Check_out", "client": "Cliente 1", "locality": "San Pedro", "hour_arrive": "08:00" },
    { "tecnician": "Técnico 2", "disponibility": "Check_in", "client": "Cliente 1", "locality": "San Pedro", "hour_arrive": "08:00" },
    { "tecnician": "Técnico 3", "disponibility": "Check_out", "client": "Cliente 2", "locality": "Escazú", "hour_arrive": "09:00" },
    { "tecnician": "Técnico 4", "disponibility": "Check_in", "client": "Cliente 3", "locality": "Heredia", "hour_arrive": "10:30" },
    { "tecnician": "Técnico 5", "disponibility": "Check_out", "client": "Cliente 2", "locality": "Escazú", "hour_arrive": "08:45" },
    { "tecnician": "Técnico 6", "disponibility": "Check_in", "client": "Cliente 4", "locality": "Cartago", "hour_arrive": "07:50" },
    { "tecnician": "Técnico 7", "disponibility": "Check_out", "client": "Cliente 5", "locality": "Alajuela", "hour_arrive": "09:15" },
    { "tecnician": "Técnico 8", "disponibility": "Check_in", "client": "Cliente 6", "locality": "San Ramón", "hour_arrive": "10:00" },
    { "tecnician": "Técnico 9", "disponibility": "Check_out", "client": "Cliente 7", "locality": "Liberia", "hour_arrive": "07:30" },
    { "tecnician": "Técnico 10", "disponibility": "Check_in", "client": "Cliente 8", "locality": "Nicoya", "hour_arrive": "11:00" },
    { "tecnician": "Técnico 11", "disponibility": "Check_out", "client": "Cliente 9", "locality": "Puntarenas", "hour_arrive": "08:10" },
    { "tecnician": "Técnico 12", "disponibility": "Check_in", "client": "Cliente 10", "locality": "Santa Ana", "hour_arrive": "09:45" },
    { "tecnician": "Técnico 13", "disponibility": "Check_out", "client": "Cliente 11", "locality": "Curridabat", "hour_arrive": "07:55" },
    { "tecnician": "Técnico 14", "disponibility": "Check_in", "client": "Cliente 12", "locality": "Moravia", "hour_arrive": "10:20" },
    { "tecnician": "Técnico 15", "disponibility": "Check_out", "client": "Cliente 13", "locality": "Desamparados", "hour_arrive": "08:30" }
];
