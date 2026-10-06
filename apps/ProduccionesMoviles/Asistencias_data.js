//------Diseño de reporte
let dicReportContext = [
    { class:'', _children : [
            { type:'table', col: '12', id:'tableFirst', title:'Asistencias'},
            { type:'table', col: '12', id:'tableSecond', title:'Horas Reportadas'},
        ] 
    },
];

//-----Configuraciones de la tabla

const STATUS_MAP = {
  D:  { label: "DESCANSO",     color: "#c6e0b4" },
  F:  { label: "FALTA",        color: "#f4b183" },
  CM: { label: "CITA MEDICA",  color: "#ffe699" },
  CM_R: { label: "CITA MEDICA",  color: "#ffe699" },
  INC:{ label: "INCAPACIDAD",  color: "#bfbfbf" },
  INC_R:{ label: "INCAPACIDAD",  color: "#bfbfbf" },

  RCE_R:{ label: "REUNIÓN CON EQUIPO",  color: "#C509C8" },
  RCE:{ label: "REUNIÓN CON EQUIPO",  color: "#C509C8" },

  A:  { label: "ASISTENCIA",   color: "#14EBE7" },
  B:  { label: "BAJA",         color: "#ffff00" },
  VC: { label: "VACACIONES",   color: "#2f5597", textColor:"#fff" },
};



let columsTable1Test = [
    { title:"Empleado", field:'employee',  headerFilter:"input",  width:300},
    {
        title: "Enero 2026",
        columns: Array.from({ length: 17 }, (_, i) => {
            const day = 15 + i;
            const date = `2026-01-${String(day).padStart(2,"0")}`;
            const field = `day_${day}_01_25`;
            return {
                title: `${getDayName(date)}<br>${day}/01`,
                field,
                width: 120,
                formatter: statusFormatter,
                titleFormatter: "html",
                headerSort: false,
            };
        }),
    },
    { title:"Asistencia", field:'total_a',  headerFilter:"input",  hozAlign:"center",width:100},
    { title:"Faltas", field:'total_f',  headerFilter:"input",  hozAlign:"center",width:100},
    { title:"Vacaciones", field:'total_vc',  headerFilter:"input",  hozAlign:"center",width:100},
    { title:"Cita M", field:'total_cm',  headerFilter:"input",  hozAlign:"center",width:100},
    { title:"Incapacidad", field:'total_inc',  headerFilter:"input",  hozAlign:"center",width:100},
];

let columsTable1 = [
    { title:"Empleado", field:'employee',  headerFilter:"input",  width:300},
];

