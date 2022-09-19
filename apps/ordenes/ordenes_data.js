// Datos demo para Reporte ENcuestas MOntaje

//--Table Montajes Por Mes
var columsTable1 = [
  { title:"Tipo de Servicio", field:'tipo_servicio',hozAlign:"left",width:200},
  { title:"Tecnico",field:'tecnico',hozAlign:"left",width:450 },
  { title:"Cliente",field:'cliente',hozAlign:"left",width:450 },
  { title:"Fecha Inicio", field:'fecha_inicio',hozAlign:"left",width:180 },
  { title:"Fecha Fin",field:'fecha_fin',hozAlign:"left",width:180},
  { title:"Status",  field:'status',hozAlign:"left",width:250 },
  { title:"Equipo al que se le hizo servicio", field:'equipo',hozAlign:"left",width:350 },
  { title:"Piezas utilizadas en el servicio",  field:'piezas_utilizadas',hozAlign:"left",width:500 },
  { title:"Piezas recomendadas en servicio", field:'piezas_recomendadas',hozAlign:"left",width:500 },
];

var dataTable1 = [
  {
    tipo_servicio:"251-10626", 
    cliente:"Moises Carrera",
    fecha_inicio:"20/7/2022",
    fecha_fin:"20/7/2022",
    status:"Conexión remota",
    equipo:"Linkaform",
    piezas_utilizadas:"Pieza10",
    piezas_recomendadas:"Pieza1",
  },
];
