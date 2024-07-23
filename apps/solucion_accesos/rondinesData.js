let tables={}

let dataTableListPendientes = [ 
  {folio:1, status: true, ubi: 'Este es un registro de ejemplo',nameGuard: 'Juan Pérez', dateHourStart: '14-05-2024 09:30', dateHourFin: '14-05-2024 09:30',   nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:2, status: false, ubi: 'Otro registro para ilustrar',nameGuard: 'María Rodríguez', dateHourStart: '10-05-2024 14:45', dateHourFin: '10-05-2024 14:45',  nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'Soy una ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  {folio:3, status: true, ubi: 'Tercer registro' ,nameGuard: 'Pedro Gómez', dateHourStart: '12-05-2024 11:20', dateHourFin: '12-05-2024 11:20',  nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  {folio:4, status: false,  ubi: 'Cuarto registro',nameGuard: 'Ana López', dateHourStart: '08-06-2024 08:00', dateHourFin: '08-06-2024 08:00', nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:5, status: true,  ubi: 'Quinto registro' ,nameGuard: 'David Martínez', dateHourStart: '13-06-2024 15:10', dateHourFin: '13-06-2024 15:10', nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  {folio:6, status: false, ubi: 'Sexto registro',nameGuard: 'Laura Ramírez', dateHourStart: '09-06-2024 10:30', dateHourFin: '09-06-2024 10:30',   nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  {folio:7, status: true, ubi: 'Séptimo registro',nameGuard: 'Carlos Sánchez', dateHourStart: '11-06-2024 16:50', dateHourFin: '11-06-2024 16:50',  nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:8, status: false,  ubi: 'Octavo registro', nameGuard: 'Elena García', dateHourStart: '07-06-2024 12:15', dateHourFin: '07-06-2024 12:15',  nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:9, status: true, ubi: 'Noveno registro',nameGuard: 'Sofía Hernández', dateHourStart: '15-06-2024 09:00', dateHourFin: '15-06-2024 09:00',   nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:10, status: false,  ubi: 'Décimo registro', nameGuard: 'Mario Castillo', dateHourStart: '06-06-2024 13:40', dateHourFin: '06-06-2024 13:40', nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'}];