let dataTable1 = [
  {
    employee: "Empleado 01",
    day_15_01_25:"A", day_16_01_25:"A", day_17_01_25:"D", day_18_01_25:"D", day_19_01_25:"A",
    day_20_01_25:"A", day_21_01_25:"CM", day_22_01_25:"A", day_23_01_25:"A", day_24_01_25:"D",
    day_25_01_25:"D", day_26_01_25:"A", day_27_01_25:"A", day_28_01_25:"A", day_29_01_25:"A",
    day_30_01_25:"A", day_31_01_25:"A",
    total_a: 11,
    total_f: 0,
    total_vc: 0,
    total_cm: 1,
    total_inc: 0,
  },
  {
    employee: "Empleado 02",
    day_15_01_25:"A", day_16_01_25:"F", day_17_01_25:"D", day_18_01_25:"D", day_19_01_25:"A",
    day_20_01_25:"INC", day_21_01_25:"INC", day_22_01_25:"INC", day_23_01_25:"A", day_24_01_25:"D",
    day_25_01_25:"D", day_26_01_25:"A", day_27_01_25:"A", day_28_01_25:"A", day_29_01_25:"A",
    day_30_01_25:"A", day_31_01_25:"A",
    total_a: 9,
    total_f: 1,
    total_vc: 0,
    total_cm: 0,
    total_inc: 3,
  },
  {
    employee: "Empleado 03",
    day_15_01_25:"VC", day_16_01_25:"VC", day_17_01_25:"VC", day_18_01_25:"VC", day_19_01_25:"VC",
    day_20_01_25:"VC", day_21_01_25:"VC", day_22_01_25:"VC", day_23_01_25:"VC", day_24_01_25:"VC",
    day_25_01_25:"VC", day_26_01_25:"A", day_27_01_25:"A", day_28_01_25:"A", day_29_01_25:"A",
    day_30_01_25:"A", day_31_01_25:"A",
    total_a: 6,
    total_f: 0,
    total_vc: 11,
    total_cm: 0,
    total_inc: 0,
  },
  {
    employee: "Empleado 04",
    day_15_01_25:"A", day_16_01_25:"A", day_17_01_25:"D", day_18_01_25:"D", day_19_01_25:"B",
    day_20_01_25:"B", day_21_01_25:"B", day_22_01_25:"B", day_23_01_25:"B", day_24_01_25:"B",
    day_25_01_25:"B", day_26_01_25:"B", day_27_01_25:"B", day_28_01_25:"B", day_29_01_25:"B",
    day_30_01_25:"B", day_31_01_25:"B",
    total_a: 2,
    total_f: 0,
    total_vc: 0,
    total_cm: 0,
    total_inc: 0,
  },
  {
    employee: "Empleado 05",
    day_15_01_25:"A", day_16_01_25:"A", day_17_01_25:"D", day_18_01_25:"D", day_19_01_25:"A",
    day_20_01_25:"A", day_21_01_25:"CM", day_22_01_25:"A", day_23_01_25:"A", day_24_01_25:"D",
    day_25_01_25:"D", day_26_01_25:"A", day_27_01_25:"A", day_28_01_25:"A", day_29_01_25:"A",
    day_30_01_25:"A", day_31_01_25:"A",
    total_a: 11,
    total_f: 0,
    total_vc: 0,
    total_cm: 1,
    total_inc: 0,
  },
  {
    employee: "Empleado 06",
    day_15_01_25:"VC", day_16_01_25:"VC", day_17_01_25:"VC", day_18_01_25:"VC", day_19_01_25:"VC",
    day_20_01_25:"VC", day_21_01_25:"VC", day_22_01_25:"VC", day_23_01_25:"VC", day_24_01_25:"VC",
    day_25_01_25:"VC", day_26_01_25:"A", day_27_01_25:"A", day_28_01_25:"A", day_29_01_25:"A",
    day_30_01_25:"A", day_31_01_25:"A",
    total_a: 6,
    total_f: 0,
    total_vc: 11,
    total_cm: 0,
    total_inc: 0,
  },
  {
    employee: "Empleado 07",
    day_15_01_25:"A", day_16_01_25:"F", day_17_01_25:"D", day_18_01_25:"D", day_19_01_25:"A",
    day_20_01_25:"A", day_21_01_25:"A", day_22_01_25:"A", day_23_01_25:"A", day_24_01_25:"D",
    day_25_01_25:"D", day_26_01_25:"INC", day_27_01_25:"INC", day_28_01_25:"INC", day_29_01_25:"A",
    day_30_01_25:"A", day_31_01_25:"A",
    total_a: 8,
    total_f: 1,
    total_vc: 0,
    total_cm: 0,
    total_inc: 3,
  },
  {
    employee: "Empleado 08",
    day_15_01_25:"A", day_16_01_25:"A", day_17_01_25:"D", day_18_01_25:"D", day_19_01_25:"A",
    day_20_01_25:"A", day_21_01_25:"A", day_22_01_25:"CM", day_23_01_25:"A", day_24_01_25:"D",
    day_25_01_25:"D", day_26_01_25:"A", day_27_01_25:"A", day_28_01_25:"A", day_29_01_25:"A",
    day_30_01_25:"A", day_31_01_25:"A",
    total_a: 11,
    total_f: 0,
    total_vc: 0,
    total_cm: 1,
    total_inc: 0,
  },
  {
    employee: "Empleado 09",
    day_15_01_25:"A", day_16_01_25:"A", day_17_01_25:"D", day_18_01_25:"D", day_19_01_25:"A",
    day_20_01_25:"A", day_21_01_25:"A", day_22_01_25:"A", day_23_01_25:"A", day_24_01_25:"D",
    day_25_01_25:"D", day_26_01_25:"A", day_27_01_25:"A", day_28_01_25:"F", day_29_01_25:"A",
    day_30_01_25:"A", day_31_01_25:"A",
    total_a: 11,
    total_f: 1,
    total_vc: 0,
    total_cm: 0,
    total_inc: 0,
  },
  {
    employee: "Empleado 10",
    day_15_01_25:"A", day_16_01_25:"A", day_17_01_25:"D", day_18_01_25:"D", day_19_01_25:"A",
    day_20_01_25:"A", day_21_01_25:"A", day_22_01_25:"A", day_23_01_25:"A", day_24_01_25:"D",
    day_25_01_25:"D", day_26_01_25:"A", day_27_01_25:"A", day_28_01_25:"A", day_29_01_25:"A",
    day_30_01_25:"CM", day_31_01_25:"A",
    total_a: 11,
    total_f: 0,
    total_vc: 0,
    total_cm: 1,
    total_inc: 0,
  },
];

