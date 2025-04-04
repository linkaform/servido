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
    {title:"Nombre", field:'nombre_pase',hozAlign:"left",headerFilter:true,width:390,headerFilter:'input', headerFilterPlaceholder: "Buscar por nombre o estatus", 
         formatter: (cell, formatterParams) => {
            let data = cell.getData();
            let id = cell.getData().id ? cell.getData().id : 0;
            let img=""
            if(data.walkin_fotografia.length>0){
                img= data.walkin_fotografia[0].file_url
            }else{
                img='https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067'
            }
                    // return img;

            let divActions = '<div id="inf'+data.id +'"><div class="d-flex flex-row" id="listOfGuards">';
            divActions+= '<div col-sm-12 col-md-12 col-lg-6 col-xl-6> <img id="imgGuardiaApoyo" height="100" width="100" style="object-fit:fill" src="'
            + img + '"> </div > <div col-sm-12 col-md-12 col-lg-6 col-xl-6 class="flex-column ms-3"> <div> <b>'
            + data.nombre_pase +'</b> </div><div id="idStatusGuardia"> '+ capitalizeFirstLetter(data.status_pase) +'</div></div>';
            divActions += '</div> </div>';
            return divActions;
        },
        headerFilterFunc: function(headerValue, rowValue, rowData, filterParams) {
            let buscarValor = headerValue.toLowerCase();
            let nombrePase = rowData.nombre_pase.toLowerCase();
            let statusPase = rowData.status_pase.toLowerCase();
            // Primero checamos si la frase completa esta en nombre pase o status_pase, si se encuentra regresa la fila
            if (nombrePase.includes(buscarValor) || statusPase.includes(buscarValor)) {
                return true;
            }
            //Despues buscamos por separado las palabras 
            let buscarPalabras = buscarValor.split(' ').map(palabra => palabra.trim()).filter(palabra => palabra.length > 0);
            // si estan las palabras en nombre_pase o status_pase tambien regresa esas filas, sin importar el orden 
            let coincidencias = buscarPalabras.every(palabra => 
                nombrePase.includes(palabra) || statusPase.includes(palabra)
            );
            return coincidencias;
        }
    },
    // { title:"Folio", field:'folio', hozAlign:"center", tooltip:true,headerFilter:true,width:100,headerTooltip:true},
    { title:"Ubicación", field:'ubicacion', hozAlign:"left",headerFilter:true,headerTooltip:true ,width:200},
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
    // { title:"Fotografia", field:'walkin_fotografia',hozAlign:"left",headerFilter:true,width:250,
    //         formatter: function(cell) {
    //                 let data = cell.getData();
    //                 let img=""
    //                 if(data.walkin_fotografia.length>0){
    //                     img= `<img src="${data.walkin_fotografia[0].file_url}" alt="Imagen" style="width:120px;height:120px;" class="img-cell"/>`;
    //                 }else{
    //                     img=""
    //                 }
    //                 return img;
    //             }},
    // // { title:"TipoPase", field:'tipo_de_pase', hozAlign:"left", headerFilter:true,headerTooltip:true ,width:200,
    // //     formatter: function(cell) {
    // //         let data = cell.getData();
    // //         return capitalizeFirstLetter(data.tipo_de_pase)
    // //     }},
    // // { title:"Motivo", field:'descripcion',hozAlign:"left", headerFilter:true ,width:300,
    // //     formatter: function(cell) {
    // //         let data = cell.getData();
    // //         return capitalizeFirstLetter(data.descripcion)
    // //     }},
    // { title:"Estado", field:'status_pase', hozAlign:"left",headerFilter:true,headerTooltip:true ,width:200,
    //     formatter: function(cell) {
    //         let data = cell.getData();
    //         return capitalizeFirstLetter(data.status_pase)
    //     }},
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
