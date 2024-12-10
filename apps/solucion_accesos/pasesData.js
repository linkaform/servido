// let tables={}
let actualTab=''
let dataTableListTodos = [];


let dataTableListFavoritos = [];

let dataTableListActivos = [];
 

let dataTableListVencidos = [];


const columnsTableListPendientes = [
    { title: "", field: "actions" , hozAlign: "left", resizable:false,width:80,
        formatter: (cell, formatterParams) => {
            //----Button Trash
            let data = cell.getData();
            let folio = cell.getData().folio ? cell.getData().folio : 0;
            let _id = cell.getData()._id ? cell.getData()._id : 0;
            let star= data.favoritos !=="" ? `<i class="fa-solid fa-star star" id="${_id}"></i>` : `<i class="fa-regular fa-star star" id="${_id}"></i>`
            let divActions = '<div class="row d-flex">';
            // divActions += `<button class="btn-table-bitacora" onClick="setModal('favoritos','${_id}')">${star}</button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('ver','${_id}')" ><i class="fa-regular fa-eye"></i></button>`;
            divActions += `<button class="btn-table-bitacora" onClick="setModal('editar', '${_id}')" ><i class="fa-regular fa-pen-to-square"></i></button>`;
            // divActions += `<button class="btn-table-bitacora" onClick="setModal('reenviar', '${_id}')" ><i class="fa-solid fa-angles-right"></i></button>`;
            divActions += '</div>';
            return divActions;
            //`<button  class="btn-table-bitacora" onClick="setModal('Tools',${folio})"><i class="fa-solid fa-car"></i></button> `;
        },
    },
    // { title:"Folio", field:'folio', hozAlign:"center", tooltip:true,headerFilter:true,width:100,headerTooltip:true},
    { title:"Fecha creacion", field:'fecha_desde_visita', hozAlign:"left",headerFilter:"date",width:200, headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") },
        formatter: function(cell) {
            let data = cell.getData();
            return data.fecha_desde_visita.slice(0,-3)
        },
    },
    { title:"Fecha Vigencia", field:'fecha_desde_hasta', hozAlign:"left",headerFilter:"date", width:200,headerFilterFunc:dateFilter, headerFilterParams:{ min: new Date(""), max: new Date("") },
        formatter: function(cell) {
            let data = cell.getData();
            return data.fecha_desde_hasta.slice(0,-3)
        }},
    { title:"Visitante", field:'nombre_pase', hozAlign:"left",headerFilter:true,headerTooltip:true ,width:200},
    { title:"Fotografia", field:'walkin_fotografia',hozAlign:"left",headerFilter:true,width:250,
            formatter: function(cell) {
                    let data = cell.getData();
                    let img=""
                    if(data.walkin_fotografia.length>0){
                        img= `<img src="${data.walkin_fotografia[0].file_url}" alt="Imagen" style="width:120px;height:120px;" class="img-cell"/>`;
                    }else{
                        img=""
                    }
                    return img;
                }},
    // { title:"TipoPase", field:'tipo_de_pase', hozAlign:"left", headerFilter:true,headerTooltip:true ,width:200,
    //     formatter: function(cell) {
    //         let data = cell.getData();
    //         return capitalizeFirstLetter(data.tipo_de_pase)
    //     }},
    // { title:"Motivo", field:'descripcion',hozAlign:"left", headerFilter:true ,width:300,
    //     formatter: function(cell) {
    //         let data = cell.getData();
    //         return capitalizeFirstLetter(data.descripcion)
    //     }},
    { title:"Estado", field:'status_pase', hozAlign:"left",headerFilter:true,headerTooltip:true ,width:200,
        formatter: function(cell) {
            let data = cell.getData();
            return capitalizeFirstLetter(data.status_pase)
        }},
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
    actualTab=id
    tables[id]=table;
}