let mapIcon = function(cell, formatterParams){ 
    const empleado = cell.getRow().getData().empleado;
    if(!empleado){
        return "<i class='fa-solid fa-map'></i>";
    }
    return '';
};

let columsTable2 = [
    { title:"Empleado", field:'employee',  headerFilter:"input",  width:450},
    //-----Configuraciones de la tabla
    { formatter:mapIcon, hozAlign:"center", cellClick:function(e, cell){
        const url = cell.getRow().getData().url_check_in;
        if(url){ window.open(url,'_blank'); }
    }, download: false, width:50},
    { title:"Fecha Inicio", field:'date_in',  headerFilter:"input",  width:190},
    { formatter:mapIcon, hozAlign:"center", cellClick:function(e, cell){
        const url = cell.getRow().getData().url_check_out;
        if(url){ window.open(url,'_blank'); }
    }, download: false, width:50},
    { title:"Fecha Fin", field:'date_out',  headerFilter:"input",  width:190},
    { title:"Tiempo de Trabajo", field:'time_job',  headerFilter:"input",  width:130},
    { title:"Horas de Trabajo", field:'hour_job',  headerFilter:"input",  width:180},
];


let dataTable2 = [
  {
    employee: "Empleado 01",
    date_in: "2026-01-18 08:12",
    date_out: "2026-01-18 16:24",
    time_job: "08:12",
    hour_job: 8.2,
    url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
    url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
  },
  {
    employee: "Empleado 02",
    date_in: "2026-01-18 09:00",
    date_out: "2026-01-18 18:00",
    time_job: "09:00",
    hour_job: 9.0,
    url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
    url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
  },
  {
    employee: "Empleado 03",
    date_in: "2026-01-18 07:45",
    date_out: "2026-01-18 16:15",
    time_job: "08:30",
    hour_job: 8.5,
    url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
    url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
  },
  {
    employee: "Empleado 04",
    date_in: "2026-01-18 10:10",
    date_out: "2026-01-18 19:40",
    time_job: "09:30",
    hour_job: 9.5,
    url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
    url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
  },
  {
    employee: "Empleado 05",
    date_in: "2026-01-18 08:30",
    date_out: "2026-01-18 17:00",
    time_job: "08:30",
    hour_job: 8.5,
    url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
    url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
  },
  {
    employee: "Empleado 06",
    date_in: "2026-01-18 11:00",
    date_out: "2026-01-18 20:00",
    time_job: "09:00",
    hour_job: 9.0,
    url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
    url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
  },
  {
    employee: "Empleado 07",
    date_in: "2026-01-18 07:00",
    date_out: "2026-01-18 15:30",
    time_job: "08:30",
    hour_job: 8.5,
    url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
    url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
  },
  {
    employee: "Empleado 08",
    date_in: "2026-01-18 12:15",
    date_out: "2026-01-18 21:15",
    time_job: "09:00",
    hour_job: 9.0,
    url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
    url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
  },
  {
    employee: "Empleado 09",
    date_in: "2026-01-18 08:00",
    date_out: "2026-01-18 16:00",
    time_job: "08:00",
    hour_job: 8.0,
    url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
    url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
  },
  {
    employee: "Empleado 10",
    date_in: "2026-01-18 09:30",
    date_out: "2026-01-18 18:00",
    time_job: "08:30",
    hour_job: 8.5,
    url_check_in: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8',
    url_check_out: 'https://maps.app.goo.gl/Rp8r3GXDKf1r2gWc8'
  },
];



