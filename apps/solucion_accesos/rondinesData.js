let tables={}

let dataTableListPendientes = [ 
  { status: true, nameGuard: 'Juan Pérez', dateHourStart: '14-05-2024 09:30', dateHourFin: '14-05-2024 09:30',  ubi: 'Este es un registro de ejemplo',folio:1, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: false, nameGuard: 'María Rodríguez', dateHourStart: '10-05-2024 14:45', dateHourFin: '10-05-2024 14:45', ubi: 'Otro registro para ilustrar',folio:2, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'Soy una ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: true, nameGuard: 'Pedro Gómez', dateHourStart: '12-05-2024 11:20', dateHourFin: '12-05-2024 11:20',  ubi: 'Tercer registro',folio:3 ,nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: false, nameGuard: 'Ana López', dateHourStart: '08-06-2024 08:00', dateHourFin: '08-06-2024 08:00', ubi: 'Cuarto registro',folio:4, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: true, nameGuard: 'David Martínez', dateHourStart: '13-06-2024 15:10', dateHourFin: '13-06-2024 15:10',  ubi: 'Quinto registro',folio:5 ,nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: false, nameGuard: 'Laura Ramírez', dateHourStart: '09-06-2024 10:30', dateHourFin: '09-06-2024 10:30',  ubi: 'Sexto registro',folio:6, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: true, nameGuard: 'Carlos Sánchez', dateHourStart: '11-06-2024 16:50', dateHourFin: '11-06-2024 16:50', ubi: 'Séptimo registro',folio:7, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: false, nameGuard: 'Elena García', dateHourStart: '07-06-2024 12:15', dateHourFin: '07-06-2024 12:15',  ubi: 'Octavo registro',folio:8,  nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: true, nameGuard: 'Sofía Hernández', dateHourStart: '15-06-2024 09:00', dateHourFin: '15-06-2024 09:00',  ubi: 'Noveno registro',folio:9, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: false, nameGuard: 'Mario Castillo', dateHourStart: '06-06-2024 13:40', dateHourFin: '06-06-2024 13:40',  ubi: 'Décimo registro',folio:10, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'}];


let dataTableListPendientes2 = [ 
  { status: false, nameGuard: 'Luisa Martínez', dateHourStart: '14-05-2024 09:30', dateHourFin: '14-05-2024 09:30',  ubi: 'Este es un registro de ejemplo',folio:11, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: false, nameGuard: 'Roberto Gómez', dateHourStart: '10-05-2024 14:45', dateHourFin: '10-05-2024 14:45', ubi: 'Otro registro para ilustrar',folio:12, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'nombre de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: true, nameGuard: 'Carmen Pérez', dateHourStart: '12-05-2024 11:20', dateHourFin: '12-05-2024 11:20',  ubi: 'Tercer registro',folio:13 ,nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: true, nameGuard: 'Diego García', dateHourStart: '08-06-2024 08:00', dateHourFin: '08-06-2024 08:00', ubi: 'Cuarto registro',folio:14, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: false, nameGuard: 'Valentina Martínez', dateHourStart: '13-06-2024 15:10', dateHourFin: '13-06-2024 15:10',  ubi: 'Quinto registro',folio:15 ,nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: true, nameGuard: 'Javier Ramírez', dateHourStart: '09-06-2024 10:30', dateHourFin: '09-06-2024 10:30',  ubi: 'Sexto registro',folio:16, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: false, nameGuard: 'Isabella Sánchez', dateHourStart: '11-06-2024 16:50', dateHourFin: '11-06-2024 16:50', ubi: 'Séptimo registro',folio:17, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: true, nameGuard: 'Andrés López', dateHourStart: '07-06-2024 12:15', dateHourFin: '07-06-2024 12:15',  ubi: 'Octavo registro',folio:18,  nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: true, nameGuard: 'Daniela Hernández', dateHourStart: '15-06-2024 09:00', dateHourFin: '15-06-2024 09:00',  ubi: 'Noveno registro',folio:19, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: false, nameGuard: 'Héctor Castillo', dateHourStart: '06-06-2024 13:40', dateHourFin: '06-06-2024 13:40',  ubi: 'Décimo registro',folio:20, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'}
];

let dataTableListPendientes3 = [ 
  { status: true, nameGuard: 'Paola Pérez', dateHourStart: '14-05-2024 09:30', dateHourFin: '14-05-2024 09:30',  ubi: 'Este es un registro de ejemplo',folio:21, nameRoute:'recorrido casa grande',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: false, nameGuard: 'Manuel Rodríguez', dateHourStart: '10-05-2024 14:45', dateHourFin: '10-05-2024 14:45', ubi: 'Otro registro para ilustrar',folio:22, nameRoute:'recorrido matutino',pointsRoute:'puntos d ela una ruta',observations:'Soy una ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: true, nameGuard: 'Gabriela Gómez', dateHourStart: '12-05-2024 11:20', dateHourFin: '12-05-2024 11:20',  ubi: 'Tercer registro',folio:23 ,nameRoute:'recorrido nocturno',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: false, nameGuard: 'Ricardo López', dateHourStart: '08-06-2024 08:00', dateHourFin: '08-06-2024 08:00', ubi: 'Cuarto registro',folio:24, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'}]


