var array_background = getPAlleteColors(10,12);
console.log(array_background)

//--Table Montajes Por Mes


var columsTable1 = [
  { title:"Folio", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
  url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
  target:"_blank",}, width:100},
  { title:"Cliente ", field:'cliente',hozAlign:"left",width:150},
  { title:"Marca ", field:'marca',hozAlign:"left",width:200},
  { title:"Modelo", field:'modelo',hozAlign:"left",width:200},
  { title:"Técnico Asignado", field:'tecnico_asignado',hozAlign:"left",width:150},
  { title:"Fecha de Registro", field:'fecha_registro',hozAlign:"left",width:200},
  { title:"Fecha de Servicio", field:'fecha_servicio',hozAlign:"left",width:200},
  { title:"Status", field:'porcentaje',formatter: "money", formatterParams: { symbol: "%", symbolAfter: true, precision: 0 }, hozAlign:"right",width:110},
  { title:"", field:'status_color',hozAlign:"left",formatter:"color",width:50},
];

var dataTable1 = [
  {
    folio:"1891-10522",
    cliente:"Elektra",
    marca:"RENAULT DUSTER ",
    modelo:"2023",
    tecnico_asignado:"Uriel Montes",
    fecha_registro:"25/01/2023 09:49:08",
    fecha_servicio:"26/01/2023 15:30:00",
    porcentaje:50,
    status_color:"#E74C3C",
  },
  {
    folio:"1891-10523",
    cliente:"Banco Azteca",
    marca:"Nissan v-drive ",
    modelo:"2023",
    tecnico_asignado:"Alexis Roldán",
    fecha_registro:"25/01/2023 09:49:08",
    fecha_servicio:"26/01/2023 15:30:00",
    porcentaje:100,
    status_color:"#27AE60",
  },
  {
    folio:"1891-10524",
    cliente:"Banco Azteca",
    marca:"Chevrolet Trax",
    modelo:"2022",
    tecnico_asignado:"Uriel Montes",
    fecha_registro:"25/01/2023 09:49:08",
    fecha_servicio:"26/01/2023 15:30:00",
    porcentaje:100,
    status_color:"#27AE60",
  },
  {
    folio:"1891-10525",
    cliente:"Total Play",
    marca:"2022",
    modelo:"2023",
    tecnico_asignado:"Uriel Montes",
    fecha_registro:"25/01/2023 09:49:08",
    fecha_servicio:"26/01/2023 15:30:00",
    porcentaje:0,
    status_color:"#B2BABB",
  },
    {
    folio:"1891-10526",
    cliente:"Elektra",
    marca:"RENAULT DUSTER ",
    modelo:"2023",
    tecnico_asignado:"Víctor Rosas",
    fecha_registro:"25/01/2023 09:49:08",
    fecha_servicio:"26/01/2023 15:30:00",
    porcentaje:50,
    status_color:"#E74C3C",
  },
  {
    folio:"1891-10527",
    cliente:"Banco Azteca",
    marca:"Nissan v-drive ",
    modelo:"2023",
    tecnico_asignado:"Alexis Roldán",
    fecha_registro:"25/01/2023 09:49:08",
    fecha_servicio:"26/01/2023 15:30:00",
    porcentaje:100,
    status_color:"#27AE60",
  },
  {
    folio:"1891-10528",
    cliente:"Banco Azteca",
    marca:"Chevrolet Trax",
    modelo:"2022",
    tecnico_asignado:"Uriel Montes",
    fecha_registro:"25/01/2023 09:49:08",
    fecha_servicio:"26/01/2023 15:30:00",
    porcentaje:100,
    status_color:"#27AE60",
  },
  {
    folio:"1891-10529",
    cliente:"Total Play",
    marca:"Chevrolet express van",
    modelo:"2023",
    tecnico_asignado:"Uriel Montes",
    fecha_registro:"25/01/2023 09:49:08",
    fecha_servicio:"26/01/2023 15:30:00",
    porcentaje:0,
    status_color:"#B2BABB",
  },
    {
    folio:"1891-10530",
    cliente:"Total Play",
    marca:"Chevrolet express van",
    modelo:"2023",
    tecnico_asignado:"Uriel Montes",
    fecha_registro:"25/01/2023 09:49:08",
    fecha_servicio:"26/01/2023 15:30:00",
    porcentaje:50,
    status_color:"#E74C3C",
  },

];


var data1 = {
  labels: ['Pendiente','Cerrado',' Cancelado'],
  datasets: [
    {
      label: 'Víctor Rosas',
      data: [1,0,0],
      backgroundColor: array_background[0],
    },
    {
      label: 'Alexis Roldán',
      data: [1,0,0],
      backgroundColor: array_background[2],
    },
    {
      label: 'Uriel Montes',
      data: [1,2,2],
      backgroundColor: array_background[4],
    },
  ]
};



var setOptions1 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
        display: true,
        text: 'Reporte de Servicios',
        font: {
          size: 25
        }
    },
    datalabels: {
      color: 'white',
    }
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        stepSize: 1
      },
    }
  }
};