let dataTableListPendientes2 = [ 
  {folio:11, status: false, ubi: 'Este es un registro de ejemplo',nameGuard: 'Luisa Martínez', dateHourStart: '14-05-2024 09:30', dateHourFin: '14-05-2024 09:30',   nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:12, status: false, ubi: 'Otro registro para ilustrar',nameGuard: 'Roberto Gómez', dateHourStart: '10-05-2024 14:45', dateHourFin: '10-05-2024 14:45',  nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'nombre de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  {folio:13, status: true, ubi: 'Tercer registro' ,nameGuard: 'Carmen Pérez', dateHourStart: '12-05-2024 11:20', dateHourFin: '12-05-2024 11:20',  nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  {folio:14, status: true, ubi: 'Cuarto registro', nameGuard: 'Diego García', dateHourStart: '08-06-2024 08:00', dateHourFin: '08-06-2024 08:00', nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:15, status: false,  ubi: 'Quinto registro' ,nameGuard: 'Valentina Martínez', dateHourStart: '13-06-2024 15:10', dateHourFin: '13-06-2024 15:10', nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  {folio:16, status: true, ubi: 'Sexto registro',nameGuard: 'Javier Ramírez', dateHourStart: '09-06-2024 10:30', dateHourFin: '09-06-2024 10:30',   nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  {folio:17, status: false, ubi: 'Séptimo registro',nameGuard: 'Isabella Sánchez', dateHourStart: '11-06-2024 16:50', dateHourFin: '11-06-2024 16:50',  nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:18, status: true, ubi: 'Octavo registro',nameGuard: 'Andrés López', dateHourStart: '07-06-2024 12:15', dateHourFin: '07-06-2024 12:15',    nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:19, status: true, ubi: 'Noveno registro',nameGuard: 'Daniela Hernández', dateHourStart: '15-06-2024 09:00', dateHourFin: '15-06-2024 09:00',   nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:20, status: false, ubi: 'Décimo registro',nameGuard: 'Héctor Castillo', dateHourStart: '06-06-2024 13:40', dateHourFin: '06-06-2024 13:40',   nameRoute:'nombre de la ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'}
];

let dataTableListPendientes3 = [ 
  {folio:21, status: true, ubi: 'Este es un registro de ejemplo',nameGuard: 'Paola Pérez', dateHourStart: '14-05-2024 09:30', dateHourFin: '14-05-2024 09:30',   nameRoute:'recorrido casa grande',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:22, status: false, ubi: 'Otro registro para ilustrar',nameGuard: 'Manuel Rodríguez', dateHourStart: '10-05-2024 14:45', dateHourFin: '10-05-2024 14:45',  nameRoute:'recorrido matutino',pointsRoute:'puntos d ela una ruta',observations:'Soy una ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  {folio:23, status: true,  ubi: 'Tercer registro' ,nameGuard: 'Gabriela Gómez', dateHourStart: '12-05-2024 11:20', dateHourFin: '12-05-2024 11:20', nameRoute:'recorrido nocturno',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  {folio:24, status: false, ubi: 'Cuarto registro',nameGuard: 'Ricardo López', dateHourStart: '08-06-2024 08:00', dateHourFin: '08-06-2024 08:00',  nameRoute:'Soy una ruta',pointsRoute:'puntos d ela una ruta',observations:'observaciones de la ruta' ,evidence:'evidencias', durationRoute:'durationRoute'}]


let dataTableListPendientes4 = [ 
  {folio:31, status: false,  ubi: 'Este es un registro de ejemplo',nameGuard: 'Raul Pérez', dateHourStart: '14-05-2024 09:30', dateHourFin: '14-05-2024 09:30',  nameRoute:'Soy una ruta',pointsRoute:'puntos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:32, status: false,  ubi: 'Otro registro para ilustrar',nameGuard: 'Carla Rodríguez', dateHourStart: '10-05-2024 14:45', dateHourFin: '10-05-2024 14:45', nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'Soy una ruta',evidence:'evidencias',durationRoute:'durationRoute'},
  {folio:33, status: true,  ubi: 'Tercer registro' ,nameGuard: 'Pablo Gómez', dateHourStart: '12-05-2024 11:20', dateHourFin: '12-05-2024 11:20', nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones',evidence:'evidencias',durationRoute:'durationRoute'},
  {folio:34, status: true, ubi: 'Cuarto registro',nameGuard: 'Laura López', dateHourStart: '08-06-2024 08:00', dateHourFin: '08-06-2024 08:00',  nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:35, status: false,  ubi: 'Quinto registro' ,nameGuard: 'Diego Martínez', dateHourStart: '13-06-2024 15:10', dateHourFin: '13-06-2024 15:10', nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones',evidence:'evidencias',durationRoute:'durationRoute'},
  {folio:36, status: true, ubi: 'Sexto registro',nameGuard: 'Liliana Ramírez', dateHourStart: '09-06-2024 10:30', dateHourFin: '09-06-2024 10:30',   nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones',evidence:'evidencias',durationRoute:'durationRoute'},
  {folio:37, status: false, ubi: 'Séptimo registro',nameGuard: 'Marcos Sánchez', dateHourStart: '11-06-2024 16:50', dateHourFin: '11-06-2024 16:50',  nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:38, status: true,  ubi: 'Octavo registro',nameGuard: 'Patricia López', dateHourStart: '07-06-2024 12:15', dateHourFin: '07-06-2024 12:15',   nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:39, status: true, ubi: 'Noveno registro',nameGuard: 'Alejandro Hernández', dateHourStart: '15-06-2024 09:00', dateHourFin: '15-06-2024 09:00',   nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'},
  {folio:0, status: false, ubi: 'Décimo registro',nameGuard: 'Giselle Castillo', dateHourStart: '06-06-2024 13:40', dateHourFin: '06-06-2024 13:40',   nameRoute:'Soy una ruta',pointsRoute:'puintos de la ruta actual',observations:'falta hacer ciertas revisiones' ,evidence:'evidencias', durationRoute:'durationRoute'}
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
    placeholder: "No hay registros disponibles",
  });
  tables[id]=table;
}