let dataTableListPendientes4 = [ 
  { status: false, nameGuard: 'Raul Pérez', dateHourStart: '14-05-2024 09:30', dateHourFin: '14-05-2024 09:30',  ubi: 'Este es un registro de ejemplo',folio:1, nameRoute:'Soy una ruta',pointsRoute:'puntos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: false, nameGuard: 'Carla Rodríguez', dateHourStart: '10-05-2024 14:45', dateHourFin: '10-05-2024 14:45', ubi: 'Otro registro para ilustrar',folio:2, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'Soy una ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: true, nameGuard: 'Pablo Gómez', dateHourStart: '12-05-2024 11:20', dateHourFin: '12-05-2024 11:20',  ubi: 'Tercer registro',folio:3 ,nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: true, nameGuard: 'Laura López', dateHourStart: '08-06-2024 08:00', dateHourFin: '08-06-2024 08:00', ubi: 'Cuarto registro',folio:4, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: false, nameGuard: 'Diego Martínez', dateHourStart: '13-06-2024 15:10', dateHourFin: '13-06-2024 15:10',  ubi: 'Quinto registro',folio:5 ,nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: true, nameGuard: 'Liliana Ramírez', dateHourStart: '09-06-2024 10:30', dateHourFin: '09-06-2024 10:30',  ubi: 'Sexto registro',folio:6, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: false, nameGuard: 'Marcos Sánchez', dateHourStart: '11-06-2024 16:50', dateHourFin: '11-06-2024 16:50', ubi: 'Séptimo registro',folio:7, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: true, nameGuard: 'Patricia López', dateHourStart: '07-06-2024 12:15', dateHourFin: '07-06-2024 12:15',  ubi: 'Octavo registro',folio:8,  nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: true, nameGuard: 'Alejandro Hernández', dateHourStart: '15-06-2024 09:00', dateHourFin: '15-06-2024 09:00',  ubi: 'Noveno registro',folio:9, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: false, nameGuard: 'Giselle Castillo', dateHourStart: '06-06-2024 13:40', dateHourFin: '06-06-2024 13:40',  ubi: 'Décimo registro',folio:10, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'}
];


const columnsTableListPendientes = [
    { title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
        formatter: (cell, formatterParams) => {
            //----Button Trash
            let data = cell.getData();
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let divActions = '<div class="row d-flex">';
            divActions += `<button class="btn-table-bitacora" onClick=" alertVerRecorrido('ver',${folio}, '${data.nameGuard}', '${data.status}', '${data.dateHourStart}', '${data.dateHourFin}', 
            '${data.ubi}','${data.nameRoute}','${data.pointsRoute}','${data.observations}','${data.evidence}', '${data.durationRoute}' )"><i class="fa-regular fa-eye"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('bandera',${folio})" ><i class="fa-regular fa-flag"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('edit',${folio})" ><i class="fa-regular fa-edit"></i></button>`;
             divActions += `<button class="btn-table-bitacora" onClick="alertCancelarRecorrido(${folio}, ${data.status})" ><i class="fa-solid fa-ban"></i></button>`;
            divActions += '</div>';
            return divActions;
            //`<button  class="btn-table-bitacora" onClick="setModal('Tools',${folio})"><i class="fa-solid fa-car"></i></button> `;
        },
    },
    { title:"Abierto", field:'status',hozAlign:"center",tooltip:true, maxWidth:100, formatter:"tickCross",  headerFilter:"tickCross",  headerFilterParams:{'Abierto':true, 'Cerrado': false}, headerFilterEmptyCheck:function(value){return value === null}},
    { title:"Ubicación", field:'ubi',hozAlign:"left",headerFilter:true,width:250,headerTooltip:true},
    { title:"Nombre del Guardia", field:'nameGuard',hozAlign:"left",headerFilter:true,width:150,headerTooltip:true},
    { title:"Incio", field:'dateHourStart',hozAlign:"left", headerFilter:"date", headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") }},
    { title:"Finalizacion", field:'dateHourFin',hozAlign:"left", headerFilter:"date", headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") }},
    { title:"Nombre del Recorrido", field:'nameRoute',hozAlign:"left",headerFilter:true,width:330,headerTooltip:true},
    { title:"Puntos del Recorrido", field:'pointsRoute',hozAlign:"left",headerFilter:true,width:250,headerTooltip:true},
    { title:"Observaciones", field:'observations',hozAlign:"left",headerFilter:true,width:250},
    { title:"Evidencias", field:'evidence',hozAlign:"left",headerFilter:true,width:290},
    { title:"Duracion del recorrido", field:'durationRoute',hozAlign:"left",headerFilter:true,width:290,headerTooltip:true},
];


//-----TABLES
function drawTable(id, columnsData, tableData,){
  var  table = new Tabulator("#" + id, {
    layout:"fitDataTable",
    data:tableData,
    textDirection:"ltr",
    columns:columnsData,
    pagination:true, 
    paginationSize:40,
  });
  tables[id]=table;
}
