// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Folio", field:'folio', hozAlign:"left", formatter:"link", formatterParams:{
    url:function(cell){return "https://app.linkaform.com/#/records/detail/" + cell.getData().record_id}, 
    target:"_blank",}, width:250},
  { title:"Creado Por", field:'creado',hozAlign:"left",width:250},
  { title:"Fecha de Creación",  field:'creacion',hozAlign:"left",width:150 },
  { title:"Tipo de Servicio",   field:'servicio',hozAlign:"left",width:160 },
  { title:"Cliente",  field:'cliente',hozAlign:"left",width:400 },
  { title:"Contacto",  field:'contacto',hozAlign:"left",width:160 },
  { title:"Técnico Asignado",  field:'tecnico',hozAlign:"left",width:250 },
  { title:"Equipo",  field:'equipo',hozAlign:"left",width:160 },
  { title:"Contacto que lo usa ",field:'contacto_uso',hozAlign:"left",width:160 },
  { title:"Estatus", field:'status',hozAlign:"left",width:160 },
];


var dataTable1 = [
  {
    folio:"251-10626", 
    creado:"Moises Carrera",
    creacion:"20/7/2022",
    servicio:"Conexión remota",
    cliente:"Linkaform",
    contacto:"Misael",
    tecnico:"Moises Carrera",
    equipo:"Impresora",
    contacto_uso:"Jose",
    status:"Pendiente",
  },
  {
    folio:"249-10626", 
    creado:"Moises Carrera",
    creacion:"20/7/2022",
    servicio:"Conexión remota",
    cliente:" PROCESOS ESPECIALIZADOS DE CARTON DE MEXICO",
    contacto:"CP Edith Negrete",
    tecnico:"Moises Carrera",
    equipo:"",
    contacto_uso:"",
    status:"Terminado",
  },
  {
    folio:"253-10626", 
    creado:"Jazmin Ayala",
    creacion:"21/7/0202",
    servicio:"Presencial",
    cliente:"COMERCIALIZADORA NACIONAL DE MEDICAMENTO",
    contacto:"CP Eduardo",
    tecnico:"Jazmin Ayala",
    equipo:"PC",
    contacto_uso:"",
    status:"Pendiente",
  },
  {
    folio:"234-10626", 
    creado:"Moises Carrera",
    creacion:"19/7/2022",
    servicio:"En Oficina",
    cliente:"Linkaform",
    contacto:"",
    tecnico:"",
    equipo:"Ofiice",
    contacto_uso:"Prueba",
    status:"Pendiente",
  },
  
];





var dataSecondElement = {
  labels: ["Conexión Remota","Presencial","En oficina"],
  datasets: [
    {
      label: "Servicios",
      backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
      data: [14,7,2],
    }
  ]
}; 

