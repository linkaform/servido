let dataTableListPendientes = [ 
  { status: 'abierto', nameGuard: 'Juan Pérez', dateHourStart: '2024-05-14 09:30', dateHourFin: '2024-05-14 09:30',  ubi: 'Este es un registro de ejemplo',folio:1, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'María Rodríguez', dateHourStart: '2024-05-10 14:45', dateHourFin: '2024-05-10 14:45', ubi: 'Otro registro para ilustrar',folio:2, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'Soy una ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Pedro Gómez', dateHourStart: '2024-05-12 11:20', dateHourFin: '2024-05-12 11:20',  ubi: 'Tercer registro',folio:3 ,nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Ana López', dateHourStart: '2024-05-08 08:00', dateHourFin: '2024-05-08 08:00', ubi: 'Cuarto registro',folio:4, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'David Martínez', dateHourStart: '2024-05-13 15:10', dateHourFin: '2024-05-13 15:10',  ubi: 'Quinto registro',folio:5 ,nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Laura Ramírez', dateHourStart: '2024-05-09 10:30', dateHourFin: '2024-05-09 10:30',  ubi: 'Sexto registro',folio:6, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Carlos Sánchez', dateHourStart: '2024-05-11 16:50', dateHourFin: '2024-05-11 16:50', ubi: 'Séptimo registro',folio:7, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Elena García', dateHourStart: '2024-05-07 12:15', dateHourFin: '2024-05-07 12:15',  ubi: 'Octavo registro',folio:8,  nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Sofía Hernández', dateHourStart: '2024-05-15 09:00', dateHourFin: '2024-05-15 09:00',  ubi: 'Noveno registro',folio:9, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Mario Castillo', dateHourStart: '2024-05-06 13:40', dateHourFin: '2024-05-06 13:40',  ubi: 'Décimo registro',folio:10, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'}];


let dataTableListPendientes2 = [ 
  { status: 'cerrado', nameGuard: 'Luisa Martínez', dateHourStart: '2024-05-14 09:30', dateHourFin: '2024-05-14 09:30',  ubi: 'Este es un registro de ejemplo',folio:1, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Roberto Gómez', dateHourStart: '2024-05-10 14:45', dateHourFin: '2024-05-10 14:45', ubi: 'Otro registro para ilustrar',folio:2, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'nombre de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Carmen Pérez', dateHourStart: '2024-05-12 11:20', dateHourFin: '2024-05-12 11:20',  ubi: 'Tercer registro',folio:3 ,nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Diego García', dateHourStart: '2024-05-08 08:00', dateHourFin: '2024-05-08 08:00', ubi: 'Cuarto registro',folio:4, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Valentina Martínez', dateHourStart: '2024-05-13 15:10', dateHourFin: '2024-05-13 15:10',  ubi: 'Quinto registro',folio:5 ,nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Javier Ramírez', dateHourStart: '2024-05-09 10:30', dateHourFin: '2024-05-09 10:30',  ubi: 'Sexto registro',folio:6, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Isabella Sánchez', dateHourStart: '2024-05-11 16:50', dateHourFin: '2024-05-11 16:50', ubi: 'Séptimo registro',folio:7, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Andrés López', dateHourStart: '2024-05-07 12:15', dateHourFin: '2024-05-07 12:15',  ubi: 'Octavo registro',folio:8,  nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Daniela Hernández', dateHourStart: '2024-05-15 09:00', dateHourFin: '2024-05-15 09:00',  ubi: 'Noveno registro',folio:9, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Héctor Castillo', dateHourStart: '2024-05-06 13:40', dateHourFin: '2024-05-06 13:40',  ubi: 'Décimo registro',folio:10, nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'}
];

let dataTableListPendientes3 = [ 
  { status: 'abierto', nameGuard: 'Paola Pérez', dateHourStart: '2024-05-14 09:30', dateHourFin: '2024-05-14 09:30',  ubi: 'Este es un registro de ejemplo',folio:1, nameRoute:'recorrido casa grande',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Manuel Rodríguez', dateHourStart: '2024-05-10 14:45', dateHourFin: '2024-05-10 14:45', ubi: 'Otro registro para ilustrar',folio:2, nameRoute:'recorrido matutino',pointsRoute:'puntos d ela una ruta',observations:'Soy una ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Gabriela Gómez', dateHourStart: '2024-05-12 11:20', dateHourFin: '2024-05-12 11:20',  ubi: 'Tercer registro',folio:3 ,nameRoute:'recorrido nocturno',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Ricardo López', dateHourStart: '2024-05-08 08:00', dateHourFin: '2024-05-08 08:00', ubi: 'Cuarto registro',folio:4, nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'}]


let dataTableListPendientes4 = [ 
  { status: 'cerrado', nameGuard: 'Raul Pérez', dateHourStart: '2024-05-14 09:30', dateHourFin: '2024-05-14 09:30',  ubi: 'Este es un registro de ejemplo',folio:1, nameRoute:'Soy una ruta',pointsRoute:'puntos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Carla Rodríguez', dateHourStart: '2024-05-10 14:45', dateHourFin: '2024-05-10 14:45', ubi: 'Otro registro para ilustrar',folio:2, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'Soy una ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Pablo Gómez', dateHourStart: '2024-05-12 11:20', dateHourFin: '2024-05-12 11:20',  ubi: 'Tercer registro',folio:3 ,nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Laura López', dateHourStart: '2024-05-08 08:00', dateHourFin: '2024-05-08 08:00', ubi: 'Cuarto registro',folio:4, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Diego Martínez', dateHourStart: '2024-05-13 15:10', dateHourFin: '2024-05-13 15:10',  ubi: 'Quinto registro',folio:5 ,nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Liliana Ramírez', dateHourStart: '2024-05-09 10:30', dateHourFin: '2024-05-09 10:30',  ubi: 'Sexto registro',folio:6, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones',evidence:'evidencias',durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Marcos Sánchez', dateHourStart: '2024-05-11 16:50', dateHourFin: '2024-05-11 16:50', ubi: 'Séptimo registro',folio:7, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Patricia López', dateHourStart: '2024-05-07 12:15', dateHourFin: '2024-05-07 12:15',  ubi: 'Octavo registro',folio:8,  nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'abierto', nameGuard: 'Alejandro Hernández', dateHourStart: '2024-05-15 09:00', dateHourFin: '2024-05-15 09:00',  ubi: 'Noveno registro',folio:9, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  { status: 'cerrado', nameGuard: 'Giselle Castillo', dateHourStart: '2024-05-06 13:40', dateHourFin: '2024-05-06 13:40',  ubi: 'Décimo registro',folio:10, nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'}
];


const columnsTableListPendientes = [
    { title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
        formatter: (cell, formatterParams) => {
            //----Button Trash
            let data = cell.getData();
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let divActions = '<div class="row d-flex">';
            divActions += ` <input class="form-check-input ms-3 mt-1" style="height:15px !important;width:2px;" type="checkbox">`;
            divActions += `<button class="btn-table-bitacora" onClick=" alertVerRecorrido('ver',${folio}, '${data.nameGuard}', '${data.status}', '${data.dateHourStart}', '${data.dateHourFin}', 
            '${data.ubi}','${data.nameRoute}','${data.pointsRoute}','${data.observations}','${data.evidence}', '${data.durationRoute}' )"><i class="fa-regular fa-eye"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('bandera',${folio})" ><i class="fa-regular fa-flag"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('edit',${folio})" ><i class="fa-regular fa-edit"></i></button>`;
             divActions += `<button class="btn-table-bitacora" onClick="setModal('cancelar',${folio})" ><i class="fa-solid fa-ban"></i></button>`;
            divActions += '</div>';
            return divActions;
            //`<button  class="btn-table-bitacora" onClick="setModal('Tools',${folio})"><i class="fa-solid fa-car"></i></button> `;
        },
    },
    { title:"Estado", field:'status',hozAlign:"left",headerFilter:true,width:100,headerTooltip:true},
    { title:"Ubicación", field:'ubi',hozAlign:"left",headerFilter:true,width:250,headerTooltip:true},
    { title:"Nombre del Guardia", field:'nameGuard',hozAlign:"left",headerFilter:true,width:150,headerTooltip:true},
    { title:"Fecha y hora de inicio", field:'dateHourStart',hozAlign:"left",headerFilter:true,width:150,headerTooltip:true},
    { title:"Fecha y Hora de finalizacion", field:'dateHourFin',hozAlign:"left",headerFilter:true,width:150,headerTooltip:true},
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
}
