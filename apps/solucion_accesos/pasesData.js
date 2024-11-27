let tables={}

let dataTableListTodos = [];


let dataTableListFavoritos = [ 
  {folio:11, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey',visitante: 'Caseta Vigilancia Norte 3',tipoPase: 'Luisa Martínez', tema_cita: '14-05-2024 09:30',descripcion:'una descripcion', status: '14-05-2024 09:30',},
  {folio:12, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey',visitante: 'Caseta Vigilancia Norte 3',tipoPase: 'Roberto Gómez', tema_cita: '10-05-2024 14:45',descripcion:'una descripcion', status: '10-05-2024 14:45', },
  {folio:13, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey',visitante: 'Caseta Vigilancia Norte 3' ,tipoPase: 'Carmen Pérez', tema_cita: '12-05-2024 11:20',descripcion:'una descripcion', status: '12-05-2024 11:20', },
  {folio:14, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey',visitante: 'Caseta Vigilancia Norte 3', tipoPase: 'Diego García', tema_cita: '08-06-2024 08:00',descripcion:'una descripcion', status: '08-06-2024 08:00',},
  {folio:15, fechaHoraCreacion: '14-05-2024 09:30',  vigencia:'Planta Monterrey',visitante: 'Caseta Vigilancia Norte 3' ,tipoPase: 'Valentina Martínez', tema_cita: '13-06-2024 15:10',descripcion:'una descripcion', status: '13-06-2024 15:10',},
  {folio:16, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey', visitante: 'Sexto registro',tipoPase: 'Javier Ramírez', tema_cita: '09-06-2024 10:30',descripcion:'una descripcion', status: '09-06-2024 10:30',  },
  {folio:17, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey', visitante: 'Caseta Vigilancia Sur 5',tipoPase: 'Isabella Sánchez', tema_cita: '11-06-2024 16:50',descripcion:'una descripcion', status: '11-06-2024 16:50', },
  {folio:18, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey', visitante: 'Caseta Vigilancia Sur 5',tipoPase: 'Andrés López', tema_cita: '07-06-2024 12:15',descripcion:'una descripcion', status: '07-06-2024 12:15', },
  {folio:19, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey', visitante: 'Caseta Vigilancia Sur 5',tipoPase: 'Daniela Hernández', tema_cita: '15-06-2024 09:00',descripcion:'una descripcion', status: '15-06-2024 09:00',},
  {folio:20, fechaHoraCreacion: '14-05-2024 09:30',vigencia:'Planta Monterrey',  visitante: 'Caseta Vigilancia Sur 5',tipoPase: 'Héctor Castillo', tema_cita: '06-06-2024 13:40',descripcion:'una descripcion', status: '06-06-2024 13:40',}
];

let dataTableListActivos = [ 
  {folio:21, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey',visitante: 'Caseta Vigilancia Norte 3',tipoPase: 'Paola Pérez', tema_cita: '14-05-2024 09:30',descripcion:'una descripcion', status: '14-05-2024 09:30',  },
  {folio:22, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey',visitante: 'Caseta Vigilancia Norte 3',tipoPase: 'Manuel Rodríguez', tema_cita: '10-05-2024 14:45',descripcion:'una descripcion', status: '10-05-2024 14:45', },
  {folio:23, fechaHoraCreacion: '14-05-2024 09:30',  vigencia:'Planta Monterrey',visitante: 'Caseta Vigilancia Norte 3' ,tipoPase: 'Gabriela Gómez', tema_cita: '12-05-2024 11:20',descripcion:'una descripcion', status: '12-05-2024 11:20', },
  {folio:24, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey',visitante: 'Caseta Vigilancia Norte 3',tipoPase: 'Ricardo López', tema_cita: '08-06-2024 08:00',descripcion:'una descripcion', status: '08-06-2024 08:00', }]


let dataTableListVencidos = [ 
  {folio:31, fechaHoraCreacion: '14-05-2024 09:30',  vigencia:'Planta Monterrey',visitante: 'Caseta Vigilancia Norte 3',tipoPase: 'Raul Pérez', tema_cita: '14-05-2024 09:30',descripcion:'una descripcion', status: '14-05-2024 09:30',  },
  {folio:32, fechaHoraCreacion: '14-05-2024 09:30',  vigencia:'Planta Monterrey',visitante: 'Caseta Vigilancia Norte 3',tipoPase: 'Carla Rodríguez', tema_cita: '10-05-2024 14:45',descripcion:'una descripcion', status: '10-05-2024 14:45', },
  {folio:33, fechaHoraCreacion: '14-05-2024 09:30',  vigencia:'Planta Monterrey', visitante: 'Caseta Vigilancia Sur 5' ,tipoPase: 'Pablo Gómez', tema_cita: '12-05-2024 11:20',descripcion:'una descripcion', status: '12-05-2024 11:20',},
  {folio:34, fechaHoraCreacion: '14-05-2024 09:30',vigencia:'Planta Monterrey',  visitante: 'Caseta Vigilancia Sur 5',tipoPase: 'Laura López', tema_cita: '08-06-2024 08:00',descripcion:'una descripcion', status: '08-06-2024 08:00', },
  {folio:35, fechaHoraCreacion: '14-05-2024 09:30',  vigencia:'Planta Monterrey',visitante: 'Caseta Vigilancia Norte 3' ,tipoPase: 'Diego Martínez', tema_cita: '13-06-2024 15:10',descripcion:'una descripcion', status: '13-06-2024 15:10',},
  {folio:36, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey', visitante: 'Caseta Vigilancia Sur 5',tipoPase: 'Liliana Ramírez', tema_cita: '09-06-2024 10:30',descripcion:'una descripcion', status: '09-06-2024 10:30',  },
  {folio:37, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey', visitante: 'Caseta Vigilancia Sur 5',tipoPase: 'Marcos Sánchez', tema_cita: '11-06-2024 16:50',descripcion:'una descripcion', status: '11-06-2024 16:50', },
  {folio:38, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey',  visitante: 'Caseta Vigilancia Sur 5',tipoPase: 'Patricia López', tema_cita: '07-06-2024 12:15',descripcion:'una descripcion', status: '07-06-2024 12:15', },
  {folio:39, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey', visitante: 'Caseta Vigilancia Sur 5',tipoPase: 'Alejandro Hernández', tema_cita: '15-06-2024 09:00',descripcion:'una descripcion', status: '15-06-2024 09:00', },
  {folio:0, fechaHoraCreacion: '14-05-2024 09:30', vigencia:'Planta Monterrey', visitante: 'Caseta Vigilancia Sur 5',tipoPase: 'Giselle Castillo', tema_cita: '06-06-2024 13:40',descripcion:'una descripcion', status: '06-06-2024 13:40', }
];


const columnsTableListPendientes = [
    { title: "Opciones", field: "actions" , hozAlign: "left", resizable:false,width:180,
        formatter: (cell, formatterParams) => {
            //----Button Trash
            let data = cell.getData();
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let _id = cell.getData()._id ? cell.getData()._id : 0;
            let divActions = '<div class="row d-flex">';
            divActions += `<button class="btn-table-bitacora" onClick="setModal('favoritos','${_id}')"><i class="fa-regular fa-star"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('ver','${folio}')" ><i class="fa-regular fa-eye"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('editar', '${folio}')" ><i class="fa-regular fa-pen-to-square"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('reenviar', '${folio}')" ><i class="fa-solid fa-angles-right"></i></button>`;
            divActions += '</div>';
            return divActions;
            //`<button  class="btn-table-bitacora" onClick="setModal('Tools',${folio})"><i class="fa-solid fa-car"></i></button> `;
        },
    },
    { title:"Folio", field:'folio',hozAlign:"center",tooltip:true,headerFilter:true,width:100,headerTooltip:true},
    { title:"Fecha creacion", field:'fechaHoraCreacion',hozAlign:"left",headerFilter:true,headerTooltip:true ,width:200},
     { title:"Vigencia", field:'vigencia',hozAlign:"left",headerFilter:true,headerTooltip:true ,width:200},
    { title:"Visitante", field:'visitante',hozAlign:"left",headerFilter:true,headerTooltip:true ,width:200},
    { title:"TipoPase", field:'tipoPase',hozAlign:"left", headerFilter:true,headerTooltip:true ,width:200},
    { title:"Motivo", field:'headerTooltip:true',hozAlign:"left", headerFilter:true ,width:200},
    { title:"Estado", field:'status',hozAlign:"left",headerFilter:true,headerTooltip:true ,width:200},
];


//-----TABLES
function drawTable(id, columnsData, tableData,){
    let table = new Tabulator("#" + id, {
         layout:"fitDataStretch",
        data:tableData,
        textDirection:"ltr",
        columns:columnsData,
        pagination:true, 
        paginationSize:40,
        placeholder: "No hay registros disponibles", 
  });
  tables[id]=table;
}
